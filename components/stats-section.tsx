export function StatsSection() {
  const stats = [
    { value: "50,000+", label: "Researchers Indexed", source: "Academic Sources" },
    { value: "25,000+", label: "Posts Analyzed", source: "LessWrong" },
    { value: "15,000+", label: "Forum Entries", source: "EA Forum" },
    { value: "10,000+", label: "Connections Found", source: "Cross-platform" },
  ]

  return (
    <section className="py-20 border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <p className="text-3xl lg:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
