import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const points = [
  {
    title: 'Not a search tool',
    description: "We don't just help staff find information. We help them complete workflows end-to-end.",
  },
  {
    title: 'Institution-specific',
    description: 'Every school has unique data, systems, and processes. We build AI that understands yours.',
  },
  {
    title: 'Embeds, not replaces',
    description: 'We integrate directly with existing tools and data sources. No rip-and-replace.',
  },
  {
    title: 'Expands naturally',
    description: 'One deployment leads to many. The platform gets more valuable the more it\'s used.',
  },
]

export default function Differentiators() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 md:py-32 px-6 bg-deep-teal" ref={ref}>
      <div className="max-w-[900px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-[#1c1c1e]">
            What we understand that others don't
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              className="flex gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-accent-wash flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-accent" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-[18px] font-medium tracking-[0.1px] text-[#1c1c1e] mb-1">
                  {point.title}
                </h3>
                <p className="text-muted text-[15px] leading-[1.56]">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
