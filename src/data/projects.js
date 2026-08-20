import envelopPackImg from '../assets/projects/envelopack.webp'
import taskFlowImg from '../assets/projects/taskflow.webp'
import financeXImg from '../assets/projects/financex.webp'
import devHubImg from '../assets/projects/devhub.webp'
import odontoBramImg from '../assets/projects/odonto-bram.webp'

// Projetos em destaque da seção Projects (design/references/projetos.png).
// 4 projetos fictícios — apenas para demonstrar a seção com o carrossel em
// pilha completo (nenhum deles existe de verdade).
//
// `logo`: iniciais usadas no selo da coluna esquerda (não há asset de logo).
// `image`: screenshot da landing page do projeto (src/assets/projects/),
// exibida na coluna de fotos do ProjectModal.
// `preview`: identifica o mockup ilustrado renderizado em <ProjectMockup>
// (src/components/ProjectMockup.jsx) — construído só com elementos/tokens
// do projeto, sem imagens ou capturas de tela reais.
// `githubHref` / `demoHref`: `null` enquanto os links reais não forem
// definidos — a seção trata esse estado como "link ainda não disponível",
// sem apontar para URLs falsas.
// `challenges` / `learnings`: textos fictícios (mesmo caráter ilustrativo
// dos projetos) exibidos nas seções "Desafios" e "Aprendizado" do
// ProjectModal (src/components/ProjectModal.jsx).
export const projects = [
  {
    id: 1,
    title: 'EnvelopPack',
    logo: 'EP',
    description:
      'E-commerce completo para soluções de embalagem, com catálogo por categoria e um funil de checkout simplificado.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    preview: 'ecommerce',
    image: envelopPackImg,
    challenges:
      'Modelar um catálogo com categorias e variações de produto sem deixar o checkout lento, mantendo o funil simples mesmo com regras de frete diferentes por região.',
    learnings:
      'Aprofundei a organização de estado no carrinho de compras e a importância de validar cada etapa do checkout isoladamente para reduzir abandono.',
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
    image: taskFlowImg,
    challenges:
      'Implementar drag and drop entre quadros com atualização em tempo real sem gerar conflitos de estado quando vários usuários movem tarefas ao mesmo tempo.',
    learnings:
      'Ganhei experiência prática com sincronização otimista de UI e reconciliação de estado local com o servidor via WebSockets.',
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
    image: financeXImg,
    challenges:
      'Exibir grandes volumes de dados financeiros em gráficos interativos sem comprometer a performance, mantendo os indicadores atualizados em tempo real.',
    learnings:
      'Aprendi a otimizar renderização de gráficos com memoização e a estruturar agregações de dados no backend em vez de processar tudo no cliente.',
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
    image: devHubImg,
    challenges:
      'Unificar projetos, equipes e atividades em uma única plataforma sem sobrecarregar a interface, mantendo permissões de acesso consistentes entre times.',
    learnings:
      'Evoluí meu entendimento sobre modelagem de permissões (RBAC) e sobre como estruturar uma API REST que escale para múltiplos módulos.',
    githubHref: null,
    demoHref: null,
  },
  {
    id: 5,
    title: 'Odonto Bram',
    logo: 'OB',
    description:
      'Landing page para consultório odontológico completo, com especialidades em ortodontia, dentística, endodontia, próteses, implantodontia e estética avançada.',
    technologies: ['React', 'Tailwind CSS'],
    preview: 'dental',
    image: odontoBramImg,
    challenges:
      'Apresentar várias especialidades odontológicas em uma única landing page sem poluir a navegação, guiando o visitante até o agendamento de forma clara.',
    learnings:
      'Reforcei técnicas de hierarquia visual e copywriting para conversão, além de práticas de acessibilidade em formulários de contato.',
    githubHref: null,
    demoHref: null,
  },
]
