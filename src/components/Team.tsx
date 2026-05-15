import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import burakPortrait from "../assets/team/burak-barlas.jpeg";
import tanalpPortrait from "../assets/team/tanalp-sengun.jpeg";

const founders = [
  {
    name: "Burak Barlas",
    role: "Co-Founder, Engineering",
    location: "Los Angeles, CA",
    // bio: "Full-stack engineer shipping product alongside Berkay. Previously co-founded a startup with Tanalp.",
    image: burakPortrait,
  },
  {
    name: "Tanalp Sengun",
    role: "Co-Founder, Business",
    location: "London → SF Bay Area",
    // bio: "Brought in the first enterprise customer. Full-time for 3 months. Previously co-founded a startup.",
    image: tanalpPortrait,
  },
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 md:py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-14 grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[42px] md:text-[76px] font-normal leading-[0.98] tracking-[0px] text-[#07120f]">
            Built by operators, not a pitch deck.
          </h2>
          <p className="text-muted text-[19px] leading-[1.55] tracking-[0px] max-w-[620px]">
            The founders have known each other for 5–10+ years. College friends,
            brothers, and repeat collaborators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-lg border border-card-border bg-card-border">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              className="bg-[#f8f8f4] p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-8 aspect-[4/3] overflow-hidden rounded-md bg-accent-wash">
                <img
                  src={f.image}
                  alt={`${f.name} portrait`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-[28px] font-medium tracking-[0px] text-[#07120f]">
                {f.name}
              </h3>
              <p className="text-accent text-[14px] font-medium tracking-[0px] mb-1">
                {f.role}
              </p>
              <p className="text-shade-50 text-[13px] tracking-[0px] mb-5">
                {f.location}
              </p>
              <p className="text-muted text-[15px] leading-[1.56]">{f.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
