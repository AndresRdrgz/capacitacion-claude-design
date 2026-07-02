import Link from "next/link";
import { AulaBar, Avatar, Eyebrow, Progress, ROUTES } from "@/components/elearn/ui";
import {
  ArrowRightIcon,
  CheckIcon,
  CircleCheckIcon,
  CircleIcon,
  LockIcon,
  PlayIcon,
} from "@/components/elearn/icons";

/** Fila de lección completada del temario (CircleCheck accent + label). */
function LessonDone({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <CircleCheckIcon size={14} color="var(--accent)" strokeWidth={2} />
      <span
        style={{
          fontSize: 13,
          color: "var(--ar-bone)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Fila de lección pendiente del temario (Circle muted + label muted). */
function LessonPending({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <CircleIcon size={14} color="var(--text-muted)" />
      <span
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AulaScreen() {
  return (
    <div
      className="aula-root"
      style={{
        width: "100%",
        background: "var(--surface-base)",
        color: "var(--ar-bone)",
        fontFamily: "var(--font-sans)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .aula-root{height:100vh;overflow:hidden;}
        .aula-grid{flex:1;display:grid;grid-template-columns:300px 1fr 320px;overflow:hidden;}
        .aula-sidebar,.aula-main,.aula-rail{overflow-y:auto;}
        @media (max-width:1024px){
          .aula-root{height:auto;min-height:100vh;overflow:visible;}
          .aula-grid{display:flex;flex-direction:column;overflow:visible;}
          .aula-sidebar,.aula-main,.aula-rail{overflow-y:visible;}
          .aula-main{order:1;}
          .aula-sidebar{order:2;border-right:none !important;border-top:1px solid var(--border-default);}
          .aula-rail{order:3;border-left:none !important;border-top:1px solid var(--border-default);}
        }
      `}</style>

      <AulaBar />

      <div className="aula-grid">
        {/* ── Sidebar · temario ─────────────────────────────────────── */}
        <div
          className="aula-sidebar"
          style={{ borderRight: "1px solid var(--border-default)", padding: "24px 0" }}
        >
          <div
            style={{
              padding: "0 24px 20px",
              borderBottom: "1px solid var(--border-default)",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "var(--text-headline)",
                fontWeight: 600,
                marginBottom: 10,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Curso de Claude Code
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "var(--text-muted)",
                marginBottom: 6,
                whiteSpace: "nowrap",
              }}
            >
              <span>40% completado</span>
              <span>4 / 10</span>
            </div>
            <Progress pct={40} height={4} />
          </div>

          {/* Módulo 1 · completado */}
          <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CheckIcon size={12} color="var(--accent-contrast)" strokeWidth={3} />
            </div>
            <span
              style={{
                fontSize: 13,
                color: "var(--text-headline)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Módulo 1 · Fundamentos
            </span>
          </div>

          <div
            style={{
              padding: "6px 24px 16px 58px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <LessonDone label="Bienvenida al curso" />
            <LessonDone label="¿Qué es Claude y Claude Code?" />
            <LessonDone label="Tu primer prompt efectivo" />
            <Link
              href={ROUTES.quiz}
              style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
            >
              <CircleCheckIcon size={14} color="var(--accent)" strokeWidth={2} />
              <span
                style={{
                  fontSize: 13,
                  color: "var(--ar-bone)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Quiz: Fundamentos
              </span>
            </Link>
          </div>

          {/* Módulo 2 · en curso */}
          <div
            style={{
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface-raised)",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "var(--surface-default)",
                border: "2px solid var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-headline)",
                flexShrink: 0,
              }}
            >
              2
            </div>
            <span
              style={{
                fontSize: 13,
                color: "var(--text-headline)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Módulo 2 · Del diseño a la app
            </span>
          </div>

          <div
            style={{
              padding: "10px 24px 16px 58px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: "var(--surface-raised)",
            }}
          >
            <Link
              href={ROUTES.aula}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                margin: "-4px -16px",
                padding: "4px 16px",
                borderRadius: 8,
                background: "var(--surface-default)",
                borderLeft: "2px solid var(--accent)",
              }}
            >
              <PlayIcon size={14} color="var(--text-headline)" />
              <span
                style={{
                  fontSize: 13,
                  color: "var(--text-headline)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Claude Design: de brief...
              </span>
            </Link>
            <LessonPending label="Ejercicio: diseña..." />
            <LessonPending label="Quiz: Diseño" />
          </div>

          {/* Módulo 3 · bloqueado */}
          <div
            style={{
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: 0.5,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "var(--surface-default)",
                border: "1px solid var(--border-default)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LockIcon size={11} color="var(--text-muted)" strokeWidth={2} />
            </div>
            <span
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Módulo 3 · A producción
            </span>
          </div>
        </div>

        {/* ── Columna central · player + transcripción ──────────────── */}
        <div className="aula-main" style={{ padding: "32px 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
              style={{
                aspectRatio: "16/9",
                background: "var(--surface-raised)",
                border: "1px solid var(--border-default)",
                borderRadius: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 999,
                  background: "var(--claude)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlayIcon size={26} color="var(--claude-ink)" />
              </div>
              <Eyebrow rule={false} tracking="0.16em">
                Lección 5 · 12:00
              </Eyebrow>
            </div>

            <Eyebrow rule={false} tracking="0.16em">
              Módulo 2 · Del diseño a la app
            </Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 30,
                letterSpacing: "-0.02em",
                color: "var(--text-headline)",
                margin: "12px 0 28px",
              }}
            >
              Claude Design: de brief a artefacto
            </h1>

            <div
              style={{
                display: "flex",
                gap: 32,
                borderBottom: "1px solid var(--border-default)",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "var(--text-headline)",
                  fontWeight: 600,
                  paddingBottom: 14,
                  borderBottom: "2px solid var(--accent)",
                  whiteSpace: "nowrap",
                }}
              >
                Transcripción
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  paddingBottom: 14,
                  whiteSpace: "nowrap",
                }}
              >
                Recursos
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  paddingBottom: 14,
                  whiteSpace: "nowrap",
                }}
              >
                Código
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: "68ch" }}
            >
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ar-bone)", margin: 0 }}>
                En esta lección tomamos un brief de diseño real y lo convertimos en un artefacto
                navegable con Claude. Primero vemos cómo estructurar el brief para que Claude
                entienda el contexto del producto, la marca y el público objetivo.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ar-bone)", margin: 0 }}>
                Después iteramos sobre el primer resultado: qué pedirle a Claude, qué corregir y
                cómo mantener la consistencia visual cuando agregas pantallas nuevas.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ar-bone)", margin: 0 }}>
                Cerramos con un ejemplo completo, de la primera versión hasta el artefacto final
                que vas a usar en el ejercicio de esta unidad.
              </p>
            </div>
          </div>
        </div>

        {/* ── Rail derecho · acciones + comentarios ─────────────────── */}
        <div
          className="aula-rail"
          style={{
            borderLeft: "1px solid var(--border-default)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div>
            <Eyebrow rule={false} tracking="0.16em">
              Video · 12:00
            </Eyebrow>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}
            >
              <button className="el-btn el-btn-claude" style={{ width: "100%" }}>
                Marcar como completada
              </button>
              <Link
                href={ROUTES.aula}
                className="el-btn el-btn-outline"
                style={{ width: "100%" }}
              >
                Siguiente lección
                <ArrowRightIcon size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div style={{ height: 1, background: "var(--border-default)" }} />

          <div>
            <span
              style={{
                fontSize: 14,
                color: "var(--text-headline)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Comentarios (2)
            </span>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <Avatar label="AI" size={28} fontSize={10} />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-headline)",
                      fontWeight: 600,
                      marginBottom: 3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Ana Icaza
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ar-bone)", lineHeight: 1.5 }}>
                    ¿Alguien más tuvo problemas para conectar el MCP en Windows?
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Avatar label="CH" size={28} fontSize={10} />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-headline)",
                      fontWeight: 600,
                      marginBottom: 3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Carlos Him
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ar-bone)", lineHeight: 1.5 }}>
                    Excelente explicación, muy claro el ejemplo del brief.
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 18,
                border: "1px solid var(--border-default)",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                Escribe un comentario…
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
