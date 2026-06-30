# Changelog

Todas las novedades de este repositorio.

## [Unreleased] — 2026-06-30

### Added

- Repositorio convertido en **planning del MVP** del "Curso de Claude Code" para iAcademy
- `.plan/VISION.md` — propuesta, usuarios, métricas, anti-objetivos
- `.plan/ARCHITECTURE.md` — stack real, schema, flow de acceso, endpoints
- `.plan/SPRINT-BACKLOG.md` — los 4 sprints con criterios de done
- `.plan/sprints/` — detalle de cada sprint (1: schema, 2: seed, 3: frontend, 4: pulido)
- `.plan/handoffs/` — 4 prompts listos para delegar a Claude Code
- `.plan/research/` — estudio de mercado + análisis del deck
- `docs/decisions/ADR-001-005.md` — 5 decisiones cerradas de arquitectura
- README actualizado con el contexto del MVP

### Changed

- README raíz: ahora documenta el MVP, no solo el deck

### Notes

- El deck original sigue funcionando en https://capacitacion-claude.vercel.app
- El código del MVP se desarrolla en https://github.com/AndresRdrgz/iAcademy

---

## [2.0.0] — 2025

### Changed

- Migración del deck a Next.js 16 (App Router) + React 19
- Stack de fuentes migrado a `next/font` (Bricolage Grotesque, Geist, Instrument Serif, Geist Mono)
- Repositorio autocontenido en Next.js, listo para deploy estático

---

## [1.0.0] — 2025

### Added

- Deck estático de 4 slides: Portada, Qué esperar, Lo que veremos, Empezamos
- Navegación con teclado (flechas, Space, Home, End, F)
- Persistencia de posición en `localStorage`
- Deploy en Vercel

---

_Formato: [Keep a Changelog](https://keepachangelog.com/)_
