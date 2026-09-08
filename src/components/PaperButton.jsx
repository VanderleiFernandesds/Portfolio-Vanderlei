import botaoSvg from '../assets/botao.svg'
import hoverStroke from '../assets/HoverStroke.svg'

/**
 * PaperButton
 * Botão com fundo em textura de papel (botao.svg) no lugar do
 * background/borda tradicional do <Button /> — usado nos CTAs principais
 * (Ver projetos, Entrar em contato, Ver detalhes, Enviar mensagem).
 *
 * O SVG fica em position:absolute/z-0, atrás do conteúdo (z-10); nunca é
 * esticado — usa object-fit:cover (preserva a proporção original do
 * papel, só recorta a sobra quando o botão não é exatamente 2151:510)
 * em vez de "fill". Renderiza como <button> por padrão; passe `as="a"` +
 * `href` para links, igual ao <Button />.
 *
 * Sublinhado de marca-texto (HoverStroke.svg, gerado no Hover Stroke Lab —
 * mesma origem do traço de hover do Navbar, ver Navbar.jsx) revelado sob o
 * texto no hover/foco, sem alterar o layout.
 */
function PaperButton({ as: Tag = 'button', className = '', children, ...props }) {
  return (
    <Tag
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-transparent px-8 py-3.5 text-sm font-semibold text-text transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] ${className}`.trim()}
      {...props}
    >
      <img
        src={botaoSvg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none"
      />
      <span
        aria-hidden="true"
        className="hover-stroke-wipe pointer-events-none absolute inset-x-4 bottom-1 z-5 h-3"
      >
        <img
          src={hoverStroke}
          alt=""
          draggable={false}
          className="h-full w-full object-contain select-none"
        />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  )
}

export default PaperButton
