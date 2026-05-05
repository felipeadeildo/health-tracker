import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  RiScalesLine,
  RiFireLine,
  RiRunLine,
  RiTimeLine,
  RiDropLine,
} from "@remixicon/react"

const MOCK_GOALS = [
  { label: "Peso alvo",      icon: RiScalesLine, current: 82.4, target: 78,   unit: "kg",  accent: "green"  },
  { label: "Calorias/dia",   icon: RiFireLine,   current: 1920, target: 2000,  unit: "kcal", accent: "orange" },
  { label: "Treinos/semana", icon: RiRunLine,    current: 2,    target: 4,    unit: "x",   accent: "blue"   },
  { label: "Duração mín.",   icon: RiTimeLine,   current: 45,   target: 45,   unit: "min", accent: "purple" },
  { label: "Água/dia",       icon: RiDropLine,   current: 1.5,  target: 3,    unit: "L",   accent: "blue"   },
] as const

const accentClasses = {
  green:  { icon: "bg-emerald-500/10 text-emerald-500", bar: "bg-emerald-500" },
  orange: { icon: "bg-orange-500/10 text-orange-500",   bar: "bg-orange-500"  },
  blue:   { icon: "bg-blue-500/10 text-blue-500",       bar: "bg-blue-500"    },
  purple: { icon: "bg-violet-500/10 text-violet-500",   bar: "bg-violet-500"  },
}

function statusColor(pct: number) {
  if (pct >= 90) return "text-emerald-500"
  if (pct >= 60) return "text-orange-400"
  return "text-rose-500"
}

export function GoalProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Progresso das metas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {MOCK_GOALS.map((goal) => {
          const pct = Math.min(100, Math.round((goal.current / goal.target) * 100))
          const classes = accentClasses[goal.accent]

          return (
            <div key={goal.label} className="flex items-center gap-3">
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", classes.icon)}>
                <goal.icon className="size-4" />
              </div>
              <div className="flex flex-1 flex-col gap-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium truncate">{goal.label}</span>
                  <span className={cn("text-xs font-mono font-semibold shrink-0", statusColor(pct))}>
                    {pct}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", classes.bar)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 font-mono">
                    {goal.current}/{goal.target} {goal.unit}
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
