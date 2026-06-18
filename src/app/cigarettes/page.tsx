import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CigarettesPage() {
  const cigarettes = await prisma.cigarette.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-4xl font-bold">
          Cigarettes
        </h1>

        <p className="mt-2 text-zinc-400">
          Browse and discover cigarettes.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cigarettes.map((cigarette) => (
            <Link
              href={`/cigarettes/${cigarette.id}`}
              key={cigarette.id}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600"
            >
              <h2 className="text-xl font-semibold">
                {cigarette.name}
              </h2>

              <p className="mt-2 text-zinc-400">
                Brand: {cigarette.brand}
              </p>

              <p className="text-zinc-400">
                Country: {cigarette.country ?? "Unknown"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}