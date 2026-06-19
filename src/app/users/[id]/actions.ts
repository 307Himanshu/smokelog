"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export async function followUser(followingId: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  if (user.id === followingId) {
    return;
  }

  await prisma.follow.upsert({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId,
      },
    },
    update: {},
    create: {
      followerId: user.id,
      followingId,
    },
  });

  redirect(`/users/${followingId}`);
}