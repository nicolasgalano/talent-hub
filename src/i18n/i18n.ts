import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from "i18next-http-backend";
import { languages, namespaces } from "./i18n.constants";

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(LanguageDetector).use(initReactI18next);

  i18n
    .use(HttpApi)
    .init({
      backend: {
        loadPath: "./locales/{{lng}}/{{ns}}.json",
      },
      // debug: true,
      fallbackLng: language,
      ns: namespaces.common,
  });

  return i18n;
};

export const i18n = createI18n(languages.en);
