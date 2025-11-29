import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Quote, MessageSquare, ArrowUp, Calendar, Users } from "lucide-react"
import { type Paper, sourceLabels } from "@/lib/papers-data"

interface PaperCardProps {
  paper: Paper
  viewMode: "grid" | "list"
}

export function PaperCard({ paper, viewMode }: PaperCardProps) {
  const sourceStyle = sourceLabels[paper.source] || sourceLabels.academic

  if (viewMode === "list") {
    return (
      <article className="group rounded-xl border border-border bg-card p-6 hover:border-accent/50 transition-all">
        <div className="flex flex-col gap-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="outline" className={`${sourceStyle.color} border text-xs`}>
                  {sourceStyle.label}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {paper.year}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{paper.venue}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                {paper.title}
              </h3>
            </div>
            {paper.url && (
              <Button variant="ghost" size="icon" asChild className="shrink-0">
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Authors */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-x-1">
              {paper.authors.map((author, idx) => (
                <span key={author.name}>
                  {author.slug ? (
                    <Link href={`/researchers/${author.slug}`} className="text-accent hover:underline">
                      {author.name}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{author.name}</span>
                  )}
                  {idx < paper.authors.length - 1 && <span className="text-muted-foreground">,</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract */}
          <p className="text-sm text-muted-foreground line-clamp-2">{paper.abstract}</p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex flex-wrap gap-1.5">
              {paper.topics.slice(0, 4).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {paper.topics.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{paper.topics.length - 4}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Quote className="h-3.5 w-3.5" />
                {paper.citations.toLocaleString()}
              </span>
              {paper.karma && (
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3.5 w-3.5" />
                  {paper.karma.toLocaleString()}
                </span>
              )}
              {paper.comments && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {paper.comments}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Grid view
  return (
    <article className="group rounded-xl border border-border bg-card p-5 hover:border-accent/50 transition-all flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant="outline" className={`${sourceStyle.color} border text-xs`}>
          {sourceStyle.label}
        </Badge>
        <span className="text-xs text-muted-foreground">{paper.year}</span>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground truncate">{paper.venue}</span>
      </div>

      <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-3 mb-2">
        {paper.title}
      </h3>

      <div className="text-xs text-muted-foreground mb-3 line-clamp-1">
        {paper.authors.map((a) => a.name).join(", ")}
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{paper.abstract}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {paper.topics.slice(0, 3).map((topic) => (
          <Badge key={topic} variant="secondary" className="text-xs">
            {topic}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Quote className="h-3 w-3" />
            {paper.citations.toLocaleString()}
          </span>
          {paper.karma && (
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              {paper.karma.toLocaleString()}
            </span>
          )}
        </div>
        {paper.url && (
          <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              <FileText className="h-3 w-3 mr-1" />
              Read
            </a>
          </Button>
        )}
      </div>
    </article>
  )
}
