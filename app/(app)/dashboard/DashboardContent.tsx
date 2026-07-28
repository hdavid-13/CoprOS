import { getCoproprietaireData } from "./coproprietaire";

export default async function DashboardContent() {
  const { error, rows, user } = await getCoproprietaireData();

  if (error) {
    return <div className="p-4 text-red-500">Erreur : {error}</div>;
  }

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Historique des comptes</h1>

      <p className="mb-4 text-gray-600">
        Connecté en tant que : <strong>{user?.email}</strong>
      </p>

      {rows.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded text-gray-500">
          Aucune transaction ou écriture comptable trouvée.
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Libellé</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">Charges (-)</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">Paiements (+)</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">Solde</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row: any) => (
                <tr key={row.ligne_id}>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {new Date(row.date_comptable).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {row.description}
                  </td>
                  <td className="px-4 py-2 text-sm text-right text-red-600">
                    {row.charges_appelees > 0 ? `${row.charges_appelees.toFixed(2)} €` : "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-right text-green-600">
                    {row.paiements_recus > 0 ? `${row.paiements_recus.toFixed(2)} €` : "-"}
                  </td>
                  <td className={`px-4 py-2 text-sm text-right font-semibold ${row.solde_vue_coproprietaire >= 0 ? "text-green-700" : "text-red-700"}`}>
                    {row.solde_vue_coproprietaire.toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}