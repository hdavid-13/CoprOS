"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Evenement = {
  id: string;
  titre: string;
  description: string;
  date: Date;
  coproprieteId: string;
  coproprieteNom: string;
  statut: "à venir" | "en cours" | "terminé";
  type: "AG" | "Réunion" | "Travaux" | "Paiement" | "Autre";
};

export default function CalendrierPage() {
  const [evenements, setEvenements] = useState<Evenement[]>([
    {
      id: "1",
      titre: "Assemblée Générale Annuelle 2026 - Résidence Les Tilleuls",
      description: "Réunion pour valider les comptes de l'année 2025 et voter le budget prévisionnel pour 2027.",
      date: new Date("2026-08-15"),
      coproprieteId: "copro-1",
      coproprieteNom: "Résidence Les Tilleuls",
      statut: "à venir",
      type: "AG",
    },
    {
      id: "2",
      titre: "Paiement des charges trimestrielles",
      description: "Échéance pour le paiement du 3ème trimestre 2026.",
      date: new Date("2026-07-20"),
      coproprieteId: "copro-1",
      coproprieteNom: "Résidence Les Tilleuls",
      statut: "en cours",
      type: "Paiement",
    },
    {
      id: "3",
      titre: "Réunion du conseil syndical",
      description: "Discussion sur les travaux prévus pour 2027.",
      date: new Date("2026-07-10"),
      coproprieteId: "copro-2",
      coproprieteNom: "Immeuble Le Central",
      statut: "terminé",
      type: "Réunion",
    },
  ]);

  const [filtreStatut, setFiltreStatut] = useState<string | null>(null);
  const evenementsFiltres = filtreStatut
    ? evenements.filter((e) => e.statut === filtreStatut)
    : evenements;

  const evenementsTries = [...evenementsFiltres].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const formaterDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statutColors = {
    "à venir": "bg-blue-100 text-blue-800",
    "en cours": "bg-yellow-100 text-yellow-800",
    terminé: "bg-green-100 text-green-800",
  };

  const typeColors = {
    AG: "bg-purple-100 text-purple-800",
    Réunion: "bg-indigo-100 text-indigo-800",
    Travaux: "bg-red-100 text-red-800",
    Paiement: "bg-emerald-100 text-emerald-800",
    Autre: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-full mx-auto">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Calendrier</h1>
            <p className="mt-1 text-sm text-gray-500">
              Suivez les dates importantes de vos copropriétés.
            </p>
          </div>
          {/* <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un événement
          </Button> */}
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["Tous", "à venir", "en cours", "terminé"] as const).map((statut) => (
            <Button
              key={statut}
              variant={filtreStatut === statut || (statut === "Tous" && filtreStatut === null) ? "default" : "outline"}
              onClick={() => setFiltreStatut(statut === "Tous" ? null : statut)}
              className="text-sm"
            >
              {statut}
            </Button>
          ))}
        </div>

        {/* Liste des événements en grille responsive */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {evenementsTries.length > 0 ? (
            evenementsTries.map((evenement) => (
              <Card
                key={evenement.id}
                className="hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <CardHeader className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-semibold break-words">
                        {evenement.titre}
                      </CardTitle>
                      <Badge className={statutColors[evenement.statut] + " shrink-0"}>
                        {evenement.statut}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={typeColors[evenement.type]}>
                        {evenement.type}
                      </Badge>
                      <p className="text-sm text-gray-500 truncate">
                        {evenement.coproprieteNom}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 mb-4 break-words">
                    {evenement.description}
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm font-medium text-gray-800">
                      {formaterDate(evenement.date)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="text-center py-12">
                <p className="text-gray-500">Aucun événement trouvé.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}