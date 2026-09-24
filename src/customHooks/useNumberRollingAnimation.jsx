import { useState, useEffect } from "react";

const useNumberRollingAnimation = (
  target,
  duration = 2000,
  decimals = 0,
  startCounting = false,
  delay = 0
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    const timer = setTimeout(() => {
      let start = 0;
      const increment = target / (duration / 16);

      const animationTimer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(parseFloat(target.toFixed(decimals)));
          clearInterval(animationTimer);
        } else {
          setCount(parseFloat(start.toFixed(decimals)));
        }
      }, 16);

      return () => clearInterval(animationTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, duration, decimals, startCounting, delay]);

  return count;
};

export default useNumberRollingAnimation;
