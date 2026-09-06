import folhaPapel from '../assets/folha-pautada-com-fita.svg'

/**
 * Paper
 * Folha de papel reutilizável (seção About — design/tokens.md ainda não
 * documenta esta textura). Tamanho, posição e conteúdo são responsabilidade
 * de quem usa o componente (ver AboutItem).
 */
function Paper({ children, className = '' }) {
  return (
    <div
      // container-type:inline-size — permite que quem usa <Paper> alinhe
      // conteúdo (ex.: texto) às linhas pautadas do SVG usando unidades
      // cqw relativas à própria largura da folha (ver AboutItem).
      className={` bg-cover bg-center absolute [container-type:inline-size] ${className}`.trim()}
      style={{ backgroundImage: `url(${folhaPapel})` }}
    >
      {children}
    </div>
  )
}

export default Paper
