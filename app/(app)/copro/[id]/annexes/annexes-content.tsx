// app/copro/[id]/annexes/annexes-content.tsx
import { Suspense } from "react";
import { getAnnexesByCoproId } from "./data";
import CoproInfo from "./CoproInfo";
import TotalCards from "./TotalCards";
import { InteractiveTable } from "./InteractiveTable";

export interface CompteInfo {
  numero_compte: string;
  solde: number;
}

export default async function AnnexesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Résout la Promise ici, à l'intérieur de Suspense
  const infoCopro: CompteInfo[] | null = await getAnnexesByCoproId(id);

  if (!infoCopro || infoCopro.length === 0) {
    return <div className="p-6 text-center text-gray-600">Aucune donnée disponible pour cette copropriété.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Suspense fallback={<div>Chargement des informations de la copropriété...</div>}>
        <CoproInfo id={id} />
      </Suspense>

      <Suspense fallback={<div>Chargement des totaux...</div>}>
        <TotalCards infoCopro={infoCopro} />
      </Suspense>

      <Suspense fallback={<div>Chargement du tableau...</div>}>
        <InteractiveTable infoCopro={infoCopro} id={id} />
      </Suspense>
    </div>
  );
}