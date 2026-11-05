"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ExpandableDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 140;

  return (
    <div className="max-w-3xl">
      <p
        className={`text-cinza-texto ${
          !expanded && isLong ? "line-clamp-2" : ""
        }`}
      >
        {text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 flex items-center gap-1 text-sm font-medium text-cinza-texto hover:text-tinta dark:hover:text-nevoa"
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
