import type { Metadata } from "next";
import Link from "next/link";
import {
  Avatar,
  Eyebrow,
  Progress,
  ROUTES,
  Topbar,
} from "@/components/elearn/ui";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ClockIcon,
  LockIcon,
} from "@/components/elearn/icons";

export const metadata: Metadata = {
  title: "Inicio (consola) — iAcademy · Claude desde cero",
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 28,
          color: "var(--text-headline)",
          letterSpacing: "-0.02em",
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
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function DashboardConsolaPage() {
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
        .dbc-main{display:grid;grid-template-columns:1fr 340px;gap:32px;align-items:start;}
        .dbc-resume{display:grid;grid-template-columns:220px 1fr;gap:24px;align-items:center;}
        .dbc-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:48px;gap:40px;}
        @media (max-width:1024px){
          .dbc-main{grid-template-columns:1fr;}
          .dbc-resume{grid-template-columns:1fr;}
          .dbc-header{flex-wrap:wrap;align-items:flex-start;}
        }
      `}</style>

      <Topbar active="inicio" />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 40px 96px" }}>
        <div className="dbc-header">
          <div>
            <Eyebrow rule>Panel del estudiante</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 36,
                letterSpacing: "-0.03em",
                color: "var(--text-headline)",
                margin: "16px 0 8px",
              }}
            >
              Hola, Andrés.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--text-warm)",
                margin: 0,
              }}
            >
              Sigamos con Claude desde cero.
            </p>
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            <Stat value="40%" label="AVANCE DEL CURSO" />
            <Stat value="4/10" label="LECCIONES" />
            <Stat value="3" label="MÓDULOS" />
          </div>
        </div>

        <div className="dbc-main">
          <div>
            <div
              className="dbc-resume"
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-default)",
                borderRadius: 16,
                boxShadow: "var(--shadow-soft)",
                padding: 28,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  height: 124,
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
                  }}
                >
                  Módulo 2
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  Módulo 2 · Lección 5
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 20,
                    color: "var(--text-headline)",
                    margin: "8px 0 16px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Claude Design: de brief a artefacto
                </h2>
                <Progress
                  pct={40}
                  height={5}
                  style={{ marginBottom: 16, maxWidth: 340 }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <Link
                    href={ROUTES.aula}
                    className="el-btn el-btn-claude el-btn-sm"
                  >
                    Reanudar lección
                    <ArrowRightIcon size={14} />
                  </Link>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    40% completado · 4 de 10 lecciones
                  </span>
                </div>
              </div>
            </div>

            <Eyebrow rule style={{ marginBottom: 16 }}>
              Contenido del curso
            </Eyebrow>

            <div
              style={{
                border: "1px solid var(--border-default)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Link
                href={ROUTES.curso}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 22px",
                  borderBottom: "1px solid var(--border-default)",
                  textDecoration: "none",
                  background: "var(--surface-default)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--text-muted)",
                    }}
                  >
                    01
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--text-headline)",
                        fontWeight: 500,
                      }}
                    >
                      Fundamentos de Claude
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      4 lecciones · incluye quiz
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--success)",
                    background: "var(--success-subtle)",
                    padding: "5px 12px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                  }}
                >
                  Completado
                </span>
              </Link>
              <Link
                href={ROUTES.aula}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 22px",
                  borderBottom: "1px solid var(--border-default)",
                  textDecoration: "none",
                  background: "var(--surface-raised)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--text-muted)",
                    }}
                  >
                    02
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--text-headline)",
                        fontWeight: 500,
                      }}
                    >
                      Del diseño a la app
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      3 lecciones · incluye quiz
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--text-headline)",
                    border: "1px solid var(--border-strong)",
                    padding: "5px 12px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                  }}
                >
                  En curso
                </span>
              </Link>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 22px",
                  background: "var(--surface-default)",
                  opacity: 0.6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--text-muted)",
                    }}
                  >
                    03
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--text-headline)",
                        fontWeight: 500,
                      }}
                    >
                      A producción
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      3 lecciones · incluye quiz
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--text-muted)",
                    padding: "5px 12px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <LockIcon size={11} color="var(--text-muted)" strokeWidth={2} />
                  Bloqueado
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-default)",
                borderRadius: 16,
                boxShadow: "var(--shadow-soft)",
                padding: 28,
              }}
            >
              <Eyebrow rule={false}>Tu ruta</Eyebrow>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "var(--text-headline)",
                  margin: "12px 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                Claude desde cero
              </h3>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.02em",
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid var(--border-strong)",
                  color: "var(--ar-bone)",
                  marginBottom: 20,
                }}
              >
                Principiante
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--ar-bone)",
                  marginBottom: 8,
                }}
              >
                <span>Curso 1 de 1</span>
                <span style={{ color: "var(--text-muted)" }}>40%</span>
              </div>
              <Progress pct={40} height={5} style={{ marginBottom: 20 }} />
              <Link
                href={ROUTES.ruta}
                className="el-btn el-btn-outline"
                style={{ width: "100%" }}
              >
                Ver ruta completa
                <ArrowRightIcon size={14} strokeWidth={2} />
              </Link>
            </div>

            <div
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-default)",
                borderRadius: 16,
                boxShadow: "var(--shadow-soft)",
                padding: 28,
              }}
            >
              <Eyebrow rule={false}>Detalles del curso</Eyebrow>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginTop: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ClockIcon size={16} color="var(--text-muted)" strokeWidth={1.5} />
                  <span style={{ fontSize: 14, color: "var(--ar-bone)" }}>
                    ~1h 30min en total
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <BookOpenIcon size={16} color="var(--text-muted)" strokeWidth={1.5} />
                  <span style={{ fontSize: 14, color: "var(--ar-bone)" }}>
                    10 lecciones · 3 quizzes
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingTop: 8,
                    borderTop: "1px solid var(--border-default)",
                  }}
                >
                  <Avatar label="AR" size={28} background="var(--surface-default)" />
                  <span style={{ fontSize: 14, color: "var(--ar-bone)" }}>
                    Andrés Rodríguez
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
