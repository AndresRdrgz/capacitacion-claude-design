"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

const TOTAL = 4;
const STORAGE_KEY = "claude-design-deck-slide";

// useLayoutEffect warns during SSR/prerender; fall back to useEffect on the
// server. The scale must run before paint on the client to avoid a flash of
// the unscaled 1920x1080 canvas.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Deck() {
  // Deterministic for SSR — server and first client render both show slide 0.
  const [current, setCurrent] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Navigation — functional updaters so listeners can bind once and never go stale.
  const go = useCallback(
    (n: number) => setCurrent(Math.max(0, Math.min(TOTAL - 1, n))),
    [],
  );
  const next = useCallback(
    () => setCurrent((c) => (c < TOTAL - 1 ? c + 1 : c)),
    [],
  );
  const prev = useCallback(() => setCurrent((c) => (c > 0 ? c - 1 : c)), []);

  // Fit the fixed 1920x1080 canvas into the viewport. iOS Safari fires
  // visualViewport.resize (but not window.resize) when the URL bar moves.
  const scale = useCallback(() => {
    const vv = window.visualViewport;
    const w = (vv && vv.width) || window.innerWidth;
    const h = (vv && vv.height) || window.innerHeight;
    const s = Math.min(w / 1920, h / 1080);
    if (canvasRef.current) {
      canvasRef.current.style.transform = `scale(${s})`;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      (document.documentElement.requestFullscreen || function () {}).call(
        document.documentElement,
      );
    } else {
      (document.exitFullscreen || function () {}).call(document);
    }
  }, []);

  // Restore persisted slide AFTER mount (no localStorage on the server).
  useEffect(() => {
    try {
      const stored = parseInt(
        window.localStorage.getItem(STORAGE_KEY) ?? "",
        10,
      );
      if (!isNaN(stored) && stored >= 0 && stored < TOTAL) {
        // Hydration-safe restore: the server renders slide 0, then we sync to
        // the persisted slide after mount. The one extra render is intentional
        // and unavoidable for SSR correctness.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrent(stored);
      }
    } catch {
      /* storage unavailable (private mode) — stay at 0 */
    }
    setHydrated(true);
  }, []);

  // Persist on change, but only after the initial read, so the default 0
  // never clobbers the stored value.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(current));
    } catch {
      /* ignore */
    }
  }, [current, hydrated]);

  // Enable the slide crossfade one frame AFTER the localStorage restore commits,
  // so a returning visitor lands on their stored slide instantly instead of
  // watching slide 0 fade into it.
  useEffect(() => {
    if (!hydrated) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [hydrated]);

  // Scale wiring: initial fit before paint + resize / visualViewport / fonts.
  useIsomorphicLayoutEffect(() => {
    scale();
    window.addEventListener("resize", scale);
    const vv = window.visualViewport;
    if (vv) vv.addEventListener("resize", scale);

    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) scale();
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", scale);
      if (vv) vv.removeEventListener("resize", scale);
    };
  }, [scale]);

  // Keyboard navigation — global listener (no element needs focus).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(TOTAL - 1);
          break;
        case "0":
          go(0);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev, go, toggleFullscreen]);

  // Click halves: left = prev, right = next. Faithful to the original, which
  // splits on window.innerWidth (browser center, not canvas center).
  const onStageClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const mid = window.innerWidth / 2;
      if (e.clientX < mid) prev();
      else next();
    },
    [next, prev],
  );

  // Dot click — stopPropagation is load-bearing: it blocks the stage handler.
  const onDotClick = useCallback(
    (e: MouseEvent<HTMLDivElement>, i: number) => {
      e.stopPropagation();
      go(i);
    },
    [go],
  );

  const slideClass = (i: number) => `slide${i === current ? " active" : ""}`;

  return (
    <>
      <div id="stage" onClick={onStageClick}>
        <div id="canvas" ref={canvasRef} className={ready ? "ready" : undefined}>
          {/* SLIDE 1 — COVER */}
          <section className={slideClass(0)} id="s1" aria-label="Portada">
            {/* eslint-disable-next-line @next/next/no-img-element -- single static
                logo in a presentation deck; next/image adds no value here */}
            <img className="cover-logo" src="/iacademy-logo.png" alt="iAcademy" />
            <div className="cover-body">
              <h1 className="cover-title">Bootcamp</h1>
              <p className="cover-sub">
                Del diseño a producción con{" "}
                {/* eslint-disable-next-line @next/next/no-img-element -- inline brand logo */}
                <img className="claude-logo" src="/claude-logo.svg" alt="Claude" />
              </p>
              <hr className="accent-line cover-rule" />
            </div>
            <div className="cover-credit">
              <div className="name">Andrés Rodríguez · Capacitador</div>
              <div className="date">Junio 2026</div>
            </div>
            <div className="ghost-number">01</div>
          </section>

          {/* SLIDE 2 — QUÉ ESPERAR */}
          <section className={slideClass(1)} id="s2" aria-label="Qué esperar">
            <header>
              <h2 className="slide-header">Qué esperar</h2>
              <p className="slide-subheader">El resultado de esta sesión</p>
            </header>
            <div className="outcomes">
              <div className="outcome">
                <div className="num">01</div>
                <div>
                  <div className="o-title">Diseñar una aplicación real</div>
                  <div className="o-desc">
                    Usar Claude Design para producir un artefacto visual.
                  </div>
                </div>
              </div>
              <div className="outcome">
                <div className="num">02</div>
                <div>
                  <div className="o-title">Entender el sistema de diseño</div>
                  <div className="o-desc">
                    Colores, tipografía, tokens: cómo se vuelve código.
                  </div>
                </div>
              </div>
              <div className="outcome">
                <div className="num">03</div>
                <div>
                  <div className="o-title">Del diseño a producción</div>
                  <div className="o-desc">
                    Convertir el artefacto en código desplegable.
                  </div>
                </div>
              </div>
              <div className="outcome">
                <div className="num">04</div>
                <div>
                  <div className="o-title">Vercel como destino</div>
                  <div className="o-desc">
                    Preview, deploy, dominio: el ciclo completo.
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-indicator">02 / 04</div>
          </section>

          {/* SLIDE 3 — AGENDA */}
          <section className={slideClass(2)} id="s3" aria-label="Lo que veremos">
            <header>
              <h2 className="slide-header">Lo que veremos</h2>
              <p className="slide-subheader">Seis bloques, un flujo</p>
            </header>
            <div className="agenda-grid">
              <div className="agenda-item">
                <div className="a-num">1</div>
                <div>
                  <div className="a-title">
                    Qué es Claude Design y por qué importa
                  </div>
                  <div className="a-sub">El punto de partida</div>
                </div>
              </div>
              <div className="agenda-item">
                <div className="a-num">2</div>
                <div>
                  <div className="a-title">
                    El flujo de trabajo: brief → variantes → artefacto
                  </div>
                  <div className="a-sub">De la idea a algo tangible</div>
                </div>
              </div>
              <div className="agenda-item">
                <div className="a-num">3</div>
                <div>
                  <div className="a-title">
                    Sistema de diseño y tokens: la gramática del código
                  </div>
                  <div className="a-sub">Diseño que se traduce solo</div>
                </div>
              </div>
              <div className="agenda-item">
                <div className="a-num">4</div>
                <div>
                  <div className="a-title">Del artefacto al código (handoff)</div>
                  <div className="a-sub">El puente a producción</div>
                </div>
              </div>
              <div className="agenda-item">
                <div className="a-num">5</div>
                <div>
                  <div className="a-title">Vercel: preview, deploy, dominio</div>
                  <div className="a-sub">Publicar de verdad</div>
                </div>
              </div>
              <div className="agenda-item">
                <div className="a-num">6</div>
                <div>
                  <div className="a-title">
                    Claude Code: el copiloto de programación
                  </div>
                  <div className="a-sub">Iterar con ayuda</div>
                </div>
              </div>
            </div>
            <div className="slide-indicator">03 / 04</div>
          </section>

          {/* SLIDE 4 — CIERRE */}
          <section className={slideClass(3)} id="s4" aria-label="Empezamos">
            <h2 className="close-headline">Empezamos</h2>
            <p className="close-sub">Vamos a diseñar y desplegar juntos</p>
            <hr className="accent-line close-rule" />
            <div className="prereqs">
              <div className="prereq-col">
                <h3>Necesitas</h3>
                <ul role="list">
                  <li>Cuenta en claude.ai (plan Pro)</li>
                  <li>Navegador moderno</li>
                  <li>Ganas de iterar</li>
                </ul>
              </div>
              <div className="prereq-col">
                <h3>Opcional pero útil</h3>
                <ul role="list">
                  <li>Node.js 18+ instalado</li>
                  <li>Claude Code CLI instalado</li>
                  <li>Cuenta en Vercel (plan Hobby)</li>
                </ul>
              </div>
            </div>
            <div className="close-credit">
              Andrés Rodríguez · andresrodriguez.tech
            </div>
            <div className="slide-indicator">04 / 04</div>
          </section>
        </div>
      </div>

      <div id="dots">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className={`dot${i === current ? " active" : ""}`}
            data-index={i}
            onClick={(e) => onDotClick(e, i)}
          />
        ))}
      </div>
    </>
  );
}
