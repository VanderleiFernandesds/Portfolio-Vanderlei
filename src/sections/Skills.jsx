import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import SkillCard from '../components/SkillCard'
import { skillCategories } from '../data/skills'
import folhaPequena from '../assets/folha pequena.svg'
import BordaPapelPerfuradaSkill from '../components/BordaPapelPerfuradaSkill'
import { DeviceIcon, LockIcon, LayersIcon } from '../components/icons'

// Ícone (src/components/icons.jsx) referenciado por `note.icon` de
// src/data/skills.js. O badge de ícone da categoria (`icon`) não é exibido.
const ICONS = {
  device: DeviceIcon,
  lock: LockIcon,
  layers: LayersIcon,
}

// Os 4 cards exibidos nesta seção (Front-end, Banco de Dados, Back-end,
// Ferramentas) — Cloud & Deploy e Conceitos ficam de fora por ora.
const CARD_ORDER = ['frontend', 'database', 'backend', 'tools']

function Skills() {
  const cards = CARD_ORDER.map((category) =>
    skillCategories.find((card) => card.category === category)
  ).filter(Boolean)

  return (
    <Section id="habilidades">
      {/* Faixa perfurada encostada no topo do container principal (sem vão) */}
      <div className="mx-auto w-full max-w-[1440px] aspect-1992/138 bg-background">
        <BordaPapelPerfuradaSkill className="h-full w-full text-primary" />
      </div>

      {/* Placeholder temporário: referência visual 1440x951 para reconstrução da seção */}
      <div className="mx-auto w-full max-w-[1440px] min-h-150 lg:h-237.75 border-2 border-dashed border-primary/40 bg-primary flex flex-col items-center">
        <SectionTitle
          eyebrow="Habilidades"
          title={
            <>
              Tecnologias <span className="font-normal">&amp;</span> Ferramentas
            </>
          }
          description="Principais tecnologias que utilizo para transformar ideias em soluções digitais de qualidade."
          titleClassName="text-black"
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-280">
          {cards.map(({ icon: _icon, note, ...card }) => {
            const NoteIcon = note && ICONS[note.icon]
            return (
              <div
                key={card.category}
                className="relative w-full max-w-130 mx-auto aspect-[400/276.41] rounded-card"
              >
                <img
                  src={folhaPequena}
                  alt=""
                  className="absolute inset-0 h-full w-full object-fill drop-shadow-lg"
                />
                <SkillCard
                  {...card}
                  note={
                    note && {
                      label: note.label,
                      iconNode: NoteIcon && <NoteIcon className="h-4 w-4" />,
                    }
                  }
                  className="relative h-full bg-transparent! pt-20! max-lg:pl-10! font-kalam"
                />
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default Skills
