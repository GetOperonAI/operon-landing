import { useState } from "react";
import { motion } from "framer-motion";
import type { ModuleId, Selection } from "./types";
import Sidebar from "./Sidebar";
import ContextPanel from "./ContextPanel";
import KnowledgeGraph from "./KnowledgeGraph";
import FacultyModule from "./modules/FacultyModule";
import ResearchModule from "./modules/ResearchModule";
import ProgrammesModule from "./modules/ProgrammesModule";
import RepositoryModule from "./modules/RepositoryModule";
import CompetitorsModule from "./modules/CompetitorsModule";
import InsightsModule from "./modules/InsightsModule";
import ReportsModule from "./modules/ReportsModule";
import ImpactModule from "./modules/ImpactModule";

const moduleTitles: Record<ModuleId, string> = {
  knowledge: "Knowledge Layer",
  research: "Research",
  faculty: "Faculty",
  programmes: "Programmes",
  repository: "Repository",
  competitors: "Competitors",
  insights: "Insights",
  reports: "Reports",
  impact: "Why Operon",
};

const mobileNav: ModuleId[] = [
  "knowledge",
  "research",
  "faculty",
  "programmes",
  "repository",
  "competitors",
  "insights",
  "reports",
];

export default function Demo({ onClose }: { onClose: () => void }) {
  const [module, setModule] = useState<ModuleId>("research");
  const [selection, setSelection] = useState<Selection | null>(null);

  const goTo = (m: ModuleId) => {
    setModule(m);
    setSelection(null);
  };

  const props = { onSelect: setSelection, selection, goTo };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white text-[#0f172a]">
      <motion.div
        key="workspace"
        className="flex h-full flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#e6e9ef] px-4 md:px-5">
          <div className="flex items-center gap-3">
            <button onClick={() => goTo("research")} className="font-display text-[18px] font-semibold tracking-tight text-[#0f172a]">
              operon
            </button>
            <span className="text-[#cbd5e1]">/</span>
            <span className="text-[14px] text-[#64748b]">{moduleTitles[module]}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => goTo("research")}
              className="hidden items-center gap-2 rounded-lg border border-[#e2e8f0] bg-[#fafbfd] px-3 py-1.5 text-[13px] text-[#94a3b8] transition-colors hover:border-accent hover:text-accent sm:flex"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="7" />
                <path d="M16.5 16.5L21 21" strokeLinecap="round" />
              </svg>
              Ask Operon…
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-[#e2e8f0] px-3.5 py-1.5 text-[13px] font-medium text-[#475569] transition-colors hover:bg-[#f1f5f9]"
            >
              Exit demo
            </button>
          </div>
        </header>

        {/* Mobile module nav */}
        <div className="flex gap-1.5 overflow-x-auto border-b border-[#e6e9ef] px-3 py-2 md:hidden">
          {mobileNav.map((m) => (
            <button
              key={m}
              onClick={() => goTo(m)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12.5px] font-medium ${
                module === m ? "bg-accent text-white" : "bg-[#f1f5f9] text-[#475569]"
              }`}
            >
              {moduleTitles[m]}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1">
          <Sidebar active={module} onNavigate={goTo} />
          <main className="min-w-0 flex-1 overflow-y-auto bg-[#f7f9fc] p-5 md:p-8">
            <motion.div
              key={module}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {module === "knowledge" && <KnowledgeGraph {...props} />}
              {module === "research" && <ResearchModule {...props} />}
              {module === "faculty" && <FacultyModule {...props} />}
              {module === "programmes" && <ProgrammesModule {...props} />}
              {module === "repository" && <RepositoryModule {...props} />}
              {module === "competitors" && <CompetitorsModule {...props} />}
              {module === "insights" && <InsightsModule {...props} />}
              {module === "reports" && <ReportsModule {...props} />}
              {module === "impact" && <ImpactModule {...props} />}
            </motion.div>
          </main>
          <ContextPanel selection={selection} onSelect={setSelection} goTo={goTo} />
        </div>
      </motion.div>
    </div>
  );
}
