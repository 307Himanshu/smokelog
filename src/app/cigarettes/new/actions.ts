"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCigarette(formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const country = formData.get("country") as string;

  await prisma.cigarette.create({
    data: {
      name,
      brand,
      country,
    },
  });

  redirect("/cigarettes");
}