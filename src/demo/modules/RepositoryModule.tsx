import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { kindColors } from "../data";
import type { ModuleProps } from "../types";
import { Reveal, SectionLabel, Stat } from "../shared";

const TOTAL = 100;
const classifyThemes = [
  { name: "AI", count: 34, color: "#2563eb" },
  { name: "Sustainability", count: 26, color: "#059669" },
  { name: "FinTech", count: 22, color: "#7c3aed" },
  { name: "Education", count: 18, color: "#d97706" },
];

export default function RepositoryModule({ goTo }: ModuleProps) {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [processed, setProcessed] = useState(0);

  useEffect(() => {
    if (phase !== "running") return;
    if (processed >= TOTAL) {
      const t = setTimeout(() => setPhase("done"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setProcessed((p) => Math.min(TOTAL, p + 4)), 45);
    return () => clearTimeout(t);
  }, [phase, processed]);

  const start = () => {
    setProcessed(0);
    setPhase("running");
  };

  return (
    <div className="mx-auto max-w-[820px]">
      <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Research Repository</h2>
      <p className="mt-1 text-[14px] text-[#64748b]">
        Drop in new papers — Operon classifies, summarizes, enriches metadata, detects duplicates, and updates the graph.
      </p>

      {phase === "idle" && (
        <button
          onClick={start}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#cbd5e1] bg-[#fafbfd] py-12 text-[15px] font-medium text-[#475569] transition-colors hover:border-accent hover:text-accent"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
          </svg>
          Upload 100 research papers
        </button>
      )}

      {phase === "running" && (
        <div className="mt-6 rounded-2xl border border-[#e6e9ef] bg-white p-6">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[14px] font-medium text-[#0f172a]">Processing papers…</span>
            <span className="font-display text-[20px] font-medium text-accent">
              {processed}/{TOTAL}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#eef2f7]">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${processed}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="mt-5 grid grid-cols-10 gap-1.5">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-[3px] transition-colors"
                style={{ backgroundColor: i < processed ? kindColors.faculty : "#eef2f7" }}
              />
            ))}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="mt-6 space-y-5">
          <Reveal>
            <div className="rounded-2xl border border-[#d6e4ff] bg-[#f5f8ff] p-5">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-accent">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] text-white">✓</span>
                Classification complete — knowledge graph updated
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Stat value="100/100" label="Metadata enriched" />
                <Stat value="4" label="Duplicates detected" accent />
                <Stat value="4" label="Themes extracted" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-[#e6e9ef] bg-white p-5">
              <SectionLabel>Auto-classified themes</SectionLabel>
              <div className="space-y-3">
                {classifyThemes.map((t) => (
                  <div key={t.name}>
                    <div className="mb-1 flex justify-between text-[13px]">
                      <span className="text-[#334155]">{t.name}</span>
                      <span className="text-[#94a3b8]">{t.count} papers</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#eef2f7]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: t.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${t.count}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e6e9ef] bg-white p-5">
              <div className="text-[13.5px] text-[#475569]">
                Pipeline ran: <b className="text-[#0f172a]">classify → summarize → enrich → dedupe → link</b>
              </div>
              <button
                onClick={() => goTo("knowledge")}
                className="rounded-lg border border-accent px-4 py-2 text-[13.5px] font-medium text-accent transition-colors hover:bg-accent hover:text-white"
              >
                View updated graph →
              </button>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
