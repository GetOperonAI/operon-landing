import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
import type { Faculty } from "./data";
import { KindBadge, SectionLabel, Tag } from "./shared";

const HONORIFICS = ["Prof.", "Dr.", "Mr.", "Ms.", "Mrs."];

function nameParts(name: string) {
  const parts = name.split(" ");
  const honorific = HONORIFICS.includes(parts[0]) ? parts[0] : "";
  const rest = honorific ? parts.slice(1) : parts;
  return { honorific, first: rest[0], last: rest[rest.length - 1] };
}

function buildOutreachMail(f: Faculty): MailDraft {
  const { honorific, first, last } = nameParts(f.name);
  const greeting = honorific ? `${honorific} ${last}` : first;
  const topic = f.interests[0];
  return {
    to: `${first}.${last}`.toLowerCase() + "@university.edu",
    subject: `Quick comment for an upcoming feature on ${topic}`,
    body:
      `Hi ${greeting},\n\n` +
      `We're preparing a feature on ${topic}, and your work — ${f.publications}+ papers and ` +
      `${(f.citations / 1000).toFixed(1)}k citations — makes you a perfect voice for it.\n\n` +
      `Would you have 5 minutes this week for a short comment we can quote? Happy to send questions in advance.\n\n` +
      `Best,\nCommunications Office`,
  };
}

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

interface MailDraft {
  to: string;
  subject: string;
  body: string;
}

interface ActionItem {
  label: string;
  result?: React.ReactNode;
  mail?: MailDraft;
}

function Actions({ items }: { items: ActionItem[] }) {
  const [active, setActive] = useState<ActionItem | null>(null);
  const [mail, setMail] = useState<MailDraft | null>(null);

  const handle = (a: ActionItem) => {
    if (a.mail) {
      setMail(a.mail);
      return;
    }
    setActive(active?.label === a.label ? null : a);
  };

  return (
    <div>
      <SectionLabel>Suggested actions</SectionLabel>
      <div className="space-y-1.5">
        {items.map((a) => {
          const on = !a.mail && active?.label === a.label;
          return (
            <button
              key={a.label}
              onClick={() => handle(a)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-[13px] transition-colors ${
                on
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-[#e6e9ef] bg-white text-[#334155] hover:border-accent hover:text-accent"
              }`}
            >
              {a.label}
              <span className="text-accent">{a.mail ? "✉" : on ? "↓" : "→"}</span>
            </button>
          );
        })}
      </div>
      {active && <ActionResult key={active.label} item={active} onClose={() => setActive(null)} />}
      {mail && <MailComposer draft={mail} onClose={() => setMail(null)} />}
    </div>
  );
}

function MailComposer({ draft, onClose }: { draft: MailDraft; onClose: () => void }) {
  const [to, setTo] = useState(draft.to);
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [status, setStatus] = useState<"editing" | "sending" | "sent">("editing");

  const send = () => {
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 800);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0f172a]/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#e6e9ef] bg-white shadow-2xl"
      >
        {status === "sent" ? (
          <div className="flex flex-col items-center px-8 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-[20px] font-medium text-[#0f172a]">Message sent</h3>
            <p className="mt-1.5 max-w-[360px] text-[14px] leading-relaxed text-[#64748b]">
              Your outreach email to <b className="text-[#334155]">{to}</b> is on its way. A copy is saved to the institutional
              record.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-light"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <header className="flex items-center justify-between border-b border-[#eef2f7] px-5 py-3.5">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#0f172a]">
                <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                New message
              </div>
              <button onClick={onClose} className="text-[18px] leading-none text-[#94a3b8] transition-colors hover:text-[#475569]">
                ✕
              </button>
            </header>

            <div className="px-5">
              <Field label="To">
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-transparent py-2.5 text-[14px] text-[#0f172a] outline-none"
                />
              </Field>
              <Field label="Subject">
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent py-2.5 text-[14px] text-[#0f172a] outline-none"
                />
              </Field>
            </div>

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={9}
              className="w-full resize-none px-5 py-4 text-[14px] leading-relaxed text-[#334155] outline-none"
            />

            <footer className="flex items-center justify-between border-t border-[#eef2f7] px-5 py-3.5">
              <span className="flex items-center gap-1.5 text-[12px] text-[#94a3b8]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Drafted by Operon · editable
              </span>
              <button
                onClick={send}
                disabled={status === "sending"}
                className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-light disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>
            </footer>
          </>
        )}
      </motion.div>
    </div>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#f4f6f9]">
      <span className="w-14 shrink-0 text-[13px] text-[#94a3b8]">{label}</span>
      {children}
    </div>
  );
}

function ActionResult({ item, onClose }: { item: ActionItem; onClose: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 850);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-2.5 rounded-lg border border-[#e6e9ef] bg-[#fbfcfe] p-3.5"
    >
      {!done ? (
        <div className="flex items-center gap-2.5 text-[12.5px] text-[#475569]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Operon is working…
        </div>
      ) : (
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">✓</span>
              {item.label}
            </span>
            <button onClick={onClose} className="text-[11px] text-[#94a3b8] hover:text-[#475569]">
              Dismiss
            </button>
          </div>
          <div className="text-[13px] leading-relaxed text-[#334155]">{item.result}</div>
        </div>
      )}
    </motion.div>
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
        <Actions
          items={[
            {
              label: "Generate research summary",
              result: (
                <>
                  <b>{f.name}</b> ({f.title}, {f.department}) works primarily on {f.interests.join(", ")}. Output to date:{" "}
                  <b>{f.publications} papers</b>, <b>{f.grants}</b> in grants and <b>{(f.citations / 1000).toFixed(1)}k</b>{" "}
                  citations, with {f.collaborators.length} active internal collaborators. Best positioned as a spokesperson on{" "}
                  {f.interests[0]}.
                </>
              ),
            },
            {
              label: "Add to media expert list",
              result: (
                <>
                  Added. <b>{f.name}</b> is now discoverable as a press contact for{" "}
                  {f.interests.slice(0, 2).join(" and ")}. The comms team will see them when filtering experts by topic.
                </>
              ),
            },
            {
              label: "Draft outreach brief",
              mail: buildOutreachMail(f),
            },
          ]}
        />
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
        <Actions
          items={[
            {
              label: "Summarize for newsletter",
              result: (
                <>
                  Newsletter blurb drafted: “<b>{p.title}</b>” ({p.venue}, {p.year}) — a {p.citations}-citation contribution
                  {theme ? <> to {theme.name}</> : null}, written for a general audience.
                </>
              ),
            },
            {
              label: "Find related work",
              result: theme ? (
                <>
                  Found <b>{papersByTheme(theme.id).length} related papers</b> sharing the {theme.name} theme — added to a
                  reading list.
                </>
              ) : (
                <>Scanned the repository for papers with overlapping methods and citations.</>
              ),
            },
            {
              label: "Add to research brief",
              result: (
                <>
                  Added “<b>{p.title}</b>” to the current research brief as supporting evidence, with its citation preserved.
                </>
              ),
            },
          ]}
        />
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
        <Actions
          items={[
            {
              label: "Benchmark vs competitors",
              result: (
                <>
                  Queued a curriculum benchmark for <b>{pr.name}</b> against {competitors.length} tracked competitors — open the
                  Programmes tab to view the gap analysis.
                </>
              ),
            },
            {
              label: "Review curriculum gaps",
              result: (
                <>
                  <b>{pr.name}</b> covers {pr.modules.length} modules. Flagged topics offered by peer institutions but missing
                  here for the next curriculum review.
                </>
              ),
            },
            {
              label: "Map teaching faculty",
              result: (
                <>
                  Matched faculty whose research interests align with <b>{pr.name}</b>’s modules — a draft teaching roster is
                  ready.
                </>
              ),
            },
          ]}
        />
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
        <Actions
          items={[
            {
              label: "Generate trend report",
              result: (
                <>
                  Trend report drafted: <b>{t.name}</b> — {t.papers} papers, <b>+{t.growth}%</b> year over year, across{" "}
                  {t.faculty} active researchers.
                </>
              ),
            },
            {
              label: "Find collaboration gaps",
              result: (
                <>
                  Identified researchers in <b>{t.name}</b> who haven’t yet co-authored together — surfaced as potential
                  internal collaborations.
                </>
              ),
            },
            {
              label: "Identify funding targets",
              result: (
                <>
                  Matched <b>{t.name}</b> to relevant open funding calls based on its themes and recent output.
                </>
              ),
            },
          ]}
        />
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
        <Actions
          items={[
            {
              label: "Draft promotion brief",
              result: (
                <>
                  Promo brief drafted for <b>{e.name}</b> ({e.date}) — target audience, key message and a channel plan, sized
                  for ~{e.attendees} attendees.
                </>
              ),
            },
            {
              label: "Match speakers",
              result: (
                <>
                  Suggested faculty speakers whose work aligns with <b>{e.name}</b>
                  {t ? <> and the {t.name} theme</> : null}.
                </>
              ),
            },
            {
              label: "Link related research",
              result: (
                <>
                  Linked papers and themes connected to <b>{e.name}</b> so attendees can explore the underlying work.
                </>
              ),
            },
          ]}
        />
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
        <Actions
          items={[
            {
              label: "Compare curriculum",
              result: (
                <>
                  Queued a curriculum comparison against <b>{c.name}</b> — strengths and gaps will appear in the Programmes
                  benchmark.
                </>
              ),
            },
            {
              label: "Track new programmes",
              result: (
                <>
                  Now monitoring <b>{c.name}</b> for new programme launches — you’ll be alerted when their catalogue changes.
                </>
              ),
            },
            {
              label: "Add to watchlist",
              result: (
                <>
                  <b>{c.name}</b> added to your competitor watchlist, with its “{c.strength}” strength noted.
                </>
              ),
            },
          ]}
        />
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
