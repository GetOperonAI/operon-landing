import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [entered, setEntered] = useState(false);
  const [module, setModule] = useState<ModuleId>("knowledge");
  const [selection, setSelection] = useState<Selection | null>(null);

  const goTo = (m: ModuleId) => {
    setModule(m);
    setSelection(null);
  };

  const props = { onSelect: setSelection, selection, goTo };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white text-[#0f172a]">
      <AnimatePresence mode="wait">
        {!entered ? (
          <Intro key="intro" onClose={onClose} onEnter={(m) => { setModule(m); setEntered(true); }} />
        ) : (
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
                <button onClick={() => setEntered(false)} className="font-display text-[18px] font-semibold tracking-tight text-[#0f172a]">
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
        )}
      </AnimatePresence>
    </div>
  );
}

function Intro({ onEnter, onClose }: { onEnter: (m: ModuleId) => void; onClose: () => void }) {
  return (
    <motion.div
      className="relative flex h-full flex-col overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(37,99,235,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.12),transparent_60%)]" />

      <header className="relative flex h-14 shrink-0 items-center justify-between px-5">
        <span className="font-display text-[18px] font-semibold tracking-tight text-[#0f172a]">operon</span>
        <button
          onClick={onClose}
          className="rounded-lg border border-[#e2e8f0] px-3.5 py-1.5 text-[13px] font-medium text-[#475569] transition-colors hover:bg-[#f1f5f9]"
        >
          Back to site
        </button>
      </header>

      <div className="relative mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.05em] text-[#64748b]"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          Interactive product demo
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-6 font-display text-[44px] font-medium leading-[1.04] tracking-tight text-[#0f172a] md:text-[64px]"
        >
          Institutional Intelligence
          <br />
          for Universities
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-5 max-w-[640px] text-[18px] leading-relaxed text-[#64748b]"
        >
          Connect institutional knowledge, discover expertise, analyse research, benchmark programmes, and automate academic
          workflows — in one unified intelligence layer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <button
            onClick={() => onEnter("research")}
            className="rounded-lg bg-accent px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-accent-light"
          >
            Explore demo
          </button>
          <button
            onClick={() => onEnter("knowledge")}
            className="rounded-lg border border-[#cbd5e1] bg-white px-7 py-3.5 text-[15px] font-medium text-[#334155] transition-colors hover:border-accent hover:text-accent"
          >
            View knowledge layer
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-14 grid w-full max-w-[760px] grid-cols-2 gap-3 text-left sm:grid-cols-4"
        >
          {[
            ["Research discovery", "research"],
            ["Programme benchmarking", "programmes"],
            ["Repository automation", "repository"],
            ["Strategic insights", "insights"],
          ].map(([label, m]) => (
            <button
              key={label}
              onClick={() => onEnter(m as ModuleId)}
              className="rounded-xl border border-[#e6e9ef] bg-white/80 p-4 text-[13.5px] font-medium text-[#334155] backdrop-blur transition-all hover:border-accent hover:text-accent hover:shadow-sm"
            >
              {label}
            </button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
