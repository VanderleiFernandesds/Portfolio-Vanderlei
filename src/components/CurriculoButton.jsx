import curriculoSvg from '../assets/curriculo-sem-fundo.svg'
import hoverStroke from '../assets/HoverStroke.svg'

/**
 * CurriculoButton
 * Botão "Currículo" da Navbar com fundo em textura de papel
 * (curriculo-sem-fundo.svg) no lugar do background/borda do <Button />
 * antigo — uso EXCLUSIVO deste botão (ver PaperButton.jsx para o mesmo
 * padrão aplicado aos outros CTAs do site, com outro SVG).
 *
 * O SVG fica em position:absolute/z-0, atrás do conteúdo (z-10), sem
 * pointer-events (o clique é sempre no <Tag> inteiro); nunca é esticado —
 * usa object-fit:cover (preserva a proporção original do papel, só
 * recorta a sobra quando o botão não é exatamente 2162:491) em vez de
 * "fill". Renderiza como <button> por padrão; passe `as="a"` + `href`
 * como no <Button />.
 *
 * Sublinhado de marca-texto (HoverStroke.svg, gerado no Hover Stroke Lab —
 * mesma origem do traço de hover do Navbar, ver Navbar.jsx) revelado sob o
 * texto no hover/foco, sem alterar o layout.
 */
function CurriculoButton({ as: Tag = 'button', className = '', children, ...props }) {
  return (
    <Tag
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-transparent px-6 py-3 text-sm font-semibold text-text transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] ${className}`.trim()}
      {...props}
    >
      <img
        src={curriculoSvg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none"
      />
      <span
        aria-hidden="true"
        className="hover-stroke-wipe pointer-events-none absolute inset-x-3 bottom-0.5 z-5 h-2.5"
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

export default CurriculoButton
