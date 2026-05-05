import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader><Skeleton className="h-4 w-28" /></CardHeader>
            <CardContent className="flex flex-col gap-2 px-6">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-4 w-28" /></CardHeader>
            <CardContent><Skeleton className="h-32 w-full" /></CardContent>
          </Card>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  )
}
