/**
 * SectionTitle
 * Cabeçalho padrão de seção: rótulo opcional (eyebrow), título e
 * descrição opcional. Usa apenas as cores de design/tokens.md.
 */
function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignment =
    align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`.trim()}>
      {eyebrow && (
        <span className="text-sm font-semibold tracking-widest text-text-muted uppercase">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-3xl font-bold text-primary sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-2xl text-text-muted">{description}</p>
      )}
    </div>
  )
}

export default SectionTitle
