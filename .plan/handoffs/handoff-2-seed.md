# Handoff a Claude Code — Sprint 2: Seed del curso

> **Para**: Claude Code
> **Working dir**: `/Users/andresrodriguez/Documents/GitHub/iAcademy`
> **Branch base**: `main` (después de mergear sprint 1)
> **Branch de trabajo**: `feat/claude-mvp-seed`
> **PR target**: `main`
> **PR title**: `feat(plataforma): seed "Curso de Claude Code" data migration`
> **Sprint plan**: `.plan/sprints/sprint-2-seed.md`
> **Depende de**: Sprint 1 mergeado

---

## Pre-flight

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy
git checkout main
git pull
git checkout -b feat/claude-mvp-seed
cd backend
source venv/bin/activate
```

Verifica que el sprint 1 está mergeado:

```bash
python manage.py showmigrations plataforma | tail -5
# Debe mostrar 0024 aplicada
```

Lee estos archivos antes de escribir:
1. `backend/plataforma/models.py` (especialmente `OnlineCourse`, `Section`, `Lesson`, `Quiz`, `Question`, `Answer`, `Resource`, `LearningPath`, `LearningPathCourse`)
2. `backend/plataforma/migrations/0001_initial.py` (para ver el patrón de data migrations)
3. `backend/plataforma/management/commands/sync_grupos.py` (para ver cómo Andrés escribe data scripts)
4. `backend/AGENTS.md`
5. `.plan/sprints/sprint-2-seed.md` (este sprint, ya leído)

## Tarea exacta

Crear **una sola data migration** que cargue en la base de datos el curso "Claude Code" como contenido real (no hardcoded en el código de la app).

### Migration

**Archivo**: `backend/plataforma/migrations/0025_seed_claude_course.py`

```python
from django.db import migrations
from django.utils.text import slugify


def seed_claude(apps, schema_editor):
    """Carga el curso 'Claude Code' en la base de datos."""
    LearningPath = apps.get_model('plataforma', 'LearningPath')
    LearningPathCourse = apps.get_model('plataforma', 'LearningPathCourse')
    OnlineCourse = apps.get_model('plataforma', 'OnlineCourse')
    Section = apps.get_model('plataforma', 'Section')
    Lesson = apps.get_model('plataforma', 'Lesson')
    Quiz = apps.get_model('plataforma', 'Quiz')
    Question = apps.get_model('plataforma', 'Question')
    Answer = apps.get_model('plataforma', 'Answer')
    Resource = apps.get_model('plataforma', 'Resource')
    Categoria = apps.get_model('cursos', 'Categoria')

    # --- 1. Categoría (reusar o crear) ---
    categoria, _ = Categoria.objects.get_or_create(
        nombre='Inteligencia Artificial',
        parent=None,
        defaults={'nombre': 'Inteligencia Artificial'},
    )

    # --- 2. OnlineCourse ---
    course, created = OnlineCourse.objects.get_or_create(
        slug='curso-de-claude-code',
        defaults={
            'title': 'Curso de Claude Code',
            'short_description': 'Programa con Claude: desde prompts hasta aplicaciones production-ready con la API de Anthropic.',
            'description': """Aprende a usar Claude Code y la API de Anthropic para construir software de forma conversacional. 10 clases en video, 3 quizzes, 5 recursos descargables. Diseñado para developers que ya programan en JavaScript o Python y quieren integrar IA en su flujo diario.

En este curso vas a:
- Entender qué es Claude, qué hace y qué NO hace
- Configurar tu entorno y hacer tu primera llamada a la API
- Construir un chatbot funcional en menos de 20 líneas
- Escribir prompts efectivos con el framework APE
- Saber cuándo Claude es la respuesta correcta y cuándo no""",
            'categoria': categoria,
            'format': 'self_paced',
            'access_tier': 'matriculated',
            'level': 'beginner',
            'language': 'es',
            'is_featured': True,
            'status': 'published',
            'duration': '1h 30min',
        },
    )

    # --- 3. Sections (3 módulos) ---
    sections_data = [
        {
            'order': 1,
            'title': 'Fundamentos de Claude',
            'description': 'Qué es Claude, cómo funciona y qué puede hacer por ti. Sin tecnicismos.',
        },
        {
            'order': 2,
            'title': 'Tu primer proyecto con Claude',
            'description': 'Configura tu entorno, haz tu primera llamada a la API y construye una app simple.',
        },
        {
            'order': 3,
            'title': 'Buenas prácticas y siguientes pasos',
            'description': 'Cómo escribir prompts efectivos, manejar errores, costos y cuándo Claude NO es la respuesta.',
        },
    ]

    sections = {}
    for s in sections_data:
        section, _ = Section.objects.get_or_create(
            course=course,
            order=s['order'],
            defaults={'title': s['title'], 'description': s['description']},
        )
        sections[s['order']] = section

    # --- 4. Lessons (10 en total) ---
    lessons_data = [
        # Módulo 1
        {'section': 1, 'order': 1, 'title': 'Bienvenida al curso', 'type': 'video', 'duration': '3 min', 'is_preview': True},
        {'section': 1, 'order': 2, 'title': 'Qué es Claude y qué no es', 'type': 'video', 'duration': '8 min', 'is_preview': True},
        {'section': 1, 'order': 3, 'title': 'Quiz: conceptos básicos', 'type': 'quiz', 'duration': '5 preguntas', 'is_preview': False},
        # Módulo 2
        {'section': 2, 'order': 1, 'title': 'Configurando tu entorno de desarrollo', 'type': 'video', 'duration': '10 min', 'is_preview': False},
        {'section': 2, 'order': 2, 'title': 'Tu primera llamada a la API', 'type': 'video', 'duration': '12 min', 'is_preview': False},
        {'section': 2, 'order': 3, 'title': 'Ejercicio: un chatbot en 20 líneas', 'type': 'exercise', 'duration': '20 min', 'is_preview': False,
         'content': """## El reto

Vas a construir un chatbot que:
1. Recibe un mensaje del usuario
2. Lo manda a Claude con la API
3. Imprime la respuesta

## Setup

```bash
npm install @anthropic-ai/sdk
```

## El código (Node.js)

```javascript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function chat(userMessage) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: userMessage }],
  });
  return message.content[0].text;
}

console.log(await chat('Hola, ¿cómo estás?'));
```

## Bonus

Agrega un loop para que sea conversacional de verdad."""},
        {'section': 2, 'order': 4, 'title': 'Quiz: API y entorno', 'type': 'quiz', 'duration': '5 preguntas', 'is_preview': False},
        # Módulo 3
        {'section': 3, 'order': 1, 'title': 'Prompting efectivo: el framework APE', 'type': 'video', 'duration': '15 min', 'is_preview': False},
        {'section': 3, 'order': 2, 'title': 'Cuándo NO usar Claude', 'type': 'video', 'duration': '8 min', 'is_preview': False},
        {'section': 3, 'order': 3, 'title': 'Quiz final', 'type': 'quiz', 'duration': '8 preguntas', 'is_preview': False},
    ]

    lessons = {}
    for l in lessons_data:
        section = sections[l['section']]
        lesson, _ = Lesson.objects.get_or_create(
            section=section,
            order=l['order'],
            defaults={
                'title': l['title'],
                'type': l['type'],
                'duration': l['duration'],
                'is_preview': l['is_preview'],
                'content': l.get('content', ''),
            },
        )
        lessons[f"{l['section']}.{l['order']}"] = lesson

    # --- 5. Quizzes (3, uno por sección) ---
    quizzes = [
        {
            'lesson_key': '1.3',
            'passing_score': 70,
            'questions': [
                {
                    'text': '¿Quién creó a Claude?',
                    'type': 'single',
                    'explanation': 'Anthropic es la empresa de seguridad de IA que desarrolla Claude.',
                    'answers': [
                        ('OpenAI', False),
                        ('Google', False),
                        ('Anthropic', True),
                        ('Meta', False),
                    ],
                },
                {
                    'text': '¿Cuál es la principal diferencia entre Claude y un chatbot tradicional?',
                    'type': 'single',
                    'explanation': 'Claude analiza contexto completo y razona sobre el problema, no solo completa texto.',
                    'answers': [
                        ('Claude es más caro', False),
                        ('Claude analiza contexto completo y razona, no solo completa texto', True),
                        ('Claude solo funciona en inglés', False),
                        ('Claude requiere instalación local', False),
                    ],
                },
                {
                    'text': '¿Qué modelo de Claude es mejor para tareas largas y razonamiento complejo?',
                    'type': 'single',
                    'explanation': 'Sonnet es el balance ideal entre capacidad y velocidad para la mayoría de tareas.',
                    'answers': [
                        ('Claude Haiku', False),
                        ('Claude Sonnet', True),
                        ('Claude Instant', False),
                        ('Claude Lite', False),
                    ],
                },
                {
                    'text': '¿Claude puede procesar imágenes?',
                    'type': 'boolean',
                    'explanation': 'Los modelos actuales de Claude son multimodales (texto + imagen).',
                    'answers': [
                        ('Verdadero', True),
                        ('Falso', False),
                    ],
                },
                {
                    'text': '¿Para qué NO es ideal Claude?',
                    'type': 'single',
                    'explanation': 'Los LLMs no son buenos con cálculos matemáticos precisos o fechas exactas.',
                    'answers': [
                        ('Escribir código', False),
                        ('Resumir documentos', False),
                        ('Calcular fechas exactas o hacer operaciones matemáticas precisas', True),
                        ('Hacer lluvia de ideas', False),
                    ],
                },
            ],
        },
        {
            'lesson_key': '2.4',
            'passing_score': 70,
            'questions': [
                {
                    'text': '¿Qué SDK oficial existe para usar Claude desde Node.js?',
                    'type': 'single',
                    'answers': [
                        ('openai', False),
                        ('@anthropic-ai/sdk', True),
                        ('claude-js', False),
                        ('No hay SDK oficial', False),
                    ],
                },
                {
                    'text': '¿Cuál es el primer paso antes de hacer tu primera llamada a la API?',
                    'type': 'single',
                    'answers': [
                        ('Instalar Node', False),
                        ('Obtener una API key en console.anthropic.com', True),
                        ('Crear una cuenta de AWS', False),
                        ('Descargar Claude Code CLI', False),
                    ],
                },
                {
                    'text': '¿El parámetro max_tokens controla la longitud de la respuesta?',
                    'type': 'boolean',
                    'answers': [
                        ('Verdadero', True),
                        ('Falso', False),
                    ],
                },
                {
                    'text': '¿Qué método del SDK de Node.js usas para enviar un mensaje?',
                    'type': 'single',
                    'answers': [
                        ('client.send()', False),
                        ('client.messages.create()', True),
                        ('client.chat()', False),
                        ('client.complete()', False),
                    ],
                },
            ],
        },
        {
            'lesson_key': '3.3',
            'passing_score': 75,
            'questions': [
                {
                    'text': '¿Qué significa la A en el framework APE?',
                    'type': 'single',
                    'explanation': 'APE = Action, Purpose, Expectation. Define la acción, el propósito y la expectativa.',
                    'answers': [
                        ('Audience', False),
                        ('Action', True),
                        ('Accuracy', False),
                        ('Algorithm', False),
                    ],
                },
                {
                    'text': '¿Cuál es la mejor manera de reducir costos sin perder calidad?',
                    'type': 'single',
                    'answers': [
                        ('Usar Haiku para tareas simples', True),
                        ('Limitar el prompt a 10 caracteres', False),
                        ('Nunca usar el system prompt', False),
                        ('Cambiar de proveedor cada semana', False),
                    ],
                },
                {
                    'text': '¿Es buena idea usar Claude para generar números de lotería?',
                    'type': 'boolean',
                    'explanation': 'Los LLMs no son buenos con aleatoriedad verdadera ni con matemáticas precisas.',
                    'answers': [
                        ('Verdadero', False),
                        ('Falso', True),
                    ],
                },
                {
                    'text': '¿Qué debes hacer si Claude te da una respuesta que parece incorrecta?',
                    'type': 'single',
                    'answers': [
                        ('Aceptarla y seguir', False),
                        ('Verificar y, si es así, iterar el prompt', True),
                        ('Cambiar de modelo', False),
                        ('Reinstalar el SDK', False),
                    ],
                },
                {
                    'text': '¿Cuál es la mejor temperatura para tareas de razonamiento?',
                    'type': 'single',
                    'explanation': 'Temperatura baja (0-0.3) = respuestas más deterministas, mejor para razonamiento.',
                    'answers': [
                        ('0.0 - 0.3', True),
                        ('0.5 - 0.7', False),
                        ('0.9 - 1.0', False),
                        ('No importa', False),
                    ],
                },
                {
                    'text': 'Menciona un caso de uso donde NO deberías usar Claude.',
                    'type': 'single',
                    'answers': [
                        ('Generar texto', False),
                        ('Calcular pi con 100 decimales', True),
                        ('Resumir un paper', False),
                        ('Escribir tests unitarios', False),
                    ],
                },
                {
                    'text': 'El framework APE te ayuda a estructurar...',
                    'type': 'single',
                    'answers': [
                        ('El modelo a usar', False),
                        ('El prompt de manera clara', True),
                        ('El precio', False),
                        ('La API key', False),
                    ],
                },
                {
                    'text': '¿Qué puedes hacer si un prompt no funciona al primer intento?',
                    'type': 'single',
                    'answers': [
                        ('Rendirte', False),
                        ('Iterar: ajustar el prompt, agregar contexto, probar variaciones', True),
                        ('Cambiar de tema', False),
                        ('Llamar a soporte', False),
                    ],
                },
            ],
        },
    ]

    for q in quizzes:
        lesson = lessons[q['lesson_key']]
        quiz, _ = Quiz.objects.get_or_create(
            lesson=lesson,
            defaults={
                'passing_score': q['passing_score'],
                'max_attempts': 3,
                'shuffle_questions': True,
            },
        )
        for order, q_data in enumerate(q['questions'], start=1):
            question, _ = Question.objects.get_or_create(
                quiz=quiz,
                text=q_data['text'],
                defaults={
                    'type': q_data['type'],
                    'order': order,
                    'explanation': q_data.get('explanation', ''),
                    'points': 1,
                },
            )
            for ans_text, is_correct in q_data['answers']:
                Answer.objects.get_or_create(
                    question=question,
                    text=ans_text,
                    defaults={'is_correct': is_correct},
                )

    # --- 6. Resources (5) ---
    resources_data = [
        {
            'name': 'Cheatsheet de prompts Claude',
            'file_type': 'pdf',
            'description': 'PDF de 2 páginas con los 10 patrones de prompting más efectivos',
            'sections': [],  # global
        },
        {
            'name': 'Anthropic API Quickstart (oficial)',
            'file_type': 'other',
            'description': 'URL a docs.anthropic.com con el quickstart oficial',
            'sections': [2],
        },
        {
            'name': 'Código del chatbot del módulo 2',
            'file_type': 'zip',
            'description': 'Repo ZIP con el código del ejercicio del chatbot',
            'sections': [2],
        },
        {
            'name': 'Pricing calculator',
            'file_type': 'other',
            'description': 'URL a la calculadora de costos de la API de Anthropic',
            'sections': [3],
        },
        {
            'name': 'Lista de modelos disponibles',
            'file_type': 'pdf',
            'description': 'Tabla comparativa Haiku/Sonnet/Opus con casos de uso',
            'sections': [1, 3],
        },
    ]

    for r in resources_data:
        resource, _ = Resource.objects.get_or_create(
            course=course,
            name=r['name'],
            defaults={
                'file_type': r['file_type'],
                'file_size': 'TBD',  # el admin lo actualiza al subir
                # file se queda vacío en seed, el admin lo sube después
            },
        )
        # Vincular a las secciones correspondientes
        for section_order in r['sections']:
            try:
                section = Section.objects.get(course=course, order=section_order)
                resource.sections.add(section)
            except Section.DoesNotExist:
                pass

    # --- 7. LearningPath ---
    path, _ = LearningPath.objects.get_or_create(
        slug='claude-desde-cero',
        defaults={
            'title': 'Claude desde Cero',
            'short_description': 'Tu primer programa con Claude como copiloto. Aprende desde cero a integrar la IA de Anthropic en tu flujo de trabajo.',
            'description': 'Esta ruta te lleva de no saber qué es Claude a construir tu primera aplicación con la API de Anthropic. Empezamos con conceptos fundamentales, seguimos con casos de uso prácticos, y terminamos integrando Claude en proyectos reales. Sin requisitos previos de programación avanzada.',
            'level': 'beginner',
            'is_published': True,
            'order': 1,
        },
    )

    # Vincular el curso a la ruta
    LearningPathCourse.objects.get_or_create(
        path=path,
        course=course,
        defaults={'order': 1, 'is_required': True},
    )


def unseed_claude(apps, schema_editor):
    """Borra lo que seed_claude creó (útil para rollback)."""
    OnlineCourse = apps.get_model('plataforma', 'OnlineCourse')
    LearningPath = apps.get_model('plataforma', 'LearningPath')

    OnlineCourse.objects.filter(slug='curso-de-claude-code').delete()
    LearningPath.objects.filter(slug='claude-desde-cero').delete()


class Migration(migrations.Migration):
    dependencies = [
        ('plataforma', '0024_claude_extensions'),  # ← el número exacto de la migration del sprint 1
    ]

    operations = [
        migrations.RunPython(seed_claude, unseed_claude),
    ]
```

## Restricciones

1. NO uses FK hardcoded — usa `apps.get_model()` para que la migration sea robusta a renames
2. NO hagas la migration destructiva — el `unseed` solo borra lo que esta migration creó
3. NO crees videos de Vimeo — los `vimeo_id` se quedan en None
4. NO crees quizzes con más de 8 preguntas (la UI puede tener problemas con quizzes largos)
5. NO crees más de 3 secciones (la lección debe poder verse en una pantalla)
6. NO cambies otros archivos del repo — solo agregar la migration

## Verificación

```bash
cd /Users/andresrodriguez/Documents/GitHub/iAcademy/backend
source venv/bin/activate

# 1. Generar migration
python manage.py makemigrations plataforma --name seed_claude_course
# Espera 0025_seed_claude_course.py

# 2. Aplicar
python manage.py migrate plataforma 0025
# Debe aplicar sin errores

# 3. Verificar idempotencia
python manage.py migrate plataforma 0024  # rollback
python manage.py migrate plataforma 0025  # reaplica — no debe fallar
python manage.py shell << 'EOF'
from plataforma.models import LearningPath, OnlineCourse, Section, Lesson
p = LearningPath.objects.get(slug='claude-desde-cero')
c = OnlineCourse.objects.get(slug='curso-de-claude-code')
print(f"Ruta: {p.title}")
print(f"Curso: {c.title}")
print(f"Sections: {c.sections.count()}")
for s in c.sections.all():
    print(f"  {s.order}. {s.title}: {s.lessons.count()} lecciones")
    for l in s.lessons.all():
        print(f"    - {l.order}. {l.title} ({l.type}, {l.duration})")
print(f"Resources: {c.resources.count()}")
print(f"Reseñas: {c.reviews.count()}")
EOF

# 4. Smoke test API
python manage.py runserver &
sleep 2
curl -s http://localhost:8000/api/plataforma/paths/claude-desde-cero/ | python -m json.tool | head -40
echo "---"
curl -s http://localhost:8000/api/plataforma/courses/curso-de-claude-code/ | python -m json.tool | head -60
kill %1
```

## Output esperado

Reporta:
1. Output de `makemigrations` (qué archivos se crearon)
2. Output de `migrate` (debe decir "Applying plataforma.0025_seed_claude_course... OK")
3. Output del test de idempotencia (segunda aplicación debe ser no-op o no fallar)
4. Output del shell de verificación
5. Cualquier desviación de las restricciones

NO hagas commit. NO push. NO PR.
