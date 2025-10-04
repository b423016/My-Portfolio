"use client";
import Layout from "./Layout";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Interactive from "./sections/Interactive";
import { PerformanceProvider } from "./contexts/PerformanceContext";

export default function GuiPortfolio() {
  return (
    <PerformanceProvider>
      <Layout>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
        <Interactive />
      </Layout>
    </PerformanceProvider>
  );
}
