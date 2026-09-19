import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'language'

// Detecta o idioma inicial: primeiro localStorage, depois navigator.language
// (pt/pt-BR/pt-PT etc. -> 'pt', qualquer outro -> 'en').
function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'pt'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'pt' || stored === 'en') return stored

  const browserLanguage = window.navigator.language || ''
  return browserLanguage.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

/**
 * LanguageProvider
 * Contexto simples de i18n (sem lib externa): expõe `language`,
 * `setLanguage` e `t` (objeto de traduções do idioma atual, ver
 * src/i18n/translations.js). Persiste a escolha em localStorage e
 * mantém `document.documentElement.lang` sincronizado.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const setLanguage = (nextLanguage) => {
    if (nextLanguage !== 'pt' && nextLanguage !== 'en') return
    setLanguageState(nextLanguage)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // localStorage indisponível (ex.: modo privado) — segue sem persistir.
    }
  }

  const value = useMemo(
    () => ({ language, setLanguage, t: translations[language] }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage precisa ser usado dentro de um LanguageProvider')
  }
  return context
}
