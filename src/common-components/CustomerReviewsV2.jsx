import { useMemo, useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import review_1 from "../assets/images/review_1.avif";
import review_2 from "../assets/images/review_2.png";
import review_3 from "../assets/images/review_3.avif";
import CustomerCardV2 from "./cards/CustomerCardV2";

const CUSTOMER_IMAGES = Object.freeze({
  USER1: review_1,
  USER2: review_2,
  USER3: review_3,
});

const CustomerReviewsV2 = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const [isScrollable, setIsScrollable] = useState(true);

  const reviewData = useMemo(
    () => t("COSTUMER_REVIEWS", { returnObjects: true }),
    [t],
  );

  const reviews = useMemo(
    () =>
      Object.entries(CUSTOMER_IMAGES).map(([key, img]) => {
        const value = reviewData?.[key] || {};
        return {
          key,
          imgUrl: img,
          name: value.NAME,
          subtitle: value.SUBTITLE,
          review: value.REVIEW,
          highlight: value.HIGHLIGHT,
          ratings: value.RATINGS,
        };
      }),
    [reviewData],
  );

  useEffect(() => {
    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      setIsScrollable(el.scrollWidth > el.clientWidth);
    };

    checkScroll();

    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }

    window.addEventListener("resize", checkScroll);

    return () => window.removeEventListener("resize", checkScroll);
  }, [reviews]);

  return (
    <section
      className="cards_section"
      data-aos="fade-up"
      style={{
        padding: "48px 0",
        background: "#fcfcfd",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
            padding: "0 20px",
          }}
        >
          <h2
            className="mb-2"
            style={{
              color: "#1a1a2e",
              fontWeight: "700",
              fontSize: "clamp(24px, 4vw, 36px)",
            }}
          >
            {reviewData?.TITLE || t("CUSTOMER_REVIEWS_SECTION.TITLE")}
          </h2>
          <p
            style={{
              color: "#6c757d",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            {reviewData?.SUBTITLE || t("CUSTOMER_REVIEWS_SECTION.SUBTITLE")}
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {isScrollable && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 40,
                background:
                  "linear-gradient(to right, #fcfcfd, rgba(252,252,253,0))",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          )}

          {isScrollable && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 40,
                background:
                  "linear-gradient(to left, #fcfcfd, rgba(252,252,253,0))",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          )}

          <div
            ref={containerRef}
            className="scrolling_cards_container"
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "nowrap",
              overflowX: "auto",
              justifyContent: isScrollable ? "flex-start" : "center",
              padding: "16px 20px 32px",
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {reviews.map(
              ({ key, imgUrl, name, subtitle, review, highlight, ratings }) => (
                <div
                  key={key}
                  style={{
                    width: "clamp(280px, 85vw, 380px)",
                    flexShrink: 0,
                    scrollSnapAlign: "center",
                    display: "flex",
                  }}
                >
                  <CustomerCardV2
                    customer_img_url={imgUrl}
                    customer_name={name}
                    customer_subtitle={subtitle}
                    customer_review={review}
                    customer_highlight={highlight}
                    customer_ratings={ratings}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsV2;
