import { useEffect, useRef } from "react";

export const useIntersectionObserver = (callback, threshold = 0.5) => {
  const observedElements = useRef(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= threshold &&
            !observedElements.current.has(entry.target)
          ) {
            observedElements.current.add(entry.target);
            callback(entry.target);
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll(
      "[data-track-visibility='true']"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [callback, threshold]);
};
