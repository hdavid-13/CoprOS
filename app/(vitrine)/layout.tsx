// app/(vitrine)/layout.tsx

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { AuthWrapper } from "./auth-wrapper"; 
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LayoutDashboard, BookOpen, Eye, Calendar, Users } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CoprOS - Gestion de Copropriétés",
  description: "Une solution moderne pour gérer vos copropriétés avec Next.js et Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${geistSans.className} antialiased min-h-screen flex flex-col items-center`}>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>SymbiOS</Link>
              <Link
                href={"/dashboard"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Mes Copros</span>
              </Link>
              <Link
                href={"/docs"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Documentation"
              >
                <BookOpen size={18} />
                <span className="hidden sm:inline">Documentation</span>
              </Link>
              <Link
                href={"/vision"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Notre Vision"
              >
                <Eye size={18} />
                <span className="hidden sm:inline">Vision</span>
              </Link>
              <Link
                href={"/roadmap"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Roadmap"
              >
                <Calendar size={18} />
                <span className="hidden sm:inline">Roadmap</span>
              </Link>
              <Link
                href={"/contribuer"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Participer"
              >
                <Users size={18} />
                <span className="hidden sm:inline">Participer</span>
              </Link>
            </div>
            <div>
              <AuthWrapper />
              {/* Ce div sera rempli par les composants client dans page.tsx */}
            </div>
          </div>
        </nav>

        {children}

        <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <div className="flex gap-6">
            <Link
              href={"/docs"}
              className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
            >
              <BookOpen size={14} />
              Documentation
            </Link>
            <Link
              href={"/vision"}
              className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Eye size={14} />
              Notre Vision
            </Link>
            <Link
              href={"/roadmap"}
              className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Calendar size={14} />
              Roadmap
            </Link>
            <Link
              href={"/contribuer"}
              className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Users size={14} />
              Participer
            </Link>
          </div>
          <div>
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </main>
  );
}