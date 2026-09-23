import { useEffect, useRef } from 'react'
import { CloseIcon } from '../icons'
import { useLanguage } from '../../i18n/LanguageContext'
import ProjectGallery from './ProjectGallery'
import ProjectDetails from './ProjectDetails'
import ProjectActions from './ProjectActions'
import abaPasta from '../../assets/decorative/aba-pasta.svg'

/**
 * ProjectModal
 * Modal de detalhes de um projeto.
 *
 * Props:
 *   - project: objeto do projeto selecionado (src/data/projects.js)
 *   - isOpen: controla a exibição do modal
 *   - onClose: fecha o modal (X, backdrop ou Escape)
 */
function ProjectModal({ project, isOpen, onClose }) {
  const { t } = useLanguage()
  const projectText = project ? t.projects.items[project.id] : null
  const projectDescription = projectText?.description ?? project?.description
  const projectChallenges = projectText?.challenges ?? project?.challenges
  const projectLearnings = projectText?.learnings ?? project?.learnings
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
    } else {
      // Devolve o foco pro botão "Ver detalhes" que abriu o modal.
      previousFocusRef.current?.focus?.()
    }
  }, [isOpen])

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

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-2 py-4 sm:p-6">
      {/* Backdrop como irmão, não pai, do modal — evita que sua animação de
          opacidade afete os filhos, que têm animação de entrada/saída própria. */}
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-text/50 backdrop-blur-sm" />
      <div className="relative z-10 flex w-full max-w-[1400px] flex-col">
        <div className="hidden h-12 w-full items-center justify-between pr-6 lg:flex">
          <div
            className="flex h-12 w-[446px] max-w-full items-center bg-contain bg-left bg-no-repeat pl-6"
            style={{ backgroundImage: `url(${abaPasta})` }}
          >
            <span className="rounded-md bg-modal-paper px-[70px] py-1.5 text-sm font-semibold text-text">
              {t.modal.detailsLabel}
            </span>
          </div>
        </div>

        {/* Versão mobile da faixa de cabeçalho acima do modal (mesmo padrão do desktop). */}
        <div className="relative z-20 mt-2 -mb-3 flex items-center justify-between gap-3 lg:hidden lg:mt-0 lg:mb-0">
          <div
            className="-mt-4 flex h-12 min-w-0 flex-1 max-w-[446px] items-center justify-center bg-contain bg-left bg-no-repeat px-4 lg:mt-0 lg:justify-start lg:p-0"
            style={{ backgroundImage: `url(${abaPasta})` }}
          >
            <span className="rounded-md bg-modal-paper px-3 py-1.5 text-sm font-semibold text-text">
              {t.modal.detailsLabel}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t.modal.closeAria}
            className="-mt-2 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-text bg-text text-modal-paper transition-colors hover:bg-text/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <CloseIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="relative mt-1 flex h-200 max-h-[calc(100vh-6rem)] w-full flex-col overflow-hidden rounded-tr-card rounded-br-card rounded-bl-card bg-modal-paper font-kalam lg:mt-0 lg:flex-row"
        >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.modal.closeAria}
          className="absolute top-4 right-4 z-20 hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-text bg-text text-modal-paper transition-colors hover:bg-text/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:inline-flex"
        >
          <CloseIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative flex flex-1 flex-col overflow-y-auto lg:flex-row">
          {/* Coluna de screenshots — largura igual à de informações (lg:flex-1
              nos dois); a borda entre elas muda de posição conforme o layout
              empilha (mobile) ou fica lado a lado (desktop). */}
          <div
            className="modal-folder-texture flex flex-col gap-6 border-b border-text/10 px-3 py-6 lg:flex-1 lg:border-r lg:border-b-0 lg:px-6 lg:pt-6"
            style={{ backgroundColor: 'var(--color-modal-folder)' }}
          >
            <ProjectGallery project={project} t={t} />
          </div>

          <div
            className="modal-folder-texture flex flex-col gap-6 px-3 py-6 lg:flex-1 lg:px-6 lg:pt-6"
            style={{ backgroundColor: 'var(--color-modal-folder)' }}
          >
            <div className="flex flex-1 flex-col gap-3 border border-text/10 bg-modal-paper px-4 py-4 lg:px-6 xl:gap-5 xl:px-8 xl:py-6">
              <ProjectDetails
                project={project}
                description={projectDescription}
                challenges={projectChallenges}
                learnings={projectLearnings}
                t={t}
              />
              <ProjectActions demoHref={project.demoHref} githubHref={project.githubHref} t={t} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
