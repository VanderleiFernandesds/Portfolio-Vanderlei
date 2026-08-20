import { useEffect, useRef } from 'react'
import { CloseIcon } from './icons'

/**
 * ProjectModal
 * Esqueleto/estrutura do modal de detalhes de um projeto.
 *
 * Nesta etapa implementa somente a composição (proporção, colunas,
 * hierarquia) baseada em design/references/ProjectModal.png — sem a
 * estética de folha/papel/clipes/carimbos, que será aplicada depois.
 * Usa apenas tokens e componentes já existentes no projeto.
 *
 * Props:
 *   - project: objeto do projeto selecionado (src/data/projects.js)
 *   - isOpen: controla a exibição do modal
 *   - onClose: fecha o modal (X, backdrop ou Escape)
 */
function ProjectModal({ project, isOpen, onClose }) {
  const closeButtonRef = useRef(null)

  // Fecha com Escape e trava o scroll do conteúdo atrás enquanto aberto
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
    }
  }, [isOpen, onClose])

  // Foco no botão de fechar ao abrir
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  if (!isOpen || !project) return null

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex   items-center justify-center bg-primary/70 p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="flex h-225 max-h-full w-full max-w-[1400px] flex-col overflow-hidden rounded-card bg-background lg:flex-row"
      >
        {/* Cabeçalho/etiqueta + botão de fechar */}
        <div className="flex items-center justify-between border-b border-primary/10 p-4 lg:hidden">
          <span className="text-sm font-semibold text-primary">
            Detalhes do Projeto
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes do projeto"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <CloseIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex flex-1 flex-col overflow-y-auto lg:flex-row">
          {/* Cabeçalho/etiqueta + botão de fechar (desktop) */}
          <div className="absolute inset-x-0 top-0 z-10 hidden items-center justify-between p-6 lg:flex">
            <span className="text-sm font-semibold text-primary">
              Detalhes do Projeto
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes do projeto"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <CloseIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Coluna esquerda: área de screenshots/imagens — mesma largura
              da coluna de informações (lg:flex-1 nos dois). Borda separa
              visualmente a parte de fotos da parte de informações (embaixo
              no mobile empilhado, à direita quando lado a lado no
              desktop). */}
          <div className="flex flex-col gap-6 border-b border-primary/10 p-6 pt-6 lg:flex-1 lg:border-r lg:border-b-0 lg:pt-20">
            {/* Pilha de "fotos" estilo polaroid — moldura branca grossa
                em volta de cada recorte da screenshot, levemente
                rotacionadas/empilhadas com sombra, como fotos impressas
                jogadas uma sobre a outra. */}
            <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-card border border-primary/10 bg-primary/5 px-4 py-8">
              <img
                src={project.image}
                alt={`Captura de tela do projeto ${project.title}`}
                className="aspect-video w-1/2 -rotate-3 rounded-xs border-4 border-white bg-white object-cover shadow-lg"
              />
              <img
                src={project.image}
                alt={`Captura de tela do projeto ${project.title}`}
                className="aspect-video -mt-4 w-1/2 rotate-2 rounded-xs border-4 border-white bg-white object-cover object-center shadow-lg"
              />
              <img
                src={project.image}
                alt={`Captura de tela do projeto ${project.title}`}
                className="aspect-video -mt-4 w-1/2 rotate-[-1.5deg] rounded-xs border-4 border-white bg-white object-cover object-bottom shadow-lg"
              />
            </div>
          </div>

          {/* Coluna direita: informações do projeto */}
          <div className="flex flex-col gap-6 p-6 lg:flex-1 lg:pt-20">
            <div className="flex flex-1 flex-col gap-6 rounded-card border border-primary/10 bg-background p-4">
              <div>
                <h2
                  id="project-modal-title"
                  className="text-2xl font-extrabold text-primary sm:text-3xl"
                >
                  {project.title}
                </h2>
                <p className="mt-1 text-text-muted">{project.description}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-wide text-primary uppercase">
                  Sobre o Projeto
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-wide text-primary uppercase">
                  Desafios
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {project.challenges ?? '—'}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-wide text-primary uppercase">
                  Aprendizado
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {project.learnings ?? '—'}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-wide text-primary uppercase">
                  Stack
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-primary/10 bg-primary/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-text-muted uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
