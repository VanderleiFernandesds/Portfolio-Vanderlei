// Faixa de tecnologias exibida na Hero (design/references/hero.png).
// `Icon` referencia o componente de marca real do pacote `react-icons`,
// mesmo padrão utilizado em `src/data/skills.js`.
import { SiReact, SiTypescript, SiTailwindcss, SiJavascript } from 'react-icons/si'

export const technologies = [
  { name: 'react', label: 'React', Icon: SiReact },
  { name: 'typescript', label: 'TypeScript', Icon: SiTypescript },
  { name: 'tailwind', label: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'javascript', label: 'JavaScript', Icon: SiJavascript },
]
