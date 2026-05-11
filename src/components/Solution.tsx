import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const capabilities = [
  {
    title: 'Retrieve Information Faster',
    description: 'Instant answers from across all institutional data sources.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M16 16l4.5 4.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Generate Reports Automatically',
    description: 'Pull structured reports from fragmented data in seconds.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M7 13h4m-4 3h7M7 10h10" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Answer Internal Questions',
    description: "AI that understands your institution's context, not just keywords.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7 3 3 6.5 3 11c0 2.5 1.2 4.7 3 6.2V21l3.5-2c.8.2 1.6.3 2.5.3 5 0 9-3.5 9-8s-4-8-9-8z" stroke="#2563eb" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Automate Day-to-Day Operations',
    description: 'Replace repetitive tasks with intelligent, institution-specific automations.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" stroke="#2563eb" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="solution" className="overflow-hidden px-6 py-24 md:py-32 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-14 max-w-[880px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[42px] md:text-[76px] font-normal leading-[0.98] tracking-[0px] text-[#07120f] mb-6">
            One operating layer for institutional work.
          </h2>
          <p className="text-muted text-[19px] leading-[1.55] tracking-[0px] max-w-[640px]">
            Operon embeds AI inside existing systems so staff can retrieve,
            generate, answer, and act from the same operational context.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            className="relative min-h-[440px] overflow-hidden rounded-lg border border-[#16231f] bg-[#07120f] p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="absolute inset-0 motion-grid opacity-35" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.2),transparent_55%)]" />
            <div className="relative flex h-full min-h-[388px] items-center justify-center">
              <div className="absolute left-4 top-6 rounded-md border border-white/12 bg-white/7 px-4 py-3 font-mono text-[12px] text-white/62">
                student records
              </div>
              <div className="absolute right-4 top-16 rounded-md border border-white/12 bg-white/7 px-4 py-3 font-mono text-[12px] text-white/62">
                email + PDFs
              </div>
              <div className="absolute bottom-8 left-8 rounded-md border border-white/12 bg-white/7 px-4 py-3 font-mono text-[12px] text-white/62">
                CRM
              </div>
              <div className="absolute bottom-16 right-8 rounded-md border border-white/12 bg-white/7 px-4 py-3 font-mono text-[12px] text-white/62">
                spreadsheets
              </div>
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-center font-display text-[22px] font-medium">
                Operon
              </div>
              <span className="pulse-line absolute left-[17%] top-[31%] h-px w-[28%] bg-gradient-to-r from-white/0 via-accent to-sky-300" />
              <span className="pulse-line absolute right-[17%] top-[38%] h-px w-[28%] bg-gradient-to-r from-sky-300 via-accent to-white/0" style={{ animationDelay: '0.4s' }} />
              <span className="pulse-line absolute bottom-[31%] left-[20%] h-px w-[26%] bg-gradient-to-r from-white/0 via-accent to-sky-300" style={{ animationDelay: '0.8s' }} />
              <span className="pulse-line absolute bottom-[35%] right-[18%] h-px w-[27%] bg-gradient-to-r from-sky-300 via-accent to-white/0" style={{ animationDelay: '1.2s' }} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-card-border bg-card-border sm:grid-cols-2">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="bg-[#f8f8f4] p-7"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-md bg-accent-wash flex items-center justify-center mb-7">
                  {cap.icon}
                </div>
                <h3 className="font-display text-[20px] font-medium tracking-[0px] text-[#07120f] mb-2">
                  {cap.title}
                </h3>
                <p className="text-muted text-[15px] leading-[1.56]">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
