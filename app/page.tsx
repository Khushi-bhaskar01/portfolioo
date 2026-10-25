"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Loader } from "../components/Loader";
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
import { PixelWipe } from "../components/PixelWipe";
import { FooterSection } from "../components/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    number: "01",
    kind: "PERSONAL DASHBOARD / PRODUCTIVITY",
    title: "Hawk",
    text: "Journals, tasks and daily planning in one dashboard, shipped for Windows with Tauri.",
    stack: "JOURNALING / TASKS / DASHBOARD",
    color: "#2c4a78",
    image: "/hawk.png",
    href: "https://for-myself-nine.vercel.app/login",
  },
  {
    number: "02",
    kind: "EDTECH / FULL STACK",
    title: "LearnCSWithArshi",
    text: "A CS learning platform with structured paths, secure access and payments.",
    stack: "NEXT.JS / FIREBASE / RAZORPAY",
    color: "#c9a14e",
    image: "/cs.png",
    href: "https://learncswitharshi.com/",
  },
  {
    number: "03",
    kind: "PUBLIC INTEREST / WEBSITE",
    title: "Policy Perspective Foundation",
    text: "Website for a public-interest policy foundation.",
    stack: "FOUNDATION / PUBLIC INTEREST / WEBSITE",
    color: "#b8694e",
    image: "/ppf.png",
    href: "https://www.ppf.org.in/",
  },
  {
    number: "04",
    kind: "COMMUNITY / WEBSITE",
    title: "DevSource Portfolio",
    text: "Portfolio site for the DevSource developer community.",
    stack: "DEVSOURCE / COMMUNITY / PORTFOLIO",
    color: "#3a8a76",
    image: "/dev.png",
    href: "https://dev-source-portfolio.vercel.app/",
  },
];

const knowledgeAreas = [
  { title: "LANGUAGES", icon: "book" as const, items: ["C++", "Python", "JavaScript", "TypeScript", "SQL"] },
  { title: "FRONTEND", icon: "diamond" as const, items: ["React", "Next.js", "Tailwind CSS", "GSAP", "UI Systems"] },
  { title: "BACKEND", icon: "chest" as const, items: ["Node.js", "Express", "REST APIs", "WebSockets", "System Design"] },
  { title: "AI / ML", icon: "star" as const, items: ["NLP", "Transformers", "Hugging Face", "LLM APIs", "Research"] },
  { title: "DATABASE", icon: "emerald" as const, items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Data Modelling"] },
  { title: "INFRA", icon: "pickaxe" as const, items: ["Docker", "AWS", "Git", "GitHub", "CI / CD"] },
];

const achievements = [
  { title: "BuildSprint", detail: "3rd place", icon: "gold" as const },
  { title: "Plastic Hackathon", detail: "2nd place", icon: "diamond" as const },
  { title: "AI Manthan", detail: "Top 21", icon: "star" as const },
  { title: "TerraVision", detail: "4th place", icon: "emerald" as const },
];

export default function Home() {
  const [ready, setReady] = useState(false);
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

    return () => context.revert();
  }, []);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <div className="portfolio-shell">
        <Header onMenuOpen={() => setMenuOpen(true)} />
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main>
          <HeroSection ready={ready} />
          <PixelWipe />
          <WorkSection projects={projects} />
          <AboutSection />
          <ExperienceSection />
          <ResearchSection />
          <SkillsSection knowledgeAreas={knowledgeAreas} />
          <LeadershipSection achievements={achievements} />
          <ContactSection />
        </main>

        <FooterSection />
      </div>
    </>
  );
}
