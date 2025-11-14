"use client"

import { useState, useEffect } from "react"
import { translations, type Language, type TranslationKey } from "@/lib/translations"

let globalLanguage: Language = "pt-BR"
const listeners: Set<(lang: Language) => void> = new Set()

const notifyListeners = (newLanguage: Language) => {
  globalLanguage = newLanguage
  listeners.forEach((listener) => listener(newLanguage))
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(globalLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["pt-BR", "en", "es"].includes(savedLanguage)) {
        if (savedLanguage !== globalLanguage) {
          notifyListeners(savedLanguage)
        }
      }
    } catch (error) {
      console.error("Error loading language from localStorage:", error)
    }

    const listener = (newLang: Language) => {
      setLanguage(newLang)
    }
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    try {
      localStorage.setItem("language", newLanguage)
      notifyListeners(newLanguage)
    } catch (error) {
      console.error("Error saving language to localStorage:", error)
      notifyListeners(newLanguage)
    }
  }

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || key
  }

  if (!mounted) {
    return {
      language: "pt-BR" as Language,
      changeLanguage,
      t: (key: TranslationKey) => translations["pt-BR"][key] || key,
    }
  }

  return { language, changeLanguage, t }
}
