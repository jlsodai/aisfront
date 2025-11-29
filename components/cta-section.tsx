import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 lg:p-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Ready to accelerate AI safety research?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join researchers from leading institutions and community organizations who are already using AI Safety Connect
              to find collaborators and track the field.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8">
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-border hover:bg-secondary bg-transparent">
                Schedule a Demo
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Free for individual researchers. Organization plans available.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
