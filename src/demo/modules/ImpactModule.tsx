import { motion } from "framer-motion";
import type { ModuleProps } from "../types";

const fragmented = [
  "Research Repository",
  "Faculty Database",
  "Website CMS",
  "Programme Data",
  "Documents",
];

const outputs = [
  "Research Discovery",
  "Editorial Intelligence",
  "Programme Benchmarking",
  "Repository Automation",
  "Institutional Search",
  "Strategic Insights",
];

export default function ImpactModule({ goTo }: ModuleProps) {
  return (
    <div className="mx-auto max-w-[860px]">
      <div className="rounded-xl border border-[#e6e9ef] bg-white p-5 text-center text-[14px] text-[#475569]">
        Universities don't have a data problem. They have a{" "}
        <b className="text-[#0f172a]">knowledge fragmentation</b> problem.
      </div>

      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* fragmented */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-[#e6e9ef] bg-[#fafbfd] p-5"
        >
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#94a3b8]">
            Traditional university
          </div>
          <div className="space-y-2">
            {fragmented.map((f) => (
              <div
                key={f}
                className="rounded-lg border border-dashed border-[#cbd5e1] bg-white px-3 py-2.5 text-[13.5px] text-[#64748b]"
              >
                {f}
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-[12px] font-medium text-[#94a3b8]">
            Disconnected systems
          </div>
        </motion.div>

        {/* operon hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <div className="hidden text-[22px] text-[#cbd5e1] lg:block">→</div>
          <div className="my-3 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-accent bg-accent/8 text-center">
            <span className="font-display text-[18px] font-medium text-accent">Operon</span>
            <span className="mt-0.5 px-2 font-mono text-[9px] uppercase leading-tight tracking-[0.05em] text-accent/70">
              Intelligence layer
            </span>
          </div>
          <div className="hidden text-[22px] text-[#cbd5e1] lg:block">→</div>
        </motion.div>

        {/* outputs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-[#d6e4ff] bg-[#f5f8ff] p-5"
        >
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-accent/70">
            Unified intelligence
          </div>
          <div className="grid grid-cols-2 gap-2">
            {outputs.map((o) => (
              <div
                key={o}
                className="rounded-lg border border-[#d6e4ff] bg-white px-3 py-2.5 text-[12.5px] font-medium text-[#334155]"
              >
                {o}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-12 text-center"
      >
        <h2 className="font-display text-[40px] font-medium leading-tight text-[#0f172a] md:text-[52px]">
          Understand your institution.
        </h2>
        <p className="mx-auto mt-3 max-w-[520px] text-[16px] text-[#64748b]">
          Operon transforms fragmented institutional knowledge into actionable intelligence.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => goTo("knowledge")}
            className="rounded-lg bg-accent px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-accent-light"
          >
            Explore the knowledge layer
          </button>
          <a
            href="#contact"
            className="rounded-lg border border-[#cbd5e1] px-6 py-3 text-[15px] font-medium text-[#334155] transition-colors hover:border-accent hover:text-accent"
          >
            Request a demo
          </a>
        </div>
      </motion.div>
    </div>
  );
}
