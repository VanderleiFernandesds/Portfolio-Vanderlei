/**
 * FeatureItem
 * Ícone (accent-light, sem fundo) + label + descrição.
 * Usado no grid de diferenciais do About (design/references/about.png) —
 * diferente do IconBadge, aqui o ícone não tem badge/fundo próprio.
 */
function FeatureItem({ icon, label, description, className = '' }) {
  return (
    <div className={`flex items-start gap-3 ${className}`.trim()}>
      <span className="mt-0.5 shrink-0 text-accent-light">{icon}</span>
      <div>
        <p className="font-semibold text-text">{label}</p>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </div>
  )
}

export default FeatureItem
