import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { mapGoogleLead, verifyGoogleKey } from "../../src/ingest/google.js";
import {
  POLL_STALE_AFTER_MINUTES,
  flattenLinkedInAnswers,
  mapLinkedInLead,
  pollHealth,
} from "../../src/ingest/linkedin.js";
import {
  mapMetaLead,
  parseMetaWebhook,
  verifyMetaSignature,
  verifyMetaSubscription,
} from "../../src/ingest/meta.js";

const APP_SECRET = "test-app-secret";
const sign = (body: string) =>
  "sha256=" + createHmac("sha256", APP_SECRET).update(body).digest("hex");

describe("Meta Lead Ads", () => {
  it("completes the subscription handshake only with the right token", () => {
    expect(
      verifyMetaSubscription({ mode: "subscribe", token: "tok", challenge: "1234" }, "tok"),
    ).toBe("1234");
    expect(
      verifyMetaSubscription({ mode: "subscribe", token: "wrong", challenge: "1234" }, "tok"),
    ).toBeNull();
    expect(verifyMetaSubscription({ mode: "subscribe", token: "tok" }, "tok")).toBeNull();
  });

  it("verifies a genuine signature and rejects tampering", () => {
    const body = JSON.stringify({ object: "page", entry: [] });
    expect(verifyMetaSignature(body, sign(body), APP_SECRET)).toBe(true);
    // One byte changed in the body -> signature must fail.
    expect(verifyMetaSignature(body + " ", sign(body), APP_SECRET)).toBe(false);
    expect(verifyMetaSignature(body, sign(body), "wrong-secret")).toBe(false);
  });

  it("rejects malformed, missing and wrong-length signatures without throwing", () => {
    const body = "{}";
    expect(verifyMetaSignature(body, undefined, APP_SECRET)).toBe(false);
    expect(verifyMetaSignature(body, "sha1=abcd", APP_SECRET)).toBe(false);
    expect(verifyMetaSignature(body, "sha256=", APP_SECRET)).toBe(false);
    // Truncated hex would make timingSafeEqual throw if length were unchecked.
    expect(verifyMetaSignature(body, "sha256=deadbeef", APP_SECRET)).toBe(false);
  });

  it("extracts every lead reference from a multi-entry delivery", () => {
    const refs = parseMetaWebhook({
      object: "page",
      entry: [
        {
          id: "page-1",
          changes: [
            {
              field: "leadgen",
              value: {
                leadgen_id: "lead-1",
                page_id: "page-1",
                form_id: "form-9",
                adgroup_id: "ad-3",
                created_time: 1_772_000_000,
              },
            },
            { field: "feed", value: { post_id: "irrelevant" } },
          ],
        },
        { id: "page-1", changes: [{ field: "leadgen", value: { leadgen_id: "lead-2" } }] },
      ],
    });
    expect(refs.map((r) => r.leadgenId)).toEqual(["lead-1", "lead-2"]);
    expect(refs[0]).toMatchObject({ formId: "form-9", adId: "ad-3" });
    expect(refs[0]!.createdTime?.toISOString()).toBe("2026-02-25T06:13:20.000Z");
  });

  it("ignores non-leadgen traffic and malformed bodies without throwing", () => {
    expect(parseMetaWebhook({ object: "page", entry: [{ changes: [{ field: "feed" }] }] })).toEqual([]);
    expect(parseMetaWebhook({})).toEqual([]);
    expect(parseMetaWebhook(null)).toEqual([]);
    expect(parseMetaWebhook({ entry: [{ changes: [{ field: "leadgen", value: {} }] }] })).toEqual([]);
  });

  it("maps a fetched lead into the common shape", () => {
    const lead = mapMetaLead({
      id: "lead-1",
      created_time: "2026-03-01T09:15:00+0000",
      campaign_name: "Wakad 3BHK March",
      field_data: [
        { name: "full_name", values: ["Priya Nair"] },
        { name: "phone_number", values: ["09876543210"] },
        { name: "what_is_your_budget?", values: ["1-2 Cr"] },
        { name: "site_visit", values: ["Yes"] },
      ],
    });

    expect(lead.source).toBe("meta_lead_ad");
    expect(lead.sourceEventId).toBe("lead-1");
    expect(lead.sourceCampaign).toBe("Wakad 3BHK March");
    expect(lead.phoneE164).toBe("+919876543210");
    expect(lead.qualification).toMatchObject({
      budgetMin: 10_000_000,
      budgetMax: 20_000_000,
      siteVisitReady: true,
    });
    expect(lead.consentSource).toBe("meta_lead_ad_form");
    expect(lead.isTest).toBe(false);
  });

  it("stores a lead whose phone will not normalise instead of dropping it", () => {
    const lead = mapMetaLead({
      id: "lead-2",
      field_data: [{ name: "phone_number", values: ["not a number"] }],
    });
    expect(lead.phoneE164).toBeNull();
    expect(lead.phoneRaw).toBe("not a number");
    expect(lead.sourceEventId).toBe("lead-2");
  });
});

describe("Google Ads lead forms", () => {
  it("compares the shared key in constant time and rejects mismatches", () => {
    expect(verifyGoogleKey("secret", "secret")).toBe(true);
    expect(verifyGoogleKey("secret", "secreT")).toBe(false);
    expect(verifyGoogleKey("short", "secret")).toBe(false);
    expect(verifyGoogleKey(undefined, "secret")).toBe(false);
    expect(verifyGoogleKey("secret", "")).toBe(false);
  });

  it("prefers the typed column_id over free-text question wording", () => {
    const lead = mapGoogleLead({
      lead_id: "g-1",
      campaign_id: 12345,
      google_key: "k",
      user_column_data: [
        // Question text in Hindi — only the typed id makes this readable.
        { column_id: "FULL_NAME", column_name: "आपका नाम", string_value: "Amit Desai" },
        { column_id: "PHONE_NUMBER", column_name: "मोबाइल", string_value: "9876543210" },
        { column_id: "USER_EMAIL", column_name: "ईमेल", string_value: "amit@example.com" },
        { column_name: "Budget", string_value: "Under 80 lakh" },
      ],
    });

    expect(lead.source).toBe("google_ads");
    expect(lead.fullName).toBe("Amit Desai");
    expect(lead.email).toBe("amit@example.com");
    expect(lead.phoneE164).toBe("+919876543210");
    expect(lead.qualification.budgetMax).toBe(8_000_000);
    expect(lead.sourceCampaign).toBe("google:12345");
  });

  it("flags test submissions so they never reach a salesperson", () => {
    expect(mapGoogleLead({ lead_id: "g-2", is_test: true }).isTest).toBe(true);
    expect(mapGoogleLead({ lead_id: "g-3" }).isTest).toBe(false);
  });

  it("keeps an unrecognised typed column under its id rather than losing it", () => {
    const lead = mapGoogleLead({
      lead_id: "g-4",
      user_column_data: [{ column_id: "SOME_NEW_FIELD", string_value: "value" }],
    });
    expect(lead.unmappedFields["SOME_NEW_FIELD"]).toBe("value");
  });
});

describe("LinkedIn lead gen forms", () => {
  it("flattens the nested answer envelope", () => {
    expect(
      flattenLinkedInAnswers([
        {
          questionId: "Budget",
          answerDetails: { textQuestionAnswer: { answer: "2 Cr+" } },
        },
        { question: "City", answer: "Mumbai" },
        { name: "phone", values: ["+919876543210"] },
        { questionId: "Empty" },
        "junk",
        null,
      ]),
    ).toEqual([
      { name: "Budget", values: ["2 Cr+"] },
      { name: "City", values: ["Mumbai"] },
      { name: "phone", values: ["+919876543210"] },
    ]);
  });

  it("maps a polled response into the common shape", () => {
    const lead = mapLinkedInLead({
      id: "li-1",
      campaign: "urn:li:sponsoredCampaign:999",
      submittedAt: Date.UTC(2026, 2, 1, 10, 0, 0),
      testLead: false,
      formResponse: {
        answers: [
          { question: "Full Name", answer: "Sanjay Mehta" },
          { question: "Mobile Number", answer: "+91 98765 43210" },
          { question: "Budget", answer: "5 Cr+" },
        ],
      },
    });
    expect(lead.source).toBe("linkedin_ads");
    expect(lead.phoneE164).toBe("+919876543210");
    expect(lead.qualification.budgetMin).toBe(50_000_000);
    expect(lead.consentAt.toISOString()).toBe("2026-03-01T10:00:00.000Z");
  });

  it("handles the flat answers shape as well as the nested one", () => {
    const lead = mapLinkedInLead({
      id: "li-2",
      answers: [{ question: "City", answer: "Bengaluru" }],
    });
    expect(lead.city).toBe("Bengaluru");
  });
});

describe("LinkedIn poller health", () => {
  const now = new Date("2026-03-01T12:00:00Z");
  const minsAgo = (m: number) => new Date(now.getTime() - m * 60_000);

  it("alerts on the absence of a successful poll, not the absence of leads", () => {
    // This is the whole reason the function exists: a pull adapter that dies
    // looks exactly like a quiet day unless something watches the poll itself.
    expect(pollHealth(null, now)).toEqual({ status: "never_run" });
    expect(pollHealth(minsAgo(POLL_STALE_AFTER_MINUTES + 30), now)).toEqual({
      status: "stale",
      minutesSinceSuccess: POLL_STALE_AFTER_MINUTES + 30,
    });
  });

  it("stays quiet while polls are landing on schedule", () => {
    expect(pollHealth(minsAgo(20), now)).toEqual({ status: "ok" });
    expect(pollHealth(minsAgo(POLL_STALE_AFTER_MINUTES - 1), now)).toEqual({ status: "ok" });
  });
});
