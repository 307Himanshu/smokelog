import { prisma } from "@/lib/prisma";
import { createReview } from "./actions";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CigaretteDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const cigarette = await prisma.cigarette.findUnique({
    where: {
      id,
    },
    include: {
     reviews: {
     include: {
      user: true,
    },
  },
},
  });

  if (!cigarette) {
    notFound();
  }
  const averageRating =
  cigarette.reviews.length === 0
    ? 0
    : cigarette.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      ) / cigarette.reviews.length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl p-8">
        <h1 className="text-4xl font-bold">
          {cigarette.name}
        </h1>

        <p className="mt-4 text-zinc-400">
          Detailed information about this cigarette.
        </p>

        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p>Brand: {cigarette.brand}</p>
          <p>Country: {cigarette.country ?? "Unknown"}</p>
          <p>Average Rating: ⭐ {averageRating.toFixed(1)} / 5</p>
          <p>Reviews: {cigarette.reviews.length}</p>
        </div>

        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">
            Reviews
          </h2>

          {cigarette.reviews.length === 0 ? (
            <p className="mt-4 text-zinc-400">
              No reviews yet.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {cigarette.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-md bg-zinc-800 p-4"
                >
                  <p className="font-semibold">
                  {review.user.name}
                   </p>
                  <p className="mt-1">
                   Rating: ⭐ {review.rating}
                </p>
                  <p className="mt-2 text-zinc-300">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">
            Write a Review
          </h2>

          <form
            action={createReview.bind(null, cigarette.id)}
            className="mt-4 space-y-4"
          >
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3"
            />

            <textarea
              name="content"
              placeholder="What did you think?"
              rows={5}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3"
            />

            <button
              type="submit"
              className="rounded-md bg-white px-6 py-3 font-medium text-black"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}