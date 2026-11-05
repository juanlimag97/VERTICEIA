import Link from "next/link";
import { Search } from "lucide-react";
import { UserMenu } from "@/components/dashboard/user-menu";
import { Logo } from "@/components/logo";

export function Topbar({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-zinc-200 bg-nevoa/80 px-4 backdrop-blur-sm dark:border-white/10 dark:bg-tinta/80 lg:px-8">
      <Link href="/dashboard" className="lg:hidden">
        <Logo className="text-base" />
      </Link>
      <form action="/dashboard" className="max-w-sm flex-1">
        <label className="relative block">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-cinza-texto" />
          <input
            type="text"
            name="q"
            placeholder="Buscar..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pr-3 pl-9 text-sm outline-none focus:border-volt dark:border-white/10 dark:bg-grafite"
          />
        </label>
      </form>

      <div className="ml-auto">
        <UserMenu name={name} email={email} />
      </div>
    </header>
  );
}
