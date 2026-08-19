/**
 * Button
 * Variantes:
 * - "primary": sólido, para uso sobre fundo claro (bg-primary).
 * - "secondary": contornado, para uso sobre fundo claro (border-primary).
 * - "light": sólido claro, para uso sobre fundo escuro (ex.: Hero).
 * - "outline-light": contornado claro, para uso sobre fundo escuro (ex.: Hero).
 * - "accent": sólido em accent, para CTAs de destaque (ex.: Contact).
 * - "projects": sólido no token `Projects`, exclusivo da seção Projects.
 * Renderiza como <button> por padrão; passe `as="a"` + `href` para links.
 */
const VARIANTS = {
  primary: 'bg-primary text-text hover:bg-primary/90',
  secondary: 'border border-primary/20 text-primary hover:bg-primary/5',
  light: 'bg-text text-primary hover:bg-text/90',
  'outline-light': 'border border-text/30 text-text hover:bg-text/10',
  accent: 'bg-accent text-text hover:bg-accent/90',
  projects: 'bg-projects text-primary hover:bg-projects/90',
}

function Button({
  as: Tag = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold  transition-colors ${VARIANTS[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Button
