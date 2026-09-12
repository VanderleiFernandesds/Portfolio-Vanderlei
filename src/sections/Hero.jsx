import Container from '../components/Container'
import PaperButton from '../components/PaperButton'
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
import { stats } from '../data/stats'
import profilePhoto from '../assets/img-portfolio-vanderlei.webp'
import tornPaperBottom from '../assets/folha-rasgada-debaixo.svg'
import molduraRecorteSvg from '../assets/moldura-recorte.svg'
import pastaIcon from '../assets/icon/pasta(1).svg'
import calendarioIcon from '../assets/icon/calendario(1) 1.svg'
import alvoIcon from '../assets/icon/alvo(1) 1.svg'
import fogueteIcon from '../assets/icon/foguete(1) 1.svg'
import reactStackIcon from '../assets/icones-preto-branco-svg/react.svg'
import typescriptStackIcon from '../assets/icones-preto-branco-svg/typescript.svg'
import javascriptStackIcon from '../assets/icones-preto-branco-svg/javascript.svg'
import html5StackIcon from '../assets/icones-preto-branco-svg/html5.svg'
import css3StackIcon from '../assets/icones-preto-branco-svg/css3.svg'

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
  return (
    <section id="hero" className="bg-background pt-6 mt-0 sm:mt-5">
      <Container className="flex flex-col gap-4">
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
          <div className="grid gap-8 px-6 py-8 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-12">
            <div className="flex flex-col items-start justify-center gap-6 font-kalam text-text">
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

              <div className="flex flex-nowrap gap-3 sm:gap-4">
                <PaperButton as="a" href="#projetos">
                  Ver projetos
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </PaperButton>
                <PaperButton as="a" href="#contato">
                  Entrar em contato
                  <MailIcon className="h-4 w-4" aria-hidden="true" />
                </PaperButton>
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

              {/* Fileira de ícones das stacks (379.14x69) — SVGs preto-e-branco (src/assets/icones-preto-branco-svg) */}
              <div className="relative flex h-17.25 w-[379.14px] max-w-full items-center justify-center gap-3 overflow-hidden  px-3 sm:gap-4 sm:px-4">
                {/* Base preta, atrás de tudo — fica visível onde os ícones estão */}
                <div aria-hidden="true" className="absolute inset-0 z-0 bg-background" />

                {/* Máscara do SVG por cima da base, em bege */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-primary"
                  style={{
                    WebkitMaskImage: `url(${molduraRecorteSvg})`,
                    maskImage: `url(${molduraRecorteSvg})`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: '100%  calc(100% + 6px)',
                    maskSize: '100% calc(100% + 6px)',
                  }}
                />

                <img src={reactStackIcon} alt="React" className="relative z-20 h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
                <img src={typescriptStackIcon} alt="TypeScript" className="relative z-20 h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
                <img src={javascriptStackIcon} alt="JavaScript" className="relative z-20 h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
                <img src={html5StackIcon} alt="HTML5" className="relative z-20 h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
                <img src={css3StackIcon} alt="CSS3" className="relative z-20 h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
              </div>

            </div>

            {/* Foto de perfil — moldura com a foto real */}
            <div className="mx-auto flex w-full max-w-sm items-center rotate-12 justify-center lg:mx-0 lg:h-full lg:max-w-none">
              <img
                src={profilePhoto}
                alt="Vanderlei Fernandes"
                className="max-h-80 w-auto object-contain lg:h-[88%] lg:max-h-[88%]"
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
        <div className="z-10 mx-auto -mt-10 grid w-[92%] max-w-312.5 grid-cols-2 gap-6 rounded-card border border-b-gray-50 bg-primary p-6 sm:-mt-20 sm:divide-y-0 lg:-mt-37.5 lg:grid-cols-4 lg:divide-x lg:divide-text/10">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img src={pastaIcon} alt="" aria-hidden="true" className="h-8 w-10 lg:h-16 lg:w-20" />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">15+</p>
              <p className="text-xs text-text-muted sm:text-sm">Projetos Desenvolvidos</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img src={calendarioIcon} alt="" aria-hidden="true" className="h-8 w-10 lg:h-16 lg:w-20" />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">2+</p>
              <p className="text-xs text-text-muted sm:text-sm">Anos de Estudos</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img src={alvoIcon} alt="" aria-hidden="true" className="h-8 w-10 lg:h-16 lg:w-20" />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">UI/UX</p>
              <p className="text-xs text-text-muted sm:text-sm">Foco Atual</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img src={fogueteIcon} alt="" aria-hidden="true" className="h-8 w-10 lg:h-16 lg:w-20" />
            </div>
            <div className="flex flex-col items-start justify-center text-left font-kalam text-text">
              <p className="text-lg font-bold sm:text-xl">IA</p>
              <p className="text-xs text-text-muted sm:text-sm">Em constante evolução</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero
