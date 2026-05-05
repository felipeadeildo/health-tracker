"use server"

import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import type { MealType } from "@/generated/prisma/enums"

export async function logMeal(data: {
  description: string
  calories?: number
  mealType: MealType
  protein?: number
  carbs?: number
  fat?: number
  date?: string
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error("Não autorizado")

  const day = data.date
    ? new Date(data.date)
    : new Date(new Date().toISOString().split("T")[0])

  await prisma.mealLog.create({
    data: {
      userId: session.user.id,
      date: day,
      description: data.description,
      mealType: data.mealType,
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
    },
  })

  revalidateTag(`dashboard:${session.user.id}`, "minutes")
  revalidateTag(`weekly:${session.user.id}`, "minutes")
  revalidateTag(`meals:${session.user.id}`, "minutes")
}
