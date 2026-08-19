import { useEffect, useRef, useState } from 'react'
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

/**
 * Navbar
 * Pílula flutuante com vidro fosco (glassmorphism), indicador de link ativo
 * animado (acompanha a seção visível via scroll spy) e menu mobile que
 * expande com transição — inspirado em
 * https://pro.reactbits.dev/docs/blocks/navigation/navigation-12 (só a
 * descrição pública do componente foi usada como referência, sem acesso ao
 * código-fonte, que é pago). Usa só os tokens já existentes do projeto.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  const navRef = useRef(null)
  const linkRefs = useRef({})

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

  // Reposiciona o indicador animado sobre o link ativo (desktop).
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = activeHref && linkRefs.current[activeHref]
      const navEl = navRef.current
      if (!activeEl || !navEl) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }))
        return
      }
      const navRect = navEl.getBoundingClientRect()
      const linkRect = activeEl.getBoundingClientRect()
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeHref])

  return (
    <header className="sticky top-3 z-50 w-full px-4 ">
      <Container className="px-0! flex justify-center">
        <div className="flex mx-mobile lg:mx-desktop w-full items-center justify-between gap-4 rounded-card border border-text/10 bg-primary py-2 pr-2 pl-5 text-text shadow-lg shadow-primary/20 ">
          {/* Logo */}
          <a
            href="#hero"
            className="text-lg font-extrabold tracking-wide transition-opacity hover:opacity-80"
          >
            VF
          </a>

          {/* Links de navegação (desktop) — indicador animado atrás do link ativo */}
          <nav
            ref={navRef}
            aria-label="Navegação principal"
            className="relative hidden items-center gap-1 md:flex"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 h-full rounded-full bg-text/15 transition-[transform,width,opacity] duration-300 ease-out"
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left}px)`,
                opacity: indicator.opacity,
              }}
            />
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                ref={(el) => {
                  linkRefs.current[href] = el;
                }}
                className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  activeHref === href
                    ? "text-text"
                    : "text-text/70 hover:text-text"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
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
