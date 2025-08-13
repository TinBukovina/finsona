"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 10; // Minimum scroll distance (px) to trigger the hide/show logic

export function useAutoHideDiv(
  scrollableElementRef?: React.RefObject<HTMLElement | null>
) {
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const target = scrollableElementRef?.current || window;

    const controlNavbar = () => {
      const isWindow = target === window;
      const currentScroll = isWindow
        ? window.scrollY
        : (target as HTMLElement).scrollTop;

      // Return early if the minimum scroll distance hasn't been reached
      if (Math.abs(currentScroll - lastScrollY.current) <= SCROLL_THRESHOLD) {
        return;
      }

      const atBottom = isWindow
        ? window.innerHeight + currentScroll >= document.body.offsetHeight - 10
        : (target as HTMLElement).scrollHeight -
            currentScroll -
            (target as HTMLElement).clientHeight <=
          80;

      // Always show navigation if we ar at the top or bottom
      if (currentScroll <= 10 || atBottom) {
        setShowNav(true);
      }
      // Scroll down
      else if (currentScroll > lastScrollY.current) {
        setShowNav(false);
        lastScrollY.current = currentScroll;
      }
      // Scroll up
      else {
        setShowNav(true);
        lastScrollY.current = currentScroll;
      }
    };

    target.addEventListener("scroll", controlNavbar, { passive: true });

    return () => {
      target.removeEventListener("scroll", controlNavbar);
    };
  }, [scrollableElementRef]);

  return showNav;
}
