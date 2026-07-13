"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Programs } from "@/components/sections/programs";
import { Formations } from "@/components/sections/formations";
import { Boutique } from "@/components/sections/boutique";
import { Services } from "@/components/sections/services";
import { Partenaires } from "@/components/sections/partenaires";
import { Actualites } from "@/components/sections/actualites";
import { Mediathèque } from "@/components/sections/mediatheque";
import { Evenements } from "@/components/sections/evenements";
import { Don } from "@/components/sections/don";
import { EspaceMembre } from "@/components/sections/espace-membre";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0a0f1e]">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Programs />
        <Formations />
        <Boutique />
        <Services />
        <Partenaires />
        <Actualites />
        <Mediathèque />
        <Evenements />
        <Don />
        <EspaceMembre />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
