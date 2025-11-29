import { ProjectsDirectory } from "@/components/projects-directory"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Projects Directory | AI Safety Connect",
  description: "Explore AI safety research projects across academic institutions, LessWrong, and the EA community.",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Projects Directory</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Discover active AI safety research projects across academic institutions, independent organizations, and
              community-driven initiatives. Find collaboration opportunities and track research outputs.
            </p>
          </div>
          <ProjectsDirectory />
        </div>
      </main>
      <Footer />
    </div>
  )
}
