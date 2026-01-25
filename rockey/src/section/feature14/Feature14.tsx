"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "./Feature.module.css";

gsap.registerPlugin(ScrollTrigger);

const Feature14: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ------------------------
    // Lenis setup
    // ------------------------
    const lenis = new Lenis({
      smooth: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ------------------------
    // Services selection (CSS MODULE SAFE)
    // ------------------------
    const services = gsap.utils.toArray(`.${styles.service}`);

    if (!services.length) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const service = entry.target;
          const imgContainer = service.querySelector(`.${styles.img}`);
          if (!imgContainer) return;

          ScrollTrigger.create({
            trigger: service,
            start: "bottom bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              let progress = self.progress;
              let newWidth = 30 + 70 * progress;
              gsap.to(imgContainer, {
                width: newWidth + "%",
                duration: 0.1,
                ease: "none",
              });
            },
          });

          ScrollTrigger.create({
            trigger: service,
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const newHeight = 150 + 300 * progress;

              gsap.to(service, {
                height: `${newHeight}px`,
                duration: 0.1,
                ease: "none",
              });
            },
          });

          observer.unobserve(service);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    services.forEach((service) => {
      observer.observe(service);
    });

    // ------------------------
    // Cleanup
    // ------------------------
    return () => {
      observer.disconnect();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero} />

      <section className={styles.services}>
        <div className={styles.serviceHeader}>
          <div className={styles.col} />
          <div className={styles.col}>
            <h1>all services</h1>
          </div>
        </div>
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className={styles.service}>
            <div className={styles.serviceInfo}>
              <h1>lore ips</h1>
              <p>lorem ipsum dolor sit amet con</p>
            </div>

            <div className={styles.serviceImg}>
              <div className={styles.img}>
                <img src="/hero/image1.jpg" alt="service" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.footer} />
    </div>
  );
};

export default Feature14;
