/**
 * IconBadge
 * Ícone dentro de um badge quadrado com fundo `surface` (design/tokens.md).
 * Reutilizável em qualquer seção (Hero, Sobre, Habilidades...).
 */
const SIZES = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
}

function IconBadge({ icon, size = 'md', className = '', ...props }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-button bg-surface text-text ${SIZES[size]} ${className}`.trim()}
      {...props}
    >
      {icon}
    </span>
  )
}

export default IconBadge
