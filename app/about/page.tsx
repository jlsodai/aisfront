import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"

export const metadata = {
  title: "About | AI Safety Connect",
  description: "Learn about our mission to bridge AI safety research communities",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </div>
  )
}
