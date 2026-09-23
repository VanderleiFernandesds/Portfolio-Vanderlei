import { useEffect, useState } from 'react'
import Section from '../components/layout/Section'
import SectionTitle from '../components/layout/SectionTitle'
import FolderCarousel from '../components/projects/FolderCarousel'
import ProjectModal from '../components/projects/ProjectModal'
import PaperButton from '../components/ui/PaperButton'
import ProjectCategoryTag from '../components/projects/ProjectCategoryTag'
import { ArrowRightIcon, ExternalLinkIcon } from '../components/icons'
import { SiGithub, SiChartdotjs, SiPostgresql } from 'react-icons/si'
import { projects } from '../data/projects'
import { stackIcons } from '../data/stackIcons'
import { useLanguage } from '../i18n/LanguageContext'

// Fallback (react-icons) para tecnologias sem SVG em stackIcons.js
// (src/assets/icons/stack-mono), como Chart.js e PostgreSQL.
const FALLBACK_TECH_ICONS = {
  'chart.js': SiChartdotjs,
  postgresql: SiPostgresql,
}
import pastaProjetosFundo from '../assets/decorative/pasta-projetos-fundo.svg'
import pastaProjetosFrente from '../assets/decorative/pasta-projetos-frente.svg'

/**
 * Projects
 * Painel com o projeto em destaque à esquerda e carrossel de pastas
 * (src/components/projects/FolderCarousel.jsx) à direita. Os dois ficam
 * sincronizados: `order` (índice do projeto em primeiro plano) é
 * controlada aqui e passada ao carrossel, então navegar por ele também
 * atualiza o painel, e vice-versa.
 */
function Projects() {
  const { t } = useLanguage()
  const total = projects.length
  const [order, setOrder] = useState(() => projects.map((_, index) => index))
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Distâncias do coverflow (translateX/Z, rotateY) são calculadas em px
  // fixos e precisam encolher no mobile, senão as pastas laterais saem do
  // container estreito. `isCompact` acompanha o breakpoint lg (1024px).
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches,
  )
  const frontIndex = order[0]
  const project = projects[frontIndex]
  const projectText = t.projects.items[project.id]
  const projectDescription = projectText?.description ?? project.description

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)')
    const handleChange = (event) => setIsCompact(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Usa sempre a forma funcional de setOrder, calculando o alvo a partir de
  // `current` (o estado mais recente), nunca do `order` capturado no
  // fechamento do render — cliques rápidos antes do React re-renderizar
  // recalculariam o alvo com um `order` desatualizado.
  const goTo = (index) => {
    setOrder((current) => {
      if (index === current[0]) return current
      const oldFront = current[0]
      return [index, ...current.filter((i) => i !== index && i !== oldFront), oldFront]
    })
  }

  const goNext = () => {
    setOrder((current) => {
      const target = current[1]
      const oldFront = current[0]
      return [target, ...current.filter((i) => i !== target && i !== oldFront), oldFront]
    })
  }

  // Não reaproveita goTo: goTo sempre move o front antigo para o final da
  // pilha (correto para "próximo"/clique direto), mas "voltar" precisa do
  // inverso exato — o front antigo volta para a 2ª posição, não para o
  // final, senão duas chamadas seguidas pulam projetos em vez de andar
  // um por um.
  const goPrev = () => {
    setOrder((current) => {
      const last = current[current.length - 1]
      return [last, ...current.slice(0, -1)]
    })
  }

  return (
    <Section id="projetos" containerClassName="!px-3 lg:!px-desktop">
      {/*
        Conteúdo do painel (título, carrossel, informações, botões e
        navegação) desativado até a definição do novo conteúdo da seção.
        O modal de detalhes permanece ativo.
      */}

      {/* Aspect-ratio no lugar de altura/largura fixas mantém a proporção da referência de design em qualquer tela. */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-4 rounded-card bg-primary text-primary/50">
        <SectionTitle
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          titleClassName="text-text"
          eyebrowClassName="px-2 mt-2"
        />

        {/*
          Carrossel coverflow: os projetos ficam empilhados no mesmo eixo
          central, cada um transformado (rotateY + translateX/Z + escala +
          opacidade) conforme a distância `diff` até o projeto ativo. Clicar
          em qualquer card chama goTo(index); a transição desliza via CSS
          transition até ele virar o card central.
        */}
        <div className="relative flex w-[94.24%] aspect-[5/4] sm:aspect-[3/2] lg:aspect-[1357/542] max-w-[1357px] items-center justify-center overflow-hidden text-primary/50 [perspective:1400px] transform-3d">
          {false && (
            <FolderCarousel order={order} projects={projects} onGoTo={goTo} onNext={goNext} onPrev={goPrev} />
          )}

          <button
            type="button"
            onClick={goPrev}
            aria-label={t.projects.prevAria}
            className="absolute top-1/2 left-0 sm:left-4 z-40 inline-flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-text/30 bg-text transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            style={{ color: 'var(--color-primary)' }}
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={t.projects.nextAria}
            className="absolute top-1/2 right-0 sm:right-4 z-40 inline-flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-text/30 bg-text transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            style={{ color: 'var(--color-primary)' }}
          >
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>

          {projects.map((item, index) => {
            // Distância com sinal mais curta até o card ativo (circular):
            // com 5 projetos, se frontIndex=0 e index=4, diff dá -1 em vez
            // de +4 — os cards se distribuem para os dois lados do centro.
            let diff = index - frontIndex
            if (diff > total / 2) diff -= total
            if (diff < -total / 2) diff += total

            const abs = Math.abs(diff)
            const isCenter = diff === 0
            const visible = true

            const scale = isCenter ? 1 : abs === 1 ? 0.78 : 0.62
            const translateX =
              diff * (isCenter ? 0 : abs === 1 ? (isCompact ? 170 : 460) : isCompact ? 110 : 300)
            const translateZ = isCenter ? 0 : abs === 1 ? (isCompact ? -60 : -120) : isCompact ? -140 : -260
            const rotateY = isCenter ? 0 : Math.sign(diff) * (abs === 1 ? 42 : 54)
            const opacity = 1

            return (
              <div
                key={item.id}
                aria-current={isCenter}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: 20 - abs,
                  opacity: visible ? opacity : 0,
                  pointerEvents: visible ? 'auto' : 'none',
                  willChange: 'transform',
                  // drop-shadow é caro de compositar. Com os 5 cards
                  // animando transform ao mesmo tempo, mantê-lo só no
                  // centro e nos vizinhos imediatos evita recalcular sombra
                  // nos cards mais distantes, onde ela já é imperceptível.
                  // brightness() sozinho é barato (ajuste de cor, sem
                  // rasterização) e mantém o escurecimento dos cards fora
                  // de foco.
                  filter: isCenter
                    ? isCompact
                      ? 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))'
                      : 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))'
                    : abs === 1
                      ? isCompact
                        ? 'brightness(0.92) drop-shadow(0 3px 6px rgba(0,0,0,0.15))'
                        : 'brightness(0.92) drop-shadow(0 6px 10px rgba(0,0,0,0.2))'
                      : 'brightness(0.92)',
                }}
                className={`absolute top-1/2 left-1/2 flex aspect-[689/453] max-h-[390px] ${isCenter ? 'w-[95%]' : 'w-[75%]'} sm:w-[52%] lg:w-[44%] max-w-[597px] shrink items-center justify-center transition-[transform,opacity] duration-500 ease-out`}
              >
                {/*
                  A pasta é composta por 2 camadas (pasta-projetos-fundo.svg
                  atrás, pasta-projetos-frente.svg na frente) em vez de um
                  SVG só, para a screenshot entrar entre elas. O wrapper com
                  clip-path corta os lados/base pela silhueta da pasta e
                  deixa a folha vazar por cima, como se saísse de dentro.
                */}
                <div className="absolute inset-x-0 top-[-1%] bottom-0 rounded-b-2xl [clip-path:inset(-999px_-999px_0_-999px_round_0_0_1rem_1rem)]">

                    <img
                      src={pastaProjetosFundo}
                      alt=""
                      aria-hidden="true"
                      width="689"
                      height="453"
                      loading="lazy"
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full select-none"
                    />

                    {/*
                      Só o card central mostra a screenshot real. `key={project.id}`
                      remonta o elemento a cada troca para reiniciar a animação
                      --animate-sheet-out (a folha sobe saindo de dentro da pasta).
                    */}
                    {isCenter && (
                      <div
                        key={project.id}
                        className="animate-sheet-out absolute top-[18%] right-[3%] left-[3%] z-[2] h-[75%] overflow-hidden rounded-md"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          width="1536"
                          height="1024"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain object-top"
                        />
                      </div>
                    )}

                    <img
                      src={pastaProjetosFrente}
                      alt=""
                      aria-hidden="true"
                      width="689"
                      height="453"
                      loading="lazy"
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-3 h-auto w-full select-none"
                    />

                </div>
              </div>
            )
          })}

          {/* text-text/65: opacidade mínima que mantém contraste AA sobre bg-primary. */}
          <p className="absolute bottom-2 left-1/2 z-40 -translate-x-1/2 font-kalam text-sm tracking-widest text-text/65 sm:bottom-6">
            {String(frontIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </div>

        {/*
          Info, badges e detalhes como irmãos diretos num único flex-wrap
          para poder reordenar via `order` por breakpoint: no mobile as
          stacks ficam entre informações e o botão "Ver detalhes"; a partir
          do sm, info+detalhes somam 100% e as stacks quebram para a 2ª
          linha, voltando à ordem original.
        */}
        <div className="-mt-6 lg:-mt-8 flex w-full flex-wrap items-center justify-center gap-4 sm:w-[80%] lg:w-[47.99%] lg:aspect-[691/222] lg:gap-0 max-w-[691px] border bg-background text-primary/50">
            <div
              key={`info-${project.id}`}
              className="animate-fade-up-in order-1 flex w-full sm:w-[61.65%] lg:h-[71.62%] lg:max-w-[426px] flex-col items-start justify-center gap-2 overflow-hidden p-3 font-kalam text-primary/50"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-projects-light/10 text-xs font-bold text-primary">
                  {project.logo}
                </span>
                <h3 className="text-lg font-extrabold text-primary">{project.title}</h3>
                <ProjectCategoryTag category={project.category} className="ml-2" />
              </div>
              <p className="line-clamp-2 text-sm text-primary/70">{projectDescription}</p>
            </div>

            <div className="order-3 sm:order-2 flex w-full sm:w-[38.35%] lg:h-[71.62%] lg:max-w-[265px] flex-col items-center justify-start sm:justify-center gap-3 sm:gap-2 overflow-hidden p-3 sm:p-2 font-kalam text-primary/50">
              <PaperButton
                type="button"
                onClick={openModal}
                showBackground={false}
                className="w-full sm:w-[218px] rounded-button bg-primary whitespace-nowrap"
                style={{ color: 'var(--color-text)' }}
              >
                {t.projects.viewDetails}
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </PaperButton>

              <div className="flex items-center gap-4 sm:pt-4 text-sm">
                {project.githubHref ? (
                  <a
                    href={project.githubHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-button border border-primary/20 px-3 py-1.5 font-medium text-primary/70 transition-colors hover:text-primary"
                  >
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                    {t.projects.github}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center gap-1.5 rounded-button border border-primary/20 px-3 py-1.5 font-medium text-primary/70"
                  >
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                    {t.projects.github}
                  </span>
                )}

                {project.demoHref ? (
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-button border border-primary/20 px-3 py-1.5 font-medium whitespace-nowrap text-primary/70 transition-colors hover:text-primary"
                  >
                    <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    {t.projects.viewProject}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center gap-1.5 rounded-button border border-primary/20 px-3 py-1.5 font-medium whitespace-nowrap text-primary/70"
                  >
                    <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    {t.projects.viewProject}
                  </span>
                )}
              </div>
            </div>

          <div
            key={`stack-${project.id}`}
            className="animate-fade-up-in order-2 sm:order-3 flex h-auto lg:h-[28.38%] w-full lg:max-h-[63px] flex-wrap content-center items-center justify-start gap-2 overflow-hidden p-3 text-primary/50"
          >
            {project.technologies.map((tech) => {
              const icon = stackIcons.find(
                (item) => item.label.toLowerCase() === tech.toLowerCase(),
              )
              const FallbackIcon = FALLBACK_TECH_ICONS[tech.toLowerCase()]
              return (
                <span
                  key={tech}
                  className="flex flex-col items-center gap-1 rounded-md px-2.5 py-1.5"
                >
                  {icon ? (
                    <img src={icon.src} alt="" aria-hidden="true" width="1254" height="1254" loading="lazy" className="h-6 w-6" />
                  ) : FallbackIcon ? (
                    <FallbackIcon className="h-6 w-6 text-primary/70" aria-hidden="true" />
                  ) : null}
                  <span className="text-[11px] font-medium tracking-wide text-primary/70 uppercase">
                    {tech}
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <ProjectModal project={project} isOpen={isModalOpen} onClose={closeModal} />
    </Section>
  )
}

export default Projects
