"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PaperCard } from "@/components/paper-card"
import { Pagination } from "@/components/pagination"
import { Search, Filter, LayoutGrid, List, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { papers, sourceLabels, allTopics } from "@/lib/papers-data"
import { Badge } from "@/components/ui/badge"

const years = ["All Years", "2024", "2023", "2022", "2021", "2020", "2019", "Before 2019"]
const ITEMS_PER_PAGE = 10

export function PapersDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSource, setSelectedSource] = useState<string>("all")
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics")
  const [selectedYear, setSelectedYear] = useState<string>("All Years")
  const [sortBy, setSortBy] = useState<string>("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isSemanticSearch, setIsSemanticSearch] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPapers = useMemo(() => {
    let filtered = papers

    // Text search (simulating semantic search with broader matching)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const queryWords = query.split(/\s+/).filter(Boolean)

      filtered = filtered.filter((p) => {
        const searchableText =
          `${p.title} ${p.abstract} ${p.topics.join(" ")} ${p.authors.map((a) => a.name).join(" ")}`.toLowerCase()

        if (isSemanticSearch) {
          // Semantic search: match any query word in any searchable field
          return queryWords.some(
            (word) =>
              searchableText.includes(word) ||
              // Also match related terms (basic synonym matching)
              (word === "interpretability" && searchableText.includes("interpret")) ||
              (word === "alignment" && searchableText.includes("align")) ||
              (word === "safety" && searchableText.includes("safe")) ||
              (word === "llm" && (searchableText.includes("language model") || searchableText.includes("gpt"))) ||
              (word === "rlhf" && searchableText.includes("human feedback")),
          )
        } else {
          // Exact search
          return searchableText.includes(query)
        }
      })

      // Sort by relevance score for search results
      if (isSemanticSearch) {
        filtered = [...filtered].sort((a, b) => {
          const aText = `${a.title} ${a.abstract}`.toLowerCase()
          const bText = `${b.title} ${b.abstract}`.toLowerCase()
          const aScore = queryWords.reduce((score, word) => {
            // Title matches count more
            if (a.title.toLowerCase().includes(word)) score += 3
            if (a.topics.some((t) => t.toLowerCase().includes(word))) score += 2
            if (aText.includes(word)) score += 1
            return score
          }, 0)
          const bScore = queryWords.reduce((score, word) => {
            if (b.title.toLowerCase().includes(word)) score += 3
            if (b.topics.some((t) => t.toLowerCase().includes(word))) score += 2
            if (bText.includes(word)) score += 1
            return score
          }, 0)
          return bScore - aScore
        })
      }
    }

    // Source filter
    if (selectedSource !== "all") {
      filtered = filtered.filter((p) => p.source === selectedSource)
    }

    // Topic filter
    if (selectedTopic !== "All Topics") {
      filtered = filtered.filter((p) => p.topics.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase())))
    }

    // Year filter
    if (selectedYear !== "All Years") {
      if (selectedYear === "Before 2019") {
        filtered = filtered.filter((p) => p.year < 2019)
      } else {
        filtered = filtered.filter((p) => p.year === Number.parseInt(selectedYear))
      }
    }

    // Sorting (only if not already sorted by search relevance)
    if (!searchQuery || !isSemanticSearch) {
      switch (sortBy) {
        case "citations":
          filtered = [...filtered].sort((a, b) => b.citations - a.citations)
          break
        case "year":
          filtered = [...filtered].sort((a, b) => b.year - a.year)
          break
        case "karma":
          filtered = [...filtered].sort((a, b) => (b.karma || 0) - (a.karma || 0))
          break
        case "title":
          filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
          break
        default:
          // Default: sort by year desc then citations
          filtered = [...filtered].sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year
            return b.citations - a.citations
          })
          break
      }
    }

    return filtered
  }, [searchQuery, selectedSource, selectedTopic, selectedYear, sortBy, isSemanticSearch])

  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedSource, selectedTopic, selectedYear, sortBy, isSemanticSearch])

  const totalPages = Math.ceil(filteredPapers.length / ITEMS_PER_PAGE)
  const paginatedPapers = filteredPapers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSource("all")
    setSelectedTopic("All Topics")
    setSelectedYear("All Years")
  }

  const hasActiveFilters =
    selectedSource !== "all" || selectedTopic !== "All Topics" || selectedYear !== "All Years" || searchQuery

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6">
          {/* Semantic Search Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Semantic Search</span>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs ${isSemanticSearch ? "text-accent" : "text-muted-foreground"}`}
                onClick={() => setIsSemanticSearch(!isSemanticSearch)}
              >
                {isSemanticSearch ? "On" : "Off"}
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={
                  isSemanticSearch
                    ? "Search by concept, research question, or topic... (e.g., 'how do we ensure AI systems are honest?')"
                    : "Search by exact terms..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border h-12 text-base"
              />
            </div>
            {isSemanticSearch && (
              <p className="text-xs text-muted-foreground">
                Semantic search finds papers by meaning, not just exact keyword matches. Try asking questions or
                describing concepts.
              </p>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Source Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSource === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSource("all")}
                className={selectedSource === "all" ? "bg-foreground text-background" : ""}
              >
                All Sources
              </Button>
              {Object.entries(sourceLabels).map(([key, { label }]) => (
                <Button
                  key={key}
                  variant={selectedSource === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSource(key)}
                  className={selectedSource === key ? "bg-foreground text-background" : ""}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="flex gap-3 sm:ml-auto flex-wrap">
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-[200px] bg-secondary border-border">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="All Topics">All Topics</SelectItem>
                  {allTopics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px] bg-secondary border-border">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
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
                  <SelectItem value="citations">Citations</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="karma">Karma</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "list" ? "bg-secondary" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "grid" ? "bg-secondary" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
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
              {selectedYear !== "All Years" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedYear}
                  <button onClick={() => setSelectedYear("All Years")} className="ml-1 hover:text-foreground">
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
          Showing <span className="text-foreground font-medium">{filteredPapers.length}</span> papers
          {searchQuery && isSemanticSearch && " (sorted by relevance)"}
        </p>
      </div>

      {paginatedPapers.length > 0 ? (
        <>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
            {paginatedPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} viewMode={viewMode} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredPapers.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No papers found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search query or filters</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
