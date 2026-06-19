import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const cigaretteCount = await prisma.cigarette.count();
  const reviewCount = await prisma.review.count();
  const userCount = await prisma.user.count();
  const trendingCigarettes = await prisma.cigarette.findMany({
  take: 4,
  orderBy: {
    createdAt: "desc",
  },
});
const recentReviews = await prisma.review.findMany({
  take: 5,
  orderBy: {
    createdAt: "desc",
  },
  include: {
    user: true,
    cigarette: true,
  },
});

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 -z-10">
 <div className="absolute left-[-150px] top-[100px] h-[700px] w-[700px] rounded-full bg-amber-500/20 blur-[180px]" />

<div className="absolute right-[-100px] top-[50px] h-[600px] w-[600px] rounded-full bg-orange-500/15 blur-[180px]" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_55%)]" />
</div>
      <section className="mx-auto max-w-7xl px-6 py-24">
       <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
  <div>
    <h1 className="text-7xl font-bold leading-none tracking-tight">
      Track.
      <br />
      Review.
      <br />
      <span className="text-amber-500">
        Remember.
      </span>
    </h1>

    <p className="mt-8 max-w-2xl text-xl text-zinc-400">
      SmokeLog is a social platform for cigarette enthusiasts.
      Track what you smoke, rate every cigarette, write reviews,
      and discover new favorites.
    </p>

    <div className="mt-10 flex gap-4">
      <Link href="/sign-up">
        <Button size="lg">
          Join SmokeLog
        </Button>
      </Link>

      <Link href="/cigarettes">
        <Button
          size="lg"
          variant="secondary"
        >
          Explore Cigarettes
        </Button>
      </Link>
    </div>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        🔥 Trending Now
      </h2>

      <Link
        href="/cigarettes"
        className="text-sm text-zinc-400 hover:text-white"
      >
        View all
      </Link>
    </div>

    <div className="mt-6 space-y-4">
      {trendingCigarettes.map((cigarette, index) => (
        <Link
          key={cigarette.id}
          href={`/cigarettes/${cigarette.id}`}
          className="block rounded-xl border border-zinc-800 p-4 transition hover:border-zinc-600"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">
                #{index + 1} {cigarette.name}
              </p>

              <p className="text-sm text-zinc-400">
                {cigarette.brand}
              </p>
            </div>

            <span className="text-zinc-500">
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">
              Cigarettes
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {cigaretteCount}
            </h2>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">
              Reviews
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {reviewCount}
            </h2>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">
              Members
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {userCount}
            </h2>
          </div>
        </div>
        <section className="mt-20">
  <div className="flex items-center justify-between">
    <h2 className="text-3xl font-bold">
      Trending Cigarettes
    </h2>

    <Link
      href="/cigarettes"
      className="text-zinc-400 hover:text-white"
    >
      View all →
    </Link>
  </div>

  <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {trendingCigarettes.map((cigarette) => (
  <Link
    key={cigarette.id}
    href={`/cigarettes/${cigarette.id}`}
    className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-600"
  >
    {cigarette.imageUrl ? (
      <div className="relative h-48 w-full">
        <Image
          src={cigarette.imageUrl}
          alt={cigarette.name}
          fill
          className="object-cover"
        />
      </div>
    ) : (
      <div className="flex h-48 items-center justify-center bg-zinc-800 text-5xl">
        🚬
      </div>
    )}

    <div className="p-5">
      <h3 className="text-lg font-semibold">
        {cigarette.name}
      </h3>

      <p className="mt-2 text-zinc-400">
        {cigarette.brand}
      </p>

      <p className="mt-1 text-sm text-zinc-500">
        {cigarette.country ?? "Unknown"}
      </p>
    </div>
  </Link>
))}
  </div>
</section>
<section className="mt-20">
  <h2 className="text-3xl font-bold">
    Recent Reviews
  </h2>

  <div className="mt-8 space-y-4">
    {recentReviews.map((review) => (
      <div
        key={review.id}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
      >
        <p className="font-semibold">
          {review.user.name} reviewed {review.cigarette.name}
        </p>

        <p className="mt-2 text-amber-400">
          ⭐ {review.rating}
        </p>

        <p className="mt-2 text-zinc-400">
          {review.content}
        </p>
      </div>
    ))}
  </div>
</section>
      </section>
    </main>
  );
}