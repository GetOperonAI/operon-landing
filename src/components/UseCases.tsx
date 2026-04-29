import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const useCases = [
  {
    title: 'Research & Paper Tracking',
    description: 'Automatically track, categorize, and surface research papers across departments.',
  },
  {
    title: 'Editorial Workflow Automation',
    description: 'Streamline editorial review, approval, and publishing processes.',
  },
  {
    title: 'Curriculum Comparison',
    description: 'Compare and analyze curriculum data across programs and years instantly.',
  },
  {
    title: 'Internal Q&A',
    description: 'Staff ask natural language questions and get accurate, context-aware answers.',
  },
]

export default function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="use-cases" className="py-24 md:py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-[#1c1c1e] mb-4">
            Proven workflows, deployed today
          </h2>
          <p className="text-muted text-[18px] leading-[1.56] tracking-[0.3px] max-w-[550px] mx-auto">
            AI-powered automations expanding across departments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="bg-deep-teal border border-card-border rounded-xl p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="font-display text-[20px] font-medium tracking-[0.1px] text-accent mb-2">
                {uc.title}
              </h3>
              <p className="text-muted text-[15px] leading-[1.56]">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
