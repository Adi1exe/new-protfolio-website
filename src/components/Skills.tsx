"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "VS Code", "MS Azure"],
  },
  {
    category: "Ai & Machine Learning",
    items: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "NLP", "Computer Vision"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 mb-16"
        >
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase">
            What I do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skills & Expertise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + groupIndex * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group p-8 rounded-2xl border border-border bg-card/50 hover:bg-card transition-all duration-500 hover:border-muted-foreground/30"
            >
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-foreground" />
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.4 + groupIndex * 0.1 + skillIndex * 0.05,
                      duration: 0.4,
                    }}
                    className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-full transition-all duration-300 hover:bg-foreground hover:text-background cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "20+", label: "Technologies Used" },
            { value: "15+", label: "Projects Completed" },
            { value: "69%", label: "Proficiency" },
            { value: "100%", label: "Commitment" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              className="space-y-2"
            >
              <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
