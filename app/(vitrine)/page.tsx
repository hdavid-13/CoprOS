import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
import { AuthWrapper } from "./auth-wrapper"; // Import du wrapper serveur

export default function Home() {
  return (
    <>
      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full">
        <Hero />
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h2 className="font-medium text-xl mb-4">Prochaines étapes</h2>
          {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div>
    </>
  );
}