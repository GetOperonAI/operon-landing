import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EntityKind } from "./data";
import { kindColors, kindLabels } from "./data";

// ---- Small UI atoms -------------------------------------------------------

export function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[12px] font-medium"
      style={{
        backgroundColor: color ? `${color}14` : "#eef2ff",
        color: color ?? "#2563eb",
      }}
    >
      {children}
    </span>
  );
}

export function KindBadge({ kind }: { kind: EntityKind }) {
  const color = kindColors[kind];
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#475569]">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {kindLabels[kind]}
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#94a3b8]">
      {children}
    </div>
  );
}

export function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-[#e6e9ef] bg-white p-4">
      <div
        className="font-display text-[26px] font-medium leading-none"
        style={{ color: accent ? "#2563eb" : "#0f172a" }}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[12.5px] text-[#64748b]">{label}</div>
    </div>
  );
}

// ---- Processing animation -------------------------------------------------
// Simulates Operon reasoning across institutional sources before revealing
// a result. Calls onDone when finished.

export function Processing({
  steps,
  onDone,
  stepMs = 620,
}: {
  steps: string[];
  onDone: () => void;
  stepMs?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= steps.length) {
      const t = setTimeout(onDone, 280);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((a) => a + 1), stepMs);
    return () => clearTimeout(t);
  }, [active, steps.length, stepMs, onDone]);

  return (
    <div className="rounded-xl border border-[#e6e9ef] bg-white p-6">
      <div className="mb-5 flex items-center gap-2.5 text-[14px] font-medium text-[#0f172a]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        Operon is working across institutional sources…
      </div>
      <div className="space-y-2.5">
        {steps.map((step, i) => {
          const state = i < active ? "done" : i === active ? "running" : "pending";
          return (
            <div key={step} className="flex items-center gap-3">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                  state === "done"
                    ? "bg-accent text-white"
                    : state === "running"
                      ? "border-2 border-accent text-accent"
                      : "border border-[#e2e8f0] text-[#cbd5e1]"
                }`}
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              <span
                className={`text-[13.5px] ${
                  state === "pending" ? "text-[#94a3b8]" : "text-[#334155]"
                }`}
              >
                {step}
                {state === "running" && <AnimatedDots />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnimatedDots() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setN((x) => (x % 3) + 1), 320);
    return () => clearInterval(t);
  }, []);
  return <span className="text-accent">{".".repeat(n)}</span>;
}

// ---- Query bar ------------------------------------------------------------

export function QueryBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  suggestions,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  placeholder: string;
  suggestions?: string[];
}) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) onSubmit(value.trim());
        }}
        className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15"
      >
        <svg className="h-5 w-5 shrink-0 text-[#94a3b8]" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[15px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-accent px-4 py-1.5 text-[13.5px] font-medium text-white transition-colors hover:bg-accent-light"
        >
          Ask Operon
        </button>
      </form>
      {suggestions && suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(s);
                onSubmit(s);
              }}
              className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[12.5px] text-[#475569] transition-colors hover:border-accent hover:text-accent"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Reveal wrapper -------------------------------------------------------

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence };
