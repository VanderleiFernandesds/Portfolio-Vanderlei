import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon } from './icons'

/**
 * ProjectGallery
 * Carrossel de fotos do ProjectModal (imagem principal + miniaturas) — 3
 * slides usando a mesma screenshot, já que os dados hoje só têm
 * `project.image`. `photoIndex` é o slide ativo; `exitingPhoto` guarda o
 * slide que está saindo (index + direção) enquanto a animação de saída
 * roda, para renderizar as duas imagens sobrepostas por ~400ms.
 *
 * Props:
 *   - project: objeto do projeto selecionado (src/data/projects.js)
 *   - t: objeto de traduções do idioma atual
 */
function ProjectGallery({ project, t }) {
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

  // Navegação por teclado entre fotos — mesmo padrão de FolderCarousel.jsx.
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

  // Arrasto (mouse/touch via Pointer Events) na foto principal: acompanha o
  // cursor/dedo com rotação proporcional. Ao soltar, se passou de
  // DRAG_THRESHOLD troca de foto; senão volta suavemente.
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

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-3 border border-primary/10 px-4 py-8 xl:pt-3 xl:pb-13"
      style={{ backgroundColor: '#E7D7BC' }}
    >

      {/* Troca de slide com efeito de "folhear fotografias": a foto atual
          desliza para fora (rotação + escala + fade) enquanto a próxima
          entra do lado oposto. Setas, miniaturas, arrasto e teclado
          (ArrowLeft/ArrowRight) navegam entre os slides. */}
      <div
        className="relative flex w-full max-w-[601px] aspect-[601/401] items-center justify-center text-text/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        role="group"
        aria-roledescription="carrossel"
        aria-label={t.modal.galleryAria}
        tabIndex={0}
        onKeyDown={handlePhotoKeyDown}
      >
        {/* Camadas decorativas atrás da foto, puramente visuais. */}
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
              width="1536"
              height="1024"
              loading="lazy"
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
            width="1536"
            height="1024"
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
                width="1536"
                height="1024"
                loading="lazy"
                className="h-full w-full object-contain object-top"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectGallery
