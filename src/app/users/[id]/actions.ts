"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function followUser(followingId: string) {
  await prisma.follow.create({
    data: {
      followerId: "Bhf9W0kXvcOpZktjLkmqSJOdvcBgc6aI",
      followingId,
    },
  });

  redirect(`/users/${followingId}`);
}