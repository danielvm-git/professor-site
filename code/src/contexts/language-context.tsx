"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations, type TranslationKey } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  changeLanguage: (newLanguage: Language) => void
  t: (key: TranslationKey) => string
  mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && savedLanguage in translations) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.log("[v0] localStorage not available, using default language")
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    try {
      localStorage.setItem("language", newLanguage)
    } catch (error) {
      console.log("[v0] Could not save language preference")
    }
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["pt-BR"][key]
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, mounted }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
