import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCoproprietaireData } from "@/types/coproprietaire";


export async function getCoproprietaireData(
  id: string
): Promise<getCoproprietaireData | null> {
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
    .from("profiles")             // ou le nom de ta table de liaison
    .select("coproprietaire_id")
    .eq("id", user.id)           // id = UID Supabase
    .single();

  if (profileError) {
    console.error("Erreur profil:", profileError);
    return null;
  }

  if (!profile?.coproprietaire_id) {
    console.error("Aucun coproprietaire_id pour ce user");
    return null;
  }

  // 2. Interroger la nouvelle vue de l'historique financier et trier par date
  const { data, error } = await supabase
    .from("v_historique_comptes_coproprietaires")
    .select("*")
    .eq("coproprietaire_id", profile.coproprietaire_id)
    .order("date_comptable", { ascending: true })
    .order("ligne_id", { ascending: true }); // Deuxième tri pour garantir la stabilité si même date

  if (error) {
    console.error("Erreur historique:", error);
    return { error: error.message, rows: [], user };
  }

  return { error: null, rows: data ?? [], user };
}
