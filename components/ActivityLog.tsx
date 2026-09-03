"use client";

import { useShopStore } from "@/lib/store";
import { useEffect, useRef } from "react";

export default function ActivityLog() {
  const activityLog = useShopStore((s) => s.activityLog);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activityLog]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto overflow-x-hidden font-mono text-[11px] leading-5 px-4 py-2 space-y-px">
      {activityLog.length === 0 ? (
        <span className="text-muted-foreground italic">
          Waiting for WebMCP tool invocations...
        </span>
      ) : (
        activityLog.map((entry, i) => (
          <div key={i} className="flex items-baseline gap-2 min-w-0">
            <span className="text-muted-foreground/60 shrink-0 tabular-nums">
              [{entry.timestamp.toLocaleTimeString()}]
            </span>
            <span className="text-primary font-semibold shrink-0">
              {entry.tool}
            </span>
            {entry.args && (
              <span className="text-muted-foreground shrink-0 truncate max-w-[200px]">
                ({entry.args})
              </span>
            )}
            <span className="text-emerald-600 dark:text-emerald-400 truncate">
              &rarr; {entry.result}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
