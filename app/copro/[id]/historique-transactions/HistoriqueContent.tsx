import { getTransactionsByCompte } from "./data";
import Link from "next/link";

interface HistoriqueContentProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ compte?: string }>;
}

export default async function HistoriqueContent({
  params,
  searchParams,
}: HistoriqueContentProps) {
  // Résolution des promesses
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { id } = resolvedParams;
  const { compte } = resolvedSearchParams;

  console.log("ID de la copropriété :", id);
  console.log("Numéro de compte :", compte);

  if (!compte) {
    return (
      <div className="p-6 text-center text-gray-600">
        Numéro de compte manquant. <br />
        <strong>ID reçu :</strong> {id} <br />
        <strong>Compte reçu :</strong> {compte || "Aucun"}
      </div>
    );
  }

  const transactions = await getTransactionsByCompte(id, compte);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        Aucune transaction trouvée pour le compte {compte}.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Historique des transactions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Compte : <span className="font-medium">{compte}</span>
        </p>
        <Link
          href={`/copro/${id}/annexes`}
          className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Retour à la balance générale
        </Link>
      </div>

      {/* Tableau des transactions */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Libellé</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Débit</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Crédit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {new Date(transaction.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {transaction.libelle || "Aucun libellé"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                  {transaction.debit?.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) || "0,00 €"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                  {transaction.credit?.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) || "0,00 €"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}