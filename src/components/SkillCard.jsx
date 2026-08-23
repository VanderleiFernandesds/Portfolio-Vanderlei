import IconBadge from './IconBadge'

// Mapeia o token de categoria (design/tokens.md) para a classe de fundo do
// badge — cores de uso exclusivo dos badges de ícone desta seção.
const CATEGORY_BG = {
  frontend: 'bg-category-frontend',
  backend: 'bg-category-backend',
  database: 'bg-category-database',
  tools: 'bg-category-tools',
  cloud: 'bg-category-cloud',
  concepts: 'bg-category-concepts',
  softSkills: 'bg-category-soft-skills',
}

/**
 * SkillCard
 * Card de categoria da seção Skills (design/references/skill.png):
 * badge + título + descrição, seguido opcionalmente por uma fileira de
 * tecnologias, uma lista de conceitos ou uma nota de rodapé.
 */
function SkillCard({
  category,
  icon,
  title,
  description,
  technologies,
  concepts,
  note,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-card bg-primary p-6 lg:px-desktop  ${className}`.trim()}
    >
      <div className="flex flex-col gap-3">
        <IconBadge icon={icon} className={CATEGORY_BG[category]} />
        <div>
          <h3 className="font-bold text-text">{title}</h3>
          <p className="text-sm text-text-muted">{description}</p>
        </div>
      </div>

      {technologies && (
        <>
          <hr className="border-surface" />
          <div className="flex flex-wrap gap-4">
            {technologies.map(({ name, Icon }) => (
              <span
                key={name}
                className="flex flex-col items-center gap-1 text-xs text-text-muted"
              >
                <Icon className="h-5 w-5 text-text" />
                {name}
              </span>
            ))}
          </div>
        </>
      )}

      {concepts && (
        <>
          <hr className="border-surface" />
          <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            {concepts.map((concept) => (
              <li
                key={concept.label}
                className="flex items-center gap-2 text-sm text-text-muted"
              >
                {concept.iconNode}
                {concept.label}
              </li>
            ))}
          </ul>
        </>
      )}

      {note && (
        <>
          <hr className="border-surface" />
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {note.iconNode}
            {note.label}
          </div>
        </>
      )}
    </div>
  );
}

export default SkillCard
