import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const inputNodes = [
  {
    id: "students",
    label: "Student Records",
    meta: "SIS",
    top: "13%",
    left: "4%",
    color: "#38bdf8",
    pathId: "student-flow",
    outputPathId: "answer-flow",
    run: [
      "match prerequisite gaps",
      "compose staff answer",
      "queue student outreach",
    ],
  },
  {
    id: "faculty",
    label: "Faculty Members",
    meta: "FAC",
    top: "34%",
    left: "4%",
    color: "#818cf8",
    pathId: "faculty-flow",
    outputPathId: "approval-flow",
    run: [
      "resolve faculty owner",
      "check approval policy",
      "route task to department",
    ],
  },
  {
    id: "research",
    label: "Research Papers",
    meta: "DOC",
    top: "55%",
    left: "4%",
    color: "#22c55e",
    pathId: "research-flow",
    outputPathId: "report-flow",
    run: [
      "cluster recent papers",
      "draft department report",
      "surface funding matches",
    ],
  },
  {
    id: "policy",
    label: "Policy Library",
    meta: "PDF",
    top: "76%",
    left: "4%",
    color: "#facc15",
    pathId: "policy-flow",
    outputPathId: "queue-flow",
    run: [
      "retrieve source policy",
      "compare requested action",
      "queue compliant follow-up",
    ],
  },
];

const outputNodes = [
  {
    id: "answer",
    label: "Staff Answer",
    meta: "ANS",
    top: "15%",
    right: "4%",
    color: "#60a5fa",
    pathId: "answer-flow",
    sourcePathId: "student-flow",
    run: [
      "read student context",
      "cite source record",
      "return grounded answer",
    ],
  },
  {
    id: "report",
    label: "Report Drafted",
    meta: "RPT",
    top: "38%",
    right: "4%",
    color: "#38bdf8",
    pathId: "report-flow",
    sourcePathId: "research-flow",
    run: ["summarize papers", "attach faculty context", "export admin report"],
  },
  {
    id: "approval",
    label: "Approval Routed",
    meta: "APV",
    top: "61%",
    right: "4%",
    color: "#2563eb",
    pathId: "approval-flow",
    sourcePathId: "faculty-flow",
    run: ["identify approver", "apply department rules", "assign next action"],
  },
  {
    id: "followup",
    label: "Follow-up Queued",
    meta: "SYNC",
    top: "77%",
    right: "4%",
    color: "#93c5fd",
    pathId: "queue-flow",
    sourcePathId: "policy-flow",
    run: ["validate policy", "prepare message", "sync workflow state"],
  },
];

const flowPaths = [
  {
    id: "student-flow",
    d: "M158 93 C258 92 302 126 350 190",
    color: "#38bdf8",
  },
  {
    id: "faculty-flow",
    d: "M158 202 C252 202 304 207 350 220",
    color: "#818cf8",
  },
  {
    id: "research-flow",
    d: "M158 311 C252 310 306 280 350 248",
    color: "#22c55e",
  },
  {
    id: "policy-flow",
    d: "M158 420 C260 398 302 326 350 275",
    color: "#facc15",
  },
  {
    id: "answer-flow",
    d: "M470 222 C545 190 588 108 662 102",
    color: "#60a5fa",
  },
  {
    id: "report-flow",
    d: "M472 242 C548 242 596 218 662 210",
    color: "#38bdf8",
  },
  {
    id: "approval-flow",
    d: "M470 262 C548 286 592 330 662 328",
    color: "#2563eb",
  },
  {
    id: "queue-flow",
    d: "M462 282 C535 338 592 414 662 420",
    color: "#93c5fd",
  },
  { id: "platform-flow", d: "M410 306 L410 424", color: "#60a5fa" },
];

export default function Hero() {
  const [activeId, setActiveId] = useState("research");
  const activeItem = useMemo(
    () =>
      [...inputNodes, ...outputNodes].find((node) => node.id === activeId) ??
      inputNodes[2],
    [activeId],
  );
  const activePathIds = useMemo(
    () =>
      new Set([
        activeItem.pathId,
        "outputPathId" in activeItem ? activeItem.outputPathId : undefined,
        "sourcePathId" in activeItem ? activeItem.sourcePathId : undefined,
        "platform-flow",
      ]),
    [activeItem],
  );
  const activeWorkflowSteps = [
    { label: "Retrieve", detail: activeItem.run[0] },
    { label: "Compose", detail: activeItem.run[1] },
    { label: "Route", detail: activeItem.run[2] },
  ];

  return (
    <section className="relative overflow-hidden bg-[#07120f] px-6 pt-28 pb-14 text-white md:min-h-[92vh] md:pt-36">
      <div className="absolute inset-0 operon-dot-grid opacity-85" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.28),transparent_62%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[980px] text-center">
          <motion.div
            className="mb-7 inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/6 px-3 py-2 font-mono text-[12px] uppercase tracking-[0px] text-white/64"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            University ops, automated
          </motion.div>

          <motion.h1
            className="font-display text-[54px] font-normal leading-[0.94] tracking-[0px] text-white sm:text-[72px] md:text-[96px] lg:text-[112px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            AI that runs campus workflows.
          </motion.h1>

          <motion.p
            className="mx-auto mt-7 max-w-[720px] text-[19px] leading-[1.5] tracking-[0px] text-white/68 md:text-[22px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Operon connects internal systems, understands institutional context,
            and automates repetitive operational work across the university.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="#contact"
              className="rounded-md bg-accent px-7 py-4 text-center text-[16px] font-medium text-white transition-colors hover:bg-accent-light"
            >
              Request a demo
            </a>
            <a
              href="#solution"
              className="rounded-md border border-white/16 px-7 py-4 text-center text-[16px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/6"
            >
              View system
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-14 hidden aspect-[1.62] min-h-[560px] overflow-hidden rounded-xl border border-white/10 bg-black/24 shadow-2xl shadow-black/40 backdrop-blur-sm md:block"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="absolute inset-0 operon-dot-grid opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(37,99,235,0.28),transparent_31%),linear-gradient(90deg,rgba(7,18,15,0.84),transparent_28%,transparent_72%,rgba(7,18,15,0.84))]" />
          <div className="absolute left-1/2 top-[44%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/10 bg-sky-300/5 blur-sm" />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 820 520"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <defs>
              {flowPaths.map((path) => (
                <linearGradient
                  key={`${path.id}-gradient`}
                  id={`${path.id}-gradient`}
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor={path.color} stopOpacity="0" />
                  <stop
                    offset="45%"
                    stopColor={path.color}
                    stopOpacity="0.18"
                  />
                  <stop
                    offset="62%"
                    stopColor={path.color}
                    stopOpacity="0.78"
                  />
                  <stop offset="100%" stopColor={path.color} stopOpacity="0" />
                </linearGradient>
              ))}
              <filter
                id="flow-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {flowPaths.map((path, i) => {
              const isActive = activePathIds.has(path.id);

              return (
                <g key={path.id}>
                  <path
                    d={path.d}
                    stroke={path.color}
                    strokeWidth={i === flowPaths.length - 1 ? 1 : 2}
                    strokeLinecap="round"
                    strokeOpacity={isActive ? 0.28 : 0.08}
                  />
                  <path
                    id={path.id}
                    d={path.d}
                    className="flow-path"
                    stroke={`url(#${path.id}-gradient)`}
                    strokeWidth={
                      isActive ? 7 : i === flowPaths.length - 1 ? 3 : 4
                    }
                    strokeOpacity={isActive ? 1 : 0.42}
                    strokeLinecap="round"
                    style={{
                      animationDelay: `${i * 0.18}s`,
                      animationDuration: isActive ? "4.8s" : undefined,
                    }}
                  />
                </g>
              );
            })}

            {flowPaths.slice(0, 8).map((path, i) => (
              <circle
                key={`${path.id}-packet`}
                r={i < 4 ? "4.5" : "4"}
                fill={path.color}
                filter="url(#flow-glow)"
              >
                <animateMotion
                  dur={`${5.2 + (i % 3) * 0.55}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.24}s`}
                >
                  <mpath href={`#${path.id}`} />
                </animateMotion>
              </circle>
            ))}
          </svg>

          {inputNodes.map((node) => (
            <motion.button
              type="button"
              key={node.label}
              className="absolute flex h-[76px] w-[222px] cursor-pointer items-center gap-3 rounded-lg border border-dashed bg-[#07120f]/80 px-4 text-left backdrop-blur-md"
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveId(node.id)}
              style={{
                top: node.top,
                left: node.left,
                borderColor: `${node.color}78`,
                boxShadow:
                  activeId === node.id
                    ? `0 0 44px ${node.color}2e, inset 0 0 0 1px ${node.color}66`
                    : `0 0 32px ${node.color}10, inset 0 0 0 1px ${node.color}1f`,
              }}
            >
              <span
                className="flex h-10 w-12 shrink-0 items-center justify-center rounded-md font-mono text-[11px]"
                style={{
                  backgroundColor: `${node.color}18`,
                  color: node.color,
                }}
              >
                {node.meta}
              </span>
              <span className="min-w-0">
                <span className="block text-[17px] font-medium leading-tight text-white/82">
                  {node.label}
                </span>
                <span className="mt-1 block font-mono text-[11px] text-white/36">
                  click to inspect
                </span>
              </span>
            </motion.button>
          ))}

          {outputNodes.map((node) => (
            <motion.button
              type="button"
              key={node.label}
              className="absolute flex h-[76px] w-[222px] cursor-pointer items-center gap-3 rounded-lg border border-dashed bg-[#07120f]/78 px-4 text-left backdrop-blur-md"
              whileHover={{ x: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveId(node.id)}
              style={{
                top: node.top,
                right: node.right,
                borderColor:
                  activeId === node.id
                    ? `${node.color}88`
                    : "rgba(71, 85, 105, 0.75)",
                boxShadow:
                  activeId === node.id
                    ? `0 0 44px ${node.color}28, inset 0 0 0 1px ${node.color}55`
                    : undefined,
              }}
            >
              <span
                className="flex h-10 w-12 shrink-0 items-center justify-center rounded-md border font-mono text-[11px]"
                style={{
                  borderColor: `${node.color}99`,
                  color: node.color,
                  backgroundColor:
                    activeId === node.id ? `${node.color}14` : undefined,
                }}
              >
                {node.meta}
              </span>
              <span className="min-w-0">
                <span className="block text-[17px] font-medium leading-tight text-white/82">
                  {node.label}
                </span>
                <span className="mt-1 block font-mono text-[11px] text-white/36">
                  click to inspect
                </span>
              </span>
            </motion.button>
          ))}

          <div className="absolute left-1/2 top-[44%] grid h-[188px] w-[188px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-sky-300/18 bg-[#07120f]/60">
            <div className="hub-glow grid h-32 w-32 place-items-center rounded-full border-[3px] border-sky-300 bg-accent/16">
              <div className="text-center">
                <div className="font-display text-[22px] font-medium text-white">
                  Operon
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0px] text-sky-200/70">
                  ops engine
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[19%] flex -translate-x-1/2 items-center gap-2 rounded-full border border-sky-300/15 bg-sky-300/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0px] text-sky-100/64">
            <span className="h-2 w-2 rounded-full bg-sky-300" />
            normalize -&gt; reason -&gt; act
          </div>

          <motion.div
            className="absolute bottom-[4%] left-1/2 w-[38%] -translate-x-1/2 rounded-lg border border-dashed bg-[#07120f]/82 p-4 backdrop-blur-md"
            animate={{
              borderColor: `${activeItem.color}66`,
              boxShadow: `0 0 44px ${activeItem.color}14`,
            }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0px]">
              <span className="text-sky-200/72">{activeItem.label}</span>
              <span
                className="rounded-md px-2 py-1"
                style={{
                  backgroundColor: `${activeItem.color}18`,
                  color: activeItem.color,
                }}
              >
                selected
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {activeWorkflowSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-3"
                  animate={{
                    borderColor:
                      i === 1
                        ? `${activeItem.color}4d`
                        : "rgba(255,255,255,0.1)",
                    y: i === 1 ? -2 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="mb-2 font-mono text-[11px]"
                    style={{ color: activeItem.color }}
                  >
                    0{i + 1}
                  </div>
                  <div className="text-[15px] font-medium leading-tight text-white/84">
                    {step.label}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-white/38">
                    {step.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-12 grid gap-3 md:hidden"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          <div className="rounded-lg border border-white/12 bg-white/6 p-5">
            <div className="mb-4 font-mono text-[12px] uppercase tracking-[0px] text-sky-200/70">
              Inputs
            </div>
            <div className="grid grid-cols-2 gap-3">
              {inputNodes.map((node) => (
                <div
                  key={node.label}
                  className="rounded-md border bg-[#07120f]/60 p-3 text-[14px] text-white/72"
                  style={{
                    borderColor: `${node.color}55`,
                    boxShadow: `inset 0 0 0 1px ${node.color}14`,
                  }}
                >
                  <span
                    className="mb-2 block font-mono text-[11px]"
                    style={{ color: node.color }}
                  >
                    {node.meta}
                  </span>
                  <span>{node.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-sky-300/35 bg-accent/12 p-5 text-center">
            <div className="text-[24px] font-medium text-white">
              Operon runtime
            </div>
            <div className="mt-2 text-[14px] text-white/58">
              connects, reasons, acts
            </div>
          </div>
          <div className="rounded-lg border border-white/12 bg-white/6 p-5">
            <div className="mb-4 font-mono text-[12px] uppercase tracking-[0px] text-sky-200/70">
              Outputs
            </div>
            <div className="grid grid-cols-2 gap-3">
              {outputNodes.map((node) => (
                <div
                  key={node.label}
                  className="rounded-md border border-white/10 bg-[#07120f]/60 p-3 text-[14px] text-white/72"
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
