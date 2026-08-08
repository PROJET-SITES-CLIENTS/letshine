"use client";

import { useRouter } from "@/components/providers/router-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { HomePage } from "@/components/pages/home";
import { AboutPage } from "@/components/pages/about";
import { ProgramsPage } from "@/components/pages/programs";
import { ProgramDetailPage } from "@/components/pages/program-detail";
import { FormationsPage } from "@/components/pages/formations";
import { FormationDetailPage } from "@/components/pages/formation-detail";
import { FormationCheckoutPage } from "@/components/pages/formation-checkout";
import { BoutiquePage } from "@/components/pages/boutique";
import { ProductDetailPage } from "@/components/pages/product-detail";
import { ServicesPage } from "@/components/pages/services";
import { PartenairesPage } from "@/components/pages/partenaires";
import { ActualitesPage } from "@/components/pages/actualites";
import { ArticleDetailPage } from "@/components/pages/article-detail";
import { MediathequePage } from "@/components/pages/mediatheque";
import { EvenementsPage } from "@/components/pages/evenements";
import { DonPage } from "@/components/pages/don";
import { ContactPage } from "@/components/pages/contact";
import { AdminPage } from "@/components/pages/admin";
import { CheckoutPage } from "@/components/pages/checkout";

export default function Home() {
  const { page } = useRouter();

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "about": return <AboutPage />;
      case "programs": return <ProgramsPage />;
      case "program-detail": return <ProgramDetailPage />;
      case "formations": return <FormationsPage />;
      case "formation-detail": return <FormationDetailPage />;
      case "formation-checkout": return <FormationCheckoutPage />;
      case "shop": return <BoutiquePage />;
      case "product-detail": return <ProductDetailPage />;
      case "services": return <ServicesPage />;
      case "partners": return <PartenairesPage />;
      case "news": return <ActualitesPage />;
      case "article-detail": return <ArticleDetailPage />;
      case "media": return <MediathequePage />;
      case "events": return <EvenementsPage />;
      case "donate": return <DonPage />;
      case "contact": return <ContactPage />;
      case "admin": return <AdminPage />;
      case "checkout": return <CheckoutPage />;
      default: return <HomePage />;
    }
  };

  // Admin page has its own full-screen layout (login + dashboard) — no public navbar/footer
  const isAdminPage = page === "admin";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFFFFF]">
      <CursorGlow />
      <ScrollProgress />
      {!isAdminPage && <Navbar />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}
