// app/copro/[id]/annexes/InteractiveTable.tsx
"use client";

import { useRouter } from "next/navigation";

export function InteractiveTable({ infoCopro, id }: { infoCopro: any[]; id: string }) {
    const router = useRouter();

    const handleRowClick = (compteId: string) => {
        if (!compteId) {
            console.error("compteId est manquant ou invalide :", compteId);
            return;
        }
        console.log("Navigation vers :", `/copro/${id}/historique-transactions?compte=${compteId}`);
        router.push(`/copro/${id}/historique-transactions?compte=${encodeURIComponent(compteId)}`);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Compte</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intitulé</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Débit</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Crédit</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Solde</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Mouvements</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {infoCopro.map((row) => {
                        // Vérifiez que row.numero_compte existe
                        if (!row.numero_compte) {
                            console.error("Ligne sans numero_compte :", row);
                            return null;
                        }
                        return (
                            <tr
                                key={`${row.copropriete_id}-${row.numero_compte}`}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleRowClick(row.numero_compte)}
                            >
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.numero_compte}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.intitule}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{row.type_compte}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {row.total_debit.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {row.total_credit.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-right ${
                                    row.solde >= 0 ? "text-green-700" : "text-red-700"
                                }`}>
                                    {row.solde.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right hidden lg:table-cell">
                                    {row.nb_mouvements}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}