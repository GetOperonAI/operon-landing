import { motion } from "framer-motion";
import type { Selection, ModuleId } from "./types";
import {
  faculty,
  papers,
  programmes,
  competitors,
  events,
  facultyById,
  themeById,
  papersByTheme,
  facultyByTheme,
  kindColors,
} from "./data";
import { KindBadge, SectionLabel, Tag } from "./shared";

function RelatedRow({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-[#334155] transition-colors hover:bg-[#f1f5f9]"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className="truncate">{label}</span>
    </button>
  );
}

function Actions({ items }: { items: string[] }) {
  return (
    <div>
      <SectionLabel>Suggested actions</SectionLabel>
      <div className="space-y-1.5">
        {items.map((a) => (
          <div
            key={a}
            className="flex items-center justify-between rounded-lg border border-[#e6e9ef] bg-white px-3 py-2 text-[13px] text-[#334155]"
          >
            {a}
            <span className="text-accent">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContextPanel({
  selection,
  onSelect,
  goTo,
}: {
  selection: Selection | null;
  onSelect: (s: Selection | null) => void;
  goTo: (m: ModuleId) => void;
}) {
  return (
    <aside className="hidden w-[320px] shrink-0 flex-col border-l border-[#e6e9ef] bg-[#fbfcfe] xl:flex">
      <div className="flex items-center justify-between border-b border-[#e6e9ef] px-5 py-4">
        <span className="text-[13px] font-semibold text-[#0f172a]">Context</span>
        {selection && (
          <button
            onClick={() => onSelect(null)}
            className="text-[12px] text-[#94a3b8] hover:text-[#475569]"
          >
            Clear
          </button>
        )}
      </div>
      <motion.div
        key={selection ? `${selection.kind}-${selection.id}` : "empty"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 space-y-6 overflow-y-auto p-5"
      >
        {selection ? (
          <SelectionBody selection={selection} onSelect={onSelect} />
        ) : (
          <EmptyState goTo={goTo} />
        )}
      </motion.div>
    </aside>
  );
}

function EmptyState({ goTo }: { goTo: (m: ModuleId) => void }) {
  return (
    <>
      <div>
        <SectionLabel>Connected sources</SectionLabel>
        <div className="space-y-2">
          {[
            ["Research repository", `${papers.length * 17} papers`],
            ["Faculty database", `${faculty.length} active`],
            ["Programme catalogue", `${programmes.length} programmes`],
            ["Website & CMS", "1,240 pages"],
            ["Events & assets", `${events.length} upcoming`],
            ["Competitor sites", `${competitors.length} tracked`],
          ].map(([name, meta]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg border border-[#e6e9ef] bg-white px-3 py-2.5"
            >
              <span className="flex items-center gap-2 text-[13px] text-[#334155]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {name}
              </span>
              <span className="text-[12px] text-[#94a3b8]">{meta}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionLabel>Recommendations</SectionLabel>
        <div className="space-y-2">
          {[
            ["Explore the knowledge layer", "knowledge"],
            ["Find experts by topic", "research"],
            ["Benchmark a programme", "programmes"],
          ].map(([label, m]) => (
            <button
              key={label}
              onClick={() => goTo(m as ModuleId)}
              className="flex w-full items-center justify-between rounded-lg border border-[#e6e9ef] bg-white px-3 py-2.5 text-left text-[13px] text-[#334155] transition-colors hover:border-accent hover:text-accent"
            >
              {label}
              <span>→</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function SelectionBody({
  selection,
  onSelect,
}: {
  selection: Selection;
  onSelect: (s: Selection | null) => void;
}) {
  const { kind, id } = selection;

  if (kind === "faculty") {
    const f = facultyById(id);
    if (!f) return null;
    const related = papers.filter((p) => p.authors.includes(f.id));
    return (
      <>
        <Header title={f.name} subtitle={f.title} kind="faculty" />
        <p className="text-[13.5px] leading-relaxed text-[#475569]">{f.blurb}</p>
        <div className="grid grid-cols-3 gap-2">
          <MiniStat value={String(f.publications)} label="Papers" />
          <MiniStat value={f.grants} label="Grants" />
          <MiniStat value={`${(f.citations / 1000).toFixed(1)}k`} label="Cites" />
        </div>
        <div>
          <SectionLabel>Research interests</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {f.interests.map((i) => (
              <Tag key={i}>{i}</Tag>
            ))}
          </div>
        </div>
        <Related title="Publications">
          {related.map((p) => (
            <RelatedRow key={p.id} label={p.title} color={kindColors.paper} onClick={() => onSelect({ kind: "paper", id: p.id })} />
          ))}
        </Related>
        <Related title="Collaborators">
          {f.collaborators.map((cid) => {
            const c = facultyById(cid);
            return c ? (
              <RelatedRow key={cid} label={c.name} color={kindColors.faculty} onClick={() => onSelect({ kind: "faculty", id: cid })} />
            ) : null;
          })}
        </Related>
        <Actions items={["Generate research summary", "Add to media expert list", "Draft outreach brief"]} />
      </>
    );
  }

  if (kind === "paper") {
    const p = papers.find((x) => x.id === id);
    if (!p) return null;
    const theme = themeById(p.theme);
    return (
      <>
        <Header title={p.title} subtitle={`${p.venue} · ${p.year}`} kind="paper" />
        <p className="text-[13.5px] leading-relaxed text-[#475569]">{p.abstract}</p>
        <div className="grid grid-cols-2 gap-2">
          <MiniStat value={String(p.citations)} label="Citations" />
          <MiniStat value={String(p.year)} label="Published" />
        </div>
        <Related title="Authors">
          {p.authors.map((aid) => {
            const a = facultyById(aid);
            return a ? (
              <RelatedRow key={aid} label={a.name} color={kindColors.faculty} onClick={() => onSelect({ kind: "faculty", id: aid })} />
            ) : null;
          })}
        </Related>
        {theme && (
          <Related title="Research theme">
            <RelatedRow label={theme.name} color={kindColors.theme} onClick={() => onSelect({ kind: "theme", id: theme.id })} />
          </Related>
        )}
        <Actions items={["Summarize for newsletter", "Find related work", "Add to research brief"]} />
      </>
    );
  }

  if (kind === "programme") {
    const pr = programmes.find((x) => x.id === id);
    if (!pr) return null;
    return (
      <>
        <Header title={pr.name} subtitle={`${pr.level} · ${pr.students} students`} kind="programme" />
        <p className="text-[13.5px] leading-relaxed text-[#475569]">{pr.blurb}</p>
        <div>
          <SectionLabel>Modules</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {pr.modules.map((m) => (
              <Tag key={m} color={kindColors.programme}>
                {m}
              </Tag>
            ))}
          </div>
        </div>
        <Related title="Linked themes">
          {pr.themes.map((tid) => {
            const t = themeById(tid);
            return t ? (
              <RelatedRow key={tid} label={t.name} color={kindColors.theme} onClick={() => onSelect({ kind: "theme", id: tid })} />
            ) : null;
          })}
        </Related>
        <Actions items={["Benchmark vs competitors", "Review curriculum gaps", "Map teaching faculty"]} />
      </>
    );
  }

  if (kind === "theme") {
    const t = themeById(id);
    if (!t) return null;
    return (
      <>
        <Header title={t.name} subtitle="Research theme" kind="theme" />
        <div className="grid grid-cols-3 gap-2">
          <MiniStat value={String(t.papers)} label="Papers" />
          <MiniStat value={`+${t.growth}%`} label="Growth" accent />
          <MiniStat value={String(t.faculty)} label="Faculty" />
        </div>
        <Related title="Leading faculty">
          {facultyByTheme(t.id).map((f) => (
            <RelatedRow key={f.id} label={f.name} color={kindColors.faculty} onClick={() => onSelect({ kind: "faculty", id: f.id })} />
          ))}
        </Related>
        <Related title="Key papers">
          {papersByTheme(t.id).map((p) => (
            <RelatedRow key={p.id} label={p.title} color={kindColors.paper} onClick={() => onSelect({ kind: "paper", id: p.id })} />
          ))}
        </Related>
        <Actions items={["Generate trend report", "Find collaboration gaps", "Identify funding targets"]} />
      </>
    );
  }

  if (kind === "event") {
    const e = events.find((x) => x.id === id);
    if (!e) return null;
    const t = themeById(e.theme);
    return (
      <>
        <Header title={e.name} subtitle={e.date} kind="event" />
        <div className="grid grid-cols-2 gap-2">
          <MiniStat value={String(e.attendees)} label="Attendees" />
          <MiniStat value={e.date} label="Date" />
        </div>
        {t && (
          <Related title="Theme">
            <RelatedRow label={t.name} color={kindColors.theme} onClick={() => onSelect({ kind: "theme", id: t.id })} />
          </Related>
        )}
        <Actions items={["Draft promotion brief", "Match speakers", "Link related research"]} />
      </>
    );
  }

  if (kind === "competitor") {
    const c = competitors.find((x) => x.id === id);
    if (!c) return null;
    return (
      <>
        <Header title={c.name} subtitle={`Rank ${c.rank}`} kind="competitor" />
        <div className="grid grid-cols-2 gap-2">
          <MiniStat value={String(c.programmes)} label="AI programmes" />
          <MiniStat value={c.rank} label="Ranking" />
        </div>
        <div>
          <SectionLabel>Known strength</SectionLabel>
          <Tag color={kindColors.competitor}>{c.strength}</Tag>
        </div>
        <Actions items={["Compare curriculum", "Track new programmes", "Add to watchlist"]} />
      </>
    );
  }

  return null;
}

function Header({ title, subtitle, kind }: { title: string; subtitle: string; kind: Selection["kind"] }) {
  return (
    <div>
      <KindBadge kind={kind} />
      <h3 className="mt-2 font-display text-[18px] font-medium leading-snug text-[#0f172a]">{title}</h3>
      <div className="mt-0.5 text-[13px] text-[#64748b]">{subtitle}</div>
    </div>
  );
}

function MiniStat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-[#e6e9ef] bg-white px-2 py-2.5 text-center">
      <div
        className="font-display text-[17px] font-medium leading-none"
        style={{ color: accent ? "#2563eb" : "#0f172a" }}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] text-[#94a3b8]">{label}</div>
    </div>
  );
}

function Related({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <div className="-mx-2.5">{children}</div>
    </div>
  );
}
