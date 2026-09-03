"use client";

import { useEffect, useState } from "react";
import { getToolDefinitions } from "@/lib/tools";

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        name: string,
        definition: {
          description: string;
          parameters: Record<string, unknown>;
        },
        handler: (args: Record<string, unknown>) => unknown
      ) => { unregister: () => void };
    };
  }
}

export default function WebMCPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, setStatus] = useState<"checking" | "connected" | "unavailable">("checking");

  useEffect(() => {
    if (!("modelContext" in document) || !document.modelContext) {
      setStatus("unavailable");
      return;
    }

    const tools = getToolDefinitions();
    const cleanupFns: Array<{ unregister: () => void }> = [];

    for (const tool of tools) {
      try {
        const registration = document.modelContext.registerTool(
          tool.name,
          {
            description: tool.description,
            parameters: tool.parameters,
          },
          (args: Record<string, unknown>) => {
            try {
              return tool.execute(args);
            } catch (err) {
              return { error: String(err) };
            }
          }
        );
        cleanupFns.push(registration);
      } catch {
        // Tool registration failed, continue with others
      }
    }

    setStatus(cleanupFns.length > 0 ? "connected" : "unavailable");

    return () => {
      for (const fn of cleanupFns) {
        try {
          fn.unregister();
        } catch {
          // cleanup failure is non-critical
        }
      }
    };
  }, []);

  return <>{children}</>;
}
