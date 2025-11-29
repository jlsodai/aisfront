import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResearcherDirectory } from "@/components/researcher-directory"

export const metadata = {
  title: "Researcher Directory | AI Safety Connect",
  description: "Discover AI safety researchers across academia, EA Forum, and LessWrong communities",
}

export default function ResearchersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Researcher Directory</h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              Explore AI safety researchers across academic institutions, the EA Forum, and LessWrong. Find
              collaborators, discover shared interests, and bridge communities.
            </p>
          </div>
          <ResearcherDirectory />
        </div>
      </main>
      <Footer />
    </div>
  )
}
