import Container from './Container'

/**
 * Navbar
 * Estrutura base do cabeçalho fixo (ver design/references/hero.png).
 * Conteúdo final (logo, links, CTA) será preenchido na etapa da Navbar.
 */
function Navbar() {
  return (
    <header className="w-full bg-primary text-text">
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <div />

        {/* Links de navegação (Sobre, Habilidades, Projetos, Contato) */}
        <nav className="hidden items-center gap-8 md:flex" />

        {/* CTA (ex.: Currículo) */}
        <div />
      </Container>
    </header>
  )
}

export default Navbar
