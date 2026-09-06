import fotoMinha from '../assets/foto-minha.webp'
import fotoPc from '../assets/foto-pc.webp'

// Conteúdo dos 3 blocos (folha + foto) da seção About, renderizados via
// <AboutItem /> em src/sections/About.jsx. `text` é um array de parágrafos
// e `highlights` lista trechos de `text` para receber o sublinhado de
// destaque (ver AboutItem.jsx).
export const aboutItems = [
  {
    id: "quem-sou-eu",
    number: "01",
    title: "Quem sou eu",
    text: [
      "Sou Vanderlei Fernandes, desenvolvedor Full Stack que gosta de transformar ideias em experiências digitais funcionais, intuitivas e bem construídas.",

"Tenho um interesse especial pela união entre desenvolvimento e design. Para mim, uma boa aplicação não precisa apenas funcionar: ela também deve ser fácil de usar, responsiva e agradável visualmente.",

"Gosto de entender como cada parte de um projeto se conecta, desde a interface que o usuário vê até a lógica, APIs e dados que fazem tudo funcionar por trás.",
    ],
    highlights: ["Full Stack", "Front-End", "UI/UX"],
    image: fotoMinha,
    imageAlt: "Vanderlei Fernandes",
    imagePosition: "left",
  },
  {
    id: "como-eu-trabalho",
    number: "02",
    title: "Como eu trabalho",
    text: [
      "Antes de começar a escrever código, gosto de entender o problema, organizar as ideias e pensar na melhor experiência para quem vai utilizar o produto.",

"Durante o desenvolvimento, procuro trabalhar com código limpo, organização e boas práticas, construindo cada funcionalidade de forma clara e pensando também em manutenção e evolução.",

"Gosto de testar, revisar e melhorar o que desenvolvo. Para mim, um projeto não termina quando simplesmente funciona — sempre existe espaço para aprimorar usabilidade, desempenho e detalhes da interface.",
    ],
    image: fotoPc,
    imageAlt: "Vanderlei Fernandes",
    imagePosition: "right",
  },
  {
    id: "em-constante-evolucao",
    number: "03",
    title: "Em constante evolução",
    text: [
      "Uma das coisas que mais gosto em tecnologia é saber que sempre existe algo novo para aprender.",

      "Estou constantemente aprofundando meus conhecimentos em Front-End, Back-End, APIs, bancos de dados, arquitetura e Inteligência Artificial, enquanto coloco o aprendizado em prática através de projetos.",

      "Meu objetivo é continuar evoluindo como desenvolvedor Full Stack, enfrentar desafios cada vez maiores e participar de projetos reais onde eu possa aprender, colaborar e construir soluções que gerem valor.",
    ],
    image: fotoPc,
    imageAlt: "Vanderlei Fernandes",
    imagePosition: "left",
  },
];
