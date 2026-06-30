# capacitacion-claude-design

> **Repositorio de planning del MVP "Curso de Claude Code" para iAcademy.**
> Este repo NO contiene el código de la plataforma. Contiene los documentos que orquestan el desarrollo.

---

## ⚠️ Estado actual: 2 cosas coexisten aquí

1. **El deck original** (capacitación interna, 4 slides) — sigue accesible en producción en https://capacitacion-claude.vercel.app
2. **La planificación del MVP** — los documentos en `.plan/` que guían el desarrollo de la plataforma

El código del MVP se desarrolla en el repo [AndresRdrgz/iAcademy](https://github.com/AndresRdrgz/iAcademy) (Django + Next.js + Vimeo).

---

## 🎯 El MVP en una línea

Lanzar el "Curso de Claude Code" como contenido pregrabado y self-paced dentro de la plataforma e-learning de iAcademy, accesible para cualquier estudiante matriculado.

**Sin pagos. Sin Stripe. Sin Yappy.** El acceso se gestiona por las matrículas existentes de iAcademy.

---

## 📚 Documentos clave

| Doc | Para qué sirve |
|---|---|
| [`.plan/VISION.md`](.plan/VISION.md) | La propuesta, los usuarios, las métricas, lo que NO se hace |
| [`.plan/ARCHITECTURE.md`](.plan/ARCHITECTURE.md) | Stack real, schema, flow de acceso, endpoints |
| [`.plan/SPRINT-BACKLOG.md`](.plan/SPRINT-BACKLOG.md) | Los 4 sprints con criterios de "done" |
| [`.plan/sprints/sprint-1-schema.md`](.plan/sprints/sprint-1-schema.md) | Sprint 1: extender schema de iAcademy |
| [`.plan/sprints/sprint-2-seed.md`](.plan/sprints/sprint-2-seed.md) | Sprint 2: cargar el curso en la DB |
| [`.plan/sprints/sprint-3-frontend.md`](.plan/sprints/sprint-3-frontend.md) | Sprint 3: hacer visible la ruta en el front |
| [`.plan/sprints/sprint-4-pulido.md`](.plan/sprints/sprint-4-pulido.md) | Sprint 4: reseñas, wishlist, a11y, testing |
| [`.plan/handoffs/handoff-1-schema.md`](.plan/handoffs/handoff-1-schema.md) | **Prompt listo para Claude Code: Sprint 1** |
| [`.plan/handoffs/handoff-2-seed.md`](.plan/handoffs/handoff-2-seed.md) | **Prompt listo para Claude Code: Sprint 2** |
| [`.plan/handoffs/handoff-3-frontend.md`](.plan/handoffs/handoff-3-frontend.md) | **Prompt listo para Claude Code: Sprint 3** |
| [`.plan/handoffs/handoff-4-pulido.md`](.plan/handoffs/handoff-4-pulido.md) | **Prompt listo para Claude Code: Sprint 4** |
| [`.plan/research/mercado-plataformas-edtech-panama.md`](.plan/research/mercado-plataformas-edtech-panama.md) | Estudio de mercado con 5 competidores + pricing |
| [`.plan/research/analisis-deck-claude-design.md`](.plan/research/analisis-deck-claude-design.md) | Qué hay en este repo y qué se reusa |
| [`docs/decisions/ADR-001-005.md`](docs/decisions/ADR-001-005.md) | 5 decisiones cerradas de arquitectura |

---

## 🤖 Flujo de trabajo con Claude Code

Para cada sprint:

1. **Andrés** lee el sprint plan (`.plan/sprints/sprint-N-...md`)
2. **Andrés** abre el handoff correspondiente (`.plan/handoffs/handoff-N-...md`)
3. **Andrés** corre a Claude Code con el handoff:
   ```bash
   cd /Users/andresrodriguez/Documents/GitHub/iAcademy
   git checkout -b feat/claude-mvp-sprintN
   claude --permission-mode acceptEdits -p "$(cat /Users/andresrodriguez/Documents/GitHub/capacitacion-claude-design/.plan/handoffs/handoff-N-...md)" --max-turns 30
   ```
4. **Claude Code** trabaja, **NO** hace commit ni push
5. **Andrés** revisa el diff
6. Si está OK, **Andrés** hace commit + push + PR manualmente
7. **Andrés** mergea después de validar

---

## 🏗️ El deck original (sigue funcionando)

```
capacitacion-claude-design/
├── app/
│   ├── layout.tsx       # Bricolage Grotesque + Geist + Instrument Serif
│   ├── page.tsx
│   └── globals.css      # tokens monocromáticos warm-neutral
├── components/
│   └── Deck.tsx         # 4 slides con navegación
├── public/              # logos, iconos
└── vercel.json
```

**Audiencia original**: personal de iAcademy, nivel básico-intermedio.

### Desarrollo local del deck (sigue funcionando)

```bash
npm install
npm run dev      # http://localhost:3210
```

### Build y deploy del deck

```bash
npm run build    # sitio estático en ./out
```

Vercel detecta Next.js y sirve el export estático automáticamente.

---

## 🛣️ Roadmap visual

```
Sprint 0 (ahora)          Sprint 1           Sprint 2          Sprint 3           Sprint 4
─────────────────   ─────────────────   ──────────────   ────────────────   ──────────────
Planning en este   →  Schema + admin   →  Seed del      →  Frontend ruta   →  Reviews +
repo                   en iAcademy/         curso en DB      visible            wishlist +
(.plan/*)                                                           a11y
                                                                              Testing con
                                                                              usuarios
                                                                              reales

   📍 AQUÍ               1 semana            1 semana          1-2 semanas         1 semana
```

**Total**: 4-6 semanas para MVP funcional.

---

## 📦 Estructura del repo

```
capacitacion-claude-design/
├── README.md                    ← este archivo
├── CHANGELOG.md
├── .plan/                       ← documentación de planificación
│   ├── VISION.md
│   ├── ARCHITECTURE.md
│   ├── SPRINT-BACKLOG.md
│   ├── sprints/                 ← 4 sprints documentados
│   ├── handoffs/                ← 4 prompts listos para Claude Code
│   └── research/                ← estudios de mercado
├── docs/
│   └── decisions/               ← ADRs
├── app/                         ← el deck (legacy)
├── components/                  ← el deck (legacy)
├── public/                      ← assets del deck
├── package.json
├── next.config.ts
└── vercel.json
```

---

## 📝 Convenciones

- **Documentación**: español, tono directo, sin fluff
- **Decisiones cerradas**: viven en `docs/decisions/`, no se reabren
- **Cambios al plan**: PR a este repo, revisar antes de mergear
- **Handoffs para Claude Code**: copy-paste literal, no resumir
- **Métricas de éxito del MVP**: 50 estudiantes matriculados en 90 días

---

## 🔗 Links

- **Repo del código**: https://github.com/AndresRdrgz/iAcademy
- **Deck en producción**: https://capacitacion-claude.vercel.app
- **Estudio de mercado**: [`.plan/research/mercado-plataformas-edtech-panama.md`](.plan/research/mercado-plataformas-edtech-panama.md)

---

**Owner**: Andrés Rodríguez · 2026
