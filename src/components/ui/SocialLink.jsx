import { useState } from 'react'
import HoverStrokeCircle from './HoverStrokeCircle'

/**
 * SocialLink
 * Ícone circular e clicável para uma rede social/contato.
 * `label` é obrigatório e vira `aria-label` — o ícone sozinho não descreve o link.
 *
 * Hover: contorno "desenhado à mão" (HoverStrokeCircle) revelado ao redor
 * do ícone.
 */
function SocialLink({ href = '#', label, icon, className = '' }) {
  const isExternal = /^https?:\/\//.test(href)
  const [hover, setHover] = useState(false)

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={`relative inline-flex h-15 w-15 items-center justify-center text-text transition-colors ${className}`.trim()}
    >
      <span className="relative z-10 inline-flex">{icon}</span>
      <HoverStrokeCircle hover={hover} />
    </a>
  )
}

export default SocialLink
