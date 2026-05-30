import type { ModuleId } from "./types";

interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
}

const ic = (paths: React.ReactNode) => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);

const items: NavItem[] = [
  { id: "knowledge", label: "Knowledge Layer", icon: ic(<><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="7" r="2.4" /><circle cx="12" cy="17" r="2.4" /><path d="M7.7 7.3 10.4 15M16.6 8.6 13.4 15.3M8 6.4h7.6" /></>) },
  { id: "research", label: "Research", icon: ic(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></>) },
  { id: "faculty", label: "Faculty", icon: ic(<><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 5.4M21 19a5 5 0 0 0-4-4.9" /></>) },
  { id: "programmes", label: "Programmes", icon: ic(<><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M7 9.5V14c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V9.5M21 7v5" /></>) },
  { id: "repository", label: "Repository", icon: ic(<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>) },
  { id: "competitors", label: "Competitors", icon: ic(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>) },
  { id: "insights", label: "Insights", icon: ic(<><path d="M3 17l5-6 4 4 8-9" /><path d="M21 6v4h-4" /></>) },
  { id: "reports", label: "Reports", icon: ic(<><path d="M7 3h7l5 5v13H7z" fill="none" /><path d="M14 3v5h5M10 13h6M10 17h6" /></>) },
];

const footItem: NavItem = {
  id: "impact",
  label: "Why Operon",
  icon: ic(<><circle cx="12" cy="12" r="9" /><path d="M12 8v4l2.5 2.5" /></>),
};

export default function Sidebar({
  active,
  onNavigate,
}: {
  active: ModuleId;
  onNavigate: (m: ModuleId) => void;
}) {
  return (
    <aside className="hidden w-[224px] shrink-0 flex-col border-r border-[#e6e9ef] bg-[#fbfcfe] md:flex">
      <nav className="flex-1 space-y-0.5 p-3">
        <div className="px-3 pb-2 pt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#a3acbb]">
          Workspace
        </div>
        {items.map((item) => (
          <NavButton key={item.id} item={item} active={active === item.id} onClick={() => onNavigate(item.id)} />
        ))}
      </nav>
      <div className="border-t border-[#e6e9ef] p-3">
        <NavButton item={footItem} active={active === "impact"} onClick={() => onNavigate("impact")} />
      </div>
    </aside>
  );
}

function NavButton({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
        active ? "bg-accent/10 text-accent" : "text-[#475569] hover:bg-[#eef1f6] hover:text-[#0f172a]"
      }`}
    >
      <span className={active ? "text-accent" : "text-[#94a3b8]"}>{item.icon}</span>
      {item.label}
    </button>
  );
}
