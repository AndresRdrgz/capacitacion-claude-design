import type { CSSProperties } from "react";

// Iconos inline (lucide-style, paths copiados 1:1 de los prototipos .dc.html
// del handoff de Claude Design). Stroke por defecto 1.5, color currentColor.

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

type BaseProps = IconProps & { children: React.ReactNode; filled?: boolean };

function Svg({
  size = 16,
  color = "currentColor",
  strokeWidth = 1.5,
  style,
  filled = false,
  children,
}: BaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      strokeWidth={filled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ChevronLeftIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <polyline points="15 18 9 12 15 6" />
    </Svg>
  );
}

export function ChevronRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <polyline points="9 18 15 12 9 6" />
    </Svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <Svg {...p} style={{ transform: "rotate(90deg)", ...p.style }}>
      <polyline points="9 18 15 12 9 6" />
    </Svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <polyline points="20 6 9 17 4 12" />
    </Svg>
  );
}

/** lucide CircleCheck (círculo abierto + check) — lección completada */
export function CircleCheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </Svg>
  );
}

export function CircleIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
    </Svg>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </Svg>
  );
}

export function BookOpenIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2 4h6a3 3 0 013 3v13a2.5 2.5 0 00-2.5-2.5H2z" />
      <path d="M22 4h-6a3 3 0 00-3 3v13a2.5 2.5 0 012.5-2.5H22z" />
    </Svg>
  );
}

export function ClockIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </Svg>
  );
}

export function HelpCircleIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 114 2c-.7.6-1.5 1-1.5 2.2" />
      <line x1="12" y1="16.5" x2="12" y2="16.6" />
    </Svg>
  );
}

export function PlayIcon(p: IconProps) {
  return (
    <Svg {...p} filled>
      <polygon points="6 3 20 12 6 21 6 3" />
    </Svg>
  );
}

export function RouteIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15" />
    </Svg>
  );
}

export function StarIcon({ color = "currentColor", ...p }: IconProps) {
  return (
    <Svg {...p} color={color} filled>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Svg>
  );
}

/** lucide RotateCcw — reintentar */
export function RetryIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </Svg>
  );
}

export function XIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}

/** Líneas de listado (lecciones) */
export function ListIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="14" y2="18" />
    </Svg>
  );
}

/** Mostrar contraseña */
export function EyeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

/** Ocultar contraseña */
export function EyeOffIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    </Svg>
  );
}

/** Error / alerta */
export function TriangleAlertIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </Svg>
  );
}

/** Certificado / logro */
export function AwardIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </Svg>
  );
}

/** Terminal / código (marca tech) */
export function TerminalIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </Svg>
  );
}
