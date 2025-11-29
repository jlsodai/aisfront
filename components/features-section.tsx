import { Users, Network, Search, GitMerge, BarChart3, Bell } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Network,
      title: "Research Network Mapping",
      description:
        "Visualize connections between researchers, institutions, and topics across academic and community ecosystems.",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description:
        "Find researchers and projects by topic, methodology, or research question using AI-powered semantic search.",
    },
    {
      icon: Users,
      title: "Collaboration Matching",
      description: "Discover potential collaborators based on complementary research interests and expertise gaps.",
    },
    {
      icon: GitMerge,
      title: "Cross-Platform Linking",
      description:
        "Automatically identify when the same researcher publishes across academic journals, LessWrong, and EA Forum.",
    },
    {
      icon: BarChart3,
      title: "Research Trend Analysis",
      description: "Track emerging topics, identify research gaps, and understand how ideas flow between communities.",
    },
    {
      icon: Bell,
      title: "Personalized Alerts",
      description:
        "Get notified when new research is published in your areas of interest or when potential collaborators emerge.",
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-3">Features</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Everything you need to bridge research communities
          </h2>
          <p className="mt-4 text-muted-foreground">
            Powerful tools to discover, connect, and collaborate across the AI safety research landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
