// Ce fichier est un Server Component (pas de "use client")
import { AuthButton } from "@/components/auth-button"; // Import de la librairie
import { createClient } from "@/lib/supabase/server";

export async function AuthWrapper() {
  // Initialisez le client Supabase côté serveur
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Passez les données nécessaires à AuthButton (si nécessaire)
  // Si AuthButton ne nécessite pas de props, vous pouvez simplement le rendre tel quel
  return <AuthButton />;
}