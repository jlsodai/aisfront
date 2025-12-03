"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Building2,
  MapPin,
  Globe,
  Twitter,
  Github,
  Linkedin,
  GraduationCap,
  X,
  Plus,
  Save,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  full_bio: string | null
  affiliation: string | null
  position: string | null
  location: string | null
  website: string | null
  twitter: string | null
  github: string | null
  linkedin: string | null
  google_scholar: string | null
  orcid: string | null
  communities: string[]
  research_topics: string[]
  is_public: boolean
  created_at: string
  updated_at: string
}

interface ProfileEditorProps {
  user: SupabaseUser
  initialProfile: Profile | null
}

const AVAILABLE_COMMUNITIES = ["Academic", "EA Forum", "LessWrong"]

const SUGGESTED_TOPICS = [
  "AI Alignment",
  "AI Safety",
  "Machine Learning",
  "Interpretability",
  "Reinforcement Learning",
  "Natural Language Processing",
  "AI Governance",
  "AI Ethics",
  "Existential Risk",
  "Technical AI Safety",
  "AI Policy",
  "Robustness",
  "Value Learning",
  "Agent Foundations",
  "Decision Theory",
  "Game Theory",
  "Cognitive Science",
  "Rationality",
]

export function ProfileEditor({ user, initialProfile }: ProfileEditorProps) {
  const [profile, setProfile] = useState<Partial<Profile>>({
    full_name: initialProfile?.full_name || user.user_metadata?.full_name || "",
    display_name: initialProfile?.display_name || "",
    avatar_url: initialProfile?.avatar_url || user.user_metadata?.avatar_url || "",
    bio: initialProfile?.bio || "",
    full_bio: initialProfile?.full_bio || "",
    affiliation: initialProfile?.affiliation || "",
    position: initialProfile?.position || "",
    location: initialProfile?.location || "",
    website: initialProfile?.website || "",
    twitter: initialProfile?.twitter || "",
    github: initialProfile?.github || "",
    linkedin: initialProfile?.linkedin || "",
    google_scholar: initialProfile?.google_scholar || "",
    orcid: initialProfile?.orcid || "",
    communities: initialProfile?.communities || [],
    research_topics: initialProfile?.research_topics || [],
    is_public: initialProfile?.is_public || false,
  })

  const [newTopic, setNewTopic] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const supabase = createClient()

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")
    setErrorMessage("")

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        ...profile,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("Error saving profile:", error)
      setSaveStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to save profile")
    } finally {
      setIsSaving(false)
    }
  }

  const toggleCommunity = (community: string) => {
    setProfile((prev) => ({
      ...prev,
      communities: prev.communities?.includes(community)
        ? prev.communities.filter((c) => c !== community)
        : [...(prev.communities || []), community],
    }))
  }

  const addTopic = (topic: string) => {
    if (topic && !profile.research_topics?.includes(topic)) {
      setProfile((prev) => ({
        ...prev,
        research_topics: [...(prev.research_topics || []), topic],
      }))
    }
    setNewTopic("")
  }

  const removeTopic = (topic: string) => {
    setProfile((prev) => ({
      ...prev,
      research_topics: prev.research_topics?.filter((t) => t !== topic) || [],
    }))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your researcher profile</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === "success" && (
            <span className="flex items-center gap-1 text-sm text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              Saved
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-1 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {errorMessage}
            </span>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Your avatar displayed across the platform</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || "Profile"} />
                <AvatarFallback className="text-2xl bg-accent/20 text-accent">
                  {getInitials(profile.full_name || user.email || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={profile.avatar_url || ""}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL to your profile picture, or leave blank to use initials
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic information about you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full_name">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={profile.full_name || ""}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    value={profile.display_name || ""}
                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                    placeholder="johndoe"
                  />
                  <p className="text-xs text-muted-foreground">Optional alternative name</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="affiliation">
                    <Building2 className="h-4 w-4 inline mr-2" />
                    Affiliation
                  </Label>
                  <Input
                    id="affiliation"
                    value={profile.affiliation || ""}
                    onChange={(e) => setProfile({ ...profile, affiliation: e.target.value })}
                    placeholder="MIT, OpenAI, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={profile.position || ""}
                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    placeholder="Research Scientist, PhD Student, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="A brief description of yourself and your work (1-2 sentences)"
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">{profile.bio?.length || 0}/200 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_bio">Full Bio</Label>
                <Textarea
                  id="full_bio"
                  value={profile.full_bio || ""}
                  onChange={(e) => setProfile({ ...profile, full_bio: e.target.value })}
                  placeholder="A more detailed description of your background, research interests, and work..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Community Affiliations</CardTitle>
              <CardDescription>Select the communities you are active in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {AVAILABLE_COMMUNITIES.map((community) => {
                  const isSelected = profile.communities?.includes(community)
                  return (
                    <button
                      key={community}
                      onClick={() => toggleCommunity(community)}
                      className={`px-4 py-2 rounded-full border transition-colors ${
                        isSelected
                          ? community === "Academic"
                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                            : community === "EA Forum"
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                              : "bg-purple-500/20 border-purple-500 text-purple-400"
                          : "bg-secondary border-border text-muted-foreground hover:border-accent"
                      }`}
                    >
                      {community}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Research Topics</CardTitle>
              <CardDescription>Add topics that describe your research interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Topics */}
              <div className="flex flex-wrap gap-2">
                {profile.research_topics?.map((topic) => (
                  <Badge key={topic} variant="secondary" className="bg-accent/10 text-accent border-accent/30 pr-1">
                    {topic}
                    <button onClick={() => removeTopic(topic)} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(!profile.research_topics || profile.research_topics.length === 0) && (
                  <span className="text-muted-foreground text-sm">No topics added yet</span>
                )}
              </div>

              {/* Add New Topic */}
              <div className="flex gap-2">
                <Input
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Add a research topic..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTopic(newTopic)
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={() => addTopic(newTopic)} disabled={!newTopic}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Suggested Topics */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Suggested topics:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TOPICS.filter((t) => !profile.research_topics?.includes(t))
                    .slice(0, 12)
                    .map((topic) => (
                      <button
                        key={topic}
                        onClick={() => addTopic(topic)}
                        className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                      >
                        + {topic}
                      </button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Links Tab */}
        <TabsContent value="links" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Add links to your profiles on other platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">
                    <Globe className="h-4 w-4 inline mr-2" />
                    Personal Website
                  </Label>
                  <Input
                    id="website"
                    value={profile.website || ""}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://yoursite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">
                    <Twitter className="h-4 w-4 inline mr-2" />
                    Twitter / X
                  </Label>
                  <Input
                    id="twitter"
                    value={profile.twitter || ""}
                    onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                    placeholder="@username"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="github">
                    <Github className="h-4 w-4 inline mr-2" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={profile.github || ""}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">
                    <Linkedin className="h-4 w-4 inline mr-2" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin || ""}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    placeholder="in/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Academic Links</CardTitle>
              <CardDescription>Link to your academic profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="google_scholar">
                    <GraduationCap className="h-4 w-4 inline mr-2" />
                    Google Scholar
                  </Label>
                  <Input
                    id="google_scholar"
                    value={profile.google_scholar || ""}
                    onChange={(e) => setProfile({ ...profile, google_scholar: e.target.value })}
                    placeholder="https://scholar.google.com/citations?user=..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orcid">ORCID</Label>
                  <Input
                    id="orcid"
                    value={profile.orcid || ""}
                    onChange={(e) => setProfile({ ...profile, orcid: e.target.value })}
                    placeholder="0000-0000-0000-0000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Profile Visibility</CardTitle>
              <CardDescription>Control who can see your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    {profile.is_public ? (
                      <Eye className="h-4 w-4 text-accent" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Label>Public Profile</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {profile.is_public
                      ? "Your profile is visible in the researchers directory"
                      : "Your profile is only visible to you"}
                  </p>
                </div>
                <Switch
                  checked={profile.is_public}
                  onCheckedChange={(checked) => setProfile({ ...profile, is_public: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details (read-only)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Auth Provider</span>
                <span className="font-medium capitalize">{user.app_metadata?.provider || "Email"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-medium font-mono text-xs">{user.id}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
