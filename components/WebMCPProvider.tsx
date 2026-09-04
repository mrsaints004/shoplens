"use client";

import { useEffect, useState } from "react";
import { getToolDefinitions } from "@/lib/tools";

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: {
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute: (args: Record<string, unknown>) => Promise<unknown>;
        },
        options?: { signal?: AbortSignal }
      ) => Promise<void>;
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

    const controller = new AbortController();
    const tools = getToolDefinitions();
    let registered = 0;

    async function registerAll() {
      for (const tool of tools) {
        try {
          await document.modelContext!.registerTool(
            {
              name: tool.name,
              description: tool.description,
              inputSchema: tool.inputSchema,
              execute: async (args: Record<string, unknown>) => {
                try {
                  return await tool.execute(args);
                } catch (err) {
                  return { error: String(err) };
                }
              },
            },
            { signal: controller.signal }
          );
          registered++;
        } catch {
          // Tool registration failed, continue with others
        }
      }
      setStatus(registered > 0 ? "connected" : "unavailable");
    }

    registerAll();

    return () => {
      controller.abort();
    };
  }, []);

  return <>{children}</>;
}
