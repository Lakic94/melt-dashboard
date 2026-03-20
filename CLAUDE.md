# MELT Project

MELT is a member dashboard for SOULdiers (a beverage brand). Members sign up via invitation, buy product through Stripe, and grow a referral network visualized as a tree.

## Repository Structure

```
MELT/
├── melt-dashboard/   ← Active Next.js app (the product)
└── melt-scripts/     ← Legacy Stripe migration toolkit (manual use only)
```

These are **separate projects**, not a monorepo. `melt-dashboard` has its own git repo.

---

## melt-dashboard (Active)

### Tech Stack
- **Framework**: Next.js 16, App Router, Turbopack dev, Bun runtime
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Database**: SQLite via Turso (`@libsql/client`) + Drizzle ORM
- **Auth**: Better Auth (email/password, DB sessions, Drizzle adapter)
- **Payments**: Stripe Checkout (one-time payments) + webhooks
- **Referral tree viz**: `react-d3-tree` (dynamic import, SSR disabled)
- **Validation**: Zod + React Hook Form (installed but currently unused — forms use plain `useState`)

### Database Schema (`src/lib/db/schema.ts`)

Better Auth owns: `user`, `session`, `account`, `verification`

Custom tables:
- **`user_profiles`**: userId (FK→user, unique), referralCode (8-char nanoid, unique), referredBy (FK→user, nullable), stripeCustomerId (unique)
- **`purchases`**: userId (FK), stripeCheckoutSessionId, stripeSubscriptionId, priceId, productName, status, amount, timestamps

Referral tree = adjacency list via `user_profiles.referred_by`. Queried with recursive CTE using raw libsql client (Drizzle doesn't support recursive CTEs).

### Webflow Dependency

The dashboard depends on a **Webflow marketing site** (`melt-2026.webflow.io`) as the entry point. Users never visit the dashboard directly — they start on the Webflow site.

**Invite flow**: The Webflow site has a form where the user enters the invite access code. On submit, the Webflow JS snippet posts the code to the dashboard's `/api/auth/verify-invite` endpoint. If valid, the user is redirected to `/signup?token=...` on the dashboard.

**Referral flow**: When an existing member shares their referral link (e.g. `https://melt-2026.webflow.io?ref=ABC123`), the Webflow snippet:
1. Reads the `ref` query param on page load
2. Saves it to a `melt_ref` cookie (30-day expiry)
3. When the user submits the invite form, the `ref` is read from the URL or the cookie and sent along with the invite code to `/api/auth/verify-invite`
4. The API returns the `ref` in the response, and the Webflow JS appends it to the signup redirect URL (`/signup?token=...&ref=ABC123`)
5. The dashboard's signup flow uses this `ref` to link the new user to their referrer in `user_profiles.referred_by`

**Webflow JS snippet** (embedded on the marketing site):
```js
const API_URL = "https://<dashboard-deployment-url>";

// On page load: save ref from URL to cookie
(function() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref) {
    document.cookie = `melt_ref=${encodeURIComponent(ref)};path=/;max-age=${30*24*60*60};SameSite=Lax`;
  }
})();

// Form submit: verify invite code + pass ref to dashboard
form.addEventListener("submit", async (e) => {
  const code = document.getElementById("invite-code").value.trim();
  const urlRef = new URLSearchParams(window.location.search).get("ref");
  const cookieRef = document.cookie.match(/melt_ref=([^;]+)/)?.[1];
  const ref = urlRef || (cookieRef ? decodeURIComponent(cookieRef) : null);

  const res = await fetch(`${API_URL}/api/auth/verify-invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, ref }),
  });
  const data = await res.json();
  if (data.token) {
    let url = `${API_URL}/signup?token=${data.token}`;
    if (data.ref) url += `&ref=${encodeURIComponent(data.ref)}`;
    window.location.href = url;
  }
});
```

### Auth & Invite Flow

**Why HMAC invite tokens?** The signup page is invite-only. Webflow (marketing site) posts the shared invite access code to `/api/auth/verify-invite`, which returns a short-lived HMAC-SHA256 token. This prevents users from bookmarking/sharing the raw access code while giving them a 15-minute window to complete signup.

```
Webflow → POST /api/auth/verify-invite (code=INVITE_ACCESS_CODE, ref=OPTIONAL)
       → HMAC token (15-min TTL) + ref passthrough
       → redirect /signup?token=...&ref=OPTIONAL_REFERRAL_CODE
       → Better Auth signup (email/password)
       → POST /api/auth/setup-profile
           → creates Stripe customer
           → generates referral code
           → links referredBy if ref param present
       → redirect /dashboard
```

### Middleware (`src/middleware.ts`)
- `/signup` — requires valid `?token=` (HMAC). If missing or expired → redirects to `/login?error=invite_expired`. The `?ref=` param is not checked by middleware — it's simply passed through and read by the signup page.
- `/dashboard/*` — requires Better Auth session cookie (`better-auth.session_token` or `__Secure-better-auth.session_token`)
- Everything else — public

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...all]` | * | Better Auth catch-all (login, signup, session, signout) |
| `/api/auth/verify-invite` | POST | Webflow sends invite code → returns HMAC token |
| `/api/auth/setup-profile` | POST | Post-signup: create Stripe customer + user_profiles row |
| `/api/stripe/create-checkout-session` | POST | Creates Stripe Checkout session for a product |
| `/api/stripe/webhook` | POST | Handles `checkout.session.completed`, `payment_intent.payment_failed` |
| `/api/referrals/code` | GET | Returns current user's referral code + shareable link (link points to `${WEBFLOW_ORIGIN}/reserve?ref=${code}`) |
| `/api/referrals/code` | PUT | Customize referral code (2–30 chars, uniqueness enforced, 409 if taken) |
| `/api/referrals/tree` | GET | Recursive CTE → nested referral tree JSON |

### Pages

Uses Next.js route groups: `(auth)` for login/signup, `(dashboard)` for dashboard pages.

| Path | Purpose |
|------|---------|
| `/` | Redirects to `/dashboard` |
| `/login` | Email/password login. Shows `?error=invite_expired` message if redirected from expired token. |
| `/signup` | Invite-gated registration. Reads `?ref=` and passes it to `setup-profile`. |
| `/dashboard` | "Invitation" card (hardcoded brand copy — Maiden Voyage, Svalbard, July 2026). Shows `?checkout=success` banner. |
| `/dashboard/buy` | Product grid (3/6/9/12 cases + Reserve/Calendly card) → Stripe Checkout. Shows `?checkout=cancelled` banner. |
| `/dashboard/referrals` | Referral code display (editable inline), copy link, referral count, interactive tree viz |

### Theme System (`src/components/theme-provider.tsx`)
5 themes applied via CSS classes on `<html>`, persisted to `localStorage('melt-theme')`:
- **Arctic** (default): light, white sidebar
- **Glacial**: dark sidebar (#081A49)
- **Copper**: warm earthy (#C68346)
- **Ocean**: bold blue (#117896)
- **Dark**: full dark mode (#020623)

### Stripe Products (`src/lib/stripe/prices.ts`)
One-time payments, not subscriptions. Price IDs are env vars:
- 3 Cases ($216, 72 bottles) — `STRIPE_PRICE_3_CASE`
- 6 Cases ($432, 144 bottles) — `STRIPE_PRICE_6_CASE`
- 9 Cases ($648, 216 bottles) — `STRIPE_PRICE_9_CASE`
- 12 Cases ($864, 288 bottles) — `STRIPE_PRICE_12_CASE`
- Donation ($0.75/bottle) — `STRIPE_PRICE_DONATION` (defined in code but **not shown in the Buy page UI**)

The Buy page also includes a "Reserve" card that links to Calendly (`calendly.com/z-meltbrands/melt-intro`).

### Scripts (`src/scripts/`)

**`create-stripe-products.ts`** — Run once per Stripe environment. Creates all 5 products+prices in Stripe test mode and outputs the env vars to paste into `.env.local`. Why: live-mode price IDs differ from test-mode, so this bootstraps a test environment quickly.

**`seed-referrals.ts`** — Populates the DB with fake referral trees for development/testing. Creates two trees: a random-branching one (5-10 levels) and a deep one (20 levels with side branches). All users get password "testtest". Uses `@noble/hashes` scrypt to match Better Auth's exact password hashing. Why: testing the tree visualization requires many users with referral relationships.

### Key Development Commands
```bash
cd melt-dashboard
bun dev                    # Dev server (Turbopack)
bun run db:push            # Push schema to Turso
bun run db:studio          # Drizzle Studio (DB browser)
bun run stripe:listen      # Forward Stripe webhooks to localhost
bun run seed:referrals     # Seed fake referral data
```

### Environment Variables
```
TURSO_DATABASE_URL          # libsql:// URL for Turso DB
TURSO_AUTH_TOKEN            # Turso JWT auth token
STRIPE_SECRET_KEY           # sk_test_... or sk_live_...
STRIPE_PUBLISHABLE_KEY      # pk_test_... or pk_live_...
STRIPE_WEBHOOK_SECRET       # whsec_...
STRIPE_PRICE_3_CASE         # price_... (one-time price IDs)
STRIPE_PRICE_6_CASE
STRIPE_PRICE_9_CASE
STRIPE_PRICE_12_CASE
STRIPE_PRICE_DONATION
INVITE_ACCESS_CODE          # Shared secret Webflow sends to verify-invite
SESSION_SECRET              # 32-byte hex for session signing
BETTER_AUTH_SECRET           # Better Auth internal secret
NEXT_PUBLIC_APP_URL          # http://localhost:3000 or production URL
WEBFLOW_ORIGIN               # https://melt-2026.webflow.io (CORS origin)
```

---

## melt-scripts (Legacy — Manual Use Only)

### Why it exists
Before the dashboard existed, this was the Stripe webhook server. It's now kept for **migration scripts** that convert one-time purchases into recurring subscriptions — a business decision to transition the payment model.

### Files

**`src/index.ts`** — Original Hono webhook server. Superseded by `melt-dashboard/src/app/api/stripe/webhook/route.ts`. Kept as reference only.

**`src/config/prices.ts`** — Maps one-time price IDs to recurring subscription prices. Each one-time purchase maps to a recurring product price + a donation line item (bottles x $0.75/month). Used by the migration script.

**`src/scripts/create-subscriptions.ts`** — The main migration script. Scans all completed Stripe Checkout sessions, finds customers who made one-time purchases, and creates recurring subscriptions with a 30-day trial. Supports `--dry-run` flag. Checks for existing subscriptions to avoid duplicates.

**`src/scripts/cancel-incomplete.ts`** — Cleanup: cancels all subscriptions stuck in "incomplete" status (payment authorization failed). Paginated. Run after migration to clean up failures.

**`src/scripts/cancel-trialing.ts`** — Cleanup: cancels all "trialing" subscriptions. Used to rollback migration test runs.

### Commands
```bash
cd melt-scripts
bun run src/scripts/create-subscriptions.ts --dry-run   # Preview migration
bun run src/scripts/create-subscriptions.ts              # Execute migration
bun run src/scripts/cancel-incomplete.ts                 # Clean up failed subs
bun run src/scripts/cancel-trialing.ts                   # Rollback trial subs
```

---

## Architecture Decisions & Why

1. **Turso SQLite over Postgres** — Lightweight, edge-compatible, free tier sufficient. Recursive CTEs work natively in SQLite.

2. **Better Auth over NextAuth/Clerk** — Self-hosted, owns the data, simple email/password flow without OAuth complexity. Drizzle adapter keeps everything in one DB.

3. **HMAC invite tokens over simple codes** — Prevents the invite access code from leaking via URL sharing. Token expires in 15 minutes, so even if shared, the window is short.

4. **Adjacency list for referrals** — Simple `referred_by` FK. Recursive CTE handles tree queries. No need for materialized paths or nested sets since the tree is read-heavy and writes are rare (only on signup).

5. **Raw libsql for referral tree query** — Drizzle ORM doesn't support recursive CTEs. Using `client.execute()` directly for this one query avoids adding another ORM/query builder.

6. **react-d3-tree for visualization** — Handles large trees with pan/zoom. Dynamic import with `ssr: false` since D3 manipulates the DOM.

7. **One-time Stripe Checkout (not subscriptions)** — The current dashboard uses one-time payments. The subscription migration in melt-scripts was for a later phase.

8. **Separate projects (not monorepo)** — melt-scripts is a throwaway tool; no shared code or deps with the dashboard. Keeping them separate avoids complexity.

---

## Additional Implementation Details

### CORS
`/api/auth/verify-invite` handles CORS in two places (mild redundancy): `next.config.ts` sets static headers from `WEBFLOW_ORIGIN`, and the route handler itself does dynamic origin matching with an `OPTIONS` preflight handler.

### Custom Font
The app uses `ApkGaleria` (`public/fonts/ApkGaleria.ttf`) as the primary brand font, loaded as `--font-apk-galeria` and set as `font-sans`. `Geist Mono` is loaded as the monospace font.

### Brand Color Palette (`globals.css`)
10 custom CSS variables: `--color-melt-impact-blue` (#117896), `--color-melt-icefield-blue` (#C7EFF9), `--color-melt-glacial-ink` (#081A49), `--color-melt-arctic-light` (#FFFAF5), `--color-melt-warm-copper` (#C68346), `--color-melt-cool-gray` (#C6CBD7), `--color-melt-sand` (#E7C79F), `--color-melt-amber` (#F3BC3C), `--color-melt-tangerine` (#E96A35), `--color-melt-dark-brown` (#3D2200).

### API Idempotency
- `setup-profile` is idempotent — returns `{ ok: true }` if profile already exists
- `create-checkout-session` creates a Stripe customer on-the-fly if `stripeCustomerId` is missing on the profile

### Dashboard Layout
Fixed left sidebar (220px): MELT logo, nav links (Invitation, Buy Product, Referrals), theme switcher, user info + sign out. Main content is offset with `pl-[220px]`.
