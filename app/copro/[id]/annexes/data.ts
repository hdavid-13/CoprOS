import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { infoCopro } from "@/types";

export async function getAnnexesByCoproId(id: string): Promise<infoCopro | null> {
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

    const { data: infoCopro, error: infoCoproError } = await supabase
        .from("vue_balance_generale")
        .select("*")
        .eq("copropriete_id", id)
        .or(`total_debit.neq.0,total_credit.neq.0`)

    if (infoCoproError || !infoCopro) {
        console.error("Infos de la copropriété introuvables :", infoCoproError?.message);
        return null;
    }

    return infoCopro as infoCopro;
}
