import { ExternalLink } from "lucide-react"

export function DataSourcesSection() {
  const sources = [
    {
      name: "Academic Sources",
      description:
        "Aggregating from Semantic Scholar, arXiv, and institutional repositories to capture peer-reviewed AI safety research.",
      stats: "50,000+ papers",
      color: "bg-[#64b4c8]",
    },
    {
      name: "LessWrong",
      description:
        "Indexing posts, sequences, and discussions from the rationalist community's primary hub for AI alignment thinking.",
      stats: "25,000+ posts",
      color: "bg-[#78c8a0]",
    },
    {
      name: "EA Forum",
      description:
        "Capturing research, career advice, and organizational updates from the effective altruism community.",
      stats: "15,000+ entries",
      color: "bg-[#c8a078]",
    },
  ]

  return (
    <section id="sources" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-3">Data Sources</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Unified view across three ecosystems
          </h2>
          <p className="mt-4 text-muted-foreground">
            We aggregate and normalize data from the key platforms where AI safety research happens.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {sources.map((source, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl border border-border bg-card p-8">
              <div className={`absolute top-0 left-0 right-0 h-1 ${source.color}`} />
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">{source.name}</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{source.description}</p>
              <div className="pt-4 border-t border-border">
                <p className="text-2xl font-bold text-foreground">{source.stats}</p>
                <p className="text-xs text-muted-foreground">indexed and growing</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
