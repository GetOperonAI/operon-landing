import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const useCases = [
  {
    title: 'Research & Paper Tracking',
    prompt: 'Track new faculty publications and draft department summary.',
    result: '142 papers categorized. 9 funding matches surfaced.',
  },
  {
    title: 'Editorial Workflow Automation',
    prompt: 'Prepare this policy update for review and route approvals.',
    result: 'Diff generated. Owner assigned. Deadline created.',
  },
  {
    title: 'Curriculum Comparison',
    prompt: 'Compare course requirements across 2024 and 2026 catalogs.',
    result: '17 changes found. Registrar-ready report exported.',
  },
  {
    title: 'Internal Q&A',
    prompt: 'Which students are missing prerequisite documentation?',
    result: '31 records matched. Outreach batch prepared.',
  },
]

export default function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="use-cases" className="px-6 py-24 md:py-32 bg-[#f8f8f4]" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-16 max-w-[840px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[42px] md:text-[76px] font-normal leading-[0.98] tracking-[0px] text-[#07120f] mb-6">
            Real workflows. Short commands.
          </h2>
          <p className="text-muted text-[19px] leading-[1.55] tracking-[0px] max-w-[620px]">
            The product shows its value in operational surfaces staff already
            understand: ask, act, report, route.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="overflow-hidden rounded-lg border border-[#17231f] bg-[#07120f] text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[12px] text-white/42">
                <span>{uc.title}</span>
                <span>completed</span>
              </div>
              <div className="space-y-5 p-6">
                <p className="font-mono text-[13px] leading-6 text-white/72">
                  <span className="text-accent">$</span> {uc.prompt}
                </p>
                <div className="rounded-md border border-white/10 bg-white/6 p-4">
                  <p className="text-[16px] leading-[1.5] text-white">{uc.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
