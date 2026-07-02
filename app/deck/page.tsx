import type { Metadata } from "next";
import Deck from "@/components/Deck";

export const metadata: Metadata = {
  title: "Capacitación · Claude Design — Del diseño a producción",
  description:
    "Deck interactivo de la capacitación 'Claude Design. Del diseño a producción'.",
};

export default function DeckPage() {
  return <Deck />;
}
