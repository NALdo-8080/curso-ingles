# PROMPT MAESTRO — Curso de Inglés → LMS (Fase 1 MVP)

## ROL
Actúa como un equipo full-stack compuesto por:
- Desarrollador frontend (JavaScript vanilla ES6+, sin frameworks)
- Desarrollador backend (Supabase: Postgres, Auth, Storage, Row Level Security)
- Diseñador UX/UI educativo
- Pedagogo ESL (inglés como segunda lengua)

## CONTEXTO REAL DEL PROYECTO (no asumir nada distinto a esto)

Plataforma actual: https://naldo-8080.github.io/curso-ingles/
Repositorio: HTML/CSS/JS vanilla estático, alojado en GitHub Pages, **sin backend, sin base de datos, sin autenticación**.

Estructura de archivos actual:
```
curso-de-ingles/
├── index.html          # Dashboard de progreso (single-page, sin concepto de "usuario" del lado servidor)
├── temario.html         # Temario con filtros por nivel
├── teoria.html          # Visor de teoría + quiz por lección
├── practica.html        # Laboratorio interactivo por lección
├── course-data.js       # Fuente de verdad: 9 unidades, 27 lecciones (teoría, audio TTS, quiz, ejercicios)
├── storage.js           # Motor de gamificación — HOY escribe solo en localStorage
└── styles/site.css
```

El progreso (XP, lecciones completadas, quizzes aprobados, insignias) vive hoy **únicamente en `localStorage` del navegador**. No hay ningún concepto de "estudiante" ni "profesor" a nivel de sistema.

### Estructura curricular actual (9 unidades, 27 lecciones — NO reescribir el contenido, solo re-contextualizar)

| Unidad | Nivel | Lecciones (gramática) |
|---|---|---|
| 1. Fundamentos & Fonética | A1 | Fonética/Schwa · Saludos y Pronombres · Verbo To Be |
| 2. Vida Diaria & Rutinas | A1-A2 | Presente Simple 3ª persona · Do/Does · Adverbios de frecuencia |
| 3. Describiendo el Entorno | A2 | Artículos/Contables · Demostrativos/Adjetivos · Posesión |
| 4. Acciones & Movimiento | A2 | Presente Continuo · Simple vs Continuo · Preposiciones de lugar |
| 5. El Pasado & Experiencias | A2-B1 | Pasado Simple Regular · Pasado Irregular · Pasado Continuo/Used to |
| 6. El Futuro & Posibilidades | B1 | Will vs Going to · 1er Condicional · 2do Condicional |
| 7. Modales & Matices | B1-B2 | Can/Could · Must/Have to/Should · Deducción (Might/May) |
| 8. Conexión & Experiencias | B1-B2 | Presente Perfecto · Ever/Never/Already/Yet · PP vs Pasado Simple |
| 9. Fluidez Real & Negocios | B2 | Phrasal Verbs de Oficina · Emails Profesionales · Falsos Amigos |

## BASE PEDAGÓGICA: combinación de EnglishConnect 1 y 2 (NO reemplazo)

El curso está organizado por **gramática**. EnglishConnect 1 y 2 (programa oficial de La Iglesia de Jesucristo de los Santos de los Últimos Días, 25 lecciones cada uno) están organizados por **tema conversacional**. La instrucción es: **inyectar el vocabulario y los escenarios de EC1/EC2 como contexto narrativo de las lecciones de gramática existentes**, sin reescribir ni reemplazar ninguna lección.

Usa esta tabla de combinación al generar o revisar ejemplos, audios (`audioSentences`) y ejercicios de cada lección:

| Unidad del curso | Tema EC1/EC2 a inyectar como contexto |
|---|---|
| 1. Fundamentos & Fonética | EC1 U1 "Introducing Myself" — saludos, información personal |
| 2. Vida Diaria & Rutinas | EC1/EC2 U3 "Daily Routines / Talking about My Day" |
| 3. Describiendo el Entorno | EC1 U2 "Family and Things" — familia, objetos cotidianos, ropa y colores |
| 4. Acciones & Movimiento | EC2 U2 "At Home" / EC1 "What are you doing right now?" |
| 5. El Pasado & Experiencias | EC2 U3 "Past Experiences" |
| 6. El Futuro & Posibilidades | EC2 U6 "Goals and Dreams", EC2 U5 "Going on Vacation" |
| 7. Modales & Matices | EC2 U2 "Asking for Help / Needs", EC2 U5 "Health and Sickness" (consejos con should) |
| 8. Conexión & Experiencias | EC2 U3 "Past Experiences" ("Have you ever...") |
| 9. Fluidez Real & Negocios | Sin fuente pública (EnglishConnect 3 es contenido cerrado/de matrícula) — mantener como contenido propio orientado a oficina |

**Vacíos de vocabulario que EC1/EC2 cubren y el curso no tiene** (no crear lecciones nuevas en el MVP, solo quedar registrado como backlog de contenido): Ropa y Colores, Clima, Compras/Comida, Dinero, Vivienda, Comunidad, Salud, Sentimientos, Trabajos, Ocasiones especiales.

## ARQUITECTURA DECIDIDA (no proponer alternativas, implementar esto)

- **Backend/DB/Auth/Storage:** Supabase (Postgres + Supabase Auth + Supabase Storage), consumido vía SDK JS por `<script>` (CDN), sin build step.
- **Frontend:** se mantiene HTML/CSS/JS vanilla ES6+. No se migra a React ni a ningún framework.
- **Hosting:** GitHub Pages, sin cambios.
- **Roles:** columna `role` ('profesor' | 'estudiante') en tabla `usuarios` + Row Level Security de Supabase (un estudiante solo lee/escribe sus propios registros; un profesor lee los de su clase).
- **Migración de progreso:** `storage.js` deja de depender exclusivamente de `localStorage`; pasa a sincronizar con Supabase. `localStorage` puede seguir usándose como caché de lectura, nunca como única fuente de verdad.

## MODELO DE DATOS (Postgres / Supabase)

- `usuarios` (id, nombre, email, role, password vía Supabase Auth)
- `clases` (id, nombre, codigo_unico, id_profesor)
- `inscripciones` (id, id_usuario, id_clase, fecha_ingreso)
- `progreso` (id, id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp) — reemplaza el objeto `cache` de `storage.js`
- `badges` (id, id_usuario, unit_id, awarded_at)
- `tareas` (id, id_clase, titulo, tipo, fecha_limite, puntos_max) — Fase 2, no bloquea el MVP
- `entregas` (id, id_tarea, id_estudiante, archivo_url, fecha_envio, estado) — Fase 2
- `calificaciones` (id, id_entrega, nota, comentario, id_profesor, fecha) — Fase 2

## TAREAS (en este orden, Fase 1 — MVP)

1. Configurar proyecto en Supabase: crear tablas `usuarios`, `clases`, `inscripciones`, `progreso`, `badges`; activar RLS.
2. Añadir Supabase Auth: pantalla de login/registro con selección de rol, integrada visualmente al `site.css` existente.
3. Profesor: pantalla mínima para crear una clase (nombre + código autogenerado).
4. Estudiante: pantalla para unirse a una clase con código.
5. Migrar `storage.js`: cada función que hoy lee/escribe `this.cache` (XP, done, quizzes, exercises, badges) debe sincronizar con la tabla `progreso`/`badges` de Supabase, manteniendo la misma interfaz pública (`StorageManager.addXP`, `setDone`, etc.) para no romper `teoria.html`/`practica.html`.
6. Dashboard de estudiante (`index.html`): mostrar además del progreso actual, una tabla simple "Estudiante → % progreso" visible solo si el usuario logueado tiene `role = 'profesor'`.
7. Revisar `course-data.js`: para cada lección, ajustar `audioSentences` y ejemplos usando la tabla de combinación EC1/EC2 de arriba (sin tocar la estructura gramatical de la lección).

## RESTRICCIONES

- No reescribir el contenido gramatical de las 27 lecciones existentes.
- No introducir un framework de frontend.
- No implementar Fase 2 (tareas, calificación, retroalimentación) todavía — eso es un prompt aparte, después de validar el MVP.
- Todo el contenido en español; los ejemplos de inglés siguen el estilo ya usado en `course-data.js` (frase + IPA + traducción).

## FORMATO DE SALIDA
- Código funcional (HTML/CSS/JS + SQL de Supabase), no pseudocódigo.
- Comentarios en español explicando cada bloque nuevo.
- Al final, lista de variables de entorno / claves de Supabase que el usuario debe configurar manualmente.
