export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold tracking-[0.2em] uppercase ${className}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-400 to-indigo-600 text-[11px] font-bold tracking-normal text-white">
        V
      </span>
      Vértice IA
    </span>
  );
}
