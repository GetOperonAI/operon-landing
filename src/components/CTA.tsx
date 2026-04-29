import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-deep-teal" ref={ref}>
      <motion.div
        className="max-w-[700px] mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-[#1c1c1e] mb-4">
          Ready to automate your institution's operations?
        </h2>
        <p className="text-muted text-[18px] leading-[1.56] tracking-[0.3px] mb-10">
          We start with one high-value workflow and expand from there. Let's find yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@getoperon.com"
            className="bg-accent text-white text-[16px] font-medium px-8 py-4 rounded-full hover:bg-accent-light transition-colors"
          >
            Request a Demo
          </a>
          <a
            href="mailto:hello@getoperon.com"
            className="border border-card-border text-[#1c1c1e] text-[16px] font-medium px-8 py-4 rounded-full hover:border-muted transition-colors"
          >
            Contact Us
          </a>
        </div>
      </motion.div>
    </section>
  )
}
