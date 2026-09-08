import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import { MailIcon } from '../components/icons'
import { contactChannels } from '../data/contactChannels'
import folhaDeRedes from '../assets/folha de redes.png'
import folhaDeAviso from '../assets/folha de aviso.webp'
import hoverStroke from '../assets/HoverStroke.svg'

// Ordem dos 4 quadrados: LinkedIn e WhatsApp em cima, e-mail e GitHub embaixo.
const SQUARE_CHANNELS = ['linkedin', 'whatsapp', 'email', 'github']

function Contact() {
  return (
    <Section id="contato">
      <SectionTitle
        eyebrow="Contato"
        title={
          <>
            Tem uma ideia?
            <br />
            Vamos transformá-la <span className="text-accent">em realidade.</span>
          </>
        }
        description="Estou disponível para novos projetos, parcerias ou oportunidades. Vamos conversar sobre como posso ajudar você."
      />

      <div className="mx-auto mt-12 flex w-full max-w-301 flex-col items-center justify-center gap-6 rounded-card bg-primary p-6 sm:p-8 lg:h-170.5 lg:flex-row lg:p-12">
        {/* Coluna esquerda */}
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-6 border border-surface p-6 lg:h-159 lg:w-170">
          {SQUARE_CHANNELS.map((channelName) => {
            const item = contactChannels.find((c) => c.channel === channelName)
            const Icon = item.icon === 'mail' ? MailIcon : item.icon

            return (
              <a
                key={item.channel}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-4/5 overflow-hidden rounded-card shadow-lg lg:aspect-auto lg:h-72 lg:w-61"
              >
                <img src={folhaDeRedes} alt="" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <Icon className="h-16 w-16 text-text" />
                  <span className="relative mt-6 font-kalam text-lg font-semibold text-text">
                    {item.title}
                    <span
                      aria-hidden="true"
                      className="hover-stroke-wipe pointer-events-none absolute -inset-x-4 -bottom-4 h-8"
                    >
                      <img
                        src={hoverStroke}
                        alt=""
                        draggable={false}
                        className="h-full w-full object-contain select-none"
                      />
                    </span>
                  </span>
                </span>
              </a>
            )
          })}
        </div>

        {/* Coluna direita */}
        <div className="aspect-274/305 w-full max-w-68.5 -rotate-12 overflow-hidden rounded-card lg:h-76.25 lg:w-68.5">
          <img src={folhaDeAviso} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </Section>
  )
}

export default Contact
