import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile, getModules } from "@/actions/members";
import { getArchetypeName } from "@/lib/archetypes/archetypes";
import MetricCard from "@/components/members/MetricCard";
import ModuleCarousel from "@/components/members/ModuleCarousel";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [profileRes, modulesRes] = await Promise.all([
    getUserProfile(user.id),
    getModules(),
  ]);

  const profile = profileRes.data;
  const modules = modulesRes.data ?? [];
  const top3 = profile?.top3;

  return (
    <div className="space-y-12">
      {/* Seção: Resultado dos Arquétipos */}
      <section>
        {top3 && top3.length > 0 && (
          <span className="inline-block rounded-pill bg-[rgba(205,163,40,0.12)] px-[14px] py-[10px] font-body text-[13px] font-semibold text-primary-dark">
            Seu resultado principal: {getArchetypeName(top3[0].archetype)}
          </span>
        )}

        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-text">
          Seus Arquétipos Dominantes
        </h1>

        {top3 && top3.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {top3.map((entry) => (
                <MetricCard
                  key={entry.rank}
                  label={`Top ${entry.rank}`}
                  value={getArchetypeName(entry.archetype)}
                  highlight={entry.rank === 1}
                />
              ))}
            </div>
            <Link
              href="/arquetipos"
              className="mt-4 inline-block font-body text-[14px] font-medium text-primary-dark transition-colors hover:text-primary"
            >
              Ver detalhes completos &rarr;
            </Link>
          </>
        ) : (
          <p className="mt-4 font-body text-[15px] text-text-soft">
            Você ainda não completou o teste.{" "}
            <Link href="/quiz" className="font-semibold text-primary-dark underline">
              Fazer o teste
            </Link>
          </p>
        )}
      </section>

      {/* Seção: Módulos */}
      <section>
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-text">
          Conteúdo Exclusivo
        </h2>
        <div className="mt-4">
          <ModuleCarousel modules={modules} />
        </div>
      </section>
    </div>
  );
}
