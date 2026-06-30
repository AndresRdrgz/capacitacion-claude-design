# Sprint 3 — Frontend ruta Claude

> **Duración**: 1-2 semanas
> **PR target**: `iAcademy` → branch `feat/claude-mvp-frontend` (en `frontend-plataforma/`)
> **Handoff para Claude Code**: `.plan/handoffs/handoff-3-frontend.md`
> **Depende de**: Sprint 1 + 2 mergeados

---

## Objetivo

Hacer que la ruta "Claude desde Cero" sea visible y navegable en el frontend-plataforma de iAcademy. Reusar al máximo la UI existente (shadcn/ui, Tailwind, AuthContext). Sin rediseñar.

## Rutas nuevas

```
src/app/(platform)/
├── rutas/
│   ├── page.tsx                          # NUEVO: catálogo de rutas
│   └── [slug]/
│       └── page.tsx                      # NUEVO: detalle de ruta
├── curso/[cursoId]/
│   ├── page.tsx                          # EXISTENTE, extender con tabs
│   └── reviews/
│       └── page.tsx                      # NUEVO: lista + form de reseñas
└── leccion/[leccionId]/
    ├── page.tsx                          # EXISTENTE, mejorar
    └── _components/
        ├── lesson-video.tsx              # Refactor: extraer a componente
        ├── lesson-tabs.tsx               # NUEVO: tabs Transcripción/Recursos/Código
        └── lesson-comments.tsx           # Refactor
```

## Páginas a construir

### 1. `/rutas` — Catálogo

**Layout**:
- Header con título "Rutas de aprendizaje" y descripción corta
- Grid de cards (uno por `LearningPath`):
  - Cover image
  - Nivel badge (Principiante/Intermedio/Avanzado)
  - Título
  - Short description (2 líneas)
  - "X cursos · Y lecciones"
  - Botón "Ver ruta"

**API**: `GET /api/plataforma/paths/`

**Empty state**: "Aún no hay rutas publicadas. Vuelve pronto."

**Loading**: skeleton con 3 cards vacías

### 2. `/rutas/claude-desde-cero` — Detalle

**Layout**:
- Hero con cover + título + descripción larga
- Stats: "1 curso · 10 lecciones · 3 quizzes · ~1h 30min de video"
- Progreso del estudiante (si está matriculado): barra de % + "X de Y lecciones completadas"
- Lista vertical de cursos en la ruta:
  - Card por curso con thumbnail, título, descripción corta, "Empezar" o "Continuar" si hay progreso
  - Si el curso está completado: badge + "Repasar"
- Si no está matriculado: CTA "Este curso está disponible para estudiantes matriculados" + link a contacto

**API**: `GET /api/plataforma/paths/claude-desde-cero/`

### 3. `/curso/[cursoId]` — Mejorada (extender existente)

**Cambios**:
- Agregar tabs debajo del hero: "Descripción" | "Recursos" | "Reseñas"
- Tab Descripción: lo que ya hay (overview, lo que aprenderás, requisitos)
- Tab Recursos: lista de `Resource` con icono por tipo, botón de descarga
- Tab Reseñas: lista de `CourseReview` con rating y comentario + form para crear reseña (si completó el curso)

**API**: `GET /api/plataforma/courses/<slug>/reviews/`, `POST /api/plataforma/courses/<slug>/reviews/`

### 4. `/leccion/[leccionId]` — Mejorada (extender existente)

**Cambios**:
- Si es tipo `video`: player Vimeo embebido
  - Si `vimeo_id` es null: placeholder "Video próximamente" con botón "Avísame cuando esté listo" (mailto)
- Si es tipo `quiz`: redirige a `/leccion/[id]/quiz` (ruta nueva) o muestra inline
- Si es tipo `exercise`: muestra `content` HTML renderizado
- Tabs debajo del video: "Transcripción" | "Recursos" | "Código" (si aplica)
  - Transcripción: textarea read-only del campo `transcript`
  - Recursos: lista descargable
  - Código: code block del `key_points` o `content`
- Sidebar derecho: información de la lección + botón "Marcar como completa" + "Siguiente lección" (navega a la siguiente del orden)

**API**: `GET /api/plataforma/lessons/<id>/`, `GET /api/plataforma/lessons/<id>/transcript/`

## Componentes nuevos

```
src/components/curso/
├── learning-path-card.tsx       # Card para el catálogo de rutas
├── learning-path-header.tsx     # Hero de la página de ruta
├── path-course-list.tsx         # Lista de cursos en una ruta
├── course-tabs.tsx              # Tabs del curso
├── course-reviews.tsx           # Lista + form de reseñas
└── review-form.tsx              # Form para crear reseña (1-5 estrellas)

src/components/lesson/
├── lesson-player.tsx            # Vimeo player con placeholder fallback
├── lesson-tabs.tsx              # Tabs Transcripción/Recursos/Código
├── lesson-sidebar.tsx           # Sidebar derecho (info, completar, next)
└── lesson-comments.tsx          # Comentarios (extraer del page.tsx)
```

## API client

**Archivo**: `src/lib/api/learning-paths.ts` (nuevo)

```typescript
// Funciones a implementar:
getLearningPaths(): Promise<LearningPath[]>
getLearningPathBySlug(slug: string): Promise<LearningPathDetail>
getCourseReviews(slug: string): Promise<CourseReview[]>
createCourseReview(slug: string, data: ReviewInput): Promise<CourseReview>
getLessonTranscript(id: number): Promise<{ transcript: string }>
```

Tipos TypeScript en `src/types/learning-path.ts` y `src/types/review.ts`.

## Restricciones de UI

1. **No introducir nuevas dependencias** — usar lo que ya está en `package.json`
2. **No rediseñar** — reusar shadcn/ui primitives existentes (Card, Button, Tabs, Avatar, Badge, Skeleton, Dialog, Sheet)
3. **Reusar `useAuth()`** para verificar que el usuario está logueado antes de mostrar acciones privadas
4. **Reusar `apiClient`** para todas las llamadas
5. **Reusar `toast` de Sonner** para feedback de éxito/error
6. **Español en toda la UI** — sin inglés
7. **Responsive** — debe verse bien en móvil (mínimo 375px) y desktop
8. **No emojis** (consistente con la guía del repo)
9. **Loading states** con `<Skeleton />` de shadcn
10. **Error states** con mensaje en español y botón "Reintentar"

## Patrones a copiar de páginas existentes

Antes de empezar, leer estas páginas para extraer patrones:
- `src/app/(platform)/cursos/page.tsx` — lista de cursos
- `src/app/(platform)/curso/[cursoId]/page.tsx` — detalle de curso
- `src/app/(platform)/leccion/[leccionId]/page.tsx` — detalle de lección

Usar la misma estructura de:
- `useEffect` + `useState` para fetch
- Try/catch con `console.error("[Componente] ...")` 
- Skeletons durante loading
- `useAuth()` para guards

## Verificación

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/frontend-plataforma

# 1. Build sin errores
npm run build

# 2. Lint limpio
npm run lint

# 3. Dev server
npm run dev
# → http://localhost:3000/rutas → debe listar "Claude desde Cero"
# → Click → http://localhost:3000/rutas/claude-desde-cero → debe mostrar el curso
# → Click en el curso → http://localhost:3000/curso/curso-de-claude-code → debe mostrar tabs
# → Click en una lección → http://localhost:3000/leccion/[id] → debe mostrar placeholder de video (no hay vimeo_id aún)

# 4. Browser console limpia (sin errores rojos)
# 5. Network tab: todas las requests a /api/plataforma/ retornan 200

# 6. Responsive: DevTools → iPhone SE → todas las páginas usables
```

## Out of scope

- ❌ Comentarios por timestamp (estilo YouTube)
- ❌ IA tutor con Claude API
- ❌ Editor de código en el browser
- ❌ Certificados digitales (eso ya existe en backend, solo se renderiza)
- ❌ Live sessions
- ❌ Notificaciones por email
- ❌ Compartir en redes sociales
- ❌ Dark mode toggle (si existe, reusar; si no, skip)

## Riesgos

1. **El `apiClient` puede no manejar 404 limpios** — verificar que las rutas de detalle manejen "curso no encontrado" o "ruta no publicada"
2. **Las páginas existentes tienen asunciones sobre el schema actual** — al extender, no romper el comportamiento legacy
3. **El video de Vimeo sin `vimeo_id` puede romper el player** — usar un componente con fallback robusto
4. **Los quizzes existentes** pueden no tener UI completa — si no la tienen, mostrarlos como "Próximamente" y abrir issue para sprint 4

## Preguntas a resolver antes de empezar

1. ¿El estilo visual de las cards debe seguir el del deck (`capacitacion-claude-design`) o el actual de iAcademy? → Asumido: el actual de iAcademy, para consistencia
2. ¿El placeholder de "Video próximamente" debe ser capturable (form de email) o solo texto? → Asumido: solo texto por ahora
3. ¿La página de reseñas tiene paginación? → Asumido: sí, 10 por página
