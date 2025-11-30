import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  MessageSquare,
  Award,
  ExternalLink,
  Globe,
  ArrowLeft,
  BookOpen,
  Users,
  TrendingUp,
} from "lucide-react"
import { type Researcher, communityLabels, getResearcherById } from "@/lib/researchers-data"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  )
}

interface ResearcherProfileProps {
  researcher: Researcher
}

export function ResearcherProfile({ researcher }: ResearcherProfileProps) {
  const collaborators = researcher.collaborators
    ?.map((id) => getResearcherById(id))
    .filter((r): r is Researcher => r !== undefined)

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      {/* Back Navigation */}
      <Link
        href="/researchers"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Directory
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={researcher.avatar || "/placeholder.svg"}
                    alt={researcher.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover ring-4 ring-border"
                  />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-1">{researcher.name}</h1>
                <p className="text-muted-foreground mb-4">{researcher.affiliation}</p>

                {/* Community Badges */}
                <div className="flex gap-2 flex-wrap justify-center mb-6">
                  {researcher.communities.map((community) => (
                    <Badge key={community} variant="outline" className={communityLabels[community]?.color}>
                      {communityLabels[community]?.label}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 w-full border-t border-border pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{researcher.papers}</div>
                    <div className="text-xs text-muted-foreground">Papers</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{researcher.posts}</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{researcher.hIndex}</div>
                    <div className="text-xs text-muted-foreground">h-index</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {researcher.website && (
                <a
                  href={researcher.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                >
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Website</span>
                  <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                </a>
              )}
              {researcher.twitter && (
                <a
                  href={`https://twitter.com/${researcher.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                >
                  <XIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">@{researcher.twitter}</span>
                  <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                </a>
              )}
              {researcher.googleScholar && (
                <a
                  href={`https://scholar.google.com/citations?user=${researcher.googleScholar}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                >
                  <GoogleScholarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Google Scholar</span>
                  <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                </a>
              )}
            </CardContent>
          </Card>

          {/* Research Topics */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Research Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {researcher.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collaborators */}
          {collaborators && collaborators.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Frequent Collaborators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {collaborators.map((collab) => (
                  <Link
                    key={collab.id}
                    href={`/researchers/${collab.slug}`}
                    className="flex items-center gap-3 hover:bg-secondary/50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                  >
                    <Image
                      src={collab.avatar || "/placeholder.svg"}
                      alt={collab.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-foreground truncate">{collab.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{collab.affiliation}</div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{researcher.fullBio || researcher.bio}</p>
            </CardContent>
          </Card>

          {/* Publications & Posts Tabs */}
          <Tabs defaultValue="publications" className="w-full">
            <TabsList className="w-full justify-start bg-secondary/50 p-1">
              <TabsTrigger value="publications" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Publications
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Community Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="publications" className="mt-6">
              {researcher.publications && researcher.publications.length > 0 ? (
                <div className="space-y-4">
                  {researcher.publications.map((pub) => (
                    <Card key={pub.id} className="bg-card border-border hover:border-accent/50 transition-colors">
                      <CardContent className="p-6">
                        <h3 className="text-foreground font-medium mb-2 leading-snug">{pub.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <span>{pub.venue}</span>
                          <span>{pub.year}</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {pub.citations.toLocaleString()} citations
                          </span>
                        </div>
                        {pub.coauthors.length > 0 && (
                          <p className="text-sm text-muted-foreground mt-2">Co-authors: {pub.coauthors.join(", ")}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Publications
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="py-12 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No publications available yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              {researcher.recentPosts && researcher.recentPosts.length > 0 ? (
                <div className="space-y-4">
                  {researcher.recentPosts.map((post) => (
                    <Card key={post.id} className="bg-card border-border hover:border-accent/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-foreground font-medium mb-2 leading-snug">{post.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                              <Badge
                                variant="outline"
                                className={
                                  post.platform === "lesswrong"
                                    ? communityLabels.lesswrong.color
                                    : communityLabels.ea.color
                                }
                              >
                                {post.platform === "lesswrong" ? "LessWrong" : "EA Forum"}
                              </Badge>
                              <span>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {post.karma} karma
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {post.comments} comments
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Posts
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No community posts available yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
