import React, { useEffect } from "react";
import styles from "./feature13.module.css";
import SplitType from "split-type";
import gsap from "gsap";

interface ProjectData {
  title: string;
  copy: string;
  director: string;
  cinematographer: string;
}

const data: ProjectData[] = [
  {
    title: "way of the warrior",
    copy: "immerse yourself in the ancient tradition",
    director: "hirokazu kore-eda",
    cinematographer: "yutaro kondo",
  },
  {
    title: "echoes of silence",
    copy: "a quiet journey through forgotten memories",
    director: "wong kar-wai",
    cinematographer: "christopher doyle",
  },
  {
    title: "beyond the horizon",
    copy: "where ambition meets the edge of the world",
    director: "denis villeneuve",
    cinematographer: "roger deakins",
  },
];

const Feature13: React.FC = () => {
  useEffect(() => {
    const gallery = document.querySelector(
      `.${styles.gallery}`,
    ) as HTMLElement | null;
    const blurryPrev = document.querySelector(
      `.${styles.blurryPrev}`,
    ) as HTMLElement | null;
    const projectPreview = document.querySelector(
      `.${styles.projectPreview}`,
    ) as HTMLElement | null;
    const itemCount = data.length;

    let activeItemIndex = 0;
    let isAnimating = false;

    function createSplitText(element: HTMLElement | null): void {
      if (!element || typeof SplitType === "undefined") return;

      const splitText = new SplitType(element, { types: "lines" });
      element.innerHTML = "";
      splitText.lines?.forEach((line: HTMLElement) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = styles.line;
        const lineSpan = document.createElement("span");
        lineSpan.textContent = line.textContent;
        lineDiv.appendChild(lineSpan);
        element.appendChild(lineDiv);
      });
    }

    const initialInfoText = document.querySelector(
      `.${styles.info} p`,
    ) as HTMLElement | null;
    if (initialInfoText) {
      createSplitText(initialInfoText);
    }

    const elementsToAnimate = document.querySelectorAll(
      `.${styles.title} h1, .${styles.info} p, .${styles.line} span, .${styles.credits} p, .${styles.director} p, .${styles.cinematographer} p`,
    );

    if (typeof gsap !== "undefined") {
      gsap.set(elementsToAnimate, {
        y: 0,
      });
    }

    for (let i = 0; i < itemCount; i++) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add(styles.item);
      if (i === 0) itemDiv.classList.add(styles.active);

      const img = document.createElement("img");
      img.src = `/hero/image${i + 1}.jpg`;
      img.alt = data[i].title;

      itemDiv.appendChild(img);
      itemDiv.dataset.index = i.toString();
      itemDiv.addEventListener("click", () => handleItemClick(i));
      gallery?.appendChild(itemDiv);
    }

    function createElementWithClass(
      tag: string,
      className: string,
    ): HTMLElement {
      const element = document.createElement(tag);
      element.classList.add(className);
      return element;
    }

    function createProjectDetails(activeItem: ProjectData, index: number) {
      const newProjectDetails = createElementWithClass(
        "div",
        styles.projectDetails,
      );

      const detailsStructure = [
        { className: styles.title, tag: "h1", content: activeItem.title },
        { className: styles.info, tag: "p", content: activeItem.copy },
        { className: styles.credits, tag: "p", content: "credits" },
        {
          className: styles.director,
          tag: "p",
          content: `Director: ${activeItem.director}`,
        },
        {
          className: styles.cinematographer,
          tag: "p",
          content: `Cinematographer: ${activeItem.cinematographer}`,
        },
      ];

      detailsStructure.forEach(({ className, tag, content }) => {
        const div = createElementWithClass("div", className);
        const element = document.createElement(tag);
        element.textContent = content;
        div.appendChild(element);
        newProjectDetails.appendChild(div);
      });

      const newProjectImg = createElementWithClass("div", styles.projectImg);
      const newImg = document.createElement("img");
      newImg.src = `/hero/image${index + 1}.jpg`;
      newImg.alt = activeItem.title;
      newProjectImg.appendChild(newImg);

      return {
        newProjectDetails,
        newProjectImg,
        infoP: newProjectDetails.querySelector(
          `.${styles.info} p`,
        ) as HTMLElement | null,
      };
    }

    function handleItemClick(index: number): void {
      if (index === activeItemIndex || isAnimating) return;
      if (!gallery || typeof gsap === "undefined") return;

      isAnimating = true;

      const activeItem = data[index];

      gallery.children[activeItemIndex]?.classList.remove(styles.active);
      gallery.children[index]?.classList.add(styles.active);

      activeItemIndex = index;

      const elementsToAnimate = document.querySelectorAll(
        `.${styles.title} h1, .${styles.info} p, .${styles.line} span, .${styles.credits} p, .${styles.director} p, .${styles.cinematographer} p`,
      );

      const currentProjectImg = document.querySelector(
        `.${styles.projectImg}`,
      ) as HTMLElement | null;
      const currentProjectImgElem = currentProjectImg?.querySelector("img");

      const newBlurryImg = document.createElement("img");
      newBlurryImg.src = `/hero/image${index + 1}.jpg`;
      newBlurryImg.alt = activeItem.title;
      gsap.set(newBlurryImg, {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      });

      blurryPrev?.insertBefore(newBlurryImg, blurryPrev.firstChild);

      const currentBlurryImg = blurryPrev?.querySelector(
        "img:nth-child(2)",
      ) as HTMLElement | null;
      if (currentBlurryImg) {
        gsap.to(currentBlurryImg, {
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          onComplete: () => blurryPrev?.removeChild(currentBlurryImg),
        });
      }

      gsap.to(newBlurryImg, {
        delay: 0.5,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.to(elementsToAnimate, {
        y: -60,
        duration: 1,
        ease: "power4.in",
        stagger: 0.05,
      });

      gsap.to(currentProjectImg, {
        onStart: () => {
          if (currentProjectImgElem) {
            gsap.to(currentProjectImgElem, {
              scale: 2,
              duration: 1,
              ease: "power4.in",
            });
          }
        },
        scale: 0,
        bottom: "10em",
        duration: 1,
        ease: "power4.in",
        onComplete: () => {
          document.querySelector(`.${styles.projectDetails}`)?.remove();
          currentBlurryImg?.remove();

          const { newProjectDetails, newProjectImg, infoP } =
            createProjectDetails(activeItem, index);

          projectPreview?.appendChild(newProjectDetails);
          projectPreview?.appendChild(newProjectImg);

          createSplitText(infoP);

          const newElementsToAnimate = newProjectDetails.querySelectorAll(
            `.${styles.title} h1, .${styles.info} p, .${styles.line} span, .${styles.credits} p, .${styles.director} p, .${styles.cinematographer} p`,
          );

          gsap.fromTo(
            newElementsToAnimate,
            { y: 40 },
            {
              y: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.05,
            },
          );

          gsap.fromTo(
            newProjectImg,
            {
              scale: 0,
              bottom: "-10em",
            },
            {
              scale: 1,
              bottom: "1em",
              duration: 1,
              ease: "power4.out",
            },
          );

          const newProjectImgElement = newProjectImg.querySelector("img");
          if (newProjectImgElement) {
            gsap.fromTo(
              newProjectImgElement,
              {
                scale: 2,
              },
              {
                scale: 1,
                duration: 1,
                ease: "power4.out",
                onComplete: () => {
                  isAnimating = false;
                },
              },
            );
          }
        },
      });
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <div className={styles.container}>
        <div className={styles.blurryPrev}>
          <img src="/hero/image1.jpg" alt="Background preview" />
          <div className={styles.overlay}></div>
        </div>

        <div className={`${styles.col} ${styles.siteInfo}`}>
          <div className={styles.nav}>
            <a href="#">Home</a>
            <a href="#">Work</a>
            <a href="#">Contact</a>
          </div>
          <div className={styles.header}>
            <h1>Welcome to Gallery</h1>
          </div>
          <div className={styles.copy}>
            <p>We are a full-service creative solution</p>
          </div>
        </div>

        <div className={`${styles.col} ${styles.projectPreview}`}>
          <div className={styles.projectDetails}>
            <div className={styles.title}>
              <h1>beyond</h1>
            </div>
            <div className={styles.info}>
              <p>join a team of elite mount:</p>
            </div>
            <div className={styles.credits}>
              <p>credit: something</p>
            </div>
            <div className={styles.director}>
              <p>director: rocky</p>
            </div>
            <div className={styles.cinematographer}>
              <p>cinematographer: rocky r</p>
            </div>
          </div>
          <div className={styles.projectImg}>
            <img src="/hero/image1.jpg" alt="Project preview" />
          </div>
        </div>

        <div className={styles.galleryWrapper}>
          <div className={styles.gallery}></div>
        </div>

      </div>
    </div>
  );
};

export default Feature13;
