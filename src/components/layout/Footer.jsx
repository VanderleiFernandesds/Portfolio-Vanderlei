import Section from './Section'
import { CoffeeCupIcon } from '../icons'
import { useLanguage } from '../../i18n/LanguageContext'

// Furos de caderno: círculos com a cor do fundo da página, simulando
// recortes vazados no lado esquerdo do footer.
const HOLE_POSITIONS = ['18%', '38%', '58%', '78%']

/**
 * Footer
 * Rodapé com aparência de folha de caderno/papel rasgado. Não repete os
 * links de contato (já presentes na seção Contato) — apenas copyright,
 * assinatura e um post-it decorativo.
 */
function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <Section
      as="footer"
      className="relative w-full overflow-hidden pb-0!"
      containerClassName="relative max-lg:px-3!"
    >
      <div className="absolute inset-y-0 left-2 hidden w-3 sm:block" aria-hidden="true">
        {HOLE_POSITIONS.map((top) => (
          <span
            key={top}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]"
            style={{ left: '50%', top, backgroundColor: 'var(--color-background)' }}
          />
        ))}
      </div>

      <div
        className="flex flex-col items-center gap-6 p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-8 sm:text-left"
        style={{ backgroundColor: 'var(--color-modal-paper)' }}
      >
        <div className="font-kalam flex flex-col gap-0.5 text-xs sm:text-sm">
          <p style={{ color: 'var(--color-modal-heading)' }}>
            © {year} · {t.footer.copyright}
          </p>
          <p style={{ color: 'var(--color-modal-text-secondary)' }}>
            {t.footer.madeWith} {t.footer.with}
          </p>
        </div>

        <p
          className="font-kalam flex items-center gap-2 text-base sm:text-lg"
          style={{ color: 'var(--color-modal-heading)' }}
        >
          <CoffeeCupIcon
            aria-hidden="true"
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
          />
          {t.footer.tagline}
        </p>

        <div
          className="animate-postit-in relative shrink-0 rounded-sm px-4 py-3 text-sm shadow-[2px_3px_6px_rgba(0,0,0,0.25)] sm:px-5 sm:py-3.5 sm:text-base"
          style={{
            backgroundColor: '#E6D6A0',
            transform: 'rotate(-3deg)',
            '--postit-rotate': '-3deg',
          }}
        >
          <span
            aria-hidden="true"
            className="absolute -top-2 left-1/2 h-3.5 w-10 -translate-x-1/2 -rotate-2 rounded-[1px] opacity-70 sm:h-4 sm:w-12"
            style={{ backgroundColor: '#F2ECD8' }}
          />
          <span className="font-kalam" style={{ color: 'var(--color-modal-heading)' }}>
            {t.footer.postit}
          </span>
        </div>
      </div>
    </Section>
  )
}

export default Footer
