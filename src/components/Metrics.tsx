import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '$30K+', label: 'Revenue generated' },
  { value: '3+', label: 'AI workflows deployed' },
  { value: '30–50%', label: 'Manual work replaced' },
]

export default function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-6 bg-white" ref={ref}>
      <div className="absolute inset-0 motion-grid-light opacity-60" />
      <div className="relative max-w-[1200px] mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[42px] md:text-[76px] font-normal leading-[0.98] tracking-[0px] text-[#07120f] max-w-[840px]">
            Built and deployed. Not just a demo.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-card-border bg-card-border md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-[#f8f8f4]/95 p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="font-display text-[52px] md:text-[72px] font-normal tracking-[0px] text-[#07120f] mb-3">
                {stat.value}
              </div>
              <div className="text-[15px] text-muted leading-[1.4]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
