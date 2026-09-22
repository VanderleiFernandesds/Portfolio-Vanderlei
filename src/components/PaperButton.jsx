import botaoSvg from '../assets/botao.svg'
import hoverStroke from '../assets/hover-stroke.svg'

/**
 * PaperButton
 * Botão com fundo em textura de papel (botao.svg) no lugar do
 * background/borda tradicional do <Button />. Usa object-fit:cover para
 * preservar a proporção original do papel (recorta a sobra quando o
 * botão não é exatamente 2151:510) em vez de esticar. Renderiza como
 * <button> por padrão; passe `as="a"` + `href` para links, como no <Button />.
 *
 * `showBackground={false}` remove o SVG de papel — usado quando o botão
 * fica sobre um fundo que já tem textura/cor própria (ex.: "Ver detalhes"
 * em Projects.jsx).
 */
function PaperButton({
  as: Tag = 'button',
  className = '',
  showBackground = true,
  children,
  ...props
}) {
  return (
    <Tag
      className={`group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-8 py-3.5 text-sm font-semibold text-text ${className}`.trim()}
      {...props}
    >
      {showBackground && (
        <img
          src={botaoSvg}
          alt=""
          aria-hidden="true"
          draggable={false}
          width="2151"
          height="510"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none"
        />
      )}
      <span
        aria-hidden="true"
        className="hover-stroke-wipe pointer-events-none absolute inset-x-4 bottom-1 z-5 h-3"
      >
        <img
          src={hoverStroke}
          alt=""
          draggable={false}
          width="450"
          height="50"
          className="h-full w-full object-contain select-none"
        />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  )
}

export default PaperButton
