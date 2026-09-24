import { memo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VehicleSelectionModal from "./VehicleSelectionModal";
import hero_image_en from "../../../assets/images/hero_image_en.png";
import hero_image_hi from "../../../assets/images/hero_image_hi.png";
import { sendEvent } from "../../../services/analytics-service";
import { CLICK } from "../../../services/constants";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State and ref for the sticky mobile CTA
  const [showStickyCta, setShowStickyCta] = useState(false);
  const mobileCtaRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Dynamically select the image based on the active language
  const currentHeroImage =
    i18n.language && i18n.language.startsWith("hi")
      ? hero_image_hi
      : hero_image_en;

  const city = sessionStorage.getItem("city");

  const handleVehicleTypeSubmit = (selectedType) => {
    setIsModalOpen(false);

    const params = new URLSearchParams();
    if (city) params.append("city", city);
    params.append("vehicleType", selectedType);

    navigate(`/buy-used-ev/all-ev-vehicles?${params.toString()}`);
  };

  useEffect(() => {
    setIsImageLoaded(false);
  }, [currentHeroImage]);

  // Intersection Observer to detect when the mobile CTA leaves the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA if the original CTA is not intersecting AND it's scrolled past
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setShowStickyCta(true);
        } else {
          setShowStickyCta(false);
        }
      },
      { threshold: 0 }, // Trigger as soon as the element completely leaves the viewport
    );

    if (mobileCtaRef.current) {
      observer.observe(mobileCtaRef.current);
    }

    return () => {
      if (mobileCtaRef.current) {
        observer.unobserve(mobileCtaRef.current);
      }
    };
  }, []);

  //  CTA BUTTON FOR  REUSABILITY
  const renderCtaButton = (extraClasses = "") => {
    const handleCtaClick = () => {
      setIsModalOpen(true);

      queueMicrotask(() => {
        sendEvent({
          flowContext: "HOME_VIEW_BEST_DEALS_CLICKED",
          action: CLICK,
          source_page: window.location.pathname,
        });
      });
    };

    return (
      <button
        onClick={handleCtaClick}
        className={`btn text-white fw-bold border-0 d-flex justify-content-center align-items-center gap-2 ${extraClasses}`}
        style={{
          backgroundColor: "#ff7f00",
          borderRadius: "30px",
          padding: "14px 36px",
          fontSize: "1.1rem",
          boxShadow: "0px 4px 0px #cc6600, 0px 6px 20px rgba(255, 127, 0, 0.3)",
          transition: "all 0.15s ease-in-out",
          width: extraClasses.includes("w-100") ? "100%" : "auto",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(4px)";
          e.currentTarget.style.boxShadow =
            "0px 0px 0px #cc6600, 0px 2px 5px rgba(0,0,0,0.2)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(0px)";
          e.currentTarget.style.boxShadow =
            "0px 4px 0px #cc6600, 0px 6px 20px rgba(255, 127, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0px)";
          e.currentTarget.style.boxShadow =
            "0px 4px 0px #cc6600, 0px 6px 20px rgba(255, 127, 0, 0.3)";
        }}
      >
        <span>{t("HERO.CTA")}</span>
        <span style={{ fontSize: "1.3rem", lineHeight: 0.8 }}>→</span>
      </button>
    );
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 767px) {
            .hero_section {
              padding-top: 12px !important;
              padding-bottom: 32px !important;
            }
            .hero_image_wrapper {
              padding: 10px !important;
              border-radius: 22px !important;
            }
            .hero_image {
              border-radius: 16px !important;
            }
          }
          @media (min-width: 992px) {
            .hero_section {
              min-height: 85vh;
            }
          }
        `}
      </style>

      {/* The new modal component */}
      <VehicleSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleVehicleTypeSubmit}
      />

      <section
        className="hero_section w-100 bg-white"
        style={{
          padding: "48px 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center gy-4">
            {/* LEFT CONTENT */}
            <div className="col-12 col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-start gap-4 pe-lg-5">
              {/* Trusted Badge */}
              <div
                className="badge d-flex align-items-center gap-2 px-3 py-2"
                style={{
                  backgroundColor: "#f3e8ff",
                  color: "#6b21a8",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                }}
              >
                <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>📈</span>
                {t("HERO.BADGE", "INDIA'S #1 TRUSTED EV MARKETPLACE")}
              </div>

              {/* Main Heading */}
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  color: "#1C1B1B",
                  margin: 0,
                }}
              >
                <span>{t("HERO.TITLE_P1", "Switch to Electric,")}</span>
                <br />
                <span style={{ color: "#7b2cbf" }}>
                  {t("HERO.TITLE_P2", "Earn More Every Day")}
                </span>
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "#4a4a4a",
                  lineHeight: "1.8",
                  maxWidth: "92%",
                  margin: 0,
                }}
              >
                {t(
                  "HERO.DESCRIPTION",
                  "Drive with total peace of mind using our 100% Checked Vehicles. Get on the road faster with Low EMI Available on all models, and stay running with our dedicated Post-Purchase Service Support.",
                )}
              </p>

              {/* DESKTOP ONLY CTA */}
              {renderCtaButton("mt-2")}
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center justify-content-lg-end gap-4">
              <div
                className="hero_image_wrapper"
                style={{
                  width: "100%",
                  maxWidth: "760px",
                  borderRadius: "28px",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, #faf5ff 0%, #ffffff 45%, #fff7ed 100%)",
                  padding: "16px",
                  boxShadow: "0px 18px 45px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={currentHeroImage}
                  alt="Electric Vehicle Marketplace"
                  className="img-fluid hero_image"
                  onLoad={() => setIsImageLoaded(true)}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    borderRadius: "22px",
                    opacity: isImageLoaded ? 1 : 0,
                    transition: "opacity 0.4s ease-in-out",
                    aspectRatio: "1024 / 1535",
                  }}
                  fetchPriority="high"
                />
              </div>

              {/* MOBILE ONLY CTA (Wrapped in a ref to track scroll position) */}
              <div ref={mobileCtaRef} className="d-lg-none w-100">
                {renderCtaButton("w-100")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM CTA (MOBILE ONLY) */}
      <div
        className="d-lg-none fixed-bottom w-100"
        style={{
          padding: "16px 20px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          zIndex: 1,
          transform: showStickyCta ? "translateY(0)" : "translateY(100%)",
          transition:
            "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out",
          pointerEvents: showStickyCta ? "auto" : "none",
        }}
      >
        {renderCtaButton("w-100")}
      </div>
    </>
  );
};

export default memo(HeroSection);
