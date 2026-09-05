import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import AboutItem from '../components/AboutItem'
import { aboutItems } from '../data/aboutItems'

/**
 * About
 *
 * 3 blocos alternados (folha + foto Polaroid), montados com <AboutItem />
 * a partir de src/data/aboutItems.js — mesmo componente para os 3, o que
 * muda é só a prop `photoPosition` (e a foto).
 *
 * Medidas de referência (desktop 1440px, aplicadas a partir do lg — ver
 * AboutItem): folha 950x611.7px, foto 400.87x449.78px, overlap de 140px.
 * Abaixo do lg a composição empilha (folha em cima, foto embaixo, sem
 * sobreposição) — ver comentário em AboutItem.jsx.
 *
 * As medidas de desktop escalam proporcionalmente com a largura do
 * container pai (via container queries, unidade cqw) através de
 * clamp(0px, Ncqw, valor-em-1440px), atingindo os valores exatos acima
 * somente quando o container pai tem 1440px (ou mais, onde ficam travadas
 * no máximo) — 0 overflow horizontal em qualquer largura.
 *
 * O container pai (div.flex.flex-col logo abaixo) precisa declarar
 * [container-type:inline-size] (@container) para que as unidades cqw
 * funcionem.
 */
function About() {
  return (
    <Section id="sobre" className="overflow-hidden">
      <SectionTitle
        eyebrow="Sobre mim"
        title="Quem está por trás do código"
        description="Construindo aplicações com propósito e qualidade."
      />

      <div className="mt-12 flex w-full flex-col @container lg:h-[clamp(0px,120.4167vw,1734px)]">
        <div className="flex flex-col gap-3 lg:gap-[clamp(12px,5.5556cqw,80px)]">
          {aboutItems.map((item) => (
            <AboutItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default About
