import Link from "next/link";
import { CheckCircle2, LogIn, MessageCircle, Users, LifeBuoy, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata = {
  title: "Compra aprovada — Vértice IA",
  description: "Sua compra foi aprovada. Veja os próximos passos para acessar.",
};

export default function ObrigadoPage() {
  const whatsappGroupUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL;
  const supportUrl = process.env.NEXT_PUBLIC_SUPPORT_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";

  const steps = [
    {
      icon: LogIn,
      title: "Acesse sua conta",
      description:
        "Enviamos um e-mail com o link para você criar sua senha e entrar na área de membros. Não achou? Confere a caixa de spam/promoções.",
      button: { label: "Ir para o login", href: "/login", external: false },
    },
    whatsappGroupUrl
      ? {
          icon: Users,
          title: "Entre no grupo do WhatsApp",
          description:
            "Só a nossa equipe publica por lá — é o canal de avisos de novidades e atualizações da plataforma, sem spam.",
          button: { label: "Entrar no grupo", href: whatsappGroupUrl, external: true },
        }
      : null,
    supportUrl
      ? {
          icon: LifeBuoy,
          title: "Precisa de ajuda?",
          description:
            "Qualquer dúvida no acesso ou na compra, fala com a gente direto pelo WhatsApp.",
          button: { label: "Falar no WhatsApp", href: supportUrl, external: true },
        }
      : null,
  ].filter((step): step is NonNullable<typeof step> => step !== null);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="flex h-16 items-center px-6 lg:px-10">
        <Logo className="text-xs" />
      </header>

      <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 pt-10 pb-20 text-center">
        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          Sua compra foi aprovada
        </span>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Bem-vindo à Vértice IA!
        </h1>
        <p className="max-w-lg text-zinc-600 dark:text-zinc-400">
          Falta pouco pra você começar. Segue os passos abaixo pra garantir
          seu acesso e não perder nenhum aviso importante.
        </p>

        <div className="mt-8 flex w-full flex-col gap-4 text-left">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-4 sm:flex-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                  <step.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium text-zinc-400">
                    Passo {index + 1}
                  </p>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>

              {step.button.external ? (
                <a
                  href={step.button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                >
                  {step.button.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={step.button.href}
                  className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                >
                  {step.button.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-100 px-6 py-10 text-center dark:border-zinc-900">
        <Logo className="justify-center text-xs" />
        <div className="mt-4 flex items-center justify-center gap-4 text-zinc-500">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-zinc-900 dark:hover:text-zinc-200"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {supportUrl && (
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-zinc-900 dark:hover:text-zinc-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
