import Link from "next/link";
import { prisma } from "@/lib/prisma";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const cigarettes = q
    ? await prisma.cigarette.findMany({
        where: {
          OR: [
            {
              name: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              brand: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        },
        take: 10,
      })
    : [];

  const users = q
    ? await prisma.user.findMany({
        where: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        take: 10,
      })
    : [];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="text-4xl font-bold">
          Search
        </h1>

        <form className="mt-6">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search cigarettes or people..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-4"
          />
        </form>

        {q && (
          <>
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                Cigarettes
              </h2>

              <div className="mt-4 space-y-3">
                {cigarettes.map((cigarette) => (
                  <Link
                    key={cigarette.id}
                    href={`/cigarettes/${cigarette.id}`}
                    className="block rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600"
                  >
                    <p className="font-semibold">
                      {cigarette.name}
                    </p>

                    <p className="text-zinc-400">
                      {cigarette.brand}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                People
              </h2>

              <div className="mt-4 space-y-3">
                {users.map((user) => (
                  <Link
                    key={user.id}
                    href={`/users/${user.id}`}
                    className="block rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600"
                  >
                    <p className="font-semibold">
                      {user.name}
                    </p>

                    <p className="text-zinc-400">
                      {user.email}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}