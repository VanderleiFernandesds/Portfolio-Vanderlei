import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/LanguageContext'
import folhaPautadaComGrampo from '../assets/folha-pautada-com-grampo.svg'
import folhaPautadaComGrampoDireita from '../assets/folha-pautada-com-grampo-direita.svg'
import folhaPautadaComGrampoEsquerda from '../assets/folha-pautada-com-grampo-esquerda.svg'
import molduraPolaroidAlfinete from '../assets/moldura-polaroid-alfinete.svg'
import minhaFotoPerfil from '../assets/minha-foto-perfil.webp'
import fotoComoEuTrabalho from '../assets/foto-como-eu-trabalho.webp'
import ambienteDesenvolvimento from '../assets/ambiente-desenvolvimento.webp'

/**
 * About
 *
 * Bloco dos 3 itens (folha + foto Polaroid, via <AboutItem /> e
 * src/data/aboutItems.js) foi removido — no lugar dele fica um placeholder
 * (borda tracejada) até o novo conteúdo da seção ser definido.
 */
function About() {
  const { t } = useLanguage()
  return (
    <Section id="sobre" className="overflow-hidden" containerClassName="!px-3 lg:!px-desktop">
      {/* Placeholder — reserva o espaço do conteúdo antigo (3 blocos folha + foto) até definir o novo. */}
      <div
        className=" flex w-full flex-col items-center gap-3  border border-dashed border-primary/30  text-primary/50 "
        style={{ backgroundColor: "#AE9573" }}
      >
        <SectionTitle
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          description={t.about.description}
        />
        {/*
          Placeholder interno — medida de referência 769.07x495.24, agora responsivo:
          largura fluida (w-full, teto no valor de referência) + aspect-ratio no lugar
          de h/w fixos em px, pra manter a proporção em qualquer tela. O deslocamento de
          180px só se aplica a partir do lg (no mobile ele empurraria o conteúdo pra fora
          da tela). Os elementos internos (foto + texto) usam left/width em % — relativo
          à largura do próprio container — em vez de px fixo, então escalam junto.
        */}
        <div className="relative mx-auto flex w-full max-w-[769.07px] aspect-[769.07/495.24] items-center justify-center border border-dashed border-primary/30 pt-10 pb-10 text-primary/50 lg:pt-0 lg:pb-0 lg:left-[180px]">
          <img
            src={folhaPautadaComGrampo}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.65)] lg:drop-shadow-lg"
          />
          769.07 x 495.24
          {/* Placeholder interno — medida de referência 400.87x449.78 (52.13% x 90.79% do pai). Posicionado de forma independente (absolute) pra não empurrar/ser empurrado pelo placeholder 574x397 ao lado — deslocado para a esquerda, saindo do pai, deixando só ~16% (124px de referência) visíveis para dentro. Desativado no mobile. */}
          <div className="absolute top-1/2 left-[-45.51%] z-20 hidden h-[90.79%] w-[52.13%] max-h-[449.78px] max-w-[400.87px] rotate-6 -translate-y-1/2 items-center justify-center border border-dashed border-primary/30 text-primary/50 lg:flex">
            <img
              src={minhaFotoPerfil}
              alt="Vanderlei Fernandes"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <img
              src={molduraPolaroidAlfinete}
              alt=""
              aria-hidden="true"
              className="relative h-full w-full object-contain drop-shadow-lg"
            />
          </div>
          {/* Placeholder interno — medida de referência 574x397 (84.52% do pai, deslocado 11.70%). Título + texto "Quem sou eu" (src/data/aboutItems.js) ativados dentro dele, com fonte/tamanho reduzidos pra caber. */}
          <div className="absolute left-[11.70%] flex w-[84.52%] max-h-full max-w-[650px] flex-col items-start gap-2 overflow-y-auto border border-dashed border-primary/30 text-primary/50">
            <h3 className="sticky top-0 z-10 w-full bg-primary font-handwriting font-bold text-black text-xl sm:text-3xl">
              {t.about.whoAmI.title}
            </h3>
            <p className="font-handwriting  text-base text-black sm:text-[22px]">
              {t.about.whoAmI.p1}
            </p>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.whoAmI.p2}
            </p>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.whoAmI.p3}
            </p>
          </div>
        </div>
        {/* Bloco 2 — mesma composição do bloco 1 (folha + Polaroid + texto), foto espelhada pro lado direito. Conteúdo: "Como eu trabalho" (src/data/aboutItems.js). */}
        <div className="relative mx-auto -mt-1 flex w-full max-w-[769.07px] aspect-[769.07/495.24] items-center justify-center border border-dashed border-primary/30 pt-10 pb-10 text-primary/50 lg:pt-0 lg:pb-0 lg:-left-45 lg:-mt-16">
          <img
            src={folhaPautadaComGrampo}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.65)] lg:hidden"
          />
          {/* No desktop, o grampo dessa folha fica mais pra direita (variante folha-pautada-com-grampo-direita.svg). */}
          <img
            src={folhaPautadaComGrampoDireita}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full object-contain drop-shadow-lg lg:block"
          />
          <div className="absolute top-1/2 right-[-45.51%] z-20 hidden h-[90.79%] w-[52.13%] max-h-[449.78px] max-w-[400.87px] -rotate-6 -translate-y-1/2 items-center justify-center border border-dashed border-primary/30 text-primary/50 lg:flex">
            <img
              src={fotoComoEuTrabalho}
              alt="Vanderlei Fernandes"
              className="absolute inset-0 h-full w-full -translate-y-4 scale-90 object-contain"
            />
            <img
              src={molduraPolaroidAlfinete}
              alt=""
              aria-hidden="true"
              className="relative h-full w-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="absolute left-[11.70%] flex w-[84.52%] max-h-full max-w-[650px] flex-col items-start gap-2 overflow-y-auto border border-dashed border-primary/30 text-primary/50 lg:left-auto lg:right-[11.70%] lg:max-w-[600px]">
            <h3 className="sticky top-0 z-10 w-full bg-primary font-handwriting text-xl font-bold text-black sm:text-3xl">
              {t.about.howIWork.title}
            </h3>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.howIWork.p1}
            </p>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.howIWork.p2}
            </p>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.howIWork.p3}
            </p>
          </div>
        </div>
        {/* Bloco 3 — mesma composição, foto de volta pro lado esquerdo. Conteúdo: "Em constante evolução" (src/data/aboutItems.js). */}
        <div className="mb-3 relative mx-auto -mt-1 flex w-full max-w-[769.07px] aspect-[769.07/495.24] items-center justify-center border border-dashed border-primary/30 pt-10 pb-10 text-primary/50 lg:pt-0 lg:pb-0 lg:left-45 lg:-mt-16">
          <img
            src={folhaPautadaComGrampo}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.65)] lg:hidden"
          />
          {/* No desktop, o grampo dessa folha fica mais pra esquerda (variante folha-pautada-com-grampo-esquerda.svg). */}
          <img
            src={folhaPautadaComGrampoEsquerda}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full object-contain drop-shadow-lg lg:block"
          />
          <div className="absolute top-1/2 left-[-45.51%] z-20 hidden h-[90.79%] w-[52.13%] max-h-[449.78px] max-w-[400.87px] rotate-6 -translate-y-1/2 items-center justify-center border border-dashed border-primary/30 text-primary/50 lg:flex">
            <img
              src={ambienteDesenvolvimento}
              alt="Vanderlei Fernandes"
              className="absolute inset-0 h-full w-full scale-90 -translate-y-4 object-contain"
            />
            <img
              src={molduraPolaroidAlfinete}
              alt=""
              aria-hidden="true"
              className="relative h-full w-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="absolute left-[11.70%] flex w-[84.52%] max-h-full max-w-[650px] flex-col items-start gap-2 overflow-y-auto border border-dashed border-primary/30 text-primary/50">
            <h3 className="sticky top-0 z-10 w-full bg-primary font-handwriting text-xl font-bold text-black sm:text-3xl">
              {t.about.evolving.title}
            </h3>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.evolving.p1}
            </p>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.evolving.p2}
            </p>
            <p className="font-handwriting text-base text-black sm:text-[22px]">
              {t.about.evolving.p3}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default About
