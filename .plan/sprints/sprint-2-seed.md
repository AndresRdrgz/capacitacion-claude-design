# Sprint 2 — Seed del curso "Claude Code"

> **Duración**: 1 semana
> **PR target**: `iAcademy` → branch `feat/claude-mvp-seed`
> **Handoff para Claude Code**: `.plan/handoffs/handoff-2-seed.md`
> **Depende de**: Sprint 1 mergeado

---

## Objetivo

Cargar el contenido del curso "Claude Code" en la base de datos de iAcademy como data real (no hardcoded en código). El curso debe ser navegable, tener quizzes funcionales y servir de template para futuros cursos.

## Entregable: una data migration

**Archivo**: `backend/plataforma/migrations/0025_seed_claude_course.py`

Esta migration crea:

### 1. Una `LearningPath`: "Claude desde Cero"

```
title:           "Claude desde Cero"
slug:            "claude-desde-cero"
short_description: "Tu primer programa con Claude como copiloto. Aprende desde cero a integrar la IA de Anthropic en tu flujo de trabajo."
description:     "Esta ruta te lleva de no saber qué es Claude a construir tu primera aplicación con la API de Anthropic. Empezamos con conceptos fundamentales, seguimos con casos de uso prácticos, y terminamos integrando Claude en proyectos reales. Sin requisitos previos de programación avanzada."
level:           "beginner"
is_published:    True
```

### 2. Un `OnlineCourse`: "Curso de Claude Code"

```
title:           "Curso de Claude Code"
slug:            "curso-de-claude-code"
short_description: "Programa con Claude: desde prompts hasta aplicaciones production-ready con la API de Anthropic."
description:     "Aprende a usar Claude Code y la API de Anthropic para construir software de forma conversacional. 8 clases en video, 3 quizzes, 5 recursos descargables. Diseñado para developers que ya programan en JavaScript o Python y quieren integrar IA en su flujo diario."
categoria:       (crear si no existe) "Inteligencia Artificial" — reusar la Categoria legacy si existe
instructor:      None  (placeholder, Andrés actualiza después)
format:          "self_paced"
access_tier:     "matriculated"
level:           "beginner"
language:        "es"
is_featured:     True
duration:        "1h 30min"  (aprox, se recalcula)
```

### 3. Tres `Section`s (módulos)

| # | Title | Description | Order |
|---|---|---|---|
| 1 | "Fundamentos de Claude" | "Qué es Claude, cómo funciona y qué puede hacer por ti. Sin tecnicismos." | 1 |
| 2 | "Tu primer proyecto con Claude" | "Configura tu entorno, haz tu primera llamada a la API y construye una app simple." | 2 |
| 3 | "Buenas prácticas y siguientes pasos" | "Cómo escribir prompts efectivos, manejar errores, costos y cuándo Claude NO es la respuesta." | 3 |

### 4. Diez `Lesson`s (mezcla de video/quiz/exercise)

| # | Section | Title | Type | Duration | is_preview | vimeo_id |
|---|---|---|---|---|---|---|
| 1 | 1 | "Bienvenida al curso" | video | "3 min" | True | (Andrés sube después) |
| 2 | 1 | "Qué es Claude y qué no es" | video | "8 min" | True | (Andrés sube después) |
| 3 | 1 | "Quiz: conceptos básicos" | quiz | "5 preguntas" | False | — |
| 4 | 2 | "Configurando tu entorno de desarrollo" | video | "10 min" | False | (Andrés sube después) |
| 5 | 2 | "Tu primera llamada a la API" | video | "12 min" | False | (Andrés sube después) |
| 6 | 2 | "Ejercicio: un chatbot en 20 líneas" | exercise | "20 min" | False | — |
| 7 | 2 | "Quiz: API y entorno" | quiz | "5 preguntas" | False | — |
| 8 | 3 | "Prompting efectivo: el framework APE" | video | "15 min" | False | (Andrés sube después) |
| 9 | 3 | "Cuándo NO usar Claude" | video | "8 min" | False | (Andrés sube después) |
| 10 | 3 | "Quiz final" | quiz | "8 preguntas" | False | — |

**Importante**: `vimeo_id` se deja en `None` en el seed. Andrés los sube después vía admin/Vimeo Studio. La lección sigue siendo navegable (front muestra "Video próximamente").

### 5. Tres `Quiz`es (uno por sección, en la lección marcada)

Cada quiz con 3-5 preguntas de opción múltiple. Ejemplo para Quiz 1:

```python
Quiz 1 (lesson "Quiz: conceptos básicos", passing_score=70, max_attempts=3)

P1: ¿Quién creó a Claude?
  a) OpenAI
  b) Google
  c) Anthropic  ✓
  d) Meta

P2: ¿Cuál es la principal diferencia entre Claude y un chatbot tradicional?
  a) Claude es más caro
  b) Claude analiza contexto completo y razona, no solo completa texto  ✓
  c) Claude solo funciona en inglés
  d) Claude requiere instalación local

P3: ¿Qué modelo de Claude es mejor para tareas largas y razonamiento complejo?
  a) Claude Haiku
  b) Claude Sonnet  ✓
  c) Claude Instant
  d) Claude Lite

P4: ¿Claude puede ver imágenes?
  a) No, solo texto
  b) Sí, los modelos actuales son multimodales  ✓
  c) Solo en versión beta privada
  d) Solo si pagas extra

P5: ¿Para qué NO es ideal Claude?
  a) Escribir código
  b) Resumir documentos
  c) Calcular fechas exactas o hacer operaciones matemáticas precisas  ✓
  d) Hacer lluvia de ideas
```

(El equipo de Andrés escribe las preguntas reales. El seed inicial puede tener placeholders o las que aquí se sugieren.)

### 6. Cinco `Resource`s

| # | Name | Type | Description | Sections |
|---|---|---|---|---|
| 1 | "Cheatsheet de prompts Claude" | pdf | "PDF de 2 páginas con los 10 patrones de prompting más efectivos" | todas |
| 2 | "Anthropic API Quickstart (oficial)" | other | URL a docs.anthropic.com | [2] |
| 3 | "Código del chatbot del módulo 2" | zip | "Repo ZIP con el código del ejercicio" | [2] |
| 4 | "Pricing calculator" | other | "URL a la calculadora de costos de la API" | [3] |
| 5 | "Lista de modelos disponibles" | pdf | "Tabla comparativa Haiku/Sonnet/Opus con casos de uso" | [1, 3] |

### 7. Vinculación `LearningPath ↔ OnlineCourse`

```python
LearningPathCourse(
    path=claude_desde_cero,
    course=curso_claude_code,
    order=1,
    is_required=True,
)
```

## Idempotencia

La migration DEBE ser idempotente: correrla 2 veces no debe duplicar data. Patrón:

```python
def migrate_claude(apps, schema_editor):
    LearningPath = apps.get_model('plataforma', 'LearningPath')
    path, _ = LearningPath.objects.get_or_create(
        slug='claude-desde-cero',
        defaults={'title': '...', ...},
    )
    # ... etc
```

## Operation pattern

```python
from django.db import migrations


def seed_claude(apps, schema_editor):
    # ... toda la lógica ...
    pass


def unseed_claude(apps, schema_editor):
    # Solo borra lo que esta migration creó
    # Útil para rollback
    pass


class Migration(migrations.Migration):
    dependencies = [
        ('plataforma', '0024_claude_extensions'),  # la del sprint 1
    ]

    operations = [
        migrations.RunPython(seed_claude, unseed_claude),
    ]
```

## Verificación

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/backend
source vbin/activate

# 1. Aplicar migration
python manage.py migrate plataforma 0025

# 2. Verificar idempotencia
python manage.py migrate plataforma 0025 --fake  # rebobina
python manage.py migrate plataforma 0025        # reaplica — no debe fallar

# 3. Inspeccionar en shell
python manage.py shell << 'EOF'
from plataforma.models import LearningPath, OnlineCourse
p = LearningPath.objects.get(slug='claude-desde-cero')
print(p.title)
print(p.path_courses.count())
c = p.path_courses.first().course
print(c.title)
print(c.sections.count())
for s in c.sections.all():
    print(f"  {s.title}: {s.lessons.count()} lecciones")
    for l in s.lessons.all():
        print(f"    - {l.title} ({l.type})")

# 4. API smoke test
import requests
r = requests.get('http://localhost:8000/api/plataforma/courses/curso-de-claude-code/')
print(r.json()['sections'][0]['lessons'][0]['title'])
EOF

# 5. Ver en admin
python manage.py runserver
# → http://localhost:8000/portal-interno-gestion/plataforma/learningpath/
# → Click en "Claude desde Cero" → debe mostrar el curso vinculado
```

## Out of scope

- ❌ Subir videos reales a Vimeo (eso es manual después)
- ❌ Crear matrículas de estudiantes de prueba (eso es sprint 3+)
- ❌ Crear reseñas de ejemplo
- ❌ Traducción a inglés
- ❌ Agregar más cursos a la ruta (se queda en 1 por ahora)

## Riesgos

1. **Si el seed tiene `vimeo_id` placeholder, las lecciones de video no se pueden ver en el front** — eso es esperado, se documenta con un banner "Video próximamente"
2. **Si Andrés no aprueba las preguntas del quiz antes de mergear**, se mergea con placeholders y se actualiza después vía admin
3. **El slug "curso-de-claude-code" debe ser único** — si ya existe por alguna razón, el `get_or_create` lo manejará pero hay que avisar a Andrés
