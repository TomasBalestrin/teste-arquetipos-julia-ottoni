export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-display text-4xl font-bold text-text">
        Teste dos Arquétipos
      </h1>
      <p className="font-body text-lg text-text-soft">
        Descubra seus arquétipos dominantes
      </p>
      <button className="rounded-md bg-primary px-6 py-3 font-body font-semibold text-text transition-transform hover:-translate-y-0.5">
        Começar o Teste
      </button>
    </main>
  );
}
