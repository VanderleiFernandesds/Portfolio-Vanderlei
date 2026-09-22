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
  titleClassName = '',
}) {
  const alignment =
    align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`.trim()}>
      {eyebrow && (
        <span
          data-nav-target
          className="scroll-mt-28 font-kalam text-sm font-semibold tracking-widest text-black uppercase"
          style={{ backgroundColor: '#DBEC00' }}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={`font-kalam text-3xl font-bold sm:text-4xl ${titleClassName || 'text-black'}`.trim()}
        >
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
