/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import "./Feature1module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

const Feature1: React.FC = () => {

    useEffect(() => {

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const animatedIcons = document.querySelectorAll(".animated-icons");
  const iconElements = document.querySelectorAll(".animated-icon");
  const textSegments = document.querySelectorAll(".text-segment");
  const placeholders = document.querySelectorAll(".placeholder-icon");
  const heroHeader = document.querySelector(".hero-header");
  const heroSection = document.querySelector(".hero") as HTMLElement;

  const textAnimationOrder: { segment: Element; originalIndex: number }[] = [];

  textSegments.forEach((segment, index) => {
    textAnimationOrder.push({ segment, originalIndex: index });
  });

  for (let i = textAnimationOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [textAnimationOrder[i], textAnimationOrder[j]] = [
      textAnimationOrder[j],
      textAnimationOrder[i],
    ];
  }

  const isMobile = window.innerWidth <= 768;
  const headerIconSize = isMobile ? 30 : 60;
  const currentIconSize = iconElements[0]?.getBoundingClientRect().width || 1;
  const exactScale = headerIconSize / currentIconSize;

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `+=${window.innerHeight * 8}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      textSegments.forEach((segment) => {
        gsap.set(segment, { opacity: 0 });
      });

      if (progress < 0.3) {
        const moveProgress = progress / 0.3;
        const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

        if (progress < 0.15) {
          const headerProgress = progress / 0.15;
          const headerMoveY = -50 * headerProgress;
          const headerOpacity = 1 - headerProgress;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
            opacity: headerOpacity,
          });
        } else {
          gsap.set(heroHeader, {
            transform: "translate(-50%, calc(-50% + -50px))",
            opacity: 0,
          });
        }

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach((duplicate: HTMLElement) => {
            duplicate?.parentNode?.removeChild(duplicate);
          });
          window.duplicateIcons = null;
        }

        gsap.set(animatedIcons, {
          x: 0,
          y: containerMoveY,
          scale: 1,
          opacity: 1,
        });

        iconElements.forEach((icon, index) => {
          const staggerDelay = index * 0.1;
          const iconStart = staggerDelay;
          const iconEnd = staggerDelay + 0.5;

          const iconProgress = gsap.utils.mapRange(
            iconStart,
            iconEnd,
            0,
            1,
            moveProgress
          );
          const clampedProgress = Math.max(0, Math.min(1, iconProgress));

          const startOffset = -containerMoveY;
          const individualY = startOffset * (1 - clampedProgress);

          gsap.set(icon, {
            x: 0,
            y: individualY,
          });
        });
      } else if (progress < 0.6) {
        const scaleProgress = (progress - 0.3) / 0.3;

        gsap.set(heroHeader, {
          transform: "translate(-50%, calc(-50% + -50px))",
          opacity: 0,
        });

        if (scaleProgress > 0.5) {
          if (heroSection) heroSection.style.backgroundColor = "#e3e3db";
        } else {
          if (heroSection) heroSection.style.backgroundColor = "#141414";
        }

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach((duplicate: HTMLElement) => {
            duplicate?.parentNode?.removeChild(duplicate);
          });
          window.duplicateIcons = null;
        }

        const targetCenterY = window.innerHeight / 2;
        const targetCenterX = window.innerWidth / 2;
        const containerRect = animatedIcons[0].getBoundingClientRect();
        const currentCenterX = containerRect.left + containerRect.width / 2;
        const currentCenterY = containerRect.top + containerRect.height / 2;
        const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
        const deltaY = (targetCenterY - currentCenterY) * scaleProgress;
        const baseY = -window.innerHeight * 0.3;
        const currentScale = 1 + (exactScale - 1) * scaleProgress;

        gsap.set(animatedIcons, {
          x: deltaX,
          y: baseY + deltaY,
          scale: currentScale,
          opacity: 1,
        });

        iconElements.forEach((icon) => {
          gsap.set(icon, { x: 0, y: 0 });
        });
      } else if (progress < 0.75) {
        const moveProgress = (progress - 0.6) / 0.15;

        gsap.set(heroHeader, {
          transform: "translate(-50%, calc(-50% + -50px))",
          opacity: 0,
        });

        if (heroSection) heroSection.style.backgroundColor = "#e3e3db";

        const targetCenterY = window.innerHeight / 2;
        const targetCenterX = window.innerWidth / 2;
        const containerRect = animatedIcons[0].getBoundingClientRect();
        const currentCenterX = containerRect.left + containerRect.width / 2;
        const currentCenterY = containerRect.top + containerRect.height / 2;
        const deltaX = targetCenterX - currentCenterX;
        const deltaY = targetCenterY - currentCenterY;
        const baseY = -window.innerHeight * 0.3;

        gsap.set(animatedIcons, {
          x: deltaX,
          y: baseY + deltaY,
          scale: exactScale,
          opacity: 0,
        });

        iconElements.forEach((icon) => {
          gsap.set(icon, { x: 0, y: 0 });
        });

        if (!window.duplicateIcons) {
          window.duplicateIcons = [];

          iconElements.forEach((icon) => {
            const duplicate = icon.cloneNode(true) as HTMLElement;
            duplicate.className = "duplicate-icon";
            duplicate.style.position = "absolute";
            duplicate.style.width = headerIconSize + "px";
            duplicate.style.height = headerIconSize + "px";
            document.body.appendChild(duplicate);
            window?.duplicateIcons?.push(duplicate);
          });
        }

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach(
            (duplicate: HTMLElement, index: number) => {
              if (index < placeholders.length) {
                const iconRect = iconElements[index].getBoundingClientRect();
                const startCenterX = iconRect.left + iconRect.width / 2;
                const startCenterY = iconRect.top + iconRect.height / 2;
                const startPageX = startCenterX + window.pageXOffset;
                const startPageY = startCenterY + window.pageYOffset;

                const targetRect = placeholders[index].getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                const moveX = targetPageX - startPageX;
                const moveY = targetPageY - startPageY;

                let currentX = 0;
                let currentY = 0;

                if (moveProgress < 0.5) {
                  const verticalProgress = moveProgress / 0.5;
                  currentY = moveY * verticalProgress;
                } else {
                  const horizontalProgress = (moveProgress - 0.5) / 0.5;
                  currentY = moveY;
                  currentX = moveX * horizontalProgress;
                }

                const finalPageX = startPageX + currentX;
                const finalPageY = startPageY + currentY;

                duplicate.style.left = `${finalPageX - headerIconSize / 2}px`;
                duplicate.style.top = `${finalPageY - headerIconSize / 2}px`;
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            }
          );
        }
      } else {
        gsap.set(heroHeader, {
          transform: "translate(-50%, calc(-50% + -100px))",
          opacity: 0,
        });

        if (heroSection) heroSection.style.backgroundColor = "#e3e3db";

        gsap.set(animatedIcons, { opacity: 0 });

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach(
            (duplicate: HTMLElement, index: number) => {
              if (index < placeholders.length) {
                const targetRect = placeholders[index].getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                duplicate.style.left = `${targetPageX - headerIconSize / 2}px`;
                duplicate.style.top = `${targetPageY - headerIconSize / 2}px`;
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            }
          );
        }

        textAnimationOrder.forEach((item, randomIndex) => {
          const segmentStart = 0.75 + randomIndex * 0.03;
          const segmentEnd = segmentStart + 0.015;

          const segmentProgress = gsap.utils.mapRange(
            segmentStart,
            segmentEnd,
            0,
            1,
            progress
          );
          const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

          gsap.set(item.segment, {
            opacity: clampedProgress,
          });
        });
      }
    },
  });
  }, []);
  return (
    <div>
      <section className="hero">
        <div className="hero-header">
          <h1>Rockey</h1>
          <p>One subscription, endless web dev</p>
        </div>
        <div className="animated-icons">
          {[1, 2, 3, 4, 5].map((n) => (
            <div className={`animated-icon icon-${n}`} key={n}>
              <img
                src={`/hero/image${n}.${n === 4 ? "webp" : "jpg"}`}
                alt={`Icon ${n}`}
              />
            </div>
          ))}
        </div>

        <h1 className="animated-text">
          <div className="placeholder-icon" />
          <span className="text-segment">Delve into coding</span>
          <div className="placeholder-icon" />
          <span className="text-segment">with Rockey</span>
          <span className="text-segment">unleash your creativity</span>
          <div className="placeholder-icon" />
          <span className="text-segment">with Rockey Rai</span>
          <div className="placeholder-icon" />
          <span className="text-segment">publish on Rockey Rai</span>
          <div className="placeholder-icon" />
          <span className="text-segment">YouTube channel</span>
        </h1>
      </section>

      <section className="outro">
        <h1>Join Rockey today</h1>
      </section>
    </div>
  );
};

export default Feature1;
