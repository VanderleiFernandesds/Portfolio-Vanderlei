import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import { MailIcon } from '../components/icons'
import { contactChannels } from '../data/contactChannels'
import folhaDeRedes from '../assets/folha de redes.png'
import folhaDeAviso from '../assets/folha de aviso.webp'
import hoverStroke from '../assets/HoverStroke.svg'
import parteSuperiorFolha from '../assets/parte superior da folha.svg'

// Ordem dos 4 quadrados: LinkedIn e WhatsApp em cima, e-mail e GitHub embaixo.
const SQUARE_CHANNELS = ['linkedin', 'whatsapp', 'email', 'github']

function Contact() {
  return (
    <Section id="contato">
      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-card bg-primary">
        {/* Container extra topo */}
        <div className="h-8 w-full lg:h-22">
          <img
            src={parteSuperiorFolha}
            alt=""
            className="h-full w-full -translate-y-4 object-cover lg:-translate-y-11"
          />
        </div>

        {/* Container extra */}
        <div className="flex w-full items-center justify-center">
          <SectionTitle
            eyebrow="Contato"
            titleClassName="text-black"
            title={
              <>
                Tem uma ideia?
                <br />
                Vamos transformá-la em realidade.
              </>
            }
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-6 lg:h-170.5 lg:flex-row">
          {/* Coluna esquerda */}
          <div className="grid w-full grid-cols-2 grid-rows-2 gap-6 border border-surface p-6 lg:h-159 lg:w-170">
            {SQUARE_CHANNELS.map((channelName) => {
              const item = contactChannels.find(
                (c) => c.channel === channelName,
              );
              const Icon = item.icon === "mail" ? MailIcon : item.icon;

              return (
                <a
                  key={item.channel}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-4/5 overflow-hidden rounded-card shadow-lg lg:aspect-auto lg:h-72 lg:w-61"
                >
                  <img
                    src={folhaDeRedes}
                    alt=""
                    className="h-full w-full object-cover"
                  />
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
              );
            })}
          </div>

          {/* Coluna direita */}
          <div className="aspect-274/305 w-full max-w-68.5 -rotate-12 overflow-hidden rounded-card lg:h-76.25 lg:w-68.5">
            <img
              src={folhaDeAviso}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact
