import { describe, expect, it } from "vitest";
import {
  extractLabelledFields,
  findLooseIndianMobile,
  identifyPortal,
  parsePortalEmail,
  type InboundEmail,
} from "../../src/ingest/portals.js";

const email = (over: Partial<InboundEmail> = {}): InboundEmail => ({
  messageId: "<msg-1@portal>",
  from: "noreply@99acres.com",
  subject: "New response from 99acres",
  text: "",
  receivedAt: new Date("2026-06-01T10:00:00Z"),
  ...over,
});

// Colon-delimited, the most common layout.
const NINETYNINE = `
Dear Advertiser,

You have received a new response for your property.

Name: Rahul Sharma
Phone: +91 98765 43210
Email: rahul.sharma@example.com
City: Pune
Budget: 75 Lakh - 1 Cr
Property Type: 3 BHK
Locality: Wakad, Baner
Possession: Within 6 months
Message: Please call me after 6 PM

Regards,
99acres Team
Contact 99acres support: 1800-41-99099
`;

// Table cells flattened to whitespace-separated columns.
const MAGICBRICKS = `
MagicBricks Lead Notification

Name          Priya Nair
Mobile        9876543211
Email         priya@example.com
Budget        50-75 lakhs
Looking for   2 BHK
Preferred Location   Hinjewadi
Home Loan     Yes, loan required
`;

// Label and value on separate lines.
const HOUSING = `
New enquiry from Housing.com

Name
Amit Desai

Contact Number
09876543212

Budget
Under 80 lakh

Locality
Kharadi
`;

describe("identifyPortal", () => {
  it("identifies by sender domain", () => {
    expect(identifyPortal(email({ from: "alerts@magicbricks.com" }))).toBe("magicbricks");
    expect(identifyPortal(email({ from: "no-reply@housing.com" }))).toBe("housing");
  });

  it("still identifies a FORWARDED email, which is how brokers actually route these", () => {
    // Most brokers forward from their own inbox rather than changing the
    // portal's notification address, so From is rewritten and useless.
    expect(
      identifyPortal(
        email({ from: "broker@theirfirm.com", subject: "Fwd: MagicBricks lead", text: "" }),
      ),
    ).toBe("magicbricks");
  });

  it("returns null for unrelated mail so it can be quarantined, not misparsed", () => {
    expect(identifyPortal(email({ from: "spam@elsewhere.com", subject: "Invoice", text: "" }))).toBeNull();
  });
});

describe("extractLabelledFields", () => {
  it("handles colon-delimited layouts", () => {
    const fields = extractLabelledFields(NINETYNINE);
    const byName = Object.fromEntries(fields.map((f) => [f.name, f.values[0]]));
    expect(byName["full_name"]).toBe("Rahul Sharma");
    expect(byName["phone"]).toBe("+91 98765 43210");
    expect(byName["budget"]).toBe("75 Lakh - 1 Cr");
  });

  it("handles whitespace-column layouts from flattened tables", () => {
    const byName = Object.fromEntries(
      extractLabelledFields(MAGICBRICKS).map((f) => [f.name, f.values[0]]),
    );
    expect(byName["full_name"]).toBe("Priya Nair");
    expect(byName["phone"]).toBe("9876543211");
    expect(byName["budget"]).toBe("50-75 lakhs");
  });

  it("handles label-on-its-own-line layouts", () => {
    const byName = Object.fromEntries(
      extractLabelledFields(HOUSING).map((f) => [f.name, f.values[0]]),
    );
    expect(byName["full_name"]).toBe("Amit Desai");
    expect(byName["phone"]).toBe("09876543212");
  });

  it("does not let a footer overwrite the buyer's own details", () => {
    // "Contact 99acres support: 1800-41-99099" appears AFTER the real phone.
    // First occurrence wins, or every lead gets the support desk's number.
    const byName = Object.fromEntries(
      extractLabelledFields(NINETYNINE).map((f) => [f.name, f.values[0]]),
    );
    expect(byName["phone"]).toBe("+91 98765 43210");
  });

  it("ignores placeholder values", () => {
    const fields = extractLabelledFields("Name: -\nEmail: N/A\nPhone: 9876543210");
    const names = fields.map((f) => f.name);
    expect(names).toContain("phone");
    expect(names).not.toContain("full_name");
    expect(names).not.toContain("email");
  });
});

describe("findLooseIndianMobile", () => {
  it("recovers a phone number from unlabelled text", () => {
    expect(findLooseIndianMobile("Call the customer on 9876543210 today")).toBe("9876543210");
  });

  it("does not mistake an order or reference number for a mobile", () => {
    // Full E.164 validation still applies, so a 10-digit number starting with
    // 1-5 can never masquerade as an Indian mobile.
    expect(findLooseIndianMobile("Reference 1234567890 dated 01/06")).toBeNull();
  });
});

describe("parsePortalEmail", () => {
  it("parses a 99acres email end to end", () => {
    const r = parsePortalEmail(email({ text: NINETYNINE }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.source).toBe("99acres");
    expect(r.lead.sourceEventId).toBe("<msg-1@portal>");
    expect(r.lead.phoneE164).toBe("+919876543210");
    expect(r.lead.qualification).toMatchObject({
      budgetMin: 7_500_000,
      budgetMax: 10_000_000,
      configuration: "3bhk",
      preferredAreas: ["Wakad", "Baner"],
      timeline: "3_6_months",
    });
    expect(r.lead.consentSource).toBe("99acres_portal_enquiry");
  });

  it("parses a MagicBricks table layout end to end", () => {
    const r = parsePortalEmail(email({ from: "alerts@magicbricks.com", text: MAGICBRICKS }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.phoneE164).toBe("+919876543211");
    expect(r.lead.qualification).toMatchObject({
      budgetMin: 5_000_000,
      budgetMax: 7_500_000,
      configuration: "2bhk",
      funding: "loan_needed",
    });
  });

  it("parses a Housing split-line layout end to end", () => {
    const r = parsePortalEmail(email({ from: "no-reply@housing.com", text: HOUSING }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.phoneE164).toBe("+919876543212");
    expect(r.lead.qualification.budgetMax).toBe(8_000_000);
  });

  it("recovers a lead whose phone label the portal renamed", () => {
    const r = parsePortalEmail(
      email({ text: "Someone enquired.\nTheir digits are 9876543299 - call soon." }),
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.phoneE164).toBe("+919876543299");
  });

  it("reports a structured failure instead of throwing on unusable mail", () => {
    // Quarantine, never drop, never crash the poller mid-batch.
    expect(parsePortalEmail(email({ from: "x@spam.com", subject: "hi", text: "hi" }))).toMatchObject({
      ok: false,
      reason: "not_a_portal_email",
    });
    expect(parsePortalEmail(email({ text: "No contact details at all here." }))).toMatchObject({
      ok: false,
      reason: "no_identity",
    });
  });

  it("survives a template redesign that reorders every field", () => {
    // Label-driven, not layout-driven: portals redesign without warning, and
    // a position-based parser breaks silently at 2am.
    const scrambled = `
Locality: Wakad
Budget: 1 Cr
Phone: 9876543210
Name: Reordered Buyer
`;
    const r = parsePortalEmail(email({ text: scrambled }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.fullName).toBe("Reordered Buyer");
    expect(r.lead.qualification.budgetMax).toBe(10_000_000);
  });
});
