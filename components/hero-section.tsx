import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { NetworkVisualization } from "@/components/network-visualization"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Now mapping 50,000+ researchers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] text-balance">
              Bridge the gap in <span className="text-accent">AI Safety</span> research.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Connect academic researchers with the EA and LessWrong AI safety communities. Map researchers, projects,
              and topics to accelerate collaboration across previously disconnected ecosystems.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/researchers">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 w-full sm:w-auto"
                >
                  Explore the Network
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 border-border hover:bg-secondary bg-transparent w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Data Sources</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">150+</p>
                <p className="text-sm text-muted-foreground">Topics Mapped</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">Real-time</p>
                <p className="text-sm text-muted-foreground">Sync</p>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <NetworkVisualization />
          </div>
        </div>
      </div>
    </section>
  )
}
