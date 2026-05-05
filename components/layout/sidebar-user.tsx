import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AppSidebar } from "@/components/layout/app-sidebar"

export async function SidebarUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  return (
    <AppSidebar userName={session.user.name} userEmail={session.user.email} />
  )
}
