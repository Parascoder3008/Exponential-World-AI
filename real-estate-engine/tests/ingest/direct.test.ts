import { describe, expect, it } from "vitest";
import {
  campaignLabel,
  parseCallEvent,
  parseManualEntry,
  parseWebsiteForm,
  type CallEvent,
} from "../../src/ingest/direct.js";

describe("website form", () => {
  it("parses a form and attributes it from UTM params", () => {
    const r = parseWebsiteForm({
      submissionId: "sub-1",
      fields: {
        name: "Rahul Sharma",
        phone: "9876543210",
        budget: "1-2 Cr",
        "preferred area": "Wakad",
      },
      utm: { source: "google", medium: "cpc", campaign: "wakad-3bhk" },
      pageUrl: "https://example.com/wakad",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.source).toBe("website");
    expect(r.lead.phoneE164).toBe("+919876543210");
    expect(r.lead.sourceCampaign).toBe("web:google/cpc/wakad-3bhk");
    expect(r.lead.qualification.budgetMin).toBe(10_000_000);
  });

  it("falls back to click ids, then to the page, so attribution is never lost", () => {
    expect(campaignLabel({ gclid: "abc" })).toBe("web:google/cpc");
    expect(campaignLabel({ fbclid: "abc" })).toBe("web:meta/cpc");
    expect(campaignLabel(undefined, "https://example.com/x")).toBe("web:https://example.com/x");
    expect(campaignLabel(undefined)).toBeUndefined();
  });

  it("silently drops a bot submission rather than teaching it to pass", () => {
    const r = parseWebsiteForm({
      submissionId: "sub-2",
      fields: { phone: "9876543210" },
      honeypot: "http://spam.example",
    });
    expect(r).toMatchObject({ ok: false, reason: "bot_submission" });
  });

  it("accepts an email-only submission but rejects one with no identity at all", () => {
    expect(parseWebsiteForm({ submissionId: "s3", fields: { email: "a@b.com" } }).ok).toBe(true);
    expect(
      parseWebsiteForm({ submissionId: "s4", fields: { "how did you hear": "friend" } }),
    ).toMatchObject({ ok: false, reason: "no_identity" });
  });
});

describe("telephony", () => {
  const call = (over: Partial<CallEvent> = {}): CallEvent => ({
    callSid: "call-1",
    from: "+919876543210",
    to: "+918000000001",
    direction: "inbound",
    status: "missed",
    startedAt: new Date("2026-06-01T10:00:00Z"),
    ...over,
  });

  it("treats a missed call as a lead and attributes it by tracking number", () => {
    // A missed-call number on a hoarding is the only way to attribute
    // offline media at all.
    const lead = parseCallEvent(call(), { "+918000000001": "hoarding:baner-flyover" });
    expect(lead?.source).toBe("missed_call");
    expect(lead?.sourceCampaign).toBe("hoarding:baner-flyover");
    expect(lead?.phoneE164).toBe("+919876543210");
  });

  it("records consent as a callback, not as marketing permission", () => {
    // A call is consent to be called back on that number and nothing more.
    const lead = parseCallEvent(call());
    expect(lead?.consentSource).toBe("inbound_call");
  });

  it("keeps IVR selection and recording for the agent", () => {
    const lead = parseCallEvent(call({ ivrSelection: "2", recordingUrl: "https://rec/1", durationSeconds: 42 }));
    expect(lead?.unmappedFields).toMatchObject({
      ivr_selection: "2",
      recording_url: "https://rec/1",
      call_duration_seconds: "42",
    });
  });

  it("ignores a call from an unusable number", () => {
    expect(parseCallEvent(call({ from: "anonymous" }))).toBeNull();
  });
});

describe("manual entry", () => {
  it("captures a walk-in so the dashboard total is not a lie", () => {
    const r = parseManualEntry({
      entryId: "walk-1",
      enteredByAgentId: "agent-7",
      fullName: "Sunita Rao",
      phone: "98765 43210",
      notes: "Came to the site office, liked tower B",
      fields: { budget: "80 lakh", configuration: "2 BHK" },
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.source).toBe("walkin");
    expect(r.lead.qualification).toMatchObject({ budgetMax: 8_000_000, configuration: "2bhk" });
    expect(r.lead.unmappedFields["agent_notes"]).toContain("tower B");
    expect(r.lead.unmappedFields["entered_by"]).toBe("agent-7");
  });

  it("keeps a referral as its own source, never buried in walk-ins", () => {
    // Referrals convert best. Lumping them in hides the cheapest channel.
    const r = parseManualEntry({
      entryId: "ref-1",
      enteredByAgentId: "agent-7",
      phone: "9876543210",
      referralCode: "RAHU-7X2K",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.source).toBe("referral");
    expect(r.lead.sourceCampaign).toBe("referral:RAHU-7X2K");
    expect(r.lead.consentSource).toBe("referral_introduction");
  });

  it("refuses an entry with an unusable phone, since an agent can retype it", () => {
    expect(parseManualEntry({ entryId: "w2", enteredByAgentId: "a", phone: "123" })).toMatchObject({
      ok: false,
      reason: "invalid_phone",
    });
  });
});
