import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const useCases = [
  {
    title: "Editorial Intelligence Workflow",
    eyebrow: "Editorial AI",
    artifact: "Campaign brief",
    accent: "#38bdf8",
    description:
      "Research intelligence and editorial support for teams turning faculty work into campaigns, stories, and institutional communications.",
    outcomes: [
      "Campaign ideas",
      "Faculty discovery",
      "Paper analysis",
      "Research comms",
    ],
  },
  {
    title: "Competitive Intelligence Workflow",
    eyebrow: "Competitive AI",
    artifact: "Benchmark report",
    accent: "#818cf8",
    description:
      "Curriculum intelligence and benchmarking for programme teams comparing institutions, markets, and strategic positioning.",
    outcomes: [
      "Curriculum comparison",
      "Trend detection",
      "Strategic gaps",
      "Programme reviews",
    ],
  },
  {
    title: "Research Repository & Discovery",
    eyebrow: "Repository AI",
    artifact: "Research graph",
    accent: "#22c55e",
    description:
      "AI-powered repository, classification, and semantic discovery for large collections of papers and institutional documents.",
    outcomes: [
      "Paper ingestion",
      "Auto-classification",
      "Semantic discovery",
      "Tag management",
    ],
  },
  {
    title: "Conversational Asset Search",
    eyebrow: "Asset Search AI",
    artifact: "Visual result board",
    accent: "#facc15",
    description:
      "Conversational discovery across research, events, web assets, and institutional knowledge, with explainable recommendations.",
    outcomes: [
      "Natural-language search",
      "Relevant connections",
      "Explainable results",
      "Asset discovery",
    ],
  },
];

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="use-cases"
      className="px-6 py-24 md:py-32 bg-[#f8f8f4]"
      ref={ref}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-16 max-w-[840px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[42px] md:text-[76px] font-normal leading-[0.98] tracking-[0px] text-[#07120f] mb-6">
            Four workflows already deployed.
          </h2>
          <p className="text-muted text-[19px] leading-[1.55] tracking-[0px] max-w-[620px]">
            Operon is live across the work schools already do manually:
            editorial planning, research discovery, curriculum benchmarking, and
            institutional search.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="group overflow-hidden rounded-lg border border-card-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(7,18,15,0.35)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="relative min-h-[210px] overflow-hidden bg-[#07120f] p-5 text-white">
                <div className="absolute inset-0 motion-grid opacity-25" />
                <div
                  className="absolute -right-20 -top-24 h-56 w-56 rounded-full blur-3xl"
                  style={{ backgroundColor: `${uc.accent}33` }}
                />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0px] text-white/42">
                      {uc.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-[24px] font-medium leading-tight tracking-[0px] text-white">
                      {uc.title}
                    </h3>
                  </div>
                  <span
                    className="rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0px]"
                    style={{
                      borderColor: `${uc.accent}66`,
                      color: uc.accent,
                      backgroundColor: `${uc.accent}14`,
                    }}
                  >
                    deployed
                  </span>
                </div>

                <div className="relative mt-7 grid gap-3 sm:grid-cols-[0.82fr_1.18fr]">
                  <div className="rounded-md border border-white/10 bg-white/[0.05] p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0px] text-white/36">
                      Output
                    </p>
                    <p className="mt-2 text-[19px] font-medium leading-tight text-white">
                      {uc.artifact}
                    </p>
                    <div className="mt-5 flex items-end gap-1.5">
                      {[34, 52, 42, 68, 58].map((height, index) => (
                        <span
                          key={`${uc.title}-${height}`}
                          className="w-full rounded-sm"
                          style={{
                            height,
                            backgroundColor:
                              index === 3
                                ? uc.accent
                                : "rgba(255,255,255,0.18)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative min-h-[116px] rounded-md border border-white/10 bg-white/[0.04] p-4">
                    <span
                      className="absolute left-[18%] top-[48%] h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: uc.accent }}
                    />
                    <span className="absolute left-[48%] top-[24%] h-2 w-2 rounded-full bg-white/50" />
                    <span className="absolute left-[70%] top-[62%] h-2 w-2 rounded-full bg-white/34" />
                    <span
                      className="absolute left-[22%] top-[52%] h-px w-[31%] -rotate-[24deg]"
                      style={{ backgroundColor: `${uc.accent}88` }}
                    />
                    <span className="absolute left-[50%] top-[32%] h-px w-[24%] rotate-[34deg] bg-white/20" />
                    <div className="absolute bottom-4 left-4 right-4 grid gap-2">
                      <div className="h-2 rounded-sm bg-white/18" />
                      <div className="h-2 w-2/3 rounded-sm bg-white/12" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <p className="text-[16px] leading-[1.55] text-muted">
                  {uc.description}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {uc.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex min-h-11 items-center gap-2 rounded-md border border-card-border bg-[#f8f8f4] px-3 text-[14px] leading-tight text-[#07120f]"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: uc.accent }}
                      />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
