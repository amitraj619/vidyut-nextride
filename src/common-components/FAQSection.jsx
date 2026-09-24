import { Collapse } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./SCSS/style.scss";
import { CLICK } from "../services/constants";
import { sendEvent } from "../services/analytics-service";

const FAQSection = ({ type = "buy" }) => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(4);

  const buyFaqs = t("FAQ_SECTION.BUY_QUESTIONS", { returnObjects: true }) || [];

  let faqsToRender = [];

  if (type === "combo") {
    faqsToRender = [buyFaqs[0], buyFaqs[3], buyFaqs[7], buyFaqs[8]].filter(
      Boolean,
    );
  } else {
    faqsToRender = buyFaqs;
  }

  if (faqsToRender.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        No FAQs available for this section.
      </div>
    );
  }

  const displayedFaqs = faqsToRender.slice(0, visibleCount);

  const handleLoadMore = () => {
    const eventBody = {
      flowContext: `FAQ_LOAD_MORE_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
    };
    sendEvent(eventBody);
    setVisibleCount((prev) => Math.min(prev + 5, faqsToRender.length));
  };

  const handleFaqAccordionOpen = (e) => {
    if (e?.length) {
      const position = Number(e[0]);
      const eventBody = {
        flowContext: `FAQ_ACCORDION_OPEN`,
        action: CLICK,
        source_page: window.location.pathname,
        questions: displayedFaqs[position]?.QUESTION,
        question_position: position,
      };
      sendEvent(eventBody);
    }
  };

  const styles = {
    sectionBackground: {
      backgroundColor: "#fcfcfd",
      paddingTop: "60px",
      paddingBottom: "60px",
    },
    header: {
      color: "#1a1a2e",
      fontWeight: "700",
      textAlign: "center",
    },
    faqCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      marginBottom: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
      border: "1px solid #f0f0f5",
      padding: "8px 4px",
      transition: "all 0.3s ease",
    },
    questionText: {
      fontWeight: "600",
      color: "#2d2d3f",
      fontSize: "16px",
    },
    answerText: {
      color: "#6c757d",
      fontSize: "15px",
      lineHeight: "1.6",
      paddingRight: "24px",
    },
    iconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#f4f4f9",
      transition: "background-color 0.2s ease",
    },
  };

  return (
    <div
      className="faq_section"
      style={styles.sectionBackground}
      data-aos="fade-up"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <h2 className="mb-4" style={styles.header}>
              {t("FAQ_SECTION.TITLE")}
            </h2>

            <div className="faq-list">
              {displayedFaqs.map((faq, index) => (
                <div
                  key={index}
                  style={styles.faqCard}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Collapse
                    ghost
                    collapsible="header"
                    expandIconPosition="end"
                    className="custom-collapse border-0"
                    onChange={handleFaqAccordionOpen}
                    expandIcon={({ isActive }) => (
                      <div
                        style={styles.iconWrapper}
                        role="button"
                        aria-label={
                          isActive ? "Collapse question" : "Expand question"
                        }
                        aria-expanded={isActive}
                        tabIndex={0}
                      >
                        <IoIosArrowDown
                          className={`fs-5 ${isActive ? "rotate-icon" : ""}`}
                          style={{
                            transform: isActive
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                            color: "#1a1a2e",
                          }}
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    items={[
                      {
                        key: `${index}`,
                        label: (
                          <span style={styles.questionText}>
                            {faq?.QUESTION || "No question available"}
                          </span>
                        ),
                        children: (
                          <div
                            style={styles.answerText}
                            dangerouslySetInnerHTML={{
                              __html: faq?.ANSWER || "No answer available",
                            }}
                          />
                        ),
                      },
                    ]}
                  />
                </div>
              ))}
            </div>

            {visibleCount < faqsToRender.length && (
              <div className="d-flex justify-content-center mt-5 w-100">
                <button
                  className="btn secondary_btn shadow-sm px-4 py-2 fw-medium"
                  style={{
                    backgroundColor: "#1a1a2e",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                  onClick={handleLoadMore}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {t("FAQ_SECTION.LOAD_MORE")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
