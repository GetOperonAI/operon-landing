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
    <section className="py-24 md:py-32 px-6 bg-deep-teal" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-[#1c1c1e]">
            From fragmented data to automated workflows
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-24px] h-px bg-card-border" />
              )}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-accent/30 text-accent font-display text-[14px] font-medium tracking-[0.5px] mb-4">
                  {step.num}
                </div>
                <h3 className="font-display text-[20px] font-medium tracking-[0.1px] text-[#1c1c1e] mb-2">
                  {step.title}
                </h3>
                <p className="text-muted text-[15px] leading-[1.56]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
