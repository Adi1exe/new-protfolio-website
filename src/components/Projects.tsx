"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ExternalLink, Github, Search, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
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
  categories: string[];
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
      { light: "/ATLAS auth-L.jpeg", dark: "/ATLAS auth.jpg" },
      { light: "/ATLAS dashboard-L.jpeg", dark: "/ATLAS dashboard.jpg" },
      { light: "/ATLAS upload-L.jpeg", dark: "/ATLAS upload.jpg" },
      { light: "/ATLAS config-L.jpeg", dark: "/ATLAS config.jpg" },
      { light: "/ATLAS results.jpeg", dark: "/ATLAS results.jpeg" },
    ],
    github: "https://github.com/Adi1exe/ATLAS-new/",
    live: "",
    categories: ["Web Development"],
  },
  {
    title: "Text-to-Speech & Speech-to-Text WebApp using MS Azure",
    description: "A speech processing web portal utilizing Azure Cognitive Services for translation and synthesis.",
    longDescription: "This cloud-integrated web application utilizes Azure AI Cognitive Services to perform high-accuracy, real-time Text-to-Speech (TTS) and Speech-to-Text (STT) translations. Built with a Flask backend, HTML5/CSS3, and vanilla JavaScript, and deployed using Azure App Services with continuous integration.",
    tags: ["Python-Flask", "HTML/CSS", "Javascript", "Ms Azure AI"],
    image: { light: "/MSAzure-1-L.png", dark: "/MSAzure-1.png" },
    gallery: [
      { light: "/MSAzure-1-L.png", dark: "/MSAzure-1.png" },
      { light: "/MSAzure-2-L.png", dark: "/MSAzure-2.png" },
      { light: "/MSAzure-3-L.png", dark: "/MSAzure-3.png" },
    ],
    github: "https://github.com/Adi1exe/MSAzure_Project",
    live: "https://text2speechandspeech2text-g0h5ancab3gbekfx.centralindia-01.azurewebsites.net/",
    categories: ["Web Development", "Cloud & Tools"],
  },
  {
    title: "ToneAnalyzer",
    description: "A machine learning application that classifies textual emotion and tone.",
    longDescription: "ToneAnalyzer classifies textual emotion and tone using trained Support Vector Machine (SVM) and Logistic Regression models. Features a React frontend, Python API backend, and Google Firebase for authentication, demonstrating end-to-end model implementation from training to deployment.",
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
    categories: ["Web Development", "AI & Machine Learning"],
  },
  {
    title: "SentimentIQ",
    description: "An intelligent sentiment evaluation platform integrating the Gemini API to analyze text dynamics.",
    longDescription: "SentimentIQ is an AI-powered text analysis platform that evaluates user sentiment dynamics in real time. Built with a ReactJS frontend and a lightweight Python backend, it integrates the Gemini API for natural language processing and leverages Google Firebase (Authentication & Firestore) for secure user sessions and historical data storage.",
    tags: ["ReactJS", "Python", "Streamlit", "Gemini API"],
    image: { light: "/SentimentIQ_L-1.png", dark: "/SentimentIQ_1.png" },
    gallery: [
      { light: "/SentimentIQ_L-1.png", dark: "/SentimentIQ_1.png" },
      { light: "/SentimentIQ_L-2.png", dark: "/SentimentIQ_2.png" },
      { light: "/SentimentIQ_L-3.png", dark: "/SentimentIQ_3.png" },
      { light: "/SentimentIQ_L-4.png", dark: "/SentimentIQ_4.png" },
      { light: "/SentimentIQ_L-5.png", dark: "/SentimentIQ_5.png" },
    ],
    github: "https://github.com/Adi1exe/SentimentIQ",
    live: "https://sentimentaliq.streamlit.app/",
    categories: ["Web Development", "AI & Machine Learning"],
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

  // Filtering states
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Web Development", "AI & Machine Learning", "Cloud & Tools"];

  // Listen to skill badge click custom event from Skills component
  useEffect(() => {
    const handleFilterSkill = (e: Event) => {
      const skillName = (e as CustomEvent).detail;
      setSelectedSkill(skillName);
      setActiveCategory("All"); // Reset category filter so we see the matching skill tags
    };

    window.addEventListener("filter-skill", handleFilterSkill);
    return () => window.removeEventListener("filter-skill", handleFilterSkill);
  }, []);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const matchesSkill = (projectTags: string[], skill: string) => {
    const s = skill.toLowerCase().trim();
    return projectTags.some((tag) => {
      const t = tag.toLowerCase().trim();
      return t === s || t.includes(s) || s.includes(t);
    });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category Filter
      if (activeCategory !== "All" && !project.categories.includes(activeCategory)) {
        return false;
      }
      // 2. Skill Filter
      if (selectedSkill && !matchesSkill(project.tags, selectedSkill)) {
        return false;
      }
      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, selectedSkill, searchQuery]);

  return (
    <section id="projects" className="py-32 bg-white dark:bg-[#0a0a0a]" ref={ref}>
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

        {/* Filters Header */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedSkill(null); // Clear specific skill filter when changing categories
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                    activeCategory === category && !selectedSkill
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search bar */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm bg-secondary rounded-full border border-transparent focus:border-border focus:outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active Skill Filter Tag */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 bg-secondary/80 border border-border px-4 py-2 rounded-lg w-fit text-sm"
              >
                <span className="text-muted-foreground">Filtering by skill:</span>
                <span className="font-mono font-medium px-2 py-0.5 bg-foreground text-background rounded text-xs">
                  {selectedSkill}
                </span>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-muted-foreground hover:text-foreground ml-1 cursor-pointer"
                  aria-label="Clear skill filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-border rounded-2xl bg-card/10"
          >
            <p className="text-muted-foreground text-lg mb-2">No projects found</p>
            <p className="text-sm text-muted-foreground/75">
              Try adjusting your search query or clear the active filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSelectedSkill(null);
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-95 transition-opacity cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <article
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-muted-foreground/30 transition-all duration-500 cursor-pointer h-full flex flex-col justify-between"
                    onClick={() => openProject(project)}
                  >
                    <div>
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
                      </div>
                    </div>

                    <div className="p-6 pt-0 space-y-4">
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

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