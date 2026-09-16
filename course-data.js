/**
 * course-data.js - Fuente de verdad del currículo de Inglés
 * 9 Unidades Temáticas, 27 Lecciones con Teoría, Ejemplos de Audio TTS, Takeaways, Quizzes y Laboratorios Interactivos.
 */

const UNITS = [
  {
    unitId: 1,
    title: "Unidad 1: Fundamentos & Fonética",
    level: "A1 Principiante",
    badge: {
      id: "badge_phonetics",
      icon: "🎖️",
      name: "Phonetics Pioneer",
      desc: "Dominaste la fonética básica, saludos y el verbo To Be."
    },
    externalPractice: {
      provider: "BBC Learning English & YouGlish",
      badge: "Fonética & Pronunciación",
      title: "Entrena tu Oído con Pronunciación Nativa y Sonidos Reales",
      url: "https://youglish.com/pronounce/english/english",
      description: "Escucha a miles de hablantes nativos pronunciar el sonido Schwa /ə/ y las combinaciones 'th' en fragmentos reales de videos de YouTube.",
      tasks: [
        "Busca palabras como 'about', 'banana' y 'computer' en YouGlish para aislar el sonido schwa /ə/.",
        "Compara la pronunciación de 'thank you' (sorda) vs 'this' (sonora).",
        "Grábate imitando el ritmo y entonación de oraciones cotidianas."
      ],
      recommendedMetric: "Identificar la sílaba acentuada y relajada en 10 palabras nuevas."
    },
    lessons: [
      {
        n: 1,
        title: "Fonética Básica, Alfabeto y Sonido Schwa /ə/",
        unit: 1,
        level: "A1",
        p1: "El inglés no es un idioma fonético: a diferencia del español, las letras escritas no siempre suenan igual. De hecho, el inglés cuenta con más de 20 sonidos vocálicos distintos a pesar de tener solo 5 letras vocales escritas. El sonido más frecuente e importante de todo el idioma inglés es el **Schwa (/ə/)**: un sonido vocal neutro, relajado y perezoso que aparece casi siempre en las sílabas no acentuadas (como la primera 'a' en *about* o la 'e' en *the*).",
        p2: "Otro reto crítico para hispanohablantes es la combinación **'th'**, que tiene dos sonidos: el sordo (como en *think* o *three*, poniendo la lengua entre los dientes y soltando solo aire) y el sonoro (como en *this* o *brother*, haciendo vibrar las cuerdas vocales). Si dominas el Schwa y la 'th' desde hoy, tu acento y comprensión auditiva mejorarán un 300%.",
        audioSentences: [
          { en: "Think about the future.", ipa: "/θɪŋk əˈbaʊt ðə ˈfjuːtʃər/", es: "Piensa sobre el futuro." },
          { en: "This is my brother.", ipa: "/ðɪs ɪz maɪ ˈbrʌðər/", es: "Este es mi hermano." },
          { en: "A cup of coffee, please.", ipa: "/ə kʌp əv ˈkɒfi pliːz/", es: "Una taza de café, por favor." }
        ,
          { en: "The weather is very pleasant today.", ipa: "/ðə ˈwɛðər ɪz ˈvɛri ˈplɛznt təˈdeɪ/", es: "El clima está muy agradable hoy." },
          { en: "Thank you for your valuable advice.", ipa: "/θæŋk juː fər jɔːr ˈvæljuəbl ədˈvaɪs/", es: "Gracias por tu valioso consejo." }
        ],
        takeaways: [
          "El inglés no se lee como se escribe: las vocales cambian según la acentuación de la palabra.",
          "El sonido Schwa /ə/ es el más común del inglés; suena como un murmullo relajado en sílabas sin acento.",
          "La combinación 'th' tiene dos variantes: sorda (aire puro: 'think') y sonora (vibración: 'that')."
        ],
        instructions: [
          "Observa las 4 palabras en el área de trabajo.",
          "Clasifica cada palabra según el sonido inicial de 'th': sordo (aire /θ/) o sonoro (vibrante /ð/).",
          "Haz clic en 'Validar y Enviar' para confirmar tu comprensión fonética."
        ],
        hint: "Coloca tus dedos en la garganta: si al pronunciar 'th' sientes vibración, es sonoro (/ð/ como en *that*); si solo sale aire frío, es sordo (/θ/ como en *thanks*).",
        quiz: {
          q: "¿Cuál es el sonido vocálico más común en el idioma inglés y en qué sílabas se encuentra?",
          opts: [
            "La vocal 'A' larga (/eɪ/), en las sílabas con acento fuerte.",
            "El sonido Schwa (/ə/), en las sílabas no acentuadas y relajadas.",
            "La vocal 'I' cerrada (/iː/), al final de las oraciones interrogativas.",
            "La doble vocal 'OO' (/uː/), únicamente en monosílabos."
          ],
          correct: 1,
          fb: "¡Correcto! El Schwa (/ə/) es el sonido comodín y más abundante del inglés, apareciendo casi siempre en sílabas débiles y no acentuadas."
        },
        exercise: {
          audioText: "Thanks. Together. Thursday. Mother.",
          type: "classification_bins",
          title: "Discriminación Fonética: 'TH' Sorda (/θ/) vs Sonora (/ð/)",
          categories: [
            { id: "sordo", title: "TH Sorda /θ/ (Solo aire, ej. Think)" },
            { id: "sonoro", title: "TH Sonora /ð/ (Con vibración, ej. This)" }
          ],
          items: [
            { id: "w1", text: "Thanks (Gracias)", target: "sordo" },
            { id: "w2", text: "Together (Juntos)", target: "sonoro" },
            { id: "w3", text: "Thursday (Jueves)", target: "sordo" },
            { id: "w4", text: "Mother (Madre)", target: "sonoro" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Asigna las 4 palabras a sus contenedores antes de evaluar." };
            const errors = keys.filter(k => {
              const it = [{id:"w1",target:"sordo"},{id:"w2",target:"sonoro"},{id:"w3",target:"sordo"},{id:"w4",target:"sonoro"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Excelente oído fonético! Has diferenciado con precisión la 'th' sorda de la sonora." };
            return { pass: false, msg: `Hay ${errors.length} asignaciones erróneas. Recuerda: Thanks y Thursday usan solo aire (/θ/), mientras que Together y Mother vibran (/ð/).` };
          }
        }
      },
      {
        n: 2,
        title: "Saludos, Presentaciones y Pronombres Personales",
        unit: 1,
        level: "A1",
        p1: "Para romper el hielo en cualquier contexto angloparlante necesitas dominar los pronombres personales de sujeto: **I** (yo, ¡siempre en mayúscula!), **You** (tú / usted / ustedes), **He** (él), **She** (ella), **It** (objeto, animal o concepto neutro), **We** (nosotros) y **They** (ellos/ellas). En inglés, el sujeto casi NUNCA se omite; mientras en español decimos 'Llueve', en inglés es obligatorio decir '*It rains*'.",
        p2: "Al saludar, la formalidad importa: *'Good morning / afternoon / evening'* es ideal para el trabajo o desconocidos, mientras que *'Hi'*, *'Hey'*, *'What's up?'* o *'How's it going?'* son informales. Para responder a *'How are you?'*, los nativos suelen decir *'I'm doing well, thank you'*, *'Pretty good'* o *'Not bad'*, devolviendo la cortesía con un *'And you?'*.",
        audioSentences: [
          { en: "Hello, nice to meet you. I'm Carlos.", ipa: "/həˈloʊ naɪs tuː miːt juː aɪm ˈkɑːrloʊs/", es: "Hola, encantado de conocerte. Soy Carlos." },
          { en: "How is it going? - Pretty good, thanks!", ipa: "/haʊ ɪz ɪt ˈɡoʊɪŋ - ˈprɪti ɡʊd θæŋks/", es: "¿Cómo te va? - ¡Bastante bien, gracias!" },
          { en: "She is a software engineer.", ipa: "/ʃiː ɪz ə ˈsɔːftwer ˌendʒɪˈnɪr/", es: "Ella es ingeniera de software." }
        ,
          { en: "Good morning! How are you doing today?", ipa: "/ɡʊd ˈmɔːrnɪŋ haʊ ɑːr juː ˈduːɪŋ təˈdeɪ/", es: "¡Buenos días! ¿Cómo estás hoy?" },
          { en: "They are our new colleagues from Canada.", ipa: "/ðeɪ ɑːr ˈaʊər nuː ˈkɒliːɡz frəm ˈkænədə/", es: "Ellos son nuestros nuevos colegas de Canadá." }
        ],
        takeaways: [
          "El pronombre 'I' (yo) siempre se escribe en mayúscula sin importar dónde esté en la frase.",
          "El sujeto es obligatorio en inglés; nunca se omite como en español.",
          "Para saludar con naturalidad, usa 'How's it going?' y responde 'Pretty good, thanks!'."
        ],
        instructions: [
          "Arrastra o haz clic en las fichas para ordenar la oración de presentación.",
          "La frase debe significar en inglés: 'Hola, un placer conocerte también.'",
          "Haz clic en 'Validar y Enviar' para verificar tu saludo."
        ],
        hint: "Estructura típica de cortesía: Saludo inicial ('Hello'), coma, 'nice to meet you' y cierra con 'too' (también).",
        quiz: {
          q: "¿Por qué en inglés es incorrecto decir simplemente 'Is raining' para referirse a la lluvia?",
          opts: [
            "Porque falta el signo de exclamación al final.",
            "Porque en inglés el sujeto casi nunca se omite y se requiere el pronombre neutro 'It' (*It is raining*).",
            "Porque el verbo 'raining' solo se usa en tiempo pasado.",
            "Porque 'raining' requiere el pronombre 'He' o 'She'."
          ],
          correct: 1,
          fb: "¡Exacto! El inglés no tiene sujetos tácitos en este tipo de oraciones; siempre requiere 'It' como sujeto impersonal (*It is raining*)."
        },
        exercise: {
          audioText: "Hello, nice to meet you too.",
          type: "sequence_sort",
          title: "Constructor de Oraciones: Presentación Formal",
          items: [
            { id: "w1", text: "Hello," },
            { id: "w2", text: "nice" },
            { id: "w3", text: "to" },
            { id: "w4", text: "meet" },
            { id: "w5", text: "you" },
            { id: "w6", text: "too." }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Perfecto! 'Hello, nice to meet you too.' suena natural, educado e impecable." };
            }
            return { pass: false, msg: "El orden sintáctico no es el correcto. Recuerda la fórmula: Hello, nice to meet you too." };
          }
        }
      },
      {
        n: 3,
        title: "El Verbo 'To Be' y Contracciones Cotidianas",
        unit: 1,
        level: "A1",
        p1: "El verbo **To Be** es el pilar de la lengua inglesa y traduce tanto a **ser** como a **estar**. Sus tres formas del presente son: **am** (para I), **is** (para he, she, it) y **are** (para you, we, they). Un error común de hispanohablantes es decir *'I have 25 years'* para la edad; en inglés la edad se considera un estado del ser: *'I AM 25 years old'*.",
        p2: "En el día a día y en películas, los nativos casi NUNCA dicen *'I am'* o *'They are'*; usan contracciones: **I'm**, **You're**, **He's**, **She's**, **It's**, **We're**, **They're**. Para negar, contraemos el verbo con *not*: **isn't** (*is not*) y **aren't** (*are not*). Y para hacer preguntas, invertimos el orden: *'Are you ready?'* en lugar de *'You are ready?'*.",
        audioSentences: [
          { en: "I'm 28 years old and I'm from Mexico.", ipa: "/aɪm ˈtwenti eɪt jɪərz oʊld ænd aɪm frəm ˈmɛksɪkoʊ/", es: "Tengo 28 años y soy de México." },
          { en: "They aren't ready yet.", ipa: "/ðeɪ ɑːrnt ˈrɛdi jɛt/", es: "Ellos no están listos todavía." },
          { en: "Are you ready for the meeting?", ipa: "/ɑːr juː ˈrɛdi fər ðə ˈmiːtɪŋ/", es: "¿Estás listo para la reunión?" }
        ,
          { en: "We are extremely excited about the project.", ipa: "/wiː ɑːr ɪkˈstriːmli ɪkˈsaɪtɪd əˈbaʊt ðə ˈprɒdʒɛkt/", es: "Estamos sumamente entusiasmados con el proyecto." },
          { en: "Is she at home or is she still at work?", ipa: "/ɪz ʃiː æt hoʊm ɔːr ɪz ʃiː stɪl æt wɜːrk/", es: "¿Está ella en casa o todavía está en el trabajo?" }
        ],
        takeaways: [
          "To Be cubre tanto 'ser' como 'estar': el contexto define el significado exacto.",
          "La edad en inglés se dice con To Be: 'I am 20 years old', nunca con 'have'.",
          "Para preguntar, invierte el orden: verbo auxiliar primero, luego el sujeto ('Are you...?')."
        ],
        instructions: [
          "Selecciona la opción correcta en cada espacio para completar las 3 frases con To Be.",
          "Presta atención al sujeto de cada cláusula y si se trata de afirmación o negación.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "I va con am ('m), He/She/It va con is ('s), We/You/They van con are ('re).",
        quiz: {
          q: "¿Cuál de las siguientes oraciones expresa de manera gramaticalmente correcta la edad y el origen en inglés?",
          opts: [
            "I have 30 years and have from Colombia.",
            "I am 30 years old and I'm from Colombia.",
            "I are 30 years old and I is from Colombia.",
            "I am have 30 years and I am of Colombia."
          ],
          correct: 1,
          fb: "¡Exacto! En inglés la edad se expresa siempre con el verbo 'to be' ('I am 30 years old') y el origen con la preposición 'from' ('I'm from Colombia')."
        },
        exercise: {
          audioText: "Carlos and Maria are at the office, but John isn't here. I am on my way.",
          type: "fill_blanks",
          title: "Laboratorio de To Be: Contracciones y Sujetos",
          sentence: "Carlos and Maria ___ (be) at the office, but John ___ (not / be) here. I ___ (be) on my way.",
          blanks: [
            { id: "b1", placeholder: "Carlos and Maria...", options: ["am", "is", "are"], answer: "are" },
            { id: "b2", placeholder: "John...", options: ["isn't", "aren't", "not is"], answer: "isn't" },
            { id: "b3", placeholder: "I...", options: ["am", "is", "are"], answer: "am" }
          ],
          evaluator: (state) => {
            const b1 = state.b1;
            const b2 = state.b2;
            const b3 = state.b3;
            if (!b1 || !b2 || !b3) return { pass: false, msg: "Por favor responde a los 3 espacios en blanco antes de validar." };
            if (b1 === "are" && b2 === "isn't" && b3 === "am") {
              return { pass: true, msg: "¡Impecable! 'Carlos and Maria are...', 'John isn't...', 'I am on my way.' Dominio total de las conjugaciones de To Be." };
            }
            return { pass: false, msg: "Uno o más espacios son incorrectos. Recuerda: Carlos y Maria = They (are); John = He (isn't); I = am." };
          }
        }
      }
    ]
  },
  {
    unitId: 2,
    title: "Unidad 2: Vida Diaria & Rutinas",
    level: "A1-A2 Principiante Superior",
    badge: {
      id: "badge_routines",
      icon: "⏰",
      name: "Daily Life Navigator",
      desc: "Expresas hábitos, horarios y frecuencias con Presente Simple con fluidez."
    },
    externalPractice: {
      provider: "British Council LearnEnglish",
      badge: "Gramática en Contexto",
      title: "Práctica de Rutinas y Frecuencias",
      url: "https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-simple",
      description: "Ejercicios interactivos guiados con audios reales sobre rutinas de profesionales de todo el mundo.",
      tasks: [
        "Completa 5 historias cortas sobre rutinas diarias de profesionales en Londres.",
        "Revisa la regla de ortografía para verbos terminados en -ch, -sh, -o, -x (watches, goes, fixes).",
        "Escribe en tu cuaderno una lista de 5 cosas que haces 'always' y 2 que haces 'never'."
      ],
      recommendedMetric: "90% de aciertos en ejercicios de 3ra persona singular (-s/-es)."
    },
    lessons: [
      {
        n: 4,
        title: "Presente Simple: Afirmaciones y la Regla de la 3ª Persona (-s/-es)",
        unit: 2,
        level: "A1-A2",
        p1: "El **Present Simple** se usa para describir hábitos, rutinas diarias, verdades científicas y hechos permanentes: *'I live in Madrid'*, *'Water boils at 100°C'*. Para los pronombres I, You, We y They, el verbo se queda en su forma base (*I work*, *we study*). ¡Sencillísimo!",
        p2: "La trampa principal está en la **tercera persona singular (He, She, It)**: el verbo DEBE llevar una **-s** o **-es** al final (*He works*, *She teaches*, *It takes time*). Si el verbo termina en -ch, -sh, -ss, -x, u -o, agregamos **-es** (*watches, washes, goes*). Si termina en consonante + 'y', cambiamos por **-ies** (*studies, flies*).",
        audioSentences: [
          { en: "She drinks coffee every morning.", ipa: "/ʃiː drɪŋks ˈkɔːfi ˈɛvri ˈmɔːrnɪŋ/", es: "Ella bebe café todas las mañanas." },
          { en: "He studies computer science at university.", ipa: "/hiː ˈstʌdiz kəmˈpjuːtər ˈsaɪəns æt ˌjuːnɪˈvɜːrsɪti/", es: "Él estudia informática en la universidad." },
          { en: "They live in a beautiful apartment.", ipa: "/ðeɪ lɪv ɪn ə ˈbjuːtɪfl əˈpɑːrtmənt/", es: "Ellos viven en un departamento hermoso." }
        ,
          { en: "He studies English grammar every afternoon.", ipa: "/hiː ˈstʌdiz ˈɪŋɡlɪʃ ˈɡræmər ˈɛvri ˌæftərˈnuːn/", es: "Él estudia gramática inglesa todas las tardes." },
          { en: "Do they take the train to downtown?", ipa: "/duː ðeɪ teɪk ðə treɪn tuː ˈdaʊntaʊn/", es: "¿Toman ellos el tren hacia el centro?" }
        ],
        takeaways: [
          "Usa Presente Simple para hechos permanentes, hábitos y rutinas.",
          "Con He, She, It, SIEMPRE añade -s, -es o -ies al verbo en oraciones afirmativas.",
          "Con I, You, We, They, el verbo se mantiene en su forma infinitiva sin 'to'."
        ],
        instructions: [
          "Lee el texto sobre la rutina de Sarah.",
          "Corrige y asigna la terminación adecuada a los verbos según el sujeto.",
          "Envía tu respuesta para verificar la concordancia gramatical."
        ],
        hint: "Sarah es 'She', por lo que todos sus verbos de acción en presente afirmativo necesitan -s o -es.",
        quiz: {
          q: "¿Cuál de las siguientes oraciones aplica correctamente la regla de la 3ª persona singular?",
          opts: [
            "My sister watch TV and play video games after dinner.",
            "My sister watches TV and plays video games after dinner.",
            "My sister watchs TV and playies video games after dinner.",
            "My sister is watch TV and playing video games after dinner."
          ],
          correct: 1,
          fb: "¡Exacto! 'Watch' termina en -ch, por lo que añade -es ('watches'), y 'play' termina en vocal+y, por lo que solo añade -s ('plays')."
        },
        exercise: {
          audioText: "My manager approves the budget. Software developers write clean code. The smartphone costs 500 dollars. You and I work together.",
          type: "classification_bins",
          title: "Auditoría de Verbos: ¿Forma Base o Terminación de 3ª Persona?",
          categories: [
            { id: "base", title: "Sujetos Plurales / I / You (Forma Base)" },
            { id: "third", title: "He / She / It (Requiere -s / -es)" }
          ],
          items: [
            { id: "v1", text: "My manager (approve / approves) the budget", target: "third" },
            { id: "v2", text: "Software developers (write / writes) clean code", target: "base" },
            { id: "v3", text: "The smartphone (cost / costs) 500 dollars", target: "third" },
            { id: "v4", text: "You and I (work / works) together", target: "base" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica las 4 oraciones antes de validar." };
            const errors = keys.filter(k => {
              const it = [{id:"v1",target:"third"},{id:"v2",target:"base"},{id:"v3",target:"third"},{id:"v4",target:"base"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Brillante! Has identificado con precisión cuándo el sujeto requiere la regla de la tercera persona singular." };
            return { pass: false, msg: `Hay ${errors.length} errores. Nota: 'My manager' es He/She (third); 'Developers' y 'You and I' son plurales (base).` };
          }
        }
      },
      {
        n: 5,
        title: "Preguntas con 'Do / Does' y Respuestas Cortas",
        unit: 2,
        level: "A1-A2",
        p1: "En español para hacer una pregunta solo cambiamos el tono de voz ('¿Tú hablas inglés?'). En inglés eso es un error grave: **necesitamos un verbo auxiliar**. En Presente Simple ese auxiliar es **DO** (para I, you, we, they) o **DOES** (para he, she, it). La fórmula sagrada es: **Auxiliar + Sujeto + Verbo Base** (*'Do you speak English?'*).",
        p2: "¡Cuidado con la trampa maestra! Cuando usamos **Does** en una pregunta o **doesn't** en una negación, el auxiliar ya 'absorbió' la tercera persona, por lo que el verbo principal vuelve a su **forma base sin -s**: *'Does she live here?'* (NUNCA *'Does she lives here?'*). Para responder de forma natural usamos respuestas cortas: *'Yes, I do'*, *'No, he doesn't'*.",
        audioSentences: [
          { en: "Do you have any questions?", ipa: "/duː juː hæv ˈɛni ˈkwɛstʃənz/", es: "¿Tienes alguna pregunta?" },
          { en: "Does he work from home on Fridays?", ipa: "/dʌz hiː wɜːrk frəm hoʊm ɑːn ˈfraɪdeɪz/", es: "¿Él trabaja desde casa los viernes?" },
          { en: "No, she doesn't like spicy food.", ipa: "/noʊ ʃiː ˈdʌznt laɪk ˈspaɪsi fuːd/", es: "No, a ella no le gusta la comida picante." }
        ,
          { en: "There is some fresh orange juice in the fridge.", ipa: "/ðɛr ɪz sʌm frɛʃ ˈɔːrɪndʒ dʒuːs ɪn ðə frɪdʒ/", es: "Hay algo de jugo de naranja fresco en el refrigerador." },
          { en: "We bought an umbrella and two notebooks.", ipa: "/wiː bɔːt æn ʌmˈbrɛlə ænd tuː ˈnoʊtbʊks/", es: "Compramos un paraguas y dos cuadernos." }
        ],
        takeaways: [
          "Toda pregunta en presente simple requiere el auxiliar 'Do' o 'Does' al principio.",
          "Cuando 'Does' o 'Doesn't' están presentes, el verbo principal pierde la -s y queda en forma base.",
          "Responde con respuestas cortas naturales: 'Yes, I do' / 'No, she doesn't', no solo con un seco 'Yes' o 'No'."
        ],
        instructions: [
          "Ordena las palabras para formar una pregunta gramaticalmente perfecta sobre rutinas de trabajo.",
          "La pregunta debe significar: '¿Tu equipo realiza reuniones diarias?'",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Aplica la regla de oro: Auxiliar (Does) + Sujeto (your team) + Verbo base (have) + Complemento.",
        quiz: {
          q: "¿Cuál de las siguientes preguntas en Presente Simple es gramaticalmente correcta?",
          opts: [
            "Does your brother plays the guitar?",
            "Do your brother play the guitar?",
            "Does your brother play the guitar?",
            "Is your brother play the guitar?"
          ],
          correct: 2,
          fb: "¡Exacto! 'Your brother' es 3ª persona singular (requiere 'Does'), y como 'Does' ya hace el trabajo, el verbo 'play' va en su forma base sin -s."
        },
        exercise: {
          audioText: "Does your team have daily meetings?",
          type: "sequence_sort",
          title: "Constructor de Preguntas con Auxiliar",
          items: [
            { id: "w1", text: "Does" },
            { id: "w2", text: "your" },
            { id: "w3", text: "team" },
            { id: "w4", text: "have" },
            { id: "w5", text: "daily" },
            { id: "w6", text: "meetings?" }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Excelente! 'Does your team have daily meetings?' respeta estrictamente Auxiliar + Sujeto + Verbo Base." };
            }
            return { pass: false, msg: "Orden incorrecto. Sigue la fórmula: Auxiliar (Does) + Sujeto (your team) + Verbo (have) + Complemento (daily meetings?)." };
          }
        }
      },
      {
        n: 6,
        title: "Adverbios de Frecuencia y Expresiones de Tiempo (At, On, In)",
        unit: 2,
        level: "A1-A2",
        p1: "Para decir con qué regularidad haces algo usamos los **adverbios de frecuencia**: *always* (100%), *usually* (80%), *often* (60%), *sometimes* (50%), *rarely / hardly ever* (10%), *never* (0%). La regla de ubicación es clave: van **ANTES del verbo principal** (*'I always drink water'*), pero **DESPUÉS del verbo To Be** (*'She is always punctual'*).",
        p2: "Para las horas, fechas y momentos del día, las preposiciones de tiempo siguen la regla de la pirámide: **AT** para horas precisas (*at 7:00 PM, at midnight, at noon*); **ON** para días y fechas específicas (*on Monday, on July 4th, on the weekend* en US); e **IN** para periodos largos o partes del día (*in the morning, in 2026, in December, in summer*).",
        audioSentences: [
          { en: "I usually wake up at seven o'clock.", ipa: "/aɪ ˈjuːʒuəli weɪk ʌp æt ˈsɛvn əˈklɑːk/", es: "Normalmente me despierto a las siete en punto." },
          { en: "The project launch is in October on a Tuesday.", ipa: "/ðə ˈprɑːdʒɛkt lɔːntʃ ɪz ɪn ɑːkˈtoʊbər ɑːn ə ˈtuːzdeɪ/", es: "El lanzamiento del proyecto es en octubre en un martes." },
          { en: "He is never late for his presentations.", ipa: "/hiː ɪz ˈnɛvər leɪt fər hɪz ˌprɛznˈteɪʃənz/", es: "Él nunca llega tarde a sus presentaciones." }
        ,
          { en: "I hardly ever drink soda during the week.", ipa: "/aɪ ˈhɑːrdli ˈɛvər drɪŋk ˈsoʊdə ˈdjʊərɪŋ ðə wiːk/", es: "Casi nunca bebo refrescos entre semana." },
          { en: "They always arrive right on time for class.", ipa: "/ðeɪ ˈɔːlweɪz əˈraɪv raɪt ɒn taɪm fər klæs/", es: "Ellos siempre llegan justo a tiempo a clase." }
        ],
        takeaways: [
          "Adverbio de frecuencia: ANTES de verbos normales ('I never smoke'), pero DESPUÉS de To Be ('I am never late').",
          "Preposiciones de tiempo: AT para horas, ON para días y fechas, IN para meses, años y partes del día.",
          "Con 'night' se usa 'at night' (excepción a 'in the morning/afternoon/evening')."
        ],
        instructions: [
          "Completa las 3 oraciones con la preposición de tiempo adecuada (at, on, in).",
          "Considera si la frase habla de una hora exacta, un día específico o un mes.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Horas precisas = AT. Días de la semana = ON. Meses o años = IN.",
        quiz: {
          q: "¿Cuál es la posición correcta del adverbio de frecuencia en una oración con el verbo 'to be'?",
          opts: [
            "Siempre al principio de la oración antes del sujeto.",
            "Inmediatamente después del verbo 'to be' (ej. *He is always happy*).",
            "Siempre al final de la oración después del complemento.",
            "Entre el sujeto y el verbo 'to be' (ej. *He always is happy*)."
          ],
          correct: 1,
          fb: "¡Correcto! Los adverbios de frecuencia van después del verbo 'to be' (*He is always happy*), mientras que con cualquier otro verbo van antes (*He always arrives early*)."
        },
        exercise: {
          audioText: "The global conference starts at 9:30 AM on Monday, and finishes in November.",
          type: "fill_blanks",
          title: "Desafío de Preposiciones de Tiempo: At, On, In",
          sentence: "The global conference starts ___ (at/on/in) 9:30 AM ___ (at/on/in) Monday, and finishes ___ (at/on/in) November.",
          blanks: [
            { id: "b1", placeholder: "Hora...", options: ["at", "on", "in"], answer: "at" },
            { id: "b2", placeholder: "Día...", options: ["at", "on", "in"], answer: "on" },
            { id: "b3", placeholder: "Mes...", options: ["at", "on", "in"], answer: "in" }
          ],
          evaluator: (state) => {
            if (state.b1 === "at" && state.b2 === "on" && state.b3 === "in") {
              return { pass: true, msg: "¡Exacto! 'At 9:30 AM' (hora precisa), 'On Monday' (día), 'In November' (mes). Dominio total de las preposiciones temporales." };
            }
            return { pass: false, msg: "Revisa las respuestas: Horas usan 'at', días de la semana usan 'on', y meses usan 'in'." };
          }
        }
      }
    ]
  },
  {
    unitId: 3,
    title: "Unidad 3: Describiendo el Entorno",
    level: "A2 Elemental",
    badge: {
      id: "badge_describer",
      icon: "🎨",
      name: "World Describer",
      desc: "Describes objetos, cantidades, posesiones y personas con naturalidad."
    },
    externalPractice: {
      provider: "Cambridge English Dictionary & Grammar",
      badge: "Vocabulario & Gramática",
      title: "Dominio de Sustantivos y Artículos",
      url: "https://dictionary.cambridge.org/grammar/british-grammar/nouns-countable-and-uncountable",
      description: "Guía de referencia rápida sobre sustantivos difíciles (advice, information, furniture) que en español son contables pero en inglés no.",
      tasks: [
        "Revisa los 10 sustantivos incontables más tramposos para hispanohablantes.",
        "Aprende cómo cuantificarlos con 'a piece of' (a piece of advice, a piece of information).",
        "Practica 5 descripciones visuales usando demostrativos (this / that / these / those)."
      ],
      recommendedMetric: "Identificar sustantivos incontables con 100% de precisión."
    },
    lessons: [
      {
        n: 7,
        title: "Artículos (A, An, The) y Sustantivos Contables vs Incontables",
        unit: 3,
        level: "A2",
        p1: "El artículo indefinido se usa para cosas singulares inespecíficas: usamos **A** antes de sonidos consonánticos (*a book, a university* - ¡ojo, 'university' empieza con sonido semiconsonante /j/!) y **AN** antes de sonidos vocálicos (*an apple, an honest person* - la 'h' en honest es muda). Por su parte, **THE** es el artículo definido (*el, la, los, las*) y se usa cuando ambos interlocutores saben exactamente de qué objeto se habla.",
        p2: "Los sustantivos se dividen en **Contables** (cosas que puedes contar: *two chairs, three cars*) e **Incontables** (líquidos, materias o conceptos abstractos que no tienen plural: *water, money, advice, information*). En inglés, **NUNCA** se dice *'an advice'* o *'informations'*; para expresar una unidad de un incontable decimos *'a piece of advice'* o *'some information'*.",
        audioSentences: [
          { en: "Could you give me a piece of advice?", ipa: "/kʊd juː ɡɪv miː ə piːs əv ədˈvaɪs/", es: "¿Podrías darme un consejo?" },
          { en: "She has an interview at a European university.", ipa: "/ʃiː hæz ən ˈɪntərvjuː æt ə ˌjʊərəˈpiːən ˌjuːnɪˈvɜːrsɪti/", es: "Ella tiene una entrevista en una universidad europea." },
          { en: "We need more information before making a decision.", ipa: "/wiː niːd mɔːr ˌɪnfərˈmeɪʃn bɪˈfɔːr ˈmeɪkɪŋ ə dɪˈsɪʒn/", es: "Necesitamos más información antes de tomar una decisión." }
        ,
          { en: "Those books over there belong to our teacher.", ipa: "/ðoʊz bʊks ˈoʊvər ðɛr bɪˈlɔːŋ tuː ˈaʊər ˈtiːtʃər/", es: "Esos libros de allá pertenecen a nuestra profesora." },
          { en: "This is my jacket, and that one is yours.", ipa: "/ðɪs ɪz maɪ ˈdʒækɪt ænd ðæt wʌn ɪz jɔːrz/", es: "Esta es mi chaqueta, y aquella es la tuya." }
        ],
        takeaways: [
          "'A' o 'An' dependen del SONIDO que sigue, no de la letra escrita ('an hour', 'a university').",
          "Palabras como 'information', 'advice', 'furniture' y 'money' son estrictamente incontables.",
          "Nunca uses 'a/an' con un sustantivo incontable sin una palabra de medida ('a piece of...')."
        ],
        instructions: [
          "Separa los 4 sustantivos en Contables (pueden pluralizarse y usar a/an) o Incontables (requieren some o a piece of).",
          "Presta atención especial a los falsos amigos frecuentes.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Pregúntate: ¿Puedes decir 'one...', 'two...' de esa cosa en inglés natural? No puedes decir 'two furnitures' ni 'three advices'.",
        quiz: {
          q: "¿Cuál de las siguientes frases es correcta al pedir asesoría en inglés?",
          opts: [
            "I need an advice from you.",
            "I need some advice from you.",
            "I need many advices from you.",
            "I need an useful advice from you."
          ],
          correct: 1,
          fb: "¡Correcto! 'Advice' es un sustantivo incontable; no admite 'an' ni tiene plural ('advices'). Se dice 'some advice' o 'a piece of advice'."
        },
        exercise: {
          audioText: "Luggage. Suitcase. Information. Report.",
          type: "classification_bins",
          title: "Clasificación de Sustantivos: ¿Contable o Incontable?",
          categories: [
            { id: "contable", title: "Contables (Pluralizable con -s, usa A/An)" },
            { id: "incontable", title: "Incontables (Materia/Abstracto, usa Some)" }
          ],
          items: [
            { id: "s1", text: "Luggage (Equipaje)", target: "incontable" },
            { id: "s2", text: "Suitcase (Maleta)", target: "contable" },
            { id: "s3", text: "Information (Información)", target: "incontable" },
            { id: "s4", text: "Report (Informe escrito)", target: "contable" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica los 4 términos antes de enviar." };
            const errors = keys.filter(k => {
              const it = [{id:"s1",target:"incontable"},{id:"s2",target:"contable"},{id:"s3",target:"incontable"},{id:"s4",target:"contable"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Brillante! 'Suitcase' y 'Report' se cuentan (1 suitcase, 2 reports); 'Luggage' e 'Information' son incontables en inglés." };
            return { pass: false, msg: `Hay ${errors.length} errores. Recuerda el contraste: Suitcase (contable) vs Luggage (incontable).` };
          }
        }
      },
      {
        n: 8,
        title: "Demostrativos (This/That/These/Those) y Orden de Adjetivos",
        unit: 3,
        level: "A2",
        p1: "Los demostrativos señalan la distancia física o temporal: **THIS** (esto/este, singular y cerca), **THAT** (eso/aquel, singular y lejos), **THESE** (estos/estas, plural y cerca, con sonido /iːz/) y **THOSE** (esos/aquellos, plural y lejos, con sonido /oʊz/). Fíjate en la pronunciación: en *this* la 'i' es corta y relajada (/ɪ/), mientras que en *these* es larga (/iː/).",
        p2: "En cuanto a los adjetivos, en inglés **siempre van antes del sustantivo** (*'a red car'*, nunca *'a car red'*) y **nunca llevan plural** (*'interesting books'*, jamás *'interestings books'*). Si usas más de un adjetivo, el orden natural nativo sigue la regla **OSASCOMP**: Opinión, Tamaño (Size), Edad (Age), Forma (Shape), Color, Origen, Material y Propósito (*'a lovely big old Italian leather jacket'*).",
        audioSentences: [
          { en: "Look at that beautiful modern building over there.", ipa: "/lʊk æt ðæt ˈbjuːtɪfl ˈmɑːdərn ˈbɪldɪŋ ˈoʊvər ðer/", es: "Mira ese hermoso edificio moderno de allá." },
          { en: "These documents are extremely important.", ipa: "/ðiːz ˈdɑːkjumənts ɑːr ɪkˈstriːmli ɪmˈpɔːrtnt/", es: "Estos documentos son sumamente importantes." },
          { en: "I bought a comfortable black leather chair.", ipa: "/aɪ bɔːt ə ˈkʌmftəbl blæk ˈlɛðər tʃer/", es: "Compré una cómoda silla de cuero negro." }
        ,
          { en: "The concert begins at eight o'clock in July.", ipa: "/ðə ˈkɒnsərt bɪˈɡɪnz æt eɪt əˈklɒk ɪn dʒuːˈlaɪ/", es: "El concierto empieza a las ocho en punto en julio." },
          { en: "My laptop is on the desk in the bedroom.", ipa: "/maɪ ˈlæptɒp ɪz ɒn ðə dɛsk ɪn ðə ˈbɛdruːm/", es: "Mi laptop está sobre el escritorio en la recámara." }
        ],
        takeaways: [
          "Los adjetivos en inglés son invariables: nunca se les agrega 's' para pluralizarlos.",
          "This (singular cerca) vs These (plural cerca); That (singular lejos) vs Those (plural lejos).",
          "Los adjetivos van antes del sustantivo: primero opinión, luego color/material, y al final el objeto."
        ],
        instructions: [
          "Ordena las palabras para formar una frase descriptiva natural con adjetivos múltiples.",
          "La frase debe significar: 'Ella tiene una laptop plateada moderna.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Orden de adjetivos: Artículo + Opinión/Edad (modern) + Color (silver) + Sustantivo (laptop).",
        quiz: {
          q: "¿Cuál de las siguientes frases respeta tanto la invariablez de los adjetivos como su posición correcta?",
          opts: [
            "They bought two expensives houses in Spain.",
            "They bought two houses expensives in Spain.",
            "They bought two expensive houses in Spain.",
            "They bought two expensives house in Spain."
          ],
          correct: 2,
          fb: "¡Exacto! Los adjetivos en inglés nunca tienen forma plural y siempre se colocan antes del sustantivo ('two expensive houses')."
        },
        exercise: {
          audioText: "She bought a modern silver laptop.",
          type: "sequence_sort",
          title: "Constructor Descriptivo: Orden de Adjetivos",
          items: [
            { id: "w1", text: "She" },
            { id: "w2", text: "bought" },
            { id: "w3", text: "a" },
            { id: "w4", text: "modern" },
            { id: "w5", text: "silver" },
            { id: "w6", text: "laptop." }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Excelente! 'She bought a modern silver laptop.' respeta el orden: Edad/Tipo (modern) antes del Color (silver)." };
            }
            return { pass: false, msg: "Revisa el orden sintáctico: Sujeto + Verbo + Artículo + Adjetivo 1 (modern) + Adjetivo 2 (silver) + Sustantivo (laptop)." };
          }
        }
      },
      {
        n: 9,
        title: "Posesión: Genitivo Sajón ('s), 'Have got' vs 'Have' y Posesivos",
        unit: 3,
        level: "A2",
        p1: "En español decimos 'El auto de mi hermano'. En inglés esa estructura suena muy artificial; en su lugar usamos el **Genitivo Sajón ('s)**: colocamos el poseedor primero, seguido de apóstrofe-s y el objeto poseído: **'My brother's car'**. Si el poseedor es un plural regular terminado en 's', solo agregamos el apóstrofe al final: **'My parents' house'**.",
        p2: "Para expresar posesión también usamos los adjetivos posesivos (**my, your, his, her, its, our, their**) y pronombres posesivos (**mine, yours, his, hers, ours, theirs**). Además, en inglés británico es muy común usar **'have got'** (*'I've got a new car'*, negación: *'I haven't got a car'*), mientras que en inglés americano predomina el simple **'have'** (*'I have a new car'*, negación: *'I don't have a car'*). Ambas son 100% correctas.",
        audioSentences: [
          { en: "That is Sarah's laptop, not mine.", ipa: "/ðæt ɪz ˈsɛrəz ˈlæptɑːp nɑːt maɪn/", es: "Esa es la laptop de Sarah, no la mía." },
          { en: "Have you got a minute to talk?", ipa: "/hæv juː ɡɑːt ə ˈmɪnɪt tuː tɔːk/", es: "¿Tienes un minuto para hablar?" },
          { en: "Our company's headquarters are in London.", ipa: "/ˈaʊər ˈkʌmpəniz ˈhɛdkwɔːrtərz ɑːr ɪn ˈlʌndən/", es: "La sede central de nuestra empresa está en Londres." }
        ,
          { en: "How long does it take to get to the airport?", ipa: "/haʊ lɔːŋ dʌz ɪt teɪk tuː ɡɛt tuː ðə ˈɛrpɔːrt/", es: "¿Cuánto tiempo toma llegar al aeropuerto?" },
          { en: "Who is responsible for organizing the meeting?", ipa: "/huː ɪz rɪˈspɒnsəbl fər ˈɔːrɡənaɪzɪŋ ðə ˈmiːtɪŋ/", es: "¿Quién es responsable de organizar la reunión?" }
        ],
        takeaways: [
          "Para personas y posesiones usa el genitivo 's ('John's phone'), no 'the phone of John'.",
          "Diferencia 'its' (posesivo neutro: 'The dog wagged its tail') de 'it's' (contracción: 'It is sunny').",
          "'Have got' y 'Have' significan lo mismo para posesión; elige uno según el estilo que prefieras."
        ],
        instructions: [
          "Identifica y repara el error de posesión en la oración propuesta.",
          "Elige la opción que exprese la posesión con naturalidad nativa.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Usa el apóstrofe y la 's' inmediatamente después de la persona dueña del objeto.",
        quiz: {
          q: "¿Cuál de las siguientes opciones expresa la frase 'El auto de mi jefe es nuevo' con la mayor naturalidad nativa?",
          opts: [
            "The car of my boss is new.",
            "My boss's car is new.",
            "The car from my boss is new.",
            "My boss car is new."
          ],
          correct: 1,
          fb: "¡Exacto! El genitivo sajón ('My boss's car') es la forma natural y estándar en inglés para personas que poseen objetos."
        },
        exercise: {
          audioText: "The computer of Maria is on the desk, but I think that charger is of him.",
          type: "error_spotter",
          title: "Detector de Errores: Posesión y Apóstrofes",
          sentence: "The computer of Maria is on the desk, but I think that charger is of him.",
          errorDescription: "¿Cuál es la forma correcta y natural de reescribir esta frase?",
          options: [
            { id: "o1", text: "Maria's computer is on the desk, but I think that charger is his.", correct: true },
            { id: "o2", text: "The Maria computer is on the desk, but I think that charger is of his.", correct: false },
            { id: "o3", text: "Marias' computer is on the desk, but I think that charger is him.", correct: false },
            { id: "o4", text: "The computer's Maria is on the desk, but I think that charger is he's.", correct: false }
          ],
          evaluator: (state) => {
            if (state.selectedOption === "o1") {
              return { pass: true, msg: "¡Impecable! 'Maria's computer' usa el genitivo sajón y 'is his' usa el pronombre posesivo correcto." };
            }
            return { pass: false, msg: "Opción incorrecta. Recuerda: Persona + 's + objeto (Maria's computer) y pronombre posesivo final (his)." };
          }
        }
      }
    ]
  },
  {
    unitId: 4,
    title: "Unidad 4: Acciones & Movimiento",
    level: "A2 Elemental-Intermedio",
    badge: {
      id: "badge_action",
      icon: "🚀",
      name: "Action Hero",
      desc: "Distingues acciones inmediatas en curso frente a estados y rutinas."
    },
    externalPractice: {
      provider: "Perfect English Grammar",
      badge: "Tiempos Verbales",
      title: "Present Simple vs Present Continuous & Stative Verbs",
      url: "https://www.perfect-english-grammar.com/present-simple-present-continuous.html",
      description: "Ejercicios profundos para no cometer el error de usar -ing con verbos de pensamiento o emoción (know, believe, like).",
      tasks: [
        "Resuelve el test de 20 preguntas contrastando acciones temporales vs permanentes.",
        "Memoriza la lista de los 15 'Stative Verbs' más comunes.",
        "Practica describir qué están haciendo las personas a tu alrededor en este instante."
      ],
      recommendedMetric: "Distinguir stative verbs sin errores en 10 frases consecutivas."
    },
    lessons: [
      {
        n: 10,
        title: "Presente Continuo: Formación con -ing y Uso en Tiempo Real",
        unit: 4,
        level: "A2",
        p1: "El **Present Continuous** se utiliza para hablar de acciones que están ocurriendo **en este preciso momento** (*'I am studying right now'*), situaciones temporales (*'He is staying at a hotel this week'*) o tendencias actuales. Su fórmula es infalible: **Sujeto + Verbo To Be (am/is/are) + Verbo terminado en -ing**.",
        p2: "Al añadir **-ing** aplican reglas ortográficas importantes: si el verbo termina en 'e' muda, se elimina (*make -> making, write -> writing*). Si es monosílabo y termina en consonante-vocal-consonante (CVC), **duplicamos la última consonante** (*run -> running, sit -> sitting, swim -> swimming*). Para negar, añadimos *not* después de To Be (*'We aren't sleeping'*).",
        audioSentences: [
          { en: "Why are you looking at me like that?", ipa: "/waɪ ɑːr juː ˈlʊkɪŋ æt miː laɪk ðæt/", es: "¿Por qué me estás mirando de esa manera?" },
          { en: "They are running in the park right now.", ipa: "/ðeɪ ɑːr ˈrʌnɪŋ ɪn ðə pɑːrk raɪt naʊ/", es: "Ellos están corriendo en el parque ahora mismo." },
          { en: "I am writing an important email to the team.", ipa: "/aɪ æm ˈraɪtɪŋ ən ɪmˈpɔːrtnt ˈiːmeɪl tuː ðə tiːm/", es: "Estoy escribiendo un correo importante para el equipo." }
        ,
          { en: "Look outside! It is raining heavily right now.", ipa: "/lʊk ˌaʊtˈsaɪd ɪt ɪz ˈreɪnɪŋ ˈhɛvɪli raɪt naʊ/", es: "¡Mira afuera! Está lloviendo fuerte en este momento." },
          { en: "Are you preparing dinner for the guests?", ipa: "/ɑːr juː prɪˈpɛərɪŋ ˈdɪnər fər ðə ɡɛsts/", es: "¿Estás preparando la cena para los invitados?" }
        ],
        takeaways: [
          "Fórmula del Present Continuous: Sujeto + am/is/are + verbo con -ing.",
          "Palabras clave: 'right now', 'at the moment', 'currently', 'this week'.",
          "Regla CVC: Verbos cortos con consonante-vocal-consonante duplican la última consonante (run -> running)."
        ],
        instructions: [
          "Selecciona la forma correcta con -ing que cumpla con las reglas ortográficas.",
          "Verifica el uso de To Be y la duplicación de consonantes en verbos CVC.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Run termina en R-U-N (consonante-vocal-consonante), por lo que duplica la n: running.",
        quiz: {
          q: "¿Cuál de las siguientes formas ortográficas del gerundio (-ing) es 100% correcta?",
          opts: [
            "runing, writeing, swiming",
            "running, writing, swimming",
            "runing, writing, swimming",
            "running, writeing, swiming"
          ],
          correct: 1,
          fb: "¡Exacto! 'Run' y 'swim' duplican consonante por ser CVC ('running', 'swimming'), mientras que 'write' pierde la 'e' muda ('writing')."
        },
        exercise: {
          audioText: "Look! The train is arriving, and many passengers are running to catch it. I am recording a video.",
          type: "fill_blanks",
          title: "Conjugación en Vivo: Acciones en Progreso",
          sentence: "Look! The train ___ (arrive), and many passengers ___ (run) to catch it. I ___ (record) a video.",
          blanks: [
            { id: "b1", placeholder: "The train...", options: ["is arriving", "are arriving", "arrives"], answer: "is arriving" },
            { id: "b2", placeholder: "Passengers...", options: ["is running", "are running", "are runing"], answer: "are running" },
            { id: "b3", placeholder: "I...", options: ["am recording", "is recording", "are recording"], answer: "am recording" }
          ],
          evaluator: (state) => {
            if (state.b1 === "is arriving" && state.b2 === "are running" && state.b3 === "am recording") {
              return { pass: true, msg: "¡Excelente! 'The train is arriving', 'passengers are running', 'I am recording'. Has aplicado la regla CVC y la concordancia de To Be." };
            }
            return { pass: false, msg: "Revisa las respuestas: train = is arriving; passengers (plural) = are running; I = am recording." };
          }
        }
      },
      {
        n: 11,
        title: "Presente Simple vs Presente Continuo y Stative Verbs",
        unit: 4,
        level: "A2",
        p1: "Comparar **Present Simple** y **Present Continuous** es una de las pruebas de fuego del inglés: el Simple expresa **rutinas o verdades permanentes** (*'I live in Madrid and I drink coffee'*), mientras que el Continuous expresa **lo que pasa ahora o situaciones temporales** (*'Today I am living in a hotel and I am drinking tea'*).",
        p2: "Aquí entra la regla crucial de los **Stative Verbs (Verbos de Estado)**: verbos que describen emociones, estados mentales, posesión o sentidos (**know, understand, believe, want, need, love, hate, own, seem**) **NUNCA se usan en tiempos continuos con -ing**. En español decimos 'Te estoy entendiendo', pero en inglés es estrictamente: *'I understand you'* (NUNCA *'I am understanding you'*).",
        audioSentences: [
          { en: "I usually take the subway, but today I am walking.", ipa: "/aɪ ˈjuːʒuəli teɪk ðə ˈsʌbweɪ bʌt təˈdeɪ aɪ æm ˈwɔːkɪŋ/", es: "Normalmente tomo el metro, pero hoy estoy caminando." },
          { en: "Do you understand what I mean?", ipa: "/duː juː ˌʌndərˈstænd wʌt aɪ miːn/", es: "¿Entiendes lo que quiero decir?" },
          { en: "She wants to buy a new laptop this afternoon.", ipa: "/ʃiː wɑːnts tuː baɪ ə nuː ˈlæptɑːp ðɪs ˌæftərˈnuːn/", es: "Ella quiere comprar una nueva laptop esta tarde." }
        ,
          { en: "She watched a fascinating documentary yesterday.", ipa: "/ʃiː wɒtʃt ə ˈfæsɪneɪtɪŋ ˌdɒkjuˈmɛntri ˈjɛstərdeɪ/", es: "Ella vio un documental fascinante ayer." },
          { en: "We visited our grandparents last weekend.", ipa: "/wiː ˈvɪzɪtɪd ˈaʊər ˈɡrænpeərənts læst ˌwiːkˈɛnd/", es: "Visitamos a nuestros abuelos el fin de semana pasado." }
        ],
        takeaways: [
          "Present Simple = Hábitos y verdades permanentes ('I work every day').",
          "Present Continuous = Acciones en progreso o temporales ('I am working right now').",
          "Los verbos de estado (know, want, need, believe) NUNCA llevan -ing: di 'I know', no 'I am knowing'."
        ],
        instructions: [
          "Clasifica cada verbo en 'Acción Dinámica' (admite -ing) o 'Verbo de Estado / Stative' (solo Presente Simple).",
          "Recuerda que los estados mentales, emociones y posesión no admiten gerundio.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Los verbos de estado reflejan una condición mental, no una actividad física que puedas empezar y detener a voluntad.",
        quiz: {
          q: "¿Cuál de las siguientes frases comete un error gramatical por usar un 'Stative Verb' en forma continua?",
          opts: [
            "I am working on a new software architecture.",
            "She is knowing the answer to this technical question.",
            "They are living in London for three months.",
            "We are discussing the quarterly sales results."
          ],
          correct: 1,
          fb: "¡Exacto! 'Know' es un verbo de estado mental y jamás se usa en forma continua. Lo correcto es: 'She knows the answer'."
        },
        exercise: {
          audioText: "Understand. Cook. Believe. Build.",
          type: "classification_bins",
          title: "Clasificación Verbal: ¿Verbo Dinámico o Verbo de Estado (Stative)?",
          categories: [
            { id: "dynamic", title: "Dinámico (Admite -ing / Continuous)" },
            { id: "stative", title: "Stative (Solo Simple, Prohibido -ing)" }
          ],
          items: [
            { id: "v1", text: "Understand (Comprender)", target: "stative" },
            { id: "v2", text: "Cook (Cocinar alimentos)", target: "dynamic" },
            { id: "v3", text: "Believe (Creer una idea)", target: "stative" },
            { id: "v4", text: "Build (Construir algo)", target: "dynamic" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica los 4 verbos antes de validar." };
            const errors = keys.filter(k => {
              const it = [{id:"v1",target:"stative"},{id:"v2",target:"dynamic"},{id:"v3",target:"stative"},{id:"v4",target:"dynamic"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Perfecto! Understand y Believe son Stative Verbs (no llevan -ing), mientras que Cook y Build son acciones dinámicas." };
            return { pass: false, msg: `Hay ${errors.length} errores. Recuerda: emociones y procesos cognitivos son Stative.` };
          }
        }
      },
      {
        n: 12,
        title: "Preposiciones de Lugar y Movimiento (In, On, At, Under, Across)",
        unit: 4,
        level: "A2",
        p1: "Al igual que con el tiempo, **IN, ON y AT** son las tres preposiciones de lugar fundamentales: **IN** se usa para espacios cerrados o áreas con límites (*in a room, in Mexico City, in a box*); **ON** para superficies de contacto (*on the table, on the floor, on the wall*) y medios de transporte donde puedes caminar dentro (*on a bus, on a train, on a plane*); y **AT** para un punto de encuentro o ubicación específica en el mapa (*at the airport, at the door, at home*).",
        p2: "Para movimiento físico, usamos preposiciones direccionales: **TO** (hacia un destino: *'go to work'*), **INTO** (hacia el interior: *'walk into the room'*), **OUT OF** (hacia afuera: *'get out of the car'*), **ACROSS** (de un lado a otro: *'walk across the bridge'*), **UNDER** (debajo) y **NEXT TO / BESIDE** (al lado de).",
        audioSentences: [
          { en: "He is sitting at his desk, with his laptop on the table.", ipa: "/hiː ɪz ˈsɪtɪŋ æt hɪz dɛsk wɪð hɪz ˈlæptɑːp ɑːn ðə ˈteɪbl/", es: "Él está sentado en su escritorio, con su laptop sobre la mesa." },
          { en: "We met at the airport before boarding the plane.", ipa: "/wiː mɛt æt ði ˈerpɔːrt bɪˈfɔːr ˈbɔːrdɪŋ ðə pleɪn/", es: "Nos encontramos en el aeropuerto antes de abordar el avión." },
          { en: "Walk across the street and the coffee shop is on your left.", ipa: "/wɔːk əˈkrɔːs ðə striːt ænd ðə ˈkɔːfi ʃɑːp ɪz ɑːn jʊər lɛft/", es: "Cruza la calle y la cafetería está a tu izquierda." }
        ,
          { en: "Did you find your keys under the couch?", ipa: "/dɪd juː faɪnd jɔːr kiːz ˈʌndər ðə kaʊtʃ/", es: "¿Encontraste tus llaves debajo del sofá?" },
          { en: "He wrote a letter and sent it by post.", ipa: "/hiː roʊt ə ˈlɛtər ænd sɛnt ɪt baɪ poʊst/", es: "Él escribió una carta y la envió por correo." }
        ],
        takeaways: [
          "IN = dentro de un espacio o volumen; ON = sobre una superficie o transporte grande; AT = punto específico.",
          "Para autos y taxis se usa 'in' ('in a car'), pero para buses, trenes y aviones se usa 'on' ('on a train').",
          "ACROSS implica cruzar de una orilla a otra; INTO implica entrar a un interior tridimensional."
        ],
        instructions: [
          "Completa la historia de viaje seleccionando la preposición de lugar correcta.",
          "Fíjate si el objeto está sobre una superficie, en un transporte público o dentro de una ciudad.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Buses y trenes usan 'on'. Países y ciudades usan 'in'. Puntos de encuentro exactos usan 'at'.",
        quiz: {
          q: "¿Por qué en inglés se dice 'I am ON the bus' pero 'I am IN the taxi'?",
          opts: [
            "Porque el taxi es más rápido que el autobús.",
            "Porque en un autobús puedes ponerte de pie y caminar por el pasillo (superficie), mientras que en un taxi estás confinado en un espacio cerrado.",
            "Porque 'on' es solo para transporte público y 'in' es para transporte privado.",
            "Es una regla arbitraria sin ninguna lógica espacial."
          ],
          correct: 1,
          fb: "¡Excelente intuición! La regla espacial del inglés dice que en medios de transporte donde puedes pararte o caminar sobre una plataforma (bus, train, plane, ship) se usa 'ON'."
        },
        exercise: {
          audioText: "I am waiting at the station. My friend is on the train, and our hotel is in Chicago.",
          type: "fill_blanks",
          title: "Ruta de Navegación: Preposiciones de Lugar",
          sentence: "I am waiting ___ (at/on/in) the station. My friend is ___ (at/on/in) the train, and our hotel is ___ (at/on/in) Chicago.",
          blanks: [
            { id: "b1", placeholder: "Lugar de espera...", options: ["at", "on", "in"], answer: "at" },
            { id: "b2", placeholder: "En el tren...", options: ["at", "on", "in"], answer: "on" },
            { id: "b3", placeholder: "Ciudad...", options: ["at", "on", "in"], answer: "in" }
          ],
          evaluator: (state) => {
            if (state.b1 === "at" && state.b2 === "on" && state.b3 === "in") {
              return { pass: true, msg: "¡Exacto! 'At the station' (punto), 'on the train' (transporte con plataforma), 'in Chicago' (ciudad)." };
            }
            return { pass: false, msg: "Revisa: estaciones usan 'at', trenes usan 'on', y ciudades usan 'in'." };
          }
        }
      }
    ]
  },
  {
    unitId: 5,
    title: "Unidad 5: El Pasado & Experiencias",
    level: "A2-B1 Intermedio",
    badge: {
      id: "badge_storyteller",
      icon: "📖",
      name: "Master Storyteller",
      desc: "Relatas memorias y anécdotas con verbos regulares e irregulares en pasado."
    },
    externalPractice: {
      provider: "Oxford Online English",
      badge: "Fonética del Pasado",
      title: "Pronunciación del Sufijo -ED: /t/, /d/, /ɪd/",
      url: "https://www.oxfordonlineenglish.com/how-to-pronounce-ed-endings",
      description: "Aprende el secreto que el 90% de hispanohablantes ignora: cómo pronunciar las terminaciones en -ed sin decir 'ed' como en español.",
      tasks: [
        "Escucha la regla de las terminaciones sordas (/t/), sonoras (/d/) y con 't' o 'd' previas (/ɪd/).",
        "Practica 20 verbos regulares en voz alta frente al espejo.",
        "Aprende los 30 verbos irregulares de mayor impacto en la conversación cotidiana."
      ],
      recommendedMetric: "Distinguir entre /t/, /d/ y /ɪd/ con 100% de precisión."
    },
    lessons: [
      {
        n: 13,
        title: "Pasado Simple con Verbos Regulares y Pronunciación de -ed (/t/, /d/, /ɪd/)",
        unit: 5,
        level: "A2-B1",
        p1: "El **Past Simple** describe acciones que empezaron y terminaron en un momento definido del pasado (*'Yesterday I visited my family'*). En los verbos regulares, el pasado se forma añadiendo **-ed** o **-d** (*worked, started, played*). La estructura es idéntica para todas las personas gramaticales (I, you, he, she, it, we, they usan la misma forma).",
        p2: "¡ATENCIÓN A LA PRONUNCIACIÓN! Los hispanohablantes suelen cometer el error de pronunciar la 'e' de *-ed* como si fuera español (ej. decir 'uork-ed'). La 'e' es casi siempre **MUDA**. Solo hay 3 pronunciaciones reales: **1. /ɪd/** (agrega una sílaba extra) ÚNICAMENTE cuando el verbo termina en sonido 'T' o 'D' (*wanted, needed*). **2. /t/** tras consonantes sordas como p, k, s, ch, sh (*worked, stopped, watched*). **3. /d/** tras vocales o consonantes sonoras (*played, lived, opened*).",
        audioSentences: [
          { en: "I wanted to call you, but I worked until late.", ipa: "/aɪ ˈwɑːntɪd tuː kɔːl juː bʌt aɪ wɜːrkt ənˈtɪl leɪt/", es: "Quería llamarte, pero trabajé hasta tarde." },
          { en: "She watched a movie and decided to sleep.", ipa: "/ʃiː wɑːtʃt ə ˈmuːvi ænd dɪˈsaɪdɪd tuː sliːp/", es: "Ella vio una película y decidió dormir." },
          { en: "They played tennis and lived in Australia for a year.", ipa: "/ðeɪ pleɪd ˈtɛnɪs ænd lɪvd ɪn ɔːˈstreɪliə fər ə jɪər/", es: "Ellos jugaron tenis y vivieron en Australia durante un año." }
        ,
          { en: "I was sleeping peacefully when the phone rang.", ipa: "/aɪ wəz ˈsliːpɪŋ ˈpiːsfəli wɛn ðə foʊn ræŋ/", es: "Estaba durmiendo plácidamente cuando sonó el teléfono." },
          { en: "While we were driving home, it started to snow.", ipa: "/waɪl wiː wɜːr ˈdraɪvɪŋ hoʊm ɪt ˈstɑːrtɪd tuː snoʊ/", es: "Mientras conducíamos a casa, comenzó a nevar." }
        ],
        takeaways: [
          "La terminación -ed solo suena como sílaba extra (/ɪd/) si el verbo termina en sonido T o D ('wanted', 'needed').",
          "En todos los demás casos la 'e' es muda: 'worked' suena /wɜːrkt/, 'played' suena /pleɪd/.",
          "El pasado simple regular no cambia según el pronombre: 'I worked', 'She worked', 'They worked'."
        ],
        instructions: [
          "Clasifica los 4 verbos regulares según el sonido de su terminación -ed.",
          "Identifica cuáles agregan sílaba extra (/ɪd/) y cuáles tienen 'e' muda (/t/ o /d/).",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Solo termina en /ɪd/ si la palabra base termina en letra o sonido 't' (want) o 'd' (decide).",
        quiz: {
          q: "¿En cuál de los siguientes verbos en pasado simple la terminación '-ed' añade una sílaba adicional a la pronunciación (/ɪd/)?",
          opts: [
            "Cooked (cocinó)",
            "Visited (visitó)",
            "Watched (observó)",
            "Played (jugó)"
          ],
          correct: 1,
          fb: "¡Exacto! 'Visit' termina en sonido 'T', por lo que al añadir -ed se pronuncia obligatoriamente con una sílaba extra: /ˈvɪzɪtɪd/."
        },
        exercise: {
          audioText: "Decided. Asked. Waited. Called.",
          type: "classification_bins",
          title: "Laboratorio Fonético: ¿Pronunciación /ɪd/ o 'E' Muda?",
          categories: [
            { id: "id_sound", title: "Sonido /ɪd/ (Añade sílaba extra: base termina en T o D)" },
            { id: "silent_e", title: "'E' Muda /t/ o /d/ (Mismo número de sílabas)" }
          ],
          items: [
            { id: "v1", text: "Decided (Decidió)", target: "id_sound" },
            { id: "v2", text: "Asked (Preguntó)", target: "silent_e" },
            { id: "v3", text: "Waited (Esperó)", target: "id_sound" },
            { id: "v4", text: "Called (Llamó)", target: "silent_e" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica los 4 verbos antes de validar." };
            const errors = keys.filter(k => {
              const it = [{id:"v1",target:"id_sound"},{id:"v2",target:"silent_e"},{id:"v3",target:"id_sound"},{id:"v4",target:"silent_e"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Oído experto! Decided y Waited terminan en T/D (suenan /ɪd/), mientras Asked (/t/) y Called (/d/) tienen 'e' muda." };
            return { pass: false, msg: `Hay ${errors.length} errores. Revisa la regla de la terminación T/D.` };
          }
        }
      },
      {
        n: 14,
        title: "Pasado Simple: Verbos Irregulares y Preguntas con 'Did'",
        unit: 5,
        level: "A2-B1",
        p1: "Muchos de los verbos más importantes del inglés no aceptan '-ed': son **irregulares** y cambian su raíz: *go -> went, see -> saw, have -> had, buy -> bought, take -> took, write -> wrote*. No hay una regla matemática para deducirlos; se aprenden por exposición, asociación de patrones y práctica.",
        p2: "Para hacer preguntas o negar en pasado, usamos el auxiliar **DID** o **DIDN'T**. Y aquí se aplica la misma regla de oro que aprendimos con Do/Does: **cuando DID o DIDN'T están presentes, el verbo vuelve a su forma base en presente**: *'Did you see that?'* (NUNCA *'Did you saw that?'*), *'I didn't buy the tickets'* (NUNCA *'I didn't bought'*). ¡Did ya hizo todo el trabajo del pasado!",
        audioSentences: [
          { en: "I went to New York and I bought a laptop.", ipa: "/aɪ wɛnt tuː nuː jɔːrk ænd aɪ bɔːt ə ˈlæptɑːp/", es: "Fui a Nueva York y compré una laptop." },
          { en: "Did you understand the instructions from the client?", ipa: "/dɪd juː ˌʌndərˈstænd ði ɪnˈstrʌkʃnz frəm ðə ˈklaɪənt/", es: "¿Entendiste las instrucciones del cliente?" },
          { en: "We didn't have enough time to finish the project.", ipa: "/wiː ˈdɪdnt hæv ɪˈnʌf taɪm tuː ˈfɪnɪʃ ðə ˈprɑːdʒɛkt/", es: "No tuvimos suficiente tiempo para terminar el proyecto." }
        ,
          { en: "Learning vocabulary is more rewarding than memorizing.", ipa: "/ˈlɜːrnɪŋ vəʊˈkæbjʊləri ɪz mɔːr rɪˈwɔːrdɪŋ ðæn ˈmɛməraɪzɪŋ/", es: "Aprender vocabulario es más gratificante que memorizar." },
          { en: "This is by far the most peaceful city in the country.", ipa: "/ðɪs ɪz baɪ fɑːr ðə moʊst ˈpiːsfəl ˈsɪti ɪn ðə ˈkʌntri/", es: "Esta es por mucho la ciudad más pacífica del país." }
        ],
        takeaways: [
          "Verbos irregulares comunes: go->went, buy->bought, see->saw, make->made, have->had.",
          "Con 'Did' o 'Didn't', el verbo principal va SIEMPRE en forma base (infinitivo sin 'to').",
          "En afirmaciones usa la forma irregular ('I went'); en negaciones y preguntas usa Did + base ('Did you go?')."
        ],
        instructions: [
          "Identifica el error en la pregunta en pasado y selecciona la corrección adecuada.",
          "Recuerda la regla de oro del auxiliar 'Did'.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Si la pregunta tiene 'Did', el verbo no puede estar en forma pasada (saw/went).",
        quiz: {
          q: "¿Cuál de las siguientes oraciones formula una pregunta y negación en pasado de forma gramaticalmente correcta?",
          opts: [
            "Did you went to the office yesterday? - No, I didn't went.",
            "Did you go to the office yesterday? - No, I didn't go.",
            "Did you go to the office yesterday? - No, I didn't went.",
            "Were you go to the office yesterday? - No, I didn't go."
          ],
          correct: 1,
          fb: "¡Exacto! Con 'Did' y 'didn't', el verbo principal siempre debe estar en su forma base: 'Did you go?' y 'I didn't go'."
        },
        exercise: {
          audioText: "What did you buy at the store?",
          type: "sequence_sort",
          title: "Constructor de Preguntas en Pasado",
          items: [
            { id: "w1", text: "What" },
            { id: "w2", text: "did" },
            { id: "w3", text: "you" },
            { id: "w4", text: "buy" },
            { id: "w5", text: "at" },
            { id: "w6", text: "the" },
            { id: "w7", text: "store?" }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6", "w7"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6", "w7"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Impecable! 'What did you buy at the store?' sigue WH-word + Did + Sujeto + Verbo Base (buy) + Complemento." };
            }
            return { pass: false, msg: "Orden incorrecto. Recuerda: What + did + you + buy + at the store?" };
          }
        }
      },
      {
        n: 15,
        title: "Pasado Continuo y 'Used to': Acciones Interrumpidas (When / While)",
        unit: 5,
        level: "A2-B1",
        p1: "El **Past Continuous** describe una acción que estaba en progreso en un momento concreto del pasado: **was / were + verbo con -ing** (*'I was sleeping at 10 PM'*, *'They were working'*). A menudo se combina con el Past Simple para expresar una **acción que fue interrumpida por otra**: la acción larga en desarrollo va en Past Continuous, y la acción corta que interrumpe va en Past Simple.",
        p2: "Los conectores clave son **WHILE** (mientras, introduce la acción continua: *'While I was coding...'*) y **WHEN** (cuando, introduce la interrupción puntual: *'...when the power went out'*). Por otro lado, para hablar de hábitos o estados pasados que ya no existen hoy en día, usamos la estructura **USED TO** (*'I used to play soccer, but now I play tennis'*, traducción: 'Yo solía jugar...').",
        audioSentences: [
          { en: "I was having dinner when my phone rang.", ipa: "/aɪ wəz ˈhævɪŋ ˈdɪnər wɛn maɪ foʊn ræŋ/", es: "Estaba cenando cuando sonó mi teléfono." },
          { en: "While we were discussing the strategy, the client arrived.", ipa: "/waɪl wiː wər dɪˈskʌsɪŋ ðə ˈstrætədʒi ðə ˈklaɪənt əˈraɪvd/", es: "Mientras discutíamos la estrategia, llegó el cliente." },
          { en: "She used to live in Tokyo before moving to London.", ipa: "/ʃiː juːst tuː lɪv ɪn ˈtoʊkioʊ bɪˈfɔːr ˈmuːvɪŋ tuː ˈlʌndən/", es: "Ella solía vivir en Tokio antes de mudarse a Londres." }
        ,
          { en: "Could you please explain that rule one more time?", ipa: "/kʊd juː pliːz ɪkˈspleɪn ðæt ruːl wʌn mɔːr taɪm/", es: "¿Podrías por favor explicar esa regla una vez más?" },
          { en: "With regular practice, you will be able to speak fluently.", ipa: "/wɪð ˈrɛɡjʊlər ˈpræktɪs juː wɪl biː ˈeɪbl tuː spiːk ˈfluːəntli/", es: "Con práctica constante, serás capaz de hablar con fluidez." }
        ],
        takeaways: [
          "Past Continuous = was/were + -ing para acciones en desarrollo en el pasado.",
          "Fórmula clásica de interrupción: Past Continuous (acción larga) + WHEN + Past Simple (interrupción puntual).",
          "'Used to' expresa costumbres pasadas que ya no realizas en el presente."
        ],
        instructions: [
          "Completa la anécdota seleccionando entre Past Continuous (was/were doing) y Past Simple (did).",
          "Analiza qué acción estaba en progreso y cuál fue la que interrumpió el momento.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "La acción continua (larga) lleva was/were + -ing; la que interrumpe lleva pasado simple (-ed / irregular).",
        quiz: {
          q: "¿Cuál de las siguientes oraciones combina correctamente una acción interrumpida en el pasado?",
          opts: [
            "I walked in the park when it was starting to rain.",
            "I was walking in the park when it started to rain.",
            "I was walking in the park while it was started to rain.",
            "I walk in the park when it started to rain."
          ],
          correct: 1,
          fb: "¡Exacto! 'I was walking' (acción continua en desarrollo) se interrumpió puntualmente con 'when it started to rain' (pasado simple)."
        },
        exercise: {
          audioText: "While I was driving to the office, a strange noise started in the engine, so I stopped the car.",
          type: "fill_blanks",
          title: "Laboratorio de Narrativa: Acciones Interrumpidas",
          sentence: "While I ___ (drive) to the office, a strange noise ___ (start) in the engine, so I ___ (stop) the car.",
          blanks: [
            { id: "b1", placeholder: "Acción en curso...", options: ["was driving", "drove", "were driving"], answer: "was driving" },
            { id: "b2", placeholder: "Interrupción...", options: ["started", "was starting", "starts"], answer: "started" },
            { id: "b3", placeholder: "Acción posterior...", options: ["stopped", "was stopping", "stops"], answer: "stopped" }
          ],
          evaluator: (state) => {
            if (state.b1 === "was driving" && state.b2 === "started" && state.b3 === "stopped") {
              return { pass: true, msg: "¡Perfecto! 'While I was driving' (proceso largo), 'a noise started' (interrupción), 'I stopped' (consecuencia en pasado)." };
            }
            return { pass: false, msg: "Revisa los tiempos: la acción larga lleva 'was driving' y las acciones puntuales llevan pasado simple ('started', 'stopped')." };
          }
        }
      }
    ]
  },
  {
    unitId: 6,
    title: "Unidad 6: El Futuro & Posibilidades",
    level: "B1 Intermedio Sólido",
    badge: {
      id: "badge_visionary",
      icon: "🔮",
      name: "Future Architect",
      desc: "Proyectas planes, predicciones y situaciones condicionales con soltura."
    },
    externalPractice: {
      provider: "BBC 6 Minute English",
      badge: "Escucha & Futuro",
      title: "Dominio de Will, Going to y Condicionales",
      url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
      description: "Episodios breves de audio con transcripción interactiva discutiendo el futuro de la tecnología, IA y cambio climático.",
      tasks: [
        "Escucha un episodio sobre predicciones tecnológicas identificando el uso de 'will' y 'might'.",
        "Escribe 3 predicciones para el año 2030 usando 'will' y 3 planes personales usando 'going to'.",
        "Practica frases del primer y segundo condicional en voz alta."
      ],
      recommendedMetric: "Distinguir entre decisión espontánea (will) y plan premeditado (going to)."
    },
    lessons: [
      {
        n: 16,
        title: "Futuro con 'Going to' vs 'Will': Planes vs Decisiones Espontáneas",
        unit: 6,
        level: "B1",
        p1: "El inglés no tiene un único tiempo verbal 'futuro'; utiliza diferentes estructuras según la intención del hablante. **BE GOING TO** se usa para **planes previos, intenciones decididas antes de hablar y evidencias presentes claras** (*'I am going to study medicine next year'*, *'Look at those black clouds, it is going to rain'*).",
        p2: "Por el contrario, **WILL** se usa para **decisiones espontáneas tomadas en el momento mismo de hablar** (*'The phone is ringing. I'll get it!'*), promesas (*'I will always help you'*), ofertas de ayuda (*'I'll carry that bag for you'*) y predicciones basadas en opiniones personales (*'I think AI will change the world'*). La contracción de will es **'ll** (*I'll, you'll, they'll*) y su negación es **won't** (*will not*).",
        audioSentences: [
          { en: "I'm going to visit my parents this weekend.", ipa: "/aɪm ˈɡoʊɪŋ tuː ˈvɪzɪt maɪ ˈpɛrənts ðɪs ˈwiːkɛnd/", es: "Voy a visitar a mis padres este fin de semana." },
          { en: "Don't worry, I'll send you the report right now.", ipa: "/doʊnt ˈwɜːri aɪl sɛnd juː ðə rɪˈpɔːrt raɪt naʊ/", es: "No te preocupes, te enviaré el informe ahora mismo." },
          { en: "Look at the sky! It's going to rain any minute.", ipa: "/lʊk æt ðə skaɪ ɪts ˈɡoʊɪŋ tuː reɪn ˈɛni ˈmɪnɪt/", es: "¡Mira el cielo! Va a llover en cualquier momento." }
        ,
          { en: "Don't worry, I will carry that heavy suitcase for you.", ipa: "/doʊnt ˈwʌri aɪ wɪl ˈkæri ðæt ˈhɛvi ˈsuːtkeɪs fər juː/", es: "No te preocupes, yo cargaré esa maleta pesada por ti." },
          { en: "They are going to launch their mobile app next month.", ipa: "/ðeɪ ɑːr ˈɡoʊɪŋ tuː lɔːntʃ ðɛr ˈmoʊbl æp nɛkst mʌnθ/", es: "Ellos van a lanzar su aplicación móvil el próximo mes." }
        ],
        takeaways: [
          "Going to = Planes organizados previamente y predicciones con evidencia visual evidente.",
          "Will ('ll) = Decisiones instantáneas tomadas al instante de hablar, promesas y ofertas.",
          "La negación de will es 'won't' (/woʊnt/); nunca digas 'will not' salvo para enfatizar fuertemente."
        ],
        instructions: [
          "Clasifica los 4 escenarios según corresponda usar 'Will (Decisión espontánea / Promesa)' o 'Going to (Plan premeditado / Evidencia)'.",
          "Analiza si la persona ya había planeado la acción o si reacciona en el momento.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Si suena el timbre o te ofrecen un café y decides en 1 segundo: usa WILL. Si compraste boletos de avión hace 2 semanas: usa GOING TO.",
        quiz: {
          q: "¿Cuál de las siguientes frases requiere 'WILL' en vez de 'GOING TO'?",
          opts: [
            "Ya compré mis boletos de avión para viajar a Londres el próximo mes.",
            "Alguien toca el timbre de tu casa y dices: '¡Yo abro!'.",
            "Ves el calendario y revisas tu boda programada para el 15 de julio.",
            "Una mujer con 9 meses de embarazo a punto de entrar a sala de parto."
          ],
          correct: 1,
          fb: "¡Exacto! Decidir abrir la puerta ante el timbre es una decisión instantánea y espontánea: 'I'll get it!' (Will)."
        },
        exercise: {
          audioText: "I forgot my wallet. Don't worry, I will pay for lunch. We have already booked the flight tickets; we are going to travel to Japan. I promise I will never lie to you again. Those dark clouds look terrible. It is going to storm.",
          type: "classification_bins",
          title: "Auditoría de Futuro: ¿'Will' o 'Be Going To'?",
          categories: [
            { id: "will", title: "Will (Espontáneo / Oferta / Promesa)" },
            { id: "going_to", title: "Going To (Plan previo / Evidencia física)" }
          ],
          items: [
            { id: "f1", text: "'I forgot my wallet.' - 'Don't worry, I will pay for lunch.'", target: "will" },
            { id: "f2", text: "We have already booked the flight tickets; we are going to travel to Japan.", target: "going_to" },
            { id: "f3", text: "'I promise I will never lie to you again.'", target: "will" },
            { id: "f4", text: "Those dark clouds look terrible. It is going to storm.", target: "going_to" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica los 4 casos antes de evaluar." };
            const errors = keys.filter(k => {
              const it = [{id:"f1",target:"will"},{id:"f2",target:"going_to"},{id:"f3",target:"will"},{id:"f4",target:"going_to"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Distinción perfecta! Has diferenciado decisiones espontáneas y promesas (Will) de planes y evidencias (Going to)." };
            return { pass: false, msg: `Hay ${errors.length} errores. Revisa la diferencia entre espontaneidad y premeditación.` };
          }
        }
      },
      {
        n: 17,
        title: "Primer Condicional: Situaciones Reales y Probables",
        unit: 6,
        level: "B1",
        p1: "El **First Conditional** se utiliza para hablar de situaciones futuras posibles y sus consecuencias lógicas directas: *'Si estudias, aprobarás el examen'*. La estructura fundamental es: **IF + Present Simple, WILL + Verbo Base**. También puedes invertir las cláusulas sin cambiar el significado: *'You will pass the exam if you study'* (nota que cuando 'if' va al medio, no se coloca coma).",
        p2: "El error número 1 de los estudiantes es meter 'will' dentro de la cláusula de 'if': en español decimos 'Si lloverá...', pero en inglés es estrictamente **IF + PRESENTE**: *'If it rains tomorrow, we will cancel the picnic'* (NUNCA *'If it will rain'*). En lugar de 'will', también puedes usar modales como *can, might o should* en la consecuencia (*'If you have time, you should call her'*).",
        audioSentences: [
          { en: "If we finish the project early, we will celebrate.", ipa: "/ɪf wiː ˈfɪnɪʃ ðə ˈprɑːdʒɛkt ˈɜːrli wiː wɪl ˈsɛləbreɪt/", es: "Si terminamos el proyecto temprano, lo celebraremos." },
          { en: "If you don't hurry, you will miss the train.", ipa: "/ɪf juː doʊnt ˈhɜːri juː wɪl mɪs ðə treɪn/", es: "Si no te apuras, perderás el tren." },
          { en: "What will you do if the client rejects the offer?", ipa: "/wʌt wɪl juː duː ɪf ðə ˈklaɪənt rɪˈdʒɛkts ði ˈɔːfər/", es: "¿Qué harás si el cliente rechaza la oferta?" }
        ,
          { en: "If you practice every day, your confidence will grow.", ipa: "/ɪf juː ˈpræktɪs ˈɛvri deɪ jɔːr ˈkɒnfɪdəns wɪl ɡroʊ/", es: "Si practicas todos los días, tu confianza crecerá." },
          { en: "Unless we hurry, we will miss our morning train.", ipa: "/ənˈlɛs wiː ˈhʌri wiː wɪl mɪs ˈaʊər ˈmɔːrnɪŋ treɪn/", es: "A menos que nos demos prisa, perderemos el tren matutino." }
        ],
        takeaways: [
          "Estructura del Primer Condicional: If + Presente Simple, consecuencia con Will + infinitivo.",
          "REGLA DE ORO: Jamás uses 'will' inmediatamente después de 'If'.",
          "Si la cláusula con 'If' va primero, se separa con coma; si va en segundo lugar, no lleva coma."
        ],
        instructions: [
          "Ordena las palabras para formar una oración válida de Primer Condicional.",
          "La frase debe significar: 'Si llueve mañana, me quedaré en casa.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Estructura: If + it rains tomorrow, + I will stay at home.",
        quiz: {
          q: "¿Cuál de las siguientes oraciones respeta estrictamente la regla del Primer Condicional?",
          opts: [
            "If it will rain tomorrow, I will stay at home.",
            "If it rains tomorrow, I will stay at home.",
            "If it rains tomorrow, I stay at home.",
            "If it rained tomorrow, I would stay at home."
          ],
          correct: 1,
          fb: "¡Exacto! La cláusula de 'if' debe usar Presente Simple ('If it rains'), y la consecuencia usa 'will' + verbo base ('I will stay')."
        },
        exercise: {
          audioText: "If it rains tomorrow, I will stay at home.",
          type: "sequence_sort",
          title: "Constructor de Primer Condicional",
          items: [
            { id: "w1", text: "If" },
            { id: "w2", text: "it" },
            { id: "w3", text: "rains" },
            { id: "w4", text: "tomorrow," },
            { id: "w5", text: "I" },
            { id: "w6", text: "will" },
            { id: "w7", text: "stay" },
            { id: "w8", text: "at home." }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Excelente! 'If it rains tomorrow, I will stay at home.' Fórmula de condición real aplicada a la perfección." };
            }
            return { pass: false, msg: "Revisa el orden: Condición (If it rains tomorrow,) + Consecuencia (I will stay at home.)." };
          }
        }
      },
      {
        n: 18,
        title: "Segundo Condicional: Hipótesis, Sueños y Consejos (If I were you...)",
        unit: 6,
        level: "B1",
        p1: "El **Second Conditional** se usa para situaciones hipotéticas, imaginarias, sueños o condiciones contrarias a la realidad presente: *'Si tuviera un millón de dólares, viajaría por el mundo'*. La fórmula es: **IF + Past Simple, WOULD + Verbo Base** (*'If I had a million dollars, I would travel the world'*).",
        p2: "Una particularidad formal y muy elegante del segundo condicional es que con el verbo To Be se prefiere usar **WERE** para todas las personas gramaticales, incluso con I, He, She e It: *'If I were you, I would accept the job offer'* ('Si yo fuera tú, aceptaría la oferta de trabajo' — la forma reina para dar consejos en inglés). En lenguaje informal se escucha a veces *'If I was'*, pero en exámenes y entornos profesionales *'If I were'* es el estándar.",
        audioSentences: [
          { en: "If I were you, I would take that opportunity.", ipa: "/ɪf aɪ wər juː aɪ wʊd teɪk ðæt ˌɑːpərˈtuːnəti/", es: "Si yo fuera tú, aprovecharía esa oportunidad." },
          { en: "If we had more time, we would redesign the entire system.", ipa: "/ɪf wiː hæd mɔːr taɪm wiː wʊd ˌriːdɪˈzaɪn ði ɪnˈtaɪər ˈsɪstəm/", es: "Si tuviéramos más tiempo, rediseñaríamos el sistema entero." },
          { en: "What would you do if you won the lottery?", ipa: "/wʌt wʊd juː duː ɪf juː wʌn ðə ˈlɑːtəri/", es: "¿Qué harías si ganaras la lotería?" }
        ,
          { en: "Have you ever tried traditional Japanese cuisine?", ipa: "/hæv juː ˈɛvər traɪd trəˈdɪʃənl ˌdʒæpəˈniːz kwɪˈziːn/", es: "¿Alguna vez has probado la cocina japonesa tradicional?" },
          { en: "She has achieved all her professional goals this year.", ipa: "/ʃiː hæz əˈtʃiːvd ɔːl hɜːr prəˈfɛʃənl ɡoʊlz ðɪs jɪr/", es: "Ella ha alcanzado todas sus metas profesionales este año." }
        ],
        takeaways: [
          "Segundo condicional = If + Pasado Simple, consecuencia con Would + verbo base.",
          "Úsalo para dar consejos sabios: 'If I were you, I would...'.",
          "Diferencia clave: Primer condicional es probable en el futuro; segundo condicional es puramente hipotético e irreal hoy."
        ],
        instructions: [
          "Completa la frase hipotética con la conjugación adecuada del Segundo Condicional.",
          "Verifica el uso de pasado simple en la condición y 'would' en la consecuencia.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "La cláusula del 'If' lleva pasado simple (had / were); la consecuencia lleva 'would' + infinitivo.",
        quiz: {
          q: "¿Cuál es la forma más formal y correcta de dar un consejo en inglés usando el segundo condicional?",
          opts: [
            "If I am you, I will buy that car.",
            "If I were you, I would buy that car.",
            "If I would be you, I bought that car.",
            "If I had been you, I will buy that car."
          ],
          correct: 1,
          fb: "¡Exacto! 'If I were you, I would...' es la fórmula por excelencia del inglés formal para dar consejos y plantear hipótesis."
        },
        exercise: {
          audioText: "If I were the CEO of this company, I would invest more in training, and our team would be much happier.",
          type: "fill_blanks",
          title: "Laboratorio de Escenarios Hipotéticos",
          sentence: "If I ___ (be) the CEO of this company, I ___ (invest) more in training, and our team ___ (be) much happier.",
          blanks: [
            { id: "b1", placeholder: "Condición hipotética...", options: ["were", "was", "am"], answer: "were" },
            { id: "b2", placeholder: "Consecuencia 1...", options: ["would invest", "will invest", "invested"], answer: "would invest" },
            { id: "b3", placeholder: "Consecuencia 2...", options: ["would be", "will be", "is"], answer: "would be" }
          ],
          evaluator: (state) => {
            if (state.b1 === "were" && state.b2 === "would invest" && state.b3 === "would be") {
              return { pass: true, msg: "¡Impecable! 'If I were the CEO, I would invest..., and our team would be happier.' Segundo condicional dominado con maestría." };
            }
            return { pass: false, msg: "Revisa la fórmula: 'If I were...' (subjuntivo/pasado formal), seguido de 'would' + verbo base en las consecuencias." };
          }
        }
      }
    ]
  },
  {
    unitId: 7,
    title: "Unidad 7: Modales & Matices",
    level: "B1-B2 Intermedio",
    badge: {
      id: "badge_nuance",
      icon: "🎯",
      name: "Nuance & Modals Master",
      desc: "Manejas la cortesía, deducción lógica y consejos como un hablante fluido."
    },
    externalPractice: {
      provider: "British Council Grammar Masterclass",
      badge: "Modales en Acción",
      title: "Matices de Modales: Permiso, Obligación y Deducción",
      url: "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modal-verbs",
      description: "Aprende la diferencia psicológica entre decir 'You must do it' (orden autoritaria) vs 'You have to do it' (requisito externo) vs 'You should do it' (consejo amistoso).",
      tasks: [
        "Escucha 4 diálogos en entornos de oficina y anota los modales de cortesía utilizados.",
        "Aprende cómo usar 'could', 'may' y 'might' para sonar diplomático en negociaciones.",
        "Realiza el test de deducción lógica con 'must be' vs 'can't be'."
      ],
      recommendedMetric: "90% de precisión en escenarios de obligación vs prohibición."
    },
    lessons: [
      {
        n: 19,
        title: "Habilidad, Permiso y Cortesía: Can, Could y Be able to",
        unit: 7,
        level: "B1",
        p1: "Los **verbos modales** son auxiliares especiales que modifican el significado del verbo principal. Tienen características únicas: **1.** No llevan '-s' en tercera persona (*'he can'*, jamás *'he cans'*); **2.** Van seguidos de un infinitivo sin 'to' (*'I can swim'*, nunca *'I can to swim'*); y **3.** No usan 'do/does/did' para preguntas o negaciones (*'Can you help me?'*).",
        p2: "**CAN** expresa habilidad general en presente (*'I can speak English'*) y peticiones informales (*'Can I borrow your pen?'*). **COULD** es el pasado de can (*'When I was young, I could run fast'*) pero también la forma reina de la **cortesía diplomática** en el presente (*'Could you please send me the file?'*). Como 'can' no tiene futuro ni presente perfecto, usamos la alternativa perifrástica **BE ABLE TO** (*'I will be able to attend'*, *'I have been able to solve it'*).",
        audioSentences: [
          { en: "Could you please clarify that point for the team?", ipa: "/kʊd juː pliːz ˈklærəfaɪ ðæt pɔɪnt fər ðə tiːm/", es: "¿Podría por favor aclarar ese punto para el equipo?" },
          { en: "I can understand spoken English, but speaking is harder.", ipa: "/aɪ kæn ˌʌndərˈstænd ˈspoʊkən ˈɪŋɡlɪʃ bʌt ˈspiːkɪŋ ɪz ˈhɑːrdər/", es: "Puedo entender el inglés hablado, pero hablar es más difícil." },
          { en: "We will be able to launch the product next month.", ipa: "/wiː wɪl bi ˈeɪbl tuː lɔːntʃ ðə ˈprɑːdʌkt nɛkst mʌnθ/", es: "Podremos lanzar el producto el próximo mes." }
        ,
          { en: "I have known my best friend since childhood.", ipa: "/aɪ hæv noʊn maɪ bɛst frɛnd sɪns ˈtʃaɪldhʊd/", es: "Conozco a mi mejor amigo desde la infancia." },
          { en: "Has the team finished the presentation yet?", ipa: "/hæz ðə tiːm ˈfɪnɪʃt ðə ˌprɛzənˈteɪʃən jɛt/", es: "¿El equipo ya terminó la presentación?" }
        ],
        takeaways: [
          "Los modales nunca llevan 's' en 3ª persona ni usan 'to' con el verbo siguiente.",
          "'Could' es mucho más educado y profesional que 'Can' para pedir favores o hacer solicitudes.",
          "Para expresar habilidad en futuro usa 'will be able to', ya que 'will can' es un error inexistente."
        ],
        instructions: [
          "Ordena las palabras para redactar una solicitud formal y respetuosa en un email de trabajo.",
          "La frase debe significar: '¿Podría enviarme los documentos actualizados, por favor?'",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Inicia con el modal de cortesía: Could you please send me...",
        quiz: {
          q: "¿Cuál es la forma gramaticalmente correcta de expresar habilidad en el futuro ('Podré terminar mañana')?",
          opts: [
            "I will can finish tomorrow.",
            "I will be able to finish tomorrow.",
            "I can will finish tomorrow.",
            "I will to be able finish tomorrow."
          ],
          correct: 1,
          fb: "¡Exacto! 'Can' no tiene forma de futuro con 'will'; se debe utilizar obligatoriamente la perífrasis 'will be able to'."
        },
        exercise: {
          audioText: "Could you please send me the updated documents?",
          type: "sequence_sort",
          title: "Constructor de Cortesía Profesional",
          items: [
            { id: "w1", text: "Could" },
            { id: "w2", text: "you" },
            { id: "w3", text: "please" },
            { id: "w4", text: "send" },
            { id: "w5", text: "me" },
            { id: "w6", text: "the" },
            { id: "w7", text: "updated" },
            { id: "w8", text: "documents?" }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Excelente! 'Could you please send me the updated documents?' es el epítome de la cortesía profesional." };
            }
            return { pass: false, msg: "Revisa el orden: Could + you + please + send + me + the + updated + documents?" };
          }
        }
      },
      {
        n: 20,
        title: "Obligación, Prohibición y Consejo: Must, Have to, Should",
        unit: 7,
        level: "B1",
        p1: "La diferencia entre estos tres modales es una de las más ricas del inglés: **SHOULD** se usa para dar **consejos, recomendaciones u opiniones morales** (*'You should get some sleep'*, *'You shouldn't work so hard'*). Es una sugerencia amistosa, no una orden.",
        p2: "Para obligación firme usamos **MUST** y **HAVE TO**: *Must* denota una obligación interna o personal (*'I must finish this today'*), mientras que *Have to* expresa una obligación externa o norma impuesta por la ley o la empresa (*'You have to wear a seatbelt'*). Pero ¡CUIDADO con las negaciones!: **DON'T HAVE TO** significa que **no es necesario** (tienes la opción libre: *'You don't have to come if you are tired'*), mientras que **MUSTN'T** significa **prohibición estricta** (*'You mustn't smoke here'*).",
        audioSentences: [
          { en: "You don't have to pay now; it's completely free.", ipa: "/juː doʊnt hæv tuː peɪ naʊ ɪts kəmˈpliːtli friː/", es: "No tienes que pagar ahora; es completamente gratis." },
          { en: "You mustn't share this confidential password.", ipa: "/juː ˈmʌsnt ʃer ðɪs ˌkɑːnfɪˈdɛnʃl ˈpæswɜːrd/", es: "No debes compartir esta contraseña confidencial (prohibido)." },
          { en: "You should practice your speaking with a native.", ipa: "/juː ʃʊd ˈpræktɪs jʊər ˈspiːkɪŋ wɪð ə ˈneɪtɪv/", es: "Deberías practicar tu expresión oral con un nativo." }
        ,
          { en: "If I won the lottery, I would travel around the world.", ipa: "/ɪf aɪ wʌn ðə ˈlɒtəri aɪ wʊd ˈtrævl əˈraʊnd ðə wɜːrld/", es: "Si ganara la lotería, viajaría por todo el mundo." },
          { en: "If she had more free time, she would take up painting.", ipa: "/ɪf ʃiː hæd mɔːr friː taɪm ʃiː wʊd teɪk ʌp ˈpeɪntɪŋ/", es: "Si ella tuviera más tiempo libre, empezaría a pintar." }
        ],
        takeaways: [
          "Should = Consejo amistoso ('You should rest').",
          "Don't have to = Falta de obligación / Opcional ('No tienes que hacerlo si no quieres').",
          "Mustn't = Prohibición estricta ('Está prohibido terminantemente hacerlo')."
        ],
        instructions: [
          "Clasifica los 4 enunciados según expresen 'Consejo (Should)', 'Prohibición Estricta (Mustn't)' o 'Sin Obligación / Opcional (Don't have to)'.",
          "Lee atentamente el impacto legal o de libertad en cada caso.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Don't have to = tienes la opción; Mustn't = no tienes opción, está prohibido.",
        quiz: {
          q: "Si en el museo la entrada es gratuita los domingos, ¿cuál es la frase adecuada para comunicárselo a un amigo?",
          opts: [
            "You mustn't buy a ticket today.",
            "You shouldn't buy a ticket today.",
            "You don't have to buy a ticket today.",
            "You haven't to buy a ticket today."
          ],
          correct: 2,
          fb: "¡Exacto! 'You don't have to buy a ticket' significa que no es necesario (no hay obligación). 'Mustn't' significaría absurdamente que está penado o prohibido por ley comprarlo."
        },
        exercise: {
          audioText: "You mustn't touch the electrical cables. It is lethal. Tomorrow is Sunday, so I don't have to wake up early. You look exhausted; you should take a short break. You mustn't take photos inside the embassy.",
          type: "classification_bins",
          title: "Auditoría de Modales: ¿Obligación, Prohibición o Consejo?",
          categories: [
            { id: "advice", title: "Consejo / Recomendación (Should)" },
            { id: "prohibition", title: "Prohibición Estricta (Mustn't)" },
            { id: "optional", title: "Sin Obligación / Opcional (Don't have to)" }
          ],
          items: [
            { id: "m1", text: "You (mustn't) touch the electrical cables. It is lethal.", target: "prohibition" },
            { id: "m2", text: "Tomorrow is Sunday, so I (don't have to) wake up early.", target: "optional" },
            { id: "m3", text: "You look exhausted; you (should) take a short break.", target: "advice" },
            { id: "m4", text: "You (mustn't) take photos inside the embassy.", target: "prohibition" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica los 4 casos antes de evaluar." };
            const errors = keys.filter(k => {
              const it = [{id:"m1",target:"prohibition"},{id:"m2",target:"optional"},{id:"m3",target:"advice"},{id:"m4",target:"prohibition"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Matices perfectos! Has distinguido con nitidez entre prohibición (mustn't), libertad/opcionalidad (don't have to) y consejo (should)." };
            return { pass: false, msg: `Hay ${errors.length} errores. Revisa la gran diferencia entre prohibido y no obligatorio.` };
          }
        }
      },
      {
        n: 21,
        title: "Deducción Lógica y Certeza: Must be, Can't be, Might / May",
        unit: 7,
        level: "B1-B2",
        p1: "Los modales también sirven para expresar **qué tan seguros estamos de una conclusión lógica**: cuando estamos 95% seguros de que algo es verdad basándonos en evidencia contundente, usamos **MUST BE** (*'He has three sports cars; he must be rich'*). En este contexto, 'must' no significa obligación, sino **deducción de certeza absoluta**.",
        p2: "Por el contrario, cuando estamos 95% seguros de que algo es **imposible**, usamos **CAN'T BE** (*'That can't be John; he is currently in Japan'* — ¡NUNCA digas *'mustn't be'* para deducción negativa!). Y si no estamos seguros y algo es solo una posibilidad (alrededor del 40-50%), usamos **MIGHT** o **MAY** (*'Take an umbrella; it might rain later'*).",
        audioSentences: [
          { en: "The lights are on in his office; he must be working.", ipa: "/ðə laɪts ɑːr ɑːn ɪn hɪz ˈɔːfɪs hiː mʌst bi ˈwɜːrkɪŋ/", es: "Las luces están encendidas en su oficina; debe estar trabajando." },
          { en: "That can't be true! It makes no sense at all.", ipa: "/ðæt kænt bi truː ɪt meɪks noʊ sɛns æt ɔːl/", es: "¡Eso no puede ser verdad! No tiene ningún sentido." },
          { en: "We might see an increase in sales next quarter.", ipa: "/wiː maɪt siː ən ˈɪnkriːs ɪn seɪlz nɛkst ˈkwɔːrtər/", es: "Podríamos ver un aumento en las ventas el próximo trimestre." }
        ,
          { en: "You must turn off your mobile devices during takeoff.", ipa: "/juː mʌst tɜːrn ɔːf jɔːr ˈmoʊbl dɪˈvaɪsɪz ˈdjʊərɪŋ ˈteɪkˌɔːf/", es: "Debes apagar tus dispositivos móviles durante el despegue." },
          { en: "You should get plenty of sleep before the big interview.", ipa: "/juː ʃʊd ɡɛt ˈplɛnti əv sliːp bɪˈfɔːr ðə bɪɡ ˈɪntərvjuː/", es: "Deberías dormir bien antes de la gran entrevista." }
        ],
        takeaways: [
          "Must be = Certeza lógica positiva ('Debe de ser...').",
          "Can't be = Certeza lógica de imposibilidad ('No puede ser...'). Jamás uses 'mustn't be' para deducir.",
          "Might / May = Posibilidad abierta ('Quizá / Podría ser')."
        ],
        instructions: [
          "Completa las 3 deducciones lógicas según la evidencia aportada.",
          "Elige entre 'must be' (seguro que sí), 'can't be' (seguro que no) o 'might be' (tal vez).",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Si una persona acaba de correr 42 kilómetros, 'must be' exhausta. Si alguien vive en Tokio, 'can't be' en Nueva York ahora mismo.",
        quiz: {
          q: "Ves a alguien que se parece a tu amigo Pedro, pero sabes a ciencia cierta que Pedro está de viaje en Australia. ¿Qué dices en inglés nativo?",
          opts: [
            "That mustn't be Pedro.",
            "That can't be Pedro.",
            "That shouldn't be Pedro.",
            "That don't have to be Pedro."
          ],
          correct: 1,
          fb: "¡Exacto! Para expresar que algo es lógicamente imposible se usa estrictamente 'can't be' (*That can't be Pedro*). El uso de 'mustn't be' para deducción es un error típico."
        },
        exercise: {
          audioText: "He has worked 16 hours today; he must be exhausted. That bill is $500; it can't be correct for just two coffees! Check it; they might have made a mistake.",
          type: "fill_blanks",
          title: "Laboratorio de Deducción Lógica",
          sentence: "He has worked 16 hours today; he ___ (must be / can't be) exhausted. That bill is $500; it ___ (can't be / must be) correct for just two coffees! Check it; they ___ (might have / must have) made a mistake.",
          blanks: [
            { id: "b1", placeholder: "Cansancio...", options: ["must be", "can't be", "might be"], answer: "must be" },
            { id: "b2", placeholder: "Cuenta absurda...", options: ["can't be", "must be", "might be"], answer: "can't be" },
            { id: "b3", placeholder: "Posible error...", options: ["might have", "can't have", "must not"], answer: "might have" }
          ],
          evaluator: (state) => {
            if (state.b1 === "must be" && state.b2 === "can't be" && state.b3 === "might have") {
              return { pass: true, msg: "¡Deducción detectivesca impecable! 'Must be exhausted', 'can't be correct', 'might have made a mistake'. Dominio de la certeza lógica." };
            }
            return { pass: false, msg: "Revisa las certezas: 16 horas = 'must be' cansado; 500 dólares por 2 cafés = 'can't be' correcto; posibilidad = 'might have'." };
          }
        }
      }
    ]
  },
  {
    unitId: 8,
    title: "Unidad 8: Conexión & Experiencias",
    level: "B1-B2 Intermedio Superior",
    badge: {
      id: "badge_connector",
      icon: "🌟",
      name: "Experience Connector",
      desc: "Conectas el pasado con el presente mediante el Presente Perfecto."
    },
    externalPractice: {
      provider: "Cambridge English Grammar Track",
      badge: "Tiempos Compuestos",
      title: "Present Perfect vs Past Simple: La Línea del Tiempo",
      url: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/b1g003-present-perfect-and-past-simple",
      description: "Visualizador de línea temporal para entender por qué decir 'I have lived in London for 3 years' significa que todavía vives allí, pero 'I lived in London for 3 years' significa que ya te fuiste.",
      tasks: [
        "Resuelve 15 ejercicios identificando marcadores temporales terminados (yesterday, in 2020) vs abiertos (this week, so far).",
        "Practica responder preguntas con 'Have you ever...?' en voz alta.",
        "Escribe un breve resumen de tus logros profesionales usando Present Perfect."
      ],
      recommendedMetric: "100% de aciertos diferenciando 'For' (duración) y 'Since' (punto de inicio)."
    },
    lessons: [
      {
        n: 22,
        title: "Presente Perfecto: Estructura con Have/Has y Participio Pasado",
        unit: 8,
        level: "B1-B2",
        p1: "El **Present Perfect** es el puente mágico entre el pasado y el presente. Se forma con el auxiliar **HAVE / HAS** seguido del **Past Participle (Participio Pasado)** del verbo (*worked, seen, eaten, done*). En tercera persona singular usamos **HAS** (*'She has lived here'*), y las contracciones son cotidianas: **I've, you've, he's, she's, we've, they've**.",
        p2: "Su uso principal es para **experiencias de vida donde el momento exacto no importa** (*'I have visited Japan'* — lo importante es la experiencia acumulada, no la fecha) o para **acciones pasadas que tienen un resultado visible e impactante en el presente** (*'I have lost my keys'* — la consecuencia es que ahora mismo no puedo entrar a mi casa). Si mencionas la fecha exacta (*yesterday, in 2019, last week*), el Present Perfect queda terminantemente prohibido.",
        audioSentences: [
          { en: "I have worked with international clients for five years.", ipa: "/aɪ hæv wɜːrkt wɪð ˌɪntərˈnæʃnəl ˈklaɪənts fər faɪv jɪərz/", es: "He trabajado con clientes internacionales durante cinco años." },
          { en: "She has already published three scientific papers.", ipa: "/ʃiː hæz ɔːlˈrɛdi ˈpʌblɪʃt θriː ˌsaɪənˈtɪfɪk ˈpeɪpərz/", es: "Ella ya ha publicado tres artículos científicos." },
          { en: "Have you ever traveled to another continent?", ipa: "/hæv juː ˈɛvər ˈtrævld tuː əˈnʌðər ˈkɑːntɪnənt/", es: "¿Alguna vez has viajado a otro continente?" }
        ,
          { en: "Penicillin was discovered by Alexander Fleming in 1928.", ipa: "/ˌpɛnəˈsɪlɪn wəz dɪˈskʌvərd baɪ ˌælɪɡˈzændər ˈflɛmɪŋ ɪn ˈnaɪnˈtiːn ˈtwɛnti eɪt/", es: "La penicilina fue descubierta por Alexander Fleming en 1928." },
          { en: "Millions of emails are sent across the globe every minute.", ipa: "/ˈmɪljənz əv ˈiːmeɪlz ɑːr sɛnt əˈkrɒs ðə ɡloʊb ˈɛvri ˈmɪnɪt/", es: "Millones de correos son enviados en todo el planeta cada minuto." }
        ],
        takeaways: [
          "Fórmula: Sujeto + have/has + Participio Pasado (3ª columna de la tabla de verbos).",
          "Úsalo para experiencias de vida y acciones pasadas con impacto directo en el presente.",
          "Si especificas cuándo ocurrió (ej. 'yesterday'), debes usar Pasado Simple, NO Presente Perfecto."
        ],
        instructions: [
          "Ordena las palabras para formar una frase que exprese experiencia laboral en Presente Perfecto.",
          "La frase debe significar: 'He gestionado proyectos grandes en mi carrera.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Estructura: I have managed + large projects + in my career.",
        quiz: {
          q: "¿Cuál de las siguientes oraciones utiliza el Presente Perfecto de manera gramaticalmente correcta?",
          opts: [
            "I have seen that movie yesterday night.",
            "I have seen that movie three times in my life.",
            "I have saw that movie three times in my life.",
            "She have seen that movie three times."
          ],
          correct: 1,
          fb: "¡Exacto! 'I have seen that movie three times in my life' expresa una experiencia de vida acumulada sin fecha cerrada y usa el participio correcto 'seen'."
        },
        exercise: {
          audioText: "I have managed large projects in my career.",
          type: "sequence_sort",
          title: "Constructor de Experiencia: Presente Perfecto",
          items: [
            { id: "w1", text: "I" },
            { id: "w2", text: "have" },
            { id: "w3", text: "managed" },
            { id: "w4", text: "large" },
            { id: "w5", text: "projects" },
            { id: "w6", text: "in" },
            { id: "w7", text: "my" },
            { id: "w8", text: "career." }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Excelente! 'I have managed large projects in my career.' Sintaxis perfecta con 'have' + participio 'managed'." };
            }
            return { pass: false, msg: "Orden incorrecto. Recuerda: Sujeto (I) + have + Participio (managed) + Objeto (large projects) + Complemento." };
          }
        }
      },
      {
        n: 23,
        title: "Palabras Clave: Ever, Never, Already, Yet, Just",
        unit: 8,
        level: "B1-B2",
        p1: "El Present Perfect cobra vida gracias a sus adverbios temporales: **EVER** significa 'alguna vez en la vida' y se usa en preguntas (*'Have you ever tasted sushi?'*). **NEVER** significa 'nunca en la vida' y va en oraciones afirmativas con significado negativo (*'I have never been to London'*). Ambos se colocan **entre el auxiliar have y el participio**.",
        p2: "**JUST** expresa algo que ocurrió hace solo unos segundos (*'I have just received your email'*). **ALREADY** significa 'ya' (antes de lo esperado) y va antes del participio (*'I have already eaten'*). Y **YET** significa 'todavía no' en negaciones (*'I haven't finished yet'*) o 'ya' en preguntas (*'Have you eaten yet?'*), y **SIEMPRE va al final de la oración**.",
        audioSentences: [
          { en: "Have you ever spoken with a native speaker?", ipa: "/hæv juː ˈɛvər ˈspoʊkən wɪð ə ˈneɪtɪv ˈspiːkər/", es: "¿Alguna vez has hablado con un nativo?" },
          { en: "I have just sent you the link, check your inbox.", ipa: "/aɪ hæv dʒʌst sɛnt juː ðə lɪŋk tʃɛk jʊər ˈɪnbɑːks/", es: "Acabo de enviarte el enlace, revisa tu bandeja de entrada." },
          { en: "We haven't received the approval yet.", ipa: "/wiː ˈhævnt rɪˈsiːvd ði əˈpruːvl jɛt/", es: "No hemos recibido la aprobación todavía." }
        ,
          { en: "The mentor who guided me throughout my career retired today.", ipa: "/ðə ˈmɛntɔːr huː ˈɡaɪdɪd miː θruːˈaʊt maɪ kəˈrɪr rɪˈtaɪərd təˈdeɪ/", es: "El mentor que me guió a lo largo de mi carrera se jubiló hoy." },
          { en: "This is the company where my brother works as a designer.", ipa: "/ðɪs ɪz ðə ˈkʌmpəni wɛr maɪ ˈbrʌðər wɜːrks æz ə dɪˈzaɪnər/", es: "Esta es la empresa donde mi hermano trabaja como diseñador." }
        ],
        takeaways: [
          "EVER = en preguntas ('Have you ever...?'); NEVER = nunca en la vida ('I have never...').",
          "JUST = hace unos segundos ('I have just arrived').",
          "YET = en negaciones y preguntas, SIEMPRE al final de la frase ('not yet', 'finished yet?')."
        ],
        instructions: [
          "Ubica cada marcador (Ever, Never, Already, Yet) en el contexto correcto.",
          "Presta atención a si se trata de una pregunta, negación o algo recién ocurrido.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Yet va al final de negaciones/preguntas; Just/Already/Ever/Never van entre have y el participio.",
        quiz: {
          q: "¿Cuál de las siguientes frases ubica el adverbio 'yet' de forma natural y gramaticalmente correcta?",
          opts: [
            "I haven't yet finished the presentation.",
            "I haven't finished the presentation yet.",
            "I yet haven't finished the presentation.",
            "Yet I haven't finished the presentation."
          ],
          correct: 1,
          fb: "¡Correcto! En inglés estándar, 'yet' se coloca invariablemente al final de la oración negativa (*I haven't finished the presentation yet*)."
        },
        exercise: {
          audioText: "Have you ever seen this error before? No, I have never seen it, but our lead engineer has just resolved it, though he hasn't deployed the fix yet.",
          type: "fill_blanks",
          title: "Laboratorio de Marcadores Temporales",
          sentence: "Have you ___ (ever/never) seen this error before? - No, I have ___ (never/ever) seen it, but our lead engineer has ___ (just/yet) resolved it, though he hasn't deployed the fix ___ (yet/already).",
          blanks: [
            { id: "b1", placeholder: "En la pregunta...", options: ["ever", "never", "already"], answer: "ever" },
            { id: "b2", placeholder: "Nunca en la vida...", options: ["never", "ever", "yet"], answer: "never" },
            { id: "b3", placeholder: "Recién ocurrido...", options: ["just", "yet", "ever"], answer: "just" },
            { id: "b4", placeholder: "Al final de la negación...", options: ["yet", "already", "never"], answer: "yet" }
          ],
          evaluator: (state) => {
            if (state.b1 === "ever" && state.b2 === "never" && state.b3 === "just" && state.b4 === "yet") {
              return { pass: true, msg: "¡Dominio total de marcadores! 'Have you ever...', 'I have never...', 'has just resolved it...', 'hasn't deployed it yet.' ¡Extraordinario!" };
            }
            return { pass: false, msg: "Revisa la ubicación: Pregunta de experiencia = ever; Negación vital = never; Acción recién hecha = just; Final de cláusula negativa = yet." };
          }
        }
      },
      {
        n: 24,
        title: "Presente Perfecto vs Pasado Simple: Cuándo usar cuál y For vs Since",
        unit: 8,
        level: "B1-B2",
        p1: "Este es el dilema supremo de los estudiantes de nivel intermedio: ¿Cuándo usar Pasado Simple y cuándo Presente Perfecto? La regla es tajante: si el periodo de tiempo **ya terminó por completo** (palabras como *yesterday, in 2021, last year, two days ago, when I was a child*), usa obligatoriamente **Past Simple** (*'I visited Paris in 2018'*). Si el periodo sigue abierto o no se especifica fecha, usa **Present Perfect** (*'I have visited Paris'*).",
        p2: "Para expresar duración hasta el presente usamos **FOR** y **SINCE**: **FOR** expresa un **lapso o cantidad de tiempo acumulado** (*for 3 years, for two weeks, for a long time*); mientras que **SINCE** indica el **punto exacto de inicio en el calendario** (*since 2020, since Monday, since I graduated*). Compara: *'I have lived here for 10 years'* (¡aún vivo aquí!) vs *'I lived here for 10 years'* (ya me mudé a otro lugar).",
        audioSentences: [
          { en: "I have lived in this city since 2019.", ipa: "/aɪ hæv lɪvd ɪn ðɪs ˈsɪti sɪns ˈtwɛnti ˈnaɪntiːn/", es: "He vivido en esta ciudad desde 2019 (todavía vivo aquí)." },
          { en: "I lived in Boston for two years when I was in college.", ipa: "/aɪ lɪvd ɪn ˈbɔːstən fər tuː jɪərz wɛn aɪ wəz ɪn ˈkɑːlɪdʒ/", es: "Viví en Boston por dos años cuando estaba en la universidad (ya no vivo allí)." },
          { en: "We have worked together for five months.", ipa: "/wiː hæv wɜːrkt təˈɡɛðər fər faɪv mʌnθs/", es: "Hemos trabajado juntos durante cinco meses." }
        ,
          { en: "If I had known you were in town, I would have invited you.", ipa: "/ɪf aɪ hæd noʊn juː wɜːr ɪn taʊn aɪ wʊd hæv ɪnˈvaɪtɪd juː/", es: "Si hubiera sabido que estabas en la ciudad, te habría invitado." },
          { en: "She wouldn't have missed the flight if she had set an alarm.", ipa: "/ʃiː ˈwʊdnt hæv mɪst ðə flaɪt ɪf ʃiː hæd sɛt æn əˈlɑːrm/", es: "Ella no habría perdido el vuelo si hubiera puesto una alarma." }
        ],
        takeaways: [
          "Si hay fecha cerrada (yesterday, in 2015, ago) -> Pasado Simple obligatorio.",
          "FOR = duración o cantidad de tiempo ('for 5 days'); SINCE = punto de inicio ('since March').",
          "Present Perfect con 'for' significa que la acción continúa hoy; Past Simple con 'for' significa que ya concluyó."
        ],
        instructions: [
          "Asigna cada caso a 'Present Perfect (Acción continua / Periodo abierto)' o 'Past Simple (Acción y tiempo terminados)'.",
          "Presta atención a los marcadores de tiempo cerrados.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Palabras como 'yesterday' o 'last year' amarran la acción al pasado cerrado (Past Simple).",
        quiz: {
          q: "¿Cuál de las siguientes dos oraciones implica que la persona TODAVÍA trabaja en Microsoft en el presente?",
          opts: [
            "She worked at Microsoft for five years.",
            "She has worked at Microsoft for five years.",
            "She had worked at Microsoft for five years.",
            "She was working at Microsoft for five years."
          ],
          correct: 1,
          fb: "¡Exacto! 'She has worked at Microsoft for five years' (Present Perfect) conecta el pasado con el presente y significa que ella aún trabaja allí hoy."
        },
        exercise: {
          audioText: "I graduated from university in 2021. We have known each other since high school. They moved to Canada two years ago. She has written three novels so far.",
          type: "classification_bins",
          title: "El Gran Duelo: ¿Past Simple o Present Perfect?",
          categories: [
            { id: "past_simple", title: "Past Simple (Tiempo cerrado / Acción concluida)" },
            { id: "present_perfect", title: "Present Perfect (Periodo abierto / Continúa hoy)" }
          ],
          items: [
            { id: "t1", text: "I (graduated) from university in 2021.", target: "past_simple" },
            { id: "t2", text: "We (have known) each other since high school.", target: "present_perfect" },
            { id: "t3", text: "They (moved) to Canada two years ago.", target: "past_simple" },
            { id: "t4", text: "She (has written) three novels so far.", target: "present_perfect" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica las 4 oraciones antes de validar." };
            const errors = keys.filter(k => {
              const it = [{id:"t1",target:"past_simple"},{id:"t2",target:"present_perfect"},{id:"t3",target:"past_simple"},{id:"t4",target:"present_perfect"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Comprensión temporal perfecta! 'In 2021' y 'Two years ago' son tiempos cerrados (Past Simple); 'Since' y 'So far' conectan con el presente (Present Perfect)." };
            return { pass: false, msg: `Hay ${errors.length} errores. Recuerda: fechas específicas pasadas exigen Past Simple.` };
          }
        }
      }
    ]
  },
  {
    unitId: 9,
    title: "Unidad 9: Fluidez Real & Negocios",
    level: "B2 Avanzado / Profesional",
    badge: {
      id: "badge_professional",
      icon: "🏆",
      name: "Bilingual Professional",
      desc: "Dominas phrasal verbs, etiqueta laboral y erradicaste falsos amigos."
    },
    externalPractice: {
      provider: "Harvard Business Review & TED Talks",
      badge: "Inglés de Impacto",
      title: "Comunicación Ejecutiva, Negociaciones y Phrasal Verbs",
      url: "https://www.ted.com/talks",
      description: "Aprende el lenguaje de liderazgo, asertividad diplomática y negociación que usan directores y profesionales en entornos globales.",
      tasks: [
        "Mira una charla TED con subtítulos en inglés y anota 5 'phrasal verbs' utilizados en contexto.",
        "Escribe un correo formal de seguimiento a un cliente ficticio usando fórmulas de cortesía.",
        "Revisa la lista de los 25 'False Friends' más peligrosos para hispanohablantes en los negocios."
      ],
      recommendedMetric: "Identificar y reemplazar falsos amigos en un email corporativo."
    },
    lessons: [
      {
        n: 25,
        title: "Phrasal Verbs Esenciales del Trabajo y Día a Día",
        unit: 9,
        level: "B2",
        p1: "Los **Phrasal Verbs** son la verdadera frontera de la fluidez nativa. Consisten en la unión de un **verbo + una o dos partículas (preposiciones o adverbios)** que alteran por completo su significado literal. Por ejemplo, *look* es mirar, pero **look forward to** significa *'esperar con ansias y emoción'*, **look into** significa *'investigar un problema'* y **look after** significa *'cuidar a alguien'*.",
        p2: "En el mundo laboral y tecnológico los phrasal verbs son omnipresentes: **call off** (cancelar una reunión), **figure out** (descubrir cómo resolver algo), **carry out** (llevar a cabo una tarea o experimento), **give up** (rendirse), **run out of** (quedarse sin suministros o tiempo) y **point out** (señalar o resaltar un dato). Si usas phrasal verbs con naturalidad en tus reuniones, sonarás como un profesional experimentado y no como un libro de texto.",
        audioSentences: [
          { en: "I am looking forward to our meeting tomorrow.", ipa: "/aɪ æm ˈlʊkɪŋ ˈfɔːrwərd tuː ˈaʊər ˈmiːtɪŋ təˈmɑːroʊ/", es: "Espero con ansias nuestra reunión de mañana." },
          { en: "We need to figure out why the server crashed.", ipa: "/wiː niːd tuː ˈfɪɡjər aʊt waɪ ðə ˈsɜːrvər kræʃt/", es: "Necesitamos descifrar por qué se cayó el servidor." },
          { en: "They had to call off the event due to bad weather.", ipa: "/ðeɪ hæd tuː kɔːl ɔːf ði ɪˈvɛnt duː tuː bæd ˈwɛðər/", es: "Tuvieron que cancelar el evento debido al mal clima." }
        ,
          { en: "Please don't give up on your dreams, keep moving forward.", ipa: "/pliːz doʊnt ɡɪv ʌp ɒn jɔːr driːmz kiːp ˈmuːvɪŋ ˈfɔːrwərd/", es: "Por favor no te rindas con tus sueños, sigue avanzando." },
          { en: "I ran into an old classmate while shopping at the market.", ipa: "/aɪ ræn ˈɪntuː æn oʊld ˈklæsmeɪt waɪl ˈʃɒpɪŋ æt ðə ˈmɑːrkɪt/", es: "Me topé con un viejo compañero mientras compraba en el mercado." }
        ],
        takeaways: [
          "Un Phrasal Verb tiene un significado figurado que no se puede traducir palabra por palabra.",
          "Esenciales en el trabajo: 'look forward to' (esperar con gusto), 'call off' (cancelar), 'figure out' (resolver).",
          "Aprende los phrasal verbs dentro de oraciones completas, nunca en listas aisladas."
        ],
        instructions: [
          "Une cada Phrasal Verb en inglés con su significado equivalente en español.",
          "Revisa con atención el significado contextual.",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Call off = cancelar; Figure out = resolver/descifrar; Look forward to = esperar con entusiasmo.",
        quiz: {
          q: "¿Qué significa la frase 'We have run out of time, so we must call off today's sync'?",
          opts: [
            "Tenemos mucho tiempo libre, así que correremos antes de la sincronización.",
            "Nos hemos quedado sin tiempo, por lo que debemos cancelar la reunión de hoy.",
            "Comenzamos a tiempo, así que llamaremos a los participantes de la sincronización.",
            "Corrimos hacia la oficina para atender la reunión de hoy."
          ],
          correct: 1,
          fb: "¡Exacto! 'Run out of time' significa quedarse sin tiempo, y 'call off' significa cancelar."
        },
        exercise: {
          audioText: "Figure out the root cause. Look forward to hearing from you. Call off the client demo. Look into the database issue.",
          type: "classification_bins",
          title: "Auditoría de Phrasal Verbs Profesionales",
          categories: [
            { id: "resolver", title: "Descifrar / Investigar / Resolver" },
            { id: "cancelar", title: "Cancelar / Suspender" },
            { id: "entusiasmo", title: "Esperar con agrado / Emoción" }
          ],
          items: [
            { id: "p1", text: "Figure out the root cause", target: "resolver" },
            { id: "p2", text: "Look forward to hearing from you", target: "entusiasmo" },
            { id: "p3", text: "Call off the client demo", target: "cancelar" },
            { id: "p4", text: "Look into the database issue", target: "resolver" }
          ],
          evaluator: (state) => {
            const keys = Object.keys(state || {});
            if (keys.length < 4) return { pass: false, msg: "Clasifica los 4 Phrasal Verbs antes de validar." };
            const errors = keys.filter(k => {
              const it = [{id:"p1",target:"resolver"},{id:"p2",target:"entusiasmo"},{id:"p3",target:"cancelar"},{id:"p4",target:"resolver"}].find(x=>x.id===k);
              return it && it.target !== state[k];
            });
            if (errors.length === 0) return { pass: true, msg: "¡Dominio nativo de Phrasal Verbs! Has asociado con exactitud sus significados y contextos de negocio." };
            return { pass: false, msg: `Hay ${errors.length} errores. Recuerda: Call off = cancelar; Look into = investigar/resolver.` };
          }
        }
      },
      {
        n: 26,
        title: "Inglés Profesional: Redacción de Emails, Reuniones y Cortesía",
        unit: 9,
        level: "B2",
        p1: "En la cultura corporativa anglosajona, la **cortesía indirecta y la asertividad diplomática** son fundamentales. En español solemos ser más directos ('Necesito que me envíes el archivo hoy'), pero traducir eso literalmente (*'I need you to send me the file today'*) suena agresivo, demandante y descortés. En su lugar, suavizamos con condicionales y fórmulas de cortesía: **'Would you mind sending me the file when you get a chance?'**.",
        p2: "Estructuras imprescindibles para redactar emails de alto impacto: **Apertura:** *'I hope this email finds you well'* o *'I am writing to follow up on our discussion'*. **Peticiones amables:** *'Could you please provide an update on...'* o *'Would it be possible to schedule a quick call?'*. **Cierre profesional:** *'Please let me know if you have any questions'*, *'Best regards'* o *'Sincerely'*.",
        audioSentences: [
          { en: "I hope this email finds you well. I'm following up on our project.", ipa: "/aɪ hoʊp ðɪs ˈiːmeɪl faɪndz juː wɛl aɪm ˈfɑːloʊɪŋ ʌp ɑːn ˈaʊər ˈprɑːdʒɛkt/", es: "Espero que este correo te encuentre bien. Le hago seguimiento a nuestro proyecto." },
          { en: "Would you mind sending me the latest draft by Friday?", ipa: "/wʊd juː maɪnd ˈsɛndɪŋ miː ðə ˈleɪtɪst dræft baɪ ˈfraɪdeɪ/", es: "¿Te molestaría enviarme el último borrador para el viernes?" },
          { en: "Please let me know if you have any questions or feedback.", ipa: "/pliːz lɛt miː noʊ ɪf juː hæv ˈɛni ˈkwɛstʃənz ɔːr ˈfiːdbæk/", es: "Por favor avísame si tienes alguna pregunta o comentario." }
        ,
          { en: "He mentioned that he had already applied for the scholarship.", ipa: "/hiː ˈmɛnʃənd ðæt hiː hæd ɔːlˈrɛdi əˈplaɪd fər ðə ˈskɒlərʃɪp/", es: "Él mencionó que ya había postulado a la beca." },
          { en: "The teacher asked if everyone had understood the lesson.", ipa: "/ðə ˈtiːtʃər æskt ɪf ˈɛvriwʌn hæd ˌʌndərˈstʊd ðə ˈlɛsn/", es: "El profesor preguntó si todos habían entendido la lección." }
        ],
        takeaways: [
          "Nunca traduzcas órdenes directas: usa 'Would you mind + -ing' o 'Could you possibly...'.",
          "Nota gramatical: después de 'Would you mind...' el verbo va OBLIGATORIAMENTE con -ing ('Would you mind sending...').",
          "Cierra tus correos con 'Best regards' o 'Kind regards', nunca con un seco 'Bye'."
        ],
        instructions: [
          "Ordena las palabras para redactar un inicio de correo profesional impecable.",
          "La frase debe significar: 'Le escribo para hacer seguimiento a nuestra conversación anterior.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Comienza con: I am writing to follow up on our previous conversation.",
        quiz: {
          q: "¿Cuál de las siguientes frases formula una solicitud en un email con el estándar más alto de cortesía profesional?",
          opts: [
            "Send me the invoice right now because I need it.",
            "Would you mind sending me the invoice when you have a moment?",
            "You must to send me the invoice immediately.",
            "I want that you send me the invoice today."
          ],
          correct: 1,
          fb: "¡Exacto! 'Would you mind sending me the invoice when you have a moment?' es diplomática, educada y respeta la regla de 'Would you mind + -ing'."
        },
        exercise: {
          audioText: "I am writing to follow up on our previous conversation.",
          type: "sequence_sort",
          title: "Constructor de Email Ejecutivo",
          items: [
            { id: "w1", text: "I" },
            { id: "w2", text: "am" },
            { id: "w3", text: "writing" },
            { id: "w4", text: "to" },
            { id: "w5", text: "follow up" },
            { id: "w6", text: "on" },
            { id: "w7", text: "our" },
            { id: "w8", text: "previous" },
            { id: "w9", text: "conversation." }
          ],
          correctOrder: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9"],
          evaluator: (state) => {
            const cur = state.order || [];
            const correct = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9"];
            if (JSON.stringify(cur) === JSON.stringify(correct)) {
              return { pass: true, msg: "¡Impecable tono ejecutivo! 'I am writing to follow up on our previous conversation.' Frase clave para cualquier profesional bilingüe." };
            }
            return { pass: false, msg: "Revisa el orden: I am writing to follow up on our previous conversation." };
          }
        }
      },
      {
        n: 27,
        title: "Falsos Amigos (False Friends) y Errores Típicos de Hispanohablantes",
        unit: 9,
        level: "B2",
        p1: "Los **False Friends (Falsos Amigos)** son palabras en inglés que se parecen muchísimo visualmente a palabras en español, pero cuyo significado real es completamente distinto. Caer en estas trampas puede generar malentendidos cómicos o bochornosos en entrevistas y reuniones. Por ejemplo, **actually** NO significa 'actualmente', significa **'en realidad / de hecho'** (para 'actualmente' decimos *currently* o *nowadays*).",
        p2: "Otros falsos amigos críticos: **attend** significa *'asistir a un evento'* (para 'atender a un cliente' se usa *assist* o *help*); **sensible** significa *'sensato o prudente'* (para 'sensible o emotivo' se usa *sensitive*); **library** es una *'biblioteca'* (para 'librería donde compras libros' se dice *bookstore*); **comprehensive** significa *'exhaustivo o completo'* (no 'comprensivo'); y **embarrassed** significa *'avergonzado'* (¡NUNCA 'embarazada', que se dice *pregnant*!).",
        audioSentences: [
          { en: "Actually, I am currently working on a different project.", ipa: "/ˈæktʃuəli aɪ æm ˈkɜːrəntli ˈwɜːrkɪŋ ɑːn ə ˈdɪfrənt ˈprɑːdʒɛkt/", es: "En realidad, actualmente estoy trabajando en un proyecto diferente." },
          { en: "He is a very sensible person who makes smart decisions.", ipa: "/hiː ɪz ə ˈvɛri ˈsɛnsəbl ˈpɜːrsn huː meɪks smɑːrt dɪˈsɪʒnz/", es: "Él es una persona muy sensata que toma decisiones inteligentes." },
          { en: "Did you attend the international conference yesterday?", ipa: "/dɪd juː əˈtɛnd ði ˌɪntərˈnæʃnəl ˈkɑːnfərəns ˈjɛstərdeɪ/", es: "¿Asististe a la conferencia internacional ayer?" }
        ,
          { en: "I'm gonna grab a bite to eat before we leave.", ipa: "/aɪm ˈɡənə ɡræb ə baɪt tuː iːt bɪˈfɔːr wiː liːv/", es: "Voy a comer un bocado rápido antes de que nos vayamos." },
          { en: "What did you say your name was again?", ipa: "/wʌt dɪdʒə seɪ jɔːr neɪm wəz əˈɡɛn/", es: "¿Cómo dijiste que te llamabas de nuevo?" }
        ],
        takeaways: [
          "Actually = 'En realidad' (usa 'currently' para decir 'actualmente').",
          "Attend = 'Asistir a un lugar' (usa 'help/serve' para decir 'atender a alguien').",
          "Sensible = 'Sensato y prudente' (usa 'sensitive' para decir 'sensible/delicado').",
          "Embarrassed = 'Avergonzado' (nunca 'embarazada', que es 'pregnant')."
        ],
        instructions: [
          "Identifica el falso amigo en la oración de negocios propuesta y selecciona la corrección precisa.",
          "El estudiante intentó decir: 'Actualmente, estamos atendiendo a clientes en Europa.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        hint: "Actualmente se traduce como 'currently', y atender clientes se dice 'assisting' o 'serving' clientes.",
        quiz: {
          q: "Si en una reunión internacional quieres decir 'En realidad, la cifra actual de ventas es mayor', ¿cuál es la traducción adecuada?",
          opts: [
            "Currently, the actual sales figure is higher.",
            "Actually, the current sales figure is higher.",
            "Actually, the actual sales figure is higher.",
            "Currently, the currently sales figure is higher."
          ],
          correct: 1,
          fb: "¡Brillante! 'Actually' traduce 'en realidad' y 'current' traduce 'actual' (*Actually, the current sales figure is higher*). ¡La trampa definitiva de falsos amigos superada!"
        },
        exercise: {
          audioText: "I am actually working in this company, and I always assist all the meetings.",
          type: "error_spotter",
          title: "Eliminador de Falsos Amigos: Auditoría Final",
          sentence: "I am actually working in this company, and I always assist all the meetings.",
          errorDescription: "La frase quería decir: 'Actualmente trabajo en esta empresa, y siempre asisto a todas las reuniones.' ¿Cuál es la corrección nativa?",
          options: [
            { id: "o1", text: "I am currently working at this company, and I always attend all the meetings.", correct: true },
            { id: "o2", text: "I am actually working at this company, and I always assist all the meetings.", correct: false },
            { id: "o3", text: "I am currently working in this company, and I always assist all the meetings.", correct: false },
            { id: "o4", text: "I am sensible working in this company, and I always attend all the meetings.", correct: false }
          ],
          evaluator: (state) => {
            if (state.selectedOption === "o1") {
              return { pass: true, msg: "¡FELICITACIONES! Has erradicado los dos falsos amigos más peligrosos: 'currently' para actualmente y 'attend' para asistir a reuniones. ¡Has alcanzado el nivel de Maestro Bilingüe!" };
            }
            return { pass: false, msg: "Cuidado: 'actually' significa 'en realidad' y 'assist' significa ayudar a alguien. Revisa la opción 1." };
          }
        }
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.UNITS = UNITS;
}

