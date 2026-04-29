import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const capabilities = [
  {
    title: 'Retrieve Information Faster',
    description: 'Instant answers from across all institutional data sources.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#2a41b6" strokeWidth="1.5" />
        <path d="M16 16l4.5 4.5" stroke="#2a41b6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Generate Reports Automatically',
    description: 'Pull structured reports from fragmented data in seconds.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#2a41b6" strokeWidth="1.5" />
        <path d="M7 13h4m-4 3h7M7 10h10" stroke="#2a41b6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Answer Internal Questions',
    description: "AI that understands your institution's context, not just keywords.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7 3 3 6.5 3 11c0 2.5 1.2 4.7 3 6.2V21l3.5-2c.8.2 1.6.3 2.5.3 5 0 9-3.5 9-8s-4-8-9-8z" stroke="#2a41b6" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Automate Day-to-Day Operations',
    description: 'Replace repetitive tasks with intelligent, institution-specific automations.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="#2a41b6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" stroke="#2a41b6" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="solution" className="py-24 md:py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-[#1c1c1e] mb-4">
            Replace 30–50% of manual work
          </h2>
          <p className="text-muted text-[18px] leading-[1.56] tracking-[0.3px] max-w-[600px] mx-auto">
            Operon embeds AI directly into your school's internal systems — enabling staff
            to find information and complete workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="bg-deep-teal border border-card-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent-wash flex items-center justify-center mb-4">
                {cap.icon}
              </div>
              <h3 className="font-display text-[18px] font-medium tracking-[0.1px] text-[#1c1c1e] mb-2">
                {cap.title}
              </h3>
              <p className="text-muted text-[15px] leading-[1.56]">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
