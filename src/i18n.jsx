import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en.json";
import translationHi from "./locales/hi.json";
import {
  ENGLISH_PREFERRED_CITIES,
  USER_PINNED_LANGUAGE,
} from "./services/constants";

const getInitialLanguage = () => {
  localStorage.removeItem("selectedLanguage");

  const storedLanguage = sessionStorage.getItem(USER_PINNED_LANGUAGE);

  if (storedLanguage) {
    return storedLanguage;
  }

  const sessionCity = sessionStorage.getItem("city");

  if (sessionCity) {
    const normalizedCity = sessionCity.trim().toLowerCase();

    if (ENGLISH_PREFERRED_CITIES.has(normalizedCity)) {
      return "en";
    }
  }

  return "hi";
};
i18n.use(initReactI18next).init({
  lng: getInitialLanguage(),
  fallbackLng: "hi",
  debug: true,
  resources: {
    en: { translation: translationEn },
    hi: { translation: translationHi },
  },
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

document.documentElement.lang = i18n.language || "hi";

export default i18n;
