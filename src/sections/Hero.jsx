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
import profilePhoto from '../assets/foto-moldura.png'
import profileBackdrop from '../assets/foto-portfolio.webp'

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
        {/* Container principal: engloba faixa superior, conteúdo, respiro e faixa inferior */}
        <div className="flex flex-col rounded-card bg-primary">
          {/* Faixa superior — elemento estrutural */}
          <div className="h-12 shrink-0  bg-background sm:h-16 lg:h-20" />

          {/* Conteúdo: saudação + descrição + ações | foto — sem card próprio */}
          <div className="grid gap-8 px-6 py-8 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-12">
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

            {/* Foto de perfil — moldura com imagem de fundo atrás */}
            <div className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:mx-0 lg:h-full lg:max-w-none">
              <img
                src={profileBackdrop}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-1 z-0 h-full w-full scale-75 object-cover"
              />
              <img
                src={profilePhoto}
                alt="Vanderlei Fernandes"
                className="relative z-10 max-h-96 w-auto object-contain lg:h-full lg:max-h-full"
              />
            </div>
          </div>

          {/* Respiro — apenas espaço restante dentro do container, sem conteúdo */}
          <div className="grow" />

          {/* Faixa inferior — elemento estrutural */}
          <div className="h-12 shrink-0  bg-background sm:h-16 lg:h-20" />
        </div>

        {/* Estatísticas — fora do container principal */}
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
