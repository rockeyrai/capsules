"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import styles from "./PortfolioHero1.module.css";
import PortfolioFeature1 from "../Portfoliofeature1";
import { ArrowRightCircle } from "lucide-react";
import PortfolioFeature2 from "../PortfolioFeature2/page";
import Feature9 from "@/src/section/feature9";

const PortfolioHeroOne: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(SplitText);

    document.fonts.ready.then(() => {
      function createSplitTexts(
        elements: readonly {
          key: string;
          selector: string;
          type: "chars" | "lines";
        }[]
      ) {
        const splits: Record<string, any> = {};
        elements.forEach(({ key, selector, type }) => {
          const config: any = { type, mask: type };
          if (type === "chars") config.charsClass = styles.hero1Char;
          if (type === "lines") config.linesClass = styles.hero1Line;
          splits[key] = SplitText.create(selector, config);
        });
        return splits;
      }

      const splitElements: {
        key: string;
        selector: string;
        type: "lines" | "chars";
      }[] = [
        {
          key: "logoChars",
          selector: `.${styles.hero1PreloaderLogo} h1`,
          type: "chars",
        },
        {
          key: "footerLines",
          selector: `.${styles.hero1PreloaderFooter} p`,
          type: "lines",
        },
        {
          key: "headerChars",
          selector: `.${styles.hero1Header} h1`,
          type: "chars",
        },
        {
          key: "heroFooterH3",
          selector: `.${styles.hero1Footer} h3`,
          type: "lines",
        },
        {
          key: "heroFooterP",
          selector: `.${styles.hero1Footer} p`,
          type: "lines",
        },
        {
          key: "btnLabels",
          selector: `.${styles.hero1BtnLabel} span`,
          type: "lines",
        },
      ];

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
      gsap.set(`.${styles.hero1BtnIcon}`, {
        clipPath: "circle(0% at 50% 50%)",
      });
      gsap.set(`.${styles.hero1Btn}`, { scale: 0 });
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

          tl.to(`.${styles.hero1PreloaderProgressBar}`, {
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
        .set(`.${styles.hero1PreloaderProgress}`, {
          backgroundColor: "var(--base-300)",
        })
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
          `.${styles.hero1PreloaderProgress}`,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          `.${styles.hero1PreloaderMask}`,
          {
            scale: 10,
            duration: 3,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          `.${styles.hero1Img}`,
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
        .to(`.${styles.hero1Btn}`, {
          scale: 1,
          duration: 1,
          ease: "power4.out",
          onStart: () => {
            gsap
              .timeline()
              .to(`.${styles.hero1BtnIcon}`, {
                clipPath: "circle(100% at 50% 50%)",
                duration: 1,
                ease: "power2.out",
                delay: -1.1,
              })
              .to(splits.btnLabels.lines, {
                y: 0,
                duration: 1,
                ease: "power4.out",
                delay: -1.1,
              });
          },
        });
    });
  }, []);

  return (
    <>
      <div className={styles.hero1PreloaderProgress}>
        <div className={styles.hero1PreloaderProgressBar}></div>
        <div className={styles.hero1PreloaderLogo}>
          <h1>PORTFOLIO NEPAL</h1>
        </div>
      </div>
      <div className={styles.hero1PreloaderMask}></div>
      <div className={styles.hero1PreloaderContent}>
        <div className={styles.hero1PreloaderFooter}>
          <p>
            Empowering investors to track, analyze, and grow their wealth
            through insight and precision.
          </p>
        </div>
      </div>
      <div className={styles.heroContainers}>
        <section className={styles.hero1}>
          <div className={styles.hero1Inner}>
            <div className={styles.hero1Img}>
              <img src="/hero/bull_background.png" alt="hero1" />
            </div>
            <div className={styles.hero1Content}>
              <div className={styles.hero1Header}>
                <div className="flex  items-center gap-2 ">
                  <img
                    src="/portfolio.png"
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  <h1>Portfolio Nepal</h1>
                </div>

                <p>Where precision meets simplicity in portfolio management</p>
              </div>
              <div className={styles.hero1Footer}>
                <h3>Every number tells a story — read yours with Portfolio Nepal.</h3>
                <p>
                  Track your assets, monitor performance, and make data-driven
                  investment decisions — all in one place.
                </p>
              </div>

              <div className={styles.hero1MenuHeroBtn}>
                <div className={styles.hero1Btn}>
                  <div className={styles.hero1BtnLabel}>
                    <span>Try Demo</span>
                  </div>
                  <div className={styles.hero1BtnIcon}>
                    <ArrowRightCircle className={styles.hero1MenuSharp} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PortfolioFeature2/>
        <PortfolioFeature1 />
      </div>
    </>
  );
};

export default PortfolioHeroOne;
