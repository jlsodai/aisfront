# AI Safety Connect

AI Safety Connect is a platform designed to bridge the gap between academic researchers and EA/LessWrong AI safety communities. It maps researchers, projects, and topics to accelerate AI safety collaboration.

## Features

- **Researcher Directory**: Browse and search for researchers across different communities (Academia, EA, Rationalist).
- **Projects Directory**: Discover AI safety projects and initiatives.
- **Papers Archive**: Access a curated collection of AI safety research papers.
- **Researcher Profiles**: Detailed profiles showcasing research interests, publications, and affiliations.
- **Network Visualization**: Visual representation of connections between researchers and topics.
- **Resource Hub**: Access to data sources and community resources.
- **Authentication**: Secure user authentication powered by Supabase.
- **Modern UI**: Built with a clean, accessible, and responsive design using Tailwind CSS and Shadcn UI.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)
- **Animation**: [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Backend/Auth**: [Supabase](https://supabase.com/)

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
npm run dev
```

```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Optional: Redirect URL for local development authentication
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-url.com/api
```

### Mock API Server

This project uses a mock API server (json-server) to simulate backend data. You need to run this in a separate terminal window:

```bash
npm run api
```

The API server runs on `http://localhost:3033`.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `about/`: About page.
  - `auth/`: Authentication pages (login, signup, etc.).
  - `researchers/`: Researcher directory and individual profile pages.
  - `projects/`: Projects directory.
  - `papers/`: Papers archive.
- `components/`: Reusable UI components.
  - `ui/`: Base UI components (buttons, inputs, etc.).
- `lib/`: Utility functions.
- `data/`: Mock data (db.json) for the API server.
- `public/`: Static assets (images, icons).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
