"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCigarette(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const brand = (formData.get("brand") as string).trim();
  const country = (formData.get("country") as string).trim();
  const imageUrl = (formData.get("imageUrl") as string).trim();

  await prisma.cigarette.create({
    data: {
      name,
      brand: brand || null,
      country: country || null,
      imageUrl: imageUrl || null,
    },
  });

  redirect("/cigarettes");
}
