import { describe, expect, it } from "vitest";
import { DEDUPE_WINDOW_DAYS, decideDedupe, type ExistingLead } from "../src/domain/dedupe.js";

const now = new Date("2026-06-01T10:00:00Z");
const daysAgo = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);

const lead = (over: Partial<ExistingLead> = {}): ExistingLead => ({
  id: "lead-1",
  phoneE164: "+919876543210",
  createdAt: daysAgo(10),
  lastActivityAt: daysAgo(10),
  state: "engaged",
  doNotContact: false,
  ...over,
});

describe("decideDedupe", () => {
  it("attaches a repeat enquiry inside the window to the live lead", () => {
    expect(decideDedupe("+919876543210", [lead()], now)).toEqual({
      action: "attach_to_existing",
      leadId: "lead-1",
      reason: "within_window",
    });
  });

  it("creates a fresh lead after the window but keeps the history linked", () => {
    const old = lead({ lastActivityAt: daysAgo(DEDUPE_WINDOW_DAYS + 1) });
    expect(decideDedupe("+919876543210", [old], now)).toEqual({
      action: "create_new",
      linkedTo: "lead-1",
    });
  });

  it("treats the window boundary as still the same lead", () => {
    const edge = lead({ lastActivityAt: daysAgo(DEDUPE_WINDOW_DAYS) });
    expect(decideDedupe("+919876543210", [edge], now).action).toBe("attach_to_existing");
  });

  it("suppresses anything for a do-not-contact buyer", () => {
    expect(decideDedupe("+919876543210", [lead({ doNotContact: true })], now)).toEqual({
      action: "suppress",
      leadId: "lead-1",
      reason: "do_not_contact",
    });
    expect(decideDedupe("+919876543210", [lead({ state: "dnc" })], now).action).toBe("suppress");
  });

  it("keeps DNC sticky even when the opt-out is years old", () => {
    const ancient = lead({ doNotContact: true, lastActivityAt: daysAgo(900) });
    expect(decideDedupe("+919876543210", [ancient], now).action).toBe("suppress");
  });

  it("matches against the most recent record when a number has history", () => {
    const stale = lead({ id: "old", lastActivityAt: daysAgo(400) });
    const fresh = lead({ id: "new", lastActivityAt: daysAgo(2) });
    expect(decideDedupe("+919876543210", [stale, fresh], now)).toMatchObject({
      action: "attach_to_existing",
      leadId: "new",
    });
  });

  it("creates a new lead when the number is unknown or unusable", () => {
    expect(decideDedupe("+918888888888", [lead()], now)).toEqual({
      action: "create_new",
      linkedTo: null,
    });
    // Normalisation failed upstream — still store the lead, just skip dedupe.
    expect(decideDedupe(null, [lead()], now)).toEqual({ action: "create_new", linkedTo: null });
  });
});
