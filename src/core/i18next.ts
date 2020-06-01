import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import React from "react"
import { initReactI18next, useTranslation } from "react-i18next"

import { Translations } from "./enums"

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    fallbackNS: Translations.Default,
    interpolation: {
      escapeValue: false,
    },
  })

export const NSContext = React.createContext(Translations.Default)

export const useNSTranslation = (ns?: string) => {
  const nsContext = React.useContext(NSContext)

  return useTranslation(ns || nsContext)
}

export { i18next }
