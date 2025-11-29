export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription?: string
  status: "active" | "completed" | "paused" | "seeking-collaborators"
  source: "academic" | "lesswrong" | "ea" | "independent"
  topics: string[]
  leads: { name: string; slug?: string }[]
  collaborators?: { name: string; slug?: string }[]
  organizations: string[]
  startDate: string
  endDate?: string
  funding?: string
  links: {
    website?: string
    github?: string
    paper?: string
    forum?: string
  }
  outputs?: {
    papers: number
    posts: number
    tools: number
  }
}

export const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  completed: { label: "Completed", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  paused: { label: "Paused", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  "seeking-collaborators": {
    label: "Seeking Collaborators",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
}

export const sourceLabels: Record<string, { label: string; color: string }> = {
  academic: { label: "Academic", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  lesswrong: { label: "LessWrong", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  ea: { label: "EA Forum", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  independent: { label: "Independent", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
}

export const allProjectTopics = [
  "Interpretability",
  "Alignment",
  "RLHF",
  "AI Governance",
  "Robustness",
  "Scalable Oversight",
  "Value Learning",
  "Agent Foundations",
  "Deception Detection",
  "Corrigibility",
  "AI Policy",
  "Forecasting",
  "Evaluation",
  "Red Teaming",
  "Constitutional AI",
]

export const projects: Project[] = [
  {
    id: "1",
    slug: "circuits-interpretability",
    title: "Circuits-Based Neural Network Interpretability",
    description:
      "Reverse-engineering neural networks by identifying and understanding individual circuits and their functions within transformer models.",
    longDescription:
      "This project aims to develop a comprehensive understanding of how neural networks process information by identifying discrete circuits responsible for specific behaviors. We study attention heads, MLPs, and their interactions to build mechanistic explanations of model capabilities.",
    status: "active",
    source: "academic",
    topics: ["Interpretability", "Mechanistic Interpretability", "Deep Learning"],
    leads: [{ name: "Chris Olah", slug: "chris-olah" }],
    collaborators: [{ name: "Neel Nanda", slug: "neel-nanda" }],
    organizations: ["Anthropic"],
    startDate: "2020-01",
    funding: "$2M+",
    links: {
      website: "https://transformer-circuits.pub",
      github: "https://github.com/anthropics/transformer-circuits",
    },
    outputs: { papers: 12, posts: 8, tools: 3 },
  },
  {
    id: "2",
    slug: "constitutional-ai",
    title: "Constitutional AI Development",
    description:
      "Developing AI systems that follow a set of principles (a 'constitution') to guide their behavior without extensive human feedback on every output.",
    status: "active",
    source: "academic",
    topics: ["Alignment", "Constitutional AI", "RLHF"],
    leads: [{ name: "Yuntao Bai" }],
    organizations: ["Anthropic"],
    startDate: "2022-06",
    links: {
      paper: "https://arxiv.org/abs/2212.08073",
    },
    outputs: { papers: 5, posts: 3, tools: 1 },
  },
  {
    id: "3",
    slug: "alignment-forum-research",
    title: "Agent Foundations Research Agenda",
    description:
      "Theoretical research on the mathematical foundations of aligned AI agents, including decision theory, logical uncertainty, and embedded agency.",
    status: "active",
    source: "lesswrong",
    topics: ["Agent Foundations", "Decision Theory", "Alignment"],
    leads: [{ name: "Eliezer Yudkowsky", slug: "eliezer-yudkowsky" }],
    collaborators: [{ name: "Scott Garrabrant" }],
    organizations: ["MIRI"],
    startDate: "2015-01",
    links: {
      forum: "https://www.lesswrong.com/tag/agent-foundations",
    },
    outputs: { papers: 20, posts: 50, tools: 2 },
  },
  {
    id: "4",
    slug: "ai-governance-mapping",
    title: "Global AI Governance Mapping Project",
    description:
      "Comprehensive mapping of AI governance initiatives, policies, and actors worldwide to inform effective policy interventions.",
    status: "active",
    source: "ea",
    topics: ["AI Governance", "AI Policy", "Forecasting"],
    leads: [{ name: "Allan Dafoe" }],
    organizations: ["Centre for the Governance of AI", "Oxford University"],
    startDate: "2021-03",
    funding: "$500K",
    links: {
      website: "https://governance.ai",
    },
    outputs: { papers: 8, posts: 15, tools: 1 },
  },
  {
    id: "5",
    slug: "scalable-oversight",
    title: "Scalable Oversight Methods",
    description:
      "Developing techniques for humans to effectively oversee AI systems even when the AI is performing tasks the human cannot directly evaluate.",
    status: "seeking-collaborators",
    source: "academic",
    topics: ["Scalable Oversight", "Alignment", "Evaluation"],
    leads: [{ name: "Jan Leike" }],
    organizations: ["OpenAI"],
    startDate: "2022-01",
    links: {
      paper: "https://arxiv.org/abs/2211.03540",
    },
    outputs: { papers: 6, posts: 4, tools: 2 },
  },
  {
    id: "6",
    slug: "red-teaming-llms",
    title: "Systematic Red Teaming for Large Language Models",
    description:
      "Developing comprehensive methodologies for identifying vulnerabilities, harmful outputs, and failure modes in large language models.",
    status: "active",
    source: "academic",
    topics: ["Red Teaming", "Evaluation", "Robustness"],
    leads: [{ name: "Deep Ganguli" }],
    organizations: ["Anthropic"],
    startDate: "2022-08",
    links: {
      paper: "https://arxiv.org/abs/2202.03286",
    },
    outputs: { papers: 4, posts: 6, tools: 2 },
  },
  {
    id: "7",
    slug: "deception-detection",
    title: "AI Deception Detection Research",
    description:
      "Investigating methods to detect when AI systems are being deceptive or strategically withholding information from users or overseers.",
    status: "active",
    source: "lesswrong",
    topics: ["Deception Detection", "Alignment", "Interpretability"],
    leads: [{ name: "Evan Hubinger", slug: "evan-hubinger" }],
    organizations: ["Anthropic", "MIRI"],
    startDate: "2021-06",
    links: {
      forum: "https://www.lesswrong.com/posts/A9NxPTwbw6r6Awuwt/how-likely-is-deceptive-alignment",
    },
    outputs: { papers: 3, posts: 12, tools: 1 },
  },
  {
    id: "8",
    slug: "eliciting-latent-knowledge",
    title: "Eliciting Latent Knowledge (ELK)",
    description:
      "Research program focused on getting AI systems to honestly report their internal knowledge, even when they might have incentives to be deceptive.",
    status: "active",
    source: "independent",
    topics: ["Alignment", "Interpretability", "Value Learning"],
    leads: [{ name: "Paul Christiano", slug: "paul-christiano" }],
    organizations: ["ARC"],
    startDate: "2021-12",
    funding: "$1M+",
    links: {
      website: "https://docs.google.com/document/d/1WwsnJQstPq91_Yh-Ch2XRL8H_EpsnjrC1dwZXR37PC8",
    },
    outputs: { papers: 2, posts: 8, tools: 1 },
  },
  {
    id: "9",
    slug: "cooperative-ai",
    title: "Cooperative AI Foundation Research",
    description:
      "Studying how to build AI systems that can cooperate effectively with humans and other AI systems, including multi-agent coordination.",
    status: "active",
    source: "academic",
    topics: ["Agent Foundations", "AI Governance", "Value Learning"],
    leads: [{ name: "Gillian Hadfield" }],
    collaborators: [{ name: "Allan Dafoe" }],
    organizations: ["DeepMind", "Oxford University"],
    startDate: "2020-09",
    links: {
      website: "https://www.cooperativeai.com",
    },
    outputs: { papers: 10, posts: 5, tools: 0 },
  },
  {
    id: "10",
    slug: "ai-existential-safety",
    title: "AI Existential Safety Research Program",
    description:
      "Long-term research program focused on ensuring transformative AI systems do not pose existential risks to humanity.",
    status: "active",
    source: "ea",
    topics: ["AI Risk", "Alignment", "AI Governance"],
    leads: [{ name: "Toby Ord" }],
    organizations: ["Future of Humanity Institute", "Oxford University"],
    startDate: "2018-01",
    funding: "$3M+",
    links: {
      website: "https://www.fhi.ox.ac.uk",
    },
    outputs: { papers: 15, posts: 20, tools: 0 },
  },
  {
    id: "11",
    slug: "shard-theory",
    title: "Shard Theory of Human Values",
    description:
      "Developing a theory of how human values arise from reinforcement learning, with implications for value alignment in AI systems.",
    status: "active",
    source: "lesswrong",
    topics: ["Value Learning", "Alignment", "Agent Foundations"],
    leads: [{ name: "Alex Turner" }],
    organizations: ["Independent"],
    startDate: "2022-03",
    links: {
      forum: "https://www.lesswrong.com/posts/iCfdcxiyr2Kj8m8mT/the-shard-theory-of-human-values",
    },
    outputs: { papers: 1, posts: 15, tools: 0 },
  },
  {
    id: "12",
    slug: "model-evals-safety",
    title: "Dangerous Capability Evaluations",
    description:
      "Creating standardized evaluations for dangerous capabilities in AI models including autonomous replication, deception, and resource acquisition.",
    status: "seeking-collaborators",
    source: "academic",
    topics: ["Evaluation", "Red Teaming", "AI Risk"],
    leads: [{ name: "Ethan Perez" }],
    organizations: ["Anthropic"],
    startDate: "2023-01",
    links: {
      paper: "https://arxiv.org/abs/2305.15324",
    },
    outputs: { papers: 3, posts: 2, tools: 4 },
  },
  {
    id: "13",
    slug: "alignment-tax",
    title: "Measuring the Alignment Tax",
    description:
      "Quantifying the performance costs of various alignment techniques to understand tradeoffs between capability and safety.",
    status: "completed",
    source: "academic",
    topics: ["Alignment", "RLHF", "Evaluation"],
    leads: [{ name: "Samuel Bowman" }],
    organizations: ["NYU", "Anthropic"],
    startDate: "2022-06",
    endDate: "2023-09",
    links: {
      paper: "https://arxiv.org/abs/2309.02144",
    },
    outputs: { papers: 2, posts: 1, tools: 1 },
  },
  {
    id: "14",
    slug: "ai-safety-camp",
    title: "AI Safety Camp Research Projects",
    description:
      "Collaborative research sprints bringing together aspiring AI safety researchers to work on concrete technical problems.",
    status: "active",
    source: "ea",
    topics: ["Alignment", "Interpretability", "Robustness"],
    leads: [{ name: "Remmelt Ellen" }],
    organizations: ["AI Safety Camp"],
    startDate: "2018-01",
    links: {
      website: "https://aisafety.camp",
    },
    outputs: { papers: 8, posts: 25, tools: 5 },
  },
  {
    id: "15",
    slug: "corrigibility-research",
    title: "Formal Corrigibility Frameworks",
    description:
      "Developing mathematical frameworks for building AI systems that remain safely interruptible and modifiable by human operators.",
    status: "paused",
    source: "lesswrong",
    topics: ["Corrigibility", "Agent Foundations", "Alignment"],
    leads: [{ name: "Nate Soares" }],
    organizations: ["MIRI"],
    startDate: "2017-01",
    endDate: "2022-12",
    links: {
      forum: "https://www.lesswrong.com/tag/corrigibility",
    },
    outputs: { papers: 6, posts: 18, tools: 0 },
  },
  {
    id: "16",
    slug: "steering-vectors",
    title: "Activation Steering and Control Vectors",
    description:
      "Research on using activation engineering to steer model behavior without fine-tuning, enabling interpretable behavioral modifications.",
    status: "active",
    source: "independent",
    topics: ["Interpretability", "Alignment", "Robustness"],
    leads: [{ name: "Nina Rimsky" }],
    organizations: ["Independent", "Anthropic"],
    startDate: "2023-05",
    links: {
      github: "https://github.com/steering-vectors",
    },
    outputs: { papers: 2, posts: 6, tools: 3 },
  },
]
