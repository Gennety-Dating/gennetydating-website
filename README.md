This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Set the backend API URL used by the registration modal:

```bash
NEXT_PUBLIC_GENNETY_API_URL=http://localhost:3101/v1
```

Set cookie consent logging env vars:

```bash
DATABASE_URL=postgresql://user:password@ep-example-pooler.region.aws.neon.tech/dbname?sslmode=require
DATABASE_URL_DIRECT=postgresql://user:password@ep-example.region.aws.neon.tech/dbname?sslmode=require
CONSENT_IP_SALT=replace-with-a-long-random-secret
POLICY_VERSION=2026-04-01
NEXT_PUBLIC_POLICY_VERSION=2026-04-01
```

`DATABASE_URL` is the pooled Neon connection string used by the Next.js runtime.
`DATABASE_URL_DIRECT` is the direct Neon connection string used only for migrations/admin tasks.
`POLICY_VERSION` and `NEXT_PUBLIC_POLICY_VERSION` must match.

## Cookie Consent Storage

Cookie banner consent events are logged to Neon Postgres through `POST /api/consent`.
Supabase auth/admin code is still present for other app features, but consent storage uses ordinary PostgreSQL only.

Create a Neon project manually:

1. Open the Neon Console and create a new project.
2. Create or select the database and role for this website.
3. In the connection details, copy the pooled connection string for `DATABASE_URL`.
4. Copy the direct connection string for `DATABASE_URL_DIRECT`.
5. Store both values in local/Vercel environment variables. Do not expose either value to client code.

Run the consent migration only after confirming the target Neon project:

```bash
npm run db:migrate:consent
```

The script uses `DATABASE_URL_DIRECT` and runs:

```bash
psql "$DATABASE_URL_DIRECT" -f migrations/20260520000000_cookie_consents.sql
```

Verify records are being written:

```sql
select id, created_at, action, policy_version, session_id, page_url
from public.cookie_consents
order by created_at desc
limit 10;
```

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
