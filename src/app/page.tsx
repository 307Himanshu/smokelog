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

return ( <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
    <div className="absolute inset-0 -z-10">
  <div
  className="
    absolute
    left-[-80px]
    top-24
    h-64
    w-64
    md:left-[-150px]
    md:top-[100px]
    md:h-[700px]
    md:w-[700px]
    rounded-full
    bg-amber-500/20
    blur-[120px]
    md:blur-[180px]
  "
/>

<div
  className="
    absolute
    top-16
    right-0
    h-56
    w-56
    md:top-[50px]
    md:h-[600px]
    md:w-[600px]
    right-[-80px] md:right-[-120px]
    rounded-full
    bg-orange-500/15
    blur-[100px]
    md:blur-[180px]
    pointer-events-none
  "
/>

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_55%)]" />
</div>

  <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-28">
  <div className="relative overflow-hidden rounded-3xl min-h-[800px] md:min-h-[700px]">
 <Image
  src="/images/hero.jpg"
  alt="SmokeLog Hero"
  fill
  priority
  className="
    object-cover
    object-[78%_center]
    md:object-center
  "
/>

  <div className="absolute inset-0 bg-black/20 md:bg-black/10" />

  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

  <div className="relative z-10 flex min-h-[700px] items-start md:items-center px-6 md:px-12 lg:px-24 pt-16 md:pt-0">
    <div className="max-w-3xl">
      <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-8xl">
        Track.
        <br />
        Review.
        <br />
        <span className="text-amber-500">
          Remember.
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg text-zinc-300 md:mt-8 md:text-xl">
        SmokeLog is a social platform for cigarette enthusiasts.
        Track what you smoke, rate every cigarette,
        write reviews, and discover new favorites.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
  </div>
</div>

<div className="relative z-20 -mt-12 grid overflow-hidden rounded-3xl border border-zinc-800/60 bg-black/80 shadow-2xl backdrop-blur-xl md:grid-cols-3">

  <div className="flex items-center gap-5 p-8">
    <div className="text-4xl">
      🚬
    </div>

    <div>
      <p className="text-sm uppercase tracking-wider text-zinc-500">
        Cigarettes
      </p>

      <h2 className="mt-1 text-5xl font-bold">
        {cigaretteCount}
      </h2>
    </div>
  </div>

  <div className="flex items-center gap-5 border-l border-r border-zinc-800 p-8">
    <div className="text-4xl">
      ⭐
    </div>

    <div>
      <p className="text-sm uppercase tracking-wider text-zinc-500">
        Reviews
      </p>

      <h2 className="mt-1 text-5xl font-bold">
        {reviewCount}
      </h2>
    </div>
  </div>

  <div className="flex items-center gap-5 p-8">
    <div className="text-4xl">
      👥
    </div>

    <div>
      <p className="text-sm uppercase tracking-wider text-zinc-500">
        Members
      </p>

      <h2 className="mt-1 text-5xl font-bold">
        {userCount}
      </h2>
    </div>
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
