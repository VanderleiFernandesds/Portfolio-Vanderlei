import { useState } from 'react'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { ArrowRightIcon, ExternalLinkIcon } from '../components/icons'
import { projects } from '../data/projects'

/**
 * Projects
 * Projeto em destaque + pilha/deck (design/references/projetos.png).
 * Diferente de About/Skills/Contact, o mockup não usa um painel `bg-primary`
 * envolvendo o conteúdo — texto e pilha ficam diretamente sobre o fundo claro.
 */
function Projects() {
  const total = projects.length
  const [activeIndex, setActiveIndex] = useState(0)
  const project = projects[activeIndex]

  const goTo = (index) => {
    setActiveIndex((index + total) % total)
  }

  return (
    <Section id="projetos">
      <SectionTitle
        eyebrow="Projetos"
        title="Alguns trabalhos recentes"
        description="Uma seleção de projetos de alto impacto, desenvolvidos com foco em performance, acessibilidade e design excepcional."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Coluna esquerda: informações do projeto em destaque */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="rounded-button bg-projects px-3 py-1 text-sm font-bold text-primary">
              {project.logo}
            </span>
            <h3 className="text-xl font-bold text-primary sm:text-2xl">
              {project.title}
            </h3>
          </div>

          <p className="text-text-muted">{project.description}</p>

          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-medium text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Modal/página de detalhes ainda não definidos — botão fica visível
              porém não interativo, sem alterar a aparência (ver revisão). */}
          <Button
            type="button"
            variant="projects"
            disabled
            aria-disabled="true"
            title="Em breve"
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
                className="flex items-center gap-1.5 font-medium text-text-muted transition-colors hover:text-primary"
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
                className="font-medium text-text-muted transition-colors hover:text-primary"
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

        {/* Coluna direita: pilha/deck com o screenshot do projeto */}
        <div className="relative mx-auto w-full max-w-md py-8">
          {/* Camadas decorativas atrás — Projects Light + variação de opacidade
              do token Projects (sem criar um novo token para o tom intermediário) */}
          <div
            className="absolute -top-4 right-2 h-40 w-48 rounded-card bg-projects-light sm:h-48 sm:w-56"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-4 right-0 h-32 w-40 rounded-card bg-projects-light sm:h-40 sm:w-48"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 right-10 h-8 w-28 rounded-card bg-projects/70"
            aria-hidden="true"
          />

          {/* Card principal */}
          <div className="relative z-10 mx-auto flex aspect-4/3 w-full max-w-sm items-center justify-center rounded-card border-4 border-projects bg-text p-2">
            {project.image ? (
              <img
                src={project.image}
                alt={`Captura de tela do projeto ${project.title}`}
                className="h-full w-full rounded-[calc(var(--radius-card)-8px)] object-cover"
              />
            ) : (
              <p className="px-4 text-center text-sm text-text-muted">
                foto do projeto
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Projeto anterior"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-text text-projects transition-colors hover:bg-projects/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-projects"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />
        </button>

        <p className="text-sm font-semibold text-text-muted" aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Próximo projeto"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-text text-projects transition-colors hover:bg-projects/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-projects"
        >
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div
        aria-label="Selecionar projeto"
        className="mt-4 flex items-center justify-center gap-2"
      >
        {projects.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ver projeto ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-2 w-2 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-projects ${
              index === activeIndex ? 'bg-projects' : 'bg-primary/15'
            }`}
          />
        ))}
      </div>
    </Section>
  )
}

export default Projects
