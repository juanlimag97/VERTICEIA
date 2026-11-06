import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  Home as HomeIcon,
  MessageCircle,
  Stethoscope,
  Target,
} from "lucide-react";
import { Logo } from "@/components/logo";
import {
  sdrFeatures,
  siteStats,
  painPoints,
  personas,
  whatsIncluded,
  faqs,
  checkoutUrl,
} from "@/lib/site-content";

export const metadata = {
  title: "Attendio: SDR de IA pro seu WhatsApp",
  description:
    "Um SDR de inteligência artificial que atende, qualifica e agenda reuniões automaticamente no WhatsApp, direto no seu CRM.",
};

const FEATURE_ICONS = [MessageCircle, Target, CalendarCheck];
const PERSONA_ICONS = {
  GraduationCap,
  Stethoscope,
  Home: HomeIcon,
  Briefcase,
};

export default function InicioPage() {
  const whatsappUrl = process.env.NEXT_PUBLIC_SUPPORT_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";

  return (
    <div className="min-h-screen bg-nevoa dark:bg-tinta">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-10">
        <Logo className="text-xl" />
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center rounded-full bg-volt px-5 text-xs font-medium text-tinta transition hover:bg-volt-escuro"
        >
          Quero meu SDR
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center lg:py-24">
        <span className="label-mono flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-1.5 text-[11px] text-cinza-texto dark:border-white/10">
          <span className="h-2 w-2 rounded-full bg-volt" />
          Online 24/7
        </span>
        <p className="label-mono text-xs text-volt-escuro dark:text-volt">
          Seu atendente que nunca dorme
        </p>
        <h1 className="text-4xl text-balance sm:text-5xl">
          Seu SDR de IA que atende, qualifica e agenda direto no WhatsApp
        </h1>
        <p className="max-w-xl text-lg text-cinza-texto">
          Nenhum cliente fica sem resposta. A Attendio conversa com quem
          chega, qualifica pelo seu perfil ideal e marca a reunião sozinha,
          direto no seu CRM.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center gap-1.5 rounded-full bg-volt px-6 text-sm font-medium text-tinta transition hover:bg-volt-escuro"
          >
            Quero meu SDR de IA
            <ArrowRight className="h-4 w-4" />
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-1.5 rounded-full bg-tinta px-6 text-sm font-medium text-nevoa transition hover:bg-grafite"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          )}
        </div>
        <p className="text-sm text-cinza-texto">
          Já é aluno?{" "}
          <Link href="/login" className="font-medium text-volt-escuro hover:opacity-80 dark:text-volt">
            Entrar na área de membros
          </Link>
        </p>
      </section>

      {/* Dor / agitação */}
      <section className="border-y border-zinc-100 bg-white px-6 py-16 dark:border-white/5 dark:bg-grafite/40 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl">
            O que acontece quando o lead espera
          </h2>
          <div className="mt-8 flex flex-col gap-4 text-left">
            {painPoints.map((point) => (
              <p
                key={point}
                className="rounded-2xl border border-zinc-200 bg-nevoa px-5 py-4 text-sm text-cinza-texto dark:border-white/10 dark:bg-tinta"
              >
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl">
            Como o seu SDR de IA trabalha
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {sdrFeatures.map((feature, index) => {
            const Icon = FEATURE_ICONS[index] ?? MessageCircle;
            return (
              <div
                key={feature.title}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-grafite"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt/15 text-volt-escuro dark:bg-volt/10 dark:text-volt">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-cinza-texto">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pra quem é */}
      <section className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl">Pra quem é o Attendio</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {personas.map((persona) => {
            const Icon = PERSONA_ICONS[persona.icon];
            return (
              <div
                key={persona.title}
                className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-grafite"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt/15 text-volt-escuro dark:bg-volt/10 dark:text-volt">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{persona.title}</h3>
                  <p className="mt-1 text-sm text-cinza-texto">
                    {persona.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* O que você recebe */}
      <section className="border-y border-zinc-100 bg-white px-6 py-16 dark:border-white/5 dark:bg-grafite/40 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl sm:text-3xl">
            O que você recebe
          </h2>
          <ul className="mt-8 flex flex-col gap-3">
            {whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-volt-escuro dark:text-volt" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3">
          {siteStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-volt-escuro dark:text-volt">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-cinza-texto">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-6 py-16 lg:py-20">
        <h2 className="text-center text-2xl sm:text-3xl">Perguntas frequentes</h2>
        <div className="mt-8 flex flex-col divide-y divide-zinc-200 dark:divide-white/10">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-5">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm text-cinza-texto">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Implementação (upsell) */}
      <section className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <div className="rounded-2xl border border-white/10 bg-tinta p-8 text-center text-nevoa">
          <p className="label-mono text-xs text-volt">
            Oferta exclusiva
          </p>
          <h3 className="mt-2 text-xl">
            Prefere que a gente implemente pra você?
          </h3>
          <p className="mt-2 text-sm text-cinza-texto">
            A equipe da Attendio configura o SDR do zero, já integrado ao
            seu CRM.
          </p>
          <a
            href={process.env.NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-14 items-center gap-1.5 rounded-full bg-volt px-6 text-sm font-medium text-tinta transition hover:bg-volt-escuro"
          >
            Quero a implementação
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-6 py-10 text-center dark:border-white/5">
        <Logo className="justify-center text-xl" />
        <div className="mt-4 flex items-center justify-center gap-4 text-cinza-texto">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-tinta dark:hover:text-nevoa"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-tinta dark:hover:text-nevoa"
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
