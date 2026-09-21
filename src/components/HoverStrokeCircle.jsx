import { useState } from 'react'

// Gerado pelo Hover Stroke Lab — React + Tailwind, textura "pincel", formato
// "circulo". Os valores do traço (dasharray, cor, largura, duração por
// segmento) ficam inline porque são calculados dinamicamente — isso é
// normal mesmo em projetos 100% Tailwind, já que são números únicos por
// elemento. Extraído em componente próprio pra reuso (SocialLink.jsx,
// Contact.jsx) — cor fixa (STROKE_COLOR), igual ao rabisco estático
// HoverStroke.svg usado no resto do site.
const STROKE_COLOR = '#E50000'

const EXTRAS = [
  { d: "M206.60,21.17 C209.60,20.48 221.53,17.46 227.79,16.33 C234.06,15.19 244.17,13.83 250.83,13.16 C257.50,12.48 268.03,11.80 274.84,11.56 C281.66,11.32 292.23,11.28 298.95,11.44 C305.67,11.60 315.90,12.15 322.28,12.69 C328.65,13.23 338.17,14.34 343.96,15.23 C349.74,16.12 360.40,18.42 363.11,18.95", width: 10.89, opacity: 0.92, blur: 0.00, dur: 0.075, delay: 0.250 },
]

const SEGMENTS = [
  { d: "M377.54,2.30 C371.69,1.33 348.28,-3.56 336.25,-4.54 C324.22,-5.53 305.15,-5.35 292.61,-4.64 C280.07,-3.93 254.10,-0.27 247.74,0.46", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.000 },
  { d: "M247.74,0.46 C239.08,2.21 203.74,8.36 186.63,12.87 C169.51,17.38 142.86,25.95 126.90,32.30 C110.94,38.64 87.23,50.06 73.98,57.65 C60.72,65.23 39.08,81.85 33.32,85.85", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.031 },
  { d: "M33.32,85.85 C29.43,90.15 11.78,107.41 5.89,116.22 C-0.00,125.03 -6.21,138.75 -8.26,148.04 C-10.31,157.33 -10.71,172.55 -8.60,181.78 C-6.48,191.02 4.52,208.77 6.69,213.22", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.063 },
  { d: "M6.69,213.22 C10.76,217.07 25.27,233.34 35.43,240.37 C45.58,247.40 64.71,257.63 78.35,262.84 C91.99,268.05 116.03,274.19 131.70,277.12 C147.37,280.05 180.87,282.61 188.98,283.51", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.094 },
  { d: "M188.98,283.51 C197.37,283.48 231.43,284.40 248.17,283.29 C264.91,282.18 291.14,278.90 307.13,275.66 C323.12,272.42 346.78,265.88 361.04,260.42 C375.30,254.95 401.18,240.40 407.81,237.09", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.125 },
  { d: "M407.81,237.09 C413.08,232.72 436.26,215.56 445.02,206.20 C453.78,196.85 464.70,181.01 469.64,171.06 C474.58,161.11 478.92,145.14 479.90,135.95 C480.88,126.76 477.02,110.40 476.54,106.19", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.156 },
  { d: "M476.54,106.19 C474.57,102.48 467.91,86.97 462.63,80.06 C457.35,73.16 447.47,63.43 439.27,57.45 C431.08,51.47 415.35,42.46 404.80,37.82 C394.25,33.19 370.47,26.60 364.80,24.75", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.188 },
  { d: "M364.80,24.75 C358.81,23.70 334.12,18.78 322.50,17.32 C310.89,15.87 293.83,14.67 282.79,14.50 C271.75,14.32 254.92,14.97 244.59,16.08 C234.27,17.18 214.84,21.40 209.93,22.28", width: 12.50, opacity: 1.00, dur: 0.031, delay: 0.219 },
]

let idCounter = 0

/**
 * HoverStrokeCircle
 * Contorno "desenhado à mão" revelado ao redor de um elemento no
 * hover/foco (Hover Stroke Lab), via stroke-dashoffset. Renderiza como
 * <svg> absolute inset-0 — o elemento pai precisa de `relative`.
 */
function HoverStrokeCircle({ hover }) {
  const [gradId] = useState(() => `hover-stroke-circle-${idCounter++}`)

  return (
    <svg
      viewBox="0 0 462 291"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={STROKE_COLOR} />
          <stop offset="100%" stopColor={STROKE_COLOR} />
        </linearGradient>
      </defs>
      {EXTRAS.map((s, i) => (
        <path
          key={`ex${i}`}
          d={s.d}
          stroke={`url(#${gradId})`}
          strokeWidth={s.width}
          strokeLinecap="round"
          fill="none"
          opacity={s.opacity}
          className="transition-[stroke-dashoffset]"
          style={{
            filter: s.blur ? `blur(${s.blur}px)` : undefined,
            strokeDasharray: 'var(--len)',
            strokeDashoffset: hover ? 0 : 'var(--len)',
            transitionDuration: `${s.dur}s`,
            transitionDelay: `${s.delay}s`,
            transitionTimingFunction: 'ease-out',
          }}
          ref={(el) => el && el.style.setProperty('--len', el.getTotalLength())}
        />
      ))}
      {SEGMENTS.map((s, i) => (
        <path
          key={`main${i}`}
          d={s.d}
          stroke={`url(#${gradId})`}
          strokeWidth={s.width}
          strokeLinecap="round"
          fill="none"
          opacity={s.opacity}
          className="transition-[stroke-dashoffset]"
          style={{
            strokeDasharray: 'var(--len)',
            strokeDashoffset: hover ? 0 : 'var(--len)',
            transitionDuration: `${s.dur}s`,
            transitionDelay: `${s.delay}s`,
            transitionTimingFunction: 'ease-out',
          }}
          ref={(el) => el && el.style.setProperty('--len', el.getTotalLength())}
        />
      ))}
    </svg>
  )
}

export default HoverStrokeCircle
