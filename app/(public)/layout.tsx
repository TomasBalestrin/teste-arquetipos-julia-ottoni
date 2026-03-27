import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(205, 163, 40, 0.08), transparent 28%), linear-gradient(180deg, #f6f3ef 0%, #f2eeea 100%)",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6">
        {children}
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
