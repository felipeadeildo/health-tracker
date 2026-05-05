import { Suspense } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { SidebarUser } from "@/components/layout/sidebar-user"
import { Skeleton } from "@/components/ui/skeleton"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      sidebar={
        <Suspense fallback={<SidebarFallback />}>
          <SidebarUser />
        </Suspense>
      }
    >
      {children}
    </AppShell>
  )
}

function SidebarFallback() {
  return (
    <div className="hidden h-svh w-64 flex-col gap-2 border-r bg-sidebar px-3 py-4 md:flex">
      <Skeleton className="mb-2 h-10 w-full rounded-xl" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full rounded-lg" />
      ))}
    </div>
  )
}
