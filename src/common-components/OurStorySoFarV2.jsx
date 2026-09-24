import { useEffect, useRef, useState, useMemo } from "react";
import { Row, Col, Card } from "antd";
import { useTranslation } from "react-i18next";
import {
  green_arrow_increase_icon,
  rating_icon,
} from "../assets/SVGIcons/CommonIcons";
import useNumberRollingAnimation from "../customHooks/useNumberRollingAnimation";

const OurStorySoFarV2 = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
            observer.disconnect();
          }, 300);
        }
      },
      { threshold: 0.4 },
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
    [vehiclesSold, vehicleInspection, cities, rating],
  );

  return (
    <div
      ref={sectionRef}
      style={{
        padding: "32px 0",
        maxWidth: 1200,
        margin: "0 auto",
        background: "#fff",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <h2
        className="mb-4"
        style={{
          color: "#1a1a2e",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        {t("OUR_STORY.TITLE")}
      </h2>

      {/* Stats Grid */}
      <div style={{ padding: "0 15px" }}>
        <Row gutter={[16, 16]} justify="center">
          {stats.map(({ key, value, icon }) => (
            <Col key={key} xs={12} sm={12} md={12} lg={6}>
              <Card
                bordered={false}
                style={{
                  borderRadius: "16px",
                  height: "100%",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                bodyStyle={{
                  padding: "24px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                hoverable
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.05)";
                }}
              >
                {/* Label */}
                <div
                  style={{
                    fontSize: "14px",
                    color: "#77778e",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  {t(`OUR_STORY.${key}.LABEL`)}
                </div>

                {/* Value */}
                <div
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 32px)",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {t(`OUR_STORY.${key}.VALUE`, {
                    count: key === "RATING" ? undefined : value,
                    rating: key === "RATING" ? value : undefined,
                  })}
                  {icon && <span>{icon}</span>}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default OurStorySoFarV2;
