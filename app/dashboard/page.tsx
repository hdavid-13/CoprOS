import { Suspense } from "react";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Chargement du tableau de bord...</div>}>
      <DashboardContent />
    </Suspense>
  );
}