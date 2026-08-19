import { useRef } from 'react'

// Define as pastas disponíveis no carrossel com suas cores e rótulos
const FOLDERS = [
  {
    index: 0,
    color: 'yellow',
    label: 'amarela',
    back: 'bg-folder-yellow-back',
    front: 'bg-folder-yellow-front',
  },
  {
    index: 1,
    color: 'blue',
    label: 'azul',
    back: 'bg-folder-blue-back',
    front: 'bg-folder-blue-front',
  },
  {
    index: 2,
    color: 'purple',
    label: 'roxa',
    back: 'bg-folder-purple-back',
    front: 'bg-folder-purple-front',
  },
  {
    index: 3,
    color: 'pink',
    label: 'rosa',
    back: 'bg-folder-pink-back',
    front: 'bg-folder-pink-front',
  },
]

// Total de pastas no carrossel
const TOTAL = FOLDERS.length
// Limite de pixels de arrasto para navegar (50px ou mais para mudar pasta)
const DRAG_THRESHOLD = 50

// Componente que representa um cartão de pasta individual
// Props:
//   - folder: objeto com dados da pasta (index, color, label, classes CSS)
//   - offset: posição relativa da pasta no carrossel (0 = primeiro plano/ativo)
//   - onSelect: função chamada quando a pasta é clicada
function FolderCard({ folder, offset, onSelect }) {
  // Verifica se esta é a pasta ativa (em primeiro plano)
  const isActive = offset === 0
  // Verifica se a pasta está tão afastada que não deve ser renderizada
  const isFar = offset >= TOTAL

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
            <div
              className={`folder-back-shape absolute inset-0 z-[1] rounded-[30px_18px_26px_26px] ${folder.back}`}
            />

            <div
              className={`absolute left-[3%] right-[3%] top-[18%] h-[75%] rounded-md bg-white px-[clamp(18px,7vw,42px)] py-[clamp(16px,6vw,36px)] shadow-[inset_0_0_0_4px_rgba(230,230,230,0.7)] transition-[opacity,transform] duration-[180ms] ease ${
                isActive
                  ? 'z-[2] animate-sheet-out opacity-100'
                  : 'z-[1] translate-y-[52%] scale-90 opacity-0'
              }`}
            >
              <span className="mb-[18px] block h-2 w-[72%] rounded-full bg-[#d7d7d7]" />
              <span className="mb-[18px] block h-2 w-[58%] rounded-full bg-[#d7d7d7]" />
              <span className="block h-2 w-[66%] rounded-full bg-[#d7d7d7]" />
            </div>

            <div
              className={`absolute inset-x-0 bottom-0 z-[3] h-[84%] rounded-[10px_10px_26px_26px] ${folder.front}`}
            />
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
//   - onGoTo: navega diretamente para a pasta de um índice específico
//   - onNext / onPrev: navega para a próxima pasta / pasta anterior
export default function FolderCarousel({ order, onGoTo, onNext, onPrev }) {
  // Armazena o ID do pointer para rastrear gestos de toque/mouse
  const pointerId = useRef(null)
  // Armazena a posição X inicial para calcular a distância do arrasto
  const startX = useRef(0)

  // Registra o início do gesto de arrasto (mouse ou toque)
  const handlePointerDown = (event) => {
    pointerId.current = event.pointerId
    startX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  // Detecta o fim do gesto e navega baseado na distância do arrasto
  const handlePointerUp = (event) => {
    if (pointerId.current === null) return
    const deltaX = event.clientX - startX.current
    // Arrasto para a direita > limite = pasta anterior
    if (deltaX > DRAG_THRESHOLD) {
      onPrev()
    }
    // Arrasto para a esquerda > limite = próxima pasta
    else if (deltaX < -DRAG_THRESHOLD) {
      onNext()
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
        className="relative aspect-88/62 w-[min(88vw,calc(100vw-96px))] flex-none sm:aspect-auto sm:h-[min(440px,64vw)] sm:w-[min(560px,82vw)]"
        style={{ perspective: '1600px' }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Renderiza cada pasta como cartão no carrossel */}
        {FOLDERS.map((folder) => {
          const offset = order.indexOf(folder.index)
          return (
            <FolderCard
              key={folder.index}
              folder={folder}
              offset={offset}
              onSelect={() => onGoTo(folder.index)}
            />
          )
        })}
      </div>
    </section>
  )
}
