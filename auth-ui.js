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
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
              💡 El sistema generará automáticamente un código único (ej. <strong>ING-8X2F</strong>) que podrás compartir con tus estudiantes.
            </p>
            <div style="display:flex;gap:10px;justify-content:flex-end;">
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
            <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">
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

    if (!container) return;

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

      let extraAction = '';
      if (isTeacher) {
        extraAction = `
          <button class="lms-nav-chip-btn" onclick="AuthUI.openCreateClassModal()" title="Crear nueva clase">
            ➕ Crear Clase
          </button>
        `;
      } else {
        extraAction = `
          <button class="lms-nav-chip-btn" onclick="AuthUI.openJoinClassModal()" title="Unirse a una clase con código">
            🎒 Unirse a Clase
          </button>
        `;
      }

      container.innerHTML = `
        <div class="lms-user-pill">
          <span class="lms-role-tag ${roleClass}">${roleLabel}</span>
          <span class="lms-user-name" title="${user.email}">${user.nombre}</span>
          ${extraAction}
          <button class="lms-logout-btn" onclick="AuthUI.handleLogout()" title="Cerrar sesión">
            🚪
          </button>
        </div>
      `;
    }
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
    const alert = document.getElementById('lms-create-class-alert');
    const btn = document.getElementById('btn-submit-create-class');

    try {
      btn.disabled = true;
      btn.textContent = 'Creando...';
      const created = await window.ClassService.createClass(name);
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
    });

    // Cerrar con Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lms-modal-backdrop').forEach(m => m.style.display = 'none');
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
        border: 1px solid var(--border, #e2e8f0);
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
        background: none;
        border: none;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        color: var(--text-muted, #64748b);
        transition: color 0.15s;
      }
      .lms-modal-close:hover {
        color: var(--text-main, #0f172a);
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
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 13px;
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
        max-width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lms-nav-chip-btn {
        background: var(--bg-surface, #ffffff);
        border: 1px solid var(--border, #e2e8f0);
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
        color: var(--primary, #2563eb);
        transition: all 0.15s ease;
      }
      .lms-nav-chip-btn:hover {
        background: var(--primary-light, #eff6ff);
      }
      .lms-logout-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        padding: 0 2px;
      }
    `;
    document.head.appendChild(style);
  }
};

if (typeof window !== 'undefined') {
  window.AuthUI = AuthUI;
  document.addEventListener('DOMContentLoaded', () => AuthUI.init());
}

