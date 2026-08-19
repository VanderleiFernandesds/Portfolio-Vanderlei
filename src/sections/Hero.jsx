import Container from '../components/Container'
import Button from '../components/Button'
import IconBadge from '../components/IconBadge'
import SocialLink from '../components/SocialLink'
import {
  MailIcon,
  CodeIcon,
  LayersIcon,
  TargetIcon,
  RefreshIcon,
  ArrowRightIcon,
} from '../components/icons'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { socials } from '../data/socials'
import { technologies } from '../data/technologies'
import { stats } from '../data/stats'
import profilePhoto from '../assets/profile.png'

// Mesmos ícones de marca utilizados em Contact (design/tokens.md — consistência visual).
const SOCIAL_ICONS = {
  github: <SiGithub className="h-4 w-4" />,
  linkedin: <FaLinkedin className="h-4 w-4" />,
  email: <MailIcon className="h-4 w-4" />,
}

const STAT_ICONS = {
  layers: <LayersIcon />,
  code: <CodeIcon />,
  target: <TargetIcon />,
  refresh: <RefreshIcon />,
}

function Hero() {
  return (
    <section id="hero" className="bg-background pt-6">
      <Container className="flex flex-col gap-4">
        {/* Painel principal: saudação + descrição + ações | foto */}
        <div className="grid gap-8 rounded-card bg-primary px-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-12">
          <div className="flex flex-col items-start justify-center gap-6 text-text">
            <div>
              <p className="text-lg">Olá, eu sou</p>
              <h1 className="text-4xl leading-tight font-extrabold whitespace-nowrap sm:text-5xl lg:text-6xl xl:text-7xl">
                Vanderlei Fernandes
              </h1>
            </div>

            <p className="text-xl font-bold sm:text-2xl">
              Desenvolvedor Full-Stack
            </p>

            <p className="max-w-xl text-text-muted">
              Crio aplicações web modernas, responsivas e performáticas
              utilizando React, TypeScript, Node.js e bancos de dados, sempre
              com foco em experiência do usuário e código limpo.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button as="a" href="#projetos" variant="light">
                Ver projetos
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as="a" href="#contato" variant="outline-light">
                Entrar em contato
                <MailIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <SocialLink
                  key={social.name}
                  href={social.href}
                  label={social.label}
                  icon={SOCIAL_ICONS[social.name]}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {technologies.map((tech) => (
                <IconBadge
                  key={tech.name}
                  size="sm"
                  aria-label={tech.label}
                  title={tech.label}
                  icon={<tech.Icon className="h-4 w-4" aria-hidden="true" />}
                />
              ))}
            </div>
          </div>

          {/* Foto de perfil — fundo transparente, sem moldura, como no mockup */}
          <div className="mx-auto flex w-full max-w-sm items-center justify-center lg:mx-0 lg:h-full lg:max-w-none">
            <img
              src={profilePhoto}
              alt="Vanderlei Fernandes"
              className="max-h-96 w-auto object-contain lg:h-full lg:max-h-full"
            />
          </div>
        </div>

        {/* Barra de estatísticas */}
        <div className="grid grid-cols-1 gap-6 rounded-card bg-primary p-6 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-text/10">
          {stats.map((stat) => (
            <div
              key={stat.secondary}
              className="flex items-center gap-3 lg:px-6 lg:first:pl-0"
            >
              <IconBadge icon={STAT_ICONS[stat.icon]} />
              <div className="text-sm">
                <p className="font-semibold text-text">{stat.primary}</p>
                <p className="text-text-muted">{stat.secondary}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Hero
