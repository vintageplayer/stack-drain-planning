# Stack Drain Web (Infra Debt POC)

Single-page Next.js + Tailwind app for lifecycle-based infra debt analysis.

## Local Development

```bash
cd apps/web
npm install
npm run dev
```

## Test

```bash
cd apps/web
npm run test
```

## Production Build

```bash
cd apps/web
npm run build
npm run start
```

## Vercel Deploy

1. Import the monorepo in Vercel.
2. Set **Root Directory** to `apps/web`.
3. Framework preset: **Next.js**.
4. Build command: `next build` (default).
5. Output directory: default `.next`.
6. Deploy.

## Notes

- Uses local static lifecycle rules in `data/lifecycle-rules.json`.
- No auth, persistence, or external APIs in v1.
