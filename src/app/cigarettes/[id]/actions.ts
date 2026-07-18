"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  revalidatePath(`/cigarettes/${cigaretteId}`);
  redirect(`/cigarettes/${cigaretteId}`);
}

export async function logSmoke(cigaretteId: string, notes?: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  await prisma.log.create({
    data: {
      cigaretteId,
      userId: user.id,
      notes: notes || null,
      smokedAt: new Date(),
    },
  });

  revalidatePath(`/cigarettes/${cigaretteId}`);
  revalidatePath("/dashboard");
  revalidatePath(`/users/${user.id}`);
}