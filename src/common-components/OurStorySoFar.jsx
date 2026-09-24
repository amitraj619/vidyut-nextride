import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  green_arrow_increase_icon,
  rating_icon,
} from "../assets/SVGIcons/CommonIcons";
import useNumberRollingAnimation from "../customHooks/useNumberRollingAnimation";
import "./SCSS/style.scss";

const OurStorySoFar = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize counters (only start when isVisible = true)
  const vehiclesSold = useNumberRollingAnimation(500, 2000, 0, isVisible);
  const vehicleInspection = useNumberRollingAnimation(1500, 2000, 0, isVisible);
  const cities = useNumberRollingAnimation(6, 2000, 0, isVisible);
  const rating = useNumberRollingAnimation(4.8, 2000, 1, isVisible);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once triggered
          }, 300);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      {
        key: "VEHICLES_SOLD",
        value: vehiclesSold,
        icon: green_arrow_increase_icon,
      },
      {
        key: "INSPECTIONS",
        value: vehicleInspection,
      },
      {
        key: "CITIES",
        value: cities,
      },
      {
        key: "RATING",
        value: rating,
        icon: rating_icon,
      },
    ],
    [vehiclesSold, vehicleInspection, cities, rating]
  );

  return (
    <div className="our_story_so_far" ref={sectionRef} data-aos="fade-up">
      <h2 className="section_header">{t("OUR_STORY.TITLE")}</h2>
      <div className="row our_story_so_far_container">
        {stats.map(({ key, value, icon }, i) => (
          <div
            key={key}
            className={`our_story_box col-6 ${
              i % 2 !== 0 ? "border-start" : ""
            } ${i >= 2 ? "border-top" : ""}`}
          >
            <div className="our_story_label">{t(`OUR_STORY.${key}.LABEL`)}</div>
            <div className="our_story_value">
              {t(`OUR_STORY.${key}.VALUE`, {
                count: key === "RATING" ? undefined : value,
                rating: key === "RATING" ? value : undefined,
              })}
              {icon && icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStorySoFar;
