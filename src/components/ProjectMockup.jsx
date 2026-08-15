/**
 * ProjectMockup
 * Representação estilizada de tela para o projeto em destaque da pilha
 * (src/sections/Projects.jsx) — como os projetos são fictícios, em vez de
 * uma captura de tela real, monta uma mini interface (barra de navegador +
 * conteúdo) só com blocos/tokens do próprio projeto (design/tokens.md).
 * Cada `variant` corresponde ao campo `preview` de src/data/projects.js.
 */
function BrowserBar() {
  return (
    <div className="flex items-center gap-1.5 border-b border-primary/10 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-primary/15" />
      <span className="h-2 w-2 rounded-full bg-primary/15" />
      <span className="h-2 w-2 rounded-full bg-primary/15" />
      <span className="ml-2 h-2.5 w-24 rounded-full bg-primary/10" />
    </div>
  )
}

function EcommerceMockup() {
  return (
    <>
      <BrowserBar />
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-16 rounded-full bg-primary/15" />
          <span className="h-5 w-14 rounded-full bg-projects" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5 rounded-md bg-primary/[0.06] p-2"
            >
              <div className="aspect-square rounded bg-accent-light/40" />
              <span className="h-1.5 w-full rounded-full bg-primary/15" />
              <span className="h-1.5 w-2/3 rounded-full bg-primary/10" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function TasksMockup() {
  const columns = [2, 3, 1]
  return (
    <>
      <BrowserBar />
      <div className="flex flex-1 gap-2.5 p-3.5">
        {columns.map((count, columnIndex) => (
          <div key={columnIndex} className="flex flex-1 flex-col gap-2">
            <span className="h-1.5 w-2/3 rounded-full bg-primary/20" />
            {Array.from({ length: count }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="flex flex-col gap-1.5 rounded-md bg-primary/[0.06] p-2"
              >
                <span
                  className={`h-1.5 w-8 rounded-full ${
                    columnIndex === 1 ? 'bg-accent-light' : 'bg-projects-light'
                  }`}
                />
                <span className="h-1.5 w-full rounded-full bg-primary/15" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function FinanceMockup() {
  const bars = [40, 70, 50, 90, 65, 80]
  return (
    <>
      <BrowserBar />
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-md bg-primary/[0.06] p-2">
              <span className="block h-1.5 w-1/2 rounded-full bg-primary/15" />
              <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-accent-light" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-md bg-primary/[0.06] p-2.5">
          {bars.map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%` }}
              className="flex-1 rounded-t bg-projects-light"
            />
          ))}
        </div>
      </div>
    </>
  )
}

function DevhubMockup() {
  return (
    <>
      <BrowserBar />
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 rounded-md bg-primary/[0.06] p-2"
          >
            <span className="h-5 w-5 shrink-0 rounded-full bg-accent-light/60" />
            <div className="flex flex-1 flex-col gap-1">
              <span className="h-1.5 w-1/2 rounded-full bg-primary/15" />
              <span className="h-1 w-full rounded-full bg-primary/10" />
            </div>
            <span className="h-4 w-8 shrink-0 rounded-full bg-projects-light" />
          </div>
        ))}
      </div>
    </>
  )
}

const VARIANTS = {
  ecommerce: EcommerceMockup,
  tasks: TasksMockup,
  finance: FinanceMockup,
  devhub: DevhubMockup,
}

function ProjectMockup({ variant, className = '' }) {
  const Content = VARIANTS[variant] ?? EcommerceMockup

  return (
    <div className={`flex h-full w-auto flex-col overflow-hidden bg-text ${className}`.trim()}>
      <Content />
    </div>
  )
}

export default ProjectMockup
