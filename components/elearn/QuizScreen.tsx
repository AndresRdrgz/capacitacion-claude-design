"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { AulaBar, Eyebrow, Progress, ROUTES } from "@/components/elearn/ui";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  HelpCircleIcon,
  LockIcon,
  RetryIcon,
  XIcon,
} from "@/components/elearn/icons";

type Opcion = { id: string; texto: string };

type Pregunta = {
  id: number;
  enunciado: string;
  opciones: Opcion[];
  correctaId: string;
  explicacionCorrecta: string;
  explicacionIncorrecta: string;
};

// Preguntas del prototipo (mock, verbatim — incluida la "correcta" de la P2).
const QUESTIONS: Pregunta[] = [
  {
    id: 1,
    enunciado: "¿Cuál de las siguientes opciones describe mejor a Claude Code?",
    opciones: [
      { id: "a", texto: "Un plugin de diseño para Figma" },
      { id: "b", texto: "Un asistente de código que trabaja en tu terminal" },
      { id: "c", texto: "Una extensión de navegador para chatear con Claude" },
      { id: "d", texto: "Un servicio de hosting para desplegar aplicaciones" },
    ],
    correctaId: "b",
    explicacionCorrecta:
      "Correcto. Claude Code es un asistente de código que trabaja directamente en tu terminal.",
    explicacionIncorrecta:
      'Incorrecta. La respuesta correcta es "Un asistente de código que trabaja en tu terminal".',
  },
  {
    id: 2,
    enunciado: "¿Qué comando inicializa un proyecto con Claude Code en la terminal?",
    opciones: [
      { id: "a", texto: "claude init" },
      { id: "b", texto: "claude start" },
      { id: "c", texto: "code --claude" },
      { id: "d", texto: "npx claude-setup" },
    ],
    correctaId: "c",
    explicacionCorrecta:
      'Correcto. "code --claude" inicializa el proyecto dentro de la carpeta actual.',
    explicacionIncorrecta:
      'Incorrecta. La respuesta correcta es "code --claude". Ejecútalo dentro de la carpeta del proyecto.',
  },
  {
    id: 3,
    enunciado: "¿Qué hace que un prompt para Claude sea efectivo?",
    opciones: [
      { id: "a", texto: "Escribirlo todo en mayúsculas para darle énfasis" },
      { id: "b", texto: "Dar contexto claro y un objetivo específico" },
      { id: "c", texto: "Repetir la misma pregunta varias veces" },
      { id: "d", texto: "Usar la mayor cantidad de palabras posible" },
    ],
    correctaId: "b",
    explicacionCorrecta:
      "Correcto. Un prompt efectivo da contexto claro y un objetivo específico.",
    explicacionIncorrecta:
      'Incorrecta. La respuesta correcta es "Dar contexto claro y un objetivo específico".',
  },
  {
    id: 4,
    enunciado: "¿Qué es Claude, en términos simples?",
    opciones: [
      { id: "a", texto: "Un lenguaje de programación nuevo" },
      {
        id: "b",
        texto:
          "Un modelo de inteligencia artificial de Anthropic que entiende y genera texto",
      },
      { id: "c", texto: "Un sistema operativo para desarrolladores" },
      { id: "d", texto: "Una base de datos en la nube" },
    ],
    correctaId: "b",
    explicacionCorrecta:
      "Correcto. Claude es un modelo de inteligencia artificial de Anthropic que entiende y genera texto.",
    explicacionIncorrecta:
      'Incorrecta. La respuesta correcta es "Un modelo de inteligencia artificial de Anthropic que entiende y genera texto".',
  },
  {
    id: 5,
    enunciado: "¿Dónde se ejecuta principalmente Claude Code?",
    opciones: [
      { id: "a", texto: "En la terminal de tu computadora" },
      { id: "b", texto: "Solo en el navegador web" },
      { id: "c", texto: "En una aplicación móvil" },
      { id: "d", texto: "En un editor de imágenes" },
    ],
    correctaId: "a",
    explicacionCorrecta:
      "Correcto. Claude Code se ejecuta en la terminal de tu computadora.",
    explicacionIncorrecta:
      'Incorrecta. La respuesta correcta es "En la terminal de tu computadora".',
  },
];

const TOTAL = QUESTIONS.length;

/** Fila de lección completada del temario del quiz. */
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

/** Fila de módulo bloqueado (candado, opacity .5). */
function ModuleLocked({ label }: { label: string }) {
  return (
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
        {label}
      </span>
    </div>
  );
}

export default function QuizScreen() {
  const [qIndex, setQIndex] = useState(0);
  const [selections, setSelections] = useState<(string | null)[]>(
    Array(TOTAL).fill(null)
  );
  const [checked, setChecked] = useState<boolean[]>(Array(TOTAL).fill(false));
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [resultXpText, setResultXpText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (submitTimer.current) clearTimeout(submitTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  function selectOption(optId: string) {
    if (checked[qIndex]) return;
    setSelections((prev) => {
      const next = prev.slice();
      next[qIndex] = optId;
      return next;
    });
  }

  function checkAnswer() {
    if (checked[qIndex] || selections[qIndex] == null) return;
    setSubmitting(true);
    submitTimer.current = setTimeout(() => {
      setChecked((prev) => {
        const next = prev.slice();
        next[qIndex] = true;
        return next;
      });
      setSubmitting(false);
    }, 350);
  }

  function nextQuestion() {
    if (qIndex < TOTAL - 1) setQIndex(qIndex + 1);
  }

  function prevQuestion() {
    if (qIndex > 0) setQIndex(qIndex - 1);
  }

  function goToResult() {
    const correctCount = selections.filter(
      (sel, i) => sel != null && sel === QUESTIONS[i].correctaId
    ).length;
    const pct = Math.round((correctCount / TOTAL) * 100);
    const passed = pct >= 70;
    let nextXpText = "";
    let nextToast = "Repasa el módulo y vuelve a intentarlo.";
    if (passed) {
      if (xpAwarded) {
        nextXpText = "XP ya obtenido";
        nextToast = "¡Aprobaste de nuevo! Ya tenías el XP de este quiz.";
      } else {
        nextXpText = "+50 XP";
        setXpAwarded(true);
        nextToast = "¡Muy bien! Ganaste 50 XP.";
      }
    }
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShowResult(true);
    setShowReview(false);
    setResultXpText(nextXpText);
    setToast(nextToast);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }

  function retryQuiz() {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setQIndex(0);
    setSelections(Array(TOTAL).fill(null));
    setChecked(Array(TOTAL).fill(false));
    setSubmitting(false);
    setShowResult(false);
    setShowReview(false);
    setToast(null);
  }

  // ── Derivaciones (port 1:1 del renderVals del prototipo) ───────────
  const q = QUESTIONS[qIndex];
  const selectedId = selections[qIndex];
  const isChecked = checked[qIndex];
  const isCorrectSelected = isChecked && selectedId === q.correctaId;

  const canCheck = selectedId != null;
  const isLast = qIndex === TOTAL - 1;
  let primaryLabel = "Comprobar respuesta";
  if (submitting) primaryLabel = "Comprobando…";
  else if (isChecked) primaryLabel = isLast ? "Ver resultado" : "Siguiente";
  const primaryDisabled = submitting || (!isChecked && !canCheck);
  const primaryAction = () => {
    if (submitting) return;
    if (!isChecked) checkAnswer();
    else if (isLast) goToResult();
    else nextQuestion();
  };

  const feedbackText = isCorrectSelected ? q.explicacionCorrecta : q.explicacionIncorrecta;

  const correctCount = selections.filter(
    (sel, i) => sel != null && sel === QUESTIONS[i].correctaId
  ).length;
  const pct = Math.round((correctCount / TOTAL) * 100);
  const passed = pct >= 70;

  const lessonsDone = showResult && passed ? 4 : 3;
  const module1Passed = showResult && passed;
  const module2Unlocked = showResult && passed;

  return (
    <div
      className="qz-root"
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
        .qz-root{height:100vh;overflow:hidden;}
        .qz-grid{flex:1;display:grid;grid-template-columns:300px 1fr;overflow:hidden;position:relative;}
        .qz-sidebar,.qz-main{overflow-y:auto;}
        @media (max-width:1024px){
          .qz-grid{grid-template-columns:1fr;}
          .qz-sidebar{display:none;}
        }
      `}</style>

      <AulaBar />

      <div className="qz-grid">
        {/* ── Sidebar · temario (estado dependiente del resultado) ─── */}
        <div
          className="qz-sidebar"
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
              <span>{lessonsDone * 10}% completado</span>
              <span>{lessonsDone} / 10</span>
            </div>
            <Progress pct={lessonsDone * 10} height={4} />
          </div>

          {/* Módulo 1 · Fundamentos */}
          <div
            style={{
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface-raised)",
            }}
          >
            {module1Passed ? (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CheckIcon size={12} color="#fff" strokeWidth={3} />
              </div>
            ) : (
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
                1
              </div>
            )}
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
              padding: "10px 24px 16px 58px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: "var(--surface-raised)",
            }}
          >
            <LessonDone label="Bienvenida al curso" />
            <LessonDone label="¿Qué es Claude y Claude Code?" />
            <LessonDone label="Tu primer prompt efectivo" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                margin: "-4px -16px",
                padding: "4px 16px",
                borderRadius: 8,
                background: "var(--surface-default)",
                borderLeft: "2px solid var(--accent)",
              }}
            >
              <HelpCircleIcon size={14} color="var(--text-headline)" strokeWidth={2} />
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
                Quiz: Fundamentos
              </span>
            </div>
          </div>

          {/* Módulo 2 · desbloqueado tras aprobar */}
          {module2Unlocked ? (
            <Link
              href={ROUTES.aula}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 24px",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              <ChevronRightIcon size={14} color="var(--text-muted)" />
            </Link>
          ) : (
            <ModuleLocked label="Módulo 2 · Del diseño a la app" />
          )}

          <ModuleLocked label="Módulo 3 · A producción" />
        </div>

        {/* ── Contenido · pregunta o resultado ──────────────────────── */}
        <div
          className="qz-main"
          style={{ padding: "48px 40px", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "100%", maxWidth: 680 }}>
            {!showResult && (
              <>
                <div
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 16,
                    padding: 40,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Eyebrow rule={false} tracking="0.16em">
                      EVALUACIÓN MÓDULO 1: FUNDAMENTOS
                    </Eyebrow>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.04em",
                        color: "var(--ar-bone)",
                        border: "1px solid var(--border-strong)",
                        padding: "5px 12px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Pregunta {qIndex + 1} de {TOTAL}
                    </span>
                  </div>

                  <Progress
                    pct={Math.round(((qIndex + 1) / TOTAL) * 100)}
                    height={5}
                    style={{ marginBottom: 32 }}
                  />

                  <h2
                    id="qz-enunciado"
                    tabIndex={-1}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 24,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3,
                      color: "var(--text-headline)",
                      margin: "0 0 28px",
                    }}
                  >
                    {q.enunciado}
                  </h2>

                  <div
                    role="radiogroup"
                    aria-labelledby="qz-enunciado"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    {q.opciones.map((o) => {
                      const isSelected = o.id === selectedId;
                      const isCorrectOpt = o.id === q.correctaId;
                      let rowStyle: CSSProperties;
                      let dotWrapStyle: CSSProperties;
                      let isDotFilled = false;
                      let isCheckIcon = false;
                      let isXIcon = false;
                      let textColor = "var(--ar-bone)";
                      let textWeight = 400;
                      const base: CSSProperties = {
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "16px 18px",
                        borderRadius: 10,
                      };
                      if (!isChecked) {
                        if (isSelected) {
                          rowStyle = {
                            ...base,
                            border: "1.5px solid var(--accent)",
                            background: "var(--surface-default)",
                            cursor: "pointer",
                          };
                          dotWrapStyle = {
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            border: "1.5px solid var(--accent)",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          };
                          isDotFilled = true;
                          textColor = "var(--text-headline)";
                          textWeight = 500;
                        } else {
                          rowStyle = {
                            ...base,
                            border: "1px solid var(--border-default)",
                            background: "transparent",
                            cursor: "pointer",
                          };
                          dotWrapStyle = {
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            border: "1.5px solid var(--border-strong)",
                            flexShrink: 0,
                          };
                        }
                      } else {
                        if (isCorrectOpt) {
                          rowStyle = {
                            ...base,
                            border: "1.5px solid var(--success)",
                            background: "var(--success-subtle)",
                            cursor: "default",
                          };
                          dotWrapStyle = {
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            background: "var(--success)",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          };
                          isCheckIcon = true;
                          textColor = "var(--text-headline)";
                          textWeight = 500;
                        } else if (isSelected) {
                          rowStyle = {
                            ...base,
                            border: "1.5px solid var(--error)",
                            background: "var(--error-subtle)",
                            cursor: "default",
                          };
                          dotWrapStyle = {
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            background: "var(--error)",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          };
                          isXIcon = true;
                          textColor = "var(--text-headline)";
                          textWeight = 500;
                        } else {
                          rowStyle = {
                            ...base,
                            border: "1px solid var(--border-default)",
                            background: "transparent",
                            opacity: 0.55,
                            cursor: "default",
                          };
                          dotWrapStyle = {
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            border: "1.5px solid var(--border-default)",
                            flexShrink: 0,
                          };
                        }
                      }
                      return (
                        <div
                          key={o.id}
                          role="radio"
                          aria-checked={isSelected}
                          onClick={isChecked ? undefined : () => selectOption(o.id)}
                          style={rowStyle}
                        >
                          <div style={dotWrapStyle}>
                            {isDotFilled && (
                              <div
                                style={{
                                  width: 9,
                                  height: 9,
                                  borderRadius: 999,
                                  background: "var(--accent)",
                                }}
                              />
                            )}
                            {isCheckIcon && (
                              <CheckIcon size={11} color="#fff" strokeWidth={3} />
                            )}
                            {isXIcon && <XIcon size={10} color="#fff" strokeWidth={3} />}
                          </div>
                          <span
                            style={{
                              fontSize: 15,
                              color: textColor,
                              fontWeight: textWeight,
                              flex: 1,
                            }}
                          >
                            {o.texto}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {!isChecked && (
                    <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 32px" }}>
                      Selecciona una opción.
                    </p>
                  )}

                  {isChecked && (
                    <div
                      role="status"
                      aria-live="polite"
                      style={{
                        display: "flex",
                        gap: 10,
                        padding: "14px 16px",
                        borderRadius: 10,
                        marginBottom: 24,
                        background: isCorrectSelected
                          ? "var(--success-subtle)"
                          : "var(--error-subtle)",
                        border:
                          "1px solid " +
                          (isCorrectSelected ? "var(--success)" : "var(--error)"),
                      }}
                    >
                      {isCorrectSelected ? (
                        <CheckIcon
                          size={16}
                          color="var(--success)"
                          strokeWidth={2.5}
                          style={{ marginTop: 2 }}
                        />
                      ) : (
                        <XIcon
                          size={16}
                          color="var(--error)"
                          strokeWidth={2.5}
                          style={{ marginTop: 2 }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: 14,
                          lineHeight: 1.5,
                          color: "var(--text-headline)",
                        }}
                      >
                        {feedbackText}
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: 24,
                      borderTop: "1px solid var(--border-default)",
                    }}
                  >
                    {qIndex > 0 ? (
                      <button
                        onClick={prevQuestion}
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 14,
                          color: "var(--text-headline)",
                          background: "transparent",
                          border: "1px solid var(--border-strong)",
                          borderRadius: 999,
                          padding: "12px 22px",
                          cursor: "pointer",
                        }}
                      >
                        Anterior
                      </button>
                    ) : (
                      <span
                        style={{
                          fontSize: 14,
                          color: "var(--text-muted)",
                          opacity: 0.5,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Anterior
                      </span>
                    )}
                    <button
                      onClick={primaryAction}
                      disabled={primaryDisabled}
                      className="el-btn el-btn-claude"
                    >
                      {submitting && (
                        <span
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
                      )}
                      {primaryLabel}
                    </button>
                  </div>
                </div>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 20,
                  }}
                >
                  Apruebas con 70% o más · Sin autoguardado: si abandonas, el intento se
                  reinicia.
                </p>
              </>
            )}

            {showResult && (
              <div
                role="status"
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-default)",
                  borderRadius: 16,
                  padding: 44,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    margin: "0 auto",
                    background: passed ? "var(--success)" : "transparent",
                    border: passed ? "none" : "1.5px solid var(--border-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {passed ? (
                    <CheckIcon size={26} color="#fff" strokeWidth={2.5} />
                  ) : (
                    <RetryIcon size={24} color="var(--ar-bone)" strokeWidth={1.8} />
                  )}
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 28,
                    letterSpacing: "-0.02em",
                    color: "var(--text-headline)",
                    margin: "24px 0 8px",
                  }}
                >
                  {passed ? "¡Aprobaste el quiz!" : "Casi lo logras"}
                </h2>

                {passed ? (
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 18,
                      color: "var(--text-warm)",
                      margin: "0 0 32px",
                    }}
                  >
                    Del repaso a la práctica
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--ar-bone)",
                      maxWidth: "44ch",
                      margin: "0 auto 32px",
                    }}
                  >
                    Necesitas 70% para aprobar. Repasa el módulo y vuelve a intentarlo.
                  </p>
                )}

                <div style={{ maxWidth: 320, margin: "0 auto 24px" }}>
                  <div
                    style={{
                      fontSize: 15,
                      color: "var(--text-headline)",
                      fontWeight: 600,
                      marginBottom: 10,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {correctCount} de {TOTAL} correctas · {pct}%
                  </div>
                  <Progress
                    pct={pct}
                    height={6}
                    color={passed ? "var(--success)" : "var(--error)"}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    marginBottom: 28,
                    flexWrap: "wrap",
                  }}
                >
                  {passed && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.04em",
                        color:
                          resultXpText === "XP ya obtenido"
                            ? "var(--text-muted)"
                            : "var(--text-headline)",
                        border: "1px solid var(--border-strong)",
                        padding: "6px 14px",
                        borderRadius: 999,
                      }}
                    >
                      {resultXpText}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      padding: "6px 14px",
                      borderRadius: 999,
                      color: passed ? "var(--success)" : "var(--error)",
                      background: passed ? "var(--success-subtle)" : "var(--error-subtle)",
                    }}
                  >
                    {passed ? "Aprobado" : "No aprobado"}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 8,
                  }}
                >
                  {QUESTIONS.map((qq, i) => {
                    const isCorrect = selections[i] === qq.correctaId;
                    return (
                      <span
                        key={qq.id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 12px",
                          borderRadius: 999,
                          border:
                            "1px solid " +
                            (isCorrect ? "var(--success)" : "var(--error)"),
                          background: isCorrect
                            ? "var(--success-subtle)"
                            : "var(--error-subtle)",
                          fontSize: 13,
                          color: "var(--text-headline)",
                        }}
                      >
                        {isCorrect ? (
                          <CheckIcon size={10} color="var(--success)" strokeWidth={3} />
                        ) : (
                          <XIcon size={9} color="var(--error)" strokeWidth={3} />
                        )}
                        P{i + 1}
                      </span>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowReview(!showReview)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: 13,
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 8,
                    marginBottom: 8,
                  }}
                >
                  {showReview ? "Ocultar repaso" : "Ver repaso"}
                </button>

                {showReview && (
                  <div
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      margin: "16px 0 32px",
                      paddingTop: 16,
                      borderTop: "1px solid var(--border-default)",
                    }}
                  >
                    {QUESTIONS.map((qq, i) => {
                      const sel = selections[i];
                      const selOpt = qq.opciones.find((o) => o.id === sel);
                      const correctOpt = qq.opciones.find((o) => o.id === qq.correctaId);
                      const isCorrect = sel === qq.correctaId;
                      return (
                        <div
                          key={qq.id}
                          style={{
                            padding: "14px 16px",
                            borderRadius: 10,
                            border: "1px solid var(--border-default)",
                            background: "var(--surface-default)",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 14,
                              color: "var(--text-headline)",
                              fontWeight: 500,
                              marginBottom: 6,
                            }}
                          >
                            {i + 1}. {qq.enunciado}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              color: "var(--ar-bone)",
                              marginBottom: 2,
                            }}
                          >
                            Tu respuesta: {selOpt ? selOpt.texto : "(sin responder)"}
                          </div>
                          {!isCorrect && (
                            <div style={{ fontSize: 13, color: "var(--success)" }}>
                              Respuesta correcta: {correctOpt?.texto}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 14,
                    flexWrap: "wrap",
                    paddingTop: 8,
                  }}
                >
                  {!passed && (
                    <>
                      <Link
                        href={ROUTES.aula}
                        className="el-btn el-btn-outline"
                        style={{ fontWeight: 400 }}
                      >
                        Revisar lección
                      </Link>
                      <button
                        onClick={retryQuiz}
                        className="el-btn el-btn-claude"
                        style={{ gap: 8 }}
                      >
                        <RetryIcon size={14} strokeWidth={2} />
                        Reintentar quiz
                      </button>
                    </>
                  )}
                  {passed && (
                    <Link
                      href={ROUTES.aula}
                      className="el-btn el-btn-claude"
                      style={{ gap: 8 }}
                    >
                      Continuar módulo
                      <ArrowRightIcon size={14} strokeWidth={2} />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {toast && (
          <div
            role="status"
            style={{
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--surface-raised)",
              border: "1px solid var(--border-strong)",
              borderRadius: 999,
              padding: "14px 24px",
              fontSize: 14,
              color: "var(--text-headline)",
              boxShadow: "var(--shadow-lift)",
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
          >
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
