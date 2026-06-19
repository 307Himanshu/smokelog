"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export async function createReview(
  cigaretteId: string,
  formData: FormData
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const rating = Number(formData.get("rating"));
  const content = formData.get("content") as string;

  await prisma.review.create({
    data: {
      rating,
      content,
      cigaretteId,
      userId: user.id,
    },
  });

  redirect(`/cigarettes/${cigaretteId}`);
}