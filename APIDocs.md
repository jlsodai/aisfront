# AI Safety Connect — API Documentation (v1.0)

**Last Updated:** 2025-11-30  
**Backend:** Python (FastAPI)  
**Base URL:** `https://api.aisafetyconnect.com/v1`  
**Style:** RESTful, resource-oriented API with advanced semantic search capabilities

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication](#2-authentication)
3. [Response Format](#3-response-format)
4. [Common Parameters](#4-common-parameters)
5. [Error Handling](#5-error-handling)
6. [Data Models](#6-data-models)
7. [Authors API](#7-authors-api)
8. [Papers API](#8-papers-api)
9. [Projects API](#9-projects-api)
10. [Static Options API](#10-static-options-api)
11. [Global Search API](#11-global-search-api)
12. [Recommended Additional Endpoints](#12-recommended-additional-endpoints)
13. [Rate Limiting](#13-rate-limiting)
14. [Pagination Best Practices](#14-pagination-best-practices)

---

## 1. Overview

AI Safety Connect provides a comprehensive API for exploring the AI Safety ecosystem, including **Authors**, **Papers**, and **Projects**. The API supports:

- Simple keyword search via GET endpoints
- Advanced semantic search via POST endpoints
- Rich filtering and sorting capabilities
- Pagination for large datasets
- Static option endpoints for metadata

### Key Features

- **Semantic Search**: POST endpoints support advanced semantic search powered by embeddings
- **Flexible Filtering**: Filter by communities, topics, sources, status, and more
- **Multiple Sort Options**: Sort by relevance, citations, dates, karma, and other metrics
- **Pagination**: Efficient pagination for browsing large result sets
- **Cross-References**: Rich linking between authors, papers, and projects

---

## 2. Authentication

Most endpoints are **public** and require no authentication. Authentication is only required for future personalization features and write operations.

### Public Endpoints (No Auth Required)
- All GET endpoints
- All POST search endpoints
- Static option endpoints

### Protected Endpoints (Auth Required)
- User profile endpoints (future)
- Bookmarks and favorites (future)
- Personalized recommendations (future)

### Authentication Header
```http
Authorization: Bearer <your_api_token>
```

**Example:**
```bash
curl -H "Authorization: Bearer sk_live_abc123..." \
  https://api.aisafetyconnect.com/v1/authors
```

---

## 3. Response Format

All API responses follow a consistent envelope structure to distinguish between successful responses and errors.

### Success Response

```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 150,
    "page": 1,
    "limit": 10,
    "hasMore": true
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2025-11-30T18:25:07Z",
    "version": "1.0"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'limit' parameter must be between 1 and 100",
    "details": {
      "parameter": "limit",
      "provided": 150,
      "max": 100
    }
  },
  "meta": {
    "requestId": "req_xyz789",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

## 4. Common Parameters

These parameters are available across multiple endpoints:

| Parameter | Type      | Description                   | Default     | Max   |
| --------- | --------- | ----------------------------- | ----------- | ----- |
| `q`       | `string`  | Simple keyword search         | -           | -     |
| `page`    | `integer` | Page number (1-indexed)       | `1`         | -     |
| `limit`   | `integer` | Items per page                | `10`        | `100` |
| `sort`    | `string`  | Sort key (varies by resource) | `relevance` | -     |

---

## 5. Error Handling

### Common Error Codes

| Code                  | HTTP Status | Description                   |
| --------------------- | ----------- | ----------------------------- |
| `INVALID_PARAMETER`   | 400         | Invalid query parameter value |
| `MISSING_PARAMETER`   | 400         | Required parameter is missing |
| `NOT_FOUND`           | 404         | Resource not found            |
| `RATE_LIMIT_EXCEEDED` | 429         | Too many requests             |
| `INTERNAL_ERROR`      | 500         | Internal server error         |
| `UNAUTHORIZED`        | 401         | Authentication required       |
| `FORBIDDEN`           | 403         | Insufficient permissions      |

### Error Response Examples

**Invalid Parameter:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid sort parameter 'invalid_sort'. Valid options: relevance, name, papers, hindex",
    "details": {
      "parameter": "sort",
      "provided": "invalid_sort",
      "validOptions": ["relevance", "name", "papers", "hindex"]
    }
  }
}
```

**Resource Not Found:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Author with slug 'non-existent-author' not found",
    "details": {
      "resource": "author",
      "slug": "non-existent-author"
    }
  }
}
```

---

## 6. Data Models

### 6.1 Author Model

```typescript
{
  id: number
  slug: string
  name: string
  avatar: string
  affiliation: string
  communities: string[]          // e.g., ["academic", "ea"]
  topics: string[]               // e.g., ["AI Alignment", "Governance"]
  papers: number                 // Total number of papers
  posts: number                  // Total number of posts
  hIndex: number
  bio: string                    // Short bio
  fullBio?: string              // Full bio (optional)
  website?: string
  twitter?: string
  googleScholar?: string
  publications?: Publication[]   // Available in detail view
  recentPosts?: Post[]          // Available in detail view
  collaborators?: number[]       // IDs of collaborators
}
```

**Publication Sub-Model:**
```typescript
{
  id: number
  title: string
  venue: string
  year: number
  citations: number
  coauthors: string[]
  url?: string
}
```

**Post Sub-Model:**
```typescript
{
  id: number
  title: string
  platform: "lesswrong" | "ea"
  date: string
  karma: number
  comments: number
  url?: string
}
```

### 6.2 Paper Model

```typescript
{
  id: number
  slug: string
  title: string
  abstract: string
  authors: {
    name: string
    slug?: string              // Links to author profile if exists
  }[]
  year: number
  venue: string
  source: "academic" | "arxiv" | "lesswrong" | "ea" | "independent"
  topics: string[]
  citations: number
  karma?: number               // For LessWrong/EA posts
  comments?: number            // For LessWrong/EA posts
  url?: string
  pdf?: string
}
```

### 6.3 Project Model

```typescript
{
  id: string
  slug: string
  title: string
  description: string
  longDescription?: string
  status: "active" | "completed" | "paused" | "seeking-collaborators"
  source: "academic" | "lesswrong" | "ea" | "independent"
  topics: string[]
  leads: {
    name: string
    slug?: string
  }[]
  collaborators: {
    name: string
    slug?: string
  }[]
  organizations: string[]
  startDate: string              // Format: YYYY-MM
  endDate?: string               // Format: YYYY-MM
  funding?: string
  links: {
    website?: string
    github?: string
    paper?: string
    forum?: string
  }
  outputs: {
    papers: number
    posts: number
    tools: number
  }
}
```

---

## 7. Authors API

### 7.1 `GET /authors` — List Authors

List and search authors with filtering and sorting capabilities.

**Endpoint:** `GET /v1/authors`

**Query Parameters:**

| Parameter     | Type      | Description                        | Valid Values                            |
| ------------- | --------- | ---------------------------------- | --------------------------------------- |
| `q`           | `string`  | Keyword search (name, bio, topics) | -                                       |
| `community`   | `string`  | Filter by community                | `academic`, `ea`, `lesswrong`           |
| `topic`       | `string`  | Filter by research topic           | Any valid topic                         |
| `affiliation` | `string`  | Filter by affiliation              | -                                       |
| `sort`        | `string`  | Sort order                         | `relevance`, `name`, `papers`, `hindex` |
| `page`        | `integer` | Page number                        | Default: `1`                            |
| `limit`       | `integer` | Items per page                     | Default: `10`, Max: `100`               |

**Example Request:**
```bash
GET /v1/authors?community=academic&topic=Mechanistic%20Interpretability&sort=hindex&limit=20
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "slug": "chris-olah",
        "name": "Chris Olah",
        "avatar": "https://cdn.aisafetyconnect.com/avatars/chris-olah.jpg",
        "affiliation": "Anthropic",
        "communities": ["academic"],
        "topics": ["Mechanistic Interpretability", "Neural Networks", "Visualization"],
        "papers": 24,
        "posts": 15,
        "hIndex": 28,
        "bio": "Research scientist focused on mechanistic interpretability of neural networks. Co-founder of Distill and Anthropic researcher.",
        "website": "https://colah.github.io",
        "twitter": "https://twitter.com/ch402",
        "googleScholar": "https://scholar.google.com/citations?user=example"
      },
      {
        "id": 2,
        "slug": "neel-nanda",
        "name": "Neel Nanda",
        "avatar": "https://cdn.aisafetyconnect.com/avatars/neel-nanda.jpg",
        "affiliation": "Google DeepMind",
        "communities": ["academic", "ea"],
        "topics": ["Mechanistic Interpretability", "Alignment"],
        "papers": 12,
        "posts": 45,
        "hIndex": 15,
        "bio": "Mechanistic interpretability researcher at DeepMind. Creator of TransformerLens library.",
        "website": "https://neelnanda.io",
        "twitter": "https://twitter.com/NeelNanda5",
        "googleScholar": "https://scholar.google.com/citations?user=example2"
      }
    ],
    "total": 47,
    "page": 1,
    "limit": 20,
    "hasMore": true
  },
  "meta": {
    "requestId": "req_authors_001",
    "timestamp": "2025-11-30T18:25:07Z",
    "version": "1.0"
  }
}
```

---

### 7.2 `POST /authors/search` — Advanced Semantic Search

Perform advanced semantic search for authors using natural language queries.

**Endpoint:** `POST /v1/authors/search`

**Request Body:**
```typescript
{
  query: string                  // Natural language search query
  filters?: {
    community?: string
    topic?: string
    affiliation?: string
    minPapers?: number
    minHIndex?: number
  }
  sort?: string                  // relevance | name | papers | hindex
  page?: number
  limit?: number
}
```

**Example Request:**
```bash
POST /v1/authors/search
Content-Type: application/json

{
  "query": "researchers working on interpretability of large language models",
  "filters": {
    "community": "academic",
    "minPapers": 5
  },
  "sort": "relevance",
  "page": 1,
  "limit": 10
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "slug": "chris-olah",
        "name": "Chris Olah",
        "avatar": "https://cdn.aisafetyconnect.com/avatars/chris-olah.jpg",
        "affiliation": "Anthropic",
        "communities": ["academic"],
        "topics": ["Mechanistic Interpretability", "Neural Networks"],
        "papers": 24,
        "posts": 15,
        "hIndex": 28,
        "bio": "Research scientist focused on mechanistic interpretability of neural networks.",
        "relevanceScore": 0.95
      }
    ],
    "total": 8,
    "page": 1,
    "limit": 10,
    "hasMore": false,
    "searchMetadata": {
      "queryEmbedding": true,
      "semanticMatches": 8,
      "filterReductions": {
        "community": 15,
        "minPapers": 3
      }
    }
  },
  "meta": {
    "requestId": "req_authors_search_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 7.3 `GET /authors/{slug}` — Author Details

Get detailed information about a specific author including their publications and recent posts.

**Endpoint:** `GET /v1/authors/{slug}`

**Path Parameters:**
- `slug` (required): Author's unique slug identifier

**Example Request:**
```bash
GET /v1/authors/chris-olah
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "chris-olah",
    "name": "Chris Olah",
    "avatar": "https://cdn.aisafetyconnect.com/avatars/chris-olah.jpg",
    "affiliation": "Anthropic",
    "communities": ["academic"],
    "topics": ["Mechanistic Interpretability", "Neural Networks", "Visualization"],
    "papers": 24,
    "posts": 15,
    "hIndex": 28,
    "bio": "Research scientist focused on mechanistic interpretability of neural networks.",
    "fullBio": "Chris Olah is a research scientist at Anthropic focusing on mechanistic interpretability. Previously, he was a founding member of Google Brain and OpenAI. He co-created Distill, a journal for clear explanations of machine learning. His work focuses on understanding neural networks by reverse-engineering their internal representations and computations.",
    "website": "https://colah.github.io",
    "twitter": "https://twitter.com/ch402",
    "googleScholar": "https://scholar.google.com/citations?user=example",
    "publications": [
      {
        "id": 101,
        "title": "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet",
        "venue": "Anthropic",
        "year": 2024,
        "citations": 234,
        "coauthors": ["Adly Templeton", "Tom Conerly"],
        "url": "https://anthropic.com/research/scaling-monosemanticity"
      },
      {
        "id": 102,
        "title": "A Mathematical Framework for Transformer Circuits",
        "venue": "Anthropic",
        "year": 2022,
        "citations": 567,
        "coauthors": ["Nelson Elhage", "Catherine Olsson"],
        "url": "https://transformer-circuits.pub/2022/framework/index.html"
      }
    ],
    "recentPosts": [
      {
        "id": 201,
        "title": "Circuits: Zoom In",
        "platform": "lesswrong",
        "date": "2024-05-15",
        "karma": 234,
        "comments": 45,
        "url": "https://lesswrong.com/posts/example"
      }
    ],
    "collaborators": [2, 5, 12, 15]
  },
  "meta": {
    "requestId": "req_author_detail_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 7.4 `GET /authors/{slug}/collaborators` — List Collaborators

Get a list of researchers who have collaborated with this author.

**Endpoint:** `GET /v1/authors/{slug}/collaborators`

**Path Parameters:**
- `slug` (required): Author's unique slug identifier

**Query Parameters:**
- `limit` (optional): Items per page (default: 10, max: 100)
- `sort` (optional): `papers` (number of co-authored papers), `name`, `recent` (most recent collaboration)

**Example Request:**
```bash
GET /v1/authors/chris-olah/collaborators?limit=5&sort=papers
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "author": {
      "id": 1,
      "slug": "chris-olah",
      "name": "Chris Olah"
    },
    "collaborators": [
      {
        "author": {
          "id": 2,
          "slug": "catherine-olsson",
          "name": "Catherine Olsson",
          "avatar": "https://cdn.aisafetyconnect.com/avatars/catherine-olsson.jpg",
          "affiliation": "Anthropic",
          "hIndex": 22
        },
        "sharedPapers": 8,
        "mostRecentCollaboration": 2024,
        "sharedTopics": ["Mechanistic Interpretability", "Transformers"]
      },
      {
        "author": {
          "id": 5,
          "slug": "nelson-elhage",
          "name": "Nelson Elhage",
          "avatar": "https://cdn.aisafetyconnect.com/avatars/nelson-elhage.jpg",
          "affiliation": "Anthropic",
          "hIndex": 19
        },
        "sharedPapers": 6,
        "mostRecentCollaboration": 2024,
        "sharedTopics": ["Mechanistic Interpretability", "Circuits"]
      }
    ],
    "total": 15
  },
  "meta": {
    "requestId": "req_collaborators_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

## 8. Papers API

### 8.1 `GET /papers` — List Papers

List and search papers with filtering and sorting capabilities.

**Endpoint:** `GET /v1/papers`

**Query Parameters:**

| Parameter | Type      | Description                      | Valid Values                                          |
| --------- | --------- | -------------------------------- | ----------------------------------------------------- |
| `q`       | `string`  | Keyword search (title, abstract) | -                                                     |
| `source`  | `string`  | Filter by source                 | `academic`, `arxiv`, `lesswrong`, `ea`, `independent` |
| `topic`   | `string`  | Filter by topic                  | Any valid topic                                       |
| `year`    | `integer` | Filter by publication year       | -                                                     |
| `minYear` | `integer` | Minimum publication year         | -                                                     |
| `maxYear` | `integer` | Maximum publication year         | -                                                     |
| `author`  | `string`  | Filter by author slug            | -                                                     |
| `sort`    | `string`  | Sort order                       | `relevance`, `citations`, `year`, `karma`, `title`    |
| `page`    | `integer` | Page number                      | Default: `1`                                          |
| `limit`   | `integer` | Items per page                   | Default: `10`, Max: `100`                             |

**Example Request:**
```bash
GET /v1/papers?source=academic&topic=Mechanistic%20Interpretability&sort=citations&limit=20
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "slug": "scaling-monosemanticity",
        "title": "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet",
        "abstract": "We present a new approach to mechanistic interpretability that scales to production language models. Building on prior work with sparse autoencoders, we extract millions of interpretable features from Claude 3 Sonnet, including features responsive to code bugs, safety concerns, and specific entities.",
        "authors": [
          { "name": "Adly Templeton", "slug": "adly-templeton" },
          { "name": "Tom Conerly", "slug": "tom-conerly" },
          { "name": "Chris Olah", "slug": "chris-olah" }
        ],
        "year": 2024,
        "venue": "Anthropic",
        "source": "academic",
        "topics": ["Mechanistic Interpretability", "Sparse Autoencoders", "Feature Extraction"],
        "citations": 234,
        "url": "https://anthropic.com/research/scaling-monosemanticity"
      },
      {
        "id": 8,
        "slug": "transformer-circuits",
        "title": "A Mathematical Framework for Transformer Circuits",
        "abstract": "We propose a mathematical framework for understanding transformer language models by analyzing them as computational graphs. This framework enables us to identify interpretable circuits that implement specific behaviors.",
        "authors": [
          { "name": "Nelson Elhage", "slug": "nelson-elhage" },
          { "name": "Chris Olah", "slug": "chris-olah" }
        ],
        "year": 2022,
        "venue": "Anthropic",
        "source": "academic",
        "topics": ["Mechanistic Interpretability", "Transformers", "Circuits"],
        "citations": 567,
        "url": "https://transformer-circuits.pub/2022/framework/index.html"
      }
    ],
    "total": 34,
    "page": 1,
    "limit": 20,
    "hasMore": true
  },
  "meta": {
    "requestId": "req_papers_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 8.2 `POST /papers/search` — Advanced Semantic Search

Perform advanced semantic search for papers using natural language queries.

**Endpoint:** `POST /v1/papers/search`

**Request Body:**
```typescript
{
  query: string                  // Natural language search query
  filters?: {
    topics?: string[]
    source?: string
    yearRange?: {
      min?: number
      max?: number
    }
    minCitations?: number
    authors?: string[]           // Author slugs
  }
  sort?: string                  // relevance | citations | year | karma | title
  page?: number
  limit?: number
}
```

**Example Request:**
```bash
POST /v1/papers/search
Content-Type: application/json

{
  "query": "detecting deceptive behavior in AI models",
  "filters": {
    "topics": ["Deception", "AI Safety"],
    "yearRange": { "min": 2022 },
    "source": "academic",
    "minCitations": 50
  },
  "sort": "relevance",
  "page": 1,
  "limit": 10
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 15,
        "slug": "detecting-deception-llms",
        "title": "Detecting Latent Deception in Large Language Models",
        "abstract": "We investigate methods for detecting when language models engage in deceptive behavior. Our approach combines behavioral testing with interpretability techniques to identify signatures of deception in model activations.",
        "authors": [
          { "name": "Example Researcher", "slug": "example-researcher" }
        ],
        "year": 2024,
        "venue": "NeurIPS",
        "source": "academic",
        "topics": ["Deception", "AI Safety", "Interpretability"],
        "citations": 89,
        "url": "https://arxiv.org/abs/example",
        "relevanceScore": 0.94
      }
    ],
    "total": 5,
    "page": 1,
    "limit": 10,
    "hasMore": false,
    "searchMetadata": {
      "queryEmbedding": true,
      "semanticMatches": 12,
      "filterReductions": {
        "yearRange": 8,
        "minCitations": 4
      }
    }
  },
  "meta": {
    "requestId": "req_papers_search_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 8.3 `GET /papers/{slug}` — Paper Details

Get detailed information about a specific paper.

**Endpoint:** `GET /v1/papers/{slug}`

**Path Parameters:**
- `slug` (required): Paper's unique slug identifier

**Example Request:**
```bash
GET /v1/papers/scaling-monosemanticity
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "scaling-monosemanticity",
    "title": "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet",
    "abstract": "We present a new approach to mechanistic interpretability that scales to production language models. Building on prior work with sparse autoencoders, we extract millions of interpretable features from Claude 3 Sonnet, including features responsive to code bugs, safety concerns, and specific entities. We find that these features are highly interpretable and can be used to understand model behavior at scale.",
    "authors": [
      { "name": "Adly Templeton", "slug": "adly-templeton" },
      { "name": "Tom Conerly", "slug": "tom-conerly" },
      { "name": "Chris Olah", "slug": "chris-olah" }
    ],
    "year": 2024,
    "venue": "Anthropic",
    "source": "academic",
    "topics": ["Mechanistic Interpretability", "Sparse Autoencoders", "Feature Extraction"],
    "citations": 234,
    "url": "https://anthropic.com/research/scaling-monosemanticity",
    "pdf": "https://anthropic.com/research/scaling-monosemanticity.pdf",
    "relatedPapers": [
      {
        "id": 8,
        "slug": "transformer-circuits",
        "title": "A Mathematical Framework for Transformer Circuits",
        "relevance": 0.87
      }
    ],
    "citedBy": [
      {
        "id": 42,
        "slug": "interpretability-survey-2024",
        "title": "Recent Advances in Neural Network Interpretability",
        "year": 2024
      }
    ]
  },
  "meta": {
    "requestId": "req_paper_detail_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 8.4 `GET /papers/topics` — List All Paper Topics

Get a canonical list of all paper topics available in the system.

**Endpoint:** `GET /v1/papers/topics`

**Query Parameters:**
- `includeCount` (optional): Include paper count for each topic (default: false)

**Example Request:**
```bash
GET /v1/papers/topics?includeCount=true
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "topics": [
      { "name": "AI Alignment", "count": 145 },
      { "name": "Mechanistic Interpretability", "count": 89 },
      { "name": "RLHF", "count": 67 },
      { "name": "AI Governance", "count": 56 },
      { "name": "Constitutional AI", "count": 34 },
      { "name": "Deception", "count": 23 },
      { "name": "AI Safety", "count": 234 },
      { "name": "Robustness", "count": 78 },
      { "name": "Scalable Oversight", "count": 45 }
    ],
    "total": 42
  },
  "meta": {
    "requestId": "req_topics_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

## 9. Projects API

### 9.1 `GET /projects` — List Projects

List and search projects with filtering and sorting capabilities.

**Endpoint:** `GET /v1/projects`

**Query Parameters:**

| Parameter      | Type      | Description            | Valid Values                                             |
| -------------- | --------- | ---------------------- | -------------------------------------------------------- |
| `q`            | `string`  | Keyword search         | -                                                        |
| `status`       | `string`  | Filter by status       | `active`, `completed`, `paused`, `seeking-collaborators` |
| `source`       | `string`  | Filter by source       | `academic`, `lesswrong`, `ea`, `independent`             |
| `topic`        | `string`  | Filter by topic        | Any valid topic                                          |
| `organization` | `string`  | Filter by organization | -                                                        |
| `sort`         | `string`  | Sort order             | `relevance`, `newest`, `papers`, `title`                 |
| `page`         | `integer` | Page number            | Default: `1`                                             |
| `limit`        | `integer` | Items per page         | Default: `10`, Max: `100`                                |

**Example Request:**
```bash
GET /v1/projects?status=active&topic=Alignment&sort=papers&limit=20
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "1",
        "slug": "circuits-interpretability",
        "title": "Circuits-Based Neural Network Interpretability",
        "description": "A systematic investigation into neural network interpretability through the lens of computational circuits.",
        "status": "active",
        "source": "academic",
        "topics": ["Mechanistic Interpretability", "Circuits"],
        "leads": [
          { "name": "Chris Olah", "slug": "chris-olah" }
        ],
        "organizations": ["Anthropic"],
        "startDate": "2020-01",
        "funding": "$2M+",
        "links": {
          "website": "https://transformer-circuits.pub",
          "github": "https://github.com/anthropics/transformer-circuits"
        },
        "outputs": {
          "papers": 12,
          "posts": 8,
          "tools": 3
        }
      },
      {
        "id": "5",
        "slug": "scalable-oversight",
        "title": "Scalable Oversight and Weak-to-Strong Generalization",
        "description": "Research on methods for humans to oversee AI systems that are more capable than humans.",
        "status": "active",
        "source": "academic",
        "topics": ["Scalable Oversight", "Alignment"],
        "leads": [
          { "name": "Jan Leike", "slug": "jan-leike" }
        ],
        "organizations": ["OpenAI"],
        "startDate": "2022-01",
        "links": {
          "paper": "https://arxiv.org/abs/2211.03540"
        },
        "outputs": {
          "papers": 6,
          "posts": 4,
          "tools": 2
        }
      }
    ],
    "total": 18,
    "page": 1,
    "limit": 20,
    "hasMore": false
  },
  "meta": {
    "requestId": "req_projects_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 9.2 `POST /projects/search` — Advanced Semantic Search

Perform advanced semantic search for projects using natural language queries.

**Endpoint:** `POST /v1/projects/search`

**Request Body:**
```typescript
{
  query: string                  // Natural language search query
  filters?: {
    status?: string
    topics?: string[]
    source?: string
    organizations?: string[]
    hasGithub?: boolean
    minPapers?: number
  }
  sort?: string                  // relevance | newest | papers | title
  page?: number
  limit?: number
}
```

**Example Request:**
```bash
POST /v1/projects/search
Content-Type: application/json

{
  "query": "projects tracking progress toward AGI alignment",
  "filters": {
    "status": "active",
    "topics": ["Alignment"],
    "minPapers": 3
  },
  "sort": "relevance",
  "page": 1,
  "limit": 10
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "10",
        "slug": "ai-existential-safety",
        "title": "AI Existential Safety Research Program",
        "description": "Long-term research program focused on ensuring transformative AI systems do not pose existential risks to humanity.",
        "status": "active",
        "source": "ea",
        "topics": ["Existential Risk", "AGI Safety", "Alignment"],
        "leads": [
          { "name": "Nick Bostrom", "slug": "nick-bostrom" }
        ],
        "organizations": ["Future of Humanity Institute"],
        "startDate": "2021-03",
        "funding": "FTX Future Fund",
        "outputs": {
          "papers": 8,
          "posts": 12,
          "tools": 1
        },
        "relevanceScore": 0.92
      }
    ],
    "total": 4,
    "page": 1,
    "limit": 10,
    "hasMore": false,
    "searchMetadata": {
      "queryEmbedding": true,
      "semanticMatches": 7,
      "filterReductions": {
        "minPapers": 3
      }
    }
  },
  "meta": {
    "requestId": "req_projects_search_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 9.3 `GET /projects/{slug}` — Project Details

Get detailed information about a specific project.

**Endpoint:** `GET /v1/projects/{slug}`

**Path Parameters:**
- `slug` (required): Project's unique slug identifier

**Example Request:**
```bash
GET /v1/projects/circuits-interpretability
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "slug": "circuits-interpretability",
    "title": "Circuits-Based Neural Network Interpretability",
    "description": "A systematic investigation into neural network interpretability through the lens of computational circuits.",
    "longDescription": "This project aims to understand neural networks by reverse-engineering them into interpretable algorithms. We identify circuits - subgraphs of the network that implement specific behaviors - and study how they compose to create complex capabilities. Our work builds on prior research in feature visualization and mechanistic interpretability, with a focus on scaling these techniques to production language models.",
    "status": "active",
    "source": "academic",
    "topics": ["Mechanistic Interpretability", "Circuits", "Neural Networks"],
    "leads": [
      { "name": "Chris Olah", "slug": "chris-olah" },
      { "name": "Catherine Olsson", "slug": "catherine-olsson" }
    ],
    "collaborators": [
      { "name": "Nelson Elhage", "slug": "nelson-elhage" },
      { "name": "Tristan Hume", "slug": "tristan-hume" }
    ],
    "organizations": ["Anthropic"],
    "startDate": "2020-01",
    "funding": "$2M+",
    "links": {
      "website": "https://transformer-circuits.pub",
      "github": "https://github.com/anthropics/transformer-circuits"
    },
    "outputs": {
      "papers": 12,
      "posts": 8,
      "tools": 3
    },
    "relatedPapers": [
      {
        "id": 1,
        "slug": "scaling-monosemanticity",
        "title": "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet"
      },
      {
        "id": 8,
        "slug": "transformer-circuits",
        "title": "A Mathematical Framework for Transformer Circuits"
      }
    ],
    "relatedProjects": [
      {
        "id": "8",
        "slug": "eliciting-latent-knowledge",
        "title": "Eliciting Latent Knowledge (ELK)",
        "relation": "complementary"
      }
    ]
  },
  "meta": {
    "requestId": "req_project_detail_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 9.4 `GET /projects/topics` — List All Project Topics

Get a canonical list of all project topics available in the system.

**Endpoint:** `GET /v1/projects/topics`

**Query Parameters:**
- `includeCount` (optional): Include project count for each topic (default: false)

**Example Request:**
```bash
GET /v1/projects/topics?includeCount=true
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "topics": [
      { "name": "Mechanistic Interpretability", "count": 8 },
      { "name": "AI Alignment", "count": 12 },
      { "name": "RLHF", "count": 6 },
      { "name": "AI Governance", "count": 5 },
      { "name": "Robustness", "count": 4 },
      { "name": "Scalable Oversight", "count": 3 },
      { "name": "Value Learning", "count": 3 },
      { "name": "Agent Foundations", "count": 2 }
    ],
    "total": 15
  },
  "meta": {
    "requestId": "req_project_topics_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

## 10. Static Options API

These endpoints return static configuration data for filters and dropdowns.

### 10.1 `GET /sources` — List All Sources

Get all available source types.

**Endpoint:** `GET /v1/sources`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "sources": [
      {
        "id": "academic",
        "label": "Academic",
        "description": "Peer-reviewed publications and institutional research"
      },
      {
        "id": "arxiv",
        "label": "arXiv",
        "description": "Pre-prints from arXiv"
      },
      {
        "id": "lesswrong",
        "label": "LessWrong",
        "description": "Posts from LessWrong community"
      },
      {
        "id": "ea",
        "label": "EA Forum",
        "description": "Effective Altruism Forum posts"
      },
      {
        "id": "independent",
        "label": "Independent",
        "description": "Independent research and blog posts"
      }
    ]
  },
  "meta": {
    "requestId": "req_sources_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 10.2 `GET /communities` — List All Communities

Get all available author communities.

**Endpoint:** `GET /v1/communities`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "communities": [
      {
        "id": "academic",
        "label": "Academic",
        "description": "Academic researchers and institutions"
      },
      {
        "id": "ea",
        "label": "Effective Altruism",
        "description": "Effective Altruism community members"
      },
      {
        "id": "lesswrong",
        "label": "LessWrong",
        "description": "LessWrong community members"
      }
    ]
  },
  "meta": {
    "requestId": "req_communities_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

### 10.3 `GET /status` — List All Project Statuses

Get all available project status types.

**Endpoint:** `GET /v1/status`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "statuses": [
      {
        "id": "active",
        "label": "Active",
        "description": "Currently active and ongoing projects"
      },
      {
        "id": "completed",
        "label": "Completed",
        "description": "Finished projects"
      },
      {
        "id": "paused",
        "label": "Paused",
        "description": "Temporarily paused projects"
      },
      {
        "id": "seeking-collaborators",
        "label": "Seeking Collaborators",
        "description": "Projects actively looking for collaborators"
      }
    ]
  },
  "meta": {
    "requestId": "req_status_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

## 11. Global Search API

### 11.1 `GET /search` — Global Search Across All Resources

Search across authors, papers, and projects simultaneously.

**Endpoint:** `GET /v1/search`

**Query Parameters:**

| Parameter | Type      | Description                                           | Required                 |
| --------- | --------- | ----------------------------------------------------- | ------------------------ |
| `q`       | `string`  | Search query                                          | Yes                      |
| `types`   | `string`  | Comma-separated list: `authors`, `papers`, `projects` | No (default: all)        |
| `page`    | `integer` | Page number                                           | No (default: 1)          |
| `limit`   | `integer` | Items per page per type                               | No (default: 5, max: 20) |

**Example Request:**
```bash
GET /v1/search?q=mechanistic%20interpretability&types=authors,papers&limit=5
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "authors": {
      "items": [
        {
          "id": 1,
          "slug": "chris-olah",
          "name": "Chris Olah",
          "affiliation": "Anthropic",
          "topics": ["Mechanistic Interpretability"],
          "papers": 24,
          "hIndex": 28
        },
        {
          "id": 2,
          "slug": "neel-nanda",
          "name": "Neel Nanda",
          "affiliation": "Google DeepMind",
          "topics": ["Mechanistic Interpretability"],
          "papers": 12,
          "hIndex": 15
        }
      ],
      "total": 8,
      "hasMore": true
    },
    "papers": {
      "items": [
        {
          "id": 1,
          "slug": "scaling-monosemanticity",
          "title": "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet",
          "year": 2024,
          "citations": 234,
          "topics": ["Mechanistic Interpretability"]
        },
        {
          "id": 8,
          "slug": "transformer-circuits",
          "title": "A Mathematical Framework for Transformer Circuits",
          "year": 2022,
          "citations": 567,
          "topics": ["Mechanistic Interpretability"]
        }
      ],
      "total": 34,
      "hasMore": true
    },
    "projects": {
      "items": [],
      "total": 0,
      "hasMore": false
    }
  },
  "meta": {
    "query": "mechanistic interpretability",
    "requestId": "req_global_search_001",
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

## 12. Recommended Additional Endpoints

Based on typical API best practices and the structure of your project, here are recommended additional endpoints:

### 12.1 `GET /stats` — Platform Statistics

Get overview statistics about the platform.

**Endpoint:** `GET /v1/stats`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "authors": {
      "total": 247,
      "byComm": {
        "academic": 156,
        "ea": 78,
        "lesswrong": 45
      }
    },
    "papers": {
      "total": 1834,
      "bySource": {
        "academic": 892,
        "arxiv": 567,
        "lesswrong": 234,
        "ea": 141
      },
      "byYear": {
        "2024": 234,
        "2023": 456,
        "2022": 389
      }
    },
    "projects": {
      "total": 89,
      "byStatus": {
        "active": 45,
        "completed": 32,
        "paused": 8,
        "seeking-collaborators": 4
      }
    },
    "lastUpdated": "2025-11-30T12:00:00Z"
  }
}
```

---

### 12.2 `GET /trending` — Trending Content

Get trending papers, authors, and projects based on recent activity.

**Endpoint:** `GET /v1/trending`

**Query Parameters:**
- `period` (optional): `day`, `week`, `month` (default: `week`)
- `types` (optional): Comma-separated list: `authors`, `papers`, `projects`
- `limit` (optional): Items per type (default: 10, max: 50)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "period": "week",
    "papers": [
      {
        "id": 1,
        "slug": "scaling-monosemanticity",
        "title": "Scaling Monosemanticity",
        "trendScore": 95,
        "recentCitations": 23,
        "recentViews": 1245
      }
    ],
    "authors": [
      {
        "id": 1,
        "slug": "chris-olah",
        "name": "Chris Olah",
        "trendScore": 88,
        "recentPapers": 2
      }
    ],
    "projects": [
      {
        "id": "1",
        "slug": "circuits-interpretability",
        "title": "Circuits-Based Neural Network Interpretability",
        "trendScore": 92,
        "recentOutputs": 3
      }
    ]
  }
}
```

---

### 12.3 `GET /papers/{slug}/citations` — Paper Citations

Get papers that cite this paper.

**Endpoint:** `GET /v1/papers/{slug}/citations`

**Query Parameters:**
- `page`, `limit`, `sort` (standard pagination)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "paper": {
      "id": 1,
      "slug": "scaling-monosemanticity",
      "title": "Scaling Monosemanticity"
    },
    "citations": [
      {
        "id": 42,
        "slug": "interpretability-survey-2024",
        "title": "Recent Advances in Neural Network Interpretability",
        "year": 2024,
        "authors": [{ "name": "Survey Author" }]
      }
    ],
    "total": 234,
    "page": 1,
    "limit": 10
  }
}
```

---

### 12.4 `GET /papers/{slug}/related` — Related Papers

Get papers similar to this paper using semantic similarity.

**Endpoint:** `GET /v1/papers/{slug}/related`

**Query Parameters:**
- `limit` (optional): Number of results (default: 10, max: 50)
- `minScore` (optional): Minimum similarity score 0-1 (default: 0.5)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "paper": {
      "id": 1,
      "slug": "scaling-monosemanticity"
    },
    "relatedPapers": [
      {
        "id": 8,
        "slug": "transformer-circuits",
        "title": "A Mathematical Framework for Transformer Circuits",
        "similarityScore": 0.87,
        "sharedTopics": ["Mechanistic Interpretability", "Transformers"]
      },
      {
        "id": 11,
        "slug": "200-problems-mech-interp",
        "title": "200 Concrete Open Problems in Mechanistic Interpretability",
        "similarityScore": 0.76,
        "sharedTopics": ["Mechanistic Interpretability"]
      }
    ]
  }
}
```

---

### 12.5 `GET /authors/{slug}/papers` — Author's Papers

Get all papers by a specific author with filtering and sorting.

**Endpoint:** `GET /v1/authors/{slug}/papers`

**Query Parameters:**
- `year`, `topic`, `source` (filters)
- `sort` (e.g., `year`, `citations`)
- `page`, `limit`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "author": {
      "id": 1,
      "slug": "chris-olah",
      "name": "Chris Olah"
    },
    "papers": [
      {
        "id": 1,
        "slug": "scaling-monosemanticity",
        "title": "Scaling Monosemanticity",
        "year": 2024,
        "citations": 234,
        "role": "co-author"
      }
    ],
    "total": 24,
    "page": 1,
    "limit": 10
  }
}
```

---

### 12.6 `POST /similar` — Find Similar Items

Find items similar to a given item across all resource types.

**Endpoint:** `POST /v1/similar`

**Request Body:**
```typescript
{
  type: "author" | "paper" | "project"
  id: string | number
  limit?: number
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "source": {
      "type": "paper",
      "id": 1,
      "title": "Scaling Monosemanticity"
    },
    "similar": {
      "papers": [
        {
          "id": 8,
          "slug": "transformer-circuits",
          "title": "A Mathematical Framework for Transformer Circuits",
          "similarity": 0.87
        }
      ],
      "authors": [
        {
          "id": 2,
          "slug": "neel-nanda",
          "name": "Neel Nanda",
          "similarity": 0.82,
          "reason": "Similar research topics"
        }
      ],
      "projects": [
        {
          "id": "1",
          "slug": "circuits-interpretability",
          "title": "Circuits-Based Neural Network Interpretability",
          "similarity": 0.91
        }
      ]
    }
  }
}
```

---

### 12.7 `GET /topics` — All Topics Across Resources

Get all topics used across the platform with counts.

**Endpoint:** `GET /v1/topics`

**Query Parameters:**
- `minCount` (optional): Minimum number of items (default: 1)
- `sort` (optional): `name`, `count` (default: `count`)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "topics": [
      {
        "name": "AI Safety",
        "counts": {
          "papers": 234,
          "authors": 89,
          "projects": 23
        },
        "total": 346
      },
      {
        "name": "Mechanistic Interpretability",
        "counts": {
          "papers": 89,
          "authors": 34,
          "projects": 8
        },
        "total": 131
      }
    ],
    "totalTopics": 42
  }
}
```

---

### 12.8 `GET /health` — API Health Check

Check API health and status.

**Endpoint:** `GET /v1/health`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "uptime": 8640000,
    "services": {
      "database": "healthy",
      "search": "healthy",
      "cache": "healthy"
    },
    "timestamp": "2025-11-30T18:25:07Z"
  }
}
```

---

## 13. Rate Limiting

All endpoints are subject to rate limiting to ensure fair usage.

### Rate Limit Headers

All responses include rate limit information in headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1701368707
```

### Rate Limit Tiers

| Tier                 | Requests/Hour | Requests/Day |
| -------------------- | ------------- | ------------ |
| Anonymous            | 100           | 1,000        |
| Authenticated (Free) | 1,000         | 10,000       |
| Authenticated (Pro)  | 10,000        | 100,000      |

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again in 3600 seconds.",
    "details": {
      "limit": 100,
      "remaining": 0,
      "resetAt": "2025-11-30T19:25:07Z",
      "retryAfter": 3600
    }
  }
}
```

---

## 14. Pagination Best Practices

### Cursor-Based Pagination (Recommended for Large Datasets)

For endpoints that support it, cursor-based pagination provides better performance:

**Request:**
```bash
GET /v1/papers?cursor=eyJpZCI6MTIzfQ==&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "nextCursor": "eyJpZCI6MTQzfQ==",
      "hasMore": true,
      "limit": 20
    }
  }
}
```

### Offset-Based Pagination (Current Implementation)

Standard offset-based pagination using `page` and `limit`:

**Request:**
```bash
GET /v1/papers?page=2&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 1834,
    "page": 2,
    "limit": 20,
    "hasMore": true,
    "totalPages": 92
  }
}
```

### Pagination Recommendations

1. **Default Limit**: Use sensible defaults (10-20 items)
2. **Maximum Limit**: Enforce maximum limits (100 items) to prevent abuse
3. **Include Metadata**: Always include `hasMore` and `total` when possible
4. **Cursor Pagination**: Implement for endpoints with frequent updates
5. **Deep Pagination**: Consider limiting maximum page depth (e.g., max page 100)

---

## Additional Implementation Notes

### Semantic Search Implementation

The POST endpoints (`/authors/search`, `/papers/search`, `/projects/search`) should:

1. **Embed Queries**: Convert natural language queries to embeddings
2. **Vector Search**: Perform similarity search against pre-computed embeddings
3. **Hybrid Search**: Combine semantic search with keyword matching and filters
4. **Re-ranking**: Apply filters and re-rank results by relevance
5. **Score Threshold**: Filter out results below a minimum similarity threshold (e.g., 0.3)

### Caching Strategy

Implement caching for:
- Static endpoints (`/sources`, `/communities`, `/status`, `/topics`)
- Popular searches (cache common queries for 5-15 minutes)
- Detail pages (cache for 1 hour, invalidate on updates)
- List endpoints with no filters (cache for 5 minutes)

### Response Time Targets

| Endpoint Type          | Target Response Time |
| ---------------------- | -------------------- |
| Static options         | < 50ms               |
| Simple GET lists       | < 200ms              |
| Detail pages           | < 300ms              |
| Simple search (GET)    | < 500ms              |
| Semantic search (POST) | < 1000ms             |

### API Versioning

- Use URL versioning (`/v1/`, `/v2/`)
- Maintain backward compatibility within major versions
- Deprecate old versions with 6-month notice
- Include `X-API-Version` header in responses