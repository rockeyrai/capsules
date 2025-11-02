"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "./Portfoliofeature2.module.css";

const PortfolioFeature2: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    // smoother scroll sync
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const iniTextSplit = () => {
      const textElements = document.querySelectorAll<HTMLElement>(
        `.${styles["col-3"]} h1, .${styles["col-3"]} p`
      );

      textElements.forEach((element) => {
        // prevent duplicate splits
        if (element.querySelector(`.${styles.line}`)) return;

        const split = new SplitText(element, {
          type: "lines",
          linesClass: styles.line,
        });

        split.lines?.forEach((line) => {
          const el = line as HTMLElement;
          el.innerHTML = `<span>${el.textContent}</span>`;
        });
      });
    };

    iniTextSplit();

    gsap.set(
      `.${styles["col-3"]} .${styles["col-content-wrapper"]} .${styles.line} span`,
      { y: "0%" }
    );
    gsap.set(
      `.${styles["col-3"]} .${styles["col-content-wrapper-2"]} .${styles.line} span`,
      { y: "-125%" }
    );

    let currentPhase = 0;

    ScrollTrigger.create({
      trigger: `.${styles["sticky-cols"]}`,
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // === Phase 1 ===
        if (progress > 0.2 && currentPhase === 0) {
          currentPhase = 1;
          gsap.to(`.${styles["col-1"]}`, {
            opacity: 0,
            scale: 0.75,
            duration: 0.75,
          });
          gsap.to(`.${styles["col-2"]}`, { x: "0%", duration: 0.75 });
          gsap.to(`.${styles["col-3"]}`, { y: "0%", duration: 0.75 });
          gsap.to(`.${styles["col-img-1"]} img`, {
            scale: 1.25,
            duration: 0.75,
          });
          gsap.to(`.${styles["col-img-2"]}`, {
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            duration: 0.75,
          });
          gsap.to(`.${styles["col-img-2"]} img`, { scale: 1, duration: 0.75 });
        }

        // === Phase 2 ===
        if (progress > 0.4 && currentPhase === 1) {
          currentPhase = 2;
          gsap.to(`.${styles["col-2"]}`, {
            opacity: 0,
            scale: 0.75,
            duration: 0.75,
          });
          gsap.to(`.${styles["col-3"]}`, { x: "0%", duration: 0.75 });
          gsap.to(`.${styles["col-4"]}`, { y: "0%", duration: 0.75 });
          gsap.to(
            `.${styles["col-3"]} .${styles["col-content-wrapper"]} .${styles.line} span`,
            {
              y: "-125%",
              duration: 0.75,
            }
          );
          gsap.to(
            `.${styles["col-3"]} .${styles["col-content-wrapper-2"]} .${styles.line} span`,
            {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            }
          );
          gsap.to(`.${styles["col-img-3"]} img`, {
            scale: 1.25,
            duration: 0.75,
          });
        }
        // === Phase 3 ===

        if (progress > 0.6 && currentPhase === 2) {
          currentPhase = 3;
          gsap.to(`.${styles["col-3"]}`, {
            opacity: 0,
            scale: 0.75,
            duration: 0.75,
          });
          gsap.to(`.${styles["col-4"]}`, { x: "0%", duration: 0.75 });
          gsap.to(`.${styles["col-5"]}`, { y: "0%", duration: 0.75 });
          gsap.to(
            `.${styles["col-4"]} .${styles["col-content-wrapper"]} .${styles.line} span`,
            {
              y: "-125%",
              duration: 0.75,
            }
          );
          gsap.to(
            `.${styles["col-4"]} .${styles["col-content-wrapper-2"]} .${styles.line} span`,
            {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            }
          );
          gsap.to(`.${styles["col-img-4"]}`, {
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            duration: 0.75,
          });
          gsap.to(`.${styles["col-img-4"]} img`, { scale: 1, duration: 0.75 });
        }
        // === Reset Phase 0 ===
        if (progress < 0.2 && currentPhase > 0) {
          currentPhase = 0;
          gsap.to(`.${styles["col-1"]}`, {
            opacity: 1,
            scale: 1,
            duration: 0.75,
          });
          gsap.to(`.${styles["col-2"]}`, { x: "100%", duration: 0.75 });
          gsap.to(`.${styles["col-3"]}`, { y: "100%", duration: 0.75 });
          gsap.to(`.${styles["col-img-1"]} img`, { scale: 1, duration: 0.75 });
          gsap.to(`.${styles["col-img-2"]}`, {
            clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
            duration: 0.75,
          });
          gsap.to(`.${styles["col-img-2"]} img`, {
            scale: 1.25,
            duration: 0.75,
          });
        }

        // === Back to Phase 1 ===
        if (progress < 0.4 && currentPhase === 2) {
          currentPhase = 1;
          gsap.to(`.${styles["col-2"]}`, {
            opacity: 1,
            scale: 1,
            duration: 0.75,
          });
          gsap.to(`.${styles["col-3"]}`, { x: "100%", duration: 0.75 });
          gsap.to(`.${styles["col-4"]}`, { y: "100%", duration: 0.75 });
          gsap.to(
            `.${styles["col-3"]} .${styles["col-content-wrapper"]} .${styles.line} span`,
            {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            }
          );
          gsap.to(
            `.${styles["col-3"]} .${styles["col-content-wrapper-2"]} .${styles.line} span`,
            {
              y: "-125%",
              duration: 0.75,
            }
          );
        }

        // === Back to Phase 2 ===
        if (progress < 0.6 && currentPhase === 3) {
          currentPhase = 1;
          gsap.to(`.${styles["col-3"]}`, {
            opacity: 1,
            scale: 1,
            duration: 0.75,
          });
          gsap.to(`.${styles["col-4"]}`, { x: "100%", duration: 0.75 });
          gsap.to(`.${styles["col-5"]}`, { y: "100%", duration: 0.75 });
          gsap.to(
            `.${styles["col-4"]} .${styles["col-content-wrapper"]} .${styles.line} span`,
            {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            }
          );
          gsap.to(
            `.${styles["col-4"]} .${styles["col-content-wrapper-2"]} .${styles.line} span`,
            {
              y: "-125%",
              duration: 0.75,
            }
          );
          gsap.to(`.${styles["col-img-4"]}`, {
            clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
            duration: 0.75,
          });
          gsap.to(`.${styles["col-img-4"]} img`, {
            scale: 1.25,
            duration: 0.75,
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <>
      <section className={`${styles.intro} ${styles.section1}`}>
        <h1 className={styles["col-title"]}>
          Dive into advanced portfolio features designed for smarter investing.{" "}
        </h1>
      </section>

      <section className={`${styles["sticky-cols"]} ${styles.section2}`}>
        <div className={styles["sticky-cols-wrapper"]}>
          {/* Col-1 */}
          <div className={`${styles.col} ${styles["col-1"]}`}>
            <div className={styles["col-content"]}>
              <div className={styles["col-content-wrapper"]}>
                <h1 className={styles["col-title"]}>
                  Automatic Sync with Meroshare
                </h1>
                <p className={styles["col-text"]}>
                  Keep your portfolio up-to-date automatically by syncing with
                  your Meroshare account, so you never miss a market move.
                </p>
              </div>
            </div>
          </div>

          {/* Col-2 */}
          <div className={`${styles.col} ${styles["col-2"]}`}>
            <div className={`${styles["col-img"]} ${styles["col-img-1"]}`}>
              <div className={styles["col-img-wrapper"]}>
                <img src="/hero/image1.jpg" alt="hero" />
              </div>
            </div>
            <div className={`${styles["col-img"]} ${styles["col-img-2"]}`}>
              <div className={styles["col-img-wrapper"]}>
                <img src="/hero/image2.jpg" alt="hero2" />
              </div>
            </div>
          </div>

          {/* Col-3 */}
          <div className={`${styles.col} ${styles["col-3"]}`}>
            <div className={styles["col-content-wrapper"]}>
              <h1 className={styles["col-title"]}>Portfolio Rebalance </h1>
              <p className={styles["col-text"]}>
                Keep your investments aligned with your strategy by
                automatically rebalancing your portfolio.
              </p>
            </div>
            <div className={styles["col-content-wrapper-2"]}>
              <h1 className={styles["col-title"]}>
                Weighted Screener Powered by PortAI
              </h1>
              <p className={styles["col-text"]}>
                Identify high-potential stocks quickly with our AI-powered
                weighted screener.
              </p>
            </div>
          </div>

          {/* Col-4 */}
          <div className={`${styles.col} ${styles["col-4"]}`}>
            <div className={`${styles["col-img"]} ${styles["col-img-3"]}`}>
              <div className={styles["col-img-wrapper"]}>
                <img src="/hero/image3.jpg" alt="3rd image" />
              </div>
            </div>
            <div className={`${styles["col-img"]} ${styles["col-img-4"]}`}>
              <div className={styles["col-img-wrapper"]}>
                <img src="/hero/image4.webp" alt="hero2" />
              </div>
            </div>
          </div>

          {/* Col-5 */}
          <div className={`${styles.col} ${styles["col-5"]}`}>
            <div className={styles["col-content"]}>
              <div className={styles["col-content-wrapper"]}>
                <h1 className={styles["col-title"]}>
                  Automatic Sync with Meroshare
                </h1>
                <p className={styles["col-text"]}>
                  Keep your portfolio up-to-date automatically by syncing with
                  your Meroshare account, so you never miss a market move.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.outro} ${styles.section3}`}>
        <h1>New features coming soon — stay ahead of the market.</h1>
      </section>
    </>
  );
};

// <h1>Travel Back in Time & Copilot Assistance</h1>
// <p className={styles["col-text"]}>
//   Explore past portfolio performance and let Copilot guide your next investment decisions with intelligent insights.
// </p>
export default PortfolioFeature2;
