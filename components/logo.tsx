export function Logo({
  className = "",
  variant = "auto",
}: {
  className?: string;
  variant?: "auto" | "dark-surface";
}) {
  const onDark = variant === "dark-surface";
  const textClass = onDark ? "text-nevoa" : "text-tinta dark:text-nevoa";
  const ringClass = onDark ? "stroke-volt" : "stroke-tinta dark:stroke-volt";
  const dotClass = onDark ? "fill-volt" : "fill-volt-escuro dark:fill-volt";

  return (
    <span
      className={`inline-flex items-baseline font-display font-extrabold tracking-[-0.04em] ${textClass} ${className}`}
    >
      attendi
      <svg
        viewBox="0 0 118 128"
        width="0.62em"
        height="0.62em"
        className="relative top-[0.07em]"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="78"
          r="38"
          fill="none"
          strokeWidth="22"
          className={ringClass}
        />
        <circle cx="100" cy="18" r="15" className={dotClass} />
      </svg>
      <span className="sr-only">o</span>
    </span>
  );
}
