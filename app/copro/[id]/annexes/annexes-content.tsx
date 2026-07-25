// app/copro/[id]/annexes/annexes-content.tsx
import { getAnnexesByCoproId } from "./data";
import { createClient } from "@/lib/supabase/server";
import { InteractiveTable } from "./InteractiveTable"; // Import du Client Component

export default async function AnnexesContent({ id }: { id: string }) {
    const infoCopro = await getAnnexesByCoproId(id);

    if (!infoCopro || infoCopro.length === 0) {
        return <div className="p-6 text-center text-gray-600">Aucune donnée disponible pour cette copropriété.</div>;
    }

    // Calcul des totaux pour les cartes
    const totalTresorerie = infoCopro
        .filter(row => row.numero_compte === "1031")
        .reduce((sum, row) => sum + row.solde, 0);

    const totalFondsTravaux = infoCopro
        .filter(row => row.numero_compte === "102")
        .reduce((sum, row) => sum + row.solde, 0);

    const totalCompteBanque = infoCopro
        .filter(row => row.numero_compte === "512")
        .reduce((sum, row) => sum + row.solde, 0);

    const supabase = await createClient();

    const { data: copropriete, error: coproprieteError } = await supabase
        .from("copropriete")
        .select("*")
        .eq("id", id)
        .single();

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* En-tête */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Balance Générale</h1>
                <p className="mt-1 text-sm text-gray-500">Nom Syndic: {copropriete?.syndic_nom || "Non spécifié"}</p>
                <p className="mt-1 text-sm text-gray-500">Email: {copropriete?.syndic_email || "Non spécifié"}</p>
            </div>

            {/* Cartes de synthèse */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-sm font-medium text-gray-500 mb-2">Trésorerie</h2>
                    <p className={`text-2xl font-bold ${totalTresorerie >= 0 ? "text-green-700" : "text-red-700"}`}>
                        {totalTresorerie.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                    </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-sm font-medium text-gray-500 mb-2">Fonds de Travaux</h2>
                    <p className={`text-2xl font-bold ${totalFondsTravaux >= 0 ? "text-green-700" : "text-red-700"}`}>
                        {totalFondsTravaux.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                    </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-sm font-medium text-gray-500 mb-2">Compte en Banque</h2>
                    <p className={`text-2xl font-bold ${totalCompteBanque >= 0 ? "text-green-700" : "text-red-700"}`}>
                        {totalCompteBanque.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                    </p>
                </div>
            </div>

            {/* Tableau des détails */}
            <InteractiveTable infoCopro={infoCopro} id={id} />
        </div>
    );
}