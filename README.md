# Schuwaz — Internal Operations Platform (Wireframe Prototype)

Wireframes and a clickable prototype for **Danny's internal van-hire platform**, built from
the discovery call transcript using the Vibeframing approach (transcript → ASCII blueprint →
interactive prototype).

**🔗 Live prototype:** https://YOUR-SITE.netlify.app
**📐 ASCII blueprint:** [`docs/Schuwaz-wireframe-blueprint.md`](docs/Schuwaz-wireframe-blueprint.md)

---

## The brief

Schuwaz hires splitter vans to bands and touring crews — 8 vans, East London, ~8 bookings a
week, run mostly by Danny with Liam (van maintenance) and Theo (bills). Danny's core problem,
in his words, is **the chasing**: once a customer says "yes," everything melts down — chasing
deposits, driver licences, proof of address and documents, with information scattered across
Google Sheets, Google Calendar, Gmail, WhatsApp, QuickBooks and his bank app.

Crucially, Danny wants to keep doing his own quotes and talking to customers himself. So this
is an **internal operations platform that takes over *after* "yes"** — not a public booking
website. (Per the task, the website is out of scope.)

## Design principle

One source of truth, organised by **status**, because Danny's whole problem is not knowing the
status of anything. The dashboard leads with everything that needs him, so he stops scrolling
Gmail in the yard.

## Key user journeys (9 screens)

| # | Screen | What it solves |
|---|--------|----------------|
| 1 | Dashboard | "Everything on one page" — a *Needs your attention* list kills the chasing |
| 2 | Bookings list | All bookings at a glance with doc + payment status |
| 3 | Booking calendar | Conflict guard prevents the near double-booking that "stopped his heart" |
| 4 | Booking detail | The core: post-"yes" onboarding checklist + automated chasing + activity log |
| 5 | New booking | Logs a confirmed deal; duplicate-customer detection for "same guy, different email" |
| 6 | Fleet | 8 vans with status, MOT and insurance indicators |
| 7 | Van return / damage | Inspection → deposit deduction → insurance escalation for the >£1,500 case |
| 8 | Customers (CRM) | Merged emails, documents on file reused across bookings |
| 9 | Finances | Payment tracker reconciled to the bank feed — no more checking the bank app |

Liam and Theo appear as task owners (servicing, insurance claims) to spread the load Danny
currently carries alone.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL.

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Stack

Vite + React, single self-contained component, inline styling (no UI library). Deployed on
Netlify, auto-redeploying from this repo.
