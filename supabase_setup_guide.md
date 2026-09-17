# Guía de Configuración: Supabase LMS (Fase 1 MVP)

Esta guía explica paso a paso cómo conectar tu plataforma de inglés con **Supabase** para habilitar autenticación de usuarios, roles de estudiante y profesor, creación de clases y sincronización del progreso en la nube.

---

## 1. Crear el Proyecto en Supabase

1. Ingresa a [https://supabase.com](https://supabase.com) e inicia sesión (o crea una cuenta gratuita).
2. Haz clic en **"New Project"**.
3. Completa los datos:
   - **Name:** `curso-ingles-lms` (o el nombre que prefieras).
   - **Database Password:** Elige una contraseña segura y guárdala.
   - **Region:** Selecciona la región geográfica más cercana a tus usuarios (ej. *East US* o *São Paulo*).
4. Haz clic en **"Create new project"** y espera 1-2 minutos a que termine el aprovisionamiento.

---

## 2. Ejecutar el Script de Base de Datos y Seguridad (SQL)

1. En el panel lateral izquierdo de tu proyecto en Supabase, entra en **SQL Editor**.
2. Haz clic en **"New query"**.
3. Abre el archivo [`supabase_schema.sql`](supabase_schema.sql) de este repositorio, copia todo su contenido y pégalo en el editor de Supabase.
4. Haz clic en el botón verde **"Run"** (o presiona `Ctrl + Enter`).
5. Verás el mensaje `Success. No rows returned`. Con esto se han creado:
   - Tablas: `usuarios`, `clases`, `inscripciones`, `progreso`, `badges`.
   - Índices de alto rendimiento.
   - Trigger automático para sincronizar nuevos usuarios de Auth hacia `public.usuarios`.
   - Políticas de seguridad **Row Level Security (RLS)** para aislar los datos entre profesores y estudiantes.
   - Función optimizada `get_class_students_summary` para el panel del profesor.

---

## 3. Obtener tus Credenciales de API

1. En el menú lateral izquierdo de Supabase, ve a **Project Settings** (el icono de engranaje ⚙️ abajo a la izquierda).
2. Haz clic en la pestaña **API** (bajo la sección *Configuration*).
3. Localiza dos valores:
   - **Project URL:** Algo similar a `https://xyzcompany.supabase.co`.
   - **Project API Keys -> `anon` / `public`:** Una clave larga que comienza con `eyJhbGciOi...`.

---

## 4. Configurar las Credenciales en la Plataforma

Tienes dos alternativas sencillas:

### Opción A: Directamente desde el navegador (Recomendada para pruebas y GitHub Pages)
1. Abre tu plataforma en el navegador (`index.html`).
2. En la barra de navegación, haz clic en **"👤 Iniciar Sesión"**.
3. En la parte inferior del modal, haz clic en **"⚙️ Configurar claves de Supabase"**.
4. Pega tu **Project URL** y tu **Anon Key**, y haz clic en **"Guardar Credenciales"**.
5. La página se recargará automáticamente y estará conectada a tu base de datos en Supabase.

### Opción B: En el archivo `supabase-client.js` (Para producción definitiva)
Abre [`supabase-client.js`](supabase-client.js) y reemplaza las líneas 12 y 13:
```javascript
const DEFAULT_SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "TU_SUPABASE_ANON_KEY";
```

---

## 5. Probar el Flujo Completo (Profesor y Estudiante)

### Paso 1: Registrar una cuenta de Profesor
1. Haz clic en **"👤 Iniciar Sesión"** -> pestaña **"Crear Cuenta"**.
2. Ingresa tu nombre (ej. *Prof. Roberto Silva*), correo y contraseña.
3. En el selector de rol, haz clic en **"👨‍🏫 Soy Profesor"**.
4. Haz clic en **"Registrarme Ahora"**.
5. En la barra superior verás tu badge `👨‍🏫 Profesor`.
6. En el dashboard verás el botón **"➕ Nueva Clase"**. Crea una clase (ej. *Inglés A1 - Grupo 1*).
7. El sistema te asignará un código único (ej. `ING-7A9B`). Haz clic en **"📋 Copiar"**.

### Paso 2: Registrar una cuenta de Estudiante
1. Cierra sesión con el botón 🚪 en la barra superior (o abre una ventana de incógnito).
2. Haz clic en **"👤 Iniciar Sesión"** -> **"Crear Cuenta"**.
3. Ingresa tu nombre (ej. *María Gómez*), correo y contraseña.
4. Selecciona **"🎓 Soy Estudiante"** y haz clic en **"Registrarme Ahora"**.
5. Haz clic en **"🎒 Unirse a Clase"**, pega el código de clase (ej. `ING-7A9B`) y pulsa **"Unirme a la Clase"**.
6. Ahora entra a la **Lección 1** en Teoría (`teoria.html?lesson=1`), aprueba el Quiz (+50 XP) y completa el Laboratorio (+100 XP).

### Paso 3: Verificar el Panel del Profesor
1. Vuelve a iniciar sesión como el Profesor.
2. En `index.html`, baja hasta la sección **"Panel del Profesor — Mis Clases y Alumnos"**.
3. Verás a la estudiante *María Gómez* en la tabla con sus métricas en vivo:
   - **Lecciones Hechas:** 1 / 27
   - **Quizzes:** 1 / 27
   - **Laboratorios:** 1 / 27
   - **XP Acumulado:** 150 XP
   - **% Avance Global:** 3.7% con barra de progreso visual.

---

## 6. Backlog de Contenido Pedagógico (Temas EnglishConnect 1 y 2 para Fase 2)

Durante la Fase 1 se mantuvieron intactas las 27 lecciones gramaticales, inyectando el vocabulario y contexto situacional de EC1 y EC2 en los ejemplos y audios (`audioSentences`).

Los siguientes campos temáticos cubiertos por EnglishConnect quedan registrados como **backlog prioritario de contenido conversacional** para futuras expansiones del curso:

1. **Ropa y Colores:** Prendas por estación, descripción física de ropa formal vs casual.
2. **Clima y Estaciones:** Pronóstico del tiempo, temperaturas, ropa adecuada.
3. **Compras y Alimentos:** Pedir en un restaurante, compras en el supermercado, precios y cantidades.
4. **Dinero y Finanzas Personales:** Métodos de pago, cambio, transacciones bancarias básicas.
5. **Vivienda y Hogar:** Tipos de vivienda, partes de la casa, electrodomésticos y reparaciones.
6. **Comunidad y Direcciones:** Lugares del vecindario, pedir y dar indicaciones para llegar a un lugar.
7. **Salud y Bienestar:** Citas médicas, síntomas y partes del cuerpo humano, recetas de farmacia.
8. **Sentimientos y Emociones:** Expresar estados de ánimo, empatía y relaciones interpersonales.
9. **Trabajos y Empleo:** Ocupaciones, búsqueda de empleo, entrevistas de trabajo básicas.
10. **Ocasiones Especiales y Fiestas:** Cumpleaños, aniversarios, invitaciones y celebraciones culturales.

