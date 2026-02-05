"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ThemeImage = string | { light: string; dark: string };

type Project = {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: ThemeImage;
  gallery?: ThemeImage[];
  github: string;
  live: string;
};

const projects: Project[] = [
  {
    title: "ATLAS - Analytics Dashboard",
    description: "Automated Tool for Leveraging Analytical Solutions.",
    longDescription: "ATLAS is a comprehensive analytics dashboard designed to visualize complex datasets. It utilizes D3.js for interactive charts and graphs, allowing users to drill down into data for deeper insights.",
    tags: ["React", "D3.js", "Python", "Flask"],
    image: { light: "/ATLAS hero-L.png", dark: "/ATLAS hero.png" },
    gallery: [
      { light: "/ATLAS hero-L.png", dark: "/ATLAS hero.png" },
      { light: "/ATLAS auth-L.jpeg", dark: "/ATLAS auth.jpeg" },
      { light: "/ATLAS dashboard-L.jpeg", dark: "/ATLAS dashboard.jpeg" },
      { light: "/ATLAS upload-L.jpeg", dark: "/ATLAS upload.jpeg" },
      { light: "/ATLAS config-L.jpeg", dark: "/ATLAS config.jpeg" },
      { light: "/ATLAS results.jpeg", dark: "/ATLAS results.jpeg" },
    ],
    github: "https://github.com/Adi1exe/ATLAS-new/",
    live: "",
  },
  {
    title: "Text-to-Speech & Speech-to-Text WebApp using MS Azure",
    description: "A Text-to-Speech and Speech-to-Text WebApp using MS Azure.",
    longDescription: "This WebApp allows users to convert text to speech and speech to text using MS Azure. Also used Ms Azure for deploying this webapp.",
    tags: ["Python-Flask", "HTML/CSS", "Javascript", "Ms Azure AI"],
    image: { light: "/MSAzure-1-L.png", dark: "/MSAzure-1.png" },
    gallery: [
      { light: "/MSAzure-1-L.png", dark: "/MSAzure-1.png" },
      { light: "/MSAzure-2-L.png", dark: "/MSAzure-2.png" },
      { light: "/MSAzure-3-L.png", dark: "/MSAzure-3.png" },
    ],
    github: "https://github.com/Adi1exe/MSAzure_Project",
    live: "https://text2speechandspeech2text-g0h5ancab3gbekfx.centralindia-01.azurewebsites.net/",
  },
  {
    title: "ToneAnalyzer",
    description: "A web application that analyzes the tone of text using ML Algorithms.",
    longDescription: "Leveraging the power of ML Algorithms (SVM, Logistic Regression), this application helps users to analyze the tone of text.",
    tags: ["Python", "ReactJS", "Google Firebase Auth", "SVM", "Logistic Regression"],
    image: { light: "/ToneAnalyzer_L-1.png", dark: "/ToneAnalyzer-1.png" },
    gallery: [
      { light: "/ToneAnalyzer_L-1.png", dark: "/ToneAnalyzer-1.png" },
      { light: "/ToneAnalyzer_L-2.png", dark: "/ToneAnalyzer-2.png" },
      { light: "/ToneAnalyzer_L-3.png", dark: "/ToneAnalyzer-3.png" },
      { light: "/ToneAnalyzer_L-4.png", dark: "/ToneAnalyzer-4.png" },
    ],
    github: "https://github.com/Adi1exe/ToneAnalyzer",
    live: "",
  },
  {
    title: "would you rather Mini-Game",
    description: "A mini-game where users can choose between options on fun 'would you rather' Questions.",
    longDescription: "A fun and interactive 'Would You Rather' game where users are presented with two scenarios and must choose one.",
    tags: ["ReactJS", "Javascript", "CSS"],
    image: { light: "/WYRC-L.png", dark: "/WYRC.png" },
    github: "https://github.com/Adi1exe/would-you-rather-app",
    live: "https://would-you-rather-app.vercel.app/",
  },
];

// Helper Component for the instant CSS-based swap
const ProjectImage = ({ img, alt, className, priority = false }: { img: ThemeImage, alt: string, className?: string, priority?: boolean }) => {
  if (typeof img === "string") {
    return <Image src={img} alt={alt} width={800} height={450} className={className} priority={priority} />;
  }

  return (
    <>
      {/* Hidden in dark mode, shown in light mode */}
      <Image
        src={img.light}
        alt={`${alt} Light`}
        width={800}
        height={450}
        className={`${className} dark:hidden block`}
        priority={priority}
      />
      {/* Hidden in light mode, shown in dark mode */}
      <Image
        src={img.dark}
        alt={`${alt} Dark`}
        width={800}
        height={450}
        className={`${className} hidden dark:block`}
        priority={priority}
      />
    </>
  );
};

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
    <section id="projects" className="py-32 bg-white dark:bg-[#0a0a0a]" ref={ref}>      <div className="max-w-6xl mx-auto px-6">
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
            <div className="aspect-video overflow-hidden relative">
              <div className="w-full h-full">
                <ProjectImage
                  img={project.image}
                  alt={project.title}
                  priority={index < 2}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold group-hover:text-muted-foreground transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 relative z-10" onClick={(e) => e.stopPropagation()}>
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 bg-card"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
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
                  <span key={tag} className="px-3 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded-full">
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
              <div className="w-full bg-background/50 relative flex items-center justify-center p-6 border-b border-border">
                <Carousel className="w-full max-w-2xl">
                  <CarouselContent>
                    {(selectedProject.gallery || [selectedProject.image]).map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video rounded-md overflow-hidden border border-border bg-muted">
                          <ProjectImage
                            img={img}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
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

              <div className="w-full p-6 md:p-8 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">{selectedProject.title}</DialogTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </DialogHeader>

                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border flex gap-4">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                      <Github size={18} />
                      View Code
                    </a>
                  )}
                  {selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border font-medium hover:bg-secondary transition-colors">
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