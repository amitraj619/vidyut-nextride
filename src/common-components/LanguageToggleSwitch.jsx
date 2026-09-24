import { useEffect, useState } from "react";
import "./SCSS/style.scss";
import i18n from "../i18n";
import useScrollDirection from "../customHooks/useScrollDirection";
import { CLICK, USER_PINNED_LANGUAGE } from "../services/constants";
import { sendEvent } from "../services/analytics-service";

const LanguageToggleSwitch = ({ styles }) => {
  const scrollDir = useScrollDirection();

  const [currLang, setCurrLang] = useState(i18n.language);

  const handleLanguageSwitch = () => {
    const newLang = currLang === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
    sessionStorage.setItem(USER_PINNED_LANGUAGE, newLang);

    sendEvent({
      flowContext: "LANGUAGE_CHANGE",
      action: CLICK,
      source_page: window.location.pathname,
      selected_language: newLang,
    });
  };

  useEffect(() => {
    const handleLangChange = (lng) => {
      setCurrLang(lng);
    };
    i18n.on("languageChanged", handleLangChange);
    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, []);

  return (
    <button
      className={`language_switch_container ${
        scrollDir === "down" ? "hide" : "show"
      }`}
      style={styles}
      onClick={handleLanguageSwitch}
    >
      <div
        className={`background_slider ${
          currLang === "hi" ? "slide_right" : "slide_left"
        }`}
      />
      <div className={`language_btn ${currLang === "en" ? "active" : ""}`}>
        En
      </div>
      <div className={`language_btn ${currLang === "hi" ? "active" : ""}`}>
        हि
      </div>
    </button>
  );
};

export default LanguageToggleSwitch;
