"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Topbar } from "@/components/layout/topbar"

interface AppShellProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        {sidebar}
        <SidebarInset>
          <Topbar />
          <main className="flex flex-1 flex-col gap-6 p-4 pb-20 md:p-6 md:pb-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
