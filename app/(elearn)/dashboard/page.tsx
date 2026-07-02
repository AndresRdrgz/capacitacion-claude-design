import type { Metadata } from "next";
import Link from "next/link";
import { Topbar, Eyebrow, Progress, ROUTES } from "@/components/elearn/ui";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  LockIcon,
} from "@/components/elearn/icons";

export const metadata: Metadata = {
  title: "Inicio — iAcademy · Claude desde cero",
};

export default function DashboardPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 920,
        background: "var(--surface-base)",
        color: "var(--ar-bone)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <style>{`
        .dash-continue-grid{display:grid;grid-template-columns:1fr 300px;gap:48px;align-items:center;}
        .dash-stepper{position:relative;margin-top:48px;padding:0 40px;}
        .dash-stepper-nodes{display:flex;justify-content:space-between;position:relative;}
        @media (max-width:1024px){
          .dash-continue-grid{grid-template-columns:1fr;}
          .dash-stepper{padding:0;}
          .dash-stepper-line{display:none;}
          .dash-stepper-nodes{flex-direction:column;gap:32px;align-items:stretch;}
          .dash-stepper-node{flex-direction:row !important;gap:24px !important;width:100% !important;text-align:left;}
          .dash-stepper-node > div:last-child{text-align:left !important;}
        }
      `}</style>

      <Topbar active="inicio" />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 40px 96px" }}>
        <Eyebrow>Tu ruta · Claude desde cero</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 44,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--text-headline)",
            margin: "20px 0 12px",
          }}
        >
          Hola, Andrés.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--text-warm)",
            margin: "0 0 48px",
          }}
        >
          Del diseño a producción, un módulo a la vez.
        </p>

        <div
          className="dash-continue-grid"
          style={{
            background: "var(--surface-raised)",
            border: "1px solid var(--border-default)",
            borderRadius: 16,
            boxShadow: "var(--shadow-soft)",
            padding: 40,
            marginBottom: 72,
          }}
        >
          <div>
            <Eyebrow rule={false}>Continúa donde quedaste</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 26,
                color: "var(--text-headline)",
                margin: "14px 0 6px",
                letterSpacing: "-0.02em",
              }}
            >
              Curso de Claude Code
            </h2>
            <p style={{ fontSize: 15, color: "var(--ar-bone)", margin: "0 0 28px" }}>
              Módulo 2 · Del diseño a la app —{" "}
              <em style={{ fontStyle: "italic" }}>Claude Design: de brief a artefacto</em>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "var(--ar-bone)",
                marginBottom: 8,
              }}
            >
              <span>40% completado</span>
              <span style={{ color: "var(--text-muted)" }}>4 de 10 lecciones</span>
            </div>
            <Progress pct={40} height={6} style={{ marginBottom: 28 }} />
            <Link href={ROUTES.aula} className="el-btn el-btn-claude">
              Reanudar lección
              <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div
            style={{
              height: 180,
              background: "var(--surface-default)",
              border: "1px solid var(--border-default)",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <BookOpenIcon size={24} color="var(--text-muted)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
              }}
            >
              Módulo 2
            </span>
          </div>
        </div>

        <Eyebrow>El camino del curso · 3 módulos · 10 lecciones · 3 quizzes · ~1h 30min</Eyebrow>

        <div className="dash-stepper">
          <div
            className="dash-stepper-line"
            style={{
              position: "absolute",
              top: 28,
              left: 96,
              right: 96,
              height: 1,
              background: "var(--border-default)",
            }}
          />
          <div
            className="dash-stepper-line"
            style={{
              position: "absolute",
              top: 28,
              left: 96,
              width: "calc(50% - 96px)",
              height: 1,
              background: "var(--accent)",
            }}
          />
          <div className="dash-stepper-nodes">
            <div
              className="dash-stepper-node"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                width: 220,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CheckIcon size={22} color="var(--accent-contrast)" strokeWidth={2.5} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Módulo 01
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "var(--text-headline)",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Fundamentos de Claude
                </div>
                <div style={{ fontSize: 12, color: "var(--success)" }}>
                  Completado · 4 lecciones
                </div>
              </div>
            </div>
            <div
              className="dash-stepper-node"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                width: 220,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  background: "var(--surface-raised)",
                  border: "2px solid var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "var(--text-headline)",
                  flexShrink: 0,
                }}
              >
                02
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Módulo 02
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "var(--text-headline)",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Del diseño a la app
                </div>
                <div style={{ fontSize: 12, color: "var(--ar-bone)" }}>
                  En curso · 3 lecciones
                </div>
              </div>
            </div>
            <div
              className="dash-stepper-node"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                width: 220,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  background: "var(--surface-default)",
                  border: "1px solid var(--border-default)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <LockIcon size={16} color="var(--text-muted)" />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Módulo 03
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "var(--text-headline)",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  A producción
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Bloqueado · 3 lecciones
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
          <Link
            href={ROUTES.ruta}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--text-accent)",
              borderBottom: "1px solid var(--text-accent)",
              paddingBottom: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Ver detalle de la ruta
            <ArrowRightIcon size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
