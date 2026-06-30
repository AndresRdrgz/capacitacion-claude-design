# Handoff a Claude Code — Sprint 1: Schema + admin

> **Para**: Claude Code (vía `claude --permission-mode acceptEdits -p "..."`)
> **Working dir**: `/Users/andresrodriguez/Documents/GitHub/iAcademy`
> **Branch**: `feat/claude-mvp-schema`
> **PR target**: `main`
> **PR title**: `feat(plataforma): add LearningPath, CourseReview, Wishlist + OnlineCourse extensions for self-paced Claude MVP`
> **Sprint plan**: `.plan/sprints/sprint-1-schema.md` (léelo antes de empezar)

---

## Pre-flight

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/backend
source venv/bin/activate
git checkout -b feat/claude-mvp-schema
git status  # debe estar limpio
```

Lee estos archivos antes de escribir nada (en este orden):
1. `backend/plataforma/models.py` (1,111 líneas, es tu canvas)
2. `backend/plataforma/admin.py`
3. `backend/plataforma/serializers.py`
4. `backend/plataforma/urls.py`
5. `backend/plataforma/views.py` (foco en `OnlineCourseViewSet`, `CourseAdminViewSet`)
6. `backend/plataforma/tests.py` (para ver el patrón de tests)
7. `backend/plataforma/signals.py` (para entender qué signals existen y no romper)
8. `backend/AGENTS.md` (reglas de estilo del repo)
9. `CLAUDE.md` (en la raíz de iAcademy)

## Tarea exacta

Añadir al schema de `plataforma/` las primitivas necesarias para soportar el MVP de cursos self-paced de Claude (ruta "Claude desde Cero" con 1 curso, reseñas, wishlist).

### Cambios concretos

**A. `OnlineCourse` (línea ~89 de `models.py`)**:

```python
# ANTES:
categoria = models.OneToOneField(
    'cursos.Categoria',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='online_course',
    verbose_name="Categoría",
)

# DESPUÉS:
categoria = models.ForeignKey(
    'cursos.Categoria',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='online_courses',  # ← cambiado
    verbose_name="Categoría",
    help_text="Categoría del curso (puede tener múltiples cursos online)",
)
```

Y añadir al final de la clase `OnlineCourse`:

```python
class Format(models.TextChoices):
    SELF_PACED = 'self_paced', 'Self-paced (pregrabado)'
    COHORT_BASED = 'cohort_based', 'Por cohorte'

class AccessTier(models.TextChoices):
    FREE = 'free', 'Gratis'
    MATRICULATED = 'matriculated', 'Por matrícula'
    PRO = 'pro', 'Pro (futuro)'

class Level(models.TextChoices):
    BEGINNER = 'beginner', 'Principiante'
    INTERMEDIATE = 'intermediate', 'Intermedio'
    ADVANCED = 'advanced', 'Avanzado'

# Dentro de OnlineCourse:
format = models.CharField(
    max_length=20,
    choices=Format.choices,
    default=Format.COHORT_BASED,
    db_index=True,
    verbose_name="Formato",
)
access_tier = models.CharField(
    max_length=20,
    choices=AccessTier.choices,
    default=AccessTier.MATRICULATED,
    db_index=True,
    verbose_name="Nivel de acceso",
)
level = models.CharField(
    max_length=20,
    choices=Level.choices,
    default=Level.BEGINNER,
    verbose_name="Nivel",
)
language = models.CharField(max_length=5, default='es', verbose_name="Idioma")
is_featured = models.BooleanField(default=False, verbose_name="Destacado")
```

**B. `Lesson` (línea ~226 de `models.py`)**:

Añadir al final de la clase, antes de `created_at`:

```python
transcript = models.TextField(blank=True, verbose_name="Transcripción")
vimeo_chapters = models.JSONField(default=list, blank=True, verbose_name="Capítulos de Vimeo")
estimated_read_minutes = models.PositiveIntegerField(default=0, verbose_name="Minutos de lectura estimados")
```

**C. Clases nuevas al final de `models.py`**:

```python
# =============================================================================
# LEARNING PATHS (Self-paced course collections)
# =============================================================================

class LearningPath(models.Model):
    """Agrupa cursos online en una ruta de aprendizaje ordenada."""
    class Level(models.TextChoices):
        BEGINNER = 'beginner', 'Principiante'
        INTERMEDIATE = 'intermediate', 'Intermedio'
        ADVANCED = 'advanced', 'Avanzado'

    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(max_length=220, unique=True, verbose_name="Slug")
    short_description = models.CharField(max_length=300, blank=True, verbose_name="Descripción corta")
    description = models.TextField(blank=True, verbose_name="Descripción")
    cover = models.ImageField(upload_to='plataforma/paths/', null=True, blank=True, verbose_name="Portada")
    level = models.CharField(max_length=20, choices=Level.choices, default=Level.BEGINNER, verbose_name="Nivel")
    is_published = models.BooleanField(default=False, db_index=True, verbose_name="Publicada")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Ruta de Aprendizaje"
        verbose_name_plural = "Rutas de Aprendizaje"
        ordering = ['order', 'title']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def is_visible(self):
        return self.is_published and self.path_courses.exists()


class LearningPathCourse(models.Model):
    """Through table: cursos dentro de una ruta con orden."""
    path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='path_courses', verbose_name="Ruta")
    course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, related_name='path_memberships', verbose_name="Curso")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden")
    is_required = models.BooleanField(default=True, verbose_name="Obligatorio")

    class Meta:
        verbose_name = "Curso en Ruta"
        verbose_name_plural = "Cursos en Rutas"
        ordering = ['order']
        unique_together = ['path', 'course']

    def __str__(self):
        return f"{self.path.title} → {self.course.title}"


# =============================================================================
# COURSE REVIEWS
# =============================================================================

class CourseReview(models.Model):
    """Reseña de un curso (rating 1-5 + comentario)."""
    course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, related_name='reviews', verbose_name="Curso")
    learner = models.ForeignKey(LearnerProfile, on_delete=models.CASCADE, related_name='reviews', verbose_name="Estudiante")
    rating = models.PositiveSmallIntegerField(verbose_name="Rating")
    title = models.CharField(max_length=200, blank=True, verbose_name="Título")
    comment = models.TextField(verbose_name="Comentario")
    is_verified_completion = models.BooleanField(default=False, verbose_name="Verificada por finalización")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Reseña"
        verbose_name_plural = "Reseñas"
        ordering = ['-created_at']
        unique_together = ['course', 'learner']

    def __str__(self):
        return f"{self.learner.estudiante.nombreCompleto} - {self.course.title}: {self.rating}★"

    def clean(self):
        from django.core.exceptions import ValidationError
        if self.rating < 1 or self.rating > 5:
            raise ValidationError({'rating': 'El rating debe estar entre 1 y 5.'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


# =============================================================================
# WISHLIST
# =============================================================================

class Wishlist(models.Model):
    """Curso guardado por un estudiante para ver después."""
    learner = models.ForeignKey(LearnerProfile, on_delete=models.CASCADE, related_name='wishlist', verbose_name="Estudiante")
    course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, related_name='wishlisted_by', verbose_name="Curso")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Lista de Deseos"
        verbose_name_plural = "Lista de Deseos"
        unique_together = ['learner', 'course']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.learner.estudiante.nombreCompleto} → {self.course.title}"
```

**D. `admin.py`**:

Registrar los 3 modelos nuevos con clases `ModelAdmin` básicas (list_display, search_fields, list_filter). Extender el admin de `OnlineCourse` para mostrar los campos nuevos. Extender el admin de `Lesson` para mostrar `transcript` y `vimeo_chapters` (idealmente en fieldsets).

**E. `serializers.py`**:

- Extender `OnlineCourseSerializer` para incluir los campos nuevos
- Extender `LessonSerializer` para incluir `transcript`, `vimeo_chapters`, `estimated_read_minutes`
- Crear `LearningPathSerializer` (para list) y `LearningPathDetailSerializer` (con `path_courses` anidados)
- Crear `CourseReviewSerializer` con campo computado `learner_name` (de `learner.estudiante.nombreCompleto`)
- Crear `WishlistSerializer`

**F. `views.py`**:

- Crear `LearningPathViewSet` (ReadOnlyModelViewSet, `permission_classes = [AllowAny]`, `lookup_field = 'slug'`, filtra por `is_published=True` en `get_queryset`)
- Crear `CourseReviewViewSet` con:
  - `GET /api/plataforma/courses/<slug>/reviews/` — lista (autenticado o no, queryset filtrado por `course__slug`)
  - `POST` igual path — autenticado, valida que el learner está matriculado en el curso
  - `GET/PATCH/DELETE /api/plataforma/reviews/<id>/` — solo el autor o admin
- Crear `WishlistViewSet` con:
  - `GET /api/plataforma/me/wishlist/` — solo autenticado
  - `POST /api/plataforma/me/wishlist/` con `{course_id}` — solo autenticado
  - `DELETE /api/plataforma/me/wishlist/<course_id>/` — solo autenticado

**G. `urls.py`**:

```python
# Agregar imports y rutas:
from .views import LearningPathViewSet, CourseReviewViewSet, WishlistViewSet

# Agregar al router público:
router.register(r'paths', LearningPathViewSet, basename='path')

# Agregar al admin router:
admin_router.register(r'course-reviews', CourseReviewViewSet, basename='admin-course-review')
admin_router.register(r'wishlist', WishlistViewSet, basename='admin-wishlist')

# Paths adicionales (no router):
path('courses/<slug:slug>/reviews/', CourseReviewViewSet.as_view({'get': 'list', 'post': 'create'}), name='course-reviews'),
path('me/wishlist/', WishlistViewSet.as_view({'get': 'list', 'post': 'create'}), name='my-wishlist'),
path('me/wishlist/<int:course_id>/', WishlistViewSet.as_view({'delete': 'destroy'}), name='my-wishlist-delete'),
```

**H. `tests.py`**:

Mínimo 1 test por modelo nuevo:
- `LearningPathTestCase.test_create_and_slug_auto`
- `LearningPathCourseTestCase.test_unique_together`
- `CourseReviewTestCase.test_rating_validation` (rating=0 debe fallar, rating=6 debe fallar)
- `CourseReviewTestCase.test_unique_per_learner`
- `WishlistTestCase.test_unique_together`
- `OnlineCourseTestCase.test_new_fields_defaults`

**I. Migration**:

`makemigrations` debe generar `0024_*.py` con los cambios. NO editar a mano la migration. Pero SÍ revisarla con `sqlmigrate` antes de aplicar:

```bash
python manage.py makemigrations plataforma
python manage.py sqlmigrate plataforma 0024
```

## Restricciones absolutas

1. NO toques `cursos/models.py`
2. NO toques `cursos/admin.py`
3. NO toques signals existentes en `plataforma/signals.py` (puedes crear nuevos si los necesitas, pero revisa primero que no rompas el auto-sync)
4. NO agregues dependencias a `requirements.txt`
5. NO elimines campos existentes
6. NO cambies los nombres de campos existentes (solo añadir)
7. Mantén consistencia con el estilo del código existente (PEP 8, 4 espacios, snake_case, español en verbose_name)
8. Los cambios deben ser backwards-compatible: clientes del API existente no deben romperse

## Entregables del PR

- 1 migration nueva (`0024_*.py`)
- Cambios en `models.py`, `admin.py`, `serializers.py`, `views.py`, `urls.py`
- Tests nuevos en `tests.py`
- (Opcional pero recomendado) Notas en `CHANGELOG.md` si existe

## Verificación final (antes de pedir review)

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/backend
source venv/bin/activate

# 1. Migración
python manage.py makemigrations plataforma --check --dry-run
python manage.py migrate
python manage.py check

# 2. Tests
python manage.py test plataforma -v 2

# 3. Lint (si hay flake8/pylint/black configurado)
# python -m flake8 plataforma/  # o el que use el repo

# 4. Smoke test admin
python manage.py runserver &
sleep 2
curl -sI http://localhost:8000/portal-interno-gestion/plataforma/learningpath/ | head -1
# Debe ser 200 o 302 (redirect a login)

# 5. Smoke test API
curl -s http://localhost:8000/api/plataforma/paths/ | python -m json.tool
# Debe ser 200 con array vacío
curl -s http://localhost:8000/api/plataforma/courses/ | python -m json.tool | head -30
# Debe incluir campos nuevos en el primer item

# 6. OpenAPI regenera
curl -s http://localhost:8000/api/schema/ | head -100
# No debe haber warnings de campos faltantes

# 7. Apagar
kill %1
```

## Output esperado

Cuando termines, reporta:
1. Archivos modificados (con `git diff --stat`)
2. Output completo de `python manage.py test plataforma`
3. Output del SQL de la migration (primeras 50 líneas)
4. Output del smoke test del API
5. Lista de cualquier desviación de las restricciones

NO hagas commit. NO hagas push. NO abras PR. Esos pasos los hace Andrés manualmente después de revisar el diff.

## Si te encuentras con algo no especificado

Para y pregunta. No asumas. Si una restricción choca con lo que estás intentando, levántalo explícitamente.
