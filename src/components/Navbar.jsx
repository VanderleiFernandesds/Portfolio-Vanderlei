import { useEffect, useState } from 'react'
import Container from './Container'
import CurriculoButton from './CurriculoButton'
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
// das seções.
const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre', icon: UserIcon },
  { label: 'Habilidades', href: '#habilidades', icon: ZapIcon },
  { label: 'Projetos', href: '#projetos', icon: FolderIcon },
  { label: 'Contato', href: '#contato', icon: MailIcon },
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
    <header className="sticky top-5 z-50  w-full px-6 -mb-10 sm:-mb-16 lg:-mb-20">
      <Container className="px-0! flex justify-center">
        <div
          className={`flex lg:mx-desktop w-full items-center justify-between gap-4 rounded-card border bg-primary py-2 pr-2 pl-5 font-ibm text-text shadow-lg shadow-primary/20 transition-colors ${
            isScrolled ? 'border-text/10' : 'border-transparent'
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="shrink-0 transition-opacity hover:opacity-80">
            <img src={logo} alt="Vanderlei Fernandes" className="h-8 w-auto md:h-[38px]" />
          </a>

          {/* Links de navegação (desktop) */}
          <nav
            aria-label="Navegação principal"
            className="relative hidden items-center gap-1 md:flex"
          >
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className={`group relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  activeHref === href
                    ? "text-text"
                    : "text-text/70 hover:text-text"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}

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
            <div className=" md:block">
              <CurriculoButton as="a" href={RESUME_HREF}>
                Currículo
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              </CurriculoButton>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
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

      {/* Menu mobile — expande com transição (grid-template-rows 0fr -> 1fr) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            id="mobile-menu"
            aria-label="Navegação mobile"
            className="mx-auto mt-2 flex w-full flex-col gap-1 rounded-3xl border border-text/10 bg-primary/90 p-4 font-ibm text-text shadow-lg shadow-primary/20 backdrop-blur-md"
          >
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-button px-3 py-2 text-sm transition-colors hover:bg-text/10 hover:text-text ${
                  activeHref === href ? "bg-text/10 text-text" : "text-text/80"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            ))}

            <CurriculoButton
              as="a"
              href={RESUME_HREF}
              className="mt-2 w-full"
              onClick={() => setIsOpen(false)}
            >
              Currículo
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
            </CurriculoButton>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar
