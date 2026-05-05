import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function EvolucaoLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="py-5">
            <CardContent className="px-5">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader><Skeleton className="h-4 w-40" /></CardHeader>
          <CardContent><Skeleton className="h-64 w-full" /></CardContent>
        </Card>
      ))}
    </div>
  )
}
