import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { RiCheckLine } from "@remixicon/react"

const DAYS = [
  { label: "Seg", date: "05/05", weight: "82.4", cal: 1850, burned: 420, trained: true,  mood: "😊" },
  { label: "Ter", date: "06/05", weight: "82.1", cal: 2100, burned: 0,   trained: false, mood: "😐" },
  { label: "Qua", date: "07/05", weight: "82.3", cal: 1920, burned: 380, trained: true,  mood: "😊" },
  { label: "Qui", date: "08/05", weight: "—",    cal: 0,    burned: 0,   trained: false, mood: null },
  { label: "Sex", date: "09/05", weight: "—",    cal: 0,    burned: 0,   trained: false, mood: null },
  { label: "Sáb", date: "10/05", weight: "—",    cal: 0,    burned: 0,   trained: false, mood: null },
  { label: "Dom", date: "11/05", weight: "—",    cal: 0,    burned: 0,   trained: false, mood: null },
]

const TODAY_INDEX = 3

export function WeeklyTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Semana atual</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {["Dia", "Peso", "Cal. ingeridas", "Cal. gastas", "Saldo", "Treino", "Humor"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-xs font-medium text-muted-foreground first:pl-6 last:pr-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day, i) => {
                const isToday = i === TODAY_INDEX
                const saldo = day.cal - day.burned
                const hasSaldo = day.cal > 0

                return (
                  <tr
                    key={day.label}
                    className={cn(
                      "border-b last:border-0 transition-colors",
                      isToday
                        ? "bg-primary/5 font-medium"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <td className="px-4 py-2.5 pl-6">
                      <div className="flex items-center gap-2">
                        <span>{day.label}</span>
                        {isToday && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                            hoje
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{day.date}</div>
                    </td>
                    <td className="px-4 py-2.5 font-mono">{day.weight}</td>
                    <td className="px-4 py-2.5 font-mono">
                      {day.cal > 0 ? day.cal.toLocaleString("pt-BR") : "—"}
                    </td>
                    <td className="px-4 py-2.5 font-mono">
                      {day.burned > 0 ? day.burned.toLocaleString("pt-BR") : "—"}
                    </td>
                    <td className="px-4 py-2.5 font-mono">
                      {hasSaldo ? (
                        <span className={cn(saldo < 0 ? "text-emerald-500" : "text-orange-500")}>
                          {saldo > 0 ? "+" : ""}{saldo.toLocaleString("pt-BR")}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-2.5">
                      {day.trained ? (
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                          <RiCheckLine className="size-3" />
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 pr-6 text-base">
                      {day.mood ?? <span className="text-muted-foreground text-sm">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
