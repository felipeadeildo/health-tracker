import { cacheTag, cacheLife } from "next/cache"
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import prisma from "@/lib/prisma"

export async function getDashboardData(userId: string) {
  "use cache"
  cacheLife("minutes")
  cacheTag(`dashboard:${userId}`)

  const now = new Date()
  const today = new Date(now.toISOString().split("T")[0])
  const weekStart = startOfWeek(today, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 })
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)

  const [
    latestWeight,
    firstWeight,
    weekWeights,
    todayMeals,
    weekExercises,
    activeGoals,
    todayNote,
    monthWorkouts,
  ] = await Promise.all([
    prisma.weightLog.findFirst({
      where: { userId },
      orderBy: { date: "desc" },
    }),
    prisma.weightLog.findFirst({
      where: { userId },
      orderBy: { date: "asc" },
    }),
    prisma.weightLog.findMany({
      where: { userId, date: { gte: weekStart, lte: weekEnd } },
      orderBy: { date: "asc" },
    }),
    prisma.mealLog.findMany({
      where: { userId, date: today },
    }),
    prisma.exerciseLog.findMany({
      where: { userId, date: { gte: weekStart, lte: weekEnd } },
      orderBy: { date: "asc" },
    }),
    prisma.goal.findMany({
      where: { userId, active: true },
    }),
    prisma.dailyNote.findUnique({
      where: { userId_date: { userId, date: today } },
    }),
    prisma.exerciseLog.count({
      where: { userId, date: { gte: monthStart, lte: monthEnd } },
    }),
  ])

  const weightVariation =
    latestWeight && firstWeight && latestWeight.id !== firstWeight.id
      ? latestWeight.weight - firstWeight.weight
      : null

  const todayCalories = todayMeals.reduce(
    (sum, m) => sum + (m.calories ?? 0),
    0
  )

  return {
    latestWeight,
    weightVariation,
    monthWorkouts,
    todayCalories,
    weekWeights,
    weekExercises,
    activeGoals,
    todayNote,
  }
}

export async function getWeeklyRows(userId: string) {
  "use cache"
  cacheLife("minutes")
  cacheTag(`weekly:${userId}`)

  const today = new Date(new Date().toISOString().split("T")[0])
  const weekStart = startOfWeek(today, { weekStartsOn: 1 })

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  const [weights, mealsByDay, exercisesByDay, notesByDay] = await Promise.all([
    prisma.weightLog.findMany({
      where: { userId, date: { gte: weekStart } },
    }),
    prisma.mealLog.groupBy({
      by: ["date"],
      where: { userId, date: { gte: weekStart } },
      _sum: { calories: true },
    }),
    prisma.exerciseLog.groupBy({
      by: ["date"],
      where: { userId, date: { gte: weekStart } },
      _sum: { caloriesBurned: true },
      _count: { id: true },
    }),
    prisma.dailyNote.findMany({
      where: { userId, date: { gte: weekStart } },
    }),
  ])

  return days.map((day) => {
    const iso = day.toISOString().split("T")[0]
    const weight = weights.find(
      (w) => w.date.toISOString().split("T")[0] === iso
    )
    const meals = mealsByDay.find(
      (m) => m.date.toISOString().split("T")[0] === iso
    )
    const exercises = exercisesByDay.find(
      (e) => e.date.toISOString().split("T")[0] === iso
    )
    const note = notesByDay.find(
      (n) => n.date.toISOString().split("T")[0] === iso
    )

    const cal = meals?._sum.calories ?? 0
    const burned = exercises?._sum.caloriesBurned ?? 0

    return {
      date: day,
      weight: weight?.weight ?? null,
      cal,
      burned,
      trained: (exercises?._count.id ?? 0) > 0,
      mood: note?.mood ?? null,
    }
  })
}
