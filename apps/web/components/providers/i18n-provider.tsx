'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language } from '@/lib/translations'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: keyof typeof translations['en']) => string
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('nexus_lang') as Language
    if (savedLang && translations[savedLang]) {
      setLangState(savedLang)
    }
    setMounted(true)
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('nexus_lang', newLang)
    // Optionally update user preferences in DB via API call here
  }

  const t = (key: keyof typeof translations['en']) => {
    return translations[lang]?.[key] || translations['en'][key] || key
  }

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  // Sync HTML dir attribute
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = dir
      document.documentElement.lang = lang
    }
  }, [lang, dir, mounted])

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} className={lang === 'ar' ? 'font-sans-arabic' : ''}>
        {children}
      </div>
    </I18nContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider')
  }
  return context
}
