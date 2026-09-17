-- =============================================================================
-- CURSO DE INGLÉS LMS — SCRIPT DE DATOS DE PRUEBA (SEED DATA)
-- =============================================================================
-- Instrucciones para Supabase:
-- 1. Asegúrate de haber ejecutado previamente "supabase_schema.sql".
-- 2. Ve al "SQL Editor" en tu panel de Supabase (https://supabase.com).
-- 3. Pega todo este script y pulsa "Run".
-- 4. ¡Listo! Podrás iniciar sesión con:
--    • Profesor:  profesor@demo.com   / Demo1234!
--    • Estudiante: estudiante@demo.com / Demo1234!
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
DECLARE
    v_prof_id UUID := '00000000-0000-0000-0000-000000000001';
    v_est_id  UUID := '00000000-0000-0000-0000-000000000002';
    v_juan_id UUID := '00000000-0000-0000-0000-000000000003';
    v_maria_id UUID := '00000000-0000-0000-0000-000000000004';
    v_carlos_id UUID := '00000000-0000-0000-0000-000000000005';
    v_laura_id UUID := '00000000-0000-0000-0000-000000000006';
    v_clase_id UUID := '00000000-0000-0000-0000-000000000010';
    v_asg1_id UUID := '00000000-0000-0000-0000-000000000020';
    v_asg2_id UUID := '00000000-0000-0000-0000-000000000021';
    v_hash TEXT := crypt('Demo1234!', gen_salt('bf'));
    i INTEGER;
BEGIN
    -- -------------------------------------------------------------------------
    -- 1. CREACIÓN DE USUARIOS EN AUTH.USERS (Si no existen)
    -- -------------------------------------------------------------------------
    -- Profesor Demo
    INSERT INTO auth.users (
        id, instance_id, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
    ) VALUES (
        v_prof_id, '00000000-0000-0000-0000-000000000000', 'profesor@demo.com', v_hash, now(),
        '{"provider":"email","providers":["email"]}', '{"nombre":"Prof. Carlos Mendoza","role":"profesor"}',
        now(), now(), 'authenticated', 'authenticated'
    ) ON CONFLICT (id) DO UPDATE SET
        encrypted_password = v_hash,
        raw_user_meta_data = '{"nombre":"Prof. Carlos Mendoza","role":"profesor"}';

    -- Estudiante Principal Demo (Ana Morales)
    INSERT INTO auth.users (
        id, instance_id, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
    ) VALUES (
        v_est_id, '00000000-0000-0000-0000-000000000000', 'estudiante@demo.com', v_hash, now(),
        '{"provider":"email","providers":["email"]}', '{"nombre":"Ana Morales","role":"estudiante"}',
        now(), now(), 'authenticated', 'authenticated'
    ) ON CONFLICT (id) DO UPDATE SET
        encrypted_password = v_hash,
        raw_user_meta_data = '{"nombre":"Ana Morales","role":"estudiante"}';

    -- Estudiante de muestra 1: Juan Pérez (Al día 🟢 - 81%)
    INSERT INTO auth.users (
        id, instance_id, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
    ) VALUES (
        v_juan_id, '00000000-0000-0000-0000-000000000000', 'juan.perez@demo.com', v_hash, now(),
        '{"provider":"email","providers":["email"]}', '{"nombre":"Juan Pérez","role":"estudiante"}',
        now(), now(), 'authenticated', 'authenticated'
    ) ON CONFLICT (id) DO NOTHING;

    -- Estudiante de muestra 2: María García (Al día 🟢 - 66%)
    INSERT INTO auth.users (
        id, instance_id, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
    ) VALUES (
        v_maria_id, '00000000-0000-0000-0000-000000000000', 'maria.garcia@demo.com', v_hash, now(),
        '{"provider":"email","providers":["email"]}', '{"nombre":"María García","role":"estudiante"}',
        now(), now(), 'authenticated', 'authenticated'
    ) ON CONFLICT (id) DO NOTHING;

    -- Estudiante de muestra 3: Carlos López (Falta avanzar 🟡 - 25%)
    INSERT INTO auth.users (
        id, instance_id, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
    ) VALUES (
        v_carlos_id, '00000000-0000-0000-0000-000000000000', 'carlos.lopez@demo.com', v_hash, now(),
        '{"provider":"email","providers":["email"]}', '{"nombre":"Carlos López","role":"estudiante"}',
        now(), now(), 'authenticated', 'authenticated'
    ) ON CONFLICT (id) DO NOTHING;

    -- Estudiante de muestra 4: Laura Sánchez (Sin iniciar 🔴 - 0%)
    INSERT INTO auth.users (
        id, instance_id, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
    ) VALUES (
        v_laura_id, '00000000-0000-0000-0000-000000000000', 'laura.sanchez@demo.com', v_hash, now(),
        '{"provider":"email","providers":["email"]}', '{"nombre":"Laura Sánchez","role":"estudiante"}',
        now(), now(), 'authenticated', 'authenticated'
    ) ON CONFLICT (id) DO NOTHING;

    -- -------------------------------------------------------------------------
    -- 2. ASEGURAR REGISTROS EN PUBLIC.USUARIOS
    -- -------------------------------------------------------------------------
    INSERT INTO public.usuarios (id, nombre, email, role) VALUES
        (v_prof_id, 'Prof. Carlos Mendoza', 'profesor@demo.com', 'profesor'),
        (v_est_id, 'Ana Morales', 'estudiante@demo.com', 'estudiante'),
        (v_juan_id, 'Juan Pérez', 'juan.perez@demo.com', 'estudiante'),
        (v_maria_id, 'María García', 'maria.garcia@demo.com', 'estudiante'),
        (v_carlos_id, 'Carlos López', 'carlos.lopez@demo.com', 'estudiante'),
        (v_laura_id, 'Laura Sánchez', 'laura.sanchez@demo.com', 'estudiante')
    ON CONFLICT (id) DO UPDATE SET
        nombre = EXCLUDED.nombre,
        role = EXCLUDED.role;

    -- -------------------------------------------------------------------------
    -- 3. CREAR LA CLASE DEMO "Inglés A1 - Principiantes" (Código: ING-DEMO)
    -- -------------------------------------------------------------------------
    INSERT INTO public.clases (id, nombre, codigo_unico, id_profesor) VALUES
        (v_clase_id, 'Inglés A1 - Principiantes (Grupo Mañana)', 'ING-DEMO', v_prof_id)
    ON CONFLICT (codigo_unico) DO UPDATE SET
        nombre = EXCLUDED.nombre,
        id_profesor = EXCLUDED.id_profesor;

    -- -------------------------------------------------------------------------
    -- 4. INSCRIBIR ESTUDIANTES A LA CLASE DEMO
    -- -------------------------------------------------------------------------
    INSERT INTO public.inscripciones (id_usuario, id_clase, fecha_ingreso) VALUES
        (v_est_id, v_clase_id, now() - INTERVAL '15 days'),
        (v_juan_id, v_clase_id, now() - INTERVAL '14 days'),
        (v_maria_id, v_clase_id, now() - INTERVAL '12 days'),
        (v_carlos_id, v_clase_id, now() - INTERVAL '10 days'),
        (v_laura_id, v_clase_id, now() - INTERVAL '5 days')
    ON CONFLICT (id_usuario, id_clase) DO NOTHING;

    -- -------------------------------------------------------------------------
    -- 5. POBLAR PROGRESO REALISTA PARA CADA ESTUDIANTE
    -- -------------------------------------------------------------------------

    -- Ana Morales (Estudiante Demo que usará el usuario): 5 lecciones de Principiantes, 450 XP (55% de la clase)
    FOR i IN 1..5 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_est_id, i, 90, true, true, true, now() - ((6 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- Juan Pérez: 8 lecciones de Principiantes, 980 XP (88% - Al día 🟢)
    FOR i IN 1..8 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_juan_id, i, 80, true, true, (i <= 7), now() - ((9 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- María García: 6 lecciones de Principiantes, 750 XP (66% - Al día 🟢)
    FOR i IN 1..6 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_maria_id, i, 80, true, true, (i <= 5), now() - ((7 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- Carlos López: 3 lecciones de Principiantes, 360 XP (33% - Falta avanzar 🟡)
    FOR i IN 1..3 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_carlos_id, i, 80, true, true, (i <= 2), now() - ((4 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- Laura Sánchez: 0 lecciones (0% - Sin iniciar 🔴)
    -- (No insertamos filas en progreso para simular estudiante recién inscrito sin actividad)

    -- -------------------------------------------------------------------------
    -- 6. ASIGNAR INSIGNIAS DE UNIDAD DESBLOQUEADAS
    -- -------------------------------------------------------------------------
    -- Ana Morales: Unidad 1 (1 insignia)
    INSERT INTO public.badges (id_usuario, unit_id, badge_id, awarded_at) VALUES
        (v_est_id, 1, 'badge_phonetics', now() - INTERVAL '5 days')
    ON CONFLICT (id_usuario, unit_id) DO NOTHING;

    -- Juan Pérez: Unidades 1 y 2 (2 insignias)
    INSERT INTO public.badges (id_usuario, unit_id, badge_id, awarded_at) VALUES
        (v_juan_id, 1, 'badge_phonetics', now() - INTERVAL '10 days'),
        (v_juan_id, 2, 'badge_routines', now() - INTERVAL '4 days')
    ON CONFLICT (id_usuario, unit_id) DO NOTHING;

    -- -------------------------------------------------------------------------
    -- 7. ASIGNACIONES DE MUESTRA PARA LA CLASE DEMO
    -- -------------------------------------------------------------------------
    INSERT INTO public.asignaciones (id, id_clase, id_profesor, titulo, descripcion, puntos_max, fecha_limite, created_at)
    VALUES
        (
            v_asg1_id, v_clase_id, v_prof_id,
            'Tarea 1: Presentación Personal en Inglés (Self Introduction)',
            'Escribe un párrafo de 5 oraciones en inglés presentándote: tu nombre, edad, país de origen, ocupación o estudios y tu pasatiempo favorito. Utiliza el verbo To Be y vocabulario de la Unidad 1.',
            100, now() + INTERVAL '7 days', now() - INTERVAL '10 days'
        ),
        (
            v_asg2_id, v_clase_id, v_prof_id,
            'Tarea 2: Mi Rutina Diaria (My Daily Routine)',
            'Describe tu rutina de la mañana en inglés usando al menos 5 verbos en Present Simple (ej. wake up, brush teeth, have breakfast, study, work).',
            100, now() + INTERVAL '12 days', now() - INTERVAL '3 days'
        )
    ON CONFLICT (id) DO NOTHING;

    -- -------------------------------------------------------------------------
    -- 8. ENTREGAS Y CALIFICACIONES DE ESTUDIANTES
    -- -------------------------------------------------------------------------
    -- Juan Pérez: Tarea 1 calificada con 95/100
    INSERT INTO public.entregas_asignaciones (id_asignacion, id_estudiante, id_clase, contenido_entrega, fecha_entrega, calificacion, retroalimentacion, calificado_en)
    VALUES (
        v_asg1_id, v_juan_id, v_clase_id,
        'Hello teacher! My name is Juan. I am 24 years old and I am from Colombia. I am a graphic designer. In my free time, I like to play soccer and listen to music. I want to learn English to work with international clients.',
        now() - INTERVAL '6 days', 95, '¡Excelente trabajo Juan! Gran dominio del verbo To Be y redacción fluida y clara.', now() - INTERVAL '5 days'
    ) ON CONFLICT (id_asignacion, id_estudiante) DO NOTHING;

    -- María García: Tarea 1 calificada con 90/100
    INSERT INTO public.entregas_asignaciones (id_asignacion, id_estudiante, id_clase, contenido_entrega, fecha_entrega, calificacion, retroalimentacion, calificado_en)
    VALUES (
        v_asg1_id, v_maria_id, v_clase_id,
        'Hello! I am Maria Garcia. I am from Mexico and I live in Monterrey. I am an accountant. I enjoy reading books and cooking on weekends. I study English because it is very important for my career.',
        now() - INTERVAL '5 days', 90, 'Muy buena presentación María. Cuida el uso de comas entre oraciones, la estructura gramatical está impecable.', now() - INTERVAL '4 days'
    ) ON CONFLICT (id_asignacion, id_estudiante) DO NOTHING;

    -- Ana Morales: Tarea 1 calificada con 92/100
    INSERT INTO public.entregas_asignaciones (id_asignacion, id_estudiante, id_clase, contenido_entrega, fecha_entrega, calificacion, retroalimentacion, calificado_en)
    VALUES (
        v_asg1_id, v_est_id, v_clase_id,
        'Hi everyone! My name is Ana Morales. I am 21 years old and I am a software engineering student. In my free time, I love watching movies in English and practicing pronunciation. Learning English is my dream!',
        now() - INTERVAL '7 days', 92, '¡Felicidades Ana! Tu presentación está muy bien estructurada y las oraciones son precisas.', now() - INTERVAL '6 days'
    ) ON CONFLICT (id_asignacion, id_estudiante) DO NOTHING;

    RAISE NOTICE '¡Datos de prueba insertados con éxito!';
    RAISE NOTICE 'Maestro: profesor@demo.com (clave: Demo1234!)';
    RAISE NOTICE 'Estudiante: estudiante@demo.com (clave: Demo1234!)';
    RAISE NOTICE 'Clase creada: ING-DEMO con 5 alumnos, asignaciones y calificaciones activas.';
END $$;

