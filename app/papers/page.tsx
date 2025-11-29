import { Header } from "@/components/header"
import { PapersDirectory } from "@/components/papers-directory"

export const metadata = {
  title: "Papers & Publications | AI Safety Connect",
  description:
    "Search and explore AI safety research papers from academic sources, arXiv, LessWrong, and EA Forum. Filter by topic, source, and year.",
}

export default function PapersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Papers & Publications</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore AI safety research across academic papers, arXiv preprints, LessWrong posts, and EA Forum
              articles. Use semantic search to find relevant work by topic, concept, or research question.
            </p>
          </div>
          <PapersDirectory />
        </div>
      </div>
    </main>
  )
}
