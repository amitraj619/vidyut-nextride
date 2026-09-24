import {
  memo,
  useCallback,
  useMemo,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "antd";

import mahindra from "../assets/images/brand_logos/mahindra.png";
import montra_electric from "../assets/images/brand_logos/montra_electric.svg";
import bajaj_auto from "../assets/images/brand_logos/bajaj_auto.svg";
import MG from "../assets/images/brand_logos/MG.svg";
import tata_motors from "../assets/images/brand_logos/tata_motors.svg";
import euler from "../assets/images/brand_logos/euler.svg";
import altigreen_logo from "../assets/images/brand_logos/altigreen_logo.png";
import piaggio from "../assets/images/brand_logos/piaggio.svg";

import { BrandFilterContext } from "../context/VehicleListProvider";
import { CLICK, DEFAULT_FILTER } from "../services/constants";
import { sendEvent } from "../services/analytics-service";
import { trackCustomEvent } from "../utils/facebookPixelHelper";

const BrandAutoCarousel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isInteracting = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(null);
  const scrollLeftPos = useRef(0);

  const { setSelectedFilterDraft, applyNewFilters } =
    useContext(BrandFilterContext);

  const brandList = useMemo(
    () => [
      { img: altigreen_logo, key: "ALTI_GREEN" },
      { img: bajaj_auto, key: "BAJAJ" },
      { img: euler, key: "EULER" },
      { img: mahindra, key: "MAHINDRA" },
      { img: montra_electric, key: "MONTRA" },
      { img: piaggio, key: "PIAGGIO" },
      { img: tata_motors, key: "TATA" },
    ],
    [],
  );

  const extendedList = useMemo(() => [...brandList, ...brandList], [brandList]);

  const handleBuyByBrand = useCallback(
    (brandKey) => {
      setSelectedFilterDraft((prev) => {
        const updatedDraft = {
          ...DEFAULT_FILTER,
          city: prev.city ?? [],
          oem: [brandKey],
        };
        applyNewFilters(updatedDraft);
        return updatedDraft;
      });

      sendEvent({
        flowContext: "OEM_ENTRY_CLICK",
        action: CLICK,
        source_page: window.location.pathname,
        oem_name: brandKey,
      });

      trackCustomEvent("BrandCardClick", { oem: brandKey });

      const city = sessionStorage.getItem("city");

      const params = new URLSearchParams({
        type: "brand",
        oem: brandKey,
        city: city || "",
      });

      navigate(`buy-used-ev/all-ev-vehicles?${params.toString()}`);
    },
    [setSelectedFilterDraft, applyNewFilters, navigate],
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 1;

    const step = () => {
      if (!isInteracting.current) {
        container.scrollLeft += scrollSpeed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    isInteracting.current = true;
    isDragging.current = false;

    startX.current = e.clientX;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (startX.current === null) return;

    const walk = e.clientX - startX.current;

    if (Math.abs(walk) > 5) {
      isDragging.current = true;

      scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
    }
  };

  const handlePointerUp = () => {
    isInteracting.current = false;
    startX.current = null;
  };

  const handleTouchStart = () => {
    isInteracting.current = true;
  };

  const handleTouchEnd = () => {
    isInteracting.current = false;
  };

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
        {t("BUY_EV_BY_BRANDS.TITLE")}
      </h2>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 40,
            background: "linear-gradient(to right, white, rgba(255,255,255,0))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 40,
            background: "linear-gradient(to left, white, rgba(255,255,255,0))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            display: "flex",
            overflowX: "auto",

            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",

            gap: "clamp(16px, 2vw, 24px)",
            padding: "16px 20px 24px",

            scrollBehavior: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          // Note: Add `::-webkit-scrollbar { display: none; }` in your global CSS to hide scrollbar on Chrome/Safari
        >
          {extendedList.map((brand, index) => (
            <Card
              key={`${brand.key}-${index}`}
              hoverable
              onClick={(e) => {
                if (isDragging.current) {
                  isDragging.current = false;
                  return;
                }
                handleBuyByBrand(brand.key);
              }}
              bodyStyle={{
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
              style={{
                minWidth: "clamp(160px, 18vw, 220px)",
                height: "clamp(100px, 12vw, 130px)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                flexShrink: 0,
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
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
                src={brand.img}
                alt={`${brand.key}_logo`}
                draggable="false"
                style={{
                  maxWidth: "90%",
                  maxHeight: "85%",
                  objectFit: "contain",
                  transition: "all 0.3s ease",
                }}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

BrandAutoCarousel.displayName = "BrandAutoCarousel";

export default memo(BrandAutoCarousel);
