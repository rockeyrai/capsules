"use client"

import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText"; // If this import fails, see note below about alternatives
import "./feature5Module.css"

/**
 * Corrected Spotlight scroll page.
 * - Uses React refs + useEffect instead of DOMContentLoaded.
 * - Fixed imports and Lenis usage.
 * - Fixed many typos in selectors/CSS/variables.
 * - Adds proper cleanup on unmount.
 *
 * Notes:
 * - SplitText is a GSAP plugin (historically a Club GreenSock plugin). If you don't have access
 *   to it, replace the SplitText usage with a small helper that wraps each word in a <span>.
 * - Install packages: `npm i gsap @studio-freight/lenis`
 */

const Page = () => {
  const spotlightRef = useRef(null);
  const spotlightImagesRef = useRef(null);
  const maskContainerRef = useRef(null);
  const maskImageRef = useRef(null);
  const maskHeaderRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safety

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Lenis (smooth-scrolling)
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    // Add RAF-driven Lenis loop to GSAP ticker
    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const spotlightImages = spotlightImagesRef.current;
    const maskContainer = maskContainerRef.current;
    const maskImage = maskImageRef.current;
    const maskHeader = maskHeaderRef.current;

    const spotlightContainerHeight = spotlightImages
      ? Math.max(1, spotlightImages.offsetHeight)
      : 1;
    const viewportHeight = window.innerHeight;
    const initialOffset = 0; // define if you want an offset
    const totalMovement = spotlightContainerHeight + initialOffset + viewportHeight;

    // Split header text into words (if available)
    let headerSplit = null;
    if (maskHeader) {
      // If SplitText isn't available for you, create spans for words manually instead.
      headerSplit = new SplitText(maskHeader, {
        type: "words",
        wordsClass: "spotlight-word",
      });
      gsap.set(headerSplit.words, { opacity: 0 });
    }

    const st = ScrollTrigger.create({
      trigger: spotlightRef.current || ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 7}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Image vertical movement (first half)
        if (spotlightImages) {
          if (progress < 0.5) {
            const imageMoveProgress = progress / 0.5;
            const startY = 5;
            const endY = -(totalMovement / spotlightContainerHeight) * 100;
            const currentY = startY + (endY - startY) * imageMoveProgress;
            gsap.set(spotlightImages, { y: `${currentY}%` });
          }
        }

        // Mask growth + image scale
        if (maskContainer && maskImage) {
          if (progress > 0.25 && progress < 0.75) {
            const maskProgress = (progress - 0.25) / 0.5;
            const maskSize = `${maskProgress * 450}%`;
            const imageScale = 1.5 - maskProgress * 0.5;
            // Use style.setProperty for cross-browser compatibility
            maskContainer.style.setProperty("-webkit-mask-size", maskSize);
            maskContainer.style.setProperty("mask-size", maskSize);
            gsap.set(maskImage, { scale: imageScale });
          } else if (progress <= 0.25) {
            maskContainer.style.setProperty("-webkit-mask-size", "0%");
            maskContainer.style.setProperty("mask-size", "0%");
            gsap.set(maskImage, { scale: 1.5 });
          } else {
            maskContainer.style.setProperty("-webkit-mask-size", "450%");
            maskContainer.style.setProperty("mask-size", "450%");
            gsap.set(maskImage, { scale: 1 });
          }
        }

        // Header words reveal
        if (headerSplit && headerSplit.words && headerSplit.words.length > 0) {
          if (progress > 0.75 && progress < 0.95) {
            const textProgress = (progress - 0.75) / 0.2;
            const totalWords = headerSplit.words.length;
            headerSplit.words.forEach((word, index) => {
              const wordRevealProgress = index / totalWords;
              gsap.set(word, { opacity: textProgress > wordRevealProgress ? 1 : 0 });
            });
          } else if (progress <= 0.75) {
            gsap.set(headerSplit.words, { opacity: 0 });
          } else if (progress >= 0.95) {
            gsap.set(headerSplit.words, { opacity: 1 });
          }
        }
      },
    });

    // cleanup
    return () => {
      st && st.kill();
      if (headerSplit && typeof headerSplit.revert === "function") {
        headerSplit.revert();
      }
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
      // make sure no leftover ScrollTriggers remain
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div>
      <nav>
        <img src="/hero/image1.jpg" alt="logo" />
      </nav>

      <section className="intro">
        <div className="header">
          <h1>Awaken the Scroll</h1>
        </div>
      </section>

      <section ref={spotlightRef} className="spotlight">
        <div className="header">
          <h1>Where frames fade Into Fate</h1>
        </div>

        <div ref={spotlightImagesRef} className="spotlight-images">
          <div className="row">
            <div className="img">
              <img src="/hero/image2.jpg" alt="1" />
            </div>
            <div className="img" />
            <div className="img" />
            <div className="img" />
          </div>
          <div className="row">
            <div className="img" />
            <div className="img">
              <img src="/hero/image2.jpg" alt="2" />
            </div>
            <div className="img">
              <img src="/hero/image3.jpg" alt="3" />
            </div>
            <div className="img" />
          </div>
          <div className="row">
            <div className="img" />
            <div className="img">
              <img src="/hero/image2.jpg" alt="4" />
            </div>
            <div className="img" />
            <div className="img">
              <img src="/hero/image3.jpg" alt="5" />
            </div>
          </div>
          <div className="row">
            <div className="img">
              <img src="/hero/image3.jpg" alt="6" />
            </div>
            <div className="img" />
            <div className="img">
              <img src="/hero/image3.jpg" alt="7" />
            </div>
            <div className="img" />
          </div>
        </div>

        <div ref={maskContainerRef} className="mask-container">
          <div className="mask-img" ref={maskImageRef}>
            <img src="/hero/image3.jpg" alt="mask-image" />
          </div>
          <div className="header">
            <h1 ref={maskHeaderRef}>The Last Frame Hits Hard</h1>
          </div>
        </div>
      </section>

      <section className="outro">
        <div className="header">
          <h1>end of Act one</h1>
        </div>
      </section>
    </div>
  );
};

export default Page;
