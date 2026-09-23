# Portfólio — Vanderlei Fernandes

Portfólio pessoal de Vanderlei Fernandes, desenvolvedor Full Stack.
Landing page única com Hero, Sobre, Skills, Projetos e Contato, com
identidade visual de caderno/papel (texturas, molduras, carimbos) e
suporte a Português e Inglês.

## Tecnologias

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [react-icons](https://react-icons.github.io/react-icons/)
- [Oxlint](https://oxc.rs/) (lint)

## Como instalar

```bash
npm install
```

## Como rodar em desenvolvimento

```bash
npm run dev
```

Abre o servidor de desenvolvimento do Vite (com hot reload) em
`http://localhost:5173`.

## Como fazer build de produção

```bash
npm run build
```

Gera os arquivos otimizados na pasta `dist/`.

## Como rodar o preview do build de produção

```bash
npm run preview
```

Serve o conteúdo de `dist/` localmente (em `http://localhost:4173`),
para testar o build de produção antes de publicar — é o ambiente
correto para medir performance real (Lighthouse etc.), diferente do
servidor de desenvolvimento.

## Estrutura de pastas

```
src/
  assets/       imagens, ícones, fontes e texturas
    icons/      ícones organizados por uso (ui, portfolio, stack-mono)
    font/       fontes self-hosted (woff2)
    projects/   screenshots dos projetos do portfólio
    photos/     fotos pessoais e de ambiente
    paper/      texturas e recortes de papel/caderno
    decorative/ logos, selos, molduras e outros elementos decorativos
  components/   componentes React reutilizáveis
    layout/     Navbar, Footer, Container, Section, SectionTitle
    ui/         botões, links e outros elementos de interface
    projects/   componentes do carrossel e modal de projetos
    skills/     componentes da seção de habilidades
  sections/     uma seção por arquivo (Hero, About, Skills, Projects, Contact)
  data/         conteúdo estruturado (projetos, skills, canais de contato...)
  i18n/         contexto de idioma + dicionário de traduções PT/EN
  index.css     design tokens, @font-face, animações e utilitários globais
  main.jsx      ponto de entrada da aplicação
public/         favicon, robots.txt e assets referenciados via URL direta
design/         referências visuais e documentação de design tokens (não versionado)
```

## Principais funcionalidades

- Seções: Hero, Sobre, Skills, Projetos (carrossel) e Contato
- Modal de detalhes de projeto com galeria de screenshots
- Troca de idioma Português/Inglês, com detecção automática pelo
  navegador e persistência da escolha
- Identidade visual customizada (texturas de papel, molduras,
  animações) construída inteiramente com Tailwind CSS + CSS custom
  properties
- Favicon SVG com fallback ICO, meta tags de SEO (Open Graph, Twitter
  Card) e `robots.txt`

## Internacionalização (i18n)

O idioma é controlado por `src/i18n/LanguageContext.jsx`: detecta o
idioma do navegador na primeira visita, persiste a escolha do usuário
em `localStorage` e mantém `<html lang>` sincronizado. Todo o texto
visível do site vem de `src/i18n/translations.js` (objeto único com
as chaves `pt` e `en`) — não há texto de interface hardcoded fora
desse arquivo.

## Autor

**Vanderlei Fernandes** — Desenvolvedor Full Stack
