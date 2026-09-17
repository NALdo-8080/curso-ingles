/**
 * supabase-client.js - Módulo Central de Conexión a Supabase
 * Maneja la inicialización del SDK, autenticación de usuarios (estudiante / profesor),
 * gestión de clases e inscripciones, y sincronización de datos.
 */

// =============================================================================
// CONFIGURACIÓN DE SUPABASE
// Reemplaza estas constantes con las credenciales de tu proyecto en https://supabase.com
// (Project Settings -> API -> Project URL & Project API Keys -> anon / public)
// =============================================================================
const DEFAULT_SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "TU_SUPABASE_ANON_KEY";

const SupabaseConfig = {
  getUrl() {
    try {
      return localStorage.getItem('supabase_custom_url') || DEFAULT_SUPABASE_URL;
    } catch (e) {
      return DEFAULT_SUPABASE_URL;
    }
  },
  getAnonKey() {
    try {
      return localStorage.getItem('supabase_custom_anon_key') || DEFAULT_SUPABASE_ANON_KEY;
    } catch (e) {
      return DEFAULT_SUPABASE_ANON_KEY;
    }
  },
  setCustomCredentials(url, anonKey) {
    try {
      if (url) localStorage.setItem('supabase_custom_url', url.trim());
      if (anonKey) localStorage.setItem('supabase_custom_anon_key', anonKey.trim());
      window.location.reload();
    } catch (e) {
      console.error("Error guardando credenciales personalizadas", e);
    }
  },
  resetCredentials() {
    try {
      localStorage.removeItem('supabase_custom_url');
      localStorage.removeItem('supabase_custom_anon_key');
      window.location.reload();
    } catch (e) {}
  },
  isConfigured() {
    const u = this.getUrl();
    const k = this.getAnonKey();
    return u && k && !u.includes('TU_PROYECTO') && !k.includes('TU_SUPABASE_ANON_KEY');
  }
};

let _supabaseClient = null;

function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;
  if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
    const url = SupabaseConfig.getUrl();
    const key = SupabaseConfig.getAnonKey();
    if (url && key) {
      _supabaseClient = window.supabase.createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      return _supabaseClient;
    }
  }
  return null;
}

// =============================================================================
// =============================================================================
// CUENTAS Y DATOS DE PRUEBA / MODO DEMO INTERACTIVO
// Permiten probar el flujo de Profesor y Estudiante de inmediato sin configurar Supabase
// =============================================================================
const DEMO_ACCOUNTS = {
  teacher: {
    id: 'demo-teacher-001',
    email: 'profesor@demo.com',
    nombre: 'Prof. Carlos Mendoza',
    role: 'profesor'
  },
  student: {
    id: 'demo-student-001',
    email: 'estudiante@demo.com',
    nombre: 'Ana Morales',
    role: 'estudiante'
  }
};

const DEMO_CLASSES_INITIAL = [
  {
    id: 'demo-class-001',
    nombre: 'Inglés A1 - Principiantes (Grupo Mañana)',
    codigo: 'ING-DEMO',
    studentCount: 4,
    createdAt: '2026-09-01T10:00:00Z'
  }
];

const DEMO_STUDENTS_LIST = [
  {
    id: 'demo-student-perez',
    nombre: 'Juan Pérez',
    email: 'juan.perez@demo.com',
    fechaIngreso: '2026-09-02T14:30:00Z',
    lessonsDone: 22,
    quizzesPassed: 22,
    exercisesPassed: 21,
    totalXP: 1480,
    percent: 81,
    maxLesson: 22,
    lastActivity: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    status: 'al_dia'
  },
  {
    id: 'demo-student-garcia',
    nombre: 'María García',
    email: 'maria.garcia@demo.com',
    fechaIngreso: '2026-09-02T15:10:00Z',
    lessonsDone: 18,
    quizzesPassed: 18,
    exercisesPassed: 16,
    totalXP: 1150,
    percent: 66,
    maxLesson: 18,
    lastActivity: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    status: 'al_dia'
  },
  {
    id: 'demo-student-lopez',
    nombre: 'Carlos López',
    email: 'carlos.lopez@demo.com',
    fechaIngreso: '2026-09-04T09:00:00Z',
    lessonsDone: 7,
    quizzesPassed: 7,
    exercisesPassed: 6,
    totalXP: 460,
    percent: 25,
    maxLesson: 7,
    lastActivity: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    status: 'falta_avanzar'
  },
  {
    id: 'demo-student-sanchez',
    nombre: 'Laura Sánchez',
    email: 'laura.sanchez@demo.com',
    fechaIngreso: '2026-09-10T11:20:00Z',
    lessonsDone: 0,
    quizzesPassed: 0,
    exercisesPassed: 0,
    totalXP: 0,
    percent: 0,
    maxLesson: 0,
    lastActivity: null,
    status: 'sin_iniciar'
  }
];

// Progreso precargado para el usuario estudiante demo (Ana Morales)
const DEMO_STUDENT_PROGRESS = {
  xp: 820,
  done: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true },
  quizzes: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true },
  exercises: { 1: { passed: true }, 2: { passed: true }, 3: { passed: true }, 4: { passed: true }, 5: { passed: true }, 6: { passed: true }, 7: { passed: true }, 8: { passed: true }, 9: { passed: true }, 10: { passed: true } },
  badges: {
    1: { badgeId: 'badge_phonetics', unitId: 1 },
    2: { badgeId: 'badge_routines', unitId: 2 },
    3: { badgeId: 'badge_describer', unitId: 3 },
    4: { badgeId: 'badge_action', unitId: 4 }
  }
};

// =============================================================================
// SERVICIO DE AUTENTICACIÓN (AuthService)
// =============================================================================
const AuthService = {
  currentUser: null,
  currentProfile: null,
  listeners: [],

  getDemoSession() {
    try {
      const raw = localStorage.getItem('lms_demo_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  isDemoUser() {
    const user = this.getUser();
    return !!(user && user.id && user.id.startsWith('demo-'));
  },

  async loginAsDemo(role = 'profesor') {
    const account = (role === 'profesor') ? DEMO_ACCOUNTS.teacher : DEMO_ACCOUNTS.student;
    try {
      localStorage.setItem('lms_demo_user', JSON.stringify(account));
    } catch (e) {}

    this.currentUser = { id: account.id, email: account.email };
    this.currentProfile = { ...account };

    // Si es estudiante demo, precargar progreso demo en StorageManager
    if (account.role === 'estudiante' && typeof window !== 'undefined' && window.StorageManager) {
      this.injectDemoStudentData();
    }

    this.notifyListeners('SIGNED_IN');
    return { user: this.currentUser, profile: this.currentProfile };
  },

  injectDemoStudentData() {
    if (!window.StorageManager) return;
    try {
      const sm = window.StorageManager;
      if (!sm.cache) sm.init();
      sm.cache.xp = DEMO_STUDENT_PROGRESS.xp;
      sm.cache.done = {};
      Object.keys(DEMO_STUDENT_PROGRESS.done).forEach(k => {
        sm.cache.done[k] = { timestamp: Date.now() };
      });
      sm.cache.quizzes = { ...DEMO_STUDENT_PROGRESS.quizzes };
      sm.cache.exercises = { ...DEMO_STUDENT_PROGRESS.exercises };
      sm.cache.badges = { ...DEMO_STUDENT_PROGRESS.badges };
      sm.cache.lastLesson = 13;
      sm.save();
    } catch (e) {
      console.warn("No se pudo inyectar datos de estudiante demo:", e);
    }
  },

  async init() {
    // 1. Revisar si hay una sesión demo activa en localStorage
    const demoUser = this.getDemoSession();
    if (demoUser) {
      this.currentUser = { id: demoUser.id, email: demoUser.email };
      this.currentProfile = { ...demoUser };
      if (demoUser.role === 'estudiante') {
        this.injectDemoStudentData();
      }
      return this.getUser();
    }

    // 2. Si no hay demo, consultar cliente de Supabase
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data: { session }, error } = await client.auth.getSession();
      if (session && session.user) {
        this.currentUser = session.user;
        await this.fetchProfile(session.user.id);
      }
    } catch (err) {
      console.warn("[AuthService] Error obteniendo sesión inicial:", err);
    }

    // Escuchar cambios de sesión (login, logout, token refresh)
    client.auth.onAuthStateChange(async (event, session) => {
      if (this.isDemoUser()) return; // Ignorar si hay sesión demo activa
      if (session && session.user) {
        this.currentUser = session.user;
        await this.fetchProfile(session.user.id);
      } else {
        this.currentUser = null;
        this.currentProfile = null;
      }
      this.notifyListeners(event);
    });

    return this.getUser();
  },

  async fetchProfile(userId) {
    if (this.isDemoUser()) return this.currentProfile;
    const client = getSupabaseClient();
    if (!client || !userId) return null;

    try {
      const { data, error } = await client
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        this.currentProfile = data;
        return data;
      } else if (error && this.currentUser) {
        const meta = this.currentUser.user_metadata || {};
        const fallbackProfile = {
          id: userId,
          nombre: meta.nombre || this.currentUser.email.split('@')[0],
          email: this.currentUser.email,
          role: meta.role || 'estudiante'
        };
        const { data: inserted } = await client
          .from('usuarios')
          .upsert(fallbackProfile)
          .select()
          .single();
        this.currentProfile = inserted || fallbackProfile;
        return this.currentProfile;
      }
    } catch (e) {
      console.warn("[AuthService] Error consultando perfil:", e);
    }
    return null;
  },

  async signUp({ email, password, nombre, role }) {
    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase no está configurado.");

    const normalizedRole = (role === 'profesor') ? 'profesor' : 'estudiante';
    const cleanNombre = (nombre || '').trim() || email.split('@')[0];

    const { data, error } = await client.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          nombre: cleanNombre,
          role: normalizedRole
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      this.currentUser = data.user;
      try {
        const { data: profile } = await client.from('usuarios').upsert({
          id: data.user.id,
          nombre: cleanNombre,
          email: email.trim(),
          role: normalizedRole
        }).select().single();
        this.currentProfile = profile;
      } catch (errProfile) {
        console.warn("[AuthService] Advertencia creando registro en usuarios:", errProfile);
      }
    }

    return { user: data.user, session: data.session };
  },

  async signIn({ email, password }) {
    const cleanEmail = (email || '').trim().toLowerCase();

    // Atajo rápido si se usan credenciales demo
    if (cleanEmail === 'profesor@demo.com' || cleanEmail === 'profesor') {
      return this.loginAsDemo('profesor');
    }
    if (cleanEmail === 'estudiante@demo.com' || cleanEmail === 'estudiante') {
      return this.loginAsDemo('estudiante');
    }

    const client = getSupabaseClient();
    if (!client) {
      throw new Error("Supabase no está configurado. Usa los botones de Cuenta Demo o configura las claves.");
    }

    const { data, error } = await client.auth.signInWithPassword({
      email: cleanEmail,
      password: password
    });

    if (error) throw error;

    try { localStorage.removeItem('lms_demo_user'); } catch(e) {}
    this.currentUser = data.user;
    await this.fetchProfile(data.user.id);
    return { user: data.user, session: data.session, profile: this.currentProfile };
  },

  async signOut() {
    try {
      localStorage.removeItem('lms_demo_user');
    } catch (e) {}

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch (e) {}
    }
    this.currentUser = null;
    this.currentProfile = null;

    // Limpiar progreso en memoria para que no quede residuo del alumno demo
    if (typeof window !== 'undefined' && window.StorageManager) {
      try {
        window.StorageManager.cache = {
          xp: 0,
          done: {},
          quizzes: {},
          exercises: {},
          unlockedHints: {},
          badges: {},
          lastLesson: 1,
          theme: window.StorageManager.getTheme() || 'light',
          speechRate: 0.95
        };
        window.StorageManager.save();
      } catch (e) {}
    }

    this.notifyListeners('SIGNED_OUT');
  },

  getUser() {
    if (!this.currentUser) return null;
    return {
      id: this.currentUser.id,
      email: this.currentUser.email,
      nombre: this.currentProfile?.nombre || this.currentUser.user_metadata?.nombre || this.currentUser.email.split('@')[0],
      role: this.currentProfile?.role || this.currentUser.user_metadata?.role || 'estudiante'
    };
  },

  isTeacher() {
    const u = this.getUser();
    return !!(u && u.role === 'profesor');
  },

  isStudent() {
    const u = this.getUser();
    return !!(u && u.role === 'estudiante');
  },

  onAuthStateChange(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  },

  notifyListeners(event) {
    const user = this.getUser();
    this.listeners.forEach(cb => {
      try {
        cb(event, user);
      } catch (e) {
        console.error("[AuthService] Error en listener:", e);
      }
    });
  }
};

// =============================================================================
// SERVICIO DE GESTIÓN DE CLASES (ClassService)
// =============================================================================
const ClassService = {
  // Genera un código legible de 8 caracteres tipo ING-8X2F
  generateClassCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = 'ING-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  // Crear una nueva clase (Solo profesores)
  async createClass(nombre) {
    const user = AuthService.getUser();
    if (!user || user.role !== 'profesor') throw new Error("Solo un usuario con rol 'profesor' puede crear clases.");

    const codigo = this.generateClassCode();
    const cleanNombre = (nombre || '').trim();
    if (!cleanNombre) throw new Error("Debes proporcionar un nombre para la clase.");

    // Modo demo sin conexión a Supabase
    if (AuthService.isDemoUser()) {
      const newClass = {
        id: 'demo-class-' + Date.now(),
        nombre: cleanNombre,
        codigo_unico: codigo,
        codigo: codigo,
        id_profesor: user.id,
        studentCount: 0,
        createdAt: new Date().toISOString()
      };
      let classes = [];
      try {
        const raw = localStorage.getItem('lms_demo_classes');
        classes = raw ? JSON.parse(raw) : [...DEMO_CLASSES_INITIAL];
      } catch (e) {
        classes = [...DEMO_CLASSES_INITIAL];
      }
      classes.unshift(newClass);
      try { localStorage.setItem('lms_demo_classes', JSON.stringify(classes)); } catch (e) {}
      return newClass;
    }

    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase no conectado.");

    const { data, error } = await client
      .from('clases')
      .insert({
        nombre: cleanNombre,
        codigo_unico: codigo,
        id_profesor: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Obtener las clases creadas por el profesor actual junto al conteo de alumnos
  async getTeacherClasses() {
    const user = AuthService.getUser();
    if (!user || user.role !== 'profesor') return [];

    if (AuthService.isDemoUser()) {
      try {
        const raw = localStorage.getItem('lms_demo_classes');
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return [...DEMO_CLASSES_INITIAL];
    }

    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data: clases, error } = await client
        .from('clases')
        .select(`
          id,
          nombre,
          codigo_unico,
          created_at,
          inscripciones (id)
        `)
        .eq('id_profesor', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (clases || []).map(c => ({
        id: c.id,
        nombre: c.nombre,
        codigo: c.codigo_unico,
        createdAt: c.created_at,
        studentCount: c.inscripciones ? c.inscripciones.length : 0
      }));
    } catch (e) {
      console.error("[ClassService] Error obteniendo clases del profesor:", e);
      return [];
    }
  },

  // Estudiante: unirse a una clase usando el código
  async joinClassByCode(codigo) {
    const user = AuthService.getUser();
    if (!user) throw new Error("Debes iniciar sesión para unirte a una clase.");

    const cleanCode = (codigo || '').trim().toUpperCase();
    if (!cleanCode) throw new Error("Por favor ingresa el código de la clase.");

    // Modo demo
    if (AuthService.isDemoUser()) {
      if (cleanCode === 'ING-DEMO') {
        return {
          alreadyEnrolled: true,
          claseNombre: DEMO_CLASSES_INITIAL[0].nombre,
          profesorNombre: DEMO_ACCOUNTS.teacher.nombre
        };
      }
      return {
        success: true,
        claseNombre: `Clase ${cleanCode}`,
        profesorNombre: DEMO_ACCOUNTS.teacher.nombre
      };
    }

    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase no conectado.");

    // 1. Buscar la clase por código único
    const { data: clase, error: errClase } = await client
      .from('clases')
      .select('id, nombre, id_profesor, usuarios (nombre)')
      .eq('codigo_unico', cleanCode)
      .single();

    if (errClase || !clase) {
      throw new Error("No se encontró ninguna clase con el código especificado. Verifica e inténtalo de nuevo.");
    }

    // 2. Verificar si ya está inscrito
    const { data: existente } = await client
      .from('inscripciones')
      .select('id')
      .eq('id_usuario', user.id)
      .eq('id_clase', clase.id)
      .maybeSingle();

    if (existente) {
      return {
        alreadyEnrolled: true,
        claseNombre: clase.nombre,
        profesorNombre: clase.usuarios?.nombre || 'Profesor'
      };
    }

    // 3. Insertar inscripción
    const { data: inscripcion, error: errInscripcion } = await client
      .from('inscripciones')
      .insert({
        id_usuario: user.id,
        id_clase: clase.id
      })
      .select()
      .single();

    if (errInscripcion) throw errInscripcion;

    return {
      success: true,
      claseNombre: clase.nombre,
      profesorNombre: clase.usuarios?.nombre || 'Profesor'
    };
  },

  // Estudiante: obtener las clases en las que está inscrito
  async getStudentClasses() {
    const user = AuthService.getUser();
    if (!user) return [];

    if (AuthService.isDemoUser()) {
      return [{
        id: DEMO_CLASSES_INITIAL[0].id,
        nombre: DEMO_CLASSES_INITIAL[0].nombre,
        codigo: DEMO_CLASSES_INITIAL[0].codigo,
        fechaIngreso: '2026-09-02T10:00:00Z',
        profesor: DEMO_ACCOUNTS.teacher.nombre,
        profesorEmail: DEMO_ACCOUNTS.teacher.email
      }];
    }

    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('inscripciones')
        .select(`
          id,
          fecha_ingreso,
          clases (
            id,
            nombre,
            codigo_unico,
            usuarios (
              id,
              nombre,
              email
            )
          )
        `)
        .eq('id_usuario', user.id)
        .order('fecha_ingreso', { ascending: false });

      if (error) throw error;

      return (data || []).map(item => ({
        id: item.clases?.id,
        nombre: item.clases?.nombre,
        codigo: item.clases?.codigo_unico,
        fechaIngreso: item.fecha_ingreso,
        profesor: item.clases?.usuarios?.nombre || 'Profesor asignado',
        profesorEmail: item.clases?.usuarios?.email || ''
      }));
    } catch (e) {
      console.error("[ClassService] Error obteniendo clases del estudiante:", e);
      return [];
    }
  },

  // Profesor: obtener la lista detallada de estudiantes y su % de avance para una clase
  async getClassStudentsProgress(claseId) {
    if (AuthService.isDemoUser()) {
      return [...DEMO_STUDENTS_LIST];
    }

    const client = getSupabaseClient();
    if (!client || !claseId) return [];

    // Intento 1: Llamar a la función RPC optimizada 'get_class_students_summary'
    try {
      const { data, error } = await client.rpc('get_class_students_summary', { p_clase_id: claseId });
      if (!error && Array.isArray(data)) {
        return data.map(s => {
          const percent = parseFloat(s.progress_percent || 0);
          const lessonsDone = parseInt(s.lessons_done || 0, 10);
          let status = 'sin_iniciar';
          if (percent >= 35 || lessonsDone >= 10) status = 'al_dia';
          else if (percent > 0 || lessonsDone > 0) status = 'falta_avanzar';

          return {
            id: s.student_id,
            nombre: s.nombre,
            email: s.email,
            fechaIngreso: s.fecha_ingreso,
            lessonsDone,
            quizzesPassed: parseInt(s.quizzes_passed || 0, 10),
            exercisesPassed: parseInt(s.exercises_passed || 0, 10),
            totalXP: parseInt(s.total_xp || 0, 10),
            percent,
            maxLesson: parseInt(s.max_lesson || lessonsDone, 10),
            lastActivity: s.last_activity || s.fecha_ingreso,
            status
          };
        });
      }
    } catch (rpcErr) {
      console.warn("[ClassService] RPC fallback activo:", rpcErr);
    }

    // Intento 2 (Fallback directo por tablas en caso de no haber corrido el RPC)
    try {
      const { data: inscritos, error: errIns } = await client
        .from('inscripciones')
        .select(`
          fecha_ingreso,
          usuarios (
            id,
            nombre,
            email
          )
        `)
        .eq('id_clase', claseId);

      if (errIns || !inscritos) return [];

      const results = [];
      for (const item of inscritos) {
        const u = item.usuarios;
        if (!u) continue;

        // Consultar progreso detallado del estudiante
        const { data: prog } = await client
          .from('progreso')
          .select('leccion_n, done, quiz_passed, exercise_passed, xp, timestamp')
          .eq('id_usuario', u.id);

        let lessonsDone = 0;
        let quizzesPassed = 0;
        let exercisesPassed = 0;
        let totalXP = 0;
        let maxLesson = 0;
        let lastActivity = null;

        (prog || []).forEach(row => {
          if (row.done) {
            lessonsDone++;
            if (row.leccion_n > maxLesson) maxLesson = row.leccion_n;
          }
          if (row.quiz_passed) quizzesPassed++;
          if (row.exercise_passed) exercisesPassed++;
          totalXP += (row.xp || 0);

          if (row.timestamp) {
            const t = new Date(row.timestamp);
            if (!lastActivity || t > new Date(lastActivity)) {
              lastActivity = row.timestamp;
            }
          }
        });

        const percent = Math.round((lessonsDone / 27) * 100);

        let status = 'sin_iniciar';
        if (percent >= 35 || lessonsDone >= 10) status = 'al_dia';
        else if (percent > 0 || lessonsDone > 0) status = 'falta_avanzar';

        results.push({
          id: u.id,
          nombre: u.nombre,
          email: u.email,
          fechaIngreso: item.fecha_ingreso,
          lessonsDone,
          quizzesPassed,
          exercisesPassed,
          totalXP,
          percent,
          maxLesson: maxLesson > 0 ? maxLesson : (lessonsDone > 0 ? lessonsDone : 0),
          lastActivity: lastActivity || item.fecha_ingreso,
          status
        });
      }

      return results.sort((a, b) => b.percent - a.percent);
    } catch (e) {
      console.error("[ClassService] Error obteniendo resumen de alumnos:", e);
      return [];
    }
  }
};

// =============================================================================
// SERVICIO DE SINCRONIZACIÓN DE PROGRESO (ProgressSyncService)
// =============================================================================
const ProgressSyncService = {
  // Cargar progreso del usuario logueado desde Supabase
  async loadUserProgress(userId) {
    if (AuthService.isDemoUser() || userId === DEMO_ACCOUNTS.student.id) {
      return {
        xp: DEMO_STUDENT_PROGRESS.xp,
        done: { ...DEMO_STUDENT_PROGRESS.done },
        quizzes: { ...DEMO_STUDENT_PROGRESS.quizzes },
        exercises: { ...DEMO_STUDENT_PROGRESS.exercises },
        badges: { ...DEMO_STUDENT_PROGRESS.badges }
      };
    }

    const client = getSupabaseClient();
    if (!client || !userId) return null;

    try {
      const [progResult, badgeResult] = await Promise.all([
        client.from('progreso').select('*').eq('id_usuario', userId),
        client.from('badges').select('*').eq('id_usuario', userId)
      ]);

      const done = {};
      const quizzes = {};
      const exercises = {};
      let totalXP = 0;

      if (progResult.data) {
        progResult.data.forEach(row => {
          const n = row.leccion_n;
          if (row.done) done[n] = { timestamp: new Date(row.timestamp).getTime() };
          if (row.quiz_passed) quizzes[n] = true;
          if (row.exercise_passed) {
            exercises[n] = {
              passed: true,
              state: row.exercise_state,
              timestamp: new Date(row.timestamp).getTime()
            };
          }
          totalXP += (row.xp || 0);
        });
      }

      const badges = {};
      if (badgeResult.data) {
        badgeResult.data.forEach(b => {
          badges[b.unit_id] = {
            awardedAt: new Date(b.awarded_at).getTime(),
            unitId: b.unit_id,
            badgeId: b.badge_id
          };
        });
      }

      return {
        xp: totalXP,
        done,
        quizzes,
        exercises,
        badges
      };
    } catch (e) {
      console.error("[ProgressSyncService] Error cargando progreso desde Supabase:", e);
      return null;
    }
  },

  // Guardar/Actualizar progreso de una lección
  async syncLessonProgress(userId, lessonNum, lessonData) {
    const client = getSupabaseClient();
    if (!client || !userId) return false;

    try {
      const payload = {
        id_usuario: userId,
        leccion_n: parseInt(lessonNum, 10),
        xp: lessonData.xp || 0,
        done: !!lessonData.done,
        quiz_passed: !!lessonData.quizPassed,
        exercise_passed: !!lessonData.exercisePassed,
        exercise_state: lessonData.exerciseState || null,
        timestamp: new Date().toISOString()
      };

      const { error } = await client
        .from('progreso')
        .upsert(payload, { onConflict: 'id_usuario,leccion_n' });

      if (error) {
        console.warn("[ProgressSyncService] Error sincronizando progreso de lección:", error);
        return false;
      }
      return true;
    } catch (e) {
      console.warn("[ProgressSyncService] Excepción sincronizando lección:", e);
      return false;
    }
  },

  // Guardar insignia obtenida
  async syncBadge(userId, unitId, badgeId) {
    const client = getSupabaseClient();
    if (!client || !userId) return false;

    try {
      const { error } = await client
        .from('badges')
        .upsert({
          id_usuario: userId,
          unit_id: parseInt(unitId, 10),
          badge_id: badgeId,
          awarded_at: new Date().toISOString()
        }, { onConflict: 'id_usuario,unit_id' });

      if (error) {
        console.warn("[ProgressSyncService] Error guardando badge:", error);
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};

// Exportar en el ámbito global del navegador
if (typeof window !== 'undefined') {
  window.SupabaseConfig = SupabaseConfig;
  window.getSupabaseClient = getSupabaseClient;
  window.AuthService = AuthService;
  window.ClassService = ClassService;
  window.ProgressSyncService = ProgressSyncService;
}

