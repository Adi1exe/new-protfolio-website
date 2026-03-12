import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { ThemeProvider } from "next-themes"; 
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aditya Dolas | Full Stack Developer & ML Engineer",
    template: "%s | Aditya Dolas",
  },
  description: "Full Stack Developer, Machine Learning Engineer, and Open Source Contributor specializing in Next.js, React, and Python.",
  keywords: ["Aditya Dolas", "Full Stack Developer", "Machine Learning Engineer", "Next.js", "React", "Python", "Software Engineer", "Portfolio"],
  creator: "Aditya Dolas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityadolas-theta.vercel.app/",
    title: "Aditya Dolas | Full Stack Developer & ML Engineer",
    description: "Full Stack Developer & Machine Learning Engineer specializing in building exceptional digital experiences.",
    siteName: "Aditya Dolas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Dolas | Full Stack Developer & ML Engineer",
    description: "Full Stack Developer & Machine Learning Engineer specializing in building exceptional digital experiences.",
    creator: "@DolasAditya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <VisualEditsMessenger />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}