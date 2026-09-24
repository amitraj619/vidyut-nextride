import { useEffect, useRef, useCallback } from "react";
import { usePageTransition } from "../context/PageTransitionContext";
import { sendEvent } from "../services/analytics-service";
import { VIEW } from "../services/constants";
import "./SCSS/style.scss";
import logo from "/new-vt-logo.svg";

const throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

const PageWrapper = ({ isScrollEventRequired = false, children }) => {
  const { isProgrammaticScroll } = usePageTransition();
  const scrollContainerRef = useRef(null);
  const scrolledPercentageRef = useRef({
    25: false,
    50: false,
    75: false,
    90: false,
    100: false,
  });

  const handleScroll = useCallback(
    throttle(() => {
      const scrollContainer =
        scrollContainerRef.current ||
        document.querySelector("#mobileScrollContainer");

      let scrollTop = 0,
        scrollHeight = 0,
        clientHeight = 0;

      if (scrollContainer && scrollContainer.scrollTop > 0) {
        scrollTop = scrollContainer.scrollTop;
        scrollHeight = scrollContainer.scrollHeight;
        clientHeight = scrollContainer.clientHeight;
      } else {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      }

      const scrolledPercent = ((scrollTop + clientHeight) / scrollHeight) * 100;

      Object.keys(scrolledPercentageRef.current).forEach((key) => {
        const percent = parseInt(key, 10);
        if (
          !scrolledPercentageRef.current[percent] &&
          scrolledPercent >= percent
        ) {
          scrolledPercentageRef.current[percent] = true;

          sendEvent({
            flowContext: "PAGE_SCROLL",
            action: VIEW,
            source_page: window.location.pathname,
            scroll_depth: percent,
          });
        }
      });
    }, 200),
    []
  );

  useEffect(() => {
    if (!isScrollEventRequired || isProgrammaticScroll) return;

    const mobileScrollContainer = document.querySelector(
      "#mobileScrollContainer"
    );
    scrollContainerRef.current = mobileScrollContainer;

    const target = mobileScrollContainer || window;
    target.addEventListener("scroll", handleScroll);

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollEventRequired, isProgrammaticScroll, handleScroll]);

  return (
    <div className="page_wrapper">
      <meta property="og:image" content={logo} />
      <meta property="og:type" content="website" />
      {children}
    </div>
  );
};

export default PageWrapper;
