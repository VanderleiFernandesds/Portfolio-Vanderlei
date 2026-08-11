import Container from './Container'
import { CodeIcon, HeartIcon } from './icons'

/**
 * Footer
 * Rodapé do site (ver design/references/Footer.png).
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-primary text-text">
      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        {/* Copyright */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-button bg-accent/10 text-accent">
            <CodeIcon className="h-4 w-4" />
          </span>
          <p className="text-sm text-text-muted">
            © {year} · Desenvolvido por Vanderlei Fernandes
          </p>
        </div>

        {/* Créditos */}
        <p className="flex items-center gap-2 text-sm text-text-muted">
          Feito com <HeartIcon className="h-4 w-4 text-accent-light" /> React + Tailwind CSS.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
