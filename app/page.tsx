"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Header } from "../components/Header";
import { MenuOverlay } from "../components/MenuOverlay";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { WorkSection, type Project } from "../components/WorkSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ResearchSection } from "../components/ResearchSection";
import { SkillsSection } from "../components/SkillsSection";
import { LeadershipSection } from "../components/LeadershipSection";
import { ContactSection } from "../components/ContactSection";
import { FooterSection } from "../components/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    number: "01",
    kind: "PERSONAL DASHBOARD / PRODUCTIVITY",
    title: "For Myself",
    text: "A personal dashboard for journals, to-do lists, and everyday planning, with a Windows wrapper built using Tauri.",
    stack: "JOURNALING / TASKS / DASHBOARD",
    tone: "theme-1",
    image: "/hawk.png",
    href: "https://for-myself-nine.vercel.app/login",
  },
  {
    number: "02",
    kind: "EDTECH / FULL STACK",
    title: "LearnCSWithArshi",
    text: "A learning platform for computer science education with structured pathways, secure access, and product-led experience design.",
    stack: "NEXT.JS / FIREBASE / RAZORPAY",
    tone: "theme-2",
    image: "/cs.png",
    href: "https://learncswitharshi.com/",
  },
  {
    number: "03",
    kind: "PUBLIC INTEREST / WEBSITE",
    title: "Policy Perspective Foundation",
    text: "The Policy Perspective Foundation website, built by me for a public-interest organization.",
    stack: "FOUNDATION / PUBLIC INTEREST / WEBSITE",
    tone: "theme-3",
    image: "/ppf.png",
    href: "https://www.ppf.org.in/",
  },
  {
    number: "04",
    kind: "COMMUNITY / WEBSITE",
    title: "DevSource Portfolio",
    text: "A portfolio website created by DevSource members.",
    stack: "DEVSOURCE / COMMUNITY / PORTFOLIO",
    tone: "theme-4",
    image: "/dev.png",
    href: "https://dev-source-portfolio.vercel.app/",
  },
];

const knowledgeAreas = [
  { title: "LANGUAGES", items: ["C++", "Python", "JavaScript", "TypeScript", "SQL"] },
  { title: "FRONTEND", items: ["React", "Next.js", "Tailwind CSS", "GSAP", "UI Systems"] },
  { title: "BACKEND", items: ["Node.js", "Express", "REST APIs", "WebSockets", "System Design"] },
  { title: "AI / ML", items: ["NLP", "Transformers", "Hugging Face", "LLM APIs", "Research"] },
  { title: "DATABASE", items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Data Modelling"] },
  { title: "INFRA", items: ["Docker", "AWS", "Git", "GitHub", "CI / CD"] },
];

const achievements = [
  { number: "03", label: "BUILDSprint", detail: "3rd place" },
  { number: "02", label: "PLASTIC HACKATHON", detail: "2nd place" },
  { number: "21", label: "AI MANTHAN", detail: "Top 21" },
  { number: "04", label: "TERRAVISION", detail: "4th place" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    const progressTimer = window.setInterval(() => {
      setProgress((value) => Math.min(value + 2, 100));
    }, 28);

    const timer = window.setTimeout(() => setLoading(false), 1500);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(timer);
      context.revert();
    };
  }, []);

  return (
    <>
      <div className={loading ? "loader" : "loader loader-done"}>
        <div className="loader-wrap">
          <span>BOOTING PORTFOLIO</span>
          <strong>{String(progress).padStart(2, "0")}%</strong>
        </div>
      </div>
      <div className="portfolio-shell">
        <Header onMenuOpen={() => setMenuOpen(true)} />
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main>
          <HeroSection />
          <WorkSection projects={projects} />
          <AboutSection />
          <ExperienceSection />
          <ResearchSection />
          <SkillsSection knowledgeAreas={knowledgeAreas} />
          <LeadershipSection />
          <ContactSection />
        </main>

        <FooterSection />
      </div>
    </>
  );
}
