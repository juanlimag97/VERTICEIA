"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ExpandableDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 140;

  return (
    <div className="max-w-3xl">
      <p
        className={`text-zinc-600 dark:text-zinc-400 ${
          !expanded && isLong ? "line-clamp-2" : ""
        }`}
      >
        {text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          {expanded ? "ver menos" : "ver mais"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}
