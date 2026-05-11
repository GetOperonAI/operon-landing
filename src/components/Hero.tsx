import { motion } from 'framer-motion'

const feedItems = [
  'indexed 12,480 records from SIS',
  'matched curriculum delta: 94%',
  'drafted research report in 31s',
  'routed approval to registrar',
  'resolved 18 internal questions',
  'synced policy PDF embeddings',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07120f] px-6 pt-28 pb-16 text-white md:min-h-[92vh] md:pt-40">
      <div className="absolute inset-0 motion-grid opacity-70" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.28),transparent_62%)] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1200px] items-end gap-14 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            className="mb-7 inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/6 px-3 py-2 font-mono text-[12px] uppercase tracking-[0px] text-white/64"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            University ops, automated
          </motion.div>

          <motion.h1
            className="font-display text-[54px] font-normal leading-[0.94] tracking-[0px] text-white sm:text-[72px] md:text-[92px] lg:text-[112px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            AI that runs campus workflows.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-[660px] text-[19px] leading-[1.5] tracking-[0px] text-white/68 md:text-[22px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Operon connects to internal data, understands institutional context, and
            executes repetitive admin work across spreadsheets, emails, PDFs, and student systems.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="#contact"
              className="rounded-md bg-accent px-7 py-4 text-center text-[16px] font-medium text-white transition-colors hover:bg-accent-light"
            >
              Request a demo
            </a>
            <a
              href="#solution"
              className="rounded-md border border-white/16 px-7 py-4 text-center text-[16px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/6"
            >
              View system
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-[440px] overflow-hidden rounded-lg border border-white/12 bg-[#0c1713]/86 shadow-2xl shadow-black/40 backdrop-blur-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 font-mono text-[12px] text-white/46">
            <span>operon runtime</span>
            <span>live</span>
          </div>

          <div className="grid h-[398px] grid-cols-[1fr_1.05fr]">
            <div className="relative border-r border-white/10 p-5">
              <div className="absolute inset-0 motion-grid opacity-20" />
              <div className="relative flex h-full flex-col justify-between">
                {['SIS', 'CRM', 'PDF', 'MAIL'].map((node, i) => (
                  <div key={node} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/12 bg-white/6 font-mono text-[12px] text-white/70">
                      {node}
                    </span>
                    <span
                      className="pulse-line h-px flex-1 bg-gradient-to-r from-accent to-sky-300"
                      style={{ animationDelay: `${i * 0.35}s` }}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute left-[56%] top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-[12px] text-white">
                AI
              </div>
            </div>

            <div className="overflow-hidden p-5 font-mono text-[12px] leading-6 text-white/68">
              <div className="feed-track">
                {[...feedItems, ...feedItems].map((item, i) => (
                  <div key={`${item}-${i}`} className="flex items-center gap-3 border-b border-white/8 py-2">
                    <span className="text-sky-300">ok</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
