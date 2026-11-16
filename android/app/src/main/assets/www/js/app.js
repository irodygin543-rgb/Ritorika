/* ==========================================================================
   «Красноречие» — Main Application Engine
   Huawei Mate XT Ultimate Design Tri-Fold Edition (100% Offline-First)
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.KRASNORECHIE_DATA;
  const STORAGE_KEY = "krasnorechie_matext_v1";

  // SVG icons (inline crisp icons — zero external dependencies)
  const ICONS = {
    book: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    spark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/></svg>`,
    layers: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    user: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    volume: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    star: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starFilled: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    share: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    flame: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.7 3.2-1.8 5.2-2.2 7.5-.3 1.7.7 3.1 2.2 3.1 1.6 0 2.6-1.4 2.3-3.1-.1-.7-.4-1.3-.8-1.9 2.6 1.2 4.5 3.9 4.5 7.1 0 4-3.1 7.3-7 7.3s-7-3.3-7-7.3C4 9.5 7.5 5.4 12 2z"/></svg>`,
    download: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
  };

  /* ========================================================================
     Native Huawei Mate XT Bridge Wrapper
     ======================================================================== */
  const isNativeApk = typeof window.AndroidBridge !== "undefined";

  const Native = {
    isNative: isNativeApk,
    vibrate(type) {
      try {
        if (isNativeApk && window.AndroidBridge.vibrate) {
          window.AndroidBridge.vibrate(type || "tap");
        } else if (navigator.vibrate) {
          navigator.vibrate(type === "err" ? [25, 40, 25] : type === "ok" ? 18 : 10);
        }
      } catch (_) {}
    },
    speak(text) {
      const clean = String(text || "").replace(/\u0301/g, "");
      if (!clean) return;
      try {
        if (isNativeApk && window.AndroidBridge.speak) {
          window.AndroidBridge.speak(clean);
          return;
        }
      } catch (_) {}

      if ("speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(clean);
          u.lang = "ru-RU";
          u.rate = 0.94;
          const voices = window.speechSynthesis.getVoices() || [];
          const ruVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ru"));
          if (ruVoice) u.voice = ruVoice;
          window.speechSynthesis.speak(u);
        } catch (_) {
          showToast("Озвучивание доступно в приложении на устройстве");
        }
      } else {
        showToast("Озвучивание доступно в приложении APK на Mate XT");
      }
    },
    share(title, text) {
      try {
        if (isNativeApk && window.AndroidBridge.shareText) {
          window.AndroidBridge.shareText(title + "\n\n" + text);
          return;
        }
      } catch (_) {}
      if (navigator.share) {
        navigator.share({ title, text }).catch(() => {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(title + " — " + text).then(() => {
          showToast("Скопировано в буфер обмена");
        }).catch(() => showToast("Готово к отправке"));
      } else {
        showToast("Скопируйте выражение из карточки");
      }
    },
    setThemeDark(isDark) {
      try {
        if (isNativeApk && window.AndroidBridge.setDarkMode) {
          window.AndroidBridge.setDarkMode(!!isDark);
        }
      } catch (_) {}
    },
    getDeviceInfo() {
      try {
        if (isNativeApk && window.AndroidBridge.getDeviceInfo) {
          return JSON.parse(window.AndroidBridge.getDeviceInfo());
        }
      } catch (_) {}
      return {
        model: "Веб-превью (Huawei Mate XT симулятор)",
        os: navigator.platform || "Browser",
        widthDp: Math.round(window.innerWidth),
        heightDp: Math.round(window.innerHeight),
        posture: detectViewportPosture(window.innerWidth)
      };
    }
  };

  function detectViewportPosture(w) {
    if (w < 620) return "single";
    if (w < 980) return "dual";
    return "triple";
  }

  /* ========================================================================
     Persistent State
     ======================================================================== */
  function defaultState() {
    return {
      user: {
        created: false,
        name: "Оратор",
        role: "Дипломат",
        dailyGoalMin: 10
      },
      theme: "light",
      xp: 0,
      streak: 1,
      lastPracticeDate: null,
      todayMinutes: 0,
      todayDate: todayKey(),
      lessonsCompleted: 0,
      mastery: {}, // exprId -> 0..100
      favorites: ["dip_01", "cls_01", "pol_01"]
    };
  }

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const merged = Object.assign(defaultState(), parsed);
      merged.user = Object.assign(defaultState().user, parsed.user || {});
      if (merged.todayDate !== todayKey()) {
        merged.todayDate = todayKey();
        merged.todayMinutes = 0;
      }
      return merged;
    } catch (_) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  let state = loadState();

  /* ========================================================================
     Runtime UI State
     ======================================================================== */
  const ui = {
    // Inside native APK go straight to dashboard; in browser start on faithful Landing view
    screen: isNativeApk ? "app" : "landing",
    tab: "lessons", // lessons | lexicon | rehearsal | profile
    postureOverride: "auto", // auto | single | dual | triple
    nativePosture: null,
    deviceInfo: Native.getDeviceInfo(),
    showcaseIdx: 0,
    selectedExprId: DATA.EXPRESSIONS[0].id,
    lexSearch: "",
    lexModule: "all",
    activeLesson: null,
    rehearsal: {
      deck: [],
      index: 0,
      flipped: false,
      onlyFavorites: false
    },
    modal: null, // null | { type: 'account' | 'phrase' | 'login', exprId?: string }
    toastMsg: "",
    toastTimer: null
  };

  function effectiveLayout() {
    if (ui.postureOverride !== "auto") return ui.postureOverride;
    if (isNativeApk && ui.nativePosture) return ui.nativePosture;
    return detectViewportPosture(window.innerWidth);
  }

  function postureLabel(layout) {
    if (layout === "single") return '6.4" · 1 экран (Сложен)';
    if (layout === "dual") return '7.9" · 2 экрана (Книга)';
    return '10.2" · 3 экрана (Кабинет)';
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    Native.setThemeDark(state.theme === "dark");
  }

  function applyBodyPostureClass() {
    document.body.classList.remove("sim-single", "sim-dual", "sim-triple");
    if (!isNativeApk && ui.postureOverride !== "auto") {
      document.body.classList.add("sim-" + ui.postureOverride);
    }
  }

  // Called natively by Android MainActivity.java when Huawei Mate XT folds/unfolds!
  window.onMateXTPostureChanged = function (payload) {
    try {
      const info = typeof payload === "string" ? JSON.parse(payload) : payload;
      ui.deviceInfo = info;
      if (info && info.posture) {
        ui.nativePosture = info.posture;
      }
      render();
    } catch (_) {}
  };

  // Android physical/gesture back button handler
  window.handleAndroidBack = function () {
    if (ui.modal) {
      ui.modal = null;
      render();
      return true;
    }
    if (ui.activeLesson) {
      ui.activeLesson = null;
      render();
      return true;
    }
    if (ui.screen === "app" && ui.tab !== "lessons") {
      ui.tab = "lessons";
      render();
      return true;
    }
    return false;
  };

  /* ========================================================================
     Toast helper
     ======================================================================== */
  function showToast(msg) {
    ui.toastMsg = msg;
    clearTimeout(ui.toastTimer);
    renderToastOnly();
    ui.toastTimer = setTimeout(() => {
      ui.toastMsg = "";
      renderToastOnly();
    }, 2600);
  }

  function renderToastOnly() {
    const existing = document.getElementById("toast-host");
    if (!existing) return;
    existing.innerHTML = ui.toastMsg ? `<div class="toast">${escapeHtml(ui.toastMsg)}</div>` : "";
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getExpr(id) {
    return DATA.EXPRESSIONS.find((e) => e.id === id) || DATA.EXPRESSIONS[0];
  }

  function getModule(id) {
    return DATA.MODULES.find((m) => m.id === id) || DATA.MODULES[0];
  }

  function masteredCount() {
    return DATA.EXPRESSIONS.filter((e) => (state.mastery[e.id] || 0) >= 60).length;
  }

  function moduleProgress(modId) {
    const items = DATA.EXPRESSIONS.filter((e) => e.module === modId);
    if (!items.length) return { done: 0, total: 0, pct: 0 };
    const sum = items.reduce((acc, e) => acc + Math.min(100, state.mastery[e.id] || 0), 0);
    const done = items.filter((e) => (state.mastery[e.id] || 0) >= 60).length;
    return { done, total: items.length, pct: Math.round(sum / items.length) };
  }

  /* ========================================================================
     Duolingo-Style 4-Task Lesson Generator
     ======================================================================== */
  function buildExercise(expr, type) {
    const sameModOthers = shuffle(DATA.EXPRESSIONS.filter((e) => e.id !== expr.id && e.module === expr.module));
    const anyOthers = shuffle(DATA.EXPRESSIONS.filter((e) => e.id !== expr.id));
    const peers = (sameModOthers.length >= 3 ? sameModOthers : anyOthers).slice(0, 3);

    if (type === "meaning") {
      const options = shuffle([
        { text: expr.meaning, correct: true },
        ...expr.distractors.slice(0, 3).map((d) => ({ text: d, correct: false }))
      ]);
      return { type, expr, options, selectedIdx: null, checked: false, isCorrect: false };
    }

    if (type === "context") {
      const options = shuffle([
        { text: expr.slotForm, correct: true },
        ...peers.map((p) => ({ text: p.slotForm, correct: false }))
      ]);
      return { type, expr, options, selectedIdx: null, checked: false, isCorrect: false };
    }

    if (type === "upgrade") {
      const options = shuffle([
        { text: expr.phrase, correct: true },
        ...peers.map((p) => ({ text: p.phrase, correct: false }))
      ]);
      return { type, expr, options, selectedIdx: null, checked: false, isCorrect: false };
    }

    // type === "builder" (Task 4: Word-tile reconstruction)
    const targetTiles = expr.tiles.slice();
    const bank = shuffle(targetTiles.map((word, idx) => ({ id: idx, word })));
    return {
      type: "builder",
      expr,
      targetTiles,
      bank,
      placed: [], // array of bank item ids
      checked: false,
      isCorrect: false
    };
  }

  function startLesson(mode, moduleId) {
    Native.vibrate("tap");
    let pool = [];
    let title = "";
    let types = [];

    if (mode === "demo") {
      title = "Демо-урок · 4 типа заданий";
      pool = [
        getExpr("dip_01"),
        getExpr("pol_01"),
        getExpr("cls_01"),
        getExpr("rht_02")
      ];
      types = ["meaning", "context", "upgrade", "builder"];
    } else if (mode === "daily") {
      title = "Урок дня · 10 минут";
      // Prioritize lower mastery expressions across modules
      const sorted = DATA.EXPRESSIONS.slice().sort((a, b) => {
        const ma = state.mastery[a.id] || 0;
        const mb = state.mastery[b.id] || 0;
        return (ma - mb) + (Math.random() * 18 - 9);
      });
      pool = sorted.slice(0, 8);
      types = ["meaning", "context", "upgrade", "builder", "context", "upgrade", "meaning", "builder"];
    } else {
      const mod = getModule(moduleId);
      title = `Модуль ${mod.num}: ${mod.shortTitle}`;
      const modItems = DATA.EXPRESSIONS.filter((e) => e.module === moduleId);
      const sorted = modItems.slice().sort((a, b) => (state.mastery[a.id] || 0) - (state.mastery[b.id] || 0));
      pool = sorted.slice(0, Math.min(8, sorted.length));
      const cycle = ["meaning", "context", "upgrade", "builder"];
      types = pool.map((_, i) => cycle[i % cycle.length]);
    }

    const exercises = pool.map((expr, i) => buildExercise(expr, types[i]));
    ui.screen = "app";
    ui.tab = "lessons";
    ui.selectedExprId = exercises[0].expr.id;
    ui.activeLesson = {
      mode,
      moduleId: moduleId || null,
      title,
      exercises,
      index: 0,
      correctCount: 0,
      startedAt: Date.now(),
      finished: false,
      earnedXp: 0
    };
    render();
  }

  function checkCurrentExercise() {
    const lesson = ui.activeLesson;
    if (!lesson) return;
    const ex = lesson.exercises[lesson.index];
    if (ex.checked) return;

    let ok = false;
    if (ex.type === "builder") {
      if (ex.placed.length !== ex.targetTiles.length) return;
      const built = ex.placed.map((id) => ex.bank.find((b) => b.id === id).word).join(" ");
      ok = built.trim().toLowerCase() === ex.targetTiles.join(" ").trim().toLowerCase();
    } else {
      if (ex.selectedIdx === null) return;
      ok = !!ex.options[ex.selectedIdx].correct;
    }

    ex.checked = true;
    ex.isCorrect = ok;
    ui.selectedExprId = ex.expr.id;

    if (ok) {
      lesson.correctCount += 1;
      lesson.earnedXp += 15;
      state.xp += 15;
      state.mastery[ex.expr.id] = Math.min(100, (state.mastery[ex.expr.id] || 0) + 35);
      Native.vibrate("ok");
    } else {
      state.mastery[ex.expr.id] = Math.min(100, (state.mastery[ex.expr.id] || 0) + 10);
      Native.vibrate("err");
    }
    saveState();
    render();
  }

  function nextExercise() {
    const lesson = ui.activeLesson;
    if (!lesson) return;
    Native.vibrate("tap");

    if (lesson.index + 1 < lesson.exercises.length) {
      lesson.index += 1;
      ui.selectedExprId = lesson.exercises[lesson.index].expr.id;
      render();
      return;
    }

    // Complete lesson!
    lesson.finished = true;
    const bonus = 40;
    lesson.earnedXp += bonus;
    state.xp += bonus;
    state.lessonsCompleted += 1;
    const elapsedMin = Math.max(2, Math.round((Date.now() - lesson.startedAt) / 60000));
    state.todayMinutes = Math.min(60, state.todayMinutes + Math.max(3, elapsedMin));

    const today = todayKey();
    if (state.lastPracticeDate !== today) {
      if (state.lastPracticeDate) {
        const prev = new Date(state.lastPracticeDate);
        const now = new Date(today);
        const diffDays = Math.round((now - prev) / 86400000);
        state.streak = diffDays === 1 ? state.streak + 1 : 1;
      } else {
        state.streak = Math.max(1, state.streak);
      }
      state.lastPracticeDate = today;
    }
    saveState();
    Native.vibrate("ok");
    render();
  }

  function toggleFavorite(exprId) {
    Native.vibrate("tap");
    const idx = state.favorites.indexOf(exprId);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
      showToast("Удалено из «Моего репертуара»");
    } else {
      state.favorites.push(exprId);
      showToast("Добавлено в «Мой репертуар»");
    }
    saveState();
    render();
  }

  function initRehearsal(onlyFav) {
    ui.rehearsal.onlyFavorites = !!onlyFav;
    const source = onlyFav
      ? DATA.EXPRESSIONS.filter((e) => state.favorites.includes(e.id))
      : DATA.EXPRESSIONS;
    ui.rehearsal.deck = shuffle(source.length ? source : DATA.EXPRESSIONS);
    ui.rehearsal.index = 0;
    ui.rehearsal.flipped = false;
    if (ui.rehearsal.deck[0]) ui.selectedExprId = ui.rehearsal.deck[0].id;
  }

  /* ========================================================================
     RENDERING — Hardware Strip + Views
     ======================================================================== */
  function renderMateXTStrip(layout) {
    const label = postureLabel(layout);
    const switcher = isNativeApk
      ? `<span style="font-weight:600;color:var(--gold-ink)">Huawei Mate XT · ${escapeHtml(label)}</span>`
      : `
        <div class="matext-switcher" role="group" aria-label="Режим экрана Huawei Mate XT">
          <button class="matext-pill-btn ${ui.postureOverride === "auto" ? "active" : ""}" data-posture="auto">Авто</button>
          <button class="matext-pill-btn ${ui.postureOverride === "single" ? "active" : ""}" data-posture="single">6.4" (1)</button>
          <button class="matext-pill-btn ${ui.postureOverride === "dual" ? "active" : ""}" data-posture="dual">7.9" (2)</button>
          <button class="matext-pill-btn ${ui.postureOverride === "triple" ? "active" : ""}" data-posture="triple">10.2" (3)</button>
        </div>
      `;

    return `
      <div class="matext-strip">
        <div class="matext-strip-left">
          <span class="matext-dot"></span>
          <span><strong>Mate XT Ultimate Design</strong> · ${escapeHtml(label)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          ${switcher}
          <button class="btn-ghost btn-sm" id="btn-toggle-theme" style="min-height:30px;padding:4px 9px;" title="Сменить тему">
            ${state.theme === "dark" ? ICONS.sun : ICONS.moon}
          </button>
        </div>
      </div>
    `;
  }

  /* ---------- LANDING VIEW (Exact Aesthetic of User's Screenshots) ---------- */
  function renderLanding() {
    const sample = DATA.EXPRESSIONS[ui.showcaseIdx % DATA.EXPRESSIONS.length];
    const mod = getModule(sample.module);

    return `
      <header class="landing-header">
        <button class="brand" id="btn-brand-home">
          <span class="brand-badge">К</span>
          <span class="brand-text">
            <span class="brand-name">Красноречие</span>
          </span>
        </button>
        <div class="landing-nav-actions">
          <button class="btn btn-ghost" id="btn-landing-login">Войти</button>
          <button class="btn btn-primary btn-sm" id="btn-landing-start" style="min-height:44px;padding:10px 20px;">Начать бесплатно</button>
        </div>
      </header>

      <main class="landing-main">
        <section class="hero-grid">
          <div>
            <div class="audience-pill">Для дипломатов, политиков и преподавателей</div>
            <h1 class="hero-title">Речь, которая <span class="accent">звучит.</span></h1>
            <p class="hero-lead">
              Раньше богатство речи давала русская классика. Сегодня на неё нет времени — но есть 10 минут в день.
              Короткие уроки в духе Duolingo добавляют в вашу речь красивые слова, обороты и крылатые выражения.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary" id="btn-create-account">Создать аккаунт</button>
              <a class="btn btn-outline" href="/downloads/retorika.apk" download="retorika.apk" id="btn-download-apk">
                ${ICONS.phone} Скачать APK
              </a>
              <button class="btn btn-outline" id="btn-start-demo">Посмотреть демо</button>
            </div>
            <div class="hero-stats">
              <div>
                <div class="stat-val">${DATA.EXPRESSIONS.length}+</div>
                <div class="stat-label">выражений</div>
              </div>
              <div>
                <div class="stat-val">4</div>
                <div class="stat-label">типа заданий</div>
              </div>
              <div>
                <div class="stat-val">10 мин</div>
                <div class="stat-label">в день</div>
              </div>
            </div>
          </div>

          <aside class="hero-showcase" aria-label="Карточка выражения дня">
            <div class="showcase-eyebrow">
              <span>Выражение дня · ${escapeHtml(mod.shortTitle)}</span>
              <span>${escapeHtml(sample.register)}</span>
            </div>
            <h2 class="showcase-phrase">${escapeHtml(sample.phrase)}</h2>
            <p class="showcase-meaning">${escapeHtml(sample.meaning)}</p>
            <div class="showcase-quote">«${escapeHtml(sample.fullSentence)}»</div>
            <div class="showcase-origin">${escapeHtml(sample.origin)}</div>
            <div class="showcase-footer">
              <button class="btn btn-outline btn-sm" id="btn-showcase-speak">
                ${ICONS.volume} Произнести
              </button>
              <button class="btn btn-gold btn-sm" id="btn-showcase-next">
                Следующий оборот →
              </button>
            </div>
          </aside>
        </section>

        <section class="landing-section">
          <h2 class="section-heading">Создано для Huawei Mate XT Ultimate Design</h2>
          <p class="section-sub">
            Приложение без зависимостей от Google Play (100% HarmonyOS 4.2 / EMUI 14.2) и с живой адаптацией под все три режима тройного OLED-экрана — переключите режим в верхней полосе, чтобы оценить.
          </p>
          <div class="tri-fold-grid">
            <div class="info-card">
              <span class="info-card-tag">6.4" · 1008×2232</span>
              <h3>1 экран — Сложенный</h3>
              <p>Быстрые 3-минутные разминки одной рукой перед совещанием или лекцией. Удобная нижняя навигация и крупные кнопки.</p>
            </div>
            <div class="info-card">
              <span class="info-card-tag">7.9" · 2048×2232</span>
              <h3>2 экрана — «Разворот книги»</h3>
              <p>На квадратном развороте задание и литературный контекст располагаются на левой странице, а варианты ответа — на правой.</p>
            </div>
            <div class="info-card">
              <span class="info-card-tag">10.2" · 3184×2232</span>
              <h3>3 экрана — «Кабинет оратора»</h3>
              <p>Полноценный трёхколоночный интерфейс: навигация, тренажёр и постоянный «Советник по риторике» с этимологией и озвучкой.</p>
            </div>
          </div>

          <div class="download-banner">
            <div>
              <h3 class="download-banner-title">Готовый APK и репозиторий retorika для GitHub</h3>
              <p class="download-banner-sub">
                Установите подписанный APK прямо на Huawei Mate XT или скачайте архив репозитория retorika с GitHub Actions CI.
              </p>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <a class="btn btn-primary btn-sm" href="/downloads/retorika.apk" download="retorika.apk">
                ${ICONS.download} retorika.apk
              </a>
              <a class="btn btn-outline btn-sm" href="/downloads/retorika-github.zip" download="retorika-github.zip">
                ${ICONS.download} Репозиторий retorika (.zip)
              </a>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  /* ---------- MAIN APP SHELL ---------- */
  function renderAppShell(layout) {
    const goalPct = Math.min(100, Math.round((state.todayMinutes / state.user.dailyGoalMin) * 100));

    return `
      <div class="app-shell" data-layout="${layout}">
        <!-- Left Sidebar Rail (Dual & Triple) -->
        <aside class="sidebar">
          <button class="brand" id="btn-sidebar-brand">
            <span class="brand-badge">К</span>
            <span class="brand-text">
              <span class="brand-name">Красноречие</span>
              <span class="brand-sub">Mate XT Edition</span>
            </span>
          </button>

          <nav class="nav-list" aria-label="Основная навигация">
            ${navItem("lessons", ICONS.spark, "Уроки")}
            ${navItem("lexicon", ICONS.book, "Словарь (64)")}
            ${navItem("rehearsal", ICONS.layers, "Репетиция")}
            ${navItem("profile", ICONS.user, "Профиль")}
          </nav>

          <div class="sidebar-goal-card">
            <div class="goal-row">
              <span>Цель дня</span>
              <span style="color:var(--burgundy)">${state.todayMinutes} / ${state.user.dailyGoalMin} мин</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${goalPct}%"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:12.5px;color:var(--ink-secondary);">
              <span>🔥 Серия: <strong>${state.streak} дн.</strong></span>
              <span><strong>${state.xp} XP</strong></span>
            </div>
          </div>
        </aside>

        <!-- Center Workspace -->
        <div style="min-width:0;">
          <header class="mobile-topbar">
            <button class="brand" id="btn-mobile-brand">
              <span class="brand-badge" style="width:36px;height:36px;font-size:18px;border-radius:10px;">К</span>
              <span class="brand-name" style="font-size:19px;">Красноречие</span>
            </button>
            <div class="stat-pills">
              <span class="mini-pill streak">${ICONS.flame} ${state.streak}</span>
              <span class="mini-pill">${state.xp} XP</span>
            </div>
          </header>

          <main class="main-canvas">
            ${renderMainTabContent(layout)}
          </main>
        </div>

        <!-- Right Companion Panel (Triple 10.2" Unfolded Mode) -->
        <aside class="companion-panel">
          ${renderCompanionPanel()}
        </aside>

        <!-- Bottom Navigation Bar (Single 6.4" Folded Mode) -->
        <nav class="bottom-nav" aria-label="Нижняя навигация">
          ${bottomNavBtn("lessons", ICONS.spark, "Уроки")}
          ${bottomNavBtn("lexicon", ICONS.book, "Словарь")}
          ${bottomNavBtn("rehearsal", ICONS.layers, "Репетиция")}
          ${bottomNavBtn("profile", ICONS.user, "Профиль")}
        </nav>
      </div>
    `;
  }

  function navItem(id, icon, label) {
    const active = ui.tab === id && !ui.activeLesson ? "active" : (id === "lessons" && ui.activeLesson ? "active" : "");
    return `
      <button class="nav-item ${active}" data-nav="${id}" title="${escapeHtml(label)}">
        <span class="nav-icon">${icon}</span>
        <span class="nav-label">${escapeHtml(label)}</span>
      </button>
    `;
  }

  function bottomNavBtn(id, icon, label) {
    const active = ui.tab === id ? "active" : "";
    return `
      <button class="bottom-nav-btn ${active}" data-nav="${id}">
        ${icon}
        <span>${escapeHtml(label)}</span>
      </button>
    `;
  }

  function renderMainTabContent(layout) {
    if (ui.activeLesson) return renderLessonArena(layout);
    if (ui.tab === "lexicon") return renderLexicon(layout);
    if (ui.tab === "rehearsal") return renderRehearsal();
    if (ui.tab === "profile") return renderProfile(layout);
    return renderLessonsDashboard();
  }

  /* ---------- TAB 1: LESSONS DASHBOARD ---------- */
  function renderLessonsDashboard() {
    const mastered = masteredCount();
    const quote = DATA.DAILY_QUOTES[new Date().getDate() % DATA.DAILY_QUOTES.length];

    return `
      <div class="workspace-header">
        <div>
          <h1 class="page-title">Добро пожаловать, ${escapeHtml(state.user.name)}</h1>
          <p class="page-subtitle">Трек: ${escapeHtml(state.user.role)} · Освоено ${mastered} из ${DATA.EXPRESSIONS.length} выражений</p>
        </div>
        ${!isNativeApk ? `<button class="btn btn-outline btn-sm" id="btn-back-landing">О приложении и APK</button>` : ""}
      </div>

      <section class="daily-hero-card">
        <div>
          <span class="pill-light">Ежедневная практика · 10 минут</span>
          <h2>Урок дня для отточенной речи</h2>
          <p>8 коротких заданий всех 4 типов: смысл, контекст выступления, стилистический апгрейд и сборка оборота.</p>
        </div>
        <button class="btn btn-ivory" id="btn-start-daily">Начать урок дня →</button>
      </section>

      <h2 style="font-family:var(--font-serif);font-size:21px;margin:0 0 14px;">Программа из 6 модулей</h2>
      <div class="modules-grid">
        ${DATA.MODULES.map((m) => {
          const pr = moduleProgress(m.id);
          return `
            <article class="module-card">
              <div class="module-top">
                <span class="module-num">Модуль ${m.num}</span>
                <span class="module-meta">${pr.done} / ${pr.total} освоено</span>
              </div>
              <h3 class="module-title">${escapeHtml(m.title)}</h3>
              <p class="module-sub">${escapeHtml(m.subtitle)}</p>
              <div class="progress-track">
                <div class="progress-fill" style="width:${pr.pct}%"></div>
              </div>
              <div class="module-footer">
                <span style="font-size:12px;color:var(--ink-muted)">~${m.estimatedMin} мин · 4 типа</span>
                <button class="btn btn-primary btn-sm" data-start-module="${m.id}">Заниматься</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>

      <div class="info-card" style="margin-top:22px;">
        <div class="companion-label">Мысль дня</div>
        <p style="font-family:var(--font-serif);font-size:17px;color:var(--ink);margin:0 0 8px;">«${escapeHtml(quote.text)}»</p>
        <div style="font-size:13px;color:var(--ink-muted);">— ${escapeHtml(quote.author)}, ${escapeHtml(quote.role)}</div>
      </div>
    `;
  }

  /* ---------- ACTIVE LESSON ARENA (4 DUOLINGO TASK MODES) ---------- */
  function renderLessonArena(layout) {
    const lesson = ui.activeLesson;

    if (lesson.finished) {
      const pct = Math.round((lesson.correctCount / lesson.exercises.length) * 100);
      return `
        <div class="lesson-wrap">
          <div class="exercise-card" style="text-align:center;padding:38px 26px;">
            <div class="audience-pill" style="margin-bottom:14px;">Урок завершён</div>
            <h1 class="page-title" style="font-size:32px;margin-bottom:10px;">Блестящая работа!</h1>
            <p class="page-subtitle" style="margin-bottom:26px;">
              Ваша речь стала богаче ещё на несколько отточенных оборотов.
            </p>
            <div class="hero-stats" style="justify-content:center;border-top:none;padding-top:0;margin-bottom:28px;">
              <div>
                <div class="stat-val" style="color:var(--burgundy)">+${lesson.earnedXp} XP</div>
                <div class="stat-label">заработано</div>
              </div>
              <div>
                <div class="stat-val">${pct}%</div>
                <div class="stat-label">точность (${lesson.correctCount}/${lesson.exercises.length})</div>
              </div>
              <div>
                <div class="stat-val">${state.streak} дн.</div>
                <div class="stat-label">ударная серия</div>
              </div>
            </div>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
              <button class="btn btn-primary" id="btn-lesson-done">К модулям</button>
              <button class="btn btn-outline" id="btn-lesson-repeat">Пройти ещё урок</button>
            </div>
          </div>
        </div>
      `;
    }

    const ex = lesson.exercises[lesson.index];
    const progressPct = Math.round(((lesson.index + (ex.checked ? 1 : 0)) / lesson.exercises.length) * 100);
    const letters = ["А", "Б", "В", "Г"];

    let taskBadge = "";
    let promptHtml = "";
    let interactiveHtml = "";

    if (ex.type === "meaning") {
      taskBadge = "Задание 1 из 4 · Точный смысл";
      promptHtml = `
        <h2 class="exercise-prompt">Что означает выражение «${escapeHtml(ex.expr.phrase)}»?</h2>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap;">
          <span class="module-num">${escapeHtml(ex.expr.register)}</span>
          <button class="btn btn-outline btn-sm" id="btn-ex-speak">${ICONS.volume} Произнести</button>
        </div>
        <p style="font-size:13.5px;color:var(--ink-muted);margin:0;">Выберите наиболее точное определение, подходящее для официальной и публичной речи.</p>
      `;
      interactiveHtml = renderChoicesList(ex, letters);
    } else if (ex.type === "context") {
      taskBadge = "Задание 2 из 4 · В контексте речи";
      const filled = ex.selectedIdx !== null ? ex.options[ex.selectedIdx].text : " . . . ";
      promptHtml = `
        <h2 class="exercise-prompt">Заполните пропуск в выступлении</h2>
        <div class="exercise-context">
          «${escapeHtml(ex.expr.sentenceBefore)}<span class="blank-slot">${escapeHtml(filled)}</span>${escapeHtml(ex.expr.sentenceAfter)}»
        </div>
        <p style="font-size:13.5px;color:var(--ink-muted);margin:0;">Подберите оборот, который органично вписывается по смыслу и стилю.</p>
      `;
      interactiveHtml = renderChoicesList(ex, letters);
    } else if (ex.type === "upgrade") {
      taskBadge = "Задание 3 из 4 · Усильте фразу";
      promptHtml = `
        <h2 class="exercise-prompt">Замените обыденный оборот выразительным</h2>
        <div class="plain-box">
          <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;color:var(--ink-muted)">Повседневная речь</div>
          <strong>«${escapeHtml(ex.expr.plainEquivalent)}»</strong>
        </div>
        <p style="font-size:13.5px;color:var(--ink-muted);margin:12px 0 0;">Какое выражение сделает эту мысль весомее и благороднее?</p>
      `;
      interactiveHtml = renderChoicesList(ex, letters);
    } else {
      // builder
      taskBadge = "Задание 4 из 4 · Собери оборот";
      promptHtml = `
        <h2 class="exercise-prompt">Соберите красивую формулировку из слов</h2>
        <div class="plain-box">
          <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;color:var(--ink-muted)">Смысл выражения</div>
          <strong>${escapeHtml(ex.expr.meaning)}</strong>
        </div>
        <p style="font-size:13px;color:var(--ink-muted);margin:10px 0 0;">Нажимайте на слова по порядку. Чтобы убрать слово, нажмите на него в верхней рамке.</p>
      `;

      const placedChips = ex.placed.length
        ? ex.placed.map((id) => {
            const item = ex.bank.find((b) => b.id === id);
            return `<button class="word-tile placed" data-remove-tile="${id}" ${ex.checked ? "disabled" : ""}>${escapeHtml(item.word)}</button>`;
          }).join("")
        : `<span style="color:var(--ink-muted);font-size:14px;">Соберите оборот здесь…</span>`;

      const bankChips = ex.bank.map((item) => {
        const used = ex.placed.includes(item.id);
        return `<button class="word-tile ${used ? "used" : ""}" data-add-tile="${item.id}" ${ex.checked || used ? "disabled" : ""}>${escapeHtml(item.word)}</button>`;
      }).join("");

      interactiveHtml = `
        <div class="tile-tray">${placedChips}</div>
        <div class="tile-bank">${bankChips}</div>
        ${!ex.checked && ex.placed.length > 0 ? `<button class="btn btn-ghost btn-sm" id="btn-clear-tiles" style="margin-top:10px;">Очистить</button>` : ""}
      `;
    }

    const canCheck = ex.type === "builder"
      ? ex.placed.length === ex.targetTiles.length
      : ex.selectedIdx !== null;

    const feedbackHtml = ex.checked ? `
      <div class="feedback-box ${ex.isCorrect ? "ok" : "err"}">
        <div class="feedback-title">${ex.isCorrect ? "Безупречно! +15 XP" : "Обратите внимание на нюанс"}</div>
        <p class="feedback-body">
          <strong>${escapeHtml(ex.expr.phrase)}</strong> — ${escapeHtml(ex.expr.meaning)}.
          ${ex.type === "builder" && !ex.isCorrect ? `<br/>Правильный порядок: <strong>${escapeHtml(ex.targetTiles.join(" "))}</strong>` : ""}
        </p>
        <p class="feedback-origin"><strong>Происхождение:</strong> ${escapeHtml(ex.expr.origin)}</p>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" id="btn-fb-speak">${ICONS.volume} Послушать фразу</button>
          <button class="btn btn-ghost btn-sm" data-fav="${ex.expr.id}">
            ${state.favorites.includes(ex.expr.id) ? ICONS.starFilled + " В репертуаре" : ICONS.star + " В репертуар"}
          </button>
        </div>
      </div>
    ` : "";

    return `
      <div class="lesson-wrap">
        <div class="lesson-topbar">
          <button class="btn btn-ghost btn-sm" id="btn-exit-lesson" aria-label="Выйти из урока">${ICONS.close}</button>
          <div class="lesson-progress-bar">
            <div class="lesson-progress-fill" style="width:${progressPct}%"></div>
          </div>
          <span class="lesson-counter">${lesson.index + 1} / ${lesson.exercises.length}</span>
        </div>

        <div class="exercise-stage">
          <div class="exercise-card">
            <div class="task-type-badge">${taskBadge}</div>
            ${promptHtml}
          </div>

          <div class="exercise-card">
            ${interactiveHtml}
            ${feedbackHtml}
            <div class="lesson-footer-actions">
              <span style="font-size:12.5px;color:var(--ink-muted)">${escapeHtml(lesson.title)}</span>
              ${ex.checked
                ? `<button class="btn btn-primary" id="btn-next-ex">${lesson.index + 1 === lesson.exercises.length ? "Завершить урок" : "Далее →"}</button>`
                : `<button class="btn btn-primary" id="btn-check-ex" ${canCheck ? "" : "disabled style='opacity:0.45;cursor:not-allowed'"}>Проверить</button>`
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderChoicesList(ex, letters) {
    return `
      <div class="choices-list">
        ${ex.options.map((opt, idx) => {
          let cls = "";
          if (ex.checked) {
            if (opt.correct) cls = "correct";
            else if (idx === ex.selectedIdx) cls = "wrong";
          } else if (idx === ex.selectedIdx) {
            cls = "selected";
          }
          return `
            <button class="choice-btn ${cls}" data-choice="${idx}" ${ex.checked ? "disabled" : ""}>
              <span class="choice-index">${letters[idx]}</span>
              <span>${escapeHtml(opt.text)}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  /* ---------- TAB 2: DICTIONARY / LEXICON (64 EXPRESSIONS) ---------- */
  function renderLexicon(layout) {
    const q = ui.lexSearch.trim().toLowerCase();
    const filtered = DATA.EXPRESSIONS.filter((e) => {
      if (ui.lexModule === "favorites" && !state.favorites.includes(e.id)) return false;
      else if (ui.lexModule !== "all" && ui.lexModule !== "favorites" && e.module !== ui.lexModule) return false;
      if (!q) return true;
      return (
        e.plainPhrase.toLowerCase().includes(q) ||
        e.meaning.toLowerCase().includes(q) ||
        e.origin.toLowerCase().includes(q) ||
        e.fullSentence.toLowerCase().includes(q)
      );
    });

    return `
      <div class="workspace-header">
        <div>
          <h1 class="page-title">Словарь красноречия</h1>
          <p class="page-subtitle">Показано ${filtered.length} из ${DATA.EXPRESSIONS.length} выражений · Нажмите для разбора и озвучки</p>
        </div>
      </div>

      <div class="search-bar-row">
        <input type="search" class="search-input" id="lex-search-input" placeholder="Поиск по выражению, смыслу или автору (Пушкин, Грибоедов…)" value="${escapeHtml(ui.lexSearch)}" />
      </div>

      <div class="filter-chips">
        <button class="chip ${ui.lexModule === "all" ? "active" : ""}" data-lex-filter="all">Все (${DATA.EXPRESSIONS.length})</button>
        <button class="chip ${ui.lexModule === "favorites" ? "active" : ""}" data-lex-filter="favorites">★ Мой репертуар (${state.favorites.length})</button>
        ${DATA.MODULES.map((m) => `
          <button class="chip ${ui.lexModule === m.id ? "active" : ""}" data-lex-filter="${m.id}">${escapeHtml(m.shortTitle)}</button>
        `).join("")}
      </div>

      ${filtered.length === 0 ? `
        <div class="info-card" style="text-align:center;padding:36px;">
          <p style="margin:0;color:var(--ink-secondary)">По запросу «${escapeHtml(ui.lexSearch)}» ничего не найдено.</p>
        </div>
      ` : `
        <div class="lexicon-grid">
          ${filtered.map((e) => {
            const fav = state.favorites.includes(e.id);
            const mVal = state.mastery[e.id] || 0;
            const selected = e.id === ui.selectedExprId && layout === "triple";
            return `
              <article class="lex-card ${selected ? "selected" : ""}" data-open-expr="${e.id}">
                <div class="lex-card-top">
                  <span class="module-num" style="font-size:11px;">${escapeHtml(e.register)}</span>
                  <span style="font-size:12px;color:${fav ? "var(--gold-ink)" : "var(--ink-muted)"};font-weight:700;">
                    ${fav ? "★ " : ""}${mVal}%
                  </span>
                </div>
                <h3 class="lex-phrase">${escapeHtml(e.phrase)}</h3>
                <p class="lex-meaning">${escapeHtml(e.meaning)}</p>
              </article>
            `;
          }).join("")}
        </div>
      `}
    `;
  }

  /* ---------- TAB 3: REHEARSAL / FLASHCARDS ---------- */
  function renderRehearsal() {
    if (!ui.rehearsal.deck.length) initRehearsal(false);
    const card = ui.rehearsal.deck[ui.rehearsal.index % ui.rehearsal.deck.length];
    const mod = getModule(card.module);

    return `
      <div class="workspace-header">
        <div>
          <h1 class="page-title">Репетиция речи</h1>
          <p class="page-subtitle">Карточки для быстрой разминки перед переговорами, выступлением или лекцией</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="chip ${!ui.rehearsal.onlyFavorites ? "active" : ""}" id="btn-reh-all">Все (${DATA.EXPRESSIONS.length})</button>
          <button class="chip ${ui.rehearsal.onlyFavorites ? "active" : ""}" id="btn-reh-fav">★ Репертуар (${state.favorites.length})</button>
        </div>
      </div>

      <div class="flashcard-box">
        <div style="display:flex;justify-content:center;gap:8px;align-items:center;">
          <span class="module-num">${escapeHtml(mod.shortTitle)}</span>
          <span class="module-meta">Карточка ${(ui.rehearsal.index % ui.rehearsal.deck.length) + 1} из ${ui.rehearsal.deck.length}</span>
        </div>

        <h2 class="flashcard-phrase">${escapeHtml(card.phrase)}</h2>

        <div style="display:flex;justify-content:center;gap:10px;">
          <button class="btn btn-outline btn-sm" id="btn-reh-speak">${ICONS.volume} Произнести</button>
          <button class="btn btn-ghost btn-sm" data-fav="${card.id}">
            ${state.favorites.includes(card.id) ? ICONS.starFilled + " В репертуаре" : ICONS.star + " Сохранить"}
          </button>
        </div>

        ${ui.rehearsal.flipped ? `
          <div style="text-align:left;border-top:1px solid var(--border);padding-top:18px;margin-top:6px;">
            <p style="margin:0 0 10px;font-size:15.5px;color:var(--ink);"><strong>Смысл:</strong> ${escapeHtml(card.meaning)}</p>
            <div class="showcase-quote" style="margin-bottom:10px;">«${escapeHtml(card.fullSentence)}»</div>
            <p style="margin:0 0 6px;font-size:13px;color:var(--ink-secondary);"><strong>Происхождение:</strong> ${escapeHtml(card.origin)}</p>
            <p style="margin:0;font-size:13px;color:var(--gold-ink);"><strong>Совет оратору:</strong> ${escapeHtml(card.tip)}</p>
          </div>
          <div style="display:flex;gap:12px;justify-content:center;margin-top:14px;flex-wrap:wrap;">
            <button class="btn btn-outline" id="btn-reh-again">Повторить позже</button>
            <button class="btn btn-primary" id="btn-reh-know">Помню уверенно (+10 XP)</button>
          </div>
        ` : `
          <p style="color:var(--ink-muted);font-size:14.5px;margin:4px 0 8px;">Попробуйте мысленно сформулировать значение и пример употребления вслух.</p>
          <div>
            <button class="btn btn-primary" id="btn-reh-flip">Показать разбор</button>
          </div>
        `}
      </div>
    `;
  }

  /* ---------- TAB 4: PROFILE & HUAWEI MATE XT HARDWARE DIAGNOSTICS ---------- */
  function renderProfile(layout) {
    const info = ui.deviceInfo || Native.getDeviceInfo();
    const mastered = masteredCount();

    return `
      <div class="workspace-header">
        <div>
          <h1 class="page-title">Профиль и устройство</h1>
          <p class="page-subtitle">Персональные настройки тренажёра и статус Huawei Mate XT Ultimate Design</p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-edit-profile">Изменить профиль</button>
      </div>

      <div class="modules-grid">
        <div class="info-card">
          <div class="companion-label">Личная карточка</div>
          <h3 style="margin-bottom:4px;">${escapeHtml(state.user.name)}</h3>
          <p style="margin-bottom:14px;">Направление: <strong>${escapeHtml(state.user.role)}</strong> · Цель: <strong>${state.user.dailyGoalMin} мин/день</strong></p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center;background:var(--bg);padding:14px;border-radius:12px;border:1px solid var(--border);">
            <div><div style="font-family:var(--font-serif);font-size:22px;font-weight:700;color:var(--burgundy)">${state.xp}</div><div style="font-size:12px;color:var(--ink-muted)">XP</div></div>
            <div><div style="font-family:var(--font-serif);font-size:22px;font-weight:700">${state.streak}</div><div style="font-size:12px;color:var(--ink-muted)">Дней подряд</div></div>
            <div><div style="font-family:var(--font-serif);font-size:22px;font-weight:700">${mastered}/${DATA.EXPRESSIONS.length}</div><div style="font-size:12px;color:var(--ink-muted)">Освоено</div></div>
          </div>
        </div>

        <div class="info-card">
          <div class="companion-label">Huawei Mate XT · Адаптивный экран</div>
          <h3 style="margin-bottom:6px;">${escapeHtml(postureLabel(layout))}</h3>
          <p style="margin-bottom:10px;">
            Среда: <strong>${isNativeApk ? "Нативное APK (GMS-free · HarmonyOS / Android)" : "Веб-приложение / PWA"}</strong><br/>
            Устройство: <strong>${escapeHtml(info.model || "Huawei Mate XT Ultimate Design")}</strong><br/>
            Логический размер: <strong>${info.widthDp || window.innerWidth} × ${info.heightDp || window.innerHeight} dp</strong>
          </p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
            <button class="btn btn-outline btn-sm" id="btn-profile-theme">
              ${state.theme === "dark" ? ICONS.sun + " Светлая «Бумага»" : ICONS.moon + " Тёмный «Вечерний кабинет»"}
            </button>
            ${!isNativeApk ? `
              <a class="btn btn-primary btn-sm" href="/downloads/retorika.apk" download="retorika.apk">
                ${ICONS.download} Скачать APK
              </a>
            ` : ""}
          </div>
        </div>
      </div>

      <div class="info-card" style="margin-top:16px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;">
        <div>
          <h3 style="margin-bottom:4px;">Резервная копия прогресса</h3>
          <p>Все данные хранятся локально на вашем Huawei Mate XT — работает без интернета в самолёте и на переговорах.</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" id="btn-export-progress">Экспорт JSON</button>
          <button class="btn btn-ghost btn-sm" id="btn-reset-progress" style="color:var(--err)">Сбросить прогресс</button>
        </div>
      </div>
    `;
  }

  /* ---------- RIGHT COMPANION PANEL (TRIPLE 10.2" MODE) ---------- */
  function renderCompanionPanel() {
    // During an active unchecked exercise, avoid spoiling the answer!
    if (ui.activeLesson && !ui.activeLesson.finished) {
      const ex = ui.activeLesson.exercises[ui.activeLesson.index];
      if (ex && !ex.checked) {
        const mod = getModule(ex.expr.module);
        return `
          <div>
            <div class="companion-label">Режим урока · 10.2"</div>
            <h2 style="font-family:var(--font-serif);font-size:21px;margin:0 0 6px;">${escapeHtml(ui.activeLesson.title)}</h2>
            <p style="font-size:13.5px;color:var(--ink-secondary);margin:0;">
              Разбор выражения, его литературное происхождение и совет по интонации откроются сразу после проверки ответа.
            </p>
          </div>
          <div class="companion-card">
            <div class="companion-label">Текущий модуль</div>
            <div style="font-family:var(--font-serif);font-size:16px;font-weight:700;margin-bottom:4px;">${escapeHtml(mod.title)}</div>
            <div style="font-size:13px;color:var(--ink-secondary);">${escapeHtml(mod.audience)}</div>
          </div>
          <div class="companion-card">
            <div class="companion-label">Стилистическая подсказка</div>
            <div style="font-size:14px;color:var(--ink);">Регистр выражения: <strong>${escapeHtml(ex.expr.register)}</strong></div>
          </div>
          <div class="companion-card">
            <div class="goal-row" style="margin-bottom:6px;">
              <span>Верных ответов в уроке</span>
              <span style="color:var(--burgundy)">${ui.activeLesson.correctCount} / ${ui.activeLesson.exercises.length}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${Math.round((ui.activeLesson.correctCount / ui.activeLesson.exercises.length) * 100)}%"></div>
            </div>
          </div>
        `;
      }
    }

    // Avoid spoiling flashcards before the user flips the card
    if (ui.tab === "rehearsal" && !ui.rehearsal.flipped) {
      return `
        <div>
          <div class="companion-label">Репетиция речи · 10.2"</div>
          <h2 style="font-family:var(--font-serif);font-size:21px;margin:0 0 6px;">Попробуйте вспомнить вслух</h2>
          <p style="font-size:13.5px;color:var(--ink-secondary);margin:0;">
            Нажмите «Показать разбор» — здесь мгновенно появятся этимология, литературный контекст и совет по интонации.
          </p>
        </div>
        <div class="companion-card">
          <div class="companion-label">Совет перед выступлением</div>
          <p style="font-size:13.5px;color:var(--ink-secondary);margin:0;">
            Проговаривайте выражение вслух в составе собственного предложения — так оборот переходит из пассивного словаря в активную речь.
          </p>
        </div>
      `;
    }

    const expr = getExpr(ui.selectedExprId);
    const mod = getModule(expr.module);
    const fav = state.favorites.includes(expr.id);
    const mastery = state.mastery[expr.id] || 0;

    return `
      <div>
        <div class="companion-label">Советник по риторике · 10.2"</div>
        <h2 style="font-family:var(--font-serif);font-size:23px;color:var(--burgundy);margin:0 0 6px;line-height:1.25;">${escapeHtml(expr.phrase)}</h2>
        <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;">
          <span class="module-num" style="font-size:11px;">${escapeHtml(mod.shortTitle)}</span>
          <span class="mini-pill" style="font-size:11.5px;padding:3px 9px;">${escapeHtml(expr.register)}</span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" id="btn-comp-speak">${ICONS.volume} Озвучить</button>
          <button class="btn btn-ghost btn-sm" data-fav="${expr.id}">
            ${fav ? ICONS.starFilled : ICONS.star}
          </button>
          <button class="btn btn-ghost btn-sm" id="btn-comp-share">${ICONS.share}</button>
        </div>
      </div>

      <div class="companion-card">
        <div class="companion-label">Значение и замена</div>
        <p style="font-size:14px;margin:0 0 10px;color:var(--ink);">${escapeHtml(expr.meaning)}</p>
        <div style="font-size:12.5px;color:var(--ink-secondary);">
          Вместо обыденного: <em>«${escapeHtml(expr.plainEquivalent)}»</em>
        </div>
      </div>

      <div class="companion-card">
        <div class="companion-label">Пример в речи</div>
        <p style="font-size:14px;margin:0;color:var(--ink);font-style:italic;">«${escapeHtml(expr.fullSentence)}»</p>
      </div>

      <div class="companion-card">
        <div class="companion-label">Происхождение и совет</div>
        <p style="font-size:13px;margin:0 0 10px;color:var(--ink-secondary);">${escapeHtml(expr.origin)}</p>
        <p style="font-size:13px;margin:0;color:var(--gold-ink);font-weight:600;">${escapeHtml(expr.tip)}</p>
      </div>

      <div class="companion-card">
        <div class="goal-row" style="margin-bottom:6px;">
          <span>Владение оборотом</span>
          <span style="color:var(--burgundy)">${mastery}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${mastery}%"></div>
        </div>
      </div>
    `;
  }

  /* ---------- MODALS (Account Setup / Phrase Detail Sheet on 6.4" & 7.9") ---------- */
  function renderModal() {
    if (!ui.modal) return "";

    if (ui.modal.type === "account") {
      const roles = ["Дипломат", "Политик", "Преподаватель", "Публичный оратор"];
      return `
        <div class="modal-backdrop" id="modal-backdrop">
          <div class="modal-sheet" role="dialog" aria-modal="true">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <h2 style="font-family:var(--font-serif);font-size:24px;margin:0;">Ваш кабинет красноречия</h2>
              <button class="btn btn-ghost btn-sm" id="btn-close-modal">${ICONS.close}</button>
            </div>
            <p style="font-size:14px;color:var(--ink-secondary);margin:0 0 18px;">
              Аккаунт сохраняется локально на устройстве — никаких паролей и обязательного интернета.
            </p>
            <div class="field-group">
              <label class="field-label" for="input-user-name">Как к вам обращаться</label>
              <input class="field-input" id="input-user-name" type="text" placeholder="Например, Александр Сергеевич" value="${escapeHtml(state.user.created ? state.user.name : "")}" />
            </div>
            <div class="field-group">
              <label class="field-label">Профессиональный фокус</label>
              <div class="role-grid">
                ${roles.map((r) => `
                  <button type="button" class="role-btn ${state.user.role === r ? "active" : ""}" data-pick-role="${r}">${r}</button>
                `).join("")}
              </div>
            </div>
            <div class="field-group">
              <label class="field-label">Ежедневная цель</label>
              <div style="display:flex;gap:8px;">
                ${[5, 10, 15].map((min) => `
                  <button type="button" class="chip ${state.user.dailyGoalMin === min ? "active" : ""}" data-pick-goal="${min}">${min} мин / день</button>
                `).join("")}
              </div>
            </div>
            <button class="btn btn-primary" id="btn-save-account" style="width:100%;margin-top:6px;">
              Сохранить и перейти к урокам
            </button>
          </div>
        </div>
      `;
    }

    if (ui.modal.type === "phrase") {
      const expr = getExpr(ui.modal.exprId);
      const fav = state.favorites.includes(expr.id);
      return `
        <div class="modal-backdrop" id="modal-backdrop">
          <div class="modal-sheet" role="dialog" aria-modal="true">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px;">
              <div>
                <span class="module-num" style="font-size:11px;">${escapeHtml(expr.register)}</span>
                <h2 style="font-family:var(--font-serif);font-size:25px;color:var(--burgundy);margin:8px 0 0;">${escapeHtml(expr.phrase)}</h2>
              </div>
              <button class="btn btn-ghost btn-sm" id="btn-close-modal">${ICONS.close}</button>
            </div>
            <p style="font-size:15px;margin:0 0 14px;">${escapeHtml(expr.meaning)}</p>
            <div class="showcase-quote">«${escapeHtml(expr.fullSentence)}»</div>
            <p style="font-size:13.5px;color:var(--ink-secondary);margin:0 0 10px;"><strong>Происхождение:</strong> ${escapeHtml(expr.origin)}</p>
            <p style="font-size:13.5px;color:var(--gold-ink);margin:0 0 18px;"><strong>Совет оратору:</strong> ${escapeHtml(expr.tip)}</p>
            <div style="display:flex;gap:9px;flex-wrap:wrap;">
              <button class="btn btn-primary btn-sm" id="btn-modal-speak">${ICONS.volume} Произнести</button>
              <button class="btn btn-outline btn-sm" data-fav="${expr.id}">
                ${fav ? ICONS.starFilled + " В репертуаре" : ICONS.star + " В репертуар"}
              </button>
              <button class="btn btn-outline btn-sm" id="btn-modal-share">${ICONS.share} Поделиться</button>
            </div>
          </div>
        </div>
      `;
    }

    return "";
  }

  /* ========================================================================
     Master Render & Event Binding
     ======================================================================== */
  function render() {
    applyTheme();
    applyBodyPostureClass();
    const layout = effectiveLayout();
    const root = document.getElementById("app");
    if (!root) return;

    root.innerHTML = `
      ${renderMateXTStrip(layout)}
      <div class="posture-frame-wrap">
        <div class="posture-frame">
          ${ui.screen === "landing" ? renderLanding() : renderAppShell(layout)}
        </div>
      </div>
      ${renderModal()}
      <div id="toast-host">${ui.toastMsg ? `<div class="toast">${escapeHtml(ui.toastMsg)}</div>` : ""}</div>
    `;

    bindEvents(layout);
  }

  function bindEvents(layout) {
    // Posture preview switcher (web mode)
    document.querySelectorAll("[data-posture]").forEach((btn) => {
      btn.addEventListener("click", () => {
        ui.postureOverride = btn.getAttribute("data-posture");
        render();
      });
    });

    // Theme toggle
    const toggleTheme = () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      saveState();
      render();
    };
    document.getElementById("btn-toggle-theme")?.addEventListener("click", toggleTheme);
    document.getElementById("btn-profile-theme")?.addEventListener("click", toggleTheme);

    // Landing actions
    document.getElementById("btn-landing-login")?.addEventListener("click", () => {
      ui.screen = "app";
      ui.tab = "lessons";
      render();
    });
    document.getElementById("btn-landing-start")?.addEventListener("click", () => {
      ui.screen = "app";
      ui.tab = "lessons";
      render();
    });
    document.getElementById("btn-create-account")?.addEventListener("click", () => {
      ui.modal = { type: "account" };
      render();
    });
    document.getElementById("btn-start-demo")?.addEventListener("click", () => startLesson("demo"));
    document.getElementById("btn-showcase-next")?.addEventListener("click", () => {
      ui.showcaseIdx = (ui.showcaseIdx + 1) % DATA.EXPRESSIONS.length;
      render();
    });
    document.getElementById("btn-showcase-speak")?.addEventListener("click", () => {
      const sample = DATA.EXPRESSIONS[ui.showcaseIdx % DATA.EXPRESSIONS.length];
      Native.speak(sample.plainPhrase + ". " + sample.fullSentence);
    });
    document.getElementById("btn-back-landing")?.addEventListener("click", () => {
      ui.activeLesson = null;
      ui.screen = "landing";
      render();
    });

    // Navigation items
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Native.vibrate("tap");
        ui.activeLesson = null;
        ui.tab = btn.getAttribute("data-nav");
        if (ui.tab === "rehearsal" && !ui.rehearsal.deck.length) initRehearsal(false);
        render();
      });
    });

    // Brand clicks inside app
    document.getElementById("btn-sidebar-brand")?.addEventListener("click", () => {
      ui.activeLesson = null;
      ui.tab = "lessons";
      render();
    });
    document.getElementById("btn-mobile-brand")?.addEventListener("click", () => {
      ui.activeLesson = null;
      ui.tab = "lessons";
      render();
    });

    // Start daily & module lessons
    document.getElementById("btn-start-daily")?.addEventListener("click", () => startLesson("daily"));
    document.querySelectorAll("[data-start-module]").forEach((btn) => {
      btn.addEventListener("click", () => startLesson("module", btn.getAttribute("data-start-module")));
    });

    // Lesson Arena bindings
    document.getElementById("btn-exit-lesson")?.addEventListener("click", () => {
      ui.activeLesson = null;
      render();
    });
    document.getElementById("btn-ex-speak")?.addEventListener("click", () => {
      const ex = ui.activeLesson?.exercises[ui.activeLesson.index];
      if (ex) Native.speak(ex.expr.plainPhrase);
    });
    document.getElementById("btn-fb-speak")?.addEventListener("click", () => {
      const ex = ui.activeLesson?.exercises[ui.activeLesson.index];
      if (ex) Native.speak(ex.expr.fullSentence);
    });
    document.querySelectorAll("[data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ex = ui.activeLesson?.exercises[ui.activeLesson.index];
        if (!ex || ex.checked) return;
        Native.vibrate("tap");
        ex.selectedIdx = Number(btn.getAttribute("data-choice"));
        render();
      });
    });
    document.querySelectorAll("[data-add-tile]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ex = ui.activeLesson?.exercises[ui.activeLesson.index];
        if (!ex || ex.checked) return;
        Native.vibrate("tap");
        const id = Number(btn.getAttribute("data-add-tile"));
        if (!ex.placed.includes(id)) ex.placed.push(id);
        render();
      });
    });
    document.querySelectorAll("[data-remove-tile]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ex = ui.activeLesson?.exercises[ui.activeLesson.index];
        if (!ex || ex.checked) return;
        Native.vibrate("tap");
        const id = Number(btn.getAttribute("data-remove-tile"));
        ex.placed = ex.placed.filter((x) => x !== id);
        render();
      });
    });
    document.getElementById("btn-clear-tiles")?.addEventListener("click", () => {
      const ex = ui.activeLesson?.exercises[ui.activeLesson.index];
      if (ex && !ex.checked) {
        ex.placed = [];
        render();
      }
    });
    document.getElementById("btn-check-ex")?.addEventListener("click", checkCurrentExercise);
    document.getElementById("btn-next-ex")?.addEventListener("click", nextExercise);
    document.getElementById("btn-lesson-done")?.addEventListener("click", () => {
      ui.activeLesson = null;
      render();
    });
    document.getElementById("btn-lesson-repeat")?.addEventListener("click", () => {
      const prev = ui.activeLesson;
      startLesson(prev?.mode === "module" ? "module" : "daily", prev?.moduleId);
    });

    // Lexicon bindings
    const searchEl = document.getElementById("lex-search-input");
    if (searchEl) {
      searchEl.addEventListener("input", (e) => {
        ui.lexSearch = e.target.value;
        const pos = searchEl.selectionStart;
        render();
        const nextEl = document.getElementById("lex-search-input");
        if (nextEl) {
          nextEl.focus();
          try { nextEl.setSelectionRange(pos, pos); } catch (_) {}
        }
      });
    }
    document.querySelectorAll("[data-lex-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        ui.lexModule = btn.getAttribute("data-lex-filter");
        render();
      });
    });
    document.querySelectorAll("[data-open-expr]").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-open-expr");
        ui.selectedExprId = id;
        if (layout !== "triple") {
          ui.modal = { type: "phrase", exprId: id };
        }
        render();
      });
    });

    // Rehearsal bindings
    document.getElementById("btn-reh-all")?.addEventListener("click", () => {
      initRehearsal(false);
      render();
    });
    document.getElementById("btn-reh-fav")?.addEventListener("click", () => {
      if (!state.favorites.length) {
        showToast("Сначала добавьте выражения звёздочкой ★");
        return;
      }
      initRehearsal(true);
      render();
    });
    document.getElementById("btn-reh-flip")?.addEventListener("click", () => {
      Native.vibrate("tap");
      ui.rehearsal.flipped = true;
      render();
    });
    document.getElementById("btn-reh-speak")?.addEventListener("click", () => {
      const card = ui.rehearsal.deck[ui.rehearsal.index % ui.rehearsal.deck.length];
      if (card) Native.speak(card.plainPhrase + ". " + card.fullSentence);
    });
    document.getElementById("btn-reh-again")?.addEventListener("click", () => {
      ui.rehearsal.index = (ui.rehearsal.index + 1) % ui.rehearsal.deck.length;
      ui.rehearsal.flipped = false;
      ui.selectedExprId = ui.rehearsal.deck[ui.rehearsal.index].id;
      render();
    });
    document.getElementById("btn-reh-know")?.addEventListener("click", () => {
      const card = ui.rehearsal.deck[ui.rehearsal.index % ui.rehearsal.deck.length];
      if (card) {
        state.xp += 10;
        state.mastery[card.id] = Math.min(100, (state.mastery[card.id] || 0) + 25);
        saveState();
      }
      Native.vibrate("ok");
      ui.rehearsal.index = (ui.rehearsal.index + 1) % ui.rehearsal.deck.length;
      ui.rehearsal.flipped = false;
      ui.selectedExprId = ui.rehearsal.deck[ui.rehearsal.index].id;
      render();
    });

    // Companion Panel & Favorites
    document.querySelectorAll("[data-fav]").forEach((btn) => {
      btn.addEventListener("click", () => toggleFavorite(btn.getAttribute("data-fav")));
    });
    document.getElementById("btn-comp-speak")?.addEventListener("click", () => {
      const expr = getExpr(ui.selectedExprId);
      Native.speak(expr.plainPhrase + ". " + expr.fullSentence);
    });
    document.getElementById("btn-comp-share")?.addEventListener("click", () => {
      const expr = getExpr(ui.selectedExprId);
      Native.share(expr.phrase, `${expr.meaning}\nПример: «${expr.fullSentence}»`);
    });

    // Profile actions
    document.getElementById("btn-edit-profile")?.addEventListener("click", () => {
      ui.modal = { type: "account" };
      render();
    });
    document.getElementById("btn-export-progress")?.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "krasnorechie-progress.json";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Прогресс экспортирован в JSON");
    });
    document.getElementById("btn-reset-progress")?.addEventListener("click", () => {
      state = defaultState();
      saveState();
      showToast("Прогресс сброшен");
      render();
    });

    // Modal bindings
    document.getElementById("btn-close-modal")?.addEventListener("click", () => {
      ui.modal = null;
      render();
    });
    document.getElementById("modal-backdrop")?.addEventListener("click", (e) => {
      if (e.target.id === "modal-backdrop") {
        ui.modal = null;
        render();
      }
    });
    document.querySelectorAll("[data-pick-role]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.user.role = btn.getAttribute("data-pick-role");
        render();
      });
    });
    document.querySelectorAll("[data-pick-goal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.user.dailyGoalMin = Number(btn.getAttribute("data-pick-goal"));
        render();
      });
    });
    document.getElementById("btn-save-account")?.addEventListener("click", () => {
      const nameInput = document.getElementById("input-user-name");
      const val = nameInput ? nameInput.value.trim() : "";
      state.user.name = val || "Оратор";
      state.user.created = true;
      saveState();
      ui.modal = null;
      ui.screen = "app";
      ui.tab = "lessons";
      Native.vibrate("ok");
      showToast(`Добро пожаловать, ${state.user.name}!`);
      render();
    });
    document.getElementById("btn-modal-speak")?.addEventListener("click", () => {
      if (ui.modal?.exprId) {
        const expr = getExpr(ui.modal.exprId);
        Native.speak(expr.plainPhrase + ". " + expr.fullSentence);
      }
    });
    document.getElementById("btn-modal-share")?.addEventListener("click", () => {
      if (ui.modal?.exprId) {
        const expr = getExpr(ui.modal.exprId);
        Native.share(expr.phrase, `${expr.meaning}\nПример: «${expr.fullSentence}»`);
      }
    });
  }

  // Re-render smoothly when resizing or folding/unfolding
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isNativeApk) {
        ui.deviceInfo = Native.getDeviceInfo();
      }
      render();
    }, 80);
  });

  // Register Service Worker in browser mode (not inside file:// Android assets)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  // Boot!
  render();
})();
