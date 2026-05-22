import { motion, useInView } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'

const demoOptions = [
  'Editorial Intelligence Workflow',
  'Competitive Intelligence Workflow',
  'Research Repository & Discovery',
  'Conversational Asset Search',
]

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [institution, setInstitution] = useState('')
  const [contact, setContact] = useState('')
  const [demoType, setDemoType] = useState(demoOptions[0])
  const [problems, setProblems] = useState('')

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Operon demo request: ${institution || 'New institution'}`)
    const body = encodeURIComponent(
      [
        `Institution / organization: ${institution}`,
        `Contact: ${contact}`,
        `Demo requested: ${demoType}`,
        '',
        'Current problems / workflows:',
        problems,
      ].join('\n'),
    )

    return `mailto:hello@getoperon.com?subject=${subject}&body=${body}`
  }, [contact, demoType, institution, problems])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = mailtoHref
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32 px-6 bg-[#07120f] text-white" ref={ref}>
      <div className="absolute inset-0 motion-grid opacity-35" />
      <div className="absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(37,99,235,0.28),transparent_62%)] blur-3xl" />
      <motion.div
        className="relative max-w-[980px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="font-display text-[44px] md:text-[82px] font-normal leading-[0.98] tracking-[0px] text-white mb-6">
              Start with one workflow.
            </h2>
            <p className="text-white/64 text-[19px] leading-[1.55] tracking-[0px] max-w-[520px]">
              Tell us which resources your team needs to search, compare, or
              turn into visual intelligence.
            </p>
          </div>

          <form
            className="rounded-lg border border-white/12 bg-white/[0.06] p-5 md:p-7 text-left"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-white/72">
                  School or institution
                </span>
                <input
                  className="min-h-12 rounded-md border border-white/14 bg-[#0d1a16] px-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent"
                  required
                  value={institution}
                  onChange={(event) => setInstitution(event.target.value)}
                  placeholder="e.g. Business School, University, Department"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-white/72">
                  Work email
                </span>
                <input
                  className="min-h-12 rounded-md border border-white/14 bg-[#0d1a16] px-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent"
                  required
                  type="email"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="name@institution.edu"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-white/72">
                  Which demo should we show?
                </span>
                <select
                  className="min-h-12 rounded-md border border-white/14 bg-[#0d1a16] px-4 text-[15px] text-white outline-none transition-colors focus:border-accent"
                  value={demoType}
                  onChange={(event) => setDemoType(event.target.value)}
                >
                  {demoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-medium text-white/72">
                  What problems should we understand first?
                </span>
                <textarea
                  className="min-h-36 resize-y rounded-md border border-white/14 bg-[#0d1a16] px-4 py-3 text-[15px] leading-[1.5] text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent"
                  required
                  value={problems}
                  onChange={(event) => setProblems(event.target.value)}
                  placeholder="Describe the resources, search problems, visual outputs, workflows, or teams involved."
                />
              </label>

              <button
                type="submit"
                className="min-h-12 rounded-md bg-accent px-6 text-[16px] font-medium text-white transition-colors hover:bg-accent-light"
              >
                Request a Demo
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
