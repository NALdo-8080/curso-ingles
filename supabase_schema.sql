-- =============================================================================
-- CURSO DE INGLÉS LMS (FASE 1 MVP) — ESQUEMA DE BASE DE DATOS PARA SUPABASE
-- =============================================================================
-- Instrucciones:
-- 1. Ve a tu proyecto en Supabase (https://supabase.com).
-- 2. Entra en "SQL Editor" en el menú izquierdo.
-- 3. Pega todo este contenido y haz clic en "Run".
-- =============================================================================

-- Habilitar extensión para generación de UUIDs si no está activa
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. TABLA: usuarios
-- Almacena el perfil público de los usuarios y su rol ('profesor' o 'estudiante').
-- Vinculada directamente con auth.users mediante el campo id.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('profesor', 'estudiante')) DEFAULT 'estudiante',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 2. TABLA: clases
-- Permite a los profesores crear grupos de estudio con un código único de acceso.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    codigo_unico TEXT NOT NULL UNIQUE,
    id_profesor UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 3. TABLA: inscripciones
-- Registra los estudiantes inscritos en cada clase creada por un profesor.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inscripciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    id_clase UUID NOT NULL REFERENCES public.clases(id) ON DELETE CASCADE,
    fecha_ingreso TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(id_usuario, id_clase)
);

-- -----------------------------------------------------------------------------
-- 4. TABLA: progreso
-- Reemplaza y respalda el objeto de caché de storage.js para cada lección (1-27).
-- Guarda XP ganado en la lección, si se aprobó el quiz y el laboratorio.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.progreso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    leccion_n INTEGER NOT NULL CHECK (leccion_n >= 1 AND leccion_n <= 27),
    xp INTEGER DEFAULT 0 NOT NULL,
    done BOOLEAN DEFAULT false NOT NULL,
    quiz_passed BOOLEAN DEFAULT false NOT NULL,
    exercise_passed BOOLEAN DEFAULT false NOT NULL,
    exercise_state JSONB DEFAULT NULL,
    timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(id_usuario, leccion_n)
);

-- -----------------------------------------------------------------------------
-- 5. TABLA: badges
-- Insignias obtenidas al completar cada una de las 9 unidades formativas.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    unit_id INTEGER NOT NULL CHECK (unit_id >= 1 AND unit_id <= 9),
    badge_id TEXT NOT NULL,
    awarded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(id_usuario, unit_id)
);

-- -----------------------------------------------------------------------------
-- ÍNDICES PARA ALTO RENDIMIENTO
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_progreso_usuario ON public.progreso(id_usuario);
CREATE INDEX IF NOT EXISTS idx_badges_usuario ON public.badges(id_usuario);
CREATE INDEX IF NOT EXISTS idx_inscripciones_usuario ON public.inscripciones(id_usuario);
CREATE INDEX IF NOT EXISTS idx_inscripciones_clase ON public.inscripciones(id_clase);
CREATE INDEX IF NOT EXISTS idx_clases_codigo ON public.clases(codigo_unico);
CREATE INDEX IF NOT EXISTS idx_clases_profesor ON public.clases(id_profesor);

-- -----------------------------------------------------------------------------
-- TRIGGER AUTOMÁTICO: Sincronizar auth.users -> public.usuarios
-- Al registrarse en Supabase Auth, se crea el perfil con nombre y rol automáticamente.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.usuarios (id, nombre, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'estudiante')
    )
    ON CONFLICT (id) DO UPDATE
    SET
        nombre = EXCLUDED.nombre,
        role = EXCLUDED.role,
        email = EXCLUDED.email;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) — ACTIVACIÓN
-- -----------------------------------------------------------------------------
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- POLÍTICAS RLS: usuarios
-- -----------------------------------------------------------------------------
-- 1. Un usuario autenticado puede leer su propio perfil
CREATE POLICY "usuarios_select_own"
    ON public.usuarios FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- 2. Un profesor puede ver los perfiles de los estudiantes de sus clases
CREATE POLICY "usuarios_teacher_view_students"
    ON public.usuarios FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.inscripciones i
            JOIN public.clases c ON i.id_clase = c.id
            WHERE c.id_profesor = auth.uid()
            AND i.id_usuario = public.usuarios.id
        )
    );

-- 3. Un estudiante puede ver el perfil del profesor de su clase
CREATE POLICY "usuarios_student_view_teacher"
    ON public.usuarios FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.inscripciones i
            JOIN public.clases c ON i.id_clase = c.id
            WHERE i.id_usuario = auth.uid()
            AND c.id_profesor = public.usuarios.id
        )
    );

-- 4. El usuario puede insertar su propio perfil (respaldo de cliente si no corre trigger)
CREATE POLICY "usuarios_insert_own"
    ON public.usuarios FOR INSERT
    TO authenticated
    WITH CHECK (id = auth.uid());

-- 5. El usuario puede actualizar su propio perfil
CREATE POLICY "usuarios_update_own"
    ON public.usuarios FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- -----------------------------------------------------------------------------
-- POLÍTICAS RLS: clases
-- -----------------------------------------------------------------------------
-- 1. Cualquier usuario autenticado puede buscar/leer clases (necesario para unirse con código)
CREATE POLICY "clases_select_authenticated"
    ON public.clases FOR SELECT
    TO authenticated
    USING (true);

-- 2. Solo el profesor creador puede insertar clases
CREATE POLICY "clases_insert_teacher"
    ON public.clases FOR INSERT
    TO authenticated
    WITH CHECK (id_profesor = auth.uid());

-- 3. Solo el profesor creador puede actualizar su clase
CREATE POLICY "clases_update_teacher"
    ON public.clases FOR UPDATE
    TO authenticated
    USING (id_profesor = auth.uid())
    WITH CHECK (id_profesor = auth.uid());

-- 4. Solo el profesor creador puede eliminar su clase
CREATE POLICY "clases_delete_teacher"
    ON public.clases FOR DELETE
    TO authenticated
    USING (id_profesor = auth.uid());

-- -----------------------------------------------------------------------------
-- POLÍTICAS RLS: inscripciones
-- -----------------------------------------------------------------------------
-- 1. El estudiante puede ver sus propias inscripciones
CREATE POLICY "inscripciones_select_student"
    ON public.inscripciones FOR SELECT
    TO authenticated
    USING (id_usuario = auth.uid());

-- 2. El profesor puede ver las inscripciones pertenecientes a sus clases
CREATE POLICY "inscripciones_select_teacher"
    ON public.inscripciones FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.clases c
            WHERE c.id = public.inscripciones.id_clase
            AND c.id_profesor = auth.uid()
        )
    );

-- 3. El estudiante puede inscribirse a sí mismo
CREATE POLICY "inscripciones_insert_student"
    ON public.inscripciones FOR INSERT
    TO authenticated
    WITH CHECK (id_usuario = auth.uid());

-- 4. El estudiante puede abandonar una clase o el profesor puede removerlo
CREATE POLICY "inscripciones_delete"
    ON public.inscripciones FOR DELETE
    TO authenticated
    USING (
        id_usuario = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.clases c
            WHERE c.id = public.inscripciones.id_clase
            AND c.id_profesor = auth.uid()
        )
    );

-- -----------------------------------------------------------------------------
-- POLÍTICAS RLS: progreso
-- -----------------------------------------------------------------------------
-- 1. El estudiante puede ver su propio progreso
CREATE POLICY "progreso_select_student"
    ON public.progreso FOR SELECT
    TO authenticated
    USING (id_usuario = auth.uid());

-- 2. El profesor puede ver el progreso de los estudiantes de sus clases
CREATE POLICY "progreso_select_teacher"
    ON public.progreso FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.inscripciones i
            JOIN public.clases c ON i.id_clase = c.id
            WHERE c.id_profesor = auth.uid()
            AND i.id_usuario = public.progreso.id_usuario
        )
    );

-- 3. El estudiante puede registrar o actualizar su propio progreso
CREATE POLICY "progreso_insert_student"
    ON public.progreso FOR INSERT
    TO authenticated
    WITH CHECK (id_usuario = auth.uid());

CREATE POLICY "progreso_update_student"
    ON public.progreso FOR UPDATE
    TO authenticated
    USING (id_usuario = auth.uid())
    WITH CHECK (id_usuario = auth.uid());

-- -----------------------------------------------------------------------------
-- POLÍTICAS RLS: badges
-- -----------------------------------------------------------------------------
-- 1. El estudiante puede ver sus propias insignias
CREATE POLICY "badges_select_student"
    ON public.badges FOR SELECT
    TO authenticated
    USING (id_usuario = auth.uid());

-- 2. El profesor puede ver las insignias de los estudiantes de sus clases
CREATE POLICY "badges_select_teacher"
    ON public.badges FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.inscripciones i
            JOIN public.clases c ON i.id_clase = c.id
            WHERE c.id_profesor = auth.uid()
            AND i.id_usuario = public.badges.id_usuario
        )
    );

-- 3. El estudiante puede registrar sus propias insignias
CREATE POLICY "badges_insert_student"
    ON public.badges FOR INSERT
    TO authenticated
    WITH CHECK (id_usuario = auth.uid());

-- -----------------------------------------------------------------------------
-- FUNCIÓN AUXILIAR: Resumen de Progreso para el Dashboard del Profesor
-- Devuelve lista consolidada de alumnos inscritos en una clase con su avance.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_class_students_summary(p_clase_id UUID)
RETURNS TABLE (
    student_id UUID,
    nombre TEXT,
    email TEXT,
    fecha_ingreso TIMESTAMPTZ,
    lessons_done BIGINT,
    quizzes_passed BIGINT,
    exercises_passed BIGINT,
    total_xp BIGINT,
    progress_percent NUMERIC,
    max_lesson INTEGER,
    last_activity TIMESTAMPTZ
) AS $$
BEGIN
    -- Validar que el usuario que ejecuta sea el profesor de la clase
    IF NOT EXISTS (
        SELECT 1 FROM public.clases
        WHERE id = p_clase_id AND id_profesor = auth.uid()
    ) THEN
        RAISE EXCEPTION 'No tienes permiso para consultar los alumnos de esta clase.';
    END IF;

    RETURN QUERY
    SELECT
        u.id AS student_id,
        u.nombre,
        u.email,
        i.fecha_ingreso,
        COALESCE(COUNT(p.id) FILTER (WHERE p.done = true), 0) AS lessons_done,
        COALESCE(COUNT(p.id) FILTER (WHERE p.quiz_passed = true), 0) AS quizzes_passed,
        COALESCE(COUNT(p.id) FILTER (WHERE p.exercise_passed = true), 0) AS exercises_passed,
        COALESCE(SUM(p.xp), 0) AS total_xp,
        ROUND((COALESCE(COUNT(p.id) FILTER (WHERE p.done = true), 0)::NUMERIC / 27.0) * 100, 1) AS progress_percent,
        COALESCE(MAX(p.leccion_n) FILTER (WHERE p.done = true), 0)::INTEGER AS max_lesson,
        MAX(p.timestamp) AS last_activity
    FROM public.inscripciones i
    JOIN public.usuarios u ON i.id_usuario = u.id
    LEFT JOIN public.progreso p ON p.id_usuario = u.id
    WHERE i.id_clase = p_clase_id
    GROUP BY u.id, u.nombre, u.email, i.fecha_ingreso
    ORDER BY progress_percent DESC, u.nombre ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


