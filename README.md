# BlocksBridge - Strategic Communications Website

A minimal, high-performance Next.js website for BlocksBridge Consulting, a strategic communications firm serving Bitcoin miners, treasury companies, and hyperscalers.

## Features

- **Minimal & Clean Code**: Fast load times, optimized for performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component-Based**: Built with shadcn/ui components
- **Image Headers**: All pages feature hero images with gradient overlays
- **SEO Optimized**: Metadata on all pages, optimized images
- **Modern Navigation**: Clean navbar and footer navigation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Deployment**: Ready for Vercel

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Header/Footer
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── about/page.tsx       # About Us page
│   │   ├── experience/page.tsx  # Our Experience page
│   │   ├── network/page.tsx     # Network page
│   │   ├── insights/page.tsx    # Insights/Blog page
│   │   └── contact/page.tsx     # Contact page
│   ├── components/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Footer with links
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── public/
│       └── images/             # Local images (if used)
├── .env.local.example          # Environment variables template
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Pages

### Home (/)
- Hero section with CTA
- "What we solve" section (4 problem statements)
- Services overview (6 core services)
- BlocksBridge Network showcase
- Testimonials
- Team members
- Final CTA

### About (/about)
- Company narrative and mission
- Core values (Senior time, Clarity, Confidentiality)
- Services list with descriptions

### Our Experience (/experience)
- Client logos grid
- Results achieved (4 case studies)
- Detailed testimonials

### Network (/network)
- The Miner Mag information with CTA
- Miner Weekly newsletter signup
- Events information

### Insights (/insights)
- Blog post listing
- Latest articles from The Miner Mag
- Link to full publication

### Contact (/contact)
- Contact form (Name, Email, Company, Message)
- Contact information
- Social media links
- FAQ section

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. **Install dependencies** (already done):
```bash
npm install
```

2. **Set up environment** (optional):
```bash
cp .env.local.example .env.local
# Edit .env.local with your values if needed
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Production Build

Build for production:
```bash
npm run build
npm run start
```

### Linting

Check code quality:
```bash
npm run lint
```

## Customization

### Colors & Branding

Edit `tailwind.config.ts` to customize colors:
- Primary blue: `from-blue-900 to-blue-800`
- Accent: `text-blue-600`

### Images

- Hero images are currently sourced from Unsplash (external URLs)
- To use local images, place them in `public/images/` and update image paths

### Contact Form

Currently logs to console. To enable backend submission:
1. Set up Supabase project
2. Create `contact_submissions` table
3. Update `src/app/contact/page.tsx` with your Supabase client

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (zero-config)

## Performance

- ✅ Static prerendered pages
- ✅ Image optimization with Next.js Image component
- ✅ Minimal dependencies
- ✅ Tailwind CSS purging

## SEO & Accessibility

- ✅ Meta titles and descriptions on all pages
- ✅ Image alt text
- ✅ Semantic HTML
- ✅ WCAG AA color contrast
- ✅ Keyboard navigation support
