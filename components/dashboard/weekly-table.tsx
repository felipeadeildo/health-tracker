import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"
import { format, isToday } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  RiCheckLine,
  RiSubtractLine,
  RiEmotionHappyLine,
  RiEmotionNormalLine,
  RiEmotionUnhappyLine,
  RiEmotionLine,
  RiSkullLine,
  RiCalendarLine,
  RiScalesLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiSwapLine,
  RiRunLine,
  RiMentalHealthLine,
  RiCalendarScheduleLine,
} from "@remixicon/react"
import type { Mood } from "@/generated/prisma/enums"

export interface WeekRow {
  date: Date
  weight: number | null
  cal: number
  burned: number
  trained: boolean
  mood: Mood | null
}

interface WeeklyTableProps {
  rows: WeekRow[]
}

const MOOD_ICON: Record<
  Mood,
  { icon: typeof RiEmotionLine; className: string }
> = {
  GREAT: { icon: RiEmotionLine, className: "text-emerald-500" },
  GOOD: { icon: RiEmotionHappyLine, className: "text-green-500" },
  NEUTRAL: { icon: RiEmotionNormalLine, className: "text-yellow-500" },
  BAD: { icon: RiEmotionUnhappyLine, className: "text-orange-500" },
  AWFUL: { icon: RiSkullLine, className: "text-rose-500" },
}

const DAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

function Dash() {
  return <RiSubtractLine className="size-3.5 text-muted-foreground/30" />
}

export function WeeklyTable({ rows }: WeeklyTableProps) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <RiCalendarScheduleLine className="size-4 text-muted-foreground" />
          Semana atual
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-3 pb-2">
        {rows.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RiCalendarLine />
              </EmptyMedia>
              <EmptyTitle>Nenhum dado esta semana</EmptyTitle>
              <EmptyDescription>
                Registre peso, refeições ou treinos para ver o resumo aqui.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-140 text-sm">
              <thead>
                <tr className="border-b">
                  {[
                    { label: "Dia", icon: null },
                    { label: "Peso", icon: RiScalesLine },
                    { label: "Ingeridas", icon: RiArrowDownLine },
                    { label: "Gastas", icon: RiArrowUpLine },
                    { label: "Saldo", icon: RiSwapLine },
                    { label: "Treino", icon: RiRunLine },
                    { label: "Humor", icon: RiMentalHealthLine },
                  ].map(({ label, icon: Icon }) => (
                    <th
                      key={label}
                      className="px-3 py-2 text-left text-xs font-medium text-muted-foreground first:pl-5 last:pr-5"
                    >
                      <span className="flex items-center gap-1">
                        {Icon && <Icon className="size-3 shrink-0" />}
                        {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const today = isToday(row.date)
                  const saldo = row.cal - row.burned
                  const hasSaldo = row.cal > 0
                  const moodConfig = row.mood ? MOOD_ICON[row.mood] : null

                  return (
                    <tr
                      key={i}
                      className={cn(
                        "border-b transition-colors last:border-0",
                        today
                          ? "bg-primary/4 dark:bg-primary/10"
                          : "hover:bg-muted/30"
                      )}
                    >
                      <td className="px-3 py-3 pl-5">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-medium",
                              today && "text-primary"
                            )}
                          >
                            {DAY_LABELS[i]}
                          </span>
                          {today && (
                            <Badge className="h-4 border-0 bg-primary/10 px-1.5 py-0 text-[10px] font-medium text-primary">
                              hoje
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(row.date, "dd/MM", { locale: ptBR })}
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono text-sm">
                        {row.weight != null ? (
                          <span>
                            {row.weight.toLocaleString("pt-BR")}{" "}
                            <span className="text-xs text-muted-foreground">
                              kg
                            </span>
                          </span>
                        ) : (
                          <Dash />
                        )}
                      </td>
                      <td className="px-3 py-3 font-mono text-sm">
                        {row.cal > 0 ? (
                          <span>
                            {row.cal.toLocaleString("pt-BR")}{" "}
                            <span className="text-xs text-muted-foreground">
                              kcal
                            </span>
                          </span>
                        ) : (
                          <Dash />
                        )}
                      </td>
                      <td className="px-3 py-3 font-mono text-sm">
                        {row.burned > 0 ? (
                          <span>
                            {row.burned.toLocaleString("pt-BR")}{" "}
                            <span className="text-xs text-muted-foreground">
                              kcal
                            </span>
                          </span>
                        ) : (
                          <Dash />
                        )}
                      </td>
                      <td className="px-3 py-3 font-mono text-sm">
                        {hasSaldo ? (
                          <span
                            className={cn(
                              "font-semibold",
                              saldo <= 0
                                ? "text-emerald-500"
                                : "text-orange-500"
                            )}
                          >
                            {saldo > 0 ? "+" : ""}
                            {saldo.toLocaleString("pt-BR")}
                          </span>
                        ) : (
                          <Dash />
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {row.trained ? (
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                            <RiCheckLine className="size-3" />
                          </span>
                        ) : (
                          <Dash />
                        )}
                      </td>
                      <td className="px-3 py-3 pr-5">
                        {moodConfig ? (
                          <moodConfig.icon
                            className={cn("size-4", moodConfig.className)}
                          />
                        ) : (
                          <Dash />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
