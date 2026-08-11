import IconBadge from './IconBadge'
import { ExternalLinkIcon } from './icons'

// Mapeia o token de canal (design/tokens.md) para a classe de fundo do
// badge — cores de uso exclusivo dos badges desta seção.
const CHANNEL_BG = {
  email: 'bg-channel-email',
  whatsapp: 'bg-channel-whatsapp',
  linkedin: 'bg-channel-linkedin',
  github: 'bg-channel-github',
  location: 'bg-channel-location',
}

/**
 * ContactChannelCard
 * Um canal de contato (design/references/contato.png): badge com cor
 * própria + título + valor + badge de destaque opcional + link externo.
 */
function ContactChannelCard({ channel, icon, title, value, badge, href, isLink }) {
  return (
    <div className="flex items-center gap-4 rounded-button border border-surface p-4">
      <IconBadge icon={icon} className={CHANNEL_BG[channel]} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-text">{title}</p>
          {badge && (
            <span className="rounded-full bg-channel-whatsapp/20 px-2 py-0.5 text-xs font-semibold text-channel-whatsapp">
              {badge}
            </span>
          )}
        </div>
        <p className="truncate text-sm text-text-muted">{value}</p>
      </div>

      {isLink && (
        <a
          href={href}
          aria-label={`Abrir ${title}`}
          target={href && href !== '#' ? '_blank' : undefined}
          rel={href && href !== '#' ? 'noreferrer' : undefined}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-button border border-surface text-text transition-colors hover:bg-surface"
        >
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}

export default ContactChannelCard
