import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "./Feature.module.css";

const initialClipPaths: string[] = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
  "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
  "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
  "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
  "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
  "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
  "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
  "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
];

const finalClipPaths: string[] = [
  "polygon(0% 0%, 33.5% 0%, 33.5% 33%, 0% 33.5%)",
  "polygon(33% 0%, 66.5% 0%, 66.5% 33%, 33% 33.5%)",
  "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33.5%)",
  "polygon(0% 33%, 33.5% 33%, 33.5% 66%, 0% 66.5%)",
  "polygon(33% 33%, 66.5% 33%, 66.5% 66%, 33% 66.5%)",
  "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66.5%)",
  "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)",
  "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)",
  "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
];

const Feature15: React.FC = () => {
  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    function createMasks(): void {
      const imgs = document.querySelectorAll<HTMLElement>(`.${styles.img}`);
      imgs.forEach((img: HTMLElement) => {
        for (let i = 0; i < 9; i++) {
          const mask = document.createElement("div");
          mask.classList.add(styles.mask, `m-${i}`);
          img.appendChild(mask);
        }
      });
    }

    createMasks();

    const rows = gsap.utils.toArray<HTMLElement>(`.${styles.row}`);

    rows.forEach((row: HTMLElement) => {
      const imgs = row.querySelectorAll<HTMLElement>(`.${styles.img}`);

      imgs.forEach((img: HTMLElement) => {
        const masks = img.querySelectorAll<HTMLElement>(`.${styles.mask}`);

        masks.forEach((mask: HTMLElement, index: number) => {
          gsap.set(mask, {
            clipPath: initialClipPaths[index],
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
          },
        });

        const animationOrder: string[][] = [
          [".m-0"],
          [".m-1", ".m-3"],
          [".m-2", ".m-4", ".m-6"],
          [".m-5", ".m-7"],
          [".m-8"],
        ];

        animationOrder.forEach((targets: string[], index: number) => {
          tl.to(
            targets.flatMap((cls: string) =>
              Array.from(img.querySelectorAll<HTMLElement>(cls))
            ),
            {
              clipPath: (i: number, el: HTMLElement) =>
                finalClipPaths[Array.from(masks).indexOf(el)],
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
            },
            index * 0.125
          );
        });
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <section className={styles.heroImgs}>
        <div className={styles.row}>
          <div className={`${styles.img} ${styles.img1}`}></div>
          <div className={`${styles.img} ${styles.img2}`}></div>
        </div>
      </section>
      <section className={styles.clients}>
        <div className={styles.col}>
          <p>selected clients</p>
        </div>
        <div className={styles.col}>
          <div className={styles.clientsList}>
            <p>ames</p>
            <p>amefas</p>
            <p>amefdas</p>
            <p>jaf</p>
            <p>fads</p>
            <p>fdasf</p>
          </div>
          <div className={styles.clientsList}>
            <p>amfwes</p>
            <p>amfaefas</p>
            <p>amghefdas</p>
            <p>jafa</p>
            <p>has</p>
            <p>sfs</p>
          </div>
        </div>
      </section>
      <section className={styles.clientsImgs}>
        <div className={styles.row}>
          <div className={`${styles.img} ${styles.img3}`}></div>
        </div>
      </section>

      <section className={styles.productFilters}>
        <div className={styles.col}>
          <p>all</p>
          <p>lights</p>
          <p>furniture</p>
          <p>accessories</p>
        </div>
        <div className={styles.col}></div>
      </section>
      <section className={styles.products}>
        <div className={styles.row}>
          <div className={styles.img}></div>
          <div className={`${styles.img} ${styles.img4}`}></div>
          <div className={`${styles.img} ${styles.img5}`}></div>
          <div className={styles.img}></div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.img} ${styles.img6}`}></div>
          <div className={styles.img}></div>
          <div className={styles.img}></div>
          <div className={`${styles.img} ${styles.img7}`}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.img}></div>
          <div className={`${styles.img} ${styles.img8}`}></div>
          <div className={styles.img}></div>
          <div className={`${styles.img} ${styles.img9}`}></div>
        </div>
      </section>
      <section className={styles.about}>
        <p>branding information</p>
        <p>branding information</p>
        <p>branding information</p>
      </section>
      <section className={styles.aboutImgs}>
        <div className={styles.row}>
          <div className={`${styles.img} ${styles.img10}`}></div>
          <div className={`${styles.img} ${styles.img11}`}></div>
        </div>
      </section>
      <section className={styles.outro}>
        <div className={styles.row}>
          <div className={`${styles.img} ${styles.img12}`}></div>
          <div className={`${styles.img} ${styles.img13}`}></div>
          <div className={`${styles.img} ${styles.img14}`}></div>
        </div>
      </section>
    </div>
  );
};

export default Feature15;