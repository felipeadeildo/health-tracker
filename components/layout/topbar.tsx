"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  RiLayoutGridLine,
  RiBookOpenLine,
  RiRunLine,
  RiLineChartLine,
  RiTargetLine,
} from "@remixicon/react"

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: RiLayoutGridLine },
  { href: "/diario", label: "Diário", icon: RiBookOpenLine },
  { href: "/exercicios", label: "Exercícios", icon: RiRunLine },
  { href: "/evolucao", label: "Evolução", icon: RiLineChartLine },
  { href: "/metas", label: "Metas", icon: RiTargetLine },
]

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/diario": "Diário",
  "/exercicios": "Exercícios",
  "/evolucao": "Evolução",
  "/metas": "Metas",
}

export function Topbar() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? "Health Tracker"

  return (
    <>
      {/* Desktop topbar */}
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-sm font-semibold">{title}</h1>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 md:hidden">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn(
                  "size-5 transition-transform",
                  active && "scale-110"
                )}
              />
              <span className="text-[10px] leading-none font-medium">
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
