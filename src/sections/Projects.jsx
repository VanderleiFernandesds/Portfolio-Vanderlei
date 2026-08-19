import { useState } from 'react'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import FolderCarousel from '../components/FolderCarousel'
import ProjectModal from '../components/ProjectModal'
import { ArrowRightIcon, ExternalLinkIcon } from '../components/icons'
import { projects } from '../data/projects'

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
  const total = projects.length
  const [order, setOrder] = useState(() => projects.map((_, index) => index))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const frontIndex = order[0]
  const project = projects[frontIndex]

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const goTo = (index) => {
    if (index === order[0]) return
    setOrder((current) => {
      const oldFront = current[0]
      return [index, ...current.filter((i) => i !== index && i !== oldFront), oldFront]
    })
  }

  const goNext = () => goTo(order[1])
  const goPrev = () => goTo(order[order.length - 1])

  return (
    <Section id="projetos">
      <SectionTitle
        eyebrow="Projetos"
        title="Alguns trabalhos recentes"
        description="Uma seleção de projetos que desenvolvi aplicando boas práticas de código, design e usabilidade."
      />

      <div className="mt-12 grid gap-12 rounded-card bg-primary p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:p-14">
        {/* Coluna direita (lg:order-2): carrossel de pastas */}
        <div className="flex justify-center lg:order-2">
          <FolderCarousel order={order} onGoTo={goTo} onNext={goNext} onPrev={goPrev} />
        </div>

        {/* Coluna esquerda (lg:order-1): informações do projeto em destaque
            + navegação. Altura mínima fixa evita que o painel "pule" de
            tamanho ao trocar de projeto (descrições/badges variam). */}
        <div className="flex min-h-105 flex-col items-start gap-6 lg:order-1 lg:justify-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-projects-light/30 bg-projects-light/10 text-sm font-bold text-projects-light">
                {project.logo}
              </span>
              <h3 className="text-2xl font-extrabold text-text sm:text-3xl">{project.title}</h3>
            </div>

            <p className="max-w-sm text-text-muted min-h-18">{project.description}</p>
          </div>

          {project.technologies.length > 0 && (
            <div className="flex min-h-16 flex-wrap content-center gap-2">
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
            <Button type="button" variant="projects" onClick={openModal}>
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

          {/* Navegação — reutiliza a mesma order/goTo/goNext/goPrev do carrossel */}
          <div className="mt-2 flex w-full flex-col items-center gap-3 border-t border-text/10 pt-6">
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
      </div>

      <ProjectModal project={project} isOpen={isModalOpen} onClose={closeModal} />
    </Section>
  )
}

export default Projects
