# Handoff a Claude Code — Sprint 3: Frontend ruta Claude

> **Para**: Claude Code
> **Working dir**: `/Users/andresrodriguez/Documents/GitHub/iAcademy/frontend-plataforma`
> **Branch base**: `main`
> **Branch de trabajo**: `feat/claude-mvp-frontend`
> **PR target**: `main`
> **PR title**: `feat(platform): rutas de aprendizaje + tabs en curso/lección para Claude MVP`
> **Sprint plan**: `.plan/sprints/sprint-3-frontend.md`
> **Depende de**: Sprint 1 + 2 mergeados

---

## Pre-flight

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/frontend-plataforma
git checkout main
git pull
git checkout -b feat/claude-mvp-frontend
npm install  # por si acaso
```

Lee estos archivos antes de escribir (en este orden):
1. `frontend-plataforma/AGENTS.md` (reglas de estilo — síguelas al pie de la letra)
2. `frontend-plataforma/src/lib/api-client.ts` (cómo se hacen las llamadas)
3. `frontend-plataforma/src/lib/api/courses.ts` (patrón existente de API para cursos)
4. `frontend-plataforma/src/lib/api/auth.ts` (cómo se maneja auth)
5. `frontend-plataforma/src/contexts/auth-context.tsx` (useAuth hook)
6. `frontend-plataforma/src/app/(platform)/cursos/page.tsx` (catálogo — patrón a copiar)
7. `frontend-plataforma/src/app/(platform)/curso/[cursoId]/page.tsx` (detalle de curso)
8. `frontend-plataforma/src/app/(platform)/leccion/[leccionId]/page.tsx` (detalle de lección)
9. `frontend-plataforma/src/components/ui/` (todos los primitives disponibles)
10. `frontend-plataforma/src/types/` (tipos existentes — extiéndolos, no dupliques)
11. `frontend-plataforma/CLAUDE.md`

## Tarea exacta

Hacer visible y navegable la ruta "Claude desde Cero" en el frontend. Construir 4 páginas nuevas, mejorar 2 existentes, sin introducir librerías nuevas.

### 1. API client (nuevo)

**Archivo**: `src/lib/api/learning-paths.ts`

```typescript
import { apiClient } from '@/lib/api-client'
import type { LearningPath, LearningPathDetail, CourseReview, ReviewInput } from '@/types/learning-path'

export async function getLearningPaths(): Promise<LearningPath[]> {
  return apiClient.get<LearningPath[]>('/paths/')
}

export async function getLearningPathBySlug(slug: string): Promise<LearningPathDetail> {
  return apiClient.get<LearningPathDetail>(`/paths/${slug}/`)
}

export async function getCourseReviews(courseSlug: string): Promise<CourseReview[]> {
  return apiClient.get<CourseReview[]>(`/courses/${courseSlug}/reviews/`)
}

export async function createCourseReview(
  courseSlug: string,
  data: ReviewInput
): Promise<CourseReview> {
  return apiClient.post<CourseReview>(`/courses/${courseSlug}/reviews/`, data)
}
```

### 2. Tipos TypeScript (nuevos)

**Archivo**: `src/types/learning-path.ts`

```typescript
export interface LearningPath {
  id: number
  title: string
  slug: string
  short_description: string
  description: string
  cover: string | null
  level: 'beginner' | 'intermediate' | 'advanced'
  is_published: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface PathCourse {
  id: number
  order: number
  is_required: boolean
  course: {
    id: number
    title: string
    slug: string
    short_description: string
    thumbnail: string | null
    duration: string
    level: string
    lessons_count: number
  }
  progress?: {
    completed_lessons: number
    total_lessons: number
    percentage: number
    is_completed: boolean
  }
}

export interface LearningPathDetail extends LearningPath {
  path_courses: PathCourse[]
  total_courses: number
  total_lessons: number
  total_duration: string
}

export interface CourseReview {
  id: number
  course: number
  learner: {
    id: number
    nombreCompleto: string
    avatar: string | null
  }
  rating: number
  title: string
  comment: string
  is_verified_completion: boolean
  created_at: string
  updated_at: string
}

export interface ReviewInput {
  rating: number
  title?: string
  comment: string
}
```

### 3. Páginas nuevas

#### `src/app/(platform)/rutas/page.tsx` — Catálogo

- Server component o client component con `useEffect`
- Fetch `getLearningPaths()` en `useEffect`
- Renderiza grid de `<LearningPathCard />`
- Empty state si la lista está vacía
- Skeleton durante loading

#### `src/app/(platform)/rutas/[slug]/page.tsx` — Detalle

- Fetch `getLearningPathBySlug(slug)` con `params` de Next 16
- Renderiza:
  - Hero con cover + título + descripción + stats
  - ProgressBar si el usuario está matriculado
  - Lista de cursos con `<PathCourseList />`
- Manejo de 404 con `notFound()` de Next

#### `src/app/(platform)/curso/[cursoId]/reviews/page.tsx` — Reseñas

- Fetch `getCourseReviews(slug)`
- Renderiza lista + `<ReviewForm />` si el usuario puede reseñar (completó el curso)
- Empty state

### 4. Mejorar páginas existentes

#### `src/app/(platform)/curso/[cursoId]/page.tsx`

- Agregar tabs: "Descripción" | "Recursos" | "Reseñas"
- Usar shadcn `Tabs`
- Tab Recursos: lista de `Resource` con icono
- Tab Reseñas: embed `<CourseReviews />`
- Mantener todo lo que ya existe

#### `src/app/(platform)/leccion/[leccionId]/page.tsx`

- Si es tipo `video`:
  - Si `vimeo_id` existe: embed `<iframe>` de Vimeo
  - Si no: placeholder con texto "Video próximamente"
- Si es tipo `quiz`:
  - Renderizar componente de quiz (si existe en el repo, reusar; si no, mostrar "Quiz próximamente")
- Si es tipo `exercise`:
  - Renderizar `content` como HTML (usar `dangerouslySetInnerHTML` con sanitización si es necesario, o markdown si el repo lo tiene configurado)
- Agregar tabs: "Transcripción" | "Recursos" | "Código"
  - Transcripción: textarea read-only o `<pre>` con el campo `transcript`
  - Recursos: los recursos de la sección
  - Código: el campo `key_points` o `content` formateado
- Sidebar derecho:
  - Info de la lección (tipo, duración, XP)
  - Botón "Marcar como completa" → llama API existente
  - "Siguiente lección" → navega a la siguiente en orden

### 5. Componentes nuevos

```
src/components/curso/
├── learning-path-card.tsx          # Card para catálogo
├── learning-path-header.tsx        # Hero de ruta
├── path-course-list.tsx            # Lista de cursos en ruta
├── course-reviews.tsx              # Lista + form
└── review-form.tsx                 # Form de reseña (1-5 estrellas)

src/components/lesson/
├── lesson-player.tsx               # Vimeo con fallback
├── lesson-tabs.tsx                 # Tabs Transcripción/Recursos/Código
├── lesson-sidebar.tsx              # Sidebar derecho
└── lesson-comments.tsx             # Refactor de comments

src/components/ui/
├── star-rating.tsx                 # NUEVO: rating 1-5 estrellas
└── empty-state.tsx                 # NUEVO: empty state reutilizable
```

### 6. Actualizar navegación

Buscar el componente del sidebar de navegación del estudiante (probablemente en `src/components/layout/student-sidebar.tsx` o similar) y agregar el link "Rutas" o "Aprender".

## Restricciones (heredadas del AGENTS.md)

1. **TypeScript estricto** — sin `any`, sin `@ts-ignore` sin justificación
2. **Componentes client solo cuando necesario** — usar Server Components por default
3. **API client centralizado** — nunca `fetch` directo
4. **try/catch en todo async** — con logging `[Componente] Error:`
5. **shadcn/ui** — no Material UI, no Chakra, no Ant Design
6. **Sin emojis en código**
7. **Español en toda la UI**
8. **Loading states con Skeleton**
9. **Responsive** (mobile-first con Tailwind)
10. **NO agregar dependencias a package.json** — usar solo lo que ya está

## Verificación

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/frontend-plataforma

# 1. Build
npm run build
# Debe terminar sin errores TS ni warnings de Next

# 2. Lint
npm run lint
# 0 errores

# 3. Dev server
npm run dev &
sleep 3
# http://localhost:3000/rutas → debe listar "Claude desde Cero"
# http://localhost:3000/rutas/claude-desde-cero → debe mostrar el curso
# http://localhost:3000/curso/curso-de-claude-code → tabs visibles
# http://localhost:3000/leccion/<id-de-la-primera-leccion> → placeholder de video

# 4. Browser console: 0 errores rojos
# 5. Network tab: todas las requests a /api/plataforma/ son 200 o 401 (si no auth)

# 6. Responsive: DevTools → iPhone SE → páginas usables

kill %1
```

## Out of scope

- ❌ Comentarios por timestamp
- ❌ IA tutor
- ❌ Editor de código en el browser
- ❌ Certificados digitales
- ❌ Live sessions
- ❌ Compartir en redes sociales
- ❌ Dark mode toggle
- ❌ Wishlist (eso es sprint 4)
- ❌ Reviews create/edit form completo (eso es sprint 4)

## Output esperado

Reporta:
1. Archivos creados (lista completa)
2. Archivos modificados (con `git diff --stat`)
3. Output de `npm run build` y `npm run lint`
4. Screenshots o descripción de cómo se ve cada página (en español)
5. Lista de desviaciones

NO commit. NO push. NO PR.
