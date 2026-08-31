import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { ProductIcon } from "@/components/product-icon";
import { siteProducts, siteStats } from "@/lib/site-content";

export const metadata = {
  title: "Vértice IA — Cursos e implementações de IA para o seu negócio",
  description:
    "Cursos práticos e implementações prontas de IA para negócios locais: perfil que converte, reputação 5 estrelas e mais.",
};

export default function InicioPage() {
  const whatsappUrl = process.env.NEXT_PUBLIC_SUPPORT_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-10">
        <Logo className="text-xs" />
        <a
          href="#produtos"
          className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Ver produtos
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center lg:py-24">
        <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
          [SEU POSICIONAMENTO AQUI — ex: IA aplicada a negócios locais]
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Mais clientes, mais avaliações 5 estrelas, mais vendas — com IA
          aplicada de verdade
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Cursos curtos e práticos, com implementações prontas pra você
          aplicar no seu negócio essa semana — sem enrolação.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href="#produtos"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Ver produtos
            <ArrowRight className="h-4 w-4" />
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-6 py-3 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3">
          {siteStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Escolha por onde começar
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Todos os cursos são práticos, com aula curta e passo a passo pra
            aplicar no mesmo dia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {siteProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                <ProductIcon productId={product.id} className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {product.tagline}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500">
                  {product.price}
                </span>
                <a
                  href={product.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Quero esse
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Já é aluno?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Entrar na área de membros
          </Link>
        </p>
      </section>

      {/* Implementação */}
      <section className="mx-auto max-w-3xl px-6 pb-16 lg:pb-24">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center text-white">
          <p className="text-xs font-medium tracking-widest text-indigo-300 uppercase">
            Oferta exclusiva
          </p>
          <h3 className="mt-2 text-xl font-semibold">
            Prefere que a gente implemente pra você?
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            A equipe da Vértice IA implementa tudo do zero no seu negócio.
          </p>
          <a
            href={process.env.NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
          >
            Quero a implementação
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
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
          {whatsappUrl && (
            <a
              href={whatsappUrl}
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
