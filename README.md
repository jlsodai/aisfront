# AI Safety Connect

AI Safety Connect is a platform designed to bridge the gap between academic researchers and EA/LessWrong AI safety communities. It maps researchers, projects, and topics to accelerate AI safety collaboration.

## Features

- **Researcher Directory**: Browse and search for researchers across different communities (Academia, EA, Rationalist).
- **Researcher Profiles**: Detailed profiles showcasing research interests, publications, and affiliations.
- **Network Visualization**: Visual representation of connections between researchers and topics.
- **Resource Hub**: Access to data sources and community resources.
- **Modern UI**: Built with a clean, accessible, and responsive design using Tailwind CSS and Shadcn UI.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)
- **Animation**: [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `about/`: About page.
  - `researchers/`: Researcher directory and individual profile pages.
- `components/`: Reusable UI components.
  - `ui/`: Base UI components (buttons, inputs, etc.).
- `lib/`: Utility functions and mock data.
- `public/`: Static assets (images, icons).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
