// Projetos em destaque da seção Projects (design/references/projetos.png).
// 4 projetos fictícios — apenas para demonstrar a seção com o carrossel em
// pilha completo (nenhum deles existe de verdade).
//
// `logo`: iniciais usadas no selo da coluna esquerda (não há asset de logo).
// `preview`: identifica o mockup ilustrado renderizado em <ProjectMockup>
// (src/components/ProjectMockup.jsx) — construído só com elementos/tokens
// do projeto, sem imagens ou capturas de tela reais.
// `githubHref` / `demoHref`: `null` enquanto os links reais não forem
// definidos — a seção trata esse estado como "link ainda não disponível",
// sem apontar para URLs falsas.
export const projects = [
  {
    id: 1,
    title: 'EnvelopPack',
    logo: 'EP',
    description:
      'E-commerce completo para soluções de embalagem, com catálogo por categoria e um funil de checkout simplificado.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    preview: 'ecommerce',
    githubHref: null,
    demoHref: null,
  },
  {
    id: 2,
    title: 'TaskFlow',
    logo: 'TF',
    description:
      'Aplicação de gerenciamento de tarefas e produtividade, com quadros arrastáveis e acompanhamento de progresso em tempo real.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    preview: 'tasks',
    githubHref: null,
    demoHref: null,
  },
  {
    id: 3,
    title: 'FinanceX',
    logo: 'FX',
    description:
      'Dashboard financeiro para acompanhar receitas, despesas e indicadores de performance com gráficos interativos.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    preview: 'finance',
    githubHref: null,
    demoHref: null,
  },
  {
    id: 4,
    title: 'DevHub',
    logo: 'DH',
    description:
      'Plataforma para organização de projetos, equipes e atividades de desenvolvimento em um só lugar.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    preview: 'devhub',
    githubHref: null,
    demoHref: null,
  },
]
