import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <Logo />
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Authentication Error</CardTitle>
              <CardDescription>Something went wrong during authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {params?.error && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4">
                  <p className="text-sm text-destructive">Error: {params.error}</p>
                </div>
              )}

              <div className="rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
                <p>
                  This could happen if the link has expired, was already used, or if there was a problem with the OAuth
                  provider. Please try again.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
