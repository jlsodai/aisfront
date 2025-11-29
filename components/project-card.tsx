"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, Building2, FileText, MessageSquare, Wrench, ExternalLink, Users } from "lucide-react"
import { statusLabels, sourceLabels, type Project } from "@/lib/projects-data"

interface ProjectCardProps {
  project: Project
  viewMode: "grid" | "list"
}

export function ProjectCard({ project, viewMode }: ProjectCardProps) {
  const statusStyle = statusLabels[project.status]
  const sourceStyle = sourceLabels[project.source]

  if (viewMode === "list") {
    return (
      <Card className="bg-card border-border hover:border-accent/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className={statusStyle.color}>
                  {statusStyle.label}
                </Badge>
                <Badge variant="outline" className={sourceStyle.color}>
                  {sourceStyle.label}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 text-balance">{project.title}</h3>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.leads.map((l) => l.name).join(", ")}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {project.organizations.join(", ")}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.startDate}
                  {project.endDate && ` - ${project.endDate}`}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.topics.slice(0, 4).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {project.topics.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.topics.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-2 text-sm">
              {project.outputs && (
                <div className="flex lg:flex-col gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {project.outputs.papers} papers
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {project.outputs.posts} posts
                  </span>
                  <span className="flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    {project.outputs.tools} tools
                  </span>
                </div>
              )}
              {Object.values(project.links).some(Boolean) && (
                <div className="flex gap-2">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border hover:border-accent/50 transition-colors h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className={statusStyle.color}>
            {statusStyle.label}
          </Badge>
          <Badge variant="outline" className={sourceStyle.color}>
            {sourceStyle.label}
          </Badge>
        </div>
        <h3 className="text-base font-semibold text-foreground leading-tight text-balance">{project.title}</h3>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

        <div className="space-y-2 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{project.leads.map((l) => l.name).join(", ")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{project.organizations.join(", ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
          {project.topics.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.topics.length - 3}
            </Badge>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          {project.outputs && (
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {project.outputs.papers}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {project.outputs.posts}
              </span>
              <span className="flex items-center gap-1">
                <Wrench className="h-3 w-3" />
                {project.outputs.tools}
              </span>
            </div>
          )}
          {Object.values(project.links).some(Boolean) && (
            <div className="flex gap-2">
              {project.links.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
