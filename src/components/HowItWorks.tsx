import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    num: '01',
    title: 'Connect',
    description: 'We integrate with your school\'s existing tools and data sources. No rip-and-replace.',
  },
  {
    num: '02',
    title: 'Structure',
    description: 'Operon indexes and structures your internal data using embedding-based search.',
  },
  {
    num: '03',
    title: 'Automate',
    description: 'AI workflows replace manual processes — from research tracking to editorial automation.',
  },
  {
    num: '04',
    title: 'Expand',
    description: 'Start with one use case, then expand across departments as new needs emerge.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="px-6 py-24 md:py-32 bg-[#07120f] text-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-16 grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[42px] md:text-[76px] font-normal leading-[0.98] tracking-[0px] text-white">
            From raw data to executed workflows.
          </h2>
          <p className="text-[18px] leading-[1.55] text-white/58">
            Start narrow. Connect the systems. Let the operating layer expand
            as departments discover repeatable work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative min-h-[260px] bg-[#0c1713] p-7"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              {i < steps.length - 1 && (
                <div className="pulse-line hidden md:block absolute top-12 left-[58%] right-[-28%] h-px bg-gradient-to-r from-accent to-sky-300" />
              )}
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-md border border-accent/35 text-accent font-mono text-[14px] font-medium tracking-[0px] mb-14">
                  {step.num}
                </div>
                <h3 className="font-display text-[24px] font-medium tracking-[0px] text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/58 text-[15px] leading-[1.56]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
