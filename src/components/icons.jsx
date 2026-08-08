/**
 * Ícones inline (sem dependência externa).
 * Traços genéricos, no estilo outline, herdam a cor via `currentColor` —
 * pensados para uso dentro de `IconBadge` ou `SocialLink`.
 */
const defaultProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function MailIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function CodeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

export function LayersIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

export function TargetIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  )
}

export function RefreshIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  )
}
