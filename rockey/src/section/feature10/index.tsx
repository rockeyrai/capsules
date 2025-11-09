import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { SimpleSplit } from "@/utils/splitText";

const serviceTexts = [
  ["We transform your ideas into creative solutions."],
  ["We deliver powerful APIs for scalability."],
  ["We provide capital stock insights with precision."],
  ["We build intelligent stock analysis tools."],
  ["We connect you with reliable brokers."],
];

const Feature10: React.FC = () => {
  useEffect(() => {
    // ✅ Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // ✅ Setup smooth scrolling
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ✅ Element references
    const stickySection = document.querySelector(".sticky") as HTMLElement;
    const services = document.querySelectorAll(".service");
    const indicator = document.querySelector(".indicator") as HTMLElement;
    const currentCount = document.querySelector(
      "#current-count"
    ) as HTMLElement;
    const serviceImg = document.querySelector(".service-img") as HTMLElement;
    const serviceCopyEl = document.querySelector(
      ".service-copy p"
    ) as HTMLElement;
    const separator = document.querySelector(".separator") as HTMLElement;
    const progress = document.querySelector(".progress") as HTMLElement;

    if (!stickySection || !indicator || !serviceImg || !serviceCopyEl) return;

    const serviceHeight = 38;
    const imgHeight = 250;

    // ✅ Initial text setup
    serviceCopyEl.textContent = serviceTexts[0][0];
    let currentSplitText = new SimpleSplit(serviceCopyEl);

    // ✅ Measure text widths
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

    // ✅ Animate text change
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

    // ✅ ScrollTrigger logic
    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * (serviceTexts.length - 1)}`,
      pin: true,
      scrub: true,
      onUpdate: async (self) => {
        const scrollPos = Math.max(0, self.scroll() - window.innerHeight);
        const activeIndex = Math.floor(scrollPos / scrollPerService);
        const scrollProgress = self.progress;

        // Animate the progress bar
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

        if (
          activeIndex >= 0 &&
          activeIndex < serviceTexts.length &&
          currentIndex !== activeIndex
        ) {
          currentIndex = activeIndex;
          currentCount.textContent = String(activeIndex + 1);

          services.forEach((s) => s.classList.remove("active"));
          services[activeIndex].classList.add("active");

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
            // 💫 Separator animation
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
    <div className="containers">
      <section className="hero">
        <p>Scroll down</p>
      </section>

      <section className="sticky">
        <div className="col">
          <div className="services">
            <div className="indicator"></div>
            <div className="service">
              <p>Developer</p>
            </div>
            <div className="service">
              <p>API Service</p>
            </div>
            <div className="service">
              <p>Capital Stock</p>
            </div>
            <div className="service">
              <p>Stock Analysis</p>
            </div>
            <div className="service">
              <p>Broker</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="service-img-wrapper">
            <div className="service-img">
              <div className="img">
                <img src="hero/image1.jpg" alt="" />
              </div>
              <div className="img">
                <img src="hero/image2.jpg" alt="" />
              </div>
              <div className="img">
                <img src="hero/image3.jpg" alt="" />
              </div>
              <div className="img">
                <img src="hero/image4.webp" alt="" />
              </div>
              <div className="img">
                <img src="hero/image5.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="service-copy">
            <p>Some random text</p>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress"></div>
        </div>

        <div className="index">
          <span id="current-count">1</span>
          <span className="separator"></span>
          <span id="total-count">5</span>
        </div>
      </section>

      <section className="outro">
        <p>Text section goes here</p>
      </section>
    </div>
  );
};

export default Feature10;
