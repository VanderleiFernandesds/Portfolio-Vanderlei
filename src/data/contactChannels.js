// Canais de contato da seção Contact (design/references/contato.png).
// GitHub/LinkedIn/e-mail reaproveitam os mesmos `href` de src/data/socials.js
// (mesmos destinos usados na Hero) para não duplicar/dessincronizar links.
import { SiWhatsapp, SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { socials } from './socials'

const githubHref = socials.find((s) => s.name === 'github')?.href ?? '#'
const linkedinHref = socials.find((s) => s.name === 'linkedin')?.href ?? '#'
const emailHref = socials.find((s) => s.name === 'email')?.href ?? '#'

export const contactChannels = [
  {
    channel: 'email',
    icon: 'mail',
    title: 'E-mail',
    value: 'vanderleifds.7000@hotmail.com',
    href: emailHref,
    isLink: true,
  },
  {
    channel: 'whatsapp',
    icon: SiWhatsapp,
    title: 'WhatsApp',
    value: '+55 11 94504-3191',
    badge: 'Mais rápido',
    href: 'https://wa.me/5511945043191',
    isLink: true,
  },
  {
    channel: 'linkedin',
    icon: FaLinkedin,
    title: 'LinkedIn',
    value: 'linkedin.com/in/vanderleifernandesds',
    href: linkedinHref,
    isLink: true,
  },
  {
    channel: 'github',
    icon: SiGithub,
    title: 'GitHub',
    value: 'github.com/VanderleiFernandesds',
    href: githubHref,
    isLink: true,
  },
  {
    channel: 'location',
    icon: 'pin',
    title: 'Localização',
    value: 'Adicionar localização', // TODO: preencher cidade/estado reais
    isLink: false,
  },
]
