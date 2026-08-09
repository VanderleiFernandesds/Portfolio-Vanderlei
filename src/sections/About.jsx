import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import FeatureItem from '../components/FeatureItem'
import { CodeIcon, LayersIcon, ZapIcon, BookIcon } from '../components/icons'
import { aboutFeatures } from '../data/aboutFeatures'

// Foto ainda não fornecida para esta seção (é diferente da foto da Hero).
// Quando o asset existir em src/assets/, importe e substitua o placeholder
// abaixo, por exemplo:
// import aboutPhoto from '../assets/about.jpg'

const FEATURE_ICONS = {
  code: <CodeIcon />,
  layers: <LayersIcon />,
  zap: <ZapIcon />,
  book: <BookIcon />,
}

function About() {
  return (
    <Section id="sobre">
      <SectionTitle
        eyebrow="Sobre mim"
        title="Quem está por trás do código"
        description="Construindo aplicações com propósito e qualidade."
      />

      <div className="mt-12 grid gap-10 rounded-card bg-primary p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
        {/* Coluna esquerda: foto + "Sempre aprendendo" */}
        <div className="flex flex-col gap-6">
          <div className="flex aspect-4/3 w-full items-center justify-center rounded-button bg-surface/60">
            <p className="px-4 text-center text-sm text-text-muted">
              Foto (Sobre)
              <br />
              (adicionar asset em src/assets/)
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-text sm:text-2xl">
              Sempre aprendendo
            </h3>
            <p className="mt-3 text-text-muted">
              A tecnologia evolui constantemente, e isso é uma das partes que
              mais gosto na programação. Estou sempre buscando aprender novas
              ferramentas, aprofundar meus conhecimentos e colocar esse
              aprendizado em prática por meio de projetos.
            </p>
            <p className="mt-3 text-text-muted">
              Acredito que cada desafio é uma oportunidade para evoluir, tanto
              tecnicamente quanto na forma de pensar e desenvolver soluções.
              Meu objetivo é continuar crescendo como desenvolvedor e criar
              aplicações cada vez mais completas, eficientes e bem
              construídas.
            </p>
          </div>
        </div>

        {/* Coluna direita: "Um pouco sobre mim" + grid 2x2 de diferenciais */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-bold text-text sm:text-2xl">
              Um pouco sobre mim
            </h3>
            <p className="mt-3 text-text-muted">
              Olá! Sou Vanderlei, desenvolvedor Full-Stack formado em Análise
              e Desenvolvimento de Sistemas.
            </p>
            <p className="mt-3 text-text-muted">
              Minha curiosidade em entender como a tecnologia funciona foi o
              que despertou meu interesse pela programação. Com o tempo, essa
              curiosidade se transformou na vontade de criar soluções,
              resolver problemas e desenvolver aplicações que realmente façam
              diferença na vida das pessoas.
            </p>
            <p className="mt-3 text-text-muted">
              Hoje, meu foco está no desenvolvimento web. Gosto de criar
              aplicações modernas, intuitivas e bem estruturadas, sempre
              buscando unir desempenho, organização e uma experiência
              agradável para o usuário.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {aboutFeatures.map((feature, index) => (
              <div
                key={feature.label}
                className={
                  index % 2 === 1 ? 'sm:border-l sm:border-surface sm:pl-8' : ''
                }
              >
                <FeatureItem
                  icon={FEATURE_ICONS[feature.icon]}
                  label={feature.label}
                  description={feature.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default About
