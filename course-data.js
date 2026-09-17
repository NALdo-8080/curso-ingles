/**
 * course-data.js - Fuente de verdad del currículo de Inglés
 * 9 Unidades Temáticas, 27 Lecciones con Teoría, Ejemplos de Audio TTS, Takeaways, Quizzes y Laboratorios Interactivos.
 * Contextualizado con escenarios conversacionales de EnglishConnect 1 y 2.
 */

const UNITS = [
  {
    "unitId": 1,
    "title": "Unidad 1: Fundamentos & Fonética",
    "level": "A1 Principiante",
    "badge": {
      "id": "badge_phonetics",
      "icon": "🎖️",
      "name": "Phonetics Pioneer",
      "desc": "Dominaste la fonética básica, saludos y el verbo To Be."
    },
    "externalPractice": {
      "provider": "BBC Learning English & YouGlish",
      "badge": "Fonética & Pronunciación",
      "title": "Entrena tu Oído con Pronunciación Nativa y Sonidos Reales",
      "url": "https://youglish.com/pronounce/english/english",
      "description": "Escucha a miles de hablantes nativos pronunciar el sonido Schwa /ə/ y las combinaciones 'th' en fragmentos reales de videos de YouTube.",
      "tasks": [
        "Busca palabras como 'about', 'banana' y 'computer' en YouGlish para aislar el sonido schwa /ə/.",
        "Compara la pronunciación de 'thank you' (sorda) vs 'this' (sonora).",
        "Grábate imitando el ritmo y entonación de oraciones cotidianas."
      ],
      "recommendedMetric": "Identificar la sílaba acentuada y relajada en 10 palabras nuevas."
    },
    "lessons": [
      {
        "n": 1,
        "title": "Fonética Básica, Alfabeto y Sonido Schwa /ə/",
        "unit": 1,
        "level": "A1",
        "p1": "El inglés no es un idioma fonético: a diferencia del español, las letras escritas no siempre suenan igual. De hecho, el inglés cuenta con más de 20 sonidos vocálicos distintos a pesar de tener solo 5 letras vocales escritas. El sonido más frecuente e importante de todo el idioma inglés es el **Schwa (/ə/)**: un sonido vocal neutro, relajado y perezoso que aparece casi siempre en las sílabas no acentuadas (como la primera 'a' en *about* o la 'e' en *the*).",
        "p2": "Otro reto crítico para hispanohablantes es la combinación **'th'**, que tiene dos sonidos: el sordo (como en *think* o *three*, poniendo la lengua entre los dientes y soltando solo aire) y el sonoro (como en *this* o *brother*, haciendo vibrar las cuerdas vocales). Si dominas el Schwa y la 'th' desde hoy, tu acento y comprensión auditiva mejorarán un 300%.",
        "audioSentences": [
          {
            "en": "Think about your name and country.",
            "ipa": "/θɪŋk əˈbaʊt jɔːr neɪm ænd ˈkʌntri/",
            "es": "Piensa en tu nombre y tu país."
          },
          {
            "en": "This is my brother, David.",
            "ipa": "/ðɪs ɪz maɪ ˈbrʌðər ˈdeɪvɪd/",
            "es": "Este es mi hermano, David."
          },
          {
            "en": "A pleasure to meet you, teacher.",
            "ipa": "/ə ˈplɛʒər tuː miːt juː ˈtiːtʃər/",
            "es": "Un placer conocerte, profesor."
          },
          {
            "en": "Thank you for the warm welcome.",
            "ipa": "/θæŋk juː fər ðə wɔːrm ˈwɛlkəm/",
            "es": "Gracias por la cálida bienvenida."
          },
          {
            "en": "Together we can learn English.",
            "ipa": "/təˈɡɛðər wiː kæn lɜːrn ˈɪŋɡlɪʃ/",
            "es": "Juntos podemos aprender inglés."
          }
        ],
        "takeaways": [
          "El inglés no se lee como se escribe: las vocales cambian según la acentuación de la palabra.",
          "El sonido Schwa /ə/ es el más común del inglés; suena como un murmullo relajado en sílabas sin acento.",
          "La combinación 'th' tiene dos variantes: sorda (aire puro: 'think') y sonora (vibración: 'that')."
        ],
        "instructions": [
          "Observa las 4 palabras en el área de trabajo.",
          "Clasifica cada palabra según el sonido inicial de 'th': sordo (aire /θ/) o sonoro (vibrante /ð/).",
          "Haz clic en 'Validar y Enviar' para confirmar tu comprensión fonética."
        ],
        "hint": "Coloca tus dedos en la garganta: si al pronunciar 'th' sientes vibración, es sonoro (/ð/ como en *that*); si solo sale aire frío, es sordo (/θ/ como en *thanks*).",
        "quiz": {
          "q": "¿Cuál es el sonido vocálico más común en el idioma inglés y en qué sílabas se encuentra?",
          "opts": [
            "La vocal 'A' larga (/eɪ/), en las sílabas con acento fuerte.",
            "El sonido Schwa (/ə/), en las sílabas no acentuadas y relajadas.",
            "La vocal 'I' cerrada (/iː/), al final de las oraciones interrogativas.",
            "La doble vocal 'OO' (/uː/), únicamente en monosílabos."
          ],
          "correct": 1,
          "fb": "¡Correcto! El Schwa (/ə/) es el sonido comodín y más abundante del inglés, apareciendo casi siempre en sílabas débiles y no acentuadas."
        },
        "exercise": {
          "audioText": "Thanks. Together. Thursday. Mother.",
          "type": "classification_bins",
          "title": "Discriminación Fonética: 'TH' Sorda (/θ/) vs Sonora (/ð/)",
          "categories": [
            {
              "id": "sordo",
              "title": "TH Sorda /θ/ (Solo aire, ej. Think)"
            },
            {
              "id": "sonoro",
              "title": "TH Sonora /ð/ (Con vibración, ej. This)"
            }
          ],
          "items": [
            {
              "id": "w1",
              "text": "Thanks (Gracias)",
              "target": "sordo"
            },
            {
              "id": "w2",
              "text": "Together (Juntos)",
              "target": "sonoro"
            },
            {
              "id": "w3",
              "text": "Thursday (Jueves)",
              "target": "sordo"
            },
            {
              "id": "w4",
              "text": "Mother (Madre)",
              "target": "sonoro"
            }
          ],
          "evaluator": (state) => {
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
        "n": 2,
        "title": "Saludos, Presentaciones y Pronombres Personales",
        "unit": 1,
        "level": "A1",
        "p1": "Para romper el hielo en cualquier contexto angloparlante necesitas dominar los pronombres personales de sujeto: **I** (yo, ¡siempre en mayúscula!), **You** (tú / usted / ustedes), **He** (él), **She** (ella), **It** (objeto, animal o concepto neutro), **We** (nosotros) y **They** (ellos/ellas). En inglés, el sujeto casi NUNCA se omite; mientras en español decimos 'Llueve', en inglés es obligatorio decir '*It rains*'.",
        "p2": "Al saludar, la formalidad importa: *'Good morning / afternoon / evening'* es ideal para el trabajo o desconocidos, mientras que *'Hi'*, *'Hey'*, *'What's up?'* o *'How's it going?'* son informales. Para responder a *'How are you?'*, los nativos suelen decir *'I'm doing well, thank you'*, *'Pretty good'* o *'Not bad'*, devolviendo la cortesía con un *'And you?'*.",
        "audioSentences": [
          {
            "en": "Hello, my name is Carlos. Nice to meet you.",
            "ipa": "/həˈloʊ maɪ neɪm ɪz ˈkɑːrloʊs naɪs tuː miːt juː/",
            "es": "Hola, mi nombre es Carlos. Encantado de conocerte."
          },
          {
            "en": "How is it going? - Pretty good, thank you!",
            "ipa": "/haʊ ɪz ɪt ˈɡoʊɪŋ - ˈprɪti ɡʊd θæŋk juː/",
            "es": "¿Cómo te va? - ¡Bastante bien, gracias!"
          },
          {
            "en": "She is from Colombia and he is from Chile.",
            "ipa": "/ʃiː ɪz frəm kəˈlʌmbiə ænd hiː ɪz frəm ˈtʃɪli/",
            "es": "Ella es de Colombia y él es de Chile."
          },
          {
            "en": "Good morning! How are you doing today?",
            "ipa": "/ɡʊd ˈmɔːrnɪŋ haʊ ɑːr juː ˈduːɪŋ təˈdeɪ/",
            "es": "¡Buenos días! ¿Cómo estás hoy?"
          },
          {
            "en": "They are our new classmates from Peru.",
            "ipa": "/ðeɪ ɑːr ˈaʊər nuː ˈklæsmeɪts frəm pəˈruː/",
            "es": "Ellos son nuestros nuevos compañeros de clase de Perú."
          }
        ],
        "takeaways": [
          "El pronombre 'I' (yo) siempre se escribe en mayúscula sin importar dónde esté en la frase.",
          "El sujeto es obligatorio en inglés; nunca se omite como en español.",
          "Para saludar con naturalidad, usa 'How's it going?' y responde 'Pretty good, thanks!'."
        ],
        "instructions": [
          "Arrastra o haz clic en las fichas para ordenar la oración de presentación.",
          "La frase debe significar en inglés: 'Hola, un placer conocerte también.'",
          "Haz clic en 'Validar y Enviar' para verificar tu saludo."
        ],
        "hint": "Estructura típica de cortesía: Saludo inicial ('Hello'), coma, 'nice to meet you' y cierra con 'too' (también).",
        "quiz": {
          "q": "¿Por qué en inglés es incorrecto decir simplemente 'Is raining' para referirse a la lluvia?",
          "opts": [
            "Porque falta el signo de exclamación al final.",
            "Porque en inglés el sujeto casi nunca se omite y se requiere el pronombre neutro 'It' (*It is raining*).",
            "Porque el verbo 'raining' solo se usa en tiempo pasado.",
            "Porque 'raining' requiere el pronombre 'He' o 'She'."
          ],
          "correct": 1,
          "fb": "¡Exacto! El inglés no tiene sujetos tácitos en este tipo de oraciones; siempre requiere 'It' como sujeto impersonal (*It is raining*)."
        },
        "exercise": {
          "audioText": "Hello, nice to meet you too.",
          "type": "sequence_sort",
          "title": "Constructor de Oraciones: Presentación Formal",
          "items": [
            {
              "id": "w1",
              "text": "Hello,"
            },
            {
              "id": "w2",
              "text": "nice"
            },
            {
              "id": "w3",
              "text": "to"
            },
            {
              "id": "w4",
              "text": "meet"
            },
            {
              "id": "w5",
              "text": "you"
            },
            {
              "id": "w6",
              "text": "too."
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6"
          ],
          "evaluator": (state) => {
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
        "n": 3,
        "title": "El Verbo 'To Be' y Contracciones Cotidianas",
        "unit": 1,
        "level": "A1",
        "p1": "El verbo **To Be** es el pilar de la lengua inglesa y traduce tanto a **ser** como a **estar**. Sus tres formas del presente son: **am** (para I), **is** (para he, she, it) y **are** (para you, we, they). Un error común de hispanohablantes es decir *'I have 25 years'* para la edad; en inglés la edad se considera un estado del ser: *'I AM 25 years old'*.",
        "p2": "En el día a día y en películas, los nativos casi NUNCA dicen *'I am'* o *'They are'*; usan contracciones: **I'm**, **You're**, **He's**, **She's**, **It's**, **We're**, **They're**. Para negar, contraemos el verbo con *not*: **isn't** (*is not*) y **aren't** (*are not*). Y para hacer preguntas, invertimos el orden: *'Are you ready?'* en lugar de *'You are ready?'*.",
        "audioSentences": [
          {
            "en": "I'm 24 years old and I'm a student.",
            "ipa": "/aɪm ˈtwɛnti fɔːr jɪərz oʊld ænd aɪm ə ˈstjuːdnt/",
            "es": "Tengo 24 años y soy estudiante."
          },
          {
            "en": "Where are you from? - We're from Mexico.",
            "ipa": "/wɛər ɑːr juː frəm - wɪər frəm ˈmɛksɪkoʊ/",
            "es": "¿De dónde son ustedes? - Somos de México."
          },
          {
            "en": "She isn't at home; she's at English class.",
            "ipa": "/ʃiː ˈɪznt æt hoʊm ʃiːz æt ˈɪŋɡlɪʃ klæs/",
            "es": "Ella no está en casa; está en la clase de inglés."
          },
          {
            "en": "Are you ready to practice speaking today?",
            "ipa": "/ɑːr juː ˈrɛdi tuː ˈpræktɪs ˈspiːkɪŋ təˈdeɪ/",
            "es": "¿Estás listo para practicar conversación hoy?"
          },
          {
            "en": "It's a wonderful day to introduce yourself.",
            "ipa": "/ɪts ə ˈwʌndərfl deɪ tuː ˌɪntrəˈduːs jʊərˈsɛlf/",
            "es": "Es un día maravilloso para presentarte."
          }
        ],
        "takeaways": [
          "To Be cubre tanto 'ser' como 'estar': el contexto define el significado exacto.",
          "La edad en inglés se dice con To Be: 'I am 20 years old', nunca con 'have'.",
          "Para preguntar, invierte el orden: verbo auxiliar primero, luego el sujeto ('Are you...?')."
        ],
        "instructions": [
          "Selecciona la opción correcta en cada espacio para completar las 3 frases con To Be.",
          "Presta atención al sujeto de cada cláusula y si se trata de afirmación o negación.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "I va con am ('m), He/She/It va con is ('s), We/You/They van con are ('re).",
        "quiz": {
          "q": "¿Cuál de las siguientes oraciones expresa de manera gramaticalmente correcta la edad y el origen en inglés?",
          "opts": [
            "I have 30 years and have from Colombia.",
            "I am 30 years old and I'm from Colombia.",
            "I are 30 years old and I is from Colombia.",
            "I am have 30 years and I am of Colombia."
          ],
          "correct": 1,
          "fb": "¡Exacto! En inglés la edad se expresa siempre con el verbo 'to be' ('I am 30 years old') y el origen con la preposición 'from' ('I'm from Colombia')."
        },
        "exercise": {
          "audioText": "Carlos and Maria are at the office, but John isn't here. I am on my way.",
          "type": "fill_blanks",
          "title": "Laboratorio de To Be: Contracciones y Sujetos",
          "sentence": "Carlos and Maria ___ (be) at the office, but John ___ (not / be) here. I ___ (be) on my way.",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "Carlos and Maria...",
              "options": [
                "am",
                "is",
                "are"
              ],
              "answer": "are"
            },
            {
              "id": "b2",
              "placeholder": "John...",
              "options": [
                "isn't",
                "aren't",
                "not is"
              ],
              "answer": "isn't"
            },
            {
              "id": "b3",
              "placeholder": "I...",
              "options": [
                "am",
                "is",
                "are"
              ],
              "answer": "am"
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 2,
    "title": "Unidad 2: Vida Diaria & Rutinas",
    "level": "A1-A2 Principiante Superior",
    "badge": {
      "id": "badge_routines",
      "icon": "⏰",
      "name": "Daily Life Navigator",
      "desc": "Expresas hábitos, horarios y frecuencias con Presente Simple con fluidez."
    },
    "externalPractice": {
      "provider": "British Council LearnEnglish",
      "badge": "Gramática en Contexto",
      "title": "Práctica de Rutinas y Frecuencias",
      "url": "https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/present-simple",
      "description": "Ejercicios interactivos guiados con audios reales sobre rutinas de profesionales de todo el mundo.",
      "tasks": [
        "Completa 5 historias cortas sobre rutinas diarias de profesionales en Londres.",
        "Revisa la regla de ortografía para verbos terminados en -ch, -sh, -o, -x (watches, goes, fixes).",
        "Escribe en tu cuaderno una lista de 5 cosas que haces 'always' y 2 que haces 'never'."
      ],
      "recommendedMetric": "90% de aciertos en ejercicios de 3ra persona singular (-s/-es)."
    },
    "lessons": [
      {
        "n": 4,
        "title": "Presente Simple: Afirmaciones y la Regla de la 3ª Persona (-s/-es)",
        "unit": 2,
        "level": "A1-A2",
        "p1": "El **Present Simple** se usa para describir hábitos, rutinas diarias, verdades científicas y hechos permanentes: *'I live in Madrid'*, *'Water boils at 100°C'*. Para los pronombres I, You, We y They, el verbo se queda en su forma base (*I work*, *we study*). ¡Sencillísimo!",
        "p2": "La trampa principal está en la **tercera persona singular (He, She, It)**: el verbo DEBE llevar una **-s** o **-es** al final (*He works*, *She teaches*, *It takes time*). Si el verbo termina en -ch, -sh, -ss, -x, u -o, agregamos **-es** (*watches, washes, goes*). Si termina en consonante + 'y', cambiamos por **-ies** (*studies, flies*).",
        "audioSentences": [
          {
            "en": "She wakes up early and eats breakfast with her family.",
            "ipa": "/ʃiː weɪks ʌp ˈɜːrli ænd iːts ˈbrɛkfəst wɪð hər ˈfæməli/",
            "es": "Ella se despierta temprano y desayuna con su familia."
          },
          {
            "en": "He brushes his teeth and washes his face every morning.",
            "ipa": "/hiː ˈbrʌʃɪz hɪz tiːθ ænd ˈwɑːʃɪz hɪz feɪs ˈɛvri ˈmɔːrnɪŋ/",
            "es": "Él se cepilla los dientes y se lava la cara todas las mañanas."
          },
          {
            "en": "My father goes to work by bus at eight o'clock.",
            "ipa": "/maɪ ˈfɑːðər ɡoʊz tuː wɜːrk baɪ bʌs æt eɪt əˈklɑːk/",
            "es": "Mi padre va al trabajo en autobús a las ocho en punto."
          },
          {
            "en": "My sister studies English grammar every afternoon.",
            "ipa": "/maɪ ˈsɪstər ˈstʌdiz ˈɪŋɡlɪʃ ˈɡræmər ˈɛvri ˌæftərˈnuːn/",
            "es": "Mi hermana estudia gramática inglesa todas las tardes."
          },
          {
            "en": "He watches an educational video before going to bed.",
            "ipa": "/hiː ˈwɑːtʃɪz ən ˌɛdʒuˈkeɪʃənl ˈvɪdioʊ bɪˈfɔːr ˈɡoʊɪŋ tuː bɛd/",
            "es": "Él mira un video educativo antes de acostarse."
          }
        ],
        "takeaways": [
          "Usa Presente Simple para hechos permanentes, hábitos y rutinas.",
          "Con He, She, It, SIEMPRE añade -s, -es o -ies al verbo en oraciones afirmativas.",
          "Con I, You, We, They, el verbo se mantiene en su forma infinitiva sin 'to'."
        ],
        "instructions": [
          "Lee el texto sobre la rutina de Sarah.",
          "Corrige y asigna la terminación adecuada a los verbos según el sujeto.",
          "Envía tu respuesta para verificar la concordancia gramatical."
        ],
        "hint": "Sarah es 'She', por lo que todos sus verbos de acción en presente afirmativo necesitan -s o -es.",
        "quiz": {
          "q": "¿Cuál de las siguientes oraciones aplica correctamente la regla de la 3ª persona singular?",
          "opts": [
            "My sister watch TV and play video games after dinner.",
            "My sister watches TV and plays video games after dinner.",
            "My sister watchs TV and playies video games after dinner.",
            "My sister is watch TV and playing video games after dinner."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'Watch' termina en -ch, por lo que añade -es ('watches'), y 'play' termina en vocal+y, por lo que solo añade -s ('plays')."
        },
        "exercise": {
          "audioText": "My manager approves the budget. Software developers write clean code. The smartphone costs 500 dollars. You and I work together.",
          "type": "classification_bins",
          "title": "Auditoría de Verbos: ¿Forma Base o Terminación de 3ª Persona?",
          "categories": [
            {
              "id": "base",
              "title": "Sujetos Plurales / I / You (Forma Base)"
            },
            {
              "id": "third",
              "title": "He / She / It (Requiere -s / -es)"
            }
          ],
          "items": [
            {
              "id": "v1",
              "text": "My manager (approve / approves) the budget",
              "target": "third"
            },
            {
              "id": "v2",
              "text": "Software developers (write / writes) clean code",
              "target": "base"
            },
            {
              "id": "v3",
              "text": "The smartphone (cost / costs) 500 dollars",
              "target": "third"
            },
            {
              "id": "v4",
              "text": "You and I (work / works) together",
              "target": "base"
            }
          ],
          "evaluator": (state) => {
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
        "n": 5,
        "title": "Preguntas con 'Do / Does' y Respuestas Cortas",
        "unit": 2,
        "level": "A1-A2",
        "p1": "En español para hacer una pregunta solo cambiamos el tono de voz ('¿Tú hablas inglés?'). En inglés eso es un error grave: **necesitamos un verbo auxiliar**. En Presente Simple ese auxiliar es **DO** (para I, you, we, they) o **DOES** (para he, she, it). La fórmula sagrada es: **Auxiliar + Sujeto + Verbo Base** (*'Do you speak English?'*).",
        "p2": "¡Cuidado con la trampa maestra! Cuando usamos **Does** en una pregunta o **doesn't** en una negación, el auxiliar ya 'absorbió' la tercera persona, por lo que el verbo principal vuelve a su **forma base sin -s**: *'Does she live here?'* (NUNCA *'Does she lives here?'*). Para responder de forma natural usamos respuestas cortas: *'Yes, I do'*, *'No, he doesn't'*.",
        "audioSentences": [
          {
            "en": "What time do you usually wake up in the morning?",
            "ipa": "/wʌt taɪm duː juː ˈjuːʒuəli weɪk ʌp ɪn ðə ˈmɔːrnɪŋ/",
            "es": "¿A qué hora sueles despertarte en la mañana?"
          },
          {
            "en": "Does your brother work on Saturdays? - No, he doesn't.",
            "ipa": "/dʌz jɔːr ˈbrʌðər wɜːrk ɒn ˈsætərdeɪz - noʊ hiː ˈdʌznt/",
            "es": "¿Tu hermano trabaja los sábados? - No, no trabaja."
          },
          {
            "en": "Do they eat dinner together as a family every night?",
            "ipa": "/duː ðeɪ iːt ˈdɪnər təˈɡɛðər æz ə ˈfæməli ˈɛvri naɪt/",
            "es": "¿Cenan ellos juntos en familia todas las noches?"
          },
          {
            "en": "What does she do after she finishes her homework?",
            "ipa": "/wʌt dʌz ʃiː duː ˈæftər ʃiː ˈfɪnɪʃɪz hər ˈhoʊmwɜːrk/",
            "es": "¿Qué hace ella después de terminar su tarea?"
          },
          {
            "en": "Do you take a shower before or after breakfast?",
            "ipa": "/duː juː teɪk ə ˈʃaʊər bɪˈfɔːr ɔːr ˈæftər ˈbrɛkfəst/",
            "es": "¿Te duchas antes o después del desayuno?"
          }
        ],
        "takeaways": [
          "Toda pregunta en presente simple requiere el auxiliar 'Do' o 'Does' al principio.",
          "Cuando 'Does' o 'Doesn't' están presentes, el verbo principal pierde la -s y queda en forma base.",
          "Responde con respuestas cortas naturales: 'Yes, I do' / 'No, she doesn't', no solo con un seco 'Yes' o 'No'."
        ],
        "instructions": [
          "Ordena las palabras para formar una pregunta gramaticalmente perfecta sobre rutinas de trabajo.",
          "La pregunta debe significar: '¿Tu equipo realiza reuniones diarias?'",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Aplica la regla de oro: Auxiliar (Does) + Sujeto (your team) + Verbo base (have) + Complemento.",
        "quiz": {
          "q": "¿Cuál de las siguientes preguntas en Presente Simple es gramaticalmente correcta?",
          "opts": [
            "Does your brother plays the guitar?",
            "Do your brother play the guitar?",
            "Does your brother play the guitar?",
            "Is your brother play the guitar?"
          ],
          "correct": 2,
          "fb": "¡Exacto! 'Your brother' es 3ª persona singular (requiere 'Does'), y como 'Does' ya hace el trabajo, el verbo 'play' va en su forma base sin -s."
        },
        "exercise": {
          "audioText": "Does your team have daily meetings?",
          "type": "sequence_sort",
          "title": "Constructor de Preguntas con Auxiliar",
          "items": [
            {
              "id": "w1",
              "text": "Does"
            },
            {
              "id": "w2",
              "text": "your"
            },
            {
              "id": "w3",
              "text": "team"
            },
            {
              "id": "w4",
              "text": "have"
            },
            {
              "id": "w5",
              "text": "daily"
            },
            {
              "id": "w6",
              "text": "meetings?"
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6"
          ],
          "evaluator": (state) => {
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
        "n": 6,
        "title": "Adverbios de Frecuencia y Expresiones de Tiempo (At, On, In)",
        "unit": 2,
        "level": "A1-A2",
        "p1": "Para decir con qué regularidad haces algo usamos los **adverbios de frecuencia**: *always* (100%), *usually* (80%), *often* (60%), *sometimes* (50%), *rarely / hardly ever* (10%), *never* (0%). La regla de ubicación es clave: van **ANTES del verbo principal** (*'I always drink water'*), pero **DESPUÉS del verbo To Be** (*'She is always punctual'*).",
        "p2": "Para las horas, fechas y momentos del día, las preposiciones de tiempo siguen la regla de la pirámide: **AT** para horas precisas (*at 7:00 PM, at midnight, at noon*); **ON** para días y fechas específicas (*on Monday, on July 4th, on the weekend* en US); e **IN** para periodos largos o partes del día (*in the morning, in 2026, in December, in summer*).",
        "audioSentences": [
          {
            "en": "I always eat breakfast with my children at seven in the morning.",
            "ipa": "/aɪ ˈɔːlweɪz iːt ˈbrɛkfəst wɪð maɪ ˈtʃɪldrən æt ˈsɛvn ɪn ðə ˈmɔːrnɪŋ/",
            "es": "Siempre desayuno con mis hijos a las siete de la mañana."
          },
          {
            "en": "She usually cleans her room on Saturday mornings.",
            "ipa": "/ʃiː ˈjuːʒuəli kliːnz hər ruːm ɒn ˈsætərdeɪ ˈmɔːrnɪŋz/",
            "es": "Ella normalmente limpia su habitación los sábados por la mañana."
          },
          {
            "en": "We sometimes cook dinner together at night.",
            "ipa": "/wiː ˈsʌmtaɪmz kʊk ˈdɪnər təˈɡɛðər æt naɪt/",
            "es": "A veces cocinamos la cena juntos por la noche."
          },
          {
            "en": "He rarely goes to sleep after eleven o'clock at night.",
            "ipa": "/hiː ˈrɛərli ɡoʊz tuː sliːp ˈæftər ɪˈlɛvn əˈklɑːk æt naɪt/",
            "es": "Él rara vez se va a dormir después de las once de la noche."
          },
          {
            "en": "Do you often study English in the evening?",
            "ipa": "/duː juː ˈɒfn ˈstʌdi ˈɪŋɡlɪʃ ɪn ði ˈiːvnɪŋ/",
            "es": "¿Estudias inglés a menudo por la tarde/noche?"
          }
        ],
        "takeaways": [
          "Adverbio de frecuencia: ANTES de verbos normales ('I never smoke'), pero DESPUÉS de To Be ('I am never late').",
          "Preposiciones de tiempo: AT para horas, ON para días y fechas, IN para meses, años y partes del día.",
          "Con 'night' se usa 'at night' (excepción a 'in the morning/afternoon/evening')."
        ],
        "instructions": [
          "Completa las 3 oraciones con la preposición de tiempo adecuada (at, on, in).",
          "Considera si la frase habla de una hora exacta, un día específico o un mes.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Horas precisas = AT. Días de la semana = ON. Meses o años = IN.",
        "quiz": {
          "q": "¿Cuál es la posición correcta del adverbio de frecuencia en una oración con el verbo 'to be'?",
          "opts": [
            "Siempre al principio de la oración antes del sujeto.",
            "Inmediatamente después del verbo 'to be' (ej. *He is always happy*).",
            "Siempre al final de la oración después del complemento.",
            "Entre el sujeto y el verbo 'to be' (ej. *He always is happy*)."
          ],
          "correct": 1,
          "fb": "¡Correcto! Los adverbios de frecuencia van después del verbo 'to be' (*He is always happy*), mientras que con cualquier otro verbo van antes (*He always arrives early*)."
        },
        "exercise": {
          "audioText": "The global conference starts at 9:30 AM on Monday, and finishes in November.",
          "type": "fill_blanks",
          "title": "Desafío de Preposiciones de Tiempo: At, On, In",
          "sentence": "The global conference starts ___ (at/on/in) 9:30 AM ___ (at/on/in) Monday, and finishes ___ (at/on/in) November.",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "Hora...",
              "options": [
                "at",
                "on",
                "in"
              ],
              "answer": "at"
            },
            {
              "id": "b2",
              "placeholder": "Día...",
              "options": [
                "at",
                "on",
                "in"
              ],
              "answer": "on"
            },
            {
              "id": "b3",
              "placeholder": "Mes...",
              "options": [
                "at",
                "on",
                "in"
              ],
              "answer": "in"
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 3,
    "title": "Unidad 3: Describiendo el Entorno",
    "level": "A2 Elemental",
    "badge": {
      "id": "badge_describer",
      "icon": "🎨",
      "name": "World Describer",
      "desc": "Describes objetos, cantidades, posesiones y personas con naturalidad."
    },
    "externalPractice": {
      "provider": "Cambridge English Dictionary & Grammar",
      "badge": "Vocabulario & Gramática",
      "title": "Dominio de Sustantivos y Artículos",
      "url": "https://dictionary.cambridge.org/grammar/british-grammar/nouns-countable-and-uncountable",
      "description": "Guía de referencia rápida sobre sustantivos difíciles (advice, information, furniture) que en español son contables pero en inglés no.",
      "tasks": [
        "Revisa los 10 sustantivos incontables más tramposos para hispanohablantes.",
        "Aprende cómo cuantificarlos con 'a piece of' (a piece of advice, a piece of information).",
        "Practica 5 descripciones visuales usando demostrativos (this / that / these / those)."
      ],
      "recommendedMetric": "Identificar sustantivos incontables con 100% de precisión."
    },
    "lessons": [
      {
        "n": 7,
        "title": "Artículos (A, An, The) y Sustantivos Contables vs Incontables",
        "unit": 3,
        "level": "A2",
        "p1": "El artículo indefinido se usa para cosas singulares inespecíficas: usamos **A** antes de sonidos consonánticos (*a book, a university* - ¡ojo, 'university' empieza con sonido semiconsonante /j/!) y **AN** antes de sonidos vocálicos (*an apple, an honest person* - la 'h' en honest es muda). Por su parte, **THE** es el artículo definido (*el, la, los, las*) y se usa cuando ambos interlocutores saben exactamente de qué objeto se habla.",
        "p2": "Los sustantivos se dividen en **Contables** (cosas que puedes contar: *two chairs, three cars*) e **Incontables** (líquidos, materias o conceptos abstractos que no tienen plural: *water, money, advice, information*). En inglés, **NUNCA** se dice *'an advice'* o *'informations'*; para expresar una unidad de un incontable decimos *'a piece of advice'* o *'some information'*.",
        "audioSentences": [
          {
            "en": "I need a warm jacket and an umbrella for this rainy day.",
            "ipa": "/aɪ niːd ə wɔːrm ˈdʒækɪt ænd ən ʌmˈbrɛlə fər ðɪs ˈreɪni deɪ/",
            "es": "Necesito una chaqueta abrigadora y un paraguas para este día lluvioso."
          },
          {
            "en": "There is some fresh milk and water on the kitchen table.",
            "ipa": "/ðɛər ɪz sʌm frɛʃ mɪlk ænd ˈwɔːtər ɒn ðə ˈkɪtʃɪn ˈteɪbl/",
            "es": "Hay algo de leche fresca y agua sobre la mesa de la cocina."
          },
          {
            "en": "She bought three apples, two oranges, and some bread.",
            "ipa": "/ʃiː bɔːt θriː ˈæplz tuː ˈɔːrɪndʒɪz ænd sʌm brɛd/",
            "es": "Ella compró tres manzanas, dos naranjas y algo de pan."
          },
          {
            "en": "Could you please pass me a glass of clean water?",
            "ipa": "/kʊd juː pliːz pæs miː ə ɡlæs əv kliːn ˈwɔːtər/",
            "es": "¿Podrías por favor pasarme un vaso de agua limpia?"
          },
          {
            "en": "The blue shirt in the closet belongs to my brother.",
            "ipa": "/ðə bluː ʃɜːrt ɪn ðə ˈklɒzɪt bɪˈlɒŋz tuː maɪ ˈbrʌðər/",
            "es": "La camisa azul en el armario pertenece a mi hermano."
          }
        ],
        "takeaways": [
          "'A' o 'An' dependen del SONIDO que sigue, no de la letra escrita ('an hour', 'a university').",
          "Palabras como 'information', 'advice', 'furniture' y 'money' son estrictamente incontables.",
          "Nunca uses 'a/an' con un sustantivo incontable sin una palabra de medida ('a piece of...')."
        ],
        "instructions": [
          "Separa los 4 sustantivos en Contables (pueden pluralizarse y usar a/an) o Incontables (requieren some o a piece of).",
          "Presta atención especial a los falsos amigos frecuentes.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Pregúntate: ¿Puedes decir 'one...', 'two...' de esa cosa en inglés natural? No puedes decir 'two furnitures' ni 'three advices'.",
        "quiz": {
          "q": "¿Cuál de las siguientes frases es correcta al pedir asesoría en inglés?",
          "opts": [
            "I need an advice from you.",
            "I need some advice from you.",
            "I need many advices from you.",
            "I need an useful advice from you."
          ],
          "correct": 1,
          "fb": "¡Correcto! 'Advice' es un sustantivo incontable; no admite 'an' ni tiene plural ('advices'). Se dice 'some advice' o 'a piece of advice'."
        },
        "exercise": {
          "audioText": "Luggage. Suitcase. Information. Report.",
          "type": "classification_bins",
          "title": "Clasificación de Sustantivos: ¿Contable o Incontable?",
          "categories": [
            {
              "id": "contable",
              "title": "Contables (Pluralizable con -s, usa A/An)"
            },
            {
              "id": "incontable",
              "title": "Incontables (Materia/Abstracto, usa Some)"
            }
          ],
          "items": [
            {
              "id": "s1",
              "text": "Luggage (Equipaje)",
              "target": "incontable"
            },
            {
              "id": "s2",
              "text": "Suitcase (Maleta)",
              "target": "contable"
            },
            {
              "id": "s3",
              "text": "Information (Información)",
              "target": "incontable"
            },
            {
              "id": "s4",
              "text": "Report (Informe escrito)",
              "target": "contable"
            }
          ],
          "evaluator": (state) => {
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
        "n": 8,
        "title": "Demostrativos (This/That/These/Those) y Orden de Adjetivos",
        "unit": 3,
        "level": "A2",
        "p1": "Los demostrativos señalan la distancia física o temporal: **THIS** (esto/este, singular y cerca), **THAT** (eso/aquel, singular y lejos), **THESE** (estos/estas, plural y cerca, con sonido /iːz/) y **THOSE** (esos/aquellos, plural y lejos, con sonido /oʊz/). Fíjate en la pronunciación: en *this* la 'i' es corta y relajada (/ɪ/), mientras que en *these* es larga (/iː/).",
        "p2": "En cuanto a los adjetivos, en inglés **siempre van antes del sustantivo** (*'a red car'*, nunca *'a car red'*) y **nunca llevan plural** (*'interesting books'*, jamás *'interestings books'*). Si usas más de un adjetivo, el orden natural nativo sigue la regla **OSASCOMP**: Opinión, Tamaño (Size), Edad (Age), Forma (Shape), Color, Origen, Material y Propósito (*'a lovely big old Italian leather jacket'*).",
        "audioSentences": [
          {
            "en": "This red cotton shirt is very comfortable.",
            "ipa": "/ðɪs rɛd ˈkɒtn ʃɜːrt ɪz ˈvɛri ˈkʌmftəbl/",
            "es": "Esta camisa roja de algodón es muy cómoda."
          },
          {
            "en": "Look at that tall wooden bookcase in the living room.",
            "ipa": "/lʊk æt ðæt tɔːl ˈwʊdn ˈbʊkkeɪs ɪn ðə ˈlɪvɪŋ ruːm/",
            "es": "Mira ese librero alto de madera en la sala."
          },
          {
            "en": "These black leather shoes belong to my father.",
            "ipa": "/ðiːz blæk ˈlɛðər ʃuːz bɪˈlɒŋ tuː maɪ ˈfɑːðər/",
            "es": "Estos zapatos negros de cuero pertenecen a mi padre."
          },
          {
            "en": "Those small colorful notebooks over there are for our English class.",
            "ipa": "/ðoʊz smɔːl ˈkʌlərfʊl ˈnoʊtbʊks ˈoʊvər ðɛər ɑːr fər ˈaʊər ˈɪŋɡlɪʃ klæs/",
            "es": "Aquellos cuadernos pequeños y coloridos de allá son para nuestra clase de inglés."
          },
          {
            "en": "She is wearing a lovely long blue dress today.",
            "ipa": "/ʃiː ɪz ˈwɛərɪŋ ə ˈlʌvli lɒŋ bluː drɛs təˈdeɪ/",
            "es": "Ella lleva puesto un hermoso vestido largo y azul hoy."
          }
        ],
        "takeaways": [
          "Los adjetivos en inglés son invariables: nunca se les agrega 's' para pluralizarlos.",
          "This (singular cerca) vs These (plural cerca); That (singular lejos) vs Those (plural lejos).",
          "Los adjetivos van antes del sustantivo: primero opinión, luego color/material, y al final el objeto."
        ],
        "instructions": [
          "Ordena las palabras para formar una frase descriptiva natural con adjetivos múltiples.",
          "La frase debe significar: 'Ella tiene una laptop plateada moderna.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Orden de adjetivos: Artículo + Opinión/Edad (modern) + Color (silver) + Sustantivo (laptop).",
        "quiz": {
          "q": "¿Cuál de las siguientes frases respeta tanto la invariablez de los adjetivos como su posición correcta?",
          "opts": [
            "They bought two expensives houses in Spain.",
            "They bought two houses expensives in Spain.",
            "They bought two expensive houses in Spain.",
            "They bought two expensives house in Spain."
          ],
          "correct": 2,
          "fb": "¡Exacto! Los adjetivos en inglés nunca tienen forma plural y siempre se colocan antes del sustantivo ('two expensive houses')."
        },
        "exercise": {
          "audioText": "She bought a modern silver laptop.",
          "type": "sequence_sort",
          "title": "Constructor Descriptivo: Orden de Adjetivos",
          "items": [
            {
              "id": "w1",
              "text": "She"
            },
            {
              "id": "w2",
              "text": "bought"
            },
            {
              "id": "w3",
              "text": "a"
            },
            {
              "id": "w4",
              "text": "modern"
            },
            {
              "id": "w5",
              "text": "silver"
            },
            {
              "id": "w6",
              "text": "laptop."
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6"
          ],
          "evaluator": (state) => {
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
        "n": 9,
        "title": "Posesión: Genitivo Sajón ('s), 'Have got' vs 'Have' y Posesivos",
        "unit": 3,
        "level": "A2",
        "p1": "En español decimos 'El auto de mi hermano'. En inglés esa estructura suena muy artificial; en su lugar usamos el **Genitivo Sajón ('s)**: colocamos el poseedor primero, seguido de apóstrofe-s y el objeto poseído: **'My brother's car'**. Si el poseedor es un plural regular terminado en 's', solo agregamos el apóstrofe al final: **'My parents' house'**.",
        "p2": "Para expresar posesión también usamos los adjetivos posesivos (**my, your, his, her, its, our, their**) y pronombres posesivos (**mine, yours, his, hers, ours, theirs**). Además, en inglés británico es muy común usar **'have got'** (*'I've got a new car'*, negación: *'I haven't got a car'*), mientras que en inglés americano predomina el simple **'have'** (*'I have a new car'*, negación: *'I don't have a car'*). Ambas son 100% correctas.",
        "audioSentences": [
          {
            "en": "This is my mother's favorite family photograph.",
            "ipa": "/ðɪs ɪz maɪ ˈmʌðərz ˈfeɪvərɪt ˈfæməli ˈfoʊtəɡræf/",
            "es": "Esta es la fotografía familiar favorita de mi madre."
          },
          {
            "en": "Have you got any brothers and sisters in your family?",
            "ipa": "/hæv juː ɡɒt ˈɛni ˈbrʌðərz ænd ˈsɪstərz ɪn jɔːr ˈfæməli/",
            "es": "¿Tienes hermanos y hermanas en tu familia?"
          },
          {
            "en": "My grandfather's glasses are on the bedside table.",
            "ipa": "/maɪ ˈɡrændˌfɑːðərz ˈɡlæsɪz ɑːr ɒn ðə ˈbɛdsaɪd ˈteɪbl/",
            "es": "Los anteojos de mi abuelo están sobre la mesita de noche."
          },
          {
            "en": "We have got a small garden behind our house.",
            "ipa": "/wiː hæv ɡɒt ə smɔːl ˈɡɑːrdn bɪˈhaɪnd ˈaʊər haʊs/",
            "es": "Tenemos un jardín pequeño detrás de nuestra casa."
          },
          {
            "en": "Their parents' house is right next to the community park.",
            "ipa": "/ðɛər ˈpɛərənts haʊs ɪz raɪt nɛkst tuː ðə kəˈmjuːnɪti pɑːrk/",
            "es": "La casa de sus padres está justo al lado del parque comunitario."
          }
        ],
        "takeaways": [
          "Para personas y posesiones usa el genitivo 's ('John's phone'), no 'the phone of John'.",
          "Diferencia 'its' (posesivo neutro: 'The dog wagged its tail') de 'it's' (contracción: 'It is sunny').",
          "'Have got' y 'Have' significan lo mismo para posesión; elige uno según el estilo que prefieras."
        ],
        "instructions": [
          "Identifica y repara el error de posesión en la oración propuesta.",
          "Elige la opción que exprese la posesión con naturalidad nativa.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Usa el apóstrofe y la 's' inmediatamente después de la persona dueña del objeto.",
        "quiz": {
          "q": "¿Cuál de las siguientes opciones expresa la frase 'El auto de mi jefe es nuevo' con la mayor naturalidad nativa?",
          "opts": [
            "The car of my boss is new.",
            "My boss's car is new.",
            "The car from my boss is new.",
            "My boss car is new."
          ],
          "correct": 1,
          "fb": "¡Exacto! El genitivo sajón ('My boss's car') es la forma natural y estándar en inglés para personas que poseen objetos."
        },
        "exercise": {
          "audioText": "The computer of Maria is on the desk, but I think that charger is of him.",
          "type": "error_spotter",
          "title": "Detector de Errores: Posesión y Apóstrofes",
          "sentence": "The computer of Maria is on the desk, but I think that charger is of him.",
          "errorDescription": "¿Cuál es la forma correcta y natural de reescribir esta frase?",
          "options": [
            {
              "id": "o1",
              "text": "Maria's computer is on the desk, but I think that charger is his.",
              "correct": true
            },
            {
              "id": "o2",
              "text": "The Maria computer is on the desk, but I think that charger is of his.",
              "correct": false
            },
            {
              "id": "o3",
              "text": "Marias' computer is on the desk, but I think that charger is him.",
              "correct": false
            },
            {
              "id": "o4",
              "text": "The computer's Maria is on the desk, but I think that charger is he's.",
              "correct": false
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 4,
    "title": "Unidad 4: Acciones & Movimiento",
    "level": "A2 Elemental-Intermedio",
    "badge": {
      "id": "badge_action",
      "icon": "🚀",
      "name": "Action Hero",
      "desc": "Distingues acciones inmediatas en curso frente a estados y rutinas."
    },
    "externalPractice": {
      "provider": "Perfect English Grammar",
      "badge": "Tiempos Verbales",
      "title": "Present Simple vs Present Continuous & Stative Verbs",
      "url": "https://www.perfect-english-grammar.com/present-simple-present-continuous.html",
      "description": "Ejercicios profundos para no cometer el error de usar -ing con verbos de pensamiento o emoción (know, believe, like).",
      "tasks": [
        "Resuelve el test de 20 preguntas contrastando acciones temporales vs permanentes.",
        "Memoriza la lista de los 15 'Stative Verbs' más comunes.",
        "Practica describir qué están haciendo las personas a tu alrededor en este instante."
      ],
      "recommendedMetric": "Distinguir stative verbs sin errores en 10 frases consecutivas."
    },
    "lessons": [
      {
        "n": 10,
        "title": "Presente Continuo: Formación con -ing y Uso en Tiempo Real",
        "unit": 4,
        "level": "A2",
        "p1": "El **Present Continuous** se utiliza para hablar de acciones que están ocurriendo **en este preciso momento** (*'I am studying right now'*), situaciones temporales (*'He is staying at a hotel this week'*) o tendencias actuales. Su fórmula es infalible: **Sujeto + Verbo To Be (am/is/are) + Verbo terminado en -ing**.",
        "p2": "Al añadir **-ing** aplican reglas ortográficas importantes: si el verbo termina en 'e' muda, se elimina (*make -> making, write -> writing*). Si es monosílabo y termina en consonante-vocal-consonante (CVC), **duplicamos la última consonante** (*run -> running, sit -> sitting, swim -> swimming*). Para negar, añadimos *not* después de To Be (*'We aren't sleeping'*).",
        "audioSentences": [
          {
            "en": "My mother is cooking dinner in the kitchen right now.",
            "ipa": "/maɪ ˈmʌðər ɪz ˈkʊkɪŋ ˈdɪnər ɪn ðə ˈkɪtʃɪn raɪt naʊ/",
            "es": "Mi madre está cocinando la cena en la cocina en este momento."
          },
          {
            "en": "I am washing the dishes while my brother is sweeping the floor.",
            "ipa": "/aɪ æm ˈwɑːʃɪŋ ðə ˈdɪʃɪz waɪl maɪ ˈbrʌðər ɪz ˈswiːpɪŋ ðə flɔːr/",
            "es": "Estoy lavando los platos mientras mi hermano barre el piso."
          },
          {
            "en": "What are you doing at home right now?",
            "ipa": "/wʌt ɑːr juː ˈduːɪŋ æt hoʊm raɪt naʊ/",
            "es": "¿Qué estás haciendo en casa en este momento?"
          },
          {
            "en": "The children are playing quietly in the living room.",
            "ipa": "/ðə ˈtʃɪldrən ɑːr ˈpleɪɪŋ ˈkwaɪətli ɪn ðə ˈlɪvɪŋ ruːm/",
            "es": "Los niños están jugando tranquilamente en la sala."
          },
          {
            "en": "He is fixing the bathroom light with his father.",
            "ipa": "/hiː ɪz ˈfɪksɪŋ ðə ˈbæθruːm laɪt wɪð hɪz ˈfɑːðər/",
            "es": "Él está arreglando la luz del baño con su padre."
          }
        ],
        "takeaways": [
          "Fórmula del Present Continuous: Sujeto + am/is/are + verbo con -ing.",
          "Palabras clave: 'right now', 'at the moment', 'currently', 'this week'.",
          "Regla CVC: Verbos cortos con consonante-vocal-consonante duplican la última consonante (run -> running)."
        ],
        "instructions": [
          "Selecciona la forma correcta con -ing que cumpla con las reglas ortográficas.",
          "Verifica el uso de To Be y la duplicación de consonantes en verbos CVC.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Run termina en R-U-N (consonante-vocal-consonante), por lo que duplica la n: running.",
        "quiz": {
          "q": "¿Cuál de las siguientes formas ortográficas del gerundio (-ing) es 100% correcta?",
          "opts": [
            "runing, writeing, swiming",
            "running, writing, swimming",
            "runing, writing, swimming",
            "running, writeing, swiming"
          ],
          "correct": 1,
          "fb": "¡Exacto! 'Run' y 'swim' duplican consonante por ser CVC ('running', 'swimming'), mientras que 'write' pierde la 'e' muda ('writing')."
        },
        "exercise": {
          "audioText": "Look! The train is arriving, and many passengers are running to catch it. I am recording a video.",
          "type": "fill_blanks",
          "title": "Conjugación en Vivo: Acciones en Progreso",
          "sentence": "Look! The train ___ (arrive), and many passengers ___ (run) to catch it. I ___ (record) a video.",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "The train...",
              "options": [
                "is arriving",
                "are arriving",
                "arrives"
              ],
              "answer": "is arriving"
            },
            {
              "id": "b2",
              "placeholder": "Passengers...",
              "options": [
                "is running",
                "are running",
                "are runing"
              ],
              "answer": "are running"
            },
            {
              "id": "b3",
              "placeholder": "I...",
              "options": [
                "am recording",
                "is recording",
                "are recording"
              ],
              "answer": "am recording"
            }
          ],
          "evaluator": (state) => {
            if (state.b1 === "is arriving" && state.b2 === "are running" && state.b3 === "am recording") {
              return { pass: true, msg: "¡Excelente! 'The train is arriving', 'passengers are running', 'I am recording'. Has aplicado la regla CVC y la concordancia de To Be." };
            }
            return { pass: false, msg: "Revisa las respuestas: train = is arriving; passengers (plural) = are running; I = am recording." };
          }
        }
      },
      {
        "n": 11,
        "title": "Presente Simple vs Presente Continuo y Stative Verbs",
        "unit": 4,
        "level": "A2",
        "p1": "Comparar **Present Simple** y **Present Continuous** es una de las pruebas de fuego del inglés: el Simple expresa **rutinas o verdades permanentes** (*'I live in Madrid and I drink coffee'*), mientras que el Continuous expresa **lo que pasa ahora o situaciones temporales** (*'Today I am living in a hotel and I am drinking tea'*).",
        "p2": "Aquí entra la regla crucial de los **Stative Verbs (Verbos de Estado)**: verbos que describen emociones, estados mentales, posesión o sentidos (**know, understand, believe, want, need, love, hate, own, seem**) **NUNCA se usan en tiempos continuos con -ing**. En español decimos 'Te estoy entendiendo', pero en inglés es estrictamente: *'I understand you'* (NUNCA *'I am understanding you'*).",
        "audioSentences": [
          {
            "en": "I usually study in my bedroom, but today I am studying in the kitchen.",
            "ipa": "/aɪ ˈjuːʒuəli ˈstʌdi ɪn maɪ ˈbɛdruːm bʌt təˈdeɪ aɪ æm ˈstʌdiɪŋ ɪn ðə ˈkɪtʃɪn/",
            "es": "Normalmente estudio en mi habitación, pero hoy estoy estudiando en la cocina."
          },
          {
            "en": "She loves home-cooked meals, and right now she is tasting the soup.",
            "ipa": "/ʃiː lʌvz hoʊm kʊkt miːlz ænd raɪt naʊ ʃiː ɪz ˈteɪstɪŋ ðə suːp/",
            "es": "A ella le encantan las comidas caseras, y ahora mismo está probando la sopa."
          },
          {
            "en": "I understand the recipe, but I need some help cutting the vegetables.",
            "ipa": "/aɪ ˌʌndərˈstænd ðə ˈrɛsəpi bʌt aɪ niːd sʌm hɛlp ˈkʌtɪŋ ðə ˈvɛdʒtəblz/",
            "es": "Entiendo la receta, pero necesito algo de ayuda cortando los vegetales."
          },
          {
            "en": "He usually relaxes on the couch, but right now he is washing his car.",
            "ipa": "/hiː ˈjuːʒuəli rɪˈlæksɪz ɒn ðə kaʊtʃ bʌt raɪt naʊ hiː ɪz ˈwɑːʃɪŋ hɪz kɑːr/",
            "es": "Él normalmente descansa en el sofá, pero ahora mismo está lavando su carro."
          },
          {
            "en": "Do you hear the rain tapping against the bedroom window?",
            "ipa": "/duː juː hɪər ðə reɪn ˈtæpɪŋ əˈɡɛnst ðə ˈbɛdruːm ˈwɪndoʊ/",
            "es": "¿Escuchas la lluvia golpeando contra la ventana del dormitorio?"
          }
        ],
        "takeaways": [
          "Present Simple = Hábitos y verdades permanentes ('I work every day').",
          "Present Continuous = Acciones en progreso o temporales ('I am working right now').",
          "Los verbos de estado (know, want, need, believe) NUNCA llevan -ing: di 'I know', no 'I am knowing'."
        ],
        "instructions": [
          "Clasifica cada verbo en 'Acción Dinámica' (admite -ing) o 'Verbo de Estado / Stative' (solo Presente Simple).",
          "Recuerda que los estados mentales, emociones y posesión no admiten gerundio.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Los verbos de estado reflejan una condición mental, no una actividad física que puedas empezar y detener a voluntad.",
        "quiz": {
          "q": "¿Cuál de las siguientes frases comete un error gramatical por usar un 'Stative Verb' en forma continua?",
          "opts": [
            "I am working on a new software architecture.",
            "She is knowing the answer to this technical question.",
            "They are living in London for three months.",
            "We are discussing the quarterly sales results."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'Know' es un verbo de estado mental y jamás se usa en forma continua. Lo correcto es: 'She knows the answer'."
        },
        "exercise": {
          "audioText": "Understand. Cook. Believe. Build.",
          "type": "classification_bins",
          "title": "Clasificación Verbal: ¿Verbo Dinámico o Verbo de Estado (Stative)?",
          "categories": [
            {
              "id": "dynamic",
              "title": "Dinámico (Admite -ing / Continuous)"
            },
            {
              "id": "stative",
              "title": "Stative (Solo Simple, Prohibido -ing)"
            }
          ],
          "items": [
            {
              "id": "v1",
              "text": "Understand (Comprender)",
              "target": "stative"
            },
            {
              "id": "v2",
              "text": "Cook (Cocinar alimentos)",
              "target": "dynamic"
            },
            {
              "id": "v3",
              "text": "Believe (Creer una idea)",
              "target": "stative"
            },
            {
              "id": "v4",
              "text": "Build (Construir algo)",
              "target": "dynamic"
            }
          ],
          "evaluator": (state) => {
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
        "n": 12,
        "title": "Preposiciones de Lugar y Movimiento (In, On, At, Under, Across)",
        "unit": 4,
        "level": "A2",
        "p1": "Al igual que con el tiempo, **IN, ON y AT** son las tres preposiciones de lugar fundamentales: **IN** se usa para espacios cerrados o áreas con límites (*in a room, in Mexico City, in a box*); **ON** para superficies de contacto (*on the table, on the floor, on the wall*) y medios de transporte donde puedes caminar dentro (*on a bus, on a train, on a plane*); y **AT** para un punto de encuentro o ubicación específica en el mapa (*at the airport, at the door, at home*).",
        "p2": "Para movimiento físico, usamos preposiciones direccionales: **TO** (hacia un destino: *'go to work'*), **INTO** (hacia el interior: *'walk into the room'*), **OUT OF** (hacia afuera: *'get out of the car'*), **ACROSS** (de un lado a otro: *'walk across the bridge'*), **UNDER** (debajo) y **NEXT TO / BESIDE** (al lado de).",
        "audioSentences": [
          {
            "en": "The house keys are on the table next to the front door.",
            "ipa": "/ðə haʊs kiːz ɑːr ɒn ðə ˈteɪbl nɛkst tuː ðə frʌnt dɔːr/",
            "es": "Las llaves de la casa están sobre la mesa junto a la puerta principal."
          },
          {
            "en": "My grandmother is resting in the armchair by the fireplace.",
            "ipa": "/maɪ ˈɡrændˌmʌðər ɪz ˈrɛstɪŋ ɪn ði ˈɑːrmtʃɛər baɪ ðə ˈfaɪərpleɪs/",
            "es": "Mi abuela está descansando en el sillón junto a la chimenea."
          },
          {
            "en": "Walk across the street to find the neighborhood grocery store.",
            "ipa": "/wɔːk əˈkrɔːs ðə striːt tuː faɪnd ðə ˈneɪbərˌhʊd ˈɡroʊsəri stɔːr/",
            "es": "Cruza la calle para encontrar la tienda de abarrotes del vecindario."
          },
          {
            "en": "The family cat is sleeping soundly under the sofa.",
            "ipa": "/ðə ˈfæməli kæt ɪz ˈsliːpɪŋ ˈsaʊndli ˈʌndər ðə ˈsoʊfə/",
            "es": "El gato de la familia está durmiendo plácidamente debajo del sofá."
          },
          {
            "en": "Please put your clean laundry into the wooden wardrobe.",
            "ipa": "/pliːz pʊt jɔːr kliːn ˈlɔːndri ˈɪntuː ðə ˈwʊdn ˈwɔːrdroʊb/",
            "es": "Por favor guarda tu ropa limpia dentro del armario de madera."
          }
        ],
        "takeaways": [
          "IN = dentro de un espacio o volumen; ON = sobre una superficie o transporte grande; AT = punto específico.",
          "Para autos y taxis se usa 'in' ('in a car'), pero para buses, trenes y aviones se usa 'on' ('on a train').",
          "ACROSS implica cruzar de una orilla a otra; INTO implica entrar a un interior tridimensional."
        ],
        "instructions": [
          "Completa la historia de viaje seleccionando la preposición de lugar correcta.",
          "Fíjate si el objeto está sobre una superficie, en un transporte público o dentro de una ciudad.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Buses y trenes usan 'on'. Países y ciudades usan 'in'. Puntos de encuentro exactos usan 'at'.",
        "quiz": {
          "q": "¿Por qué en inglés se dice 'I am ON the bus' pero 'I am IN the taxi'?",
          "opts": [
            "Porque el taxi es más rápido que el autobús.",
            "Porque en un autobús puedes ponerte de pie y caminar por el pasillo (superficie), mientras que en un taxi estás confinado en un espacio cerrado.",
            "Porque 'on' es solo para transporte público y 'in' es para transporte privado.",
            "Es una regla arbitraria sin ninguna lógica espacial."
          ],
          "correct": 1,
          "fb": "¡Excelente intuición! La regla espacial del inglés dice que en medios de transporte donde puedes pararte o caminar sobre una plataforma (bus, train, plane, ship) se usa 'ON'."
        },
        "exercise": {
          "audioText": "I am waiting at the station. My friend is on the train, and our hotel is in Chicago.",
          "type": "fill_blanks",
          "title": "Ruta de Navegación: Preposiciones de Lugar",
          "sentence": "I am waiting ___ (at/on/in) the station. My friend is ___ (at/on/in) the train, and our hotel is ___ (at/on/in) Chicago.",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "Lugar de espera...",
              "options": [
                "at",
                "on",
                "in"
              ],
              "answer": "at"
            },
            {
              "id": "b2",
              "placeholder": "En el tren...",
              "options": [
                "at",
                "on",
                "in"
              ],
              "answer": "on"
            },
            {
              "id": "b3",
              "placeholder": "Ciudad...",
              "options": [
                "at",
                "on",
                "in"
              ],
              "answer": "in"
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 5,
    "title": "Unidad 5: El Pasado & Experiencias",
    "level": "A2-B1 Intermedio",
    "badge": {
      "id": "badge_storyteller",
      "icon": "📖",
      "name": "Master Storyteller",
      "desc": "Relatas memorias y anécdotas con verbos regulares e irregulares en pasado."
    },
    "externalPractice": {
      "provider": "Oxford Online English",
      "badge": "Fonética del Pasado",
      "title": "Pronunciación del Sufijo -ED: /t/, /d/, /ɪd/",
      "url": "https://www.oxfordonlineenglish.com/how-to-pronounce-ed-endings",
      "description": "Aprende el secreto que el 90% de hispanohablantes ignora: cómo pronunciar las terminaciones en -ed sin decir 'ed' como en español.",
      "tasks": [
        "Escucha la regla de las terminaciones sordas (/t/), sonoras (/d/) y con 't' o 'd' previas (/ɪd/).",
        "Practica 20 verbos regulares en voz alta frente al espejo.",
        "Aprende los 30 verbos irregulares de mayor impacto en la conversación cotidiana."
      ],
      "recommendedMetric": "Distinguir entre /t/, /d/ y /ɪd/ con 100% de precisión."
    },
    "lessons": [
      {
        "n": 13,
        "title": "Pasado Simple con Verbos Regulares y Pronunciación de -ed (/t/, /d/, /ɪd/)",
        "unit": 5,
        "level": "A2-B1",
        "p1": "El **Past Simple** describe acciones que empezaron y terminaron en un momento definido del pasado (*'Yesterday I visited my family'*). En los verbos regulares, el pasado se forma añadiendo **-ed** o **-d** (*worked, started, played*). La estructura es idéntica para todas las personas gramaticales (I, you, he, she, it, we, they usan la misma forma).",
        "p2": "¡ATENCIÓN A LA PRONUNCIACIÓN! Los hispanohablantes suelen cometer el error de pronunciar la 'e' de *-ed* como si fuera español (ej. decir 'uork-ed'). La 'e' es casi siempre **MUDA**. Solo hay 3 pronunciaciones reales: **1. /ɪd/** (agrega una sílaba extra) ÚNICAMENTE cuando el verbo termina en sonido 'T' o 'D' (*wanted, needed*). **2. /t/** tras consonantes sordas como p, k, s, ch, sh (*worked, stopped, watched*). **3. /d/** tras vocales o consonantes sonoras (*played, lived, opened*).",
        "audioSentences": [
          {
            "en": "Yesterday, we visited our grandparents in the countryside.",
            "ipa": "/ˈjɛstərdeɪ wiː ˈvɪzɪtɪd ˈaʊər ˈɡrændˌpɛərənts ɪn ðə ˈkʌntrisaɪd/",
            "es": "Ayer visitamos a nuestros abuelos en el campo."
          },
          {
            "en": "I cleaned my bedroom and washed the family car on Saturday.",
            "ipa": "/aɪ kliːnd maɪ ˈbɛdruːm ænd wɑːʃt ðə ˈfæməli kɑːr ɒn ˈsætərdeɪ/",
            "es": "Limpié mi dormitorio y lavé el carro familiar el sábado."
          },
          {
            "en": "She cooked a delicious meal and invited all our neighbors.",
            "ipa": "/ʃiː kʊkt ə dɪˈlɪʃəs miːl ænd ɪnˈvaɪtɪd ɔːl ˈaʊər ˈneɪbərz/",
            "es": "Ella cocinó una comida deliciosa e invitó a todos nuestros vecinos."
          },
          {
            "en": "We walked to the park and watched the children play.",
            "ipa": "/wiː wɔːkt tuː ðə pɑːrk ænd wɑːtʃt ðə ˈtʃɪldrən pleɪ/",
            "es": "Caminamos hacia el parque y miramos a los niños jugar."
          },
          {
            "en": "They decided to stay at home because it rained all afternoon.",
            "ipa": "/ðeɪ dɪˈsaɪdɪd tuː steɪ æt hoʊm bɪˈkɒz ɪt reɪnd ɔːl ˌæftərˈnuːn/",
            "es": "Ellos decidieron quedarse en casa porque llovió toda la tarde."
          }
        ],
        "takeaways": [
          "La terminación -ed solo suena como sílaba extra (/ɪd/) si el verbo termina en sonido T o D ('wanted', 'needed').",
          "En todos los demás casos la 'e' es muda: 'worked' suena /wɜːrkt/, 'played' suena /pleɪd/.",
          "El pasado simple regular no cambia según el pronombre: 'I worked', 'She worked', 'They worked'."
        ],
        "instructions": [
          "Clasifica los 4 verbos regulares según el sonido de su terminación -ed.",
          "Identifica cuáles agregan sílaba extra (/ɪd/) y cuáles tienen 'e' muda (/t/ o /d/).",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Solo termina en /ɪd/ si la palabra base termina en letra o sonido 't' (want) o 'd' (decide).",
        "quiz": {
          "q": "¿En cuál de los siguientes verbos en pasado simple la terminación '-ed' añade una sílaba adicional a la pronunciación (/ɪd/)?",
          "opts": [
            "Cooked (cocinó)",
            "Visited (visitó)",
            "Watched (observó)",
            "Played (jugó)"
          ],
          "correct": 1,
          "fb": "¡Exacto! 'Visit' termina en sonido 'T', por lo que al añadir -ed se pronuncia obligatoriamente con una sílaba extra: /ˈvɪzɪtɪd/."
        },
        "exercise": {
          "audioText": "Decided. Asked. Waited. Called.",
          "type": "classification_bins",
          "title": "Laboratorio Fonético: ¿Pronunciación /ɪd/ o 'E' Muda?",
          "categories": [
            {
              "id": "id_sound",
              "title": "Sonido /ɪd/ (Añade sílaba extra: base termina en T o D)"
            },
            {
              "id": "silent_e",
              "title": "'E' Muda /t/ o /d/ (Mismo número de sílabas)"
            }
          ],
          "items": [
            {
              "id": "v1",
              "text": "Decided (Decidió)",
              "target": "id_sound"
            },
            {
              "id": "v2",
              "text": "Asked (Preguntó)",
              "target": "silent_e"
            },
            {
              "id": "v3",
              "text": "Waited (Esperó)",
              "target": "id_sound"
            },
            {
              "id": "v4",
              "text": "Called (Llamó)",
              "target": "silent_e"
            }
          ],
          "evaluator": (state) => {
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
        "n": 14,
        "title": "Pasado Simple: Verbos Irregulares y Preguntas con 'Did'",
        "unit": 5,
        "level": "A2-B1",
        "p1": "Muchos de los verbos más importantes del inglés no aceptan '-ed': son **irregulares** y cambian su raíz: *go -> went, see -> saw, have -> had, buy -> bought, take -> took, write -> wrote*. No hay una regla matemática para deducirlos; se aprenden por exposición, asociación de patrones y práctica.",
        "p2": "Para hacer preguntas o negar en pasado, usamos el auxiliar **DID** o **DIDN'T**. Y aquí se aplica la misma regla de oro que aprendimos con Do/Does: **cuando DID o DIDN'T están presentes, el verbo vuelve a su forma base en presente**: *'Did you see that?'* (NUNCA *'Did you saw that?'*), *'I didn't buy the tickets'* (NUNCA *'I didn't bought'*). ¡Did ya hizo todo el trabajo del pasado!",
        "audioSentences": [
          {
            "en": "Did you have a good weekend with your family?",
            "ipa": "/dɪd juː hæv ə ɡʊd ˈwiːkɛnd wɪð jɔːr ˈfæməli/",
            "es": "¿Tuviste un buen fin de semana con tu familia?"
          },
          {
            "en": "I went to the beach with my cousins last summer.",
            "ipa": "/aɪ wɛnt tuː ðə biːtʃ wɪð maɪ ˈkʌznz læst ˈsʌmər/",
            "es": "Fui a la playa con mis primos el verano pasado."
          },
          {
            "en": "She bought fresh vegetables and made a traditional soup.",
            "ipa": "/ʃiː bɔːt frɛʃ ˈvɛdʒtəblz ænd meɪd ə trəˈdɪʃənl suːp/",
            "es": "Ella compró verduras frescas e hizo una sopa tradicional."
          },
          {
            "en": "Where did you go on vacation two years ago?",
            "ipa": "/wɛər dɪd juː ɡoʊ ɒn veɪˈkeɪʃn tuː jɪərz əˈɡoʊ/",
            "es": "¿A dónde fuiste de vacaciones hace dos años?"
          },
          {
            "en": "We saw a wonderful musical at the downtown theater.",
            "ipa": "/wiː sɔː ə ˈwʌndərfl ˈmjuːzɪkl æt ðə ˈdaʊntaʊn ˈθiːətər/",
            "es": "Vimos un maravilloso musical en el teatro del centro."
          }
        ],
        "takeaways": [
          "Verbos irregulares comunes: go->went, buy->bought, see->saw, make->made, have->had.",
          "Con 'Did' o 'Didn't', el verbo principal va SIEMPRE en forma base (infinitivo sin 'to').",
          "En afirmaciones usa la forma irregular ('I went'); en negaciones y preguntas usa Did + base ('Did you go?')."
        ],
        "instructions": [
          "Identifica el error en la pregunta en pasado y selecciona la corrección adecuada.",
          "Recuerda la regla de oro del auxiliar 'Did'.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Si la pregunta tiene 'Did', el verbo no puede estar en forma pasada (saw/went).",
        "quiz": {
          "q": "¿Cuál de las siguientes oraciones formula una pregunta y negación en pasado de forma gramaticalmente correcta?",
          "opts": [
            "Did you went to the office yesterday? - No, I didn't went.",
            "Did you go to the office yesterday? - No, I didn't go.",
            "Did you go to the office yesterday? - No, I didn't went.",
            "Were you go to the office yesterday? - No, I didn't go."
          ],
          "correct": 1,
          "fb": "¡Exacto! Con 'Did' y 'didn't', el verbo principal siempre debe estar en su forma base: 'Did you go?' y 'I didn't go'."
        },
        "exercise": {
          "audioText": "What did you buy at the store?",
          "type": "sequence_sort",
          "title": "Constructor de Preguntas en Pasado",
          "items": [
            {
              "id": "w1",
              "text": "What"
            },
            {
              "id": "w2",
              "text": "did"
            },
            {
              "id": "w3",
              "text": "you"
            },
            {
              "id": "w4",
              "text": "buy"
            },
            {
              "id": "w5",
              "text": "at"
            },
            {
              "id": "w6",
              "text": "the"
            },
            {
              "id": "w7",
              "text": "store?"
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6",
            "w7"
          ],
          "evaluator": (state) => {
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
        "n": 15,
        "title": "Pasado Continuo y 'Used to': Acciones Interrumpidas (When / While)",
        "unit": 5,
        "level": "A2-B1",
        "p1": "El **Past Continuous** describe una acción que estaba en progreso en un momento concreto del pasado: **was / were + verbo con -ing** (*'I was sleeping at 10 PM'*, *'They were working'*). A menudo se combina con el Past Simple para expresar una **acción que fue interrumpida por otra**: la acción larga en desarrollo va en Past Continuous, y la acción corta que interrumpe va en Past Simple.",
        "p2": "Los conectores clave son **WHILE** (mientras, introduce la acción continua: *'While I was coding...'*) y **WHEN** (cuando, introduce la interrupción puntual: *'...when the power went out'*). Por otro lado, para hablar de hábitos o estados pasados que ya no existen hoy en día, usamos la estructura **USED TO** (*'I used to play soccer, but now I play tennis'*, traducción: 'Yo solía jugar...').",
        "audioSentences": [
          {
            "en": "I was doing my English homework when my mother called me.",
            "ipa": "/aɪ wəz ˈduːɪŋ maɪ ˈɪŋɡlɪʃ ˈhoʊmwɜːrk wɛn maɪ ˈmʌðər kɔːld miː/",
            "es": "Estaba haciendo mi tarea de inglés cuando mi madre me llamó."
          },
          {
            "en": "When I was a child, I used to ride my bicycle with my friends every afternoon.",
            "ipa": "/wɛn aɪ wəz ə tʃaɪld aɪ juːst tuː raɪd maɪ ˈbaɪsɪkl wɪð maɪ frɛndz ˈɛvri ˌæftərˈnuːn/",
            "es": "Cuando era niño, solía montar mi bicicleta con mis amigos todas las tardes."
          },
          {
            "en": "While we were eating dinner, the power went out.",
            "ipa": "/waɪl wiː wɜːr ˈiːtɪŋ ˈdɪnər ðə ˈpaʊər wɛnt aʊt/",
            "es": "Mientras estábamos cenando, se cortó la luz."
          },
          {
            "en": "Did you use to spend holidays with your grandparents in the mountains?",
            "ipa": "/dɪd juː juːst tuː spɛnd ˈhɒlədeɪz wɪð jɔːr ˈɡrændˌpɛərənts ɪn ðə ˈmaʊntənz/",
            "es": "¿Solías pasar las vacaciones con tus abuelos en las montañas?"
          },
          {
            "en": "She was sleeping peacefully when the phone alarm went off.",
            "ipa": "/ʃiː wəz ˈsliːpɪŋ ˈsaʊndli wɛn ðə foʊn əˈlɑːrm wɛnt ɔːf/",
            "es": "Ella estaba durmiendo plácidamente cuando sonó la alarma del teléfono."
          }
        ],
        "takeaways": [
          "Past Continuous = was/were + -ing para acciones en desarrollo en el pasado.",
          "Fórmula clásica de interrupción: Past Continuous (acción larga) + WHEN + Past Simple (interrupción puntual).",
          "'Used to' expresa costumbres pasadas que ya no realizas en el presente."
        ],
        "instructions": [
          "Completa la anécdota seleccionando entre Past Continuous (was/were doing) y Past Simple (did).",
          "Analiza qué acción estaba en progreso y cuál fue la que interrumpió el momento.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "La acción continua (larga) lleva was/were + -ing; la que interrumpe lleva pasado simple (-ed / irregular).",
        "quiz": {
          "q": "¿Cuál de las siguientes oraciones combina correctamente una acción interrumpida en el pasado?",
          "opts": [
            "I walked in the park when it was starting to rain.",
            "I was walking in the park when it started to rain.",
            "I was walking in the park while it was started to rain.",
            "I walk in the park when it started to rain."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'I was walking' (acción continua en desarrollo) se interrumpió puntualmente con 'when it started to rain' (pasado simple)."
        },
        "exercise": {
          "audioText": "While I was driving to the office, a strange noise started in the engine, so I stopped the car.",
          "type": "fill_blanks",
          "title": "Laboratorio de Narrativa: Acciones Interrumpidas",
          "sentence": "While I ___ (drive) to the office, a strange noise ___ (start) in the engine, so I ___ (stop) the car.",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "Acción en curso...",
              "options": [
                "was driving",
                "drove",
                "were driving"
              ],
              "answer": "was driving"
            },
            {
              "id": "b2",
              "placeholder": "Interrupción...",
              "options": [
                "started",
                "was starting",
                "starts"
              ],
              "answer": "started"
            },
            {
              "id": "b3",
              "placeholder": "Acción posterior...",
              "options": [
                "stopped",
                "was stopping",
                "stops"
              ],
              "answer": "stopped"
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 6,
    "title": "Unidad 6: El Futuro & Posibilidades",
    "level": "B1 Intermedio Sólido",
    "badge": {
      "id": "badge_visionary",
      "icon": "🔮",
      "name": "Future Architect",
      "desc": "Proyectas planes, predicciones y situaciones condicionales con soltura."
    },
    "externalPractice": {
      "provider": "BBC 6 Minute English",
      "badge": "Escucha & Futuro",
      "title": "Dominio de Will, Going to y Condicionales",
      "url": "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
      "description": "Episodios breves de audio con transcripción interactiva discutiendo el futuro de la tecnología, IA y cambio climático.",
      "tasks": [
        "Escucha un episodio sobre predicciones tecnológicas identificando el uso de 'will' y 'might'.",
        "Escribe 3 predicciones para el año 2030 usando 'will' y 3 planes personales usando 'going to'.",
        "Practica frases del primer y segundo condicional en voz alta."
      ],
      "recommendedMetric": "Distinguir entre decisión espontánea (will) y plan premeditado (going to)."
    },
    "lessons": [
      {
        "n": 16,
        "title": "Futuro con 'Going to' vs 'Will': Planes vs Decisiones Espontáneas",
        "unit": 6,
        "level": "B1",
        "p1": "El inglés no tiene un único tiempo verbal 'futuro'; utiliza diferentes estructuras según la intención del hablante. **BE GOING TO** se usa para **planes previos, intenciones decididas antes de hablar y evidencias presentes claras** (*'I am going to study medicine next year'*, *'Look at those black clouds, it is going to rain'*).",
        "p2": "Por el contrario, **WILL** se usa para **decisiones espontáneas tomadas en el momento mismo de hablar** (*'The phone is ringing. I'll get it!'*), promesas (*'I will always help you'*), ofertas de ayuda (*'I'll carry that bag for you'*) y predicciones basadas en opiniones personales (*'I think AI will change the world'*). La contracción de will es **'ll** (*I'll, you'll, they'll*) y su negación es **won't** (*will not*).",
        "audioSentences": [
          {
            "en": "Next summer, our family is going to travel to Peru on vacation.",
            "ipa": "/nɛkst ˈsʌmər ˈaʊər ˈfæməli ɪz ˈɡoʊɪŋ tuː ˈtrævl tuː pəˈruː ɒn veɪˈkeɪʃn/",
            "es": "El próximo verano, nuestra familia va a viajar a Perú de vacaciones."
          },
          {
            "en": "Don't worry, I will help you pack your travel suitcase right now.",
            "ipa": "/doʊnt ˈwʌri aɪ wɪl hɛlp juː pæk jɔːr ˈtrævl ˈsuːtkeɪs raɪt naʊ/",
            "es": "No te preocupes, te ayudaré a empacar tu maleta de viaje ahora mismo."
          },
          {
            "en": "I am going to practice English every day to achieve my dream job.",
            "ipa": "/aɪ æm ˈɡoʊɪŋ tuː ˈpræktɪs ˈɪŋɡlɪʃ ˈɛvri deɪ tuː əˈtʃiːv maɪ driːm dʒɒb/",
            "es": "Voy a practicar inglés todos los días para alcanzar el trabajo de mis sueños."
          },
          {
            "en": "Look at those dark clouds! It is going to rain during our outdoor tour.",
            "ipa": "/lʊk æt ðoʊz dɑːrk klaʊdz ɪt ɪz ˈɡoʊɪŋ tuː reɪn ˈdjʊərɪŋ ˈaʊər ˈaʊtdɔːr tʊər/",
            "es": "¡Mira esas nubes oscuras! Va a llover durante nuestro recorrido al aire libre."
          },
          {
            "en": "I think you will have a wonderful and relaxing trip.",
            "ipa": "/aɪ θɪŋk juː wɪl hæv ə ˈwʌndərfl ænd rɪˈlæksɪŋ trɪp/",
            "es": "Creo que tendrás un viaje maravilloso y relajante."
          }
        ],
        "takeaways": [
          "Going to = Planes organizados previamente y predicciones con evidencia visual evidente.",
          "Will ('ll) = Decisiones instantáneas tomadas al instante de hablar, promesas y ofertas.",
          "La negación de will es 'won't' (/woʊnt/); nunca digas 'will not' salvo para enfatizar fuertemente."
        ],
        "instructions": [
          "Clasifica los 4 escenarios según corresponda usar 'Will (Decisión espontánea / Promesa)' o 'Going to (Plan premeditado / Evidencia)'.",
          "Analiza si la persona ya había planeado la acción o si reacciona en el momento.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Si suena el timbre o te ofrecen un café y decides en 1 segundo: usa WILL. Si compraste boletos de avión hace 2 semanas: usa GOING TO.",
        "quiz": {
          "q": "¿Cuál de las siguientes frases requiere 'WILL' en vez de 'GOING TO'?",
          "opts": [
            "Ya compré mis boletos de avión para viajar a Londres el próximo mes.",
            "Alguien toca el timbre de tu casa y dices: '¡Yo abro!'.",
            "Ves el calendario y revisas tu boda programada para el 15 de julio.",
            "Una mujer con 9 meses de embarazo a punto de entrar a sala de parto."
          ],
          "correct": 1,
          "fb": "¡Exacto! Decidir abrir la puerta ante el timbre es una decisión instantánea y espontánea: 'I'll get it!' (Will)."
        },
        "exercise": {
          "audioText": "I forgot my wallet. Don't worry, I will pay for lunch. We have already booked the flight tickets; we are going to travel to Japan. I promise I will never lie to you again. Those dark clouds look terrible. It is going to storm.",
          "type": "classification_bins",
          "title": "Auditoría de Futuro: ¿'Will' o 'Be Going To'?",
          "categories": [
            {
              "id": "will",
              "title": "Will (Espontáneo / Oferta / Promesa)"
            },
            {
              "id": "going_to",
              "title": "Going To (Plan previo / Evidencia física)"
            }
          ],
          "items": [
            {
              "id": "f1",
              "text": "'I forgot my wallet.' - 'Don't worry, I will pay for lunch.'",
              "target": "will"
            },
            {
              "id": "f2",
              "text": "We have already booked the flight tickets; we are going to travel to Japan.",
              "target": "going_to"
            },
            {
              "id": "f3",
              "text": "'I promise I will never lie to you again.'",
              "target": "will"
            },
            {
              "id": "f4",
              "text": "Those dark clouds look terrible. It is going to storm.",
              "target": "going_to"
            }
          ],
          "evaluator": (state) => {
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
        "n": 17,
        "title": "Primer Condicional: Situaciones Reales y Probables",
        "unit": 6,
        "level": "B1",
        "p1": "El **First Conditional** se utiliza para hablar de situaciones futuras posibles y sus consecuencias lógicas directas: *'Si estudias, aprobarás el examen'*. La estructura fundamental es: **IF + Present Simple, WILL + Verbo Base**. También puedes invertir las cláusulas sin cambiar el significado: *'You will pass the exam if you study'* (nota que cuando 'if' va al medio, no se coloca coma).",
        "p2": "El error número 1 de los estudiantes es meter 'will' dentro de la cláusula de 'if': en español decimos 'Si lloverá...', pero en inglés es estrictamente **IF + PRESENTE**: *'If it rains tomorrow, we will cancel the picnic'* (NUNCA *'If it will rain'*). En lugar de 'will', también puedes usar modales como *can, might o should* en la consecuencia (*'If you have time, you should call her'*).",
        "audioSentences": [
          {
            "en": "If I save enough money this year, I will book a flight to Canada.",
            "ipa": "/ɪf aɪ seɪv ɪˈnʌf ˈmʌni ðɪs jɪər aɪ wɪl bʊk ə flaɪt tuː ˈkænədə/",
            "es": "Si ahorro suficiente dinero este año, reservaré un vuelo a Canadá."
          },
          {
            "en": "If you practice speaking 20 minutes a day, you will speak with confidence.",
            "ipa": "/ɪf juː ˈpræktɪs ˈspiːkɪŋ ˈtwɛnti ˈmɪnɪts ə deɪ juː wɪl spiːk wɪð ˈkɒnfɪdəns/",
            "es": "Si practicas conversación 20 minutos al día, hablarás con confianza."
          },
          {
            "en": "If our flight arrives on time, we will meet our tour guide at the airport.",
            "ipa": "/ɪf ˈaʊər flaɪt əˈraɪvz ɒn taɪm wiː wɪl miːt ˈaʊər tʊər ɡaɪd æt ði ˈɛərpɔːrt/",
            "es": "Si nuestro vuelo llega a tiempo, nos reuniremos con nuestro guía turístico en el aeropuerto."
          },
          {
            "en": "What will you do if the weather is rainy tomorrow?",
            "ipa": "/wʌt wɪl juː duː ɪf ðə ˈwɛðər ɪz ˈreɪni təˈmɒroʊ/",
            "es": "¿Qué harás si el clima está lluvioso mañana?"
          },
          {
            "en": "If she passes her English test, she will apply for the international scholarship.",
            "ipa": "/ɪf ʃiː ˈpæsɪz hər ˈɪŋɡlɪʃ tɛst ʃiː wɪl əˈplaɪ fər ði ˌɪntərˈnæʃnəl ˈskɒlərʃɪp/",
            "es": "Si ella aprueba su examen de inglés, postulará a la beca internacional."
          }
        ],
        "takeaways": [
          "Estructura del Primer Condicional: If + Presente Simple, consecuencia con Will + infinitivo.",
          "REGLA DE ORO: Jamás uses 'will' inmediatamente después de 'If'.",
          "Si la cláusula con 'If' va primero, se separa con coma; si va en segundo lugar, no lleva coma."
        ],
        "instructions": [
          "Ordena las palabras para formar una oración válida de Primer Condicional.",
          "La frase debe significar: 'Si llueve mañana, me quedaré en casa.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Estructura: If + it rains tomorrow, + I will stay at home.",
        "quiz": {
          "q": "¿Cuál de las siguientes oraciones respeta estrictamente la regla del Primer Condicional?",
          "opts": [
            "If it will rain tomorrow, I will stay at home.",
            "If it rains tomorrow, I will stay at home.",
            "If it rains tomorrow, I stay at home.",
            "If it rained tomorrow, I would stay at home."
          ],
          "correct": 1,
          "fb": "¡Exacto! La cláusula de 'if' debe usar Presente Simple ('If it rains'), y la consecuencia usa 'will' + verbo base ('I will stay')."
        },
        "exercise": {
          "audioText": "If it rains tomorrow, I will stay at home.",
          "type": "sequence_sort",
          "title": "Constructor de Primer Condicional",
          "items": [
            {
              "id": "w1",
              "text": "If"
            },
            {
              "id": "w2",
              "text": "it"
            },
            {
              "id": "w3",
              "text": "rains"
            },
            {
              "id": "w4",
              "text": "tomorrow,"
            },
            {
              "id": "w5",
              "text": "I"
            },
            {
              "id": "w6",
              "text": "will"
            },
            {
              "id": "w7",
              "text": "stay"
            },
            {
              "id": "w8",
              "text": "at home."
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6",
            "w7",
            "w8"
          ],
          "evaluator": (state) => {
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
        "n": 18,
        "title": "Segundo Condicional: Hipótesis, Sueños y Consejos (If I were you...)",
        "unit": 6,
        "level": "B1",
        "p1": "El **Second Conditional** se usa para situaciones hipotéticas, imaginarias, sueños o condiciones contrarias a la realidad presente: *'Si tuviera un millón de dólares, viajaría por el mundo'*. La fórmula es: **IF + Past Simple, WOULD + Verbo Base** (*'If I had a million dollars, I would travel the world'*).",
        "p2": "Una particularidad formal y muy elegante del segundo condicional es que con el verbo To Be se prefiere usar **WERE** para todas las personas gramaticales, incluso con I, He, She e It: *'If I were you, I would accept the job offer'* ('Si yo fuera tú, aceptaría la oferta de trabajo' — la forma reina para dar consejos en inglés). En lenguaje informal se escucha a veces *'If I was'*, pero en exámenes y entornos profesionales *'If I were'* es el estándar.",
        "audioSentences": [
          {
            "en": "If I had two months of vacation, I would travel all around the world.",
            "ipa": "/ɪf aɪ hæd tuː mʌnθs əv veɪˈkeɪʃn aɪ wʊd ˈtrævl ɔːl əˈraʊnd ðə wɜːrld/",
            "es": "Si tuviera dos meses de vacaciones, viajaría por todo el mundo."
          },
          {
            "en": "If I were you, I would take that opportunity to study English abroad.",
            "ipa": "/ɪf aɪ wɜːr juː aɪ wʊd teɪk ðæt ˌɒpərˈtjuːnɪti tuː ˈstʌdi ˈɪŋɡlɪʃ əˈbrɔːd/",
            "es": "Si yo fuera tú, aprovecharía esa oportunidad de estudiar inglés en el extranjero."
          },
          {
            "en": "Where would you go if you could visit any historic city today?",
            "ipa": "/wɛər wʊd juː ɡoʊ ɪf juː kʊd ˈvɪzɪt ˈɛni hɪˈstɒrɪk ˈsɪti təˈdeɪ/",
            "es": "¿A dónde irías si pudieras visitar cualquier ciudad histórica hoy?"
          },
          {
            "en": "We would buy a house near the beach if we had more savings.",
            "ipa": "/wiː wʊd baɪ ə haʊs nɪər ðə biːtʃ ɪf wiː hæd mɔːr ˈseɪvɪŋz/",
            "es": "Compraríamos una casa cerca de la playa si tuviéramos más ahorros."
          },
          {
            "en": "If she spoke fluent English, she would easily achieve her career dream.",
            "ipa": "/ɪf ʃiː spoʊk ˈfluːənt ˈɪŋɡlɪʃ ʃiː wʊd ˈiːzəli əˈtʃiːv hər kəˈrɪər driːm/",
            "es": "Si ella hablara inglés con fluidez, alcanzaría fácilmente el sueño de su carrera."
          }
        ],
        "takeaways": [
          "Segundo condicional = If + Pasado Simple, consecuencia con Would + verbo base.",
          "Úsalo para dar consejos sabios: 'If I were you, I would...'.",
          "Diferencia clave: Primer condicional es probable en el futuro; segundo condicional es puramente hipotético e irreal hoy."
        ],
        "instructions": [
          "Completa la frase hipotética con la conjugación adecuada del Segundo Condicional.",
          "Verifica el uso de pasado simple en la condición y 'would' en la consecuencia.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "La cláusula del 'If' lleva pasado simple (had / were); la consecuencia lleva 'would' + infinitivo.",
        "quiz": {
          "q": "¿Cuál es la forma más formal y correcta de dar un consejo en inglés usando el segundo condicional?",
          "opts": [
            "If I am you, I will buy that car.",
            "If I were you, I would buy that car.",
            "If I would be you, I bought that car.",
            "If I had been you, I will buy that car."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'If I were you, I would...' es la fórmula por excelencia del inglés formal para dar consejos y plantear hipótesis."
        },
        "exercise": {
          "audioText": "If I were the CEO of this company, I would invest more in training, and our team would be much happier.",
          "type": "fill_blanks",
          "title": "Laboratorio de Escenarios Hipotéticos",
          "sentence": "If I ___ (be) the CEO of this company, I ___ (invest) more in training, and our team ___ (be) much happier.",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "Condición hipotética...",
              "options": [
                "were",
                "was",
                "am"
              ],
              "answer": "were"
            },
            {
              "id": "b2",
              "placeholder": "Consecuencia 1...",
              "options": [
                "would invest",
                "will invest",
                "invested"
              ],
              "answer": "would invest"
            },
            {
              "id": "b3",
              "placeholder": "Consecuencia 2...",
              "options": [
                "would be",
                "will be",
                "is"
              ],
              "answer": "would be"
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 7,
    "title": "Unidad 7: Modales & Matices",
    "level": "B1-B2 Intermedio",
    "badge": {
      "id": "badge_nuance",
      "icon": "🎯",
      "name": "Nuance & Modals Master",
      "desc": "Manejas la cortesía, deducción lógica y consejos como un hablante fluido."
    },
    "externalPractice": {
      "provider": "British Council Grammar Masterclass",
      "badge": "Modales en Acción",
      "title": "Matices de Modales: Permiso, Obligación y Deducción",
      "url": "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modal-verbs",
      "description": "Aprende la diferencia psicológica entre decir 'You must do it' (orden autoritaria) vs 'You have to do it' (requisito externo) vs 'You should do it' (consejo amistoso).",
      "tasks": [
        "Escucha 4 diálogos en entornos de oficina y anota los modales de cortesía utilizados.",
        "Aprende cómo usar 'could', 'may' y 'might' para sonar diplomático en negociaciones.",
        "Realiza el test de deducción lógica con 'must be' vs 'can't be'."
      ],
      "recommendedMetric": "90% de precisión en escenarios de obligación vs prohibición."
    },
    "lessons": [
      {
        "n": 19,
        "title": "Habilidad, Permiso y Cortesía: Can, Could y Be able to",
        "unit": 7,
        "level": "B1",
        "p1": "Los **verbos modales** son auxiliares especiales que modifican el significado del verbo principal. Tienen características únicas: **1.** No llevan '-s' en tercera persona (*'he can'*, jamás *'he cans'*); **2.** Van seguidos de un infinitivo sin 'to' (*'I can swim'*, nunca *'I can to swim'*); y **3.** No usan 'do/does/did' para preguntas o negaciones (*'Can you help me?'*).",
        "p2": "**CAN** expresa habilidad general en presente (*'I can speak English'*) y peticiones informales (*'Can I borrow your pen?'*). **COULD** es el pasado de can (*'When I was young, I could run fast'*) pero también la forma reina de la **cortesía diplomática** en el presente (*'Could you please send me the file?'*). Como 'can' no tiene futuro ni presente perfecto, usamos la alternativa perifrástica **BE ABLE TO** (*'I will be able to attend'*, *'I have been able to solve it'*).",
        "audioSentences": [
          {
            "en": "Could you please help me carry these heavy grocery bags?",
            "ipa": "/kʊd juː pliːz hɛlp miː ˈkæri ðiːz ˈhɛvi ˈɡroʊsəri bæɡz/",
            "es": "¿Podrías por favor ayudarme a cargar estas pesadas bolsas del supermercado?"
          },
          {
            "en": "Can you explain this pronunciation exercise to me one more time?",
            "ipa": "/kæn juː ɪkˈspleɪn ðɪs prəˌnʌnsiˈeɪʃn ˈɛksərsaɪz tuː miː wʌn mɔːr taɪm/",
            "es": "¿Puedes explicarme este ejercicio de pronunciación una vez más?"
          },
          {
            "en": "I wasn't able to come to class yesterday because I felt sick.",
            "ipa": "/aɪ ˈwɒznt ˈeɪbl tuː kʌm tuː klæs ˈjɛstərdeɪ bɪˈkɒz aɪ fɛlt sɪk/",
            "es": "No pude venir a clase ayer porque me sentía enfermo."
          },
          {
            "en": "Could I borrow your thermometer for a moment, please?",
            "ipa": "/kʊd aɪ ˈbɒroʊ jɔːr θərˈmɒmɪtər fər ə ˈmoʊmənt pliːz/",
            "es": "¿Podría pedirte prestado tu termómetro por un momento, por favor?"
          },
          {
            "en": "With regular practice, you will be able to speak with doctors clearly.",
            "ipa": "/wɪð ˈrɛɡjələr ˈpræktɪs juː wɪl biː ˈeɪbl tuː spiːk wɪð ˈdɒktərz ˈklɪərli/",
            "es": "Con práctica constante, serás capaz de hablar con doctores con claridad."
          }
        ],
        "takeaways": [
          "Los modales nunca llevan 's' en 3ª persona ni usan 'to' con el verbo siguiente.",
          "'Could' es mucho más educado y profesional que 'Can' para pedir favores o hacer solicitudes.",
          "Para expresar habilidad en futuro usa 'will be able to', ya que 'will can' es un error inexistente."
        ],
        "instructions": [
          "Ordena las palabras para redactar una solicitud formal y respetuosa en un email de trabajo.",
          "La frase debe significar: '¿Podría enviarme los documentos actualizados, por favor?'",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Inicia con el modal de cortesía: Could you please send me...",
        "quiz": {
          "q": "¿Cuál es la forma gramaticalmente correcta de expresar habilidad en el futuro ('Podré terminar mañana')?",
          "opts": [
            "I will can finish tomorrow.",
            "I will be able to finish tomorrow.",
            "I can will finish tomorrow.",
            "I will to be able finish tomorrow."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'Can' no tiene forma de futuro con 'will'; se debe utilizar obligatoriamente la perífrasis 'will be able to'."
        },
        "exercise": {
          "audioText": "Could you please send me the updated documents?",
          "type": "sequence_sort",
          "title": "Constructor de Cortesía Profesional",
          "items": [
            {
              "id": "w1",
              "text": "Could"
            },
            {
              "id": "w2",
              "text": "you"
            },
            {
              "id": "w3",
              "text": "please"
            },
            {
              "id": "w4",
              "text": "send"
            },
            {
              "id": "w5",
              "text": "me"
            },
            {
              "id": "w6",
              "text": "the"
            },
            {
              "id": "w7",
              "text": "updated"
            },
            {
              "id": "w8",
              "text": "documents?"
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6",
            "w7",
            "w8"
          ],
          "evaluator": (state) => {
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
        "n": 20,
        "title": "Obligación, Prohibición y Consejo: Must, Have to, Should",
        "unit": 7,
        "level": "B1",
        "p1": "La diferencia entre estos tres modales es una de las más ricas del inglés: **SHOULD** se usa para dar **consejos, recomendaciones u opiniones morales** (*'You should get some sleep'*, *'You shouldn't work so hard'*). Es una sugerencia amistosa, no una orden.",
        "p2": "Para obligación firme usamos **MUST** y **HAVE TO**: *Must* denota una obligación interna o personal (*'I must finish this today'*), mientras que *Have to* expresa una obligación externa o norma impuesta por la ley o la empresa (*'You have to wear a seatbelt'*). Pero ¡CUIDADO con las negaciones!: **DON'T HAVE TO** significa que **no es necesario** (tienes la opción libre: *'You don't have to come if you are tired'*), mientras que **MUSTN'T** significa **prohibición estricta** (*'You mustn't smoke here'*).",
        "audioSentences": [
          {
            "en": "You look exhausted; you should see a doctor and get some rest.",
            "ipa": "/juː lʊk ɪɡˈzɔːstɪd juː ʃʊd siː ə ˈdɒktər ænd ɡɛt sʌm rɛst/",
            "es": "Te ves agotado; deberías ver a un médico y descansar un poco."
          },
          {
            "en": "I have to take this prescribed medicine three times a day after meals.",
            "ipa": "/aɪ hæv tuː teɪk ðɪs prɪˈskraɪbd ˈmɛdsn θriː taɪmz ə deɪ ˈæftər miːlz/",
            "es": "Tengo que tomar este medicamento recetado tres veces al día después de las comidas."
          },
          {
            "en": "You mustn't take extra pills without asking the doctor first.",
            "ipa": "/juː ˈmʌsnt teɪk ˈɛkstrə pɪlz wɪðˈaʊt ˈæskɪŋ ðə ˈdɒktər fɜːrst/",
            "es": "No debes tomar pastillas adicionales sin consultar primero al médico (prohibido)."
          },
          {
            "en": "You should drink plenty of warm water and tea when you have a sore throat.",
            "ipa": "/juː ʃʊd drɪŋk ˈplɛnti əv wɔːrm ˈwɔːtər ænd tiː wɛn juː hæv ə sɔːr θroʊt/",
            "es": "Deberías beber abundante agua tibia y té cuando tengas dolor de garganta."
          },
          {
            "en": "We have to stay home if we have a fever to protect our classmates.",
            "ipa": "/wiː hæv tuː steɪ hoʊm ɪf wiː hæv ə ˈfiːvər tuː prəˈtɛkt ˈaʊər ˈklæsmeɪts/",
            "es": "Tenemos que quedarnos en casa si tenemos fiebre para proteger a nuestros compañeros."
          }
        ],
        "takeaways": [
          "Should = Consejo amistoso ('You should rest').",
          "Don't have to = Falta de obligación / Opcional ('No tienes que hacerlo si no quieres').",
          "Mustn't = Prohibición estricta ('Está prohibido terminantemente hacerlo')."
        ],
        "instructions": [
          "Clasifica los 4 enunciados según expresen 'Consejo (Should)', 'Prohibición Estricta (Mustn't)' o 'Sin Obligación / Opcional (Don't have to)'.",
          "Lee atentamente el impacto legal o de libertad en cada caso.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Don't have to = tienes la opción; Mustn't = no tienes opción, está prohibido.",
        "quiz": {
          "q": "Si en el museo la entrada es gratuita los domingos, ¿cuál es la frase adecuada para comunicárselo a un amigo?",
          "opts": [
            "You mustn't buy a ticket today.",
            "You shouldn't buy a ticket today.",
            "You don't have to buy a ticket today.",
            "You haven't to buy a ticket today."
          ],
          "correct": 2,
          "fb": "¡Exacto! 'You don't have to buy a ticket' significa que no es necesario (no hay obligación). 'Mustn't' significaría absurdamente que está penado o prohibido por ley comprarlo."
        },
        "exercise": {
          "audioText": "You mustn't touch the electrical cables. It is lethal. Tomorrow is Sunday, so I don't have to wake up early. You look exhausted; you should take a short break. You mustn't take photos inside the embassy.",
          "type": "classification_bins",
          "title": "Auditoría de Modales: ¿Obligación, Prohibición o Consejo?",
          "categories": [
            {
              "id": "advice",
              "title": "Consejo / Recomendación (Should)"
            },
            {
              "id": "prohibition",
              "title": "Prohibición Estricta (Mustn't)"
            },
            {
              "id": "optional",
              "title": "Sin Obligación / Opcional (Don't have to)"
            }
          ],
          "items": [
            {
              "id": "m1",
              "text": "You (mustn't) touch the electrical cables. It is lethal.",
              "target": "prohibition"
            },
            {
              "id": "m2",
              "text": "Tomorrow is Sunday, so I (don't have to) wake up early.",
              "target": "optional"
            },
            {
              "id": "m3",
              "text": "You look exhausted; you (should) take a short break.",
              "target": "advice"
            },
            {
              "id": "m4",
              "text": "You (mustn't) take photos inside the embassy.",
              "target": "prohibition"
            }
          ],
          "evaluator": (state) => {
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
        "n": 21,
        "title": "Deducción Lógica y Certeza: Must be, Can't be, Might / May",
        "unit": 7,
        "level": "B1-B2",
        "p1": "Los modales también sirven para expresar **qué tan seguros estamos de una conclusión lógica**: cuando estamos 95% seguros de que algo es verdad basándonos en evidencia contundente, usamos **MUST BE** (*'He has three sports cars; he must be rich'*). En este contexto, 'must' no significa obligación, sino **deducción de certeza absoluta**.",
        "p2": "Por el contrario, cuando estamos 95% seguros de que algo es **imposible**, usamos **CAN'T BE** (*'That can't be John; he is currently in Japan'* — ¡NUNCA digas *'mustn't be'* para deducción negativa!). Y si no estamos seguros y algo es solo una posibilidad (alrededor del 40-50%), usamos **MIGHT** o **MAY** (*'Take an umbrella; it might rain later'*).",
        "audioSentences": [
          {
            "en": "She didn't come to dinner tonight; she must be feeling sick.",
            "ipa": "/ʃiː ˈdɪdnt kʌm tuː ˈdɪnər təˈnaɪt ʃiː mʌst biː ˈfiːlɪŋ sɪk/",
            "es": "Ella no vino a cenar esta noche; debe de estar sintiéndose enferma."
          },
          {
            "en": "He might need some help carrying those medicine boxes.",
            "ipa": "/hiː maɪt niːd sʌm hɛlp ˈkæriɪŋ ðoʊz ˈmɛdsn ˈbɒksɪz/",
            "es": "Él podría necesitar ayuda cargando esas cajas de medicamentos."
          },
          {
            "en": "That can't be his medical prescription; the name is completely different.",
            "ipa": "/ðæt kænt biː hɪz ˈmɛdɪkl prɪˈskrɪpʃn ðə neɪm ɪz kəmˈpliːtli ˈdɪfrənt/",
            "es": "Esa no puede ser su receta médica; el nombre es completamente diferente."
          },
          {
            "en": "They may be at the community clinic right now.",
            "ipa": "/ðeɪ meɪ biː æt ðə kəˈmjuːnɪti ˈklɪnɪk raɪt naʊ/",
            "es": "Ellos podrían estar en la clínica comunitaria en este momento."
          },
          {
            "en": "You haven't eaten anything all morning; you must be very hungry.",
            "ipa": "/juː ˈhævnt ˈiːtn ˈɛniθɪŋ ɔːl ˈmɔːrnɪŋ juː mʌst biː ˈvɛri ˈhʌŋɡri/",
            "es": "No has comido nada en toda la mañana; debes de tener mucha hambre."
          }
        ],
        "takeaways": [
          "Must be = Certeza lógica positiva ('Debe de ser...').",
          "Can't be = Certeza lógica de imposibilidad ('No puede ser...'). Jamás uses 'mustn't be' para deducir.",
          "Might / May = Posibilidad abierta ('Quizá / Podría ser')."
        ],
        "instructions": [
          "Completa las 3 deducciones lógicas según la evidencia aportada.",
          "Elige entre 'must be' (seguro que sí), 'can't be' (seguro que no) o 'might be' (tal vez).",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Si una persona acaba de correr 42 kilómetros, 'must be' exhausta. Si alguien vive en Tokio, 'can't be' en Nueva York ahora mismo.",
        "quiz": {
          "q": "Ves a alguien que se parece a tu amigo Pedro, pero sabes a ciencia cierta que Pedro está de viaje en Australia. ¿Qué dices en inglés nativo?",
          "opts": [
            "That mustn't be Pedro.",
            "That can't be Pedro.",
            "That shouldn't be Pedro.",
            "That don't have to be Pedro."
          ],
          "correct": 1,
          "fb": "¡Exacto! Para expresar que algo es lógicamente imposible se usa estrictamente 'can't be' (*That can't be Pedro*). El uso de 'mustn't be' para deducción es un error típico."
        },
        "exercise": {
          "audioText": "He has worked 16 hours today; he must be exhausted. That bill is $500; it can't be correct for just two coffees! Check it; they might have made a mistake.",
          "type": "fill_blanks",
          "title": "Laboratorio de Deducción Lógica",
          "sentence": "He has worked 16 hours today; he ___ (must be / can't be) exhausted. That bill is $500; it ___ (can't be / must be) correct for just two coffees! Check it; they ___ (might have / must have) made a mistake.",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "Cansancio...",
              "options": [
                "must be",
                "can't be",
                "might be"
              ],
              "answer": "must be"
            },
            {
              "id": "b2",
              "placeholder": "Cuenta absurda...",
              "options": [
                "can't be",
                "must be",
                "might be"
              ],
              "answer": "can't be"
            },
            {
              "id": "b3",
              "placeholder": "Posible error...",
              "options": [
                "might have",
                "can't have",
                "must not"
              ],
              "answer": "might have"
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 8,
    "title": "Unidad 8: Conexión & Experiencias",
    "level": "B1-B2 Intermedio Superior",
    "badge": {
      "id": "badge_connector",
      "icon": "🌟",
      "name": "Experience Connector",
      "desc": "Conectas el pasado con el presente mediante el Presente Perfecto."
    },
    "externalPractice": {
      "provider": "Cambridge English Grammar Track",
      "badge": "Tiempos Compuestos",
      "title": "Present Perfect vs Past Simple: La Línea del Tiempo",
      "url": "https://www.cambridgeenglish.org/learning-english/activities-for-learners/b1g003-present-perfect-and-past-simple",
      "description": "Visualizador de línea temporal para entender por qué decir 'I have lived in London for 3 years' significa que todavía vives allí, pero 'I lived in London for 3 years' significa que ya te fuiste.",
      "tasks": [
        "Resuelve 15 ejercicios identificando marcadores temporales terminados (yesterday, in 2020) vs abiertos (this week, so far).",
        "Practica responder preguntas con 'Have you ever...?' en voz alta.",
        "Escribe un breve resumen de tus logros profesionales usando Present Perfect."
      ],
      "recommendedMetric": "100% de aciertos diferenciando 'For' (duración) y 'Since' (punto de inicio)."
    },
    "lessons": [
      {
        "n": 22,
        "title": "Presente Perfecto: Estructura con Have/Has y Participio Pasado",
        "unit": 8,
        "level": "B1-B2",
        "p1": "El **Present Perfect** es el puente mágico entre el pasado y el presente. Se forma con el auxiliar **HAVE / HAS** seguido del **Past Participle (Participio Pasado)** del verbo (*worked, seen, eaten, done*). En tercera persona singular usamos **HAS** (*'She has lived here'*), y las contracciones son cotidianas: **I've, you've, he's, she's, we've, they've**.",
        "p2": "Su uso principal es para **experiencias de vida donde el momento exacto no importa** (*'I have visited Japan'* — lo importante es la experiencia acumulada, no la fecha) o para **acciones pasadas que tienen un resultado visible e impactante en el presente** (*'I have lost my keys'* — la consecuencia es que ahora mismo no puedo entrar a mi casa). Si mencionas la fecha exacta (*yesterday, in 2019, last week*), el Present Perfect queda terminantemente prohibido.",
        "audioSentences": [
          {
            "en": "I have lived in this welcoming community for five years.",
            "ipa": "/aɪ hæv lɪvd ɪn ðɪs ˈwɛlkəmɪŋ kəˈmjuːnɪti fər faɪv jɪərz/",
            "es": "He vivido en esta acogedora comunidad durante cinco años."
          },
          {
            "en": "She has prepared traditional family dishes from three different countries.",
            "ipa": "/ʃiː hæz prɪˈpɛərd trəˈdɪʃənl ˈfæməli ˈdɪʃɪz frəm θriː ˈdɪfrənt ˈkʌntriz/",
            "es": "Ella ha preparado platos familiares tradicionales de tres países diferentes."
          },
          {
            "en": "We have made many wonderful friends through our English course.",
            "ipa": "/wiː hæv meɪd ˈmɛni ˈwʌndərfl frɛndz θruː ˈaʊər ˈɪŋɡlɪʃ kɔːrs/",
            "es": "Hemos hecho muchos amigos maravillosos a través de nuestro curso de inglés."
          },
          {
            "en": "Have you visited your relatives in Mexico recently?",
            "ipa": "/hæv juː ˈvɪzɪtɪd jɔːr ˈrɛlətɪvz ɪn ˈmɛksɪkoʊ ˈriːsntli/",
            "es": "¿Has visitado a tus familiares en México recientemente?"
          },
          {
            "en": "He has learned how to introduce himself and speak with confidence.",
            "ipa": "/hiː hæz lɜːrnd haʊ tuː ˌɪntrəˈduːs hɪmˈsɛlf ænd spiːk wɪð ˈkɒnfɪdəns/",
            "es": "Él ha aprendido cómo presentarse y hablar con confianza."
          }
        ],
        "takeaways": [
          "Fórmula: Sujeto + have/has + Participio Pasado (3ª columna de la tabla de verbos).",
          "Úsalo para experiencias de vida y acciones pasadas con impacto directo en el presente.",
          "Si especificas cuándo ocurrió (ej. 'yesterday'), debes usar Pasado Simple, NO Presente Perfecto."
        ],
        "instructions": [
          "Ordena las palabras para formar una frase que exprese experiencia laboral en Presente Perfecto.",
          "La frase debe significar: 'He gestionado proyectos grandes en mi carrera.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Estructura: I have managed + large projects + in my career.",
        "quiz": {
          "q": "¿Cuál de las siguientes oraciones utiliza el Presente Perfecto de manera gramaticalmente correcta?",
          "opts": [
            "I have seen that movie yesterday night.",
            "I have seen that movie three times in my life.",
            "I have saw that movie three times in my life.",
            "She have seen that movie three times."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'I have seen that movie three times in my life' expresa una experiencia de vida acumulada sin fecha cerrada y usa el participio correcto 'seen'."
        },
        "exercise": {
          "audioText": "I have managed large projects in my career.",
          "type": "sequence_sort",
          "title": "Constructor de Experiencia: Presente Perfecto",
          "items": [
            {
              "id": "w1",
              "text": "I"
            },
            {
              "id": "w2",
              "text": "have"
            },
            {
              "id": "w3",
              "text": "managed"
            },
            {
              "id": "w4",
              "text": "large"
            },
            {
              "id": "w5",
              "text": "projects"
            },
            {
              "id": "w6",
              "text": "in"
            },
            {
              "id": "w7",
              "text": "my"
            },
            {
              "id": "w8",
              "text": "career."
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6",
            "w7",
            "w8"
          ],
          "evaluator": (state) => {
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
        "n": 23,
        "title": "Palabras Clave: Ever, Never, Already, Yet, Just",
        "unit": 8,
        "level": "B1-B2",
        "p1": "El Present Perfect cobra vida gracias a sus adverbios temporales: **EVER** significa 'alguna vez en la vida' y se usa en preguntas (*'Have you ever tasted sushi?'*). **NEVER** significa 'nunca en la vida' y va en oraciones afirmativas con significado negativo (*'I have never been to London'*). Ambos se colocan **entre el auxiliar have y el participio**.",
        "p2": "**JUST** expresa algo que ocurrió hace solo unos segundos (*'I have just received your email'*). **ALREADY** significa 'ya' (antes de lo esperado) y va antes del participio (*'I have already eaten'*). Y **YET** significa 'todavía no' en negaciones (*'I haven't finished yet'*) o 'ya' en preguntas (*'Have you eaten yet?'*), y **SIEMPRE va al final de la oración**.",
        "audioSentences": [
          {
            "en": "Have you ever traveled outside your home country?",
            "ipa": "/hæv juː ˈɛvər ˈtrævld ˌaʊtˈsaɪd jɔːr hoʊm ˈkʌntri/",
            "es": "¿Alguna vez has viajado fuera de tu país natal?"
          },
          {
            "en": "I have never tried spicy Asian cuisine before.",
            "ipa": "/aɪ hæv ˈnɛvər traɪd ˈspaɪsi ˈeɪʒn kwɪˈziːn bɪˈfɔːr/",
            "es": "Nunca antes he probado comida asiática picante."
          },
          {
            "en": "Don't worry, I have already completed my English practice for today.",
            "ipa": "/doʊnt ˈwʌri aɪ hæv ɔːlˈrɛdi kəmˈpliːtɪd maɪ ˈɪŋɡlɪʃ ˈpræktɪs fər təˈdeɪ/",
            "es": "No te preocupes, ya he completado mi práctica de inglés por hoy."
          },
          {
            "en": "Have you called your parents yet? - Yes, I have just finished talking to them.",
            "ipa": "/hæv juː kɔːld jɔːr ˈpɛərənts jɛt jɛs aɪ hæv dʒʌst ˈfɪnɪʃt ˈtɔːkɪŋ tuː ðɛm/",
            "es": "¿Ya llamaste a tus padres? - Sí, acabo de terminar de hablar con ellos."
          },
          {
            "en": "She hasn't packed her travel suitcase yet.",
            "ipa": "/ʃiː ˈhæznt pækt hər ˈtrævl ˈsuːtkeɪs jɛt/",
            "es": "Ella todavía no ha empacado su maleta de viaje."
          }
        ],
        "takeaways": [
          "EVER = en preguntas ('Have you ever...?'); NEVER = nunca en la vida ('I have never...').",
          "JUST = hace unos segundos ('I have just arrived').",
          "YET = en negaciones y preguntas, SIEMPRE al final de la frase ('not yet', 'finished yet?')."
        ],
        "instructions": [
          "Ubica cada marcador (Ever, Never, Already, Yet) en el contexto correcto.",
          "Presta atención a si se trata de una pregunta, negación o algo recién ocurrido.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Yet va al final de negaciones/preguntas; Just/Already/Ever/Never van entre have y el participio.",
        "quiz": {
          "q": "¿Cuál de las siguientes frases ubica el adverbio 'yet' de forma natural y gramaticalmente correcta?",
          "opts": [
            "I haven't yet finished the presentation.",
            "I haven't finished the presentation yet.",
            "I yet haven't finished the presentation.",
            "Yet I haven't finished the presentation."
          ],
          "correct": 1,
          "fb": "¡Correcto! En inglés estándar, 'yet' se coloca invariablemente al final de la oración negativa (*I haven't finished the presentation yet*)."
        },
        "exercise": {
          "audioText": "Have you ever seen this error before? No, I have never seen it, but our lead engineer has just resolved it, though he hasn't deployed the fix yet.",
          "type": "fill_blanks",
          "title": "Laboratorio de Marcadores Temporales",
          "sentence": "Have you ___ (ever/never) seen this error before? - No, I have ___ (never/ever) seen it, but our lead engineer has ___ (just/yet) resolved it, though he hasn't deployed the fix ___ (yet/already).",
          "blanks": [
            {
              "id": "b1",
              "placeholder": "En la pregunta...",
              "options": [
                "ever",
                "never",
                "already"
              ],
              "answer": "ever"
            },
            {
              "id": "b2",
              "placeholder": "Nunca en la vida...",
              "options": [
                "never",
                "ever",
                "yet"
              ],
              "answer": "never"
            },
            {
              "id": "b3",
              "placeholder": "Recién ocurrido...",
              "options": [
                "just",
                "yet",
                "ever"
              ],
              "answer": "just"
            },
            {
              "id": "b4",
              "placeholder": "Al final de la negación...",
              "options": [
                "yet",
                "already",
                "never"
              ],
              "answer": "yet"
            }
          ],
          "evaluator": (state) => {
            if (state.b1 === "ever" && state.b2 === "never" && state.b3 === "just" && state.b4 === "yet") {
              return { pass: true, msg: "¡Dominio total de marcadores! 'Have you ever...', 'I have never...', 'has just resolved it...', 'hasn't deployed it yet.' ¡Extraordinario!" };
            }
            return { pass: false, msg: "Revisa la ubicación: Pregunta de experiencia = ever; Negación vital = never; Acción recién hecha = just; Final de cláusula negativa = yet." };
          }
        }
      },
      {
        "n": 24,
        "title": "Presente Perfecto vs Pasado Simple: Cuándo usar cuál y For vs Since",
        "unit": 8,
        "level": "B1-B2",
        "p1": "Este es el dilema supremo de los estudiantes de nivel intermedio: ¿Cuándo usar Pasado Simple y cuándo Presente Perfecto? La regla es tajante: si el periodo de tiempo **ya terminó por completo** (palabras como *yesterday, in 2021, last year, two days ago, when I was a child*), usa obligatoriamente **Past Simple** (*'I visited Paris in 2018'*). Si el periodo sigue abierto o no se especifica fecha, usa **Present Perfect** (*'I have visited Paris'*).",
        "p2": "Para expresar duración hasta el presente usamos **FOR** y **SINCE**: **FOR** expresa un **lapso o cantidad de tiempo acumulado** (*for 3 years, for two weeks, for a long time*); mientras que **SINCE** indica el **punto exacto de inicio en el calendario** (*since 2020, since Monday, since I graduated*). Compara: *'I have lived here for 10 years'* (¡aún vivo aquí!) vs *'I lived here for 10 years'* (ya me mudé a otro lugar).",
        "audioSentences": [
          {
            "en": "I have studied English for six months, and last week I gave my first speech.",
            "ipa": "/aɪ hæv ˈstʌdid ˈɪŋɡlɪʃ fər sɪks mʌnθs ænd læst wiːk aɪ ɡeɪv maɪ fɜːrst spiːtʃ/",
            "es": "He estudiado inglés durante seis meses, y la semana pasada di mi primer discurso."
          },
          {
            "en": "We have lived in this city since 2018, but we moved here from Guadalajara.",
            "ipa": "/wiː hæv lɪvd ɪn ðɪs ˈsɪti sɪns ˈtwɛnti eɪˈtiːn bʌt wiː muːvd hɪər frəm ˌɡwɑːdələˈhɑːrə/",
            "es": "Hemos vivido en esta ciudad desde 2018, pero nos mudamos aquí desde Guadalajara."
          },
          {
            "en": "Did you enjoy your vacation last summer? - Yes, I have never had so much fun.",
            "ipa": "/dɪd juː ɪnˈdʒɔɪ jɔːr veɪˈkeɪʃn læst ˈsʌmər jɛs aɪ hæv ˈnɛvər hæd soʊ mʌtʃ fʌn/",
            "es": "¿Disfrutaste tus vacaciones el verano pasado? - Sí, nunca me había divertido tanto."
          },
          {
            "en": "She has known her best friend since childhood, and they met at school.",
            "ipa": "/ʃiː hæz noʊn hər bɛst frɛnd sɪns ˈtʃaɪldhʊd ænd ðeɪ mɛt æt skuːl/",
            "es": "Ella conoce a su mejor amiga desde la infancia, y se conocieron en la escuela."
          },
          {
            "en": "They arrived in town two hours ago and have already unpacked their luggage.",
            "ipa": "/ðeɪ əˈraɪvd ɪn taʊn tuː ˈaʊərz əˈɡoʊ ænd hæv ɔːlˈrɛdi ʌnˈpækt ðɛər ˈlʌɡɪdʒ/",
            "es": "Llegaron a la ciudad hace dos horas y ya han desempacado su equipaje."
          }
        ],
        "takeaways": [
          "Si hay fecha cerrada (yesterday, in 2015, ago) -> Pasado Simple obligatorio.",
          "FOR = duración o cantidad de tiempo ('for 5 days'); SINCE = punto de inicio ('since March').",
          "Present Perfect con 'for' significa que la acción continúa hoy; Past Simple con 'for' significa que ya concluyó."
        ],
        "instructions": [
          "Asigna cada caso a 'Present Perfect (Acción continua / Periodo abierto)' o 'Past Simple (Acción y tiempo terminados)'.",
          "Presta atención a los marcadores de tiempo cerrados.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Palabras como 'yesterday' o 'last year' amarran la acción al pasado cerrado (Past Simple).",
        "quiz": {
          "q": "¿Cuál de las siguientes dos oraciones implica que la persona TODAVÍA trabaja en Microsoft en el presente?",
          "opts": [
            "She worked at Microsoft for five years.",
            "She has worked at Microsoft for five years.",
            "She had worked at Microsoft for five years.",
            "She was working at Microsoft for five years."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'She has worked at Microsoft for five years' (Present Perfect) conecta el pasado con el presente y significa que ella aún trabaja allí hoy."
        },
        "exercise": {
          "audioText": "I graduated from university in 2021. We have known each other since high school. They moved to Canada two years ago. She has written three novels so far.",
          "type": "classification_bins",
          "title": "El Gran Duelo: ¿Past Simple o Present Perfect?",
          "categories": [
            {
              "id": "past_simple",
              "title": "Past Simple (Tiempo cerrado / Acción concluida)"
            },
            {
              "id": "present_perfect",
              "title": "Present Perfect (Periodo abierto / Continúa hoy)"
            }
          ],
          "items": [
            {
              "id": "t1",
              "text": "I (graduated) from university in 2021.",
              "target": "past_simple"
            },
            {
              "id": "t2",
              "text": "We (have known) each other since high school.",
              "target": "present_perfect"
            },
            {
              "id": "t3",
              "text": "They (moved) to Canada two years ago.",
              "target": "past_simple"
            },
            {
              "id": "t4",
              "text": "She (has written) three novels so far.",
              "target": "present_perfect"
            }
          ],
          "evaluator": (state) => {
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
    "unitId": 9,
    "title": "Unidad 9: Fluidez Real & Negocios",
    "level": "B2 Avanzado / Profesional",
    "badge": {
      "id": "badge_professional",
      "icon": "🏆",
      "name": "Bilingual Professional",
      "desc": "Dominas phrasal verbs, etiqueta laboral y erradicaste falsos amigos."
    },
    "externalPractice": {
      "provider": "Harvard Business Review & TED Talks",
      "badge": "Inglés de Impacto",
      "title": "Comunicación Ejecutiva, Negociaciones y Phrasal Verbs",
      "url": "https://www.ted.com/talks",
      "description": "Aprende el lenguaje de liderazgo, asertividad diplomática y negociación que usan directores y profesionales en entornos globales.",
      "tasks": [
        "Mira una charla TED con subtítulos en inglés y anota 5 'phrasal verbs' utilizados en contexto.",
        "Escribe un correo formal de seguimiento a un cliente ficticio usando fórmulas de cortesía.",
        "Revisa la lista de los 25 'False Friends' más peligrosos para hispanohablantes en los negocios."
      ],
      "recommendedMetric": "Identificar y reemplazar falsos amigos en un email corporativo."
    },
    "lessons": [
      {
        "n": 25,
        "title": "Phrasal Verbs Esenciales del Trabajo y Día a Día",
        "unit": 9,
        "level": "B2",
        "p1": "Los **Phrasal Verbs** son la verdadera frontera de la fluidez nativa. Consisten en la unión de un **verbo + una o dos partículas (preposiciones o adverbios)** que alteran por completo su significado literal. Por ejemplo, *look* es mirar, pero **look forward to** significa *'esperar con ansias y emoción'*, **look into** significa *'investigar un problema'* y **look after** significa *'cuidar a alguien'*.",
        "p2": "En el mundo laboral y tecnológico los phrasal verbs son omnipresentes: **call off** (cancelar una reunión), **figure out** (descubrir cómo resolver algo), **carry out** (llevar a cabo una tarea o experimento), **give up** (rendirse), **run out of** (quedarse sin suministros o tiempo) y **point out** (señalar o resaltar un dato). Si usas phrasal verbs con naturalidad en tus reuniones, sonarás como un profesional experimentado y no como un libro de texto.",
        "audioSentences": [
          {
            "en": "I am looking forward to our meeting tomorrow morning.",
            "ipa": "/aɪ æm ˈlʊkɪŋ ˈfɔːrwərd tuː ˈaʊər ˈmiːtɪŋ təˈmɒroʊ ˈmɔːrnɪŋ/",
            "es": "Espero con entusiasmo nuestra reunión de mañana por la mañana."
          },
          {
            "en": "We need to figure out why the office printer is not working.",
            "ipa": "/wiː niːd tuː ˈfɪɡjər aʊt waɪ ði ˈɒfɪs ˈprɪntər ɪz nɒt ˈwɜːrkɪŋ/",
            "es": "Necesitamos descifrar por qué la impresora de la oficina no está funcionando."
          },
          {
            "en": "They had to call off the outdoor team event due to heavy rain.",
            "ipa": "/ðeɪ hæd tuː kɔːl ɔːf ði ˈaʊtdɔːr tiːm ɪˈvɛnt djuː tuː ˈhɛvi reɪn/",
            "es": "Tuvieron que cancelar el evento al aire libre del equipo debido a la lluvia intensa."
          },
          {
            "en": "Please don't give up on learning English; practice a little every day.",
            "ipa": "/pliːz doʊnt ɡɪv ʌp ɒn ˈlɜːrnɪŋ ˈɪŋɡlɪʃ ˈpræktɪs ə ˈlɪtl ˈɛvri deɪ/",
            "es": "Por favor no te rindas con aprender inglés; practica un poco cada día."
          },
          {
            "en": "I ran into my former English teacher while shopping at the supermarket.",
            "ipa": "/aɪ ræn ˈɪntuː maɪ ˈfɔːrmər ˈɪŋɡlɪʃ ˈtiːtʃər waɪl ˈʃɒpɪŋ æt ðə ˈsuːpərmɑːrkɪt/",
            "es": "Me encontré por casualidad con mi antiguo profesor de inglés mientras compraba en el supermercado."
          }
        ],
        "takeaways": [
          "Un Phrasal Verb tiene un significado figurado que no se puede traducir palabra por palabra.",
          "Esenciales en el trabajo: 'look forward to' (esperar con gusto), 'call off' (cancelar), 'figure out' (resolver).",
          "Aprende los phrasal verbs dentro de oraciones completas, nunca en listas aisladas."
        ],
        "instructions": [
          "Une cada Phrasal Verb en inglés con su significado equivalente en español.",
          "Revisa con atención el significado contextual.",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Call off = cancelar; Figure out = resolver/descifrar; Look forward to = esperar con entusiasmo.",
        "quiz": {
          "q": "¿Qué significa la frase 'We have run out of time, so we must call off today's sync'?",
          "opts": [
            "Tenemos mucho tiempo libre, así que correremos antes de la sincronización.",
            "Nos hemos quedado sin tiempo, por lo que debemos cancelar la reunión de hoy.",
            "Comenzamos a tiempo, así que llamaremos a los participantes de la sincronización.",
            "Corrimos hacia la oficina para atender la reunión de hoy."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'Run out of time' significa quedarse sin tiempo, y 'call off' significa cancelar."
        },
        "exercise": {
          "audioText": "Figure out the root cause. Look forward to hearing from you. Call off the client demo. Look into the database issue.",
          "type": "classification_bins",
          "title": "Auditoría de Phrasal Verbs Profesionales",
          "categories": [
            {
              "id": "resolver",
              "title": "Descifrar / Investigar / Resolver"
            },
            {
              "id": "cancelar",
              "title": "Cancelar / Suspender"
            },
            {
              "id": "entusiasmo",
              "title": "Esperar con agrado / Emoción"
            }
          ],
          "items": [
            {
              "id": "p1",
              "text": "Figure out the root cause",
              "target": "resolver"
            },
            {
              "id": "p2",
              "text": "Look forward to hearing from you",
              "target": "entusiasmo"
            },
            {
              "id": "p3",
              "text": "Call off the client demo",
              "target": "cancelar"
            },
            {
              "id": "p4",
              "text": "Look into the database issue",
              "target": "resolver"
            }
          ],
          "evaluator": (state) => {
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
        "n": 26,
        "title": "Inglés Profesional: Redacción de Emails, Reuniones y Cortesía",
        "unit": 9,
        "level": "B2",
        "p1": "En la cultura corporativa anglosajona, la **cortesía indirecta y la asertividad diplomática** son fundamentales. En español solemos ser más directos ('Necesito que me envíes el archivo hoy'), pero traducir eso literalmente (*'I need you to send me the file today'*) suena agresivo, demandante y descortés. En su lugar, suavizamos con condicionales y fórmulas de cortesía: **'Would you mind sending me the file when you get a chance?'**.",
        "p2": "Estructuras imprescindibles para redactar emails de alto impacto: **Apertura:** *'I hope this email finds you well'* o *'I am writing to follow up on our discussion'*. **Peticiones amables:** *'Could you please provide an update on...'* o *'Would it be possible to schedule a quick call?'*. **Cierre profesional:** *'Please let me know if you have any questions'*, *'Best regards'* o *'Sincerely'*.",
        "audioSentences": [
          {
            "en": "I hope this email finds you well. I'm following up on our project.",
            "ipa": "/aɪ hoʊp ðɪs ˈiːmeɪl faɪndz juː wɛl aɪm ˈfɒloʊɪŋ ʌp ɒn ˈaʊər ˈprɒdʒɛkt/",
            "es": "Espero que este correo te encuentre bien. Le hago seguimiento a nuestro proyecto."
          },
          {
            "en": "Would you mind sending me the latest document draft by Friday?",
            "ipa": "/wʊd juː maɪnd ˈsɛndɪŋ miː ðə ˈleɪtɪst ˈdɒkjumənt dræft baɪ ˈfraɪdeɪ/",
            "es": "¿Te molestaría enviarme el último borrador del documento para el viernes?"
          },
          {
            "en": "Please let me know if you have any questions or feedback regarding the plan.",
            "ipa": "/pliːz lɛt miː noʊ ɪf juː hæv ˈɛni ˈkwɛstʃənz ɔːr ˈfiːdbæk rɪˈɡɑːrdɪŋ ðə plæn/",
            "es": "Por favor avísame si tienes alguna pregunta o comentario respecto al plan."
          },
          {
            "en": "Thank you for your prompt reply and valuable assistance.",
            "ipa": "/θæŋk juː fər jɔːr prɒmpt rɪˈplaɪ ænd ˈvæljuəbl əˈsɪstəns/",
            "es": "Gracias por tu pronta respuesta y valiosa ayuda."
          },
          {
            "en": "I look forward to hearing from you soon.",
            "ipa": "/aɪ lʊk ˈfɔːrwərd tuː ˈhɪərɪŋ frəm juː suːn/",
            "es": "Quedo a la espera de tus noticias pronto."
          }
        ],
        "takeaways": [
          "Nunca traduzcas órdenes directas: usa 'Would you mind + -ing' o 'Could you possibly...'.",
          "Nota gramatical: después de 'Would you mind...' el verbo va OBLIGATORIAMENTE con -ing ('Would you mind sending...').",
          "Cierra tus correos con 'Best regards' o 'Kind regards', nunca con un seco 'Bye'."
        ],
        "instructions": [
          "Ordena las palabras para redactar un inicio de correo profesional impecable.",
          "La frase debe significar: 'Le escribo para hacer seguimiento a nuestra conversación anterior.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Comienza con: I am writing to follow up on our previous conversation.",
        "quiz": {
          "q": "¿Cuál de las siguientes frases formula una solicitud en un email con el estándar más alto de cortesía profesional?",
          "opts": [
            "Send me the invoice right now because I need it.",
            "Would you mind sending me the invoice when you have a moment?",
            "You must to send me the invoice immediately.",
            "I want that you send me the invoice today."
          ],
          "correct": 1,
          "fb": "¡Exacto! 'Would you mind sending me the invoice when you have a moment?' es diplomática, educada y respeta la regla de 'Would you mind + -ing'."
        },
        "exercise": {
          "audioText": "I am writing to follow up on our previous conversation.",
          "type": "sequence_sort",
          "title": "Constructor de Email Ejecutivo",
          "items": [
            {
              "id": "w1",
              "text": "I"
            },
            {
              "id": "w2",
              "text": "am"
            },
            {
              "id": "w3",
              "text": "writing"
            },
            {
              "id": "w4",
              "text": "to"
            },
            {
              "id": "w5",
              "text": "follow up"
            },
            {
              "id": "w6",
              "text": "on"
            },
            {
              "id": "w7",
              "text": "our"
            },
            {
              "id": "w8",
              "text": "previous"
            },
            {
              "id": "w9",
              "text": "conversation."
            }
          ],
          "correctOrder": [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6",
            "w7",
            "w8",
            "w9"
          ],
          "evaluator": (state) => {
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
        "n": 27,
        "title": "Falsos Amigos (False Friends) y Errores Típicos de Hispanohablantes",
        "unit": 9,
        "level": "B2",
        "p1": "Los **False Friends (Falsos Amigos)** son palabras en inglés que se parecen muchísimo visualmente a palabras en español, pero cuyo significado real es completamente distinto. Caer en estas trampas puede generar malentendidos cómicos o bochornosos en entrevistas y reuniones. Por ejemplo, **actually** NO significa 'actualmente', significa **'en realidad / de hecho'** (para 'actualmente' decimos *currently* o *nowadays*).",
        "p2": "Otros falsos amigos críticos: **attend** significa *'asistir a un evento'* (para 'atender a un cliente' se usa *assist* o *help*); **sensible** significa *'sensato o prudente'* (para 'sensible o emotivo' se usa *sensitive*); **library** es una *'biblioteca'* (para 'librería donde compras libros' se dice *bookstore*); **comprehensive** significa *'exhaustivo o completo'* (no 'comprensivo'); y **embarrassed** significa *'avergonzado'* (¡NUNCA 'embarazada', que se dice *pregnant*!).",
        "audioSentences": [
          {
            "en": "Actually, I am currently working on improving my spoken English.",
            "ipa": "/ˈæktʃuəli aɪ æm ˈkɜːrəntli ˈwɜːrkɪŋ ɒn ɪmˈpruːvɪŋ maɪ ˈspoʊkən ˈɪŋɡlɪʃ/",
            "es": "En realidad, actualmente estoy trabajando en mejorar mi inglés hablado."
          },
          {
            "en": "He is a very sensible person who makes thoughtful decisions.",
            "ipa": "/hiː ɪz ə ˈvɛri ˈsɛnsəbl ˈpɜːrsn huː meɪks ˈθɔːtfʊl dɪˈsɪʒnz/",
            "es": "Él es una persona muy sensata que toma decisiones reflexivas."
          },
          {
            "en": "Did you attend the English conversation workshop yesterday?",
            "ipa": "/dɪd juː əˈtɛnd ði ˈɪŋɡlɪʃ ˌkɒnvərˈseɪʃn ˈwɜːrkʃɒp ˈjɛstərdeɪ/",
            "es": "¿Asististe al taller de conversación en inglés ayer?"
          },
          {
            "en": "I bought a dictionary at the bookstore, not at the public library.",
            "ipa": "/aɪ bɔːt ə ˈdɪkʃənəri æt ðə ˈbʊkstɔːr nɒt æt ðə ˈpʌblɪk ˈlaɪbrəri/",
            "es": "Compré un diccionario en la librería, no en la biblioteca pública."
          },
          {
            "en": "She didn't realize how much her pronunciation had improved.",
            "ipa": "/ʃiː ˈdɪdnt ˈriːəlaɪz haʊ mʌtʃ hər prəˌnʌnsiˈeɪʃn hæd ɪmˈpruːvd/",
            "es": "Ella no se dio cuenta de cuánto había mejorado su pronunciación."
          }
        ],
        "takeaways": [
          "Actually = 'En realidad' (usa 'currently' para decir 'actualmente').",
          "Attend = 'Asistir a un lugar' (usa 'help/serve' para decir 'atender a alguien').",
          "Sensible = 'Sensato y prudente' (usa 'sensitive' para decir 'sensible/delicado').",
          "Embarrassed = 'Avergonzado' (nunca 'embarazada', que es 'pregnant')."
        ],
        "instructions": [
          "Identifica el falso amigo en la oración de negocios propuesta y selecciona la corrección precisa.",
          "El estudiante intentó decir: 'Actualmente, estamos atendiendo a clientes en Europa.'",
          "Haz clic en 'Validar y Enviar'."
        ],
        "hint": "Actualmente se traduce como 'currently', y atender clientes se dice 'assisting' o 'serving' clientes.",
        "quiz": {
          "q": "Si en una reunión internacional quieres decir 'En realidad, la cifra actual de ventas es mayor', ¿cuál es la traducción adecuada?",
          "opts": [
            "Currently, the actual sales figure is higher.",
            "Actually, the current sales figure is higher.",
            "Actually, the actual sales figure is higher.",
            "Currently, the currently sales figure is higher."
          ],
          "correct": 1,
          "fb": "¡Brillante! 'Actually' traduce 'en realidad' y 'current' traduce 'actual' (*Actually, the current sales figure is higher*). ¡La trampa definitiva de falsos amigos superada!"
        },
        "exercise": {
          "audioText": "I am actually working in this company, and I always assist all the meetings.",
          "type": "error_spotter",
          "title": "Eliminador de Falsos Amigos: Auditoría Final",
          "sentence": "I am actually working in this company, and I always assist all the meetings.",
          "errorDescription": "La frase quería decir: 'Actualmente trabajo en esta empresa, y siempre asisto a todas las reuniones.' ¿Cuál es la corrección nativa?",
          "options": [
            {
              "id": "o1",
              "text": "I am currently working at this company, and I always attend all the meetings.",
              "correct": true
            },
            {
              "id": "o2",
              "text": "I am actually working at this company, and I always assist all the meetings.",
              "correct": false
            },
            {
              "id": "o3",
              "text": "I am currently working in this company, and I always assist all the meetings.",
              "correct": false
            },
            {
              "id": "o4",
              "text": "I am sensible working in this company, and I always attend all the meetings.",
              "correct": false
            }
          ],
          "evaluator": (state) => {
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
