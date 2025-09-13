// utils/animations.ts
import gsap from "gsap";

export const animatePageIn = () => {
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4"),
    document.getElementById("banner-5"),
  ].filter(Boolean); // remove null values

  if (banners.length === 5) {
    const tl = gsap.timeline();

    tl.set(banners, { yPercent: 0 })
      .to(banners, {
        yPercent: 100,
        stagger: 0.2,
        ease: "power2.inOut",
      })
      .to(banners, {
        yPercent: 0,
        stagger: 0.2,
        ease: "power2.inOut",
      });
  }
};
