import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow, ROUTES } from "@/components/elearn/ui";
import {
  ArrowRightIcon,
  BookOpenIcon,
  HelpCircleIcon,
  ClockIcon,
  AwardIcon,
  TerminalIcon,
} from "@/components/elearn/icons";

export const metadata: Metadata = {
  title: "iAcademy · Claude desde cero — Del prompt a producción",
  description:
    "Aprende a usar Claude para diseñar, programar y desplegar software real, a tu propio ritmo. Curso self-paced de iAcademy.",
};

const STATS = [
  { icon: BookOpenIcon, value: "10", label: "Lecciones" },
  { icon: HelpCircleIcon, value: "3", label: "Quizzes" },
  { icon: ClockIcon, value: "~1h 30m", label: "Duración" },
  { icon: AwardIcon, value: "Sí", label: "Certificado" },
];

const MODULES = [
  {
    n: "01",
    title: "Fundamentos de Claude",
    desc: "Qué es Claude y Claude Code, y cómo escribir tu primer prompt efectivo.",
    meta: "4 lecciones · incluye quiz",
  },
  {
    n: "02",
    title: "Del diseño a la app",
    desc: "De un brief a un artefacto navegable con Claude Design, y de ahí a la pantalla.",
    meta: "3 lecciones · incluye quiz",
  },
  {
    n: "03",
    title: "A producción",
    desc: "De artefacto a código con Claude Code y despliegue en Vercel.",
    meta: "3 lecciones · incluye quiz",
  },
];

const TOOLS = [
  { src: "/tool-claude.svg", name: "Claude" },
  { src: "/tool-nextdotjs.svg", name: "Next.js" },
  { src: "/tool-postgresql.svg", name: "PostgreSQL" },
  { src: "/tool-github.svg", name: "GitHub" },
  { src: "/tool-vercel.svg", name: "Vercel" },
];

export default function LandingPage() {
  return (
    <>
      <style>{`
        .lp-hero{display:grid;grid-template-columns:1fr 420px;gap:64px;align-items:center;}
        .lp-modules{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .lp-tool{filter:brightness(0) invert(1);opacity:.55;transition:opacity 160ms ease-out;}
        .lp-tool:hover{opacity:.9;}
        .lp-cta-final{display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}
        @media (max-width:900px){
          .lp-hero{grid-template-columns:1fr;gap:40px;}
          .lp-modules{grid-template-columns:1fr;}
        }
      `}</style>

      {/* Header público */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          borderBottom: "1px solid var(--border-default)",
          background: "color-mix(in srgb, var(--surface-default) 88%, transparent)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 17,
              color: "var(--text-headline)",
              letterSpacing: "-0.02em",
            }}
          >
            iAcademy
          </span>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: 999,
              background: "var(--claude)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Claude
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href={ROUTES.deck} className="el-navlink">
            Ver capacitación
          </Link>
          <Link href={ROUTES.login} className="el-btn el-btn-claude el-btn-sm">
            Iniciar sesión
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        {/* Hero */}
        <section className="lp-hero" style={{ padding: "88px 0 96px" }}>
          <div>
            <Eyebrow>iAcademy · Ruta Claude desde cero</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 60px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                color: "var(--text-headline)",
                margin: "24px 0 16px",
              }}
            >
              Aprende a construir con Claude, del prompt a producción.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--text-warm)",
                margin: "0 0 24px",
              }}
            >
              Diseña, programa y despliega software real — a tu propio ritmo.
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ar-bone)",
                maxWidth: "54ch",
                margin: "0 0 36px",
              }}
            >
              Un curso self-paced sobre Claude y Claude Code, montado sobre la
              plataforma de iAcademy. Sin jerga, con proyectos reales y tu avance
              siempre a la vista.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href={ROUTES.login} className="el-btn el-btn-claude">
                Iniciar sesión
                <ArrowRightIcon size={14} strokeWidth={2} />
              </Link>
              <Link href={ROUTES.deck} className="el-btn el-btn-outline">
                Ver la capacitación
              </Link>
            </div>
          </div>

          {/* Panel terminal / motif */}
          <div
            style={{
              background: "var(--surface-raised)",
              border: "1px solid var(--border-default)",
              borderRadius: 16,
              boxShadow: "var(--shadow-soft)",
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingBottom: 20,
                marginBottom: 20,
                borderBottom: "1px solid var(--border-default)",
              }}
            >
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: "var(--claude)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <TerminalIcon size={18} color="var(--claude-ink)" strokeWidth={2} />
              </span>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-headline)",
                  }}
                >
                  Curso de Claude Code
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Principiante · Español
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                lineHeight: 1.9,
                color: "var(--text-body)",
              }}
            >
              <div style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--claude)" }}>$</span> claude init
              </div>
              <div style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--claude)" }}>›</span> del brief al
                artefacto
              </div>
              <div style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--claude)" }}>›</span> del artefacto al
                deploy
              </div>
              <div style={{ color: "var(--text-headline)" }}>
                <span style={{ color: "var(--claude)" }}>✓</span> en producción
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 1,
            background: "var(--border-default)",
            border: "1px solid var(--border-default)",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 96,
          }}
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              style={{
                background: "var(--surface-default)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Icon size={18} color="var(--text-muted)" />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 26,
                  letterSpacing: "-0.02em",
                  color: "var(--text-headline)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </section>

        {/* Módulos */}
        <section style={{ marginBottom: 96 }}>
          <Eyebrow>El camino del curso · 3 módulos</Eyebrow>
          <div className="lp-modules" style={{ marginTop: 24 }}>
            {MODULES.map((m) => (
              <div
                key={m.n}
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-default)",
                  borderRadius: 16,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 32,
                    letterSpacing: "-0.03em",
                    color: "var(--text-muted)",
                  }}
                >
                  {m.n}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: "-0.02em",
                    color: "var(--text-headline)",
                    margin: 0,
                  }}
                >
                  {m.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ar-bone)",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {m.desc}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "var(--text-muted)",
                    paddingTop: 8,
                    borderTop: "1px solid var(--border-default)",
                  }}
                >
                  {m.meta}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Herramientas */}
        <section style={{ marginBottom: 96 }}>
          <Eyebrow>Herramientas del curso</Eyebrow>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 48,
              flexWrap: "wrap",
              marginTop: 32,
            }}
          >
            {TOOLS.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Image
                  src={t.src}
                  alt={t.name}
                  width={26}
                  height={26}
                  className="lp-tool"
                />
                <span style={{ fontSize: 14, color: "var(--text-body)" }}>
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section
          className="lp-cta-final"
          style={{
            background: "var(--surface-raised)",
            border: "1px solid var(--border-default)",
            borderRadius: 16,
            boxShadow: "var(--shadow-soft)",
            padding: "40px 44px",
            marginBottom: 96,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 30,
                letterSpacing: "-0.02em",
                color: "var(--text-headline)",
                margin: "0 0 8px",
              }}
            >
              Empieza donde quedaste.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--text-warm)",
                margin: 0,
              }}
            >
              Tu ruta te espera. Un módulo a la vez.
            </p>
          </div>
          <Link href={ROUTES.login} className="el-btn el-btn-claude">
            Iniciar sesión
            <ArrowRightIcon size={14} strokeWidth={2} />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-default)",
          padding: "32px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Panamá · Aprende a tu ritmo · iAcademy
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link href={ROUTES.deck} className="el-navlink">
              Capacitación
            </Link>
            <Link href={ROUTES.login} className="el-navlink">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
