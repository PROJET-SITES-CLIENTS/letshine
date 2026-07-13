import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/providers/language-provider";
import { RouterProvider } from "@/components/providers/router-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LET'S SHINE — Brighter Day for Everyone",
  description:
    "LET'S SHINE est une organisation internationale engagée dans le développement du leadership, de l'employabilité, de l'entrepreneuriat et de l'autonomisation des jeunes africains.",
  keywords: [
    "Leadership Afrique",
    "Formation professionnelle Guinée",
    "Employabilité des jeunes",
    "Entrepreneuriat Afrique",
    "Développement personnel",
    "LET'S SHINE",
    "Formation en leadership",
    "Jeunesse africaine",
    "Boutique électronique Guinée",
  ],
  authors: [{ name: "LET'S SHINE" }],
  openGraph: {
    title: "LET'S SHINE — Brighter Day for Everyone",
    description:
      "Organisation internationale pour le leadership, l'employabilité et l'entrepreneuriat des jeunes africains.",
    siteName: "LET'S SHINE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LET'S SHINE",
    description: "Brighter Day for Everyone.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} antialiased bg-[#FFFFFF] text-slate-900 selection:bg-yellow-400 selection:text-slate-900`}
      >
        <LanguageProvider>
          <RouterProvider>
            {children}
            <Toaster />
            <SonnerToaster />
          </RouterProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
