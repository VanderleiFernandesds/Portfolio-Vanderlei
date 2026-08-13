import { useState } from 'react'
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
 * Cabeçalho com logo, navegação principal, CTA de currículo e menu mobile.
 * Ver design/references/hero.png.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full bg-primary text-text">
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-extrabold tracking-wide transition-opacity hover:opacity-80"
        >
          VF
        </a>

        {/* Links de navegação (desktop) */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-2 text-sm text-text/80 transition-colors hover:text-text"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </nav>

        {/* Ações à direita: CTA (desktop) + botão do menu (mobile) */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button as="a" href={RESUME_HREF} variant="outline-light">
              Currículo
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-button text-text transition-colors hover:bg-text/10 md:hidden"
          >
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação mobile"
          className="border-t border-text/10 md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-button px-3 py-2 text-sm text-text/80 transition-colors hover:bg-text/10 hover:text-text"
              >
                <Icon className="h-4 w-4" />
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
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </Container>
        </nav>
      )}
    </header>
  )
}

export default Navbar
