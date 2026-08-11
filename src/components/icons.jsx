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

export function UserIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function ZapIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

export function FolderIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function DownloadIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function MenuIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function BookIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  )
}

export function ServerIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <rect x="2" y="3" width="20" height="7" rx="1.5" />
      <rect x="2" y="14" width="20" height="7" rx="1.5" />
      <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
      <line x1="6" y1="17.5" x2="6.01" y2="17.5" />
    </svg>
  )
}

export function DatabaseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  )
}

export function WrenchIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2Z" />
    </svg>
  )
}

export function CloudIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A5 5 0 0 0 6.5 19h11Z" />
    </svg>
  )
}

export function LightbulbIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  )
}

export function LockIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function DeviceIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <rect x="2" y="4" width="14" height="10" rx="1.5" />
      <line x1="6" y1="18" x2="12" y2="18" />
      <rect x="17" y="8" width="5" height="9" rx="1" />
    </svg>
  )
}

export function GitBranchIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  )
}

export function ExternalLinkIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export function SendIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

export function ChevronDownIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function PinIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} {...defaultProps}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
