import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RemixiconComponentType } from "@remixicon/react"

interface KpiCardProps {
  label: string
  value: string
  unit?: string
  subtext?: string
  trend?: { value: string; direction: "up" | "down" | "neutral" }
  icon: RemixiconComponentType
  accent?: "green" | "blue" | "orange" | "purple"
  empty?: boolean
}

const accentClasses = {
  green: { icon: "bg-emerald-500/10 text-emerald-500" },
  blue: { icon: "bg-blue-500/10 text-blue-500" },
  orange: { icon: "bg-orange-500/10 text-orange-500" },
  purple: { icon: "bg-violet-500/10 text-violet-500" },
}

export function KpiCard({
  label,
  value,
  unit,
  subtext,
  trend,
  icon: Icon,
  accent = "green",
  empty = false,
}: KpiCardProps) {
  const classes = accentClasses[accent]

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className={cn(
                "font-mono leading-none font-bold tracking-tight tabular-nums",
                empty ? "text-xl text-muted-foreground/50" : "text-2xl"
              )}
            >
              {value}
            </span>
            {unit && !empty && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            {trend && !empty ? (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.direction === "down"
                    ? "text-emerald-500"
                    : trend.direction === "up"
                      ? "text-orange-500"
                      : "text-muted-foreground"
                )}
              >
                {trend.value}
              </span>
            ) : subtext ? (
              <span className="truncate text-xs text-muted-foreground">
                {subtext}
              </span>
            ) : null}
          </div>
        </div>
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl transition-opacity",
            classes.icon,
            empty && "opacity-40"
          )}
        >
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}
