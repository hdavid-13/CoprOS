import { Suspense } from "react";
import HistoriqueContent from "./HistoriqueContent";

// Définissez explicitement le type des props
interface HistoriqueTransactionsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ compte?: string }>;
}

export default function HistoriqueTransactionsPage({
  params,
  searchParams,
}: HistoriqueTransactionsPageProps) {
  return (
    <Suspense fallback={<div className="p-6 text-center">Chargement des transactions...</div>}>
      <HistoriqueContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}