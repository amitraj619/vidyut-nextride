import React from "react";
import nextride_logo from "../assets/images/nextride_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CLICK } from "../services/constants";
import { sendEvent } from "../services/analytics-service";
import { trackCustomEvent } from "../utils/facebookPixelHelper";
import MobileHelpSection from "./MobileHelpSection";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleNavigate = (url, eventName) => {
    trackCustomEvent(eventName);
    navigate({ pathname: url, search: location.search });
  };

  const handleNavigateNewTab = (url, event = null) => {
    if (event) {
      const eventBody = {
        flowContext: event,
        action: CLICK,
        source_page: window.location.pathname,
      };
      sendEvent(eventBody);
    }
    window.open(url, "_blank");
  };

  const styles = {
    footerContainer: {
      backgroundColor: "#f9f8fd",
      paddingTop: "60px",
      paddingBottom: "20px",
      color: "#77778e",
      fontFamily: "inherit",
    },
    logoSection: {
      marginBottom: "40px",
    },
    heading: {
      color: "#1a1a2e",
      fontWeight: "600",
      fontSize: "18px",
      marginBottom: "24px",
    },
    link: {
      cursor: "pointer",
      color: "#77778e",
      textDecoration: "none",
      display: "block",
      marginBottom: "16px",
      fontSize: "15px",
      transition: "color 0.2s ease",
    },
    contactText: {
      color: "#77778e",
      textDecoration: "none",
      display: "block",
      marginBottom: "16px",
      fontSize: "15px",
      lineHeight: "1.5",
    },
    socialIconWrapper: {
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      border: "1px solid #e2e2ec",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "#ffffff",
      transition: "all 0.3s ease",
      color: "#1a1a2e",
    },
    divider: {
      borderTop: "1px solid #e2e2ec",
      margin: "40px 0 20px 0",
    },
    copyright: {
      textAlign: "center",
      fontSize: "14px",
      color: "#9999ab",
    },
  };

  return (
    <>
      {/*  Mobile Help Section */}
      <MobileHelpSection />

      {/* Main Footer Container  */}
      <div style={styles.footerContainer} data-aos="fade-up">
        <div className="container">
          {/* Logo Row */}
          <div className="row" style={styles.logoSection}>
            <div className="col-12">
              <img
                src={nextride_logo}
                alt="Nextride logo"
                title="nextride"
                width={156}
                height={32}
              />
            </div>
          </div>

          {/* Links and Contact Row */}
          <div className="row">
            {/* Quick Links Column */}
            <div className="col-12 col-md-6 mb-5 mb-md-0">
              <h5 style={styles.heading}>
                {t("FOOTER.QUICK_LINKS_TITLE") || "Quick Links"}
              </h5>
              <ul className="list-unstyled" style={{ padding: 0, margin: 0 }}>
                <li>
                  <span
                    style={styles.link}
                    onClick={() =>
                      handleNavigate(
                        "/buy-used-ev/all-ev-vehicles",
                        "Buy_link_click",
                      )
                    }
                  >
                    {t("FOOTER.QUICK_LINKS.BUY_EV")}
                  </span>
                </li>
                <li>
                  <span
                    style={styles.link}
                    onClick={() =>
                      handleNavigateNewTab(
                        "https://www.vidyuttech.com/policies/",
                      )
                    }
                  >
                    {t("FOOTER.QUICK_LINKS.POLICIES") || "Policies"}
                  </span>
                </li>
                <li>
                  <span
                    style={styles.link}
                    onClick={() =>
                      handleNavigateNewTab("https://www.vidyuttech.com/terms/")
                    }
                  >
                    {t("FOOTER.QUICK_LINKS.T&C")}
                  </span>
                </li>
                <li>
                  <span
                    style={styles.link}
                    onClick={() =>
                      handleNavigateNewTab(
                        "https://www.vidyuttech.com/privacy-policy/",
                      )
                    }
                  >
                    {t("FOOTER.QUICK_LINKS.PRIVACY_POLICY")}
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Us Column */}
            <div className="col-12 col-md-6">
              <h5 style={styles.heading}>{t("FOOTER.CONTACT_US_TITLE")}</h5>

              <span style={styles.contactText}>{t("FOOTER.ADDRESS")}</span>

              <a
                href="tel:+917027024496"
                title="contact number"
                style={styles.contactText}
              >
                +91-702-702-4496
              </a>

              <a
                href="mailto:support@vidyuttech.com"
                title="email"
                style={styles.contactText}
              >
                support@vidyuttech.com
              </a>

              {/* Social Media Icons */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "30px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={styles.socialIconWrapper}
                  onClick={() =>
                    handleNavigateNewTab(
                      "https://www.facebook.com/people/Vidyut-NextRide/61552389703674/",
                      "FACEBOOK_CLICK",
                    )
                  }
                  title="Facebook"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.5v8h3Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div
                  style={styles.socialIconWrapper}
                  onClick={() =>
                    handleNavigateNewTab(
                      "https://www.instagram.com/vidyut_nextride/",
                      "INSTAGRAM_CLICK",
                    )
                  }
                  title="Instagram"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.45 1.35a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div
                  style={styles.socialIconWrapper}
                  onClick={() =>
                    handleNavigateNewTab(
                      "https://www.linkedin.com/company/vidyuttech/",
                      "LINKEDIN_CLICK",
                    )
                  }
                  title="LinkedIn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M6.4 8.3A1.4 1.4 0 1 1 6.4 5.5a1.4 1.4 0 0 1 0 2.8ZM5 19V9.8h2.8V19H5Zm4.5 0V9.8h2.7v1.3h.1c.4-.7 1.3-1.6 2.8-1.6 3 0 3.5 1.9 3.5 4.5V19h-2.8v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H9.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div
                  style={styles.socialIconWrapper}
                  onClick={() =>
                    handleNavigateNewTab(
                      "https://www.youtube.com/channel/UCPXG6zF87boPDexvm4YJsCg",
                      "YOUTUBE_CLICK",
                    )
                  }
                  title="YouTube"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.93C18.26 5.6 12 5.6 12 5.6s-6.26 0-7.86.47A2.75 2.75 0 0 0 2.2 8.001 28.7 28.7 0 0 0 1.75 12a28.7 28.7 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.94 1.93c1.6.47 7.86.47 7.86.47s6.26 0 7.86-.47a2.75 2.75 0 0 0 1.94-1.93A28.7 28.7 0 0 0 22.25 12a28.7 28.7 0 0 0-.45-3.999ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div
                  style={styles.socialIconWrapper}
                  onClick={() =>
                    handleNavigateNewTab(
                      "https://twitter.com/vidyut_tech",
                      "TWITTER_CLICK",
                    )
                  }
                  title="Twitter"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Divider and Copyright */}
          <div style={styles.divider}></div>
          <div style={styles.copyright}>
            Copyright © VidyutTech {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
