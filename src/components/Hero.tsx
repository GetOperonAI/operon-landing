import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-36 pb-24 md:pt-48 md:pb-32 px-6 bg-white">
      <div className="max-w-[900px] mx-auto text-center">
        <motion.h1
          className="font-display text-[40px] md:text-[72px] font-normal leading-[1.05] tracking-[-0.5px] text-[#1c1c1e] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The AI Operating System{' '}
          <span className="text-accent">for Universities</span>
        </motion.h1>

        <motion.p
          className="text-muted text-[18px] md:text-[20px] leading-[1.5] tracking-[0.3px] max-w-[640px] mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Connect to your school's internal data and systems. Automate the repetitive
          admin work staff still do manually — across spreadsheets, emails, PDFs, and
          student systems.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="#contact"
            className="bg-accent text-white text-[16px] font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-colors"
          >
            Request a Demo
          </a>
          <a
            href="#solution"
            className="border border-card-border text-[#1c1c1e] text-[16px] font-medium px-8 py-3.5 rounded-full hover:border-muted transition-colors"
          >
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  )
}
