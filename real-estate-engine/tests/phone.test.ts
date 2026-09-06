import { describe, expect, it } from "vitest";
import { normalisePhone, phoneKey } from "../src/domain/phone.js";

describe("normalisePhone", () => {
  it("normalises every mangling of the same Indian number to one key", () => {
    const variants = [
      "9876543210",
      "09876543210",
      "919876543210",
      "+919876543210",
      "+91 98765 43210",
      "+91-98765-43210",
      "0091 9876543210",
      "  +91 0 9876543210  ",
      "(+91) 9876543210",
    ];
    const keys = new Set(variants.map((v) => phoneKey(v)));
    expect(keys).toEqual(new Set(["+919876543210"]));
  });

  it("accepts all valid Indian mobile prefixes", () => {
    for (const first of ["6", "7", "8", "9"]) {
      const r = normalisePhone(`${first}123456789`);
      expect(r.ok, `prefix ${first}`).toBe(true);
    }
  });

  it("rejects landline-shaped and invalid-prefix 10-digit numbers", () => {
    for (const bad of ["1234567890", "0123456789", "5123456789"]) {
      const r = normalisePhone(bad);
      expect(r.ok, bad).toBe(false);
      if (!r.ok) expect(r.reason).toBe("not_a_mobile");
    }
  });

  it("passes through foreign numbers instead of dropping NRI buyers", () => {
    const r = normalisePhone("+971 50 123 4567");
    expect(r).toEqual({ ok: true, e164: "+971501234567", country: "other" });
  });

  it("does not eat a leading zero out of a foreign number", () => {
    // 12 digits, not starting 91 -> passed through intact
    const r = normalisePhone("+442071234567");
    expect(r.ok && r.e164).toBe("+442071234567");
  });

  it("rejects empty, junk and out-of-range input", () => {
    expect(normalisePhone("").ok).toBe(false);
    expect(normalisePhone(null).ok).toBe(false);
    expect(normalisePhone(undefined).ok).toBe(false);
    expect(normalisePhone("not a phone").ok).toBe(false);
    expect(normalisePhone("12345").ok).toBe(false);
    expect(normalisePhone("1234567890123456789").ok).toBe(false);
  });

  it("returns null key for unusable numbers so they skip dedupe", () => {
    expect(phoneKey("garbage")).toBeNull();
    expect(phoneKey("+919876543210")).toBe("+919876543210");
  });
});
