"use client";

import { animatePageIn } from "@/utils/animations";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const Page_template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Whenever pathname changes → animate banners down
    animatePageIn();
  }, [pathname]);

  return (
    <div>
      <div
        id="banner-1"
        className="min-h-screen z-[999] bg-neutral-950 fixed top-0 left-0 w-1/5"
      />
      <div
        id="banner-2"
        className="min-h-screen z-[999] bg-neutral-950 fixed top-0 left-1/5 w-1/5"
      />
      <div
        id="banner-3"
        className="min-h-screen z-[999] bg-neutral-950 fixed top-0 left-2/5 w-1/5"
      />
      <div
        id="banner-4"
        className="min-h-screen z-[999] bg-neutral-950 fixed top-0 left-3/5 w-1/5"
      />
      <div
        id="banner-5"
        className="min-h-screen z-[999] bg-neutral-950 fixed top-0 left-4/5 w-1/5"
      />
      {children}
    </div>
  );
};

export default Page_template;
