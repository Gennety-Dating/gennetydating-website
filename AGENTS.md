AI Coding Agent Instructions (Gennety Landing Page)

1. Project Overview & Role

You are an expert Frontend Developer and Solution Architect. Your task is to build a high-fidelity, single-column landing page for Gennety (an AI-driven student dating service).
Strictly follow this specification. Do not invent new features or sections not explicitly mentioned here.

1.1. Environment & Project Variables

IMPORTANT FOR AGENT: Use the following variables whenever specific links, keys, or metadata are required.
(USER: Replace the values in the brackets before starting the agent)

[TELEGRAM_BOT_URL]: <ВСТАВЬТЕ_ССЫЛКУ_НА_ВАШЕГО_БОТА> (e.g., https://www.google.com/search?q=https://t.me/GennetyBot) - Use this for the primary CTA buttons.

[dating@gennety.com]: <> - Use this for footer or FAQ contacts.

2. Tech Stack & Architecture

Framework: Next.js 14+ (App Router strictly).

Language: TypeScript (Strict mode enabled).

Styling: Tailwind CSS + CSS Modules (if complex animations/textures require it).

Animation & Interactivity: Framer Motion (for marquee, accordion, scroll animations).

Utility Libraries: clsx, tailwind-merge (for dynamic class composition), lucide-react (for icons).

Architecture Pattern: Feature-Sliced/Component-Driven.

3. Coding Standards & Constraints

Next.js App Router Rules

Default to React Server Components (RSC): All components must be server components by default to optimize bundle size.

Client Boundaries: Use "use client" only at the deepest possible level (e.g., specific interactive components like CountdownTimer, Carousel, Accordion, Marquee).

Data Layer: There is no active database for this landing page. Use a mock data layer (e.g., src/lib/data.ts) to store FAQs, Testimonials, and Step data to keep components clean.

Styling & UI Rules

Midnight Contrast Theme: * Base BG: #050505.

Accent: #FF00FF (Electric Magenta).

Text: #FFFFFF.

Neon Bloom Effect: When generating magenta elements, ALWAYS apply a custom Tailwind drop-shadow or box-shadow (e.g., drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]).

Typography: Use next/font/google.

Sans-serif (Body): Inter or Geist.

Serif (H1/Headers): Playfair Display or similar elegant serif (lowercase).

Handwritten (Accents): Caveat or similar expressive script.

Digital Scrapbook Aesthetic: Use CSS transforms (rotate-1, -rotate-2), absolute positioning, and custom CSS for textures (noise, CRT scanlines). Use backdrop-filter: blur() for glassmorphism.

Responsive Layout: Mobile-first approach. Ensure sections have large vertical padding (py-24 or py-32 for 120px+).

4. Context Mapping (Directory Structure)

Create the following structure to modularize the application:

src/
├── app/
│   ├── layout.tsx         # Global fonts, CRT/Noise overlay
│   ├── page.tsx           # Assembly of all sections
│   └── globals.css        # Tailwind directives, custom neon utilities, noise texture
├── components/
│   ├── ui/                # Reusable atoms
│   │   ├── button.tsx     # Standardized buttons (Ghost, Pill)
│   │   ├── typography.tsx # H1, H2, Script accents
│   │   ├── polaroid.tsx   # Scrapbook polaroid wrapper
│   │   └── sticker.tsx    # Scrapbook sticker element
│   ├── sections/          # Page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── RealDates.tsx
│   │   ├── Matchmaker.tsx
│   │   ├── TestimonialsCarousel.tsx # "use client"
│   │   ├── Comparison.tsx
│   │   ├── Safety.tsx
│   │   ├── FAQ.tsx        # "use client" (Accordion logic)
│   │   ├── Marquee.tsx    # "use client"
│   │   └── Footer.tsx
├── lib/
│   ├── data.ts            # Content for FAQs, Testimonials, Steps
│   └── utils.ts           # tailwind-merge and clsx utilities (cn function)
└── public/
    └── images/            # Placeholders for polaroids, backgrounds, icons


5. Step-by-Step Implementation Guide

Phase 1: Setup & Core Configuration

Initialize Next.js project with App Router, TypeScript, and Tailwind.

Update tailwind.config.ts: Add custom colors (midnight: '#050505', magenta: '#FF00FF'), and custom glow/shadow utilities.

Configure next/font/google in layout.tsx for the three required font families.

Add global CSS in globals.css for the "subtle grain texture" background and optional CRT scanlines overlay.

Phase 2: Design System & UI Atoms (Server Components)

Build Button component (variants: ghost, solid pill with magenta text).

Build reusable typographic components (Heading, ScriptHighlight).

Build the aesthetic wrappers: PolaroidCard (white border, slight rotation), MessageBubble (glassmorphism/iOS style).

Phase 3: Static Section Development (Top to Bottom)

Navbar: Fixed, transparent, glassmorphic if scrolled.

Hero: Implement H1 with script highlight, layout the Polaroid visual, build the CountdownTimer (use client), and the Telegram CTA button.

How It Works: Create the zigzag layout using CSS Grid or Flexbox.

Real Dates Delivered: Position text over images and implement the absolute-positioned "stickers" with slight rotations.

Your Personalized Matchmaker: 3-column CSS Grid.

Comparison: 2-column layout (iOS style vs. Crumpled paper style).

Verified. Private. Safe: 3-column layout with SVG/Lucide icons replacing the 3D models/stamps as placeholders.

Phase 4: Interactive Components ("use client")

TestimonialsCarousel: Use Framer Motion to create an auto-scrolling horizontal row of square photos + overlapping iMessage bubbles.

FAQ Accordion: Implement a minimalist black accordion. Ensure the magenta arrows rotate 180 degrees on open.

Marquee: Build a continuous infinite scrolling text banner using Framer Motion or pure CSS animations.

Phase 5: Polish & Final Review

Ensure py-[120px] spacing between major sections.

Verify all text is #FFFFFF and legible against the #050505 background.

Check the "Neon Bloom" effect on all #FF00FF elements.

Verify mobile responsiveness (stack grids to 1 column on < md screens).

6. Strict Development Directives

DO NOT use complex state management (Redux, Zustand) for this. React state is sufficient for local UI states.

DO NOT build a backend API. Hardcode all textual content, FAQs, and dummy data into src/lib/data.ts.

ALWAYS provide fallback backgrounds or placeholder divs for images described in the spec (e.g., cinematic nocturnal campus) using simple CSS gradients until real assets are provided.

CTA Action: The "Message Ditto to Join" button should use an href formatted as https://t.me/gennetybot or a simple mailto: placeholder for now.