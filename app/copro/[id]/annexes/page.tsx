// app/copro/[id]/annexes/page.tsx
import { Suspense } from "react";
import { getAnnexesByCoproId } from "./data";
import { createClient } from "@/lib/supabase/server";
import AnnexesContent from "./annexes-content";

export default async function AnnexesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="p-6 text-center">Chargement des données...</div>}>
      <AnnexesContent id={id} />
    </Suspense>
  );
}