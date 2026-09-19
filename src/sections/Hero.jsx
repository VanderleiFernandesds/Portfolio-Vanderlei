import { useEffect, useState } from 'react'
import Container from '../components/Container'
import PaperButton from '../components/PaperButton'
import SocialLink from '../components/SocialLink'
import { useLanguage } from '../i18n/LanguageContext'
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
import { stats } from '../data/stats'
import { stackIcons } from '../data/stackIcons'
import profilePhoto from '../assets/img-portfolio-vanderlei.webp'
import openToWorkStamp from '../assets/open_to_work_stamp.svg'
import folhaCadernoHorizontal from '../assets/folha-caderno-horizontal.svg'
import tornPaperBottom from '../assets/folha-rasgada-debaixo.svg'
import molduraRecorteSvg from '../assets/moldura-recorte.svg'
import propositoIcon from '../assets/icones-portfolio-svg/icone-proposito-lampada.svg'
import projetosIcon from '../assets/icones-portfolio-svg/icone-projetos-codigo.svg'
import alvoIcon from '../assets/icon/alvo(1) 1.svg'
import evolucaoIcon from '../assets/icones-portfolio-svg/icone-evolucao-grafico.svg'

// Quantos ícones ficam visíveis ao mesmo tempo na fileira de stacks do Hero.
const STACK_ICON_SLOTS = 5
// Intervalo do rodízio automático dos ícones de stack (ver src/data/stackIcons.js).
const STACK_ICON_INTERVAL_MS = 5000

// Mesmos ícones de marca utilizados em Contact (design/tokens.md — consistência visual).
const SOCIAL_ICONS = {
  github: <SiGithub className="h-10 w-10" />,
  linkedin: <FaLinkedin className="h-10 w-10" />,
  email: <MailIcon className="h-10 w-10" />,
}

const STAT_ICONS = {
  layers: <LayersIcon />,
  code: <CodeIcon />,
  target: <TargetIcon />,
  refresh: <RefreshIcon />,
}

function Hero() {
  const { t } = useLanguage()
  // Rodízio automático dos ícones de stack: a cada intervalo, avança um índice
  // e cada um dos slots visíveis mostra um ícone diferente da lista (com offset),
  // repetindo em loop até passar pelos 16 ícones de src/data/stackIcons.js.
  const [stackIconStep, setStackIconStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStackIconStep((step) => step + 1)
    }, STACK_ICON_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="bg-background pt-12 pb-12 mt-0 sm:mt-5">
      <Container className="flex flex-col gap-4 !px-3 lg:!px-desktop">
        {/* Container principal: engloba faixa superior, conteúdo, respiro e faixa inferior */}
        <div className="rounded-card flex flex-col  bg-primary">
          {/* Faixa superior — mesma textura da faixa inferior, invertida (de cabeça para baixo) */}
          <div className=" h-5 sm:h-17.5 shrink-0 overflow-hidden">
            <img
              src={tornPaperBottom}
              alt=""
              aria-hidden="true"
              hidden
              className="block h-full w-full scale-105 rotate-180 object-cover"
            />
          </div>

          {/* Conteúdo: saudação + descrição + ações | foto — sem card próprio */}
          <div className="grid grid-cols-1 gap-8 px-6 py-8 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-8">
            <div className="order-2 flex flex-col items-start justify-center gap-6 font-kalam text-text lg:order-none">
              <div>
                <p className="font-granesta text-2xl leading-tight -mb-1 tracking-wide text-black">
                  {t.hero.greeting}
                </p>
                <h1 className="font-granesta text-4xl leading-tight tracking-wide text-black sm:text-5xl sm:whitespace-nowrap lg:text-6xl xl:text-7xl">
                  Vanderlei Fernandes
                </h1>
              </div>

              <div className="-mt-3 border border-text bg-background px-2 py-0.5 sm:-mt-9 sm:px-3 sm:py-1">
                <p className="font-granesta text-base font-bold tracking-widest text-primary sm:text-2xl">
                  {t.hero.role}
                </p>
              </div>

              <p className="max-w-xl text-text-muted">{t.hero.description}</p>

              <div className="flex flex-nowrap gap-2 sm:gap-4">
                <PaperButton
                  as="a"
                  href="#projetos"
                  showBackground={false}
                  className="!px-3 !py-2.5 !text-xs whitespace-nowrap border border-text bg-background !text-primary sm:!px-8 sm:!py-3.5 sm:!text-sm"
                >
                  {t.hero.ctaProjects}
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </PaperButton>
                <PaperButton
                  as="a"
                  href="#contato"
                  showBackground={false}
                  className="!px-3 !py-2.5 !text-xs whitespace-nowrap border border-text sm:!px-8 sm:!py-3.5 sm:!text-sm"
                >
                  {t.hero.ctaContact}
                  <MailIcon className="h-4 w-4" aria-hidden="true" />
                </PaperButton>
              </div>

              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <SocialLink
                    key={social.name}
                    href={social.href}
                    label={t.hero.socialLabels[social.name] ?? social.label}
                    icon={SOCIAL_ICONS[social.name]}
                  />
                ))}
              </div>

              {/* Fileira de ícones das stacks (379.14x69) — SVGs preto-e-branco (src/assets/icones-preto-branco-svg) */}
              <div className="relative flex h-17.25 w-[379.14px] max-w-full items-center justify-center gap-3 overflow-hidden  px-3 sm:gap-4 sm:px-4">
                {/* Base preta, atrás de tudo — fica visível onde os ícones estão */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0 bg-background"
                />

                {/* Máscara do SVG por cima da base, em bege */}
                <div
                  aria-hidden="true"
                  className="hero-stack-mask absolute inset-0 z-10 bg-primary"
                  style={{
                    WebkitMaskImage: `url(${molduraRecorteSvg})`,
                    maskImage: `url(${molduraRecorteSvg})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />

                {Array.from({ length: STACK_ICON_SLOTS }, (_, slot) => {
                  const icon =
                    stackIcons[(stackIconStep + slot) % stackIcons.length];
                  return (
                    <img
                      key={`${slot}-${icon.name}`}
                      src={icon.src}
                      alt={icon.label}
                      className="animate-stack-icon relative z-20 h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                    />
                  );
                })}
              </div>
            </div>

            {/* Foto de perfil — moldura com a foto real */}
            <div className="order-1 relative mx-auto flex w-full max-w-sm items-center rotate-12 justify-center lg:order-none lg:mx-0 lg:h-full lg:max-w-none">
              <img
                src={profilePhoto}
                alt="Vanderlei Fernandes"
                className="max-h-96 w-auto object-contain lg:h-[95%] lg:max-h-[95%]"
              />
              <img
                src={openToWorkStamp}
                alt=""
                aria-hidden="true"
                className="pointer-events-none -rotate-12 absolute top-6 right-6 h-20 w-20 select-none lg:top-10 lg:right-10 lg:h-38 lg:w-38"
              />
            </div>
          </div>

          {/* Respiro — apenas espaço restante dentro do container, sem conteúdo */}
          <div className="grow" />

          {/* Faixa inferior — elemento estrutural (papel rasgado) */}
          <div className="shrink-0 overflow-hidden">
            <img
              src={tornPaperBottom}
              alt=""
              aria-hidden="true"
              className="block h-auto w-[calc(100%+5px)] max-w-none  scale-105"
            />
          </div>
        </div>

        {/* Estatísticas — fora do container principal */}
        <div className="relative z-10 mx-auto -mt-16 grid w-[92%] max-w-312.5 grid-cols-2 gap-6 overflow-hidden bg-transparent px-10 py-6 sm:-mt-20 sm:divide-y-0 lg:-mt-37.5 lg:grid-cols-4 lg:divide-x lg:divide-text/10 lg:px-16 lg:py-12">
          <img
            src={folhaCadernoHorizontal}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover shadow-lg select-none"
          />
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img
                src={propositoIcon}
                alt=""
                aria-hidden="true"
                className="h-8 w-10 lg:h-24 lg:w-28"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">{t.hero.stats.purpose.title}</p>
              <p className="text-xs text-text-muted sm:text-sm">
                {t.hero.stats.purpose.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img
                src={projetosIcon}
                alt=""
                aria-hidden="true"
                className="h-8 w-10 lg:h-24 lg:w-28"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">{t.hero.stats.projects.title}</p>
              <p className="text-xs text-text-muted sm:text-sm">
                {t.hero.stats.projects.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img
                src={alvoIcon}
                alt=""
                aria-hidden="true"
                className="h-8 w-10 lg:h-24 lg:w-28"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">{t.hero.stats.focus.title}</p>
              <p className="text-xs text-text-muted sm:text-sm">
                {t.hero.stats.focus.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img
                src={evolucaoIcon}
                alt=""
                aria-hidden="true"
                className="h-8 w-10 lg:h-24 lg:w-28"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">{t.hero.stats.evolution.title}</p>
              <p className="text-xs text-text-muted sm:text-sm">
                {t.hero.stats.evolution.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero
