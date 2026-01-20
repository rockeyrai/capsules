import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Candle, Direction } from "@/types/candle";

interface CandlestickChartProps {
  candles: Candle[];
  width?: number;
  height?: number;
  animationDelay?: number;
  showReveal?: boolean;
  revealDirection?: Direction;
}

export const CandlestickChart = ({
  candles,
  width = 800,
  height = 400,
  animationDelay = 500,
  showReveal = false,
  revealDirection,
}: CandlestickChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const candlesRef = useRef<Candle[]>([]);
  const animationIndexRef = useRef(0);

  useEffect(() => {
    if (!svgRef.current || candles.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Check if this is a new pattern
    const isNewPattern = candlesRef.current.length === 0 || 
      (candles.length > 0 && candlesRef.current.length > 0 && 
       candles[0].timestamp !== candlesRef.current[0].timestamp);

    if (isNewPattern) {
      // Clear previous chart with fade out
      svg.selectAll("g.chart-content")
        .transition()
        .duration(300)
        .style("opacity", 0)
        .remove();

      animationIndexRef.current = 0;
      candlesRef.current = [];
    }

    // Animate candles one by one
    const animateNextCandle = () => {
      if (animationIndexRef.current >= candles.length) return;

      let currentCandles = candles.slice(0, animationIndexRef.current + 1);
      
      // Add reveal candle if showing result
      if (showReveal && revealDirection && animationIndexRef.current === candles.length - 1) {
        const lastCandle = candles[candles.length - 1];
        const revealCandle: Candle = {
          ...lastCandle,
          timestamp: lastCandle.timestamp + 60000,
          open: lastCandle.close,
          close: revealDirection === "UP" ? lastCandle.close * 1.02 : lastCandle.close * 0.98,
          high: revealDirection === "UP" ? lastCandle.close * 1.025 : lastCandle.close * 1.005,
          low: revealDirection === "UP" ? lastCandle.close * 0.995 : lastCandle.close * 0.985,
        };
        currentCandles = [...currentCandles, revealCandle];
      }
      
      candlesRef.current = currentCandles;

      const allPrices = currentCandles.flatMap(d => [d.high, d.low]);
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      const priceRange = maxPrice - minPrice;
      const padding = priceRange * 0.1;

      const xScale = d3.scaleLinear()
        .domain([0, Math.max(currentCandles.length - 1, 5)])
        .range([0, chartWidth]);

      const yScale = d3.scaleLinear()
        .domain([minPrice - padding, maxPrice + padding])
        .range([chartHeight, 0]);

      // Clear and redraw
      svg.selectAll("g.chart-content").remove();

      const g = svg.append("g")
        .attr("class", "chart-content")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .style("opacity", 0);

      // Grid lines
      g.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(yScale.ticks(8))
        .join("line")
        .attr("x1", 0)
        .attr("x2", chartWidth)
        .attr("y1", d => yScale(d))
        .attr("y2", d => yScale(d))
        .attr("stroke", "hsl(var(--chart-grid))")
        .attr("stroke-opacity", 0.3)
        .attr("stroke-dasharray", "2,2");

      // Y-axis
      const yAxis = d3.axisLeft(yScale)
        .ticks(8)
        .tickFormat(d => `$${d3.format(".2f")(d as number)}`);

      g.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").remove())
        .call(g => g.selectAll(".tick text")
          .attr("fill", "hsl(var(--muted-foreground))")
          .attr("font-size", "12px"));

      // X-axis with time
      const xAxis = d3.axisBottom(xScale)
        .ticks(Math.min(currentCandles.length, 6))
        .tickFormat((d) => {
          const index = Math.round(d as number);
          if (index >= 0 && index < currentCandles.length) {
            const time = new Date(currentCandles[index].timestamp);
            return d3.timeFormat("%H:%M")(time);
          }
          return "";
        });

      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(xAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").remove())
        .call(g => g.selectAll(".tick text")
          .attr("fill", "hsl(var(--muted-foreground))")
          .attr("font-size", "12px"));

      const candleWidth = Math.min(chartWidth / (currentCandles.length + 2), 30);

      // Wicks
      g.selectAll("line.wick")
        .data(currentCandles)
        .join("line")
        .attr("class", "wick")
        .attr("x1", (d, i) => xScale(i))
        .attr("x2", (d, i) => xScale(i))
        .attr("y1", d => yScale(d.high))
        .attr("y2", d => yScale(d.low))
        .attr("stroke", d => d.close >= d.open ? "hsl(var(--bullish))" : "hsl(var(--bearish))")
        .attr("stroke-width", 2);

      // Candle bodies
      g.selectAll("rect.candle")
        .data(currentCandles)
        .join("rect")
        .attr("class", "candle")
        .attr("x", (d, i) => xScale(i) - candleWidth / 2)
        .attr("y", d => yScale(Math.max(d.open, d.close)))
        .attr("width", candleWidth)
        .attr("height", d => Math.max(Math.abs(yScale(d.open) - yScale(d.close)), 1))
        .attr("fill", d => d.close >= d.open ? "hsl(var(--bullish))" : "hsl(var(--bearish))")
        .attr("rx", 2);

      // Fade in
      g.transition()
        .duration(200)
        .style("opacity", 1);

      animationIndexRef.current++;
      
      if (animationIndexRef.current < candles.length) {
        setTimeout(animateNextCandle, animationDelay);
      }
    };

    const timer = setTimeout(animateNextCandle, isNewPattern ? 500 : 0);

    return () => clearTimeout(timer);
  }, [candles, width, height, animationDelay, showReveal, revealDirection]);

  return (
    <div className="flex items-center justify-center bg-chart-background rounded-lg p-4">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
      />
    </div>
  );
};
