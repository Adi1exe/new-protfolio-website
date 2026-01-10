"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered application that generates marketing content, blog posts, and social media captions using GPT-4.",
    tags: ["React", "OpenAI", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "would you rather Mini-Game",
    description:
      "A mini-game where users can choose between options options on fun 'would you rather' Questions.",
    tags: ["React", "Javascript", "CSS"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    github: "https://github.com/Adi1exe/would-you-rather-app",
    live: "https://would-you-rather-app.vercel.app/",
  },
  {
    title: "ATLAS - Analytics Dashboard",
    description:
      "Automated Tool for Leveraging Analytical Solutions.",
    tags: ["React", "D3.js", "Python", "Flask"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    github: "https://github.com/Adi1exe/ATLAS-new/",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 mb-16"
        >
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            My Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + index * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-muted-foreground/30 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-muted-foreground transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View on GitHub"
                    >
                      <Github size={16} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View live site"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://github.com/Adi1exe?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium text-sm hover:bg-foreground hover:text-background transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
