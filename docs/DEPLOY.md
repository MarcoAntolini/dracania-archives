# Deploy Guide (Zero-Cost Stack)

## Stack

- Frontend: Next.js on Vercel Hobby
- Backend/Auth/DB: Convex Free
- Domain: DigitalPlat FreeDomain (`*.dpdns.org`)
- Item images: static files in `public/images/db/items`

## 1. Restore Item Images

Copy your backup into:

```text
public/images/db/items/
```

Then generate thumbnails:

```bash
npm run images:thumbs
```

## 2. Environment Variables

Copy `.env.example` to `.env.local` for local development.

Set these in Vercel and Convex:

| Variable | Where |
| --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | Vercel |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | Vercel |
| `CONVEX_SITE_URL` | Convex dashboard |
| `NEXT_PUBLIC_APP_URL` | Vercel (after domain is live) |
| `EMAIL_DOMAIN` | Vercel |
| `MAILERSEND_API_KEY` | Vercel (optional) |
| `STRIPE_KEY` | Vercel (optional) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Vercel (optional) |

Keep `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=false` unless you explicitly want Vercel Analytics.

## 3. Deploy Convex

```bash
npx convex deploy
```

Set `CONVEX_SITE_URL` in the Convex dashboard to your production site URL once known.

## 4. Deploy Vercel

```bash
npx vercel
```

For production:

```bash
npx vercel --prod
```

## 5. Free Domain (DigitalPlat)

1. Register a domain at [domain.digitalplat.org](https://domain.digitalplat.org)
2. Prefer `your-name.dpdns.org`
3. Point DNS to Vercel:
   - `CNAME @` -> `cname.vercel-dns.com`
   - or use Vercel's exact DNS instructions from Project Settings -> Domains
4. Add the custom domain in Vercel
5. Update `NEXT_PUBLIC_APP_URL` to `https://your-name.dpdns.org`

## 6. MailerSend (Optional)

If you want transactional email:

1. Verify `EMAIL_DOMAIN` in MailerSend
2. Add the DNS records MailerSend requests (TXT/CNAME)
3. Set `ENABLE_EMAIL=true`

If domain verification fails on a free subdomain, keep `ENABLE_EMAIL=false`; the app will still work without outbound email.

## 7. Static Fallback Export

Export approved Convex data for a read-only backup:

```bash
npm run export:static
```

Output goes to `src/data/static-fallback/`.

## Cost Controls

- `next.config.js` sets `images.unoptimized: true` to avoid Vercel Image Optimization billing
- UI sprites use `StaticImage` (`<img>`) instead of optimized `next/image`
- Item thumbnails are pre-generated locally, not resized at runtime
- PostHog and Vercel Analytics are disabled unless explicitly enabled
