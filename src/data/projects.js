// Projetos em destaque da seção Projects (design/references/projetos.png).
// Estrutura preparada para 4 projetos (navegação "01 / 04" + 4 dots).
// Apenas o primeiro projeto tem conteúdo real definido pelo mockup — os
// demais são placeholders controlados só para a navegação funcionar
// visualmente, sem inventar conteúdo/URLs reais.
//
// `logo`: ainda não há assets de logo — usa o mesmo placeholder textual
// "Logo" do mockup até que um asset real exista.
// `image`: ainda não há screenshots reais — `null` faz a seção renderizar
// o estado de placeholder ("foto do projeto"); quando o asset existir em
// src/assets/, basta importar e preencher este campo.
// `githubHref` / `demoHref`: `null` enquanto os links reais não forem
// definidos — a seção trata esse estado como "link ainda não disponível",
// sem apontar para URLs falsas.
export const projects = [
  {
    id: 1,
    title: 'EnvelopPack',
    logo: 'Logo',
    description:
      'E-commerce completo para soluções de embalagem, projetado para otimizar conversões com um funil de checkout simplificado em um único arquivo HTML.',
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)'],
    image: null,
    githubHref: null,
    demoHref: null,
  },
  {
    id: 2,
    title: 'Em breve',
    logo: 'Logo',
    description: 'Novo projeto em desenvolvimento — detalhes em breve.',
    technologies: [],
    image: null,
    githubHref: null,
    demoHref: null,
  },
  {
    id: 3,
    title: 'Em breve',
    logo: 'Logo',
    description: 'Novo projeto em desenvolvimento — detalhes em breve.',
    technologies: [],
    image: null,
    githubHref: null,
    demoHref: null,
  },
  {
    id: 4,
    title: 'Em breve',
    logo: 'Logo',
    description: 'Novo projeto em desenvolvimento — detalhes em breve.',
    technologies: [],
    image: null,
    githubHref: null,
    demoHref: null,
  },
]
