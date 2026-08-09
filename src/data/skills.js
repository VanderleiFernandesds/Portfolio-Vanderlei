// Seção Skills (design/references/skill.png).
// `icon` / `note.icon` / tags de concepts e soft skills referenciam ícones
// próprios de src/components/icons.jsx. `technologies[].Icon` referencia
// componentes reais do pacote `react-icons` (logos de marca).
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiVercel,
  SiNetlify,
} from 'react-icons/si'
import { DiVisualstudio } from 'react-icons/di'
import { FaAws } from 'react-icons/fa'

// Cards de categoria (grid 3x2). `category` referencia o token de cor
// `Category *` (design/tokens.md) usado exclusivamente no badge do ícone.
export const skillCategories = [
  {
    category: 'frontend',
    icon: 'code',
    title: 'Front-end',
    description: 'Desenvolvimento de interfaces modernas, responsivas e acessíveis.',
    technologies: [
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'React', Icon: SiReact },
    ],
    note: { icon: 'device', label: 'Responsive Design' },
  },
  {
    category: 'backend',
    icon: 'server',
    title: 'Back-end',
    description: 'Construção de APIs, regras de negócio e integração com sistemas.',
    technologies: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express', Icon: SiExpress },
      { name: 'JWT', Icon: SiJsonwebtokens },
    ],
    note: { icon: 'lock', label: 'Autenticação' },
  },
  {
    category: 'database',
    icon: 'database',
    title: 'Banco de Dados',
    description: 'Modelagem, consultas e gerenciamento de dados relacionais.',
    technologies: [
      { name: 'MySQL', Icon: SiMysql },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'MongoDB', Icon: SiMongodb },
    ],
    note: { icon: 'layers', label: 'Modelagem de Dados' },
  },
  {
    category: 'tools',
    icon: 'wrench',
    title: 'Ferramentas',
    description: 'Ferramentas que utilizo no dia a dia para desenvolver e entregar soluções.',
    technologies: [
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'VS Code', Icon: DiVisualstudio },
      { name: 'Postman', Icon: SiPostman },
      { name: 'Figma', Icon: SiFigma },
    ],
  },
  {
    category: 'cloud',
    icon: 'cloud',
    title: 'Cloud & Deploy',
    description: 'Serviços de nuvem e plataformas para deploy e hospedagem.',
    technologies: [
      { name: 'AWS', Icon: FaAws },
      { name: 'Vercel', Icon: SiVercel },
      { name: 'Netlify', Icon: SiNetlify },
    ],
  },
  {
    category: 'concepts',
    icon: 'lightbulb',
    title: 'Conceitos',
    description: 'Conceitos e boas práticas que aplico em todos os projetos.',
    concepts: [
      { label: 'Clean Code', icon: 'code' },
      { label: 'Arquitetura de Software', icon: 'layers' },
      { label: 'Consumo de APIs', icon: 'cloud' },
      { label: 'Lógica de Programação', icon: 'code' },
      { label: 'Estruturas de Dados', icon: 'database' },
      { label: 'Versionamento com Git', icon: 'gitBranch' },
    ],
  },
]

// Card full-width abaixo do grid.
export const softSkills = {
  category: 'softSkills',
  icon: 'user',
  title: 'Soft Skills',
  description:
    'Habilidades comportamentais que me ajudam a colaborar e entregar resultados.',
  items: [
    { label: 'Resolução de Problemas', icon: 'target' },
    { label: 'Aprendizado Contínuo', icon: 'refresh' },
    { label: 'Trabalho em Equipe', icon: 'user' },
    { label: 'Comunicação Clara', icon: 'mail' },
    { label: 'Organização e Disciplina', icon: 'folder' },
    { label: 'Proatividade', icon: 'zap' },
  ],
}
