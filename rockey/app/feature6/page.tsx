"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./feature6Module.css";

const Feature6: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // ✅ Lenis smooth scroll
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ✅ SplitText initialization
    const iniTextSplit = () => {
      const textElements = document.querySelectorAll<HTMLElement>(
        ".col-3 h1, .col-3 p"
      );

      textElements.forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "line",
        });

        split.lines?.forEach((line: HTMLElement) => {
          line.innerHTML = `<span>${line.textContent}</span>`;
        });
      });
    };

    iniTextSplit();

    // Initial GSAP states
    gsap.set(".col-3 .col-content-wrapper .line span", { y: "0%" });
    gsap.set(".col-3 .col-content-wrapper-2 .line span", { y: "-125%" });

    let currentPhase = 0;

    // ScrollTrigger setup
    ScrollTrigger.create({
      trigger: ".sticky-cols",
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // ✅ Phase 1
        if (progress > 0.25 && currentPhase === 0) {
          currentPhase = 1;
          gsap.to(".col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to(".col-2", { x: "0%", duration: 0.75 });
          gsap.to(".col-3", { y: "0%", duration: 0.75 });
          gsap.to(".col-img-1 img", { scale: 1.25, duration: 0.75 });
          gsap.to(".col-img-2", {
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            duration: 0.75,
          });
          gsap.to(".col-img-2 img", { scale: 1, duration: 0.75 });
        }

        // ✅ Phase 2
        if (progress > 0.5 && currentPhase === 1) {
          currentPhase = 2;
          gsap.to(".col-2", { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to(".col-3", { x: "0%", duration: 0.75 });
          gsap.to(".col-4", { y: "0%", duration: 0.75 });
          gsap.to(".col-3 .col-content-wrapper .line span", {
            y: "-125%",
            duration: 0.75,
          });
          gsap.to(".col-3 .col-content-wrapper-2 .line span", {
            y: "0%",
            duration: 0.75,
            delay: 0.5,
          });
        }

        // ✅ Reset to Phase 0
        if (progress < 0.25 && currentPhase > 0) {
          currentPhase = 0;
          gsap.to(".col-1", { opacity: 1, scale: 1, duration: 0.75 });
          gsap.to(".col-2", { x: "100%", duration: 0.75 });
          gsap.to(".col-3", { y: "100%", duration: 0.75 });
          gsap.to(".col-img-1 img", { scale: 1, duration: 0.75 });
          gsap.to(".col-img-2", {
            clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
            duration: 0.75,
          });
          gsap.to(".col-img-2 img", { scale: 1.25, duration: 0.75 });
        }

        // ✅ Back to Phase 1
        if (progress < 0.5 && currentPhase === 2) {
          currentPhase = 1;
          gsap.to(".col-2", { opacity: 1, scale: 1, duration: 0.75 });
          gsap.to(".col-3", { x: "100%", duration: 0.75 });
          gsap.to(".col-4", { y: "100%", duration: 0.75 });
          gsap.to(".col-3 .col-content-wrapper .line span", {
            y: "0%",
            duration: 0.75,
            delay: 0.5,
          });
          gsap.to(".col-3 .col-content-wrapper-2 .line span", {
            y: "-125%",
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
      <section className="intro">
        <h1>We create modern interiors that feel effortlessly personal</h1>
      </section>

      <section className="sticky-cols">
        <div className="sticky-cols-wrapper">
          {/* Col-1 */}
          <div className="col col-1">
            <div className="col-content">
              <div className="col-content-wrapper">
                <h1>We design spaces where comfort meets quiet sophistication.</h1>
                <p>
                  Layered textures, rich tones, and thoughtful details come
                  together to create interiors that feel lived-in yet elevated.
                </p>
              </div>
            </div>
          </div>

          {/* Col-2 */}
          <div className="col col-2">
            <div className="col-img col-img-1">
              <div className="col-img-wrapper">
                <img src="/hero/image1.jpg" alt="hero" />
              </div>
            </div>
            <div className="col-img col-img-2">
              <div className="col-img-wrapper">
                <img src="/hero/image2.jpg" alt="hero2" />
              </div>
            </div>
          </div>

          {/* Col-3 */}
          <div className="col col-3">
            <div className="col-content-wrapper">
              <h1>Our interiors are crafted to feel as calm as they look</h1>
              <p>
                Each space is designed with intentional balance between warmth
                and modernity.
              </p>
            </div>
            <div className="col-content-wrapper-2">
              <h1>
                Every detail is chosen to bring ease and elegance into your
                space.
              </h1>
              <p>
                From custom furnishings to ambient lighting, we shape
                environments that reflect your lifestyle.
              </p>
            </div>
          </div>

          {/* Col-4 */}
          <div className="col col-4">
            <div className="col-img">
              <div className="col-img-wrapper">
                <img src="/hero/image3.jpg" alt="3rd image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Timeless design begins with a conversation</h1>
      </section>
    </>
  );
};

export default Feature6;
