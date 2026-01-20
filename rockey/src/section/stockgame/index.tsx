// 'use client'
// import { useState, useEffect } from "react";

// import { generateRandomPattern } from "./utils/patternGenerators";
// import { Pattern, Direction } from "./types/candle";
// import { IntroScreen } from "./component/IntroScreen";
// import { GameStats } from "./component/GameStats";
// import { CandlestickChart } from "./component/CandlestickChart";
// import { GameControls } from "./component/GameControls";
// import { ResultFeedback } from "./component/ResultFeedback.";

// type GamePhase = "intro" | "playing" | "waiting" | "result";

// const Index = () => {
//   const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
//   const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
//   const [score, setScore] = useState(0);
//   const [streak, setStreak] = useState(0);
//   const [canSkip, setCanSkip] = useState(true);
//   const [lastResult, setLastResult] = useState<{ isCorrect: boolean; direction: Direction } | null>(null);

//   useEffect(() => {
//     const savedScore = localStorage.getItem("candlestick-score");
//     const savedStreak = localStorage.getItem("candlestick-streak");
//     if (savedScore) setScore(parseInt(savedScore));
//     if (savedStreak) setStreak(parseInt(savedStreak));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("candlestick-score", score.toString());
//     localStorage.setItem("candlestick-streak", streak.toString());
//   }, [score, streak]);

//   const startGame = () => {
//     setGamePhase("playing");
//     loadNextPattern();
//   };

//   const loadNextPattern = () => {
//     setLastResult(null);
//     const pattern = generateRandomPattern();
//     setCurrentPattern(pattern);
//     setGamePhase("playing");
    
//     // Wait for all candles to animate, then allow prediction
//     const totalAnimationTime = pattern.candles.length * 500 + 500;
//     setTimeout(() => {
//       setGamePhase("waiting");
//     }, totalAnimationTime);
//   };

//   const handlePredict = (prediction: Direction) => {
//     if (!currentPattern || gamePhase !== "waiting") return;

//     const isCorrect = prediction === currentPattern.expectedDirection;
    
//     setLastResult({
//       isCorrect,
//       direction: currentPattern.expectedDirection,
//     });

//     if (isCorrect) {
//       setScore(prev => prev + 1);
//       setStreak(prev => prev + 1);
//       setGamePhase("result");
      
//       // Auto-transition to next pattern
//       setTimeout(() => {
//         loadNextPattern();
//       }, 2000);
//     } else {
//       setStreak(0);
//       setGamePhase("result");
      
//       // Reset to intro on wrong answer
//       setTimeout(() => {
//         setGamePhase("intro");
//       }, 2000);
//     }
//   };

//   const handleSkip = () => {
//     if (!canSkip || !currentPattern) return;
//     setCanSkip(false);
    
//     // Show reveal candle before loading next pattern
//     setGamePhase("result");
//     setLastResult({
//       isCorrect: false,
//       direction: currentPattern.expectedDirection,
//     });
    
//     setTimeout(() => {
//       loadNextPattern();
//     }, 2000);
//   };

//   if (gamePhase === "intro") {
//     return <IntroScreen onStart={startGame} />;
//   }

//   return (
//     <div className="min-h-screen bg-background p-6 animate-fade-in">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <GameStats score={score} streak={streak} />

//         <div className="bg-card border border-border rounded-lg p-6">
//           {currentPattern && (
//             <CandlestickChart
//               candles={currentPattern.candles}
//               width={Math.min(window.innerWidth - 100, 800)}
//               height={400}
//               animationDelay={500}
//               showReveal={gamePhase === "result"}
//               revealDirection={lastResult?.direction}
//             />
//           )}
//         </div>

//         {gamePhase === "waiting" && (
//           <div className="text-center space-y-4 animate-fade-in">
//             <p className="text-lg text-muted-foreground">
//               Do you think the price will go UP or DOWN?
//             </p>
//             <GameControls
//               onPredict={handlePredict}
//               onSkip={handleSkip}
//               canSkip={canSkip}
//               disabled={false}
//             />
//           </div>
//         )}

//         {gamePhase === "playing" && (
//           <div className="text-center">
//             <p className="text-lg text-muted-foreground animate-pulse">
//               Watch the pattern form...
//             </p>
//           </div>
//         )}

//         {gamePhase === "result" && lastResult && (
//           <div className="text-center">
//             <ResultFeedback
//               isCorrect={lastResult.isCorrect}
//               correctDirection={lastResult.direction}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Index;


import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  index: number;
}

interface Pattern {
  name: string;
  candles: Candle[];
  direction: 'up' | 'down';
}

type PatternName = 
  | 'Doji' 
  | 'Hammer' 
  | 'Hanging Man' 
  | 'Bullish Engulfing' 
  | 'Bearish Engulfing'
  | 'Morning Star' 
  | 'Evening Star' 
  | 'Shooting Star' 
  | 'Inverted Hammer'
  | 'Three White Soldiers' 
  | 'Three Black Crows' 
  | 'Piercing Pattern'
  | 'Dark Cloud Cover' 
  | 'Spinning Top' 
  | 'Marubozu';

const CandlestickGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [usedSkip, setUsedSkip] = useState(false);
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [displayedCandles, setDisplayedCandles] = useState<Candle[]>([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const generatePattern = (patternName: PatternName): Pattern => {
    const basePrice = 100 + Math.random() * 50;
    let candles: Candle[] = [];
    let direction: 'up' | 'down' = 'up';

    switch (patternName) {
      case 'Doji':
        candles = [
          { open: basePrice, high: basePrice + 2, low: basePrice - 2, close: basePrice + 0.1, index: 0 }
        ];
        direction = Math.random() > 0.5 ? 'up' : 'down';
        break;

      case 'Hammer':
        candles = [
          { open: basePrice, high: basePrice + 1, low: basePrice - 5, close: basePrice - 0.5, index: 0 }
        ];
        direction = 'up';
        break;

      case 'Hanging Man':
        candles = [
          { open: basePrice + 5, high: basePrice + 6, low: basePrice, close: basePrice + 5.5, index: 0 }
        ];
        direction = 'down';
        break;

      case 'Bullish Engulfing':
        candles = [
          { open: basePrice + 3, high: basePrice + 3.5, low: basePrice - 1, close: basePrice, index: 0 },
          { open: basePrice - 0.5, high: basePrice + 5, low: basePrice - 1.5, close: basePrice + 4.5, index: 1 }
        ];
        direction = 'up';
        break;

      case 'Bearish Engulfing':
        candles = [
          { open: basePrice, high: basePrice + 3, low: basePrice - 0.5, close: basePrice + 2.5, index: 0 },
          { open: basePrice + 3, high: basePrice + 3.5, low: basePrice - 2, close: basePrice - 1.5, index: 1 }
        ];
        direction = 'down';
        break;

      case 'Morning Star':
        candles = [
          { open: basePrice + 5, high: basePrice + 5.5, low: basePrice + 1, close: basePrice + 1.5, index: 0 },
          { open: basePrice + 1, high: basePrice + 1.5, low: basePrice, close: basePrice + 0.5, index: 1 },
          { open: basePrice + 1, high: basePrice + 6, low: basePrice + 0.5, close: basePrice + 5.5, index: 2 }
        ];
        direction = 'up';
        break;

      case 'Evening Star':
        candles = [
          { open: basePrice, high: basePrice + 4, low: basePrice - 0.5, close: basePrice + 3.5, index: 0 },
          { open: basePrice + 4, high: basePrice + 5, low: basePrice + 3.5, close: basePrice + 4.5, index: 1 },
          { open: basePrice + 4, high: basePrice + 4.5, low: basePrice - 1, close: basePrice, index: 2 }
        ];
        direction = 'down';
        break;

      case 'Shooting Star':
        candles = [
          { open: basePrice + 5, high: basePrice + 10, low: basePrice + 4.5, close: basePrice + 5.5, index: 0 }
        ];
        direction = 'down';
        break;

      case 'Inverted Hammer':
        candles = [
          { open: basePrice, high: basePrice + 5, low: basePrice - 0.5, close: basePrice + 0.5, index: 0 }
        ];
        direction = 'up';
        break;

      case 'Three White Soldiers':
        candles = [
          { open: basePrice, high: basePrice + 2.5, low: basePrice - 0.5, close: basePrice + 2, index: 0 },
          { open: basePrice + 2.5, high: basePrice + 5, low: basePrice + 2, close: basePrice + 4.5, index: 1 },
          { open: basePrice + 5, high: basePrice + 7.5, low: basePrice + 4.5, close: basePrice + 7, index: 2 }
        ];
        direction = 'up';
        break;

      case 'Three Black Crows':
        candles = [
          { open: basePrice + 7, high: basePrice + 7.5, low: basePrice + 5, close: basePrice + 5.5, index: 0 },
          { open: basePrice + 5, high: basePrice + 5.5, low: basePrice + 2.5, close: basePrice + 3, index: 1 },
          { open: basePrice + 2.5, high: basePrice + 3, low: basePrice, close: basePrice + 0.5, index: 2 }
        ];
        direction = 'down';
        break;

      case 'Piercing Pattern':
        candles = [
          { open: basePrice + 5, high: basePrice + 5.5, low: basePrice + 1, close: basePrice + 1.5, index: 0 },
          { open: basePrice, high: basePrice + 4, low: basePrice - 0.5, close: basePrice + 3.5, index: 1 }
        ];
        direction = 'up';
        break;

      case 'Dark Cloud Cover':
        candles = [
          { open: basePrice, high: basePrice + 4, low: basePrice - 0.5, close: basePrice + 3.5, index: 0 },
          { open: basePrice + 5, high: basePrice + 5.5, low: basePrice + 1, close: basePrice + 1.5, index: 1 }
        ];
        direction = 'down';
        break;

      case 'Spinning Top':
        candles = [
          { open: basePrice + 2, high: basePrice + 4, low: basePrice, close: basePrice + 2.5, index: 0 }
        ];
        direction = Math.random() > 0.5 ? 'up' : 'down';
        break;

      case 'Marubozu':
        const bullish = Math.random() > 0.5;
        if (bullish) {
          candles = [
            { open: basePrice, high: basePrice + 5, low: basePrice, close: basePrice + 5, index: 0 }
          ];
          direction = 'up';
        } else {
          candles = [
            { open: basePrice + 5, high: basePrice + 5, low: basePrice, close: basePrice, index: 0 }
          ];
          direction = 'down';
        }
        break;
    }

    return { name: patternName, candles, direction };
  };

  const patterns: PatternName[] = [
    'Doji', 'Hammer', 'Hanging Man', 'Bullish Engulfing', 'Bearish Engulfing',
    'Morning Star', 'Evening Star', 'Shooting Star', 'Inverted Hammer',
    'Three White Soldiers', 'Three Black Crows', 'Piercing Pattern',
    'Dark Cloud Cover', 'Spinning Top', 'Marubozu'
  ];

  const startNewRound = () => {
    setFeedback('');
    setShowPrediction(false);
    setDisplayedCandles([]);
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const pattern = generatePattern(randomPattern);
    setCurrentPattern(pattern);
    
    setIsAnimating(true);
    let candleIndex = 0;
    
    const animateCandles = () => {
      if (candleIndex < pattern.candles.length) {
        setDisplayedCandles(prev => [...prev, pattern.candles[candleIndex]]);
        candleIndex++;
        animationRef.current = setTimeout(animateCandles, 600);
      } else {
        setIsAnimating(false);
        setShowPrediction(true);
      }
    };
    
    animateCandles();
  };

  const handlePrediction = (prediction: 'up' | 'down') => {
    if (!currentPattern || isAnimating) return;
    
    const correct = prediction === currentPattern.direction;
    
    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFeedback('✅ Correct!');
    } else {
      setStreak(0);
      setFeedback(`❌ Wrong! It went ${currentPattern.direction.toUpperCase()}`);
    }
    
    setShowPrediction(false);
    
    setTimeout(() => {
      setCountdown(3);
      const countInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(countInterval);
            setCountdown(null);
            startNewRound();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleSkip = () => {
    if (!usedSkip && !isAnimating) {
      setUsedSkip(true);
      setFeedback('⏭️ Skipped');
      setShowPrediction(false);
      setTimeout(() => {
        startNewRound();
      }, 1000);
    }
  };

  useEffect(() => {
    if (!svgRef.current || displayedCandles.length === 0) return;

    // Validate that all candles have required properties
    const validCandles = displayedCandles.filter(
      d => d && typeof d.high === 'number' && typeof d.low === 'number' && 
           typeof d.open === 'number' && typeof d.close === 'number'
    );

    if (validCandles.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const allPrices = validCandles.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...allPrices) - 2;
    const maxPrice = Math.max(...allPrices) + 2;

    const xScale = d3.scaleBand()
      .domain(validCandles.map(d => d.index.toString()))
      .range([0, chartWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([minPrice, maxPrice])
      .range([chartHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale)
        .tickSize(-chartWidth)
        .tickFormat(() => ''));

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('fill', '#64748b');

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .style('fill', '#64748b');

    // Candles
    const candleWidth = xScale.bandwidth();

    validCandles.forEach((candle, i) => {
      const x = xScale(candle.index.toString())! + candleWidth / 2;
      const isBullish = candle.close > candle.open;
      const color = isBullish ? '#10b981' : '#ef4444';

      // High-Low line (wick)
      const wick = g.append('line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', yScale(candle.high))
        .attr('y2', yScale(candle.low))
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('opacity', 0);

      wick.transition()
        .duration(300)
        .delay(i * 50)
        .attr('opacity', 1);

      // Body
      const bodyHeight = Math.abs(yScale(candle.open) - yScale(candle.close));
      const bodyY = Math.min(yScale(candle.open), yScale(candle.close));

      const body = g.append('rect')
        .attr('x', x - candleWidth / 3)
        .attr('y', bodyY)
        .attr('width', (candleWidth * 2) / 3)
        .attr('height', Math.max(bodyHeight, 1))
        .attr('fill', isBullish ? color : color)
        .attr('stroke', color)
        .attr('stroke-width', 1)
        .attr('rx', 2)
        .attr('opacity', 0);

      body.transition()
        .duration(300)
        .delay(i * 50 + 100)
        .attr('opacity', 0.9);
    });

  }, [displayedCandles]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  if (!isPlaying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center p-8 bg-slate-800 rounded-xl shadow-2xl max-w-md mx-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Candlestick Prediction Game
          </h1>
          <p className="text-slate-300 mb-8 text-lg leading-relaxed">
            Predict whether the next pattern will move up or down. Watch live candles form just like a real stock chart.
          </p>
          <button
            onClick={() => {
              setIsPlaying(true);
              setTimeout(() => startNewRound(), 300);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex gap-6">
            <div>
              <span className="text-slate-400 text-sm">Score</span>
              <div className="text-2xl font-bold text-white">{score}</div>
            </div>
            <div>
              <span className="text-slate-400 text-sm">Streak</span>
              <div className="text-2xl font-bold text-orange-400">{streak}</div>
            </div>
          </div>
          <button
            onClick={handleSkip}
            disabled={usedSkip || isAnimating}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              usedSkip || isAnimating
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {usedSkip ? 'Skip Used' : 'Skip (1x)'}
          </button>
        </div>

        {/* Chart */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
          <svg
            ref={svgRef}
            width="100%"
            height="400"
            viewBox="0 0 600 400"
            className="w-full"
          />
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="text-center mb-4">
            <div className="inline-block bg-slate-800 px-6 py-3 rounded-lg shadow-lg">
              <span className="text-2xl font-bold text-white">{feedback}</span>
            </div>
          </div>
        )}

        {/* Countdown */}
        {countdown !== null && (
          <div className="text-center mb-4">
            <div className="inline-block bg-slate-700 px-6 py-3 rounded-lg shadow-lg">
              <span className="text-xl text-slate-300">
                Next round in {countdown}...
              </span>
            </div>
          </div>
        )}

        {/* Prediction Buttons */}
        {showPrediction && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handlePrediction('up')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-lg transition-all transform hover:scale-105 shadow-lg text-xl"
            >
              ⬆️ Predict UP
            </button>
            <button
              onClick={() => handlePrediction('down')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg transition-all transform hover:scale-105 shadow-lg text-xl"
            >
              ⬇️ Predict DOWN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandlestickGame;