import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "./Feature10.module.css";
import SplitType from "split-type";

const serviceTexts = [
  ["We transform your ideas into creative solutions."],
  ["We deliver powerful APIs for scalability."],
  ["We provide capital stock insights with precision."],
  ["We build intelligent stock analysis tools."],
  ["We connect you with reliable brokers."],
];

const serviceTitles = [
  "Developer",
  "API Service",
  "Capital Stock",
  "Stock Analysis",
  "Broker",
];

const serviceDescriptions = [
  "description 1",
  "description 2",
  "description 3",
  "description 4",
  "description 5",
];

const serviceImages = [
  "hero/image1.jpg",
  "hero/image2.jpg",
  "hero/image3.jpg",
  "hero/image4.webp",
  "hero/image5.jpg",
];

const Feature10: React.FC = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement[]>([]);
  const serviceImgRef = useRef<HTMLDivElement>(null);
  const serviceCopyRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLSpanElement>(null);
  const currentCountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const stickySection = stickyRef.current;
    const services = servicesRef.current;
    const serviceImg = serviceImgRef.current;
    const serviceCopyEl = serviceCopyRef.current;
    const progress = progressRef.current;
    const separator = separatorRef.current;
    const currentCount = currentCountRef.current;

    if (!stickySection || !serviceImg || !serviceCopyEl) return;

    const imgHeight = 250;
    const totalServices = serviceTexts.length;

    // Set initial service copy
    serviceCopyEl.textContent = serviceTexts[0][0];
    let currentSplitText = new SplitType(serviceCopyEl);

    // Activate first service on load
    services.forEach((s, idx) => {
      const desc = s.querySelector("span") as HTMLElement;
      if (idx === 0) {
        gsap.set(s, { height: 80, backgroundColor: "#ffcc00" });
        gsap.set(desc, { opacity: 1, height: "auto" });
      } else {
        gsap.set(s, { height: 38, backgroundColor: "#fff" });
        gsap.set(desc, { opacity: 0, height: 0 });
      }
    });
    currentCount!.textContent = "1";
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
            serviceCopyEl.textContent = serviceTexts[index][0];
            currentSplitText = new SplitType(serviceCopyEl);

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

    const stickyEnd = window.innerHeight * totalServices + 50; // extra buffer

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyEnd}`,
      pin: true,
      scrub: true,
      onUpdate: async (self) => {
        const activeIndex = Math.min(
          totalServices - 1,
          Math.floor(self.progress * totalServices)
        );

        if (progress) {
          if (window.innerWidth > 700) {
            gsap.set(progress, {
              scaleY: self.progress,
              transformOrigin: "top",
            });
          } else {
            gsap.set(progress, {
              scaleX: self.progress,
              transformOrigin: "left",
            });
          }
        }

        if (activeIndex !== currentIndex) {
          currentIndex = activeIndex;
          currentCount!.textContent = String(activeIndex + 1);

          services.forEach((s, idx) => {
            const desc = s.querySelector("span") as HTMLElement;
            if (idx === activeIndex) {
              gsap.to(s, {
                height: 80,
                backgroundColor: "#ffcc00",
                duration: 0.4,
                ease: "power3.out",
              });
              gsap.to(desc, {
                opacity: 1,
                height: "auto",
                duration: 0.4,
                ease: "power3.out",
              });
            } else {
              gsap.to(s, {
                height: 38,
                backgroundColor: "#fff",
                duration: 0.4,
                ease: "power3.out",
              });
              gsap.to(desc, {
                opacity: 0,
                height: 0,
                duration: 0.3,
                ease: "power3.out",
              });
            }
          });

          await Promise.all([
            gsap.to(serviceImg, {
              y: -(activeIndex * imgHeight),
              duration: 0.5,
              ease: "power3.inOut",
              overwrite: true,
            }),
            animateTextChange(activeIndex),
            separator &&
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
      {/* <section className={`${styles.hero} ${styles.section}`}>
        <p>Scroll down</p>
      </section> */}

      <section className={`${styles.sticky} ${styles.section}`} ref={stickyRef}>
        <div className={styles.col}>
          <div className={styles.services}>
            {serviceTitles.map((title, idx) => (
              <div
                className={styles.service}
                key={idx}
                ref={(el) => {
                  if (el) servicesRef.current[idx] = el;
                }}
              >
                <p>{title}</p>
                <span>{serviceDescriptions[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles["service-img-wrapper"]}>
            <div className={styles["service-img"]} ref={serviceImgRef}>
              {serviceImages.map((src, i) => (
                <div className={styles.img} key={i}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className={styles["service-copy"]}>
            <p ref={serviceCopyRef}>Some random text</p>
          </div>
        </div>

        <div className={styles["progress-bar"]}>
          <div className={styles.progress} ref={progressRef}></div>
        </div>

        <div className={styles.index}>
          <span ref={currentCountRef}>1</span>
          <span className={styles.separator} ref={separatorRef}></span>
          <span>{serviceTexts.length}</span>
        </div>
      </section>

      {/* <section className={`${styles.outro} ${styles.section}`}>
        <p>Text section goes here</p>
      </section> */}
    </div>
  );
};

export default Feature10;
