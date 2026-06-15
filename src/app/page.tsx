import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">SmokeLog</h1>

          <div className="flex gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Join Now</Button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-7xl font-bold tracking-tight">
            Track Every Cigarette.
          </h1>

          <p className="mt-6 text-xl text-zinc-400">
            Rate, review, discover and remember every cigarette you've
            ever tried.
          </p>

          <div className="mt-8 flex gap-4">
            <Button size="lg">
              Start Logging
            </Button>

            <Button variant="secondary">
             Browse Cigarettes
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}