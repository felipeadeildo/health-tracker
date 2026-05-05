import { Suspense } from "react"
import {
  RiScalesLine,
  RiArrowDownLine,
  RiCalendarCheckLine,
  RiFireLine,
} from "@remixicon/react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { WeeklyTable } from "@/components/dashboard/weekly-table"
import { GoalProgress } from "@/components/dashboard/goal-progress"
import { QuickLog } from "@/components/dashboard/quick-log"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// TODO: replace with real data from lib/queries/dashboard.ts (Fase 5)
const MOCK_KPIS = [
  {
    label: "Peso atual",
    value: "82.4",
    unit: "kg",
    subtext: "Registrado hoje",
    icon: RiScalesLine,
    accent: "green" as const,
  },
  {
    label: "Variação total",
    value: "-3.6",
    unit: "kg",
    subtext: "Desde o início",
    icon: RiArrowDownLine,
    accent: "green" as const,
  },
  {
    label: "Treinos no mês",
    value: "8",
    unit: "treinos",
    subtext: "Meta: 16",
    icon: RiCalendarCheckLine,
    accent: "blue" as const,
  },
  {
    label: "Calorias hoje",
    value: "1.920",
    unit: "kcal",
    subtext: "Meta: 2.000 kcal",
    icon: RiFireLine,
    accent: "orange" as const,
  },
]

function KpiSkeleton() {
  return (
    <Card className="gap-3 py-5">
      <CardContent className="flex items-start justify-between gap-4 px-5">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="size-10 rounded-xl shrink-0" />
      </CardContent>
    </Card>
  )
}

function TableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-28" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPIs */}
      <Suspense fallback={
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)}
        </div>
      }>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {MOCK_KPIS.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </Suspense>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tabela semanal — ocupa 2 colunas */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Suspense fallback={<TableSkeleton />}>
            <WeeklyTable />
          </Suspense>
          <QuickLog />
        </div>

        {/* Coluna direita */}
        <div className="flex flex-col gap-6">
          <Suspense fallback={
            <Card>
              <CardHeader><Skeleton className="h-4 w-36" /></CardHeader>
              <CardContent className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-lg shrink-0" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-1.5 w-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          }>
            <GoalProgress />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
