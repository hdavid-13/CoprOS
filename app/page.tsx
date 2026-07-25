import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { LayoutDashboard, Building2, FileText, Calendar, Vote, BookOpen, Eye, Roadmap, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>CoproOS</Link>
              {/* Icône Dashboard */}
              <Link
                href={"/dashboard"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Mes Copros</span>
              </Link>

              {/* Nouveaux liens dans la barre de navigation */}
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
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>

        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Prochaines étapes</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div>

        {/* Pied de page avec liens supplémentaires */}
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
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}