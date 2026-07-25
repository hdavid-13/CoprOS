// app/documents/data.ts
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SyntheseCopropriete } from "@/types/copropriete";

// ✅ Définis ListCopro comme un tableau de SyntheseCopropriete
type ListCopro = SyntheseCopropriete[];

export async function getCoproprietesByUser(): Promise<ListCopro | null> {
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

  // 5. Récupère les copropriétés
  const { data: coproprietes, error: coproprietesError } = await supabase
    .from("coproprietes")
    .select("*")
    .in("id", coproprieteIds.map(id => `${id}::uuid`));

  if (coproprietesError || !coproprietes || coproprietes.length === 0) {
    console.error("Aucune copropriété trouvée");
    return null;
  }

  // ✅ Adapte les données pour correspondre à SyntheseCopropriete
  const adaptedCoproprietes: SyntheseCopropriete[] = coproprietes.map((copro) => ({
    copropriete_id: copro.id, // Mappe `id` vers `copropriete_id`
    nom: copro.nom || "", // Valeur par défaut si `nom` est manquant
    adresse: copro.adresse || "",
    code_postal: copro.code_postal || "",
    ville: copro.ville || "",
    date_creation: copro.date_creation || null,
    nb_lots_theorique: copro.nb_lots_theorique || null,
    syndic_nom: copro.syndic_nom || null,
    syndic_email: copro.syndic_email || null,
    syndic_telephone: copro.syndic_telephone || null,
    copropriete_created_at: copro.created_at || "",
    // Ajoute toutes les autres propriétés de SyntheseCopropriete avec des valeurs par défaut
    nb_lots_reel: copro.nb_lots_reel || 0,
    nb_lots_principaux: copro.nb_lots_principaux || 0,
    nb_lots_parking: copro.nb_lots_parking || 0,
    nb_lots_cave: copro.nb_lots_cave || 0,
    total_tantiemes: copro.total_tantiemes || 0,
    surface_totale_m2: copro.surface_totale_m2 || 0,
    nb_coproprietaires: copro.nb_coproprietaires || 0,
    nb_lots_occupes: copro.nb_lots_occupes || 0,
    budget_annee_courante: copro.budget_annee_courante || null,
    budget_montant_previsionnel: copro.budget_montant_previsionnel || 0,
    budget_montant_travaux: copro.budget_montant_travaux || 0,
    budget_statut: copro.budget_statut || null,
    nb_appels_total: copro.nb_appels_total || 0,
    nb_appels_en_cours: copro.nb_appels_en_cours || 0,
    montant_total_appele: copro.montant_total_appele || 0,
    montant_total_paye: copro.montant_total_paye || 0,
    montant_total_impaye: copro.montant_total_impaye || 0,
    taux_recouvrement_pct: copro.taux_recouvrement_pct || 0,
    nb_lots_en_impaye: copro.nb_lots_en_impaye || 0,
    nb_charges_total: copro.nb_charges_total || 0,
    montant_charges_ttc_total: copro.montant_charges_ttc_total || 0,
    montant_charges_payees: copro.montant_charges_payees || 0,
    montant_charges_en_attente: copro.montant_charges_en_attente || 0,
    nb_fournisseurs_actifs: copro.nb_fournisseurs_actifs || 0,
    nb_ag_total: copro.nb_ag_total || 0,
    derniere_ag_date: copro.derniere_ag_date || null,
    derniere_ag_type: copro.derniere_ag_type || null,
    derniere_ag_statut: copro.derniere_ag_statut || null,
    prochaine_ag_date: copro.prochaine_ag_date || null,
    nb_ag_annee_courante: copro.nb_ag_annee_courante || 0,
    nb_resolutions_total: copro.nb_resolutions_total || 0,
    nb_resolutions_adoptees: copro.nb_resolutions_adoptees || 0,
    nb_resolutions_rejetees: copro.nb_resolutions_rejetees || 0,
    nb_resolutions_en_attente: copro.nb_resolutions_en_attente || 0,
    nb_incidents_total: copro.nb_incidents_total || 0,
    nb_incidents_ouverts: copro.nb_incidents_ouverts || 0,
    nb_incidents_urgents: copro.nb_incidents_urgents || 0,
    nb_incidents_resolus: copro.nb_incidents_resolus || 0,
    dernier_incident_date: copro.dernier_incident_date || null,
    nb_documents_total: copro.nb_documents_total || 0,
    nb_documents_publics: copro.nb_documents_publics || 0,
    exercice_courant_annee: copro.exercice_courant_annee || null,
    exercice_courant_debut: copro.exercice_courant_debut || null,
    exercice_courant_fin: copro.exercice_courant_fin || null,
    exercice_est_cloture: copro.exercice_est_cloture || null,
    nb_exercices_total: copro.nb_exercices_total || 0,
    nb_ecritures_total: copro.nb_ecritures_total || 0,
    nb_ecritures_brouillon: copro.nb_ecritures_brouillon || 0,
    nb_ecritures_validees: copro.nb_ecritures_validees || 0,
    solde_debit_total: copro.solde_debit_total || 0,
    solde_credit_total: copro.solde_credit_total || 0,
  }));

  return adaptedCoproprietes;
}