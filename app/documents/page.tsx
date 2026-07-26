// app/copro/page.tsx
import { Suspense } from "react";
import { getCoproprietesByUser } from "./data";
import CoproClientPage from "./DocumentsPage";

export default async function CoproPage() {
  return (
    <Suspense fallback={<div className="p-6">Chargement des copropriétés...</div>}>
      <CoproContent />
    </Suspense>
  );
}

// Composant séparé pour gérer le chargement des données
async function CoproContent() {
  const coproprietes = await getCoproprietesByUser();

  if (!coproprietes || coproprietes.length === 0) {
    return <div className="p-6 text-red-500">Aucune copropriété trouvée pour cet utilisateur.</div>;
  }

  return <CoproClientPage coproprietes={coproprietes} />;
}