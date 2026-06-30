# Sprint 1 — Schema + admin

> **Duración**: 1 semana
> **PR target**: `iAcademy` → branch `feat/claude-mvp-schema`
> **Handoff para Claude Code**: `.plan/handoffs/handoff-1-schema.md`

---

## Objetivo

Añadir las primitivas de datos necesarias para soportar cursos 100% pregrabados, agrupados en rutas de aprendizaje, con reseñas y wishlist. Sin tocar el sistema legacy de matrículas.

## Cambios

### 1. Modificar `OnlineCourse`

**Archivo**: `backend/plataforma/models.py` (clase `OnlineCourse`, línea ~89)

- Cambiar `categoria = OneToOneField(...)` → `categoria = ForeignKey(...)` (migration 0024 debe manejar el drop del unique constraint previo)
- Añadir campos:
  - `format` (CharField, choices, default='cohort_based')
  - `access_tier` (CharField, choices, default='matriculated')
  - `level` (CharField, choices, default='beginner')
  - `language` (CharField, max_length=5, default='es')
  - `is_featured` (BooleanField, default=False)

### 2. Modificar `Lesson`

**Archivo**: `backend/plataforma/models.py` (clase `Lesson`, línea ~226)

- Añadir campos:
  - `transcript` (TextField, blank=True)
  - `vimeo_chapters` (JSONField, default=list, blank=True)
  - `estimated_read_minutes` (PositiveIntegerField, default=0)

### 3. Crear `LearningPath`

**Archivo**: `backend/plataforma/models.py` (nueva clase al final del archivo)

- Campos: `title`, `slug`, `description`, `short_description`, `cover`, `level`, `is_published`, `order`, `created_at`, `updated_at`
- `Meta`: ordering, verbose_name
- `__str__`: `return self.title`
- `save()`: auto-slugify si no hay slug
- `@property is_visible`: `is_published and tiene al menos 1 curso`

### 4. Crear `LearningPathCourse`

**Archivo**: `backend/plataforma/models.py` (nueva clase)

- Through table para `LearningPath` ↔ `OnlineCourse` con `order` y `is_required`
- `Meta`: `unique_together = ['path', 'course']`, `ordering = ['order']`

### 5. Crear `CourseReview`

**Archivo**: `backend/plataforma/models.py` (nueva clase)

- Campos: `course`, `learner`, `rating` (1-5), `title`, `comment`, `is_verified_completion`, `created_at`, `updated_at`
- `Meta`: `unique_together = ['course', 'learner']`, `ordering = ['-created_at']`
- `clean()`: validar `rating` entre 1 y 5
- `__str__`: `f"{learner} - {course}: {rating}★"`

### 6. Crear `Wishlist`

**Archivo**: `backend/plataforma/models.py` (nueva clase)

- Campos: `learner`, `course`, `created_at`
- `Meta`: `unique_together = ['learner', 'course']`

## Archivos a tocar

| Archivo | Tipo de cambio |
|---|---|
| `backend/plataforma/models.py` | Editar 2 clases + añadir 4 |
| `backend/plataforma/admin.py` | Registrar 3 modelos nuevos + extender admin de OnlineCourse y Lesson |
| `backend/plataforma/serializers.py` | Extender `OnlineCourseSerializer` con campos nuevos; crear `LearningPathSerializer`, `LearningPathDetailSerializer`, `CourseReviewSerializer`, `WishlistSerializer` |
| `backend/plataforma/views.py` | Registrar `LearningPathViewSet` (read-only público) y `CourseReviewViewSet` (read público, create autenticado); extender viewsets existentes si necesario |
| `backend/plataforma/urls.py` | Registrar routers nuevos |
| `backend/plataforma/migrations/0024_*.py` | Auto-generado, revisar antes de commit |
| `backend/plataforma/tests.py` | Tests para cada modelo nuevo (1 happy path + 1 validation case) |

## Restricciones

1. **No romper el admin actual** — los admin ViewSets existentes deben seguir funcionando
2. **No romper signals existentes** — el auto-sync de grupos debe seguir funcionando
3. **No tocar el legacy** — `cursos/models.py` no se modifica
4. **No agregar dependencias** — usar solo lo que ya está en `requirements.txt`
5. **Backward-compatible API** — los campos nuevos son opcionales / tienen defaults, así que clientes existentes no rompen
6. **i18n** — los `verbose_name` en español (consistente con el resto de la app)

## Riesgos conocidos

1. **Cambiar `OneToOneField` → `ForeignKey` en `categoria`**: el constraint UNIQUE previo debe droparse. La migration automática de Django lo maneja, pero **revisar el SQL generado** antes de aplicar en prod
2. **El campo `categoria` actualmente se usa en signals** (`signals.py`, `grupo_sync.py`) — verificar que no asume 1-a-1
3. **Tests existentes** que asuman la relación 1-a-1 con categoria pueden romperse

## Verificación

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/backend
source venv/bin/activate

# 1. Generar migration
python manage.py makemigrations plataforma

# 2. Inspeccionar el SQL generado
python manage.py sqlmigrate plataforma 0024 | head -50

# 3. Aplicar
python manage.py migrate

# 4. Check
python manage.py check

# 5. Tests del app
python manage.py test plataforma

# 6. Smoke test del admin
python manage.py runserver
# → http://localhost:8000/portal-interno-gestion/
# → Verificar que aparecen LearningPath, CourseReview, Wishlist
# → Verificar que OnlineCourse muestra campos nuevos

# 7. Smoke test del API
curl http://localhost:8000/api/plataforma/courses/ | jq '.[0] | keys'
# Debe incluir: format, access_tier, level, language, is_featured
```

## Out of scope

- ❌ Pagos
- ❌ Signals nuevas
- ❌ Frontend
- ❌ Seed del curso Claude (eso es sprint 2)
- ❌ Permisos custom (los default de DRF son suficientes por ahora)

## Preguntas a resolver antes de empezar

1. ¿La categoría legacy "Inteligencia Artificial" (CharField en `cursos.Curso`) se mantiene o se migra al FK de `Categoria`? → Asumido: se mantiene, no se migra
2. ¿`LearningPath.cover` se sube a S3/Cloudinary o al storage de Django? → Asumido: Django default (WhiteNoise lo sirve)
3. ¿Los reviews son moderados o se publican directo? → Asumido: se publican directo, moderación en fase 2 si hay problema
