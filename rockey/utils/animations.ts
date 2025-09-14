// utils/animations.ts
import gsap from "gsap";

const getBanners = () =>
  [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4"),
    document.getElementById("banner-5"),
  ].filter(Boolean) as HTMLElement[];

// Animate UP (before new page render)
export const animatePageOut = async () => {
  const banners = getBanners();
  if (banners.length !== 5) return;

  return new Promise<void>((resolve) => {
    gsap.timeline({
      onComplete: () => resolve(),
    })
      .set(banners, { yPercent: 100 })
      .to(banners, {
        yPercent: 0,
        stagger: 0.2,
        ease: "power2.inOut",
        duration: 0.5,
      });
  });
};

// Animate DOWN (after new page render)
export const animatePageIn = () => {
  const banners = getBanners();
  if (banners.length !== 5) return;

  gsap.timeline()
    .to(banners, {
      yPercent: 100,
      stagger: 0.2,
      ease: "power2.inOut",
      duration: 0.6,
    });
};
