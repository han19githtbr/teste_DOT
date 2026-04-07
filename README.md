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
- **HTML5 semântico** — uso de elementos como `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<fieldset>`, `<details>`/`<summary>`, `<svg>` para gráficos
- **CSS puro** — sem frameworks; design system via CSS Custom Properties (variáveis) com tema escuro moderno
- **JavaScript Vanilla** — sem bibliotecas ou frameworks; módulos organizados por responsabilidade com fallback para APIs nativas
- Fontes via **Google Fonts** (Barlow) — única dependência externa, CDN otimizada

### Componentes e implementação

| Componente | Técnica |
|---|---|
| Header com Logo | SVG inline + CSS Grid para layout responsivo |
| Hero Section | CSS Grid 2-colunas, SVG animado para curvas decorativas, mockup com topbar |
| Player de vídeo | Embed YouTube via `<iframe>` responsivo (padding-bottom 56.25%) com preview customizado |
| Imagem lateral | CSS Grid `1fr 1fr` com padding interno ajustado, borda arredondada na imagem |
| Slider/Carrossel | JS vanilla — gerência de índice ativo, dots gerados dinamicamente, touch/swipe support |
| Player de áudio | `<audio>` nativo + UI customizada em JS (play/pause, progresso, volume, mute) com fallback Howler.js |
| Recurso de destaque | Bloco semântico `role="note"` com background escuro e borda verde |
| Cards interativos | Classe CSS `is-open` alternada pelo JS, efeito zoom no card aberto, apenas um aberto por vez |
| Atividade discursiva | JS: fluxo de estados (editando → respondido → alterando) com persistência |
| Atividade objetiva | JS: checkbox customizado + detecção de resposta correta via `data-correct` |
| FAQ / Accordion | `<details>`/`<summary>` **nativo** do HTML5 — sem JS adicional |
| Persistência | `sessionStorage` — restaura texto, feedback, estados e seleções |
| Scroll Reveal | `IntersectionObserver` API nativa para animações de entrada |

### Acessibilidade (a11y)
- HTML semântico em todos os componentes com roles apropriados
- Labels associados corretamente (`for`/`id`, `aria-label`, `aria-labelledby`, `aria-describedby`)
- Navegação por teclado funcional (Tab, Enter, Espaço, Arrow Keys, Escape)
- Estados de foco visíveis (`:focus-visible` com outline verde personalizado)
- Atributos ARIA dinâmicos (`aria-expanded`, `aria-live`, `aria-checked`, `aria-hidden`)
- Classe `.sr-only` para textos visíveis apenas a leitores de tela
- Contraste adequado entre texto e fundo (ratio ≥ 4.5:1) com tema escuro
- Suporte a leitores de tela com landmarks e headings estruturados

### Responsividade
- Mobile-first com breakpoints em `768px` e `480px`
- Grid de duas colunas colapsa para uma em mobile com `grid-template-columns: 1fr`
- Hero empilha verticalmente com `order` CSS
- Slider com altura adaptável e controles touch-friendly
- Áudio player com `flex-wrap` para mobile
- Imagem lateral empilha verticalmente em mobile
- Cards interativos mantêm grid 3-colunas em desktop, ajustam para mobile

### Padrões de código
- **Clean Code**: funções pequenas (<50 linhas), nomes descritivos em português, sem comentários redundantes
- **Separação de responsabilidades**: cada módulo JS faz apenas uma coisa (`init*()` functions)
- **CSS Custom Properties** como design system (cores, espaçamentos, transições, raios)
- **Comentários explicativos** em todos os trechos relevantes com seções delimitadas
- **Módulos independentes**: cada componente pode ser inicializado isoladamente
- **Graceful degradation**: fallbacks para APIs não suportadas (IntersectionObserver, Howler.js)
- **Performance**: lazy loading de imagens, sessionStorage para persistência, animações otimizadas

---

## ✨ Diferenciais implementados

- **Tema escuro moderno** — Background claro com elementos escuros, paleta verde sofisticada
- **Cards interativos com zoom** — Card aberto cresce visualmente com `scale()` e `translateY()`
- **Comportamento exclusivo** — Apenas um card aberto por vez, outros ficam opacos
- **Animações CSS fluidas** — `fadeIn` e `slideDown` nos feedbacks, transições suaves em todos os componentes
- **Microinterações refinadas** — Hover nos botões com elevação, dots do slider, opções do quiz
- **Backdrop blur no header** — Efeito glass moderno com `backdrop-filter`
- **Mockup SVG animado** — Gráfico de linha na hero section com curvas verdes
- **Persistência inteligente** — Restaura texto, feedback, estados e seleções automaticamente
- **FAQ nativo** — Usa `<details>`/`<summary>` do HTML5, sem JavaScript adicional
- **Foco gerenciado** — Navegação por teclado completa com gerenciamento de foco nos cards
- **Touch support** — Swipe no slider, gestos touch-friendly
- **Graceful degradation** — Fallback para `<audio>` nativo se Howler.js não estiver disponível
- **Performance otimizada** — Lazy loading, IntersectionObserver, animações GPU-accelerated

---

## 🎯 Funcionalidades detalhadas

### 1. Header e Logo
- Logo customizado com marca "dot" e subtítulo "DIGITAL GROUP"
- Layout responsivo com container centralizado
- Link de navegação para âncora `#conteudo`

### 2. Hero Section
- Layout em grid 2-colunas com texto e mockup
- SVG animado com curvas decorativas em verde
- Mockup simulando interface com topbar (dots vermelho/amarelo/verde)
- Call-to-action com seta animada
- Responsivo: empilha verticalmente em mobile

### 3. Player de Vídeo
- Embed responsivo do YouTube via `<iframe>` com aspect ratio 16:9
- Preview customizado com thumbnail do vídeo
- Botão de play centralizado com ícone SVG
- Lazy loading da thumbnail
- Integração de microdata para SEO
- Suporte a teclado (Enter/Espaço)

### 4. Imagem Lateral
- Layout em grid 2-colunas (imagem + texto)
- Padding interno ajustado para espaçamento visual
- Imagem com `object-fit: cover` e borda arredondada
- Texto justificado com `justify-content: center`
- Colapsa para layout vertical em mobile

### 5. Slider/Carrossel
- Navegação com botões Previous/Next desabilitados nas extremidades
- Indicadores de slide (dots) gerados dinamicamente via JS
- Suporte a teclado (Arrow Left/Right)
- Suporte a gesto touch (swipe horizontal) com `touchstart`/`touchend`
- Transições suaves entre slides
- Estado ativo visual nos dots

### 6. Player de Áudio
- **Modo Howler.js** (se disponível): controle avançado com Howl library
- **Modo Fallback** (sem Howler): `<audio>` HTML5 nativo
- Controles: play/pause, barra de progresso clicável, volume, mute
- Indicador de tempo: `[minutos:segundos atual] / [total]`
- Painel de configurações expansível (volume slider)
- Suporte a teclado: Arrow Keys para avançar/retroceder 5% da duração
- Tema escuro com bordas arredondadas

### 7. Recurso de Destaque
- Background escuro com borda verde sutil
- Texto em branco com ênfase em negrito
- Box-shadow pronunciada para destaque visual
- Centralizado com max-width para legibilidade

### 8. Cards Interativos (Flip Cards)
- **Estado fechado**: fundo cinza claro, ícone de interrogação, botão "Abrir" outline
- **Estado aberto**: fundo preto, texto branco, botão "Fechar" outline branco
- **Efeito zoom**: card aberto cresce com `scale(1.06)` e `translateY(-8px)`
- **Comportamento exclusivo**: apenas um card aberto por vez, outros ficam opacos
- Suporte a ESC para fechar
- Gerenciamento automático de foco e ARIA attributes
- Hover geral com leve elevação

### 9. Atividade Discursiva (Essay)
- Textarea com placeholder e validação de texto
- Estados: **Editando** → **Respondido** → **Alterando**
- Botão "Responder" ativa/desativa conforme há texto
- Feedback mostra o texto digitado pelo usuário
- Botão "Alterar" volta ao modo edição
- Persistência via `sessionStorage` (chaves: `ESSAY_TEXT`, `ESSAY_ANSWERED`)

### 10. Atividade Objetiva (Quiz)
- Checkbox nativo sincronizado com UI visual customizada
- Detecção automática de resposta correta (via `data-correct="true"`)
- Feedback diferenciado: **Correto** (verde) vs **Incorreto** (vermelho)
- Mostrar resposta correta ao final com destaque visual
- Botão "Tentar Novamente" habilita nova tentativa
- Persistência via `sessionStorage` (chaves: `QUIZ_SELECTED`, `QUIZ_ANSWERED`)

### 11. FAQ / Accordion
- Elemento nativo HTML5 `<details>`/`<summary>`
- Comportamento automático: abre uno quando outro é aberto
- Sem necessidade de JavaScript customizado (apenas inicialização de toggle)
- Estilo clean com bordas sutis

### 12. Scroll Reveal
- Animação de entrada ao scroll (fade-in + slide-up)
- Threshold de visibilidade: 7%
- Aplicado a: blocos de seção, sliders, cards, atividades, FAQ, players
- Utiliza `IntersectionObserver` API nativa para performance
- Animações suaves com `transform` e `opacity`

### 13. Design System
- **Tema escuro moderno**: Background `#f7f8f5`, superfícies escuras, verde destacado `#7fc31c`
- **Paleta de cores**: Verde em tons (dark `#171d0c`, mid `#667453`, hover `#6aaa14`)
- **Tipografia**: Barlow (Google Fonts) — pesos 400, 600, 700, 800, 900
- **Espaçamento**: Escala `--gap-xs` a `--gap-xxl` (4px a 80px) com `--gap-md: 25px`
- **Raios**: `--radius-sm` a `--radius-xl` (4px a 16px)
- **Transições**: `--transition-fast` (150ms), `--transition-normal` (250ms), `--transition-slow` (400ms)
- **Sombras**: Múltiplas camadas para profundidade (0 8px 28px, 0 24px 70px, etc.)

### 14. Persistência e Estado
- **sessionStorage** para dados temporários da sessão
- Restauração automática ao recarregar página
- Estados salvos: texto do essay, respostas do quiz, cards abertos
- Chaves padronizadas com prefixo `edtech_`
- Tratamento de erros para navegadores sem suporte

---

## 💾 Armazenamento (sessionStorage)

A aplicação persiste o seguinte via `sessionStorage` para manter o estado entre recarregamentos:

| Chave | Tipo | Descrição | Uso |
|---|---|---|---|
| `edtech_essay_text` | String | Texto digitado no campo de atividade discursiva | Restaura conteúdo do textarea |
| `edtech_essay_answered` | Boolean | Estado se atividade discursiva foi respondida | Controla exibição do feedback |
| `edtech_quiz_selected` | Number | Índice da opção selecionada no quiz (0-3) | Marca checkbox e botão correto |
| `edtech_quiz_answered` | Boolean | Estado se quiz foi respondido | Controla exibição dos resultados |

**Implementação técnica:**
- Objeto `Storage` com métodos `set()` e `get()` para serialização JSON
- Tratamento de erros para navegadores sem suporte a sessionStorage
- Restauração automática no `DOMContentLoaded`
- Dados persistem apenas durante a sessão do navegador

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

- **Navegadores modernos**: Chrome 58+, Firefox 55+, Safari 12.1+, Edge 79+ (últimas 2 versões)
- **HTML5 APIs**: sessionStorage, IntersectionObserver, Web Audio API, Touch Events
- **CSS Features**: CSS Grid, CSS Custom Properties, backdrop-filter, :has() pseudo-class
- **JavaScript ES6+**: Arrow functions, template literals, destructuring, async/await
- **Graceful degradation**: Fallback para `<audio>` nativo se Howler.js não disponível
- **Progressive enhancement**: Funcionalidades extras em navegadores modernos
- **Mobile support**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Acessibilidade**: NVDA, JAWS, VoiceOver, TalkBack (testado com leitores de tela)

---

## 🔧 Troubleshooting

### Cards interativos não expandem
- Verifique se `initInteractiveCards()` foi chamado no `DOMContentLoaded`
- Confirme que a estrutura HTML segue o padrão (`.icard`, `.icard__open-btn`, `.icard__back`)
- Verifique console para erros de JavaScript
- Apenas um card pode estar aberto por vez — clique em "Fechar" antes de abrir outro

### Áudio não toca
- Verifique se o navegador permite autoplay (requer interação do usuário primeiro)
- Verifique console (`F12 → Console`) para mensagens de erro
- Se Howler.js não estiver disponível, o fallback para `<audio>` nativo é ativado automaticamente
- Teste com arquivos de áudio locais se o URL remoto falhar

### Dados da atividade não restauram
- Use `sessionStorage` somente (não `localStorage`)
- Limpe o cache do navegador ou abra em modo incógnito
- Verifique `F12 → Application → Session Storage` para confirmar persistência
- Dados persistem apenas na mesma aba/janela

### Slider não funciona
- Certifique-se de que a estrutura HTML segue o padrão (`.slider__slides`, `.slider__slide`, `.slider__dots`)
- Verifique se `initSlider()` foi chamado no DOMContentLoaded
- Teste navegação por teclado (Arrow Left/Right) e touch swipe

### Vídeo não carrega
- Verifique conexão com YouTube
- Confirme que `data-video-id` está presente no elemento `.video-player`
- Teste em navegadores diferentes (Safari pode bloquear embeds)

### Animações não funcionam
- Verifique suporte a `IntersectionObserver` (Safari 12.1+, Chrome 58+)
- Fallback para `scroll` event se necessário
- Desative animações em `prefers-reduced-motion: reduce`

---

## 📝 Arquitetura do código

### Estrutura de módulos JavaScript
```javascript
// main.js - Ponto de entrada único
document.addEventListener('DOMContentLoaded', () => {
  initVideoPlayer();    // Player de vídeo YouTube
  initSlider();         // Carrossel de imagens
  initAudioPlayer();    // Player de áudio com Howler.js
  initInteractiveCards(); // Cards expansíveis
  initEssayActivity();  // Atividade discursiva
  initQuizActivity();   // Atividade objetiva
  initFaq();           // FAQ nativo
  initScrollReveal();  // Animações de scroll
});
```

### Padrões de organização
- **Funções `init*()`**: Uma por componente, chamadas no DOM ready
- **Constantes globais**: `STORAGE_KEYS` para chaves de persistência
- **Objeto `Storage`**: Wrapper para sessionStorage com try/catch
- **Event listeners**: Adicionados apenas quando elementos existem
- **Feature detection**: Verificação de suporte a APIs modernas

### CSS Architecture
- **Design System**: Variáveis CSS para cores, espaçamentos, transições
- **Component scopes**: Cada componente em seção delimitada por comentários
- **BEM-like naming**: `.component__element--modifier`
- **Mobile-first**: Breakpoints progressivos
- **Performance**: Transforms GPU-accelerated, will-change properties

### HTML Semantics
- **Landmarks**: `<header>`, `<main>`, `<section>`, `<article>`
- **ARIA attributes**: `aria-expanded`, `aria-live`, `role="note"`
- **Form controls**: Labels associados, fieldsets para grupos
- **Media elements**: Alt texts, titles, preload attributes
