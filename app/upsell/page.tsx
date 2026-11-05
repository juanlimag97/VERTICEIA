import { UpsellContent } from "./upsell-content";

export const metadata = {
  title: "Acesso liberado — Attendio",
  description: "Assista até o final antes de continuar.",
  robots: { index: false, follow: false },
};

export default function UpsellPage() {
  return <UpsellContent />;
}
