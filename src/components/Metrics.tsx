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
    <section className="py-24 md:py-32 px-6 bg-forest" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-white">
            Built and deployed. Not just a demo.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="font-display text-[40px] md:text-[56px] font-normal tracking-[-0.5px] text-white mb-2">
                {stat.value}
              </div>
              <div className="text-[14px] md:text-[15px] text-white/50 leading-[1.4]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
