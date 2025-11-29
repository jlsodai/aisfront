export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Aggregate",
      description:
        "We continuously collect and index research from academic databases, LessWrong, and EA Forum using ethical scraping and API integrations.",
    },
    {
      number: "02",
      title: "Analyze",
      description:
        "Our AI models extract topics, methodologies, and research questions, then identify connections between researchers and ideas across platforms.",
    },
    {
      number: "03",
      title: "Connect",
      description:
        "Browse the unified research graph, discover collaborators, and find where your expertise can have the most impact in AI safety.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-3">How It Works</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">From fragmented to connected</h2>
          <p className="mt-4 text-muted-foreground">Three steps to unify the AI safety research landscape.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="mb-6">
                <span className="text-6xl font-bold text-border">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-16 border-t border-dashed border-border translate-x-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
