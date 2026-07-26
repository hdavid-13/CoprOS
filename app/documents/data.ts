// app/documents/data.ts
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SyntheseCopropriete } from "@/types/copropriete"; // ✅ Utilise SyntheseCopropriete

export async function getCoproprietesByUser(): Promise<SyntheseCopropriete[] | null> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/sign-in");
  }

  // 1. Récupère coproprietaire_id depuis profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("coproprietaire_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.coproprietaire_id) {
    console.error("Profil ou coproprietaire_id introuvable :", profileError?.message);
    return null;
  }

  // 2. Récupère TOUS les lots du copropriétaire
  const { data: proprietes, error: proprietesError } = await supabase
    .from("proprietes")
    .select("lot_id")
    .eq("coproprietaire_id", profile.coproprietaire_id)
    .eq("est_actif", true);

  if (proprietesError || !proprietes || proprietes.length === 0) {
    console.error("Aucun lot trouvé pour ce copropriétaire");
    return null;
  }

  // 3. Récupère les copropriete_id des lots
  const lotIds = proprietes.map((p) => p.lot_id);
  const { data: lots, error: lotsError } = await supabase
    .from("lots")
    .select("copropriete_id")
    .in("id", lotIds);

  if (lotsError || !lots || lots.length === 0) {
    console.error("Aucune copropriété trouvée pour ces lots");
    return null;
  }

  // 4. Extrait les copropriete_id uniques
  const coproprieteIds = [...new Set(lots.map((l) => l.copropriete_id))];

  // 5. Récupère les données des copropriétés
  const { data, error } = await supabase
    .from("vue_synthese_copropriete")
    .select("*")
    .in("copropriete_id", coproprieteIds)
    .order("nom", { ascending: true });

  if (error) {
    console.error("Erreur récupération copropriétés:", error);
    return null;
  }

  // 6. Adapte les données pour correspondre à SyntheseCopropriete
  const adaptedData: SyntheseCopropriete[] = data.map((item) => ({
    copropriete_id: item.copropriete_id,
    nom: item.nom,
    adresse: item.adresse,
    code_postal: item.code_postal,
    ville: item.ville,
    date_creation: item.date_creation || null,
    nb_lots_theorique: item.nb_lots_theorique || null,
    syndic_nom: item.syndic_nom || null,
    syndic_email: item.syndic_email || null,
    syndic_telephone: item.syndic_telephone || null,
    copropriete_created_at: item.copropriete_created_at,
    // Ajoute toutes les autres propriétés de SyntheseCopropriete
    nb_lots_reel: item.nb_lots_reel || 0,
    nb_lots_principaux: item.nb_lots_principaux || 0,
    nb_lots_parking: item.nb_lots_parking || 0,
    nb_lots_cave: item.nb_lots_cave || 0,
    total_tantiemes: item.total_tantiemes || 0,
    surface_totale_m2: item.surface_totale_m2 || 0,
    nb_coproprietaires: item.nb_coproprietaires || 0,
    nb_lots_occupes: item.nb_lots_occupes || 0,
    budget_annee_courante: item.budget_annee_courante || null,
    budget_montant_previsionnel: item.budget_montant_previsionnel || 0,
    budget_montant_travaux: item.budget_montant_travaux || 0,
    budget_statut: item.budget_statut || null,
    nb_appels_total: item.nb_appels_total || 0,
    nb_appels_en_cours: item.nb_appels_en_cours || 0,
    montant_total_appele: item.montant_total_appele || 0,
    montant_total_paye: item.montant_total_paye || 0,
    montant_total_impaye: item.montant_total_impaye || 0,
    taux_recouvrement_pct: item.taux_recouvrement_pct || 0,
    nb_lots_en_impaye: item.nb_lots_en_impaye || 0,
    nb_charges_total: item.nb_charges_total || 0,
    montant_charges_ttc_total: item.montant_charges_ttc_total || 0,
    montant_charges_payees: item.montant_charges_payees || 0,
    montant_charges_en_attente: item.montant_charges_en_attente || 0,
    nb_fournisseurs_actifs: item.nb_fournisseurs_actifs || 0,
    nb_ag_total: item.nb_ag_total || 0,
    derniere_ag_date: item.derniere_ag_date || null,
    derniere_ag_type: item.derniere_ag_type || null,
    derniere_ag_statut: item.derniere_ag_statut || null,
    prochaine_ag_date: item.prochaine_ag_date || null,
    nb_ag_annee_courante: item.nb_ag_annee_courante || 0,
    nb_resolutions_total: item.nb_resolutions_total || 0,
    nb_resolutions_adoptees: item.nb_resolutions_adoptees || 0,
    nb_resolutions_rejetees: item.nb_resolutions_rejetees || 0,
    nb_resolutions_en_attente: item.nb_resolutions_en_attente || 0,
    nb_incidents_total: item.nb_incidents_total || 0,
    nb_incidents_ouverts: item.nb_incidents_ouverts || 0,
    nb_incidents_urgents: item.nb_incidents_urgents || 0,
    nb_incidents_resolus: item.nb_incidents_resolus || 0,
    dernier_incident_date: item.dernier_incident_date || null,
    nb_documents_total: item.nb_documents_total || 0,
    nb_documents_publics: item.nb_documents_publics || 0,
    exercice_courant_annee: item.exercice_courant_annee || null,
    exercice_courant_debut: item.exercice_courant_debut || null,
    exercice_courant_fin: item.exercice_courant_fin || null,
    exercice_est_cloture: item.exercice_est_cloture || null,
    nb_exercices_total: item.nb_exercices_total || 0,
    nb_ecritures_total: item.nb_ecritures_total || 0,
    nb_ecritures_brouillon: item.nb_ecritures_brouillon || 0,
    nb_ecritures_validees: item.nb_ecritures_validees || 0,
    solde_debit_total: item.solde_debit_total || 0,
    solde_credit_total: item.solde_credit_total || 0,
  }));

  return adaptedData;
}