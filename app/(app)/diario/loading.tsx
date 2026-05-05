import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DiarioLoading() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card>
        <CardHeader><Skeleton className="h-4 w-24" /></CardHeader>
        <CardContent><Skeleton className="h-64 w-full" /></CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader><Skeleton className="h-4 w-32" /></CardHeader>
            <CardContent><Skeleton className="h-20 w-full" /></CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
