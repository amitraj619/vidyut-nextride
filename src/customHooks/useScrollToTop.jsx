import { useEffect } from "react";
import { usePageTransition } from "../context/PageTransitionContext";

export const useScrollToTop = (dependencies = [], behavior = "auto") => {
  const { setIsProgrammaticScroll } = usePageTransition();

  useEffect(() => {
    setIsProgrammaticScroll(true);
    const scrollContainer = document.getElementById("mobileScrollContainer");

    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }

    const timer = setTimeout(() => {
      setIsProgrammaticScroll(false);
    }, 100);

    return () => clearTimeout(timer);
  }, dependencies);
};
