import { competitors, programmes, kindColors } from "../data";
import type { ModuleProps } from "../types";
import { Tag } from "../shared";

const ourModules = programmes.find((p) => p.id === "msc-ai")!.modules;

export default function CompetitorsModule({ onSelect, selection, goTo }: ModuleProps) {
  return (
    <div>
      <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Competitor Institutions</h2>
      <p className="mt-1 text-[14px] text-[#64748b]">
        {competitors.length} institutions tracked · programme pages monitored for curriculum and positioning changes
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {competitors.map((c) => {
          const active = selection?.kind === "competitor" && selection.id === c.id;
          const overlap = c.modules.filter((m) => ourModules.includes(m)).length;
          return (
            <button
              key={c.id}
              onClick={() => onSelect({ kind: "competitor", id: c.id })}
              className={`rounded-xl border bg-white p-5 text-left transition-all hover:shadow-md ${
                active ? "border-accent ring-2 ring-accent/15" : "border-[#e6e9ef]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-[16px] font-medium text-[#0f172a]">{c.name}</div>
                <span className="rounded-md bg-[#fdf2f8] px-2 py-0.5 text-[12px] font-medium text-[#db2777]">
                  {c.rank}
                </span>
              </div>
              <div className="mt-2">
                <Tag color={kindColors.competitor}>{c.strength}</Tag>
              </div>
              <div className="mt-4 flex gap-5 border-t border-[#f1f5f9] pt-3 text-[12.5px] text-[#64748b]">
                <span>
                  <b className="text-[#0f172a]">{c.programmes}</b> AI programmes
                </span>
                <span>
                  <b className="text-[#0f172a]">{overlap}</b> shared topics
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => goTo("programmes")}
        className="mt-6 flex w-full items-center justify-between rounded-xl border border-[#e6e9ef] bg-gradient-to-br from-white to-[#f5f8ff] px-5 py-4 text-left transition-colors hover:border-accent"
      >
        <span className="text-[14px] text-[#334155]">
          <b className="text-[#0f172a]">Run a full benchmark</b> — compare our MSc AI curriculum topic-by-topic
        </span>
        <span className="text-accent">→</span>
      </button>
    </div>
  );
}
