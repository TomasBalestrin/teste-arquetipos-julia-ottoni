import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Toaster } from "sonner";
import Sidebar from "@/components/members/Sidebar";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: dbUser } = await supabase
    .from("users")
    .select("must_reset_password")
    .eq("id", user.id)
    .single();

  const headersList = headers();
  const pathname = headersList.get("x-next-pathname") ?? "";
  const isResetPage = pathname === "/redefinir-senha";

  if (dbUser?.must_reset_password && !isResetPage) {
    redirect("/redefinir-senha");
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(205, 163, 40, 0.08), transparent 28%), linear-gradient(180deg, #f6f3ef 0%, #f2eeea 100%)",
      }}
    >
      <Sidebar />
      <main className="min-h-screen px-4 py-8 pt-16 lg:ml-[312px] lg:py-10 lg:pr-8 lg:pt-10">
        {children}
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}
