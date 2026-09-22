import { useLanguage } from '../i18n/LanguageContext'

/**
 * LanguageSwitcher
 * Alterna PT/EN — dois textos clicáveis separados por "/", sem dropdown.
 * Idioma ativo fica com mais contraste (text-text), o inativo fica
 * esmaecido (text-text/65 — mínimo pra manter contraste AA sobre
 * bg-primary) com transição suave no hover. Usado na Navbar, antes do
 * <CurriculoButton /> (desktop e mobile).
 */
function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={`flex items-center gap-1.5 font-sans text-sm text-text ${className}`.trim()}
    >
      <button
        type="button"
        onClick={() => setLanguage('pt')}
        aria-pressed={language === 'pt'}
        className={`cursor-pointer transition-colors hover:text-text/80 ${
          language === 'pt' ? 'font-semibold text-text' : 'text-text/65'
        }`}
      >
        PT
      </button>
      <span aria-hidden="true" className="text-text/30">
        /
      </span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`cursor-pointer transition-colors hover:text-text/80 ${
          language === 'en' ? 'font-semibold text-text' : 'text-text/65'
        }`}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher
