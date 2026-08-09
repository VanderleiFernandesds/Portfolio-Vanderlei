import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import SkillCard from '../components/SkillCard'
import IconBadge from '../components/IconBadge'
import {
  CodeIcon,
  LayersIcon,
  ZapIcon,
  UserIcon,
  TargetIcon,
  RefreshIcon,
  MailIcon,
  FolderIcon,
  ServerIcon,
  DatabaseIcon,
  WrenchIcon,
  CloudIcon,
  LightbulbIcon,
  LockIcon,
  DeviceIcon,
  GitBranchIcon,
} from '../components/icons'
import { skillCategories, softSkills } from '../data/skills'

// Registro central: nome usado em src/data/skills.js -> ícone real.
const ICONS = {
  code: <CodeIcon />,
  layers: <LayersIcon />,
  zap: <ZapIcon />,
  user: <UserIcon />,
  target: <TargetIcon />,
  refresh: <RefreshIcon />,
  mail: <MailIcon />,
  folder: <FolderIcon />,
  server: <ServerIcon />,
  database: <DatabaseIcon />,
  wrench: <WrenchIcon />,
  cloud: <CloudIcon />,
  lightbulb: <LightbulbIcon />,
  lock: <LockIcon />,
  device: <DeviceIcon />,
  gitBranch: <GitBranchIcon />,
}

const SMALL_ICONS = {
  code: <CodeIcon className="h-4 w-4" />,
  layers: <LayersIcon className="h-4 w-4" />,
  zap: <ZapIcon className="h-4 w-4" />,
  user: <UserIcon className="h-4 w-4" />,
  target: <TargetIcon className="h-4 w-4" />,
  refresh: <RefreshIcon className="h-4 w-4" />,
  mail: <MailIcon className="h-4 w-4" />,
  folder: <FolderIcon className="h-4 w-4" />,
  cloud: <CloudIcon className="h-4 w-4" />,
  database: <DatabaseIcon className="h-4 w-4" />,
  gitBranch: <GitBranchIcon className="h-4 w-4" />,
  lock: <LockIcon className="h-4 w-4" />,
  device: <DeviceIcon className="h-4 w-4" />,
}

function Skills() {
  return (
    <Section id="habilidades">
      <SectionTitle
        eyebrow="Habilidades"
        title={
          <>
            Tecnologias <span className="font-normal">&amp;</span> Ferramentas
          </>
        }
        description="Principais tecnologias que utilizo para transformar ideias em soluções digitais de qualidade."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((skill) => (
          <SkillCard
            key={skill.title}
            category={skill.category}
            icon={ICONS[skill.icon]}
            title={skill.title}
            description={skill.description}
            technologies={skill.technologies}
            concepts={skill.concepts?.map((concept) => ({
              ...concept,
              iconNode: SMALL_ICONS[concept.icon],
            }))}
            note={
              skill.note && {
                ...skill.note,
                iconNode: SMALL_ICONS[skill.note.icon],
              }
            }
          />
        ))}
      </div>

      {/* Soft Skills — full-width, layout próprio (sem tech chips) */}
      <div className="mt-6 flex flex-col gap-6 rounded-card bg-primary p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex items-start gap-3 lg:max-w-xs lg:shrink-0">
          <IconBadge
            icon={ICONS[softSkills.icon]}
            className="bg-category-soft-skills"
          />
          <div>
            <h3 className="font-bold text-text">{softSkills.title}</h3>
            <p className="text-sm text-text-muted">{softSkills.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {softSkills.items.map((item, index) => (
            <span
              key={item.label}
              className={`flex items-center gap-2 text-sm text-text-muted ${
                index > 0 ? 'lg:border-l lg:border-surface lg:pl-6' : ''
              }`.trim()}
            >
              {SMALL_ICONS[item.icon]}
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Skills
