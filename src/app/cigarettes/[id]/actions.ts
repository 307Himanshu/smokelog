"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createReview(
  cigaretteId: string,
  formData: FormData
) {
  const rating = Number(formData.get("rating"));
  const content = formData.get("content") as string;

  await prisma.review.create({
    data: {
      rating,
      content,
      cigaretteId,

      userId: "Xr9En9ZOR7mMTr4oIVVeZWz0nrmAMTHx",
    },
  });

  redirect(`/cigarettes/${cigaretteId}`);
}