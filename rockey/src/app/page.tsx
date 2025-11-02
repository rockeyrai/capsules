"use client"; // Only if you're using App Router and want interactivity

import { usePageTransition } from "@/utils/PageButton";
import { usePathname } from "next/navigation";
import HeroPage from "../section/hero/page";
import HeroOne from "../section/hero1/page";
import Menu from "../section/menu/page";
import TestPage from "../section/test2/page";
import Feature7 from "../section/feature7";
import Feature6 from "../section/feature6/page";
import Home from "../section/feature/page";
import Feature1 from "../section/feature1/page";
import FeatureFour from "../section/feature4/page";
import Feature5 from "../section/feature5/page";

const routes = [
  { path: "/", name: "Home" },
  { path: "/feature", name: "feature" },
  { path: "/feature1", name: "feature1" },
  { path: "/feature2", name: "feature2" },
  { path: "/feature3", name: "feature3" },
  { path: "/footer", name: "footer" },
  { path: "/hero", name: "hero" },
  { path: "/test", name: "test" },
];

export default function Navbar() {
  const pathname = usePathname(); // For highlighting active link
  const transitionTo = usePageTransition();
  // onClick={() => transitionTo(route.path)}

  return (
    <>
      {/* <Menu/> */}
      {/* <HeroOne/> */}
      {/* <HeroPage/> */}
      {/* <Feature7/> */}
      {/* <TestPage/> */}
      <Feature6/>
      {/* <Home/> */}
      {/* <Feature1/> */}
      {/* <FeatureFour/> */}
      {/* <Feature5/> */}
    </>
  );
}
