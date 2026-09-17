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

    -- Ana Morales (Estudiante Demo que usará el usuario): 12 lecciones, 820 XP (44%)
    FOR i IN 1..12 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_est_id, i, 68, true, true, (i <= 10), now() - ((13 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- Juan Pérez: 22 lecciones, 1480 XP (81% - Al día 🟢)
    FOR i IN 1..22 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_juan_id, i, 67, true, true, (i <= 21), now() - ((23 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- María García: 18 lecciones, 1150 XP (66% - Al día 🟢)
    FOR i IN 1..18 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_maria_id, i, 64, true, true, (i <= 16), now() - ((19 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- Carlos López: 7 lecciones, 460 XP (25% - Falta avanzar 🟡)
    FOR i IN 1..7 LOOP
        INSERT INTO public.progreso (id_usuario, leccion_n, xp, done, quiz_passed, exercise_passed, timestamp)
        VALUES (v_carlos_id, i, 65, true, true, (i <= 6), now() - ((8 - i) || ' days')::INTERVAL)
        ON CONFLICT (id_usuario, leccion_n) DO UPDATE SET
            xp = EXCLUDED.xp, done = EXCLUDED.done, quiz_passed = EXCLUDED.quiz_passed, exercise_passed = EXCLUDED.exercise_passed;
    END LOOP;

    -- Laura Sánchez: 0 lecciones (0% - Sin iniciar 🔴)
    -- (No insertamos filas en progreso para simular estudiante recién inscrito sin actividad)

    -- -------------------------------------------------------------------------
    -- 6. ASIGNAR INSIGNIAS DE UNIDAD DESBLOQUEADAS
    -- -------------------------------------------------------------------------
    -- Ana Morales: Unidades 1 a 4 (4 insignias)
    INSERT INTO public.badges (id_usuario, unit_id, badge_id, awarded_at) VALUES
        (v_est_id, 1, 'badge_phonetics', now() - INTERVAL '12 days'),
        (v_est_id, 2, 'badge_routines', now() - INTERVAL '9 days'),
        (v_est_id, 3, 'badge_describer', now() - INTERVAL '6 days'),
        (v_est_id, 4, 'badge_action', now() - INTERVAL '2 days')
    ON CONFLICT (id_usuario, unit_id) DO NOTHING;

    -- Juan Pérez: Unidades 1 a 7 (7 insignias)
    INSERT INTO public.badges (id_usuario, unit_id, badge_id, awarded_at) VALUES
        (v_juan_id, 1, 'badge_phonetics', now() - INTERVAL '20 days'),
        (v_juan_id, 2, 'badge_routines', now() - INTERVAL '17 days'),
        (v_juan_id, 3, 'badge_describer', now() - INTERVAL '14 days'),
        (v_juan_id, 4, 'badge_action', now() - INTERVAL '11 days'),
        (v_juan_id, 5, 'badge_storyteller', now() - INTERVAL '8 days'),
        (v_juan_id, 6, 'badge_visionary', now() - INTERVAL '5 days'),
        (v_juan_id, 7, 'badge_nuance', now() - INTERVAL '2 days')
    ON CONFLICT (id_usuario, unit_id) DO NOTHING;

    RAISE NOTICE '¡Datos de prueba insertados con éxito!';
    RAISE NOTICE 'Maestro: profesor@demo.com (clave: Demo1234!)';
    RAISE NOTICE 'Estudiante: estudiante@demo.com (clave: Demo1234!)';
    RAISE NOTICE 'Clase creada: ING-DEMO con 5 alumnos y diagnósticos activos.';
END $$;

