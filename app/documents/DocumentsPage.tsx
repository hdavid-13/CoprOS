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
      <h1 className="text-2xl font-bold">Mes Documents</h1>
      <p className="mt-1 text-sm text-gray-500">
        Cette page est dédiée au suivi de la documentation de vos copropriétés.
      </p>

      <div className="grid md:grid-cols-3 lg:grid-cols-1">
        {coproprietes.map((copropriete) => {
          // Coordonnées pour 16 Impasse de la Barnière, 13010 Marseille
          const latitude = 43.3041;
          const longitude = 5.3598;

          return (
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
                  <div className="flex items-center justify-center h-62 w-full bg-gray-50 rounded-lg mb-3">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&marker=${latitude},${longitude}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
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
          );
        })}
      </div>
    </div>
  );
}