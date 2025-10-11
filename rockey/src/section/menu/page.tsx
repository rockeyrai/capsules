"use client";
import React, { useEffect } from "react";
import styles from "./MenuModule.module.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import Lenis from "@studio-freight/lenis";

const Menu: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".87,0,.13,1");

    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const textContainers = document.querySelectorAll<HTMLElement>(
      `.${styles.menuCol}`
    );
    const splitTextByContainer: any[][] = [];

    textContainers.forEach((container) => {
      const textElements = container.querySelectorAll<HTMLElement>("a, p");
      const containerSplits: any[] = [];

      textElements.forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });
        containerSplits.push(split);
        gsap.set(split.lines, { y: "-110%" });
      });

      splitTextByContainer.push(containerSplits);
    });

    const container = document.querySelector<HTMLElement>(
      `.${styles.menuContainers}`
    );
    const menuToggleBtn = document.querySelector<HTMLElement>(
      `.${styles.menuToggleBtn}`
    );
    const menuOverlay = document.querySelector<HTMLElement>(
      `.${styles.menuOverlay}`
    );
    const menuOverlayContainer = document.querySelector<HTMLElement>(
      `.${styles.menuOverlayContent}`
    );
    const menuMediaWrapper = document.querySelector<HTMLElement>(
      `.${styles.menuMediaWrapper}`
    );
    const copyContainers = document.querySelectorAll<HTMLElement>(
      `.${styles.menuCol}`
    );
    const menuToggleLabel = document.querySelector<HTMLElement>(
      `.${styles.menuToggleLabel} p`
    );
    const hamburgerIcon = document.querySelector<HTMLElement>(
      `.${styles.menuHamburgerIcon}`
    );

    let isMenuOpen = false;
    let isAnimating = false;

    menuToggleBtn?.addEventListener("click", () => {
      if (isAnimating) return;

      if (!isMenuOpen) {
        isAnimating = true;
        lenis.stop();

        const tl = gsap.timeline();

        tl.to(menuToggleLabel, {
          y: "-110%",
          duration: 1,
          ease: "hop",
        })
          .to(
            container,
            {
              y: "100vh",
              duration: 1,
              ease: "hop",
            },
            "<"
          )
          .to(
            menuOverlay,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%,0% 100%)",
              duration: 1,
              ease: "hop",
            },
            "<"
          )
          .to(
            menuOverlayContainer,
            {
              yPercent: 0,
              duration: 1,
              ease: "hop",
            },
            "<"
          )
          .to(
            menuMediaWrapper,
            {
              opacity: 1,
              duration: 0.75,
              ease: "power2.out",
              delay: 0.5,
            },
            "<"
          );

        splitTextByContainer.forEach((containerSplits) => {
          const copyLines = containerSplits.flatMap((split) => split.lines);

          tl.to(
            copyLines,
            {
              y: "0%",
              duration: 2,
              ease: "hop",
              stagger: -0.075,
            },
            -0.15
          );
        });

        hamburgerIcon?.classList.add(styles.active);
        tl.call(() => {
          isAnimating = false;
        });

        isMenuOpen = true;
      } else {
        isAnimating = true;

        hamburgerIcon?.classList.remove(styles.active);
        const tl = gsap.timeline();

        tl.to(container, {
          y: "0vh",
          duration: 1,
          ease: "hop",
        })
          .to(
            menuOverlay,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 1,
              ease: "hop",
            },
            "<"
          )
          .to(
            menuOverlayContainer,
            {
              yPercent: -50,
              duration: 1,
              ease: "hop",
            },
            "<"
          )
          .to(
            menuToggleLabel,
            {
              y: "0%",
              duration: 1,
              ease: "hop",
            },
            "<"
          )
          .to(
            copyContainers,
            {
              opacity: 0.25,
              duration: 1,
              ease: "hop",
            },
            "<"
          );

        tl.call(() => {
          splitTextByContainer.forEach((containerSplits) => {
            const copyLines = containerSplits.flatMap((split) => split.lines);
            gsap.set(copyLines, { y: "-110%" });
          });

          gsap.set(copyContainers, { opacity: 1 });
          gsap.set(menuMediaWrapper, { opacity: 0 });

          isAnimating = false;
          lenis.start();
        });

        isMenuOpen = false;
      }
    });

    return () => {
      menuToggleBtn?.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <nav className={styles.menuNav}>
      <div className={styles.menuBar}>
        <div className={styles.menuLogo}>
          <a href="#">
            <img src="/hero/image1.jpg" alt="just" />
          </a>
        </div>
        <div className={styles.menuToggleBtn}>
          <div className={styles.menuToggleLabel}>
            <p>Menu</p>
          </div>
          <div className={styles.menuHamburgerIcon}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className={styles.menuOverlay}>
        <div className={styles.menuOverlayContent}>
          <div className={styles.menuMediaWrapper}>
            <img src="/hero/image2.jpg" alt="" />
          </div>
          <div className={styles.menuContentWrapper}>
            <div className={styles.menuContentMain}>
              <div className={styles.menuCol}>
                <div className={styles.menuLink}>
                  <a href="#">Index 1</a>
                </div>
                <div className={styles.menuLink}>
                  <a href="#">Index 2</a>
                </div>
                <div className={styles.menuLink}>
                  <a href="#">Index 3</a>
                </div>
                <div className={styles.menuLink}>
                  <a href="#">Index 4</a>
                </div>
                <div className={styles.menuLink}>
                  <a href="#">Index 5</a>
                </div>
              </div>
              <div className={styles.menuCol}>
                <div className={styles.menuTag}>
                  <a href="#">web Animations 1</a>
                </div>
                <div className={styles.menuTag}>
                  <a href="#">web Animations 2</a>
                </div>
                <div className={styles.menuTag}>
                  <a href="#">web Animations 3</a>
                </div>
              </div>
            </div>
            <div className={styles.menuFooter}>
              <div className={styles.menuCol}>
                <p>Kirtipur, Kathmandu</p>
              </div>
              <div className={styles.menuCol}>
                <p>40054, Townplanning</p>
                <p>rockeyrai234@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
