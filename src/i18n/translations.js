// Textos traduzíveis do site (PT/EN), centralizados aqui — ver
// src/i18n/LanguageContext.jsx para o Provider que expõe `t` (o objeto
// deste idioma atual) via useLanguage().
//
// Nomes de tecnologias (React, TypeScript, Node.js, PostgreSQL, Tailwind
// CSS, etc.) e nomes próprios de projetos (TaskFlow, DevHub, FinanceX...)
// NÃO entram aqui — continuam como strings simples em src/data/*.js.
//
// Textos por projeto (description/challenges/learnings) ficam em
// `projects.items[id]`, com fallback para o texto em português já
// existente em src/data/projects.js quando a chave não existir.
export const translations = {
  pt: {
    nav: {
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Projetos',
      contact: 'Contato',
      resume: 'Currículo',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      navAriaDesktop: 'Navegação principal',
      navAriaMobile: 'Navegação mobile',
    },
    hero: {
      greeting: 'Olá, eu sou',
      role: 'Desenvolvedor Full-Stack',
      description:
        'Desenvolvedor Full-Stack com foco em front-end, UI/UX e na criação de experiências digitais que unem performance, clareza e atenção aos detalhes.',
      ctaProjects: 'Ver projetos',
      ctaContact: 'Entrar em contato',
      socialLabels: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Enviar e-mail',
      },
      stats: {
        purpose: { title: 'Propósito', description: 'Transformar ideias em soluções' },
        projects: { title: 'Projetos', description: 'Construindo na prática' },
        focus: { title: 'Foco atual', description: 'UI/UX & Performance' },
        evolution: { title: 'Evolução', description: 'IA & novas tecnologias' },
      },
    },
    about: {
      eyebrow: 'Sobre mim',
      title: 'Quem está por trás do código',
      description: 'Construindo aplicações com propósito e qualidade.',
      whoAmI: {
        title: 'Quem sou eu',
        p1: 'Sou Vanderlei Fernandes, desenvolvedor Full Stack com uma afinidade maior por front-end e UI/UX.',
        p2: 'Gosto de transformar ideias em interfaces claras, intuitivas e bem construídas, pensando não só no visual, mas também em como a experiência funciona para quem vai usar.',
        p3: 'Ao mesmo tempo, gosto de entender o que acontece por trás da tela, trabalhando com lógica, APIs, integrações e banco de dados. Para mim, desenvolver é juntar essas partes e transformar uma ideia em algo que realmente funciona.',
      },
      howIWork: {
        title: 'Como eu trabalho',
        p1: 'Antes de começar a escrever código, gosto de entender o que precisa ser resolvido e organizar as ideias antes de sair construindo.',
        p2: 'Durante o desenvolvimento, procuro manter o projeto organizado e o código fácil de entender. Também vou testando e revisando ao longo do processo, porque muitas vezes uma solução melhora bastante quando você começa a usar e observar os detalhes.',
        p3: 'E dificilmente considero algo pronto só porque está funcionando. Normalmente volto para ajustar uma interação, melhorar o visual, simplificar alguma parte ou deixar o código mais organizado.',
      },
      evolving: {
        title: 'Em constante evolução',
        p1: 'Quanto mais estudo e desenvolvo projetos, mais percebo o quanto ainda existe para aprender, e essa é uma das coisas que mais me mantém interessado na área.',
        p2: 'Hoje venho aprofundando meus conhecimentos em Front-End, Back-End, APIs, bancos de dados, arquitetura e Inteligência Artificial, tentando sempre colocar o que aprendo em prática nos meus próprios projetos.',
        p3: 'Quero continuar evoluindo como desenvolvedor Full Stack, ganhar experiência em projetos reais, aprender com outras pessoas da área e participar da construção de produtos que realmente sejam usados.',
      },
    },
    skills: {
      eyebrow: 'Habilidades',
      titlePrefix: 'Tecnologias',
      titleAmp: '&',
      titleSuffix: 'Ferramentas',
      description:
        'Principais tecnologias que utilizo para transformar ideias em soluções digitais de qualidade.',
      categories: {
        frontend: {
          title: 'Front-end',
          description: 'Desenvolvimento de interfaces modernas, responsivas e acessíveis.',
          note: 'Responsive Design',
        },
        backend: {
          title: 'Back-end',
          description: 'Construção de APIs, regras de negócio e integração com sistemas.',
          note: 'Autenticação',
        },
        database: {
          title: 'Banco de Dados',
          description: 'Modelagem, consultas e gerenciamento de dados relacionais.',
          note: 'Modelagem de Dados',
        },
        tools: {
          title: 'Ferramentas',
          description: 'Ferramentas que utilizo no dia a dia para desenvolver e entregar soluções.',
        },
        cloud: {
          title: 'Cloud & Deploy',
          description: 'Serviços de nuvem e plataformas para deploy e hospedagem.',
        },
        concepts: {
          title: 'Conceitos',
          description: 'Conceitos e boas práticas que aplico em todos os projetos.',
          items: [
            'Clean Code',
            'Arquitetura de Software',
            'Consumo de APIs',
            'Lógica de Programação',
            'Estruturas de Dados',
            'Versionamento com Git',
          ],
        },
      },
      softSkills: {
        title: 'Soft Skills',
        description: 'Habilidades comportamentais que me ajudam a colaborar e entregar resultados.',
        items: [
          'Resolução de Problemas',
          'Aprendizado Contínuo',
          'Trabalho em Equipe',
          'Comunicação Clara',
          'Organização e Disciplina',
          'Proatividade',
        ],
      },
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'O que eu já construí',
      description: 'Uma seleção de projetos que mostram como eu penso e desenvolvo soluções.',
      prevAria: 'Projeto anterior',
      nextAria: 'Próximo projeto',
      viewDetails: 'Ver detalhes',
      viewProject: 'Ver projeto',
      github: 'GitHub',
      linkUnavailable: 'Link ainda não disponível',
      items: {
        1: {
          description:
            'E-commerce completo para soluções de embalagem, com catálogo por categoria e um funil de checkout simplificado.',
          challenges:
            'Modelar um catálogo com categorias e variações de produto sem deixar o checkout lento, mantendo o funil simples mesmo com regras de frete diferentes por região.',
          learnings:
            'Aprofundei a organização de estado no carrinho de compras e a importância de validar cada etapa do checkout isoladamente para reduzir abandono.',
        },
        2: {
          description:
            'Aplicação de gerenciamento de tarefas e produtividade, com quadros arrastáveis e acompanhamento de progresso em tempo real.',
          challenges:
            'Implementar drag and drop entre quadros com atualização em tempo real sem gerar conflitos de estado quando vários usuários movem tarefas ao mesmo tempo.',
          learnings:
            'Ganhei experiência prática com sincronização otimista de UI e reconciliação de estado local com o servidor via WebSockets.',
        },
        3: {
          description:
            'Dashboard financeiro para acompanhar receitas, despesas e indicadores de performance com gráficos interativos.',
          challenges:
            'Exibir grandes volumes de dados financeiros em gráficos interativos sem comprometer a performance, mantendo os indicadores atualizados em tempo real.',
          learnings:
            'Aprendi a otimizar renderização de gráficos com memoização e a estruturar agregações de dados no backend em vez de processar tudo no cliente.',
        },
        4: {
          description:
            'Plataforma para organização de projetos, equipes e atividades de desenvolvimento em um só lugar.',
          challenges:
            'Unificar projetos, equipes e atividades em uma única plataforma sem sobrecarregar a interface, mantendo permissões de acesso consistentes entre times.',
          learnings:
            'Evoluí meu entendimento sobre modelagem de permissões (RBAC) e sobre como estruturar uma API REST que escale para múltiplos módulos.',
        },
        5: {
          description:
            'Landing page para consultório odontológico completo, com especialidades em ortodontia, dentística, endodontia, próteses, implantodontia e estética avançada.',
          challenges:
            'Apresentar várias especialidades odontológicas em uma única landing page sem poluir a navegação, guiando o visitante até o agendamento de forma clara.',
          learnings:
            'Reforcei técnicas de hierarquia visual e copywriting para conversão, além de práticas de acessibilidade em formulários de contato.',
        },
      },
    },
    contact: {
      eyebrow: 'Contato',
      titleLine1: 'Tem uma ideia?',
      titleLine2: 'Vamos transformá-la em realidade.',
      channels: {
        email: { title: 'E-mail' },
        whatsapp: { title: 'WhatsApp', badge: 'Mais rápido' },
        linkedin: { title: 'LinkedIn' },
        github: { title: 'GitHub' },
        location: { title: 'Localização', value: 'Adicionar localização' },
      },
      openChannel: 'Abrir',
    },
    modal: {
      detailsLabel: 'Detalhes do Projeto',
      closeAria: 'Fechar detalhes do projeto',
      galleryAria: 'Capturas de tela do projeto',
      prevImageAria: 'Imagem anterior',
      nextImageAria: 'Próxima imagem',
      thumbnailAria: 'Ver captura',
      screenshotAlt: 'Captura de tela do projeto',
      thumbnailAlt: 'Miniatura',
      of: 'do projeto',
      about: 'Sobre o Projeto',
      challenges: 'Desafios',
      learnings: 'Aprendizado',
      stack: 'Stack',
      viewProject: 'Ver projeto',
      github: 'GitHub',
      linkUnavailable: 'Link ainda não disponível',
    },
    footer: {
      copyright: 'Desenvolvido por Vanderlei Fernandes',
      madeWith: 'Feito com',
      with: 'React + Tailwind CSS.',
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      resume: 'Resume',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      navAriaDesktop: 'Main navigation',
      navAriaMobile: 'Mobile navigation',
    },
    hero: {
      greeting: "Hi, I'm",
      role: 'Full-Stack Developer',
      description:
        'Full-Stack Developer focused on front-end, UI/UX, and building digital experiences that bring together performance, clarity, and attention to detail.',
      ctaProjects: 'View projects',
      ctaContact: 'Get in touch',
      socialLabels: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Send email',
      },
      stats: {
        purpose: { title: 'Purpose', description: 'Turning ideas into solutions' },
        projects: { title: 'Projects', description: 'Building in practice' },
        focus: { title: 'Current focus', description: 'UI/UX & Performance' },
        evolution: { title: 'Growth', description: 'AI & new technologies' },
      },
    },
    about: {
      eyebrow: 'About me',
      title: "Who's behind the code",
      description: 'Building applications with purpose and quality.',
      whoAmI: {
        title: 'Who I am',
        p1: "I'm Vanderlei Fernandes, a Full Stack developer who enjoys turning ideas into functional, intuitive and well-built digital experiences.",
        p2: "I have a special interest in the union between development and design. To me, a good application doesn't just need to work: it should also be easy to use, responsive and visually pleasant.",
        p3: 'I like understanding how every part of a project connects, from the interface the user sees to the logic, APIs and data that make everything work behind the scenes.',
      },
      howIWork: {
        title: 'How I work',
        p1: 'Before writing any code, I like to understand the problem, organize ideas and think about the best experience for whoever will use the product.',
        p2: 'During development, I aim to work with clean code, organization and best practices, building each feature clearly while also thinking about maintenance and evolution.',
        p3: "I like testing, reviewing and improving what I build. To me, a project doesn't end when it simply works — there's always room to improve usability, performance and interface details.",
      },
      evolving: {
        title: 'Constantly evolving',
        p1: "One of the things I like most about technology is knowing there's always something new to learn.",
        p2: 'I keep deepening my knowledge in Front-End, Back-End, APIs, databases, architecture and Artificial Intelligence, while putting what I learn into practice through projects.',
        p3: 'My goal is to keep evolving as a Full Stack developer, take on bigger challenges and join real projects where I can learn, collaborate and build solutions that create value.',
      },
    },
    skills: {
      eyebrow: 'Skills',
      titlePrefix: 'Technologies',
      titleAmp: '&',
      titleSuffix: 'Tools',
      description:
        'Main technologies I use to turn ideas into quality digital solutions.',
      categories: {
        frontend: {
          title: 'Front-end',
          description: 'Building modern, responsive and accessible interfaces.',
          note: 'Responsive Design',
        },
        backend: {
          title: 'Back-end',
          description: 'Building APIs, business rules and system integrations.',
          note: 'Authentication',
        },
        database: {
          title: 'Database',
          description: 'Modeling, querying and managing relational data.',
          note: 'Data Modeling',
        },
        tools: {
          title: 'Tools',
          description: 'Tools I use day to day to build and ship solutions.',
        },
        cloud: {
          title: 'Cloud & Deploy',
          description: 'Cloud services and platforms for deployment and hosting.',
        },
        concepts: {
          title: 'Concepts',
          description: 'Concepts and best practices I apply in every project.',
          items: [
            'Clean Code',
            'Software Architecture',
            'API Consumption',
            'Programming Logic',
            'Data Structures',
            'Version Control with Git',
          ],
        },
      },
      softSkills: {
        title: 'Soft Skills',
        description: 'Behavioral skills that help me collaborate and deliver results.',
        items: [
          'Problem Solving',
          'Continuous Learning',
          'Teamwork',
          'Clear Communication',
          'Organization and Discipline',
          'Proactivity',
        ],
      },
    },
    projects: {
      eyebrow: 'Projects',
      title: "What I've built",
      description: 'A selection of projects that show how I think and build solutions.',
      prevAria: 'Previous project',
      nextAria: 'Next project',
      viewDetails: 'View details',
      viewProject: 'View project',
      github: 'GitHub',
      linkUnavailable: 'Link not available yet',
      items: {
        1: {
          description:
            'Full e-commerce for packaging solutions, with a category catalog and a simplified checkout funnel.',
          challenges:
            'Modeling a catalog with categories and product variations without slowing down checkout, keeping the funnel simple even with different shipping rules per region.',
          learnings:
            'Deepened my understanding of cart state management and the importance of validating each checkout step individually to reduce abandonment.',
        },
        2: {
          description:
            'Task management and productivity app, with drag-and-drop boards and real-time progress tracking.',
          challenges:
            'Implementing drag and drop between boards with real-time updates without creating state conflicts when multiple users move tasks at the same time.',
          learnings:
            'Gained hands-on experience with optimistic UI syncing and reconciling local state with the server via WebSockets.',
        },
        3: {
          description:
            'Financial dashboard to track revenue, expenses and performance indicators with interactive charts.',
          challenges:
            'Displaying large volumes of financial data in interactive charts without hurting performance, keeping indicators updated in real time.',
          learnings:
            'Learned to optimize chart rendering with memoization and to structure data aggregations on the backend instead of processing everything on the client.',
        },
        4: {
          description:
            'Platform to organize projects, teams and development activities in one place.',
          challenges:
            'Unifying projects, teams and activities into a single platform without overloading the interface, keeping access permissions consistent across teams.',
          learnings:
            'Grew my understanding of permission modeling (RBAC) and how to structure a REST API that scales to multiple modules.',
        },
        5: {
          description:
            'Landing page for a full dental practice, covering orthodontics, restorative dentistry, endodontics, prosthetics, implantology and advanced aesthetics.',
          challenges:
            'Presenting several dental specialties on a single landing page without cluttering navigation, clearly guiding visitors toward booking.',
          learnings:
            'Reinforced visual hierarchy and conversion copywriting techniques, plus accessibility practices for contact forms.',
        },
      },
    },
    contact: {
      eyebrow: 'Contact',
      titleLine1: 'Have an idea?',
      titleLine2: "Let's turn it into reality.",
      channels: {
        email: { title: 'Email' },
        whatsapp: { title: 'WhatsApp', badge: 'Fastest' },
        linkedin: { title: 'LinkedIn' },
        github: { title: 'GitHub' },
        location: { title: 'Location', value: 'Add location' },
      },
      openChannel: 'Open',
    },
    modal: {
      detailsLabel: 'Project Details',
      closeAria: 'Close project details',
      galleryAria: 'Project screenshots',
      prevImageAria: 'Previous image',
      nextImageAria: 'Next image',
      thumbnailAria: 'View screenshot',
      screenshotAlt: 'Screenshot of the project',
      thumbnailAlt: 'Thumbnail',
      of: 'of project',
      about: 'About the Project',
      challenges: 'Challenges',
      learnings: 'What I Learned',
      stack: 'Stack',
      viewProject: 'View project',
      github: 'GitHub',
      linkUnavailable: 'Link not available yet',
    },
    footer: {
      copyright: 'Developed by Vanderlei Fernandes',
      madeWith: 'Made with',
      with: 'React + Tailwind CSS.',
    },
  },
}
