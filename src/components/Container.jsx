/**
 * Container
 * Centraliza o conteúdo e aplica a largura máxima e o padding lateral
 * definidos em design/tokens.md (max-width 1280px, padding 24px/48px).
 */
function Container({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--container-max)] px-mobile lg:px-desktop ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Container
