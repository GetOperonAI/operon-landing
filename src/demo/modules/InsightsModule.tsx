import { useState } from "react";
import { motion } from "framer-motion";
import { themes, kindColors } from "../data";
import type { ModuleProps } from "../types";
import { Processing, Reveal, SectionLabel, Stat } from "../shared";

const sorted = [...themes].sort((a, b) => b.growth - a.growth);
const maxGrowth = sorted[0].growth;

const emerging = [
  "AI for Healthcare",
  "Sustainable Computing",
  "Climate Analytics",
  "Responsible AI",
];

const collaborations = [
  "Computer Science × Business School — Responsible FinTech",
  "Engineering × Medicine — Climate & Public Health",
  "CS × Biomedical Eng — Clinical Imaging models",
];

export default function InsightsModule({ onSelect }: ModuleProps) {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");

  return (
    <div className="mx-auto max-w-[820px]">
      <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Executive Insights</h2>
      <p className="mt-1 text-[14px] text-[#64748b]">
        Institution-wide trend analysis — growth themes, emerging collaborations, and research opportunities.
      </p>

      {phase === "idle" && (
        <div className="mt-6 rounded-2xl border border-[#e6e9ef] bg-gradient-to-br from-white to-[#f5f8ff] p-6">
          <div className="text-[15px] font-medium text-[#0f172a]">
            What are the fastest growing research areas across the institution?
          </div>
          <button
            onClick={() => setPhase("running")}
            className="mt-4 rounded-lg bg-accent px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-light"
          >
            Generate insights
          </button>
        </div>
      )}

      {phase === "running" && (
        <div className="mt-6">
          <Processing
            steps={[
              "Aggregating publication & funding signals",
              "Computing year-over-year growth by theme",
              "Detecting cross-department collaborations",
              "Surfacing emerging research opportunities",
            ]}
            onDone={() => setPhase("done")}
          />
        </div>
      )}

      {phase === "done" && (
        <div className="mt-6 space-y-5">
          <Reveal>
            <div className="grid grid-cols-3 gap-3">
              <Stat value="+42%" label="Publication growth" accent />
              <Stat value="18" label="New cross-dept projects" />
              <Stat value="4" label="Emerging areas" />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-[#e6e9ef] bg-white p-5">
              <SectionLabel>Growth by research theme (YoY)</SectionLabel>
              <div className="space-y-3.5">
                {sorted.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelect({ kind: "theme", id: t.id })}
                    className="block w-full text-left"
                  >
                    <div className="mb-1 flex justify-between text-[13px]">
                      <span className="text-[#334155]">{t.name}</span>
                      <span className="font-medium text-accent">+{t.growth}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#eef2f7]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: kindColors.theme }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(t.growth / maxGrowth) * 100}%` }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#e6e9ef] bg-white p-5">
                <SectionLabel>Emerging areas</SectionLabel>
                <ol className="space-y-2">
                  {emerging.map((e, i) => (
                    <li key={e} className="flex items-center gap-3 text-[13.5px] text-[#334155]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-[12px] font-medium text-accent">
                        {i + 1}
                      </span>
                      {e}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-[#e6e9ef] bg-white p-5">
                <SectionLabel>New collaborations</SectionLabel>
                <div className="space-y-2.5">
                  {collaborations.map((c) => (
                    <div key={c} className="flex items-start gap-2 text-[13px] text-[#334155]">
                      <span className="mt-0.5 text-accent">↔</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
