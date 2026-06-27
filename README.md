# Claude Design · Del diseño a producción

Deck de capacitación interactivo (4 slides) sobre Claude Design y el flujo de diseño → código → deploy con Vercel. Construido con **Next.js (App Router)** y exportado como sitio estático.

## 🎯 Audiencia
Personal de iAcademy · nivel básico-intermedio.

## 📑 Slides
1. **Portada** — Título + crédito del capacitador
2. **Qué esperar** — 4 outcomes de la sesión
3. **Lo que veremos** — Agenda de 6 bloques
4. **Empezamos** — Cierre + requisitos

## ⌨️ Navegación
- `←` `→` `↑` `↓` `Space` `PageUp/Down` — siguiente / anterior
- `Home` / `End` — primera / última slide
- `0` — volver a la primera
- `F` — fullscreen
- Click en la mitad izquierda / derecha de la pantalla
- Click en los dots de paginación
- La posición se persiste en `localStorage`

## 🎨 Sistema de diseño
Paleta **monocromática** (warm-neutral) — la jerarquía se construye solo con luminosidad sobre un fondo casi negro `#0B0B0C`, con texto vellum `#F6F3ED` y acento gris cálido `#DAD5CA`. Tipografía servida con `next/font` (self-hosted): Bricolage Grotesque (display) · Geist (sans) · Instrument Serif (italic accents) · Geist Mono (metadata).

## 🛠️ Desarrollo local
Requiere Node.js `>=20.9.0`.

```bash
npm install
npm run dev      # http://localhost:3210
```

## 🚀 Build & deploy
```bash
npm run build    # genera el sitio estático en ./out
npx serve out    # preview local del artefacto estático
```
Vercel detecta Next.js automáticamente y sirve la exportación estática — sin configuración extra.

## 📦 Estructura
- `app/layout.tsx` — root layout, fuentes vía `next/font`, metadata
- `app/page.tsx` — server component que renderiza el deck
- `app/globals.css` — tokens de diseño + estilos del deck
- `components/Deck.tsx` — client component: markup de las 4 slides + navegación

---

Capacitación por **Andrés Rodríguez** · 2026
