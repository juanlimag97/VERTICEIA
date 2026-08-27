"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Lock } from "lucide-react";
import { Logo } from "@/components/logo";
import { ProductIcon } from "@/components/product-icon";

type NavProduct = {
  id: string;
  name: string;
  unlocked: boolean;
};

export function Sidebar({ products }: { products: NavProduct[] }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-zinc-950 text-zinc-300 lg:flex">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard">
          <Logo className="text-[13px] text-white" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-medium tracking-widest text-zinc-500 uppercase">
          Área de membros
        </p>
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            pathname === "/dashboard"
              ? "bg-white/10 text-white"
              : "hover:bg-white/5 hover:text-white"
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          Dashboard
        </Link>

        <p className="mt-6 px-3 pb-2 text-[11px] font-medium tracking-widest text-zinc-500 uppercase">
          Produtos
        </p>
        <div className="flex flex-col gap-0.5">
          {products.map((product) => {
            const href = `/dashboard/${product.id}`;
            const active = pathname === href;

            if (!product.unlocked) {
              return (
                <span
                  key={product.id}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-600"
                >
                  <ProductIcon productId={product.id} className="h-4 w-4" />
                  <span className="flex-1 truncate">{product.name}</span>
                  <Lock className="h-3.5 w-3.5" />
                </span>
              );
            }

            return (
              <Link
                key={product.id}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <ProductIcon productId={product.id} className="h-4 w-4" />
                <span className="truncate">{product.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
