import { useEffect, useState } from 'react'
import Container from './Container'
import CurriculoButton from './CurriculoButton'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'
import logo from '../assets/logo.svg'
import hoverStroke from '../assets/HoverStroke.svg'
import {
  UserIcon,
  ZapIcon,
  FolderIcon,
  MailIcon,
  DownloadIcon,
  MenuIcon,
  CloseIcon,
} from './icons'

// Links de navegação (ver design/references/hero.png). Apontam para os ids
// das seções. `labelKey` referencia src/i18n/translations.js (t.nav).
const NAV_LINKS = [
  { labelKey: 'about', href: '#sobre', icon: UserIcon },
  { labelKey: 'skills', href: '#habilidades', icon: ZapIcon },
  { labelKey: 'projects', href: '#projetos', icon: FolderIcon },
  { labelKey: 'contact', href: '#contato', icon: MailIcon },
]

// TODO: substituir pelo link real do PDF do currículo quando existir.
const RESUME_HREF = '#'

/**
 * Navbar
 * Pílula flutuante com vidro fosco (glassmorphism), link ativo destacado
 * via scroll spy e menu mobile que expande com transição — inspirado em
 * https://pro.reactbits.dev/docs/blocks/navigation/navigation-12 (só a
 * descrição pública do componente foi usada como referência, sem acesso ao
 * código-fonte, que é pago). Usa só os tokens já existentes do projeto.
 */
function Navbar() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Borda embaixo da navbar: só aparece depois que a página rola — no topo
  // (scrollY 0) fica desativada.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy: observa as seções e marca como ativo o link cuja seção está
  // cruzando a faixa central da viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.getElementById(href.slice(1))).filter(
      Boolean,
    )

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    // -mb-*: puxa o conteúdo seguinte (Hero) pra cima, fazendo a navbar
    // sobrepor por completo a faixa superior de papel rasgado do Hero (ver
    // Hero.jsx) — ela fica escondida atrás da navbar, que passa a parecer
    // parte do próprio card do Hero, sem vão nem tira de papel visível
    // acima dela. z-50 garante que a navbar continue totalmente visível.
    // Valores menores no mobile porque a faixa ali é proporcionalmente mais
    // fina (mesma arte, container mais estreito).
    <header className="sticky top-5 z-50  w-full px-3 sm:px-6 -mb-10 sm:-mb-16 lg:-mb-20">
      <Container className="px-0! flex justify-center">
        <div
          className={`flex lg:mx-desktop w-full items-center justify-between gap-4 border bg-primary py-2 pr-2 pl-5 font-navbar text-text shadow-lg shadow-primary/20 transition-colors md:py-0 ${
            isScrolled ? 'border-text/10 shadow-xl shadow-text/30 md:shadow-lg md:shadow-primary/20' : 'border-transparent shadow-none'
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="shrink-0 -rotate-2 transition-opacity hover:opacity-80">
            <img src={logo} alt="Vanderlei Fernandes" className="h-8 w-auto md:h-[38px]" />
          </a>

          {/* Links de navegação (desktop) */}
          <nav
            aria-label={t.nav.navAriaDesktop}
            className="relative hidden items-center gap-1 md:flex"
          >
            {NAV_LINKS.map(({ labelKey, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className={`group relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-lg text-text transition-colors`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t.nav[labelKey]}

                {/* Rabisco de marca-texto (HoverStroke.svg, ver
                    PaperButton/CurriculoButton) revelado sob o link no
                    hover/foco via clip-path (classe .hover-stroke-wipe em
                    src/index.css), sem alterar o layout. */}
                <span
                  aria-hidden="true"
                  className="hover-stroke-wipe pointer-events-none absolute inset-x-3 -bottom-1 h-2.5"
                >
                  <img
                    src={hoverStroke}
                    alt=""
                    draggable={false}
                    className="h-full w-full object-contain select-none"
                  />
                </span>
              </a>
            ))}
          </nav>

          {/* Ações à direita: CTA (desktop) + botão do menu (mobile) */}
          <div className="flex items-center gap-2 ">
            <div className="hidden items-center gap-4 md:flex">
              <LanguageSwitcher />
              <CurriculoButton as="a" href={RESUME_HREF} className="-translate-y-2.5">
                {t.nav.resume}
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              </CurriculoButton>
            </div>

            <div className="md:hidden">
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:bg-text/10 md:hidden"
            >
              {isOpen ? (
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Overlay — escurece o resto da página enquanto o menu mobile está aberto;
          clicar nele fecha o menu, igual ao clique fora. */}
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 -z-10 bg-text/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Menu mobile — expande com transição (grid-template-rows 0fr -> 1fr) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            id="mobile-menu"
            aria-label={t.nav.navAriaMobile}
            className="mx-auto mt-2 flex w-full flex-col gap-1 border border-text/10 bg-primary/90 px-4 pt-4 font-navbar text-text shadow-lg shadow-primary/20 backdrop-blur-md"
          >
            <div className="mx-auto flex w-fit flex-col gap-1">
              {NAV_LINKS.map(({ labelKey, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center gap-3 px-5 py-4 text-lg transition-colors active:bg-text/10 active:text-text ${
                    activeHref === href ? "bg-text/10 text-text" : "text-text/80"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  {t.nav[labelKey]}

                  <span
                    aria-hidden="true"
                    className="hover-stroke-wipe pointer-events-none absolute inset-x-5 bottom-1.5 h-2.5"
                  >
                    <img
                      src={hoverStroke}
                      alt=""
                      draggable={false}
                      className="h-full w-full object-contain select-none"
                    />
                  </span>
                </a>
              ))}
            </div>

            <div className="flex translate-y-2.5 flex-col items-center gap-3">
              <CurriculoButton
                as="a"
                href={RESUME_HREF}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.resume}
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              </CurriculoButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar
