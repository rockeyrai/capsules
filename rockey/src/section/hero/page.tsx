/* eslint-disable @next/next/no-img-element */
"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useEffect } from "react";
import "./HeroMoidule.css";

const HeroPage = () => {
  useEffect(() => {
    gsap.registerPlugin(Flip, SplitText);

    const setupTextSplitting = ()=>{
    const textElements = document.querySelectorAll("h1, h2, p, a");
    textElements.forEach((element)=>{
      SplitText.create(element,{
        type:"lines",
        linesClass:"line",
      })

      const lines = element.querySelectorAll(".hero-line");
      lines.forEach((line)=>{
        const textContext = line.textContent;
        line.innerHTML = `<span>${textContext}</span>`
      })
    })
    }

    const createCounterDigits = () => {
      const counter1 = document.querySelector(".hero-counter-1");
      const num0 = document.createElement("div");
      num0.className = "num";
      num0.textContent = "0";
      counter1?.appendChild(num0);

      const num1 = document.createElement("div");
      num1.className = "num num1offset1";
      num1.textContent = "1";
      counter1?.appendChild(num1);

      const counter2 = document.querySelector(".hero-counter-2");
      for (let i = 0; i < 10; i++) {
        const numDiv = document.createElement("div");
        numDiv.className = i === 1 ? "num num1offset2" : "num";
        numDiv.textContent = i === 10 ? "0" : i.toString();
        counter2?.appendChild(numDiv);
      }

      const counter3 = document.querySelector(".hero-counter-3");
      for (let i = 0; i < 30; i++) {
        const numDiv = document.createElement("div");
        numDiv.className = "num";
        numDiv.textContent = (i % 10).toString();
        counter3?.appendChild(numDiv);
      }

      const finalNum = document.createElement("div");
      finalNum.className = "num";
      finalNum.textContent = "0";
      counter3?.appendChild(finalNum);
    };

    const animateCounter = (
      counter: Element | null,
      duration: number,
      delay = 0
    ) => {
      if (!counter) return;
      const num = counter.querySelector(".num");
      const height = num?.clientHeight || 0;
      const total = counter.querySelectorAll(".num").length - 1;

      gsap.to(counter, {
        y: -total * height,
        duration,
        delay,
        ease: "power2.inOut",
      });
    };

    const animateImages = () => {
      const images = document.querySelectorAll(".img");
      images.forEach((img) => img.classList.remove("animate-out"));

      const state = Flip.getState(images);
      images.forEach((img) => img.classList.add("animate-out"));

      const mainTimeline = gsap.timeline();
      mainTimeline.add(
        Flip.from(state, {
          duration: 1,
          stagger: 0.1,
          ease: "power3.inOut",
        })
      );

      images.forEach((img, index) => {
        const scaleTimeline = gsap.timeline();
        scaleTimeline
          .to(
            img,
            {
              scale: 2.5,
              duration: 0.45,
              ease: "power3.in",
            },
            0.025
          )
          .to(
            img,
            {
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
            },
            0.5
          );

        mainTimeline.add(scaleTimeline, index * 0.1);
      });

      return mainTimeline;
    };

    // Run animations
    setupTextSplitting();
    createCounterDigits();

    animateCounter(document.querySelector(".hero-counter-3"), 2.5);
    animateCounter(document.querySelector(".hero-counter-2"), 3);
    animateCounter(document.querySelector(".hero-counter-1"), 2, 1.5);

    const tl = gsap.timeline();
    gsap.set(".img", { scale: 0 });

    tl.to(".hero-bg", {
      scaleY: "100%",
      duration: 3,
      ease: "power2.inOut",
      delay: 0.25,
    });

    tl.to(
      ".img",
      {
        scale: 1,
        duration: 1,
        stagger: 0.125,
        ease: "power3.out",
      },
      "<"
    );

    tl.to(".hero-counter", {
      opacity: 0,
      duration: 0.3,
      delay:0.3,
      ease: "power3.out",
      onStart: () => {
        console.log("wokring")
        animateImages();
      },
    },);

    tl.to(".hero-sidebar .hero-divider", {
      scaleY: "100%",
      duration: 1,
      ease: "power3.inOut",
      delay: 1.25,
    });

    tl.to(
      ["nav .hero-divider", ".hero-site-info .hero-divider"],
      {
        scaleX: "100%",
        duration: 1,
        stagger: 0.5,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(".hero-logo",{
      scale:1,
      duration:1,
      ease:"power4.inOut",
    },"<")

    tl.to(
      [".hero-logo-name a span", ".link a span", ".hero-links p span", ".cta a span"],
      {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      },
      "<"
    );

    tl.to(
      [".hero-header span", ".hero-site-info span", ".hero-footer span"],
      {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      },
      "<"
    );
  }, []);
  return (
    <div>
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-counter">
          <div className="hero-counter-1 hero-digit"></div>
          <div className="hero-counter-2 hero-digit"></div>
          <div className="hero-counter-3 hero-digit"></div>
        </div>
        <div className="hero-images-container">
          <div className="img">
            <img src="hero/image1.jpg" alt="Image 1" />
          </div>
          <div className="img">
            <img src="hero/image2.jpg" alt="Image 2" />
          </div>
          <div className="img">
            <img src="hero/image3.jpg" alt="Image 3" />{" "}
          </div>
          <div className="img">
            <img src="hero/image4.webp" alt="Image 4" />
          </div>
          <div className="img">
            <img src="hero/image5.jpg" alt="Image 5" />
          </div>
                    <div className="img">
            <img src="hero/image1.jpg" alt="Image 1" />
          </div>
          <div className="img">
            <img src="hero/image2.jpg" alt="Image 2" />
          </div>
          <div className="img">
            <img src="hero/image3.jpg" alt="Image 3" />{" "}
          </div>
          <div className="img">
            <img src="hero/image4.webp" alt="Image 4" />
          </div>
          <div className="img">
            <img src="hero/image5.jpg" alt="Image 5" />
          </div>
                    <div className="img">
            <img src="hero/image1.jpg" alt="Image 1" />
          </div>
          <div className="img">
            <img src="hero/image2.jpg" alt="Image 2" />
          </div>
          <div className="img">
            <img src="hero/image3.jpg" alt="Image 3" />{" "}
          </div>
          <div className="img">
            <img src="hero/image4.webp" alt="Image 4" />
          </div>
          <div className="img">
            <img src="hero/image5.jpg" alt="Image 5" />
          </div>
        </div>

        <nav className="hero-nav">
          <div className="hero-logo-name">
            <a href="#">Rock</a>
          </div>

          <div className="hero-nav-items">
            <div className="hero-links">
              <a href="#">Home</a>
              <p></p>
              <a href="#">About</a>
            </div>
          </div>
          <div className="cta">
            <a href="#" className="btn">
              Get Started
            </a>
          </div>
          <div className="hero-divider"></div>
        </nav>

        <div className="hero-sidebar">
          <div className="hero-logo">
            <img src="logo.png" alt="Logo" />
          </div>

          <div className="hero-divider"></div>
        </div>

        <div className="hero-header">
          <h1>Welcome to Rock</h1>
        </div>
        <div className="hero-site-info">
          <h2>A dazzling theme for your next project</h2>
          <div className="hero-divider"></div>
          <div className="hero-site-info-copy">
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Ut enim ad minim veniam, </p>
          </div>
        </div>
        <div className="hero-footer">
          <h2>Join the community</h2>
        </div>
      </section>
    </div>
  );
};
export default HeroPage;
