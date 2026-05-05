"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const PAGE_TITLES: Record<string, string> = {
  "/":           "Dashboard",
  "/diario":     "Diário",
  "/exercicios": "Exercícios",
  "/evolucao":   "Evolução",
  "/metas":      "Metas",
}

export function Topbar() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? "Health Tracker"

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <h1 className="font-medium text-sm">{title}</h1>
    </header>
  )
}
