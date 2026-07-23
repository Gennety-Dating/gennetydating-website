# Gennety Dating Landing Page

Premium high-fidelity landing page for **Gennety** — an AI-driven romantic matchmaking service for university students. Gennety removes traditional swipe mechanics and endless messaging, opting to curate real in-person dates based on LLM-derived profiles, calendar availability, and location compatibility.

This repository hosts the public-facing promotional website and cookie consent logging system.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Libraries:** React 19, [Framer Motion](https://www.framer.com/motion/) (marquee, countdown, animations), [Lucide React](https://lucide.dev/) (icons)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database/Consent Storage:** Neon Postgres (via `pg` pool) & Supabase auth/client utilities (for consent logging)
- **Testing:** [Vitest](https://vitest.dev/)

---

## 🎨 Visual Identity ("Midnight Contrast")

The landing page follows a digital scrapbook aesthetic, consisting of:
- **Base Background:** Deep Pitch Black (`#050505`) with a subtle grain/noise overlay and CRT scanlines texture.
- **Accents:** Electric Magenta (`#FF00FF`) with a signature **Neon Bloom** drop-shadow/outer-glow effect.
- **Typography:** Sleek white copy using editorial serif headings, handwritten accents, and Geist/Inter body fonts.
- **Elements:** Polaroid film snapshots, physical-looking stickers, crumpled paper comparisons, and custom SVGs.

---

## 📂 Key Features & Structure

1. **Navbar:** Translucent, glassmorphic floating menu with responsive mobile toggles.
2. **Hero Section:** Centered minimalist purple star with the script headline `"go on a date with your type"`, a live countdown timer, and the primary Telegram CTA (`Message Ditto to Join`).
3. **How It Works:** A staggered 4-step timeline outlining preference submission, the Thursday match drop, scheduling, and meeting up.
4. **Real Dates Delivered:** Student engagement statistics presented as overlapping metric stickers.
5. **Personalized Matchmaker:** 3-column feature grid explaining the AI research backing, user profiling, and pool matching mechanism.
6. **Unforgettable Great Times:** Responsive testimonial cards with auto-scrolling motion animations and overlapping iMessage-styled quotes.
7. **Tired of Tinder & Badoo?:** Visual comparison of Gennety's clean notification flow against messy competitor interfaces.
8. **Verified. Private. Safe.:** Highlight of key trust structures (university domain domain gating, absolute privacy, on-campus dates).
9. **FAQ Accordion:** Custom black accordion list with animated magenta arrows.
10. **Marquee + Manifesto:** Infinite scrolling text banner overlaying campus imagery with links to the team manifesto.
11. **Consent Banner:** Standard-compliant cookie consent drawer linked to a secure serverless storage endpoint.

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Public API Endpoint for Registration Modals (Backend Bot/API)
NEXT_PUBLIC_GENNETY_API_URL=https://dating-api.gennety.com/v1

# Primary Telegram Bot URI
NEXT_PUBLIC_TELEGRAM_BOT_URL=https://t.me/GennetyBot

# Neon Postgres (Pooled connection for Next.js runtime API)
DATABASE_URL=postgresql://user:password@ep-example-pooler.region.aws.neon.tech/dbname?sslmode=require

# Neon Postgres (Direct connection for migrations/scripts)
DATABASE_URL_DIRECT=postgresql://user:password@ep-example.region.aws.neon.tech/dbname?sslmode=require

# Cryptographic Salt for Privacy-Preserving Consent IP Hashing
CONSENT_IP_SALT=your-long-random-salt-here

# Cookie Policy Version Tracker
POLICY_VERSION=2026-07-23
NEXT_PUBLIC_POLICY_VERSION=2026-07-23
```

---

## 🗄️ Consent Storage & Migrations

Consent events are safely logged to Neon Postgres via `POST /api/consent` to protect user privacy according to GDPR standards.

To run migrations against the Neon target database:
```bash
npm run db:migrate:consent
```

This runs the SQL file located in [migrations/20260520000000_cookie_consents.sql](file:///Users/pro/Desktop/Gennety%20dating%20website/migrations/20260520000000_cookie_consents.sql):
```sql
CREATE TABLE IF NOT EXISTS public.cookie_consents (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(50) NOT NULL,
    policy_version VARCHAR(50) NOT NULL,
    session_id VARCHAR(255),
    page_url TEXT,
    ip_hash VARCHAR(64)
);
```

You can verify that records are correctly logged using this SQL command:
```sql
SELECT id, created_at, action, policy_version, session_id, page_url FROM public.cookie_consents ORDER BY created_at DESC LIMIT 10;
```

---

## 🛠️ Development & Deployment

### Commands

- **Install dependencies:**
  ```bash
  npm install
  ```
- **Start development server:**
  ```bash
  npm run dev
  ```
- **Compile production build:**
  ```bash
  npm run build
  ```
- **Run linting & type checks:**
  ```bash
  npm run lint
  ```
- **Run tests:**
  ```bash
  npm run test
  ```

### Vercel Deployment

1. Import the repository in Vercel.
2. Bind the environment variables listed in the configuration section.
3. Vercel will automatically run `npm run build` and provision serverless edge nodes for `app/api/consent`.
