import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RemixiconComponentType } from "@remixicon/react"

interface KpiCardProps {
  label: string
  value: string
  unit?: string
  subtext?: string
  trend?: "up" | "down" | "neutral"
  icon: RemixiconComponentType
  accent?: "green" | "blue" | "orange" | "purple"
}

const accentClasses = {
  green:  { icon: "bg-emerald-500/10 text-emerald-500",  trend: "text-emerald-500"  },
  blue:   { icon: "bg-blue-500/10 text-blue-500",        trend: "text-blue-500"     },
  orange: { icon: "bg-orange-500/10 text-orange-500",    trend: "text-orange-500"   },
  purple: { icon: "bg-violet-500/10 text-violet-500",    trend: "text-violet-500"   },
}

export function KpiCard({
  label,
  value,
  unit,
  subtext,
  icon: Icon,
  accent = "green",
}: KpiCardProps) {
  const classes = accentClasses[accent]

  return (
    <Card className="gap-3 py-5">
      <CardContent className="flex items-start justify-between gap-4 px-5">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-mono tracking-tight tabular-nums">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
          {subtext && (
            <span className="text-xs text-muted-foreground truncate">{subtext}</span>
          )}
        </div>
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", classes.icon)}>
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}
