import type { Metadata } from "next";
import Link from "next/link";
import { Avatar, Eyebrow, Progress, ROUTES, Topbar } from "@/components/elearn/ui";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  ClockIcon,
  HelpCircleIcon,
  LockIcon,
  PlayIcon,
  StarIcon,
} from "@/components/elearn/icons";

export const metadata: Metadata = { title: "Curso de Claude Code — iAcademy" };

export function generateStaticParams() {
  return [{ cursoId: "curso-de-claude-code" }];
}
export const dynamicParams = false;

const lessonRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "18px 24px 18px 40px",
  borderBottom: "1px solid var(--border-default)",
};

const lessonLeft: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const lessonMeta: React.CSSProperties = {
  fontSize: 12,
  color: "var(--text-muted)",
  whiteSpace: "nowrap",
};

export default async function DetalleCursoPage({
  params,
}: {
  params: Promise<{ cursoId: string }>;
}) {
  await params;

  return (
    <div style={{ width: "100%", minHeight: 900 }}>
      <style>{`
        .curso-hero-grid{display:grid;grid-template-columns:1fr 340px;gap:56px;align-items:start;margin-bottom:56px;}
        .curso-body-grid{display:grid;grid-template-columns:1fr 320px;gap:48px;align-items:start;}
        @media (max-width:1024px){
          .curso-hero-grid{grid-template-columns:1fr;}
          .curso-body-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <Topbar />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 40px 96px" }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 40,
            whiteSpace: "nowrap",
          }}
        >
          <Link
            href={ROUTES.dashboard}
            style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}
          >
            Inicio
          </Link>
          <span style={{ color: "var(--text-muted)", fontSize: 14 }}>/</span>
          <Link
            href={ROUTES.ruta}
            style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}
          >
            Claude desde cero
          </Link>
          <span style={{ color: "var(--text-muted)", fontSize: 14 }}>/</span>
          <span style={{ fontSize: 14, color: "var(--text-headline)" }}>
            Curso de Claude Code
          </span>
        </div>

        {/* Hero */}
        <div className="curso-hero-grid">
          <div>
            <Eyebrow rule={false}>Claude desde cero · Curso 1</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 44,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "var(--text-headline)",
                margin: "18px 0 8px",
              }}
            >
              Curso de Claude Code
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
              Del prompt a producción
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <span
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
                  whiteSpace: "nowrap",
                }}
              >
                Principiante
              </span>
              <span
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
                  whiteSpace: "nowrap",
                }}
              >
                Español
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.02em",
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid var(--border-strong)",
                  color: "var(--ar-bone)",
                  whiteSpace: "nowrap",
                }}
              >
                <ClockIcon size={12} />
                ~1h 30min
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                <StarIcon size={15} color="var(--accent)" />
                <StarIcon size={15} color="var(--accent)" />
                <StarIcon size={15} color="var(--accent)" />
                <StarIcon size={15} color="var(--accent)" />
                <StarIcon size={15} color="var(--border-strong)" />
              </div>
              <span
                style={{ fontSize: 14, color: "var(--ar-bone)", whiteSpace: "nowrap" }}
              >
                4.7 · 128 opiniones
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar label="AR" size={36} />
              <span
                style={{ fontSize: 14, color: "var(--ar-bone)", whiteSpace: "nowrap" }}
              >
                Andrés Rodríguez · Ingeniero de software
              </span>
            </div>
          </div>

          <div>
            <div
              style={{
                height: 180,
                background: "var(--surface-raised)",
                border: "1px solid var(--border-default)",
                borderRadius: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <BookOpenIcon size={24} color="var(--text-muted)" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Curso de Claude Code
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "var(--ar-bone)",
                marginBottom: 8,
                whiteSpace: "nowrap",
              }}
            >
              <span>40% completado</span>
              <span style={{ color: "var(--text-muted)" }}>4 de 10 lecciones</span>
            </div>
            <Progress pct={40} style={{ marginBottom: 20 }} />
            <Link
              href={ROUTES.aula}
              className="el-btn el-btn-claude"
              style={{ width: "100%" }}
            >
              Continuar
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 36,
            borderBottom: "1px solid var(--border-default)",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              paddingBottom: 16,
              whiteSpace: "nowrap",
            }}
          >
            Descripción
          </span>
          <span
            style={{
              fontSize: 14,
              color: "var(--text-headline)",
              fontWeight: 600,
              paddingBottom: 16,
              borderBottom: "2px solid var(--accent)",
              whiteSpace: "nowrap",
            }}
          >
            Temario
          </span>
          <span
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              paddingBottom: 16,
              whiteSpace: "nowrap",
            }}
          >
            Recursos
          </span>
          <span
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              paddingBottom: 16,
              whiteSpace: "nowrap",
            }}
          >
            Reseñas
          </span>
        </div>

        {/* Temario + sidebar */}
        <div className="curso-body-grid">
          <div>
            <div
              style={{
                border: "1px solid var(--border-default)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Módulo 1 header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "var(--surface-default)",
                  borderBottom: "1px solid var(--border-default)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckIcon size={16} color="var(--accent-contrast)" strokeWidth={2.5} />
                  </div>
                  <div style={{ maxWidth: 420 }}>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--text-headline)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Módulo 1 · Fundamentos de Claude
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--success)",
                        marginTop: 2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Completado · 4 lecciones · 24 min
                    </div>
                  </div>
                </div>
                <ChevronRightIcon size={16} color="var(--text-muted)" />
              </div>

              {/* Módulo 1 lecciones */}
              <div
                style={{
                  background: "var(--surface-raised)",
                  borderBottom: "1px solid var(--border-default)",
                }}
              >
                <div style={lessonRow}>
                  <div style={lessonLeft}>
                    <CircleCheckIcon size={18} color="var(--accent)" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--text-headline)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Bienvenida al curso
                    </span>
                  </div>
                  <span style={lessonMeta}>4 min</span>
                </div>
                <div style={lessonRow}>
                  <div style={lessonLeft}>
                    <CircleCheckIcon size={18} color="var(--accent)" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--text-headline)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ¿Qué es Claude y Claude Code?
                    </span>
                  </div>
                  <span style={lessonMeta}>9 min</span>
                </div>
                <div style={lessonRow}>
                  <div style={lessonLeft}>
                    <CircleCheckIcon size={18} color="var(--accent)" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--text-headline)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Tu primer prompt efectivo
                    </span>
                  </div>
                  <span style={lessonMeta}>11 min</span>
                </div>
                <Link
                  href={ROUTES.quiz}
                  style={{ ...lessonRow, borderBottom: "none", textDecoration: "none" }}
                >
                  <div style={lessonLeft}>
                    <CircleCheckIcon size={18} color="var(--accent)" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--text-headline)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Quiz: Fundamentos
                    </span>
                  </div>
                  <span style={lessonMeta}>5 preguntas</span>
                </Link>
              </div>

              {/* Módulo 2 header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "var(--surface-default)",
                  borderBottom: "1px solid var(--border-default)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: "var(--surface-raised)",
                      border: "2px solid var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "var(--text-headline)",
                      flexShrink: 0,
                    }}
                  >
                    02
                  </div>
                  <div style={{ maxWidth: 420 }}>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--text-headline)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Módulo 2 · Del diseño a la app
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--ar-bone)",
                        marginTop: 2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      En curso · 3 lecciones · 26 min
                    </div>
                  </div>
                </div>
                <ChevronDownIcon size={16} color="var(--text-muted)" />
              </div>

              {/* Módulo 2 lecciones */}
              <div
                style={{
                  background: "var(--surface-raised)",
                  borderBottom: "1px solid var(--border-default)",
                }}
              >
                <Link
                  href={ROUTES.aula}
                  style={{
                    ...lessonRow,
                    textDecoration: "none",
                    borderLeft: "2px solid var(--accent)",
                    background: "var(--surface-default)",
                  }}
                >
                  <div style={lessonLeft}>
                    <PlayIcon size={18} style={{ color: "var(--text-headline)" }} />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--text-headline)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Claude Design: de brief a artefacto
                    </span>
                  </div>
                  <span style={lessonMeta}>12 min</span>
                </Link>
                <div style={lessonRow}>
                  <div style={lessonLeft}>
                    <CircleIcon size={18} color="var(--text-muted)" />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--ar-bone)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Ejercicio: diseña una pantalla
                    </span>
                  </div>
                  <span style={lessonMeta}>Ejercicio</span>
                </div>
                <div style={{ ...lessonRow, borderBottom: "none" }}>
                  <div style={lessonLeft}>
                    <CircleIcon size={18} color="var(--text-muted)" />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--ar-bone)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Quiz: Diseño
                    </span>
                  </div>
                  <span style={lessonMeta}>4 preguntas</span>
                </div>
              </div>

              {/* Módulo 3 header (bloqueado) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "var(--surface-default)",
                  opacity: 0.55,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: "var(--surface-default)",
                      border: "1px solid var(--border-default)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <LockIcon size={14} color="var(--text-muted)" />
                  </div>
                  <div style={{ maxWidth: 420 }}>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--text-headline)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Módulo 3 · A producción
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginTop: 2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Bloqueado · 3 lecciones · 24 min
                    </div>
                  </div>
                </div>
                <ChevronRightIcon size={16} color="var(--text-muted)" />
              </div>
            </div>
          </div>

          {/* Sidebar Incluye */}
          <div
            style={{
              background: "var(--surface-raised)",
              border: "1px solid var(--border-default)",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <Eyebrow rule={false}>Incluye</Eyebrow>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 20,
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <ClockIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)" }}>
                  ~1h 30min de video
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <BookOpenIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)" }}>
                  10 lecciones · 3 módulos
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <HelpCircleIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)" }}>
                  3 quizzes de práctica
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <CheckIcon size={16} color="var(--text-muted)" />
                <span style={{ fontSize: 14, color: "var(--ar-bone)" }}>
                  Acceso mientras tu academia lo mantenga activo
                </span>
              </div>
            </div>
            <Link
              href={ROUTES.aula}
              className="el-btn el-btn-claude"
              style={{ width: "100%" }}
            >
              Continuar
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
