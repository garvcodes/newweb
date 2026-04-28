export type Bullet = { text: string };

export type Role = {
  organization: string;
  location: string;
  title: string;
  date: string;
  bullets: string[];
  skills?: string[];
  link?: string;
};

export type ResearchPaper = {
  title: string;
  venue: string;
  stack: string[];
  description: string;
  link?: { label: string; href: string };
  figure?: { src: string; alt: string; caption?: string };
};

export type HackathonProject = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  linkLabel?: string;
};

export type Award = {
  title: string;
  organization: string;
  date: string;
  description?: string;
  link?: string;
};

export const education: Role = {
  organization: "University of California, Berkeley",
  location: "Berkeley, CA",
  title: "B.A. in Computer Science",
  date: "Aug 2022 – May 2026",
  bullets: [],
};

export const awards: Award[] = [
  {
    title: "Warren Y. Dere Design Award",
    organization: "UC Berkeley EECS",
    date: "2026",
    description:
      "Awarded by the Department of EECS to a graduating senior whose accomplishments in engineering design are judged most outstanding.",
    link: "https://www2.eecs.berkeley.edu/Students/Awards/4/",
  },
];

export const industryRoles: Role[] = [
  {
    organization: "Phare Bio",
    location: "Boston, MA",
    title: "Machine Learning Intern",
    date: "Sep 2025 – Present",
    skills: ["Python", "PyTorch", "Small Molecule Design", "Platform Development"],
    bullets: [
      "Designing and deploying a scalable benchmarking platform on an HPC environment to evaluate molecular generative models — including JT-VAE, Transformer-based, and diffusion models — across large-scale runs (100k+ generated molecules).",
      "Conducted computational analoging efforts for small-molecule antibiotic programs using REINVENT4 and Chemprop, prioritizing candidate analogs based on predicted activity and developability-relevant properties.",
    ],
  },
  {
    organization: "Google",
    location: "Mountain View, CA",
    title: "Software Engineering Intern",
    date: "May 2025",
    skills: ["C++", "Experimentation", "System Design"],
    bullets: [
      "Contributed to a 20% project exploring conversational recall for dementia patients using the Gemini Voice API; implemented dialogue flows and evaluated engagement to assess feasibility of AI-driven patient support.",
      "Collaborated with the YT Shorts Ads team to design and analyze new content and component placement for Shorts App Ads. Front-end in EML, server-side in C++. Used Google's internal experimentation platform to run gradual rollouts and A/B tests.",
    ],
  },
  {
    organization: "Amazon",
    location: "Sunnyvale, CA",
    title: "Software Development Engineering Intern",
    date: "May 2024",
    skills: ["Java", "System Design", "AWS", "Testing"],
    bullets: [
      "Created Integration and Load Testing CI/CD frameworks for new FireTV Ad Stack plugins, using Java to write tests on temporary Lambda compute to validate packages being added to the version set.",
      "Built a validation pipeline for FireTV Ads plugins entering Setu, Amazon's internal ad-customization tool. Programmed a system-monitoring tool in Java to track CPU, memory, and latency during plugin integration testing.",
    ],
  },
];

export const researchRoles: Role[] = [
  {
    organization: "Innovative Genomics Institute — Ronda Lab",
    location: "Berkeley, CA",
    title: "Student Researcher",
    date: "Oct 2024 – Present",
    skills: ["Protein Prediction Models", "AlphaFold", "Wet Lab Testing"],
    bullets: [
      "Fine-tuned ESM-2 on CRISPR-family proteins to generate novel, compact variants of SpyCas-9 using a custom autoencoder model. Integrated AlphaFold for structural validation.",
    ],
  },
  {
    organization: "UC Berkeley / Icahn School of Medicine at Mount Sinai",
    location: "Remote Collaboration",
    title: "First-Author — Clinical Trial Enrollment Prediction",
    date: "Aug 2024 – Jan 2025",
    bullets: [
      "First-authored draft with a Mount Sinai medical student on EnrollMate, a machine learning framework predicting clinical trial enrollment success.",
    ],
  },
];

export const researchProjects: ResearchPaper[] = [
  {
    title:
      "Contrastive Alignment of Expression and Copy Number Reveals Dosage-Insensitive Genes in Cancer",
    venue: "Accepted to ICLR 2026 MLGenX Workshop",
    stack: ["PyTorch", "Scanpy", "infercnvpy"],
    description:
      "Built a contrastive learning framework aligning scRNA-seq expression and inferred CNV profiles in a shared latent space to identify dosage-insensitive genes in cancer, achieving 87%+ bidirectional top-1 retrieval accuracy on held-out cells.",
    link: {
      label: "Read preprint (bioRxiv)",
      href: "https://www.biorxiv.org/content/10.64898/2026.03.01.708901v1.full.pdf",
    },
    figure: {
      src: "/contrastive_pretraining.png",
      alt: "Contrastive pretraining schematic — expression and CNV embeddings aligned in a shared latent space.",
      caption: "Contrastive pretraining schematic",
    },
  },
  {
    title:
      "Fine-Tuning Genomic Language Models for Variant Pathogenicity Prediction",
    venue: "Under Review at ISMB 2026",
    stack: ["PyTorch", "LoRA", "Transformers", "Mamba"],
    description:
      "Benchmarked Nucleotide Transformer and Caduceus on ClinVar missense variant classification, showing variant-position embeddings outperform mean pooling and that LoRA reaches 0.886 validation AUC with only 0.76% trainable parameters.",
  },
  {
    title: "EnrollMate — Clinical Trial Enrollment Prediction",
    venue: "Preprint, 2025",
    stack: ["Machine Learning", "Healthcare"],
    description:
      "First-authored preprint with collaborators at the Icahn School of Medicine at Mount Sinai introducing a machine learning framework for predicting clinical trial enrollment success.",
  },
];

export const hackathonProjects: HackathonProject[] = [
  {
    title: "Neural Net Neutrality",
    description:
      "An open-source project tracking how large language models' political leanings shift across versions, scoring responses to policy statements on economic and social axes and publishing reproducible time-series data.",
    tags: ["Python", "OpenAI API", "Data Viz"],
    link: "https://garvcodes.github.io/Neural-Net-Neutrality/index.html",
    linkLabel: "View site",
  },
  {
    title: "Scrapbook",
    description:
      "Collaborative scrapbooking app built at a hackathon — share moments with friends through a shared timeline.",
    tags: ["React", "Next.js", "Node.js"],
    link: "https://devpost.com/software/scrapbook-5h0f4v",
    linkLabel: "Devpost",
  },
  {
    title: "LEED Bud",
    description:
      "An OpenAI-powered assistant for navigating LEED green-building certification requirements.",
    tags: ["React", "TypeScript", "OpenAI"],
    link: "https://devpost.com/software/leed-bud",
    linkLabel: "Devpost",
  },
  {
    title: "TrashToTreasure",
    description:
      "A sustainability marketplace pairing reusable materials with people who can give them a second life.",
    tags: ["Next.js", "MongoDB", "Express"],
    link: "https://devpost.com/software/trashtotreasure-sustainable-showcase",
    linkLabel: "Devpost",
  },
];
