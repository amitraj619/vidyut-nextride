import { Drawer } from "antd";
import i18n from "../i18n"; // make sure the path is correct
import { purple_check_mark_icon } from "../assets/SVGIcons/CommonIcons";
import { useTranslation } from "react-i18next";
import { isMobileDevice } from "../utils/deviceCheck";
import { CLICK, USER_PINNED_LANGUAGE } from "../services/constants";
import { sendEvent } from "../services/analytics-service";

const SelectLanguage = ({ isOpen, closeLanguageSelectionSheet }) => {
  const currentLang = i18n.language || "en";
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    if (currentLang !== lang) {
      const eventBody = {
        flowContext: `LANGUAGE_CHANGE`,
        action: CLICK,
        source_page: window.location.pathname,
        selected_language: lang,
      };
      sendEvent(eventBody);
    }

    i18n.changeLanguage(lang);
    sessionStorage.setItem(USER_PINNED_LANGUAGE, lang);
    closeLanguageSelectionSheet(false);
  };

  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={() => closeLanguageSelectionSheet(false, true)}
        placement="left"
        height="100%"
        className="custom_language_select_sheet"
        styles={{
          body: {
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          },
          header: {
            padding: "12px",
          },
          content: {
            width: isMobileDevice() ? "100%" : "400px",
            justifySelf: "center",
          },
        }}
        destroyOnClose
      >
        <div className="language_change_container">
          <div className="heading">{t("SELECT_LANGUAGE")}</div>
          <div className="language_list_container">
            <div
              className={`language_item ${
                currentLang === "en" ? "active" : ""
              }`}
              onClick={() => changeLanguage("en")}
            >
              English {currentLang === "en" && purple_check_mark_icon}
            </div>
            <div
              className={`language_item ${
                currentLang === "hi" ? "active" : ""
              }`}
              onClick={() => changeLanguage("hi")}
            >
              हिंदी {currentLang === "hi" && purple_check_mark_icon}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SelectLanguage;
