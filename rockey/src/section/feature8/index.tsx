"use client";

import React from "react";
import styles from "./Feature8.module.css";

const Feature8 = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>
          Fragments of thought arranged in sequence become patterns. 
          They unfold step by step, shaping meaning as they move forward.
        </h1>
      </section>

      <section className={styles.marquee}>
        <div className={styles["marquee-wrapper"]}>
          <div className={styles["marquee-images"]}>
            <div className={styles["marquee-img"]}>
              <img src="/hero/image1.jpg" alt="Image 1" />
            </div>
            <div className={styles["marquee-img"]}>
              <img src="/hero/image2.jpg" alt="Image 2" />
            </div>
            <div className={`${styles["marquee-img"]} ${styles.pin}`}>
              <img src="/hero/image3.jpg" alt="Image 3" />
            </div>
            <div className={styles["marquee-img"]}>
              <img src="/hero/image4.webp" alt="Image 4" />
            </div>
            <div className={styles["marquee-img"]}>
              <img src="/hero/image5.jpg" alt="Image 5" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles["horizontal-scroll"]}>
        <div className={styles["horizontal-scroll-wrapper"]}>
          <div
            className={`${styles["horizontal-slide"]} ${styles["horizontal-spacer"]}`}
          ></div>

          <div className={styles["horizontal-slide"]}>
            <div className={styles.col}>
              <h3>
                A landscape in constant transition, where every shape, sound,
                and shadow refuse to stay still. What seems stable begins to
                dissolve, and what fades returns again in a new form.
              </h3>
            </div>
            <div className={styles.col}>
              <img src="/hero/image2.jpg" alt="Image 2" />
            </div>
          </div>

          <div className={styles["horizontal-slide"]}>
            <div className={styles.col}>
              <h3>
                The rhythm of motion carries us forward into spaces that feel
                familiar yet remain undefined. Each shift is subtle, yet
                together they create movement.
              </h3>
            </div>
            <div className={styles.col}>
              <img src="/hero/image3.jpg" alt="Image 3" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.outro}>
        <h1>
          Shadows fold into light. Shapes shift across the frame, reminding us
          that stillness is only temporary.
        </h1>
      </section>
    </div>
  );
};

export default Feature8;
