import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const cigaretteCount = await prisma.cigarette.count();

  const reviewCount = await prisma.review.count();

  const recentReviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      user: true,
      cigarette: true,
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-zinc-400">
          Track, review, and discover cigarettes.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Cigarettes
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {cigaretteCount}
            </h2>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Reviews
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {reviewCount}
            </h2>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Following
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              0
            </h2>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Quick Actions
          </h2>

          <div className="flex gap-4">
            <a
              href="/cigarettes/new"
              className="rounded-lg bg-white px-4 py-2 font-medium text-black"
            >
              Add Cigarette
            </a>

            <a
              href="/cigarettes"
              className="rounded-lg border border-zinc-700 px-4 py-2"
            >
              Browse Cigarettes
            </a>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentReviews.length === 0 ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
                No activity yet.
              </div>
            ) : (
              recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
                >
                  <p className="font-semibold">
                    {review.user.name} reviewed {review.cigarette.name}
                  </p>

                  <p className="mt-2 text-yellow-400">
                    ⭐ {review.rating}
                  </p>

                  <p className="mt-2 text-zinc-300">
                    {review.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}