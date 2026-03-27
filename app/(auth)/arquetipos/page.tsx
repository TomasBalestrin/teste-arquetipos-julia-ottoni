import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/actions/members";
import ArchetypeDetail from "@/components/members/ArchetypeDetail";

export default async function ArquetiposPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const profileRes = await getUserProfile(user.id);
  const top3 = profileRes.data?.top3;

  if (!top3 || top3.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-2xl font-bold text-text">
          Nenhum resultado encontrado
        </h1>
        <p className="mt-2 font-body text-[15px] text-text-soft">
          Complete o teste para descobrir seus arquétipos.
        </p>
        <Link
          href="/quiz"
          className="mt-6 rounded-pill bg-primary-dark px-6 py-3 font-body text-[15px] font-semibold text-white"
        >
          Fazer o teste
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-text">
        Meus Arquétipos
      </h1>
      <p className="mt-2 font-body text-[15px] text-text-soft">
        Conheça em detalhes os arquétipos que guiam sua personalidade.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {top3.map((entry) => (
          <ArchetypeDetail key={entry.rank} entry={entry} />
        ))}
      </div>
    </div>
  );
}
