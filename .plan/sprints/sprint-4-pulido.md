# Sprint 4 — Pulido + reviews + wishlist

> **Duración**: 1 semana
> **PR target**: `iAcademy` → branches `feat/claude-mvp-reviews` + `feat/claude-mvp-pulido`
> **Handoff para Claude Code**: `.plan/handoffs/handoff-4-pulido.md`
> **Depende de**: Sprint 1 + 2 + 3 mergeados

---

## Objetivo

Llevar el MVP a un estado pulido y probado con usuarios reales. Cerrar bugs, agregar reseñas funcionales, wishlist, accesibilidad, empty states.

## Features

### 1. Sistema de reseñas (CRUD completo)

**Backend** (`backend/plataforma/`):
- `CourseReviewViewSet` con:
  - `GET /api/plataforma/courses/<slug>/reviews/` — lista paginada, solo autenticados
  - `POST /api/plataforma/courses/<slug>/reviews/` — crear (autenticado, debe estar matriculado, no debe tener reseña previa, debe haber completado el curso para `is_verified_completion=True`)
  - `PATCH /api/plataforma/courses/<slug>/reviews/<id>/` — solo el autor
  - `DELETE /api/plataforma/courses/<slug>/reviews/<id>/` — solo el autor o admin
- `CourseReviewSerializer` con validación
- Tests: 1 por caso (crear sin auth, crear sin matricular, crear sin completar, crear duplicado, editar propio, editar ajeno, eliminar)

**Frontend** (`frontend-plataforma/`):
- Componente `<CourseReviews />` con:
  - Promedio de estrellas (estilo Platzi: "4.7 ★ — 705 opiniones")
  - Lista de reviews (avatar, nombre, fecha, rating, comentario)
  - Form de crear/editar (rating con 5 estrellas clickeables, title, comment)
  - Filtro "Más votados / Más recientes"
- En `/curso/[cursoId]/page.tsx`, tab "Reseñas" muestra este componente
- Empty state si no hay reseñas: "Sé el primero en opinar"

### 2. Wishlist

**Backend**:
- `WishlistViewSet` con:
  - `GET /api/plataforma/me/wishlist/` — lista de cursos en wishlist del usuario
  - `POST /api/plataforma/me/wishlist/<course_id>/` — agregar
  - `DELETE /api/plataforma/me/wishlist/<course_id>/` — quitar
- Endpoint helper `GET /api/plataforma/me/wishlist/ids/` — solo IDs (para badges en UI)

**Frontend**:
- Botón "Guardar" en `/curso/[cursoId]/page.tsx` (icono bookmark)
- Estado lleno vs vacío según si está en wishlist
- Toast de feedback al agregar/quitar
- Página `/dashboard/wishlist` (opcional) o sección en dashboard existente

### 3. Accesibilidad (a11y)

- Audit con `axe-core` o `Lighthouse` en Chrome DevTools
- Corregir:
  - Contraste de texto (mínimo WCAG AA)
  - Focus states visibles en todos los interactivos
  - ARIA labels en botones de icono (wishlist, play, next/prev)
  - Navegación completa por teclado en tabs, quizzes, video player
  - `alt` text en todas las imágenes
  - `lang="es"` en `<html>` (verificar)
  - Headings jerárquicos (un solo `<h1>` por página)

### 4. Empty states diseñados

- Sin rutas publicadas
- Sin cursos en una ruta
- Sin lecciones en un módulo
- Sin recursos descargables
- Sin reseñas
- Sin conexión / error de red

Cada empty state debe tener:
- Ilustración o icono (lucide-react)
- Título corto
- Descripción de qué hacer
- CTA si aplica

### 5. Loading states consistentes

- Skeletons con proporciones reales (no spinners genéricos)
- Skeleton para: card de ruta, card de curso, video player, lista de reseñas, sidebar de lección
- Mismo patrón visual que el resto de iAcademy

### 6. Error handling robusto

- Error boundary global (`error.tsx` en App Router)
- Mensajes de error en español
- Botón "Reintentar" en operaciones de red
- Logging con prefijo `[Componente]`

### 7. Testing con usuarios reales

**Antes de cerrar el sprint**:
- Reclutar 3-5 estudiantes reales (de los ya matriculados en iAcademy o contactos)
- Darles acceso al curso "Claude desde Cero"
- Pedir que completen el flow: login → ver ruta → entrar al curso → ver lección → contestar quiz → dejar reseña
- Sesión de 30 min de feedback (grabada o notas)
- Documentar bugs y fricciones
- Resolver los críticos antes de cerrar sprint

## Archivos a tocar

| Archivo | Tipo |
|---|---|
| `backend/plataforma/views.py` | Añadir `CourseReviewViewSet`, `WishlistViewSet` |
| `backend/plataforma/serializers.py` | `CourseReviewSerializer`, `WishlistSerializer` |
| `backend/plataforma/urls.py` | Registrar rutas |
| `backend/plataforma/permissions.py` | Permisos custom (IsEnrolled, IsReviewAuthor) |
| `backend/plataforma/tests.py` | Tests nuevos |
| `frontend-plataforma/src/app/(platform)/curso/[cursoId]/reviews/page.tsx` | Página o componente |
| `frontend-plataforma/src/components/curso/course-reviews.tsx` | Componente principal |
| `frontend-plataforma/src/components/curso/review-form.tsx` | Form |
| `frontend-plataforma/src/components/curso/wishlist-button.tsx` | Botón |
| `frontend-plataforma/src/components/ui/empty-state.tsx` | Componente reutilizable |
| `frontend-plataforma/src/components/ui/star-rating.tsx` | Componente de rating |
| `frontend-plataforma/src/app/error.tsx` | Error boundary |
| `frontend-plataforma/src/lib/api/wishlist.ts` | API client |

## Restricciones

1. **No romper el flujo existente de reseñas/grabaciones** que ya hay en `plataforma/`
2. **No introducir librerías de UI nuevas** — usar shadcn primitives
3. **No saltar el testing con usuarios reales** — eso es lo que valida el MVP
4. **No agregar analytics todavía** — primero validar manualmente

## Verificación

```bash
# Backend
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/backend
source venv/bin/activate
python manage.py test plataforma -v 2
# Todos los tests pasan, incluyendo los nuevos de reviews y wishlist

# Frontend
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/frontend-plataforma
npm run build
npm run lint

# Manual
# 1. Login como estudiante
# 2. Ir a /curso/curso-de-claude-code
# 3. Click en tab Reseñas → debe mostrar empty state
# 4. Completar todas las lecciones del curso (forzar vía admin)
# 5. Volver a Reseñas → debe aparecer el form
# 6. Dejar reseña de 5★
# 7. Verificar que aparece en la lista
# 8. Logout, login como otro estudiante → ver la reseña
# 9. Click en wishlist → ver toast de éxito
# 10. Ir a /dashboard → ver el curso en wishlist

# a11y
# Chrome DevTools → Lighthouse → Accessibility
# Score > 95
```

## Criterio de cierre del MVP

El MVP está **completo** cuando:

- [x] Un estudiante matriculado puede recorrer todo el flow de "Claude desde Cero" sin ayuda
- [x] El sistema de reseñas funciona end-to-end
- [x] La wishlist funciona
- [x] Lighthouse accessibility > 95
- [x] Sin bugs críticos en consola
- [x] 3+ usuarios reales probaron y la mayoría tuvo experiencia positiva
- [x] Documentación de uso para staff escrita

## Out of scope

- ❌ Pagos
- ❌ Notificaciones
- ❌ Búsqueda global
- ❌ Multi-idioma
- ❌ Dark mode (si no existe)
- ❌ PWA / offline
- ❌ Certificados con blockchain
- ❌ Analytics automático
- ❌ A/B testing

## Riesgos

1. **El testing con usuarios reales puede revelar problemas de UX profundos** que requieran rehacer páginas — buffer de 2-3 días en el sprint
2. **El sistema de reseñas puede ser abusado** (spam, contenido inapropiado) — agregar rate limiting básico (5 reviews/día por usuario)
3. **La wishlist sin recordatorios es dead weight** — no hacer nada, es solo un marcador
