"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Pagination } from "@/components/pagination"
import { Search, Filter, LayoutGrid, List } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { projects, statusLabels, sourceLabels, allProjectTopics } from "@/lib/projects-data"

const ITEMS_PER_PAGE = 9

export function ProjectsDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedSource, setSelectedSource] = useState<string>("all")
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics")
  const [sortBy, setSortBy] = useState<string>("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects = useMemo(() => {
    let filtered = projects

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.topics.some((t) => t.toLowerCase().includes(query)) ||
          p.leads.some((l) => l.name.toLowerCase().includes(query)) ||
          p.organizations.some((o) => o.toLowerCase().includes(query)),
      )
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((p) => p.status === selectedStatus)
    }

    if (selectedSource !== "all") {
      filtered = filtered.filter((p) => p.source === selectedSource)
    }

    if (selectedTopic !== "All Topics") {
      filtered = filtered.filter((p) => p.topics.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase())))
    }

    switch (sortBy) {
      case "newest":
        filtered = [...filtered].sort((a, b) => b.startDate.localeCompare(a.startDate))
        break
      case "papers":
        filtered = [...filtered].sort((a, b) => (b.outputs?.papers || 0) - (a.outputs?.papers || 0))
        break
      case "title":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedStatus, selectedSource, selectedTopic, sortBy])

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedStatus, selectedSource, selectedTopic, sortBy])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedStatus("all")
    setSelectedSource("all")
    setSelectedTopic("All Topics")
  }

  const hasActiveFilters =
    selectedStatus !== "all" || selectedSource !== "all" || selectedTopic !== "All Topics" || searchQuery

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, description, lead, or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border h-12 text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
                className={selectedStatus === "all" ? "bg-foreground text-background" : ""}
              >
                All Status
              </Button>
              {Object.entries(statusLabels).map(([key, { label }]) => (
                <Button
                  key={key}
                  variant={selectedStatus === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(key)}
                  className={selectedStatus === key ? "bg-foreground text-background" : ""}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex gap-3 sm:ml-auto flex-wrap">
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-[150px] bg-secondary border-border">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {Object.entries(sourceLabels).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-[180px] bg-secondary border-border">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="All Topics">All Topics</SelectItem>
                  {allProjectTopics.map((topic) => (
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
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="papers">Most Papers</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
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

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchQuery.slice(0, 20)}
                  {searchQuery.length > 20 ? "..." : ""}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-foreground">
                    ×
                  </button>
                </Badge>
              )}
              {selectedStatus !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {statusLabels[selectedStatus]?.label}
                  <button onClick={() => setSelectedStatus("all")} className="ml-1 hover:text-foreground">
                    ×
                  </button>
                </Badge>
              )}
              {selectedSource !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {sourceLabels[selectedSource]?.label}
                  <button onClick={() => setSelectedSource("all")} className="ml-1 hover:text-foreground">
                    ×
                  </button>
                </Badge>
              )}
              {selectedTopic !== "All Topics" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedTopic}
                  <button onClick={() => setSelectedTopic("All Topics")} className="ml-1 hover:text-foreground">
                    ×
                  </button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-6">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filteredProjects.length}</span> projects
        </p>
      </div>

      {/* Results */}
      {paginatedProjects.length > 0 ? (
        <>
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
            }
          >
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} viewMode={viewMode} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredProjects.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search query or filters</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
