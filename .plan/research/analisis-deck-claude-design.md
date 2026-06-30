# Análisis del deck actual "capacitacion-claude-design"

> **Fecha**: 2026-06-30
> **Para**: entender qué tenemos hoy y qué se puede reusar para el MVP

---

## Estado actual

El repo `capacitacion-claude-design` contiene un **deck estático de 4 slides** (no una plataforma):

```
capacitacion-claude-design/
├── app/
│   ├── layout.tsx       # Bricolage Grotesque + Geist + Instrument Serif
│   ├── page.tsx         # renderiza <Deck />
│   └── globals.css      # 1000 líneas, tokens monocromáticos warm-neutral
├── components/
│   └── Deck.tsx         # 4 slides, navegación teclado + click + dots + F
├── public/              # assets del deck
├── vercel.json          # deploy estático
└── package.json         # Next 16, React 19
```

**Deploy actual**: https://capacitacion-claude.vercel.app

### Las 4 slides

1. **Portada** — "Claude Design · Del diseño a producción" + crédito del capacitador (Andrés)
2. **Qué esperar** — 4 outcomes de la sesión
3. **Lo que veremos** — Agenda de 6 bloques
4. **Empezamos** — Cierre + requisitos

**Audiencia original**: personal de iAcademy, nivel básico-intermedio, sesión presencial/deck.

---

## Lo que se reusa

### ✅ Aporta valor al MVP

- **El branding/marca**: la estética monocromática warm-neutral es elegante y reusable
- **La narrativa de "del diseño a producción"**: copy que puede ser el "mini-curso introductorio" antes del curso completo
- **Los assets visuales** (logos, iconos en `/public/`): reutilizables en la landing de la ruta
- **El deploy a Vercel**: ya sabes que funciona

### ❌ NO se reusa (es estático, no escalable)

- La navegación entre slides es un truco JS — no es lo que necesita el MVP
- El state es local (localStorage) — no sincroniza con nada
- No hay API, no hay auth, no hay progreso persistido en DB
- Las 4 slides son contenido fijo en el código fuente

---

## Decisión: ¿qué hacer con el deck actual?

**Opciones consideradas**:

1. **Archivar el deck y empezar el MVP en `iAcademy/`** ← recomendada
2. **Convertir el deck en la landing de la ruta** — reescribir como página de marketing
3. **Mantener el deck vivo y construir el MVP aparte** — fragmentación

**Razones para opción 1**:
- El deck cumplió su objetivo original (capacitación interna)
- El MVP es una plataforma que se mantiene en `iAcademy/`
- El deck puede quedar como `/legacy/deck` con un redirect a la nueva ruta
- No mezclamos dos codebases con el mismo nombre

**Plan**:
- ✅ Este repo (`capacitacion-claude-design/`) se queda como **repositorio de planning del MVP** (no como código de la plataforma)
- ✅ El código del MVP va al repo `iAcademy/`
- ✅ El deck se mantiene accesible en su URL actual, con un banner "Esto es un preview obsoleto, mira la nueva ruta en iAcademy"
- 🔄 (Post-MVP) Evaluar si la URL `capacitacion-claude.vercel.app` se reasigna a un landing de marketing

---

## De slides del deck → lecciones del MVP

Mapeo conceptual de lo que el deck cuenta y cómo se traduce al MVP:

| Slide del deck | Lección equivalente en el MVP |
|---|---|
| 1. Portada | `OnlineCourse` cover + sección "Bienvenida" |
| 2. Qué esperar | Sección "Lo que vas a aprender" en la landing del curso |
| 3. Lo que veremos (6 bloques) | `Section`s del curso (3 módulos en el MVP, expandir a 6 si hay tiempo) |
| 4. Empezamos | Lección "Bienvenida al curso" + requisitos |

**El deck es un "mini-curso" de 4 minutos. El MVP es un curso completo de 1h 30min.**

---

## Conclusión

El deck no es el MVP, pero el deck es la **semilla conceptual** del MVP. La marca, la narrativa y la audiencia están definidas. Lo que falta es la plataforma, y esa plataforma ya existe en iAcademy — solo hay que extenderla.
