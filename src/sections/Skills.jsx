import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import SkillCard from '../components/SkillCard'
import { skillCategories } from '../data/skills'
import folhaPequena from '../assets/folha pequena.svg'
import BordaPapelPerfuradaSkill from '../components/BordaPapelPerfuradaSkill'
import { DeviceIcon, LockIcon, LayersIcon } from '../components/icons'
import { useLanguage } from '../i18n/LanguageContext'

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
  const { t } = useLanguage()
  const cards = CARD_ORDER.map((category) =>
    skillCategories.find((card) => card.category === category)
  ).filter(Boolean)

  return (
    <Section id="habilidades" containerClassName="!px-3 lg:!px-desktop">
      {/* Faixa perfurada encostada no topo do container principal (sem vão) */}
      <div className="mx-auto w-full max-w-[1440px] aspect-1992/138 bg-background">
        <BordaPapelPerfuradaSkill className="h-full w-full text-primary" />
      </div>

      {/* Placeholder temporário: referência visual 1440x951 para reconstrução da seção */}
      <div className="mx-auto w-full max-w-[1440px] min-h-150 lg:h-237.75 border-2 border-dashed border-primary/40 bg-primary flex flex-col items-center pb-8 lg:pb-0">
        <SectionTitle
          eyebrow={t.skills.eyebrow}
          title={
            <>
              {t.skills.titlePrefix}{' '}
              <span className="font-normal">{t.skills.titleAmp}</span> {t.skills.titleSuffix}
            </>
          }
          titleClassName="text-black"
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-280">
          {cards.map(({ icon: _icon, note, category, ...card }) => {
            const NoteIcon = note && ICONS[note.icon]
            const categoryText = t.skills.categories[category]
            return (
              <div
                key={category}
                className="relative w-full max-w-130 mx-auto min-h-[235px] lg:min-h-0 lg:aspect-[400/276.41] rounded-card"
              >
                <img
                  src={folhaPequena}
                  alt=""
                  className="absolute inset-0 h-full w-full object-fill drop-shadow-lg"
                />
                <SkillCard
                  {...card}
                  category={category}
                  title={categoryText?.title ?? card.title}
                  description={categoryText?.description ?? card.description}
                  note={
                    note && {
                      label: categoryText?.note ?? note.label,
                      iconNode: NoteIcon && <NoteIcon className="h-4 w-4" />,
                    }
                  }
                  className="relative h-full bg-transparent! pt-10! pl-6! lg:pt-20! lg:pl-10! font-kalam"
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
