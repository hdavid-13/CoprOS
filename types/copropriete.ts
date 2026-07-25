// types/copropriete.ts

export type SyntheseCopropriete = {
  // Infos de base
  copropriete_id: string;
  nom: string;
  adresse: string;
  code_postal: string;
  ville: string;
  date_creation: string | null;
  nb_lots_theorique: number | null;
  syndic_nom: string | null;
  syndic_email: string | null;
  syndic_telephone: string | null;
  copropriete_created_at: string;

  // Lots
  nb_lots_reel: number;
  nb_lots_principaux: number;
  nb_lots_parking: number;
  nb_lots_cave: number;
  total_tantiemes: number;
  surface_totale_m2: number;

  // Copropriétaires
  nb_coproprietaires: number;
  nb_lots_occupes: number;

  // Budget
  budget_annee_courante: number | null;
  budget_montant_previsionnel: number;
  budget_montant_travaux: number;
  budget_statut: string | null;

  // Appels de charges
  nb_appels_total: number;
  nb_appels_en_cours: number;
  montant_total_appele: number;
  montant_total_paye: number;
  montant_total_impaye: number;
  taux_recouvrement_pct: number;
  nb_lots_en_impaye: number;

  // Charges
  nb_charges_total: number;
  montant_charges_ttc_total: number;
  montant_charges_payees: number;
  montant_charges_en_attente: number;
  nb_fournisseurs_actifs: number;

  // AG
  nb_ag_total: number;
  derniere_ag_date: string | null;
  derniere_ag_type: string | null;
  derniere_ag_statut: string | null;
  prochaine_ag_date: string | null;
  nb_ag_annee_courante: number;

  // Résolutions
  nb_resolutions_total: number;
  nb_resolutions_adoptees: number;
  nb_resolutions_rejetees: number;
  nb_resolutions_en_attente: number;

  // Incidents
  nb_incidents_total: number;
  nb_incidents_ouverts: number;
  nb_incidents_urgents: number;
  nb_incidents_resolus: number;
  dernier_incident_date: string | null;

  // Documents
  nb_documents_total: number;
  nb_documents_publics: number;

  // Exercice comptable
  exercice_courant_annee: number | null;
  exercice_courant_debut: string | null;
  exercice_courant_fin: string | null;
  exercice_est_cloture: boolean | null;
  nb_exercices_total: number;

  // Comptabilité
  nb_ecritures_total: number;
  nb_ecritures_brouillon: number;
  nb_ecritures_validees: number;
  solde_debit_total: number;
  solde_credit_total: number;
};
