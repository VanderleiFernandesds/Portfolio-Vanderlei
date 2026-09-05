/**
 * Polaroid
 * Foto reutilizável (seção About). `mobileRotation` vale abaixo do
 * breakpoint lg, `rotation` a partir dele — ver .polaroid-photo em
 * src/index.css. Tamanho e posição são responsabilidade de quem usa o
 * componente (ver AboutItem), via `className`.
 */
function Polaroid({ src, alt, rotation = 0, mobileRotation = 0, className = '' }) {
  return (
    <div
      className={`polaroid-photo ${className}`.trim()}
      style={{
        '--polaroid-rotation-mobile': `${mobileRotation}deg`,
        '--polaroid-rotation': `${rotation}deg`,
      }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export default Polaroid
