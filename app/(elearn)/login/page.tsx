import type { Metadata } from "next";
import LoginScreen from "@/components/elearn/LoginScreen";

export const metadata: Metadata = {
  title: "Iniciar sesión — iAcademy · Claude desde cero",
  description: "Ingresa para continuar tu ruta en iAcademy.",
};

export default function LoginPage() {
  return <LoginScreen />;
}
