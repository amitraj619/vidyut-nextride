import React from "react";
import { useTranslation } from "react-i18next";
import { trackCustomEvent } from "../utils/facebookPixelHelper";
import { sendEvent } from "../services/analytics-service";
import { CLICK } from "../services/constants";

const MobileHelpSection = () => {
  const { t } = useTranslation();

  const handleAction = (type) => {
    if (type === "CALL") {
      window.location.href = "tel:+917090001401";
    } else {
      window.open("https://wa.me/917090001401", "_blank");
    }
  };

  const styles = {
    sectionWrapper: {
      paddingTop: "40px",
      paddingBottom: "20px",
    },
    heading: {
      color: "#333333",
      fontWeight: "700",
      fontSize: "22px",
      marginBottom: "16px",
    },
    callButton: {
      backgroundColor: "#25D366",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      padding: "12px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "12px",
      cursor: "pointer",
    },
    waButton: {
      backgroundColor: "#ffffff",
      color: "#25D366",
      border: "1px solid #25D366",
      borderRadius: "8px",
      padding: "12px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
    },
  };

  return (
    <div className="d-block d-md-none" style={styles.sectionWrapper}>
      <div className="container">
        <h3 style={styles.heading}>{t("FOOTER.HELP.TITLE")}</h3>

        <button style={styles.callButton} onClick={() => handleAction("CALL")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          {t("FOOTER.HELP.CALL_NOW")}
        </button>

        <button style={styles.waButton} onClick={() => handleAction("WA")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          {t("FOOTER.HELP.WHATSAPP")}
        </button>
      </div>
    </div>
  );
};

export default MobileHelpSection;
