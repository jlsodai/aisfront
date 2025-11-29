import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MessageSquare, ExternalLink, Award } from "lucide-react"

interface Researcher {
  id: number
  slug: string
  name: string
  avatar: string
  affiliation: string
  communities: string[]
  topics: string[]
  papers: number
  posts: number
  hIndex: number
  bio: string
}

interface CommunityLabel {
  label: string
  color: string
}

interface ResearcherCardProps {
  researcher: Researcher
  viewMode: "grid" | "list"
  communityLabels: Record<string, CommunityLabel>
}

export function ResearcherCard({ researcher, viewMode, communityLabels }: ResearcherCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="bg-card border-border hover:border-accent/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={researcher.avatar || "/placeholder.svg"}
                alt={researcher.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{researcher.name}</h3>
                  <p className="text-sm text-muted-foreground">{researcher.affiliation}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {researcher.communities.map((community) => (
                    <Badge key={community} variant="outline" className={`text-xs ${communityLabels[community]?.color}`}>
                      {communityLabels[community]?.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{researcher.bio}</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="text-foreground font-medium">{researcher.papers}</span> papers
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-foreground font-medium">{researcher.posts}</span> posts
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    h-index: <span className="text-foreground font-medium">{researcher.hIndex}</span>
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {researcher.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex sm:flex-col gap-2 sm:justify-start">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent" asChild>
                <Link href={`/researchers/${researcher.slug}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Profile
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5 group">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-4">
            <Image
              src={researcher.avatar || "/placeholder.svg"}
              alt={researcher.name}
              width={96}
              height={96}
              className="rounded-full object-cover ring-2 ring-border group-hover:ring-accent/50 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 flex gap-0.5">
              {researcher.communities.slice(0, 2).map((community) => (
                <div
                  key={community}
                  className={`w-5 h-5 rounded-full border-2 border-card flex items-center justify-center text-[8px] font-bold ${
                    community === "academic"
                      ? "bg-chart-1 text-background"
                      : community === "ea"
                        ? "bg-chart-3 text-background"
                        : "bg-chart-2 text-background"
                  }`}
                  title={communityLabels[community]?.label}
                >
                  {communityLabels[community]?.label[0]}
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{researcher.name}</h3>
          <p className="text-sm text-muted-foreground">{researcher.affiliation}</p>
        </div>

        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {researcher.communities.map((community) => (
            <Badge key={community} variant="outline" className={`text-xs ${communityLabels[community]?.color}`}>
              {communityLabels[community]?.label}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">{researcher.bio}</p>

        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {researcher.topics.slice(0, 2).map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
          {researcher.topics.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{researcher.topics.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex justify-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span className="text-foreground font-medium">{researcher.papers}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span className="text-foreground font-medium">{researcher.posts}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4" />
            <span className="text-foreground font-medium">{researcher.hIndex}</span>
          </span>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4 group-hover:border-accent/50 bg-transparent" asChild>
          <Link href={`/researchers/${researcher.slug}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
