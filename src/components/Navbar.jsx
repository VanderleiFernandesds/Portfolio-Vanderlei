import { useEffect, useState } from 'react'
import Container from './Container'
import Button from './Button'
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

// Traço de hover do Navbar — passada única grossa, estilo "marcador" (ver
// design/references/hover-navbar.png). Gerado no Hover Stroke Lab (textura
// "marcador", formato "sublinhado") e adaptado para reaproveitar o token
// --color-nav-highlight (via gradiente) já existente no projeto, em vez do
// gradiente vermelho sugerido pela ferramenta.
const NAV_HOVER_SEGMENTS = [
  {
    d: "M27.50,17.29 C30.25,17.54 40.33,18.76 45.83,18.98 C51.33,19.20 58.67,18.78 64.17,18.76 C69.67,18.74 77.00,18.85 82.50,18.86 C88.00,18.86 95.33,18.86 100.83,18.78 C106.33,18.70 113.67,18.15 119.17,18.31 C124.67,18.47 132.00,19.69 137.50,19.84 C143.00,19.98 150.33,19.42 155.83,19.28 C161.33,19.14 168.67,19.12 174.17,18.89 C179.67,18.65 189.75,17.91 192.50,17.74",
    width: 14.18,
    opacity: 0.82,
    dur: 0.294,
    delay: 0,
  },
]

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
    <header className="sticky top-3 z-50 w-full px-4 ">
      {/* Gradiente compartilhado do traço de hover do Navbar — variação
          sutil sobre o token --color-nav-highlight (ver NAV_HOVER_SEGMENTS
          acima e design/references/hover-navbar.png) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="nav-highlight-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-nav-highlight)" />
            <stop offset="100%" stopColor="var(--color-nav-highlight-light)" />
          </linearGradient>
        </defs>
      </svg>

      <Container className="px-0! flex justify-center">
        <div className="flex mx-mobile lg:mx-desktop w-full items-center justify-between gap-4 rounded-card border border-text/10 bg-primary py-2 pr-2 pl-5 text-text shadow-lg shadow-primary/20 ">
          {/* Logo */}
          <a
            href="#hero"
            className="text-lg font-extrabold tracking-wide transition-opacity hover:opacity-80"
          >
            VF
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

                {/* Rabisco de marca-texto — passada única grossa, estilo
                    marcador (ver design/references/hover-navbar.png).
                    Revelada no hover/foco via stroke-dashoffset (classe
                    .nav-hover-stroke em src/index.css); some suavemente ao
                    sair, sem alterar o layout. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 -bottom-3 h-4 overflow-visible opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <svg
                    className="nav-hover-stroke h-full w-full"
                    viewBox="0 0 220 34"
                    preserveAspectRatio="none"
                  >
                    {NAV_HOVER_SEGMENTS.map((s, i) => (
                      <path
                        key={i}
                        d={s.d}
                        stroke="url(#nav-highlight-gradient)"
                        strokeWidth={s.width}
                        strokeLinecap="round"
                        fill="none"
                        opacity={s.opacity}
                        style={{
                          transitionDuration: `${s.dur}s`,
                          transitionDelay: `${s.delay}s`,
                        }}
                        ref={(el) => el && el.style.setProperty("--len", el.getTotalLength())}
                      />
                    ))}
                  </svg>
                </span>
              </a>
            ))}
          </nav>

          {/* Ações à direita: CTA (desktop) + botão do menu (mobile) */}
          <div className="flex items-center gap-2 ">
            <div className="hidden md:block">
              <Button as="a" href={RESUME_HREF} variant="outline-light">
                Currículo
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
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
            className="mx-auto mt-2 flex w-full flex-col gap-1 rounded-3xl border border-text/10 bg-primary/90 p-4 text-text shadow-lg shadow-primary/20 backdrop-blur-md"
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

            <Button
              as="a"
              href={RESUME_HREF}
              variant="outline-light"
              className="mt-2 w-full"
              onClick={() => setIsOpen(false)}
            >
              Currículo
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar
