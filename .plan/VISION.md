# Visión del MVP: "Curso de Claude" en iAcademy

> **Estado**: v0.1 — borrador vivo, se actualiza al cerrar cada sprint
> **Última revisión**: 2026-06-30
> **Owner**: Andrés Rodríguez

---

## 1. El problema

iAcademy es una academia panameña con modelo presencial (cursos de Excel, Power BI, Marketing, etc.) que tiene una **plataforma e-learning funcional** construida sobre Django + DRF + Next.js + Vimeo. Esa plataforma ya soporta:

- Cursos con secciones y lecciones
- Quizzes y ejercicios
- Gamificación (XP, niveles, rachas)
- Comentarios y likes
- Certificados
- Subida de videos a Vimeo con TUS

Pero la plataforma **no se ha usado nunca para contenido 100% pregrabado y self-paced**. Siempre se ha usado como complemento de cursos con cohorte.

Mientras tanto:
- Anthropic está creciendo rápido y no tiene academia oficial en español
- DeepLearning.AI tiene cursos de Claude gratis pero solo en inglés
- Platzi cubre IA general pero no Claude específicamente
- En Panamá no hay nadie enseñando Claude en español con formato curso

**Oportunidad**: lanzar el primer curso estructurado en español sobre Claude, aprovechando toda la infraestructura que ya existe en iAcademy.

## 2. La propuesta (MVP)

**"Curso de Claude Code"** — un curso pregrabado, self-paced, montado sobre la plataforma existente de iAcademy, accesible para cualquier estudiante matriculado en una "ruta Claude" dentro del sistema de matrículas actual.

### 2.1 Lo que el estudiante verá

- Un **landing de ruta** ("Claude desde Cero") con 1 curso visible al inicio
- Una **página de curso** estilo Platzi (sidebar izq con secciones, descripción central, recursos)
- Una **vista de lección** con reproductor Vimeo + transcripción + recursos + comentarios
- **Quizzes inline** al final de cada módulo
- **Dashboard de progreso** con XP, racha, badges
- **Certificado** al completar (reutilizando el sistema existente)

### 2.2 Lo que NO verá (fuera de scope MVP)

- ❌ Pagos online (Stripe, Yappy, ACH). El acceso se controla por matrícula manual en iAcademy
- ❌ Auto-enrollment público
- ❌ Cupones, descuentos, planes
- ❌ Suscripción mensual
- ❌ Cohortes con fechas límite
- ❌ Mentores humanos (1:1)
- ❌ Live sessions
- ❌ Marketplace de cursos

### 2.3 Lo que sí se puede agregar después sin reescribir

- ✅ Pagos — el modelo de `OnlineCourse.access_tier` ya está contemplado en el schema
- ✅ Más cursos en la misma ruta — `LearningPath` permite agregar cursos en orden
- ✅ Más rutas — paralelo a la primera, mismas primitivas
- ✅ B2B (empresas comprando paquetes) — `Grupo`/`GrupoEmpresarial` ya existen

## 3. Usuarios objetivo (nicho Panamá + LATAM)

### 3.1 Primario: developers panameños juniors y mid

- Edad 22-40
- Ya programa en JS/Python, quiere aprender a usar IA en su flujo
- No tiene tiempo para cohortes, aprende a su ritmo
- **Pago**: a través de la matrícula estándar de iAcademy (precios que iAcademy ya maneja)
- **Canal**: LinkedIn Panamá, Panama AI, AWS Community Days, referidos

### 3.2 Secundario: profesionales no-técnicos curiosos

- Marketers, abogados, contadores, gerentes
- Quieren entender qué es Claude y cómo usarlo en su trabajo
- Solo necesitan la primera ruta ("Claude desde Cero")

### 3.3 Terciario: empresas B2B (Fase 2, post-MVP)

- Bancas, legales, agencies en Panamá
- Equipos de 5-20 personas
- No es objetivo del MVP, se aborda después

## 4. Métricas de éxito del MVP (90 días post-launch)

| Métrica | Meta | Cómo medirla |
|---|---|---|
| Estudiantes matriculados en la ruta | 50 | `EnrollmentViewSet` count + dashboard |
| Lecciones completadas (total) | 500 | `LessonProgress` agregación |
| Quizzes aprobados | 100 | `QuizAttempt.passed=True` count |
| Tasa de finalización del curso | >40% | Estudiantes que llegan al último módulo |
| NPS o satisfacción | >8/10 | Survey simple al terminar |
| Solicitudes de más cursos Claude | >5 | Mensajes / referidos |
| Tiempo mediano para terminar | <14 días | `enrolled_at` → `completed_at` |

**Si en 90 días no llegamos a 25 estudiantes matriculados, replantear.**

## 5. Decisiones cerradas (no se reabren)

1. **No hay pagos en el MVP** — el acceso se gestiona por el sistema de matrículas existente de iAcademy. Punto.
2. **No se crea un nuevo backend ni un nuevo frontend** — todo se extiende sobre la plataforma iAcademy actual.
3. **El video es Vimeo** — ya está integrado, con TUS upload, folders, embeds. Punto.
4. **La marca es iAcademy** — no se lanza una sub-marca separada.
5. **El contenido se crea en el admin de Django** — no hardcoded, no JSON files. El curso es data, no código.
6. **La UI del frontend hereda de `frontend-plataforma`** — Next.js 16, shadcn/ui, Tailwind v4. No se inventa un nuevo design system.
7. **Stack**: Django 5.1 + DRF + Next 16 + Postgres + Vimeo + JWT. No Supabase, no Clerk, no Stripe.
8. **Todo el código de cambios va en PRs al repo iAcademy** — `capacitacion-claude-design` es **solo el repositorio de planning/docs** del MVP.

## 6. Decisiones pendientes (resolver antes del sprint 1)

| Pregunta | Dueño | Deadline | Default si no se decide |
|---|---|---|---|
| ¿"iAcademy" o "iAcademy Tech/Lab" para el público meta? | Andrés | Antes del sprint 3 (UI) | Usar "iAcademy" tal cual |
| ¿El curso se llama "Curso de Claude Code" o "Claude desde Cero"? | Andrés | Antes del sprint 2 (seed) | "Curso de Claude Code" (matchea el deck) |
| ¿El instructor del seed es Andrés mismo o un placeholder? | Andrés | Antes del sprint 2 | Placeholder "Por confirmar" |
| ¿Qué hacer con el deck actual de 4 slides? ¿Se archiva? | Andrés | Antes del sprint 3 | Queda como `/legacy/deck` indexado, redirect al curso |
| ¿Categorías de curso: reusar "Inteligencia Artificial" del legacy o crear nueva? | Andrés | Antes del sprint 2 | Reusar la existente |

## 7. Anti-objetivos (lo que NO estamos construyendo)

- No somos Platzi. No competimos en catálogo ni en producción audiovisual
- No somos DeepLearning.AI. No enseñamos todos los modelos, solo Claude
- No somos una plataforma de cursos abiertos. El acceso es por matrícula
- No somos una red social. No hay feed, ni follows, ni stories
- No somos un LMS genérico. No soportamos SCORM, ni xAPI, ni multi-tenant

---

**Este documento se actualiza al cerrar cada sprint. Si algo de aquí cambia, se documenta en `docs/decisions/` con el formato ADR.**
