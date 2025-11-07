"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Lenis from "@studio-freight/lenis";
import "./Feature8module.css";
const Feature8: React.FC = () => {
  const pinnedMarqueeImgCloneRef = useRef<HTMLImageElement | null>(null);
  const isImgCloneActiveRef = useRef(false);
  const flipAnimationRef = useRef<gsap.core.Animation | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    // Lenis smooth scrolling setup
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Get colors from CSS variables
    const lightColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--light")
        .trim() || "#edf1e8";
    const darkColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--dark")
        .trim() || "#101010";

    const interpolateColor = (color1: string, color2: string, factor: number) =>
      gsap.utils.interpolate(color1, color2, factor);

    // Horizontal marquee movement
    gsap.to(".marquee-images", {
      scrollTrigger: {
        trigger: ".marquee",
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const xPosition = -75 + progress * 25;
          gsap.set(".marquee-images", {
            x: `${xPosition}%`,
          });
        },
      },
    });

    // Create pinned image clone
    const createPinnedMarqueeImgClone = () => {
      if (isImgCloneActiveRef.current) return;

      const originalMarqueeImg = document.querySelector<HTMLImageElement>(
        ".marquee-img.pin img"
      );
      if (!originalMarqueeImg) return;

      const rect = originalMarqueeImg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clone = originalMarqueeImg.cloneNode(true) as HTMLImageElement;
      pinnedMarqueeImgCloneRef.current = clone;

      gsap.set(clone, {
        position: "fixed",
        left: centerX - originalMarqueeImg.offsetWidth / 2 + "px",
        top: centerY - originalMarqueeImg.offsetHeight / 2 + "px",
        width: originalMarqueeImg.offsetWidth + "px",
        height: originalMarqueeImg.offsetHeight + "px",
        transform: "rotate(-5deg)",
        transformOrigin: "center center",
        pointerEvents: "none",
        willChange: "transform",
        zIndex: 100,
      });

      document.body.appendChild(clone);
      gsap.set(originalMarqueeImg, { opacity: 0 });
      isImgCloneActiveRef.current = true;
    };

    // Remove pinned image clone
    const removePinnedMarqueeImgClone = () => {
      if (!isImgCloneActiveRef.current) return;

      const clone = pinnedMarqueeImgCloneRef.current;
      if (clone) {
        clone.remove();
        pinnedMarqueeImgCloneRef.current = null;
      }

      const originalMarqueeImg = document.querySelector<HTMLImageElement>(
        ".marquee-img.pin img"
      );
      if (originalMarqueeImg) {
        gsap.set(originalMarqueeImg, { opacity: 1 });
      }

      isImgCloneActiveRef.current = false;
    };

    // ScrollTriggers setup
    ScrollTrigger.create({
      trigger: ".horizontal-scroll",
      start: "top top",
      end: () => `+=${window.innerHeight * 5}`,
      pin: true,
    });

    ScrollTrigger.create({
      trigger: ".marquee",
      start: "top top",
      onEnter: createPinnedMarqueeImgClone,
      onEnterBack: createPinnedMarqueeImgClone,
      onLeaveBack: removePinnedMarqueeImgClone,
    });

    ScrollTrigger.create({
      trigger: ".horizontal-scroll",
      start: "top 50%",
      end: () => `+=${window.innerHeight * 5.5}`,
      onEnter: () => {
        const clone = pinnedMarqueeImgCloneRef.current;
        if (clone && isImgCloneActiveRef.current && !flipAnimationRef.current) {
          const state = Flip.getState(clone);

          gsap.set(clone, {
            position: "fixed",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100svh",
            transform: "rotate(0deg)",
            transformOrigin: "center center",
          });

          flipAnimationRef.current = Flip.from(state, {
            duration: 1,
            ease: "none",
            paused: true,
          });
        }
      },
      onLeaveBack: () => {
        if (flipAnimationRef.current) {
          flipAnimationRef.current.kill();
          flipAnimationRef.current = null;
        }
        gsap.set(".container", { backgroundColor: lightColor });
        gsap.set(".horizontal-scroll-wrapper", { x: "0%" });
      },
      onUpdate: (self) => {
        const progress = self.progress;
        const flipAnimation = flipAnimationRef.current;
        const clone = pinnedMarqueeImgCloneRef.current;

        // Background color interpolation
        if (progress <= 0.05) {
          const bgColorProgress = Math.min(progress / 0.05, 1);
          const newBgColor = interpolateColor(
            lightColor,
            darkColor,
            bgColorProgress
          );
          gsap.set(".container", { backgroundColor: newBgColor });
        } else {
          gsap.set(".container", { backgroundColor: darkColor });
        }

        // Flip progress
        if (progress <= 0.2 && flipAnimation) {
          flipAnimation.progress(progress / 0.2);
        }

        // Horizontal scroll animation
        if (progress > 0.2 && progress <= 0.95) {
          if (flipAnimation) flipAnimation.progress(1);

          const horizontalProgress = (progress - 0.2) / 0.75;
          const wrapperTranslateX = -66.67 * horizontalProgress;

          gsap.set(".horizontal-scroll-wrapper", {
            x: `${wrapperTranslateX}%`,
          });

          if (clone) {
            const imageTranslateX = -horizontalProgress * 200;
            gsap.set(clone, { x: `${imageTranslateX}%` });
          }
        } else if (progress > 0.90) {
          if (flipAnimation) flipAnimation.progress(1);
          if (clone) gsap.set(clone, { x: "-200%" });
          gsap.set(".horizontal-scroll-wrapper", { x: "-66.67%" });
        }
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (pinnedMarqueeImgCloneRef.current) {
        pinnedMarqueeImgCloneRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      className=".containers {
"
    >
      <section className="hero">
        <h1>
          Fragments of thought arranged in sequence become patterns. They unfold
          step by step, shaping meaning as they move forward.
        </h1>
      </section>

      <section className="marquee">
        <div className="marquee-wrapper">
          <div className="marquee-images">
            <div className="marquee-img">
              <img src="/hero/image1.jpg" alt="Image 1" />
            </div>
            <div className="marquee-img">
              <img src="/hero/image2.jpg" alt="Image 2" />
            </div>
            <div className="marquee-img pin">
              <img src="/hero/image3.jpg" alt="Image 3" />
            </div>
            <div className="marquee-img">
              <img src="/hero/image4.webp" alt="Image 4" />
            </div>
            <div className="marquee-img">
              <img src="/hero/image5.jpg" alt="Image 5" />
            </div>
          </div>
        </div>
      </section>

      <section className="horizontal-scroll">
        <div className="horizontal-scroll-wrapper">
          <div className="horizontal-slide horizontal-spacer"></div>

          <div className="horizontal-slide">
            <div className="col">
              <h3>
                A landscape in constant transition, where every shape, sound,
                and shadow refuse to stay still. What seems stable begins to
                dissolve, and what fades returns again in a new form.
              </h3>
            </div>
            <div className="col">
              <img src="/hero/image2.jpg" alt="Image 2" />
            </div>
          </div>

          <div className="horizontal-slide">
            <div className="col">
              <h3>
                The rhythm of motion carries us forward into spaces that feel
                familiar yet remain undefined. Each shift is subtle, yet
                together they create movement.
              </h3>
            </div>
            <div className="col">
              <img src="/hero/image3.jpg" alt="Image 3" />
            </div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>
          Shadows fold into light. Shapes shift across the frame, reminding us
          that stillness is only temporary.
        </h1>
      </section>
    </div>
  );
};

export default Feature8;
