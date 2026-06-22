import React, { useState } from "react";

// ============================================================================
// SCHUWAZ — Internal Operations Platform (clickable wireframe prototype)
// Tour-case aesthetic: charcoal chrome + hi-vis amber, stencil-mono for IDs/data
// ============================================================================

const C = {
  ink: "#15171c",
  panel: "#1d2026",
  panel2: "#23262e",
  line: "#33373f",
  amber: "#f6a821",
  amberDim: "#3a2f17",
  text: "#e7e9ee",
  sub: "#9aa0ab",
  faint: "#6b7280",
  good: "#3ecf8e",
  goodDim: "#16382b",
  warn: "#f6a821",
  bad: "#ff6b5e",
  badDim: "#3a1f1d",
  blue: "#6aa8ff",
};

const mono = "'SF Mono','JetBrains Mono','Fira Code',ui-monospace,monospace";
const sans = "'Inter','Helvetica Neue',Arial,sans-serif";

// ---------------------------------------------------------------- mock data
const VANS = [
  { id: "LDV-01", status: "out", band: "Arctic Wolves", mot: "ok", ins: "ok" },
  { id: "LDV-02", status: "out", band: "Velvet Tongue", mot: "ok", ins: "ok" },
  { id: "LDV-03", status: "out", band: "The Mire", mot: "ok", ins: "ok" },
  { id: "LDV-04", status: "due", band: "The Strays", mot: "warn", ins: "ok", due: "14:00" },
  { id: "LDV-05", status: "due", band: "Halcyon", mot: "ok", ins: "ok", due: "16:30" },
  { id: "LDV-06", status: "service", band: "— off-road —", mot: "ok", ins: "ok", who: "Liam" },
  { id: "LDV-07", status: "booked", band: "Northbound (Jul)", mot: "ok", ins: "ok" },
  { id: "LDV-08", status: "free", band: "—", mot: "ok", ins: "ok" },
];

const BOOKINGS = [
  { id: 1, band: "Arctic Wolves", tm: "Sam Reid", van: "LDV-01", dates: "25–30 Jun", status: "confirmed", docs: 2, pay: "deposit-due" },
  { id: 2, band: "The Mire", tm: "Jo Mensah", van: "LDV-03", dates: "24 Jun–2 Jul", status: "confirmed", docs: 3, pay: "paid" },
  { id: 3, band: "Velvet Tongue", tm: "Ray Okafor", van: "LDV-02", dates: "23–24 Jun", status: "out", docs: 4, pay: "part" },
  { id: 4, band: "Halcyon", tm: "Kara Vance", van: "LDV-05", dates: "20–23 Jun", status: "out", docs: 4, pay: "paid" },
  { id: 5, band: "The Strays", tm: "Mick Doyle", van: "LDV-04", dates: "18–23 Jun", status: "out", docs: 4, pay: "paid" },
  { id: 6, band: "J. Brennan", tm: "Joe Brennan", van: "LDV-06", dates: "28 Jun–5 Jul", status: "pending", docs: 1, pay: "awaiting" },
  { id: 7, band: "Northbound", tm: "Elle Frost", van: "LDV-07", dates: "01–04 Jul", status: "confirmed", docs: 4, pay: "paid" },
];

const ATTENTION = [
  { t: "Arctic Wolves — deposit unpaid, collection in 2 days", kind: "bad", act: "Chase" },
  { t: "The Mire — driver licence not uploaded", kind: "warn", act: "Chase" },
  { t: "J. Brennan — proof of address missing", kind: "warn", act: "Chase" },
  { t: "Van LDV-04 — MOT expires in 9 days", kind: "warn", act: "View" },
  { t: "Velvet Tongue — paid £300 short", kind: "bad", act: "Review" },
];

const CUSTOMERS = [
  { name: "Sam Reid", band: "Arctic Wolves", n: 4, last: "Jun 2026", flag: "2 emails merged", flagKind: "warn" },
  { name: "Jo Mensah", band: "The Mire", n: 7, last: "Jun 2026", flag: "repeat", flagKind: "good" },
  { name: "Joe Brennan", band: "indie / solo", n: 1, last: "Jun 2026", flag: "new", flagKind: "sub" },
  { name: "Kara Vance", band: "Halcyon", n: 3, last: "Jun 2026", flag: "repeat", flagKind: "good" },
];

const PAYMENTS = [
  { band: "Arctic Wolves", dep: "due", hire: "na", sec: "na", status: "Deposit overdue", sk: "bad" },
  { band: "The Mire", dep: "paid", hire: "paid", sec: "paid", status: "Paid in full", sk: "good" },
  { band: "Velvet Tongue", dep: "paid", hire: "short", sec: "paid", status: "£300 short", sk: "bad" },
  { band: "Halcyon", dep: "paid", hire: "paid", sec: "paid", status: "Paid in full", sk: "good" },
];

// ---------------------------------------------------------------- primitives
const statusColor = (s) =>
  ({ out: C.blue, due: C.amber, service: C.faint, booked: C.good, free: C.sub,
     confirmed: C.good, pending: C.amber, paid: C.good, part: C.amber,
     "deposit-due": C.bad, awaiting: C.sub }[s] || C.sub);

function Pill({ children, color }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: mono,
      fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color,
      background: color + "1f", border: `1px solid ${color}44`, padding: "3px 9px",
      borderRadius: 4, whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: color }} />
      {children}
    </span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10,
      ...style }}>{children}</div>
  );
}

function Btn({ children, onClick, variant = "ghost", small }) {
  const base = { fontFamily: sans, fontWeight: 600, cursor: "pointer",
    fontSize: small ? 12 : 13, padding: small ? "5px 10px" : "8px 14px",
    borderRadius: 6, transition: "all .12s", whiteSpace: "nowrap" };
  const v = {
    primary: { background: C.amber, color: C.ink, border: "none" },
    ghost: { background: "transparent", color: C.text, border: `1px solid ${C.line}` },
    danger: { background: C.badDim, color: C.bad, border: `1px solid ${C.bad}55` },
  }[variant];
  return <button onClick={onClick} style={{ ...base, ...v }}>{children}</button>;
}

function Eyebrow({ children }) {
  return <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".14em",
    textTransform: "uppercase", color: C.faint, marginBottom: 10 }}>{children}</div>;
}

const DOCK = ["○", "●"];
function DocDots({ done, total = 4 }) {
  return (
    <span style={{ fontFamily: mono, fontSize: 12, color: done >= total ? C.good : C.amber }}>
      {Array.from({ length: total }, (_, i) => (i < done ? DOCK[1] : DOCK[0])).join(" ")}
      <span style={{ color: C.faint, marginLeft: 6 }}>{done}/{total}</span>
    </span>
  );
}

// ---------------------------------------------------------------- nav
const NAV = ["Dashboard", "Bookings", "Fleet", "Customers", "Finances"];

function Shell({ page, setPage, onNew, children }) {
  return (
    <div style={{ background: C.ink, color: C.text, fontFamily: sans, minHeight: 720 }}>
      <header style={{ display: "flex", alignItems: "center", gap: 24,
        padding: "0 22px", height: 58, borderBottom: `1px solid ${C.line}`,
        background: C.panel, position: "sticky", top: 0, zIndex: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: C.amber, borderRadius: 6,
            display: "grid", placeItems: "center", fontSize: 16 }}>🚐</div>
          <span style={{ fontFamily: mono, fontWeight: 700, letterSpacing: ".18em",
            fontSize: 15 }}>SCHUWAZ</span>
        </div>
        <nav style={{ display: "flex", gap: 4, flex: 1 }}>
          {NAV.map((n) => (
            <button key={n} onClick={() => setPage(n)} style={{
              fontFamily: sans, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              padding: "7px 13px", borderRadius: 6, border: "none",
              background: page === n ? C.amberDim : "transparent",
              color: page === n ? C.amber : C.sub }}>{n}</button>
          ))}
        </nav>
        <Btn variant="primary" onClick={onNew}>+ New booking</Btn>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.sub, fontSize: 13 }}>
          <div style={{ width: 26, height: 26, borderRadius: 99, background: C.panel2,
            border: `1px solid ${C.line}`, display: "grid", placeItems: "center" }}>👤</div>
          Danny
        </div>
      </header>
      <main style={{ padding: 22, maxWidth: 1180, margin: "0 auto" }}>{children}</main>
    </div>
  );
}

// ---------------------------------------------------------------- dashboard
function Dashboard({ go, openBooking }) {
  const kpis = [
    { label: "Needs you", v: "5", sub: "items", c: C.bad },
    { label: "Vans out", v: "6/8", sub: "in service", c: C.blue },
    { label: "Unpaid", v: "£2,400", sub: "3 bookings", c: C.amber },
    { label: "Due back", v: "2", sub: "today", c: C.good },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>Good morning, Danny.</h1>
        <span style={{ color: C.faint, fontFamily: mono, fontSize: 13 }}>Tuesday 23 June</span>
      </div>
      <p style={{ color: C.sub, marginTop: 6, marginBottom: 20, fontSize: 14 }}>
        Everything that needs you, in one place. No more scrolling Gmail in the yard.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        {kpis.map((k) => (
          <Card key={k.label} style={{ padding: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".1em",
              textTransform: "uppercase", color: C.faint }}>{k.label}</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: k.c, marginTop: 6,
              fontFamily: mono }}>{k.v}</div>
            <div style={{ color: C.sub, fontSize: 12.5 }}>{k.sub}</div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: 18, marginBottom: 18, borderColor: C.amber + "55" }}>
        <Eyebrow>⚠ Needs your attention</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {ATTENTION.map((a, i) => {
            const col = a.kind === "bad" ? C.bad : C.amber;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12,
                padding: "11px 4px", borderTop: i ? `1px solid ${C.line}` : "none" }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: col,
                  flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 14 }}>{a.t}</span>
                <Btn small variant={a.act === "Chase" ? "primary" : "ghost"}>{a.act}</Btn>
                <Btn small onClick={() => openBooking(BOOKINGS[0])}>View</Btn>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }}>
        <Card style={{ padding: 18 }}>
          <Eyebrow>Today</Eyebrow>
          {[
            { t: "09:00", d: "Collection — Arctic Wolves", dir: "↑", c: C.good },
            { t: "14:00", d: "Return — The Strays (LDV-04)", dir: "↓", c: C.blue },
            { t: "16:30", d: "Return — Halcyon (LDV-05)", dir: "↓", c: C.blue },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center",
              padding: "10px 0", borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span style={{ fontFamily: mono, color: C.sub, fontSize: 13, width: 44 }}>{r.t}</span>
              <span style={{ color: r.c, fontSize: 16 }}>{r.dir}</span>
              <span style={{ fontSize: 14 }}>{r.d}</span>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 18 }}>
          <Eyebrow>Team tasks</Eyebrow>
          {[
            { who: "Danny", t: "Approve Strays refund", c: C.amber },
            { who: "Liam", t: "Service LDV-06", c: C.blue },
            { who: "Theo", t: "Chase insurer — claim #1", c: C.good },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center",
              padding: "10px 0", borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: r.c, width: 52 }}>{r.who}</span>
              <span style={{ fontSize: 14, flex: 1 }}>{r.t}</span>
              <span style={{ color: C.faint }}>›</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- bookings
function Bookings({ openBooking }) {
  const [view, setView] = useState("list");
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, flex: 1 }}>Bookings</h1>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn small variant={view === "list" ? "primary" : "ghost"} onClick={() => setView("list")}>List</Btn>
          <Btn small variant={view === "cal" ? "primary" : "ghost"} onClick={() => setView("cal")}>Calendar</Btn>
        </div>
      </div>
      {view === "list" ? <BookingList openBooking={openBooking} /> : <CalendarView />}
    </div>
  );
}

function BookingList({ openBooking }) {
  const head = ["Band / customer", "Van", "Dates", "Status", "Docs", "Payment"];
  const payLabel = { paid: "Paid", "deposit-due": "Deposit due", part: "Part-paid", awaiting: "Awaiting dep." };
  return (
    <Card style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 10, padding: 14, borderBottom: `1px solid ${C.line}` }}>
        <input placeholder="Search bands, customers, vans…" style={{
          flex: 1, background: C.ink, border: `1px solid ${C.line}`, color: C.text,
          padding: "8px 12px", borderRadius: 6, fontFamily: sans, fontSize: 13 }} />
        {["Status: All", "Van: All", "This month"].map((f) => (
          <button key={f} style={{ background: C.panel2, border: `1px solid ${C.line}`,
            color: C.sub, padding: "8px 12px", borderRadius: 6, fontSize: 12.5,
            cursor: "pointer", fontFamily: sans }}>{f} ▾</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr .8fr 1.3fr 1fr 1.1fr 1fr",
        padding: "10px 16px", fontFamily: mono, fontSize: 11, letterSpacing: ".06em",
        textTransform: "uppercase", color: C.faint, borderBottom: `1px solid ${C.line}` }}>
        {head.map((h) => <div key={h}>{h}</div>)}
      </div>
      {BOOKINGS.map((b, i) => (
        <div key={b.id} onClick={() => openBooking(b)} style={{ display: "grid",
          gridTemplateColumns: "1.6fr .8fr 1.3fr 1fr 1.1fr 1fr", padding: "13px 16px",
          alignItems: "center", cursor: "pointer", fontSize: 13.5,
          borderBottom: i < BOOKINGS.length - 1 ? `1px solid ${C.line}` : "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.panel2)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
          <div style={{ fontWeight: 600 }}>{b.band}
            <div style={{ color: C.faint, fontSize: 12, fontWeight: 400 }}>{b.tm}</div></div>
          <div style={{ fontFamily: mono, color: C.sub }}>{b.van}</div>
          <div style={{ color: C.sub }}>{b.dates}</div>
          <div><Pill color={statusColor(b.status)}>{b.status}</Pill></div>
          <div><DocDots done={b.docs} /></div>
          <div style={{ color: statusColor(b.pay), fontSize: 13 }}>{payLabel[b.pay]}
            {b.pay !== "paid" && <span style={{ color: C.bad }}> ⚠</span>}</div>
        </div>
      ))}
    </Card>
  );
}

function CalendarView() {
  const days = ["23", "24", "25", "26", "27", "28", "29", "30", "01", "02", "03"];
  // bar: [van, startIdx, span, label, color]
  const bars = {
    "LDV-01": [[2, 5, "Arctic Wolves", C.blue]],
    "LDV-02": [[0, 1, "V.Tongue", C.blue]],
    "LDV-03": [[1, 8, "The Mire", C.blue]],
    "LDV-04": [[0, 1, "Strays", C.blue]],
    "LDV-05": [[0, 1, "Halcyon", C.blue]],
    "LDV-06": [[5, 6, "J. Brennan", C.amber]],
    "LDV-07": [[8, 3, "Northbound", C.good]],
    "LDV-08": [],
  };
  return (
    <Card style={{ padding: 16, overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <Btn small>◀</Btn>
        <span style={{ fontFamily: mono, fontSize: 14 }}>June 2026</span>
        <Btn small>▶</Btn>
        <span style={{ color: C.faint, fontSize: 12.5, marginLeft: "auto" }}>
          ⚠ Overlapping dates on the same van are blocked at booking.</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `64px repeat(${days.length},1fr)`,
        gap: 4, minWidth: 760 }}>
        <div />
        {days.map((d) => <div key={d} style={{ fontFamily: mono, fontSize: 12,
          color: C.faint, textAlign: "center" }}>{d}</div>)}
        {VANS.map((v) => (
          <React.Fragment key={v.id}>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.sub,
              display: "flex", alignItems: "center" }}>{v.id}</div>
            <div style={{ gridColumn: `2 / span ${days.length}`, position: "relative",
              height: 30, background: C.ink, borderRadius: 5,
              border: `1px solid ${C.line}` }}>
              {bars[v.id].map((b, i) => (
                <div key={i} style={{ position: "absolute", top: 3, bottom: 3,
                  left: `calc(${(b[0] / days.length) * 100}% + 2px)`,
                  width: `calc(${(b[1] / days.length) * 100}% - 4px)`,
                  background: b[3] + "33", border: `1px solid ${b[3]}`, borderRadius: 4,
                  color: b[3], fontSize: 11, fontWeight: 600, display: "flex",
                  alignItems: "center", paddingLeft: 8, overflow: "hidden",
                  whiteSpace: "nowrap" }}>{b[2]}</div>
              ))}
              {bars[v.id].length === 0 && (
                <span style={{ position: "absolute", left: 10, top: 7, color: C.faint,
                  fontSize: 12 }}>available</span>)}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------- booking detail
function BookingDetail({ booking, back }) {
  const b = booking || BOOKINGS[0];
  const [chasing, setChasing] = useState(true);
  const checklist = [
    { label: "Booking confirmed", state: "done" },
    { label: "Deposit £1,500", state: "bad", note: "unpaid", actions: ["Send reminder", "Mark paid"] },
    { label: "Driver licence (front/back)", state: "bad", note: "missing", actions: ["Request", "Upload"] },
    { label: "Proof of address", state: "done", note: "received 21 Jun", actions: ["View"] },
    { label: "Signed hire agreement", state: "warn", note: "pending", actions: ["Send"] },
    { label: "Driver over 25 confirmed", state: "done", note: "auto-flagged" },
  ];
  const done = checklist.filter((c) => c.state === "done").length;
  return (
    <div>
      <button onClick={back} style={{ background: "none", border: "none", color: C.sub,
        cursor: "pointer", fontSize: 13.5, marginBottom: 14, fontFamily: sans }}>← Back to bookings</button>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>{b.band}</h1>
        <Pill color={statusColor(b.status)}>{b.status}</Pill>
      </div>
      <div style={{ color: C.sub, fontFamily: mono, fontSize: 13, marginBottom: 18 }}>
        {b.van} · {b.dates} · Tour manager {b.tm} · sam@arcticwolves.com · 07700 900123
      </div>

      <Card style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Eyebrow>Onboarding checklist — after “yes”</Eyebrow>
          <div style={{ marginLeft: "auto", marginBottom: 10 }}><DocDots done={done} /></div>
        </div>
        {checklist.map((c, i) => {
          const col = c.state === "done" ? C.good : c.state === "bad" ? C.bad : C.amber;
          const mark = c.state === "done" ? "✓" : "✗";
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12,
              padding: "12px 0", borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span style={{ color: col, fontFamily: mono, fontSize: 15, width: 16 }}>{mark}</span>
              <span style={{ flex: 1, fontSize: 14 }}>{c.label}</span>
              {c.note && <span style={{ color: col, fontSize: 12.5, fontFamily: mono }}>{c.note}</span>}
              {(c.actions || []).map((a) => (
                <Btn key={a} small variant={a.includes("Send") || a === "Request" ? "primary" : "ghost"}>{a}</Btn>
              ))}
            </div>
          );
        })}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 14, marginBottom: 16 }}>
        <Card style={{ padding: 18 }}>
          <Eyebrow>Payments</Eyebrow>
          {[
            { l: "Deposit", v: "£1,500", s: "Due", c: C.bad },
            { l: "Hire fee", v: "£2,000", s: "Not due", c: C.sub },
            { l: "Security", v: "£1,500", s: "On collection", c: C.sub },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "9px 0",
              borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span style={{ flex: 1, fontSize: 14 }}>{r.l}</span>
              <span style={{ fontFamily: mono, marginRight: 12 }}>{r.v}</span>
              <span style={{ color: r.c, fontSize: 12.5 }}>{r.s}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 6, paddingTop: 10,
            display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: C.sub, fontSize: 13 }}>Outstanding</span>
            <span style={{ fontFamily: mono, color: C.amber, fontWeight: 700 }}>£3,500</span>
          </div>
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Eyebrow>Automated chasing</Eyebrow>
            <span style={{ marginLeft: "auto", marginBottom: 10, fontFamily: mono, fontSize: 11,
              color: chasing ? C.good : C.faint }}>{chasing ? "● live" : "○ paused"}</span>
          </div>
          {[
            { t: "Booking confirmation sent", d: "21 Jun", done: true },
            { t: "Deposit reminder #1 sent", d: "22 Jun", done: true },
            { t: "Deposit reminder #2 scheduled", d: "24 Jun", done: false },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0",
              borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span style={{ color: r.done ? C.good : C.amber, fontFamily: mono }}>{r.done ? "✓" : "→"}</span>
              <span style={{ flex: 1, fontSize: 13.5 }}>{r.t}</span>
              <span style={{ fontFamily: mono, color: C.faint, fontSize: 12.5 }}>{r.d}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Btn small onClick={() => setChasing(!chasing)}>{chasing ? "Pause auto-chase" : "Resume"}</Btn>
            <Btn small variant="primary">Message now</Btn>
          </div>
        </Card>
      </div>

      <Card style={{ padding: 18 }}>
        <Eyebrow>Activity &amp; notes</Eyebrow>
        {[
          { d: "22 Jun", who: "Danny", t: "Sam asked to collect 8am instead of 9" },
          { d: "21 Jun", who: "System", t: "Proof of address uploaded" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0",
            borderTop: i ? `1px solid ${C.line}` : "none" }}>
            <span style={{ fontFamily: mono, color: C.faint, fontSize: 12.5, width: 50 }}>{r.d}</span>
            <span style={{ fontFamily: mono, color: r.who === "Danny" ? C.amber : C.blue,
              fontSize: 12.5, width: 56 }}>{r.who}</span>
            <span style={{ fontSize: 13.5 }}>{r.t}</span>
          </div>
        ))}
        <input placeholder="Add a note…" style={{ width: "100%", marginTop: 12, boxSizing: "border-box",
          background: C.ink, border: `1px solid ${C.line}`, color: C.text, padding: "9px 12px",
          borderRadius: 6, fontFamily: sans, fontSize: 13 }} />
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------- new booking
function NewBooking({ back, openBooking }) {
  const [step, setStep] = useState(1);
  const steps = ["Customer", "Van & dates", "Quote & confirm"];
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <button onClick={back} style={{ background: "none", border: "none", color: C.sub,
        cursor: "pointer", fontSize: 13.5, marginBottom: 14, fontFamily: sans }}>← Cancel</button>
      <h1 style={{ fontSize: 24, marginTop: 0 }}>New booking</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 22, height: 22, borderRadius: 99, fontFamily: mono, fontSize: 12,
              display: "grid", placeItems: "center",
              background: step >= i + 1 ? C.amber : C.panel2,
              color: step >= i + 1 ? C.ink : C.faint }}>{i + 1}</span>
            <span style={{ fontSize: 13, color: step === i + 1 ? C.text : C.faint }}>{s}</span>
            {i < 2 && <span style={{ color: C.line }}>—</span>}
          </div>
        ))}
      </div>

      <Card style={{ padding: 22 }}>
        {step === 1 && (
          <div>
            <Eyebrow>Customer</Eyebrow>
            <input placeholder="Search existing customer…" style={inp} />
            <div style={{ background: C.amberDim, border: `1px solid ${C.amber}55`,
              borderRadius: 6, padding: "10px 12px", marginTop: 10, fontSize: 13 }}>
              ⚠ Possible match: <b>Sam Reid</b> (Arctic Wolves) and <b>Sam R.</b> (different email).
              <button style={{ color: C.amber, background: "none", border: "none",
                cursor: "pointer", marginLeft: 6, fontFamily: sans, fontSize: 13 }}>Merge?</button>
            </div>
            <div style={{ textAlign: "center", color: C.faint, margin: "12px 0", fontSize: 13 }}>or</div>
            <Btn>+ Add new customer</Btn>
          </div>
        )}
        {step === 2 && (
          <div>
            <Eyebrow>Van &amp; dates</Eyebrow>
            <div style={{ display: "flex", gap: 10 }}>
              <Field label="Van"><select style={inp}><option>LDV-01</option><option>LDV-08</option></select></Field>
              <Field label="From"><input style={inp} defaultValue="25 Jun" /></Field>
              <Field label="To"><input style={inp} defaultValue="30 Jun" /></Field>
            </div>
            <div style={{ background: C.goodDim, border: `1px solid ${C.good}55`,
              borderRadius: 6, padding: "10px 12px", marginTop: 12, fontSize: 13, color: C.good }}>
              ✓ LDV-01 is available for these dates — no conflict.
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <Eyebrow>Quote</Eyebrow>
            <div style={{ display: "flex", gap: 10 }}>
              <Field label="Daily rate"><input style={inp} defaultValue="£400" /></Field>
              <Field label="× Days"><input style={inp} defaultValue="5" /></Field>
              <Field label="Deposit"><input style={inp} defaultValue="£1,500" /></Field>
            </div>
            <div style={{ marginTop: 14, fontFamily: mono, fontSize: 15 }}>
              Hire total <span style={{ color: C.amber }}>£2,000</span> + security £1,500
            </div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22 }}>
          <Btn onClick={() => (step > 1 ? setStep(step - 1) : back())}>{step > 1 ? "Back" : "Cancel"}</Btn>
          {step < 3
            ? <Btn variant="primary" onClick={() => setStep(step + 1)}>Continue</Btn>
            : <Btn variant="primary" onClick={() => openBooking(BOOKINGS[0])}>Confirm &amp; start onboarding →</Btn>}
        </div>
      </Card>
    </div>
  );
}
const inp = { width: "100%", boxSizing: "border-box", background: C.ink,
  border: `1px solid ${C.line}`, color: C.text, padding: "9px 12px", borderRadius: 6,
  fontFamily: sans, fontSize: 13.5 };
function Field({ label, children }) {
  return (
    <label style={{ flex: 1, display: "block" }}>
      <span style={{ fontFamily: mono, fontSize: 11, color: C.faint, display: "block",
        marginBottom: 5, letterSpacing: ".06em" }}>{label}</span>
      {children}
    </label>
  );
}

// ---------------------------------------------------------------- fleet
function Fleet({ openReturn }) {
  const lab = { out: "Out", due: "Due back", service: "Service", booked: "Booked", free: "Available" };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, flex: 1 }}>Fleet <span style={{ color: C.faint,
          fontSize: 16, fontWeight: 400 }}>8 vans</span></h1>
        <Btn>+ Add van</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {VANS.map((v) => (
          <Card key={v.id} style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 15 }}>{v.id}</span>
              <span style={{ marginLeft: "auto" }}><Pill color={statusColor(v.status)}>
                {lab[v.status]}{v.due ? " " + v.due : ""}</Pill></span>
            </div>
            <div style={{ color: C.sub, fontSize: 13.5, marginBottom: 14, minHeight: 18 }}>
              {v.who ? `${v.who} · off-road` : v.band}</div>
            <div style={{ display: "flex", gap: 14, fontFamily: mono, fontSize: 12 }}>
              <span style={{ color: v.mot === "ok" ? C.good : C.amber }}>
                MOT {v.mot === "ok" ? "✓" : "⚠ 9d"}</span>
              <span style={{ color: C.good }}>Ins ✓</span>
            </div>
            {v.status === "due" && (
              <Btn small variant="primary" onClick={openReturn}
                >Log return</Btn>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- van return
function VanReturn({ back }) {
  const [dmg, setDmg] = useState("minor");
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <button onClick={back} style={{ background: "none", border: "none", color: C.sub,
        cursor: "pointer", fontSize: 13.5, marginBottom: 14, fontFamily: sans }}>← Back to fleet</button>
      <h1 style={{ fontSize: 24, marginTop: 0 }}>Van return — LDV-04 <span style={{ color: C.faint,
        fontWeight: 400, fontSize: 18 }}>The Strays</span></h1>
      <div style={{ color: C.sub, fontFamily: mono, fontSize: 13, marginBottom: 18 }}>
        Returned 23 Jun 14:00 · Security deposit held £1,500</div>

      <Card style={{ padding: 18, marginBottom: 16 }}>
        <Eyebrow>Inspection</Eyebrow>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ width: 70, height: 54, background: C.ink, borderRadius: 6,
              border: `1px solid ${C.line}`, display: "grid", placeItems: "center",
              color: C.faint }}>📷</div>
          ))}
          <Btn small>+ Add photos</Btn>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {["none", "minor", "major"].map((d) => (
            <button key={d} onClick={() => setDmg(d)} style={{ flex: 1, padding: "9px",
              borderRadius: 6, cursor: "pointer", fontFamily: sans, fontSize: 13,
              textTransform: "capitalize", fontWeight: 600,
              background: dmg === d ? C.amberDim : C.panel2,
              border: `1px solid ${dmg === d ? C.amber : C.line}`,
              color: dmg === d ? C.amber : C.sub }}>{d} damage</button>
          ))}
        </div>
        <input style={inp} defaultValue="Scrape on rear nearside panel" />
        <div style={{ marginTop: 10 }}>
          <Field label="Repair estimate"><input style={{ ...inp, maxWidth: 160 }} defaultValue="£180" /></Field>
        </div>
      </Card>

      <Card style={{ padding: 18 }}>
        <Eyebrow>Deposit resolution</Eyebrow>
        {[
          { l: "Security deposit held", v: "£1,500", c: C.text },
          { l: "Deduction (damage)", v: "− £180", c: C.bad },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span style={{ fontSize: 14 }}>{r.l}</span>
            <span style={{ fontFamily: mono, color: r.c }}>{r.v}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.line}`,
          paddingTop: 10, marginTop: 4 }}>
          <span style={{ fontWeight: 600 }}>Refund to customer</span>
          <span style={{ fontFamily: mono, color: C.good, fontWeight: 700 }}>£1,320</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <Btn variant="primary">Approve refund</Btn>
          <Btn>Escalate to insurance claim</Btn>
        </div>
        <div style={{ color: C.faint, fontSize: 12.5, marginTop: 10 }}>
          ⚠ If repairs exceed £1,500, this opens the insurance-claim workflow (Theo).</div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------- customers
function Customers() {
  const fk = { warn: C.amber, good: C.good, sub: C.faint };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, flex: 1 }}>Customers</h1>
        <Btn>+ Add customer</Btn>
      </div>
      <Card style={{ overflow: "hidden", marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr .8fr 1fr 1.2fr",
          padding: "10px 16px", fontFamily: mono, fontSize: 11, letterSpacing: ".06em",
          textTransform: "uppercase", color: C.faint, borderBottom: `1px solid ${C.line}` }}>
          {["Name", "Band / company", "Bookings", "Last hire", "Flags"].map((h) => <div key={h}>{h}</div>)}
        </div>
        {CUSTOMERS.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr .8fr 1fr 1.2fr",
            padding: "13px 16px", alignItems: "center", fontSize: 13.5,
            borderBottom: i < CUSTOMERS.length - 1 ? `1px solid ${C.line}` : "none" }}>
            <div style={{ fontWeight: 600 }}>{c.name}</div>
            <div style={{ color: C.sub }}>{c.band}</div>
            <div style={{ fontFamily: mono }}>{c.n}</div>
            <div style={{ color: C.sub, fontFamily: mono, fontSize: 12.5 }}>{c.last}</div>
            <div style={{ color: fk[c.flagKind], fontSize: 12.5 }}>
              {c.flagKind === "warn" ? "⚠ " : c.flagKind === "good" ? "⭐ " : "○ "}{c.flag}</div>
          </div>
        ))}
      </Card>
      <Card style={{ padding: 18 }}>
        <Eyebrow>Customer detail — Sam Reid</Eyebrow>
        <div style={{ fontSize: 13.5, color: C.sub, marginBottom: 8 }}>
          Linked emails: <span style={{ fontFamily: mono, color: C.text }}>sam@arcticwolves.com</span>,
          <span style={{ fontFamily: mono, color: C.text }}> samreid88@gmail.com</span>
          <button style={{ color: C.amber, background: "none", border: "none", cursor: "pointer",
            fontFamily: sans, fontSize: 12.5, marginLeft: 6 }}>unmerge</button>
        </div>
        <div style={{ display: "flex", gap: 18, fontFamily: mono, fontSize: 12.5, marginBottom: 10 }}>
          <span style={{ color: C.good }}>Licence on file ✓</span>
          <span style={{ color: C.good }}>Over 25 ✓</span>
          <span style={{ color: C.good }}>Proof of address ✓</span>
        </div>
        <div style={{ color: C.sub, fontSize: 13 }}>4 hires · £8,200 lifetime · 0 damage incidents</div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------- finances
function Finances() {
  const sk = { good: C.good, bad: C.bad };
  const cell = (s) => ({ paid: ["✓", C.good], due: ["⚠ due", C.bad], short: ["⚠ short", C.bad],
    na: ["–", C.faint] }[s]);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, flex: 1 }}>Finances</h1>
        <Btn>Sync QuickBooks</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 16 }}>
        {[
          { l: "Collected (month)", v: "£11,600", c: C.good },
          { l: "Outstanding", v: "£2,400", c: C.amber },
          { l: "Security deposits held", v: "£4,500", c: C.text },
        ].map((k) => (
          <Card key={k.l} style={{ padding: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.faint, letterSpacing: ".1em",
              textTransform: "uppercase" }}>{k.l}</div>
            <div style={{ fontFamily: mono, fontSize: 26, fontWeight: 700, color: k.c, marginTop: 6 }}>{k.v}</div>
          </Card>
        ))}
      </div>
      <Card style={{ overflow: "hidden", marginBottom: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.4fr",
          padding: "10px 16px", fontFamily: mono, fontSize: 11, letterSpacing: ".06em",
          textTransform: "uppercase", color: C.faint, borderBottom: `1px solid ${C.line}` }}>
          {["Booking", "Deposit", "Hire fee", "Security", "Status"].map((h) => <div key={h}>{h}</div>)}
        </div>
        {PAYMENTS.map((p, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.4fr",
            padding: "13px 16px", alignItems: "center", fontSize: 13.5,
            borderBottom: i < PAYMENTS.length - 1 ? `1px solid ${C.line}` : "none" }}>
            <div style={{ fontWeight: 600 }}>{p.band}</div>
            {[p.dep, p.hire, p.sec].map((s, j) => {
              const [txt, col] = cell(s);
              return <div key={j} style={{ fontFamily: mono, fontSize: 13, color: col }}>{txt}</div>;
            })}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: sk[p.sk], fontSize: 13 }}>{p.status}</span>
              {p.sk === "bad" && <Btn small variant="primary">Chase</Btn>}
            </div>
          </div>
        ))}
      </Card>
      <div style={{ color: C.faint, fontSize: 12.5 }}>
        Reconciled against your bank feed — no more scrolling Gmail for payment emails.</div>
    </div>
  );
}

// ---------------------------------------------------------------- root
export default function SchuwazApp() {
  const [page, setPage] = useState("Dashboard");
  const [booking, setBooking] = useState(null);

  const openBooking = (b) => { setBooking(b); setPage("BookingDetail"); };
  const openReturn = () => setPage("VanReturn");
  const newBooking = () => setPage("NewBooking");

  let body;
  if (page === "Dashboard") body = <Dashboard go={setPage} openBooking={openBooking} />;
  else if (page === "Bookings") body = <Bookings openBooking={openBooking} />;
  else if (page === "BookingDetail") body = <BookingDetail booking={booking} back={() => setPage("Bookings")} />;
  else if (page === "NewBooking") body = <NewBooking back={() => setPage("Dashboard")} openBooking={openBooking} />;
  else if (page === "Fleet") body = <Fleet openReturn={openReturn} />;
  else if (page === "VanReturn") body = <VanReturn back={() => setPage("Fleet")} />;
  else if (page === "Customers") body = <Customers />;
  else if (page === "Finances") body = <Finances />;

  // keep top nav highlight sensible for sub-screens
  const navPage = { BookingDetail: "Bookings", NewBooking: "Dashboard", VanReturn: "Fleet" }[page] || page;

  return (
    <Shell page={navPage} setPage={setPage} onNew={newBooking}>
      {body}
    </Shell>
  );
}
