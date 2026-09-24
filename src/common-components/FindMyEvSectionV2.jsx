import thunder_logo from "../assets/images/thunder-logo.webp";
import { green_clock_icon } from "../assets/SVGIcons/CommonIcons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuizQuestions } from "../utils/useQuizQuestions";
import { useTranslation } from "react-i18next";
import { CLICK } from "../services/constants";
import { sendEvent } from "../services/analytics-service";

import { Row, Col, Grid, Button } from "antd";

const { useBreakpoint } = Grid;

const FindMyEvSectionV2 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const quizQuestions = useQuizQuestions();
  const [searchParams] = useSearchParams();
  const screens = useBreakpoint();

  const isDesktop = screens.lg;

  const handleNavigate = () => {
    const eventBody = {
      flowContext: "EV_QUIZ_START",
      action: CLICK,
      source_page: window.location.pathname,
    };
    sendEvent(eventBody);
    navigate(`find-my-perfect-ev?${searchParams.toString()}`);
  };

  return (
    <section
      className="find_my_ev_section"
      style={{
        padding: "32px 0",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          width: "100%",
        }}
      >
        <div
          className="find_my_ev_card"
          data-aos="fade-up"
          style={{
            position: "relative",
            background: "linear-gradient(145deg, #f9f6ff 0%, #ffffff 100%)",
            borderRadius: "24px",
            border: "1px solid #f0e6ff",
            boxShadow: "0 12px 32px rgba(114, 37, 245, 0.05)",
            overflow: "hidden",
            padding: "clamp(24px, 4vw, 48px)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (isDesktop) {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 16px 40px rgba(114, 37, 245, 0.08)";
            }
          }}
          onMouseLeave={(e) => {
            if (isDesktop) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(114, 37, 245, 0.05)";
            }
          }}
        >
          {isDesktop && (
            <div
              style={{
                position: "absolute",
                right: "-5%",
                top: "-20%",
                width: "400px",
                height: "400px",
                background:
                  "radial-gradient(circle, rgba(114,37,245,0.08) 0%, rgba(255,255,255,0) 70%)",
                borderRadius: "50%",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          )}

          <Row
            align="middle"
            justify="space-between"
            gutter={[32, 32]}
            style={{ position: "relative", zIndex: 1 }}
          >
            <Col xs={24} lg={15}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isDesktop ? "flex-start" : "center",
                  textAlign: isDesktop ? "left" : "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#ffffff",
                    padding: "6px 16px",
                    borderRadius: "20px",
                    border: "1px solid #e8deff",
                    color: "#1a1a2e",
                    fontWeight: 600,
                    fontSize: "14px",
                    marginBottom: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {green_clock_icon}
                  </span>
                  {t("FIND_MY_EV.QUIZ_DURATION")}
                </div>

                <h2
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    marginBottom: "16px",
                    lineHeight: "1.2",
                  }}
                >
                  {t("FIND_MY_EV.TITLE")}
                </h2>

                <div
                  style={{
                    fontSize: "clamp(14px, 1.5vw, 16px)",
                    color: "#6c757d",
                    lineHeight: "1.6",
                    marginBottom: "24px",
                    maxWidth: "540px",
                  }}
                >
                  {t("FIND_MY_EV.DESCRIPTION", {
                    count: quizQuestions?.length || 0,
                  })}
                  {isDesktop && (
                    <p style={{ marginTop: "8px" }}>
                      {" "}
                      {t("FIND_MY_EV.COMPUTER_DESCRIPTION")}
                    </p>
                  )}
                </div>

                <Button
                  type="primary"
                  size="large"
                  onClick={handleNavigate}
                  style={{
                    background: "#7225f5",
                    borderColor: "#7225f5",
                    color: "#fff",
                    borderRadius: "8px",
                    height: "48px",
                    padding: "0 32px",
                    fontSize: "16px",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(114, 37, 245, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#5f1fe0";
                    e.currentTarget.style.borderColor = "#5f1fe0";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#7225f5";
                    e.currentTarget.style.borderColor = "#7225f5";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {t("FIND_MY_EV.BUTTON")}
                </Button>
              </div>
            </Col>

            <Col xs={24} lg={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src={thunder_logo}
                  alt="Thunder Logo"
                  style={{
                    width: "clamp(120px, 15vw, 180px)",
                    height: "auto",
                    objectFit: "contain",
                    transform: isDesktop ? "rotate(10deg)" : "rotate(0deg)",
                    transition:
                      "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                  onMouseEnter={(e) => {
                    if (isDesktop)
                      e.currentTarget.style.transform =
                        "rotate(0deg) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    if (isDesktop)
                      e.currentTarget.style.transform =
                        "rotate(10deg) scale(1)";
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default FindMyEvSectionV2;
