"use client"; // Only if you're using App Router and want interactivity

import { usePageTransition } from "@/utils/PageButton";
import { usePathname } from "next/navigation";
import HeroPage from "../section/hero/page";

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

  return <>
  <HeroPage/>
  </>;
}
