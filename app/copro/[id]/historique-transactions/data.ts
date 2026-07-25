// app/copro/[id]/historique-transactions/data.ts
import { createClient } from "@/lib/supabase/server";

export async function getTransactionsByCompte(coproprieteId: string, numeroCompte: string) {
    const supabase = await createClient();

    // 1. Récupérez d'abord l'ID du compte dans plan_comptable
    const { data: compteData, error: compteError } = await supabase
        .from("plan_comptable")
        .select("id")
        .eq("copropriete_id", coproprieteId)
        .eq("numero_compte", numeroCompte)
        .single(); // On suppose qu'il y a un seul compte avec ce numéro

    if (compteError || !compteData) {
        console.error("Erreur : Compte non trouvé pour le numéro", numeroCompte, compteError);
        return [];
    }

    const compteId = compteData.id;

    // 2. Récupérez les lignes d'écritures pour ce compte_id
    const { data, error } = await supabase
        .from("lignes_ecritures")
        .select("*")
        .eq("compte_id", compteId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Erreur Supabase :", error);
        return [];
    }

    console.log("Transactions récupérées :", data);
    return data;
}