import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SVGComponent from "./perdotsvg";

const AnimatedSVG: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const allPaths = gsap.utils.toArray<SVGElement>("#animatedLogo path");
      const boxes = gsap.utils.toArray<HTMLElement>(".info-box");


      // GPU optimization
      gsap.set(["#animatedLogo", ".info-box"], {
        willChange: "transform, opacity",
      });

      // Hide boxes initially
      gsap.set(boxes, {
        opacity: 0,
        scale: 0.6,
        y: 30,
        display: "block",
      });

      // Scatter SVG start state
      gsap.set(allPaths, {
        x: () => gsap.utils.random(-600, 600),
        y: () => gsap.utils.random(-400, 400),
        scale: () => gsap.utils.random(0.1, 0.4),
        rotate: () => gsap.utils.random(-180, 180),
        opacity: 0,
        transformOrigin: "center center",
      });

      // Main intro timeline
      const tl = gsap.timeline();

      tl.to(allPaths, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 3,
        ease: "power3.out",
        stagger: {
          amount: 1.5,
          from: "random",
        },
      })
        // Initial glow
        .to(
          "#animatedLogo",
          {
            filter:
              "drop-shadow(0 0 12px #00ff66) drop-shadow(0 0 100px #00ff66)",
            duration: 1.5,
            ease: "power2.out",
          },
          "-=1"
        )
        // Floating effect
        .to(
          "#animatedLogo",
          {
            y: "+=20",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          },
          ">-0.2"
        )
        // Reveal boxes
        .to(
          boxes,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 2,
            ease: "back.out(1.7)",
            stagger: 0.25,
          },
          "-=1"
        )
        // Floating motion for boxes
        .add(() => {
          console.log("Boxes visible - starting random float motion");

          boxes.forEach((box) => {
            const distance = gsap.utils.random(5, 15); // random float distance
            const duration = gsap.utils.random(1.8, 3.2); // random speed
            const delay = gsap.utils.random(0, 0.5); // random start delay
            const direction = Math.random() > 0.5 ? "+=" : "-="; // random direction

            gsap.to(box, {
              y: `${direction}${distance}`,
              repeat: -1,
              yoyo: true,
              duration,
              ease: "sine.inOut",
              delay,
            });
          });
        })

        // Continuous glowing pulse for SVG (dim <-> bright)
        .add(() => {
          gsap.to("#animatedLogo", {
            filter:
              "drop-shadow(0 0 8px #00ff66) drop-shadow(0 0 110px #00ff66)",
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            // scale:1.03
          });
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
          border: "1px rgba(0, 255, 102, 0.2) solid",
          //   boxShadow: "0 0 20px rgba(0, 255, 102, 0.2)",
          width: "220px",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          top: "30%",
          left: "13%",
        }}
      >
        <h1
          style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}
        >
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
        <h1
          style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}
        >
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
        <h1
          style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}
        >
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
        <h1
          style={{ fontSize: "1.1rem", color: "#00ff88", marginBottom: "8px" }}
        >
          Capital Analytica
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.3" }}>
          A tool designed for capital and investment analysis.
        </p>
      </div>

      {/* SVG */}
      <div style={{ zIndex: 2 }}>
        <SVGComponent id="animatedLogo" />
      </div>
    </div>
  );
};

export default AnimatedSVG;
