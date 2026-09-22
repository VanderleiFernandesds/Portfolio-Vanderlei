import { ExternalLinkIcon } from './icons'
import { SiGithub } from 'react-icons/si'

/**
 * ProjectActions
 * Botões de ação do ProjectModal: "Ver projeto" é a ação primária
 * (preenchida); GitHub é secundária (outline).
 */
function ProjectActions({ demoHref, githubHref, t }) {
  return (
    <div
      className="mt-2 flex items-center gap-3"
    >
      {demoHref ? (
        <a
          href={demoHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-modal-heading bg-modal-heading px-4 py-2 text-sm font-semibold text-modal-paper transition-[transform,background-color,box-shadow] duration-150 hover:-translate-y-px hover:bg-[#38352f] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 active:bg-[#151412]"
        >
          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          {t.modal.viewProject}
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="flex items-center gap-1.5 rounded-md border border-modal-heading bg-modal-heading px-4 py-2 text-sm font-semibold text-modal-paper"
        >
          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          {t.modal.viewProject}
        </span>
      )}

      {githubHref ? (
        <a
          href={githubHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-modal-github-border bg-modal-paper px-3.5 py-2 text-sm font-medium text-modal-github-text transition-[transform,background-color,border-color] duration-150 hover:-translate-y-px hover:border-text/40 hover:bg-text/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0"
        >
          <SiGithub className="h-4 w-4" aria-hidden="true" />
          {t.modal.github}
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="flex items-center gap-1.5 rounded-md border border-modal-github-border bg-modal-paper px-3.5 py-2 text-sm font-medium text-modal-github-text"
        >
          <SiGithub className="h-4 w-4" aria-hidden="true" />
          {t.modal.github}
        </span>
      )}
    </div>
  )
}

export default ProjectActions
