import { useEffect, useState } from "react";

function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    const mobileScrollContainer = document?.querySelector(
      "#mobileScrollContainer"
    );

    let lastScrollY = 0;
    let target = window;

    if (mobileScrollContainer) {
      target = mobileScrollContainer;
      lastScrollY = mobileScrollContainer.scrollTop;
    } else {
      target = window;
      lastScrollY = window.scrollY;
    }

    const updateScrollDir = () => {
      const scrollY = target === window ? window.scrollY : target.scrollTop;

      if (scrollY > lastScrollY) {
        setScrollDir("down");
      } else if (scrollY < lastScrollY) {
        setScrollDir("up");
      }

      lastScrollY = scrollY;
    };

    target.addEventListener("scroll", updateScrollDir, { passive: true });

    return () => {
      target.removeEventListener("scroll", updateScrollDir);
    };
  }, []);

  return scrollDir;
}

export default useScrollDirection;
