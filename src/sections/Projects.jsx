import { useRef, useState } from 'react'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import ProjectMockup from '../components/ProjectMockup'
import { ArrowRightIcon, ExternalLinkIcon } from '../components/icons'
import { projects } from '../data/projects'

// Cor de cada camada da pilha por profundidade (0 = projeto da frente).
// O protótipo (design/Carrossel de Pastas/) usa uma cor fixa por pasta
// (amarelo/azul/roxo/rosa, em hex); como o projeto só tem os tokens âmbar
// (`Projects`/`Projects Light`) e azul (`Accent`/`Accent Light`), a pilha
// alterna essas duas famílias por profundidade — sem nenhuma cor nova.
const STACK_LAYER_COLORS = {
  0: { back: 'bg-projects', front: 'bg-projects' },
  1: { back: 'bg-accent', front: 'bg-accent-light' },
  2: { back: 'bg-projects', front: 'bg-projects-light' },
  3: { back: 'bg-accent-light', front: 'bg-accent-light/70' },
}

const DRAG_THRESHOLD = 50

/**
 * Projects
 * Projeto em destaque + pilha/carrossel (design/references/projetos.png).
 * Painel escuro (`bg-primary`) igual ao padrão de About/Skills/Contact.
 *
 * A pilha É o carrossel — geometria e comportamento portados de
 * design/Carrossel de Pastas/ (style.css + script.js): mesmo recorte de
 * pasta com aba (clip-path), mesma "folha" central animada, mesma física
 * de profundidade e a mesma lógica de fila (`order`, `goTo`, `next`/`prev`).
 * `order` guarda os índices dos projetos da frente (posição 0) para trás;
 * navegar troca o projeto da frente com o alvo e manda o antigo da frente
 * para o final, preservando a ordem relativa dos demais.
 *
 * Importante: os cards são renderizados sempre na MESMA ordem de
 * `projects` (nunca reordenados no DOM) — só a profundidade visual
 * (`--stack-offset`, via `order.indexOf`) muda por estilo. Reordenar os
 * elementos no DOM a cada clique (mapear por `order` em vez de por
 * `projects`) faz o React mover fisicamente o nó que "dá a volta" da
 * frente para o fundo da pilha, e mover um nó no DOM no mesmo ciclo em
 * que sua `transform` muda cancela a transição CSS desse elemento — na
 * prática, o card some da frente e "teleporta" pro fundo sem animar,
 * enquanto os demais (que não precisam ser movidos, só mudam de estilo)
 * animam normalmente.
 */
function Projects() {
  const total = projects.length
  const [order, setOrder] = useState(() => projects.map((_, index) => index))
  const frontIndex = order[0]
  const project = projects[frontIndex]
  const dragRef = useRef({ pointerId: null, startX: 0 })

  const goTo = (index) => {
    if (index === order[0]) return
    setOrder((current) => {
      const oldFront = current[0]
      return [index, ...current.filter((i) => i !== index && i !== oldFront), oldFront]
    })
  }

  const goNext = () => goTo(order[1])
  const goPrev = () => goTo(order[order.length - 1])

  // Setas do teclado — só reagem quando o foco está dentro da pilha (não
  // captura o teclado da página inteira, diferente do protótipo original).
  const handleStackKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
  }

  const handlePointerDown = (event) => {
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event) => {
    if (dragRef.current.pointerId === null) return
    const deltaX = event.clientX - dragRef.current.startX
    if (deltaX > DRAG_THRESHOLD) {
      goPrev()
    } else if (deltaX < -DRAG_THRESHOLD) {
      goNext()
    }
    dragRef.current = { pointerId: null, startX: 0 }
  }

  return (
    <Section id="projetos">
      <SectionTitle
        eyebrow="Projetos"
        title="Alguns trabalhos recentes"
        description="Uma seleção de projetos que desenvolvi aplicando boas práticas de código, design e usabilidade."
      />

      <div className="mt-12 grid gap-12 rounded-card bg-primary p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:p-14">
        {/* Coluna esquerda: informações do projeto em destaque + navegação.
            Altura mínima fixa (texto + badges) evita que o painel "pule"
            de tamanho ao trocar de projeto (descrições/badges variam). */}
        <div className="flex flex-col items-start gap-6 lg:min-h-[500px] lg:justify-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-projects-light/30 bg-projects-light/10 text-sm font-bold text-projects-light">
                {project.logo}
              </span>
              <h3 className="text-2xl font-extrabold text-text sm:text-3xl">
                {project.title}
              </h3>
            </div>

            <p className="max-w-sm text-text-muted lg:min-h-18">{project.description}</p>
          </div>

          {project.technologies.length > 0 && (
            <div className="flex min-h-7.5 flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-text/10 bg-text/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-text-muted uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* Modal/página de detalhes ainda não definidos — botão fica
                visível porém não interativo, sem alterar a aparência. */}
            <Button
              type="button"
              variant="projects"
              disabled
              aria-disabled="true"
              title="Em breve"
              className="disabled:cursor-not-allowed disabled:opacity-60"
            >
              Ver detalhes
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>

            <div className="flex items-center gap-5 text-sm">
              {project.githubHref ? (
                <a
                  href={project.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-medium text-text-muted transition-colors hover:text-text"
                >
                  <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Link ainda não disponível"
                  className="flex cursor-not-allowed items-center gap-1.5 font-medium text-text-muted/50"
                >
                  <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </span>
              )}

              {project.demoHref ? (
                <a
                  href={project.demoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-text-muted transition-colors hover:text-text"
                >
                  Live Demo
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Link ainda não disponível"
                  className="cursor-not-allowed font-medium text-text-muted/50"
                >
                  Live Demo
                </span>
              )}
            </div>
          </div>

          {/* Navegação */}
          <div className="mt-2 flex flex-col gap-3 border-t border-text/10 pt-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Projeto anterior"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-text text-primary transition-colors hover:bg-projects-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />
              </button>

              <p className="text-sm font-semibold text-text-muted" aria-live="polite">
                {String(project.id).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>

              <button
                type="button"
                onClick={goNext}
                aria-label="Próximo projeto"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-text text-primary transition-colors hover:bg-projects-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
              >
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div aria-label="Selecionar projeto" className="flex items-center gap-2">
              {projects.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ver projeto ${index + 1}`}
                  aria-current={index === frontIndex}
                  className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text ${
                    index === frontIndex ? 'w-7 bg-projects' : 'w-2 bg-text/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Coluna direita: pilha/carrossel — cada camada é um projeto real */}
        <div
          role="group"
          aria-roledescription="carrossel"
          aria-label={`Projeto em destaque: ${project.title}`}
          tabIndex={0}
          onKeyDown={handleStackKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="project-stack relative mx-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text"
        >
          {projects.map((layerProject, projectIndex) => {
            const depth = order.indexOf(projectIndex)
            const isFront = depth === 0
            const colors = STACK_LAYER_COLORS[depth] ?? STACK_LAYER_COLORS[3]

            return (
              <div
                key={layerProject.id}
                style={{ '--stack-offset': depth, zIndex: total - depth }}
                className="project-stack-layer absolute inset-0"
              >
                <div className="project-folder">
                  <div className={`project-folder-back ${colors.back}`} aria-hidden="true" />

                  {isFront && (
                    <ProjectMockup
                      variant={layerProject.preview}
                      className="project-sheet rounded-md"
                    />
                  )}

                  <div className={`project-folder-front ${colors.front}`} aria-hidden="true" />
                </div>

                {!isFront && (
                  <button
                    type="button"
                    onClick={() => goTo(projectIndex)}
                    aria-label={`Ver projeto ${projectIndex + 1}`}
                    className="absolute inset-0 z-10 cursor-pointer rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default Projects
