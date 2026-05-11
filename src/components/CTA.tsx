import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32 px-6 bg-[#07120f] text-white" ref={ref}>
      <div className="absolute inset-0 motion-grid opacity-35" />
      <div className="absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(37,99,235,0.28),transparent_62%)] blur-3xl" />
      <motion.div
        className="relative max-w-[860px] mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-[44px] md:text-[82px] font-normal leading-[0.98] tracking-[0px] text-white mb-6">
          Start with one workflow.
        </h2>
        <p className="text-white/64 text-[19px] leading-[1.55] tracking-[0px] mb-10 max-w-[620px] mx-auto">
          Connect the systems, replace the manual loop, and expand from there.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@getoperon.com"
            className="bg-accent text-white text-[16px] font-medium px-8 py-4 rounded-md hover:bg-accent-light transition-colors"
          >
            Request a Demo
          </a>
          <a
            href="mailto:hello@getoperon.com"
            className="border border-white/16 text-white text-[16px] font-medium px-8 py-4 rounded-md hover:border-white/42 hover:bg-white/6 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </motion.div>
    </section>
  )
}
