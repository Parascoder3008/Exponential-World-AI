import { describe, expect, it } from "vitest";
import {
  mapFormFields,
  matchField,
  parseConfiguration,
  parseFunding,
  parseIndianBudget,
  parsePurpose,
  parseTimeline,
  parseYesNoMaybe,
} from "../../src/ingest/fieldmap.js";

describe("matchField", () => {
  it("matches the same question however the form builder worded it", () => {
    for (const n of ["budget", "Budget Range", "what_is_your_budget?", "Aapka budget kya hai"]) {
      expect(matchField(n), n).toBe("budget");
    }
    for (const n of ["phone_number", "Mobile Number", "WhatsApp Number", "contact number"]) {
      expect(matchField(n), n).toBe("phone");
    }
    for (const n of ["preferred_location", "Locality", "Preferred Area"]) {
      expect(matchField(n), n).toBe("preferred_areas");
    }
  });

  it("does not let a short token swallow unrelated questions", () => {
    expect(matchField("How did you hear about us?")).toBeNull();
    expect(matchField("Do you own a car?")).toBeNull();
  });

  it("returns null for empty or junk names", () => {
    expect(matchField("")).toBeNull();
    expect(matchField("   ")).toBeNull();
  });
});

describe("parseIndianBudget", () => {
  it("parses the formats Indian forms actually use", () => {
    expect(parseIndianBudget("50L")).toEqual({ min: 5_000_000, max: 5_000_000 });
    expect(parseIndianBudget("₹50 Lakh")).toEqual({ min: 5_000_000, max: 5_000_000 });
    expect(parseIndianBudget("1.2 Cr")).toEqual({ min: 12_000_000, max: 12_000_000 });
    expect(parseIndianBudget("Rs 75 lakhs")).toEqual({ min: 7_500_000, max: 7_500_000 });
    expect(parseIndianBudget("50,00,000")).toEqual({ min: 5_000_000, max: 5_000_000 });
  });

  it("applies a trailing unit across a range", () => {
    expect(parseIndianBudget("50-75 lakh")).toEqual({ min: 5_000_000, max: 7_500_000 });
    expect(parseIndianBudget("1 - 2 Cr")).toEqual({ min: 10_000_000, max: 20_000_000 });
  });

  it("handles open-ended budgets in both directions", () => {
    expect(parseIndianBudget("Under 50 lakh")).toEqual({ max: 5_000_000 });
    expect(parseIndianBudget("Below 1 Cr")).toEqual({ max: 10_000_000 });
    expect(parseIndianBudget("2 Cr+")).toEqual({ min: 20_000_000 });
    expect(parseIndianBudget("Above 80 lakhs")).toEqual({ min: 8_000_000 });
  });

  it("reads a bare small number as lakh, a large one as rupees", () => {
    // A dropdown option reading "50" in a property form means fifty lakh.
    expect(parseIndianBudget("50")).toEqual({ min: 5_000_000, max: 5_000_000 });
    expect(parseIndianBudget("5000000")).toEqual({ min: 5_000_000, max: 5_000_000 });
  });

  it("returns null rather than guessing at unparseable answers", () => {
    expect(parseIndianBudget("will discuss on call")).toBeNull();
    expect(parseIndianBudget("")).toBeNull();
    expect(parseIndianBudget("negotiable")).toBeNull();
  });
});

describe("enumerated answers", () => {
  it("parses configuration across wordings", () => {
    expect(parseConfiguration("2 BHK")).toBe("2bhk");
    expect(parseConfiguration("3BHK")).toBe("3bhk");
    expect(parseConfiguration("4 BHK / Penthouse")).toBe("4bhk_plus");
    expect(parseConfiguration("Plot")).toBe("plot");
    expect(parseConfiguration("Commercial Office")).toBe("commercial");
    expect(parseConfiguration("Two BHK")).toBe("2bhk");
    expect(parseConfiguration("anything nice")).toBeNull();
  });

  it("parses timeline buckets", () => {
    expect(parseTimeline("Immediately")).toBe("immediate");
    // "Within 3 months" means inside the next three, not the 3-6 bucket.
    expect(parseTimeline("Within 3 months")).toBe("1_3_months");
    expect(parseTimeline("1-3 months")).toBe("1_3_months");
    expect(parseTimeline("Within 6 months")).toBe("3_6_months");
    expect(parseTimeline("6+ months")).toBe("6_plus_months");
  });

  it("treats vague phrasing as unclear, not as a long timeline", () => {
    // Deliberate: "just exploring" is not a stated timeline, and people who
    // write it still book site visits. Unclear scores above an explicit 6+.
    expect(parseTimeline("Just exploring")).toBe("unclear");
    expect(parseTimeline("not sure yet")).toBe("unclear");
  });

  it("parses purpose, funding and yes/no/maybe", () => {
    expect(parsePurpose("Investment")).toBe("investment");
    expect(parsePurpose("For my family to live")).toBe("end_use");
    expect(parseFunding("Home loan required")).toBe("loan_needed");
    expect(parseFunding("Loan pre-approved")).toBe("loan_approved");
    expect(parseFunding("Self funded")).toBe("self");
    expect(parseYesNoMaybe("Yes")).toBe(true);
    expect(parseYesNoMaybe("Haan")).toBe(true);
    expect(parseYesNoMaybe("Maybe")).toBe("maybe");
    expect(parseYesNoMaybe("No")).toBe(false);
    expect(parseYesNoMaybe("hmm")).toBeNull();
  });
});

describe("mapFormFields", () => {
  it("maps a realistic Indian lead form end to end", () => {
    const r = mapFormFields([
      { name: "full_name", values: ["Rahul Sharma"] },
      { name: "phone_number", values: ["+91 98765 43210"] },
      { name: "email", values: ["rahul@example.com"] },
      { name: "city", values: ["Pune"] },
      { name: "What is your budget?", values: ["75 lakh - 1 Cr"] },
      { name: "Configuration", values: ["3 BHK"] },
      { name: "Preferred Location", values: ["Wakad, Hinjewadi"] },
      { name: "When are you planning to buy?", values: ["1-3 months"] },
      { name: "Home loan required?", values: ["Yes, loan required"] },
      { name: "Buying for", values: ["End use"] },
      { name: "Would you like a site visit?", values: ["Yes"] },
    ]);

    expect(r.fullName).toBe("Rahul Sharma");
    expect(r.phoneRaw).toBe("+91 98765 43210");
    expect(r.email).toBe("rahul@example.com");
    expect(r.city).toBe("Pune");
    expect(r.qualification).toMatchObject({
      budgetMin: 7_500_000,
      budgetMax: 10_000_000,
      configuration: "3bhk",
      preferredAreas: ["Wakad", "Hinjewadi"],
      timeline: "1_3_months",
      funding: "loan_needed",
      purpose: "end_use",
      siteVisitReady: true,
    });
    expect(r.unmappedFields).toEqual({});
  });

  it("matches long natural-language question wordings, not just short keys", () => {
    // Regression: "When are you planning to buy?" once fell through to
    // unmappedFields, silently costing the lead its timeline — the heaviest
    // single scoring factor. Long conversational wording is the norm on real
    // forms, so containment matching has to reach it.
    expect(matchField("When are you planning to buy?")).toBe("timeline");
    expect(matchField("How soon are you looking to buy?")).toBe("timeline");
    expect(matchField("Would you like to schedule a site visit?")).toBe("site_visit");
    expect(matchField("What is your budget range?")).toBe("budget");
    expect(matchField("Is a home loan required?")).toBe("funding");
  });

  it("never silently drops a question it does not recognise", () => {
    const r = mapFormFields([
      { name: "Which floor do you prefer?", values: ["Higher floor"] },
      { name: "Do you need car parking?", values: ["2 covered"] },
    ]);
    expect(r.unmappedFields).toEqual({
      "Which floor do you prefer?": "Higher floor",
      "Do you need car parking?": "2 covered",
    });
  });

  it("keeps a recognised question whose answer it cannot read", () => {
    const r = mapFormFields([{ name: "budget", values: ["will discuss on call"] }]);
    expect(r.qualification.budgetMax).toBeUndefined();
    // The agent still gets to see what the buyer actually wrote.
    expect(r.unmappedFields["budget"]).toBe("will discuss on call");
  });

  it("joins multi-select answers and splits area lists", () => {
    const r = mapFormFields([
      { name: "preferred_area", values: ["Baner", "Balewadi"] },
      { name: "configuration", values: ["2 BHK"] },
    ]);
    expect(r.qualification.preferredAreas).toEqual(["Baner", "Balewadi"]);
  });

  it("ignores empty answers rather than storing blanks", () => {
    const r = mapFormFields([
      { name: "city", values: [""] },
      { name: "email", values: [] },
    ]);
    expect(r.city).toBeUndefined();
    expect(r.email).toBeUndefined();
    expect(r.unmappedFields).toEqual({});
  });
});

describe("timeline regression cases", () => {
  it("parses every '6 months or more' wording a dropdown might use", () => {
    // Regression: "6+ months" returned null because the pattern ended in \b
    // right after a "+", where a word boundary can never match. A null
    // timeline scores as 'unclear' (8 pts) instead of '6_plus' (5), which
    // quietly inflates the tier of the least urgent buyers on the list.
    for (const s of ["6+ months", "6 months+", "More than 6 months", "Next year", "Long term"]) {
      expect(parseTimeline(s), s).toBe("6_plus_months");
    }
  });
});
