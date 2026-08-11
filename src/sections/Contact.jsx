import { useState } from 'react'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import ContactChannelCard from '../components/ContactChannelCard'
import { MailIcon, PinIcon, SendIcon, ChevronDownIcon, LockIcon } from '../components/icons'
import { contactChannels } from '../data/contactChannels'

const MESSAGE_MAX_LENGTH = 500

// Opções sugeridas para o campo "Assunto" — o mockup não especifica as
// opções do dropdown, este conteúdo é uma proposta editável, não um dado oficial.
const SUBJECT_OPTIONS = [
  'Proposta de projeto',
  'Oportunidade de trabalho',
  'Dúvida',
  'Outro',
]

// Ícones próprios (icons.jsx) usados por nome nos canais que não vêm de
// react-icons (react-icons já entrega o componente pronto em `icon`).
const OWN_ICONS = {
  mail: <MailIcon />,
  pin: <PinIcon />,
}

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialFormState)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Apenas UI por enquanto — sem chamada de API/serviço externo.
    setSubmitted(true)
  }

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

      <div className="mt-12 grid gap-10 rounded-card bg-primary p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
        {/* Coluna esquerda: canais de contato */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold tracking-widest text-text-muted uppercase">
            Canais de contato
          </p>

          {contactChannels.map((item) => (
            <ContactChannelCard
              key={item.channel}
              channel={item.channel}
              icon={typeof item.icon === 'string' ? OWN_ICONS[item.icon] : <item.icon />}
              title={item.title}
              value={item.value}
              badge={item.badge}
              href={item.href}
              isLink={item.isLink}
            />
          ))}
        </div>

        {/* Coluna direita: formulário */}
        <div className="rounded-card border border-surface p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-accent text-text">
              <SendIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-text">Envie uma mensagem</h3>
              <p className="text-sm text-text-muted">
                Preencha o formulário e entrarei em contato o mais breve
                possível.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm text-text">
                Nome
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Seu nome"
                  required
                  className="rounded-button border border-surface bg-surface/40 px-3 py-2.5 text-text placeholder:text-text-muted focus:border-accent-light focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-text">
                E-mail
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="voce@email.com"
                  required
                  className="rounded-button border border-surface bg-surface/40 px-3 py-2.5 text-text placeholder:text-text-muted focus:border-accent-light focus:outline-none"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-sm text-text">
              Assunto
              <div className="relative">
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  required
                  className="w-full appearance-none rounded-button border border-surface bg-surface/40 px-3 py-2.5 pr-10 text-text focus:border-accent-light focus:outline-none"
                >
                  <option value="" disabled>
                    Selecione o assunto
                  </option>
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-muted" />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-text">
              Mensagem
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange('message')}
                maxLength={MESSAGE_MAX_LENGTH}
                rows={5}
                placeholder="Conte um pouco sobre o projeto, ideia ou oportunidade..."
                required
                className="resize-none rounded-button border border-surface bg-surface/40 px-3 py-2.5 text-text placeholder:text-text-muted focus:border-accent-light focus:outline-none"
              />
              <span className="self-end text-xs text-text-muted">
                {form.message.length}/{MESSAGE_MAX_LENGTH}
              </span>
            </label>

            <Button type="submit" variant="accent" className="w-full">
              <SendIcon className="h-4 w-4" />
              Enviar mensagem
            </Button>

            {submitted && (
              <p className="text-center text-sm text-accent-light" role="status">
                Formulário preenchido — envio ainda não está conectado a nenhum serviço.
              </p>
            )}

            <p className="flex items-center justify-center gap-2 text-center text-xs text-text-muted">
              <LockIcon className="h-4 w-4" />
              Suas informações estão seguras e não serão compartilhadas.
            </p>
          </form>
        </div>
      </div>
    </Section>
  )
}

export default Contact
