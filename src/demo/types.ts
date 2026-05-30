import type { EntityKind } from "./data";

export type ModuleId =
  | "knowledge"
  | "research"
  | "faculty"
  | "programmes"
  | "repository"
  | "competitors"
  | "insights"
  | "reports"
  | "impact";

export interface Selection {
  kind: EntityKind;
  id: string;
}

export interface ModuleProps {
  onSelect: (sel: Selection | null) => void;
  selection: Selection | null;
  goTo: (m: ModuleId) => void;
}
