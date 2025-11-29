export interface Publication {
  id: number
  title: string
  venue: string
  year: number
  citations: number
  coauthors: string[]
  url?: string
}

export interface Post {
  id: number
  title: string
  platform: "lesswrong" | "ea"
  date: string
  karma: number
  comments: number
  url?: string
}

export interface Researcher {
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
  fullBio?: string
  website?: string
  twitter?: string
  googleScholar?: string
  publications?: Publication[]
  recentPosts?: Post[]
  collaborators?: number[]
}

export const researchers: Researcher[] = [
  {
    id: 1,
    slug: "sarah-chen",
    name: "Dr. Sarah Chen",
    avatar: "/professional-woman-researcher.png",
    affiliation: "MIT CSAIL",
    communities: ["academic", "lesswrong"],
    topics: ["Interpretability", "Mechanistic Analysis", "Neural Networks"],
    papers: 47,
    posts: 12,
    hIndex: 28,
    bio: "Focusing on mechanistic interpretability and understanding how neural networks represent knowledge internally.",
    fullBio:
      "Dr. Sarah Chen is an Associate Professor at MIT CSAIL, where she leads the Neural Interpretability Lab. Her research focuses on developing tools and techniques for understanding how neural networks process and represent information. She has made significant contributions to mechanistic interpretability, including novel methods for identifying circuits in transformer models. Prior to MIT, she completed her PhD at Stanford and was a research scientist at Google Brain.",
    website: "https://sarahchen.mit.edu",
    twitter: "sarahchen_ai",
    googleScholar: "abc123",
    publications: [
      {
        id: 1,
        title: "Scaling Monosemanticity: Extracting Interpretable Features from Large Language Models",
        venue: "NeurIPS",
        year: 2024,
        citations: 156,
        coauthors: ["Neel Nanda", "Jan Leike"],
      },
      {
        id: 2,
        title: "Toward Understanding of Circuits in Transformers",
        venue: "ICML",
        year: 2023,
        citations: 243,
        coauthors: ["Neel Nanda"],
      },
      {
        id: 3,
        title: "Activation Patching: A Causal Lens on Neural Networks",
        venue: "ICLR",
        year: 2023,
        citations: 189,
        coauthors: ["Paul Christiano"],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "A Mechanistic Understanding of GPT-4's Reasoning",
        platform: "lesswrong",
        date: "2024-11-15",
        karma: 892,
        comments: 67,
      },
      {
        id: 2,
        title: "Why I'm Optimistic About Interpretability Progress",
        platform: "lesswrong",
        date: "2024-10-02",
        karma: 456,
        comments: 34,
      },
    ],
    collaborators: [5, 8, 3],
  },
  {
    id: 2,
    slug: "eliezer-yudkowsky",
    name: "Eliezer Yudkowsky",
    avatar: "/man-with-beard-intellectual-portrait.jpg",
    affiliation: "MIRI",
    communities: ["lesswrong", "ea"],
    topics: ["AI Alignment", "Decision Theory", "Rationality"],
    papers: 15,
    posts: 284,
    hIndex: 12,
    bio: "Research Fellow at MIRI. Working on the foundations of AI alignment and decision theory.",
    fullBio:
      "Eliezer Yudkowsky is a Research Fellow at the Machine Intelligence Research Institute (MIRI), which he co-founded. He is known for his work on the theoretical foundations of AI alignment, including contributions to decision theory, AI forecasting, and the articulation of AI existential risk. He founded the LessWrong community and has written extensively on rationality, including the Sequences. His work has been influential in shaping the field of AI safety research.",
    website: "https://yudkowsky.net",
    twitter: "ESYudkowsky",
    publications: [
      {
        id: 1,
        title: "Intelligence Explosion Microeconomics",
        venue: "MIRI Technical Report",
        year: 2013,
        citations: 312,
        coauthors: [],
      },
      {
        id: 2,
        title: "Logical Induction",
        venue: "arXiv",
        year: 2016,
        citations: 178,
        coauthors: ["Scott Garrabrant"],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "AGI Ruin: A List of Lethalities",
        platform: "lesswrong",
        date: "2024-09-20",
        karma: 1567,
        comments: 423,
      },
      {
        id: 2,
        title: "On AutoGPT and the Current State of AI Progress",
        platform: "lesswrong",
        date: "2024-08-15",
        karma: 1234,
        comments: 289,
      },
      {
        id: 3,
        title: "Why I Think AI Timeline Updates Matter",
        platform: "ea",
        date: "2024-07-30",
        karma: 892,
        comments: 156,
      },
    ],
    collaborators: [3, 7, 9],
  },
  {
    id: 3,
    slug: "paul-christiano",
    name: "Dr. Paul Christiano",
    avatar: "/young-man-researcher-portrait.jpg",
    affiliation: "ARC",
    communities: ["academic", "ea", "lesswrong"],
    topics: ["RLHF", "Scalable Oversight", "AI Control"],
    papers: 32,
    posts: 45,
    hIndex: 24,
    bio: "Founder of ARC. Developed RLHF and working on scalable approaches to AI alignment.",
    fullBio:
      "Dr. Paul Christiano is the founder of the Alignment Research Center (ARC) and one of the most influential researchers in AI alignment. He developed Reinforcement Learning from Human Feedback (RLHF), which has become the dominant technique for aligning large language models. Prior to founding ARC, he was a researcher at OpenAI. His current work focuses on scalable oversight techniques and eliciting latent knowledge from AI systems.",
    website: "https://paulfchristiano.com",
    twitter: "paaborinsky",
    googleScholar: "xyz789",
    publications: [
      {
        id: 1,
        title: "Deep Reinforcement Learning from Human Preferences",
        venue: "NeurIPS",
        year: 2017,
        citations: 2847,
        coauthors: ["Jan Leike", "Dario Amodei"],
      },
      {
        id: 2,
        title: "Supervising Strong Learners by Amplifying Weak Experts",
        venue: "arXiv",
        year: 2018,
        citations: 456,
        coauthors: [],
      },
      {
        id: 3,
        title: "Eliciting Latent Knowledge",
        venue: "ARC Technical Report",
        year: 2022,
        citations: 234,
        coauthors: ["Mark Xu"],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "ARC's Approach to Alignment",
        platform: "lesswrong",
        date: "2024-10-28",
        karma: 734,
        comments: 89,
      },
      {
        id: 2,
        title: "On the Difficulty of Scalable Oversight",
        platform: "ea",
        date: "2024-09-15",
        karma: 567,
        comments: 45,
      },
    ],
    collaborators: [1, 8, 6],
  },
  {
    id: 4,
    slug: "yoshua-bengio",
    name: "Dr. Yoshua Bengio",
    avatar: "/older-man-professor-portrait.jpg",
    affiliation: "Mila / Université de Montréal",
    communities: ["academic"],
    topics: ["Deep Learning", "AI Safety", "Governance"],
    papers: 623,
    posts: 3,
    hIndex: 182,
    bio: "Turing Award winner. Pioneer in deep learning, now focused on AI safety and beneficial AI development.",
    fullBio:
      "Dr. Yoshua Bengio is a professor at Université de Montréal and the scientific director of Mila. He received the 2018 Turing Award alongside Geoffrey Hinton and Yann LeCun for their work on deep learning. In recent years, he has become increasingly focused on AI safety and governance, advocating for careful development of AI systems and international cooperation on AI regulation.",
    website: "https://yoshuabengio.org",
    twitter: "yoshaborinsky",
    googleScholar: "bengio123",
    publications: [
      {
        id: 1,
        title: "Managing AI Risks in an Era of Rapid Progress",
        venue: "Science",
        year: 2024,
        citations: 89,
        coauthors: ["Stuart Russell", "Max Tegmark"],
      },
      {
        id: 2,
        title: "A Path Towards Autonomous Machine Intelligence",
        venue: "arXiv",
        year: 2022,
        citations: 567,
        coauthors: [],
      },
    ],
    collaborators: [6, 10],
  },
  {
    id: 5,
    slug: "neel-nanda",
    name: "Neel Nanda",
    avatar: "/young-man-casual-portrait.png",
    affiliation: "Google DeepMind",
    communities: ["academic", "lesswrong"],
    topics: ["Mechanistic Interpretability", "Transformers", "Circuits"],
    papers: 18,
    posts: 67,
    hIndex: 15,
    bio: "Research scientist focusing on mechanistic interpretability. Author of TransformerLens.",
    fullBio:
      "Neel Nanda is a research scientist at Google DeepMind working on mechanistic interpretability. He is the creator of TransformerLens, an open-source library for mechanistic interpretability research that has become widely used in the field. His work focuses on understanding the internal mechanisms of transformer models and developing better tools for interpretability research. He is known for his educational content and community building in the interpretability space.",
    website: "https://neelnanda.io",
    twitter: "NeelNanda5",
    publications: [
      {
        id: 1,
        title: "A Mathematical Framework for Transformer Circuits",
        venue: "Anthropic",
        year: 2022,
        citations: 567,
        coauthors: ["Sarah Chen", "Chris Olah"],
      },
      {
        id: 2,
        title: "Progress Measures for Grokking via Mechanistic Interpretability",
        venue: "ICLR",
        year: 2023,
        citations: 234,
        coauthors: [],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "200 Concrete Open Problems in Mechanistic Interpretability",
        platform: "lesswrong",
        date: "2024-11-01",
        karma: 1123,
        comments: 145,
      },
      {
        id: 2,
        title: "Grokking and Modular Arithmetic",
        platform: "lesswrong",
        date: "2024-09-20",
        karma: 678,
        comments: 56,
      },
    ],
    collaborators: [1, 8],
  },
  {
    id: 6,
    slug: "stuart-russell",
    name: "Dr. Stuart Russell",
    avatar: "/professor-older-man-portrait.jpg",
    affiliation: "UC Berkeley",
    communities: ["academic", "ea"],
    topics: ["Value Alignment", "Inverse RL", "AI Governance"],
    papers: 287,
    posts: 8,
    hIndex: 94,
    bio: "Professor at UC Berkeley. Author of 'Human Compatible'. Working on provably beneficial AI.",
    fullBio:
      "Dr. Stuart Russell is a professor of Computer Science at UC Berkeley and the author of the standard AI textbook 'Artificial Intelligence: A Modern Approach'. His book 'Human Compatible' outlines his vision for developing AI systems that are provably beneficial to humans. He has been a leading voice on AI safety and governance, advocating for international treaties on autonomous weapons and careful development of advanced AI systems.",
    website: "https://people.eecs.berkeley.edu/~russell",
    twitter: "StuartJRussell",
    googleScholar: "russell456",
    publications: [
      {
        id: 1,
        title: "Artificial Intelligence: A Modern Approach",
        venue: "Pearson",
        year: 2020,
        citations: 89234,
        coauthors: ["Peter Norvig"],
      },
      {
        id: 2,
        title: "Human Compatible: AI and the Problem of Control",
        venue: "Viking",
        year: 2019,
        citations: 1234,
        coauthors: [],
      },
    ],
    collaborators: [4, 3, 12],
  },
  {
    id: 7,
    slug: "holden-karnofsky",
    name: "Holden Karnofsky",
    avatar: "/man-glasses-intellectual-portrait.jpg",
    affiliation: "Open Philanthropy",
    communities: ["ea"],
    topics: ["AI Risk", "Cause Prioritization", "Philanthropy"],
    papers: 5,
    posts: 156,
    hIndex: 4,
    bio: "Co-CEO of Open Philanthropy. Writing extensively on AI risk and transformative AI timelines.",
    fullBio:
      "Holden Karnofsky is the Co-CEO of Open Philanthropy, one of the largest funders of AI safety research. He co-founded GiveWell and has written extensively on effective altruism, cause prioritization, and AI risk. His 'Most Important Century' series has been influential in communicating AI risk to a broader audience.",
    website: "https://www.cold-takes.com",
    twitter: "holdenkarnofsky",
    recentPosts: [
      { id: 1, title: "The Most Important Century", platform: "ea", date: "2024-10-15", karma: 2134, comments: 312 },
      {
        id: 2,
        title: "AI Could Defeat All of Us Combined",
        platform: "ea",
        date: "2024-08-20",
        karma: 1567,
        comments: 234,
      },
    ],
    collaborators: [2, 9],
  },
  {
    id: 8,
    slug: "jan-leike",
    name: "Dr. Jan Leike",
    avatar: "/man-researcher-portrait-german.jpg",
    affiliation: "Anthropic",
    communities: ["academic", "lesswrong"],
    topics: ["Superalignment", "Scalable Oversight", "RLHF"],
    papers: 41,
    posts: 23,
    hIndex: 19,
    bio: "Leading alignment research at Anthropic. Previously led OpenAI's Superalignment team.",
    fullBio:
      "Dr. Jan Leike is a leading alignment researcher currently at Anthropic. He previously led the Superalignment team at OpenAI, which focused on developing techniques for aligning superintelligent AI systems. His research spans reinforcement learning from human feedback, scalable oversight, and recursive reward modeling. He has made significant contributions to both the theoretical foundations and practical implementations of AI alignment techniques.",
    twitter: "janleike",
    googleScholar: "leike789",
    publications: [
      {
        id: 1,
        title: "Deep Reinforcement Learning from Human Preferences",
        venue: "NeurIPS",
        year: 2017,
        citations: 2847,
        coauthors: ["Paul Christiano", "Dario Amodei"],
      },
      {
        id: 2,
        title: "Scalable Agent Alignment via Reward Modeling",
        venue: "arXiv",
        year: 2018,
        citations: 678,
        coauthors: [],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "Thoughts on Superalignment",
        platform: "lesswrong",
        date: "2024-09-30",
        karma: 567,
        comments: 89,
      },
    ],
    collaborators: [1, 3, 5],
  },
  {
    id: 9,
    slug: "katja-grace",
    name: "Katja Grace",
    avatar: "/woman-researcher-portrait.png",
    affiliation: "AI Impacts",
    communities: ["ea", "lesswrong"],
    topics: ["AI Forecasting", "Timelines", "AI Impacts"],
    papers: 12,
    posts: 89,
    hIndex: 8,
    bio: "Founder of AI Impacts. Researching AI timelines and the broader impacts of transformative AI.",
    fullBio:
      "Katja Grace is the founder and lead researcher at AI Impacts, an organization focused on improving our understanding of the likely impacts of advanced AI. Her work includes surveys of AI researchers on timelines and impacts, analysis of historical technological transitions, and investigation of key questions about AI progress. She has been influential in grounding AI timeline discussions in empirical research.",
    website: "https://aiimpacts.org",
    twitter: "KatjaGrace",
    publications: [
      {
        id: 1,
        title: "When Will AI Exceed Human Performance? Evidence from AI Experts",
        venue: "Journal of AI Research",
        year: 2018,
        citations: 567,
        coauthors: [],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "2024 AI Researcher Survey Results",
        platform: "lesswrong",
        date: "2024-11-10",
        karma: 934,
        comments: 123,
      },
      {
        id: 2,
        title: "Discontinuous Progress in AI: An Analysis",
        platform: "ea",
        date: "2024-10-05",
        karma: 456,
        comments: 67,
      },
    ],
    collaborators: [2, 7],
  },
  {
    id: 10,
    slug: "percy-liang",
    name: "Dr. Percy Liang",
    avatar: "/asian-man-professor-portrait.jpg",
    affiliation: "Stanford HAI",
    communities: ["academic"],
    topics: ["Foundation Models", "Benchmarking", "Transparency"],
    papers: 198,
    posts: 6,
    hIndex: 67,
    bio: "Director of Stanford HAI. Leading HELM benchmark development and foundation model research.",
    fullBio:
      "Dr. Percy Liang is an Associate Professor at Stanford University and Director of the Stanford Human-Centered AI Institute (HAI). He leads the development of HELM (Holistic Evaluation of Language Models), a comprehensive benchmark for evaluating foundation models. His research focuses on making AI systems more transparent, robust, and aligned with human values.",
    website: "https://cs.stanford.edu/~pliang",
    twitter: "percyliang",
    googleScholar: "liang012",
    publications: [
      {
        id: 1,
        title: "Holistic Evaluation of Language Models",
        venue: "arXiv",
        year: 2022,
        citations: 1234,
        coauthors: [],
      },
      {
        id: 2,
        title: "On the Opportunities and Risks of Foundation Models",
        venue: "arXiv",
        year: 2021,
        citations: 2345,
        coauthors: ["many"],
      },
    ],
    collaborators: [4, 6],
  },
  {
    id: 11,
    slug: "richard-ngo",
    name: "Richard Ngo",
    avatar: "/young-asian-man-portrait.png",
    affiliation: "Google DeepMind",
    communities: ["academic", "ea", "lesswrong"],
    topics: ["AI Governance", "Alignment Strategy", "AGI Safety"],
    papers: 14,
    posts: 72,
    hIndex: 11,
    bio: "Research scientist at DeepMind. Writing on AI governance and alignment strategy.",
    fullBio:
      "Richard Ngo is a research scientist at Google DeepMind working on AI safety and governance. He is known for his writing on alignment strategy, AI governance, and the societal implications of advanced AI systems. He has contributed to both technical and strategic thinking in the AI safety community, bridging academic research with community discourse.",
    twitter: "RichardMCNgo",
    publications: [
      {
        id: 1,
        title: "The Alignment Problem from a Deep Learning Perspective",
        venue: "arXiv",
        year: 2023,
        citations: 189,
        coauthors: [],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "My Views on AI Governance",
        platform: "lesswrong",
        date: "2024-10-20",
        karma: 678,
        comments: 89,
      },
      {
        id: 2,
        title: "Alignment Strategies for the Next Decade",
        platform: "ea",
        date: "2024-09-01",
        karma: 512,
        comments: 67,
      },
    ],
    collaborators: [3, 12, 5],
  },
  {
    id: 12,
    slug: "victoria-krakovna",
    name: "Dr. Victoria Krakovna",
    avatar: "/woman-scientist-portrait.png",
    affiliation: "Google DeepMind",
    communities: ["academic", "ea"],
    topics: ["Specification Gaming", "AI Safety", "Side Effects"],
    papers: 29,
    posts: 34,
    hIndex: 16,
    bio: "Research scientist at DeepMind. Co-founder of the Future of Life Institute. Expert on specification gaming.",
    fullBio:
      "Dr. Victoria Krakovna is a research scientist at Google DeepMind and a co-founder of the Future of Life Institute. Her research focuses on AI safety, particularly specification gaming (where AI systems find unintended ways to satisfy their objectives) and avoiding negative side effects. She maintains a comprehensive database of specification gaming examples and has contributed to foundational work on safe AI systems.",
    website: "https://vkrakovna.wordpress.com",
    twitter: "vaborinsky",
    googleScholar: "krakovna345",
    publications: [
      {
        id: 1,
        title: "Specification Gaming: The Flip Side of AI Ingenuity",
        venue: "DeepMind Blog",
        year: 2020,
        citations: 234,
        coauthors: [],
      },
      {
        id: 2,
        title: "Avoiding Side Effects in Complex Environments",
        venue: "NeurIPS",
        year: 2019,
        citations: 189,
        coauthors: [],
      },
    ],
    recentPosts: [
      {
        id: 1,
        title: "Updated Specification Gaming Examples Database",
        platform: "ea",
        date: "2024-10-10",
        karma: 423,
        comments: 34,
      },
    ],
    collaborators: [6, 11],
  },
]

export const communityLabels: Record<string, { label: string; color: string }> = {
  academic: { label: "Academic", color: "bg-chart-1/20 text-chart-1 border-chart-1/30" },
  ea: { label: "EA Forum", color: "bg-chart-3/20 text-chart-3 border-chart-3/30" },
  lesswrong: { label: "LessWrong", color: "bg-chart-2/20 text-chart-2 border-chart-2/30" },
}

export function getResearcherBySlug(slug: string): Researcher | undefined {
  return researchers.find((r) => r.slug === slug)
}

export function getResearcherById(id: number): Researcher | undefined {
  return researchers.find((r) => r.id === id)
}
