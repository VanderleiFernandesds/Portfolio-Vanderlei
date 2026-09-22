import { useState } from 'react'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import HoverStrokeCircle from '../components/HoverStrokeCircle'
import { MailIcon } from '../components/icons'
import { contactChannels } from '../data/contactChannels'
import { useLanguage } from '../i18n/LanguageContext'
import folhaDeRedes from '../assets/folha de redes.png'
import folhaDeAviso from '../assets/folha de aviso.svg'
import parteSuperiorFolha from '../assets/parte superior da folha.svg'

// Ordem dos 4 quadrados: LinkedIn e WhatsApp em cima, e-mail e GitHub embaixo.
const SQUARE_CHANNELS = ['linkedin', 'whatsapp', 'email', 'github']

// Card de canal — hover próprio (estado por item, por isso não fica
// direto no .map do componente pai) revela o contorno HoverStrokeCircle.
function ChannelCard({ href, imageSrc, Icon, title }) {
  const [hover, setHover] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group relative aspect-4/5 overflow-hidden rounded-card shadow-lg lg:aspect-auto lg:h-72 lg:w-61"
    >
      <img src={imageSrc} alt="" className="h-full w-full object-cover" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="relative flex flex-col items-center gap-3">
          <Icon className="h-9 w-9 text-text lg:h-16 lg:w-16" />
          <span className="font-kalam text-sm font-semibold text-text lg:text-lg">
            {title}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -inset-y-8"
          >
            <HoverStrokeCircle hover={hover} />
          </span>
        </span>
      </span>
    </a>
  )
}

function Contact() {
  const { t } = useLanguage()
  return (
    <Section id="contato" containerClassName="!px-3 lg:!px-desktop">
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
            eyebrow={t.contact.eyebrow}
            titleClassName="text-black"
            title={
              <>
                {t.contact.titleLine1}
                <br />
                {t.contact.titleLine2}
              </>
            }
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-6 lg:h-170.5 lg:flex-row">
          {/* Coluna esquerda */}
          <div className="grid w-full grid-cols-2 grid-rows-2 gap-6 p-6 lg:h-159 lg:w-170">
            {SQUARE_CHANNELS.map((channelName) => {
              const item = contactChannels.find(
                (c) => c.channel === channelName,
              );
              const Icon = item.icon === "mail" ? MailIcon : item.icon;
              const channelTitle = t.contact.channels[channelName]?.title ?? item.title;

              return (
                <ChannelCard
                  key={item.channel}
                  href={item.href}
                  imageSrc={folhaDeRedes}
                  Icon={Icon}
                  title={channelTitle}
                />
              );
            })}
          </div>

          {/* Coluna direita */}
          <div className="relative aspect-274/305 w-full max-w-68.5 -rotate-12 overflow-hidden rounded-card lg:h-76.25 lg:w-68.5">
            <img
              src={folhaDeAviso}
              alt=""
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center font-kalam text-black">
              <span className="text-2xl font-semibold">{t.contact.thanksTitle}</span>
              <span className="text-lg">{t.contact.thanksMessage}</span>
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact
