import Container from './Container'

/**
 * Footer
 * Estrutura base do rodapé (ver design/references/contato.png).
 * Conteúdo final (copyright, créditos) será preenchido na etapa do Contato/Footer.
 */
function Footer() {
  return (
    <footer className="w-full bg-primary text-text">
      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        {/* Copyright */}
        <p className="text-sm text-text-muted" />

        {/* Créditos */}
        <p className="text-sm text-text-muted" />
      </Container>
    </footer>
  )
}

export default Footer
