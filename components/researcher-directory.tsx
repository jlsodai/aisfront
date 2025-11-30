"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResearcherCard } from "@/components/researcher-card"
import { Pagination } from "@/components/pagination"
import { Search, Filter, LayoutGrid, List } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { communityLabels } from "@/lib/researchers-data"
import { researchers } from "@/lib/fictional-researchers-data"

const topics = [
  "All Topics",
  "Interpretability",
  "AI Alignment",
  "RLHF",
  "AI Governance",
  "Deep Learning",
  "Mechanistic Interpretability",
  "Decision Theory",
  "Value Alignment",
  "AI Risk",
]

const ITEMS_PER_PAGE = 9

export function ResearcherDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all")
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics")
  const [sortBy, setSortBy] = useState<string>("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredResearchers = useMemo(() => {
    let filtered = researchers

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.affiliation.toLowerCase().includes(query) ||
          r.topics.some((t) => t.toLowerCase().includes(query)) ||
          r.bio.toLowerCase().includes(query),
      )
    }

    if (selectedCommunity !== "all") {
      filtered = filtered.filter((r) => r.communities.includes(selectedCommunity))
    }

    if (selectedTopic !== "All Topics") {
      filtered = filtered.filter((r) => r.topics.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase())))
    }

    switch (sortBy) {
      case "papers":
        filtered = [...filtered].sort((a, b) => b.papers - a.papers)
        break
      case "posts":
        filtered = [...filtered].sort((a, b) => b.posts - a.posts)
        break
      case "hindex":
        filtered = [...filtered].sort((a, b) => b.hIndex - a.hIndex)
        break
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCommunity, selectedTopic, sortBy])

  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCommunity, selectedTopic, sortBy])

  const totalPages = Math.ceil(filteredResearchers.length / ITEMS_PER_PAGE)
  const paginatedResearchers = filteredResearchers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, affiliation, or research topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCommunity === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCommunity("all")}
                className={selectedCommunity === "all" ? "bg-foreground text-background" : ""}
              >
                All Communities
              </Button>
              {Object.entries(communityLabels).map(([key, { label }]) => (
                <Button
                  key={key}
                  variant={selectedCommunity === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCommunity(key)}
                  className={selectedCommunity === key ? "bg-foreground text-background" : ""}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex gap-4 sm:ml-auto">
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-[180px] bg-secondary border-border">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] bg-secondary border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="papers">Papers</SelectItem>
                  <SelectItem value="posts">Posts</SelectItem>
                  <SelectItem value="hindex">H-Index</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "grid" ? "bg-secondary" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "list" ? "bg-secondary" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filteredResearchers.length}</span> researchers
        </p>
        {(selectedCommunity !== "all" || selectedTopic !== "All Topics" || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setSelectedCommunity("all")
              setSelectedTopic("All Topics")
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {paginatedResearchers.length > 0 ? (
        <>
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
            }
          >
            {paginatedResearchers.map((researcher) => (
              <ResearcherCard
                key={researcher.id}
                researcher={researcher}
                viewMode={viewMode}
                communityLabels={communityLabels}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredResearchers.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No researchers found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
