import { notFound } from "next/navigation"
import { getResearcherBySlug, researchers } from "@/lib/researchers-data"
import { ResearcherProfile } from "@/components/researcher-profile"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export async function generateStaticParams() {
  return researchers.map((researcher) => ({
    slug: researcher.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const researcher = getResearcherBySlug(slug)

  if (!researcher) {
    return { title: "Researcher Not Found | AI Safety Connect" }
  }

  return {
    title: `${researcher.name} | AI Safety Connect`,
    description: researcher.bio,
  }
}

export default async function ResearcherPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const researcher = getResearcherBySlug(slug)

  if (!researcher) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ResearcherProfile researcher={researcher} />
      </main>
      <Footer />
    </div>
  )
}
