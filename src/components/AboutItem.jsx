import { Fragment } from 'react'
import Paper from './Paper'
import Polaroid from './Polaroid'

/**
 * AboutItem
 * Composição folha + Polaroid da seção About. Controla o posicionamento
 * dos dois (Paper e Polaroid não sabem nada sobre onde ficam) e alterna
 * o layout via CSS puro — mesmo componente para mobile e desktop:
 *
 * - mobile (< lg): empilhado — folha em cima, foto embaixo, sem sobrepor.
 *   A folha mantém a proporção original da arte (769x492, ver
 *   folha-pautada-com-fita.svg) via aspect-ratio, para a textura (rasgos,
 *   furos, fita) nunca esticar/cortar de forma errada — por isso a foto
 *   fica fora da <Paper>, como irmã, só empilhada abaixo por espaçamento.
 * - desktop (>= lg): medidas de referência (1440px) escaladas via
 *   container query (cqw) — folha e foto exatamente nos tamanhos/posições
 *   aprovados, foto sobreposta à esquerda ou à direita da folha (a <Paper>
 *   passa a preencher o wrapper inteiro via lg:absolute lg:inset-0, que já
 *   tem o tamanho/posição corretos). O texto fica alinhado à esquerda e
 *   recebe um respiro maior do lado em que a foto se sobrepõe, para nunca
 *   ficar escondido atrás dela.
 */

// 950 / 1440 = 65.9722cqw | 611.7 / 1440 = 42.4792cqw
const paperDesktopSize =
  'lg:w-[clamp(0px,65.9722cqw,950px)] lg:h-[clamp(0px,42.4792cqw,611.7px)] lg:shrink-0'

// 236 / 1440 = 16.3889cqw
const paperMarginLeft = 'lg:ml-[clamp(0px,16.3889cqw,236px)] lg:mr-auto'
const paperMarginRight = 'lg:ml-auto lg:mr-[clamp(0px,16.3889cqw,236px)]'

// 400.87 / 1440 = 27.8382cqw | 449.78 / 1440 = 31.2347cqw
const polaroidDesktopSize =
  'lg:absolute lg:top-1/2 lg:h-[clamp(0px,31.2347cqw,449.78px)] lg:w-[clamp(0px,27.8382cqw,400.87px)] lg:-translate-y-1/2'

// 140 / 1440 = 9.7222cqw (overlap para fora da folha)
const polaroidDesktopLeft = 'lg:left-[clamp(-140px,-9.7222cqw,0px)]'
const polaroidDesktopRight = 'lg:right-[clamp(-140px,-9.7222cqw,0px)]'

// Alinhamento do texto às linhas do SVG (folha-pautada-com-fita.svg,
// viewBox 769x492, largura 769): 1ª linha em y=88, espaçamento de 26 entre
// linhas. Como a <Paper> mantém proporção fixa (aspect-769/492 no mobile e
// clamp quase idêntico no desktop), uma coordenada Y do SVG vira fração da
// LARGURA da própria folha só dividindo por 769 (já que altura/largura =
// 492/769 é a proporção da folha, y/492 × 492/769 = y/769) — e por isso dá
// para expressar tudo em cqw (relativo à própria largura da folha, via
// container-type em Paper.jsx), funcionando nos dois breakpoints com o
// mesmo valor, sem precisar de breakpoints separados.
// 88 / 769 = 11.4434cqw
const paperFirstLinePaddingTop = 'pt-[11.4434cqw]'
// 26 / 769 = 3.3810cqw é o espaçamento de UMA linha do pautado. Com fonte
// fixa em px (18-20px, para o texto ficar bem legível e não encolher em
// telas pequenas), 1 linha do pautado não tem altura suficiente em telas
// estreitas (no mobile ela dá ~13px) — por isso cada LINHA DE TEXTO ocupa
// 2 linhas do pautado (pula uma), o que garante espaço confortável pra
// fonte em qualquer largura e ainda pousa a baseline exatamente sobre uma
// linha real do SVG (só que 1 a cada 2). 3.3810 × 2 = 6.7620cqw.
const paperLineHeight = 'leading-[6.7620cqw]'
// Espaço vertical de uma "linha de texto" inteira (== paperLineHeight),
// usado pro traço do título e pro espaço em branco entre parágrafos —
// qualquer altura fora desse múltiplo desalinha o que vem depois.
const paperRowHeight = 'h-[6.7620cqw]'

// Largura confortável de leitura e respiro para o texto não ficar atrás
// da Polaroid: 260.87px é quanto ela invade a folha (400.87 - 140 de
// overlap para fora). max-width fica dentro da <Paper> (que é o próprio
// container de cqw), por isso a fração é relativa à largura DELA (950px),
// não aos 1440px da seção. Com o respiro de 345px do lado da foto e 40px
// do outro, sobram 565px de espaço (950-345-40) — usamos quase tudo
// (560px), deixando só uma pequena folga pra não encostar na borda:
// 560 / 950 = 58.9474cqw.
const textMaxWidth = 'lg:w-full lg:max-w-[clamp(0px,58.9474cqw,560px)]'
// O respiro fica no padding da própria <Paper> (não na caixa de texto, que
// já tem max-width) — senão os dois se somam e sobra pouco espaço pro texto.
// 345 / 1440 = 23.9583cqw (antes 285px — aumentado para dar mais distância
// visual entre a Polaroid e o texto).
const paperPaddingPhotoLeft = 'lg:pl-[clamp(0px,23.9583cqw,345px)] lg:pr-10'
// lg:pl-10 (40px) → lg:pl-[150px]: só a 2ª folha (imagePosition "right")
// usa esse lado — desloca o bloco de texto ~110px mais pra direita,
// aproveitando a área central livre da folha, sem mexer nas outras.
const paperPaddingPhotoRight = 'lg:pr-[clamp(0px,23.9583cqw,345px)] lg:pl-[150px]'

// Sem destaque visual embaixo das palavras — `highlights` não é mais usado
// para estilizar, só o texto puro é renderizado.
function renderHighlighted(paragraph) {
  return paragraph
}

function AboutItem({
  number,
  title,
  text,
  image,
  imageAlt,
  imagePosition = 'left',
  highlights = [],
}) {
  const isLeft = imagePosition === 'left'
  const rotation = isLeft ? 12 : -12
  const mobileRotation = isLeft ? -4 : 4

  return (
    <div
      className={`relative flex w-full flex-col lg:flex lg:items-center ${paperDesktopSize} ${
        isLeft ? paperMarginLeft : paperMarginRight
      }`}
    >
      <Paper
        className={`relative aspect-769/492 w-full px-6 pb-6 lg:aspect-auto lg:absolute lg:inset-0 lg:flex lg:pb-10 ${paperFirstLinePaddingTop} ${
          isLeft ? paperPaddingPhotoLeft : paperPaddingPhotoRight
        }`}
      >
        {(title || text) && (
          <div className={`relative z-10 font-handwriting text-left ${paperLineHeight} ${textMaxWidth}`}>
            {title && (
              <h3 className="text-[22px] font-bold text-text sm:text-[24px]" spellCheck={false}>
                {number && <span className="mr-1 text-text/50">{number} —</span>}
                {title}
              </h3>
            )}
            {/* Ocupa exatamente 1 linha de texto (== paperLineHeight), pra
                não desalinhar os parágrafos abaixo (sem marcação visual). */}
            <div className={paperRowHeight} aria-hidden="true" />
            {text?.map((paragraph, index) => (
              <Fragment key={paragraph}>
                {/* Linha em branco do próprio caderno separando os
                    parágrafos — mesma altura de uma linha de texto. */}
                {index > 0 && <div className={paperRowHeight} aria-hidden="true" />}
                <p className="text-[19px] text-text sm:text-[20px]" spellCheck={false}>
                  {renderHighlighted(paragraph, highlights)}
                </p>
              </Fragment>
            ))}
          </div>
        )}
      </Paper>

      <Polaroid
        src={image}
        alt={imageAlt}
        rotation={rotation}
        mobileRotation={mobileRotation}
        className={`-mt-14 aspect-[400.87/449.78] w-56 shadow-[0_8px_18px_rgba(0,0,0,0.08)] lg:mt-0 lg:mx-0 ${
          isLeft ? 'mr-auto' : 'ml-auto'
        } ${polaroidDesktopSize} ${isLeft ? polaroidDesktopLeft : polaroidDesktopRight}`}
      />
    </div>
  )
}

export default AboutItem
