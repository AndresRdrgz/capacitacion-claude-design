# Arquitectura técnica del MVP

> **Estado**: v0.1 — revisado con el código real de iAcademy
> **Fecha**: 2026-06-30

---

## 1. El descubrimiento clave (cambio de enfoque)

**iAcademy ya tiene una plataforma e-learning completa.** El MVP no es "construir una plataforma", es "extender la plataforma existente para soportar un caso de uso nuevo: cursos 100% pregrabados y self-paced, sin cohorte".

Todo el código nuevo va al repo `iAcademy/` (monorepo). El repo `capacitacion-claude-design/` es **solo el repositorio de planning** del MVP — documentos, sprints, handoffs para Claude Code, research.

## 2. Stack real (no inventar)

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Next.js 16 + React 19)                            │
│  ─────────────────────────────────────────────────────      │
│  frontend-plataforma/ (estudiantes)                          │
│  ├── (platform)/cursos                                       │
│  ├── (platform)/curso/[id]                                  │
│  ├── (platform)/leccion/[id]                                │
│  ├── (platform)/dashboard                                   │
│  ├── (platform)/perfil                                      │
│  ├── (platform)/ruta/[slug]  ← NUEVO en sprint 3            │
│  ├── staff/                                                  │
│  └── admin/                                                  │
│                                                              │
│  Stack: Next 16 App Router · TS strict · Tailwind v4        │
│        shadcn/ui · Radix · Sonner · lucide-react            │
│        AuthContext (JWT en localStorage)                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST + JWT
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (Django 5.1 + DRF)                                  │
│  ─────────────────────────────────────────────────────      │
│  backend/plataforma/                                         │
│  ├── models.py        ← schema del e-learning               │
│  ├── views.py         ← 12 ViewSets (course, lesson, ...)   │
│  ├── serializers.py   ← DRF serializers                     │
│  ├── vimeo_views.py   ← integración Vimeo TUS               │
│  ├── urls.py          ← /api/plataforma/...                 │
│  ├── auth_views.py    ← JWT custom                          │
│  ├── profesor_api_*   ← endpoints profesor                  │
│  ├── signals.py       ← auto-sync de grupos                  │
│  └── migrations/      ← 0023 actual                         │
│                                                              │
│  Stack: Django 5.1 · DRF 3.16 · drf-spectacular (Swagger)  │
│        simplejwt · django-filter · Postgres (prod) / SQLite  │
│        Render para deploy · WhiteNoise                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Vimeo TUS + embed
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  VIDEO (Vimeo Pro/Plus)                                      │
│  ─────────────────────────────────────────────────────      │
│  TUS resumable upload · folders por categoría+sección        │
│  Embed whitelist (whitelist por dominio)                     │
│  Password protection · Sin download                          │
└─────────────────────────────────────────────────────────────┘
```

## 3. Schema actual (lo que ya tenemos) vs schema nuevo

### 3.1 Lo que NO se toca (funciona)

| Modelo | Por qué se queda |
|---|---|
| `User` (Django auth) | Auth, roles, JWT |
| `UserProfile` (cursos) | Roles Admin/Ventas/Profesor/Estudiante |
| `Estudiante` (cursos) | El "alumno", con cédula, onboarding, intereses |
| `Profesor` (cursos) | El instructor |
| `Categoria` (cursos) | Taxonomía |
| `Curso` (cursos) | El curso presencial legacy — no se toca |
| `Inscripcion` (cursos) | La matrícula legacy — **esta es la que controla el acceso** |
| `OnlineCourse` (plataforma) | El curso online, base de todo |
| `Section` (plataforma) | Módulos del curso |
| `Lesson` (plataforma) | Video, quiz, exercise |
| `Resource` (plataforma) | PDFs y archivos |
| `Quiz` + `Question` + `Answer` (plataforma) | Quizzes |
| `QuizAttempt` (plataforma) | Intentos del estudiante |
| `CourseEnrollment` (plataforma) | Inscripción al curso online |
| `LessonProgress` (plataforma) | Progreso por lección + XP |
| `LearnerProfile` (plataforma) | XP, level, streak |
| `Badge` + `LearnerBadge` (plataforma) | Gamificación |
| `Grupo` + `GrupoMember` (plataforma) | Cohortes, vinculado a `Curso` legacy |
| `GrupoEmpresarial` + `GrupoEmpresarialMember` | B2B |
| `Comment` + `CommentLike` (plataforma) | Discusiones |
| `TareaTemplate` + `TareaTemplateAttachment` | Tareas auto-generadas |
| `PasswordResetToken` | Reset de password |

### 3.2 Lo que se agrega (migration 0024)

**Cambios a modelos existentes:**

```python
# OnlineCourse
- categoria = OneToOneField(...)  # ❌ muy restrictivo
+ categoria = ForeignKey(...)      # ✅ N cursos por categoría

+ format = CharField(choices=[
    ('self_paced', 'Self-paced (pregrabado)'),
    ('cohort_based', 'Por cohorte'),
  ], default='cohort_based')

+ access_tier = CharField(choices=[
    ('free', 'Gratis'),
    ('matriculated', 'Por matrícula'),  # ← default MVP
    ('pro', 'Pro (futuro)'),
  ], default='matriculated')

+ level = CharField(choices=[
    ('beginner', 'Principiante'),
    ('intermediate', 'Intermedio'),
    ('advanced', 'Avanzado'),
  ], default='beginner')

+ language = CharField(max_length=5, default='es')

+ is_featured = BooleanField(default=False)

# Lesson
+ transcript = TextField(blank=True)
+ vimeo_chapters = JSONField(default=list, blank=True)
+ estimated_read_minutes = PositiveIntegerField(default=0)  # para ejercicios
```

**Modelos nuevos:**

```python
class LearningPath(models.Model):
    """Ruta de aprendizaje = colección ordenada de cursos online"""
    title = CharField(max_length=200)
    slug = SlugField(unique=True)
    description = TextField(blank=True)
    short_description = CharField(max_length=300, blank=True)
    cover = ImageField(upload_to='plataforma/paths/', null=True, blank=True)
    level = CharField(choices=LEVEL_CHOICES, default='beginner')
    is_published = BooleanField(default=False)
    order = PositiveIntegerField(default=0)
    created_at, updated_at

    class Meta:
        ordering = ['order', 'title']

class LearningPathCourse(models.Model):
    """Through table: cursos en una ruta con orden"""
    path = ForeignKey(LearningPath, related_name='path_courses')
    course = ForeignKey(OnlineCourse, related_name='path_memberships')
    order = PositiveIntegerField(default=0)
    is_required = BooleanField(default=True)

    class Meta:
        ordering = ['order']
        unique_together = ['path', 'course']

class CourseReview(models.Model):
    """Reseñas estilo Platzi (rating 1-5 + comentario)"""
    course = ForeignKey(OnlineCourse, related_name='reviews')
    learner = ForeignKey(LearnerProfile, related_name='reviews')
    rating = PositiveSmallIntegerField()  # 1-5, validado en clean()
    title = CharField(max_length=200, blank=True)
    comment = TextField()
    is_verified_completion = BooleanField(default=False)  # terminó el curso
    created_at, updated_at

    class Meta:
        unique_together = ['course', 'learner']
        ordering = ['-created_at']

class Wishlist(models.Model):
    """Lista de deseos del estudiante"""
    learner = ForeignKey(LearnerProfile, related_name='wishlist')
    course = ForeignKey(OnlineCourse, related_name='wishlisted_by')
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['learner', 'course']
```

### 3.3 Lo que NO se hace (deliberadamente)

- ❌ No se crea un nuevo proyecto Django
- ❌ No se cambia el sistema de auth (sigue JWT)
- ❌ No se reemplaza Vimeo
- ❌ No se migra la `Categoria` legacy
- ❌ No se toca el modelo `Inscripcion` legacy (los estudiantes que pagan en iAcademy siguen generando inscripción legacy → signal crea `GrupoMember` → signal crea `CourseEnrollment`)
- ❌ No se agrega Stripe, ni Yappy, ni nada de pagos

## 4. El flow de acceso (cómo un estudiante llega al curso)

```
┌──────────────────────────────────────────────────────────────┐
│  FUERA DE LA PLATAFORMA                                       │
│  ─────────────────────────────────────────────────────       │
│  1. Estudiante ve marketing de "Curso de Claude"             │
│     (LinkedIn, referido, evento)                             │
│  2. Llena formulario de contacto o va a iAcademy             │
│  3. Andrés/staff crea Estudiante en admin Django             │
│  4. Staff crea Inscripcion legacy (cursos.Curso + Inscripcion)│
│  5. Signal auto-crea Grupo + GrupoMember                     │
│  6. Signal auto-crea CourseEnrollment + LearnerProfile       │
│  7. Staff genera password inicial, lo manda por email        │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│  DENTRO DE LA PLATAFORMA                                      │
│  ─────────────────────────────────────────────────────       │
│  8. Estudiante hace login en /login (JWT)                    │
│  9. Ve su dashboard con "Mis Cursos" → encuentra Claude      │
│  10. Click → /cursos/claude-code → /leccion/[first]          │
│  11. Ve video Vimeo, contesta quiz, sube de nivel            │
│  12. Al completar todas las lecciones → certificado          │
└──────────────────────────────────────────────────────────────┘
```

**El estudiante nunca ve "pago", "tarjeta", "plan". Solo "este curso está disponible para ti".**

## 5. Endpoints nuevos (sprint 3)

```
GET    /api/plataforma/paths/                          # listar rutas publicadas
GET    /api/plataforma/paths/<slug>/                   # detalle de ruta + cursos
GET    /api/plataforma/courses/<slug>/                 # ya existe, se extiende
GET    /api/plataforma/lessons/<id>/                   # ya existe
GET    /api/plataforma/lessons/<id>/transcript/        # NUEVO: transcript
GET    /api/plataforma/courses/<slug>/reviews/         # NUEVO: reseñas
POST   /api/plataforma/courses/<slug>/reviews/         # NUEVO: crear reseña
GET    /api/plataforma/me/wishlist/                    # NUEVO
POST   /api/plataforma/me/wishlist/<course_id>/        # NUEVO
DELETE /api/plataforma/me/wishlist/<course_id>/        # NUEVO
```

## 6. Frontend nuevo (sprint 3)

```
src/app/(platform)/
├── rutas/
│   ├── page.tsx                          # catálogo de rutas
│   └── [slug]/
│       └── page.tsx                      # detalle de ruta + cursos
├── curso/[cursoId]/
│   ├── page.tsx                          # ya existe, se extiende con tabs
│   └── reviews/page.tsx                  # NUEVO
└── leccion/[leccionId]/
    ├── page.tsx                          # ya existe, se mejora
    └── transcript/page.tsx               # NUEVO (opcional)
```

## 7. Permisos y roles

| Acción | Estudiante | Profesor | Admin |
|---|---|---|---|
| Ver preview de lecciones (`is_preview=True`) | ✅ | ✅ | ✅ |
| Ver lección completa de curso matriculado | ✅ si matriculado | ✅ | ✅ |
| Contestar quiz | ✅ si matriculado | ✅ | ✅ |
| Comentar | ✅ si matriculado | ✅ | ✅ |
| Reseñar curso | ✅ si completó | ✅ | ✅ |
| Crear curso online | ❌ | ✅ | ✅ |
| Subir video a Vimeo | ❌ | ✅ | ✅ |
| Crear quiz | ❌ | ✅ | ✅ |
| Crear ruta de aprendizaje | ❌ | ❌ | ✅ |
| Matricular estudiante | ❌ | ❌ | ✅ (vía legacy) |

## 8. Costos de operación del MVP

```
Vimeo Pro (~$20/mes)           — video
Render (Free tier)              — backend
Vercel (Free tier)              — frontend
Postgres (Free tier en Render)  — DB
Total: ~$20/mes
```

Sin costos de IA, sin costos de pasarela, sin costos de auth externa. **El MVP es esencialmente gratis hasta ~1000 estudiantes activos**.

## 9. Decisiones técnicas cerradas

1. **Single Next.js app** — no se separan rutas Claude en otro deploy
2. **Tailwind v4** — no se introduce CSS-in-JS ni styled-components
3. **shadcn/ui** — no se introduce Material UI, Chakra, etc.
4. **JWT en localStorage** — no se migra a httpOnly cookies en el MVP
5. **Sin CMS externo** — todo se modela en Django (admin, models, serializers)
6. **Sin GraphQL** — sigue REST
7. **Sin microservicios** — sigue monolito Django
8. **Sin serverless** — sigue Render (Web Service tradicional)
9. **Sin background workers** — todo síncrono en request/response (Vimeo webhook se puede agregar si hace falta en fase 2)
10. **Sin Redis en MVP** — si hay que rate-limit, se hace con DB
