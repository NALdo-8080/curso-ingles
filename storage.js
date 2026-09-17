/**
 * storage.js - Motor de Persistencia, Gamificación XP y Sistema de Insignias
 * Sincronización híbrida: Caché síncrono en localStorage + Sincronización en la nube con Supabase.
 */

const BADGES_METADATA = [
  {
    unitId: 1,
    badgeId: "badge_phonetics",
    icon: "🎖️",
    title: "Phonetics Pioneer",
    titleEs: "Pionero de la Fonética",
    description: "Dominaste los sonidos esenciales, el alfabeto y las bases del verbo To Be.",
    unitTitle: "Unidad 1: Fundamentos & Fonética"
  },
  {
    unitId: 2,
    badgeId: "badge_routines",
    icon: "⏰",
    title: "Daily Life Navigator",
    titleEs: "Navegante de la Rutina",
    description: "Expresas tus hábitos diarios, horarios y frecuencias con Presente Simple.",
    unitTitle: "Unidad 2: Vida Diaria & Rutinas"
  },
  {
    unitId: 3,
    badgeId: "badge_describer",
    icon: "🎨",
    title: "World Describer",
    titleEs: "Arquitecto Descriptivo",
    description: "Describes objetos, personas, cantidades y pertenencias con precisión.",
    unitTitle: "Unidad 3: Describiendo el Entorno"
  },
  {
    unitId: 4,
    badgeId: "badge_action",
    icon: "🚀",
    title: "Action Hero",
    titleEs: "Héroe en Acción",
    description: "Distingues acciones en curso inmediato frente a estados permanentes.",
    unitTitle: "Unidad 4: Acciones & Movimiento"
  },
  {
    unitId: 5,
    badgeId: "badge_storyteller",
    icon: "📖",
    title: "Master Storyteller",
    titleEs: "Narrador de Historias",
    description: "Relatas memorias y anécdotas usando verbos regulares e irregulares en pasado.",
    unitTitle: "Unidad 5: El Pasado & Experiencias"
  },
  {
    unitId: 6,
    badgeId: "badge_visionary",
    icon: "🔮",
    title: "Future Architect",
    titleEs: "Arquitecto del Futuro",
    description: "Proyectas metas, planes espontáneos y escenarios condicionales.",
    unitTitle: "Unidad 6: El Futuro & Posibilidades"
  },
  {
    unitId: 7,
    badgeId: "badge_nuance",
    icon: "🎯",
    title: "Nuance & Modals Master",
    titleEs: "Maestro de los Modales",
    description: "Manejas la cortesía, probabilidad, obligación y consejos como un nativo.",
    unitTitle: "Unidad 7: Modales & Matices"
  },
  {
    unitId: 8,
    badgeId: "badge_connector",
    icon: "🌟",
    title: "Experience Connector",
    titleEs: "Conector de Experiencias",
    description: "Conectas el pasado con el presente mediante el Presente Perfecto.",
    unitTitle: "Unidad 8: Conexión & Experiencias"
  },
  {
    unitId: 9,
    badgeId: "badge_professional",
    icon: "🏆",
    title: "Bilingual Professional",
    titleEs: "Profesional Bilingüe",
    description: "Dominas phrasal verbs, etiqueta laboral y erradicaste falsos amigos.",
    unitTitle: "Unidad 9: Fluidez Real & Negocios"
  }
];

const StorageManager = {
  KEY: 'datacamp_english_course_v1',
  cache: null,
  syncTimeout: null,
  pendingLessonSync: new Set(),

  init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(this.KEY);
        if (raw) this.cache = JSON.parse(raw);
      }
    } catch(e) {
      console.warn("Storage local no disponible, usando memoria.", e);
    }

    if (!this.cache) {
      this.cache = {
        xp: 0,
        done: {},
        quizzes: {},
        exercises: {},
        unlockedHints: {},
        badges: {},
        lastLesson: 1,
        theme: 'light',
        speechRate: 0.95
      };
    }

    if (!this.cache.unlockedHints) this.cache.unlockedHints = {};
    if (!this.cache.badges) this.cache.badges = {};
    if (!this.cache.lastLesson) this.cache.lastLesson = 1;
    if (!this.cache.speechRate) this.cache.speechRate = 0.95;

    if (!this.cache.theme) {
      try {
        const savedTheme = (typeof localStorage !== 'undefined') ? localStorage.getItem('english_theme') : null;
        this.cache.theme = savedTheme || 'light';
      } catch(e) {
        this.cache.theme = 'light';
      }
    }
    this.applyTheme();

    // Conexión reactiva con Supabase
    this.setupCloudSync();
  },

  // Configura la sincronización con Supabase cuando hay sesión activa
  setupCloudSync() {
    if (typeof window === 'undefined') return;

    // Escuchar cambios de autenticación
    if (window.AuthService) {
      window.AuthService.onAuthStateChange(async (event, user) => {
        if (user) {
          await this.syncFromSupabase();
        }
      });
    }

    // Intentar sincronizar al inicio si ya hay sesión
    setTimeout(() => {
      this.syncFromSupabase();
    }, 300);
  },

  // Descarga el progreso de Supabase y lo fusiona con el local
  async syncFromSupabase() {
    if (!window.AuthService || !window.ProgressSyncService) return;
    const user = window.AuthService.getUser();
    if (!user) return;

    try {
      const remote = await window.ProgressSyncService.loadUserProgress(user.id);
      if (remote) {
        let modified = false;

        // Si el usuario tenía datos locales anónimos previos, migrarlos a Supabase
        const hadLocalData = (this.cache.xp > 0 || Object.keys(this.cache.done || {}).length > 0);
        const hadRemoteData = (remote.xp > 0 || Object.keys(remote.done || {}).length > 0);

        if (hadLocalData && !hadRemoteData) {
          // Subir progreso local acumulado a la cuenta recién creada
          await this.pushAllToCloud(user.id);
          return;
        }

        // Fusionar XP: el valor mayor o suma de lecciones
        if (remote.xp > (this.cache.xp || 0)) {
          this.cache.xp = remote.xp;
          modified = true;
        }

        // Fusionar lecciones aprobadas
        if (remote.done) {
          Object.keys(remote.done).forEach(k => {
            if (!this.cache.done[k]) {
              this.cache.done[k] = remote.done[k];
              modified = true;
            }
          });
        }

        // Fusionar quizzes
        if (remote.quizzes) {
          Object.keys(remote.quizzes).forEach(k => {
            if (!this.cache.quizzes[k]) {
              this.cache.quizzes[k] = true;
              modified = true;
            }
          });
        }

        // Fusionar laboratorios
        if (remote.exercises) {
          Object.keys(remote.exercises).forEach(k => {
            if (!this.cache.exercises[k]) {
              this.cache.exercises[k] = remote.exercises[k];
              modified = true;
            }
          });
        }

        // Fusionar badges
        if (remote.badges) {
          Object.keys(remote.badges).forEach(k => {
            if (!this.cache.badges[k]) {
              this.cache.badges[k] = remote.badges[k];
              modified = true;
            }
          });
        }

        if (modified) {
          this.save();
          this.animateXP();
          // Notificar actualización a la página
          window.dispatchEvent(new CustomEvent('storage:synced', { detail: this.cache }));
        }
      }
    } catch (e) {
      console.warn("[StorageManager] Advertencia sincronizando con nube:", e);
    }
  },

  // Sube todo el progreso local a Supabase (usado tras primer registro)
  async pushAllToCloud(userId) {
    if (!window.ProgressSyncService || !userId) return;

    try {
      for (let i = 1; i <= 27; i++) {
        const isDone = this.isDone(i);
        const quizPassed = this.isQuizPassed(i);
        const exPassed = this.isExercisePassed(i);

        if (isDone || quizPassed || exPassed) {
          const lessonXP = (quizPassed ? 50 : 0) + (exPassed ? 100 : 0);
          await window.ProgressSyncService.syncLessonProgress(userId, i, {
            done: isDone,
            quizPassed: quizPassed,
            exercisePassed: exPassed,
            xp: lessonXP,
            exerciseState: this.getExerciseState(i)
          });
        }
      }

      // Sincronizar insignias locales
      for (let u = 1; u <= 9; u++) {
        if (this.isBadgeEarned(u)) {
          const meta = BADGES_METADATA.find(b => b.unitId === u);
          if (meta) {
            await window.ProgressSyncService.syncBadge(userId, u, meta.badgeId);
          }
        }
      }
    } catch (e) {
      console.warn("[StorageManager] Error en pushAllToCloud:", e);
    }
  },

  // Cola de sincronización asíncrona para una lección
  queueSyncLesson(lessonNum) {
    this.pendingLessonSync.add(lessonNum);

    if (this.syncTimeout) clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(async () => {
      const user = window.AuthService ? window.AuthService.getUser() : null;
      if (!user || !window.ProgressSyncService) return;

      const lessonsToSync = Array.from(this.pendingLessonSync);
      this.pendingLessonSync.clear();

      for (const n of lessonsToSync) {
        const isDone = this.isDone(n);
        const quizPassed = this.isQuizPassed(n);
        const exPassed = this.isExercisePassed(n);
        const lessonXP = (quizPassed ? 50 : 0) + (exPassed ? 100 : 0);

        await window.ProgressSyncService.syncLessonProgress(user.id, n, {
          done: isDone,
          quizPassed: quizPassed,
          exercisePassed: exPassed,
          xp: lessonXP,
          exerciseState: this.getExerciseState(n)
        });
      }
    }, 400);
  },

  save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.KEY, JSON.stringify(this.cache));
      }
    } catch(e){}
  },

  getXP() {
    return this.cache ? (this.cache.xp || 0) : 0;
  },

  addXP(amount) {
    if (!this.cache) this.init();
    this.cache.xp = (this.cache.xp || 0) + amount;
    this.save();
    this.animateXP();
  },

  deductXP(amount) {
    if (!this.cache) this.init();
    this.cache.xp = Math.max(0, (this.cache.xp || 0) - amount);
    this.save();
    this.animateXP();
  },

  isHintUnlocked(n) {
    return !!(this.cache && this.cache.unlockedHints && this.cache.unlockedHints[n]);
  },

  unlockHint(n, cost) {
    if (!this.cache) this.init();
    if (!this.cache.unlockedHints) this.cache.unlockedHints = {};
    if (!this.cache.unlockedHints[n]) {
      const actualCost = typeof cost === 'number' ? cost : 15;
      if (this.getXP() < actualCost) {
        return { success: false, reason: 'insufficient_xp', cost: actualCost, currentXP: this.getXP() };
      }
      this.cache.unlockedHints[n] = true;
      this.deductXP(actualCost);
      return { success: true, alreadyUnlocked: false, cost: actualCost, remainingXP: this.getXP() };
    }
    return { success: true, alreadyUnlocked: true, cost: 0, remainingXP: this.getXP() };
  },

  animateXP() {
    if (typeof document !== 'undefined') {
      const user = (typeof window !== 'undefined' && window.AuthService) ? window.AuthService.getUser() : null;
      const el = document.getElementById('nav-xp-counter');
      if (el) {
        if (user && user.role === 'estudiante') {
          el.style.display = 'inline-flex';
          el.textContent = `⚡ ${(this.cache.xp || 0).toLocaleString()} XP`;
        } else {
          el.style.display = 'none';
        }
      }
      const dashEl = document.getElementById('dash-xp-counter');
      if (dashEl) {
        dashEl.textContent = (user && user.role === 'estudiante') ? `${(this.cache.xp || 0).toLocaleString()} XP` : '0 XP';
      }
    }
  },

  isDone(n) {
    if (!this.cache) this.init();
    return !!(this.cache && this.cache.done && (this.cache.done[n] || this.cache.done[String(n)]));
  },

  setDone(n, val) {
    if (!this.cache) this.init();
    if (!this.cache.done) this.cache.done = {};
    if (val) this.cache.done[n] = { timestamp: Date.now() };
    else {
      delete this.cache.done[n];
      delete this.cache.done[String(n)];
    }
    this.save();
    this.queueSyncLesson(n);
  },

  isQuizPassed(n) {
    return !!(this.cache && this.cache.quizzes && (this.cache.quizzes[n] || this.cache.quizzes[String(n)]));
  },

  isTheoryCompleted(n) {
    return this.isQuizPassed(n);
  },

  getMaxUnlockedLesson() {
    if (!this.cache) this.init();
    let maxLesson = 1;
    for (let i = 1; i <= 27; i++) {
      if (this.isExercisePassed(i) || (this.cache.done && (this.cache.done[i] || this.cache.done[String(i)]))) {
        maxLesson = Math.max(maxLesson, i + 1);
      } else {
        break;
      }
    }
    return Math.min(27, maxLesson);
  },

  canAccessLessonNumber(n) {
    if (n === undefined || n === null) return false;
    const num = parseInt(n, 10);
    if (isNaN(num) || num < 1 || num > 27) return false;
    if (num === 1) return true;
    return num <= this.getMaxUnlockedLesson();
  },

  canAccessPractice(n) {
    if (!this.canAccessLessonNumber(n)) return false;
    return n === 1 || this.isTheoryCompleted(n);
  },

  setQuizPassed(n) {
    if (!this.cache) this.init();
    if (!this.cache.quizzes) this.cache.quizzes = {};
    if (!this.cache.quizzes[n]) {
      this.cache.quizzes[n] = true;
      this.addXP(50);
      this.checkLessonCompletion(n);
    }
    this.save();
    this.queueSyncLesson(n);
  },

  getExerciseState(n) {
    if (!this.cache || !this.cache.exercises) return null;
    const ex = this.cache.exercises[n] ?? this.cache.exercises[String(n)];
    if (!ex) return null;
    if (typeof ex === 'object' && ex.state !== undefined) return ex.state;
    return ex;
  },

  isExercisePassed(n) {
    if (!this.cache || !this.cache.exercises) return false;
    const ex = this.cache.exercises[n] ?? this.cache.exercises[String(n)];
    if (!ex) return false;
    if (ex === true) return true;
    if (typeof ex === 'object') {
      return ex.passed !== false;
    }
    return false;
  },

  setExercisePassed(n, state) {
    if (!this.cache) this.init();
    if (!this.cache.exercises) this.cache.exercises = {};
    const already = this.isExercisePassed(n);
    const savedState = (state && typeof state === 'object') ? state : {};
    this.cache.exercises[n] = {
      ...savedState,
      passed: true,
      state: state,
      timestamp: Date.now()
    };
    let newBadgeAwarded = null;
    if (!already) {
      this.addXP(100);
      this.checkLessonCompletion(n);
      newBadgeAwarded = this.checkUnitCompletionForLesson(n);
    }
    this.save();
    this.queueSyncLesson(n);
    return newBadgeAwarded;
  },

  checkLessonCompletion(n) {
    if (this.isExercisePassed(n)) {
      this.setDone(n, true);
    }
  },

  // ----------------------------------------------------
  // Unit & Badge Management
  // ----------------------------------------------------
  getUnitForLesson(lessonNum) {
    const n = parseInt(lessonNum, 10);
    if (isNaN(n) || n < 1 || n > 27) return 1;
    return Math.ceil(n / 3);
  },

  getLessonsForUnit(unitNum) {
    const u = parseInt(unitNum, 10);
    const start = (u - 1) * 3 + 1;
    return [start, start + 1, start + 2];
  },

  isUnitCompleted(unitNum) {
    if (!this.cache) this.init();
    const lessons = this.getLessonsForUnit(unitNum);
    return lessons.every(l => this.isDone(l) || this.isExercisePassed(l));
  },

  isBadgeEarned(unitNum) {
    if (!this.cache) this.init();
    if (!this.cache.badges) this.cache.badges = {};
    return !!(this.cache.badges[unitNum] || this.cache.badges[String(unitNum)]);
  },

  awardBadge(unitNum) {
    if (!this.cache) this.init();
    if (!this.cache.badges) this.cache.badges = {};
    const badge = BADGES_METADATA.find(b => b.unitId === unitNum);
    if (!badge) return null;

    if (!this.isBadgeEarned(unitNum)) {
      this.cache.badges[unitNum] = {
        awardedAt: Date.now(),
        unitId: unitNum,
        badgeId: badge.badgeId
      };
      this.save();

      // Sincronizar con Supabase
      const user = window.AuthService ? window.AuthService.getUser() : null;
      if (user && window.ProgressSyncService) {
        window.ProgressSyncService.syncBadge(user.id, unitNum, badge.badgeId);
      }

      return badge;
    }
    return null;
  },

  checkUnitCompletionForLesson(lessonNum) {
    const unitNum = this.getUnitForLesson(lessonNum);
    if (this.isUnitCompleted(unitNum) && !this.isBadgeEarned(unitNum)) {
      return this.awardBadge(unitNum);
    }
    return null;
  },

  getAllBadgesStatus() {
    if (!this.cache) this.init();
    return BADGES_METADATA.map(meta => {
      const earned = this.isBadgeEarned(meta.unitId);
      const data = earned ? (this.cache.badges[meta.unitId] || this.cache.badges[String(meta.unitId)]) : null;
      return {
        ...meta,
        earned: earned,
        awardedAt: data ? data.awardedAt : null
      };
    });
  },

  getLastActiveLesson() {
    if (!this.cache) this.init();
    return this.cache.lastLesson || 1;
  },

  setLastActiveLesson(n) {
    if (!this.cache) this.init();
    this.cache.lastLesson = n;
    this.save();
  },

  resetAll() {
    this.cache = {
      xp: 0,
      done: {},
      quizzes: {},
      exercises: {},
      unlockedHints: {},
      badges: {},
      lastLesson: 1,
      theme: this.getTheme(),
      speechRate: 0.95
    };
    this.save();
  },

  exportJSON() {
    return JSON.stringify(this.cache, null, 2);
  },

  importJSON(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        this.cache = parsed;
        if (!this.cache.badges) this.cache.badges = {};
        this.save();
        this.applyTheme();
        return true;
      }
    } catch(e){}
    return false;
  },

  getTheme() {
    if (!this.cache) this.init();
    return this.cache.theme || 'dark';
  },

  setTheme(theme) {
    if (!this.cache) this.init();
    this.cache.theme = (theme === 'light') ? 'light' : 'dark';
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('english_theme', this.cache.theme);
      }
    } catch(e) {}
    this.save();
    this.applyTheme();
    return this.cache.theme;
  },

  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'light' ? 'dark' : 'light';
    return this.setTheme(next);
  },

  applyTheme() {
    if (typeof document !== 'undefined') {
      const t = this.getTheme();
      document.documentElement.setAttribute('data-theme', t);
      const btn = document.getElementById('theme-toggle-text');
      if (btn) btn.textContent = t === 'light' ? 'Modo Oscuro' : 'Modo Claro';
      const icon = document.getElementById('theme-toggle-icon');
      if (icon) icon.textContent = t === 'light' ? '🌙' : '☀️';
      const settingsIcon = document.getElementById('settings-theme-icon');
      if (settingsIcon) settingsIcon.textContent = t === 'light' ? '☀️' : '🌙';
    }
  },

  // ----------------------------------------------------
  // Speech Synthesis Helper (Native TTS 🔊)
  // ----------------------------------------------------
  speak(text, onEnd) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn("SpeechSynthesis no soportado en este navegador.");
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = this.cache?.speechRate || 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
    if (enVoice) utterance.voice = enVoice;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }
    window.speechSynthesis.speak(utterance);
  }
};

if (typeof window !== 'undefined') {
  window.StorageManager = StorageManager;
  window.BADGES_METADATA = BADGES_METADATA;
  document.addEventListener('DOMContentLoaded', () => StorageManager.init());
}
