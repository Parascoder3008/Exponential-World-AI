# Integration setup

Per-platform setup, in the order you should start them. **Start the Meta
business verification on day one** — it is the longest lead time in the
project and contains zero engineering.

---

## Meta Lead Ads (Facebook + Instagram)

**Delivery: push, two hops.** The webhook carries only a `leadgen_id`; the
answers are fetched separately.

### Client must provide
- Business Manager **admin** access
- Facebook Page + linked Instagram business account
- Business verification (documents; days to weeks — start first)

### App setup
1. Create a Meta app, add the **Webhooks** and **Facebook Login** products.
2. Request `leads_retrieval` and `pages_show_list`.
3. Generate a **system user token** and grant it Page access. A user token
   expires when the person who made it changes their password.
4. Subscribe the Page to the `leadgen` field.

### Wiring
```ts
// GET  — subscription handshake
// POST — lead notifications
const res = await handleMetaWebhook(
  { method, query, headers, rawBody },      // rawBody MUST be the raw text
  { appSecret, verifyToken, enqueueFetch, repo },
);
```

Then, in the background job:
```ts
const detail = await fetchLeadFromGraph(leadgenId);   // your Graph call
await ingestMetaLeadDetail(repo, detail, config);
```

### Traps
- **Verify the signature against the RAW bytes.** Parsing and re-serialising
  JSON changes the bytes and the HMAC will fail. In Express use
  `express.raw()`, not `express.json()`; in Next.js use `req.text()`.
- **Do not fetch inline.** Meta retries anything it deems slow and eventually
  unsubscribes a consistently slow app.
- Non-`leadgen` changes (page edits, feed posts) arrive on the same
  subscription. That is normal traffic — return 200, ignore them.
- Test with Meta's **Lead Ads Testing Tool** before going live.

---

## Google Ads lead form extensions

**Delivery: push, one hop.** Answers arrive in the same request. Simplest and
least breakable of the three.

### Setup
1. In the lead form extension, set the webhook URL and a **shared secret**
   (`google_key`).
2. Send a test submission from the form preview.

### Wiring
```ts
const res = await handleGoogleWebhook({ method, query, headers, rawBody },
  { googleKey, repo, config });
```

### Traps
- **There is no HMAC.** The shared key is the only thing guarding the
  endpoint — compare it in constant time (the handler does) and keep the path
  unguessable. Rate-limit at the edge.
- **Test submissions must return 200.** Google's preview treats a non-200 as a
  broken integration and refuses to let the advertiser publish the form. The
  handler stores them and marks them `is_test`, so they never reach an agent.
- Standard fields carry a typed `column_id`; custom questions carry only the
  question text, which may be in Hindi. Prefer the id.

---

## LinkedIn Lead Gen Forms

> **Read this before selling it.** LinkedIn is a poor fit for mainstream
> residential real estate — a B2B audience at B2B cost-per-lead. It earns its
> place for luxury (₹5Cr+), commercial/office, and NRI investor campaigns. For
> a typical broker the same budget on Meta buys more site visits.

**Delivery: pull.** You poll the Marketing API on a schedule.

### Setup
1. LinkedIn Developer app with Marketing Developer Platform access
   (**approval required, and it takes time**).
2. OAuth against the ad account with lead-form scopes.
3. Store the refresh token; schedule the poll at `POLL_INTERVAL_MINUTES` (15).

### The thing that actually matters
```ts
// Alert on the ABSENCE of a successful poll — not on failures, not on volume.
const health = pollHealth(lastSuccessfulPollAt, now);
if (health.status !== "ok") alertOps(health);
```
A webhook that breaks throws errors. **A poller that breaks goes quiet, and
quiet looks exactly like "no leads today."** An expired token looks identical.
Record every successful poll in `integration_health`; the `stale_integrations`
view is the alert query.

### Trap
`flattenLinkedInAnswers` is tolerant of several answer nestings because the
envelope has changed across API versions and access tiers. **It is the one
function to fix once a real payload is in hand** — everything downstream of it
is shape-independent and fully tested.

---

## Property portals — 99acres, MagicBricks, Housing

**Delivery: email. This is the DEFAULT path, not a fallback.**

Every portal gates its lead API behind a higher subscription tier plus a
support request, and which tier varies by account, city and sales rep. **You
find out whether it exists after the contract is signed.** Every portal, on
every plan, emails the lead to the account holder.

So build email parsing first. It works day one for any client, is
vendor-independent, and survives a portal changing its API terms. If a client
turns out to have API access, that becomes a faster *second* source feeding
the same dedupe — not a rewrite.

### Setup
1. A dedicated mailbox (Gmail API or IMAP).
2. Either point the portal notifications at it, or have the broker
   auto-forward. **Forwarding is what most brokers will actually do**, which
   rewrites the `From` header — the parser falls back to subject and body
   hints for exactly this reason.
3. Poll the mailbox; record each poll in `integration_health` (same silent-
   failure problem as LinkedIn).

### Wiring
```ts
const out = await handlePortalEmail(email, { repo, config });
if (out.status === "quarantined") reviewQueue.push(email);
```

### Trap
Portals redesign their email templates without warning. The parser is
**label-driven, not layout-driven** — it hunts for `Name:` / `Phone:` /
`Budget:` anywhere, in any order, across three layouts (colon-delimited,
whitespace columns, label-on-its-own-line). A position-based parser breaks
silently at 2am with the day's leads going nowhere.

**Watch the quarantine queue.** It is how you learn about a redesign in a day
rather than a month.

---

## WhatsApp Business API

### Client must provide
- **A dedicated phone number NOT active on the WhatsApp consumer or Business
  app.** This trips up almost every project — allow time to source one.
- Facebook Business verification (same as Meta Lead Ads)

### Choice
| | Direct Cloud API | BSP (AiSensy / Interakt / Gupshup / Wati) |
|---|---|---|
| Cost | lower | + platform fee |
| Setup | slower | faster |
| Shared inbox for non-technical staff | build it | included |

**Recommend a BSP for client #1, direct once you have 3+ clients.**

### Traps
- Every template needs pre-approval. **Utility-category templates are far
  cheaper than marketing** — structure the cadence to be genuinely utility
  where it honestly is (booking confirmations, reminders, milestone updates).
- Quality rating can throttle or ban a number that gets blocked too often.
  The frequency caps, contact window and instant opt-out in this engine exist
  to protect it. **A banned number takes the client's entire channel down.**
- Keep a backup number verified.

---

## Telephony (Exotel / Knowlarity / MyOperator)

Call masking, recording, click-to-call, and **missed-call capture** — the last
of these is underrated: a missed-call number on a hoarding or site board is a
high-intent, zero-friction enquiry, and tracking numbers give you attribution
for offline media that is otherwise impossible to measure.

Map each tracking number to a campaign and pass it as `numberToCampaign`.

Call masking also matters commercially: it stops agents taking the client's
leads with them when they leave. Brokers care about lead leakage more than you
expect, and it is a strong reason for the owner to buy.

---

## India compliance

*Have the client confirm specifics with their own counsel. This is not legal
advice.*

- **DPDP Act 2023** — consent captured at source with purpose and timestamp
  (`consent_source`, `consent_at` on every lead), deletion on request.
- **TRAI / DLT** — SMS needs a registered entity, header and templates.
  Unregistered SMS simply will not deliver.
- **DND / NDNC** — scrub before outbound calling; 9 AM–9 PM window.
- **WhatsApp Business Policy** — opt-in required, templates pre-approved,
  instant honouring of opt-out.
- **RERA** — the project RERA number should appear in promotional messages.
- **AI disclosure** on voice calls, with human handoff on request.

Note the deliberate distinction in `parseCallEvent`: an inbound call is consent
to be **called back on that number**, and nothing more. It is not consent for
marketing broadcasts, so the first outbound touch must be a callback.
