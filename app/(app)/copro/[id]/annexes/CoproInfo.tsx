// app/copro/[id]/annexes/CoproInfo.tsx
import { createClient } from "@/lib/supabase/server";

export default async function CoproInfo({ id }: { id: string }) {
  const supabase = await createClient();
  const { data: copropriete } = await supabase
    .from("copropriete")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Balance Générale</h1>
      <p className="mt-1 text-sm text-gray-500">
        Nom Syndic: {copropriete?.syndic_nom || "Non spécifié"}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Email: {copropriete?.syndic_email || "Non spécifié"}
      </p>
    </div>
  );
}