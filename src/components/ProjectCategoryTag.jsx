import { categoryStyles } from '../data/projectCategories'

/**
 * ProjectCategoryTag
 * Etiqueta de categoria do projeto (ex.: "SaaS", "E-commerce") — ao lado do
 * nome, no card em destaque da seção Projects. Estilo de etiqueta de papel
 * colada (leve rotação, sombra sutil, borda), cor por categoria definida em
 * src/data/projectCategories.js. Sempre secundária ao nome do projeto.
 */
function ProjectCategoryTag({ category, className = '' }) {
  const style = categoryStyles[category]
  if (!style) return null

  return (
    <span
      className={`inline-block shrink-0 -rotate-2 rounded-sm px-1.5 py-0.5 text-[10px] leading-none font-bold tracking-wide uppercase shadow-[1px_1px_2px_rgba(0,0,0,0.15)] ${className}`.trim()}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
      }}
    >
      {style.label}
    </span>
  )
}

export default ProjectCategoryTag
