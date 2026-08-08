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
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-text text-primary transition-colors hover:bg-text/90 ${className}`.trim()}
    >
      {icon}
    </a>
  )
}

export default SocialLink
