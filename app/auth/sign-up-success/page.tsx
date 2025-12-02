import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <Logo />
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
                <p>
                  Click the link in your email to confirm your account and start exploring the AI safety research
                  network. The link will expire in 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  Didn&apos;t receive an email? Check your spam folder or try signing up again.
                </p>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/auth/sign-up">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Sign Up
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
