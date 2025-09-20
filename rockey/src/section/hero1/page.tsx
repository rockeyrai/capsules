"use client";

import { ArrowRight, Menu } from "lucide-react";
import React, { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import "./Hero1Module.css";
const HeroOne: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(SplitText);

    document.fonts.ready.then(() => {
      function createSplitTexts(
        elements: { key: string; selector: string; type: "chars" | "lines" }[]
      ) {
        const splits: Record<string, any> = {};
        elements.forEach(({ key, selector, type }) => {
          const config: any = { type, mask: type };
          if (type === "chars") config.charsClass = "char";
          if (type === "lines") config.linesClass = "line";
          splits[key] = SplitText.create(selector, config);
        });
        return splits;
      }

      const splitElements = [
        { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
        { key: "footerLines", selector: ".preloader-footer p", type: "lines" },
        { key: "headerChars", selector: ".header h1", type: "chars" },
        { key: "heroFooterH3", selector: ".hero-footer h3", type: "lines" },
        { key: "heroFooterP", selector: ".hero-footer p", type: "lines" },
        { key: "btnLabels", selector: ".btn-label span", type: "lines" },
      ] as const;

      const splits = createSplitTexts(splitElements);

      // Initial states
      gsap.set(splits.logoChars.chars, { x: "100%" });
      gsap.set(
        [
          splits.footerLines.lines,
          splits.headerChars.chars,
          splits.heroFooterH3.lines,
          splits.heroFooterP.lines,
          splits.btnLabels.lines,
        ],
        { y: "100%" }
      );
      gsap.set(".btn-icon", { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(".btn", { scale: 0 });

      function animateProgress(duration = 4) {
        const tl = gsap.timeline();
        const counterSteps = 5;
        let currentProgress = 0;

        for (let i = 0; i < counterSteps; i++) {
          const finalStep = i === counterSteps - 1;
          const targetProgress = finalStep
            ? 1
            : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
          currentProgress = targetProgress;

          tl.to(".preloader-progress-bar", {
            scaleX: targetProgress,
            duration: duration / counterSteps,
            ease: "power2.out",
          });
        }
        return tl;
      }

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(splits.logoChars.chars, {
        x: "0%",
        stagger: 0.05,
        duration: 1,
        ease: "power4.inOut",
      })
        .to(
          splits.footerLines.lines,
          {
            y: "0%",
            stagger: 0.1,
            duration: 1,
            ease: "power4.inOut",
          },
          "0.25"
        )
        .add(animateProgress(), "<")
        .set(".preloader-progress", { backgroundColor: "var(--base-300)" })
        .to(
          splits.logoChars.chars,
          {
            x: "-100%",
            stagger: 0.05,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.5"
        )
        .to(
          splits.footerLines.lines,
          {
            y: "-100%",
            stagger: 0.1,
            duration: 1,
            ease: "power4.inOut",
          },
          "<"
        )
        .to(
          ".preloader-progress",
          {
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          ".preloader-mask",
          {
            scale: 5,
            duration: 3,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          ".hero-img",
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          splits.headerChars.chars,
          {
            y: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out",
          },
          "-=2"
        )
        .to(
          [splits.heroFooterH3.lines, splits.heroFooterP.lines],
          {
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out",
          },
          "-=1.5"
        )
        .to(".btn", {
          scale: 1,
          duration: 1,
          ease: "power4.out",
          onStart: () => {
            gsap
              .timeline()
              .to(".btn-icon", {
                clipPath: "circle(100% at 50% 50%)",
                duration: 1,
                ease: "power2.out",
                delay: -1.25,
              })
              .to(splits.btnLabels.lines, {
                y: 0,
                duration: 1,
                ease: "power4.out",
                delay: -1.25,
              });
          },
        });
    });
  }, []);

  return (
    <>
      <div className="preloader-progress">
        <div className="preloader-progress-bar"></div>
        <div className="preloader-logo">
          <h1>Obsidian</h1>
        </div>
      </div>
      <div className="preloader-mask"></div>
      <div className="preloader-content">
        <div className="preloader-footer">
          <p>
            Space unfolds in light and shadow, where structure finds its quiet
            rhythm, and time aligns in harmony.
          </p>
        </div>
      </div>
      <div className="containers">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-img">
              <img src="/hero/image1.jpg" alt="hero" />
            </div>
            <div className="hero-content">
              <div className="header">
                <h1>Obsidian</h1>
              </div>
              <div className="contact-btn">
                <div className="btn">
                  <div className="btn-label">
                    <span>Contact</span>
                  </div>
                  <div className="btn-icon">
                    <ArrowRight className="arrow-forward-sharp" />
                  </div>
                </div>
              </div>
              <div className="menu-btn">
                <div className="btn">
                  <div className="btn-label">
                    <span>Menu</span>
                  </div>
                  <div className="btn-icon">
                    <Menu className="menu-sharp" />
                  </div>
                </div>
              </div>
              <div className="hero-footer">
                <h3>Space defined through light and silence</h3>
                <p>
                  Geometry and balance converge, creating environments that
                  breathe with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeroOne;
