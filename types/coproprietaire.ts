// types/coproprietaire.ts
import { User } from "@supabase/supabase-js";

export interface CoproprietaireDataResult {
  error: string | null;
  rows: any[]; // Remplace `any` par un type plus précis si possible
  user: User;
}