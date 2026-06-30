# Estudio de mercado: Plataformas edtech en Panamá (nicho Claude/IA)

> **Fecha**: 2026-06-30
> **Para**: input del MVP "Curso de Claude Code" en iAcademy
> **Status**: research viva, se actualiza al cierre del MVP

---

## TL;DR

- En Panamá y LATAM **no existe** una plataforma con contenido estructurado en español sobre Claude/Anthropic.
- La única oferta oficial de calidad es DeepLearning.AI + Anthropic: gratis, en inglés.
- Platzi y Crehana cubren IA general en español, pero no Claude específicamente.
- El público meta existe (developers panameños junior-mid + profesionales curious), pero es un mercado pequeño (~4.4M habitantes) → pensar regional desde el día 1.
- El modelo de negocio B2B (empresas comprando paquetes) es donde está el dinero real a mediano plazo.

---

## 1. Competidores principales (5)

### 1.1 DeepLearning.AI + Anthropic

- **URL**: https://www.deeplearning.ai/short-courses/
- **Cursos relevantes**: "Claude with the Anthropic API", "Building with the Anthropic API", "AI Fluency: Framework & Foundations"
- **Precio**: gratis (auditable)
- **Idioma**: inglés
- **Fortaleza**: contenido oficial de Anthropic, marca respetada
- **Debilidad**: solo inglés, formato "short course" (no ruta completa con proyectos)

### 1.2 Platzi

- **URL**: https://platzi.com
- **Precio**: Plan Experto ~$14-30 USD/mes, Expert+ con IA ~$30-45 USD/mes
- **Idioma**: español
- **Contenido IA**: Escuela de IA, LangChain, OpenAI, prompting
- **Fortaleza**: marca, comunidad hispanohablante masiva
- **Debilidad**: no tiene curso de Claude, contenido genérico de IA
- **Riesgo**: en 12-18 meses podrían lanzar su curso de Claude

### 1.3 Crehana

- **URL**: https://crehana.com
- **Precio**: ~$10-15 USD/mes
- **Idioma**: español (LATAM)
- **Contenido IA**: cursos sueltos de Midjourney, ChatGPT, Stable Diffusion
- **Fortaleza**: modelo freemium agresivo, buena producción
- **Debilidad**: cursos cortos, no rutas completas con proyectos
- **Riesgo**: baja, están más enfocados en diseño/creatividad

### 1.4 4Geeks Academy Panamá

- **URL**: https://4geeksacademy.co
- **Precio**: $3,000-6,000 USD por bootcamp (ISA disponible)
- **Idioma**: español
- **Contenido**: full-stack, full-time (16-18 semanas)
- **Fortaleza**: presencia local, mentorías
- **Debilidad**: no enseña Claude, precio prohibitivos para muchos

### 1.5 Anthropic Docs + Prompt Library

- **URL**: https://docs.anthropic.com
- **Precio**: gratis
- **Idioma**: inglés (técnico)
- **Fortaleza**: fuente oficial
- **Debilidad**: no es un curso, no es didáctico, no hay ejercicios

---

## 2. Hallazgos del mercado panameño

### 2.1 Instituciones educativas con programas de IA

| Institución | Oferta IA | Notas |
|---|---|---|
| UTP | Maestría en IA (semipresencial) | Pública, accesible |
| Universidad de Panamá | Diplomados en ciencia de datos | Lenta adopción de IA |
| INCAE | MBAs con módulos de IA | Premium, bilingüe |
| USMA | Ing. en Sistemas con electivos | Católica, media-alta |
| ULACIT | Partnerships con Coursera | Orientada a negocios |

### 2.2 Comunidades tech

- **Panama AI** (meetup.com): activa, eventos mensuales en CdP
- **AI Panamá** (LinkedIn): comunidad profesional
- **Panama Tech / Ciudad del Saber**: eventos periódicos
- **PyData Panamá, Panamá JS**: meetups técnicos

### 2.3 Iniciativas gubernamentales

- **Senacyt**: becas para maestrías tech (incluyendo IA)
- **INADEH**: cursos técnicos gratis (oportunidad B2G)
- **MITRADEL**: programas de recualificación

---

## 3. Modelo de negocio (validado para LATAM)

### Pricing tiers (referencias)

| Tier | Precio | Benchmark |
|---|---|---|
| Free (lead magnet) | $0 | Coursera audit, Crehana free |
| Pro mensual | $19-29 USD/mes | Coursera Plus, ZTM |
| Pro anual | $149-249 USD/año | Platzi, Crehana |
| Curso único | $79-149 USD | Domestika, Scrimba |
| Cohorte con mentor | $499-999 USD | Le Wagon, 4Geeks |
| B2B team | $399-999 USD/mes | Ironhack for Teams |

### Para el MVP de iAcademy

**Decisión**: no usamos pricing público. El acceso se controla por la matrícula existente de iAcademy (legacy system). Esto evita:
- Costos de pasarela de pagos
- Cumplimiento PCI
- Necesidad de facturación
- Complejidad de autenticación separada

**Pricing implícito** (lo que paga un estudiante por la matrícula en iAcademy para acceder a la ruta Claude): a definir por el equipo comercial de iAcademy. No es responsabilidad del MVP técnico.

---

## 4. UX/UI — patrones a copiar

### 4.1 Estructura de navegación (Platzi, Scrimba, Coursera)

- **Sidebar izquierdo fijo (240-320px)**: módulos colapsables, checklist de progreso, % de avance
- **Centro**: video player ancho máximo ~960-1080px, ratio 16:9
- **Derecha (opcional desktop)**: tabs (Transcripción | Recursos | Código | Discusión)
- **Top bar**: breadcrumb + "Marcar como completo" + tiempo restante

### 4.2 Video player (patrón de mercado)

- Tabs debajo: Transcripción buscable, recursos, código del proyecto
- Auto-advance al siguiente video (toggleable)
- Marcadores interactivos (click en transcripción salta al punto)
- Velocidad + picture-in-picture
- **Caso sin `vimeo_id`**: placeholder con texto "Video próximamente"

### 4.3 Quizzes y proyectos

- **Quizzes inline** cada 5-10 min de video (patrón Brilliant, Codecademy) — para MVP, al final de cada módulo
- **Editor de código embebido** (Scrimba) — para MVP, el ejercicio es "sigue estos pasos y sube tu código"
- **Proyectos con entregable** (sandbox + feedback) — para MVP, entregar por GitHub link
- **Sandbox Claude en browser** — diferenciador futuro, NO MVP

### 4.4 Comunidad

- **Comentarios por timestamp** debajo del video (estilo YouTube) — para MVP, comentarios simples sin timestamp
- **Discord/foro** dedicado por cohorte — para MVP, los comentarios del lesson son suficientes
- **Sesiones live mensuales** de Q&A — post-MVP

---

## 5. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Anthropic lanza academia oficial en español | Media-alta (12-18 meses) | Alto | Ser la mejor opción en español, no la única. Comunidad + proyectos = ventaja |
| Coursera/Platzi agrega cursos de Claude en español | Media | Alto | Nicho hiper-específico + proyectos prácticos + iAcademy como marca local |
| Mercado pequeño si solo Panamá | Alta | Medio | Expandirse a Colombia, México, Costa Rica desde mes 6 (o cuando haya tracción) |
| Dependencia de la API de Anthropic | Baja (en el MVP no la usamos) | Bajo | N/A en MVP |
| Contenido se desactualiza rápido | Alta | Medio | Plan de actualización trimestral, documentar fecha de "model card" |
| Vimeo Pro se queda corto en storage | Baja (<100h/mes) | Bajo | Migrar a Bunny.net o Vimeo OTT si crece |

---

## 6. Pricing post-MVP (cuando se agregue pasarela)

Si en algún momento iAcademy decide vender la ruta Claude directamente al público (sin pasar por la matrícula legacy), el pricing sería:

| Plan | Precio | Incluye |
|---|---|---|
| **Free** | $0 | Primer módulo + 1 mini-proyecto |
| **Pro mensual** | $29 USD/mes | Acceso completo a la ruta, todos los cursos |
| **Pro anual** | $199 USD/año | $16.6/mes, ahorra 30% |
| **B2B team (5 seats)** | $399 USD/mes | Pro anual + dashboard de equipo + reportes |
| **Cohorte con mentor** | $499 USD | 6 semanas + mentor 1:1 + certificado |

**Métodos de pago en Panamá**:
- Tarjeta (Stripe)
- ACH/Yappy (integración manual o API no documentada)
- Transferencia bancaria (manual)

---

## 7. Métricas de validación del MVP (90 días)

| Métrica | Meta | Por qué importa |
|---|---|---|
| Estudiantes matriculados | 50 | Demanda real |
| Lecciones completadas (total) | 500 | Engagement |
| Quizzes aprobados | 100 | Comprensión real |
| Tasa de finalización | >40% | Calidad del curso |
| NPS | >8/10 | Satisfacción |
| Solicitudes de más cursos | >5 | Tracción |

**Go/no-go después del MVP**:
- ✅ **Go a Fase 2 (B2B)**: si se llega a 50+ estudiantes y al menos 3 empresas preguntan
- 🔄 **Iterar contenido**: si la tasa de finalización es <40%
- ❌ **Pivotar o cerrar**: si no se llega a 25 estudiantes en 90 días

---

## 8. Sources

- https://platzi.com/cursos/ (verificado 2026-06-30)
- https://domestika.org (verificado 2026-06-30)
- https://www.deeplearning.ai/short-courses/ (verificado 2026-06-30)
- https://docs.anthropic.com (verificado 2026-06-30)
- https://crehana.com (verificado 2026-06-30)
- https://4geeksacademy.co/panama/ (verificado 2026-06-30)
- https://meetup.com (Panama AI, AI Panamá)
- https://senacyt.gob.pa, https://inadeh.gob.pa (gobierno PA)
- Conversación con Andrés (2026-06-30) sobre estado actual de iAcademy
