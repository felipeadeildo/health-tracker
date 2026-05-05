import { Suspense } from "react"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getDashboardData, getWeeklyRows } from "@/lib/queries/dashboard"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { WeeklyTable } from "@/components/dashboard/weekly-table"
import { GoalProgress } from "@/components/dashboard/goal-progress"
import { QuickLog } from "@/components/dashboard/quick-log"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  RiScalesLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiCalendarCheckLine,
  RiFireLine,
} from "@remixicon/react"
import type { GoalType } from "@/generated/prisma/enums"

// ── Skeletons ────────────────────────────────────────────────────────

function KpiSkeleton() {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-1 h-7 w-16" />
          <Skeleton className="mt-1 h-3 w-28" />
        </div>
        <Skeleton className="size-10 shrink-0 rounded-xl" />
      </CardContent>
    </Card>
  )
}

function TableSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <Skeleton className="h-4 w-28" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-6 pt-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </CardContent>
    </Card>
  )
}

function GoalsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <Skeleton className="h-4 w-36" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-8 shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-1.5 w-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// ── Server Components ─────────────────────────────────────────────────

async function KpiStrip({ userId }: { userId: string }) {
  const data = await getDashboardData(userId)

  const variationAbs =
    data.weightVariation != null
      ? Math.abs(data.weightVariation).toFixed(1)
      : null

  const kpis = [
    {
      label: "Peso atual",
      value: data.latestWeight
        ? data.latestWeight.weight.toLocaleString("pt-BR")
        : "—",
      unit: "kg",
      subtext: data.latestWeight
        ? `Atualizado ${new Date(data.latestWeight.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}`
        : "Sem registros",
      icon: RiScalesLine,
      accent: "green" as const,
      empty: !data.latestWeight,
    },
    {
      label: "Variação total",
      value: variationAbs
        ? `${data.weightVariation! < 0 ? "-" : "+"}${variationAbs}`
        : "—",
      unit: "kg",
      trend: variationAbs
        ? {
            value:
              data.weightVariation! < 0
                ? `${variationAbs} kg perdidos`
                : `${variationAbs} kg ganhos`,
            direction: (data.weightVariation! < 0 ? "down" : "up") as
              | "up"
              | "down",
          }
        : undefined,
      subtext: "Desde o início",
      icon:
        data.weightVariation != null && data.weightVariation < 0
          ? RiArrowDownLine
          : RiArrowUpLine,
      accent: (data.weightVariation != null && data.weightVariation < 0
        ? "green"
        : "orange") as "green" | "orange",
      empty: variationAbs === null,
    },
    {
      label: "Treinos no mês",
      value: String(data.monthWorkouts),
      unit: "treinos",
      subtext: new Date().toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      }),
      icon: RiCalendarCheckLine,
      accent: "blue" as const,
      empty: data.monthWorkouts === 0,
    },
    {
      label: "Calorias hoje",
      value:
        data.todayCalories > 0
          ? data.todayCalories.toLocaleString("pt-BR")
          : "—",
      unit: "kcal",
      subtext: "Refeições registradas",
      icon: RiFireLine,
      accent: "orange" as const,
      empty: data.todayCalories === 0,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  )
}

async function WeeklySection({ userId }: { userId: string }) {
  const rows = await getWeeklyRows(userId)
  return <WeeklyTable rows={rows} />
}

async function GoalsSection({ userId }: { userId: string }) {
  const data = await getDashboardData(userId)

  const weeklyWorkouts = data.weekExercises.length
  const avgDuration =
    weeklyWorkouts > 0
      ? data.weekExercises.reduce((s, e) => s + e.durationMin, 0) /
        weeklyWorkouts
      : 0
  const avgCalPerWorkout =
    weeklyWorkouts > 0
      ? data.weekExercises.reduce((s, e) => s + (e.caloriesBurned ?? 0), 0) /
        weeklyWorkouts
      : 0

  const currentValues: Partial<Record<GoalType, number>> = {
    TARGET_WEIGHT: data.latestWeight?.weight ?? 0,
    DAILY_CALORIES: data.todayCalories,
    WEEKLY_WORKOUTS: weeklyWorkouts,
    MIN_WORKOUT_DURATION: avgDuration,
    DAILY_WATER: data.todayNote?.waterLiters ?? 0,
    CALORIES_PER_WORKOUT: avgCalPerWorkout,
  }

  return <GoalProgress goals={data.activeGoals} currentValues={currentValues} />
}

// ── Page ─────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session!.user.id

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* KPIs */}
      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <KpiSkeleton key={i} />
            ))}
          </div>
        }
      >
        <KpiStrip userId={userId} />
      </Suspense>

      {/* Main content */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Left — weekly table */}
        <div className="lg:col-span-2">
          <Suspense fallback={<TableSkeleton />}>
            <WeeklySection userId={userId} />
          </Suspense>
        </div>

        {/* Right — goals + quick log */}
        <div className="flex flex-col gap-4 md:gap-6">
          <Suspense fallback={<GoalsSkeleton />}>
            <GoalsSection userId={userId} />
          </Suspense>
          <QuickLog />
        </div>
      </div>
    </div>
  )
}
