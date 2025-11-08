import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SVGComponent from "./perdotsvg"

const AnimatedSVG: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
const allPaths = gsap.utils.toArray<SVGElement>("#animatedLogo path");

      const boxes = gsap.utils.toArray<HTMLElement>(".info-box");

      console.log("Found paths:", allPaths.length);
      console.log("Found boxes:", boxes.length);

      // Initially hide boxes
      gsap.set(boxes, {
        opacity: 0,
        scale: 0.6,
        y: 30,
        display: "block"
      });

      // Scatter start for SVG
      gsap.set(allPaths, {
        x: () => gsap.utils.random(-600, 600),
        y: () => gsap.utils.random(-400, 400),
        scale: () => gsap.utils.random(0.1, 0.4),
        rotate: () => gsap.utils.random(-180, 180),
        opacity: 0,
        transformOrigin: "center center",
      });

      // Animate SVG to final form
      gsap.to(allPaths, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 3.2,
        ease: "power3.out",
        stagger: {
          amount: 1.5,
          from: "random",
        },
        onComplete: () => {
          console.log("SVG animation complete - showing boxes");

          // Glow + float for SVG
          gsap.to("#animatedLogo", {
            filter: "drop-shadow(0 0 25px #00ff66) drop-shadow(0 0 60px #00ff66)",
            duration: 0.8,
            ease: "power2.out",
          });

          gsap.to("#animatedLogo", {
            y: "+=20",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          });

          // Show and animate boxes one by one
          gsap.to(boxes, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.4,
            delay: 0.5,
            onStart: () => {
              console.log("Starting box animations");
            },
            onComplete: () => {
              console.log("Boxes visible - starting floating motion");

              // Alternating up/down floating motion
              boxes.forEach((box, i) => {
                gsap.to(box, {
                  y: i % 2 === 0 ? "-=5" : "+=5",
                  repeat: -1,
                  yoyo: true,
                  duration: 2.2 + i * 0.2,
                  ease: "sine.inOut",
                });
              });
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Boxes */}
      <div
        className="info-box box-1"
        style={{
          position: "absolute",
          display: "none",
          background: "rgba(15, 15, 15, 0.85)",
          padding: "16px 20px",
          borderRadius: "12px",
          border:"1px rgba(0, 255, 102, 0.2) solid",
        //   boxShadow: "0 0 20px rgba(0, 255, 102, 0.2)",
          width: "220px",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          top: "30%",
          left: "13%",
        }}
      >
        <h1 style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}>
          Stock Analytical Tool
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.3" }}>
          Saral Lagani, a powerful tool to analyze stocks from NEPSE.
        </p>
      </div>

      <div
        className="info-box box-2"
        style={{
          position: "absolute",
          display: "none",
          background: "rgba(15, 15, 15, 0.85)",
          padding: "16px 20px",
          borderRadius: "12px",
        //   boxShadow: "0 0 20px rgba(0, 255, 102, 0.2)",
          width: "220px",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          bottom: "20%",
          left: "20%",
        }}
      >
        <h1 style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}>
          API Service
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.3" }}>
          API to get data of all the companies in the stock market.
        </p>
      </div>

      <div
        className="info-box box-3"
        style={{
          position: "absolute",
          display: "none",
          background: "rgba(15, 15, 15, 0.85)",
          padding: "16px 20px",
          borderRadius: "12px",
        //   boxShadow: "0 0 20px rgba(0, 255, 102, 0.2)",
          width: "220px",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          top: "20%",
          right: "18%",
        }}
      >
        <h1 style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}>
          Broker Analytica
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.3" }}>
          An analytical tool for clients based on their needs.
        </p>
      </div>

      <div
        className="info-box box-4"
        style={{
          position: "absolute",
          display: "none",
          background: "rgba(15, 15, 15, 0.85)",
          padding: "16px 20px",
          borderRadius: "12px",
        //   boxShadow: "0 0 20px rgba(0, 255, 102, 0.2)",
          width: "220px",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          bottom: "20%",
          right: "22%",
        }}
      >
        <h1 style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}>
          Capital Analytica
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.3" }}>
          A tool designed for capital and investment analysis.
        </p>
      </div>

      {/* SVG */}
      <div style={{ zIndex: 2 }}>
        <SVGComponent id="animatedLogo"/>
      </div>
    </div>
  );
};

export default AnimatedSVG;
