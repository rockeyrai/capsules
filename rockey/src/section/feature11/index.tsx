"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";

const Feature11: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    //  Split all .item h1 into individual chars
    new SplitType(".item h1", { types: "chars" });

    //  Animate character font weight
    const animateChars = (chars: HTMLElement[], reverse = false) => {
      gsap.fromTo(
        chars,
        { fontWeight: 100 },
        {
          fontWeight: 900,
          duration: 1,
          ease: "none",
          stagger: {
            each: 0.35,
            from: reverse ? "start" : "end",
          },
          scrollTrigger: {
            trigger: chars[0].closest(".marquee-container"),
            start: "50% bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    };

    //  Animate each marquee container
    const marqueeContainers = document.querySelectorAll(".marquee-container");

    marqueeContainers.forEach((container, index) => {
      const start = index % 2 === 0 ? "0%" : "0%";
      const end = index % 2 === 0 ? "10%" : "-15%";

      const marquee = container.querySelector(".marquee");
      const words = marquee?.querySelectorAll(".item h1");

      if (marquee) {
        gsap.fromTo(
          marquee,
          { x: start },
          {
            x: end,
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "150% top",
              scrub: true,
            },
          }
        );
      }

      words?.forEach((word) => {
        const chars = Array.from(word.querySelectorAll(".char"));
        if (chars.length) {
          const reverse = index % 2 !== 0;
          animateChars(chars as HTMLElement[], reverse);
        }
      });
    });

    //  Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // @ts-ignore: smooth is valid but not in current type definition
      smooth: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    //  Refresh ScrollTrigger after all splits
    ScrollTrigger.refresh();

    //  Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="containers">
      <section className="hero">
        <img src="hero/image1.jpg" alt="hero" />
      </section>

      <section className="about">
        <p>set to set up this animation</p>
      </section>

      <section className="marquees">
        {[1, 2, 3].map((num) => (
          <div className="marquee-container" key={num}>
            <div className="marquee">
              <div className="item">
                <img src="hero/image2.jpg" alt="" />
              </div>
              <div className="item">
                <h1>Unique</h1>
              </div>
              <div className="item">
                <img src="hero/image3.jpg" alt="" />
              </div>
              <div className="item">
                <img src="hero/image1.jpg" alt="" />
              </div>
              <div className="item">
                <img src="hero/image5.jpg" alt="" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="services">
        <p>some random text</p>
      </section>
      <section className="footer"></section>
    </div>
  );
};

export default Feature11;
