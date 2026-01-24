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
import Feature8 from "../section/feature8";
import Feature9 from "../section/feature9";
import Feature10 from "../section/feature10";
import Feature11 from "../section/feature11";
import Feature2 from "../section/feature2/page";
import CandlestickGame from "../section/stockgame";
import GameComponent from "../section/stockgame";
import Feature13 from "../section/feature13/feature13";

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
      {/* <HeroOne/>  capsule hero loading hero  */}
      {/* <HeroPage/> counting number and image reviel */}
      {/* <Feature7/> scrach to review */}
      {/* <TestPage/> */}
      {/* <Feature6/> bug  */}
      {/* <Home/> */}
      {/* <Feature1/> bug needd to be fix  */}
      {/* <FeatureFour/> bug need fix  */}
      {/* <Feature5/>   bug neede fix  */}
      {/* <Feature8/>  horizontal scroll and change to vertical  */}
      {/* <Feature9/>  revil animation hero or feature  */}
      {/* <Feature10/>    right side image and left side title and descp when scoll it change  */}
      {/* <Feature11/>  3 horizontal row with image and text  move  when scroll  */}  for teach-stack useed
      {/* <Feature2/>  instagra story slide  */}  use for hobby page hero
      {/* <GameComponent/>  test game with bug  */}
      {/* <Feature13/> right sdie has a scrollowing image  and when clicking the image the hero change  */}
    </>
  );
}
