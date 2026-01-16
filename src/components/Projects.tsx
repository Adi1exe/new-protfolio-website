"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

type Project = {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  gallery?: string[];
  github: string;
  live: string;
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
    longDescription:
      "This e-commerce platform allows users to browse products, filter by category, and securely checkout using Stripe. It features a comprehensive admin dashboard for managing products, orders, and customers. Real-time inventory updates ensure stock levels are always accurate.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&q=80",
    ],
    github: "", // Placeholder removed
    live: "", // Placeholder removed
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered application that generates marketing content, blog posts, and social media captions using GPT-4.",
    longDescription:
      "Leveraging the power of OpenAI's GPT-4, this application helps marketers and content creators generate high-quality copy in seconds. Users can specify tone, length, and keywords to get tailored content for blogs, ads, and social media.",
    tags: ["React", "OpenAI", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
    ],
    github: "", // Placeholder removed
    live: "", // Placeholder removed
  },
  {
    title: "would you rather Mini-Game",
    description:
      "A mini-game where users can choose between options options on fun 'would you rather' Questions.",
    longDescription:
      "A fun and interactive 'Would You Rather' game where users are presented with two scenarios and must choose one. The app tracks global statistics on choices and allows users to submit their own questions.",
    tags: ["React", "Javascript", "CSS"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
    ],
    github: "https://github.com/Adi1exe/would-you-rather-app",
    live: "https://would-you-rather-app.vercel.app/",
  },
  {
    title: "ATLAS - Analytics Dashboard",
    description:
      "Automated Tool for Leveraging Analytical Solutions.",
    longDescription:
      "ATLAS is a comprehensive analytics dashboard designed to visualize complex datasets. It utilizes D3.js for interactive charts and graphs, allowing users to drill down into data for deeper insights.",
    tags: ["React", "D3.js", "Python", "Flask"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
    github: "https://github.com/Adi1exe/ATLAS-new/",
    live: "",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

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
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-muted-foreground/30 transition-all duration-500 cursor-pointer"
              onClick={() => openProject(project)}
            >
              <div className="aspect-video overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover  transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-muted-foreground transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div 
                    className="flex items-center gap-2 relative z-10"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 bg-card"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View on GitHub"
                      >
                        <Github size={16} />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 bg-card"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View live site"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-5xl w-full bg-card border-border p-0 overflow-hidden flex flex-col max-h-[90vh]">
            {selectedProject && (
              <div className="flex flex-col overflow-y-auto">
                {/* Carousel Section */}
                <div className="w-full bg-background/50 relative flex items-center justify-center p-6 border-b border-border">
                  <Carousel className="w-full max-w-2xl">
                    <CarouselContent>
                      {(selectedProject.gallery || [selectedProject.image]).map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-video rounded-md overflow-hidden border border-border bg-muted">
                             <Image 
                                src={img} 
                                alt={`${selectedProject.title} screenshot ${index + 1}`}
                                width={800}
                                height={450}
                                className="object-cover w-full h-full"
                             />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="left-[-1rem]" />
                        <CarouselNext className="right-[-1rem]" />
                    </div>
                  </Carousel>
                </div>

                {/* Details Section */}
                <div className="w-full p-6 md:p-8 space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold">{selectedProject.title}</DialogTitle>
                        <DialogDescription className="text-base text-muted-foreground mt-2">
                           <div className="flex flex-wrap gap-2">
                             {selectedProject.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-mono">
                                    {tag}
                                </span>
                             ))}
                           </div>
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {selectedProject.longDescription || selectedProject.description}
                        </p>
                    </div>

                    <div className="pt-6 border-t border-border flex gap-4">
                         {selectedProject.github && (
                            <a
                                href={selectedProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                            >
                                <Github size={18} />
                                View Code
                            </a>
                        )}
                        {selectedProject.live && (
                            <a
                                href={selectedProject.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border font-medium hover:bg-secondary transition-colors"
                            >
                                <ExternalLink size={18} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
