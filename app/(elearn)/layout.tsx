import "./elearn.css";

// Grupo de rutas de la plataforma e-learning "Claude desde cero"
// (dashboard, rutas, curso, lección/aula, quiz). El wrapper .elearn
// scopa los tokens del design system del handoff — ver elearn.css.
export default function ElearnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="elearn">{children}</div>;
}
