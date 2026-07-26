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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Trésorerie</h2>
        <p className={`text-2xl font-bold ${totalTresorerie >= 0 ? "text-green-700" : "text-red-700"}`}>
          {totalTresorerie.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
        </p>
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Fonds de Travaux</h2>
        <p className={`text-2xl font-bold ${totalFondsTravaux >= 0 ? "text-green-700" : "text-red-700"}`}>
          {totalFondsTravaux.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
        </p>
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Compte en Banque</h2>
        <p className={`text-2xl font-bold ${totalCompteBanque >= 0 ? "text-green-700" : "text-red-700"}`}>
          {totalCompteBanque.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
        </p>
      </div>
    </div>
  );
}