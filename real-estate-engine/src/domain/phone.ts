/**
 * Phone normalisation — the identity layer.
 *
 * Every lead source hands you a differently-mangled phone number. Meta gives
 * "+91XXXXXXXXXX", portals give "0XXXXXXXXXX", a walk-in form gives
 * "98765 43210", and an agent typing from memory gives "+91 0 9876543210".
 * All five are one buyer. Get this wrong and two agents call the same person,
 * which is the most visible way this system can embarrass a broker.
 *
 * Normalise FIRST, before dedupe, before scoring, before anything.
 */

export type PhoneResult =
  | { ok: true; e164: string; country: "IN" | "other" }
  | { ok: false; reason: PhoneRejection; input: string };

export type PhoneRejection =
  | "empty"
  | "too_short"
  | "too_long"
  | "not_a_mobile"
  | "unparseable";

/** Indian mobile numbers are 10 digits and begin 6, 7, 8 or 9. */
const IN_MOBILE = /^[6-9]\d{9}$/;

/**
 * Normalise a raw phone string to E.164.
 *
 * Defaults to India. A number that already carries a non-91 country code is
 * passed through with light validation rather than rejected — NRI buyers are
 * a real and high-value segment in Indian real estate, and silently dropping
 * a +971 number would be an expensive bug.
 */
export function normalisePhone(raw: string | null | undefined): PhoneResult {
  const input = (raw ?? "").trim();
  if (!input) return { ok: false, reason: "empty", input };

  const hadPlus = input.startsWith("+");
  let digits = input.replace(/\D/g, "");
  if (!digits) return { ok: false, reason: "unparseable", input };

  // "00" is the international access prefix: 00919876543210 -> 919876543210
  if (!hadPlus && digits.startsWith("00")) digits = digits.slice(2);

  // Strip the Indian trunk prefix, but only when it leaves a plausible number.
  // "09876543210" -> "9876543210". Guarded by length so we never eat a leading
  // zero out of a foreign number.
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);

  // "+91 0 9876543210" — some CRMs concatenate country code AND trunk prefix.
  if (digits.length === 13 && digits.startsWith("910")) {
    digits = "91" + digits.slice(3);
  }

  // Bare 10-digit number: assume India.
  if (digits.length === 10) {
    return IN_MOBILE.test(digits)
      ? { ok: true, e164: `+91${digits}`, country: "IN" }
      : { ok: false, reason: "not_a_mobile", input };
  }

  // India with country code.
  if (digits.length === 12 && digits.startsWith("91")) {
    const local = digits.slice(2);
    return IN_MOBILE.test(local)
      ? { ok: true, e164: `+91${local}`, country: "IN" }
      : { ok: false, reason: "not_a_mobile", input };
  }

  if (digits.length < 8) return { ok: false, reason: "too_short", input };
  if (digits.length > 15) return { ok: false, reason: "too_long", input };

  // Foreign number. We do not own a full country-code table here; we accept it
  // as E.164-shaped and let the messaging provider be the final judge.
  return { ok: true, e164: `+${digits}`, country: "other" };
}

/**
 * The dedupe key. Callers should store this on the lead and index it.
 * Returns null for numbers that failed normalisation — those leads still get
 * stored (never drop a payload) but they cannot participate in dedupe.
 */
export function phoneKey(raw: string | null | undefined): string | null {
  const r = normalisePhone(raw);
  return r.ok ? r.e164 : null;
}
