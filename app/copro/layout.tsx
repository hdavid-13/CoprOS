import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { LayoutDashboard, Building2, FileText, Calendar, Vote } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>CoprOS</Link>

              {/* Icône Dashboard */}
              <Link
                href={"/dashboard"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              {/* Icône Copro */}
              <Link
                href={"/copro"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Copropriétés"
              >
                <Building2 size={18} />
                <span className="hidden sm:inline">Copropriétés</span>
              </Link>
              <Link
                href={"/documents"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Documents"
              >
                <FileText size={18} />
                <span className="hidden sm:inline">Documents</span>
              </Link>
              <Link
                href={"/votes"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Votes"
              >
                <Vote size={18} />
                <span className="hidden sm:inline">Votes</span>
              </Link>
              <Link
                href={"/calendrier"}
                className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                title="Calendrier"
              >
                <Calendar size={18} />
                <span className="hidden sm:inline">Calendrier</span>
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
          {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              hdavid
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
