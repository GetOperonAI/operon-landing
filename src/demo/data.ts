// Mock institutional dataset powering the Operon demo experience.
// Everything here is fictional, designed to feel like a real university's
// knowledge layer once its sources are connected.

export type EntityKind =
  | "faculty"
  | "paper"
  | "programme"
  | "competitor"
  | "theme"
  | "event"
  | "department";

export interface Faculty {
  kind: "faculty";
  id: string;
  name: string;
  title: string;
  department: string;
  interests: string[];
  publications: number;
  grants: string; // total funding
  citations: number;
  collaborators: string[]; // faculty ids
  themes: string[]; // theme ids
  blurb: string;
}

export interface Paper {
  kind: "paper";
  id: string;
  title: string;
  authors: string[]; // faculty ids
  year: number;
  venue: string;
  citations: number;
  theme: string; // theme id
  abstract: string;
}

export interface Programme {
  kind: "programme";
  id: string;
  name: string;
  level: string;
  students: number;
  modules: string[];
  themes: string[];
  blurb: string;
}

export interface Competitor {
  kind: "competitor";
  id: string;
  name: string;
  rank: string;
  programmes: number;
  strength: string;
  modules: string[]; // for the MSc AI comparison
}

export interface Theme {
  kind: "theme";
  id: string;
  name: string;
  papers: number;
  growth: number; // % YoY
  faculty: number;
}

export interface DemoEvent {
  kind: "event";
  id: string;
  name: string;
  date: string;
  attendees: number;
  theme: string;
}

export const themes: Theme[] = [
  { kind: "theme", id: "clinical-ai", name: "AI for Healthcare", papers: 41, growth: 42, faculty: 7 },
  { kind: "theme", id: "sustainable-computing", name: "Sustainable Computing", papers: 28, growth: 36, faculty: 5 },
  { kind: "theme", id: "climate-analytics", name: "Climate Analytics", papers: 33, growth: 31, faculty: 6 },
  { kind: "theme", id: "responsible-ai", name: "Responsible AI", papers: 22, growth: 28, faculty: 4 },
  { kind: "theme", id: "fintech", name: "FinTech Innovation", papers: 19, growth: 17, faculty: 3 },
  { kind: "theme", id: "edtech", name: "Educational Technology", papers: 16, growth: 12, faculty: 3 },
];

export const faculty: Faculty[] = [
  {
    kind: "faculty",
    id: "mitchell",
    name: "Prof. Sarah Mitchell",
    title: "Professor of Clinical AI",
    department: "Computer Science",
    interests: ["Clinical AI", "Medical Imaging", "Diagnostic Systems"],
    publications: 84,
    grants: "$4.2M",
    citations: 9120,
    collaborators: ["carter", "zhang"],
    themes: ["clinical-ai", "responsible-ai"],
    blurb:
      "Leads the Clinical Decision Systems Lab, building source-grounded diagnostic models deployed across three teaching hospitals.",
  },
  {
    kind: "faculty",
    id: "carter",
    name: "Dr. James Carter",
    title: "Senior Lecturer, Medical Imaging",
    department: "Biomedical Engineering",
    interests: ["Medical Imaging", "Deep Learning", "Radiology"],
    publications: 47,
    grants: "$1.8M",
    citations: 4310,
    collaborators: ["mitchell", "reynolds"],
    themes: ["clinical-ai"],
    blurb:
      "Develops imaging models for early tumour detection; co-author on the institution's most cited clinical AI paper.",
  },
  {
    kind: "faculty",
    id: "zhang",
    name: "Prof. Emily Zhang",
    title: "Professor of Sustainable Systems",
    department: "Engineering",
    interests: ["Sustainable Energy", "Climate Modelling", "Green Computing"],
    publications: 96,
    grants: "$5.6M",
    citations: 11240,
    collaborators: ["bennett", "mitchell"],
    themes: ["sustainable-computing", "climate-analytics"],
    blurb:
      "Directs the Climate & Energy Institute; principal investigator on a cross-department climate analytics consortium.",
  },
  {
    kind: "faculty",
    id: "reynolds",
    name: "Dr. Michael Reynolds",
    title: "Lecturer, Responsible AI",
    department: "Computer Science",
    interests: ["AI Governance", "Responsible AI", "Policy"],
    publications: 31,
    grants: "$0.9M",
    citations: 2180,
    collaborators: ["carter", "bennett"],
    themes: ["responsible-ai", "clinical-ai"],
    blurb:
      "Researches AI governance frameworks and contributes to national policy on responsible deployment of clinical models.",
  },
  {
    kind: "faculty",
    id: "bennett",
    name: "Prof. Laura Bennett",
    title: "Professor of FinTech & Data Science",
    department: "Business School",
    interests: ["FinTech", "Data Science", "Digital Transformation"],
    publications: 62,
    grants: "$2.4M",
    citations: 5870,
    collaborators: ["zhang", "reynolds"],
    themes: ["fintech", "responsible-ai"],
    blurb:
      "Bridges the Business School and Computer Science through applied FinTech and responsible data-science research.",
  },
];

export const papers: Paper[] = [
  {
    kind: "paper",
    id: "p1",
    title: "Source-Grounded Diagnostic Models for Clinical Decision Support",
    authors: ["mitchell", "carter"],
    year: 2025,
    venue: "Nature Medicine",
    citations: 312,
    theme: "clinical-ai",
    abstract:
      "A framework for diagnostic AI that cites the underlying evidence for every prediction, improving clinician trust.",
  },
  {
    kind: "paper",
    id: "p2",
    title: "Deep Imaging Pipelines for Early Tumour Detection",
    authors: ["carter", "mitchell"],
    year: 2024,
    venue: "IEEE TMI",
    citations: 198,
    theme: "clinical-ai",
    abstract:
      "Imaging models that flag early-stage anomalies with calibrated uncertainty across multi-site datasets.",
  },
  {
    kind: "paper",
    id: "p3",
    title: "Carbon-Aware Scheduling for Large-Scale Compute",
    authors: ["zhang"],
    year: 2025,
    venue: "ACM SIGENERGY",
    citations: 141,
    theme: "sustainable-computing",
    abstract:
      "Scheduling strategies that shift workloads to low-carbon windows, cutting datacentre emissions by 23%.",
  },
  {
    kind: "paper",
    id: "p4",
    title: "Regional Climate Risk Modelling Under Uncertainty",
    authors: ["zhang", "bennett"],
    year: 2024,
    venue: "Nature Climate Change",
    citations: 224,
    theme: "climate-analytics",
    abstract:
      "Probabilistic models that quantify regional climate exposure for infrastructure and finance planning.",
  },
  {
    kind: "paper",
    id: "p5",
    title: "Governance Frameworks for Clinical AI Deployment",
    authors: ["reynolds", "mitchell"],
    year: 2025,
    venue: "AI & Society",
    citations: 87,
    theme: "responsible-ai",
    abstract:
      "A governance model balancing innovation with accountability for AI used in regulated clinical settings.",
  },
  {
    kind: "paper",
    id: "p6",
    title: "Explainable Credit Models for Inclusive FinTech",
    authors: ["bennett", "reynolds"],
    year: 2024,
    venue: "Journal of Financial Data Science",
    citations: 103,
    theme: "fintech",
    abstract:
      "Transparent credit-scoring models that expand access while remaining auditable and fair.",
  },
];

export const programmes: Programme[] = [
  {
    kind: "programme",
    id: "msc-ai",
    name: "MSc Artificial Intelligence",
    level: "Postgraduate",
    students: 142,
    modules: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning"],
    themes: ["clinical-ai", "responsible-ai"],
    blurb:
      "Flagship technical master's covering core ML through to applied AI systems and deployment.",
  },
  {
    kind: "programme",
    id: "mba",
    name: "MBA",
    level: "Postgraduate",
    students: 210,
    modules: ["Strategy", "Finance", "Leadership", "Digital Transformation"],
    themes: ["fintech"],
    blurb: "FT-ranked MBA with growing AI and digital-transformation electives.",
  },
  {
    kind: "programme",
    id: "msc-sustainability",
    name: "MSc Sustainability",
    level: "Postgraduate",
    students: 88,
    modules: ["Climate Policy", "Energy Systems", "Sustainable Finance"],
    themes: ["climate-analytics", "sustainable-computing"],
    blurb: "Interdisciplinary programme linking engineering, policy, and finance.",
  },
  {
    kind: "programme",
    id: "msc-data-science",
    name: "MSc Data Science",
    level: "Postgraduate",
    students: 165,
    modules: ["Statistics", "Machine Learning", "Data Engineering", "Visualization"],
    themes: ["fintech", "clinical-ai"],
    blurb: "Applied data-science master's with strong industry placement.",
  },
  {
    kind: "programme",
    id: "msc-digital",
    name: "MSc Digital Innovation",
    level: "Postgraduate",
    students: 74,
    modules: ["Product Management", "Design Thinking", "Digital Strategy"],
    themes: ["fintech", "edtech"],
    blurb: "Bridges technology and business for digital product leaders.",
  },
];

export const competitors: Competitor[] = [
  {
    kind: "competitor",
    id: "uni-a",
    name: "Northbridge University",
    rank: "#4 AI",
    programmes: 6,
    strength: "AI Governance & Ethics",
    modules: ["Machine Learning", "Deep Learning", "NLP", "AI Ethics", "AI Governance", "MLOps"],
  },
  {
    kind: "competitor",
    id: "uni-b",
    name: "Westlake Institute",
    rank: "#7 AI",
    programmes: 4,
    strength: "Industry Capstones",
    modules: ["Machine Learning", "Computer Vision", "Reinforcement Learning", "Industry Capstone", "MLOps"],
  },
  {
    kind: "competitor",
    id: "uni-c",
    name: "Cordell Tech",
    rank: "#9 AI",
    programmes: 5,
    strength: "Responsible AI",
    modules: ["Deep Learning", "NLP", "Responsible AI", "AI Product Management", "AI Governance"],
  },
  {
    kind: "competitor",
    id: "uni-d",
    name: "Harlow State",
    rank: "#12 AI",
    programmes: 3,
    strength: "Sustainability Integration",
    modules: ["Machine Learning", "Deep Learning", "Sustainable AI", "Computer Vision"],
  },
];

export const events: DemoEvent[] = [
  { kind: "event", id: "e1", name: "AI Research Symposium", date: "Mar 2026", attendees: 420, theme: "clinical-ai" },
  { kind: "event", id: "e2", name: "Sustainability Summit", date: "Apr 2026", attendees: 360, theme: "climate-analytics" },
  { kind: "event", id: "e3", name: "Innovation Week", date: "May 2026", attendees: 540, theme: "fintech" },
  { kind: "event", id: "e4", name: "Research Showcase", date: "Jun 2026", attendees: 280, theme: "responsible-ai" },
];

// ---- Lookup helpers -------------------------------------------------------

export const facultyById = (id: string) => faculty.find((f) => f.id === id);
export const themeById = (id: string) => themes.find((t) => t.id === id);
export const papersByTheme = (id: string) => papers.filter((p) => p.theme === id);
export const facultyByTheme = (id: string) => faculty.filter((f) => f.themes.includes(id));

// ---- Knowledge graph ------------------------------------------------------

export interface GraphNode {
  id: string;
  label: string;
  kind: EntityKind;
  x: number; // 0-100 viewport %
  y: number;
  r: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

export const graphNodes: GraphNode[] = [
  // research themes (center cluster)
  { id: "clinical-ai", label: "AI for Healthcare", kind: "theme", x: 50, y: 38, r: 30 },
  { id: "climate-analytics", label: "Climate Analytics", kind: "theme", x: 30, y: 64, r: 26 },
  { id: "responsible-ai", label: "Responsible AI", kind: "theme", x: 70, y: 64, r: 24 },
  // faculty
  { id: "mitchell", label: "S. Mitchell", kind: "faculty", x: 50, y: 14, r: 22 },
  { id: "carter", label: "J. Carter", kind: "faculty", x: 24, y: 30, r: 18 },
  { id: "zhang", label: "E. Zhang", kind: "faculty", x: 14, y: 54, r: 20 },
  { id: "reynolds", label: "M. Reynolds", kind: "faculty", x: 84, y: 46, r: 18 },
  { id: "bennett", label: "L. Bennett", kind: "faculty", x: 86, y: 78, r: 18 },
  // papers
  { id: "p1", label: "Diagnostic Models", kind: "paper", x: 64, y: 22, r: 14 },
  { id: "p4", label: "Climate Risk", kind: "paper", x: 18, y: 78, r: 14 },
  { id: "p5", label: "AI Governance", kind: "paper", x: 82, y: 60, r: 14 },
  // programme
  { id: "msc-ai", label: "MSc AI", kind: "programme", x: 44, y: 60, r: 18 },
  { id: "msc-sustainability", label: "MSc Sustainability", kind: "programme", x: 30, y: 86, r: 16 },
  // event
  { id: "e1", label: "AI Symposium", kind: "event", x: 66, y: 44, r: 13 },
];

export const graphEdges: GraphEdge[] = [
  { from: "mitchell", to: "clinical-ai", label: "researches" },
  { from: "carter", to: "clinical-ai", label: "researches" },
  { from: "reynolds", to: "responsible-ai", label: "researches" },
  { from: "reynolds", to: "clinical-ai", label: "researches" },
  { from: "zhang", to: "climate-analytics", label: "researches" },
  { from: "bennett", to: "responsible-ai", label: "researches" },
  { from: "mitchell", to: "carter", label: "collaborates with" },
  { from: "zhang", to: "bennett", label: "collaborates with" },
  { from: "carter", to: "reynolds", label: "collaborates with" },
  { from: "mitchell", to: "p1", label: "authored" },
  { from: "carter", to: "p1", label: "authored" },
  { from: "zhang", to: "p4", label: "authored" },
  { from: "reynolds", to: "p5", label: "authored" },
  { from: "p1", to: "clinical-ai", label: "published in" },
  { from: "p4", to: "climate-analytics", label: "published in" },
  { from: "p5", to: "responsible-ai", label: "published in" },
  { from: "mitchell", to: "msc-ai", label: "teaches" },
  { from: "reynolds", to: "msc-ai", label: "teaches" },
  { from: "zhang", to: "msc-sustainability", label: "teaches" },
  { from: "msc-ai", to: "clinical-ai", label: "related to" },
  { from: "msc-sustainability", to: "climate-analytics", label: "related to" },
  { from: "mitchell", to: "e1", label: "speaking at" },
  { from: "e1", to: "clinical-ai", label: "related to" },
];

export const kindColors: Record<EntityKind, string> = {
  faculty: "#2563eb",
  paper: "#0ea5e9",
  programme: "#7c3aed",
  competitor: "#db2777",
  theme: "#059669",
  event: "#d97706",
  department: "#64748b",
};

export const kindLabels: Record<EntityKind, string> = {
  faculty: "Faculty",
  paper: "Paper",
  programme: "Programme",
  competitor: "Competitor",
  theme: "Research Theme",
  event: "Event",
  department: "Department",
};
