# 🇬🇧 Curso de Inglés: De Cero a Fluidez (English Track)

Plataforma educativa web interactiva para aprender inglés estructurada en 9 unidades temáticas y 27 lecciones completas (desde nivel A1 Principiante hasta B2 Intermedio Alto).

🌐 **Demo en vivo:** [https://naldo-8080.github.io/curso-ingles/](https://naldo-8080.github.io/curso-ingles/)

---

## ✨ Características Principales

- 📚 **Temario Integral (27 Lecciones)**: Explicaciones directas y claras sin rodeos teóricos, con puntos clave (*takeaways*) y ejemplos prácticos.
- 🗣️ **Fonética y Pronunciación Nativa (TTS con IPA)**: Reproducción de audio con acento nativo y transcripción fonética internacional para entrenar el oído y el ritmo del idioma.
- ⚡ **Laboratorios Prácticos Interactivos**: Actividades de ordenamiento de oraciones, detección de errores gramaticales (*error spotter*), completado de espacios y clasificación fonética con validación instantánea.
- 🏆 **Gamificación y Logros**: Sistema de acumulación de puntos de experiencia (XP), progreso persistente en `localStorage` e insignias coleccionables por unidad completada.
- 📱 **Diseño 100% Responsivo**: Ergonomía optimizada para celulares y pantallas táctiles, con acordeones compactos y pestañas móviles.
- 🌓 **Modo Claro / Modo Oscuro**: Conmutador de tema de alto contraste con persistencia automática de preferencia.

---

## 📂 Estructura del Proyecto

```text
curso-de-ingles/
├── index.html          # Portal principal y dashboard de progreso del alumno
├── temario.html        # Temario completo interactivo con buscador y filtros por nivel
├── teoria.html         # Visor de lecciones teóricas, fonética y quizzes conceptuales
├── practica.html       # Estudio interactivo de resolución de laboratorios (+100 XP)
├── course-data.js      # Fuente de verdad curricular (9 unidades, 27 lecciones y ejercicios)
├── storage.js          # Motor de gamificación, guardado en localStorage y síntesis de voz (TTS)
└── styles/
    └── site.css        # Sistema de estilos globales, variables CSS y diseño adaptativo
```

---

## 🛠️ Tecnologías

- **HTML5 semántico**
- **CSS3 moderno** (Variables CSS, Flexbox, Grid y Media Queries)
- **JavaScript ES6+** puro (Vanilla JS, sin dependencias externas ni compilación)
- **Web Speech API** (Síntesis de voz nativa en inglés)
- **LocalStorage API** (Persistencia local del progreso)

---

## 🚀 Despliegue en GitHub Pages

Este repositorio está configurado para publicarse de forma estática directamente desde la rama principal (`main`) a través de **GitHub Pages**.
