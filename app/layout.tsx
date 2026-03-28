import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import FacebookPixel from "@/components/FacebookPixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teste dos Arquétipos",
  description:
    "Descubra seus 3 arquétipos dominantes com nosso teste de personalidade baseado em Jung",
};

async function getPixelId(): Promise<string> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "facebook_pixel_id")
      .single();
    return data?.value ?? "";
  } catch {
    return "";
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = await getPixelId();

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        {pixelId && <FacebookPixel pixelId={pixelId} />}
      </body>
    </html>
  );
}
