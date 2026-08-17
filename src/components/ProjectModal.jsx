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
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-card bg-background lg:flex-row"
      >
        {/* Cabeçalho/etiqueta + botão de fechar */}
        <div className="flex items-center justify-between border-b border-primary/10 p-4 lg:hidden">
          <span className="text-sm font-semibold text-primary">Detalhes do Projeto</span>
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
            <span className="text-sm font-semibold text-primary">Detalhes do Projeto</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes do projeto"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <CloseIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Coluna esquerda: área de screenshots/imagens */}
          <div className="flex flex-col gap-4 p-6 pt-6 lg:w-2/5 lg:pt-20">
            <div className="aspect-video w-full rounded-card border border-primary/10 bg-primary/5" />
            <div className="aspect-video w-full rounded-card border border-primary/10 bg-primary/5" />
            <div className="aspect-video w-full rounded-card border border-primary/10 bg-primary/5" />
          </div>

          {/* Coluna direita: informações do projeto */}
          <div className="flex flex-col gap-6 p-6 lg:w-3/5 lg:pt-20">
            <div>
              <h2 id="project-modal-title" className="text-2xl font-extrabold text-primary sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-1 text-text-muted">{project.description}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wide text-primary uppercase">
                Sobre o Projeto
              </h3>
              <p className="mt-2 text-sm text-text-muted">{project.description}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wide text-primary uppercase">Desafios</h3>
              <div className="mt-2 text-sm text-text-muted">—</div>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wide text-primary uppercase">
                Aprendizado
              </h3>
              <div className="mt-2 text-sm text-text-muted">—</div>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wide text-primary uppercase">Stack</h3>
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
  )
}

export default ProjectModal
