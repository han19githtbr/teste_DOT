# 🎓 DOT Digital Group — Teste Técnico Frontend (EdTech)

## 🚀 Como Rodar

Não é necessário instalar dependências. O projeto usa apenas HTML, CSS e JavaScript Vanilla.

### Opção 1 — Abrir diretamente no navegador
```bash
# Basta abrir o arquivo index.html no navegador
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Opção 2 — Servidor local
```bash
# Com Python 3
python3 -m http.server 3000

# Com Node.js (npx)
npx serve .
```

### Opção 3 — Abrir com Live Server
# Com VS Code: instale a extensão "Live Server" e clique em "Open with Live Server"

Acesse: `http://localhost:3000`
```


---

## 📁 Estrutura do Projeto

```
edtech-challenge/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos globais (design system + componentes)
├── js/
│   └── main.js         # Lógica JavaScript de todos os componentes
└── README.md           # Este arquivo
```

---

## 🛠 Decisões Técnicas

### Stack
- **HTML5 semântico** — uso de elementos como `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<fieldset>`, `<details>`/`<summary>`
- **CSS puro** — sem frameworks; design system via CSS Custom Properties (variáveis)
- **JavaScript Vanilla** — sem bibliotecas ou frameworks; módulos organizados por responsabilidade
- Fontes via **Google Fonts** (Barlow) — única dependência externa, CDN

### Componentes e implementação

| Componente | Técnica |
|---|---|
| Player de vídeo | Embed YouTube via `<iframe>` responsivo (padding-bottom 56.25%) |
| Imagem lateral | CSS Grid `1fr 1fr`, colapsa em mobile |
| Slider | JS vanilla — gerência de índice ativo, dots gerados dinamicamente |
| Player de áudio | `<audio>` nativo + UI customizada em JS (play/pause, progresso, mute) |
| Recurso de destaque | Bloco semântico `role="note"` com estilo visual destacado |
| Cards interativos | Classe CSS `is-open` alternada pelo JS (toggle pattern) |
| Atividade discursiva | JS: fluxo de estados (editando → respondido → alterando) |
| Atividade objetiva | JS: checkbox customizado + detecção de resposta correta |
| FAQ / Accordion | `<details>`/`<summary>` **nativo** do HTML5 — sem JS adicional |
| Persistência | `sessionStorage` — restaura texto, feedback e estado dos botões |

### Acessibilidade (a11y)
- HTML semântico em todos os componentes
- Labels associados corretamente (`for`/`id`, `aria-label`, `aria-labelledby`)
- Navegação por teclado funcional (Tab, Enter, Espaço)
- Estados de foco visíveis (`:focus-visible` com outline verde)
- Atributos ARIA (`aria-expanded`, `aria-live`, `aria-checked`, `role`, etc.)
- Classe `.sr-only` para textos visíveis apenas a leitores de tela
- Contraste adequado entre texto e fundo (ratio ≥ 4.5:1)

### Responsividade
- Mobile-first com breakpoints em `768px` e `480px`
- Grid de duas colunas colapsa para uma em mobile
- Hero empilha verticalmente
- Slider com altura adaptável
- Áudio player com `flex-wrap`
- Imagem lateral empilha verticalmente

### Padrões de código
- **Clean Code**: funções pequenas, nomes descritivos, sem comentários desnecessários
- **Separação de responsabilidades**: cada módulo JS faz apenas uma coisa
- **CSS Custom Properties** como design system (cores, espaçamentos, transições)
- **Comentários explicativos** em todos os trechos relevantes
- **Módulos independentes**: cada componente pode ser inicializado isoladamente

---

## ✨ Diferenciais implementados

- **Animações CSS** — `fadeIn` e `slideDown` nos feedbacks das atividades
- **Microinterações** — hover nos botões, dots do slider, opções do quiz
- **Backdrop blur** no header sticky (efeito glass moderno)
- **Mockup SVG** animado na hero section (gráfico de linha)
- **Persistência completa** — restaura texto, feedback exibido, estado dos botões e opção selecionada
- **FAQ nativo** — usa `<details>`/`<summary>` do HTML5, sem JavaScript
- **Foco gerenciado nos cards** — o foco é movido corretamente entre Abrir/Fechar

---

## 🎯 Funcionalidades detalhadas

### 1. Player de Vídeo
- Embed responsivo do YouTube via `<iframe>`
- Botão de play customizado com preview lazy-loaded
- Padrão de aspecto 16:9 mantido em todos os tamanhos
- Integração de microdata para SEO

### 2. Slider/Carrossel
- Navegação com botões Previous/Next
- Indicadores de slide (dots) gerados dinamicamente
- Suporte a teclado (Arrow Left/Right)
- Suporte a gesto touch (swipe horizontal)
- Estado desabilitado de botões nas extremidades

### 3. Player de Áudio
- **Modo Howler.js** (se disponível): controle avançado com Howl library
- **Modo Fallback** (sem Howler): `<audio>` HTML5 nativo
- Controles: play/pause, barra de progresso, volume, mute
- Indicador de tempo: `[minutos:segundos atual] / [total]`
- Painel de configurações expansível (volume slider)
- Suporte a teclado: Arrow Keys para avançar/retroceder 5% da duração

### 4. Cards Interativos (Flip Cards)
- Animação de flip ao abrir/fechar
- Botões nativos com estados `open` e `closed`
- Suporte a ESC para fechar
- Gerenciamento automático de foco
- Classe `is-open` para controle visual

### 5. Atividade Discursiva (Essay)
- Textarea com contador de caracteres
- Estados: **Editando** → **Respondido** → **Alterando**
- Botão "Responder" ativa/desativa conforme há texto
- Feedback mostra o texto digitado pelo usuário
- Botão "Alterar" volta ao modo edição
- Persistência via `sessionStorage` (chaves: `ESSAY_TEXT`, `ESSAY_ANSWERED`)

### 6. Atividade Objetiva (Quiz)
- Checkbox nativo sincronizado com UI visual
- Detecção automática de resposta correta (via `data-correct="true"`)
- Feedback diferenciado: **Correto** (verde) vs **Incorreto** (vermelho)
- Mostrar resposta correta ao final
- Botão "Tentar Novamente" habilita nova tentativa
- Persistência via `sessionStorage` (chaves: `QUIZ_SELECTED`, `QUIZ_ANSWERED`)

### 7. FAQ / Accordion
- Elemento nativo HTML5 `<details>`/`<summary>`
- Comportamento automático: abre uno quando outro é aberto
- Sem necessidade de JavaScript customizado (apenas inicialização de toggle)

### 8. Scroll Reveal
- Animação de entrada ao scroll (fade-in + slide-up)
- Threshold de visibilidade: 7%
- Aplicado a: blocos de seção, sliders, cards, atividades, FAQ, players
- Utiliza `IntersectionObserver` API nativa

### 9. Design System
- **Cores**: Background escuro, superfícies cinzentas, verde destacado (#7fc31c), vermelho de erro
- **Tipografia**: Barlow (Google Fonts) — pesos 400, 600, 700, 800, 900
- **Espaçamento**: Escala `--gap-xs` a `--gap-xxl` (4px a 80px)
- **Raios**: `--radius-sm` a `--radius-xl` (4px a 16px)
- **Transições**: `--transition-fast` (150ms), `--transition-normal` (250ms), `--transition-slow` (400ms)

---

## 💾 Armazenamento (sessionStorage)

A aplicação persiste o seguinte via `sessionStorage`:

| Chave | Valor | Uso |
|---|---|---|
| `edtech_essay_text` | String | Texto digitado no campo de atividade discursiva |
| `edtech_essay_answered` | Boolean | Estado se atividade discursiva foi respondida |
| `edtech_quiz_selected` | Number | Índice da opção selecionada no quiz |
| `edtech_quiz_answered` | Boolean | Estado se quiz foi respondido |

Os dados são restaurados automaticamente ao carregar a página (dentro da mesma sessão).

---

## 🚀 Como começar a desenvolver

### Adicionar novo slider
```html
<div class="slider">
  <div class="slider__slides">
    <article class="slider__slide">Conteúdo 1</article>
    <article class="slider__slide">Conteúdo 2</article>
  </div>
  <div class="slider__dots"></div>
  <button class="slider__btn slider__btn--prev">Anterior</button>
  <button class="slider__btn slider__btn--next">Próximo</button>
</div>
```

### Adicionar novo card interativo
```html
<div class="icard">
  <button class="icard__open-btn">Abrir</button>
  <div class="icard__back">Conteúdo oculto</div>
  <button class="icard__close-btn" aria-hidden="true">Fechar</button>
</div>
```

### Adicionar novo vídeo
```html
<div class="video-player" data-video-id="YOUTUBE_VIDEO_ID">
  <div data-role="preview"><!-- preview --></div>
  <button class="video-player__preview-btn">Play</button>
  <div data-role="iframe"></div>
</div>
```

---

## 📊 Compatibilidade

- **Navegadores modernos**: Chrome, Firefox, Safari, Edge (últimas 2 versões)
- **HTML5 APIs**: sessionStorage, IntersectionObserver, Web Audio API
- **Graceful degradation**: sem Howler.js → fallback para `<audio>` nativo
- **Acessibilidade**: WCAG 2.1 Level AA

---

## 🔧 Troubleshooting

### Áudio não toca
- Verifique se o navegador permite autoplay (requer interação do usuário primeiro)
- Verifique console (`F12 → Console`) para mensagens de erro
- Se Howler.js não estiver disponível, o fallback para `<audio>` nativo é ativado automaticamente

### Dados da atividade não restauram
- Use `sessionStorage` somente (não `localStorage`)
- Limpe o cache do navegador ou abra em modo incógnito
- Verifique `F12 → Application → Session Storage` para confirmar persistência

### Slider não funciona
- Certifique-se de que a estrutura HTML segue o padrão (`.slider__slides`, `.slider__slide`, `.slider__dots`)
- Verifique se `initSlider()` foi chamado no DOMContentLoaded

---

## 📝 Notas de desenvolvimento

- **Sem dependências externas**: Apenas HTML5, CSS3 e JavaScript Vanilla (exceto biblioteca Howler.js opcional para áudio)
- **Modular**: Cada funcionalidade está em sua própria função `init*()`
- **Testável**: Componentes isolados facilitam testes manuais ou automatizados
- **Documentado**: Comentários explicativos em todo o código JavaScript
- **Versionado**: Mudanças controladas via Git com commit messages descritivas
