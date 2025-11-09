import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { SimpleSplit } from "@/utils/splitText";
import styles from "./Feature10.module.css";

const serviceTexts = [
  ["We transform your ideas into creative solutions."],
  ["We deliver powerful APIs for scalability."],
  ["We provide capital stock insights with precision."],
  ["We build intelligent stock analysis tools."],
  ["We connect you with reliable brokers."],
];

const Feature10: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const stickySection = document.querySelector(`.${styles.sticky}`) as HTMLElement;
    const services = document.querySelectorAll(`.${styles.service}`);
    const indicator = document.querySelector(`.${styles.indicator}`) as HTMLElement;
    const currentCount = document.querySelector(`#current-count`) as HTMLElement;
    const serviceImg = document.querySelector(`.${styles["service-img"]}`) as HTMLElement;
    const serviceCopyEl = document.querySelector(`.${styles["service-copy"]} p`) as HTMLElement;
    const separator = document.querySelector(`.${styles.separator}`) as HTMLElement;
    const progress = document.querySelector(`.${styles.progress}`) as HTMLElement;

    if (!stickySection || !indicator || !serviceImg || !serviceCopyEl) return;

    const serviceHeight = 38;
    const imgHeight = 250;

    serviceCopyEl.textContent = serviceTexts[0][0];
    let currentSplitText = new SimpleSplit(serviceCopyEl);

    const measureContainer = document.createElement("div");
    measureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      height: auto;
      width: auto;
      white-space: nowrap;
      font-size: 60px;
      font-weight: 600;
      text-transform: uppercase;
    `;
    document.body.appendChild(measureContainer);

    const serviceWidths = Array.from(services).map((service) => {
      const text = service.querySelector("p")?.textContent || "";
      measureContainer.textContent = text;
      return measureContainer.offsetWidth + 8;
    });

    document.body.removeChild(measureContainer);

    gsap.set(indicator, {
      width: serviceWidths[0],
      xPercent: -50,
      left: "50%",
    });

    const scrollPerService = window.innerHeight;
    let currentIndex = 0;

    const animateTextChange = async (index: number) => {
      return new Promise<void>((resolve) => {
        gsap.to(currentSplitText.lines, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.inOut",
          onComplete: () => {
            currentSplitText.revert();
            const newText = serviceTexts[index][0];
            serviceCopyEl.textContent = newText;
            currentSplitText = new SimpleSplit(serviceCopyEl);

            gsap.set(currentSplitText.lines, { opacity: 0, y: 20 });

            gsap.to(currentSplitText.lines, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: "power3.out",
              onComplete: () => resolve(),
            });
          },
        });
      });
    };

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * (serviceTexts.length - 1)}`,
      pin: true,
      scrub: true,
      onUpdate: async (self) => {
        const scrollPos = Math.max(0, self.scroll() - window.innerHeight);
        const activeIndex = Math.floor(scrollPos / scrollPerService);

        if (window.innerWidth > 700) {
          gsap.set(progress, { scaleY: self.progress, transformOrigin: "top" });
        } else {
          gsap.set(progress, { scaleX: self.progress, transformOrigin: "left" });
        }

        if (
          activeIndex >= 0 &&
          activeIndex < serviceTexts.length &&
          currentIndex !== activeIndex
        ) {
          currentIndex = activeIndex;
          currentCount.textContent = String(activeIndex + 1);

          services.forEach((s) => s.classList.remove(styles.active));
          services[activeIndex].classList.add(styles.active);

          await Promise.all([
            gsap.to(indicator, {
              y: activeIndex * serviceHeight,
              width: serviceWidths[activeIndex],
              duration: 0.5,
              ease: "power3.inOut",
              overwrite: true,
            }),
            gsap.to(serviceImg, {
              y: -(activeIndex * imgHeight),
              duration: 0.5,
              ease: "power3.inOut",
              overwrite: true,
            }),
            animateTextChange(activeIndex),
            gsap.fromTo(
              separator,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut",
                transformOrigin: "center",
                yoyo: true,
                repeat: 1,
              }
            ),
          ]);
        }
      },
    });
  }, []);

  return (
    <div className={styles.containers}>
      <section className={`${styles.hero} ${styles.section}`}>
        <p>Scroll down</p>
      </section>

      <section className={`${styles.sticky} ${styles.section}`}>
        <div className={styles.col}>
          <div className={styles.services}>
            <div className={styles.indicator}></div>
            <div className={styles.service}>
              <p>Developer</p>
            </div>
            <div className={styles.service}>
              <p>API Service</p>
            </div>
            <div className={styles.service}>
              <p>Capital Stock</p>
            </div>
            <div className={styles.service}>
              <p>Stock Analysis</p>
            </div>
            <div className={styles.service}>
              <p>Broker</p>
            </div>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles["service-img-wrapper"]}>
            <div className={styles["service-img"]}>
              <div className={styles.img}>
                <img src="hero/image1.jpg" alt="" />
              </div>
              <div className={styles.img}>
                <img src="hero/image2.jpg" alt="" />
              </div>
              <div className={styles.img}>
                <img src="hero/image3.jpg" alt="" />
              </div>
              <div className={styles.img}>
                <img src="hero/image4.webp" alt="" />
              </div>
              <div className={styles.img}>
                <img src="hero/image5.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className={styles["service-copy"]}>
            <p>Some random text</p>
          </div>
        </div>

        <div className={styles["progress-bar"]}>
          <div className={styles.progress}></div>
        </div>

        <div className={styles.index}>
          <span id="current-count">1</span>
          <span className={styles.separator}></span>
          <span id="total-count">5</span>
        </div>
      </section>

      <section className={`${styles.outro} ${styles.section}`}>
        <p>Text section goes here</p>
      </section>
    </div>
  );
};

export default Feature10;
