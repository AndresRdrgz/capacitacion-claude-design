import Link from "next/link";
import type { CSSProperties } from "react";
import { ChevronLeftIcon } from "@/components/elearn/icons";

// Rutas canónicas de la plataforma (brief §0.1)
export const ROUTES = {
  dashboard: "/dashboard",
  ruta: "/rutas/claude-desde-cero",
  curso: "/curso/curso-de-claude-code",
  aula: "/leccion/5", // Lección 5 · Claude Design: de brief a artefacto
  quiz: "/leccion/4", // Lección 4 · Quiz: Fundamentos (inline en /leccion)
} as const;

export function Avatar({
  label = "A",
  size = 32,
  fontSize,
  background = "var(--surface-raised)",
}: {
  label?: string;
  size?: number;
  fontSize?: number;
  background?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background,
        border: "1px solid var(--border-default)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: fontSize ?? (size >= 32 ? 12 : 11),
        color: "var(--ar-bone)",
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}

/** Topbar global de 64px: logo iAcademy + nav (Inicio / Rutas) + avatar.
 *  Sin `active`, ambos links quedan en muted (como en Detalle de curso). */
export function Topbar({ active }: { active?: "inicio" | "rutas" }) {
  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        borderBottom: "1px solid var(--border-default)",
        background: "var(--surface-default)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
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
              whiteSpace: "nowrap",
            }}
          >
            Claude
          </span>
        </div>
        <nav style={{ display: "flex", gap: 28 }}>
          <Link
            href={ROUTES.dashboard}
            className={`el-navlink${active === "inicio" ? " active" : ""}`}
          >
            Inicio
          </Link>
          <Link
            href={ROUTES.ruta}
            className={`el-navlink${active === "rutas" ? " active" : ""}`}
          >
            Rutas
          </Link>
        </nav>
      </div>
      <Avatar label="A" size={32} />
    </div>
  );
}

/** Chrome reducido del aula/quiz: 56px, volver al curso + título + avatar. */
export function AulaBar() {
  return (
    <div
      style={{
        height: 56,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        borderBottom: "1px solid var(--border-default)",
        background: "var(--surface-default)",
      }}
    >
      <Link
        href={ROUTES.curso}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          color: "var(--ar-bone)",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        <ChevronLeftIcon size={16} />
        Volver al curso
      </Link>
      <span
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        Curso de Claude Code
      </span>
      <Avatar label="A" size={30} />
    </div>
  );
}

/** Eyebrow: label mono en mayúsculas; `rule` antepone la regla de 28px. */
export function Eyebrow({
  children,
  rule = true,
  tracking = "0.18em",
  style,
}: {
  children: React.ReactNode;
  rule?: boolean;
  tracking?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`el-eyebrow${rule ? " rule" : ""}`}
      style={{ letterSpacing: tracking, ...style }}
    >
      {children}
    </span>
  );
}

/** Barra de progreso; pct 0–100. */
export function Progress({
  pct,
  height = 6,
  color = "var(--accent)",
  style,
}: {
  pct: number;
  height?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div className="el-progress" style={{ height, ...style }}>
      <i style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}
