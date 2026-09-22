import { useEffect, useState } from 'react'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import FolderCarousel from '../components/FolderCarousel'
import ProjectModal from '../components/ProjectModal'
import PaperButton from '../components/PaperButton'
import ProjectCategoryTag from '../components/ProjectCategoryTag'
import { ArrowRightIcon, ExternalLinkIcon } from '../components/icons'
import { SiGithub, SiChartdotjs, SiPostgresql } from 'react-icons/si'
import { projects } from '../data/projects'
import { stackIcons } from '../data/stackIcons'
import { useLanguage } from '../i18n/LanguageContext'

// Fallback (react-icons) pra tecnologias sem SVG em stackIcons.js
// (src/assets/icons/stack-mono), como Chart.js e PostgreSQL.
const FALLBACK_TECH_ICONS = {
  'chart.js': SiChartdotjs,
  postgresql: SiPostgresql,
}
import pastaProjetosFundo from '../assets/pasta-projetos-fundo.svg'
import pastaProjetosFrente from '../assets/pasta-projetos-frente.svg'

/**
 * Projects
 * Painel escuro (`bg-primary`) igual ao padrão de About/Skills/Contact.
 *
 * Painel com as informações do projeto em destaque à esquerda, carrossel
 * de pastas (src/components/FolderCarousel.jsx — port literal de
 * design/Carrossel de Pastas/) à direita. Os dois ficam sincronizados: a
 * `order` (índice do projeto em primeiro plano) é controlada aqui e
 * passada para o carrossel, então clicar/arrastar/usar o teclado nele
 * também atualiza o painel, e as setas/paginação do painel também
 * navegam o carrossel.
 */
function Projects() {
  const { t } = useLanguage()
  const total = projects.length
  const [order, setOrder] = useState(() => projects.map((_, index) => index))
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Distâncias do coverflow (translateX/Z, rotateY) são calculadas em px
  // fixos — precisam encolher no mobile, senão as pastas laterais saem
  // muito para fora do container estreito. `isCompact` acompanha o
  // breakpoint lg (1024px) via matchMedia.
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

  // Todas usam a forma funcional do setOrder e calculam o alvo a partir
  // de `current` (o estado mais recente), nunca do `order` capturado no
  // fechamento do render — senão cliques rápidos (antes do React
  // re-renderizar) recalculam o alvo com um `order` desatualizado e o
  // carrossel "pula" para o projeto errado.
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

  // Não reaproveita goTo aqui: goTo sempre joga o front antigo para o
  // final da pilha, o que é o comportamento certo para "próximo"/clique
  // direto, mas quebra o "voltar" (rotação precisa ser o inverso exato
  // de goNext, com o front antigo voltando para a 2ª posição, não pro
  // final — senão "voltar" duas vezes pula projetos em vez de andar um
  // por um).
  const goPrev = () => {
    setOrder((current) => {
      const last = current[current.length - 1]
      return [last, ...current.slice(0, -1)]
    })
  }

  return (
    <Section id="projetos" containerClassName="!px-3 lg:!px-desktop">
      {/*
        Containers do painel (SectionTitle, carrossel de pastas, informações
        do projeto em destaque, botões e navegação) excluídos — a seção fica
        vazia até o novo conteúdo ser definido. Modal de detalhes mantido
        (não some quando reativarem o botão "Ver detalhes").
      */}

      {/* Placeholder — medida de referência 1440x908, responsivo (w-full, teto no valor de referência, aspect-ratio no lugar de h/w fixos em px). */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-4 rounded-card bg-primary text-primary/50">
        <SectionTitle
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          titleClassName="text-text"
        />

        {/*
          Carrossel coverflow (ver https://examples.motion.dev/react/carousel-coverflow)
          — todos os projetos ficam empilhados no mesmo eixo central, cada um
          transformado (rotateY + translateX/Z + escala + opacidade) conforme a
          distância `diff` até o projeto ativo (frontIndex): diff 0 fica de frente
          e em tamanho real, |diff| 1/2 giram pra dentro (rotateY) e recuam
          (translateZ negativo), diminuindo escala/opacidade a cada passo. Clicar
          em qualquer card chama goTo(index) e a transição desliza suavemente
          (CSS transition, sem lib nova) até ele virar o card central.
        */}
        <div className="relative flex w-[94.24%] aspect-[5/4] sm:aspect-[3/2] lg:aspect-[1357/542] max-w-[1357px] items-center justify-center overflow-hidden text-primary/50 [perspective:1400px] transform-3d">
          {false && (
            <FolderCarousel order={order} projects={projects} onGoTo={goTo} onNext={goNext} onPrev={goPrev} />
          )}

          {/* Setas prev/next — cada uma num canto do carrossel. */}
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
            // Distância com sinal mais curta até o card ativo (circular): ex. com
            // 5 projetos, se frontIndex=0 e index=4, diff dá -1 (1 passo pra trás)
            // em vez de +4 — assim os cards se distribuem pros dois lados do
            // centro, não só pra um.
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
                  filter: isCenter
                    ? isCompact
                      ? 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))'
                      : 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))'
                    : isCompact
                      ? 'brightness(0.92) drop-shadow(0 3px 6px rgba(0,0,0,0.15))'
                      : 'brightness(0.92) drop-shadow(0 6px 10px rgba(0,0,0,0.2))',
                }}
                className={`absolute top-1/2 left-1/2 flex aspect-[689/453] max-h-[390px] ${isCenter ? 'w-[95%]' : 'w-[75%]'} sm:w-[52%] lg:w-[44%] max-w-[597px] shrink items-center justify-center transition-[transform,opacity] duration-500 ease-out`}
              >
                {/*
                  Mesma mecânica do FolderCarousel.jsx original (desativado):
                  um wrapper com clip (-top-[35%], overflow-hidden, cantos
                  arredondados só embaixo) que deixa a folha vazar/"sair" por
                  cima da pasta enquanto os lados ficam sempre cortados no
                  contorno dela — em vez de 1 SVG só, a pasta virou 2 camadas
                  (pasta-projetos-fundo.svg atrás, pasta-projetos-frente.svg na
                  frente) pra a screenshot entrar entre elas.
                */}
                <div className="absolute inset-x-0 top-[-1%] bottom-0 rounded-b-2xl [clip-path:inset(-999px_-999px_0_-999px_round_0_0_1rem_1rem)]">
                  
                    <img
                      src={pastaProjetosFundo}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full select-none"
                    />

                    {/*
                      Screenshot do projeto — só o card central mostra (os
                      outros ficam só com a pasta). Usa a mesma animação
                      --animate-sheet-out do FolderCarousel (src/index.css) —
                      a "folha" sobe saindo de dentro da pasta e se acomoda no
                      lugar, com o clip do wrapper acima cortando os lados/base
                      no contorno da pasta. `key={project.id}` remonta o
                      elemento a cada troca, reiniciando a animação.
                    */}
                    {isCenter && (
                      <div
                        key={project.id}
                        className="animate-sheet-out absolute top-[18%] right-[3%] left-[3%] z-[2] h-[75%] overflow-hidden rounded-md"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-contain object-top"
                        />
                      </div>
                    )}

                    <img
                      src={pastaProjetosFrente}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-3 h-auto w-full select-none"
                    />
                  
                </div>
              </div>
            )
          })}

          {/* Contador do projeto em destaque (ex.: 02 / 05), na base do container das pastas. */}
          <p className="absolute bottom-2 left-1/2 z-40 -translate-x-1/2 font-kalam text-sm tracking-widest text-text/60 sm:bottom-6">
            {String(frontIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </div>

        {/* Placeholder interno — medida de referência 691x222 (47.99% x 24.45% do pai), embaixo do anterior. No mobile empilha em coluna (largura total, altura automática) em vez de manter a proporção fixa e as 2 colunas lado a lado do desktop. */}
        {/*
          Container achatado (info + badges + detalhes como irmãos diretos,
          num único flex-wrap) pra poder reordenar com `order` conforme o
          breakpoint: no mobile o container das stacks (badges) fica entre
          as informações e o botão "Ver detalhes" (order-2); a partir do sm
          a largura de info+detalhes soma 100% e badges (w-full) quebra pra
          a 2ª linha, voltando à ordem original (badges por último).
        */}
        <div className="-mt-6 lg:-mt-8 flex w-full flex-wrap items-center justify-center gap-4 sm:w-[80%] lg:w-[47.99%] lg:aspect-[691/222] lg:gap-0 max-w-[691px] border bg-background text-primary/50">
            {/* Placeholder interno — medida de referência 426x159 (61.65% x 71.62% do pai). Informações do projeto em destaque (título + descrição). */}
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

            {/* Placeholder interno — medida de referência 265x159 (38.35% x 71.62% do pai), do lado direito do anterior. Botão "Ver detalhes" em cima, links GitHub/Ver projeto embaixo. No mobile fica depois do container das stacks (order-3); a partir do sm volta pra ordem natural (order-2), lado a lado com as informações. */}
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

          {/* Placeholder interno — medida de referência 691x63 (100% x 28.38% do pai). Badges das tecnologias do projeto em destaque — order-2 no mobile (entre info e detalhes), order-3 a partir do sm (quebra pra 2ª linha, largura total). */}
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
                    <img src={icon.src} alt="" aria-hidden="true" className="h-6 w-6" />
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
