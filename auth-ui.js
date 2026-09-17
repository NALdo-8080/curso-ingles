/**
 * auth-ui.js - Interfaz Gráfica para Autenticación y Gestión de Clases LMS
 * Inyecta dinámicamente modales de login/registro, creación de clases y unión con código.
 * Mantiene sincronizada la barra de navegación en todas las páginas.
 */

const AuthUI = {
  activeTab: 'login', // 'login' | 'register'
  selectedRole: 'estudiante', // 'estudiante' | 'profesor'

  init() {
    this.injectStyles();
    this.injectModals();
    this.setupEventListeners();
    this.updateNavbar();

    // Suscribirse a cambios de autenticación
    if (window.AuthService) {
      window.AuthService.onAuthStateChange(() => {
        this.updateNavbar();
        if (typeof window.onLMSAuthChanged === 'function') {
          window.onLMSAuthChanged();
        }
      });
      // Inicializar sesión
      window.AuthService.init().then(() => {
        this.updateNavbar();
        if (typeof window.onLMSAuthChanged === 'function') {
          window.onLMSAuthChanged();
        }
      });
    }
  },

  // ---------------------------------------------------------------------------
  // Inyección de Modales en el DOM
  // ---------------------------------------------------------------------------
  injectModals() {
    if (document.getElementById('lms-modals-root')) return;

    const root = document.createElement('div');
    root.id = 'lms-modals-root';
    root.innerHTML = `
      <!-- MODAL DE AUTENTICACIÓN (LOGIN / REGISTRO) -->
      <div class="lms-modal-backdrop" id="lms-auth-modal" style="display:none;">
        <div class="lms-modal-dialog">
          <button class="lms-modal-close" onclick="AuthUI.closeAuthModal()" aria-label="Cerrar">&times;</button>
          
          <div class="lms-auth-header">
            <div class="lms-auth-brand">🇬🇧 Curso de Inglés LMS</div>
            <p class="lms-auth-subtitle">Guarda tu progreso en la nube y conéctate con tu clase</p>
          </div>

          <!-- TABS: INICIAR SESIÓN / REGISTRO -->
          <div class="lms-tabs-nav">
            <button class="lms-tab-btn active" id="tab-btn-login" onclick="AuthUI.switchTab('login')">
              Iniciar Sesión
            </button>
            <button class="lms-tab-btn" id="tab-btn-register" onclick="AuthUI.switchTab('register')">
              Crear Cuenta
            </button>
          </div>

          <!-- MENSAJES DE ESTADO / ALERTAS -->
          <div id="lms-auth-alert" class="lms-alert" style="display:none;"></div>

          <!-- FORMULARIO DE INICIO DE SESIÓN -->
          <form id="lms-form-login" onsubmit="AuthUI.handleLogin(event)">
            <div class="lms-form-group">
              <label for="login-email">Correo Electrónico</label>
              <input type="email" id="login-email" class="lms-input" placeholder="tu-correo@ejemplo.com" required autocomplete="email">
            </div>
            <div class="lms-form-group">
              <label for="login-password">Contraseña</label>
              <input type="password" id="login-password" class="lms-input" placeholder="••••••••" required autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn-primary lms-btn-submit" id="btn-submit-login">
              Entrar al Curso
            </button>

            <!-- ACCESO RÁPIDO CON CUENTAS DEMO -->
            <div class="demo-accounts-modal-box">
              <div class="demo-modal-title">
                <span>🧪</span> Modo Prueba / Cuentas Demo Rápidas:
              </div>
              <div class="demo-modal-grid">
                <button type="button" class="btn-demo-quick teacher" onclick="AuthUI.loginAsDemoTeacher()">
                  👨‍🏫 Iniciar como Maestro
                </button>
                <button type="button" class="btn-demo-quick student" onclick="AuthUI.loginAsDemoStudent()">
                  🎓 Iniciar como Estudiante
                </button>
              </div>
              <div style="font-size:11.5px;color:var(--text-muted);margin-top:7px;text-align:center;">
                Prueba el panel del maestro y el estudiante con 1 clic.
              </div>
            </div>
          </form>

          <!-- FORMULARIO DE REGISTRO CON SELECCIÓN DE ROL -->
          <form id="lms-form-register" style="display:none;" onsubmit="AuthUI.handleRegister(event)">
            <div class="lms-form-group">
              <label for="reg-nombre">Nombre Completo</label>
              <input type="text" id="reg-nombre" class="lms-input" placeholder="Ej. Carlos Mendoza" required autocomplete="name">
            </div>
            <div class="lms-form-group">
              <label for="reg-email">Correo Electrónico</label>
              <input type="email" id="reg-email" class="lms-input" placeholder="tu-correo@ejemplo.com" required autocomplete="email">
            </div>
            <div class="lms-form-group">
              <label for="reg-password">Contraseña</label>
              <input type="password" id="reg-password" class="lms-input" placeholder="Mínimo 6 caracteres" required minlength="6" autocomplete="new-password">
            </div>

            <!-- SELECTOR DE ROL VISUAL -->
            <div class="lms-form-group">
              <label>¿Cómo vas a usar la plataforma?</label>
              <div class="lms-role-selector">
                <div class="lms-role-card active" id="role-card-estudiante" onclick="AuthUI.selectRole('estudiante')">
                  <div class="role-icon">🎓</div>
                  <div class="role-info">
                    <div class="role-title">Soy Estudiante</div>
                    <div class="role-desc">Aprenderé inglés, ganaré XP e insignias y me uniré a clases.</div>
                  </div>
                </div>
                <div class="lms-role-card" id="role-card-profesor" onclick="AuthUI.selectRole('profesor')">
                  <div class="role-icon">👨‍🏫</div>
                  <div class="role-info">
                    <div class="role-title">Soy Profesor</div>
                    <div class="role-desc">Crearé clases, compartiré códigos y monitorearé a mis alumnos.</div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary lms-btn-submit" id="btn-submit-register">
              Registrarme Ahora
            </button>
          </form>

          <!-- FOOTER CON ENLACE A CONFIGURACIÓN DE SUPABASE -->
          <div class="lms-modal-footer">
            <button type="button" class="lms-link-btn" onclick="AuthUI.openConfigModal()">
              ⚙️ Configurar claves de Supabase
            </button>
          </div>
        </div>
      </div>

      <!-- MODAL PROFESOR: CREAR CLASE -->
      <div class="lms-modal-backdrop" id="lms-create-class-modal" style="display:none;">
        <div class="lms-modal-dialog">
          <button class="lms-modal-close" onclick="AuthUI.closeCreateClassModal()">&times;</button>
          <div class="lms-auth-header">
            <div class="lms-auth-brand">👨‍🏫 Crear Nueva Clase</div>
            <p class="lms-auth-subtitle">Genera un grupo para que tus alumnos ingresen su código</p>
          </div>
          <div id="lms-create-class-alert" class="lms-alert" style="display:none;"></div>
          <form onsubmit="AuthUI.handleCreateClass(event)">
            <div class="lms-form-group">
              <label for="class-name">Nombre de la Clase o Grupo</label>
              <input type="text" id="class-name" class="lms-input" placeholder="Ej. Inglés Básico A1 - Grupo Matutino" required>
            </div>
            <div class="lms-form-group">
              <label for="class-level">Nivel y Lecciones Asignadas</label>
              <select id="class-level" class="lms-input" style="cursor:pointer;">
                <option value="principiante" selected>🟢 Principiantes (A1) — 9 Lecciones (1 a 9)</option>
                <option value="intermedio">🔵 Intermedio (A2-B1) — 9 Lecciones (10 a 18)</option>
                <option value="avanzado">🟣 Avanzado & Negocios (B2) — 9 Lecciones (19 a 27)</option>
                <option value="completo">🌐 Curso Completo — 27 Lecciones (1 a 27)</option>
              </select>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
              💡 El sistema generará automáticamente un código único (ej. <strong>ING-8X2F</strong>) que podrás compartir con tus estudiantes. Las lecciones que vean estarán restringidas a este nivel.
            </p>
            <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:22px;">
              <button type="button" class="btn btn-secondary" onclick="AuthUI.closeCreateClassModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-create-class">Crear Clase</button>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL ESTUDIANTE: UNIRSE A CLASE -->
      <div class="lms-modal-backdrop" id="lms-join-class-modal" style="display:none;">
        <div class="lms-modal-dialog">
          <button class="lms-modal-close" onclick="AuthUI.closeJoinClassModal()">&times;</button>
          <div class="lms-auth-header">
            <div class="lms-auth-brand">🎒 Unirse a una Clase</div>
            <p class="lms-auth-subtitle">Ingresa el código proporcionado por tu profesor</p>
          </div>
          <div id="lms-join-class-alert" class="lms-alert" style="display:none;"></div>
          <form onsubmit="AuthUI.handleJoinClass(event)">
            <div class="lms-form-group">
              <label for="join-code">Código de la Clase</label>
              <input type="text" id="join-code" class="lms-input uppercase-code" placeholder="Ej. ING-8X2F" required maxlength="12" style="font-size:18px;font-weight:700;letter-spacing:1.5px;text-align:center;">
            </div>
            <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:22px;">
              <button type="button" class="btn btn-secondary" onclick="AuthUI.closeJoinClassModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-join-class">Unirme a la Clase</button>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL DE CONFIGURACIÓN DE SUPABASE (CREDENTIALS) -->
      <div class="lms-modal-backdrop" id="lms-config-modal" style="display:none;">
        <div class="lms-modal-dialog">
          <button class="lms-modal-close" onclick="AuthUI.closeConfigModal()">&times;</button>
          <div class="lms-auth-header">
            <div class="lms-auth-brand">⚙️ Configuración de Supabase</div>
            <p class="lms-auth-subtitle">Ingresa las credenciales de tu proyecto en Supabase</p>
          </div>
          <div style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;line-height:1.5;">
            Si ejecutas este proyecto en GitHub Pages o de forma local, puedes guardar aquí tu <strong>Project URL</strong> y <strong>Anon Key</strong>. Se guardarán de forma segura en tu navegador.
          </div>
          <form onsubmit="AuthUI.handleSaveConfig(event)">
            <div class="lms-form-group">
              <label for="cfg-url">Project URL</label>
              <input type="url" id="cfg-url" class="lms-input" placeholder="https://xyzcompany.supabase.co" required>
            </div>
            <div class="lms-form-group">
              <label for="cfg-key">Project Anon / Public Key</label>
              <input type="text" id="cfg-key" class="lms-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." required>
            </div>
            <div style="display:flex;gap:10px;justify-content:space-between;align-items:center;margin-top:20px;">
              <button type="button" class="btn btn-secondary" onclick="AuthUI.handleResetConfig()" style="font-size:12px;color:var(--rose);">Restablecer</button>
              <div style="display:flex;gap:8px;">
                <button type="button" class="btn btn-secondary" onclick="AuthUI.closeConfigModal()">Cerrar</button>
                <button type="submit" class="btn btn-primary">Guardar Credenciales</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL PROFESOR: CREAR ASIGNACIÓN -->
      <div class="lms-modal-backdrop" id="lms-create-assignment-modal" style="display:none;">
        <div class="lms-modal-dialog" style="max-width:560px;">
          <button class="lms-modal-close" onclick="AuthUI.closeCreateAssignmentModal()">&times;</button>
          <div class="lms-auth-header">
            <div class="lms-auth-brand">📝 Crear Nueva Asignación</div>
            <p class="lms-auth-subtitle">Publica una tarea para los estudiantes de esta clase</p>
          </div>
          <div id="lms-create-assignment-alert" class="lms-alert" style="display:none;"></div>
          <form onsubmit="AuthUI.handleCreateAssignment(event)">
            <input type="hidden" id="asg-clase-id" value="">
            <div class="lms-form-group">
              <label for="asg-title">Título de la Asignación</label>
              <input type="text" id="asg-title" class="lms-input" placeholder="Ej. Tarea 3: Redacción sobre tus pasatiempos" required>
            </div>
            <div class="lms-form-group">
              <label for="asg-desc">Instrucciones Detalladas</label>
              <textarea id="asg-desc" class="lms-input" rows="4" placeholder="Describe qué debe redactar o responder el estudiante, vocabulario sugerido, etc." required style="resize:vertical;font-family:inherit;"></textarea>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="lms-form-group">
                <label for="asg-points">Puntaje Máximo</label>
                <input type="number" id="asg-points" class="lms-input" value="100" min="1" max="1000" required>
              </div>
              <div class="lms-form-group">
                <label for="asg-deadline">Fecha Límite (Opcional)</label>
                <input type="date" id="asg-deadline" class="lms-input">
              </div>
            </div>
            <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:20px;">
              <button type="button" class="btn btn-secondary" onclick="AuthUI.closeCreateAssignmentModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-create-asg">Publicar Asignación</button>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL ESTUDIANTE: ENTREGAR ASIGNACIÓN -->
      <div class="lms-modal-backdrop" id="lms-submit-assignment-modal" style="display:none;">
        <div class="lms-modal-dialog" style="max-width:580px;">
          <button class="lms-modal-close" onclick="AuthUI.closeSubmitAssignmentModal()">&times;</button>
          <div class="lms-auth-header">
            <div class="lms-auth-brand" id="modal-submit-asg-title">📝 Responder Asignación</div>
            <p class="lms-auth-subtitle" id="modal-submit-asg-subtitle">Completa y envía tu trabajo para revisión del profesor</p>
          </div>
          <div id="modal-submit-instructions-box" style="background:var(--bg-surface-alt);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:var(--text-secondary);line-height:1.5;"></div>
          <div id="lms-submit-asg-alert" class="lms-alert" style="display:none;"></div>
          <form onsubmit="AuthUI.handleSubmitAssignment(event)">
            <input type="hidden" id="submit-asg-id" value="">
            <input type="hidden" id="submit-clase-id" value="">
            <div class="lms-form-group">
              <label for="submit-asg-content">Tu Respuesta / Redacción en Inglés</label>
              <textarea id="submit-asg-content" class="lms-input" rows="7" placeholder="Write your answer or paragraph here in English..." required style="resize:vertical;font-family:inherit;line-height:1.6;font-size:14px;"></textarea>
            </div>
            <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:20px;">
              <button type="button" class="btn btn-secondary" onclick="AuthUI.closeSubmitAssignmentModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-student-asg">🚀 Enviar Asignación</button>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL MAESTRO: CALIFICAR ENTREGA -->
      <div class="lms-modal-backdrop" id="lms-grade-submission-modal" style="display:none;">
        <div class="lms-modal-dialog" style="max-width:600px;">
          <button class="lms-modal-close" onclick="AuthUI.closeGradeSubmissionModal()">&times;</button>
          <div class="lms-auth-header">
            <div class="lms-auth-brand">✍️ Calificar Entrega de Estudiante</div>
            <p class="lms-auth-subtitle" id="grade-modal-student-name">Revisa la respuesta y asigna nota con retroalimentación</p>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px;">Respuesta del Alumno:</div>
            <div id="grade-modal-submission-content" style="background:var(--bg-surface-alt);border:1.5px solid var(--border);border-radius:10px;padding:14px;font-size:13.5px;color:var(--text-main);white-space:pre-wrap;max-height:180px;overflow-y:auto;line-height:1.6;"></div>
          </div>
          <div id="lms-grade-asg-alert" class="lms-alert" style="display:none;"></div>
          <form onsubmit="AuthUI.handleGradeSubmission(event)">
            <input type="hidden" id="grade-submission-id" value="">
            <div style="display:grid;grid-template-columns:140px 1fr;gap:14px;">
              <div class="lms-form-group">
                <label for="grade-score">Nota (<span id="grade-max-points">/ 100</span>)</label>
                <input type="number" id="grade-score" class="lms-input" min="0" max="1000" step="0.5" required style="font-size:18px;font-weight:800;color:var(--primary);text-align:center;">
              </div>
              <div class="lms-form-group">
                <label for="grade-feedback">Retroalimentación / Comentarios</label>
                <textarea id="grade-feedback" class="lms-input" rows="3" placeholder="Escribe consejos pedagógicos, correcciones o felicitaciones..." style="resize:vertical;font-family:inherit;"></textarea>
              </div>
            </div>
            <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:20px;">
              <button type="button" class="btn btn-secondary" onclick="AuthUI.closeGradeSubmissionModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-grade">Guardar Calificación</button>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL ESTUDIANTE: VER CALIFICACIÓN Y FEEDBACK -->
      <div class="lms-modal-backdrop" id="lms-view-feedback-modal" style="display:none;">
        <div class="lms-modal-dialog" style="max-width:560px;">
          <button class="lms-modal-close" onclick="AuthUI.closeFeedbackModal()">&times;</button>
          <div class="lms-auth-header">
            <div class="lms-auth-brand" id="feedback-modal-title">💬 Retroalimentación del Profesor</div>
            <p class="lms-auth-subtitle" id="feedback-modal-subtitle">Revisión de tu asignación</p>
          </div>
          <div id="feedback-modal-score-wrap" style="display:flex;align-items:center;justify-content:space-between;background:var(--emerald-light);border:1.5px solid var(--emerald-border);border-radius:12px;padding:12px 18px;margin-bottom:16px;">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--emerald);text-transform:uppercase;">Calificación Obtenida</div>
              <div id="feedback-modal-date" style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">Calificado recientemente</div>
            </div>
            <div id="feedback-modal-score-pill" style="font-size:22px;font-weight:900;color:var(--emerald);font-family:var(--font-mono);">-- / 100</div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;">Comentarios del Maestro:</div>
            <div id="feedback-modal-text" style="background:var(--bg-surface-alt);border-left:4px solid var(--primary);border-radius:6px;padding:12px 14px;font-size:13.5px;color:var(--text-main);line-height:1.6;font-style:italic;"></div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;">Tu Entrega Enviada:</div>
            <div id="feedback-modal-original-text" style="background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:13px;color:var(--text-secondary);max-height:140px;overflow-y:auto;white-space:pre-wrap;"></div>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:20px;">
            <button type="button" class="btn btn-primary" onclick="AuthUI.closeFeedbackModal()">Entendido</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(root);
  },

  // ---------------------------------------------------------------------------
  // Actualización de la Barra de Navegación
  // ---------------------------------------------------------------------------
  updateNavbar() {
    const container = document.getElementById('nav-auth-container');
    const xpPill = document.getElementById('nav-xp-counter');
    const user = window.AuthService ? window.AuthService.getUser() : null;

    // Controlar visibilidad del XP en la barra de navegación:
    // Solo visible cuando está logueado como estudiante. Si es profesor o visitante, se oculta.
    if (xpPill) {
      if (user && user.role === 'estudiante') {
        xpPill.style.display = 'inline-flex';
        const xp = window.StorageManager ? window.StorageManager.getXP() : 0;
        xpPill.textContent = `⚡ ${xp.toLocaleString()} XP`;
      } else {
        xpPill.style.display = 'none';
      }
    }

    // Actualizar enlace de navegación a progreso si estamos en index.html
    const navProgressLink = document.querySelector('a.nav-link[href="#dashboard"], a.nav-link[href="#guest-welcome-card"], a.nav-link[href="#teacher-dashboard-panel"]');
    if (navProgressLink) {
      if (user && user.role === 'profesor') {
        navProgressLink.href = '#teacher-dashboard-panel';
        navProgressLink.textContent = '👨‍🏫 Panel Maestro';
      } else if (user && user.role === 'estudiante') {
        navProgressLink.href = '#dashboard';
        navProgressLink.textContent = '📊 Tu Progreso';
      } else {
        navProgressLink.href = '#guest-welcome-card';
        navProgressLink.textContent = '📊 Tu Progreso';
      }
    }

    // Asegurar que el botón de configuración (.settings-dropdown-wrapper) exista en el navbar
    let settingsWrapper = document.querySelector('.settings-dropdown-wrapper');
    if (!settingsWrapper) {
      const navActions = document.querySelector('.nav-actions') || document.querySelector('.nav-right');
      if (navActions) {
        settingsWrapper = document.createElement('div');
        settingsWrapper.className = 'settings-dropdown-wrapper';
        settingsWrapper.innerHTML = `
          <button class="settings-btn" id="open-settings-btn" onclick="AuthUI.toggleSettingsDropdown(event)" aria-label="Configuración" title="Configuración">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          <div class="settings-dropdown" id="settings-dropdown"></div>
        `;
        navActions.appendChild(settingsWrapper);
      }
    }

    if (container) {
      if (!user) {
        container.innerHTML = `
          <button class="btn btn-sm btn-outline lms-nav-auth-btn" onclick="AuthUI.openAuthModal('login')">
            <span>👤</span> Iniciar Sesión
          </button>
        `;
      } else {
        const isTeacher = user.role === 'profesor';
        const roleLabel = isTeacher ? '👨‍🏫 Profesor' : '🎓 Estudiante';
        const roleClass = isTeacher ? 'badge-teacher' : 'badge-student';

        // Píldora de usuario limpia, sin botón de puerta ni clutter:
        container.innerHTML = `
          <div class="lms-user-pill" onclick="AuthUI.toggleSettingsDropdown(event)" role="button" tabindex="0" title="Cuenta: ${user.nombre} (${user.email}) — Clic para abrir configuración">
            <span class="lms-role-tag ${roleClass}">${roleLabel}</span>
            <span class="lms-user-name" title="${user.email}">${user.nombre}</span>
          </div>
        `;
      }
    }

    // Actualizar dinámicamente el contenido del menú desplegable de Configuración
    this.renderSettingsDropdown();
  },

  // ---------------------------------------------------------------------------
  // Módulo de Configuración (Estilo Curso ML)
  // ---------------------------------------------------------------------------
  toggleSettingsDropdown(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const dropdown = document.getElementById('settings-dropdown');
    if (!dropdown) return;
    const isOpen = dropdown.classList.contains('open');
    if (!isOpen) {
      this.renderSettingsDropdown();
      dropdown.classList.add('open');
    } else {
      dropdown.classList.remove('open');
    }
  },

  closeSettingsDropdown() {
    const dropdown = document.getElementById('settings-dropdown');
    if (dropdown) dropdown.classList.remove('open');
  },

  renderSettingsDropdown() {
    const dropdown = document.getElementById('settings-dropdown');
    if (!dropdown) return;

    const user = window.AuthService ? window.AuthService.getUser() : null;
    const theme = window.StorageManager ? window.StorageManager.getTheme() : 'dark';
    const isTeacher = user && user.role === 'profesor';
    const isStudent = user && user.role === 'estudiante';

    let userHeaderHtml = '';
    let accountActionsHtml = '';
    let logoutHtml = '';

    if (user) {
      const roleText = isTeacher ? 'Profesor' : 'Estudiante';
      const roleBadgeClass = isTeacher ? 'teacher' : 'student';
      const roleAvatar = isTeacher ? '👨‍🏫' : '🎓';

      userHeaderHtml = `
        <div class="settings-user-header">
          <div class="settings-user-avatar">${roleAvatar}</div>
          <div class="settings-user-meta">
            <div class="settings-user-name">${user.nombre || 'Usuario'}</div>
            <div class="settings-user-email">${user.email || ''}</div>
            <span class="settings-role-badge ${roleBadgeClass}">${roleText}</span>
          </div>
        </div>
      `;

      if (isTeacher) {
        accountActionsHtml = `
          <div class="settings-menu-item" onclick="AuthUI.openCreateClassModal();AuthUI.closeSettingsDropdown();">
            <span class="settings-item-icon">➕</span>
            <span class="settings-item-text">Crear Nueva Clase</span>
            <span class="settings-item-arrow">›</span>
          </div>
          <div class="settings-menu-item" onclick="AuthUI.closeSettingsDropdown();if(location.pathname.endsWith('index.html')||location.pathname.endsWith('/')){location.hash='teacher-dashboard-panel';if(typeof switchTeacherClassTab==='function')switchTeacherClassTab('assignments');}else{location.href='index.html#teacher-dashboard-panel';}">
            <span class="settings-item-icon">📝</span>
            <span class="settings-item-text">Asignaciones y Calificaciones</span>
            <span class="settings-item-arrow">›</span>
          </div>
        `;
      } else if (isStudent) {
        accountActionsHtml = `
          <div class="settings-menu-item" onclick="AuthUI.openJoinClassModal();AuthUI.closeSettingsDropdown();">
            <span class="settings-item-icon">🎒</span>
            <span class="settings-item-text">Unirse a una Clase</span>
            <span class="settings-item-arrow">›</span>
          </div>
          <div class="settings-menu-item" onclick="AuthUI.closeSettingsDropdown();if(location.pathname.endsWith('index.html')||location.pathname.endsWith('/')){location.hash='student-classes-panel';}else{location.href='index.html#student-classes-panel';}">
            <span class="settings-item-icon">📚</span>
            <span class="settings-item-text">Mis Clases y Profesores</span>
            <span class="settings-item-arrow">›</span>
          </div>
          <div class="settings-menu-item" onclick="AuthUI.closeSettingsDropdown();if(location.pathname.endsWith('index.html')||location.pathname.endsWith('/')){location.hash='student-assignments-panel';}else{location.href='index.html#student-assignments-panel';}">
            <span class="settings-item-icon">📝</span>
            <span class="settings-item-text">Mis Asignaciones</span>
            <span class="settings-item-arrow">›</span>
          </div>
          <div class="settings-menu-item" onclick="AuthUI.closeSettingsDropdown();if(location.pathname.endsWith('index.html')||location.pathname.endsWith('/')){location.hash='student-grades-panel';}else{location.href='index.html#student-grades-panel';}">
            <span class="settings-item-icon">📊</span>
            <span class="settings-item-text">Mis Calificaciones</span>
            <span class="settings-item-arrow">›</span>
          </div>
        `;
      }

      logoutHtml = `
        <div class="settings-divider"></div>
        <div class="settings-menu-item logout-item" onclick="AuthUI.handleLogout();AuthUI.closeSettingsDropdown();">
          <span class="settings-item-icon" style="color:var(--rose,#ef4444);">🚪</span>
          <span class="settings-item-text" style="color:var(--rose,#ef4444);font-weight:700;">Cerrar Sesión</span>
          <span class="settings-item-arrow" style="color:var(--rose,#ef4444);">›</span>
        </div>
      `;
    } else {
      userHeaderHtml = `
        <div class="settings-user-header">
          <div class="settings-user-avatar">👤</div>
          <div class="settings-user-meta">
            <div class="settings-user-name">Invitado</div>
            <div class="settings-user-email">Sin sesión iniciada</div>
          </div>
        </div>
      `;

      accountActionsHtml = `
        <div class="settings-menu-item" onclick="AuthUI.openAuthModal('login');AuthUI.closeSettingsDropdown();">
          <span class="settings-item-icon">🔑</span>
          <span class="settings-item-text">Iniciar Sesión / Registro</span>
          <span class="settings-item-arrow">›</span>
        </div>
        <div class="settings-menu-item" onclick="AuthUI.loginAsDemoTeacher();AuthUI.closeSettingsDropdown();">
          <span class="settings-item-icon">👨‍🏫</span>
          <span class="settings-item-text">Probar Demo Maestro</span>
          <span class="settings-item-arrow">›</span>
        </div>
        <div class="settings-menu-item" onclick="AuthUI.loginAsDemoStudent();AuthUI.closeSettingsDropdown();">
          <span class="settings-item-icon">🎓</span>
          <span class="settings-item-text">Probar Demo Estudiante</span>
          <span class="settings-item-arrow">›</span>
        </div>
      `;
    }

    dropdown.innerHTML = `
      ${userHeaderHtml}

      ${accountActionsHtml}

      <div class="settings-divider"></div>

      <!-- Fila de Tema Claro / Oscuro (Idéntica a Curso ML) -->
      <div class="settings-row">
        <span class="settings-label">Tema</span>
        <button class="settings-theme-switch theme-toggle-btn" id="settings-theme-switch" onclick="StorageManager.toggleTheme();AuthUI.renderSettingsDropdown();" aria-label="Cambiar tema" title="Alternar entre modo claro y oscuro">
          <span class="theme-switch-thumb">
            <span class="theme-toggle-icon" id="settings-theme-icon">${theme === 'light' ? '☀️' : '🌙'}</span>
          </span>
        </button>
      </div>

      <!-- Conexión a Supabase (Base de Datos) -->
      <div class="settings-menu-item" onclick="AuthUI.openConfigModal();AuthUI.closeSettingsDropdown();">
        <span class="settings-item-icon">⚡</span>
        <span class="settings-item-text">Conexión Supabase</span>
        <span class="settings-item-arrow">›</span>
      </div>

      ${(isStudent || !user) ? `
        <div class="settings-menu-item" onclick="if(typeof openResetModal==='function')openResetModal();else if(confirm('¿Deseas reiniciar tu progreso local?')){StorageManager.resetAll();location.reload();}AuthUI.closeSettingsDropdown();">
          <span class="settings-item-icon">↺</span>
          <span class="settings-item-text">Reiniciar Progreso</span>
          <span class="settings-item-arrow">›</span>
        </div>
      ` : ''}

      ${logoutHtml}
    `;
  },

  // ---------------------------------------------------------------------------
  // Lógica de Modales y Pestañas
  // ---------------------------------------------------------------------------
  openAuthModal(tab = 'login') {
    this.switchTab(tab);
    this.hideAlert();
    const modal = document.getElementById('lms-auth-modal');
    if (modal) modal.style.display = 'flex';
  },

  closeAuthModal() {
    const modal = document.getElementById('lms-auth-modal');
    if (modal) modal.style.display = 'none';
  },

  switchTab(tab) {
    this.activeTab = tab;
    this.hideAlert();
    const isLogin = tab === 'login';

    document.getElementById('tab-btn-login')?.classList.toggle('active', isLogin);
    document.getElementById('tab-btn-register')?.classList.toggle('active', !isLogin);
    document.getElementById('lms-form-login').style.display = isLogin ? 'block' : 'none';
    document.getElementById('lms-form-register').style.display = isLogin ? 'none' : 'block';
  },

  selectRole(role) {
    this.selectedRole = role;
    document.getElementById('role-card-estudiante')?.classList.toggle('active', role === 'estudiante');
    document.getElementById('role-card-profesor')?.classList.toggle('active', role === 'profesor');
  },

  openCreateClassModal() {
    const modal = document.getElementById('lms-create-class-modal');
    if (modal) {
      document.getElementById('class-name').value = '';
      document.getElementById('lms-create-class-alert').style.display = 'none';
      modal.style.display = 'flex';
    }
  },

  closeCreateClassModal() {
    const modal = document.getElementById('lms-create-class-modal');
    if (modal) modal.style.display = 'none';
  },

  openJoinClassModal() {
    const modal = document.getElementById('lms-join-class-modal');
    if (modal) {
      document.getElementById('join-code').value = '';
      document.getElementById('lms-join-class-alert').style.display = 'none';
      modal.style.display = 'flex';
    }
  },

  closeJoinClassModal() {
    const modal = document.getElementById('lms-join-class-modal');
    if (modal) modal.style.display = 'none';
  },

  openCreateAssignmentModal(claseId) {
    const modal = document.getElementById('lms-create-assignment-modal');
    if (modal) {
      document.getElementById('asg-clase-id').value = claseId || window.selectedClassId || '';
      document.getElementById('asg-title').value = '';
      document.getElementById('asg-desc').value = '';
      document.getElementById('asg-points').value = '100';
      document.getElementById('asg-deadline').value = '';
      document.getElementById('lms-create-assignment-alert').style.display = 'none';
      modal.style.display = 'flex';
    }
  },

  closeCreateAssignmentModal() {
    const modal = document.getElementById('lms-create-assignment-modal');
    if (modal) modal.style.display = 'none';
  },

  openSubmitAssignmentModal({ asgId, claseId, title, desc, maxPoints, currentContent = '' }) {
    const modal = document.getElementById('lms-submit-assignment-modal');
    if (modal) {
      document.getElementById('submit-asg-id').value = asgId || '';
      document.getElementById('submit-clase-id').value = claseId || '';
      document.getElementById('modal-submit-asg-title').textContent = `📝 ${title || 'Responder Asignación'}`;
      document.getElementById('modal-submit-asg-subtitle').textContent = `Puntaje máximo: ${maxPoints || 100} pts`;
      document.getElementById('modal-submit-instructions-box').innerHTML = `
        <div style="font-weight:700;color:var(--text-main);margin-bottom:4px;">Instrucciones:</div>
        <div>${(desc || '').replace(/\n/g, '<br>')}</div>
      `;
      document.getElementById('submit-asg-content').value = currentContent || '';
      document.getElementById('lms-submit-asg-alert').style.display = 'none';
      modal.style.display = 'flex';
    }
  },

  closeSubmitAssignmentModal() {
    const modal = document.getElementById('lms-submit-assignment-modal');
    if (modal) modal.style.display = 'none';
  },

  openGradeSubmissionModal({ submissionId, studentName, content, maxPoints = 100, currentGrade = '', currentFeedback = '' }) {
    const modal = document.getElementById('lms-grade-submission-modal');
    if (modal) {
      document.getElementById('grade-submission-id').value = submissionId;
      document.getElementById('grade-modal-student-name').textContent = `Alumno: ${studentName || 'Estudiante'}`;
      document.getElementById('grade-modal-submission-content').textContent = content || '(Sin respuesta enviada)';
      document.getElementById('grade-max-points').textContent = `/ ${maxPoints}`;
      document.getElementById('grade-score').value = (currentGrade !== null && currentGrade !== undefined) ? currentGrade : '';
      document.getElementById('grade-score').max = maxPoints;
      document.getElementById('grade-feedback').value = currentFeedback || '';
      document.getElementById('lms-grade-asg-alert').style.display = 'none';
      modal.style.display = 'flex';
    }
  },

  closeGradeSubmissionModal() {
    const modal = document.getElementById('lms-grade-submission-modal');
    if (modal) modal.style.display = 'none';
  },

  openFeedbackModal({ title, score, maxPoints = 100, feedback, date, content }) {
    const modal = document.getElementById('lms-view-feedback-modal');
    if (modal) {
      document.getElementById('feedback-modal-title').textContent = `💬 ${title || 'Retroalimentación'}`;
      document.getElementById('feedback-modal-date').textContent = date ? `Calificado el ${new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : 'Reciente';
      document.getElementById('feedback-modal-score-pill').textContent = `${score} / ${maxPoints}`;
      document.getElementById('feedback-modal-text').textContent = feedback || 'Sin comentarios adicionales por el profesor.';
      document.getElementById('feedback-modal-original-text').textContent = content || '(Sin texto)';
      modal.style.display = 'flex';
    }
  },

  closeFeedbackModal() {
    const modal = document.getElementById('lms-view-feedback-modal');
    if (modal) modal.style.display = 'none';
  },

  openConfigModal() {
    const modal = document.getElementById('lms-config-modal');
    if (modal && window.SupabaseConfig) {
      document.getElementById('cfg-url').value = window.SupabaseConfig.getUrl().includes('TU_PROYECTO') ? '' : window.SupabaseConfig.getUrl();
      document.getElementById('cfg-key').value = window.SupabaseConfig.getAnonKey().includes('TU_SUPABASE_ANON_KEY') ? '' : window.SupabaseConfig.getAnonKey();
      modal.style.display = 'flex';
    }
  },

  closeConfigModal() {
    const modal = document.getElementById('lms-config-modal');
    if (modal) modal.style.display = 'none';
  },

  showAlert(msg, type = 'error') {
    const alert = document.getElementById('lms-auth-alert');
    if (!alert) return;
    alert.className = `lms-alert ${type}`;
    alert.innerHTML = msg;
    alert.style.display = 'block';
  },

  hideAlert() {
    const alert = document.getElementById('lms-auth-alert');
    if (alert) alert.style.display = 'none';
  },

  // ---------------------------------------------------------------------------
  // Métodos de Acceso Rápido con Cuentas de Prueba (Demo)
  // ---------------------------------------------------------------------------
  async loginAsDemoTeacher() {
    if (!window.AuthService) return;
    this.showAlert("👨‍🏫 Iniciando como Profesor de Prueba (Prof. Carlos Mendoza)...", 'success');
    await window.AuthService.loginAsDemo('profesor');
    setTimeout(() => {
      this.closeAuthModal();
      this.updateNavbar();
      if (typeof window.onLMSAuthChanged === 'function') window.onLMSAuthChanged();
    }, 450);
  },

  async loginAsDemoStudent() {
    if (!window.AuthService) return;
    this.showAlert("🎓 Iniciando como Estudiante de Prueba (Ana Morales)...", 'success');
    await window.AuthService.loginAsDemo('estudiante');
    setTimeout(() => {
      this.closeAuthModal();
      this.updateNavbar();
      if (typeof window.onLMSAuthChanged === 'function') window.onLMSAuthChanged();
    }, 450);
  },

  // ---------------------------------------------------------------------------
  // Handlers de Envío de Formularios
  // ---------------------------------------------------------------------------
  async handleLogin(e) {
    e.preventDefault();
    if (!window.AuthService) return;

    const email = (document.getElementById('login-email').value || '').trim();
    const pass = document.getElementById('login-password').value;
    const btn = document.getElementById('btn-submit-login');

    const isDemo = (email.toLowerCase() === 'profesor@demo.com' || email.toLowerCase() === 'estudiante@demo.com');

    if (!isDemo && !window.SupabaseConfig.isConfigured()) {
      this.showAlert("⚠️ Configura primero las credenciales de Supabase usando el enlace inferior, o usa los botones de Cuentas Demo.", 'warning');
      return;
    }

    try {
      btn.disabled = true;
      btn.textContent = 'Ingresando...';
      await window.AuthService.signIn({ email, password: pass });
      this.showAlert("¡Bienvenido! Iniciando sesión...", 'success');
      setTimeout(() => {
        this.closeAuthModal();
        btn.disabled = false;
        btn.textContent = 'Entrar al Curso';
        this.updateNavbar();
        if (typeof window.renderDashboard === 'function') window.renderDashboard();
        if (typeof window.onLMSAuthChanged === 'function') window.onLMSAuthChanged();
      }, 600);
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Entrar al Curso';
      this.showAlert(err.message || 'Error al iniciar sesión. Revisa tu correo y contraseña.', 'error');
    }
  },

  async handleRegister(e) {
    e.preventDefault();
    if (!window.AuthService) return;

    if (!window.SupabaseConfig.isConfigured()) {
      this.showAlert("⚠️ Configura primero las credenciales de Supabase usando el enlace inferior.", 'warning');
      return;
    }

    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;
    const role = this.selectedRole;
    const btn = document.getElementById('btn-submit-register');

    try {
      btn.disabled = true;
      btn.textContent = 'Registrando...';
      await window.AuthService.signUp({ email, password: pass, nombre, role });
      this.showAlert("¡Cuenta creada exitosamente! Iniciando sesión...", 'success');
      setTimeout(() => {
        this.closeAuthModal();
        btn.disabled = false;
        btn.textContent = 'Registrarme Ahora';
        if (typeof window.renderDashboard === 'function') window.renderDashboard();
      }, 900);
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Registrarme Ahora';
      this.showAlert(err.message || 'Error al registrar la cuenta. Inténtalo con otro correo.', 'error');
    }
  },

  async handleLogout() {
    if (confirm("¿Deseas cerrar tu sesión actual?")) {
      if (window.AuthService) {
        await window.AuthService.signOut();
      }
      this.updateNavbar();
      if (typeof window.renderDashboard === 'function') window.renderDashboard();
    }
  },

  async handleCreateClass(e) {
    e.preventDefault();
    const name = document.getElementById('class-name').value;
    const level = document.getElementById('class-level')?.value || 'principiante';
    const alert = document.getElementById('lms-create-class-alert');
    const btn = document.getElementById('btn-submit-create-class');

    try {
      btn.disabled = true;
      btn.textContent = 'Creando...';
      const created = await window.ClassService.createClass(name, level);
      alert.className = 'lms-alert success';
      alert.innerHTML = `¡Clase <strong>"${created.nombre}"</strong> creada con éxito!<br>Código para tus alumnos: <strong style="font-size:16px;">${created.codigo_unico}</strong>`;
      alert.style.display = 'block';

      setTimeout(() => {
        this.closeCreateClassModal();
        btn.disabled = false;
        btn.textContent = 'Crear Clase';
        if (typeof window.loadTeacherDashboard === 'function') {
          window.loadTeacherDashboard();
        }
      }, 1500);
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Crear Clase';
      alert.className = 'lms-alert error';
      alert.innerHTML = err.message || 'Error al crear la clase.';
      alert.style.display = 'block';
    }
  },

  async handleJoinClass(e) {
    e.preventDefault();
    const code = document.getElementById('join-code').value;
    const alert = document.getElementById('lms-join-class-alert');
    const btn = document.getElementById('btn-submit-join-class');

    try {
      btn.disabled = true;
      btn.textContent = 'Verificando...';
      const result = await window.ClassService.joinClassByCode(code);
      alert.className = 'lms-alert success';
      if (result.alreadyEnrolled) {
        alert.innerHTML = `Ya perteneces a la clase <strong>${result.claseNombre}</strong> con el profesor <strong>${result.profesorNombre}</strong>.`;
      } else {
        alert.innerHTML = `¡Te has unido con éxito a <strong>${result.claseNombre}</strong> con el profesor <strong>${result.profesorNombre}</strong>!`;
      }
      alert.style.display = 'block';

      setTimeout(() => {
        this.closeJoinClassModal();
        btn.disabled = false;
        btn.textContent = 'Unirme a la Clase';
        if (typeof window.loadStudentDashboard === 'function') {
          window.loadStudentDashboard();
        }
      }, 1500);
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Unirme a la Clase';
      alert.className = 'lms-alert error';
      alert.innerHTML = err.message || 'Código de clase inválido.';
      alert.style.display = 'block';
    }
  },

  async handleCreateAssignment(e) {
    e.preventDefault();
    const claseId = document.getElementById('asg-clase-id').value;
    const title = document.getElementById('asg-title').value;
    const desc = document.getElementById('asg-desc').value;
    const points = document.getElementById('asg-points').value;
    const deadline = document.getElementById('asg-deadline').value;
    const alertEl = document.getElementById('lms-create-assignment-alert');
    const btn = document.getElementById('btn-submit-create-asg');

    try {
      btn.disabled = true;
      btn.textContent = 'Publicando...';
      await window.AssignmentService.createAssignment({
        claseId,
        titulo: title,
        descripcion: desc,
        puntosMax: points,
        fechaLimite: deadline || null
      });

      alertEl.className = 'lms-alert success';
      alertEl.innerHTML = `¡Asignación <strong>"${title}"</strong> publicada exitosamente!`;
      alertEl.style.display = 'block';

      setTimeout(() => {
        this.closeCreateAssignmentModal();
        btn.disabled = false;
        btn.textContent = 'Publicar Asignación';
        if (typeof window.loadClassAssignments === 'function') {
          window.loadClassAssignments(claseId || window.selectedClassId);
        }
        if (typeof window.loadClassGradebook === 'function') {
          window.loadClassGradebook(claseId || window.selectedClassId);
        }
      }, 1000);
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Publicar Asignación';
      alertEl.className = 'lms-alert error';
      alertEl.innerHTML = err.message || 'Error al crear la asignación.';
      alertEl.style.display = 'block';
    }
  },

  async handleSubmitAssignment(e) {
    e.preventDefault();
    const asgId = document.getElementById('submit-asg-id').value;
    const claseId = document.getElementById('submit-clase-id').value;
    const content = document.getElementById('submit-asg-content').value;
    const alertEl = document.getElementById('lms-submit-asg-alert');
    const btn = document.getElementById('btn-submit-student-asg');

    try {
      btn.disabled = true;
      btn.textContent = 'Enviando...';
      await window.AssignmentService.submitAssignment({
        asignacionId: asgId,
        claseId,
        contenido: content
      });

      alertEl.className = 'lms-alert success';
      alertEl.innerHTML = `¡Tu asignación ha sido enviada con éxito! Tu profesor la revisará pronto.`;
      alertEl.style.display = 'block';

      setTimeout(() => {
        this.closeSubmitAssignmentModal();
        btn.disabled = false;
        btn.textContent = '🚀 Enviar Asignación';
        if (typeof window.loadStudentAssignments === 'function') {
          window.loadStudentAssignments();
        }
        if (typeof window.loadStudentGrades === 'function') {
          window.loadStudentGrades();
        }
      }, 1000);
    } catch (err) {
      btn.disabled = false;
      btn.textContent = '🚀 Enviar Asignación';
      alertEl.className = 'lms-alert error';
      alertEl.innerHTML = err.message || 'Error al enviar la asignación.';
      alertEl.style.display = 'block';
    }
  },

  async handleGradeSubmission(e) {
    e.preventDefault();
    const subId = document.getElementById('grade-submission-id').value;
    const score = document.getElementById('grade-score').value;
    const feedback = document.getElementById('grade-feedback').value;
    const alertEl = document.getElementById('lms-grade-asg-alert');
    const btn = document.getElementById('btn-submit-grade');

    try {
      btn.disabled = true;
      btn.textContent = 'Guardando...';
      await window.AssignmentService.gradeSubmission({
        entregaId: subId,
        calificacion: score,
        retroalimentacion: feedback
      });

      alertEl.className = 'lms-alert success';
      alertEl.innerHTML = `¡Calificación de <strong>${score} pts</strong> guardada con éxito!`;
      alertEl.style.display = 'block';

      setTimeout(() => {
        this.closeGradeSubmissionModal();
        btn.disabled = false;
        btn.textContent = 'Guardar Calificación';
        const activeClassId = window.selectedClassId;
        if (typeof window.loadClassAssignments === 'function') {
          window.loadClassAssignments(activeClassId);
        }
        if (typeof window.loadClassGradebook === 'function') {
          window.loadClassGradebook(activeClassId);
        }
      }, 900);
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Guardar Calificación';
      alertEl.className = 'lms-alert error';
      alertEl.innerHTML = err.message || 'Error al guardar la calificación.';
      alertEl.style.display = 'block';
    }
  },

  handleSaveConfig(e) {
    e.preventDefault();
    const url = document.getElementById('cfg-url').value;
    const key = document.getElementById('cfg-key').value;
    if (window.SupabaseConfig) {
      window.SupabaseConfig.setCustomCredentials(url, key);
    }
  },

  handleResetConfig() {
    if (confirm("¿Restablecer credenciales de Supabase a los valores por defecto?")) {
      if (window.SupabaseConfig) {
        window.SupabaseConfig.resetCredentials();
      }
    }
  },

  setupEventListeners() {
    // Cerrar modal al hacer clic en el backdrop
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('lms-modal-backdrop')) {
        e.target.style.display = 'none';
      }

      // Cerrar dropdown de configuración al hacer clic fuera
      const dropdown = document.getElementById('settings-dropdown');
      const btn = document.getElementById('open-settings-btn');
      const userPill = document.querySelector('.lms-user-pill');
      if (dropdown && dropdown.classList.contains('open')) {
        if (!dropdown.contains(e.target) && (!btn || !btn.contains(e.target)) && (!userPill || !userPill.contains(e.target))) {
          dropdown.classList.remove('open');
        }
      }
    });

    // Cerrar con Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lms-modal-backdrop').forEach(m => m.style.display = 'none');
        const dropdown = document.getElementById('settings-dropdown');
        if (dropdown) dropdown.classList.remove('open');
      }
    });
  },

  // ---------------------------------------------------------------------------
  // Estilos CSS Integrados para Modales y Componentes LMS
  // ---------------------------------------------------------------------------
  injectStyles() {
    if (document.getElementById('lms-styles')) return;

    const style = document.createElement('style');
    style.id = 'lms-styles';
    style.textContent = `
      .lms-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .lms-modal-dialog {
        background: var(--bg-surface, #ffffff);
        border: 1.5px solid var(--border, #e2e8f0);
        border-radius: var(--radius-lg, 16px);
        width: 100%;
        max-width: 480px;
        padding: 28px;
        box-shadow: var(--shadow-lg, 0 10px 25px rgba(0,0,0,0.15));
        position: relative;
        animation: lmsFadeIn 0.2s ease-out;
        color: var(--text-main, #0f172a);
      }
      @keyframes lmsFadeIn {
        from { opacity: 0; transform: scale(0.97) translateY(-8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .lms-modal-close {
        position: absolute;
        top: 16px;
        right: 18px;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: var(--bg-surface-alt, #f1f5f9);
        border: 1px solid var(--border, #e2e8f0);
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
        color: var(--text-muted, #64748b);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
      }
      .lms-modal-close:hover {
        background: var(--rose-light, #fee2e2);
        color: var(--rose, #e11d48);
        border-color: var(--rose, #e11d48);
        transform: scale(1.05);
      }

      /* ESTILOS DE BOTONES DENTRO DE MODALES (.btn, .btn-primary, .btn-secondary) */
      .lms-modal-dialog .btn,
      .lms-modal-backdrop .btn {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px !important;
        font-family: inherit !important;
        font-size: 13.5px !important;
        font-weight: 700 !important;
        padding: 9px 18px !important;
        border-radius: 9px !important;
        cursor: pointer !important;
        transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
        text-decoration: none !important;
        border: 1.5px solid transparent !important;
        line-height: 1.35 !important;
        box-sizing: border-box !important;
        outline: none !important;
      }

      .lms-modal-dialog .btn-primary,
      .lms-modal-backdrop .btn-primary {
        background: var(--primary, #2563eb) !important;
        color: #ffffff !important;
        border-color: transparent !important;
        box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35) !important;
      }

      .lms-modal-dialog .btn-primary:hover,
      .lms-modal-backdrop .btn-primary:hover {
        background: var(--primary-hover, #1d4ed8) !important;
        transform: translateY(-1.5px) !important;
        box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45) !important;
      }

      .lms-modal-dialog .btn-primary:active,
      .lms-modal-backdrop .btn-primary:active {
        transform: translateY(0) !important;
      }

      .lms-modal-dialog .btn-secondary,
      .lms-modal-backdrop .btn-secondary {
        background: var(--bg-surface-alt, #f1f5f9) !important;
        border-color: var(--border-strong, #cbd5e1) !important;
        color: var(--text-main, #0f172a) !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
      }

      .lms-modal-dialog .btn-secondary:hover,
      .lms-modal-backdrop .btn-secondary:hover {
        background: var(--bg-surface-hover, #e2e8f0) !important;
        border-color: var(--primary, #2563eb) !important;
        color: var(--primary, #2563eb) !important;
        transform: translateY(-1px) !important;
      }

      .lms-modal-dialog .btn-secondary:active,
      .lms-modal-backdrop .btn-secondary:active {
        transform: translateY(0) !important;
      }

      .lms-modal-dialog .btn:disabled,
      .lms-modal-backdrop .btn:disabled {
        opacity: 0.6 !important;
        cursor: not-allowed !important;
        transform: none !important;
        box-shadow: none !important;
      }

      /* Modo Oscuro para Modales y Botones */
      [data-theme="dark"] .lms-modal-dialog {
        background: var(--bg-surface, #0f172a);
        border-color: var(--border, #1e293b);
        color: var(--text-main, #f8fafc);
      }
      [data-theme="dark"] .lms-modal-close {
        background: #1e293b;
        border-color: #334155;
        color: #94a3b8;
      }
      [data-theme="dark"] .lms-modal-close:hover {
        background: rgba(225, 29, 72, 0.2);
        color: #fb7185;
        border-color: #fb7185;
      }
      [data-theme="dark"] .lms-modal-dialog .btn-secondary,
      [data-theme="dark"] .lms-modal-backdrop .btn-secondary {
        background: #1e293b !important;
        border-color: #334155 !important;
        color: #f1f5f9 !important;
      }
      [data-theme="dark"] .lms-modal-dialog .btn-secondary:hover,
      [data-theme="dark"] .lms-modal-backdrop .btn-secondary:hover {
        background: #334155 !important;
        border-color: #60a5fa !important;
        color: #60a5fa !important;
      }
      .lms-auth-header {
        text-align: center;
        margin-bottom: 20px;
      }
      .lms-auth-brand {
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.3px;
        color: var(--text-main, #0f172a);
      }
      .lms-auth-subtitle {
        font-size: 13.5px;
        color: var(--text-secondary, #475569);
        margin-top: 4px;
      }
      .lms-tabs-nav {
        display: flex;
        gap: 8px;
        background: var(--bg-surface-alt, #f1f5f9);
        padding: 4px;
        border-radius: var(--radius-md, 12px);
        margin-bottom: 18px;
      }
      .lms-tab-btn {
        flex: 1;
        background: none;
        border: none;
        padding: 8px 12px;
        font-size: 13.5px;
        font-weight: 700;
        color: var(--text-secondary, #475569);
        border-radius: var(--radius-sm, 8px);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .lms-tab-btn.active {
        background: var(--bg-surface, #ffffff);
        color: var(--primary, #2563eb);
        box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
      }
      .lms-form-group {
        margin-bottom: 14px;
      }
      .lms-form-group label {
        display: block;
        font-size: 12.5px;
        font-weight: 700;
        color: var(--text-main, #0f172a);
        margin-bottom: 6px;
      }
      .lms-input {
        width: 100%;
        padding: 10px 14px;
        background: var(--bg-surface, #ffffff);
        border: 1.5px solid var(--border, #e2e8f0);
        border-radius: var(--radius-sm, 8px);
        color: var(--text-main, #0f172a);
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.15s, box-shadow 0.15s;
      }
      .lms-input:focus {
        border-color: var(--primary, #2563eb);
        box-shadow: 0 0 0 3px var(--primary-glow, rgba(37,99,235,0.15));
      }
      .lms-role-selector {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 4px;
      }
      .lms-role-card {
        border: 2px solid var(--border, #e2e8f0);
        background: var(--bg-surface-alt, #f1f5f9);
        border-radius: var(--radius-md, 12px);
        padding: 12px 10px;
        cursor: pointer;
        transition: all 0.15s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 6px;
      }
      .lms-role-card:hover {
        border-color: var(--border-strong, #cbd5e1);
      }
      .lms-role-card.active {
        border-color: var(--primary, #2563eb);
        background: var(--primary-light, #eff6ff);
      }
      .role-icon {
        font-size: 26px;
      }
      .role-title {
        font-size: 13px;
        font-weight: 800;
        color: var(--text-main, #0f172a);
      }
      .role-desc {
        font-size: 11px;
        color: var(--text-muted, #64748b);
        line-height: 1.35;
      }
      .lms-btn-submit {
        width: 100%;
        margin-top: 6px;
        padding: 11px;
        font-size: 14px;
        font-weight: 700;
        border-radius: var(--radius-sm, 8px);
      }
      .lms-modal-footer {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid var(--border, #e2e8f0);
        display: flex;
        justify-content: center;
      }
      .lms-link-btn {
        background: none;
        border: none;
        font-size: 12px;
        color: var(--text-muted, #64748b);
        cursor: pointer;
        text-decoration: underline;
      }
      .lms-link-btn:hover {
        color: var(--primary, #2563eb);
      }
      .lms-alert {
        padding: 10px 14px;
        border-radius: var(--radius-sm, 8px);
        font-size: 13px;
        margin-bottom: 14px;
        line-height: 1.4;
      }
      .lms-alert.error {
        background: var(--rose-light, #fff1f2);
        border: 1px solid var(--rose, #e11d48);
        color: var(--rose, #e11d48);
      }
      .lms-alert.success {
        background: var(--emerald-light, #ecfdf5);
        border: 1px solid var(--emerald, #059669);
        color: var(--emerald, #059669);
      }
      .lms-alert.warning {
        background: var(--amber-light, #fffbeb);
        border: 1px solid var(--amber, #d97706);
        color: var(--amber, #d97706);
      }
      /* Navbar User Pill */
      .lms-user-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--bg-surface-alt, #f1f5f9);
        border: 1.5px solid var(--border, #e2e8f0);
        padding: 5px 12px 5px 8px;
        border-radius: 20px;
        font-size: 12.5px;
        cursor: pointer;
        transition: all 0.18s ease;
        user-select: none;
      }
      .lms-user-pill:hover {
        border-color: var(--primary, #2563eb);
        background: var(--bg-surface-hover, #e2e8f0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      .lms-role-tag {
        font-size: 11px;
        font-weight: 800;
        padding: 2px 7px;
        border-radius: 12px;
      }
      .badge-teacher {
        background: var(--indigo-light, #eef2ff);
        color: var(--indigo, #4f46e5);
      }
      .badge-student {
        background: var(--emerald-light, #ecfdf5);
        color: var(--emerald, #059669);
      }
      .lms-user-name {
        font-weight: 700;
        max-width: 130px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
    document.head.appendChild(style);
  }
};

if (typeof window !== 'undefined') {
  window.AuthUI = AuthUI;
  document.addEventListener('DOMContentLoaded', () => AuthUI.init());
}

