import { faculty, kindColors } from "../data";
import type { ModuleProps } from "../types";
import { Tag } from "../shared";

export default function FacultyModule({ onSelect, selection }: ModuleProps) {
  return (
    <div>
      <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Faculty</h2>
      <p className="mt-1 text-[14px] text-[#64748b]">
        {faculty.length} profiles · publications, grants, and collaborators connected from institutional sources
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {faculty.map((f) => {
          const active = selection?.kind === "faculty" && selection.id === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onSelect({ kind: "faculty", id: f.id })}
              className={`rounded-xl border bg-white p-5 text-left transition-all hover:shadow-md ${
                active ? "border-accent ring-2 ring-accent/15" : "border-[#e6e9ef]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-medium"
                  style={{ backgroundColor: `${kindColors.faculty}14`, color: kindColors.faculty }}
                >
                  {f.name.split(" ").slice(-1)[0][0]}
                  {f.name.split(" ")[0][0]}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[16px] font-medium text-[#0f172a]">{f.name}</div>
                  <div className="text-[13px] text-[#64748b]">{f.title}</div>
                  <div className="text-[12.5px] text-[#94a3b8]">{f.department}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {f.interests.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </div>
              <div className="mt-4 flex gap-5 border-t border-[#f1f5f9] pt-3 text-[12.5px] text-[#64748b]">
                <span>
                  <b className="text-[#0f172a]">{f.publications}</b> papers
                </span>
                <span>
                  <b className="text-[#0f172a]">{f.grants}</b> grants
                </span>
                <span>
                  <b className="text-[#0f172a]">{(f.citations / 1000).toFixed(1)}k</b> cites
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
