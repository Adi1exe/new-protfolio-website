"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setFormState({ name: "", email: "", message: "" });
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase">
                Get in Touch
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Let&apos;s work
                <br />
                together
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Have a project in mind? I&apos;d love to hear about it. Send me a
              message and let&apos;s create something amazing together.
            </p>

            <div className="space-y-6 pt-4">
              <motion.a
                href="mailto:adityadolas.dev@gmail.com"
                className="flex items-center gap-4 group"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium group-hover:text-muted-foreground transition-colors">
                    adityadolas.dev@gmail.com
                  </p>
                </div>
              </motion.a>

              <motion.div className="flex items-center gap-4" whileHover={{ x: 4 }}>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Pune, MH</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 p-8 rounded-2xl border border-border bg-card/50"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-muted-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                required
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-foreground text-background font-medium rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 p-8 md:p-12 rounded-2xl bg-foreground text-background"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                Ready to start a project?
              </h3>
              <p className="text-background/70">
                Let&apos;s build something amazing together.
              </p>
            </div>
            <motion.a
              href="mailto:adityadolas.dev@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground font-medium rounded-full hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.02, gap: "12px" }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Conversation
              <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
