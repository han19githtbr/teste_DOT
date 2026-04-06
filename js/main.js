'use strict';

/* ============================================================
   STORAGE KEYS
   ============================================================ */
const STORAGE_KEYS = {
    ESSAY_TEXT: 'edtech_essay_text',
    ESSAY_ANSWERED: 'edtech_essay_answered',
    QUIZ_SELECTED: 'edtech_quiz_selected',
    QUIZ_ANSWERED:  'edtech_quiz_answered',
};

const Storage = {
  set(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  },
  get(key) {
    try { const r = sessionStorage.getItem(key); return r !== null ? JSON.parse(r) : null; } catch (e) { return null; }
  },
};

/* ============================================================
   PLAYER DE VÍDEO
   ============================================================ */
function initVideoPlayer() {
  const player = document.querySelector('.video-player');
  if (!player) return;

  const preview    = player.querySelector('[data-role="preview"]');
  const iframeRoot = player.querySelector('[data-role="iframe"]');
  const playBtn    = player.querySelector('.video-player__preview-btn');
  const videoId    = player.dataset.videoId;
  if (!preview || !iframeRoot || !playBtn || !videoId) return;

  function loadVideo() {
    if (player.classList.contains('is-playing')) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title = 'Vídeo de apresentação do curso';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframeRoot.appendChild(iframe);
    player.classList.add('is-playing');
    iframeRoot.setAttribute('aria-hidden', 'false');
    preview.setAttribute('aria-hidden', 'true');
  }

  playBtn.addEventListener('click', loadVideo);
  playBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadVideo(); }
  });
}

/* ============================================================
   SLIDER
   ============================================================ */
function initSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const slides   = slider.querySelectorAll('.slider__slide');
  const dotsWrap = slider.querySelector('.slider__dots');
  const btnPrev  = slider.querySelector('.slider__btn--prev');
  const btnNext  = slider.querySelector('.slider__btn--next');
  if (!slides.length) return;

  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dotsWrap.children[current].classList.remove('is-active');
    dotsWrap.children[current].setAttribute('aria-selected', 'false');
    current = index;
    slides[current].classList.add('is-active');
    dotsWrap.children[current].classList.add('is-active');
    dotsWrap.children[current].setAttribute('aria-selected', 'true');
    updateButtons();
  }

  function updateButtons() {
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === slides.length - 1;
  }

  btnPrev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  btnNext.addEventListener('click', () => { if (current < slides.length - 1) goTo(current + 1); });
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft'  && current > 0)              goTo(current - 1);
    if (e.key === 'ArrowRight' && current < slides.length - 1) goTo(current + 1);
  });

  let tx = 0;
  slider.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && current < slides.length - 1) goTo(current + 1);
      if (diff < 0 && current > 0) goTo(current - 1);
    }
  }, { passive: true });

  slides[0].classList.add('is-active');
  updateButtons();
}

/* ============================================================
   PLAYER DE ÁUDIO
   ============================================================ */
function initAudioPlayer() {
  const playerEl = document.querySelector('.audio-player');
  if (!playerEl) return;

  // Lê o src diretamente do atributo HTML, evitando problemas com URL relativa do DOM
  const audioEl = playerEl.querySelector('audio');
  const source = audioEl?.getAttribute('src') || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const playBtn     = playerEl.querySelector('.audio-player__play-btn');
  const progressBar = playerEl.querySelector('.audio-player__progress');
  const fill        = playerEl.querySelector('.audio-player__progress-fill');
  const timeEl      = playerEl.querySelector('.audio-player__time');
  const volBtn      = playerEl.querySelector('.audio-player__vol-btn');
  const volFill     = playerEl.querySelector('.audio-player__vol-fill');
  const settingsBtn = playerEl.querySelector('.audio-player__settings-btn');
  const volSlider   = playerEl.querySelector('.audio-player__vol-slider');

  if (!playBtn || !progressBar || !fill || !timeEl) return;

  // Se Howler não estiver disponível, usa a Web Audio API nativa como fallback
  if (typeof Howl === 'undefined') {
    console.warn('[EdTech] Howler.js não disponível, usando <audio> nativo.');
    initAudioPlayerNative(playerEl, audioEl, source, playBtn, progressBar, fill, timeEl, volBtn, volFill, settingsBtn, volSlider);
    return;
  }

  const player = new Howl({
    src: [source],
    html5: true,
    volume: 0.75,
    onload: () => {
      timeEl.textContent = `0:00 / ${formatTime(player.duration())}`;
    },
    onplay: () => {
      setPlaying(true);
      requestAnimationFrame(updateProgress);
    },
    onpause: () => {
      setPlaying(false);
    },
    onend: () => {
      setPlaying(false);
      fill.style.width = '0%';
      timeEl.textContent = `0:00 / ${formatTime(player.duration())}`;
    },
    onloaderror: (id, err) => {
      console.error('[EdTech] Erro ao carregar áudio:', err);
    }
  });

  const iconPlay  = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  }

  function setPlaying(isPlaying) {
    if (iconPlay)  iconPlay.style.display  = isPlaying ? 'none' : '';
    if (iconPause) iconPause.style.display = isPlaying ? '' : 'none';
    playBtn.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproduzir');
    playerEl.classList.toggle('is-playing', isPlaying);
  }

  function updateProgress() {
    if (!player.playing()) return;
    const current = player.seek() || 0;
    const duration = player.duration() || 0;
    const percent = duration ? (current / duration) * 100 : 0;
    fill.style.width = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(percent));
    timeEl.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    requestAnimationFrame(updateProgress);
  }

  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (player.playing()) {
        player.pause();
      } else {
        player.play();
      }
    } catch (err) {
      console.error('Erro ao tocar áudio:', err);
    }
  });

  progressBar.addEventListener('click', (event) => {
    const duration = player.duration() || 0;
    if (!duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    player.seek(pct * duration);
    updateProgress();
  });

  progressBar.addEventListener('keydown', (event) => {
    const duration = player.duration() || 0;
    if (!duration) return;
    const step = duration * 0.05;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      player.seek(Math.min(duration, (player.seek() || 0) + step));
      updateProgress();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      player.seek(Math.max(0, (player.seek() || 0) - step));
      updateProgress();
    }
  });

  let muted = false;
  volBtn?.addEventListener('click', () => {
    muted = !muted;
    player.mute(muted);
    if (volFill) volFill.style.width = muted ? '0%' : '70%';
    volBtn.setAttribute('aria-label', muted ? 'Ativar som' : 'Volume');
    // Atualiza ícone do volume
    const volIcon = volBtn.querySelector('svg path');
    if (volIcon) {
      volIcon.setAttribute('d', muted
        ? 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z'
        : 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z'
      );
    }
  });

  // ── Botão de configurações: mostra/esconde slider de volume ──
  settingsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!volSlider) return;
    const isVisible = volSlider.classList.toggle('is-visible');
    settingsBtn.setAttribute('aria-expanded', String(isVisible));
    settingsBtn.setAttribute('aria-label', isVisible ? 'Fechar configurações' : 'Configurações');
  });

  // Fecha o painel de configurações ao clicar fora
  document.addEventListener('click', (e) => {
    if (volSlider && volSlider.classList.contains('is-visible')) {
      if (!playerEl.contains(e.target)) {
        volSlider.classList.remove('is-visible');
        settingsBtn?.setAttribute('aria-expanded', 'false');
        settingsBtn?.setAttribute('aria-label', 'Configurações');
      }
    }
  });

  // Controle de volume via slider de configurações (clique na track)
  const volTrack = volSlider?.querySelector('.audio-player__vol-track');
  volTrack?.addEventListener('click', (e) => {
    const rect = volTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    player.volume(pct);
    if (volFill) volFill.style.width = `${pct * 100}%`;
    if (pct === 0) {
      muted = true;
      player.mute(true);
    } else if (muted) {
      muted = false;
      player.mute(false);
    }
  });
}

/* ============================================================
   PLAYER DE ÁUDIO — FALLBACK NATIVO (sem Howler)
   ============================================================ */
function initAudioPlayerNative(playerEl, audioEl, source, playBtn, progressBar, fill, timeEl, volBtn, volFill, settingsBtn, volSlider) {
  if (!audioEl) {
    audioEl = document.createElement('audio');
    audioEl.src = source;
    audioEl.style.display = 'none';
    playerEl.appendChild(audioEl);
  } else {
    audioEl.src = source;
  }

  const iconPlay  = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  }

  function setPlaying(isPlaying) {
    if (iconPlay)  iconPlay.style.display  = isPlaying ? 'none' : '';
    if (iconPause) iconPause.style.display = isPlaying ? '' : 'none';
    playBtn.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproduzir');
    playerEl.classList.toggle('is-playing', isPlaying);
  }

  audioEl.addEventListener('loadedmetadata', () => {
    timeEl.textContent = `0:00 / ${formatTime(audioEl.duration)}`;
  });

  audioEl.addEventListener('timeupdate', () => {
    const pct = audioEl.duration ? (audioEl.currentTime / audioEl.duration) * 100 : 0;
    fill.style.width = `${pct}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(pct));
    timeEl.textContent = `${formatTime(audioEl.currentTime)} / ${formatTime(audioEl.duration)}`;
  });

  audioEl.addEventListener('play',  () => setPlaying(true));
  audioEl.addEventListener('pause', () => setPlaying(false));
  audioEl.addEventListener('ended', () => {
    setPlaying(false);
    fill.style.width = '0%';
    timeEl.textContent = `0:00 / ${formatTime(audioEl.duration)}`;
  });

  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (audioEl.paused) { audioEl.play(); } else { audioEl.pause(); }
  });

  progressBar.addEventListener('click', (event) => {
    if (!audioEl.duration) return;
    const rect = progressBar.getBoundingClientRect();
    audioEl.currentTime = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * audioEl.duration;
  });

  let muted = false;
  volBtn?.addEventListener('click', () => {
    muted = !muted;
    audioEl.muted = muted;
    if (volFill) volFill.style.width = muted ? '0%' : '70%';
  });

  settingsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!volSlider) return;
    const isVisible = volSlider.classList.toggle('is-visible');
    settingsBtn.setAttribute('aria-expanded', String(isVisible));
  });

  document.addEventListener('click', (e) => {
    if (volSlider?.classList.contains('is-visible') && !playerEl.contains(e.target)) {
      volSlider.classList.remove('is-visible');
      settingsBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  const volTrack = volSlider?.querySelector('.audio-player__vol-track');
  volTrack?.addEventListener('click', (e) => {
    const rect = volTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioEl.volume = pct;
    if (volFill) volFill.style.width = `${pct * 100}%`;
  });
}

/* ============================================================
   CARDS INTERATIVOS
   ============================================================ */
function initInteractiveCards() {
  document.querySelectorAll('.icard').forEach((card) => {
    const openBtn  = card.querySelector('.icard__open-btn');
    const closeBtn = card.querySelector('.icard__close-btn');
    const back     = card.querySelector('.icard__back');

    function setOpen(open) {
      card.classList.toggle('is-open', open);
      if (openBtn) {
        openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        openBtn.textContent = open ? 'Fechar' : 'Abrir';
      }
      if (back) back.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) closeBtn?.focus();
      else openBtn?.focus();
    }

    openBtn?.addEventListener('click', () => setOpen(!card.classList.contains('is-open')));
    closeBtn?.addEventListener('click', () => setOpen(false));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && card.classList.contains('is-open')) setOpen(false);
    });

    // Respeita estado inicial do HTML
    setOpen(card.classList.contains('is-open'));
  });
}

/* ============================================================
   ATIVIDADE DISCURSIVA
   CORREÇÃO PRINCIPAL: o feedback mostra o texto digitado pelo usuário
   ============================================================ */
function initEssayActivity() {
  const activity = document.querySelector('.activity--essay');
  if (!activity) return;

  const textarea  = activity.querySelector('.activity__textarea');
  const btnAnswer = activity.querySelector('.btn--answer-essay');
  const btnChange = activity.querySelector('.btn--change-essay');
  const feedback  = activity.querySelector('.activity__feedback');
  const closeBtn  = activity.querySelector('.activity__feedback-close');

  if (!textarea || !btnAnswer || !btnChange || !feedback) return;

  // O título e corpo do feedback ficam no HTML; só precisamos mostrar/esconder
  const titleEl = feedback.querySelector('.activity__feedback-title');
  const bodyEl  = feedback.querySelector('.activity__feedback-body');

  function setAnsweredState(text) {
    textarea.readOnly  = true;
    btnAnswer.disabled = true;
    btnChange.disabled = false;

    // Mostra o texto que o usuário digitou no corpo do feedback
    if (titleEl) titleEl.textContent = 'É isso aí!';
    if (bodyEl)  bodyEl.textContent  = text || textarea.value;

    feedback.classList.add('is-visible');
  }

  function setEditingState() {
    textarea.readOnly  = false;
    btnAnswer.disabled = textarea.value.trim().length === 0;
    btnChange.disabled = true;
    feedback.classList.remove('is-visible');
    textarea.focus();
  }

  // Habilita Responder conforme há texto
  textarea.addEventListener('input', () => {
    btnAnswer.disabled = textarea.value.trim().length === 0;
    Storage.set(STORAGE_KEYS.ESSAY_TEXT, textarea.value);
  });

  // Responder
  btnAnswer.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) { textarea.focus(); return; }
    setAnsweredState(text);
    Storage.set(STORAGE_KEYS.ESSAY_TEXT, text);
    Storage.set(STORAGE_KEYS.ESSAY_ANSWERED, true);
  });

  // Alterar
  btnChange.addEventListener('click', () => {
    setEditingState();
    Storage.set(STORAGE_KEYS.ESSAY_ANSWERED, false);
  });

  // Fechar feedback
  closeBtn?.addEventListener('click', () => {
    feedback.classList.remove('is-visible');
  });

  // Restauração
  const savedText   = Storage.get(STORAGE_KEYS.ESSAY_TEXT);
  const wasAnswered = Storage.get(STORAGE_KEYS.ESSAY_ANSWERED);
  if (savedText) textarea.value = savedText;

  if (wasAnswered) {
    setAnsweredState(savedText);
  } else {
    setEditingState();
  }
}

/* ============================================================
   ATIVIDADE OBJETIVA
   CORREÇÃO PRINCIPAL: checkbox nativo funcional + botão Responder ativa
   ============================================================ */
function initQuizActivity() {
  const activity = document.querySelector('.activity--quiz');
  if (!activity) return;

  const options   = activity.querySelectorAll('.quiz-option');
  const btnAnswer = activity.querySelector('.btn--answer-quiz');
  const btnChange = activity.querySelector('.btn--change-quiz');
  const feedback  = activity.querySelector('.activity__feedback');
  const closeBtn  = activity.querySelector('.activity__feedback-close');

  if (!options.length || !btnAnswer || !btnChange || !feedback) return;

  const titleEl = feedback.querySelector('.activity__feedback-title');
  const bodyEl  = feedback.querySelector('.activity__feedback-body');

  const CORRECT_INDEX = parseInt(
    activity.querySelector('[data-correct="true"]')?.dataset.index ?? '1'
  );

  let selectedIndex = -1;

  function selectOption(index) {
    selectedIndex = index;
    options.forEach((opt, i) => {
      const cb = opt.querySelector('input[type="checkbox"]');
      const isThis = (i === index);
      // Atualiza checkbox nativo
      if (cb) cb.checked = isThis;
      // Atualiza classe visual
      opt.classList.toggle('is-selected', isThis);
    });
    // Habilita botão Responder se algo selecionado
    btnAnswer.disabled = (index === -1);
    Storage.set(STORAGE_KEYS.QUIZ_SELECTED, index);
  }

  function showResults() {
    const isCorrect = (selectedIndex === CORRECT_INDEX);

    options.forEach((opt, i) => {
      const cb = opt.querySelector('input[type="checkbox"]');
      if (cb) cb.disabled = true;
      opt.classList.add('is-disabled');
      if (i === CORRECT_INDEX) opt.classList.add('is-correct-answer');
      else if (opt.classList.contains('is-selected')) opt.classList.add('is-wrong-answer');
    });

    feedback.classList.remove('activity__feedback--correct', 'activity__feedback--warning');
    feedback.classList.add(isCorrect ? 'activity__feedback--correct' : 'activity__feedback--warning');
    feedback.classList.add('is-visible');

    if (titleEl) titleEl.textContent = isCorrect ? 'É isso aí!' : 'Tente novamente!';
    if (bodyEl)  bodyEl.textContent  = isCorrect
      ? 'Parabéns! Você selecionou a resposta correta.'
      : 'Essa não é a resposta correta. Revise o conteúdo e tente outra vez.';

    btnAnswer.disabled = true;
    btnChange.disabled = false;
  }

  function resetQuiz() {
    selectedIndex = -1;
    options.forEach((opt) => {
      const cb = opt.querySelector('input[type="checkbox"]');
      if (cb) { cb.checked = false; cb.disabled = false; }
      opt.classList.remove('is-selected', 'is-disabled', 'is-correct-answer', 'is-wrong-answer');
    });
    feedback.classList.remove('is-visible', 'activity__feedback--correct', 'activity__feedback--warning');
    btnAnswer.disabled = true;
    btnChange.disabled = true;
    Storage.set(STORAGE_KEYS.QUIZ_ANSWERED, false);
    Storage.set(STORAGE_KEYS.QUIZ_SELECTED, -1);
  }

  // ── Eventos de clique nas opções ──
  options.forEach((opt, i) => {
    // Clique no label inteiro
    opt.addEventListener('click', (e) => {
      // Deixa o checkbox nativo processar primeiro, então sincroniza
      if (opt.classList.contains('is-disabled')) return;

      // Se clicar na já selecionada, desmarca
      if (selectedIndex === i) {
        selectOption(-1);
      } else {
        selectOption(i);
      }
    });

    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); }
    });
  });

  btnAnswer.addEventListener('click', () => {
    if (selectedIndex === -1) return;
    showResults();
    Storage.set(STORAGE_KEYS.QUIZ_ANSWERED, true);
  });

  btnChange.addEventListener('click', resetQuiz);

  closeBtn?.addEventListener('click', () => {
    feedback.classList.remove('is-visible');
  });

  // Restauração
  const savedSelected = Storage.get(STORAGE_KEYS.QUIZ_SELECTED);
  const wasAnswered   = Storage.get(STORAGE_KEYS.QUIZ_ANSWERED);

  if (savedSelected !== null && savedSelected >= 0) {
    selectOption(savedSelected);
  }
  if (wasAnswered) {
    showResults();
  }
}

/* ============================================================
   FAQ — fecha outros ao abrir um
   ============================================================ */
function initFaq() {
  const details = document.querySelectorAll('.faq-item details');
  details.forEach((det) => {
    det.addEventListener('toggle', () => {
      if (det.open) {
        details.forEach((other) => { if (other !== det && other.open) other.open = false; });
      }
    });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  if (!window.IntersectionObserver) return;
  const targets = document.querySelectorAll(
    '.section-block, .image-text-block, .slider-section, .highlight-block, .icard, .activity, .faq-item, .audio-player, .video-player-wrap'
  );
  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  targets.forEach((el) => obs.observe(el));
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initVideoPlayer();
  initSlider();
  initAudioPlayer();
  initInteractiveCards();
  initEssayActivity();
  initQuizActivity();
  initFaq();
  initScrollReveal();
  console.info('[EdTech] Todos os módulos inicializados.');
});
