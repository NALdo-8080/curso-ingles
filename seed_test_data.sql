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

    RAISE NOTICE '¡Datos de prueba insertados con éxito!';
    RAISE NOTICE 'Maestro: profesor@demo.com (clave: Demo1234!)';
    RAISE NOTICE 'Estudiante: estudiante@demo.com (clave: Demo1234!)';
    RAISE NOTICE 'Clase creada: ING-DEMO con 5 alumnos y diagnósticos activos.';
END $$;

