# Brief de diseño de interfaces — MVP "Curso de Claude Code" (iAcademy)

> Documento de handoff para **Claude Design**. Describe los módulos del MVP, su funcionalidad y las
> especificaciones de interfaz necesarias para diseñar las pantallas.
>
> **Producto:** ruta "Claude desde Cero" — e-learning self-paced sobre la plataforma existente de iAcademy.
> **Fecha:** 2026-06-30 · **Estado:** v1 para diseño · **Owner:** Andrés Rodríguez.
> **Fuente:** sintetizado de `.plan/VISION.md`, `.plan/ARCHITECTURE.md`, los sprints 3–4 y el sistema visual del deck.

## Cómo usar este brief

- Empieza por **§0 Cánones y decisiones**: es la **fuente única de verdad**. Donde cualquier sección
  posterior contradiga los cánones (rutas, datos de ejemplo, iconos, copy, terminología, timings),
  **mandan los cánones**. Los wireframes de §1–§15 son ilustrativos.
- **§1–§3**: contexto y usuarios, sistema visual (marca, tokens, tipografía) y arquitectura de información.
- **§4–§12**: pantallas y módulos, cada uno con propósito, layout, componentes, contenido, estados,
  interacciones, responsive, accesibilidad y copy de ejemplo.
- **§13–§15**: transversales — estados (loading / vacío / error), accesibilidad + responsive, e
  inventario de componentes + entregables esperados de Claude Design.
- Restricciones de toda la UI: **español**, **sin emojis**, **mobile-first (≥375px)**, implementable en
  **Tailwind v4 + shadcn/ui + lucide-react + Sonner**, **WCAG AA** (meta Lighthouse >95).

## Índice

- [0. Cánones y decisiones (fuente única de verdad)](#0-cánones-y-decisiones-fuente-única-de-verdad)
- [1. Contexto del producto, usuarios y objetivos](#1-contexto-del-producto-usuarios-y-objetivos)
- [2. Principios de diseño y sistema visual](#2-principios-de-diseño-y-sistema-visual)
- [3. Arquitectura de informacion y flujos](#3-arquitectura-de-informacion-y-flujos)
- [4. Acceso y Dashboard del estudiante](#4-acceso-y-dashboard-del-estudiante)
- [5. Catalogo de Rutas (/rutas)](#5-catalogo-de-rutas-rutas)
- [6. Detalle de Ruta (/rutas/claude-desde-cero)](#6-detalle-de-ruta-rutasclaude-desde-cero)
- [7. Detalle de Curso (/curso/[id])](#7-detalle-de-curso-cursoid)
- [8. Vista de Lección / Aula (/leccion/[id])](#8-vista-de-lección-aula-leccionid)
- [9. Quiz (inline al final de modulo)](#9-quiz-inline-al-final-de-modulo)
- [10. Reseñas del curso](#10-reseñas-del-curso)
- [11. Wishlist (guardar para despues)](#11-wishlist-guardar-para-despues)
- [12. Certificado de finalización](#12-certificado-de-finalización)
- [13. Estados transversales (loading, vacío, error)](#13-estados-transversales-loading-vacío-error)
- [14. Accesibilidad, responsive y micro-interacciones](#14-accesibilidad-responsive-y-micro-interacciones)
- [15. Inventario de componentes y entregables para Claude Design](#15-inventario-de-componentes-y-entregables-para-claude-design)

---

## 0. Cánones y decisiones (fuente única de verdad)

> Esta sección resuelve las contradicciones internas del brief y fija las decisiones de producto.
> **Regla de precedencia:** donde cualquier sección posterior (§1–§15) contradiga esta sección en
> rutas, datos de ejemplo, iconos, copy, terminología o timings, **manda §0**. Los wireframes de las
> secciones son ilustrativos; los números y nombres canónicos son los de aquí.

### 0.1 Mapa de rutas canónico

Se usa el App Router de Next 16 y se reutilizan los nombres de segmento que ya existen en la plataforma.

| Pantalla / módulo | Ruta canónica | Parámetro | Sección |
|---|---|---|---|
| Login | `/login` | — | §4 |
| Inicio del estudiante (Mis cursos + Progreso + Guardados) | `/dashboard` | — | §4, §11 |
| Catálogo de rutas | `/rutas` | — | §5 |
| Detalle de ruta | `/rutas/[slug]` | `slug` → `claude-desde-cero` | §6 |
| Detalle de curso (con tabs) | `/curso/[cursoId]` | `cursoId` = slug → `curso-de-claude-code` | §7 |
| Aula / lección (los quizzes tipo lección se renderizan **inline** aquí) | `/leccion/[leccionId]` | `leccionId` = id numérico | §8, §9 |
| Certificado del curso | `/certificado/[cursoId]` | `cursoId` = slug | §12 |

- **Guardados** no es ruta propia en el MVP: es una **sección/tab dentro de `/dashboard`** (§11).
- **Quiz** no es ruta propia: la lección de tipo `quiz` se muestra inline dentro de `/leccion/[leccionId]` (§9).
- Navegación a la siguiente lección: campo canónico **`next_lesson_id`** (número) → `/leccion/{next_lesson_id}`.
- Identificadores: **curso y ruta por `slug`**, **lección por `id` numérico**. No mezclar `[id]`/`[slug]`.

### 0.2 Alcance de pantallas referenciadas

| Se diseña en este brief | Existe en iAcademy, NO se rediseña aquí |
|---|---|
| Login, Dashboard, `/rutas`, `/rutas/[slug]`, `/curso/[cursoId]`, `/leccion/[leccionId]`, Certificado, Guardados (en dashboard), Quiz inline, Reseñas, botón Guardar | Perfil/cuenta, "Mis certificados" (lista), recuperar contraseña, catálogo general de cursos, resultados de búsqueda |

- Los **CTA de los empty-states** solo pueden apuntar a pantallas que existen en este brief: **`/rutas`** o **`/dashboard`**. No inventar enlaces a "catálogo de cursos", "mis certificados" ni "buscar".
- **Búsqueda** está **fuera del MVP**: no hay barra ni pantalla de resultados. Ignorar cualquier mención de búsqueda en las secciones.

### 0.3 Navegación global y chrome

- **Topbar global persistente** en todas las pantallas **excepto el aula**: a la izquierda logo iAcademy + navegación (`Inicio`, `Rutas`); a la derecha avatar con menú (Perfil, Cerrar sesión). Sin buscador en el MVP.
- **Aula (`/leccion`) = chrome reducido**: barra superior mínima (volver al curso + título de la lección + progreso del curso) y su propio **sidebar de temario**. El único sidebar izquierdo de la app es el del aula.
- **Móvil:** la navegación global colapsa en un menú (`Menu`); el temario del aula se abre en un **Sheet**.
- **Breadcrumb:** su raíz siempre es **`Inicio`** (enlaza a `/dashboard`). Ejemplo: `Inicio / Claude desde Cero / Curso de Claude Code`.

### 0.4 Dataset de ejemplo canónico

Usar **estos** números y textos en todos los wireframes y mocks. Reemplazan cualquier cifra distinta de §1–§15.

**Ruta "Claude desde Cero"**
- `slug`: `claude-desde-cero` · Nivel: **Principiante**
- Descripción corta: "Aprende a usar Claude para diseñar, programar y desplegar, desde cero."
- Contenido: **1 curso · 10 lecciones · 3 quizzes · ~1h 30min** (en el MVP la ruta tiene un solo curso; puede haber más rutas "Próximamente").

**Curso "Curso de Claude Code"**
- `slug`: `curso-de-claude-code` · Instructor (mock): **Andrés Rodríguez** (placeholder, por confirmar)
- Nivel: **Principiante** · Idioma: **Español** · Duración: **~1h 30min** · **10 lecciones · 3 módulos · 3 quizzes**
- Valoración: **4.7** · **128 opiniones** · Distribución: 5★ 92 · 4★ 24 · 3★ 8 · 2★ 3 · 1★ 1 (suma 128)

**Árbol de módulos (10 lecciones)**
```
Módulo 1 — Fundamentos de Claude
  1. Bienvenida al curso ............ video · 4 min
  2. ¿Qué es Claude y Claude Code? .. video · 9 min
  3. Tu primer prompt efectivo ...... video · 11 min
  4. Quiz: Fundamentos .............. quiz · 5 preguntas
Módulo 2 — Del diseño a la app
  5. Claude Design: de brief a artefacto .. video · 12 min
  6. Ejercicio: diseña una pantalla ...... exercise
  7. Quiz: Diseño ........................ quiz · 4 preguntas
Módulo 3 — A producción
  8. De artefacto a código con Claude Code .. video · 14 min
  9. Deploy en Vercel ...................... video · 10 min
 10. Quiz final + Cierre .................. quiz · 5 preguntas
```

**Gamificación (mock):** Nivel 3 · 480 XP · Racha 4 días · Insignias: "Primeros pasos", "Constructor", "En producción". Reglas de XP: **+15 XP** por lección completada, **+50 XP** por quiz aprobado; nivel = un umbral simple cada 200 XP.

### 0.5 Reglas de negocio de diseño

- **Gate del certificado:** el certificado se habilita solo con **100% de lecciones completas Y todos los quizzes aprobados**. Los quizzes **no bloquean** avanzar de lección a lección, pero **sí** son requisito del certificado (reconcilia §3 con §9).
- **Gamificación ligera (reconcilia el Principio 5, "sin gamificación ruidosa"):** en el dashboard se muestra una franja compacta (Nivel, XP, Racha) + una fila de insignias, en estilo **monocromático y silencioso**. Subir de nivel = **toast sobrio** de Sonner ("Subiste al nivel 4"). **No** se diseñan catálogo de insignias, vista de detalle de insignia ni pantalla de celebración.
- **Reseñas:** formulario **inline en Card** dentro del tab "Reseñas" (no Dialog). Visible **solo si el estudiante completó el curso y no tiene reseña previa**. Campos: **estrellas 1–5 (requerido)**, **Título (opcional, ≤80)**, **Comentario (requerido, ≤600)**. Si ya tiene reseña, se muestra con acciones **Editar** (mismo form) / **Eliminar**.
- **Quiz:** cada pregunta es correcta/incorrecta completa (sin acierto parcial en el MVP); aprobar = **≥60%**. Sin autoguardado: abandonar reinicia el intento. Si no hay UI de quiz aún, mostrar "Quiz próximamente".
- **Vista previa gratuita** de la primera lección: **NO** en el MVP (el acceso es por matrícula). No diseñar affordance de preview.
- **Comentarios de lección (`lesson-comments`):** **simples** (lista + agregar), **sin hilos/respuestas ni timestamp**. Estados: loading (skeleton), vacío ("Sé el primero en comentar"), error + reintentar, y "Cargar más" para paginar.
- **Sesión expirada (JWT vencido):** toast "Tu sesión expiró, inicia sesión de nuevo" + redirección a `/login`; tras autenticarse, volver a la pantalla previa.

### 0.6 Terminología y copy canónico

Español en todo. Sin emojis.

| Concepto | Canónico | Evitar |
|---|---|---|
| Guardar para después | **"Guardar"** / botón guardado: **"Guardado"** / sección: **"Guardados"** | "Wishlist", "lista de deseos" |
| Toast al guardar | **"Añadido a Guardados"** | variantes ("agregado a tu wishlist") |
| Toast al quitar | **"Quitado de Guardados"** | variantes |
| Nav de aprendizaje | **"Rutas"** | "Aprender" |
| Raíz de breadcrumb | **"Inicio"** | "Aprender" |
| CTA primario del curso | **"Empezar curso"** (sin progreso) / **"Continuar"** (con progreso) / **"Repasar"** (completado) | — |
| Acción de no matriculado | Texto informativo **"Este curso está disponible para estudiantes matriculados de iAcademy."** + enlace **"Solicitar acceso"** (`mailto:`). **Sin** checkout. | botón de compra |

### 0.7 Semántica de iconos (lucide-react)

**Un solo icono por significado.** `Clock` = solo tiempo/duración (nunca "próximamente").

| Significado | Icono | | Significado | Icono |
|---|---|---|---|---|
| Inicio | `House` | | Reproducir | `Play` |
| Rutas | `Route` | | Video próximamente | `Clapperboard` |
| Curso / módulo | `BookOpen` | | Lección completa / éxito | `CircleCheck` |
| Duración / tiempo | `Clock` | | Check de progreso | `Check` |
| Recurso (item/tab) | `FileText` | | Error / alerta | `TriangleAlert` |
| Sin recursos (empty) | `FolderOpen` | | Reintentar | `RotateCw` |
| Descargar | `Download` | | Guardar (vacío) | `Bookmark` |
| Transcripción (tab) | `AlignLeft` | | Guardado (lleno) | `BookmarkCheck` |
| Código (tab) | `Code2` | | Reseñas / comentarios | `MessageSquare` |
| Siguiente / anterior | `ChevronRight` / `ChevronLeft` | | Estrella (rating) | `Star` |
| XP | `Zap` | | Nivel | `Trophy` |
| Racha | `Flame` | | Insignia | `Medal` |
| Certificado | `Award` | | Menú móvil | `Menu` |

### 0.8 Radios, y timings de motion

- **Radios** (mapeo a Tailwind v4): `--radius-sm` **6px** (badges, chips) · `--radius-md` **10px** ≈ `rounded-lg` (botones, inputs) · `--radius-lg` **16px** ≈ `rounded-xl` (cards, contenedores, player). Usar estas utilidades de forma consistente.
- **Motion:** envelope general **120–280ms** (hover 160ms · tabs/toasts 240ms · entradas 280ms). **Excepción única:** llenado de la **barra de progreso 400ms ease-out**. `prefers-reduced-motion` → sin animación, aplicar el estado final directo.

---

## 1. Contexto del producto, usuarios y objetivos

### 1.1 Qué es el MVP
- El "Curso de Claude Code" es el primer curso de la ruta **"Claude desde Cero"**: e-learning self-paced, 100% pregrabado, montado sobre la plataforma existente de **iAcademy**.
- No es una plataforma nueva: se extiende la actual con un aula que se siente **tech y moderna**, no "academia tradicional".
- El acceso se controla por la **matrícula existente** de iAcademy. El estudiante nunca ve pagos, tarjetas ni planes; solo ve que **el curso está disponible para él**.

### 1.2 Usuarios objetivo

| Perfil | Quién es | Nivel | Qué le importa |
|---|---|---|---|
| **Primario** | Developers panameños/LATAM, 22-40 años, junior/mid, ya programan | Técnico, autónomo | Aprender rápido a su ritmo, código y recursos accionables, sentir que la herramienta es seria y "pro", ver su avance sin fricción |
| **Secundario** | Profesionales no técnicos curiosos (marketing, legal, contabilidad, gerencia) | Principiante, no técnico | Entender sin jerga, no perderse, guía clara paso a paso, sensación de logro (quizzes fáciles, certificado) |

- **Región:** Panamá + LATAM. **Idioma:** español siempre.
- Ambos comparten: aprenden solos, retoman en distintos momentos y dispositivos (móvil incluido), y valoran saber **dónde van y cuánto falta**.

### 1.3 Flujo de valor del estudiante
Descubre la ruta → entra al curso → ve lecciones → contesta quizzes → sube de nivel (progreso) → obtiene certificado.

### 1.4 Objetivos de diseño
- **Claridad:** navegación obvia, jerarquía editorial, cero ambigüedad sobre "qué sigue".
- **Sensación tech y premium:** estética monocromática warm-neutral, oscura, con mucho aire; tipografía de display + mono para acentos "terminal".
- **Foco en el progreso:** checkmarks, % de avance y estado siempre visibles; el avance es el corazón de la experiencia.
- **Baja fricción:** reanudar donde quedó, un clic para continuar, sin pasos administrativos ni menciones de pago.
- **Mobile-first:** usable y cómodo desde **375px**; el aula funciona en móvil, no solo en desktop.
- **Accesibilidad:** WCAG AA, foco visible, respeto a `prefers-reduced-motion`, carga con Skeleton.

### 1.5 Qué SÍ / Qué NO se diseña en el MVP

| Qué SÍ se diseña | Qué NO se diseña |
|---|---|
| Descubrimiento de la ruta "Claude desde Cero" y landing del curso | Pagos, checkout, tarjetas, cupones, planes, suscripción |
| Aula: sidebar de temario + progreso, video 16:9, tabs (Transcripción / Recursos / Código) | Auto-inscripción pública (acceso viene de matrícula iAcademy) |
| Reproducción de lecciones (Vimeo embebido) | Editor de código en el browser / IA tutor |
| Quizzes por lección/módulo y sus estados | Comentarios por timestamp, foros, sesiones en vivo |
| Progreso: checkmarks, %, "continuar donde quedó" | Cohortes con fechas, mentores 1:1, marketplace |
| Certificado al completar el curso | Notificaciones por email, compartir en redes |
| Estados de carga (Skeleton), vacío y error | Multi-idioma y toggle de dark-mode (la app ya es oscura) |

---

## 2. Principios de diseño y sistema visual

Esta sección es la guía de marca para Claude Design. La dirección **oscura warm-neutral** descrita aquí es la **RECOMENDADA**: define la intención visual del curso. En implementación real debe **reconciliarse con los tokens vivos de la plataforma iAcademy** (ver nota al final): los valores hex son la meta de diseño, pero se mapean a variables CSS/Tailwind v4 existentes para no romper la coherencia de la academia.

### Principios de diseño

1. **Editorial sobre decorativo.** Cada elemento comunica; nada adorna. Jerarquía por tipografía, espacio y contraste, no por cajas de colores ni ilustraciones.
2. **El progreso es el héroe.** El avance del estudiante (checkmarks, %, "continúa donde quedaste") es el dato más visible de cada pantalla. Todo lo demás cede protagonismo.
3. **El aire es contenido.** Mucho espacio negativo. La densidad se gana con contenido real, no rellenando la pantalla. Respirar > llenar.
4. **Monocromático con intención.** Warm-neutral por defecto; el color (naranja Claude, azul dato, verde/rojo) aparece solo cuando *significa* algo. Un acento que se usa poco pesa mucho.
5. **Tech, no "academia tradicional".** Mono en labels, estética sobria, sensación de herramienta de developer. Nada de gradientes festivos, badges brillantes ni gamificación ruidosa.
6. **Calma y foco.** El aula es para concentrarse. Interfaz silenciosa, sin distracciones, motion mínimo. La UI desaparece; el video y el temario mandan.

### Paleta y tokens

Todos en modo oscuro. Los valores son la meta de diseño; se exponen como variables (`--bg`, etc.) y se consumen con utilidades Tailwind v4.

**Base (superficies y texto)**

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0B0B0C` | Fondo raíz de la app (`body`) |
| `--surface` | `#161617` | Cards, sidebar, paneles |
| `--surface-raised` | `#212123` | Elementos elevados: dropdowns, tooltips, hover de cards, popovers |
| `--text-headline` | `#F6F3ED` | Titulares, números de progreso, texto de alto énfasis |
| `--text-body` | `#B8B5AE` | Cuerpo, descripciones, contenido general |
| `--text-muted` | `#78756D` | Metadatos, placeholders, labels secundarios, timestamps |
| `--border` | `rgba(246,243,237,0.12)` | Bordes 1px, divisores, contorno de cards e inputs |

**Acentos neutros (marca)**

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#DAD5CA` | Énfasis neutro cálido: barra de progreso, focus sutil, iconos activos |
| `--accent-warm` | `#A9A498` | Acento secundario, estados intermedios, hover de texto muted |

**Acentos de significado (usar con MUCHA mesura)**

| Token | Valor | Uso |
|---|---|---|
| `--claude` / `--cta` | `#D97757` | **Solo** CTA primario ("Continuar", "Empezar curso") y elementos que *son* Claude (marca, logo, badge "Powered by Claude"). Un solo naranja por pantalla como regla. |
| `--claude-hover` | `#C4623F` (≈ −12% luz) | Hover del CTA primario / elementos Claude |
| `--claude-active` | `#B0532F` (≈ −22% luz) | Presionado/active del CTA primario |
| `--link` | `#4169E1` | Enlaces y datos accionables (referencias, "ver recurso"). Nunca como fondo grande. |
| `--link-hover` | `#5A7DE8` (más claro sobre fondo oscuro) | Hover de enlaces |

**Semánticos de feedback (APENAS para feedback funcional, vía Sonner/Badge/estados)**

| Token | Valor | Uso |
|---|---|---|
| `--success` | `#3FB68B` | Lección completada, toast de éxito, checkmark de progreso confirmado |
| `--success-subtle` | `rgba(63,182,139,0.14)` | Fondo de badge/banner de éxito |
| `--error` | `#E5658A` | Error de carga de video, toast de error, validación fallida |
| `--error-subtle` | `rgba(229,101,138,0.14)` | Fondo de badge/banner de error |

**Reglas de uso del color**
- Naranja `#D97757` = **acción principal + identidad Claude**, nunca decorativo. Máximo un uso dominante por vista.
- Azul `#4169E1` = enlaces/datos, no botones de acción primaria.
- Verde/rojo = **solo feedback funcional**, jamás como color de marca ni de layout.
- Hover/active de superficies neutras: subir un escalón (`--surface` → `--surface-raised`) o subir opacidad del borde, no cambiar de tono.

**Derivación de estados (patrón general)**

| Estado | Regla |
|---|---|
| Hover (superficie) | `--surface` → `--surface-raised`; borde `0.12` → `0.20` |
| Hover (texto/icono) | `--text-muted` → `--text-body`; `--text-body` → `--text-headline` |
| Active/pressed | Oscurecer acento ~10% adicional; reducir escala 0.98 (respetando reduced-motion) |
| Focus-visible | Anillo 2px `--accent` con offset 2px sobre `--bg` (WCAG AA visible) |
| Disabled | Opacidad 45%, sin hover, `cursor: not-allowed` |

### Tipografía

| Rol | Familia | Pesos | Dónde se usa |
|---|---|---|---|
| Display | **Bricolage Grotesque** | 600 / 700 / 800 | Titulares de landing, nombre del curso, cifras heroicas. `letter-spacing: -0.02 a -0.03em` |
| Sans (UI/cuerpo) | **Geist** | 400 / 500 / 600 | Cuerpo, botones, sidebar, temario, formularios, toda la UI |
| Mono | **Geist Mono** | 400 / 500 | Labels en MAYÚSCULAS (`tracking 0.12–0.22em`), código, "terminal", duraciones de lección |
| Serif (editorial) | **Instrument Serif** *italic* | 400 | Subtítulos y acentos editoriales, ej. *"Del diseño a producción"* |

**Escala tipográfica sugerida** (base 16px; `rem`)

| Escalón | Tamaño / línea | Familia · peso | Uso |
|---|---|---|---|
| Display XL | 60 / 64 (3.75rem) | Bricolage 800, −0.03em | Hero landing (desktop) |
| Display L | 44 / 48 (2.75rem) | Bricolage 700, −0.025em | Título de curso, encabezados de sección grandes |
| Display M | 32 / 38 (2rem) | Bricolage 700, −0.02em | Títulos de módulo, headers secundarios |
| Título (H) | 22 / 28 (1.375rem) | Geist 600 | Título de lección, títulos de card |
| Body | 16 / 26 (1rem) | Geist 400 | Cuerpo, descripciones, transcripción |
| Body S | 14 / 22 (0.875rem) | Geist 400/500 | Texto secundario, ítems de temario |
| Label mono | 12 / 16 (0.75rem) | Geist Mono 500, MAYÚS, tracking 0.16em | Etiquetas de sección, "MÓDULO 01", "12 MIN" |
| Caption | 12 / 16 (0.75rem) | Geist 400 | Metadatos, notas, timestamps, ayudas |

- Editorial serif italic: para *un* acento por bloque, nunca en párrafos largos.
- Móvil: bajar Display XL→40, Display L→32, Display M→26; el resto se mantiene (mínimo body 16px, nunca <14px).

### Espaciado, radios y elevación

**Espaciado — escala base 4px** (Tailwind `space` estándar)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`

- Padding interno de cards: 20–24px. Gap de sidebar/ítems: 8–12px.
- Ancho de columna de lectura (transcripción): máx ~68ch. Video centro: 960–1080px.
- Ritmo vertical de secciones landing: 64–96px desktop, 40–48px móvil.

**Radios**

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 6px | Badges, inputs, tags, botones pequeños |
| `--radius-md` | 10px | Botones, cards estándar, thumbnails |
| `--radius-lg` | 16px | Contenedores grandes, panel de video, modales/Sheet |
| `--radius-full` | 9999px | Avatares, pills, indicadores de progreso circular |

**Elevación (sombras sutiles sobre fondo oscuro)** — la profundidad se logra más con superficie (`--surface-raised`) y borde que con sombra dura.

| Nivel | Sombra | Uso |
|---|---|---|
| E0 (plano) | ninguna; borde `--border` | Cards en reposo, la mayoría de la UI |
| E1 | `0 1px 2px rgba(0,0,0,0.4)` | Hover de card, elementos ligeramente elevados |
| E2 | `0 8px 24px rgba(0,0,0,0.5)` | Dropdowns, popovers, tooltips |
| E3 | `0 16px 48px rgba(0,0,0,0.6)` | Dialog / Sheet modal + overlay `rgba(0,0,0,0.6)` |

Regla: nunca sombras coloreadas ni glows; la luz viene de subir la superficie, no de brillos.

### Iconografía e imágenes

- **Iconos: solo `lucide-react`.** Grosor 1.5–2px, tamaño 16/20/24px alineado a la escala. Color por defecto `--text-muted`; activo/hover `--text-body`/`--text-headline`. Naranja Claude solo en el icono del CTA o de marca.
- Ejemplos de mapeo: `CheckCircle2` (lección completa), `PlayCircle`/`Play` (reproducir), `Lock` (bloqueado), `FileText` (recursos), `Code`/`Terminal` (código), `ChevronRight`/`ChevronDown` (navegación temario), `Star` (reseñas), `Clock` (duración).
- Un icono no viaja solo si es accionable sin texto: siempre `aria-label` o Tooltip.

**Covers / thumbnails**
- Ratio 16:9, `--radius-md`, borde `--border`. Sobre la imagen, **overlay warm oscuro** (`linear-gradient` de `rgba(11,11,12,0)` a `rgba(11,11,12,0.7)`) para que el título en `--text-headline` mantenga contraste AA.
- Estética coherente: desaturar/atenuar imágenes muy saturadas para no romper el monocromático. Placeholder de carga = **Skeleton**, nunca imagen rota.
- Estado por defecto sin cover: bloque `--surface-raised` con label mono del módulo centrado (sin ícono decorativo).

**Logos de herramientas (como en el deck)**
- Presentados en fila, monocromo/atenuados en reposo, tamaño uniforme, mucho aire entre ellos. Encabezado con label mono, ej. `HERRAMIENTAS DEL CURSO`. Sin marcos ni sombras; se apoyan en el espacio.

### Tono de voz y motion

**Tono de voz**
- Español directo, cercano y técnico. Sin relleno, sin emojis, sin signos de apertura perdidos (usar ¿ ¡ correctamente).
- Tratamiento de "tú". Verbos de acción en botones: "Continuar", "Empezar curso", "Ver recursos".
- Claridad sobre marketing: "Este curso está disponible para ti" en vez de "¡Desbloquea tu potencial!".
- Mensajes de sistema útiles y humanos. Ejemplos de copy:
  - Vacío (sin progreso): "Aún no has empezado. Tu primera lección te espera."
  - Éxito (toast): "Lección completada. Vas 40% del curso."
  - Error (toast): "No pudimos cargar el video. Reintenta en unos segundos."
  - Bloqueado: "Completa la lección anterior para continuar."

**Motion**
- Sobrio y con propósito: transiciones de 150–250ms, `ease-out`. Solo para dar continuidad (aparición de panel, cambio de tab, check de progreso), nunca para adornar.
- Sin parallax, sin autoplay de animaciones, sin rebotes exagerados. El check de "completado" puede tener un micro-fade/scale de ~200ms.
- **Siempre respetar `prefers-reduced-motion`:** con la preferencia activa, reducir a `opacity` o desactivar; nada de desplazamientos ni escalados. Regla global:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Nota de implementación (reconciliación con iAcademy).** Esta dirección oscura warm-neutral es la **recomendada** y define la meta visual del curso Claude. Al montarse sobre la plataforma e-learning existente de iAcademy, los tokens de esta sección deben exponerse como **variables CSS mapeadas a los tokens vivos de la plataforma** (theme de Tailwind v4 + shadcn), de modo que: (1) el curso mantenga su identidad "tech" y editorial, (2) no se dupliquen ni contradigan las variables ya definidas por iAcademy, y (3) cualquier ajuste de contraste/color de la academia se herede sin reescribir componentes. Donde exista conflicto con un token vivo de iAcademy, prevalece la variable de la plataforma y estos hex se tratan como valor objetivo a acordar con el equipo.

---

## 3. Arquitectura de informacion y flujos

### Mapa de pantallas (sitemap)

```
[No autenticado]
  /login  ── Login (iAcademy)
     │
     ▼ (auth OK, JWT)
┌───────────────────────────────────────────────────────────────┐
│ APP (layout autenticado: sidebar + topbar)                     │
│                                                                 │
│  /dashboard ───────── Mis cursos (cursos con acceso + progreso)│
│     │                                                           │
│     ├─▶ /rutas ────────────── Catalogo de rutas ("Aprender")   │
│     │     └─▶ /rutas/[slug] ── Ruta "Claude desde Cero"        │
│     │            │              (lista de cursos de la ruta)    │
│     │            └─▶ /curso/[id] ── Detalle de curso (tabs:     │
│     │                   │            Contenido | Resenas |      │
│     │                   │            Recursos)                  │
│     │                   │                                       │
│     │                   ├─▶ /leccion/[id] ── Aula (video +      │
│     │                   │        │            temario + tabs)   │
│     │                   │        │                              │
│     │                   │        └─▶ /leccion/[id]/quiz ── Quiz │
│     │                   │               │                       │
│     │                   │               ▼ (aprobado + curso     │
│     │                   │                  100%)                │
│     │                   └─▶ /certificado/[cursoId] ── Certificado│
│     │                                                           │
│     ├─▶ /wishlist ──────────── Lista de deseos (cursos guardados)│
│     │                                                           │
│     └─▶ Modal "Escribir resena" (se abre desde /curso/[id]     │
│              o desde banner de curso completado)                │
│                                                                 │
└───────────────────────────────────────────────────────────────┘
```

Notas de rutas:
- `/rutas` y `/rutas/[slug]` son publicas dentro de la app (todo estudiante autenticado navega el catalogo, tenga o no acceso al curso).
- El **acceso al contenido** (`/leccion/[id]`, `/quiz`, `/certificado`) requiere matricula. Sin matricula: se ve el detalle pero las lecciones estan bloqueadas.
- Resenas y Wishlist no son pantallas de nivel superior en el sidebar principal; Wishlist si tiene entrada propia, Resenas vive dentro del detalle del curso.

### Navegacion global

**Sidebar izquierdo (persistente, desktop >=1024px)** — primitive: contenedor propio + `Button variant="ghost"` por item, iconos `lucide-react`:

```
┌──────────────────┐
│  iAcademy    [=]  │  ← logo + toggle colapsar
├──────────────────┤
│ ▸ Inicio         │  (LayoutDashboard) → /dashboard
│ ▸ Aprender       │  (GraduationCap)   → /rutas   ← ENLACE A RUTAS
│ ▸ Mis cursos     │  (BookOpen)        → /dashboard#mis-cursos
│ ▸ Wishlist       │  (Heart)           → /wishlist
├──────────────────┤
│ ▸ Certificados   │  (Award)           → /certificados
├──────────────────┤
│  [Avatar] Nombre │  → menu perfil / salir
└──────────────────┘
```

- El enlace a rutas se rotula **"Aprender"** (accion, no "Catalogo"). Es el punto de entrada al descubrimiento de la ruta "Claude desde Cero".
- Item activo: fondo `--surface-raised`, texto `--text-headline`, barra de acento izquierda `--accent`.
- En el **aula** (`/leccion/[id]`) el sidebar global se colapsa/oculta para dar espacio al temario del curso (ver seccion de aula). En mobile no hay sidebar fijo: se usa `Sheet` (shadcn) desde el boton hamburguesa del topbar.

**Topbar (todas las anchuras)** — altura ~56px, fondo `--surface`, borde inferior `--border`:

```
[≡]  Breadcrumb ......................  [Search]  [Avatar ▾]
```

- Mobile (`<1024px`): `[≡]` abre el `Sheet` de navegacion. El breadcrumb colapsa a solo el nivel actual.
- Search: opcional en MVP; si no entra, se omite (no dejar input muerto).

**Breadcrumb** — primitive `Breadcrumb` de shadcn. Refleja la jerarquia real:

```
Aprender / Claude desde Cero / Curso de Claude Code / Introduccion a Claude Code
  ^rutas    ^rutas/[slug]        ^curso/[id]            ^leccion/[id] (actual, sin link)
```

- Separador: `/` con `--text-muted`. Ultimo nivel: `--text-headline`, sin enlace, `aria-current="page"`.
- En el aula, el breadcrumb muestra hasta el curso; el titulo de la leccion actual se ve en el header del reproductor, no en el breadcrumb (para no truncar).

### Flujo de acceso (matricula, sin auto-inscripcion)

Principio: el estudiante **nunca ve pagos ni se inscribe solo**. iAcademy le concede acceso por matricula (backend). El estudiante solo percibe "esto esta disponible para mi".

**A. Estudiante CON matricula al curso Claude:**

```
Login ──▶ /dashboard
            │
            │  Ve tarjeta del curso en "Mis cursos"
            │  Badge: "Disponible para ti"  +  Progreso 0% (o % actual)
            ▼
       Click "Empezar" / "Continuar"
            │
            ▼
       /curso/[id]  ──▶  /leccion/[id]  (aula, acceso completo)
```

Copy tarjeta (con acceso):
- Badge: `DISPONIBLE PARA TI` (mono, mayusculas)
- Boton primer ingreso: `Empezar curso`
- Boton con avance: `Continuar` + subtexto `Lección 4 de 18 · 22%`

**B. Estudiante SIN matricula (curioso que navega el catalogo):**

```
Login ──▶ /rutas ──▶ /rutas/claude-desde-cero ──▶ /curso/[id]
                                                       │
                                                       │  Puede ver: descripcion,
                                                       │  temario, resenas, duracion.
                                                       │  Lecciones: candado (Lock).
                                                       ▼
                                                 CTA informativo
                                                 (NO checkout)
```

- **Sin checkout, sin precio, sin "comprar".** El CTA solo informa como se obtiene el acceso (via iAcademy/coordinacion academica) y ofrece guardar el curso.
- Lecciones bloqueadas: icono `Lock` en el temario, click abre `Tooltip`/`Dialog` con el mensaje informativo. La primera leccion puede marcarse como vista previa gratuita si negocio lo define (opcional).

Copy CTA informativo (sin acceso):
- Badge: `NO INCLUIDO EN TU MATRÍCULA`
- Titulo: `Este curso aún no está disponible para ti`
- Cuerpo: `El acceso se habilita a través de tu matrícula en iAcademy. Escríbenos para incluirlo en tu plan de estudios.`
- Boton primario: `Solicitar acceso` (abre mailto/contacto o formulario simple; NO es checkout)
- Boton secundario: `Guardar en wishlist` (icono Heart)

### Flujo principal de aprendizaje (paso a paso)

```
1. /dashboard
   └─ Click "Continuar" en la tarjeta del curso
        │
2. /curso/[id]  (tab "Contenido" activa)
   └─ Ve modulos + lecciones con checkmarks de progreso
   └─ Click en leccion (o "Continuar donde quedaste")
        │
3. /leccion/[id]  (AULA)
   ┌─────────────────────────────────────────────────────┐
   │ [Temario+progreso] │  [Video 16:9 Vimeo]  │ [Tabs:  │
   │  ✓ Leccion 1       │                      │  Trans- │
   │  ✓ Leccion 2       │   ▶ reproduciendo    │  cripcion│
   │  ● Leccion 3 (aqui)│                      │  Recursos│
   │  ○ Leccion 4       │  [Anterior][Siguiente]│  Codigo]│
   └─────────────────────────────────────────────────────┘
        │
   └─ Al terminar el video → leccion se marca ✓ (auto o boton
        "Marcar como completada")
        │
4. Click "Siguiente" → carga /leccion/[id+1]
   (repite pasos 3-4 hasta agotar el modulo)
        │
5. Fin de modulo con quiz → /leccion/[id]/quiz
   └─ Responde → "Enviar"
        ├─ Aprobado (>= umbral) → avanza, quiz marcado ✓
        └─ Reprobado → "Reintentar" (muestra resultado, permite repetir)
        │
6. Curso al 100% (todas las lecciones ✓ + quizzes aprobados)
   └─ Banner en /curso/[id] y toast (Sonner):
        "¡Completaste el curso! Tu certificado está listo."
        │
7. /certificado/[cursoId]
   └─ Ver / descargar certificado
   └─ Banner secundario invita a dejar resena
```

Reglas de progreso:
- El estado por leccion se persiste (backend) para "Continuar donde quedaste".
- Estados en temario: `○` no iniciada (`--text-muted`), `●` en curso (`--accent`), `✓` completada (verde de exito, solo aqui como feedback funcional). Bloqueada: `Lock` (`--text-muted`).
- Carga del video y del temario: `Skeleton` (nunca spinner generico).

### Flujo de resena (solo si completo el curso)

Gating: el boton/CTA de resena **solo aparece y esta habilitado si el curso esta al 100%**. Antes de eso, en la tab "Resenas" el usuario puede leer, pero el CTA de escribir esta deshabilitado con explicacion.

```
Curso 100% ──▶ Trigger de resena (2 entradas):
   (a) Banner post-completado en /curso/[id]
   (b) Boton "Escribir reseña" en tab "Reseñas"
        │
        ▼
   Dialog "Escribir reseña"  (primitive: Dialog)
   ┌────────────────────────────────────┐
   │  Tu reseña                     [X] │
   │  ── Calificación ──                │
   │   ★ ★ ★ ★ ★   (1–5, requerido)    │
   │  ── Comentario ──                  │
   │  [ textarea, opcional, 500 max ]   │
   │                                    │
   │        [Cancelar]  [Publicar]      │
   └────────────────────────────────────┘
        │
        ├─ Publicar OK → Dialog cierra
        │     └─ toast (Sonner): "¡Gracias! Tu reseña se publicó."
        │     └─ Resena aparece en la lista; CTA cambia a "Editar reseña"
        │
        └─ Error → toast error: "No pudimos publicar tu reseña.
              Inténtalo de nuevo." (Dialog permanece abierto)
```

Estados y copy del flujo de resena:

| Condicion | Estado del CTA | Copy |
|---|---|---|
| Curso incompleto | Deshabilitado + Tooltip | Boton: `Escribir reseña` · Tooltip: `Termina el curso para dejar tu reseña` |
| Curso 100%, sin resena | Habilitado | `Escribir reseña` |
| Ya dejo resena | Habilitado (edicion) | `Editar reseña` |
| Enviando | Loading | Boton: `Publicando…` (disabled) |

- Rating: 1–5 estrellas, requerido; comentario opcional (max 500, contador visible). Validacion: si envia sin estrellas → mensaje inline `Selecciona una calificación`.
- El resumen de resenas en la tab (estilo Platzi) muestra promedio y total: `4.7 · 705 opiniones`.

---

## 4. Acceso y Dashboard del estudiante

### Proposito y ruta

| Vista | Ruta | Sprint | Proposito |
|---|---|---|---|
| Login | `/login` | Sprint 1 (Auth) | Autenticar al estudiante con email + password contra el backend de iAcademy (JWT). Pantalla minima, sin distracciones. |
| Dashboard | `/dashboard` (alias `/mis-cursos`) | Sprint 1 (Home) | Punto de aterrizaje post-login. Reunir en un solo lugar el progreso, la motivacion (gamificacion) y el acceso rapido a "seguir aprendiendo". |

- **Objetivo del usuario en Login:** entrar rapido, recuperar acceso si olvido la clave.
- **Objetivo del usuario en Dashboard:** "retomar donde quede" en <=2 clicks, ver su avance y sentir progreso.

---

### Layout (wireframe)

**Login (`/login`) — escritorio**

```
+---------------------------------------------------------------+
|                                                               |
|                        [ iAcademy ]        <- logo, mono/label|
|                                                               |
|            +-------------------------------------+            |
|            |  Bienvenido de vuelta               |  <-Display |
|            |  Ingresa para continuar tu ruta.    |  <-Serif it|
|            |                                     |            |
|            |  CORREO                             |  <-mono lbl|
|            |  [ tucorreo@ejemplo.com          ]  |  <-Input   |
|            |                                     |            |
|            |  CONTRASENA            ¿Olvidaste?  |            |
|            |  [ ****************            (o) ] |  <-toggle  |
|            |                                     |            |
|            |  [      Iniciar sesion          ]   |  <-Button  |
|            |                                     |            |
|            |  ! Correo o contrasena incorrectos  |  <-error   |
|            +-------------------------------------+            |
|                                                               |
|          Panama · Aprende a tu ritmo · iAcademy               |
+---------------------------------------------------------------+
```

- Card centrada, ancho ~420px, sobre `--bg`. Sin sidebar ni chrome de app (usuario aun no autenticado).

**Dashboard (`/dashboard`) — escritorio**

```
+----------------------------------------------------------------------+
| [Topbar: iAcademy   Inicio  Rutas  Cursos        (?)  [Avatar ▾] ]   |
+----------------------------------------------------------------------+
|                                                                      |
|  Hola, Andres.                                        <- Display h1  |
|  Del diseno a produccion, un modulo a la vez.         <- Serif ital  |
|                                                                      |
|  +--------------------------------------------------+  +-----------+ |
|  |  CONTINUAR DONDE QUEDASTE                         |  | TU AVANCE | |
|  |  [thumb 16:9]  Curso de Claude Code              |  |           | |
|  |                Modulo 3 · Slash commands         |  |  Nivel 4  | |
|  |                [======67%========-----]          |  |  1,240 XP | |
|  |                [  Reanudar leccion  ]            |  |  Racha 5d | |
|  +--------------------------------------------------+  |  ---------| |
|                                                        |  Badges:  | |
|  MIS CURSOS                                            |  [o][o][o]| |
|  +-------------+  +-------------+  +-------------+     |  [o][+2]  | |
|  | [thumb]     |  | [thumb]     |  | [thumb]     |     +-----------+ |
|  | Claude Code |  | Prompting.. |  | (disponible)|                   |
|  | 67% ======  |  | 12% ==      |  | No iniciado |                   |
|  | [Continuar] |  | [Continuar] |  | [Empezar]   |                   |
|  +-------------+  +-------------+  +-------------+                   |
|                                                                      |
|  TU RUTA: CLAUDE DESDE CERO                                          |
|  +----------------------------------------------------------------+ |
|  | (1)Claude Code ── (2)Prompting ── (3)Agentes ── ( )...          | |
|  | Progreso de ruta: 1 de 5 cursos            [ Ver ruta ]         | |
|  +----------------------------------------------------------------+ |
|                                                                      |
|  TU WISHLIST (3)                                          [ Ver todo]|
|  +-------------+  +-------------+  +-------------+                   |
|  | Curso X ♥   |  | Curso Y ♥   |  | Curso Z ♥   |                   |
|  +-------------+  +-------------+  +-------------+                   |
+----------------------------------------------------------------------+
```

**Reordenamiento en movil:** una sola columna. Orden vertical: saludo → "Continuar donde quedaste" → panel de gamificacion (colapsado a fila horizontal scrolleable de stats + badges) → Mis cursos (1 tarjeta/fila) → Ruta → Wishlist. La topbar colapsa a logo + hamburguesa (Sheet).

---

### Componentes

**Login**
- `Card` — contenedor del formulario.
- `Input` (x2, con `Label` en mono) — email, password.
- Boton de icono para mostrar/ocultar clave (`Button variant=ghost` + `lucide-react` `Eye`/`EyeOff`).
- `Button` (submit, full-width) — "Iniciar sesion"; estado `disabled` + spinner-inline durante request (excepcion permitida a la regla de skeleton: es un boton, no carga de contenido).
- Link "¿Olvidaste tu contrasena?" (`Button variant=link`).
- Bloque de error inline (`role="alert"`) — no toast (el error de auth debe quedar fijo junto al form).

**Dashboard**
| Bloque | Primitive shadcn | Notas |
|---|---|---|
| Topbar / nav | — (nav propio) + `Sheet` en movil, `Avatar`, `DropdownMenu` | Menu usuario: Perfil, Cerrar sesion. |
| Saludo | Heading `<h1>` | Display + subtitulo Serif italic. |
| Continuar donde quedaste | `Card` + `Progress` + `Button` | Card destacada (`--surface-raised`). |
| Panel de gamificacion | `Card` + `Badge` + `Tooltip` | Nivel, XP, racha, grilla de badges. Cada badge con `Tooltip`. |
| Barra de XP a siguiente nivel | `Progress` | "760 XP para Nivel 5". |
| Grilla "Mis cursos" | `Card` (x N) + `Progress` + `Badge` + `Button` | Grid responsive. |
| Estados de carga | `Skeleton` | Placeholders con forma de card. |
| Ruta | `Card` + stepper propio + `Badge` | Nodos con checkmark (`lucide` `Check`). |
| Wishlist resumida | `Card` compacta (x3) + icono `Heart` | "Ver todo" → pagina wishlist. |
| Feedback | `Sonner` (toast) | Ej. "Agregado a tu wishlist". |

---

### Contenido y datos

**Login:** solo email + password. Sin datos de servidor previos.

**Dashboard** (nombres realistas, origen conceptual):

| Dato | Ejemplo | Origen conceptual (DRF) |
|---|---|---|
| Nombre | "Andres" | `GET /api/me` (perfil) |
| Avatar | inicial "A" si no hay foto | `me.avatar_url` |
| Continuar: curso | "Curso de Claude Code" | `GET /api/me/continue` (ultima leccion vista) |
| Continuar: leccion/modulo | "Modulo 3 · Slash commands" | idem |
| % progreso curso | 67% | `enrollment.progress_pct` |
| Nivel / XP | Nivel 4 · 1,240 XP | `GET /api/me/gamification` |
| XP a siguiente nivel | "760 XP para Nivel 5" | calculado |
| Racha | "5 dias" | `gamification.streak_days` |
| Badges | "Primera leccion", "Racha 7 dias", "Primer modulo" | `gamification.badges[]` |
| Cursos matriculados | lista de `enrollments` | `GET /api/me/enrollments` |
| Ruta | "Claude desde Cero" · 1 de 5 | `GET /api/me/paths` |
| Wishlist | 3 items | `GET /api/me/wishlist?limit=3` |

- El acceso a cada curso viene de la **matricula** de iAcademy. Nunca se muestra precio/pago. Un curso disponible pero no iniciado se etiqueta "Disponible para ti".

---

### Estados

**Login**
| Estado | Comportamiento |
|---|---|
| default | Campos vacios, boton habilitado. |
| escribiendo | Validacion inline suave (formato de email al `blur`). |
| loading | Boton "Iniciando sesion…" + `disabled`, campos en readonly. |
| error de auth | Bloque rojo `role="alert"`: "Correo o contrasena incorrectos." Campos conservan email. |
| error de red | "No pudimos conectar. Revisa tu conexion e intenta de nuevo." |
| cuenta sin acceso | "Tu cuenta no tiene cursos activos. Contacta a iAcademy." |
| rate-limit | "Demasiados intentos. Espera un momento e intenta de nuevo." |

**Dashboard**
| Estado | Comportamiento |
|---|---|
| default | Datos completos como en el wireframe. |
| loading | `Skeleton` para: card de continuar, panel de gamificacion, y cada tarjeta de curso (thumb + 2 lineas + barra). Nunca spinner de pagina completa. |
| vacio: sin cursos | Card empty centrada: ilustracion/monoicono + "Aun no tienes cursos activos" + "Explorar rutas". |
| vacio: sin progreso | Se oculta "Continuar donde quedaste"; primer curso muestra "Empezar" en vez de "Continuar". |
| vacio: sin gamificacion | Panel muestra "Nivel 1 · 0 XP" y "Completa tu primera leccion para ganar XP." Sin badges → "Aun no tienes insignias." |
| vacio: wishlist | Bloque colapsa a mensaje discreto: "Tu wishlist esta vacia." + link "Explorar cursos". |
| vacio: racha | "Sin racha activa — vuelve hoy para empezar una." |
| error parcial | Si falla gamificacion pero cargan cursos, el panel muestra micro-error con "Reintentar" sin romper el resto. |
| error total | Estado de error de pagina: "No pudimos cargar tu inicio." + boton "Reintentar". |
| curso no matriculado (deep-link) | Tarjeta/CTA muestra "No disponible para ti" (deshabilitado); no expone pago. |
| thumbnail faltante | Fallback: bloque `--surface-raised` con iniciales del curso o monoicono, nunca imagen rota. |

---

### Interacciones y micro-interacciones

**Login**
- `Enter` en cualquier campo → submit.
- Toggle de contrasena: click en icono alterna `Eye`/`EyeOff`; `aria-pressed` refleja estado.
- Submit exitoso → redirect a `/dashboard` (sin toast; la transicion es el feedback).
- Error → shake sutil de la card (respetando `prefers-reduced-motion`: sin shake, solo aparece el mensaje).

**Dashboard**
- Hover en tarjeta de curso: elevacion sutil (`--surface` → `--surface-raised`), borde `--border` se aclara, transicion 150ms.
- "Reanudar leccion" / "Continuar" → navega al aula del curso en su ultima leccion.
- Badge: `Tooltip` al hover/focus con nombre + como se gano ("Insignia: Racha de 7 dias — completa 7 dias seguidos").
- Corazon de wishlist: click quita el item → toast Sonner "Quitado de tu wishlist" con accion "Deshacer".
- "Ver ruta" / "Ver todo" → navegan a ruta / wishlist completa.
- Barra de XP: animacion de llenado al montar (0 → valor) solo si no hay `prefers-reduced-motion`.
- Menu de avatar: `DropdownMenu`; "Cerrar sesion" → confirma via toast y redirige a `/login`.
- Toasts Sonner: posicion inferior-derecha (desktop) / superior (movil), auto-dismiss 4s.

---

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| Movil (>=375px) | 1 columna. Login card ocupa ~92% del ancho con padding. Dashboard: stats de gamificacion en fila horizontal con scroll-x; badges en grilla 4-col compacta; cursos 1/fila; topbar colapsa a hamburguesa (`Sheet`). Targets tactiles >=44px. |
| Tablet (>=768px) | Login card ancho fijo centrada. Dashboard: cursos 2/fila; panel de gamificacion pasa a columna lateral o se ubica bajo "Continuar". |
| Desktop (>=1024px) | Layout completo: "Continuar" + panel de gamificacion lado a lado; cursos 3/fila; ruta y wishlist a ancho completo. Contenido max ~1200px centrado con aire lateral. |

---

### Accesibilidad

- **Headings:** `<h1>` saludo; `<h2>` para "Continuar donde quedaste", "Mis cursos", "Tu ruta", "Tu wishlist", "Tu avance". Un solo `h1` por vista.
- **Login:** cada `Input` con `<label>` asociado (`htmlFor`/`id`); `autocomplete="email"` y `autocomplete="current-password"`; error con `aria-describedby` + `aria-invalid` en el campo; contenedor de error `role="alert"` (se anuncia).
- **Foco visible:** ring de 2px con offset en todos los interactivos, contraste AA sobre `--bg`.
- **Botones de icono** (toggle contrasena, corazon wishlist, avatar): `aria-label` explicito ("Mostrar contrasena", "Quitar de wishlist", "Menu de usuario"). El corazon usa `aria-pressed`.
- **Orden de tabulacion:** Login: email → password → toggle → "¿Olvidaste?" → submit. Dashboard: topbar → CTA continuar → tarjetas de curso (en orden visual) → ruta → wishlist.
- **Teclado:** todo accionable con `Enter`/`Espacio`; `DropdownMenu`, `Tooltip`, `Sheet` de Radix ya traen roving focus, `Esc` para cerrar y trap donde aplica.
- **Progress:** `role="progressbar"` con `aria-valuenow/min/max` y `aria-label` ("Progreso del curso: 67%").
- **Skeletons:** `aria-hidden` + un `aria-live="polite"` con "Cargando tu inicio…" para lectores de pantalla.
- **Contraste:** texto body `--text-body` sobre `--surface` verificado AA; nunca usar `--text-muted` para info esencial.
- **Imagenes:** thumbnails con `alt` = nombre del curso; decorativas con `alt=""`.

---

### Copy de ejemplo (espanol)

**Login**
- Titulo: `Bienvenido de vuelta`
- Subtitulo (serif italic): `Ingresa para continuar tu ruta.`
- Labels (mono, mayus): `CORREO` · `CONTRASENA`
- Placeholder email: `tucorreo@ejemplo.com`
- Link: `¿Olvidaste tu contrasena?`
- Boton: `Iniciar sesion` / cargando: `Iniciando sesion…`
- Error auth: `Correo o contrasena incorrectos.`
- Error red: `No pudimos conectar. Revisa tu conexion e intenta de nuevo.`
- Toggle: `Mostrar contrasena` / `Ocultar contrasena`
- Pie: `Panama · Aprende a tu ritmo · iAcademy`

**Dashboard**
- Saludo: `Hola, Andres.`
- Subtitulo (serif italic): `Del diseno a produccion, un modulo a la vez.`
- Seccion continuar (mono): `CONTINUAR DONDE QUEDASTE`
- CTA continuar: `Reanudar leccion` · alterno sin progreso: `Empezar curso`
- Detalle: `Modulo 3 · Slash commands` · `67% completado`
- Panel: `TU AVANCE` · `Nivel 4` · `1,240 XP` · `Racha de 5 dias` · `760 XP para Nivel 5`
- Badges: `Insignias` · tooltip: `Racha de 7 dias — completa 7 dias seguidos.`
- Grilla: `MIS CURSOS` · badge estado: `Disponible para ti` / `No iniciado` / `Completado`
- Ruta: `TU RUTA: CLAUDE DESDE CERO` · `Progreso de ruta: 1 de 5 cursos` · boton `Ver ruta`
- Wishlist: `TU WISHLIST` · `Ver todo`

**Estados vacios**
- Sin cursos: `Aun no tienes cursos activos.` / sub: `Cuando tengas acceso a un curso, aparecera aqui.` / boton `Explorar rutas`
- Sin gamificacion: `Completa tu primera leccion para ganar XP.`
- Sin insignias: `Aun no tienes insignias.`
- Sin racha: `Sin racha activa — vuelve hoy para empezar una.`
- Wishlist vacia: `Tu wishlist esta vacia.` + `Explorar cursos`

**Errores / toasts (Sonner)**
- Error total dashboard: `No pudimos cargar tu inicio.` + boton `Reintentar`
- Error parcial: `No pudimos cargar tu avance.` + `Reintentar`
- Wishlist quitar: `Quitado de tu wishlist` + accion `Deshacer`
- Curso no disponible: `Este curso no esta disponible para ti.`
- Cierre de sesion: `Sesion cerrada.`

---

## 5. Catalogo de Rutas (/rutas)

### Proposito y ruta

- **URL:** `/rutas` (App Router: `app/(app)/rutas/page.tsx`). Sprint: **Sprint 1 - Descubrimiento y navegacion**.
- **Proposito:** vitrina de todas las rutas de aprendizaje (`LearningPath`) disponibles en iAcademy para el estudiante. Es la puerta de entrada al contenido: desde aqui el usuario descubre "Claude desde Cero" y salta al detalle de la ruta.
- **Objetivo del usuario:** escanear rapido las rutas, entender nivel y alcance de cada una, y elegir una para entrar a su detalle.

### Layout (wireframe)

```
+--------------------------------------------------------------------------+
|  [ Navbar iAcademy: logo · Rutas · Mis cursos · avatar ]                  |
+--------------------------------------------------------------------------+
|                                                                          |
|   RUTAS DE APRENDIZAJE                          (Display / Bricolage)     |
|   Elige una ruta y avanza a tu ritmo, de cero a produccion. (body)       |
|                                                                          |
|   +----------------------+  +----------------------+  +----------------+  |
|   | [   cover 16:9    ]  |  | [   cover 16:9    ]  |  | [  cover 16:9 ] |  |
|   | (BADGE nivel)        |  | (BADGE nivel)        |  | (BADGE nivel)   |  |
|   |                      |  |                      |  |                 |  |
|   | Claude desde Cero    |  | Frontend Moderno     |  | Data con Python |  |
|   | Aprende a programar  |  | Construye interfaces |  | Analiza datos y |  |
|   | con Claude Code...   |  | con React y Next...  |  | crea modelos... |  |
|   |                      |  |                      |  |                 |  |
|   | 3 cursos · 42 lecc.  |  | 5 cursos · 68 lecc.  |  | 4 cursos · 51.. |  |
|   | [    Ver ruta   >]   |  | [    Ver ruta   >]   |  | [  Ver ruta  >] |  |
|   +----------------------+  +----------------------+  +----------------+  |
|                                                                          |
|   +----------------------+  +----------------------+  +----------------+  |
|   |  ...                 |  |  ...                 |  |  ...            |  |
|   +----------------------+  +----------------------+  +----------------+  |
|                                                                          |
+--------------------------------------------------------------------------+
```

- Zonas: (1) **header** de pagina con titulo Display + subtitulo body; (2) **grilla de cards** de rutas. La card mas destacada (ruta activa/recomendada) puede ir primera pero sin tratamiento distinto en el MVP.
- **Movil:** el header se apila arriba; la grilla colapsa a **1 columna** con cards a ancho completo, apiladas verticalmente. El cover mantiene 16:9. El boton "Ver ruta" pasa a ancho completo (`w-full`).

### Componentes

| Bloque UI | Primitive shadcn / libreria | Notas |
|---|---|---|
| Contenedor de pagina | `<main>` + container Tailwind | `max-w-6xl`, padding responsivo |
| Titulo de pagina | `<h1>` (Bricolage 700) | tracking negativo `-0.02em` |
| Subtitulo | `<p>` (Geist 400, text-body) | 1 linea |
| Card de ruta | **Card** (`Card`, `CardHeader`, `CardContent`, `CardFooter`) | como enlace envolvente `<a>`/`Link` |
| Cover | `next/image` dentro de `AspectRatio` 16:9 | overlay sutil para contraste del badge |
| Badge de nivel | **Badge** (variante por nivel) | mono en MAYUSCULAS, tracking `0.12em` |
| Titulo de card | `<h2>`/`<h3>` (Bricolage 600) | 1-2 lineas, `line-clamp-2` |
| Descripcion corta | `<p>` (Geist 400) | `line-clamp-2` |
| Meta "X cursos · Y lecciones" | texto mono/muted + iconos lucide | `BookOpen`, `PlayCircle` |
| CTA "Ver ruta" | **Button** (variante `secondary`/`ghost` con flecha) | icono `ArrowRight` |
| Estado carga | **Skeleton** (mismo layout de card) | 6 placeholders |
| Estado vacio | Card centrada + icono `Compass` | sin datos |
| Estado error | Card + **Button** "Reintentar" | icono `AlertCircle` |
| Feedback | **Sonner** (toast) | solo en error/reintento |

### Contenido y datos

Fuente conceptual: endpoint DRF `GET /api/learning-paths/` que retorna lista de `LearningPath`.

| Campo mostrado | Origen (modelo) | Ejemplo |
|---|---|---|
| Cover | `LearningPath.cover_image` | imagen 16:9 |
| Nivel (badge) | `LearningPath.level` | `Principiante` / `Intermedio` / `Avanzado` |
| Titulo | `LearningPath.title` | "Claude desde Cero" |
| Descripcion corta | `LearningPath.short_description` | "Aprende a programar con Claude Code, de la idea al deploy." |
| Nro. de cursos | `LearningPath.courses_count` (anotado) | `3 cursos` |
| Nro. de lecciones | `LearningPath.lessons_count` (anotado) | `42 lecciones` |
| Destino del CTA | `LearningPath.slug` | `/rutas/claude-desde-cero` |

- Datos de ejemplo realistas: "Claude desde Cero" (Principiante, 3 cursos · 42 lecciones), "Frontend Moderno con Next.js" (Intermedio, 5 cursos · 68 lecciones), "Data con Python" (Intermedio, 4 cursos · 51 lecciones).
- El acceso/matricula **no** se refleja aqui con "comprar": todas las rutas visibles se muestran igual; el gating de matricula vive en el detalle/aula.

### Estados

| Estado | Comportamiento |
|---|---|
| **Default** | Grilla con N cards renderizadas. |
| **Loading (skeleton)** | 6 `Skeleton` con la silueta de la card (bloque 16:9 + 2 lineas de texto + barra de boton). Sin spinners. |
| **Vacio (empty)** | No hay rutas: card centrada, icono `Compass`, titulo "Aun no hay rutas disponibles" + microcopy. |
| **Error** | Falla de red/API: card con icono `AlertCircle`, mensaje y `Button` "Reintentar"; toast Sonner de error. |
| **Singular (1 card)** | Grilla no fuerza 3 columnas: card conserva ancho de columna (no se estira a full width en desktop). |
| **Cover faltante** | Si `cover_image` es null, usar placeholder de marca (fondo `--surface-raised` + icono/monograma), nunca imagen rota. |
| **Descripcion corta faltante** | Ocultar el bloque; no dejar hueco ni "undefined". |
| **Conteos en 0** | Mostrar "Proximamente" en lugar de "0 cursos · 0 lecciones"; el CTA puede quedar deshabilitado con Tooltip. |

Nota: matricula, `vimeo_id`, progreso y permisos de resena **no aplican** en esta pantalla (viven en detalle de ruta y aula).

### Interacciones y micro-interacciones

- **Card completa clickeable:** toda la card es un enlace (`Link`) al detalle `/rutas/[slug]`; el `Button` "Ver ruta" es la affordance visual pero no duplica navegacion accidental (un solo target accesible).
- **Hover (desktop):** elevacion sutil (`--surface` -> `--surface-raised`), borde pasa a mayor opacidad, leve `scale-[1.01]` del cover y la flecha del CTA se desliza `translate-x-1`. Transicion `~150-200ms ease-out`.
- **Focus:** ring visible (`--accent`) alrededor de toda la card.
- **CTA:** `ArrowRight` con desplazamiento en hover/focus.
- **Reintentar (error):** click -> re-fetch; muestra skeleton; al fallar de nuevo, toast Sonner "No pudimos cargar las rutas. Intenta otra vez."
- **prefers-reduced-motion:** desactiva scale/translate/desplazamiento de flecha; solo cambia color/borde de forma instantanea.

### Responsive

| Breakpoint | Grilla | Detalles |
|---|---|---|
| **>=375px (movil)** | 1 columna | cards full width, boton `w-full`, gap `16px`, cover 16:9 |
| **>=768px (tablet)** | 2 columnas | gap `20-24px`, header en una linea |
| **>=1024px (desktop)** | 3 columnas | `max-w-6xl` centrado, gap `24px` |

- Tap targets >= 44px en movil. Titulo de pagina reduce tamano en movil (ej. `text-3xl` -> `text-4xl/5xl` en desktop). Sin scroll horizontal en 375px.

### Accesibilidad

- **Headings:** un solo `<h1>` "Rutas de aprendizaje"; cada card usa `<h2>` (o `<h3>`) con el titulo de la ruta -> jerarquia correcta.
- **Enlace accesible:** cada card es un `<a>`/`Link` con nombre accesible = titulo de la ruta; evitar anidar boton dentro de enlace (usar el enlace como unico elemento interactivo, con el CTA como span estilizado).
- **Iconos:** iconos decorativos con `aria-hidden="true"`; si un boton fuera solo-icono, `aria-label` explicito (aqui el CTA lleva texto "Ver ruta").
- **Badge de nivel:** legible por lector de pantalla como parte del contenido (ej. "Nivel: Principiante" via `sr-only` o texto visible).
- **Foco:** ring visible con contraste AA sobre fondo oscuro; orden de tabulacion = orden visual (header -> cards en orden de lectura).
- **Teclado:** navegacion con Tab entre cards, `Enter` activa; `Reintentar` alcanzable por teclado.
- **Imagenes:** `alt` descriptivo del cover ("Portada de la ruta Claude desde Cero"); placeholder sin `alt` decorativo -> `alt=""`.
- **Contraste:** texto muted (`--text-muted`) solo en meta secundaria, verificar >= 4.5:1 sobre `--surface`.

### Copy de ejemplo (espanol)

- **H1:** `Rutas de aprendizaje`
- **Subtitulo:** `Elige una ruta y avanza a tu ritmo, de cero a produccion.`
- **Badge nivel:** `PRINCIPIANTE` · `INTERMEDIO` · `AVANZADO`
- **Titulo card (ejemplo):** `Claude desde Cero`
- **Descripcion corta (ejemplo):** `Aprende a programar con Claude Code, de la idea al deploy.`
- **Meta:** `3 cursos · 42 lecciones`
- **Meta (conteos en 0):** `Proximamente`
- **CTA:** `Ver ruta`
- **Empty - titulo:** `Aun no hay rutas disponibles`
- **Empty - cuerpo:** `Estamos preparando nuevas rutas de aprendizaje. Vuelve pronto.`
- **Error - titulo:** `No pudimos cargar las rutas`
- **Error - cuerpo:** `Revisa tu conexion e intentalo de nuevo.`
- **Error - boton:** `Reintentar`
- **Toast error (Sonner):** `No pudimos cargar las rutas. Intenta otra vez.`
- **Tooltip CTA deshabilitado:** `Esta ruta estara disponible pronto.`
- **alt cover:** `Portada de la ruta Claude desde Cero`

---

## 6. Detalle de Ruta (/rutas/claude-desde-cero)

### Proposito y ruta

- **Ruta:** `/rutas/claude-desde-cero` (App Router: `app/rutas/[slug]/page.tsx`). Sprint 1 (descubrimiento + navegacion de la ruta), previo al aula.
- **Proposito:** presentar la ruta "Claude desde Cero" como una unidad narrativa (portada editorial + descripcion + metricas) y ofrecer el punto de entrada a sus cursos.
- **Objetivo del usuario:** entender de que trata la ruta, ver su avance si esta matriculado, y hacer un clic claro para **empezar / continuar / repasar** un curso. Si no esta matriculado, entender como acceder sin fricciones de pago.

### Layout (wireframe)

```
┌────────────────────────────────────────────────────────────────────────┐
│  ‹ Volver a Rutas                                              [iAcademy]│  ← breadcrumb
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────────┐   RUTA · CLAUDE DESDE CERO   (mono/label) │
│  │                           │                                           │
│  │        COVER 16:9         │   Claude desde Cero            (display)   │
│  │      (surface-raised)     │   Del prompt a producción     (serif ital)│
│  │                           │                                           │
│  │                           │   Descripción larga en 2–3 líneas de       │
│  └───────────────────────────┘   cuerpo. Aire generoso, text-body.        │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ [▣]1 curso · [≡]10 lecciones · [?]3 quizzes · [○]~1h 30min        │   │ ← stats
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   TU PROGRESO                                        4 de 10 completadas  │ ← si matriculado
│   ████████████░░░░░░░░░░░░░░░░░░░░  40%                                   │ ← Progress
│                                                                          │
├────────────────────────────────────────────────────────────────────────┤
│   CURSOS DE LA RUTA                                                       │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │ ┌───────┐  Curso de Claude Code              [✓ Completado] (Badge)│  │
│   │ │ THUMB │  Aprende a programar con Claude en tu terminal.          │  │
│   │ │ 16:9  │  10 lecciones · ~1h 30min                                │  │
│   │ └───────┘                                     [ Repasar → ]        │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │ ┌───────┐  (próximo curso de la ruta)          [ Próximamente ]   │  │
│   │ │ THUMB │  Short description…                                      │  │
│   │ └───────┘                                     [ Continuar → ]      │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└────────────────────────────────────────────────────────────────────────┘
```

**Movil:** una sola columna. El cover pasa **arriba** a ancho completo (16:9), seguido del label, titulo, subtitulo serif y descripcion. Las stats se apilan en 2x2 o en fila con scroll horizontal suave. La barra de progreso queda sticky-visible bajo el hero. Las cards de curso pasan a layout vertical (thumb arriba, texto abajo, boton full-width).

### Componentes

| Bloque UI | Primitive shadcn | Notas |
|---|---|---|
| Breadcrumb "Volver a Rutas" | Button `variant="ghost"` + `<ChevronLeft/>` | link a `/rutas` |
| Label de ruta ("RUTA · CLAUDE DESDE CERO") | texto mono uppercase, tracking 0.18em | no es Badge; es eyebrow |
| Titulo + subtitulo editorial | `<h1>` Bricolage + `<span>` Instrument Serif italic | letter-spacing negativo |
| Cover 16:9 | `<div>` con `next/image` + `aspect-video` | fallback surface-raised |
| Bloque de stats | Card (o `<ul>` simple) + iconos lucide | `LayoutGrid, ListChecks, HelpCircle, Clock` |
| Barra de progreso | **Progress** + label | solo si matriculado |
| Card de curso | **Card** (CardHeader/Content/Footer) | thumbnail `aspect-video` |
| Badge de completado / "Próximamente" | **Badge** (`variant` verde éxito / `secondary`) | icono `Check` |
| CTA por curso | **Button** primario | label dinámico (ver Estados) |
| Aviso no matriculado | Card `variant` sutil + Button link | sin checkout |
| Tooltip en iconos de stats | **Tooltip** | aclara "quizzes", "duración total" |
| Estado de carga | **Skeleton** | cover, texto, cards |

### Contenido y datos

| Campo | Ejemplo | Origen conceptual (DRF) |
|---|---|---|
| `route.title` | "Claude desde Cero" | `GET /api/routes/{slug}/` |
| `route.subtitle` | "Del prompt a producción" | idem (opcional) |
| `route.long_description` | 2–3 frases | idem |
| `route.cover_url` | imagen 16:9 | idem |
| `stats.courses` | 1 | agregado del backend |
| `stats.lessons` | 10 | agregado |
| `stats.quizzes` | 3 | agregado |
| `stats.duration` | "~1h 30min" | agregado (segundos → formato) |
| `enrollment.is_enrolled` | true/false | matrícula iAcademy (JWT del usuario) |
| `progress.completed` / `progress.total` | 4 / 10 | `GET /api/routes/{slug}/progress/` |
| `course.thumbnail_url` | 16:9 | por curso |
| `course.title` | "Curso de Claude Code" | por curso |
| `course.short_description` | 1 línea | por curso |
| `course.status` | `not_started` / `in_progress` / `completed` | deriva label del CTA |
| `course.next_lesson_slug` | destino de "Continuar" | por curso |

### Estados

- **Default (matriculado):** hero completo + barra de progreso + lista de cursos con CTA según `status`.
- **Loading (Skeleton):** cover como bloque `aspect-video`; 2 líneas skeleton para título/subtítulo; fila de 4 stats skeleton; barra de progreso skeleton; 1–2 cards skeleton (thumb + 2 líneas + botón). **Nunca spinner.**
- **Empty (ruta sin cursos publicados):** hero visible + card informativa: "Aún no hay cursos disponibles en esta ruta. Vuelve pronto." Sin CTA roto.
- **Error (fallo de carga):** card de error con icono `TriangleAlert`, mensaje y Button "Reintentar" (refetch). No romper el layout del hero.
- **No matriculado:** se ocultan barra de progreso y CTAs de curso; se muestra **card informativa** con `Lock` (lucide): "Este curso está disponible para estudiantes matriculados" + enlace a contacto. Los cursos se ven en modo *preview* (thumb + título + descripción, sin botón "Empezar").
- **Sin progreso (matriculado, 0 completadas):** barra en 0% con label "0 de 10 completadas"; CTA del curso = **"Empezar"**.
- **Ruta completada (100%):** barra llena, label "10 de 10 completadas", Badge verde "Completado" en la card, CTA = **"Repasar"**.
- **Curso próximo (status `coming_soon`):** Badge `secondary` "Próximamente", CTA deshabilitado (`disabled`) con Tooltip "Disponible pronto".

**Lógica del CTA por curso:**

| `course.status` | Label botón | Icono |
|---|---|---|
| `not_started` | Empezar | `Play` |
| `in_progress` | Continuar | `ArrowRight` |
| `completed` | Repasar | `RotateCcw` |
| `coming_soon` | Próximamente (disabled) | `Clock` |

### Interacciones y micro-interacciones

- **CTA de curso:** `hover` sube ligeramente el fondo (`surface` → `surface-raised`) y desplaza el icono `ArrowRight` 2px a la derecha (transición 150ms). `active` reduce opacidad. Navega a `/cursos/{slug}` o directo a `next_lesson_slug` si "Continuar".
- **Card de curso:** toda la card es clickeable (link envolvente); `hover` eleva borde (`border` → accent-warm sutil) y sombra suave. Respetar `prefers-reduced-motion` (sin transform, solo cambio de color).
- **Barra de progreso:** anima el fill de 0 al valor real en 600ms al montar (una sola vez); con reduced-motion aparece en su valor final sin animar.
- **Breadcrump / "Volver":** `focus` con anillo visible; navega a `/rutas`.
- **Tooltips de stats:** aparecen en `hover`/`focus` del icono, aclarando el dato.
- **Toasts (Sonner):** en error de carga → refetch exitoso muestra toast neutro "Contenido actualizado". Fallo de "Reintentar" → toast de error "No pudimos cargar la ruta. Intenta de nuevo." Copiar enlace de contacto (si aplica) → toast "Enlace copiado".
- **No matriculado, clic en enlace de contacto:** abre `mailto:`/página de contacto de iAcademy; sin modal de pago.

### Responsive

- **≥375px (móvil):** columna única; cover full-width arriba; stats en fila con scroll-x o grid 2x2; barra de progreso a ancho completo; cards verticales con botón full-width (`w-full`). Targets táctiles ≥44px.
- **≥768px (tablet):** hero en dos columnas (cover 40% / texto 60%); stats en fila única; cards horizontales (thumb izquierda ~200px, texto centro, CTA derecha).
- **≥1024px (desktop):** contenedor `max-w-5xl` centrado con mucho aire; hero con cover más grande; lista de cursos a ancho de contenido; tipografía display en tamaño mayor.

### Accesibilidad

- **Headings:** un solo `<h1>` (título de ruta); "CURSOS DE LA RUTA" como `<h2>`; cada título de curso `<h3>`. Orden lógico y sin saltos.
- **Foco visible:** anillo `ring-2` con color accent y offset sobre `bg` en todos los interactivos (cards-link, CTAs, breadcrumb, enlace de contacto).
- **Botones de icono:** `aria-label` explícito (ej. botón "Repasar" con solo icono → `aria-label="Repasar Curso de Claude Code"`). Iconos decorativos con `aria-hidden="true"`.
- **Progress:** `role="progressbar"` con `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100` y `aria-label="Avance de la ruta: 40 por ciento"`.
- **Orden de tabulación:** breadcrumb → CTA(s) de curso en orden visual → enlace de contacto. Card-link envolvente sin atrapar el foco de su botón interno (usar patrón "link + botón" o un único destino).
- **Contraste:** texto sobre `bg`/`surface` cumple WCAG AA; Badge verde/rojo solo como refuerzo, nunca único portador de significado (acompañar con texto "Completado").
- **Teclado:** todo accionable con `Enter`/`Espacio`; Tooltips accesibles por `focus`; `disabled` real (no solo visual) en cursos "Próximamente".
- **Imágenes:** `alt` descriptivo en cover y thumbnails ("Portada de la ruta Claude desde Cero", "Miniatura del Curso de Claude Code").

### Copy de ejemplo (espanol)

- **Eyebrow:** `RUTA · CLAUDE DESDE CERO`
- **Título:** `Claude desde Cero`
- **Subtítulo (serif italic):** `Del prompt a producción`
- **Descripción larga:** `Empieza a trabajar con Claude sin experiencia previa en IA. Aprende a programar con Claude Code directamente en tu terminal y construye proyectos reales, a tu ritmo.`
- **Stats:** `1 curso · 10 lecciones · 3 quizzes · ~1h 30min`
- **Progreso (label):** `TU PROGRESO` / `4 de 10 lecciones completadas`
- **Sección cursos:** `Cursos de la ruta`
- **Card curso (título/desc):** `Curso de Claude Code` / `Aprende a programar con Claude en tu terminal y crea proyectos reales.`
- **Meta de card:** `10 lecciones · ~1h 30min`
- **Botones CTA:** `Empezar` · `Continuar` · `Repasar` · `Próximamente`
- **Badge:** `Completado`
- **No matriculado (título):** `Este curso está disponible para estudiantes matriculados`
- **No matriculado (cuerpo):** `Si ya eres estudiante de iAcademy, inicia sesión para acceder. ¿Aún no tienes acceso? Escríbenos y te ayudamos.`
- **No matriculado (enlace):** `Contactar a iAcademy`
- **Empty (sin cursos):** `Aún no hay cursos disponibles en esta ruta. Vuelve pronto.`
- **Error:** `No pudimos cargar la ruta.` / botón `Reintentar`
- **Toast éxito:** `Contenido actualizado`
- **Toast error:** `No pudimos cargar la ruta. Intenta de nuevo.`
- **Microcopy tooltip stats:** `Quizzes: evaluaciones cortas al final de algunas lecciones.` · `Duración total estimada de la ruta.`
- **Breadcrumb:** `Volver a Rutas`

---

## 7. Detalle de Curso (/curso/[id])

### Proposito y ruta

- **Ruta:** `/curso/[id]` (App Router: `app/curso/[id]/page.tsx`). Server Component que hidrata datos del curso; tabs y acordeon son Client Components.
- **Sprint:** Sprint 2 — "Catalogo y Detalle de Curso" (posterior al listado del catalogo, previo al aula `/curso/[id]/leccion/[leccionId]`).
- **Proposito:** Presentar el curso completo (que es, que aprende, temario, recursos, resenas) y ser el punto de entrada al aula. El estudiante ya matriculado decide **empezar o retomar**; el curioso decide si le interesa.
- **Objetivo del usuario:** Entender el valor y el alcance del curso en <30s, ver su progreso si ya empezo, y llegar a la leccion correcta con un solo click (Empezar / Continuar).

### Layout (wireframe)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [breadcrumb]  Inicio / Claude desde Cero / Curso de Claude Code           │
├──────────────────────────────────────────────────────────────────────────┤
│  HERO (surface-raised, borde sutil, mucho aire)                            │
│  ┌────────────────────────────────────────┬───────────────────────────┐   │
│  │  LABEL MONO: CLAUDE DESDE CERO · CURSO 1 │  ┌─────────────────────┐  │   │
│  │                                          │  │  Poster 16:9        │  │   │
│  │  Curso de Claude Code            (H1)    │  │  (thumbnail Vimeo)  │  │   │
│  │  «Del prompt a produccion» (serif ital.) │  │  ▶ preview opcional │  │   │
│  │                                          │  └─────────────────────┘  │   │
│  │  [Badge Nivel] [Badge Idioma] [⏱ 6h 20m]│                           │   │
│  │  ★ 4.7  ·  705 opiniones                 │  ┌─────────────────────┐  │   │
│  │                                          │  │ ▓▓▓▓▓░░░ 62%        │  │   │
│  │  Avatar  Instructor: Andres Rodriguez    │  │ [ Continuar   → ]   │  │   │
│  │          Ingeniero de software           │  │ [ ♡ Guardar     ]   │  │   │
│  │                                          │  └─────────────────────┘  │   │
│  └────────────────────────────────────────┴───────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────────┤
│  TABS (sticky bajo hero)                                                    │
│  [ Descripcion ] [ Temario ] [ Recursos ] [ Resenas ]                       │
│ ─────────────────────────────────────────────────────────────────────────  │
│                                                                            │
│  ┌── contenido tab activo ──────────────────┐   ┌── aside sticky ──────┐   │
│  │ (Descripcion)                            │   │ Incluye:              │  │
│  │  Overview (2-3 parrafos)                 │   │ · 6h 20m de video     │  │
│  │                                          │   │ · 24 lecciones        │  │
│  │  Lo que aprenderas                       │   │ · 8 recursos          │  │
│  │   ✓ ...   ✓ ...   ✓ ...   ✓ ...          │   │ · Acceso de por vida  │  │
│  │                                          │   │                       │  │
│  │  Requisitos                              │   │ [ Continuar   → ]     │  │
│  │   · ...   · ...                          │   └───────────────────────┘  │
│  └──────────────────────────────────────────┘                             │
└──────────────────────────────────────────────────────────────────────────┘
```

**Temario (tab Temario), acordeon expandible:**

```
┌──────────────────────────────────────────────────────────────────────┐
│ Modulo 1 · Fundamentos de Claude Code        4 lecciones · 48 min  [▾] │
│ ┌────────────────────────────────────────────────────────────────────┐│
│ │ ✓  1. Que es Claude Code                     06:12   [Completada]   ││
│ │ ✓  2. Instalacion y setup                    09:40   [Completada]   ││
│ │ ▶  3. Tu primer prompt                        11:05   [En curso]    ││  ← fila activa resaltada
│ │ ○  4. El loop agentico                        21:00                 ││
│ └────────────────────────────────────────────────────────────────────┘│
├────────────────────────────────────────────────────────────────────────┤
│ Modulo 2 · Flujo de trabajo real             6 lecciones · 1h 12m  [▸] │  ← colapsado
└────────────────────────────────────────────────────────────────────────┘
```

**Movil:** una sola columna. Orden: breadcrumb → label mono → H1 + subtitulo serif → poster 16:9 (full-width) → badges + rating (envueltos) → instructor → **barra de progreso + CTA primario pegado (bottom sticky, `w-full`)** → tabs scrollables horizontalmente. El aside "Incluye" pasa a ir debajo del contenido del tab. El CTA secundario "Guardar" se vuelve boton de icono en el header del hero.

### Componentes

| Bloque UI | Primitive shadcn / libreria | Notas |
|---|---|---|
| Breadcrumb | `Breadcrumb` | Inicio / ruta / curso |
| Contenedor hero | `Card` (surface-raised) | Sin sombra dura; borde `--border` |
| Label ruta ("CLAUDE DESDE CERO · CURSO 1") | texto Geist Mono | uppercase, tracking 0.18em, `--text-muted` |
| Badges (Nivel, Idioma) | `Badge variant="secondary"` | Nivel: "Principiante"; Idioma: "Espanol" |
| Chip duracion | `Badge variant="outline"` + `Clock` (lucide) | "6h 20m" |
| Rating | estrellas custom + texto | icono `Star` lucide (fill parcial); "4.7 · 705 opiniones" |
| Instructor | `Avatar` + `AvatarFallback` | nombre + rol |
| Poster / preview | `AspectRatio` (16:9) + `next/image` | play opcional abre `Dialog` con iframe Vimeo |
| Progreso | `Progress` | valor 0-100; oculto si 0% para no-matriculado |
| CTA primario | `Button` (variant default, accent naranja `#D97757`) | "Empezar" / "Continuar" + icono `ArrowRight` |
| CTA secundario | `Button variant="ghost"` + `Heart` (lucide) | toggle wishlist |
| Tabs | `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` | 4 tabs; sticky |
| Lista "Lo que aprenderas" | grid + `Check` (lucide) | 2 columnas en desktop |
| Temario (acordeon) | `Accordion type="multiple"` | un `AccordionItem` por modulo |
| Fila de leccion | `Link` + icono de estado | `CircleCheck` / `PlayCircle` / `Circle` (lucide) |
| Recurso | `Card` compacta + icono por tipo + `Button` descarga | iconos: `FileText`, `FileCode`, `Link2`, `FileArchive` |
| Resenas | componente `<CourseReviews />` embebido | ver seccion de Resenas |
| Aside "Incluye" | `Card` sticky | lista con iconos |
| Estados de carga | `Skeleton` | ver Estados |
| Feedback | `Sonner` (`toast`) | guardar/quitar wishlist |
| Tooltips iconos | `Tooltip` | en botones de icono |

### Contenido y datos

Fuente conceptual: `GET /api/courses/{id}/` (DRF), con `enrollment` y `progress` resueltos por el JWT del usuario.

| Campo | Ejemplo | Origen |
|---|---|---|
| `title` | "Curso de Claude Code" | Course |
| `subtitle` | "Del prompt a produccion" | Course (render serif italic) |
| `route_label` | "Claude desde Cero · Curso 1" | Path + Course |
| `level` | "Principiante" | Course |
| `language` | "Espanol" | Course (fijo) |
| `total_duration` | 22800 s → "6h 20m" | suma de lecciones |
| `rating_avg` / `rating_count` | 4.7 / 705 | agregado de Reviews |
| `instructor` | { nombre: "Andres Rodriguez", rol: "Ingeniero de software", avatar_url } | User/Instructor |
| `poster_url` | thumbnail Vimeo | Vimeo API / Course |
| `overview` | 2-3 parrafos | Course |
| `learning_outcomes[]` | ["Usar Claude Code en tu terminal", ...] | Course |
| `requirements[]` | ["Saber programar en cualquier lenguaje", ...] | Course |
| `modules[]` | { titulo, lessons[] } | Module |
| `lesson` | { id, titulo, duracion, status: completed\|in_progress\|not_started, vimeo_id } | Lesson + Progress |
| `resources[]` | { titulo, tipo: pdf\|code\|link\|zip, size, url } | Resource |
| `enrollment.is_enrolled` | true/false | Enrollment (matricula iAcademy) |
| `progress.percent` | 62 | Progress agregado |
| `progress.next_lesson_id` | "l-03" | Progress (para "Continuar") |
| `is_saved` | true/false | Wishlist del usuario |

### Estados

| Estado | Comportamiento |
|---|---|
| **Default (matriculado, con progreso)** | CTA = "Continuar" → `next_lesson_id`. `Progress` visible ("62% completado"). Fila activa resaltada en temario. |
| **Matriculado sin progreso (0%)** | CTA = "Empezar". Barra de progreso oculta o "Aun no has comenzado". Todas las lecciones con icono `Circle` (no iniciada). |
| **Loading** | `Skeleton`: bloque hero (titulo, badges, avatar, poster 16:9), 5 filas de temario, aside. Nunca spinner generico. Tabs presentes pero contenido en skeleton. |
| **No matriculado** | CTA primario cambia a estado informativo, deshabilitado visualmente con nota: "Este curso estara disponible cuando tu academia lo habilite." Sin lenguaje de pago. Temario y recursos visibles pero lecciones no clickeables (candado `Lock` en filas). Tab Descripcion y Resenas totalmente visibles. |
| **Empty — sin recursos** | Tab Recursos muestra empty state con icono `FolderOpen`: "Este curso aun no tiene recursos descargables." |
| **Empty — sin resenas** | Delegado al componente de Resenas (empty propio). |
| **Empty — temario incompleto** | Si un modulo no tiene lecciones: "Contenido en preparacion." |
| **Video sin `vimeo_id`** | Poster: se muestra imagen estatica sin boton play; tooltip "Vista previa no disponible". La leccion sigue navegable; el aula maneja el fallback del reproductor. |
| **Error de carga (curso)** | Estado de error a nivel pagina: icono `TriangleAlert`, "No pudimos cargar este curso." + `Button` "Reintentar". |
| **Error parcial (tab)** | Solo el `TabsContent` afectado muestra error inline con reintento; el resto del curso permanece usable. |
| **Sin permiso para resenar** | El form de resena dentro del tab Resenas se oculta o muestra: "Completa el curso para dejar tu resena." (regla del componente de Resenas). |
| **Guardar en curso** | Boton `Heart` con estado `aria-pressed`; optimista + toast. |

### Interacciones y micro-interacciones

- **CTA primario (Empezar/Continuar):** hover → leve realce del accent naranja (brillo/elevacion sutil, sin bounce). Al click, navega a la leccion; muestra estado `loading` en el boton (icono `Loader2` con `animate-spin`, respetando reduced-motion → sin giro, solo texto "Abriendo...").
- **Guardar (wishlist):** click optimista → icono `Heart` pasa a `fill`; toast Sonner `success`: "Guardado en tu lista." / al quitar: "Quitado de tu lista." Si falla la peticion, revertir icono + toast `error`: "No se pudo guardar. Intenta de nuevo."
- **Tabs:** cambio instantaneo; el tab activo se sincroniza con query param (`?tab=temario`) para deep-link y back-button. Transicion de contenido: fade sutil (150ms) con `prefers-reduced-motion` → sin fade.
- **Acordeon del temario:** click en cabecera de modulo expande/colapsa con altura animada (Radix), chevron `ChevronDown` rota 180°. Reduced-motion → sin animacion de altura. Por defecto, el modulo que contiene la leccion en curso viene expandido.
- **Fila de leccion:** hover → fondo `--surface-raised`, cursor pointer; click → navega al aula. Fila `in_progress` resaltada con borde/acento izquierdo permanente.
- **Poster con preview:** click en `▶` abre `Dialog` con iframe Vimeo (autoplay). Cerrar con Esc / click fuera / boton X (`aria-label="Cerrar vista previa"`).
- **Recurso — descarga:** click en boton descarga → toast `Descargando "Cheatsheet de comandos.pdf"...`; abre en pestana nueva (`target="_blank" rel="noopener"`).
- **Aside "Incluye":** sticky durante scroll dentro del contenido; CTA secundario reflejado ahi para conversion sin volver arriba.

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| **Movil (>=375px)** | 1 columna. Poster full-width. Badges/rating con `flex-wrap`. Tabs con scroll horizontal (`overflow-x-auto`, sin scrollbar visible). CTA primario en barra **sticky inferior** (`fixed bottom-0`, `w-full`, safe-area) para que "Continuar" siempre este a mano. Aside "Incluye" se mueve al final del tab activo. "Guardar" como icono en el header. |
| **Tablet (>=768px)** | 1 columna ancha o hero a 2 columnas segun espacio; poster junto al titulo. Tabs completos sin scroll. Aside aparece como bloque bajo el contenido, ancho completo. |
| **Desktop (>=1024px)** | Layout de 2 columnas: contenido de tab (~2/3, max ~720-800px de texto) + aside sticky (~1/3). Hero a 2 columnas (texto + poster). Tabs sticky bajo el hero. |
| **Contenido max** | Ancho de lectura limitado (`max-w-prose`) en Descripcion para legibilidad editorial. |

### Accesibilidad

- **Headings:** un solo `<h1>` (titulo del curso). Cada modulo del temario es `<h3>` dentro de la cabecera del `AccordionTrigger`; "Lo que aprenderas" y "Requisitos" como `<h2>`.
- **Tabs:** patron Radix (`role="tablist"`, `aria-selected`, flechas ←/→ para moverse, `Home`/`End` a extremos, `TabsContent` con `role="tabpanel"` y `aria-labelledby`).
- **Acordeon:** navegable por teclado (Enter/Espacio togglea, Tab entre modulos), `aria-expanded` en cada trigger.
- **Botones de icono:** `aria-label` explicito — Guardar: `aria-label="Guardar curso"` + `aria-pressed`; Play preview: `aria-label="Ver vista previa del curso"`; descarga: `aria-label="Descargar {nombre del recurso}"`.
- **Rating:** texto accesible completo, no solo estrellas: `aria-label="Calificacion 4.7 de 5, basada en 705 opiniones"`; las estrellas decorativas con `aria-hidden`.
- **Progreso:** `Progress` con `aria-label="Progreso del curso: 62 por ciento"`.
- **Estado de leccion:** el icono no es el unico indicador — cada fila incluye texto/`sr-only` ("Completada", "En curso", "No iniciada") y las bloqueadas anuncian "Leccion bloqueada".
- **Foco visible:** anillo de foco (`focus-visible:ring`) con contraste AA sobre fondo oscuro en todos los interactivos (tabs, filas, botones, chevrons).
- **Orden de tabulacion:** breadcrumb → CTA primario → CTA secundario → tabs → contenido del tab → aside. Logico y sin trampas de foco; el `Dialog` de preview atrapa foco correctamente y lo devuelve al cerrar.
- **Contraste:** verificar `--text-body` (#B8B5AE) sobre `--surface` para AA (>=4.5:1 en cuerpo). El naranja CTA con texto oscuro debe cumplir AA.
- **Movil:** targets tactiles >=44x44px, incluidos filas de leccion e iconos.

### Copy de ejemplo (espanol)

**Hero**
- Label: `CLAUDE DESDE CERO · CURSO 1`
- Titulo: `Curso de Claude Code`
- Subtitulo (serif italic): `Del prompt a produccion`
- Badges: `Principiante` · `Espanol` · `6h 20m`
- Rating: `4.7 · 705 opiniones`
- Instructor: `Andres Rodriguez · Ingeniero de software`
- CTA primario (con progreso): `Continuar` · (sin progreso): `Empezar curso`
- CTA secundario: `Guardar`
- Progreso: `62% completado · 15 de 24 lecciones`

**Tab Descripcion**
- H2: `Lo que aprenderas`
  - `Instalar y configurar Claude Code en tu terminal`
  - `Dominar el loop agentico: planear, editar y verificar`
  - `Conectar herramientas y MCP a tu flujo de trabajo`
  - `Llevar un cambio desde el prompt hasta produccion`
- H2: `Requisitos`
  - `Saber programar en cualquier lenguaje`
  - `Tener una terminal y un editor de codigo`
  - `Ganas de trabajar a tu ritmo`

**Aside "Incluye"**
- `6h 20m de video bajo demanda`
- `24 lecciones`
- `8 recursos descargables`
- `Acceso mientras tu academia lo mantenga activo`

**Tab Recursos**
- Empty: `Este curso aun no tiene recursos descargables.`
- Item: `Cheatsheet de comandos.pdf · PDF · 320 KB` → boton `Descargar`

**Estados especiales**
- No matriculado (CTA): `Disponible cuando tu academia lo habilite`
- Nota bajo CTA no matriculado: `Este curso se activa desde tu matricula de iAcademy.`
- Leccion bloqueada (tooltip): `Disponible al matricularte`
- Preview no disponible (tooltip): `Vista previa no disponible`

**Errores**
- Pagina: `No pudimos cargar este curso.` + boton `Reintentar`
- Tab: `Hubo un problema al cargar esta seccion.` + `Reintentar`
- Guardar (fallo): `No se pudo guardar. Intenta de nuevo.`

**Toasts (Sonner)**
- Guardar: `Guardado en tu lista.`
- Quitar: `Quitado de tu lista.`
- Descarga: `Descargando "Cheatsheet de comandos.pdf"...`
- Abrir leccion: `Abriendo tu leccion...`

**Microcopy**
- Temario vacio: `Contenido en preparacion.`
- Sin resenas (delegado): `Aun no hay resenas. Se el primero en opinar.`
- Sin permiso para resenar: `Completa el curso para dejar tu resena.`

---

## 8. Vista de Lección / Aula (/leccion/[id])

### Propósito y ruta

- **Ruta:** `/leccion/[id]` (App Router: `app/leccion/[id]/page.tsx`). Es la pantalla núcleo del Sprint de aula/reproducción. Todo lo demás (dashboard, temario, detalle de curso) existe para traer al estudiante aquí.
- **Propósito:** entregar la lección activa (video, quiz o ejercicio) con contexto de progreso siempre visible, y permitir avanzar sin fricción a la siguiente lección.
- **Objetivo del usuario:** "Ver/hacer esta lección, marcarla como completa y saltar a la siguiente sin perder de vista dónde voy en el curso."

### Layout (wireframe)

Layout de 3 zonas en desktop (>=1280px). Grid: sidebar `320px` | centro `fluido (max ~1080px)` | panel derecho `340px`.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ TOPBAR: [< Volver al curso]   Curso de Claude Code            [Avatar ▾]       │
├───────────────┬──────────────────────────────────────────────┬────────────────┤
│ TEMARIO        │  CENTRO (reproductor + tabs)                 │ PANEL LECCIÓN   │
│ Progreso 42%   │                                              │                 │
│ [▓▓▓▓░░░░░░]    │  ┌────────────────────────────────────────┐  │ VIDEO · 08:12   │
│                │  │                                        │  │ +15 XP          │
│ ▸ 1 Fundamentos│  │        VIMEO 16:9 (iframe)             │  │                 │
│ ▾ 2 Claude Code│  │        ~960–1080px de ancho            │  │ [ Marcar como   │
│   ✓ 2.1 Setup  │  │                                        │  │   completa   ]  │
│   ● 2.2 CLI ◀── │  └────────────────────────────────────────┘  │ [ Siguiente →]  │
│   ○ 2.3 Prompts│  H1: 2.2 La CLI de Claude Code               │                 │
│   ○ 2.4 Quiz   │                                              │ ─────────────── │
│ ▸ 3 Proyecto   │  ┌ Tabs ─────────────────────────────────┐  │ COMENTARIOS (12)│
│                │  │[Transcripción][Recursos][Código]       │  │ [ Escribe... ]  │
│ ▸ 4 Cierre     │  │                                        │  │ ─ Ana G. 2d     │
│                │  │  contenido de la tab activa            │  │   "Muy claro…"  │
│                │  └────────────────────────────────────────┘  │ ─ Luis M. 5d    │
└───────────────┴──────────────────────────────────────────────┴────────────────┘
```

- **Nota móvil (<768px):** las 3 zonas se apilan verticalmente en este orden: (1) topbar con botón "Temario" que abre el temario en un **Sheet** lateral izquierdo; (2) reproductor 16:9 full-width; (3) título; (4) acciones "Marcar como completa" / "Siguiente" en una barra sticky inferior; (5) tabs; (6) comentarios al final. El panel derecho deja de ser columna y su contenido se intercala.

### Componentes

| Bloque UI | Primitive shadcn | Notas |
|---|---|---|
| Topbar volver + curso + avatar | `Button` (variant ghost) + `Avatar` + `DropdownMenu` | Icono `ChevronLeft` (lucide) |
| Sidebar temario | `Accordion` (secciones colapsables) + `Progress` | Ítem activo resaltado; en móvil dentro de `Sheet` |
| Ítem de lección | `Button`/link + `Badge` de tipo + icono estado | `CheckCircle2` (completa), `Circle` (pendiente), `PlayCircle`/`Dot` (activa) |
| % de avance del curso | `Progress` + label mono | "42% completado" |
| Reproductor | `AspectRatio` (16:9) + iframe Vimeo | Placeholder robusto si no hay `vimeo_id` |
| Título de lección | `<h1>` (Bricolage Grotesque) | — |
| Tabs de contenido | `Tabs` (`TabsList`/`TabsTrigger`/`TabsContent`) | Transcripción / Recursos / Código |
| Bloque de código | `Card` + `<pre><code>` mono + botón copiar | Icono `Copy` |
| Meta de lección | `Card` + `Badge` | tipo, duración, XP |
| Acciones lección | `Button` (default naranja CTA) + `Button` (outline) | `Check`, `ArrowRight` |
| Comentarios | `Card` + `Avatar` + `Textarea` + `Button` | Lista + input |
| Quiz inline/enlace | `Card` + `Button` | Enlace a `/quiz/[id]` o render inline |
| Ejercicio (exercise) | `Card` con HTML sanitizado | Prosa + code blocks |
| Tooltips iconos | `Tooltip` | En botones de solo icono |
| Placeholders carga | `Skeleton` | Nunca spinners |
| Feedback acciones | Sonner `toast` | Completar, copiar, error |

### Contenido y datos

Origen conceptual: Django/DRF vía JWT. Endpoints tipo `GET /api/lecciones/{id}` y `GET /api/cursos/{slug}/temario`.

- **Lección activa:** `id`, `titulo` ("La CLI de Claude Code"), `tipo` (`video` | `quiz` | `exercise`), `duracion_segundos` (492 → "08:12"), `xp` (15), `vimeo_id` (nullable), `contenido_html` (para exercise), `completada` (bool), `orden`.
- **Tabs:** `transcripcion` (texto/segmentos), `recursos[]` (`{titulo, url, tipo}`: PDF, enlace, repo), `codigo[]` (`{lenguaje, snippet}`).
- **Temario del curso:** `secciones[]` → `{titulo, lecciones[]}`; cada lección con `estado` (completa/actual/pendiente) y `tipo`.
- **Progreso:** `avance_porcentaje` (42), `lecciones_completadas` / `lecciones_totales` (10/24).
- **Navegación:** `leccion_siguiente_id`, `leccion_anterior_id` (nullable en extremos).
- **Comentarios:** `{autor_nombre, autor_avatar, fecha_relativa, texto}` + `puede_comentar` (bool, según matrícula).
- **Matrícula/acceso:** `tiene_acceso` (bool) derivado de la matrícula iAcademy. Nunca se muestra precio/plan.

### Estados

- **Default:** lección cargada, reproductor listo, temario con lección activa resaltada, tabs pobladas.
- **Loading (Skeleton):** bloque 16:9 gris con `Skeleton`; barras de título, meta y 4-6 ítems de temario como `Skeleton`; tabs con líneas de texto simuladas. Sin spinners.
- **Vacío (empty):**
  - Sin recursos → "Esta lección no tiene recursos adjuntos."
  - Sin transcripción → "Transcripción no disponible para esta lección."
  - Sin código → "Esta lección no incluye fragmentos de código."
  - Sin comentarios → "Sé la primera persona en comentar esta lección."
- **Error:** fallo al cargar lección → `Card` con mensaje + botón "Reintentar". Fallo al marcar completa → toast de error, el botón revierte a estado previo (optimistic update revertido).
- **Casos especiales:**
  - **No matriculado / sin acceso (`tiene_acceso=false`):** se bloquea el aula y se muestra estado "Este curso no está disponible para tu cuenta todavía" + botón "Volver al inicio". Nunca mencionar pago.
  - **Video sin `vimeo_id`:** placeholder robusto en el marco 16:9: icono `Video`, título "Video próximamente" y subtexto "Estamos preparando este contenido." La lección sigue navegable y marcable.
  - **Tipo quiz:** el centro muestra `Card` con intro del quiz y botón "Comenzar quiz" (enlace a `/quiz/[id]`) o render inline; el panel derecho cambia el CTA a "Ir al quiz".
  - **Tipo exercise:** el centro renderiza `contenido_html` sanitizado (prosa + código); no hay reproductor.
  - **Sin progreso (primera visita):** `Progress` en 0%, "0% completado", primera lección marcada como activa.
  - **Sin permiso para comentar (`puede_comentar=false`):** input deshabilitado con nota "Los comentarios están disponibles para estudiantes matriculados."
  - **Lección ya completada:** botón muestra "Completada" con `Check`, estado deshabilitado/secundario; permite "Siguiente".
  - **Última lección (`leccion_siguiente_id=null`):** el botón "Siguiente" se reemplaza por "Volver al curso" o "Finalizar curso".

### Interacciones y micro-interacciones

- **Ítem de temario:** hover → cambia `--surface` a `--surface-raised`; click → navega a `/leccion/[id]`, la lección activa se resalta (borde/acento) y el scroll del sidebar la centra.
- **Secciones colapsables:** click en cabecera → expande/colapsa con transición de altura suave (respetar `prefers-reduced-motion` → sin animación).
- **Marcar como completa:** click → update optimista (checkmark verde inmediato en temario + `Progress` sube), toast Sonner "Lección completada" con icono `Check`; si falla, revierte y toast de error.
- **Siguiente lección:** click → navega a la siguiente; si venía de marcar completa, muchos usuarios encadenan → mantener foco lógico en el reproductor tras cargar.
- **Tabs:** click cambia contenido sin recargar; transición de opacidad corta. Estado de tab activa persiste por lección.
- **Copiar código:** botón `Copy` → copia al portapapeles, cambia a icono `Check` 2s, toast "Código copiado".
- **Comentar:** enviar → optimista, aparece al tope de la lista; toast "Comentario publicado".
- **Hover/focus general:** foco visible con ring de acento (`--accent`) en todos los interactivos.
- **Reproductor:** al terminar el video (evento Vimeo `ended`), sugerir marcar completa (resaltar sutilmente el CTA; sin auto-avance forzado).

### Responsive

- **Móvil (>=375px):** una columna. Topbar con botón "Temario" (icono `Menu`) → abre `Sheet` izquierdo con el temario completo. Reproductor 16:9 full-width. Acciones "Marcar como completa" / "Siguiente" en barra **sticky inferior**. Tabs full-width con scroll horizontal si no caben. Comentarios al final.
- **Tablet (>=768px):** dos columnas: temario colapsable a la izquierda (o `Sheet` según ancho) + centro; el panel de lección (meta, acciones, comentarios) se coloca debajo del reproductor a ancho completo.
- **Desktop (>=1280px):** las 3 columnas simultáneas (320 | fluido | 340). Sidebar y panel derecho con scroll independiente; centro con reproductor a máx ~1080px centrado.

### Accesibilidad

- **Foco visible:** ring de 2px con `--accent` y offset en todos los controles; nunca `outline:none` sin reemplazo.
- **ARIA en iconos:** botones de solo icono con `aria-label` ("Volver al curso", "Abrir temario", "Copiar código", "Cerrar temario"). Estado del ítem de temario comunicado con `aria-current="true"` en la lección activa y texto accesible ("completada"/"pendiente").
- **Orden de tabulación:** topbar → temario (ítems en orden) → reproductor → tabs → contenido de tab → panel (acciones antes que comentarios). En móvil, la barra sticky de acciones va en orden lógico tras el título.
- **Teclado:** `Tabs` navegables con flechas (Radix). `Sheet`/temario cierran con `Esc` y devuelven foco al disparador. Iframe de Vimeo alcanzable por tab; controles del player son de Vimeo.
- **Headings:** `h1` = título de la lección; `h2` = "Temario", "Comentarios"; secciones del temario y tabs con jerarquía coherente; un solo `h1` por página.
- **Contraste:** cumplir WCAG AA sobre fondo oscuro (verificar `--text-body` #B8B5AE sobre `--surface`). Estados completa/pendiente no dependen solo del color (icono + texto).
- **Movimiento:** todas las transiciones respetan `prefers-reduced-motion: reduce`.

### Copy de ejemplo (español)

**Topbar / navegación**
- "Volver al curso"
- "Temario"

**Temario / progreso**
- "42% completado"
- "10 de 24 lecciones"
- Tipos (Badge): "Video" · "Quiz" · "Ejercicio"

**Meta de lección (panel derecho)**
- "VIDEO · 08:12" (label mono en mayúsculas)
- "+15 XP"

**Botones de acción**
- "Marcar como completa"
- Estado completado: "Completada"
- "Siguiente lección"
- Última lección: "Finalizar curso"
- Quiz: "Comenzar quiz" / "Ir al quiz"

**Tabs**
- "Transcripción" · "Recursos" · "Código"

**Placeholder de video (sin vimeo_id)**
- Título: "Video próximamente"
- Subtexto: "Estamos preparando este contenido."

**Estados vacíos**
- Recursos: "Esta lección no tiene recursos adjuntos."
- Transcripción: "Transcripción no disponible para esta lección."
- Código: "Esta lección no incluye fragmentos de código."
- Comentarios: "Sé la primera persona en comentar esta lección."

**Sin acceso / no matriculado**
- Título: "Este curso no está disponible para tu cuenta todavía"
- Botón: "Volver al inicio"

**Sin permiso para comentar**
- "Los comentarios están disponibles para estudiantes matriculados."

**Comentarios**
- Placeholder input: "Escribe un comentario…"
- Botón: "Publicar comentario"
- Encabezado: "Comentarios (12)"

**Toasts (Sonner)**
- Éxito completar: "Lección completada"
- Copiar código: "Código copiado"
- Comentario: "Comentario publicado"
- Error genérico: "No pudimos guardar tu progreso. Intenta de nuevo."

**Error de carga**
- "No pudimos cargar esta lección."
- Botón: "Reintentar"

---

## 9. Quiz (inline al final de modulo)

### Proposito y ruta

- **Ruta:** el quiz vive embebido en la vista del aula, como ultima leccion de un modulo. URL: `/cursos/claude-code/modulo/[moduloSlug]/quiz` (o `.../leccion/[leccionSlug]` cuando la leccion es de tipo `quiz`). Sprint: **Sprint 3 (Evaluacion y progreso)**, despues de que el reproductor de video y el temario esten funcionales.
- **Proposito:** verificar de forma ligera que el estudiante retuvo los conceptos clave del modulo antes de avanzar; convertir el consumo pasivo de video en un checkpoint activo que suma XP y desbloquea la sensacion de avance.
- **Objetivo del usuario:** responder 3-5 preguntas, recibir feedback inmediato, saber si aprobo y continuar al siguiente modulo (o reintentar) sin salir del flujo del aula.

### Layout (wireframe)

El quiz reemplaza la zona del video (16:9, centro ~960px) manteniendo el sidebar de temario a la izquierda. Es una `Card` unica centrada; una sola pregunta visible a la vez.

```
+------------------+  +--------------------------------------------------+
|  TEMARIO (side)  |  |  QUIZ · Card                                     |
|                  |  |  +--------------------------------------------+  |
|  Modulo 1     ✓  |  |  | [MONO] EVALUACION MODULO 2   Pregunta 2/5  |  |
|   L1 Intro    ✓  |  |  | ▓▓▓▓▓▓▓▓░░░░░░░░  (Progress 40%)            |  |
|   L2 Setup    ✓  |  |  +--------------------------------------------+  |
|  Modulo 2        |  |                                                   |
|   L1 ...      ✓  |  |   ¿Que comando inicializa un proyecto con        |
|   L2 ...      ✓  |  |   Claude Code en la terminal?          (headline) |
| ▸ Quiz M2    ◔40%|  |                                                   |
|                  |  |   ( ) claude init                                 |
|  Modulo 3     🔒 |  |   (o) claude start            <- seleccionada     |
|                  |  |   ( ) code --claude                               |
|                  |  |   ( ) npx claude-setup                            |
|                  |  |                                                   |
|                  |  |   [ Instrucciones: selecciona una opcion ]        |
|                  |  |                                                   |
|                  |  |   ------------------------------------------------|
|                  |  |   Anterior              [ Comprobar respuesta ]   |
|                  |  |                                        (Button)   |
+------------------+  +--------------------------------------------------+
```

Estado post-comprobacion (feedback inline sobre la misma pregunta):

```
+--------------------------------------------------+
|  [MONO] EVALUACION MODULO 2       Pregunta 2/5   |
|  ▓▓▓▓▓▓▓▓░░░░░░░░                                 |
|                                                  |
|   ¿Que comando inicializa un proyecto...?        |
|                                                  |
|   ( ) claude init                                |
|   (x) claude start        ✕ Incorrecta  (borde rojo)|
|   (✓) code --claude       ✓ Correcta    (borde verde)|
|   ( ) npx claude-setup                           |
|                                                  |
|   ┌ Feedback ──────────────────────────────────┐ |
|   │ ✓ La respuesta correcta es "code --claude". │ |
|   │   Ejecutalo dentro de la carpeta del proyecto.│ |
|   └─────────────────────────────────────────────┘ |
|   ------------------------------------------------|
|   Anterior                     [ Siguiente → ]    |
+--------------------------------------------------+
```

Pantalla de resultado (reemplaza la Card de preguntas):

```
+--------------------------------------------------+
|                   [icono trofeo/check]           |
|              ¡Aprobaste el quiz!      (headline)  |
|          "Del repaso a la practica"   (serif ital)|
|                                                  |
|                   4 / 5 correctas                |
|                ▓▓▓▓▓▓▓▓▓▓▓▓░░  80%                |
|                                                  |
|      [Badge +50 XP]   [Badge Aprobado ≥ 70%]     |
|                                                  |
|   Resumen:                                       |
|    ✓ P1  ✓ P2  ✕ P3  ✓ P4  ✓ P5                  |
|                                                  |
|   [ Ver repaso ]            [ Continuar modulo → ]|
+--------------------------------------------------+
```

**Movil:** el sidebar de temario se colapsa a un `Sheet` (trigger en el header del aula). La Card del quiz pasa a ancho completo con padding lateral de 16px. Opciones apiladas 100% de ancho, minimo 44px de alto. La barra de acciones (`Anterior` / `Comprobar`) se fija al fondo (`sticky bottom-0`) para que el CTA siempre sea alcanzable con el pulgar.

### Componentes

| Bloque UI | Primitive shadcn | Notas |
|---|---|---|
| Contenedor del quiz | `Card` (`CardHeader`/`CardContent`/`CardFooter`) | Fondo `--surface`, borde `--border` |
| Label "EVALUACION MODULO 2" | texto mono | MAYUSCULAS, tracking 0.16em, `--text-muted` |
| "Pregunta 2 de 5" | `Badge` variant `outline` | alineado a la derecha del header |
| Barra de avance del quiz | `Progress` | valor = `(indiceActual/total)*100` |
| Enunciado | `<h2>` Bricolage | `--text-headline`, letter-spacing -0.02em |
| Opciones single choice | `RadioGroup` + `RadioGroupItem` (Radix, ya en shadcn) | una sola seleccion |
| Opciones multiple choice | `Checkbox` por opcion | seleccion multiple; el enunciado indica "selecciona todas" |
| Cada opcion (fila clickeable) | `Label` envolviendo el control, dentro de contenedor tipo `Card` sutil | toda la fila es target |
| Feedback correcto/incorrecto | bloque con `Alert` (variant custom via className) | icono `lucide` Check / X |
| Boton primario | `Button` | "Comprobar respuesta" -> "Siguiente" -> "Ver resultado" |
| Boton secundario | `Button` variant `ghost` | "Anterior" |
| Iconos | lucide-react | `Check`, `X`, `CircleCheck`, `Trophy`, `RotateCcw`, `ArrowRight`, `Lock` |
| Resultado: puntaje | texto Bricolage grande + `Progress` | |
| Resultado: XP y estado | `Badge` (XP) + `Badge` (Aprobado/Reprobado) | |
| Resultado: resumen por pregunta | fila de `Badge`/iconos | P1..P5 con check/x |
| Skeleton de carga | `Skeleton` | ver Estados |
| Estado "Quiz proximamente" | `Card` + icono `Clock`/`Construction` | ver Estados |
| Tooltip en modulo bloqueado (sidebar) | `Tooltip` | "Completa el modulo anterior" |

### Contenido y datos

Origen conceptual: endpoint DRF `GET /api/cursos/claude-code/quizzes/{quizId}` (parte del payload de la leccion tipo `quiz`). Envio: `POST .../quizzes/{quizId}/intentos`.

**Quiz (metadata)**
- `titulo` -> "Evaluacion Modulo 2: Fundamentos de Claude Code"
- `moduloTitulo` -> "Fundamentos de Claude Code"
- `totalPreguntas` -> 5
- `umbralAprobacion` -> 0.7 (se muestra como "70%")
- `xpAlAprobar` -> 50
- `intentosPermitidos` -> `null` (ilimitados en MVP)

**Pregunta**
- `id`, `orden` -> "Pregunta 2 de 5"
- `tipo` -> `single` | `multiple`
- `enunciado` -> texto
- `opciones[]` -> `{ id, texto }` (barajadas o en orden fijo)
- `explicacion` -> feedback mostrado tras comprobar

**Respuesta / correccion** (validada en backend, no en cliente)
- `esCorrecta` -> boolean
- `opcionesCorrectas[]` -> ids

**Resultado del intento**
- `puntaje` -> "4 / 5"
- `porcentaje` -> 80
- `aprobado` -> true
- `xpGanado` -> 50 (0 si reintento y ya se otorgo antes)
- `detalle[]` -> `{ preguntaId, correcta }` para el resumen

Datos de ejemplo realistas: modulo "Fundamentos de Claude Code", pregunta sobre `code --claude`, estudiante "Ana Batista".

### Estados

| Estado | Descripcion |
|---|---|
| **default** | Card con pregunta 1, ninguna opcion seleccionada, boton "Comprobar respuesta" deshabilitado hasta que haya al menos una seleccion. |
| **seleccionando** | Al elegir opcion, se habilita "Comprobar". En `multiple`, permanece habilitado mientras haya >=1 opcion marcada. |
| **comprobada (correcta)** | Opcion elegida con borde/relleno verde funcional, icono `Check`; feedback verde; opciones bloqueadas (readonly); boton pasa a "Siguiente". |
| **comprobada (incorrecta)** | Opcion elegida marcada roja con `X`; la(s) correcta(s) resaltada(s) en verde; feedback con `explicacion`; boton "Siguiente". |
| **loading (skeleton)** | Sin spinner. `Skeleton` para: barra mono del header (1 linea), `Progress` (barra plana), enunciado (2 lineas), 4 filas de opcion (rect. redondeados full-width, alto ~52px), boton. |
| **enviando** | Al presionar "Comprobar"/"Ver resultado": boton en estado loading (texto "Comprobando..." + spinner inline del `Button`, controles deshabilitados). Es micro-espera, no skeleton. |
| **vacio (sin preguntas)** | El modulo no tiene preguntas cargadas: Card con mensaje "Este modulo aun no tiene evaluacion" + boton "Continuar al siguiente modulo". |
| **Quiz proximamente** | `estado: "proximamente"` o no existe UI/contenido de quiz todavia: Card centrada, icono `Clock`, titulo "Quiz proximamente", texto explicativo, boton "Continuar" (avanza sin bloquear). No cuenta como reprobado ni bloquea progreso. |
| **error** | Falla al cargar (`GET`) o al enviar (`POST`): Card de error con icono `AlertTriangle`, mensaje y boton "Reintentar". Si el fallo es al enviar respuesta, se conserva la seleccion del usuario. Toast Sonner de error acompania. |
| **resultado aprobado** | `porcentaje >= 70`: header "¡Aprobaste el quiz!", puntaje, badges XP + "Aprobado", CTA primario "Continuar modulo". |
| **resultado reprobado** | `porcentaje < 70`: header "Casi lo logras", puntaje, badge "No aprobado" (rojo funcional), CTA primario "Reintentar quiz" + secundario "Revisar leccion". Sin XP. |
| **no matriculado** | El estudiante no tiene acceso al curso: no se renderiza el quiz; se muestra el estado de acceso del aula ("Este curso no esta disponible para ti todavia"). El quiz nunca pide pago. |
| **sin progreso previo** | Quiz accesible aunque el modulo no este 100% visto (MVP no lo bloquea), pero si el modulo esta bloqueado en el temario, el item "Quiz" aparece con icono `Lock` y `Tooltip` "Completa el modulo anterior". |
| **XP ya otorgado** | En reintentos aprobados posteriores, `xpGanado: 0`; el badge de XP se oculta o muestra "XP ya obtenido" en `--text-muted`, sin sumar de nuevo. |

### Interacciones y micro-interacciones

- **Seleccion de opcion:** click en cualquier parte de la fila (no solo el radio). Hover: `background` sube a `--surface-raised`, transicion 150ms. Focus: anillo visible. La opcion seleccionada tiene borde `--accent`.
- **Comprobar:** click -> `POST` -> transicion suave (150-200ms) que revela colores de correccion y el bloque de feedback (fade/slide-down corto). El boton cambia de label a "Siguiente".
- **Siguiente:** avanza a la pregunta N+1; la `Progress` se anima al nuevo valor; la Card hace un cross-fade sutil entre preguntas. En la ultima pregunta el boton dice "Ver resultado".
- **Anterior:** vuelve a la pregunta previa en modo readonly mostrando la respuesta ya comprobada (no re-editable dentro del mismo intento).
- **Resultado:**
  - Aprobado -> Sonner success: "¡Muy bien! Ganaste 50 XP". El badge de XP entra con un pop discreto (escala 0.9->1). El item del temario se marca con checkmark verde y el modulo siguiente se desbloquea.
  - Reprobado -> Sonner: "Repasa el modulo y vuelve a intentarlo." (variant neutral, no destructive).
- **Reintentar:** resetea selecciones y vuelve a pregunta 1 con un nuevo intento; barajado de opciones opcional. Toast breve: "Nuevo intento iniciado".
- **Continuar modulo:** navega a la primera leccion del siguiente modulo; scroll al top del reproductor.
- **Errores:** Sonner destructive "No pudimos guardar tu respuesta. Reintenta." con la seleccion preservada.
- **Todas las animaciones** respetan `prefers-reduced-motion`: se sustituyen por cambios de estado instantaneos (sin slide/scale/fade), conservando solo el cambio de color/estado.

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| **>=375px (movil)** | Sidebar en `Sheet`. Card full-width, padding 16px. Opciones apiladas, alto >=44px, tap target completo. Barra de acciones `sticky bottom-0` con fondo `--surface` y borde superior. Resultado: badges XP/estado apilados verticalmente, CTAs full-width apilados (primario arriba). |
| **>=768px (tablet)** | Sidebar puede mostrarse fijo o seguir en `Sheet` segun ancho del aula. Card centrada max ~640px. Acciones en fila (`Anterior` izq, primario der). |
| **>=1024px (desktop)** | Sidebar de temario fijo a la izquierda; Card del quiz centrada en la zona del video (~640-720px, no ocupa los 960px completos para mantener aire). Feedback y resumen con mas respiracion. |

### Accesibilidad

- **Grupo de opciones:** usar `RadioGroup`/`role="radiogroup"` (single) con `aria-labelledby` apuntando al `id` del enunciado; en `multiple`, `role="group"` + checkboxes con `Label` asociado (`htmlFor`).
- **Estado de correccion:** cada opcion corregida expone `aria-label` o texto visible + `sr-only`: "Correcta" / "Incorrecta"; no depender solo del color (icono `Check`/`X` + texto). El bloque de feedback tiene `role="status"` `aria-live="polite"` para anunciarse tras comprobar.
- **Progreso:** `Progress` con `aria-label="Avance del quiz"` y `aria-valuetext="Pregunta 2 de 5"`.
- **Foco:** anillo visible (contraste AA sobre fondo oscuro) en radios, checkboxes, filas y botones. Al pasar de pregunta, mover foco al enunciado (`h2` con `tabindex="-1"`) o al primer control.
- **Botones de icono** (cerrar Sheet, etc.): `aria-label` explicito ("Cerrar temario"). Iconos decorativos con `aria-hidden`.
- **Orden de tabulacion:** enunciado -> opciones (en orden) -> "Anterior" -> boton primario. Barra sticky no rompe el orden logico del DOM.
- **Teclado:** flechas mueven entre opciones del radiogroup; Espacio/Enter seleccionan; Enter en el boton primario comprueba/avanza. Sin trampas de foco (el `Sheet` de temario si atrapa foco mientras esta abierto, con Escape para cerrar).
- **Headings:** el enunciado es `<h2>` dentro de la jerarquia del aula (`h1` = titulo del curso/leccion). Resultado usa `<h2>` para "¡Aprobaste el quiz!".
- **Anuncio de resultado:** contenedor de resultado con `role="status"` para leer puntaje y estado aprobado/reprobado al renderizarse.

### Copy de ejemplo (espanol)

**Header / progreso**
- Label mono: `EVALUACION MODULO 2`
- Badge: `Pregunta 2 de 5`
- Instruccion single: `Selecciona una opcion.`
- Instruccion multiple: `Selecciona todas las que apliquen.`

**Enunciado ejemplo**
- `¿Que comando inicializa un proyecto con Claude Code en la terminal?`

**Botones**
- `Comprobar respuesta`
- `Siguiente`
- `Ver resultado`
- `Anterior`
- `Reintentar quiz`
- `Continuar modulo`
- `Revisar leccion`
- `Continuar al siguiente modulo`

**Feedback inmediato**
- Correcto: `Correcto. "code --claude" inicializa el proyecto dentro de la carpeta actual.`
- Incorrecto: `Incorrecta. La respuesta correcta es "code --claude". Ejecutalo dentro de la carpeta del proyecto.`

**Resultado aprobado**
- Titulo: `¡Aprobaste el quiz!`
- Subtitulo (serif italic): `Del repaso a la practica`
- Puntaje: `4 de 5 correctas · 80%`
- Badge XP: `+50 XP`
- Badge estado: `Aprobado`
- Toast: `¡Muy bien! Ganaste 50 XP.`

**Resultado reprobado**
- Titulo: `Casi lo logras`
- Puntaje: `3 de 5 correctas · 60%`
- Mensaje: `Necesitas 70% para aprobar. Repasa el modulo y vuelve a intentarlo.`
- Badge estado: `No aprobado`
- Toast: `Repasa el modulo y vuelve a intentarlo.`

**Estados vacios / especiales**
- Sin preguntas: `Este modulo aun no tiene evaluacion.` / boton `Continuar al siguiente modulo`
- Quiz proximamente:
  - Titulo: `Quiz proximamente`
  - Cuerpo: `La evaluacion de este modulo estara disponible pronto. Mientras tanto, puedes seguir avanzando.`
  - Boton: `Continuar`
- XP ya obtenido: `Ya obtuviste el XP de este quiz.`
- Modulo bloqueado (tooltip): `Completa el modulo anterior para desbloquear el quiz.`

**Errores**
- Carga: `No pudimos cargar el quiz.` / boton `Reintentar`
- Envio: `No pudimos guardar tu respuesta. Reintenta.`
- Toast error: `Algo salio mal. Revisa tu conexion e intenta de nuevo.`

**Microcopy**
- Umbral: `Aprobas con 70% o mas.`
- Progreso resumen: `P1 correcta · P2 correcta · P3 incorrecta · P4 correcta · P5 correcta`

---

## 10. Reseñas del curso

### Proposito y ruta

- **Ruta:** `/cursos/claude-code/resenas` (tab dentro de la página de detalle del curso) o bloque anclado al final del aula (`/cursos/claude-code#resenas`). Sprint: **Sprint 3 - Social proof y cierre de experiencia** (post-consumo del curso).
- **Proposito:** dar prueba social del curso (promedio, distribución, opiniones reales) y permitir que quien lo completó deje su reseña.
- **Objetivo del usuario:** leer qué opinan otros estudiantes antes/durante el curso, y —si lo completó— calificarlo y escribir su experiencia.

### Layout (wireframe)

```
┌────────────────────────────────────────────────────────────────────┐
│  Reseñas del curso                                    [Display H2]   │
│                                                                      │
│  ┌───────────────────┐   ┌──────────────────────────────────────┐   │
│  │       4.7         │   │ 5 ★ ████████████████████░░░  86       │   │
│  │  ★★★★★ (parcial)  │   │ 4 ★ ██████░░░░░░░░░░░░░░░░░  28       │   │
│  │  128 opiniones    │   │ 3 ★ ██░░░░░░░░░░░░░░░░░░░░░   9       │   │
│  │                   │   │ 2 ★ █░░░░░░░░░░░░░░░░░░░░░░   3       │   │
│  │  [Mono label]     │   │ 1 ★ █░░░░░░░░░░░░░░░░░░░░░░   2       │   │
│  └───────────────────┘   └──────────────────────────────────────┘   │
│                                                                      │
│  ─── Formulario (SOLO si completó el curso) ──────────────────────   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Tu opinión                                                    │   │
│  │  Tu calificación   ★ ★ ★ ★ ☆   (clickeable, hover preview)     │   │
│  │  Título (opcional) [_________________________________________] │   │
│  │  Comentario        [_________________________________________] │   │
│  │                    [_________________________________________] │   │
│  │                                      [Cancelar] [Publicar]     │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  128 opiniones                      Ordenar:  [Más recientes ▾]      │
│  ──────────────────────────────────────────────────────────────     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ (AV) Luis Him          hace 3 días   ★★★★★                    │   │
│  │      [Completó el curso]                                       │   │
│  │      "De cero a productivo con Claude Code"                    │   │
│  │      El módulo de agentes me voló la cabeza. Explica...        │   │
│  │      ─────────────────────────────────────────────            │   │
│  │      ¿Te resultó útil?   [▲ Útil 12]                           │   │
│  └──────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ (AV) María Batista     hace 1 semana ★★★★☆   ...              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│                        [ Ver más opiniones ]                         │
└────────────────────────────────────────────────────────────────────┘
```

**Movil:** cabecera pasa a una sola columna: promedio arriba (centrado), distribución debajo en full-width. El control de orden queda debajo del contador `128 opiniones`. Cada reseña es una Card apilada full-width. El formulario mantiene su orden pero ocupa el 100% del ancho.

### Componentes

| Bloque UI | Primitive shadcn / lucide | Notas |
|---|---|---|
| Contenedor de sección | `Card` (o `<section>`) | Encabezado H2 con Display |
| Bloque de promedio | `Card` interno | Número grande + `StarRating` readonly + conteo |
| Distribución por estrellas | `Progress` (x5) | Una barra por nivel 5→1; label mono + conteo |
| **StarRating (reutilizable)** | custom sobre lucide `Star` | Ver "Star-rating" abajo |
| Selector de orden | `Select` (Radix) | "Más recientes" / "Más votados" |
| Contador de opiniones | texto (mono label) | `128 opiniones` |
| Tarjeta de reseña | `Card` | avatar + meta + rating + texto |
| Avatar | `Avatar` (+ fallback iniciales) | |
| Badge "Completó el curso" | `Badge` variant `secondary` | icono `CircleCheck` (verde éxito, uso funcional) |
| Botón "Útil" | `Button` variant `ghost` sm | icono `ThumbsUp`, muestra conteo |
| Formulario de reseña | `Card` + `Textarea` + `Input` + `Label` | Aparece condicionalmente |
| Botones del form | `Button` (primary `Publicar`, ghost `Cancelar`) | |
| Menú editar/eliminar (reseña propia) | `DropdownMenu` + icono `MoreHorizontal` | opciones "Editar" / "Eliminar" |
| Confirmación de borrado | `AlertDialog` | |
| Loading | `Skeleton` | cabecera + 3 cards fantasma |
| Empty state | ilustración/icono `MessageSquareText` + texto | "Sé el primero en opinar" |
| Feedback | Sonner `toast` | publicar/editar/eliminar |
| Paginación | `Button` "Ver más opiniones" | append incremental |

**Star-rating (componente reutilizable)**

- **Modo lectura (`readonly`):** 5 iconos `Star`; llenos = `--accent`, vacíos = `--text-muted`. Soporta medios (relleno parcial vía máscara/clip) para el promedio 4.7. No es interactivo (`aria-hidden` en los iconos, valor expuesto en label textual).
- **Modo edición:** 5 botones `Star` clickeables. Hover/focus muestra preview del valor (rellena hasta el índice bajo el cursor/teclado). Estado seleccionado persiste. `--accent-warm` para el hover, `--accent` para seleccionado. Tamaños: `sm` (16px, en cards), `md` (20px), `lg` (28px, en el form).

### Contenido y datos

| Campo | Ejemplo | Origen conceptual |
|---|---|---|
| `average` | `4.7` | Agregado backend (DRF) sobre reseñas del curso |
| `total_count` | `128` | Conteo de reseñas |
| `distribution` | `{5:86,4:28,3:9,2:3,1:2}` | Agregado por nivel de estrellas |
| `review.id` | `rev_8f2a` | PK |
| `review.author_name` | `Luis Him` | Perfil iAcademy (matrícula) |
| `review.author_avatar` | URL o `null` (→ iniciales `LH`) | Perfil |
| `review.rating` | `5` | 1–5 |
| `review.title` | `"De cero a productivo con Claude Code"` | Opcional |
| `review.comment` | texto | Requerido |
| `review.created_at` | `hace 3 días` | Relativo, formato es-PA |
| `review.completed_course` | `true` → Badge | Progreso del autor = 100% |
| `review.helpful_count` | `12` | Votos "Útil" |
| `review.is_mine` | `true`/`false` | Habilita editar/eliminar |
| `can_review` | `true`/`false` | Progreso del usuario actual = 100% |
| `my_review` | objeto o `null` | Si existe → form en modo editar |
| `sort` | `recent` \| `helpful` | Estado del `Select` |

Nombres realistas panameños para mock: **Luis Him, María Batista, José Him González, Ana Icaza, Carlos Him, Yariela Saavedra, Ricardo Him, Gabriela Him.**

### Estados

| Estado | Comportamiento |
|---|---|
| **Default** | Cabecera con promedio + distribución; lista paginada; orden por defecto "Más recientes". |
| **Loading** | `Skeleton`: bloque de promedio (número + barra grande), 5 barras de distribución, y 3 cards de reseña (avatar circular + 3 líneas). Sin spinners. |
| **Vacío (empty)** | Sin reseñas: icono `MessageSquareText`, título "Aún no hay opiniones", subtítulo "Sé el primero en opinar sobre este curso." Si `can_review` → se muestra el form directamente; si no → solo el mensaje. |
| **Error** | Fallo al cargar: card con `AlertCircle`, texto "No pudimos cargar las opiniones." + `Button` "Reintentar". Fallo al publicar → toast de error, no se pierde el texto escrito. |
| **No completó el curso (`can_review=false`)** | El formulario NO se renderiza. En su lugar, nota discreta (mono/muted): "Completa el curso para dejar tu opinión." Puede leer todas las reseñas. |
| **Ya reseñó (`my_review≠null`)** | El form entra en modo edición precargado; su reseña aparece en la lista con menú `Editar / Eliminar`. No puede crear una segunda. |
| **No matriculado** | La sección puede mostrarse en modo solo-lectura (prueba social); sin form, sin votar "Útil". Nota: "Este contenido está disponible para estudiantes matriculados." |
| **Sin permiso para votar** | Botón "Útil" deshabilitado con `Tooltip`: "Disponible para estudiantes matriculados." |
| **Enviando** | Botón `Publicar` en estado loading (texto "Publicando…", disabled), form bloqueado. |
| **Validación** | `Publicar` deshabilitado si `rating=0` o `comment` vacío; mensajes inline por campo. |

### Interacciones y micro-interacciones

- **Star-rating (edición):** hover sobre estrella N rellena 1..N con `--accent-warm`; al salir vuelve al valor seleccionado. Click fija el valor con transición de relleno (150ms). Teclado: flechas ←/→ para bajar/subir, `1–5` para set directo, `Home`/`End` a extremos.
- **Distribución:** cada barra puede ser clickeable para filtrar por ese nivel (opcional MVP); hover eleva ligeramente el contraste de la barra.
- **Selector de orden:** cambiar entre "Más recientes" / "Más votados" hace re-fetch/re-orden con transición de opacidad suave (fade 120ms) sobre la lista.
- **Publicar reseña:** al enviar → toast Sonner de éxito, la reseña aparece al tope (si orden = recientes) con animación de entrada (fade+slide 200ms), y el bloque de promedio se recalcula.
- **Editar:** `DropdownMenu` → "Editar" hace scroll al form precargado y enfoca el `Textarea`.
- **Eliminar:** abre `AlertDialog`; al confirmar → toast "Opinión eliminada" con acción "Deshacer" (5s).
- **Votar "Útil":** click optimista (incrementa conteo al instante, `ThumbsUp` se rellena); si falla, revierte + toast de error. No se puede votar la reseña propia.
- **Ver más:** append incremental; el botón muestra estado loading mientras trae la siguiente página.
- **Hover en cards:** borde pasa de `--border` a un contraste levemente mayor; sutil (respetar `prefers-reduced-motion` → sin animaciones de entrada, solo cambios de estado instantáneos).

**Toasts (Sonner):**

| Evento | Mensaje |
|---|---|
| Publicó | "Tu opinión se publicó. Gracias por compartir." |
| Editó | "Opinión actualizada." |
| Eliminó | "Opinión eliminada." (acción: Deshacer) |
| Error genérico | "No pudimos guardar tu opinión. Inténtalo de nuevo." |

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| **Móvil (≥375px)** | Una columna. Cabecera: promedio centrado arriba, distribución full-width debajo. Orden bajo el contador. Cards apiladas full-width. Star-rating del form en tamaño `lg` para toque cómodo (targets ≥44px). Botones del form full-width apilados (`Publicar` primero). |
| **Tablet (≥768px)** | Cabecera en 2 columnas (promedio 1/3, distribución 2/3). Cards full-width. Botones del form en fila alineados a la derecha. |
| **Desktop (≥1024px)** | Igual a tablet con más aire; lista con ancho de lectura cómodo (máx ~720–800px). El bloque de reseñas se integra al layout del detalle del curso. |

### Accesibilidad

- **Headings:** H2 "Reseñas del curso"; el bloque promedio y el form usan H3 ("Tu opinión"). Sin saltos de nivel.
- **Star-rating (edición):** `role="radiogroup"` con `aria-label="Tu calificación"`; cada estrella `role="radio"` + `aria-label="N de 5 estrellas"` y `aria-checked`. Navegable con flechas y `1–5`. Foco visible (anillo con `--accent`).
- **Star-rating (lectura):** iconos `aria-hidden`; el valor se expone como texto para lectores: `aria-label="Calificación: 4.7 de 5"`. Promedio del curso anunciado como "4.7 de 5 estrellas, 128 opiniones".
- **Botones de icono:** "Útil" → `aria-label="Marcar esta opinión como útil"`; menú → `aria-label="Opciones de la opinión"`.
- **Distribución:** cada `Progress` con `aria-label` "86 opiniones de 5 estrellas".
- **Orden de tabulación:** cabecera → form (si visible) → selector de orden → reseñas (de arriba a abajo) → "Ver más".
- **Foco:** anillo visible en todos los interactivos; contraste AA sobre fondo oscuro. Al abrir `AlertDialog`, foco atrapado y devuelto al disparador al cerrar.
- **Estados:** errores de validación asociados por `aria-describedby`; toasts no roban el foco pero se anuncian (`aria-live` de Sonner).
- **Reduced motion:** desactiva slide/fade de entrada; conserva cambios de estado.

### Copy de ejemplo (espanol)

**Cabecera**
- `Reseñas del curso`
- `128 opiniones` · `4.7`
- Label distribución (mono): `5 ESTRELLAS`, `4 ESTRELLAS`, …

**Selector de orden**
- `Ordenar por` → opciones: `Más recientes`, `Más votados`

**Formulario (solo si completó)**
- Título: `Tu opinión`
- `Tu calificación`
- Placeholder título: `Título (opcional). Ej: "Excelente para arrancar con Claude Code"`
- Placeholder comentario: `Cuenta qué te pareció el curso, qué aprendiste y a quién se lo recomendarías.`
- Botones: `Publicar opinión` · `Cancelar`
- Modo edición: `Guardar cambios`
- Contador: `0 / 600`

**Badge / meta**
- `Completó el curso`
- Fecha relativa: `hace 3 días`, `hace 1 semana`, `hace 2 meses`
- `¿Te resultó útil?` · `Útil 12`

**No puede reseñar**
- `Completa el curso para dejar tu opinión.`

**Empty state**
- Título: `Aún no hay opiniones`
- Subtítulo: `Sé el primero en opinar sobre este curso.`
- (Si completó) CTA: `Escribir mi opinión`

**Errores / validación**
- Sin rating: `Selecciona una calificación de 1 a 5 estrellas.`
- Comentario vacío: `Escribe un comentario para publicar tu opinión.`
- Carga fallida: `No pudimos cargar las opiniones.` · botón `Reintentar`
- Guardado fallido (toast): `No pudimos guardar tu opinión. Inténtalo de nuevo.`

**Confirmación de borrado (AlertDialog)**
- Título: `¿Eliminar tu opinión?`
- Cuerpo: `Esta acción no se puede deshacer.`
- Botones: `Eliminar` · `Cancelar`

**Paginación**
- `Ver más opiniones`

---

## 11. Wishlist (guardar para despues)

### Proposito y ruta

- **Ruta principal de la vista:** `/dashboard/wishlist` (accesible tambien desde el dashboard como bloque "Guardados"). **Boton "Guardar":** vive en la pagina de curso (`/cursos/[slug]`) y en las tarjetas del catalogo (`/cursos`).
- **Sprint:** Sprint 3 (post-nucleo del aula; junto a dashboard y perfil).
- **Proposito:** permitir al estudiante marcar cursos de interes para retomarlos despues, sin fricciones. Objetivo del usuario: "guardo esto ahora, lo empiezo cuando tenga tiempo" y luego "encuentro rapido lo que aparte".

### Layout (wireframe)

```
+--------------------------------------------------------------------------+
|  Dashboard  >  Guardados                                    [ Avatar ]   |
+--------------------------------------------------------------------------+
|                                                                          |
|  GUARDADOS                                          (label mono)         |
|  Tus cursos guardados                               (Bricolage h1)       |
|  3 cursos guardados                                 (text-muted)         |
|                                                                          |
|  +------------------------------------------------------------------+    |
|  | [ thumb 16:9 ]  Curso de Claude Code            [ Bookmark ●  ]  |    |
|  |                 RUTA: CLAUDE DESDE CERO   (mono badge)           |    |
|  |                 4.7 * · 705 opiniones · 3h 20m                   |    |
|  |                 [ Ver curso ]                     [ Quitar ]     |    |
|  +------------------------------------------------------------------+    |
|  +------------------------------------------------------------------+    |
|  | [ thumb 16:9 ]  Prompt Engineering Practico     [ Bookmark ●  ]  |    |
|  |                 RUTA: CLAUDE DESDE CERO                          |    |
|  |                 4.8 * · 512 opiniones · 2h 05m                   |    |
|  |                 [ Ver curso ]                     [ Quitar ]     |    |
|  +------------------------------------------------------------------+    |
|                                                                          |
+--------------------------------------------------------------------------+
```

Boton "Guardar" en la pagina de curso (contexto):

```
+---------------------------------------------+
|  Curso de Claude Code            (h1)        |
|  4.7 * · 705 opiniones                       |
|  [ Empezar curso ]   [ ⌘ Bookmark  Guardar ] |
+---------------------------------------------+
```

**Movil:** las tarjetas pasan a 1 columna full-width. El thumbnail va arriba (16:9), el contenido debajo. "Ver curso" es boton primario full-width; "Quitar" queda como boton icono (bookmark relleno) en la esquina superior derecha de la tarjeta. En la pagina de curso, el boton "Guardar" se coloca junto a "Empezar curso" en una barra que puede fijarse al fondo (sticky) en viewports pequenos.

### Componentes

| Bloque UI | Primitive shadcn / libreria | Notas |
|---|---|---|
| Contenedor de cada curso guardado | `Card` (+ `CardHeader`/`CardContent`/`CardFooter`) | 1 card por curso |
| Boton "Guardar / Guardado" | `Button` variant `outline` (pagina curso) o `ghost` icon (card) | icono `Bookmark` / `BookmarkCheck` (lucide) |
| Boton "Quitar" | `Button` variant `ghost` con `AlertDialog` opcional de confirmacion | icono `Trash2` o `BookmarkX` |
| Badge de ruta | `Badge` variant `outline`, texto mono en mayusculas | ej. "RUTA: CLAUDE DESDE CERO" |
| Rating / opiniones | texto + icono `Star` (lucide, filled) | no interactivo aqui |
| Placeholder de carga | `Skeleton` | 3 cards skeleton |
| Estado vacio | `Card` o bloque centrado + `Button` | ilustracion/icono `Bookmark` grande |
| Feedback agregar/quitar | `Sonner` (`toast`) | con accion "Deshacer" |
| Tooltip en boton icono | `Tooltip` | "Guardar curso" / "Quitar de guardados" |

### Contenido y datos

Cada item de la wishlist muestra:

- `course.title` — ej. "Curso de Claude Code".
- `course.thumbnail_url` — imagen 16:9 del curso.
- `course.path_name` — ruta a la que pertenece, ej. "Claude desde Cero" (badge mono).
- `course.rating` + `course.reviews_count` — ej. "4.7" y "705 opiniones".
- `course.duration` — duracion total, ej. "3h 20m".
- `course.slug` — para navegar a `/cursos/[slug]`.
- `wishlist_item.saved_at` — timestamp; usado para ordenar (mas reciente primero) y opcional "Guardado hace 2 dias".
- `course.is_enrolled` (matricula iAcademy) — si ya esta matriculado, el CTA dice "Continuar" en vez de "Ver curso".

**Origen conceptual:** endpoint DRF `GET /api/wishlist/` devuelve los cursos guardados del usuario (JWT). Toggle con `POST /api/wishlist/{course_id}/` y `DELETE /api/wishlist/{course_id}/`. El estado guardado/no-guardado de la pagina de curso viene de `course.is_saved` en la respuesta del detalle del curso.

### Estados

| Estado | Comportamiento |
|---|---|
| **Default (boton no guardado)** | Icono `Bookmark` (contorno), label "Guardar". |
| **Default (boton guardado)** | Icono `BookmarkCheck` (relleno, color `--accent`), label "Guardado". |
| **Loading vista** | 3 `Skeleton` cards (thumb + 2 lineas + botones). Nunca spinner. |
| **Loading toggle (optimista)** | El icono cambia de inmediato; si el request falla, revierte y muestra toast de error. Boton `disabled` durante el request (~<300ms) para evitar doble click. |
| **Vacio (empty)** | Ningun curso guardado: icono `Bookmark` grande + titulo + subtexto + CTA "Explorar cursos". |
| **Error de carga** | Mensaje + `Button` "Reintentar". |
| **Ultimo item quitado** | Al quitar el ultimo, la vista transiciona al empty state (con fade). |
| **No autenticado** | El boton "Guardar" redirige a login (guardar la intencion y ejecutar el toggle al volver). |
| **Curso ya no disponible** | Si un curso guardado deja de existir/publicarse: card en estado atenuado con etiqueta "No disponible" y solo boton "Quitar". |
| **Curso ya matriculado** | CTA cambia a "Continuar"; opcional badge "Ya matriculado". |

### Interacciones y micro-interacciones

- **Toggle guardar (pagina curso):** click alterna `Bookmark` ↔ `BookmarkCheck`. Micro-animacion de "pop" sutil del icono al rellenarse (`scale 1 → 1.15 → 1`, ~150ms), respetando `prefers-reduced-motion` (sin animacion, cambio instantaneo).
- **Toast al guardar (Sonner):** "Guardado en tu lista" con accion "Deshacer".
- **Toast al quitar (Sonner):** "Curso quitado de guardados" con accion "Deshacer" (re-agrega via POST).
- **Quitar desde la vista:** la card sale con fade + colapso de altura (~200ms); si "Deshacer", reaparece en su posicion.
- **Hover en card:** elevacion sutil (`--surface` → `--surface-raised`), borde `--border` mas visible; el boton "Quitar" puede aparecer en hover en desktop (siempre visible/accesible en touch).
- **Focus:** anillo de foco visible en todos los botones y en la card enlazada.
- **Click en thumbnail o titulo:** navega a `/cursos/[slug]`.
- **Confirmacion:** quitar no requiere `AlertDialog` (accion reversible via toast "Deshacer"); mantenerlo ligero.

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| **Movil (≥375px)** | 1 columna. Thumb 16:9 arriba, contenido debajo. "Ver curso" full-width. "Quitar" como icono en esquina superior derecha de la card. Boton "Guardar" de la pagina de curso puede ir en barra sticky inferior junto a "Empezar curso". |
| **Tablet (≥768px)** | 1 o 2 columnas de cards; layout horizontal dentro de la card (thumb izquierda, contenido derecha). |
| **Desktop (≥1024px)** | Contenedor centrado (~max 960-1080px), cards horizontales. Boton "Quitar" visible en hover; "Ver curso" tamano normal alineado a la izquierda del footer de la card. |

### Accesibilidad

- **Botones icono con `aria-label`:** "Guardar curso" / "Quitar de guardados"; el label cambia segun estado (`aria-pressed` en el toggle de guardar).
- **Estado comunicado:** `aria-pressed="true|false"` en el boton bookmark para lectores de pantalla; el icono no es la unica senal (tambien texto "Guardado").
- **Foco visible:** anillo de foco (`focus-visible`) con contraste AA en todos los interactivos.
- **Orden de tabulacion:** por card, de arriba a abajo: enlace del curso → "Ver curso" → "Quitar".
- **Teclado:** todo operable con `Tab`/`Enter`/`Space`; el toast de Sonner es alcanzable y su accion "Deshacer" enfocable.
- **Anuncios:** toasts como `role="status"` (`aria-live="polite"`) para confirmar guardar/quitar sin robar foco.
- **Headings:** `h1` "Tus cursos guardados"; titulo de cada curso como `h2` (o enlace dentro de heading). Contador ("3 cursos guardados") como texto, no heading.
- **Contraste:** rating/estrellas y texto muted cumplen AA sobre fondo oscuro.

### Copy de ejemplo (espanol)

**Titulos y encabezados**
- Label mono: `GUARDADOS`
- H1: `Tus cursos guardados`
- Contador: `3 cursos guardados` · singular: `1 curso guardado`

**Botones**
- No guardado: `Guardar`
- Guardado: `Guardado`
- CTA card: `Ver curso` / `Continuar` (si matriculado)
- Quitar: `Quitar`
- Empty CTA: `Explorar cursos`
- Error: `Reintentar`

**Toasts (Sonner)**
- Al guardar: `Guardado en tu lista` — accion: `Deshacer`
- Al quitar: `Curso quitado de guardados` — accion: `Deshacer`
- Error toggle: `No pudimos guardar el curso. Intenta de nuevo.`

**Estado vacio**
- Titulo: `Aun no has guardado cursos`
- Subtexto: `Guarda los cursos que te interesan para retomarlos cuando quieras. Busca el icono de marcador en cada curso.`
- CTA: `Explorar cursos`

**Estado de error (carga)**
- Titulo: `No pudimos cargar tus guardados`
- Subtexto: `Revisa tu conexion e intenta de nuevo.`
- CTA: `Reintentar`

**Microcopy**
- Tooltip guardar: `Guardar curso`
- Tooltip quitar: `Quitar de guardados`
- Badge ruta: `RUTA: CLAUDE DESDE CERO`
- Curso no disponible: `Este curso ya no esta disponible`
- Timestamp opcional: `Guardado hace 2 dias`

---

## 12. Certificado de finalización

### Propósito y ruta

- **Ruta:** `/aula/claude-code/certificado` (alias directo desde `/aula/claude-code` al alcanzar 100%). El certificado individual descargable vive en `/certificados/[folio]` (vista compartible/verificable dentro de iAcademy).
- **Sprint:** Sprint 3 (cierre del curso, progreso y gamificación de finalización).
- **Propósito:** Cerrar la experiencia con un momento de logro sobrio y entregar la prueba tangible de finalización. El objetivo del usuario aquí es **ver, descargar y verificar** su certificado del "Curso de Claude Code".

### Layout (wireframe)

```
+--------------------------------------------------------------------------+
|  < Volver al curso                                iAcademy · Claude       |
+--------------------------------------------------------------------------+
|                                                                          |
|             CURSO COMPLETADO   (mono, tracking, text-muted)              |
|             Tu certificado está listo   (Display / Bricolage)           |
|             "Del primer prompt a producción"  (Serif italic)            |
|                                                                          |
|   +==================================================================+   |
|   |  [iAcademy]                              FOLIO · IAC-CC-2026-4821 |   |
|   |                                                                  |   |
|   |  CERTIFICADO DE FINALIZACIÓN   (mono label, tracking)            |   |
|   |                                                                  |   |
|   |  Otorgado a                                                      |   |
|   |  María Fernanda Him           (Display 700, grande, -0.03em)     |   |
|   |                                                                  |   |
|   |  por completar el curso                                          |   |
|   |  Curso de Claude Code · Ruta "Claude desde Cero"                 |   |
|   |                                                                  |   |
|   |  8 horas            30 de junio de 2026        iAcademy · Panamá |   |
|   |  ────────           ─────────────────          ──────────────── |   |
|   |  Duración           Fecha de emisión           Emitido por      |   |
|   +==================================================================+   |
|                                                                          |
|     [ Descargar PDF ]   [ Ver certificado ]                              |
|                                                                          |
|     [icon ShieldCheck] Verifica su autenticidad en                       |
|     iacademy.com.pa/verificar/IAC-CC-2026-4821                           |
|                                                                          |
|     También lo encontrarás en "Mis certificados".                        |
+--------------------------------------------------------------------------+
```

**Móvil:** una sola columna. La lámina del certificado pasa a proporción vertical (o mantiene ratio y hace scroll horizontal interno con `overflow-x-auto` para no deformar el texto). El bloque de acciones se apila full-width y queda **sticky** al fondo (`Descargar PDF` arriba). Los tres metadatos (Duración / Fecha / Emitido por) pasan de fila a stack vertical.

### Componentes

| Bloque UI | Primitive shadcn / recurso | Nota |
|---|---|---|
| Header con retorno | `Button` (variant `ghost`) + icono `ArrowLeft` | "Volver al curso" |
| Eyebrow "CURSO COMPLETADO" | Texto mono (no primitive) / `Badge` opcional | mayúsculas + tracking 0.18em |
| Titular + subtítulo serif | Tipografía (Display + Instrument Serif italic) | — |
| Lámina del certificado | `Card` (`surface-raised`, borde `--border`) | Render server-side; se muestra como `<img>`/HTML embebido |
| Logo iAcademy | `<Image>` (next/image) | esquina superior izquierda |
| Chip de folio | `Badge` (variant `secondary`) | mono, `IAC-CC-2026-4821` |
| Acción primaria | `Button` (default, acento `#D97757`) + `Download` | CTA principal |
| Acción secundaria | `Button` (variant `outline`) + `Eye` | abre visor |
| Visor de certificado | `Dialog` | vista grande del PDF/imagen |
| Verificación | Link (`#4169E1`) + icono `ShieldCheck` | URL de verificación |
| Modal de celebración | `Dialog` | dispara al completar última lección |
| Confirmaciones | `Sonner` (toast) | descarga/errores |
| Carga | `Skeleton` | lámina + acciones |
| Tooltips en iconos | `Tooltip` | botones de icono en el visor |

### Contenido y datos

| Campo | Ejemplo | Origen conceptual |
|---|---|---|
| Nombre del estudiante | María Fernanda Him | Perfil de usuario iAcademy (JWT) |
| Curso | Curso de Claude Code | Modelo `Curso` |
| Ruta | Claude desde Cero | Modelo `Ruta` |
| Duración | 8 horas | Suma de lecciones (`Curso.duracion_horas`) |
| Fecha de emisión | 30 de junio de 2026 | Timestamp al alcanzar progreso 100% |
| Folio | IAC-CC-2026-4821 | Generado por backend al emitir |
| Emitido por | iAcademy · Panamá | Constante de marca |
| URL de verificación | iacademy.com.pa/verificar/IAC-CC-2026-4821 | Derivada del folio |
| PDF | `.../certificado.pdf` | Generado en DRF (server-side) |

- Endpoint: `GET /api/cursos/claude-code/certificado` → `{ elegible, folio, nombre, fecha_emision, pdf_url, verify_url }`. Gate: `matriculado === true && progreso === 100`.

### Estados

- **Default (elegible + emitido):** lámina completa con datos reales y acciones activas.
- **Loading (skeleton):** `Skeleton` con la silueta de la lámina (bloque grande) + dos barras para las acciones. Nunca spinner de página.
- **Curso no completado (progreso < 100):** lámina **bloqueada/atenuada** con overlay, candado (`Lock`) y `Progress` mostrando el % actual. CTA "Continuar el curso". No permite descargar.
- **No matriculado:** sin acceso a la ruta. Mensaje "Este certificado pertenece a un curso que no tienes disponible" + CTA a catálogo/soporte.
- **Empty (sin certificados en "Mis certificados"):** estado vacío con icono `Award`, texto guía y CTA a la ruta.
- **Error de carga:** no se pudo obtener el certificado → mensaje + botón "Reintentar".
- **Error al generar PDF:** el botón vuelve a estado activo + toast de error; se mantiene la opción "Ver certificado".
- **Generando PDF (transitorio):** botón `disabled` con label "Generando PDF..." e indicador inline sutil (no bloquea la página).

### Interacciones y micro-interacciones

- **Momento de celebración:** al marcar completa la última lección, se abre un `Dialog` sobrio (sin emojis):

```
+--------------------------------------------+
|              [icon CheckCircle2]           |
|          Completaste el curso              |  (Display)
|   Curso de Claude Code · Claude desde Cero |
|                                            |
|   Tu certificado ya está disponible.       |
|                                            |
|   [ Ver mi certificado ]   Seguir aquí     |
+--------------------------------------------+
```
  - Entrada con fade + scale suave (150–200ms). Un realce mínimo (línea/acento cálido), **sin confeti festivo**; si se anima algo decorativo, respeta `prefers-reduced-motion` y se desactiva. El verde de éxito solo en el ícono de check.
- **Descargar PDF:** click → toast Sonner "Preparando tu descarga..."; al resolver, se dispara la descarga y toast de éxito. Si falla, toast de error con acción "Reintentar".
- **Ver certificado:** abre `Dialog` con la lámina ampliada; cierre con Esc, botón X o click fuera.
- **Verificación:** el link abre la URL de verificación en nueva pestaña (`rel="noopener"`).
- **Hover/focus:** botones con transición de fondo/borde (~120ms); anillo de foco visible con `--accent`.
- **Copiar folio (opcional):** click en el chip de folio copia el número → toast "Folio copiado".

### Responsive

| Breakpoint | Comportamiento |
|---|---|
| **≥375px (móvil)** | Columna única; lámina en ratio vertical o con scroll horizontal interno; acciones apiladas full-width y sticky abajo; metadatos en stack. |
| **Tablet (≥768px)** | Lámina centrada con márgenes; acciones en fila; metadatos en fila de 3. |
| **Desktop (≥1024px)** | Lámina centrada (máx ~880–960px), titular y subtítulo con más aire; acciones en fila bajo la lámina. |

- Áreas táctiles ≥44px. La lámina nunca deforma la tipografía en móvil (mejor scroll que squish).

### Accesibilidad

- **Headings:** `h1` = "Tu certificado está listo"; la lámina usa jerarquía interna coherente sin romper el orden.
- **Foco visible:** anillo `--accent` (contraste AA) en todos los interactivos, incluida la lámina si es enfocable.
- **ARIA en botones de icono:** `aria-label="Descargar certificado en PDF"`, `aria-label="Ver certificado ampliado"`, `aria-label="Verificar autenticidad"`, `aria-label="Volver al curso"`.
- **Modal de celebración:** `role="dialog"` con `aria-modal`, foco atrapado, `aria-labelledby` al título; retorna el foco al cerrar; cerrable con Esc.
- **Orden de tabulación:** Volver → acción primaria (Descargar) → secundaria (Ver) → verificación → "Mis certificados".
- **Imagen del certificado:** `alt` descriptivo: "Certificado de finalización del Curso de Claude Code a nombre de María Fernanda Him".
- **Estado bloqueado:** el candado no depende solo del color; texto explícito del % restante.
- **Motion:** toda animación decorativa respeta `prefers-reduced-motion: reduce`.

### Copy de ejemplo (español)

- **Eyebrow:** `CURSO COMPLETADO`
- **Titular:** `Tu certificado está listo`
- **Subtítulo (serif italic):** `Del primer prompt a producción`
- **Lámina:**
  - `CERTIFICADO DE FINALIZACIÓN`
  - `Otorgado a`
  - `por completar el curso`
  - `Curso de Claude Code · Ruta "Claude desde Cero"`
  - Labels: `Duración` · `Fecha de emisión` · `Emitido por`
- **Botones:** `Descargar PDF` · `Ver certificado` · `Volver al curso` · `Continuar el curso`
- **Verificación:** `Verifica su autenticidad en iacademy.com.pa/verificar/IAC-CC-2026-4821`
- **Nota bajo acciones:** `También lo encontrarás en "Mis certificados".`
- **Modal de celebración:**
  - `Completaste el curso`
  - `Tu certificado ya está disponible.`
  - Botones: `Ver mi certificado` · `Seguir aquí`
- **Estado no completado:** `Aún no completas el curso. Vas 72%. Termina la última lección para desbloquear tu certificado.`
- **Estado no matriculado:** `Este certificado pertenece a un curso que no tienes disponible.`
- **Empty (Mis certificados):** `Todavía no tienes certificados. Completa un curso para obtener el primero.`
- **Toasts (Sonner):**
  - Cargando: `Preparando tu descarga...`
  - Éxito: `Descarga lista.`
  - Error: `No pudimos generar tu PDF. Intenta de nuevo.`
  - Copiar folio: `Folio copiado.`
- **Error de carga:** `No pudimos cargar tu certificado.` + botón `Reintentar`

---

## 13. Estados transversales (loading, vacío, error)

Estados reutilizables para toda la app. Regla base: **carga → Skeleton** (nunca spinner genérico), **sin datos → empty-state**, **fallo → error boundary con Reintentar**. Todo en español, sin emojis, iconos `lucide-react`.

---

### 13.1 Componente reutilizable `<EmptyState />`

Un único primitive para todos los vacíos y placeholders. Evita duplicar layouts.

```tsx
<EmptyState
  icon={FolderOpen}          // lucide component
  title="Aún no hay rutas"
  description="Cuando iAcademy publique rutas de Claude, aparecerán aquí."
  action={{ label: "Explorar catálogo", href: "/catalogo" }}  // opcional
  variant="default"          // "default" | "error" | "placeholder"
/>
```

**Anatomía / layout**

```
┌──────────────────────────────────────────┐
│                                          │
│                 ◇ (icono)                │  ← 40px, en círculo surface-raised
│                                          │
│            Título (headline)             │  ← Bricolage 600, text-headline
│      Descripción en dos líneas máx.      │  ← Geist 400, text-muted, max-w-[42ch]
│                                          │
│           [  CTA principal  ]            │  ← Button, opcional
│                                          │
└──────────────────────────────────────────┘
```

| Prop | Tipo | Notas |
|---|---|---|
| `icon` | `LucideIcon` | Se renderiza en contenedor 64px (`rounded-full`, `bg-surface-raised`, icono 24-28px `text-muted`). |
| `title` | `string` | Obligatorio. |
| `description` | `string` | Obligatorio. `text-muted`, `max-w-[42ch]`, centrado. |
| `action` | `{label, href?, onClick?}` | Opcional. Mapea a `Button` (default `variant="default"`, error `variant="outline"`). |
| `secondaryAction` | idem | Opcional, `variant="ghost"`. |
| `variant` | enum | `default` neutral, `error` icono en tono error, `placeholder` icono `accent-warm`. |

**Reglas visuales**
- Contenedor centrado vertical/horizontal: `flex flex-col items-center justify-center text-center gap-4 py-16 px-6`.
- Nunca ocupa menos que el alto del área que reemplaza (evita saltos de layout).
- Sin ilustraciones pesadas: solo icono lucide en círculo. Estética editorial con aire.
- CTA opcional; si no hay acción posible, se omite (no poner botones muertos).

---

### 13.2 Skeletons por componente

Usar `Skeleton` de shadcn (`animate-pulse`, `bg-surface-raised`, `rounded`). Respetar `prefers-reduced-motion`: si está activo, el pulse se desactiva y queda color estático. Cada skeleton **replica las proporciones reales** del componente para cero layout shift (CLS≈0).

#### a) Card de ruta (grid de rutas)

Proporción real: card `rounded-xl`, banner 16:9 arriba, texto debajo.

```
┌───────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← banner 16:9  (aspect-video, rounded-lg)
├───────────────────────────┤
│ ▓▓▓▓▓▓▓▓▓  (badge)        │ ← h-5  w-24
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │ ← título h-6 w-3/4
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← desc  h-4 w-full
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓             │ ← desc  h-4 w-2/3
│ ▓▓▓▓▓ ▓▓▓▓▓  (meta)      │ ← h-4 w-16 ×2
└───────────────────────────┘
```
Cantidad por defecto: **3-6 cards** (mismo grid que el real). Gap y padding idénticos al componente.

#### b) Card de curso (dentro de una ruta / catálogo)

```
┌────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ▓▓▓▓▓▓▓▓▓▓▓▓ │
│  thumb 16:9     │ ▓▓▓▓▓▓▓▓▓    │ ← título h-5 w-2/3
│  (w-40)         │ ▓▓▓▓▓▓▓▓▓▓▓▓ │ ← meta   h-4 w-1/2
│                 │ ▓▓▓▓ ▓▓▓▓    │ ← ★ + duración
└────────────────────────────────┘
```
En mobile (<640px) el layout es vertical: thumb 16:9 full-width arriba, texto debajo. El skeleton sigue el mismo breakpoint.

#### c) Player de video (aula)

```
┌──────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← aspect-video 16:9, rounded-lg
│▓▓▓▓▓▓▓▓▓▓▓▓  ◇ (play)  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    icono play centrado, text-muted
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└──────────────────────────────────────┘
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ← título lección h-7 w-1/2
  ▓▓▓▓ ▓▓▓▓ ▓▓▓▓             ← meta (módulo · duración) h-4
```
Ancho central real 960-1080px. El bloque 16:9 reserva la altura exacta del iframe Vimeo para no empujar el contenido al cargar.

#### d) Lista de reseñas

Repetir **3 filas**. Cada fila:

```
◯  ▓▓▓▓▓▓▓▓▓        ← Avatar (h-10 w-10 rounded-full) + nombre h-4 w-32
   ▓▓▓▓▓  (★★★★★)   ← estrellas h-4 w-24
   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ← texto h-4 w-full
   ▓▓▓▓▓▓▓▓▓▓       ← texto h-4 w-2/3
```
Encabezado del bloque (rating promedio) también con skeleton: `h-8 w-40` + `h-4 w-56`.

#### e) Sidebar de lección (temario)

Header (título curso + progreso) y luego **6-8 ítems** de lección.

```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ← título curso h-5 w-40
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← Progress bar h-2 w-full
─────────────────────
 ◇  ▓▓▓▓▓▓▓▓▓▓▓▓     ← check icon + label lección h-4 w-32
 ◇  ▓▓▓▓▓▓▓▓▓▓       ← h-4 w-24
 ◇  ▓▓▓▓▓▓▓▓▓▓▓▓▓    ← h-4 w-36
 ...
```

**Resumen de proporciones clave**

| Skeleton | Aspect/tamaño crítico | Repeticiones |
|---|---|---|
| Card de ruta | banner `aspect-video`, card `rounded-xl` | 3-6 |
| Card de curso | thumb `aspect-video` w-40 (desktop) | 4-8 |
| Player video | `aspect-video`, 960-1080px | 1 |
| Lista reseñas | avatar 40px + 3-4 líneas texto | 3 |
| Sidebar lección | Progress h-2 + ítems h-4 | 6-8 |

---

### 13.3 Empty states (copy exacto)

Todos usan `<EmptyState>`. Icono lucide indicado.

| Contexto | Icono lucide | Título | Descripción | CTA (label → destino) |
|---|---|---|---|---|
| Sin rutas | `Route` | Aún no hay rutas disponibles | Cuando iAcademy publique rutas de Claude, las verás aquí. | Explorar catálogo → `/catalogo` |
| Sin cursos en una ruta | `Layers` | Esta ruta todavía no tiene cursos | Estamos preparando el contenido. Vuelve pronto para empezar. | Ver otras rutas → `/rutas` |
| Sin lecciones (curso) | `PlayCircle` | El curso aún no tiene lecciones | El contenido se está montando. Te avisaremos cuando esté listo. | Volver al curso → `/curso/[slug]` |
| Sin recursos (tab Recursos) | `Paperclip` | Esta lección no tiene recursos | No hay archivos ni enlaces para descargar en esta lección. | *(sin CTA)* |
| Sin código (tab Código) | `Code2` | No hay fragmentos de código | Esta lección no incluye código de ejemplo. | *(sin CTA)* |
| Sin transcripción (tab) | `FileText` | Transcripción no disponible | Esta lección todavía no tiene transcripción. | *(sin CTA)* |
| Sin reseñas | `MessageSquare` | Todavía no hay reseñas | Sé de los primeros en completar el curso y compartir tu opinión. | *(sin CTA)* |
| Wishlist vacía | `Bookmark` | Tu lista de guardados está vacía | Guarda cursos que quieras ver más tarde y aparecerán aquí. | Explorar catálogo → `/catalogo` |
| Búsqueda sin resultados | `SearchX` | Sin resultados para tu búsqueda | Prueba con otras palabras o revisa el catálogo completo. | Limpiar búsqueda → `onClick` reset |
| Progreso vacío ("Mis cursos") | `GraduationCap` | Aún no has empezado ningún curso | Elige un curso disponible para ti y empieza cuando quieras. | Ver cursos disponibles → `/mis-cursos` |

---

### 13.4 Placeholders especiales

Usan `<EmptyState variant="placeholder">` **dentro** del bloque que reemplazan (p. ej. el área 16:9 del player), no como página completa.

| Placeholder | Dónde | Icono lucide | Título | Descripción | CTA |
|---|---|---|---|---|---|
| Video próximamente | Área 16:9 del player | `Clock` | Video próximamente | Esta lección estará disponible muy pronto. | *(sin CTA)* |
| Quiz próximamente | Nodo de tipo quiz en el temario | `HelpCircle` | Quiz próximamente | Las evaluaciones llegarán en una próxima actualización. | Continuar con la lección → siguiente lección |
| No matriculado | Curso/lección bloqueada | `Lock` | Este curso no está disponible para ti | Tu matrícula de iAcademy no incluye este curso por ahora. | Ver cursos disponibles → `/mis-cursos` |
| Contenido bloqueado (secuencial) | Lección con prerequisito | `Lock` | Completa la lección anterior | Termina la lección previa para desbloquear esta. | Ir a la lección anterior → lección previa |

Notas:
- El placeholder **Video próximamente** conserva `aspect-video` y borde del player para no romper el layout.
- **No matriculado**: el copy nunca menciona pagar, tarjeta, plan ni precio (regla de negocio del MVP).
- El icono `Lock` va en `text-muted`, no en rojo (no es un error, es un estado normal de acceso).

---

### 13.5 Error states / Error boundary

Dos niveles: **inline** (falla un fetch de una sección) y **página completa** (error boundary de ruta).

**Inline (sección, ej. lista de reseñas o cards)** — `<EmptyState variant="error">`:

```
        ◇  (AlertTriangle, text-muted)
   No pudimos cargar esta sección
 Revisa tu conexión e inténtalo de nuevo.
        [ Reintentar ]   (outline)
```

**Página completa (error boundary `error.tsx` / `global-error.tsx`)**:

```
┌──────────────────────────────────────────┐
│                                          │
│         ◇  (CloudOff, 28px)              │
│                                          │
│        Algo salió mal                    │
│  Ocurrió un error inesperado. Puedes     │
│  reintentar o volver al inicio.          │
│                                          │
│   [ Reintentar ]   [ Ir al inicio ]      │
│                                          │
│   Código de error: 500  (text-muted,     │
│                          mono, xs)       │
└──────────────────────────────────────────┘
```

| Escenario | Icono lucide | Título | Descripción | Acciones |
|---|---|---|---|---|
| Error de carga inline | `AlertTriangle` | No pudimos cargar esta sección | Revisa tu conexión e inténtalo de nuevo. | Reintentar (retry local) |
| Error boundary (página) | `CloudOff` | Algo salió mal | Ocurrió un error inesperado. Puedes reintentar o volver al inicio. | Reintentar (`reset()`) · Ir al inicio (`/`) |
| Fallo de red / offline | `WifiOff` | Sin conexión | No detectamos conexión a internet. Reconéctate para continuar. | Reintentar |
| Video no disponible (Vimeo error) | `VideoOff` | No se pudo cargar el video | Hubo un problema con el reproductor. Vuelve a intentarlo. | Reintentar (recarga iframe) |
| 404 (ruta/curso inexistente) | `Compass` | No encontramos esta página | El curso o la página que buscas no existe o fue movida. | Volver al inicio → `/` |
| 403 (sin permiso, no matrícula) | `Lock` | No tienes acceso a este contenido | Este contenido no está disponible para tu cuenta. | Ver cursos disponibles → `/mis-cursos` |

**Reglas de error**
- Botón primario siempre **"Reintentar"** cuando la acción es recuperable (mapea a `Button variant="outline"` en inline, `variant="default"` en página completa).
- El botón "Reintentar" muestra estado `loading` (spinner en el botón, `disabled`) mientras reejecuta; el error de red NO usa Skeleton (el Skeleton es solo para carga inicial).
- Feedback complementario con **Sonner** solo para errores de acción del usuario (ej. "No se pudo guardar en tu lista. Reintenta."), no para errores de carga de página.
- Toast de error: `toast.error("No se pudo completar la acción. Inténtalo de nuevo.")` — rojo funcional únicamente.
- Nunca exponer stack traces ni mensajes en inglés al usuario. El "Código de error" es opcional y solo un número/estado corto en mono `text-muted`.

---

### 13.6 a11y de estados transversales

- **Skeletons**: contenedor con `aria-busy="true"` y `aria-live="polite"`; los bloques `Skeleton` son decorativos (`aria-hidden`). Al terminar la carga, se anuncia el contenido real.
- **Empty / placeholder**: el icono es decorativo (`aria-hidden="true"`); título como `role="heading"` (nivel apropiado según jerarquía de la página).
- **Error**: contenedor `role="alert"` para que el lector de pantalla anuncie el fallo de inmediato. Botón "Reintentar" con `aria-label` claro si el texto visible no basta.
- **Foco**: en error boundary de página, mover el foco al encabezado del error al montar. En "Reintentar", devolver el foco al contenido recuperado.
- **prefers-reduced-motion**: desactiva el `animate-pulse` de los Skeletons (queda color sólido) y cualquier transición de aparición del empty/error.
- Contraste AA garantizado: `text-headline` sobre `surface` y `text-muted` cumplen ≥4.5:1; iconos de error en `text-muted` + título textual (no depender solo del color para el significado).

---

## 14. Accesibilidad, responsive y micro-interacciones

### Accesibilidad (WCAG AA, meta Lighthouse >95)

**Contraste**
- Pares aprobados sobre `--bg`/`--surface`: `--text-headline` (#F6F3ED) y `--text-body` (#B8B5AE) cumplen AA. `--text-muted` (#78756D) solo para texto ≥18px o no esencial (metadatos, timestamps), nunca para labels de formulario ni errores.
- CTA naranja #D97757: usar texto `--bg` (#0B0B0C) encima, no blanco puro sin verificar. Enlaces azul #4169E1: subrayado + no depender solo del color.
- Estados de foco/error/exito NUNCA se comunican solo por color: acompañar con icono lucide + texto.

**Foco visible**
- `:focus-visible` con anillo de 2px `--accent` (#DAD5CA) + offset 2px sobre todos los interactivos (Button, Tabs trigger, links, checkmarks de temario, controles del player). Contraste del anillo ≥3:1 contra el fondo.
- Nunca `outline: none` sin reemplazo. Radix/shadcn ya gestionan `focus-visible`; respetarlo.

**ARIA y semantica**
| Elemento | Requisito |
|---|---|
| Botones de icono (menu, cerrar Sheet, play/pause, mute) | `aria-label` en espanol ("Abrir temario", "Silenciar video") — sin texto visible |
| Tabs (Transcripcion/Recursos/Codigo) | Radix Tabs ya emite `role="tablist"/"tab"/"tabpanel"` + `aria-selected`; conservar |
| Progreso del curso | `Progress` con `aria-valuenow/min/max` y `aria-label="Avance del curso: 45%"` |
| Checkmark de leccion completada | `aria-label="Leccion completada"`; pendiente `aria-label="Leccion no completada"` |
| Quiz | `fieldset`+`legend` por pregunta, opciones como `radiogroup`; feedback con `aria-live="polite"` |
| Toasts (Sonner) | `role="status"` / `aria-live` (ya incluido); no usar toast como unico canal de errores criticos |
| Player Vimeo (iframe) | `title` descriptivo: `title="Video: <nombre de la leccion>"` |
| Skeletons | `aria-hidden="true"` + contenedor con `aria-busy="true"` |

**Navegacion por teclado**
- Tabs: `←/→` cambian tab, `Home/End` a extremos (Radix nativo).
- Temario: lista navegable con `Tab`; `Enter/Espacio` abre leccion. En movil, al abrir Sheet el foco entra al panel y queda atrapado (focus trap de Radix); `Esc` cierra y devuelve foco al disparador.
- Quiz: opciones seleccionables con flechas + `Espacio`; boton "Comprobar" alcanzable por `Tab`.
- Player: controles nativos de Vimeo son navegables; no interceptar `Espacio`/flechas cuando el foco esta dentro del iframe.
- Orden de tabulacion logico: skip-link "Saltar al contenido" al inicio → apuntando al `<main>` del video.

**Estructura**
- Un solo `<h1>` por vista (titulo de la leccion o del curso). Jerarquia sin saltos (h1→h2→h3).
- `<html lang="es">`. `alt` real en imagenes de contenido; `alt=""` en decorativas.
- Landmarks: `<nav>` (temario), `<main>` (video/contenido), `<aside>` (tabs derecha).
- Objetivos tactiles ≥44x44px en movil.

### Breakpoints y responsive

Mobile-first, usable desde 375px. Alineado a los defaults de Tailwind v4.

| Breakpoint | Ancho | Temario (sidebar) | Layout aula | Player | Grillas (dashboard) |
|---|---|---|---|---|---|
| Base / `sm` | 375–767px | Oculto; se abre en **Sheet** (izq.) via boton "Temario" | 1 columna, apilado: player → tabs abajo | 16:9 full-width (100vw − padding) | 1 columna |
| `md` | 768–1023px | Sidebar colapsable (drawer inline) o Sheet; puede iniciar oculto | 2 zonas: temario opcional + contenido | 16:9, ~720px max | 2 columnas |
| `lg` | 1024–1279px | Sidebar fijo visible (~280px) | 3 columnas: temario / video / tabs (tabs pueden ir bajo el video) | 16:9, ~880px | 2–3 columnas |
| `xl` | ≥1280px | Sidebar fijo (~320px) | 3 columnas plenas: temario 320 / video 960–1080 / tabs 320–360 | 16:9, 960–1080px centrado | 3–4 columnas |

**Comportamientos clave**
- **Temario en movil = Sheet** (shadcn `Sheet`, lado izquierdo), disparado por boton con icono `PanelLeft`/`Menu` + label "Temario". Muestra progreso (%) en el header del Sheet.
- Columna derecha (Transcripcion/Recursos/Codigo): en `<lg` pasa a **Tabs full-width debajo del video**; no se pierde contenido.
- El player mantiene relacion **16:9** en todos los tamaños (`aspect-video`); nunca recortar ni distorsionar.
- Header/nav: en movil, acciones secundarias colapsan en menu; el titulo de la leccion se trunca con `line-clamp-1` y `title` completo.
- Tablas de recursos → en movil se vuelven lista de tarjetas (Card) apiladas.
- Sin scroll horizontal en 375px. Padding lateral: 16px base, 24px `md`, 32px+ `lg`.

### Micro-interacciones y motion

Sobriedad editorial. Duraciones cortas, easing suave, sin rebotes llamativos.

**Tokens de motion sugeridos**
- Duracion: 120–200ms (hover/press), 200–280ms (cambios de panel/tab). Easing: `ease-out` (entrada), `ease-in-out` (transiciones de estado).
- Solo animar `opacity` y `transform` (rendimiento + Lighthouse). Evitar animar `width/height/top`.

**Estados interactivos**
| Interaccion | Comportamiento |
|---|---|
| Hover (Button, Card, item temario) | Elevacion sutil: fondo pasa a `--surface-raised`, transicion 150ms; cursor pointer |
| Active/press | Escala 0.98 + fondo un paso mas oscuro; feedback inmediato (~100ms) |
| Focus-visible | Anillo `--accent` (ver a11y); sin transicion de aparicion (debe ser instantaneo) |
| Cambio de tab | Contenido con fade+slide de 8px (200ms); el indicador subrayado del tab se desliza (Radix) |
| Leccion en curso | Item del temario resaltado con barra lateral `--accent-warm` |
| Check de completado | `Check` de lucide aparece con escala 0.8→1 + fade (200ms), color verde de exito solo en el icono; opcional trazo de tick |
| Toast (Sonner) | Entra desde abajo/derecha con slide+fade; auto-dismiss 4s; exito=verde, error=rojo, solo en icono/borde |
| Skeleton | Shimmer lento (`animate-pulse` de Tailwind), sin destellos bruscos |
| Progreso (%) | Barra transiciona su `transform: scaleX` de valor previo a nuevo (280ms `ease-out`) |
| Player hover | Controles de Vimeo (nativos); no re-implementar |

**Copy de micro-feedback (ejemplos)**
- Leccion completada (toast): `Leccion completada. Avanzaste al 45%.`
- Recurso descargado (toast): `Descarga iniciada.`
- Quiz correcto (inline): `Correcto.` / incorrecto: `Revisa la leccion antes de continuar.`
- Error de carga de video (inline, no solo toast): `No pudimos cargar el video. Reintentar.`
- Sin recursos (empty en tab): `Esta leccion no tiene recursos descargables.`

**prefers-reduced-motion (obligatorio)**
- Con `@media (prefers-reduced-motion: reduce)`: desactivar slides, escalas, shimmer y auto-scroll. Sustituir por cambios instantaneos de `opacity` (≤1 frame) o sin animacion.
- Reemplazar el `animate-pulse` del Skeleton por estado estatico atenuado.
- Toasts siguen apareciendo/desapareciendo, pero sin desplazamiento (solo fade o instantaneo).
- Nunca condicionar una funcion al fin de una animacion: la accion (marcar completado, cambiar tab) ocurre de inmediato aunque el motion este desactivado.

---

## 15. Inventario de componentes y entregables para Claude Design

### (a) Inventario de componentes

Cada componente se mapea a un primitive de shadcn/ui. Si un componente compone varios primitives, se lista el primitive raiz y entre parentesis los secundarios. Convencion de nombres: kebab-case, prefijo por dominio (`path-`, `course-`, `lesson-`).

| Componente | Descripcion | Primitive shadcn base | Pantallas donde se usa |
|---|---|---|---|
| `learning-path-card` | Tarjeta de la ruta "Claude desde Cero": titulo, subtitulo serif italic, badge de nivel, barra de progreso agregada y CTA "Continuar/Empezar". | `Card` (+ `Badge`, `Progress`, `Button`) | Home del estudiante, catalogo de rutas |
| `learning-path-header` | Encabezado editorial de la ruta: titulo display, kicker mono en mayusculas, meta (N cursos, N horas), estrellas y % de avance global. | `div` semantico (+ `Badge`, `Progress`, `star-rating`) | Detalle de ruta |
| `path-course-list` | Lista ordenada de cursos de la ruta con estado por curso (bloqueado, disponible, en progreso, completado) y checkmark. | `Card` en lista (+ `Badge`, iconos `Lock`/`Check`/`Play`) | Detalle de ruta |
| `course-tabs` | Navegacion por tabs de la ficha de curso: Descripcion \| Temario \| Resenas \| Recursos. | `Tabs` | Detalle de curso |
| `course-reviews` | Bloque de resenas: promedio ("4.7 estrellas - 705 opiniones"), distribucion por estrellas y lista de opiniones con avatar. | `Card` (+ `Avatar`, `star-rating`, `Separator`) | Detalle de curso (tab Resenas) |
| `review-form` | Formulario para dejar resena: seleccion de estrellas + textarea + enviar. Solo visible si el curso esta completado. | `Dialog` o inline `Card` (+ `Textarea`, `Button`, `star-rating`) | Detalle de curso, fin de curso |
| `star-rating` | Control de estrellas reutilizable. Dos modos: solo lectura (display) e interactivo (input, con teclado). | `div` con `role="radiogroup"` (input) / `role="img"` (lectura), iconos `Star`/`StarHalf` | course-reviews, review-form, learning-path-header, headers de curso |
| `lesson-player` | Contenedor del video Vimeo 16:9 (~960-1080px) con titulo de leccion, barra de progreso de la leccion y controles propios minimos (marcar completada, anterior/siguiente). | `AspectRatio` + `iframe` Vimeo (+ `Button`, `Progress`) | Aula (reproductor) |
| `lesson-tabs` | Columna derecha del aula: Transcripcion \| Recursos \| Codigo. Codigo con bloque mono y boton copiar. | `Tabs` (+ `ScrollArea`, `Button` copiar, `Tooltip`) | Aula |
| `lesson-sidebar` | Sidebar izquierdo con temario del curso, modulos colapsables, checkmarks por leccion y % de avance del curso. En movil se abre como panel. | `Accordion` dentro de `Sheet` (movil) / aside (desktop) (+ `Progress`, iconos `Check`/`Play`/`Lock`) | Aula |
| `lesson-comments` | Hilo de preguntas/comentarios de la leccion (sin timestamp): avatar, autor, texto, fecha, respuestas y campo para escribir. | `Card` (+ `Avatar`, `Textarea`, `Button`, `Separator`) | Aula (bajo el video) |
| `wishlist-button` | Boton toggle "Guardar" para marcar interes en cursos/rutas aun no iniciados. Estados on/off con icono. | `Button` (variant ghost/outline) + icono `Bookmark`/`BookmarkCheck` (+ `Tooltip`) | Catalogo, detalle de curso, detalle de ruta |
| `empty-state` | Bloque generico de estado vacio: icono, titulo, texto de apoyo y CTA opcional. Usado en resenas vacias, comentarios vacios, guardados vacios, sin cursos. | `Card` o `div` centrado (+ icono lucide, `Button`) | Transversal |
| `skeletons` | Placeholders de carga por pantalla (tarjeta, header de ruta, lista de cursos, player, tabs, lista de resenas/comentarios). Nunca spinners. | `Skeleton` | Transversal |
| `quiz-card` | Tarjeta de evaluacion al final de un modulo/curso: pregunta, opciones seleccionables, feedback correcto/incorrecto y resultado. | `Card` (+ `RadioGroup`, `Button`, `Badge`, `Alert` para feedback) | Aula (fin de modulo), fin de curso |
| `certificate-card` | Tarjeta de certificado obtenido: estado (bloqueado hasta completar / disponible), preview, boton descargar/ver. | `Card` (+ `Badge`, `Button`, icono `Award`) | Fin de curso, perfil del estudiante |
| `student-nav` | Navegacion del estudiante: topbar con logo iAcademy, buscador, avatar/menu; en el aula se reduce a barra minima. Movil: `Sheet` lateral. | `NavigationMenu` / topbar + `Sheet` (movil) (+ `Avatar`, `DropdownMenu`, `Input` buscador) | Todas las pantallas |

Notas de mapeo:
- Los estados por item (bloqueado/disponible/en progreso/completado) se expresan con `Badge` + icono lucide consistente: `Lock`, `Play`, `Check`, `CheckCircle2`.
- Toda accion destructiva o de confirmacion usa `Dialog`; toda navegacion contextual en movil usa `Sheet`.
- Feedback efimero (guardado, resena enviada, error de red) usa Sonner (toast), no bloques inline persistentes.

### (b) Entregables esperados de Claude Design

**1. Pantallas clave (desktop y movil, cada una en sus estados relevantes):**

| # | Pantalla | Desktop | Movil (375px) | Estados a incluir |
|---|---|---|---|---|
| 1 | Home del estudiante | Si | Si | cargando (skeleton), con rutas, vacio |
| 2 | Detalle de ruta ("Claude desde Cero") | Si | Si | cargando, avance parcial, todo completado |
| 3 | Detalle de curso (con `course-tabs`) | Si | Si | cargando, disponible, ya matriculado, cada tab |
| 4 | Aula / reproductor (player + sidebar + tabs) | Si | Si | cargando, reproduciendo, leccion completada, error de video |
| 5 | Resenas + `review-form` | Si | Si | con resenas, vacio, enviando, ya reseñado |
| 6 | Quiz | Si | Si | sin responder, respondido correcto, incorrecto, resultado final |
| 7 | Fin de curso + `certificate-card` | Si | Si | certificado bloqueado, disponible |
| 8 | Guardados / wishlist | Si | Si | con items, vacio |

**2. Estados transversales a documentar** (por cada pantalla que aplique):
- Carga: composicion de `skeletons` especifica, no spinner.
- Vacio: `empty-state` con copy real.
- Error: mensaje inline y/o toast Sonner, con accion de reintento.
- Bloqueado / sin acceso: variante que muestra "disponible para ti" vs. bloqueado (sin lenguaje de pago).
- Foco y hover de elementos interactivos (visibles y con contraste AA).

**3. Tokens y foundations (design system entregable):**
- Paleta en tokens (los `--bg`, `--surface`, `--text-*`, `--accent`, `--border`, acentos `#D97757`/`#4169E1`, verde/rojo funcionales) mapeados a variables de Tailwind v4 y a los tokens semanticos de shadcn (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, etc.).
- Escala tipografica por familia: Display (Bricolage Grotesque), Sans (Geist), Mono (Geist Mono), Serif (Instrument Serif italic), con pesos, tamanos, line-height y letter-spacing (titulares -0.02/-0.03em; labels mono tracking 0.12-0.22em).
- Espaciado, radios y elevaciones (surface / surface-raised) como escala.
- Estados de componente (default/hover/focus/active/disabled) y patron de motion respetando `prefers-reduced-motion`.
- Set de iconos lucide-react usados, con su significado semantico fijo.

### (c) Checklist de aceptacion del diseno

Un diseño se acepta solo si cumple TODO lo siguiente:

- [ ] Todo el texto esta en espanol; no hay ningun emoji en UI ni en copy.
- [ ] Cada pantalla clave se entrega en desktop y en movil, usable desde 375px (mobile-first, sin scroll horizontal).
- [ ] Cada elemento interactivo esta mapeado a un primitive de shadcn/ui existente; no se introducen librerias de UI nuevas.
- [ ] Los estados de carga usan `skeletons` con la forma del contenido real, nunca spinners genericos.
- [ ] Cada lista/coleccion tiene definido su estado vacio (`empty-state`) y su estado de error con reintento.
- [ ] Todos los estados de acceso usan lenguaje de matricula ("Disponible para ti" / "Bloqueado"); no aparece "pagar", "tarjeta", "plan", "precio" ni checkout.
- [ ] La paleta respeta la estetica monocromatica warm-neutral oscura; los acentos `#D97757` y `#4169E1` se usan solo para significado (CTA/dato-enlace), no como relleno.
- [ ] Las cuatro familias tipograficas se usan segun su rol (display en titulares, serif italic en acentos editoriales, mono para labels en mayusculas/codigo/terminal, Geist para cuerpo).
- [ ] Contraste texto/fondo cumple WCAG AA (>=4.5:1 en cuerpo, >=3:1 en texto grande y componentes); foco visible en todo elemento interactivo.
- [ ] `star-rating` interactivo, `quiz-card` y navegacion son operables por teclado y tienen roles/labels ARIA correctos.
- [ ] Los iconos lucide-react usan un unico significado por icono en todo el producto.
- [ ] El video Vimeo se presenta en 16:9 (~960-1080px en desktop) con iframe accesible (titulo) y sin romper el layout en movil.
- [ ] El diseño armoniza con la plataforma iAcademy pero luce "tech" y moderno, no academia tradicional.
- [ ] El motion es sobrio y con proposito, con variante que respeta `prefers-reduced-motion`.
- [ ] Objetivo de calidad alineado a Lighthouse >95 (jerarquia clara, tap targets >=44px, sin dependencias visuales solo-color).

### Como esta organizado este brief

Este brief va de lo general a lo concreto: primero el contexto de producto, usuarios y alcance del MVP; luego la identidad visual (tokens, tipografia, motion) y las reglas de UI obligatorias; despues las especificaciones pantalla por pantalla (home, ruta, curso, aula, resenas, quiz, certificado) con su layout, contenido, estados, interacciones, responsive, copy y a11y. Esta seccion 15 cierra el documento como indice operativo: consolida todos los componentes en un unico inventario, define que artefactos esperamos de Claude Design y fija el checklist con el que se valida la entrega. Recomendacion de lectura para el diseñador: leer identidad visual y reglas de UI, recorrer las secciones de pantallas, y volver aqui para confirmar cobertura de componentes, entregables y criterios de aceptacion antes de dar por terminado cada diseño.

---

## Anexo — Decisiones a confirmar con negocio

Estas decisiones se tomaron como default en §0 para desbloquear el diseño; conviene confirmarlas:

- **Instructor del curso:** mock usa "Andrés Rodríguez"; VISION deja placeholder "por confirmar".
- **Profundidad de gamificación:** se fijó "ligera" (franja + insignias, sin catálogo ni celebración). Confirmar si se quiere más o menos.
- **Marca del look:** dirección oscura warm-neutral del deck (recomendada) a reconciliar con los tokens vivos de iAcademy.
- **Rótulo del curso:** "Curso de Claude Code" vs "Claude desde Cero" (ruta). VISION §6 lo deja pendiente.

_Documento generado a partir del planning en `.plan/`. Editable; los cánones (§0) son el contrato de consistencia._
