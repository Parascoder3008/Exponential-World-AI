/**
 * Core domain types.
 *
 * These mirror `db/migrations/0001_init.sql`. If you change one, change both.
 * Nothing in this package talks to a database — that is deliberate. The domain
 * core must be testable in milliseconds with no infrastructure.
 */

export type LeadSource =
  | "meta_lead_ad"
  | "instagram_dm"
  | "google_ads"
  | "linkedin_ads"
  | "website"
  | "99acres"
  | "magicbricks"
  | "housing"
  | "missed_call"
  | "walkin"
  | "referral";

export type Configuration =
  | "studio"
  | "1bhk"
  | "2bhk"
  | "3bhk"
  | "4bhk_plus"
  | "villa"
  | "plot"
  | "commercial";

export type Purpose = "end_use" | "investment" | "unclear";

export type Timeline =
  | "immediate"
  | "1_3_months"
  | "3_6_months"
  | "6_plus_months"
  | "unclear";

export type Funding = "self" | "loan_needed" | "loan_approved" | "unclear";

export type Tier = "hot" | "warm" | "cold" | "disqualified";

/**
 * Qualification answers. Every field is optional: a lead is a partially
 * filled form for most of its life, and the system must behave sanely at
 * every level of completeness.
 */
export interface Qualification {
  budgetMin?: number;
  budgetMax?: number;
  configuration?: Configuration;
  preferredAreas?: string[];
  purpose?: Purpose;
  timeline?: Timeline;
  funding?: Funding;
  siteVisitReady?: boolean | "maybe";
  /** Minutes between first outbound contact and the lead's first reply. */
  minutesToFirstReply?: number;
}

/** Price band of the inventory the broker actually sells. Used for budget fit. */
export interface InventoryBand {
  priceMin: number;
  priceMax: number;
}
