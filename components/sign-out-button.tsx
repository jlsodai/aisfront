"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { useState } from "react"

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="outline" className="cursor-pointer" onClick={handleSignOut} disabled={isLoading}>
      <LogOut className="h-4 w-4 mr-2" />
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  )
}
