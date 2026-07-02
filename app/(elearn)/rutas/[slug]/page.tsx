import type { Metadata } from "next";
import Link from "next/link";
import { Topbar, Eyebrow, Progress, ROUTES } from "@/components/elearn/ui";
import {
  ChevronLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ListIcon,
  HelpCircleIcon,
  ClockIcon,
  RouteIcon,
} from "@/components/elearn/icons";

export const metadata: Metadata = { title: "Claude desde cero — iAcademy" };

export function generateStaticParams() {
  return [{ slug: "claude-desde-cero" }];
}
export const dynamicParams = false;

export default async function DetalleRutaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;

  return (
    <div style={{ width: "100%", minHeight: 900, background: "var(--surface-base)", color: "var(--ar-bone)", fontFamily: "var(--font-sans)" }}>
      <style>{`
        .ruta-hero-grid { display: grid; grid-template-columns: 1fr 380px; }
        .ruta-curso-grid { display: grid; grid-template-columns: 240px 1fr auto; }
        @media (max-width: 1024px) {
          .ruta-hero-grid { grid-template-columns: 1fr; }
          .ruta-curso-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Topbar active="rutas" />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 40px 96px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
          <Link
            href={ROUTES.dashboard}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}
          >
            <ChevronLeftIcon size={14} />
            <span style={{ whiteSpace: "nowrap" }}>Inicio</span>
          </Link>
          <span style={{ color: "var(--text-muted)", fontSize: 14 }}>/</span>
          <span style={{ fontSize: 14, color: "var(--text-headline)", whiteSpace: "nowrap" }}>Claude desde cero</span>
        </div>

        <div className="ruta-hero-grid" style={{ gap: 64, alignItems: "start", marginBottom: 56 }}>
          <div>
            <Eyebrow rule>Ruta · Claude desde cero</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 48,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--text-headline)",
                margin: "20px 0 10px",
              }}
            >
              Claude desde cero
            </h1>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "var(--text-warm)", margin: "0 0 24px" }}>
              Del prompt a producción
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ar-bone)", maxWidth: "52ch", margin: "0 0 32px" }}>
              Empieza a trabajar con Claude sin experiencia previa en IA. Aprende a diseñar, programar y desplegar software real, a tu propio ritmo.
            </p>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <BookOpenIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)", whiteSpace: "nowrap" }}>1 curso</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <ListIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)", whiteSpace: "nowrap" }}>10 lecciones</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <HelpCircleIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)", whiteSpace: "nowrap" }}>3 quizzes</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <ClockIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)", whiteSpace: "nowrap" }}>~1h 30min</span>
              </div>
            </div>
          </div>

          <div
            style={{
              height: 230,
              background: "var(--surface-raised)",
              border: "1px solid var(--border-default)",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <RouteIcon size={30} color="var(--text-muted)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Claude desde cero
            </span>
          </div>
        </div>

        <div
          style={{
            background: "var(--surface-raised)",
            border: "1px solid var(--border-default)",
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 72,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <Eyebrow rule={false}>Tu progreso</Eyebrow>
            <span style={{ fontSize: 14, color: "var(--ar-bone)", whiteSpace: "nowrap" }}>4 de 10 lecciones completadas</span>
          </div>
          <Progress pct={40} height={6} />
        </div>

        <Eyebrow rule style={{ marginBottom: 24 }}>
          Cursos de la ruta
        </Eyebrow>

        <Link
          href={ROUTES.curso}
          className="ruta-curso-grid"
          style={{
            gap: 32,
            alignItems: "center",
            background: "var(--surface-raised)",
            border: "1px solid var(--border-default)",
            borderRadius: 16,
            boxShadow: "var(--shadow-soft)",
            padding: 28,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              height: 135,
              background: "var(--surface-default)",
              border: "1px solid var(--border-default)",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <BookOpenIcon size={20} color="var(--text-muted)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Curso 1
            </span>
          </div>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--text-headline)",
                border: "1px solid var(--border-strong)",
                padding: "4px 10px",
                borderRadius: 999,
                textTransform: "uppercase",
                marginBottom: 12,
                whiteSpace: "nowrap",
              }}
            >
              En curso
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 22,
                color: "var(--text-headline)",
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              Curso de Claude Code
            </h3>
            <p style={{ fontSize: 14, color: "var(--ar-bone)", margin: "0 0 12px", maxWidth: "56ch" }}>
              Aprende a programar con Claude en tu terminal y crea proyectos reales, de la idea al deploy.
            </p>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>10 lecciones · ~1h 30min · 40% completado</span>
          </div>
          <span aria-hidden="true" className="el-btn el-btn-claude">
            Continuar
            <ArrowRightIcon size={14} strokeWidth={2} />
          </span>
        </Link>
      </div>
    </div>
  );
}
