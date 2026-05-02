"use client"

import * as React from "react"

export type Lang = "en" | "th" | "la" | "zh" | "ko"

export const LANG_ORDER: readonly Lang[] = [
  "en",
  "th",
  "la",
  "zh",
  "ko",
] as const

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "icon-laos-lang"

function parseStoredLang(raw: string | null): Lang | null {
  if (!raw) return null
  return LANG_ORDER.includes(raw as Lang) ? (raw as Lang) : null
}

export function LanguageProvider({
  children,
  defaultLang = "en",
}: Readonly<{
  children: React.ReactNode
  defaultLang?: Lang
}>) {
  // ✅ FIX: lazy init from localStorage
  const [lang, setLangState] = React.useState<Lang>(() => {
    if (typeof window === "undefined") return defaultLang

    const stored = parseStoredLang(
      window.localStorage.getItem(STORAGE_KEY)
    )

    return stored ?? defaultLang
  })

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = React.useMemo(
    () => ({
      lang,
      setLang,
    }),
    [lang, setLang]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return ctx
}