import { useRef } from 'react'

// Paleta de cores fixas do protótipo design/Carrossel de Pastas/ — o
// carrossel cicla por essas 4 cores conforme a quantidade de projetos
// (src/data/projects.js), então funciona com qualquer número de cards
// sem precisar adicionar cor nova a cada projeto novo. Usa os tokens já
// existentes em src/index.css (--color-folder-*).
const COLORS = [
  { back: 'var(--color-folder-yellow-back)', front: 'var(--color-folder-yellow-front)' },
  { back: 'var(--color-folder-blue-back)', front: 'var(--color-folder-blue-front)' },
  { back: 'var(--color-folder-purple-back)', front: 'var(--color-folder-purple-front)' },
  { back: 'var(--color-folder-pink-back)', front: 'var(--color-folder-pink-front)' },
]

// Limite de pixels de arrasto para navegar (50px ou mais para mudar pasta)
const DRAG_THRESHOLD = 50

// Camada de trás da pasta (fica atrás da screenshot). Path vetorizado a
// partir de src/assets/folder-back.svg, com a cor original trocada por
// `fill` para poder variar por projeto. `w-full h-auto` preserva a
// proporção nativa do desenho (533x424) — sem esticar/distorcer o
// recorte da pasta ao encaixar no card. Ancorada pelo `bottom-0`, mesma
// base da FolderFrontShape (402 de altura): como o desenho de trás é
// ~22px mais alto (a aba), essa diferença sobra naturalmente por cima
// da frente, formando a aba que aparece acima da screenshot.
function FolderBackShape({ fill }) {
  return (
    <svg
      viewBox="0 0 533 424"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-auto w-full select-none"
    >
      <path
        d="M0 423.7V27.2C0 22.8 3.1 19 7.4 18.1L8 11.2C8.6 4.9 13.9 0 20.2 0H171.8C178.1 0 183.5 4.5 184.6 10.7L185.1 13.5C186 18.7 190.5 22.5 195.8 22.5H511.9C518.7 22.5 524.2 27.8 524.5 34.6V35.9C524.7 41.3 528.1 46 533 47.8V423.7H0Z"
        fill={fill}
      />
    </svg>
  )
}

// Camada da frente da pasta (fica sobre a screenshot). Path vetorizado a
// partir de src/assets/folder-front.svg — mantém o traço claro de brilho
// no topo (aba) e troca só o preenchimento pela cor do projeto.
function FolderFrontShape({ fill }) {
  return (
    <svg
      viewBox="0 0 534 402"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-auto w-full select-none"
    >
      <path
        opacity="0.35"
        d="M0.599609 49.5C6.39961 45.1 9.09961 39.3 9.09961 32V27.7C9.09961 24.9 11.3996 22.6 14.1996 22.6H171.7C178.4 22.6 184.3 18 185.9 11.5L186.9 7.59998C187.9 3.49998 191.6 0.599976 195.8 0.599976"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M0.599609 49.5C6.39961 45.1 9.09961 39.3 9.09961 32V27.7C9.09961 24.9 11.3996 22.6 14.1996 22.6H171.7C178.4 22.6 184.3 18 185.9 11.5L186.9 7.59998C187.9 3.49998 191.6 0.599976 195.8 0.599976H512.5C519.3 0.599976 524.8 5.89998 525.1 12.7V14C525.3 19.4 528.7 24.1 533.6 25.9V401.8H0.599609V49.5Z"
        fill={fill}
      />
    </svg>
  )
}

// Componente que representa um cartão de pasta individual
// Props:
//   - colors: { back, front } — cores desta pasta (ver COLORS)
//   - project: projeto correspondente (src/data/projects.js) — usado para
//     mostrar a screenshot real na "folha" que desliza para fora da pasta
//   - offset: posição relativa da pasta no carrossel (0 = primeiro plano/ativo)
//   - total: quantidade total de pastas no carrossel
//   - onSelect: função chamada quando a pasta é clicada
function FolderCard({ colors, project, offset, total, onSelect }) {
  // Verifica se esta é a pasta ativa (em primeiro plano)
  const isActive = offset === 0
  // Verifica se a pasta está tão afastada que não deve ser renderizada
  const isFar = offset >= total

  // Renderiza o cartão da pasta com transformações CSS para criar efeito 3D
  // Usa transform para deslocar (Y) e escalar a pasta baseado em sua posição no carrossel
  return (
    <div
      onClick={onSelect}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      className={`absolute inset-0 flex cursor-pointer select-none items-center justify-center transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] [filter:drop-shadow(0_18px_26px_rgba(15,23,42,0.18))] [backface-visibility:hidden] ${
        isFar ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{
        // Anima a posição vertical e escala (pastas mais para trás são menores)
        transform: `translateY(${offset * -8}%) scale(${1 - offset * 0.06})`,
        // Define a profundidade visual (z-index) baseado na posição
        zIndex: 10 - offset,
      }}
    >
      <div className="relative aspect-82/58 w-[93%] sm:aspect-auto sm:h-[min(360px,58vw)] sm:w-[min(520px,82vw)]">
        {/* Clips the sheet's sides/bottom to the folder's silhouette while
            leaving the top open, so the sheet can still peek out above the
            folder like it slides out from inside it. */}
        <div className="absolute inset-x-0 bottom-0 -top-[35%] overflow-hidden rounded-b-[26px]">
          <div className="absolute inset-x-0 bottom-0 h-[74%] sm:h-[min(360px,58vw)]">
            <FolderBackShape fill={colors.back} />

            <div
              className={`absolute left-[3%] right-[3%] top-[18%] h-[75%] overflow-hidden rounded-md bg-white shadow-[inset_0_0_0_4px_rgba(230,230,230,0.7)] transition-[opacity,transform] duration-[180ms] ease ${
                isActive
                  ? 'z-[2] animate-sheet-out opacity-100'
                  : 'z-[1] translate-y-[52%] scale-90 opacity-0'
              }`}
            >
              <img
                src={project.image}
                alt={`Captura de tela do projeto ${project.title}`}
                draggable={false}
                className="pointer-events-none h-full w-full object-cover object-top select-none"
              />
            </div>

            <FolderFrontShape fill={colors.front} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente principal do carrossel de pastas
// Componente controlado: recebe a ordem atual e os manipuladores de
// navegação do componente pai (src/sections/Projects.jsx), que usa a
// mesma `order` para exibir as informações do projeto em destaque ao
// lado do carrossel — assim os dois ficam sempre sincronizados.
// Props:
//   - order: array com os índices das pastas, do primeiro plano (posição
//     0, a ativa) para o fundo da pilha
//   - projects: lista de projetos (src/data/projects.js) — mesma ordem
//     de índices de `order`, usada para pegar a imagem de cada pasta
//   - onGoTo: navega diretamente para a pasta de um índice específico
//   - onNext / onPrev: navega para a próxima pasta / pasta anterior
export default function FolderCarousel({ order, projects, onGoTo, onNext, onPrev }) {
  // Armazena o ID do pointer para rastrear gestos de toque/mouse
  const pointerId = useRef(null)
  // Armazena a posição X/Y inicial para calcular a distância do arrasto
  const startX = useRef(0)
  const startY = useRef(0)

  // Registra o início do gesto de arrasto (mouse ou toque)
  const handlePointerDown = (event) => {
    pointerId.current = event.pointerId
    startX.current = event.clientX
    startY.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  // Detecta o fim do gesto e navega baseado na distância do arrasto —
  // tanto horizontal (esquerda/direita) quanto vertical (cima/baixo,
  // útil no mobile onde o dedo passa por cima do carrossel em qualquer
  // direção). Usa o eixo com maior deslocamento para decidir a direção,
  // então um arrasto mais vertical não é lido como horizontal e vice-versa.
  const handlePointerUp = (event) => {
    if (pointerId.current === null) return
    const deltaX = event.clientX - startX.current
    const deltaY = event.clientY - startY.current

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      // Arrasto para a direita > limite = pasta anterior
      if (deltaX > DRAG_THRESHOLD) onPrev()
      // Arrasto para a esquerda > limite = próxima pasta
      else if (deltaX < -DRAG_THRESHOLD) onNext()
    } else {
      // Arrasto para baixo > limite = pasta anterior
      if (deltaY > DRAG_THRESHOLD) onPrev()
      // Arrasto para cima > limite = próxima pasta
      else if (deltaY < -DRAG_THRESHOLD) onNext()
    }

    event.currentTarget.releasePointerCapture(pointerId.current)
    pointerId.current = null
  }

  // Cancela o rastreamento se o gesto for interrompido
  const handlePointerCancel = () => {
    pointerId.current = null
  }

  // Trata navegação via teclado (setas esquerda/direita)
  // Ignora eventos em campos de entrada de texto
  const handleKeyDown = (event) => {
    const targetTag = event.target?.tagName
    const isEditableField =
      targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT'
    const isRight = event.key === 'ArrowRight'
    const isLeft = event.key === 'ArrowLeft'

    if (isEditableField || (!isRight && !isLeft)) return

    event.preventDefault()
    // Seta direita = próxima pasta
    if (isRight) onNext()
    // Seta esquerda = pasta anterior
    else onPrev()
  }

  return (
    // Container principal do carrossel com suporte a acessibilidade ARIA
    <section
      className="relative flex flex-col items-center justify-center gap-[clamp(12px,3vw,28px)] outline-none"
      aria-label="Carrossel de pastas"
      aria-roledescription="carrossel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Área do carrossel - renderiza as pastas com transformações 3D */}
      <div
        className="relative aspect-88/62 w-[min(88vw,calc(100vw-96px))] flex-none touch-none sm:aspect-auto sm:h-[min(440px,64vw)] sm:w-[min(560px,82vw)]"
        style={{ perspective: '1600px' }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Renderiza cada pasta como cartão no carrossel — uma por
            projeto (order.length), ciclando pelas cores da paleta */}
        {order.map((_, index) => {
          const offset = order.indexOf(index)
          return (
            <FolderCard
              key={index}
              colors={COLORS[index % COLORS.length]}
              project={projects[index]}
              offset={offset}
              total={order.length}
              onSelect={() => onGoTo(index)}
            />
          )
        })}
      </div>
    </section>
  )
}
