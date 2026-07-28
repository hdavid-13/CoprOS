// app/copro/[id]/annexes/TotalCards.tsx
import { CompteInfo } from "./annexes-content";

export default function TotalCards({ infoCopro }: { infoCopro: CompteInfo[] }) {
  const totalTresorerie = infoCopro
    .filter((row) => row.numero_compte === "1031")
    .reduce((sum, row) => sum + row.solde, 0);

  const totalFondsTravaux = infoCopro
    .filter((row) => row.numero_compte === "102")
    .reduce((sum, row) => sum + row.solde, 0);

  const totalCompteBanque = infoCopro
    .filter((row) => row.numero_compte === "512")
    .reduce((sum, row) => sum + row.solde, 0);

  const totalBanqueAvecTresorerie = totalCompteBanque + totalTresorerie;
  const numeroCompteBanque = "00020998201"; // À remplir avec le numéro de compte bancaire

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-1">Compte en Banque</h2>
        <p className="text-xs text-gray-400 mb-2">Numéro de compte : {numeroCompteBanque || "[À compléter]"}</p>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Trésorerie : <span className={`font-semibold ${totalTresorerie >= 0 ? "text-green-600" : "text-red-600"}`}>
            {totalTresorerie.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
          </span></p>
          <p className="text-sm text-gray-600">Compte Banque : <span className={`font-semibold ${totalCompteBanque >= 0 ? "text-green-600" : "text-red-600"}`}>
            {totalCompteBanque.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
          </span></p>
        </div>
        <p className="text-xs text-gray-500 mt-2">Total :</p>
        <p className={`text-xl font-bold ${totalBanqueAvecTresorerie >= 0 ? "text-green-700" : "text-red-700"}`}>
          {totalBanqueAvecTresorerie.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
        </p>
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-1">Fonds de Travaux (Livret A)</h2>
        <p className="text-xs text-gray-400 mb-2">Numéro de compte : {numeroCompteBanque || "[À compléter]"}</p>
        <p className={`text-2xl font-bold ${totalFondsTravaux >= 0 ? "text-green-700" : "text-red-700"}`}>
          {totalFondsTravaux.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
        </p>
      </div>
    </div>
  );
}