import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MetasLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-xl shrink-0" />
              <Skeleton className="h-4 w-28" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
