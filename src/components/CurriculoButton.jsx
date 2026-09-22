import clipSvg from '../assets/svg-com-clip.svg'
import hoverStroke from '../assets/hover-stroke.svg'

/**
 * CurriculoButton
 * Botão "Currículo" da Navbar. Mesmo padrão visual do <PaperButton />
 * (fundo SVG absoluto atrás do conteúdo, sublinhado revelado no
 * hover/foco), com svg-com-clip.svg no lugar de botao.svg. Renderiza
 * como <button> por padrão; passe `as="a"` + `href` para links.
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
        width="150"
        height="56"
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
          width="450"
          height="50"
          className="h-full w-full object-contain select-none"
        />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  )
}

export default CurriculoButton
