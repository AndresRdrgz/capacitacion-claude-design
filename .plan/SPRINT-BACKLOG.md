# Backlog priorizado del MVP

> **Estado**: v0.1 — sprint 0 (planning)
> **Fecha**: 2026-06-30

---

## Resumen ejecutivo

| Sprint | Duración | Entregable | Status |
|---|---|---|---|
| Sprint 0 — Planning | 1 semana | Docs, decisiones, handoffs | 🟡 En curso |
| Sprint 1 — Schema + admin | 1 semana | Migration 0024 + admin registra modelos | ⏸ Pendiente |
| Sprint 2 — Seed del curso | 1 semana | Curso "Claude Code" cargado en DB | ⏸ Pendiente |
| Sprint 3 — Frontend ruta Claude | 1-2 semanas | Rutas, páginas de curso, lección mejorada | ⏸ Pendiente |
| Sprint 4 — Pulido + reviews | 1 semana | Reseñas, wishlist, accesibilidad | ⏸ Pendiente |

**Total MVP**: 4-6 semanas, 4 PRs al repo iAcademy.

---

## Sprint 0 — Planning (en curso)

**Owner**: Andrés + asistente IA
**PR**: este repo (`capacitacion-claude-design`)
**No requiere código en iAcademy**

### Tareas

- [x] Análisis del proyecto actual (deck de 4 slides)
- [x] Estudio de mercado de plataformas edtech en Panamá
- [x] Mapeo del stack real de iAcademy
- [x] Análisis de gaps del schema
- [x] Escribir `.plan/VISION.md`
- [x] Escribir `.plan/ARCHITECTURE.md`
- [x] Escribir `.plan/SPRINT-BACKLOG.md` (este archivo)
- [x] Escribir `.plan/sprints/sprint-1-schema.md`
- [x] Escribir `.plan/sprints/sprint-2-seed.md`
- [x] Escribir `.plan/sprints/sprint-3-frontend.md`
- [x] Escribir `.plan/sprints/sprint-4-pulido.md`
- [x] Escribir `.plan/handoffs/handoff-1-schema.md` (para Claude Code)
- [x] Escribir `.plan/handoffs/handoff-2-seed.md` (para Claude Code)
- [x] Escribir `.plan/handoffs/handoff-3-frontend.md` (para Claude Code)
- [x] Escribir `.plan/handoffs/handoff-4-pulido.md` (para Claude Code)
- [x] Escribir `.plan/research/mercado-plataformas-edtech-panama.md`
- [x] Escribir `.plan/research/analisis-deck-claude-design.md`
- [x] Actualizar `README.md` raíz
- [ ] Resolver decisiones pendientes de `VISION.md` §6

### Verificación

- [ ] `git status` limpio en `capacitacion-claude-design` (excepto el lockfile)
- [ ] PR abierto a `main` con todos los `.plan/*` y `README.md` actualizado
- [ ] Andrés aprueba y mergea

---

## Sprint 1 — Schema + admin (pendiente)

**Owner**: Claude Code (con orquestación de Andrés)
**PR**: iAcademy → branch `feat/claude-mvp-schema`
**Stack tocado**: solo `backend/plataforma/`

**Ver resumen**: `.plan/sprints/sprint-1-schema.md`
**Handoff a Claude Code**: `.plan/handoffs/handoff-1-schema.md`

### Criterios de "done"

- [ ] `python manage.py makemigrations plataforma` genera `0024_*.py` sin errores
- [ ] `python manage.py migrate` aplica sin errores
- [ ] `python manage.py check` no reporta issues
- [ ] `python manage.py test plataforma` pasa
- [ ] Tests nuevos para `LearningPath`, `CourseReview`, `Wishlist` (al menos 1 por modelo)
- [ ] Admin de Django muestra los 3 modelos nuevos
- [ ] `OnlineCourse` admin muestra los campos nuevos (`format`, `access_tier`, `level`, `language`, `is_featured`)
- [ ] `Lesson` admin muestra `transcript`, `vimeo_chapters`, `estimated_read_minutes`
- [ ] API `/api/plataforma/courses/<slug>/` retorna los campos nuevos
- [ ] API `/api/plataforma/admin/...` CRUD funciona para los modelos nuevos
- [ ] OpenAPI/Swagger en `/api/docs/` se regenera sin warnings

---

## Sprint 2 — Seed del curso (pendiente)

**Owner**: Claude Code (con orquestación de Andrés)
**PR**: iAcademy → branch `feat/claude-mvp-seed`
**Stack tocado**: solo `backend/plataforma/`

**Ver resumen**: `.plan/sprints/sprint-2-seed.md`
**Handoff a Claude Code**: `.plan/handoffs/handoff-2-seed.md`

### Criterios de "done"

- [ ] Data migration `0025_seed_claude_course.py` carga:
  - 1 `LearningPath` ("Claude desde Cero")
  - 1 `OnlineCourse` ("Curso de Claude Code")
  - 3 `Section`s (módulos)
  - 8-12 `Lesson`s (mezcla de video/quiz/exercise, al menos 1 quiz por sección)
  - 5-10 `Resource`s (links a docs de Anthropic, PDFs)
  - 1 `Quiz` por sección con 3-5 preguntas
- [ ] El seed es **idempotente** — correr 2 veces no duplica
- [ ] `GET /api/plataforma/courses/claude-code/` retorna el árbol completo
- [ ] `GET /api/plataforma/paths/claude-desde-cero/` retorna la ruta
- [ ] Andrés verifica visualmente en `/admin/`
- [ ] Datos de instructor, descripción y contenido escritos en español, tono didáctico

---

## Sprint 3 — Frontend ruta Claude (pendiente)

**Owner**: Claude Code (con orquestación de Andrés)
**PR**: iAcademy → branch `feat/claude-mvp-frontend` (en `frontend-plataforma/`)
**Stack tocado**: solo `frontend-plataforma/`

**Ver resumen**: `.plan/sprints/sprint-3-frontend.md`
**Handoff a Claude Code**: `.plan/handoffs/handoff-3-frontend.md`

### Criterios de "done"

- [ ] Página `/rutas` (catálogo) lista todas las `LearningPath` publicadas
- [ ] Página `/rutas/claude-desde-cero` muestra la ruta con sus cursos en orden
- [ ] Página `/curso/[id]` mejorada con tabs (Descripción / Recursos / Reseñas)
- [ ] Página `/leccion/[id]` mejorada con:
  - Video Vimeo player
  - Tabs: Transcripción | Recursos | Código
  - Comentarios
  - Botón "Marcar como completa" + siguiente lección
- [ ] Estado de progreso visible (sidebar con checkmarks)
- [ ] Responsive (móvil usable)
- [ ] Sin errores en consola del browser
- [ ] Sin warnings de TypeScript (`npm run lint` limpio)

---

## Sprint 4 — Pulido + reviews (pendiente)

**Owner**: Claude Code (con orquestación de Andrés)
**PR**: iAcademy → branch `feat/claude-mvp-pulido`
**Stack tocado**: `backend/plataforma/` + `frontend-plataforma/`

**Ver resumen**: `.plan/sprints/sprint-4-pulido.md`
**Handoff a Claude Code**: `.plan/handoffs/handoff-4-pulido.md`

### Criterios de "done"

- [ ] Sistema de reseñas funcional (1-5 estrellas + comentario)
- [ ] Solo estudiantes que completaron el curso pueden reseñar
- [ ] Wishlist (botón "guardar para después" en página de curso)
- [ ] Accesibilidad: keyboard navigation, focus states, ARIA labels en componentes nuevos
- [ ] Empty states diseñados (no hay cursos, no hay lecciones, no hay reseñas)
- [ ] Loading states (skeletons consistentes con el resto de la app)
- [ ] 3-5 estudiantes reales prueban el flow completo y reportan feedback
- [ ] Bugs críticos resueltos
- [ ] Documentación de uso para staff actualizada

---

## Post-MVP (out of scope, documentado para futuro)

- Pagos online (Stripe + Yappy)
- Auto-enrollment público
- Cohortes con fechas
- B2B (empresas comprando paquetes)
- IA tutor con Claude API
- Sandbox Claude en el browser
- Certificados Credly / Open Badges
- Comentarios por timestamp en video
- Multi-idioma (inglés)
- App móvil
