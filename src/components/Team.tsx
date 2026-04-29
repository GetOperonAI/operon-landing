import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const founders = [
  {
    name: "Burak Barlas",
    role: "Co-Founder, Engineering",
    location: "Los Angeles, CA",
    bio: "Full-stack engineer shipping product alongside Berkay. Previously co-founded a startup with Tanalp.",
  },
  {
    name: "Tanalp Acaroglu",
    role: "Co-Founder, Business",
    location: "London → SF Bay Area",
    bio: "Brought in the first enterprise customer. Full-time for 3 months. Previously co-founded a startup.",
  },
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 md:py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[32px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.3px] text-[#1c1c1e] mb-4">
            Built by engineers, not a pitch deck
          </h2>
          <p className="text-muted text-[18px] leading-[1.56] tracking-[0.3px] max-w-[600px] mx-auto">
            The founders have known each other for 5–10+ years. College friends,
            brothers, and repeat collaborators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[800px] mx-auto">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              className="bg-deep-teal border border-card-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-accent-wash flex items-center justify-center mb-5">
                <span className="font-display text-[20px] font-medium text-accent">
                  {f.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="font-display text-[20px] font-medium tracking-[0.1px] text-[#1c1c1e]">
                {f.name}
              </h3>
              <p className="text-accent text-[14px] font-medium tracking-[0.14px] mb-1">
                {f.role}
              </p>
              <p className="text-shade-50 text-[13px] tracking-[0.5px] mb-4">{f.location}</p>
              <p className="text-muted text-[15px] leading-[1.56]">{f.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
