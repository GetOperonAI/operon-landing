import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  graphNodes,
  graphEdges,
  kindColors,
  kindLabels,
  type EntityKind,
  type GraphNode,
} from "./data";
import type { ModuleProps } from "./types";

const W = 1000;
const H = 620;
const px = (x: number) => (x / 100) * W;
const py = (y: number) => (y / 100) * H;

const legendKinds: EntityKind[] = ["faculty", "paper", "theme", "programme", "event"];

export default function KnowledgeGraph({ onSelect, selection }: ModuleProps) {
  const [hover, setHover] = useState<string | null>(null);

  const focus = selection?.id ?? hover;

  const { activeNodes, activeEdges } = useMemo(() => {
    if (!focus) return { activeNodes: new Set<string>(), activeEdges: new Set<number>() };
    const nodes = new Set<string>([focus]);
    const edges = new Set<number>();
    graphEdges.forEach((e, i) => {
      if (e.from === focus || e.to === focus) {
        edges.add(i);
        nodes.add(e.from);
        nodes.add(e.to);
      }
    });
    return { activeNodes: nodes, activeEdges: edges };
  }, [focus]);

  const nodeById = (id: string) => graphNodes.find((n) => n.id === id)!;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-[24px] font-medium text-[#0f172a]">Institutional Knowledge Layer</h2>
          <p className="mt-1 text-[14px] text-[#64748b]">
            {graphNodes.length} entities · {graphEdges.length} relationships · click any node to explore
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {legendKinds.map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-[12px] text-[#475569]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: kindColors[k] }} />
              {kindLabels[k]}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-[#e6e9ef] bg-[#fcfdff]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="relative h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* edges */}
          {graphEdges.map((e, i) => {
            const a = nodeById(e.from);
            const b = nodeById(e.to);
            const isActive = activeEdges.has(i);
            const dim = focus && !isActive;
            return (
              <g key={i}>
                <line
                  x1={px(a.x)}
                  y1={py(a.y)}
                  x2={px(b.x)}
                  y2={py(b.y)}
                  stroke={isActive ? kindColors[a.kind] : "#cbd5e1"}
                  strokeWidth={isActive ? 2.4 : 1.2}
                  strokeOpacity={dim ? 0.18 : isActive ? 0.85 : 0.55}
                />
                {isActive && (
                  <text
                    x={(px(a.x) + px(b.x)) / 2}
                    y={(py(a.y) + py(b.y)) / 2 - 4}
                    textAnchor="middle"
                    className="fill-[#64748b] font-mono"
                    style={{ fontSize: 11, paintOrder: "stroke", stroke: "#fcfdff", strokeWidth: 4 }}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* nodes */}
          {graphNodes.map((n) => (
            <Node
              key={n.id}
              node={n}
              selected={selection?.id === n.id}
              dim={!!focus && !activeNodes.has(n.id)}
              onClick={() => onSelect({ kind: n.kind, id: n.id })}
              onHover={(h) => setHover(h ? n.id : (cur) => (cur === n.id ? null : cur))}
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-[#e6e9ef] bg-white/90 px-3.5 py-2.5 text-[12px] text-[#64748b] backdrop-blur">
          {selection ? (
            <span>
              Exploring <span className="font-medium text-[#0f172a]">{nodeById(selection.id)?.label}</span> — see Context panel →
            </span>
          ) : (
            <span>Operon connects people, papers, programmes &amp; events into one graph.</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Node({
  node,
  selected,
  dim,
  onClick,
  onHover,
}: {
  node: GraphNode;
  selected: boolean;
  dim: boolean;
  onClick: () => void;
  onHover: (h: boolean) => void;
}) {
  const color = kindColors[node.kind];
  const cx = px(node.x);
  const cy = py(node.y);
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      animate={{ opacity: dim ? 0.32 : 1 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.06 }}
    >
      {selected && (
        <circle cx={cx} cy={cy} r={node.r + 8} fill="none" stroke={color} strokeWidth={2} strokeOpacity={0.4} />
      )}
      <circle cx={cx} cy={cy} r={node.r} fill={color} fillOpacity={0.14} stroke={color} strokeWidth={selected ? 3 : 2} />
      <text
        x={cx}
        y={cy + node.r + 15}
        textAnchor="middle"
        className="fill-[#334155]"
        style={{
          fontSize: 13,
          fontWeight: 500,
          paintOrder: "stroke",
          stroke: "#fcfdff",
          strokeWidth: 4,
        }}
      >
        {node.label}
      </text>
    </motion.g>
  );
}
