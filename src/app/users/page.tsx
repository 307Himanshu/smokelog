import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      reviews: true,
      followers: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-4xl font-bold">
          People
        </h1>

        <p className="mt-2 text-zinc-400">
          Discover members of the SmokeLog community.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h2 className="text-xl font-semibold">
                {user.name}
              </h2>

              <p className="mt-1 text-zinc-400">
                {user.email}
              </p>

              <div className="mt-4 space-y-1 text-sm text-zinc-400">
                <p>
                  Reviews: {user.reviews.length}
                </p>

                <p>
                  Followers: {user.followers.length}
                </p>
              </div>

              <Link
                href={`/users/${user.id}`}
                className="mt-4 inline-block text-amber-500 hover:text-amber-400"
              >
                View Profile →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}