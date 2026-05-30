import { useState } from "react";
import {
  events,
  themes,
  facultyByTheme,
  papersByTheme,
  kindColors,
} from "../data";
import type { ModuleProps } from "../types";
import { Processing, QueryBar, Reveal, SectionLabel, Stat, Tag } from "../shared";

type Scenario = "editorial" | "climate" | "generic";

function detect(q: string): Scenario {
  const l = q.toLowerCase();
  if (l.includes("health") || l.includes("editorial") || l.includes("campaign")) return "editorial";
  if (l.includes("climate") || l.includes("leading") || l.includes("sustain")) return "climate";
  return "generic";
}

const suggestions = [
  "Find faculty working on AI and healthcare",
  "Who are our leading researchers in climate change?",
];

export default function ResearchModule({ onSelect }: ModuleProps) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");

  const run = (q: string) => {
    setSubmitted(q);
    setPhase("running");
  };

  const scenario = submitted ? detect(submitted) : "generic";

  return (
    <div className="mx-auto max-w-[760px]">
      <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Institutional Search</h2>
      <p className="mb-5 mt-1 text-[14px] text-[#64748b]">
        Ask across papers, faculty, programmes, events, and funding — Operon returns a grounded profile, not a link list.
      </p>

      <QueryBar
        value={query}
        onChange={setQuery}
        onSubmit={run}
        placeholder="Ask about people, topics, or research activity…"
        suggestions={phase === "idle" ? suggestions : undefined}
      />

      <div className="mt-6">
        {phase === "running" && submitted && (
          <Processing
            steps={[
              "Searching research repository & faculty database",
              "Linking authors, themes & funding",
              "Grounding results in source evidence",
              "Synthesizing institutional profile",
            ]}
            onDone={() => setPhase("done")}
          />
        )}

        {phase === "done" && scenario === "editorial" && <EditorialResult onSelect={onSelect} />}
        {phase === "done" && scenario === "climate" && <ClimateResult onSelect={onSelect} />}
        {phase === "done" && scenario === "generic" && <GenericResult query={submitted!} />}
      </div>
    </div>
  );
}

function EditorialResult({ onSelect }: { onSelect: ModuleProps["onSelect"] }) {
  const healthFaculty = facultyByTheme("clinical-ai");
  const healthPapers = papersByTheme("clinical-ai");
  return (
    <div className="space-y-5">
      <Reveal>
        <div className="rounded-xl border border-[#e6e9ef] bg-white p-5">
          <div className="flex items-center gap-2 text-[13px] font-medium text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Editorial intelligence ready
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Stat value="7" label="Researchers found" accent />
            <Stat value="3" label="Top themes" />
            <Stat value="12" label="Supporting papers" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="rounded-xl border border-[#e6e9ef] bg-white p-5">
          <SectionLabel>Top themes</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {["Clinical AI", "Diagnostic Systems", "Medical Imaging"].map((t) => (
              <Tag key={t} color={kindColors.theme}>
                {t}
              </Tag>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="rounded-xl border border-[#e6e9ef] bg-white p-5">
          <SectionLabel>Suggested campaigns</SectionLabel>
          <div className="space-y-2">
            {[
              "AI Transforming Healthcare",
              "Meet Our Medical AI Researchers",
              "Future of Clinical Decision Support",
            ].map((c) => (
              <div
                key={c}
                className="flex items-center justify-between rounded-lg border border-[#eef2f7] bg-[#fafbfd] px-3.5 py-2.5 text-[14px] text-[#334155]"
              >
                {c}
                <span className="text-[12px] text-accent">draft →</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="grid gap-4 sm:grid-cols-2">
          <SourceCard title="Interview candidates" color={kindColors.faculty}>
            {healthFaculty.map((f) => (
              <SourceRow key={f.id} label={f.name} sub={f.title} onClick={() => onSelect({ kind: "faculty", id: f.id })} />
            ))}
          </SourceCard>
          <SourceCard title="Supporting papers" color={kindColors.paper}>
            {healthPapers.map((p) => (
              <SourceRow key={p.id} label={p.title} sub={`${p.venue} · ${p.year}`} onClick={() => onSelect({ kind: "paper", id: p.id })} />
            ))}
          </SourceCard>
        </div>
      </Reveal>
    </div>
  );
}

function ClimateResult({ onSelect }: { onSelect: ModuleProps["onSelect"] }) {
  const experts = facultyByTheme("climate-analytics");
  const pubs = papersByTheme("climate-analytics");
  const relatedEvents = events.filter((e) => e.theme === "climate-analytics");
  const theme = themes.find((t) => t.id === "climate-analytics")!;
  return (
    <div className="space-y-5">
      <Reveal>
        <div className="rounded-xl border border-[#e6e9ef] bg-gradient-to-br from-white to-[#f5f8ff] p-5">
          <div className="flex items-center gap-2 text-[13px] font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" /> Institutional profile · Climate Change
          </div>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[#334155]">
            The institution has <b>{theme.faculty} active researchers</b> in climate analytics across Engineering and the Business
            School, with <b>{theme.papers} publications</b> and <b>+{theme.growth}%</b> publication growth year over year.
          </p>
          <div className="mt-4 grid grid-cols-4 gap-3">
            <Stat value={String(theme.faculty)} label="Experts" />
            <Stat value={String(theme.papers)} label="Publications" />
            <Stat value="$8.0M" label="Active funding" accent />
            <Stat value={String(relatedEvents.length)} label="Events" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="grid gap-4 sm:grid-cols-2">
          <SourceCard title="Faculty experts" color={kindColors.faculty}>
            {experts.map((f) => (
              <SourceRow key={f.id} label={f.name} sub={`${f.department} · ${f.grants}`} onClick={() => onSelect({ kind: "faculty", id: f.id })} />
            ))}
          </SourceCard>
          <SourceCard title="Recent publications" color={kindColors.paper}>
            {pubs.map((p) => (
              <SourceRow key={p.id} label={p.title} sub={`${p.venue} · ${p.year}`} onClick={() => onSelect({ kind: "paper", id: p.id })} />
            ))}
          </SourceCard>
          <SourceCard title="Related programmes" color={kindColors.programme}>
            <SourceRow label="MSc Sustainability" sub="88 students" onClick={() => onSelect({ kind: "programme", id: "msc-sustainability" })} />
          </SourceCard>
          <SourceCard title="Events & funding" color={kindColors.event}>
            {relatedEvents.map((e) => (
              <SourceRow key={e.id} label={e.name} sub={`${e.date} · ${e.attendees} attendees`} onClick={() => onSelect({ kind: "event", id: e.id })} />
            ))}
          </SourceCard>
        </div>
      </Reveal>
    </div>
  );
}

function GenericResult({ query }: { query: string }) {
  return (
    <Reveal>
      <div className="rounded-xl border border-[#e6e9ef] bg-white p-6">
        <p className="text-[14px] text-[#475569]">
          Operon searched the connected sources for <b className="text-[#0f172a]">“{query}”</b>. In this demo, try one of the
          example questions above to see a full grounded institutional profile.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function SourceCard({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#e6e9ef] bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[13px] font-semibold text-[#0f172a]">{title}</span>
      </div>
      <div className="-mx-1.5 space-y-0.5">{children}</div>
    </div>
  );
}

function SourceRow({ label, sub, onClick }: { label: string; sub: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="block w-full rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-[#f1f5f9]"
    >
      <div className="text-[13.5px] font-medium leading-snug text-[#334155]">{label}</div>
      <div className="text-[12px] text-[#94a3b8]">{sub}</div>
    </button>
  );
}
