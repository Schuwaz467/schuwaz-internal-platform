# Schuwaz Internal Operations Platform — Wireframe Blueprint

Business: Splitter van hire for bands/touring crews. 8 vans, East London, ~8 bookings/week.
Team: Danny (owner, quotes + admin), Liam (van maintenance), Theo (bills/rehearsal rooms).
Core problem: After a customer says "yes", chasing for deposits, driver licences, proof of
address and documents melts down. Info scattered across Sheets, Calendar, Gmail, WhatsApp,
QuickBooks, bank app. Risk of double-booking.

Design principle: Danny keeps quoting + talking to customers himself. The platform takes over
AFTER "yes" — it tracks, chases automatically, and shows everything on one page.

================================================================================
SCREEN 1 — DASHBOARD (Command Centre)
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🚐 SCHUWAZ           Dashboard  Bookings  Fleet  Customers  Finances   👤 Danny│
├──────────────────────────────────────────────────────────────────────────────┤
│  Good morning, Danny.  Tuesday 23 June          [ + New Booking ]              │
│                                                                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐                  │
│  │ ⚠ NEEDS YOU│ │ 🚐 VANS OUT │ │ £ UNPAID    │ │ ↩ DUE BACK  │                  │
│  │     5      │ │   6 / 8    │ │  £2,400    │ │   2 today  │                  │
│  │ items      │ │            │ │ 3 bookings │ │            │                  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘                  │
│                                                                                │
│  ┌─ ⚠ NEEDS YOUR ATTENTION ──────────────────────────────────────────────┐   │
│  │ ● Arctic Wolves — deposit unpaid, collection in 2 days   [Chase][View]│   │
│  │ ● The Mire — driver licence not uploaded                 [Chase][View]│   │
│  │ ● J. Brennan — proof of address missing                  [Chase][View]│   │
│  │ ● Van LDV-04 — MOT expires in 9 days                          [View]  │   │
│  │ ● Velvet Tongue — paid wrong amount (£300 short)         [Review][View]│   │
│  └────────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─ TODAY ─────────────────────────────┐ ┌─ TEAM TASKS ──────────────────┐    │
│  │ 09:00 ↑ Collection: Arctic Wolves   │ │ Danny  ▸ Approve refund (1)   │    │
│  │ 14:00 ↓ Return: The Strays (LDV-02) │ │ Liam   ▸ Service LDV-06 (1)   │    │
│  │ 16:30 ↓ Return: Halcyon (LDV-05)    │ │ Theo   ▸ Chase insurer (1)    │    │
│  └─────────────────────────────────────┘ └───────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- Top navigation header with logo + primary nav + user
- 4 KPI summary cards (Needs You, Vans Out, Unpaid, Due Back)
- "Needs your attention" action list — the anti-chasing core; each row has Chase/View CTAs
- Today timeline (collections ↑ / returns ↓)
- Team tasks panel split by Danny/Liam/Theo
- Primary CTA: New Booking

================================================================================
SCREEN 2 — BOOKINGS LIST
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🚐 SCHUWAZ           Dashboard  Bookings  Fleet  Customers  Finances   👤 Danny│
├──────────────────────────────────────────────────────────────────────────────┤
│  Bookings                          [ Calendar view ]  [ + New Booking ]        │
│  [ Search...        ] Status: [All ▾]  Van: [All ▾]  [ This month ▾ ]          │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ BAND / CUSTOMER   VAN      DATES          STATUS      DOCS   PAYMENT       │ │
│  ├──────────────────────────────────────────────────────────────────────────┤ │
│  │ Arctic Wolves     LDV-01   25–30 Jun   ● Confirmed   2/4    Deposit due ⚠ │ │
│  │ The Mire          LDV-03   24 Jun–2 Jul ● Confirmed   3/4    Paid ✓        │ │
│  │ Velvet Tongue     LDV-02   23–24 Jun   ● Out         4/4    Part-paid ⚠   │ │
│  │ Halcyon           LDV-05   20–23 Jun   ● Out         4/4    Paid ✓        │ │
│  │ The Strays        LDV-04   18–23 Jun   ● Out         4/4    Paid ✓        │ │
│  │ J. Brennan        LDV-06   28 Jun–5 Jul ○ Pending     1/4    Awaiting dep │ │
│  │ Northbound        LDV-07   01–04 Jul   ● Confirmed   4/4    Paid ✓        │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│  Status key: ○ Pending  ● Confirmed  ● Out  ● Returned  ✕ Cancelled            │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- Search + filter bar (status, van, date range)
- Table: customer, van, dates, status pill, docs progress (x/4), payment status
- Toggle to Calendar view; New Booking CTA
- Visual flags (⚠) for anything needing action

================================================================================
SCREEN 3 — BOOKING CALENDAR (anti double-booking)
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🚐 SCHUWAZ           Dashboard  Bookings  Fleet  Customers  Finances   👤 Danny│
├──────────────────────────────────────────────────────────────────────────────┤
│  Fleet Calendar   ◀ June 2026 ▶            [ List view ]  [ + New Booking ]    │
│         │ 23 │ 24 │ 25 │ 26 │ 27 │ 28 │ 29 │ 30 │ 01 │ 02 │ 03 │              │
│  LDV-01 │    │    │■■■ Arctic Wolves ■■■■■■■■■■■│    │    │    │              │
│  LDV-02 │■ V.Tongue│    │    │    │    │    │    │    │    │    │              │
│  LDV-03 │■■■■ The Mire ■■■■■■■■■■■■■■■■■■■■■■■■│    │    │              │
│  LDV-04 │■ Strays ■│    │    │    │    │    │    │    │    │    │              │
│  LDV-05 │■ Halcyon│    │    │    │    │    │    │    │    │    │              │
│  LDV-06 │    │    │    │    │    │■■■■■ J.Brennan ■■■■■■■■■■■│              │
│  LDV-07 │    │    │    │    │    │    │    │    │■■ Northbound ■■│              │
│  LDV-08 │    │    │    │  (available)                        │              │
│                                                                                │
│  ⚠ Conflict guard: overlapping dates on the same van are blocked at booking.  │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- Month navigator
- Gantt-style grid: rows = vans, columns = days, bars = bookings
- Available rows visibly empty
- Conflict-guard note (the double-booking fix)

================================================================================
SCREEN 4 — BOOKING DETAIL (the workflow engine — most important screen)
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Back to Bookings                                          👤 Danny           │
├──────────────────────────────────────────────────────────────────────────────┤
│  Arctic Wolves            Van LDV-01 · 25–30 Jun · 5 days   ● CONFIRMED        │
│  Tour Manager: Sam Reid · sam@arcticwolves.com · 07700 900123                  │
│  ─────────────────────────────────────────────────────────────────────────    │
│  ┌─ ONBOARDING CHECKLIST (after "yes") ─────────────────────────────────────┐ │
│  │ ✓ Booking confirmed                                       done           │ │
│  │ ✗ Deposit £1,500              ⚠ unpaid     [ Send reminder ] [ Mark paid]│ │
│  │ ✗ Driver licence (front/back) ⚠ missing    [ Request ] [ Upload ]       │ │
│  │ ✓ Proof of address                          received 21 Jun  [ View ]    │ │
│  │ ✗ Signed hire agreement       ⚠ pending     [ Send ]                     │ │
│  │ ─ Driver over 25 confirmed                  auto-flagged ✓               │ │
│  │           ◗ 2 of 4 complete   ●●○○                                       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│  ┌─ PAYMENTS ───────────────────┐ ┌─ AUTOMATED CHASING ──────────────────┐  │
│  │ Deposit   £1,500   ⚠ Due      │ │ ✓ Booking confirmation sent  21 Jun  │  │
│  │ Hire fee  £2,000   Not due yet│ │ ✓ Deposit reminder #1 sent   22 Jun  │  │
│  │ Security  £1,500   On collect │ │ → Deposit reminder #2 scheduled 24Jun │  │
│  │ ── Balance: £3,500 outstanding│ │ [ Pause auto-chase ] [ Message now ] │  │
│  └──────────────────────────────┘ └──────────────────────────────────────┘  │
│  ┌─ ACTIVITY / NOTES ───────────────────────────────────────────────────┐   │
│  │ 22 Jun  Danny: "Sam asked to collect 8am instead of 9"               │   │
│  │ 21 Jun  System: Proof of address uploaded                            │   │
│  │ [ Add note... ]                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- Header: band, van, dates, status
- Tour manager contact block
- Onboarding checklist with per-item status + Request/Upload/Mark-paid actions + progress dots
- Payments panel (deposit / hire / security deposit, outstanding balance)
- Automated chasing log + schedule with Pause / Message-now controls
- Activity & notes timeline (replaces scrolling Gmail/WhatsApp)

================================================================================
SCREEN 5 — NEW BOOKING (Danny logs a confirmed deal)
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Cancel                    New Booking                       👤 Danny          │
├──────────────────────────────────────────────────────────────────────────────┤
│  Step ●──●──○   1. Customer   2. Van & Dates   3. Quote & Confirm              │
│                                                                                │
│  Customer                                                                      │
│  [ Search existing customer...        ]  or  [ + Add new ]                     │
│   ↳ matches: Sam Reid (Arctic Wolves), Sam R. (different email) ⚠ merge?      │
│                                                                                │
│  Van & Dates                                                                   │
│  Van [ LDV-01 ▾ ]   From [ 25 Jun ]  To [ 30 Jun ]                             │
│  ✓ LDV-01 available for these dates (no conflict)                              │
│                                                                                │
│  Quote                                                                         │
│  Daily rate [ £400 ] × 5 days = £2,000   Deposit [ £1,500 ]                    │
│  Security deposit [ £1,500 ]                                                   │
│                                                                                │
│  [ Save as Pending ]                       [ Confirm & Start Onboarding → ]    │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- 3-step progress indicator
- Customer search with duplicate-detection/merge prompt (solves "same guy, diff email")
- Van + date pickers with live availability check
- Quote builder (rate × days, deposit, security deposit)
- Save-as-pending vs Confirm-and-start-onboarding CTAs

================================================================================
SCREEN 6 — FLEET
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🚐 SCHUWAZ           Dashboard  Bookings  Fleet  Customers  Finances   👤 Danny│
├──────────────────────────────────────────────────────────────────────────────┤
│  Fleet (8 vans)                                  [ + Add van ]                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ LDV-01       │ │ LDV-02       │ │ LDV-03       │ │ LDV-04       │          │
│  │ ● Out        │ │ ● Out        │ │ ● Out        │ │ ● Due 14:00  │          │
│  │ Arctic Wolves│ │ Velvet Tongue│ │ The Mire     │ │ The Strays   │          │
│  │ MOT ✓ Ins ✓  │ │ MOT ✓ Ins ✓  │ │ MOT ✓ Ins ✓  │ │ MOT ⚠ 9d Ins✓│          │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ LDV-05       │ │ LDV-06       │ │ LDV-07       │ │ LDV-08       │          │
│  │ ● Due 16:30  │ │ ⚙ Service    │ │ ● Booked Jul │ │ ○ Available  │          │
│  │ Halcyon      │ │ Liam · LDV-06│ │ Northbound   │ │ —            │          │
│  │ MOT ✓ Ins ✓  │ │ Off-road     │ │ MOT ✓ Ins ✓  │ │ MOT ✓ Ins ✓  │          │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘          │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- Grid of van cards: id, status pill, current booking, MOT + insurance indicators
- Off-road/service state (Liam's domain)
- Add van CTA

================================================================================
SCREEN 7 — VAN RETURN / DAMAGE INSPECTION
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Back to Fleet            Van Return — LDV-04 (The Strays)    👤 Danny / Liam │
├──────────────────────────────────────────────────────────────────────────────┤
│  Returned 23 Jun 14:00 · Security deposit held: £1,500                         │
│  ┌─ INSPECTION ─────────────────────────────────────────────────────────────┐ │
│  │ Condition photos  [ + Add photos ]   📷 📷 📷 📷                          │ │
│  │ Damage found?   ( ) None   (•) Minor   ( ) Major                          │ │
│  │ Description [ Scrape on rear nearside panel.............. ]               │ │
│  │ Repair estimate [ £180 ]                                                  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│  ┌─ DEPOSIT RESOLUTION ─────────────────────────────────────────────────────┐ │
│  │ Security deposit      £1,500                                              │ │
│  │ Deduction (damage)  − £180                                               │ │
│  │ ── Refund to customer £1,320     [ Approve refund ] [ Escalate to claim ]│ │
│  │ ⚠ If repair > £1,500 → opens insurance claim workflow                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- Return header (time, security deposit held)
- Inspection: photo upload, damage severity radio, description, repair estimate
- Deposit resolution: auto-calculated refund, approve/escalate CTAs
- Insurance-claim escalation path (the >£1,500 case Danny struggled with)

================================================================================
SCREEN 8 — CUSTOMERS (CRM)
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🚐 SCHUWAZ           Dashboard  Bookings  Fleet  Customers  Finances   👤 Danny│
├──────────────────────────────────────────────────────────────────────────────┤
│  Customers                 [ Search... ]                  [ + Add customer ]   │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ NAME            COMPANY/BAND     BOOKINGS  LAST HIRE   FLAGS              │ │
│  ├──────────────────────────────────────────────────────────────────────────┤ │
│  │ Sam Reid        Arctic Wolves       4      Jun 2026    ⚠ 2 emails merged │ │
│  │ Jo Mensah       The Mire            7      Jun 2026    ⭐ repeat          │ │
│  │ J. Brennan      (indie / solo)      1      Jun 2026    ○ new             │ │
│  │ Kara Vance      Halcyon             3      Jun 2026    ⭐ repeat          │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│  ┌─ CUSTOMER DETAIL: Sam Reid ──────────────────────────────────────────────┐ │
│  │ Linked emails: sam@arcticwolves.com, samreid88@gmail.com  [ unmerge ]    │ │
│  │ Driver licence on file ✓   Over 25 ✓   Proof of address ✓                │ │
│  │ Booking history: 4 hires · £8,200 lifetime · 0 damage incidents          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- Customer table: name, band, booking count, last hire, flags
- Duplicate/merged-email flag (the "same guy, different email" fix)
- Detail panel: linked emails, docs on file (reusable across bookings), history

================================================================================
SCREEN 9 — FINANCES
================================================================================

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🚐 SCHUWAZ           Dashboard  Bookings  Fleet  Customers  Finances   👤 Danny│
├──────────────────────────────────────────────────────────────────────────────┤
│  Finances                        [ Sync QuickBooks ]   This month ▾            │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                                  │
│  │ Collected  │ │ Outstanding│ │ Deposits   │                                  │
│  │  £11,600   │ │  £2,400    │ │ held £4,500│                                  │
│  └────────────┘ └────────────┘ └────────────┘                                  │
│  ┌─ PAYMENT TRACKER ────────────────────────────────────────────────────────┐ │
│  │ BOOKING         DEPOSIT   HIRE FEE   SECURITY   STATUS                    │ │
│  ├──────────────────────────────────────────────────────────────────────────┤ │
│  │ Arctic Wolves   £1,500 ⚠  £2,000 –    £1,500 –   Deposit overdue          │ │
│  │ The Mire        £1,200 ✓  £3,400 ✓    £1,500 ✓   Paid in full             │ │
│  │ Velvet Tongue   £1,000 ✓  £900 ⚠      £1,500 ✓   £300 short  [ Chase ]    │ │
│  │ Halcyon         £1,000 ✓  £2,200 ✓    £1,500 ✓   Paid in full             │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│  Reconciled against bank feed — no more scrolling Gmail for payment emails.    │
└──────────────────────────────────────────────────────────────────────────────┘
```
## Components:
- KPI cards: collected, outstanding, deposits held
- Payment tracker table: deposit/hire/security with paid indicators
- QuickBooks sync + bank reconciliation note (replaces manual bank-app checking)
- Per-row Chase action for shortfalls
