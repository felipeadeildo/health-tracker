import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"
import {
  RiScalesLine,
  RiFireLine,
  RiRunLine,
  RiTimeLine,
  RiDropLine,
  RiFlashlightLine,
  RiFlag2Line,
  RiAddLine,
  RiTargetLine,
} from "@remixicon/react"
import type { Goal, GoalType } from "@/generated/prisma/client"

interface GoalProgressProps {
  goals: Goal[]
  currentValues: Partial<Record<GoalType, number>>
}

const GOAL_META: Record<
  GoalType,
  {
    label: string
    icon: typeof RiScalesLine
    unit: string
    accent: "green" | "orange" | "blue" | "purple"
  }
> = {
  TARGET_WEIGHT: {
    label: "Peso alvo",
    icon: RiScalesLine,
    unit: "kg",
    accent: "green",
  },
  DAILY_CALORIES: {
    label: "Calorias/dia",
    icon: RiFireLine,
    unit: "kcal",
    accent: "orange",
  },
  WEEKLY_WORKOUTS: {
    label: "Treinos/semana",
    icon: RiRunLine,
    unit: "x",
    accent: "blue",
  },
  MIN_WORKOUT_DURATION: {
    label: "Duração mín.",
    icon: RiTimeLine,
    unit: "min",
    accent: "purple",
  },
  DAILY_WATER: {
    label: "Água/dia",
    icon: RiDropLine,
    unit: "L",
    accent: "blue",
  },
  CALORIES_PER_WORKOUT: {
    label: "Cal/treino",
    icon: RiFlashlightLine,
    unit: "kcal",
    accent: "orange",
  },
}

const accentClasses = {
  green: { icon: "bg-emerald-500/10 text-emerald-500", bar: "bg-emerald-500" },
  orange: { icon: "bg-orange-500/10 text-orange-500", bar: "bg-orange-500" },
  blue: { icon: "bg-blue-500/10 text-blue-500", bar: "bg-blue-500" },
  purple: { icon: "bg-violet-500/10 text-violet-500", bar: "bg-violet-500" },
}

function statusColor(pct: number) {
  if (pct >= 90) return "text-emerald-500"
  if (pct >= 60) return "text-orange-400"
  return "text-rose-500"
}

export function GoalProgress({ goals, currentValues }: GoalProgressProps) {
  if (goals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <RiTargetLine className="size-4 text-muted-foreground" />
            Progresso das metas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-4">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RiFlag2Line />
              </EmptyMedia>
              <EmptyTitle>Nenhuma meta ativa</EmptyTitle>
              <EmptyDescription>
                Defina metas de peso, calorias, treinos ou hidratação para
                acompanhar seu progresso direto aqui.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild size="sm" className="gap-1.5">
                <Link href="/metas">
                  <RiAddLine className="size-4" />
                  Criar primeira meta
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          Progresso das metas
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {goals.map((goal) => {
          const meta = GOAL_META[goal.type]
          const current = currentValues[goal.type] ?? 0
          const pct = Math.min(
            100,
            Math.round((current / goal.targetValue) * 100)
          )
          const classes = accentClasses[meta.accent]

          return (
            <div key={goal.id} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  classes.icon
                )}
              >
                <meta.icon className="size-4" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs font-medium">
                    {meta.label}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 font-mono text-xs font-semibold",
                      statusColor(pct)
                    )}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        classes.bar
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {current}/{goal.targetValue} {meta.unit}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
