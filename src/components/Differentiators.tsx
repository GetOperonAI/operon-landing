import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const points = [
  {
    title: "Not a chatbot",
    description:
      "We return structured, visual outputs with sources, relationships, and next steps.",
  },
  {
    title: "Institution-specific",
    description:
      "Every school has unique resources, language, programs, and priorities. Operon learns that context.",
  },
  {
    title: "Evidence-first",
    description:
      "Every recommendation points back to the papers, pages, people, or assets that support it.",
  },
  {
    title: "Workflow-ready",
    description:
      "The output is not just an answer. It becomes a brief, benchmark, result board, or review artifact.",
  },
];

export default function Differentiators() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-[#f8f8f4]" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <h2 className="font-display text-[42px] md:text-[76px] font-normal leading-[0.98] tracking-[0px] text-[#07120f]">
              Why generic AI feels shallow.
            </h2>
            <p className="text-[19px] leading-[1.55] text-muted">
              Schools need more than generated text. They need a system that can
              search institutional resources and show the evidence visually.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-card-border bg-card-border md:grid-cols-2">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              className="flex gap-5 bg-white p-7 transition-colors hover:bg-accent-wash/40 md:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="shrink-0 w-8 h-8 rounded-md bg-accent-wash flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4 text-accent"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8.5l3.5 3.5L13 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-[21px] font-medium tracking-[0px] text-[#07120f] mb-2">
                  {point.title}
                </h3>
                <p className="text-muted text-[15px] leading-[1.56]">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
