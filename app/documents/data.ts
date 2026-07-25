// app/documents/data.ts
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ListCopro } from "@/types/copropriete";

export async function getCoproprietesByUser(): Promise<ListCopro | null> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/sign-in");
  }

  // 1. Récupère coproprietaire_id depuis profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("coproprietaire_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.coproprietaire_id) {
    console.error("Profil ou coproprietaire_id introuvable :", profileError?.message);
    return null;
  }

  // 2. Récupère TOUS les lots du copropriétaire via la table `proprietes`
  const { data: proprietes, error: proprietesError } = await supabase
    .from("proprietes")
    .select("lot_id")
    .eq("coproprietaire_id", profile.coproprietaire_id)
    .eq("est_actif", true); // Filtre les propriétés actives

  if (proprietesError || !proprietes || proprietes.length === 0) {
    console.error("Aucun lot trouvé pour ce copropriétaire");
    return null;
  }

  // 3. Récupère les copropriete_id des lots trouvés
  const lotIds = proprietes.map((p) => p.lot_id);
  const { data: lots, error: lotsError } = await supabase
    .from("lots")
    .select("copropriete_id")
    .in("id", lotIds);

  if (lotsError || !lots || lots.length === 0) {
    console.error("Aucune copropriété trouvée pour ces lots");
    return null;
  }

  // 4. Extrait les copropriete_id uniques (au cas où un copropriétaire a plusieurs lots dans la même copropriété)
  const coproprieteIds = [...new Set(lots.map((l) => l.copropriete_id))];
  console.log("IDs des coproprietes: ", coproprieteIds);

    const { data: coproprietes, error: coproprietesError } = await supabase
    .from("coproprietes")
    .select("*")
    .in("id", coproprieteIds.map(id => `${id}::uuid`)); // Cast en uuid

  if (coproprietesError || !coproprietes || coproprietes.length === 0) {
    console.error("Aucune copropriété trouvée");
    return null;
  }

  console.log("Résultat de la requête coproprietes:", coproprietes);

  return coproprietes as ListCopro[];}