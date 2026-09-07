import { createHmac } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  handleCallEvent,
  handleGoogleWebhook,
  handleMetaWebhook,
  handlePortalEmail,
  handleWebsiteForm,
  ingestMetaLeadDetail,
} from "../../src/pipeline/handlers.js";
import { InMemoryRepository } from "../../src/ports/memory.js";
import type { IngestConfig } from "../../src/pipeline/ingest.js";

const APP_SECRET = "app-secret";
const GOOGLE_KEY = "google-shared-key";
const config: IngestConfig = { serviceCities: ["Pune"] };

const sign = (body: string) =>
  "sha256=" + createHmac("sha256", APP_SECRET).update(body).digest("hex");

const req = (over: Partial<Parameters<typeof handleMetaWebhook>[0]> = {}) => ({
  method: "POST",
  query: {},
  headers: {},
  rawBody: "{}",
  ...over,
});

describe("Meta webhook handler", () => {
  let repo: InMemoryRepository;
  let enqueueFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    repo = new InMemoryRepository();
    enqueueFetch = vi.fn(async () => {});
  });

  const deps = () => ({ appSecret: APP_SECRET, verifyToken: "vtok", enqueueFetch, repo });

  it("completes the GET handshake with the right token and refuses the wrong one", async () => {
    const ok = await handleMetaWebhook(
      req({
        method: "GET",
        query: { "hub.mode": "subscribe", "hub.verify_token": "vtok", "hub.challenge": "1234" },
      }),
      deps(),
    );
    expect(ok).toEqual({ status: 200, body: "1234" });

    const bad = await handleMetaWebhook(
      req({
        method: "GET",
        query: { "hub.mode": "subscribe", "hub.verify_token": "wrong", "hub.challenge": "1234" },
      }),
      deps(),
    );
    expect(bad.status).toBe(403);
  });

  it("rejects an unsigned or tampered POST", async () => {
    const body = JSON.stringify({ entry: [] });
    expect((await handleMetaWebhook(req({ rawBody: body }), deps())).status).toBe(401);
    expect(
      (await handleMetaWebhook(
        req({ rawBody: body + " ", headers: { "x-hub-signature-256": sign(body) } }),
        deps(),
      )).status,
    ).toBe(401);
    expect(enqueueFetch).not.toHaveBeenCalled();
  });

  it("enqueues the fetch rather than doing it inline", async () => {
    // Meta retries anything it considers slow and eventually unsubscribes a
    // consistently slow app, so the second hop must not block the response.
    const body = JSON.stringify({
      entry: [{ changes: [{ field: "leadgen", value: { leadgen_id: "L1", form_id: "F1" } }] }],
    });
    const res = await handleMetaWebhook(
      req({ rawBody: body, headers: { "x-hub-signature-256": sign(body) } }),
      deps(),
    );
    expect(res.status).toBe(200);
    expect(enqueueFetch).toHaveBeenCalledWith("L1", expect.objectContaining({ formId: "F1" }));
  });

  it("returns 200 for non-leadgen traffic on the same subscription", async () => {
    const body = JSON.stringify({ entry: [{ changes: [{ field: "feed", value: {} }] }] });
    const res = await handleMetaWebhook(
      req({ rawBody: body, headers: { "x-hub-signature-256": sign(body) } }),
      deps(),
    );
    expect(res.status).toBe(200);
    expect(enqueueFetch).not.toHaveBeenCalled();
  });

  it("stores a correctly-signed but unparseable body instead of looping on retries", async () => {
    const body = "{not json";
    const res = await handleMetaWebhook(
      req({ rawBody: body, headers: { "x-hub-signature-256": sign(body) } }),
      deps(),
    );
    expect(res.status).toBe(200);
  });

  it("ingests the fetched detail on the second hop", async () => {
    const out = await ingestMetaLeadDetail(
      repo,
      {
        id: "L1",
        field_data: [
          { name: "full_name", values: ["Rahul"] },
          { name: "phone_number", values: ["9876543210"] },
          { name: "city", values: ["Pune"] },
        ],
      },
      config,
    );
    expect(out.result).toBe("created");
    expect(repo.allLeads()).toHaveLength(1);
  });
});

describe("Google webhook handler", () => {
  let repo: InMemoryRepository;
  beforeEach(() => {
    repo = new InMemoryRepository();
  });

  const deps = () => ({ googleKey: GOOGLE_KEY, repo, config });

  it("rejects a wrong or missing shared key", async () => {
    expect(
      (await handleGoogleWebhook(req({ rawBody: JSON.stringify({ google_key: "nope" }) }), deps())).status,
    ).toBe(401);
    expect((await handleGoogleWebhook(req({ rawBody: "{}" }), deps())).status).toBe(401);
  });

  it("ingests a valid submission in one hop", async () => {
    const res = await handleGoogleWebhook(
      req({
        rawBody: JSON.stringify({
          lead_id: "G1",
          google_key: GOOGLE_KEY,
          campaign_id: 42,
          user_column_data: [
            { column_id: "FULL_NAME", string_value: "Amit" },
            { column_id: "PHONE_NUMBER", string_value: "9876543210" },
            { column_id: "CITY", string_value: "Pune" },
          ],
        }),
      }),
      deps(),
    );
    expect(res.status).toBe(200);
    expect(repo.allLeads()[0]!.source).toBe("google_ads");
  });

  it("returns 200 for a test submission so Google lets the form publish", async () => {
    const res = await handleGoogleWebhook(
      req({
        rawBody: JSON.stringify({ lead_id: "G2", google_key: GOOGLE_KEY, is_test: true }),
      }),
      deps(),
    );
    expect(res.status).toBe(200);
    expect(repo.allLeads()[0]!.state).toBe("disqualified");
  });

  it("rejects malformed json and a payload with no lead id", async () => {
    expect((await handleGoogleWebhook(req({ rawBody: "{oops" }), deps())).status).toBe(400);
    expect(
      (await handleGoogleWebhook(req({ rawBody: JSON.stringify({ google_key: GOOGLE_KEY }) }), deps())).status,
    ).toBe(400);
  });
});

describe("other source handlers", () => {
  let repo: InMemoryRepository;
  beforeEach(() => {
    repo = new InMemoryRepository();
  });

  it("returns 200 to a bot rather than telling it the honeypot was detected", async () => {
    const res = await handleWebsiteForm(
      { submissionId: "s1", fields: { phone: "9876543210" }, honeypot: "spam" },
      { repo, config },
    );
    expect(res.status).toBe(200);
    expect(repo.allLeads()).toHaveLength(0);
  });

  it("ingests a genuine website submission", async () => {
    const res = await handleWebsiteForm(
      { submissionId: "s2", fields: { phone: "9876543210", city: "Pune" } },
      { repo, config },
    );
    expect(res.status).toBe(200);
    expect(repo.allLeads()).toHaveLength(1);
  });

  it("ingests a missed call", async () => {
    await handleCallEvent(
      {
        callSid: "c1",
        from: "9876543210",
        to: "+918000000001",
        direction: "inbound",
        status: "missed",
        startedAt: new Date(),
      },
      { repo, config, numberToCampaign: { "+918000000001": "hoarding" } },
    );
    expect(repo.allLeads()[0]!.sourceCampaign).toBe("hoarding");
  });

  it("quarantines an unparseable portal email instead of dropping it", async () => {
    // Portals redesign templates without warning. The quarantine queue is
    // how you find out in a day rather than a month.
    const out = await handlePortalEmail(
      {
        messageId: "<m1>",
        from: "noreply@99acres.com",
        subject: "New response",
        text: "Nothing useful here at all.",
        receivedAt: new Date(),
      },
      { repo, config },
    );
    expect(out.status).toBe("quarantined");
    expect(repo.allLeads()).toHaveLength(0);
  });

  it("ingests a parseable portal email", async () => {
    const out = await handlePortalEmail(
      {
        messageId: "<m2>",
        from: "noreply@99acres.com",
        subject: "New response",
        text: "Name: Rahul\nPhone: 9876543210\nCity: Pune\nBudget: 1 Cr",
        receivedAt: new Date(),
      },
      { repo, config },
    );
    expect(out.status).toBe("ingested");
    expect(repo.allLeads()[0]!.source).toBe("99acres");
  });
});
