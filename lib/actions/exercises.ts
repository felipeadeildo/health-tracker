"use server"

import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import type { ExerciseType, Intensity } from "@/generated/prisma/enums"

export async function logExercise(data: {
  name: string
  exerciseType: ExerciseType
  durationMin: number
  caloriesBurned?: number
  intensity?: Intensity
  notes?: string
  date?: string
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error("Não autorizado")

  const day = data.date
    ? new Date(data.date)
    : new Date(new Date().toISOString().split("T")[0])

  await prisma.exerciseLog.create({
    data: {
      userId: session.user.id,
      date: day,
      name: data.name,
      exerciseType: data.exerciseType,
      durationMin: data.durationMin,
      caloriesBurned: data.caloriesBurned,
      intensity: data.intensity,
      notes: data.notes,
    },
  })

  revalidateTag(`dashboard:${session.user.id}`, "minutes")
  revalidateTag(`weekly:${session.user.id}`, "minutes")
  revalidateTag(`exercises:${session.user.id}`, "minutes")
}
