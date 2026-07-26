// app/copro/[id]/annexes/page.tsx
import { Suspense } from "react";
import AnnexesContent from "./annexes-content";

export default function AnnexesPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="p-6 text-center">Chargement des données...</div>}>
      <AnnexesContent params={params} />
    </Suspense>
  );
}