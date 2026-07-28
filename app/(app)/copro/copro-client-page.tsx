// app/copro/copro-client-page.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { SyntheseCopropriete } from "@/types/copropriete";

export default function CoproClientPage({ coproprietes }: { coproprietes: SyntheseCopropriete[] }) {
  const router = useRouter();

  const handleCardClick = (coproprieteId: string) => {
    router.push(`/copro/${coproprieteId}/annexes`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mes Copropriétés</h1>
      <p className="mt-1 text-sm text-gray-500">
        Cette page est dédiée au suivi de la comptabilité de vos copropriétés.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coproprietes.map((copropriete) => (
          <div
            key={copropriete.copropriete_id}
            onClick={() => handleCardClick(copropriete.copropriete_id)}
            className="block cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="truncate">{copropriete.syndic_nom}</CardTitle>
                <CardDescription>
                  {copropriete.adresse}, {copropriete.code_postal} {copropriete.ville}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col">
                <div className="flex items-center justify-center h-32 w-full bg-gray-50 rounded-lg mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nombre de lots</span>
                    <span className="font-medium">{copropriete.nb_lots_reel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Copropriétaires</span>
                    <span className="font-medium">{copropriete.nb_coproprietaires}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Incidents ouverts</span>
                    <span className="font-medium">{copropriete.nb_incidents_ouverts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}