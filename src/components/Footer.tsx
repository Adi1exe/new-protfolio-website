"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUp, Instagram } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Adi1exe/", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aditya-dolas-992a44265/", icon: Linkedin },
  { name: "Twitter", href: "https://x.com/DolasAditya/", icon: Twitter },
  { name: "Instagram", href: "https://www.instagram.com/heyyyyadi/", icon: Instagram },
];

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <motion.a
              href="#hero"
              className="text-xl font-bold tracking-tight inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Aditya Dolas
            </motion.a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Building digital experiences that inspire and engage. Let&apos;s
              create something extraordinary.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm w-fit"
                  whileHover={{ x: 4 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={name}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              adityadolas.dev@gmail.com
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aditya Dolas. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
