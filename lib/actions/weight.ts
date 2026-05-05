"use server"

import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function logWeight(weight: number, date?: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error("Não autorizado")

  const day = date
    ? new Date(date)
    : new Date(new Date().toISOString().split("T")[0])

  await prisma.weightLog.upsert({
    where: { userId_date: { userId: session.user.id, date: day } },
    create: { userId: session.user.id, date: day, weight },
    update: { weight },
  })

  revalidateTag(`dashboard:${session.user.id}`, "minutes")
  revalidateTag(`weekly:${session.user.id}`, "minutes")
  revalidateTag(`weight:${session.user.id}`, "minutes")
}
