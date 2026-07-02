import type { Metadata } from "next";
import AulaScreen from "@/components/elearn/AulaScreen";
import QuizScreen from "@/components/elearn/QuizScreen";

export function generateStaticParams() {
  return [{ leccionId: "4" }, { leccionId: "5" }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ leccionId: string }>;
}): Promise<Metadata> {
  const { leccionId } = await params;
  return {
    title:
      leccionId === "4"
        ? "Quiz: Fundamentos — Aula · iAcademy"
        : "Claude Design: de brief a artefacto — Aula · iAcademy",
  };
}

export default async function LeccionPage({
  params,
}: {
  params: Promise<{ leccionId: string }>;
}) {
  const { leccionId } = await params;
  return leccionId === "4" ? <QuizScreen /> : <AulaScreen />;
}
