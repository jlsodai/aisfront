import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, FileText, FolderKanban, BookOpen, Settings, Bell, UserCircle } from "lucide-react"
import { SignOutButton } from "@/components/sign-out-button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const user = data.user

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, display_name, is_public")
    .eq("id", user.id)
    .single()

  const displayName =
    profile?.display_name ||
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Researcher"
  const hasPublicProfile = profile?.is_public || false

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto px-6 lg:px-8 py-8 pt-24 max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {displayName}</h1>
            <p className="text-muted-foreground mt-1">Your AI safety research hub</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/profile">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <SignOutButton />
          </div>
        </div>

        {!hasPublicProfile && (
          <Card className="mb-6 bg-accent/10 border-accent/30">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Complete your researcher profile</p>
                  <p className="text-sm text-muted-foreground">
                    Make your profile public to be discoverable in the directory
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link href="/dashboard/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saved Researchers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saved Papers</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+8 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Following Projects</CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Reading List</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">3 unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-primary" />
                Manage Profile
              </CardTitle>
              <CardDescription>
                Update your researcher profile, add publications, and manage your visibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card> */}

          <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Explore Researchers
              </CardTitle>
              <CardDescription>
                Discover AI safety researchers across academia, EA, and LessWrong communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/researchers">Browse Directory</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Search Papers
              </CardTitle>
              <CardDescription>
                Find relevant research with semantic search across 15,000+ papers and posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/papers">Search Papers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-primary" />
                Active Projects
              </CardTitle>
              <CardDescription>Explore ongoing AI safety projects and find collaboration opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Info */}
        <Card className="mt-8 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Auth Provider</span>
              <span className="font-medium capitalize">{user.app_metadata?.provider || "Email"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
