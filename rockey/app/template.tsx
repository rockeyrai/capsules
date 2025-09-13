"use client";
import { animatePageIn } from "@/utils/animations";
import React, { useEffect } from "react";

// a template file is similar to a layout in that it wraps each child layout or page. Unlike layouts that persist across routes and maintain state, templates create new instance for each of their childrend on navigationl.

const Page_template = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        id="banner-1"
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-0 w-1/5"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-1/5 w-1/5"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-2/5 w-1/5"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-3/5 w-1/5"
      />
      <div
        id="banner-5"
        className="min-h-screen bg-neutral-950 z-10 fixed top-0 left-4/5 w-1/5"
      />
      {children}
    </div>
  );
};

export default Page_template;
