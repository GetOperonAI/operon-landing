import { useState } from "react";
import { motion } from "framer-motion";
import type { ModuleProps, ModuleId } from "../types";
import { Reveal, SectionLabel, Stat } from "../shared";

interface Section {
  heading: string;
  kind: "paragraph" | "bullets" | "tags";
  body?: string;
  items?: string[];
}

interface Report {
  id: string;
  title: string;
  type: string;
  updated: string;
  from: ModuleId;
  color: string;
  summary: string;
  stats: { value: string; label: string; accent?: boolean }[];
  sections: Section[];
  sources: { label: string; sub: string }[];
}

const reports: Report[] = [
  {
    id: "healthcare-editorial",
    title: "AI in Healthcare — Editorial Brief",
    type: "Editorial intelligence",
    updated: "Today",
    from: "research",
    color: "#0ea5e9",
    summary:
      "The institution holds a strong, under-communicated position in clinical AI. Seven active researchers and twelve supporting papers make this a ready-to-pitch story for the comms team, with three concrete campaign angles below.",
    stats: [
      { value: "7", label: "Researchers found", accent: true },
      { value: "12", label: "Supporting papers" },
      { value: "3", label: "Campaign angles" },
    ],
    sections: [
      {
        heading: "Recommended angle",
        kind: "paragraph",
        body: "Lead with the institution's work on diagnostic decision support — it has the deepest publication record and the most quotable faculty. Position it as “AI that helps clinicians decide, not replace them.”",
      },
      {
        heading: "Researchers to feature",
        kind: "bullets",
        items: [
          "Prof. Sarah Mitchell — diagnostic models, most-cited in the group",
          "Dr. James Carter — clinical decision support systems",
          "Prof. Emily Zhang — medical imaging & responsible deployment",
        ],
      },
      {
        heading: "Suggested campaigns",
        kind: "tags",
        items: ["AI Transforming Healthcare", "Meet Our Medical AI Researchers", "Future of Clinical Decision Support"],
      },
    ],
    sources: [
      { label: "Diagnostic Models for Early Detection", sub: "Nature Medicine · 2025" },
      { label: "Clinical Decision Support at Scale", sub: "The Lancet Digital Health · 2024" },
      { label: "Faculty database", sub: "7 profiles matched on clinical-ai" },
    ],
  },
  {
    id: "msc-ai-benchmark",
    title: "MSc AI — Competitive Benchmark",
    type: "Programme analysis",
    updated: "Today",
    from: "programmes",
    color: "#7c3aed",
    summary:
      "MSc Artificial Intelligence covers 56% of topics offered across four tracked competitor institutions. Three high-demand topics are missing and are recommended for the next curriculum review.",
    stats: [
      { value: "56%", label: "Topic coverage", accent: true },
      { value: "4", label: "Gaps detected" },
      { value: "4", label: "Peers compared" },
    ],
    sections: [
      {
        heading: "Coverage summary",
        kind: "paragraph",
        body: "Strong on core ML, deep learning, NLP and computer vision. Competitors increasingly differentiate on governance, operations and applied capstones — areas where our curriculum is currently thin.",
      },
      {
        heading: "Gaps vs competitors",
        kind: "bullets",
        items: [
          "AI Ethics & Governance — offered by 3 of 4 peers",
          "MLOps — offered by 2 of 4 peers",
          "Industry Capstone — offered by 2 of 4 peers",
          "AI Product Management — offered by 1 of 4 peers",
        ],
      },
      {
        heading: "Recommendations",
        kind: "bullets",
        items: [
          "Add an AI Ethics & Governance module",
          "Introduce an industry capstone project",
          "Expand MLOps and deployment coverage",
        ],
      },
    ],
    sources: [
      { label: "Northbridge University", sub: "MSc AI programme page" },
      { label: "Westlake Institute", sub: "MSc AI programme page" },
      { label: "Cordell Tech", sub: "MSc AI programme page" },
    ],
  },
  {
    id: "climate-expertise",
    title: "Climate Change — Expertise Map",
    type: "Institutional search",
    updated: "Yesterday",
    from: "research",
    color: "#059669",
    summary:
      "Six active researchers work on climate analytics across Engineering and the Business School, backed by 33 publications and $8.0M in active funding, with publication output growing 31% year over year.",
    stats: [
      { value: "6", label: "Experts" },
      { value: "33", label: "Publications" },
      { value: "$8.0M", label: "Active funding", accent: true },
    ],
    sections: [
      {
        heading: "Expertise overview",
        kind: "paragraph",
        body: "The cluster spans climate risk modelling, energy systems and sustainable finance. It is well positioned for cross-faculty grant bids and links directly to the MSc Sustainability programme.",
      },
      {
        heading: "Leading researchers",
        kind: "bullets",
        items: [
          "Dr. Michael Reynolds — climate risk analytics",
          "Prof. Laura Bennett — sustainable finance & policy",
        ],
      },
      {
        heading: "Related themes",
        kind: "tags",
        items: ["Climate Analytics", "Sustainable Computing", "Energy Systems"],
      },
    ],
    sources: [
      { label: "Climate Risk Under Uncertainty", sub: "Nature Climate Change · 2025" },
      { label: "MSc Sustainability", sub: "Linked programme · 88 students" },
      { label: "Sustainability Summit", sub: "Apr 2026 · 360 attendees" },
    ],
  },
  {
    id: "q2-growth",
    title: "Q2 Research Growth — Executive Insights",
    type: "Strategic insights",
    updated: "2 days ago",
    from: "insights",
    color: "#2563eb",
    summary:
      "Research output rose across every tracked theme this quarter, led by AI for Healthcare (+42%) and Sustainable Computing (+36%). Two themes are emerging fast enough to warrant dedicated investment.",
    stats: [
      { value: "+34%", label: "Avg theme growth", accent: true },
      { value: "6", label: "Themes tracked" },
      { value: "2", label: "Emerging clusters" },
    ],
    sections: [
      {
        heading: "Highlights",
        kind: "bullets",
        items: [
          "AI for Healthcare led all themes at +42% publication growth",
          "Sustainable Computing up +36%, now 28 active papers",
          "Responsible AI emerging — small base, +28% and accelerating",
        ],
      },
      {
        heading: "Recommended actions",
        kind: "bullets",
        items: [
          "Prioritise seed funding for Responsible AI",
          "Position AI for Healthcare for the next major grant cycle",
          "Pair Sustainable Computing with the MSc Sustainability programme",
        ],
      },
    ],
    sources: [
      { label: "Theme analytics", sub: "6 themes · trailing 4 quarters" },
      { label: "Publication index", sub: "159 papers ingested" },
    ],
  },
  {
    id: "repository-intake",
    title: "Repository Intake — 100 papers classified",
    type: "Repository automation",
    updated: "2 days ago",
    from: "repository",
    color: "#d97706",
    summary:
      "Operon ingested and auto-classified 100 newly uploaded papers, tagging each by theme, faculty and funding source. Manual triage that previously took the team roughly two days completed in minutes.",
    stats: [
      { value: "100", label: "Papers classified", accent: true },
      { value: "6", label: "Themes assigned" },
      { value: "~16h", label: "Time saved" },
    ],
    sections: [
      {
        heading: "Classification breakdown",
        kind: "bullets",
        items: [
          "41 → AI for Healthcare",
          "28 → Sustainable Computing",
          "22 → Responsible AI",
          "9 → unmatched, flagged for review",
        ],
      },
      {
        heading: "Automation summary",
        kind: "paragraph",
        body: "Each paper was linked to its authors, mapped to existing themes, and checked against the funding register. Only the 9 unmatched items need a human glance — the rest are ready in the knowledge layer.",
      },
    ],
    sources: [
      { label: "Upload batch #2026-06", sub: "100 PDFs" },
      { label: "Theme taxonomy", sub: "6 active themes" },
    ],
  },
];

export default function ReportsModule({ goTo }: ModuleProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = reports.find((r) => r.id === openId) ?? null;

  if (open) {
    return <ReportDocument report={open} onBack={() => setOpenId(null)} goTo={goTo} />;
  }

  return (
    <div className="mx-auto max-w-[820px]">
      <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Reports</h2>
      <p className="mt-1 text-[14px] text-[#64748b]">
        Every Operon output is saved as a living, source-grounded report you can revisit, share, or push into workflow.
      </p>

      <div className="mt-6">
        <SectionLabel>Generated by Operon</SectionLabel>
        <div className="space-y-2.5">
          {reports.map((r) => (
            <button
              key={r.id}
              onClick={() => setOpenId(r.id)}
              className="flex w-full items-center gap-4 rounded-xl border border-[#e6e9ef] bg-white p-4 text-left transition-all hover:border-accent hover:shadow-md"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${r.color}14`, color: r.color }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3h7l5 5v13H7z" />
                  <path d="M14 3v5h5M10 13h6M10 17h5" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[15px] font-medium text-[#0f172a]">{r.title}</span>
                <span className="text-[12.5px] text-[#94a3b8]">{r.type}</span>
              </span>
              <span className="shrink-0 text-[12px] text-[#94a3b8]">{r.updated}</span>
              <span className="shrink-0 text-[12px] font-medium text-accent">Open →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportDocument({ report, onBack, goTo }: { report: Report; onBack: () => void; goTo: ModuleProps["goTo"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-[820px]"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13.5px] font-medium text-[#475569] transition-colors hover:text-accent"
        >
          <span className="text-base leading-none">←</span> All reports
        </button>
        <button
          onClick={() => goTo(report.from)}
          className="rounded-lg border border-[#e2e8f0] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#475569] transition-colors hover:border-accent hover:text-accent"
        >
          Open source workspace →
        </button>
      </div>

      <Reveal>
        <article className="overflow-hidden rounded-2xl border border-[#e6e9ef] bg-white">
          {/* header band */}
          <div className="border-b border-[#eef2f7] p-7" style={{ background: `linear-gradient(135deg, ${report.color}0d, transparent)` }}>
            <div className="flex items-center gap-2 text-[12px] font-medium" style={{ color: report.color }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: report.color }} />
              {report.type}
            </div>
            <h1 className="mt-2.5 font-display text-[28px] font-medium leading-tight tracking-tight text-[#0f172a]">
              {report.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-[#94a3b8]">
              <span>Updated {report.updated.toLowerCase()}</span>
              <span>·</span>
              <span>{report.sources.length} sources</span>
              <span>·</span>
              <span>Generated by Operon</span>
            </div>
          </div>

          <div className="space-y-7 p-7">
            <p className="text-[15px] leading-relaxed text-[#334155]">{report.summary}</p>

            <div className="grid grid-cols-3 gap-3">
              {report.stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} accent={s.accent} />
              ))}
            </div>

            {report.sections.map((sec) => (
              <div key={sec.heading}>
                <SectionLabel>{sec.heading}</SectionLabel>
                {sec.kind === "paragraph" && (
                  <p className="text-[14.5px] leading-relaxed text-[#334155]">{sec.body}</p>
                )}
                {sec.kind === "bullets" && (
                  <ul className="space-y-2">
                    {sec.items!.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#334155]">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: report.color }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
                {sec.kind === "tags" && (
                  <div className="flex flex-wrap gap-2">
                    {sec.items!.map((it) => (
                      <span
                        key={it}
                        className="rounded-md px-2.5 py-1 text-[12.5px] font-medium"
                        style={{ backgroundColor: `${report.color}14`, color: report.color }}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* sources */}
            <div className="rounded-xl border border-[#eef2f7] bg-[#fafbfd] p-5">
              <SectionLabel>Grounded in</SectionLabel>
              <div className="space-y-2.5">
                {report.sources.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <svg className="h-4 w-4 shrink-0 text-[#94a3b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 3h7l5 5v13H7z" />
                      <path d="M14 3v5h5" />
                    </svg>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-medium leading-snug text-[#334155]">{s.label}</div>
                      <div className="text-[12px] text-[#94a3b8]">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </motion.div>
  );
}
