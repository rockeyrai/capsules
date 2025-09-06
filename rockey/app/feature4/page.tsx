/* eslint-disable @next/next/no-img-element */
"use client"
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import "./Feature4Modue.css";

const FeatureFour = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const config = {
      gap: 0.08,
      speed: 0.3,
      arcRadius: 500,
    };

    const spotlightItems = [
      { name: "slient Arch", img: "/hero/image1.jpg" },
      { name: "bloom24", img: "/hero/image2.jpg" },
      { name: "echo9", img: "/hero/image3.jpg" },
      { name: "field two", img: "/hero/image4.webp" },
      { name: "hero 3", img: "/hero/image1.jpg" },
      { name: "hero6", img: "/hero/image1.jpg" },
    ];

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const titlesContainer = document.querySelector(".spotlight-titles");
    const imagesContainer = document.querySelector(".spotlight-images");
    const spotlightHeader = document.querySelector(".spotlight-header");
    const titlesContainerElement = document.querySelector(
      ".spotlight-titles-container"
    );
    const introTextElements = document.querySelectorAll(".spotlight-intro-text");
    const imageElements: HTMLElement[] = [];

    spotlightItems.forEach((items, index) => {
      const titleElement = document.createElement("h1");
      titleElement.textContent = items.name;
      if (index === 0) titleElement.style.opacity = "1";
      titlesContainer?.appendChild(titleElement);

      const imgWrapper = document.createElement("div");
      imgWrapper.className = "spotlight-img";
      const imgElement = document.createElement("img");
      imgElement.src = items.img;
      imgElement.alt = "";
      imgWrapper.appendChild(imgElement);
      imagesContainer?.appendChild(imgWrapper);
      imageElements.push(imgWrapper);
    });

    const titleElements = titlesContainer?.querySelectorAll("h1");
    let currentActiveIndex = 0;

    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;

    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t: number) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;
      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;

      return { x, y };
    }

    function getImgProgressState(index: number, overallProgress: number) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / config.speed;
    }

    imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

    ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress < 0.2) {
          const animationProgress = progress / 0.2;
          const moveDistance = window.innerWidth * 0.6;

          gsap.set(introTextElements[0], {
            x: -animationProgress * moveDistance,
          });
          gsap.set(introTextElements[1], {
            x: animationProgress * moveDistance,
          });
          gsap.set(introTextElements[0], { opacity: 1 });
          gsap.set(introTextElements[1], { opacity: 1 });

          gsap.set(".spotlight-bg-img", {
            transform: `scale(${animationProgress})`,
          });
          gsap.set(".spotlight-bg-img img", {
            transform: `scale(${1.5 - animationProgress * 0.5})`,
          });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

          if (spotlightHeader) {
            (spotlightHeader as HTMLElement).style.opacity = "0";
          }
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        } else if (progress > 0.2 && progress <= 0.25) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader) {
            (spotlightHeader as HTMLElement).style.opacity = "1";
          }
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        } else if (progress > 0.25 && progress < 0.95) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          if (spotlightHeader) {
            (spotlightHeader as HTMLElement).style.opacity = "1";
          }
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const titleContainerHeight = titlesContainer?.scrollHeight || 0;
          const startPosition = viewportHeight;
          const targetPosition = -titleContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".spotlight-titles", {
            transform: `translateY(${currentY}px)`
          });

          imageElements.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElements?.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndex) {
            if (titleElements && titleElements[currentActiveIndex]) {
              (titleElements[currentActiveIndex] as HTMLElement).style.opacity = "0.25";
            }
            if (titleElements && titleElements[closestIndex]) {
              (titleElements[closestIndex] as HTMLElement).style.opacity = "1";
            }
            const bgImg = document.querySelector(".spotlight-bg-img img") as HTMLImageElement;
            if (bgImg) {
              bgImg.src = spotlightItems[closestIndex].img;
            }
            currentActiveIndex = closestIndex;
          }
        } else if (progress > 0.95) {
          if (spotlightHeader) {
            (spotlightHeader as HTMLElement).style.opacity = "0";
          }
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <section className="intro">
        <h1>A curated series of surreal frames</h1>
      </section>
      <section className="spotlight ">
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text">
            <p>Beneath</p>
          </div>
          <div className=" spotlight-intro-text">
            <p>Beneath 2</p>
          </div>
        </div>
        <div className="spotlight-bg-img">
          <img src="/hero/image3.jpg" alt="" />
        </div>
        <div className="spotlight-titles-container">
          <div className="spotlight-titles"></div>
        </div>
        <div className="spotlight-images"></div>
        <div className="spotlight-header">
          <p>Discover</p>
        </div>
      </section>
      <section className="outro">
        <h1>Moments in still motion</h1>
      </section>
    </div>
  );
};

export default FeatureFour;