import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from './icons'
import { SiChartdotjs, SiPostgresql, SiGithub } from 'react-icons/si'
import { ExternalLinkIcon, ArrowRightIcon } from './icons'
import { stackIcons } from '../data/stackIcons'
import { useLanguage } from '../i18n/LanguageContext'

// Fallback (react-icons) pra tecnologias sem SVG em stackIcons.js
// (src/assets/icones-preto-branco-svg), como Chart.js e PostgreSQL — mesmo
// mapa usado em src/sections/Projects.jsx.
const FALLBACK_TECH_ICONS = {
  'chart.js': SiChartdotjs,
  postgresql: SiPostgresql,
}

/**
 * ProjectModal
 * Esqueleto/estrutura do modal de detalhes de um projeto.
 *
 * Nesta etapa implementa somente a composição (proporção, colunas,
 * hierarquia) baseada em design/references/ProjectModal.png — sem a
 * estética de folha/papel/clipes/carimbos, que será aplicada depois.
 * Usa apenas tokens e componentes já existentes no projeto.
 *
 * Props:
 *   - project: objeto do projeto selecionado (src/data/projects.js)
 *   - isOpen: controla a exibição do modal
 *   - onClose: fecha o modal (X, backdrop ou Escape)
 */
function ProjectModal({ project, isOpen, onClose }) {
  const { t } = useLanguage()
  const projectText = project ? t.projects.items[project.id] : null
  const projectDescription = projectText?.description ?? project?.description
  const projectChallenges = projectText?.challenges ?? project?.challenges
  const projectLearnings = projectText?.learnings ?? project?.learnings
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
    } else {
      // Devolve o foco pro botão "Ver detalhes" que abriu o modal.
      previousFocusRef.current?.focus?.()
    }
  }, [isOpen])

  // Fecha com Escape e trava o scroll do conteúdo atrás enquanto aberto
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
    }
  }, [isOpen, onClose])

  // Foco no botão de fechar ao abrir
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus()
  }, [isOpen])

  // Carrossel de fotos (imagem principal + miniaturas) — 3 slides usando a
  // mesma screenshot do projeto (só existe `project.image` nos dados hoje),
  // já que o objetivo aqui é a interação/animação, não múltiplas imagens
  // reais por projeto. `photoIndex` é o slide ativo; `exitingPhoto` guarda o
  // slide que está saindo (index + direção) enquanto a animação de saída
  // roda, pra poder renderizar as duas imagens sobrepostas por ~400ms.
  const [photoIndex, setPhotoIndex] = useState(0)
  const [exitingPhoto, setExitingPhoto] = useState(null)
  const [enterDirection, setEnterDirection] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const exitTimeoutRef = useRef(null)
  const dragStartXRef = useRef(0)
  const pointerIdRef = useRef(null)

  // Reseta o carrossel ao trocar de projeto (evita abrir num slide "preso"
  // do projeto anterior).
  useEffect(() => {
    setPhotoIndex(0)
    setExitingPhoto(null)
    setEnterDirection(null)
    setDragX(0)
    setIsDragging(false)
    return () => clearTimeout(exitTimeoutRef.current)
  }, [project?.id])

  const photos = project ? [project.image, project.image, project.image] : []
  const totalPhotos = photos.length

  const goToPhoto = (nextIndex, direction) => {
    if (nextIndex === photoIndex) return
    clearTimeout(exitTimeoutRef.current)
    setExitingPhoto({ index: photoIndex, direction })
    setEnterDirection(direction)
    setPhotoIndex(nextIndex)
    exitTimeoutRef.current = setTimeout(() => setExitingPhoto(null), 420)
  }

  const goNextPhoto = () => goToPhoto((photoIndex + 1) % totalPhotos, 'next')
  const goPrevPhoto = () => goToPhoto((photoIndex - 1 + totalPhotos) % totalPhotos, 'prev')

  // Setas de teclado pra navegar entre as fotos — mesmo padrão do
  // FolderCarousel.jsx (ignora campos de texto, previne o scroll da seta).
  const handlePhotoKeyDown = (event) => {
    const targetTag = event.target?.tagName
    const isEditableField =
      targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT'
    const isRight = event.key === 'ArrowRight'
    const isLeft = event.key === 'ArrowLeft'
    if (isEditableField || (!isRight && !isLeft)) return
    event.preventDefault()
    if (isRight) goNextPhoto()
    else goPrevPhoto()
  }

  // Arrasto (mouse/touch, via Pointer Events) na foto principal — acompanha
  // o cursor/dedo com uma pequena rotação proporcional; solta e passou do
  // limite (DRAG_THRESHOLD) troca de foto, senão volta suavemente (a
  // ausência da classe de drag já reativa a transição do CSS).
  const DRAG_THRESHOLD = 60

  const handlePhotoPointerDown = (event) => {
    pointerIdRef.current = event.pointerId
    dragStartXRef.current = event.clientX
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePhotoPointerMove = (event) => {
    if (!isDragging) return
    setDragX(event.clientX - dragStartXRef.current)
  }

  const endPhotoDrag = (event) => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX <= -DRAG_THRESHOLD) goNextPhoto()
    else if (dragX >= DRAG_THRESHOLD) goPrevPhoto()
    setDragX(0)
    if (pointerIdRef.current !== null) {
      event.currentTarget.releasePointerCapture(pointerIdRef.current)
      pointerIdRef.current = null
    }
  }

  const handlePhotoPointerCancel = () => {
    setIsDragging(false)
    setDragX(0)
    pointerIdRef.current = null
  }

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-2 py-4 sm:p-6">
      {/* Camada de fundo isolada do modal (irmã, não pai) — assim a
          animação de opacidade dela não "vaza" pros filhos do modal, que
          têm sua própria animação de entrada/saída. */}
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-text/50 backdrop-blur-sm" />
      <div className="relative z-10 flex w-full max-w-[1400px] flex-col">
        <div className="hidden h-12 w-full items-center justify-between pr-6 lg:flex">
          <div
            className="flex h-12 w-[446px] max-w-full items-center bg-contain bg-left bg-no-repeat pl-6"
            style={{ backgroundImage: 'url(/aba-pasta.svg)' }}
          >
            <span className="rounded-md bg-modal-paper px-[70px] py-1.5 text-sm font-semibold text-text">
              {t.modal.detailsLabel}
            </span>
          </div>
        </div>

        {/* Cabeçalho/etiqueta + botão de fechar (mobile) — faixa acima do
            modal, fora da caixa (mesmo padrão da barra do desktop). */}
        <div className="relative z-20 mt-2 -mb-3 flex items-center justify-between gap-3 lg:hidden lg:mt-0 lg:mb-0">
          <div
            className="-mt-4 flex h-12 min-w-0 flex-1 max-w-[446px] items-center justify-center bg-contain bg-left bg-no-repeat px-4 lg:mt-0 lg:justify-start lg:p-0"
            style={{ backgroundImage: 'url(/aba-pasta.svg)' }}
          >
            <span className="rounded-md bg-modal-paper px-3 py-1.5 text-sm font-semibold text-text">
              {t.modal.detailsLabel}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t.modal.closeAria}
            className="-mt-2 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-text bg-text text-modal-paper transition-colors hover:bg-text/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <CloseIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="relative mt-1 flex h-200 max-h-[calc(100vh-6rem)] w-full flex-col overflow-hidden rounded-tr-card rounded-br-card rounded-bl-card bg-modal-paper font-kalam lg:mt-0 lg:flex-row"
        >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.modal.closeAria}
          className="absolute top-4 right-4 z-20 hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-text bg-text text-modal-paper transition-colors hover:bg-text/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:inline-flex"
        >
          <CloseIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative flex flex-1 flex-col overflow-y-auto lg:flex-row">
          {/* Cabeçalho/etiqueta + botão de fechar (desktop) — primeiro
              elemento a aparecer, como a aba de uma pasta sendo aberta. */}
          {false && (
            <div className="absolute inset-x-0 top-0 z-10 hidden items-center justify-between p-6 pt-3 pb-0 lg:flex">
              <div className="flex h-12 w-[446px] max-w-full items-center">
                <span className="rounded-md bg-modal-paper px-3 py-1.5 text-sm font-semibold text-text">
                  {t.modal.detailsLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.modal.closeAria}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-text bg-text text-modal-paper transition-colors hover:bg-text/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Coluna esquerda: área de screenshots/imagens — mesma largura
              da coluna de informações (lg:flex-1 nos dois). Borda separa
              visualmente a parte de fotos da parte de informações (embaixo
              no mobile empilhado, à direita quando lado a lado no
              desktop). */}
          <div
            className="modal-folder-texture flex flex-col gap-6 border-b border-text/10 px-3 py-6 lg:flex-1 lg:border-r lg:border-b-0 lg:px-6 lg:pt-6"
            style={{ backgroundColor: 'var(--color-modal-folder)' }}
          >
            {/* Pilha de "fotos" estilo polaroid — moldura branca grossa
                em volta de cada recorte da screenshot, levemente
                rotacionadas/empilhadas com sombra, como fotos impressas
                jogadas uma sobre a outra. */}
            <div
              className="flex flex-1 flex-col items-center justify-center gap-3 border border-primary/10 px-4 py-8 xl:pt-3 xl:pb-13"
              style={{ backgroundColor: '#E7D7BC' }}
            >
              {false && (
                <>
                  <img
                    src={project.image}
                    alt={`Captura de tela do projeto ${project.title}`}
                    className="aspect-video w-1/2 -rotate-3 rounded-xs border-4 border-white bg-white object-cover shadow-lg"
                  />
                  <img
                    src={project.image}
                    alt={`Captura de tela do projeto ${project.title}`}
                    className="aspect-video -mt-4 w-1/2 rotate-2 rounded-xs border-4 border-white bg-white object-cover object-center shadow-lg"
                  />
                  <img
                    src={project.image}
                    alt={`Captura de tela do projeto ${project.title}`}
                    className="aspect-video -mt-4 w-1/2 rotate-[-1.5deg] rounded-xs border-4 border-white bg-white object-cover object-bottom shadow-lg"
                  />
                </>
              )}

              {/* Galeria de fotos do projeto — medida de referência 601x401. Troca de
                  slide com efeito de "folhear fotografias": a foto atual desliza pra
                  fora (rotação + escala + fade), a próxima entra de baixo/do lado
                  oposto. Setas, miniaturas, arrasto (mouse/touch) e teclado
                  (ArrowLeft/ArrowRight) navegam entre os slides. */}
              <div
                className="relative flex w-full max-w-[601px] aspect-[601/401] items-center justify-center text-text/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                role="group"
                aria-roledescription="carrossel"
                aria-label={t.modal.galleryAria}
                tabIndex={0}
                onKeyDown={handlePhotoKeyDown}
              >
                {/* Camadas decorativas da pilha — só visuais (aria-hidden), no
                    máximo 2, sutilmente deslocadas/rotacionadas atrás da foto. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-3 -rotate-2 scale-95 rounded-card bg-primary/10"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-2 rotate-1 scale-[0.97] rounded-card bg-primary/10"
                />

                <div className="relative h-full w-full overflow-hidden ">
                  {exitingPhoto && (
                    <img
                      key={`exit-${exitingPhoto.index}`}
                      src={photos[exitingPhoto.index]}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className={`pointer-events-none absolute inset-0 h-full w-full object-contain object-top motion-reduce:hidden ${
                        exitingPhoto.direction === 'next'
                          ? 'animate-photo-exit-left'
                          : 'animate-photo-exit-right'
                      }`}
                    />
                  )}
                  <img
                    key={`current-${photoIndex}`}
                    src={photos[photoIndex]}
                    alt={`${t.modal.screenshotAlt} ${project.title}`}
                    draggable={false}
                    onPointerDown={handlePhotoPointerDown}
                    onPointerMove={handlePhotoPointerMove}
                    onPointerUp={endPhotoDrag}
                    onPointerCancel={handlePhotoPointerCancel}
                    style={{
                      touchAction: 'pan-y',
                      transform: isDragging
                        ? `translateX(${dragX}px) rotate(${dragX / 22}deg)`
                        : undefined,
                      transition: isDragging ? 'none' : undefined,
                    }}
                    className={`absolute inset-0 h-full w-full cursor-grab object-contain object-top transition-transform duration-300 ease-out active:cursor-grabbing ${
                      !isDragging && enterDirection === 'next'
                        ? 'motion-reduce:transition-none animate-photo-enter-right'
                        : !isDragging && enterDirection === 'prev'
                          ? 'motion-reduce:transition-none animate-photo-enter-left'
                          : ''
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={goPrevPhoto}
                  aria-label={t.modal.prevImageAria}
                  className="absolute top-1/2 -left-4 z-10 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-text/30 bg-white text-text transition-colors hover:bg-text/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goNextPhoto}
                  aria-label={t.modal.nextImageAria}
                  className="absolute top-1/2 -right-4 z-10 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-text/30 bg-white text-text transition-colors hover:bg-text/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Miniaturas — medida de referência 186x124 cada. Clicáveis, com a
                  ativa em destaque (borda + leve escala + sombra). */}
              <div className="mt-4 flex w-full max-w-[601px] gap-3">
                {photos.map((src, index) => {
                  const isActive = index === photoIndex
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToPhoto(index, index > photoIndex ? 'next' : 'prev')}
                      aria-label={`${t.modal.thumbnailAria} ${index + 1}`}
                      aria-current={isActive}
                      className={`flex min-w-0 flex-1 aspect-[186/124] cursor-pointer items-center justify-center overflow-hidden text-text/50 transition-[transform,box-shadow,opacity] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        isActive
                          ? 'scale-[1.015] opacity-100 shadow-md ring-2 ring-accent'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${t.modal.thumbnailAlt} ${index + 1} ${t.modal.of} ${project.title}`}
                        draggable={false}
                        className="h-full w-full object-contain object-top"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Coluna direita: informações do projeto */}
          <div
            className="modal-folder-texture flex flex-col gap-6 px-3 py-6 lg:flex-1 lg:px-6 lg:pt-6"
            style={{ backgroundColor: 'var(--color-modal-folder)' }}
          >
            <div className="flex flex-1 flex-col gap-3 border border-text/10 bg-modal-paper px-4 py-4 lg:px-6 xl:gap-5 xl:px-8 xl:py-6">
              <div
                className="flex w-full max-w-[620px] flex-col"
              >
                <h2
                  id="project-modal-title"
                  className="mb-2 text-3xl leading-tight font-extrabold text-modal-heading lg:text-4xl"
                >
                  {project.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-modal-body">
                  {projectDescription}
                </p>
              </div>

              <div
                className="flex w-full max-w-[620px] flex-col"
              >
                <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
                  <span
                    aria-hidden="true"
                    className="text-xs font-normal tracking-normal text-modal-number normal-case"
                  >
                    01 —
                  </span>
                  {t.modal.about}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-modal-body">
                  {projectDescription}
                </p>
              </div>

              <div
                className="flex w-full max-w-[620px] flex-col"
              >
                <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
                  <span
                    aria-hidden="true"
                    className="text-xs font-normal tracking-normal text-modal-number normal-case"
                  >
                    02 —
                  </span>
                  {t.modal.challenges}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-modal-body">
                  {projectChallenges ?? '—'}
                </p>
              </div>

              <div
                className="flex w-full max-w-[620px] flex-col"
              >
                <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
                  <span
                    aria-hidden="true"
                    className="text-xs font-normal tracking-normal text-modal-number normal-case"
                  >
                    03 —
                  </span>
                  {t.modal.learnings}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-modal-body">
                  {projectLearnings ?? '—'}
                </p>
              </div>

              <div
                className="flex w-full max-w-[620px] flex-col"
              >
                <h3 className="flex items-baseline gap-2 text-sm font-bold tracking-wide text-modal-heading uppercase">
                  <span
                    aria-hidden="true"
                    className="text-xs font-normal tracking-normal text-modal-number normal-case"
                  >
                    04 —
                  </span>
                  {t.modal.stack}
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.technologies.map((tech) => {
                    const icon = stackIcons.find(
                      (item) => item.label.toLowerCase() === tech.toLowerCase(),
                    )
                    const FallbackIcon = FALLBACK_TECH_ICONS[tech.toLowerCase()]
                    return (
                      <span
                        key={tech}
                        className="flex flex-col items-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-medium tracking-wide text-modal-text-secondary uppercase"
                      >
                        {icon ? (
                          <img src={icon.src} alt="" aria-hidden="true" className="h-6 w-6" />
                        ) : FallbackIcon ? (
                          <FallbackIcon className="h-6 w-6" aria-hidden="true" />
                        ) : null}
                        {tech}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Ações — "Ver projeto" é a ação primária (preenchida, grafite,
                  combinando com as setas pretas da galeria); GitHub é
                  secundária (outline). */}
              <div
                className="mt-2 flex items-center gap-3"
              >
                {project.demoHref ? (
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-modal-heading bg-modal-heading px-4 py-2 text-sm font-semibold text-modal-paper transition-[transform,background-color,box-shadow] duration-150 hover:-translate-y-px hover:bg-[#38352f] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 active:bg-[#151412]"
                  >
                    <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    {t.modal.viewProject}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center gap-1.5 rounded-md border border-modal-heading bg-modal-heading px-4 py-2 text-sm font-semibold text-modal-paper"
                  >
                    <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    {t.modal.viewProject}
                  </span>
                )}

                {project.githubHref ? (
                  <a
                    href={project.githubHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-modal-github-border bg-modal-paper px-3.5 py-2 text-sm font-medium text-modal-github-text transition-[transform,background-color,border-color] duration-150 hover:-translate-y-px hover:border-text/40 hover:bg-text/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0"
                  >
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                    {t.modal.github}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center gap-1.5 rounded-md border border-modal-github-border bg-modal-paper px-3.5 py-2 text-sm font-medium text-modal-github-text"
                  >
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                    {t.modal.github}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
