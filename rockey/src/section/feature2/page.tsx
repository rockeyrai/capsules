/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useEffect } from "react";
import "./Feature2module.css";
import { stories } from "./stories";
import gsap from "gsap";

const Feature2 = () => {
  useEffect(() => {
    let activeStory = 0;
    const storyDuration = 4000;
    const contentUpdateDelay = 0.4;
    let direction = "next";
    let storyTimeout: NodeJS.Timeout;

    const cursor = document.querySelector(".cursor") as HTMLElement;
    const cursorText = cursor?.querySelector("p");

    function changeStory() {
      const previousStory = activeStory;
      if (direction === "next") {
        activeStory = (activeStory + 1) % stories.length;
      } else {
        activeStory = (activeStory - 1 + stories.length) % stories.length;
      }

      const story = stories[activeStory];

      gsap.to(".profile-name p", {
        y: direction === "next" ? -24 : 24,
        duration: 0.5,
        delay: contentUpdateDelay,
      });
      gsap.to(".title-row h1", {
        y: direction === "next" ? -48 : 48,
        duration: 0.5,
        delay: contentUpdateDelay,
      });

      const currentImgContainer = document.querySelector(".story-img .img");
      const currentImg = currentImgContainer?.querySelector("img");

      setTimeout(() => {
        const newProfileName = document.createElement("p");
        newProfileName.innerText = story.profileName;
        newProfileName.style.transform =
          direction === "next" ? "translateY(24px)" : "translateY(-24px)";

        const profileNameDiv = document.querySelector(".profile-name");
        profileNameDiv?.appendChild(newProfileName);

        gsap.to(newProfileName, {
          y: 0,
          duration: 0.5,
          delay: contentUpdateDelay,
        });

        const titleRows = document.querySelectorAll(".title-row");
        story.title.forEach((line, index) => {
          if (titleRows[index]) {
            const newTitle = document.createElement("h1");
            newTitle.innerText = line;
            newTitle.style.transform =
              direction === "next" ? "translateY(48px)" : "translateY(-48px)";
            titleRows[index].appendChild(newTitle);

            gsap.to(newTitle, {
              y: 0,
              duration: 0.5,
              delay: contentUpdateDelay,
            });
          }
        });

        const newImgContainer = document.createElement("div");
        newImgContainer.classList.add("img");
        const newStoryImg = document.createElement("img");
        newStoryImg.src = story.storyImg;
        newStoryImg.alt = story.profileName;
        newImgContainer.appendChild(newStoryImg);

        const storyImgDiv = document.querySelector(".story-img");
        storyImgDiv?.appendChild(newImgContainer);

        animateNewImage(newImgContainer);

        const upcomingImg = newStoryImg;
        animateNewImageScale(currentImg ?? null, upcomingImg);

        resetIndexHighlight(previousStory);
        animateIndexHighlight(activeStory);
        cleanUpElements();

        clearTimeout(storyTimeout);
        storyTimeout = setTimeout(changeStory, storyDuration);
      }, 200);

      setTimeout(() => {
        const profileImg = document.querySelector(
          ".profile-icon img"
        ) as HTMLImageElement | null;
        if (profileImg) profileImg.src = story.profileImg;

        const link = document.querySelector(
          ".link a"
        ) as HTMLAnchorElement | null;
        if (link) {
          link.textContent = story.linkLabel;
          link.href = story.linkSrc;
        }
      }, 600);
    }

    function animateNewImage(newImgContainer: HTMLElement) {
      gsap.set(newImgContainer, {
        clipPath:
          direction === "next"
            ? "polygon(100% 0%, 100% 0%,100% 100%,100% 100%)"
            : "polygon(0% 0%, 0% 0%,0% 100% , 0% 100%)",
      });
      gsap.to(newImgContainer, {
        clipPath: "polygon(0% 0%, 100% 0%,100% 100%,0% 100%)",
        duration: 1,
        ease: "power4.inOut",
      });
    }

    function animateNewImageScale(
      currentImg: HTMLImageElement | null,
      upcomingImg: HTMLImageElement
    ) {
      gsap.fromTo(
        currentImg,
        {
          scale: 1,
          rotate: 0,
        },
        {
          scale: 2,
          rotate: direction === "next" ? -25 : 25,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            currentImg?.parentElement?.remove();
          },
        }
      );

      gsap.fromTo(
        upcomingImg,
        {
          scale: 2,
          rotate: direction === "next" ? 25 : -25,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "power4.inOut",
        }
      );
    }

    function resetIndexHighlight(index: number) {
      const highlight = document.querySelectorAll(".index .index-highlight")[
        index
      ];
      gsap.killTweensOf(highlight);
      gsap.to(highlight, {
        width: direction === "next" ? "100%" : "0%",
        duration: 0.3,
        onStart: () => {
          gsap.to(highlight, {
            transformOrigin: "right center",
            scaleX: 0,
            duration: 0.3,
          });
        },
      });
    }

    function animateIndexHighlight(index: number) {
      const highlight = document.querySelectorAll(".index .index-highlight")[
        index
      ];
      gsap.set(highlight, {
        width: "0%",
        scaleX: 1,
        transformOrigin: "right center",
      });
      gsap.to(highlight, {
        width: "100%",
        duration: storyDuration / 1000,
        ease: "none",
      });
    }

    function cleanUpElements() {
      const profileNameDiv = document.querySelector(".profile-name");
      const titleRows = document.querySelectorAll(".title-row");

      while (profileNameDiv && profileNameDiv.childElementCount > 2) {
        const first = profileNameDiv.firstChild;
        if (first) {
          profileNameDiv.removeChild(first);
        } else {
          break;
        }
      }

      titleRows.forEach((titleRow) => {
        while (titleRow.childElementCount > 2) {
          const first = titleRow.firstChild;
          if (first) {
            titleRow.removeChild(first);
          } else {
            break;
          }
        }
      });
    }

    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, {
        x: clientX - cursor.offsetWidth / 2,
        y: clientY - cursor.offsetHeight / 2,
        ease: "power3.out",
        duration: 0.3,
      });

      const viewportWidth = window.innerWidth;
      if (cursorText) {
        if (clientX < viewportWidth / 2) {
          cursorText.textContent = "Prev";
          direction = "prev";
        } else {
          cursorText.textContent = "Next";
          direction = "next";
        }
      }
    });

    document.addEventListener("click", () => {
      clearTimeout(storyTimeout);
      resetIndexHighlight(activeStory);
      changeStory();
    });

    storyTimeout = setTimeout(changeStory, storyDuration);
    animateIndexHighlight(activeStory);

    // Cleanup
    return () => {
      clearTimeout(storyTimeout);
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="cursor">
          <p></p>
        </div>
        <div className="story-img">
          <div className="img">
            <img src="./hero/image1.jpg" />
          </div>
        </div>
        <div className="story-content">
          <div className="row">
            <div className="indices">
              <div className="index">
                <div className="index-highlight"></div>
              </div>
              <div className="index">
                <div className="index-highlight"></div>
              </div>
              <div className="index">
                <div className="index-highlight"></div>
              </div>
              <div className="index">
                <div className="index-highlight"></div>
              </div>
              <div className="index">
                <div className="index-highlight"></div>
              </div>
              <div className="index">
                <div className="index-highlight"></div>
              </div>
            </div>
            <div className="profile">
              <div className="profile-icon">
                <img src="./logo.png" />
              </div>
              <div className="profile-name">
                <p>Rockery</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="title">
              <div className="title-row">
                <h1>Showcasing creative </h1>
              </div>
              <div className="title-row">
                <h1>Portfolios and Projects</h1>
              </div>
              <div className="title-row">
                <h1>From top designers</h1>
              </div>
            </div>
            <div className="link">
              <a href="https://behance.net" target="_blank">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature2;
