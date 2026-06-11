# Dracania Archives

Community archive for Drakensang Online: items, sets, gems, runes, events, codes, contributions, and admin moderation.

## Stack

- Next.js 14
- Convex (database, auth, cron)
- Tailwind CSS + Radix UI

## Local Development

```bash
npm install
cp .env.example .env.local
npx convex dev
npm run dev
```

## Item Images

Copy item PNG backups into `public/images/db/items/`, then:

```bash
npm run images:thumbs
```

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md) for the zero-cost deployment guide (Vercel + Convex + free domain).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run images:thumbs` | Generate item thumbnails |
| `npm run export:static` | Export approved Convex data to JSON |
