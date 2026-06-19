import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { followUser } from "./actions";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserProfilePage({
  params,
}: PageProps) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
  reviews: {
    include: {
      cigarette: true,
    },
  },
  followers: true,
  following: true,
},
  });

  if (!user) {
  notFound();
}

const isOwnProfile = currentUser?.id === user.id;

const isFollowing = user.following.some(
  (follow) => follow.followerId === currentUser?.id
);
Followers: {user.following.length}
Following: {user.followers.length}
return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl p-8">
        <h1 className="text-4xl font-bold">
          {user.name}
        </h1>

        <p className="mt-2 text-zinc-400">
          {user.email}
        </p>
        {!isOwnProfile && (
  <div className="mt-4">
    {isFollowing ? (
      <button
        disabled
        className="rounded-md bg-zinc-700 px-4 py-2 font-medium text-white"
      >
        Following
      </button>
    ) : (
      <form action={followUser.bind(null, user.id)}>
        <button
          type="submit"
          className="rounded-md bg-white px-4 py-2 font-medium text-black"
        >
          Follow
        </button>
      </form>
    )}
  </div>
)}

        <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-2">
  <p>
    Reviews Written: {user.reviews.length}
  </p>

  <p>
  Followers: {user.followers.length}
</p>

<p>
  Following: {user.following.length}
</p>
</div>

<div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
  <h2 className="text-2xl font-semibold">
    Recent Reviews
  </h2>

  {user.reviews.length === 0 ? (
    <p className="mt-4 text-zinc-400">
      No reviews yet.
    </p>
  ) : (
    <div className="mt-4 space-y-4">
      {user.reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-md bg-zinc-800 p-4"
        >
          <Link
           href={`/cigarettes/${review.cigarette.id}`}
           className="font-semibold hover:underline"
        >
           {review.cigarette.name}
          </Link>

          <p className="mt-2">
            ⭐ {review.rating}
          </p>

          <p className="mt-2 text-zinc-300">
            {review.content}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </main>
  );
}