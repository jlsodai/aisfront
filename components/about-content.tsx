import { Target, Users, Lightbulb, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutContent() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] text-balance">
            Unifying the AI Safety Research Landscape
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            AI Safety Connect was founded with a simple observation: brilliant minds working on AI safety are scattered
            across academia, the Effective Altruism community, and the rationalist sphere. Despite shared goals, these
            communities often work in isolation, missing opportunities for collaboration and cross-pollination of ideas.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-6">
              <Target className="h-4 w-4 text-accent" />
              Our Mission
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Accelerating AI Safety Through Connection</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We believe that the path to beneficial AI requires the collective wisdom of researchers from diverse
              backgrounds. Academic rigor, EA's focus on impact, and LessWrong's epistemic culture each bring unique
              strengths to the table.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By mapping the landscape of AI safety research, we make it easier for researchers to find collaborators,
              discover relevant work, and build on each other's insights rather than duplicating efforts in isolation.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Connect Communities</h3>
              <p className="text-muted-foreground text-sm">
                Break down silos between academic institutions, EA organizations, and the rationalist community.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Surface Insights</h3>
              <p className="text-muted-foreground text-sm">
                Make it easy to discover relevant research, regardless of where it was published.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Enable Collaboration</h3>
              <p className="text-muted-foreground text-sm">
                Facilitate meaningful partnerships that accelerate progress on AI safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">The Problem We're Solving</h2>
          <p className="text-muted-foreground leading-relaxed">
            AI safety research is fragmented across different platforms, publication venues, and communities with
            distinct cultures and terminologies.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground mb-2">70%</div>
            <p className="text-muted-foreground">
              of researchers report difficulty finding relevant work outside their primary community
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground mb-2">3x</div>
            <p className="text-muted-foreground">duplication rate for foundational concepts across communities</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground mb-2">18mo</div>
            <p className="text-muted-foreground">average delay for ideas to cross community boundaries</p>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Data Sources</h2>
          <p className="text-muted-foreground leading-relaxed">
            We aggregate and index content from three primary ecosystems, each with its own strengths.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-card border border-border">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
              <span className="text-blue-400 font-bold text-lg">A</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Academic Sources</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Papers from arXiv, top ML conferences (NeurIPS, ICML, ICLR), and AI safety-focused journals. Rigorous peer
              review and formal methodology.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                35,000+ papers indexed
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Real-time arXiv sync
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Citation network analysis
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-xl bg-card border border-border">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
              <span className="text-emerald-400 font-bold text-lg">EA</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">EA Forum</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Posts from the Effective Altruism Forum, focused on impact-driven approaches to AI safety and practical
              interventions.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                8,000+ posts indexed
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Karma-weighted relevance
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Organization mapping
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-xl bg-card border border-border">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6">
              <span className="text-orange-400 font-bold text-lg">LW</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">LessWrong</h3>
            <p className="text-muted-foreground text-sm mb-4">
              The rationalist community's intellectual home, with deep dives into alignment theory, decision theory, and
              AI risk scenarios.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                12,000+ posts indexed
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Sequence tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Concept graph building
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Built by Researchers, for Researchers</h2>
          <p className="text-muted-foreground leading-relaxed">
            AI Safety Connect is developed by a team with roots in both academic AI research and the EA/rationalist
            communities. We understand the challenges of navigating this landscape firsthand.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/researchers">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8">
              Explore the Network
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
