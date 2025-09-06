import React from "react";

const Menu = () => {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomeEase.create("hop", ".87,0,.13,1");

    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(tiem);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const textContainers = document.querySelectorAll(".menu-col");
    let splitTextByContainer = [];

    textContainers.forEach((container) => {
      const textElements = container.querySelectorAll("a, p");
      let containerSplits = [];

      textElements.forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });
        containerSplites.push(split);

        gsap.set(split.lines, { y: "-110%" });
      });
      splitTextByContainer.push(containerSplits);
    });

    const container = document.querySelector(".container");
    const menuToggleBtn = document.querySelector(".menu-toggle-bth");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuOverlayContainer = document.querySelector(
      ".menu-overlay-content"
    );
    const menuMediaWrapper = document.querySelector(".menu-media-wrapper");
    const copyContainers = document.querySelectorAll(".menu-col");
    const menuToggleLabel = document.querySelector(".menu-toggle-label p");
    const hamburgerIcon = document.querySelector(".menu-hamburger-icon");

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
              y: "100svh",
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
          const copyLines = containerSplite.flatMap((split) => split.lines);

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

        hamburgerIcon?.classList.add("active");
        tl.call(() => {
          isAnimating = false;
        });

        isMenuOpen = true;
      } else {
        isAnimating = true;

        hamburgerIcon?.classList.remove("active");
        const tl = gsap.timeline();

        tl.to(container, {
          y: "0svh",
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

          tl.call(()=>{
            splitTextByContainer.forEach((containerSplits)=>{
                const copyLines = containerSplits.flatMap((split)=>split.lines)
                gsap.set(copyLines, {y:"-110%"});
            })

            gsap.set(copyContainers,{opacity:1})
            gsap.set(menuMediaWrapper,{opacity:0});

            isAnimating = false;
            lenis.start();
          })
          isMenuOpen = false
      }
    });
  });

  return (
    <>
      <nav>
        <div className="menu-bar">
          <div className="menu-logo">
            <a href="#">
              <img src="/hero/image1.jpg" alt="just" />
            </a>
          </div>
          <div className="menu-toggle-bth">
            <div className="menu-toggle-label">
              <p>Menu</p>
            </div>
            <div className="menu-hamburger-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="menu-overlay">
          <div className="menu-overlay-content">
            <div className="menu-media-wrapper">
              <img src="/hero/image2.jpg" alt="" />
            </div>
            <div className="menu-content-wrapper">
              <div className="menu-content-main">
                <div className="menu-col">
                  <div className="menu-link">
                    <a href="#">Index 1</a>
                  </div>
                  <div className="menu-link">
                    <a href="#">Index 2</a>
                  </div>
                  <div className="menu-link">
                    <a href="#">Index 3</a>
                  </div>
                  <div className="menu-link">
                    <a href="#">Index 4</a>
                  </div>
                  <div className="menu-link">
                    <a href="#">Index 5</a>
                  </div>
                </div>
                <div className="menu-col">
                  <div className="menu-tag">
                    <a href="#">web Animations 1</a>
                  </div>
                  <div className="menu-tag">
                    <a href="#">web Animations 2</a>
                  </div>
                  <div className="menu-tag">
                    <a href="#">web Animations 3</a>
                  </div>
                </div>
              </div>
              <div className="menu-footer">
                <div className="menu-col">
                  <p>kirtipur, Kathmandu</p>
                </div>
                <div className="menu-col">
                  <p>40054, Townplaning</p>
                  <p>rockeyrai234@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <section className="hero">
          <h1>Modern design system made that looks timeless</h1>
        </section>
        <section className="banner">
          <img src="/hero/image2.jpg" alt="image 2" />
        </section>
        <section className="outro">
          <h1>Lets buld someting quiketly icones</h1>
        </section>
      </div>
    </>
  );
};

export default Menu;
