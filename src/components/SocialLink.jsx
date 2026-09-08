/**
 * SocialLink
 * Ícone circular e clicável para uma rede social/contato.
 * `label` é obrigatório e vira `aria-label` — o ícone sozinho não descreve o link.
 */
function SocialLink({ href = '#', label, icon, className = '' }) {
  const isExternal = /^https?:\/\//.test(href)

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex h-15 w-15 items-center justify-center  text-text transition-colors hover:bg-text/10 ${className}`.trim()}
    >
      {icon}
    </a>
  )
}

export default SocialLink
