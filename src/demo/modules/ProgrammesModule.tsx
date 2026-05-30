import { useState } from "react";
import { programmes, competitors, kindColors } from "../data";
import type { ModuleProps } from "../types";
import { Processing, Reveal, SectionLabel, Stat } from "../shared";

// MSc AI benchmark (Scenario 2)
const ourModules = programmes.find((p) => p.id === "msc-ai")!.modules;
const allCompetitorModules = Array.from(new Set(competitors.flatMap((c) => c.modules)));
const missingTopics = allCompetitorModules.filter((m) => !ourModules.includes(m));

export default function ProgrammesModule({ onSelect, selection }: ModuleProps) {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");

  return (
    <div>
      <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Programmes</h2>
      <p className="mt-1 text-[14px] text-[#64748b]">
        {programmes.length} programmes · benchmark curricula against tracked competitor institutions
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p) => {
          const active = selection?.kind === "programme" && selection.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect({ kind: "programme", id: p.id })}
              className={`rounded-xl border bg-white p-4 text-left transition-all hover:shadow-md ${
                active ? "border-accent ring-2 ring-accent/15" : "border-[#e6e9ef]"
              }`}
            >
              <div className="font-display text-[15.5px] font-medium text-[#0f172a]">{p.name}</div>
              <div className="mt-0.5 text-[12.5px] text-[#94a3b8]">
                {p.level} · {p.students} students
              </div>
              <div className="mt-2.5 text-[12.5px] text-[#64748b]">{p.modules.length} modules</div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-[#e6e9ef] bg-gradient-to-br from-white to-[#f5f8ff] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <SectionLabel>Competitive intelligence</SectionLabel>
            <h3 className="font-display text-[18px] font-medium text-[#0f172a]">
              Benchmark MSc Artificial Intelligence
            </h3>
            <p className="mt-1 text-[13.5px] text-[#64748b]">
              Compare curriculum coverage against {competitors.length} competitor institutions.
            </p>
          </div>
          {phase === "idle" && (
            <button
              onClick={() => setPhase("running")}
              className="rounded-lg bg-accent px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-light"
            >
              Run benchmark
            </button>
          )}
        </div>

        {phase === "running" && (
          <div className="mt-5">
            <Processing
              steps={[
                "Parsing our curriculum & module data",
                "Crawling competitor programme pages",
                "Aligning topics across institutions",
                "Scoring coverage, strengths & gaps",
              ]}
              onDone={() => setPhase("done")}
            />
          </div>
        )}

        {phase === "done" && <Benchmark onSelect={onSelect} />}
      </div>
    </div>
  );
}

function Benchmark({ onSelect }: { onSelect: ModuleProps["onSelect"] }) {
  const coverage = Math.round((ourModules.length / allCompetitorModules.length) * 100);
  return (
    <div className="mt-6 space-y-5">
      <Reveal>
        <div className="grid grid-cols-3 gap-3">
          <Stat value={`${coverage}%`} label="Topic coverage" accent />
          <Stat value={String(missingTopics.length)} label="Gaps detected" />
          <Stat value={`${competitors.length}`} label="Peers compared" />
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="overflow-hidden rounded-xl border border-[#e6e9ef] bg-white">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#eef2f7] bg-[#fafbfd] text-left text-[#64748b]">
                <th className="px-4 py-2.5 font-medium">Topic</th>
                <th className="px-3 py-2.5 text-center font-medium">Us</th>
                {competitors.map((c) => (
                  <th key={c.id} className="px-3 py-2.5 text-center font-medium">
                    <button onClick={() => onSelect({ kind: "competitor", id: c.id })} className="hover:text-accent">
                      {c.name.split(" ")[0]}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allCompetitorModules.map((m) => {
                const usHas = ourModules.includes(m);
                return (
                  <tr key={m} className="border-b border-[#f4f6f9] last:border-0">
                    <td className="px-4 py-2.5 text-[#334155]">{m}</td>
                    <Cell on={usHas} highlight={!usHas} />
                    {competitors.map((c) => (
                      <Cell key={c.id} on={c.modules.includes(m)} />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#fde2e2] bg-[#fef6f6] p-5">
            <div className="mb-3 text-[13px] font-semibold text-[#b91c1c]">Missing topics</div>
            <div className="space-y-2">
              {missingTopics.map((m) => (
                <div key={m} className="flex items-center gap-2 text-[13.5px] text-[#334155]">
                  <span className="text-[#ef4444]">✕</span> {m}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#d6e4ff] bg-[#f5f8ff] p-5">
            <div className="mb-3 text-[13px] font-semibold text-accent">Recommendations</div>
            <div className="space-y-2">
              {[
                "Add an AI Ethics & Governance module",
                "Introduce an industry capstone project",
                "Expand AI Product Management coverage",
                "Integrate sustainability into core ML",
              ].map((r) => (
                <div key={r} className="flex items-start gap-2 text-[13.5px] text-[#334155]">
                  <span className="mt-0.5 text-accent">＋</span> {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Cell({ on, highlight }: { on: boolean; highlight?: boolean }) {
  return (
    <td className="px-3 py-2.5 text-center">
      {on ? (
        <span style={{ color: kindColors.theme }}>●</span>
      ) : (
        <span className={highlight ? "text-[#ef4444]" : "text-[#d6dbe3]"}>○</span>
      )}
    </td>
  );
}
