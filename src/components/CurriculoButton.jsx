import clipSvg from '../assets/svg-com-clip.svg'
import hoverStroke from '../assets/hover-stroke.svg'

/**
 * CurriculoButton
 * Botão "Currículo" da Navbar — uso EXCLUSIVO deste botão (ver
 * PaperButton.jsx para o mesmo padrão aplicado aos outros CTAs do site,
 * com outro SVG). Renderiza como <button> por padrão; passe `as="a"` +
 * `href` como no <Button />.
 *
 * Fundo em "svg com clip.svg" (retângulo preto com um clipe de papel
 * decorativo no canto superior direito) no lugar do background/borda
 * tradicional — mesmo padrão do <PaperButton />, com outro SVG.
 *
 * Sublinhado de marca-texto (HoverStroke.svg, gerado no Hover Stroke Lab —
 * mesma origem do traço de hover do Navbar, ver Navbar.jsx) revelado sob o
 * texto no hover/foco, sem alterar o layout.
 */
function CurriculoButton({ as: Tag = 'button', className = '', children, ...props }) {
  return (
    <Tag
      className={`group relative inline-flex items-center justify-center gap-2 px-12 pt-4 pb-5 font-ibm text-base font-semibold text-primary md:px-10 md:pt-5 md:pb-4 md:text-sm ${className}`.trim()}
      {...props}
    >
      <img
        src={clipSvg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full -scale-x-100 object-contain select-none drop-shadow-lg md:scale-x-100"
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
