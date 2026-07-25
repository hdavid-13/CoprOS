// app/copro/[id]/annexes/data.ts
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CompteInfo } from "@/types";

export async function getAnnexesByCoproId(id: string): Promise<CompteInfo[] | null> {
    const supabase = await createClient();

    // 1. Vérifie que la copropriété existe
    const { data: copropriete, error: coproprieteError } = await supabase
        .from("copropriete")
        .select("*")
        .eq("id", id)
        .single();

    if (coproprieteError || !copropriete) {
        console.error("Copropriété introuvable :", coproprieteError?.message);
        return null;
    }

    // 2. Récupère les données de la vue vue_balance_generale
    const { data: infoCoproData, error: infoCoproError } = await supabase
        .from("vue_balance_generale")
        .select("*")
        .eq("copropriete_id", id)
        .or(`total_debit.neq.0,total_credit.neq.0`);

    if (infoCoproError || !infoCoproData) {
        console.error("Infos de la copropriété introuvables :", infoCoproError?.message);
        return null;
    }

    // 3. Adapte les données pour correspondre à CompteInfo
    const adaptedInfoCopro: CompteInfo[] = infoCoproData.map((item) => ({
        numero_compte: item.numero_compte,
        solde: item.solde || (item.total_credit - item.total_debit),
        total_debit: item.total_debit, // Inclure total_debit
        total_credit: item.total_credit, // Inclure total_credit
    }));

    return adaptedInfoCopro;
}