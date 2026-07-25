// dashboard/coproprietaire.ts
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

// Interface pour le type de retour
export interface CoproprietaireDataResult {
  error: string | null;
  rows: any[]; // Remplace `any` par un type plus précis si possible
  user: User | null;
}

export async function getCoproprietaireData(): Promise<CoproprietaireDataResult> {
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

  if (profileError || !profile?.coproprietaire_id) {
    return {
      error: profileError?.message || "Aucun coproprietaire_id trouvé pour ce user",
      rows: [],
      user: null,
    };
  }

  // 2. Interroger la vue de l'historique financier
  const { data, error } = await supabase
    .from("v_historique_comptes_coproprietaires")
    .select("*")
    .eq("coproprietaire_id", profile.coproprietaire_id)
    .order("date_comptable", { ascending: true })
    .order("ligne_id", { ascending: true });

  if (error) {
    return { error: error.message, rows: [], user };
  }

  return { error: null, rows: data ?? [], user };
}