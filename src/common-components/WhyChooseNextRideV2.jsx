import { memo, useMemo, useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "antd";

import star_badge from "../assets/images/why_choose_nextride/Star-Badge--Streamline-Core.svg";
import car_battery from "../assets/images/why_choose_nextride/Car-Battery-Charging--Streamline-Core.svg";
import browser_check from "../assets/images/why_choose_nextride/Browser-Check--Streamline-Core.svg";
import search_visual from "../assets/images/why_choose_nextride/Search-Visual--Streamline-Core.svg";
import multiple_files from "../assets/images/why_choose_nextride/Multiple-File-2--Streamline-Core.svg";
import customer_support from "../assets/images/why_choose_nextride/Customer-Support-1--Streamline-Core.svg";
import rupee_bag from "../assets/images/why_choose_nextride/Bag-Rupee--Streamline-Core.svg";

const WhyChooseNextRideV2 = ({ cardType = "general" }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const cardConfigs = useMemo(
    () => ({
      QUALITY_CHECK: star_badge,
      BATTERY_REPORT: car_battery,
      WARRANTY: browser_check,
      INSPECTION: search_visual,
      RC_TRANSFER: multiple_files,
      SUPPORT: customer_support,
      BEST_PRICE: rupee_bag,
      HASSLE_FREE_DOCUMENTATION: multiple_files,
    }),
    [],
  );

  const cardTypeMap = useMemo(
    () => ({
      buy: [
        "QUALITY_CHECK",
        "BATTERY_REPORT",
        "WARRANTY",
        "RC_TRANSFER",
        "SUPPORT",
      ],
      sell: ["INSPECTION", "BEST_PRICE", "HASSLE_FREE_DOCUMENTATION"],
      general: [
        "QUALITY_CHECK",
        "BATTERY_REPORT",
        "WARRANTY",
        "INSPECTION",
        "RC_TRANSFER",
        "SUPPORT",
        "BEST_PRICE",
      ],
    }),
    [],
  );

  const currentCardList = useMemo(() => {
    const keys = cardTypeMap[cardType] || cardTypeMap.general;
    return keys.map((key) => ({
      img: cardConfigs[key],
      name: t(`WHY_CHOOSE_NEXTRIDE.${key}`),
    }));
  }, [cardType, cardConfigs, cardTypeMap, t]);

  useEffect(() => {
    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      setIsScrollable(el.scrollWidth > el.clientWidth);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => window.removeEventListener("resize", checkScroll);
  }, [currentCardList]);

  return (
    <section
      style={{
        padding: "32px 0",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <h2
        className="mb-4"
        style={{
          color: "#1a1a2e",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        {t("WHY_CHOOSE_NEXTRIDE.TITLE")}
      </h2>

      <div style={{ position: "relative" }}>
        {/* LEFT FADE */}
        {isScrollable && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background:
                "linear-gradient(to right, white, rgba(255,255,255,0))",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}

        {/* RIGHT FADE */}
        {isScrollable && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background:
                "linear-gradient(to left, white, rgba(255,255,255,0))",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}

        {/* ACTUAL CONTAINER */}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            gap: "clamp(16px, 2vw, 24px)",
            overflowX: isScrollable ? "auto" : "hidden",
            justifyContent: isScrollable ? "flex-start" : "center",
            padding: "16px 20px 24px",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {currentCardList.map((card, i) => (
            <Card
              key={card.name || i}
              hoverable
              bodyStyle={{
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                textAlign: "center",
                width: "100%",
                height: "100%",
              }}
              style={{
                width: "clamp(160px, 18vw, 220px)",
                height: "clamp(120px, 14vw, 150px)",
                borderRadius: 12,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={card.img}
                alt={card.name}
                loading="lazy"
                style={{
                  width: "clamp(40px, 5vw, 56px)",
                  height: "clamp(40px, 5vw, 56px)",
                  objectFit: "contain",
                }}
              />

              <span
                style={{
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  fontWeight: 600,
                  lineHeight: "1.3",
                  color: "#1a1a2e",
                }}
              >
                {card.name}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

WhyChooseNextRideV2.displayName = "WhyChooseNextRideV2";

export default memo(WhyChooseNextRideV2);
