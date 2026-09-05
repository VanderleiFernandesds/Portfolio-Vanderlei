import fotoMinha from '../assets/foto-minha.webp'
import fotoPc from '../assets/foto-pc.webp'

// Conteúdo dos 3 blocos (folha + foto) da seção About, renderizados via
// <AboutItem /> em src/sections/About.jsx. `text` é um array de parágrafos
// e `highlights` lista trechos de `text` para receber o sublinhado de
// destaque (ver AboutItem.jsx).
export const aboutItems = [
  {
    id: 'quem-sou-eu',
    number: '01',
    title: 'Quem sou eu',
    text: [
      'Sou Vanderlei Fernandes, desenvolvedor Full Stack com interesse especial por Front-End e UI/UX.',
      'Gosto de transformar ideias em aplicações bonitas, intuitivas e funcionais, buscando equilibrar design e código.',
    ],
    highlights: ['Full Stack', 'Front-End', 'UI/UX'],
    image: fotoMinha,
    imageAlt: 'Vanderlei Fernandes',
    imagePosition: 'left',
  },
  {
    id: 'como-eu-trabalho',
    number: '02',
    title: 'Como eu trabalho',
    text: [
      'Acredito em código limpo, boas práticas e colaboração.',
      'Planejo, desenvolvo, testo e entrego aplicações escaláveis e que fazem a diferença.',
    ],
    image: fotoPc,
    imageAlt: 'Vanderlei Fernandes',
    imagePosition: 'right',
  },
  {
    id: 'em-constante-evolucao',
    number: '03',
    title: 'Em constante evolução',
    text: [
      'Tecnologia muda rápido e eu junto com ela.',
      'Sempre estudando, explorando novas ferramentas e buscando evoluir com cada projeto.',
    ],
    image: fotoPc,
    imageAlt: 'Vanderlei Fernandes',
    imagePosition: 'left',
  },
]
