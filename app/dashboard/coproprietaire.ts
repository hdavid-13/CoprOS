// dashboard/coproprietaire.ts
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js"; // Import du type User de Supabase

// Interface pour le type de retour
interface CoproprietaireDataResult {
  error: string | null;
  rows: any[]; // Remplace `any` par le type de tes données si possible
  user: User;
}

export async function getCoproprietaireData(
  id: string
): Promise<CoproprietaireDataResult | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in");
  }

  // 1. Récupérer le profil du user pour trouver coproprietaire_id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("coproprietaire_id")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Erreur profil:", profileError);
    return null;
  }

  if (!profile?.coproprietaire_id) {
    console.error("Aucun coproprietaire_id pour ce user");
    return null;
  }

  // 2. Interroger la vue de l'historique financier
  const { data, error } = await supabase
    .from("v_historique_comptes_coproprietaires")
    .select("*")
    .eq("coproprietaire_id", profile.coproprietaire_id)
    .order("date_comptable", { ascending: true })
    .order("ligne_id", { ascending: true });

  if (error) {
    console.error("Erreur historique:", error);
    return { error: error.message, rows: [], user };
  }

  return { error: null, rows: data ?? [], user };
}