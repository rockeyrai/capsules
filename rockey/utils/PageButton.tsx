"use client";
import { useRouter, usePathname } from "next/navigation";
import { animatePageOut, animatePageIn } from "@/utils/animations";

export function usePageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const transitionTo = async (href: string) => {
    // If user clicks the current route, just animate back in
    if (href === pathname) {
      animatePageIn();
      return;
    }

    await animatePageOut(); // wait for banners up
    router.push(href);      // navigate
  };

  return transitionTo;
}
