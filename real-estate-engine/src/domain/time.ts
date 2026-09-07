/**
 * IST time helpers.
 *
 * Every scheduling rule in this system is expressed in Indian Standard Time
 * wall-clock terms — contact windows, agent shifts, visit reminders, site
 * hours. All of it is computed from a fixed +05:30 offset rather than a
 * timezone database.
 *
 * That is a deliberate simplification, and it is safe here for one specific
 * reason: India has a single timezone and observes no daylight saving. It
 * would be wrong for almost any other market, so if this engine is ever
 * pointed at one, THIS is the file to replace — and every consumer already
 * goes through it rather than doing its own arithmetic.
 */

export const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/**
 * Shift an instant into "IST wall clock", readable with the getUTC* family.
 *
 * The returned Date is NOT a real instant — it is a arithmetic convenience.
 * Always convert back with `fromIstShift` before storing or comparing.
 */
export function istShift(at: Date): Date {
  return new Date(at.getTime() + IST_OFFSET_MS);
}

/** Inverse of `istShift`. */
export function fromIstShift(shifted: Date): Date {
  return new Date(shifted.getTime() - IST_OFFSET_MS);
}

/** IST wall-clock hour (0-23) and weekday (0 = Sunday) for an instant. */
export function istClock(at: Date): { hour: number; day: number } {
  const s = istShift(at);
  return { hour: s.getUTCHours(), day: s.getUTCDay() };
}
