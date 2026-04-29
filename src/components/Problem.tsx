import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const painPoints = [
  {
    title: 'Fragmented Data',
    description: 'Critical information scattered across spreadsheets, PDFs, emails, CRMs, and student information systems.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="2" stroke="#2a41b6" strokeWidth="1.5" />
        <rect x="14" y="2" width="8" height="8" rx="2" stroke="#2a41b6" strokeWidth="1.5" />
        <rect x="2" y="14" width="8" height="8" rx="2" stroke="#2a41b6" strokeWidth="1.5" />
        <rect x="14" y="14" width="8" height="8" rx="2" stroke="#2a41b6" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    title: 'Manual Workflows',
    description: 'Staff spend hours on repetitive admin tasks that should be automated.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#2a41b6" strokeWidth="1.5" />
        <path d="M12 7v5l3.5 3.5" stroke="#2a41b6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Siloed Departments',
    description: 'Each team builds its own workarounds, creating duplication and inconsistency.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#2a41b6" strokeWidth="1.5" />
        <line x1="12" y1="3" x2="12" y2="21" stroke="#2a41b6" strokeWidth="1.5" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="#2a41b6" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Generic AI Falls Short',
    description: "Tools like Copilot or Notion AI help with search, but don't understand institutional workflows or operations.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M6 18l6-12 6 12" stroke="#2a41b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="14" x2="12" y2="11" stroke="#2a41b6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="0.75" fill="#2a41b6" />
      </svg>
    ),
  },
]

export default function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 md:py-32 px-6 bg-deep-teal" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-[#1c1c1e] max-w-[700px] mx-auto">
            Systems don't talk to each other. That's the real problem.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              className="bg-white border border-card-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent-wash flex items-center justify-center mb-4">
                {point.icon}
              </div>
              <h3 className="font-display text-[20px] font-medium tracking-[0.1px] text-[#1c1c1e] mb-2">
                {point.title}
              </h3>
              <p className="text-muted text-[16px] leading-[1.56]">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
