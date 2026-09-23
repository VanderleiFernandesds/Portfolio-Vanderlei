import { useEffect, useState } from 'react'
import Container from '../components/layout/Container'
import PaperButton from '../components/ui/PaperButton'
import SocialLink from '../components/ui/SocialLink'
import { useLanguage } from '../i18n/LanguageContext'
import { MailIcon, ArrowRightIcon } from '../components/icons'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { socials } from '../data/socials'
import { stackIcons } from '../data/stackIcons'
import profilePhoto from '../assets/photos/img-portfolio-vanderlei.webp'
import openToWorkStamp from '../assets/decorative/open-to-work-stamp.svg'
import folhaCadernoHorizontal from '../assets/paper/folha-caderno-horizontal.svg'
import tornPaperBottom from '../assets/paper/folha-rasgada-debaixo.svg'
import molduraRecorteSvg from '../assets/decorative/moldura-recorte.svg'
import propositoIcon from '../assets/icons/portfolio/icone-proposito-lampada.svg'
import projetosIcon from '../assets/icons/portfolio/icone-projetos-codigo.svg'
import alvoIcon from '../assets/icons/ui/alvo.svg'
import evolucaoIcon from '../assets/icons/portfolio/icone-evolucao-grafico.svg'

const STACK_ICON_SLOTS = 5
const STACK_ICON_INTERVAL_MS = 5000

// Mesmos ícones de marca utilizados em Contact, para consistência visual.
const SOCIAL_ICONS = {
  github: <SiGithub className="h-10 w-10" />,
  linkedin: <FaLinkedin className="h-10 w-10" />,
  email: <MailIcon className="h-10 w-10" />,
}

function Hero() {
  const { t } = useLanguage()
  // Rodízio automático: a cada intervalo, avança um índice e cada slot
  // visível mostra um ícone diferente da lista (com offset), em loop.
  const [stackIconStep, setStackIconStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStackIconStep((step) => step + 1)
    }, STACK_ICON_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="bg-grid-squares pt-12 pb-12 mt-0 sm:mt-5 lg:pb-25">
      <Container className="flex flex-col gap-4 !px-3 lg:!px-desktop">
        <div className="rounded-card flex flex-col  bg-primary">
          {/* Mesma textura da faixa inferior, invertida. */}
          <div className=" h-5 sm:h-17.5 shrink-0 overflow-hidden">
            <img
              src={tornPaperBottom}
              alt=""
              aria-hidden="true"
              hidden
              width="1461"
              height="104"
              className="block h-full w-full scale-105 rotate-180 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 px-6 py-8 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-8">
            {/* No mobile fica acima da foto; no desktop volta ao bloco de texto abaixo. */}
            <div className="order-1 lg:hidden">
              <p className="font-granesta text-lg leading-tight -mb-1 tracking-wide text-black">
                {t.hero.greeting}
              </p>
              <h1 className="font-granesta text-2xl leading-tight tracking-wide whitespace-nowrap text-black sm:text-5xl">
                Vanderlei Fernandes
              </h1>
            </div>

            <div className="order-3 flex flex-col items-start justify-center gap-6 font-kalam text-text lg:order-none">
              <div className="hidden lg:block">
                <p className="font-granesta text-2xl leading-tight -mb-1 tracking-wide text-black">
                  {t.hero.greeting}
                </p>
                <h1 className="font-granesta text-4xl leading-tight tracking-wide whitespace-nowrap text-black lg:text-6xl xl:text-7xl">
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

              {/* Ícones de stack em preto-e-branco (src/assets/icons/stack-mono). */}
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
                      width="1254"
                      height="1254"
                      className="animate-stack-icon relative z-20 h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                    />
                  );
                })}
              </div>
            </div>

            <div className="order-2 relative mx-auto flex w-full max-w-sm items-center rotate-12 justify-center lg:order-none lg:mx-0 lg:h-full lg:max-w-none">
              <img
                src={profilePhoto}
                alt="Vanderlei Fernandes"
                width="577"
                height="613"
                fetchPriority="high"
                className="max-h-96 w-auto object-contain lg:h-[95%] lg:max-h-[95%]"
              />
              <img
                src={openToWorkStamp}
                alt=""
                aria-hidden="true"
                width="175"
                height="178"
                className="pointer-events-none -rotate-12 absolute top-6 right-6 h-20 w-20 select-none lg:top-10 lg:right-10 lg:h-38 lg:w-38"
              />
            </div>
          </div>

          {/* Respiro — apenas espaço restante dentro do container, sem conteúdo */}
          <div className="grow" />

          <div className="shrink-0 overflow-hidden">
            <img
              src={tornPaperBottom}
              alt=""
              aria-hidden="true"
              width="1461"
              height="104"
              className="block h-auto w-[calc(100%+5px)] max-w-none  scale-105"
            />
          </div>
        </div>

        {/* Estatísticas — fora do container principal */}
        <div className="relative z-10 mx-auto -mt-16 grid w-[92%] max-w-312.5 grid-cols-2 gap-x-3 gap-y-4 overflow-hidden bg-transparent px-4 py-6 sm:-mt-20 sm:gap-6 sm:divide-y-0 sm:px-10 lg:-mt-37.5 lg:grid-cols-4 lg:divide-x lg:divide-text/10 lg:px-16 lg:py-12">
          <img
            src={folhaCadernoHorizontal}
            alt=""
            aria-hidden="true"
            width="1237"
            height="197"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover shadow-lg select-none"
          />
          <div className="flex items-center justify-start gap-2 sm:justify-center sm:gap-3">
            <div className="flex items-center justify-center">
              <img
                src={propositoIcon}
                alt=""
                aria-hidden="true"
                width="128"
                height="128"
                className="h-7 w-9 sm:h-8 sm:w-10 lg:h-24 lg:w-28"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">{t.hero.stats.purpose.title}</p>
              <p className="text-xs text-text-muted sm:text-sm">
                {t.hero.stats.purpose.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 sm:justify-center sm:gap-3">
            <div className="flex items-center justify-center">
              <img
                src={projetosIcon}
                alt=""
                aria-hidden="true"
                width="128"
                height="128"
                className="h-7 w-9 sm:h-8 sm:w-10 lg:h-24 lg:w-28"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">{t.hero.stats.projects.title}</p>
              <p className="text-xs text-text-muted sm:text-sm">
                {t.hero.stats.projects.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 sm:justify-center sm:gap-3">
            <div className="flex items-center justify-center">
              <img
                src={alvoIcon}
                alt=""
                aria-hidden="true"
                width="80"
                height="64"
                className="h-7 w-9 sm:h-8 sm:w-10 lg:h-24 lg:w-28"
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">{t.hero.stats.focus.title}</p>
              <p className="text-xs text-text-muted sm:text-sm">
                {t.hero.stats.focus.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 sm:justify-center sm:gap-3">
            <div className="flex items-center justify-center">
              <img
                src={evolucaoIcon}
                alt=""
                aria-hidden="true"
                width="128"
                height="128"
                className="h-7 w-9 sm:h-8 sm:w-10 lg:h-24 lg:w-28"
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
