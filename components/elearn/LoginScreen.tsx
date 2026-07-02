"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type CSSProperties, type FormEvent } from "react";
import { EyeIcon, EyeOffIcon, TriangleAlertIcon } from "@/components/elearn/icons";
import { ROUTES } from "@/components/elearn/ui";

// Auth de demostración (sin backend — export estático). El acceso real vendrá
// de la matrícula de iAcademy; por ahora se valida contra estas credenciales.
const DEMO = { email: "demo@iacademy.com", password: "claude2026" };
const AUTH_KEY = "elearn-demo-auth";

const labelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
};

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "var(--surface-default)",
  border: "1px solid var(--border-default)",
  borderRadius: 8,
  padding: "13px 15px",
  fontSize: 15,
  fontFamily: "var(--font-sans)",
  color: "var(--text-headline)",
  outline: "none",
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO.email);
  const [password, setPassword] = useState(DEMO.password);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(false);
    setLoading(true);
    // Simula la latencia de red del request de auth (excepcion permitida a la
    // regla de skeleton: es un boton, no carga de contenido).
    window.setTimeout(() => {
      const ok =
        email.trim().toLowerCase() === DEMO.email && password === DEMO.password;
      if (ok) {
        try {
          window.localStorage.setItem(AUTH_KEY, "1");
        } catch {
          /* almacenamiento no disponible: seguimos igual */
        }
        router.push(ROUTES.dashboard);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 500);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: "48px 22px",
        background: "var(--surface-base)",
      }}
    >
      <Link
        href={ROUTES.home}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
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
      </Link>

      <form
        onSubmit={onSubmit}
        noValidate
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--surface-raised)",
          border: "1px solid var(--border-default)",
          borderRadius: 16,
          boxShadow: "var(--shadow-soft)",
          padding: 40,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: "-0.02em",
            color: "var(--text-headline)",
            margin: "0 0 8px",
          }}
        >
          Bienvenido de vuelta
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--text-warm)",
            margin: "0 0 32px",
          }}
        >
          Ingresa para continuar tu ruta.
        </p>

        <div style={{ marginBottom: 20 }}>
          <label htmlFor="login-email" style={labelStyle}>
            Correo
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            aria-invalid={error}
            style={{ ...inputStyle, marginTop: 8 }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border-default)";
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <label htmlFor="login-password" style={labelStyle}>
              Contraseña
            </label>
            <span
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                cursor: "not-allowed",
              }}
              title="Disponible próximamente"
            >
              ¿Olvidaste?
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <input
              id="login-password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              aria-invalid={error}
              style={{ ...inputStyle, paddingRight: 46 }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-default)";
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={
                showPw ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              aria-pressed={showPw}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                background: "transparent",
                border: "none",
                borderRadius: 8,
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              {showPw ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="el-btn el-btn-claude"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? (
            <>
              <span
                aria-hidden="true"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  border: "2px solid rgba(26,13,6,0.35)",
                  borderTopColor: "var(--claude-ink)",
                  display: "inline-block",
                  animation: "el-spin 0.6s linear infinite",
                }}
              />
              Iniciando sesión…
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>

        {error && (
          <div
            role="alert"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 16,
              padding: "12px 14px",
              borderRadius: 10,
              background: "var(--error-subtle)",
              border: "1px solid var(--error)",
            }}
          >
            <TriangleAlertIcon size={16} color="var(--error)" strokeWidth={2} />
            <span style={{ fontSize: 14, color: "var(--text-headline)" }}>
              Correo o contraseña incorrectos.
            </span>
          </div>
        )}

        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid var(--border-default)",
          }}
        >
          <div
            style={{
              ...labelStyle,
              fontSize: 10,
              marginBottom: 8,
            }}
          >
            Credenciales de demo
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--text-body)",
              margin: 0,
              wordBreak: "break-all",
            }}
          >
            {DEMO.email}
            <br />
            {DEMO.password}
          </p>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              margin: "8px 0 0",
            }}
          >
            Precargadas para la demo. El acceso real vendrá de tu matrícula en
            iAcademy.
          </p>
        </div>
      </form>

      <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
        Panamá · Aprende a tu ritmo · iAcademy
      </p>
    </main>
  );
}
