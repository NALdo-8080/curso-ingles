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
    nivel: 'principiante',
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
    lessonsDone: 8,
    quizzesPassed: 8,
    exercisesPassed: 7,
    totalXP: 980,
    percent: 88,
    maxLesson: 8,
    lastActivity: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    status: 'al_dia'
  },
  {
    id: 'demo-student-garcia',
    nombre: 'María García',
    email: 'maria.garcia@demo.com',
    fechaIngreso: '2026-09-02T15:10:00Z',
    lessonsDone: 6,
    quizzesPassed: 6,
    exercisesPassed: 5,
    totalXP: 750,
    percent: 66,
    maxLesson: 6,
    lastActivity: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    status: 'al_dia'
  },
  {
    id: 'demo-student-lopez',
    nombre: 'Carlos López',
    email: 'carlos.lopez@demo.com',
    fechaIngreso: '2026-09-04T09:00:00Z',
    lessonsDone: 3,
    quizzesPassed: 3,
    exercisesPassed: 2,
    totalXP: 360,
    percent: 33,
    maxLesson: 3,
    lastActivity: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
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

// Progreso precargado para el usuario estudiante demo (Ana Morales) enfocado en clase de Principiantes (A1)
const DEMO_STUDENT_PROGRESS = {
  xp: 450,
  done: { 1: true, 2: true, 3: true, 4: true, 5: true },
  quizzes: { 1: true, 2: true, 3: true, 4: true, 5: true },
  exercises: { 1: { passed: true }, 2: { passed: true }, 3: { passed: true }, 4: { passed: true }, 5: { passed: true } },
  badges: {
    1: { badgeId: 'badge_phonetics', unitId: 1 }
  }
};

// =============================================================================
// ASIGNACIONES Y ENTREGAS DEMO INICIALES
// =============================================================================
const DEMO_ASSIGNMENTS_INITIAL = [
  {
    id: 'demo-asg-001',
    claseId: 'demo-class-001',
    profesorId: 'demo-teacher-001',
    titulo: 'Tarea 1: Presentación Personal en Inglés (Self Introduction)',
    descripcion: 'Escribe un párrafo de 5 oraciones en inglés presentándote: tu nombre, edad, país de origen, ocupación o estudios y tu pasatiempo favorito. Utiliza el verbo To Be y vocabulario de la Unidad 1.',
    puntosMax: 100,
    fechaLimite: '2026-09-25T23:59:00Z',
    createdAt: '2026-09-05T10:00:00Z'
  },
  {
    id: 'demo-asg-002',
    claseId: 'demo-class-001',
    profesorId: 'demo-teacher-001',
    titulo: 'Tarea 2: Mi Rutina Diaria (My Daily Routine)',
    descripcion: 'Describe tu rutina de la mañana en inglés usando al menos 5 verbos en Present Simple (ej. wake up, brush teeth, have breakfast, study, work).',
    puntosMax: 100,
    fechaLimite: '2026-09-30T23:59:00Z',
    createdAt: '2026-09-12T14:00:00Z'
  }
];

const DEMO_SUBMISSIONS_INITIAL = [
  {
    id: 'demo-sub-001',
    asignacionId: 'demo-asg-001',
    claseId: 'demo-class-001',
    estudianteId: 'demo-student-perez',
    estudianteNombre: 'Juan Pérez',
    estudianteEmail: 'juan.perez@demo.com',
    contenido: "Hello teacher! My name is Juan. I am 24 years old and I am from Colombia. I am a graphic designer. In my free time, I like to play soccer and listen to music. I want to learn English to work with international clients.",
    fechaEntrega: '2026-09-08T16:20:00Z',
    calificacion: 95,
    retroalimentacion: "¡Excelente trabajo Juan! Gran dominio del verbo To Be y redacción fluida y clara.",
    calificadoEn: '2026-09-09T10:30:00Z'
  },
  {
    id: 'demo-sub-002',
    asignacionId: 'demo-asg-001',
    claseId: 'demo-class-001',
    estudianteId: 'demo-student-garcia',
    estudianteNombre: 'María García',
    estudianteEmail: 'maria.garcia@demo.com',
    contenido: "Hello! I am Maria Garcia. I am from Mexico and I live in Monterrey. I am an accountant. I enjoy reading books and cooking on weekends. I study English because it is very important for my career.",
    fechaEntrega: '2026-09-09T18:45:00Z',
    calificacion: 90,
    retroalimentacion: "Muy buena presentación María. Cuida el uso de comas entre oraciones, la estructura gramatical está impecable.",
    calificadoEn: '2026-09-10T11:15:00Z'
  },
  {
    id: 'demo-sub-003',
    asignacionId: 'demo-asg-001',
    claseId: 'demo-class-001',
    estudianteId: 'demo-student-001',
    estudianteNombre: 'Ana Morales',
    estudianteEmail: 'estudiante@demo.com',
    contenido: "Hi everyone! My name is Ana Morales. I am 21 years old and I am a software engineering student. In my free time, I love watching movies in English and practicing pronunciation. Learning English is my dream!",
    fechaEntrega: '2026-09-07T12:00:00Z',
    calificacion: 92,
    retroalimentacion: "¡Felicidades Ana! Tu presentación está muy bien estructurada y las oraciones son precisas.",
    calificadoEn: '2026-09-08T09:00:00Z'
  }
];

// Helper global para detectar el nivel de una clase
function detectClassLevel(str) {
  if (!str) return 'principiante';
  const s = str.toLowerCase();
  if (s.includes('intermedio') || s.includes('a2') || s.includes('b1')) return 'intermedio';
  if (s.includes('avanzado') || s.includes('b2') || s.includes('c1') || s.includes('negocios')) return 'avanzado';
  if (s.includes('completo') || s.includes('todos')) return 'completo';
  return 'principiante';
}
if (typeof window !== 'undefined') window.detectClassLevel = detectClassLevel;

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
      sm.cache.lastLesson = 6; // Lección 6 de principiantes
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
  async createClass(nombre, nivel = 'principiante') {
    const user = AuthService.getUser();
    if (!user || user.role !== 'profesor') throw new Error("Solo un usuario con rol 'profesor' puede crear clases.");

    const codigo = this.generateClassCode();
    const cleanNombre = (nombre || '').trim();
    if (!cleanNombre) throw new Error("Debes proporcionar un nombre para la clase.");
    const cleanNivel = nivel || detectClassLevel(cleanNombre);

    // Modo demo sin conexión a Supabase
    if (AuthService.isDemoUser()) {
      const newClass = {
        id: 'demo-class-' + Date.now(),
        nombre: cleanNombre,
        nivel: cleanNivel,
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
        nivel: c.nivel || detectClassLevel(c.nombre),
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
        nivel: DEMO_CLASSES_INITIAL[0].nivel || 'principiante',
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
        nivel: item.clases?.nivel || detectClassLevel(item.clases?.nombre),
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

// =============================================================================
// SERVICIO DE GESTIÓN DE ASIGNACIONES Y CALIFICACIONES (AssignmentService)
// =============================================================================
const AssignmentService = {
  getDemoAssignments() {
    try {
      const raw = localStorage.getItem('lms_demo_assignments');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    try {
      localStorage.setItem('lms_demo_assignments', JSON.stringify(DEMO_ASSIGNMENTS_INITIAL));
    } catch (e) {}
    return [...DEMO_ASSIGNMENTS_INITIAL];
  },

  saveDemoAssignments(list) {
    try {
      localStorage.setItem('lms_demo_assignments', JSON.stringify(list));
    } catch (e) {}
  },

  getDemoSubmissions() {
    try {
      const raw = localStorage.getItem('lms_demo_submissions');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    try {
      localStorage.setItem('lms_demo_submissions', JSON.stringify(DEMO_SUBMISSIONS_INITIAL));
    } catch (e) {}
    return [...DEMO_SUBMISSIONS_INITIAL];
  },

  saveDemoSubmissions(list) {
    try {
      localStorage.setItem('lms_demo_submissions', JSON.stringify(list));
    } catch (e) {}
  },

  // Obtener asignaciones de una clase
  async getAssignmentsByClass(claseId) {
    if (AuthService.isDemoUser()) {
      const list = this.getDemoAssignments();
      return list.filter(a => !claseId || a.claseId === claseId);
    }

    const client = getSupabaseClient();
    if (!client) {
      const list = this.getDemoAssignments();
      return list.filter(a => !claseId || a.claseId === claseId);
    }

    try {
      const { data, error } = await client
        .from('asignaciones')
        .select('*')
        .eq('id_clase', claseId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(a => ({
        id: a.id,
        claseId: a.id_clase,
        profesorId: a.id_profesor,
        titulo: a.titulo,
        descripcion: a.descripcion,
        puntosMax: a.puntos_max || 100,
        fechaLimite: a.fecha_limite,
        createdAt: a.created_at
      }));
    } catch (e) {
      console.error("[AssignmentService] Error obteniendo asignaciones:", e);
      return [];
    }
  },

  // Crear nueva asignación (Solo maestros)
  async createAssignment({ claseId, titulo, descripcion, puntosMax = 100, fechaLimite = null }) {
    const user = AuthService.getUser();
    if (!user || user.role !== 'profesor') {
      throw new Error("Solo un profesor puede crear asignaciones.");
    }
    const cleanTitle = (titulo || '').trim();
    const cleanDesc = (descripcion || '').trim();
    if (!cleanTitle) throw new Error("El título de la asignación es obligatorio.");
    if (!cleanDesc) throw new Error("Las instrucciones de la asignación son obligatorias.");

    const maxPts = parseInt(puntosMax, 10) || 100;

    if (AuthService.isDemoUser()) {
      const newAsg = {
        id: 'demo-asg-' + Date.now(),
        claseId: claseId || 'demo-class-001',
        profesorId: user.id,
        titulo: cleanTitle,
        descripcion: cleanDesc,
        puntosMax: maxPts,
        fechaLimite: fechaLimite || null,
        createdAt: new Date().toISOString()
      };
      const list = this.getDemoAssignments();
      list.unshift(newAsg);
      this.saveDemoAssignments(list);
      return newAsg;
    }

    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase no está conectado.");

    const { data, error } = await client
      .from('asignaciones')
      .insert({
        id_clase: claseId,
        id_profesor: user.id,
        titulo: cleanTitle,
        descripcion: cleanDesc,
        puntos_max: maxPts,
        fecha_limite: fechaLimite || null
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      claseId: data.id_clase,
      profesorId: data.id_profesor,
      titulo: data.titulo,
      descripcion: data.descripcion,
      puntosMax: data.puntos_max,
      fechaLimite: data.fecha_limite,
      createdAt: data.created_at
    };
  },

  // Obtener entregas de una asignación específica
  async getSubmissionsByAssignment(asignacionId) {
    if (AuthService.isDemoUser()) {
      const subs = this.getDemoSubmissions();
      return subs.filter(s => s.asignacionId === asignacionId);
    }

    const client = getSupabaseClient();
    if (!client) {
      const subs = this.getDemoSubmissions();
      return subs.filter(s => s.asignacionId === asignacionId);
    }

    try {
      const { data, error } = await client
        .from('entregas_asignaciones')
        .select(`
          id,
          id_asignacion,
          id_estudiante,
          id_clase,
          contenido_entrega,
          fecha_entrega,
          calificacion,
          retroalimentacion,
          calificado_en,
          usuarios (
            id,
            nombre,
            email
          )
        `)
        .eq('id_asignacion', asignacionId)
        .order('fecha_entrega', { ascending: false });

      if (error) throw error;

      return (data || []).map(s => ({
        id: s.id,
        asignacionId: s.id_asignacion,
        estudianteId: s.id_estudiante,
        claseId: s.id_clase,
        estudianteNombre: s.usuarios?.nombre || 'Estudiante',
        estudianteEmail: s.usuarios?.email || '',
        contenido: s.contenido_entrega,
        fechaEntrega: s.fecha_entrega,
        calificacion: s.calificacion,
        retroalimentacion: s.retroalimentacion,
        calificadoEn: s.calificado_en
      }));
    } catch (e) {
      console.error("[AssignmentService] Error obteniendo entregas:", e);
      return [];
    }
  },

  // Calificar una entrega de estudiante (Solo maestros)
  async gradeSubmission({ entregaId, calificacion, retroalimentacion }) {
    const user = AuthService.getUser();
    if (!user || user.role !== 'profesor') {
      throw new Error("Solo un profesor puede calificar entregas.");
    }
    const score = parseFloat(calificacion);
    if (isNaN(score) || score < 0) {
      throw new Error("Ingresa una calificación válida mayor o igual a 0.");
    }
    const feedback = (retroalimentacion || '').trim();

    if (AuthService.isDemoUser()) {
      const subs = this.getDemoSubmissions();
      const idx = subs.findIndex(s => s.id === entregaId);
      if (idx !== -1) {
        subs[idx].calificacion = score;
        subs[idx].retroalimentacion = feedback;
        subs[idx].calificadoEn = new Date().toISOString();
        this.saveDemoSubmissions(subs);
        return subs[idx];
      }
      throw new Error("Entrega no encontrada.");
    }

    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase no conectado.");

    const { data, error } = await client
      .from('entregas_asignaciones')
      .update({
        calificacion: score,
        retroalimentacion: feedback,
        calificado_en: new Date().toISOString()
      })
      .eq('id', entregaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Estudiante: obtener asignaciones de su clase con el estado de su entrega
  async getStudentAssignments(claseId, estudianteId) {
    const user = AuthService.getUser();
    const studentId = estudianteId || user?.id;
    if (!studentId) return [];

    const assignments = await this.getAssignmentsByClass(claseId);

    let mySubmissions = [];
    if (AuthService.isDemoUser()) {
      const allSubs = this.getDemoSubmissions();
      mySubmissions = allSubs.filter(s => s.estudianteId === studentId || s.estudianteId === 'demo-student-001');
    } else {
      const client = getSupabaseClient();
      if (client) {
        try {
          const { data } = await client
            .from('entregas_asignaciones')
            .select('*')
            .eq('id_estudiante', studentId);
          if (data) {
            mySubmissions = data.map(s => ({
              id: s.id,
              asignacionId: s.id_asignacion,
              estudianteId: s.id_estudiante,
              claseId: s.id_clase,
              contenido: s.contenido_entrega,
              fechaEntrega: s.fecha_entrega,
              calificacion: s.calificacion,
              retroalimentacion: s.retroalimentacion,
              calificadoEn: s.calificado_en
            }));
          }
        } catch (err) {
          console.warn("[AssignmentService] Error consultando entregas de alumno:", err);
        }
      }
    }

    return assignments.map(asg => {
      const sub = mySubmissions.find(s => s.asignacionId === asg.id);
      return {
        ...asg,
        submission: sub || null,
        isSubmitted: !!sub,
        isGraded: !!(sub && sub.calificacion !== null && sub.calificacion !== undefined)
      };
    });
  },

  // Estudiante: Enviar o responder una asignación
  async submitAssignment({ asignacionId, claseId, contenido }) {
    const user = AuthService.getUser();
    if (!user) throw new Error("Debes iniciar sesión para entregar una asignación.");

    const cleanContent = (contenido || '').trim();
    if (!cleanContent) throw new Error("Escribe tu respuesta antes de enviar la asignación.");

    if (AuthService.isDemoUser()) {
      const subs = this.getDemoSubmissions();
      const existingIdx = subs.findIndex(s => s.asignacionId === asignacionId && (s.estudianteId === user.id || s.estudianteId === 'demo-student-001'));

      if (existingIdx !== -1) {
        subs[existingIdx].contenido = cleanContent;
        subs[existingIdx].fechaEntrega = new Date().toISOString();
        // Si se vuelve a enviar antes de calificar o para corrección:
        this.saveDemoSubmissions(subs);
        return subs[existingIdx];
      } else {
        const newSub = {
          id: 'demo-sub-' + Date.now(),
          asignacionId,
          claseId: claseId || 'demo-class-001',
          estudianteId: user.id,
          estudianteNombre: user.nombre || 'Estudiante',
          estudianteEmail: user.email || '',
          contenido: cleanContent,
          fechaEntrega: new Date().toISOString(),
          calificacion: null,
          retroalimentacion: null,
          calificadoEn: null
        };
        subs.push(newSub);
        this.saveDemoSubmissions(subs);
        return newSub;
      }
    }

    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase no conectado.");

    const { data, error } = await client
      .from('entregas_asignaciones')
      .upsert({
        id_asignacion: asignacionId,
        id_clase: claseId,
        id_estudiante: user.id,
        contenido_entrega: cleanContent,
        fecha_entrega: new Date().toISOString()
      }, { onConflict: 'id_asignacion,id_estudiante' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Estudiante: consultar resumen de todas sus calificaciones
  async getStudentGradesSummary(estudianteId) {
    const user = AuthService.getUser();
    const studentId = estudianteId || user?.id;
    if (!studentId) return { grades: [], average: 0, totalGraded: 0, totalPending: 0 };

    let classes = [];
    try {
      classes = await ClassService.getStudentClasses();
    } catch (e) {}

    let allAssignments = [];
    if (AuthService.isDemoUser()) {
      allAssignments = this.getDemoAssignments();
    } else {
      const client = getSupabaseClient();
      if (client && classes.length > 0) {
        const classIds = classes.map(c => c.id);
        const { data } = await client
          .from('asignaciones')
          .select('*, clases(nombre)')
          .in('id_clase', classIds);
        if (data) {
          allAssignments = data.map(a => ({
            id: a.id,
            claseId: a.id_clase,
            claseNombre: a.clases?.nombre || 'Clase de Inglés',
            titulo: a.titulo,
            puntosMax: a.puntos_max || 100,
            fechaLimite: a.fecha_limite
          }));
        }
      } else {
        allAssignments = this.getDemoAssignments();
      }
    }

    let mySubmissions = [];
    if (AuthService.isDemoUser()) {
      const allSubs = this.getDemoSubmissions();
      mySubmissions = allSubs.filter(s => s.estudianteId === studentId || s.estudianteId === 'demo-student-001');
    } else {
      const client = getSupabaseClient();
      if (client) {
        const { data } = await client
          .from('entregas_asignaciones')
          .select('*')
          .eq('id_estudiante', studentId);
        if (data) {
          mySubmissions = data.map(s => ({
            id: s.id,
            asignacionId: s.id_asignacion,
            contenido: s.contenido_entrega,
            fechaEntrega: s.fecha_entrega,
            calificacion: s.calificacion,
            retroalimentacion: s.retroalimentacion,
            calificadoEn: s.calificado_en
          }));
        }
      }
    }

    const grades = [];
    let sumScores = 0;
    let sumMax = 0;
    let totalGraded = 0;
    let totalPending = 0;

    allAssignments.forEach(asg => {
      const sub = mySubmissions.find(s => s.asignacionId === asg.id);
      const isGraded = !!(sub && sub.calificacion !== null && sub.calificacion !== undefined);
      const isSubmitted = !!sub;

      if (isGraded) {
        totalGraded++;
        sumScores += Number(sub.calificacion);
        sumMax += Number(asg.puntosMax || 100);
      } else if (isSubmitted) {
        totalPending++;
      }

      grades.push({
        asignacionId: asg.id,
        titulo: asg.titulo,
        puntosMax: asg.puntosMax || 100,
        submission: sub || null,
        isSubmitted,
        isGraded,
        score: isGraded ? Number(sub.calificacion) : null,
        feedback: isGraded ? sub.retroalimentacion : null,
        gradedAt: isGraded ? sub.calificadoEn : null,
        submittedAt: isSubmitted ? sub.fechaEntrega : null
      });
    });

    const average = sumMax > 0 ? Math.round((sumScores / sumMax) * 100) : 0;

    return {
      grades,
      average,
      totalGraded,
      totalPending,
      totalAssignments: allAssignments.length
    };
  },

  // Maestro: Libro de calificaciones consolidado para una clase
  async getClassGradebook(claseId) {
    const students = await ClassService.getClassStudentsProgress(claseId);
    const assignments = await this.getAssignmentsByClass(claseId);

    let allSubs = [];
    if (AuthService.isDemoUser()) {
      allSubs = this.getDemoSubmissions().filter(s => s.claseId === claseId || !s.claseId);
    } else {
      const client = getSupabaseClient();
      if (client && claseId) {
        const { data } = await client
          .from('entregas_asignaciones')
          .select('*')
          .eq('id_clase', claseId);
        if (data) {
          allSubs = data.map(s => ({
            id: s.id,
            asignacionId: s.id_asignacion,
            estudianteId: s.id_estudiante,
            contenido: s.contenido_entrega,
            fechaEntrega: s.fecha_entrega,
            calificacion: s.calificacion,
            retroalimentacion: s.retroalimentacion,
            calificadoEn: s.calificado_en
          }));
        }
      }
    }

    // Construir matriz de notas por alumno
    const rows = students.map(student => {
      let studentSum = 0;
      let studentMax = 0;
      let studentGradedCount = 0;

      const studentGrades = assignments.map(asg => {
        const sub = allSubs.find(s => s.asignacionId === asg.id && (s.estudianteId === student.id || (student.id === 'demo-student-001' && s.estudianteId === 'demo-student-001')));
        const hasScore = sub && sub.calificacion !== null && sub.calificacion !== undefined;
        if (hasScore) {
          studentSum += Number(sub.calificacion);
          studentMax += Number(asg.puntosMax || 100);
          studentGradedCount++;
        }
        return {
          asignacionId: asg.id,
          submissionId: sub?.id || null,
          hasScore,
          score: hasScore ? Number(sub.calificacion) : null,
          maxScore: asg.puntosMax || 100,
          isSubmitted: !!sub,
          feedback: sub?.retroalimentacion || null
        };
      });

      const avgPercent = studentMax > 0 ? Math.round((studentSum / studentMax) * 100) : null;

      return {
        student,
        grades: studentGrades,
        gradedCount: studentGradedCount,
        averagePercent: avgPercent
      };
    });

    return {
      assignments,
      rows
    };
  }
};

// Exportar en el ámbito global del navegador
if (typeof window !== 'undefined') {
  window.SupabaseConfig = SupabaseConfig;
  window.getSupabaseClient = getSupabaseClient;
  window.AuthService = AuthService;
  window.ClassService = ClassService;
  window.ProgressSyncService = ProgressSyncService;
  window.AssignmentService = AssignmentService;
}


