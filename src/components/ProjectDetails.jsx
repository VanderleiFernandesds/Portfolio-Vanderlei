import { SiChartdotjs, SiPostgresql } from 'react-icons/si'
import { stackIcons } from '../data/stackIcons'
import ProjectCategoryTag from './ProjectCategoryTag'

// Fallback (react-icons) para tecnologias sem SVG em stackIcons.js
// (src/assets/icons/stack-mono) — mesmo mapa usado em src/sections/Projects.jsx.
const FALLBACK_TECH_ICONS = {
  'chart.js': SiChartdotjs,
  postgresql: SiPostgresql,
}

/**
 * ProjectDetails
 * Título, categoria, descrição e os blocos "Sobre/Desafios/Aprendizado/Stack"
 * do ProjectModal.
 *
 * Props:
 *   - project: objeto do projeto selecionado (src/data/projects.js)
 *   - description / challenges / learnings: textos já resolvidos (com
 *     fallback de i18n aplicado em ProjectModal)
 *   - t: objeto de traduções do idioma atual
 */
function ProjectDetails({ project, description, challenges, learnings, t }) {
  return (
    <>
      <div
        className="flex w-full max-w-[620px] flex-col"
      >
        <h2
          id="project-modal-title"
          className="mb-2 flex items-baseline gap-2 text-3xl leading-tight font-extrabold text-modal-heading lg:text-4xl"
        >
          {project.title}
          <ProjectCategoryTag category={project.category} />
        </h2>
        <p className="mt-3 text-base leading-relaxed text-modal-body">
          {description}
        </p>
      </div>

      <div
        className="flex w-full max-w-[620px] flex-col"
      >
        <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
          <span
            aria-hidden="true"
            className="text-xs font-normal tracking-normal text-modal-number normal-case"
          >
            01 —
          </span>
          {t.modal.about}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-modal-body">
          {description}
        </p>
      </div>

      <div
        className="flex w-full max-w-[620px] flex-col"
      >
        <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
          <span
            aria-hidden="true"
            className="text-xs font-normal tracking-normal text-modal-number normal-case"
          >
            02 —
          </span>
          {t.modal.challenges}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-modal-body">
          {challenges ?? '—'}
        </p>
      </div>

      <div
        className="flex w-full max-w-[620px] flex-col"
      >
        <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
          <span
            aria-hidden="true"
            className="text-xs font-normal tracking-normal text-modal-number normal-case"
          >
            03 —
          </span>
          {t.modal.learnings}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-modal-body">
          {learnings ?? '—'}
        </p>
      </div>

      <div
        className="flex w-full max-w-[620px] flex-col"
      >
        <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
          <span
            aria-hidden="true"
            className="text-xs font-normal tracking-normal text-modal-number normal-case"
          >
            04 —
          </span>
          {t.modal.stack}
        </h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.technologies.map((tech) => {
            const icon = stackIcons.find(
              (item) => item.label.toLowerCase() === tech.toLowerCase(),
            )
            const FallbackIcon = FALLBACK_TECH_ICONS[tech.toLowerCase()]
            return (
              <span
                key={tech}
                className="flex flex-col items-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-medium tracking-wide text-modal-text-secondary uppercase"
              >
                {icon ? (
                  <img src={icon.src} alt="" aria-hidden="true" width="1254" height="1254" loading="lazy" className="h-6 w-6" />
                ) : FallbackIcon ? (
                  <FallbackIcon className="h-6 w-6" aria-hidden="true" />
                ) : null}
                {tech}
              </span>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ProjectDetails
