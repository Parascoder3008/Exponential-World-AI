# Visa Revenue Dashboard — Project Overview

**Prepared for:** Client Review  
**Date:** June 23, 2026  
**Version:** 1.0 (MVP)  
**Live Dashboard:** [https://parascoder3008.github.io/Exponential-World-AI/](https://parascoder3008.github.io/Exponential-World-AI/)

---

## 1. Executive Summary

The Visa Revenue Dashboard is a web-based analytics tool designed for immigration services companies operating multiple visa processing centers. It provides real-time visibility into revenue streams, cost breakdowns, and profitability across all centers — enabling data-driven decision-making for business owners and operations managers.

The MVP is live and accessible via the link above. It currently runs on **demo data** across 5 processing centers and is ready for integration with real invoice data from your visa center software.

---

## 2. Business Problem

Immigration services companies collect fees from multiple sources per application — embassy fees, service charges, GST, insurance, and ancillary services. Without a unified dashboard:

- Revenue from **pass-through fees** (embassy/NDC fees, GST) gets mixed with **actual earnings**
- Per-center profitability is unclear
- P&L reporting requires manual spreadsheet work
- Scaling to new centers multiplies the reporting burden

This dashboard solves all of the above with automated bifurcation and real-time analytics.

---

## 3. Revenue Bifurcation Model

Every invoice is broken down into the following components:

| Component | Description | Retained as Profit? |
|-----------|-------------|:-------------------:|
| **Embassy / NDC Fee** | Government fees passed through to the embassy | No |
| **Service Charge** | Company's processing fee per application | Yes |
| **GST (18%)** | Tax collected on service charge, remitted to government | No |
| **Insurance** | Travel/medical insurance premium | Yes |
| **Documentation** | Document preparation, attestation, translation fees | Yes |
| **Photography** | Passport/visa photo services | Yes |
| **Courier** | Document delivery and return shipping | Yes |

### Profit Calculation

```
Total Collections = Embassy Fee + Service Charge + GST + Insurance + Documentation + Photography + Courier

Pass-Through Costs = Embassy Fee + GST

Net Profit = Service Charge + Insurance + Documentation + Photography + Courier
           = Total Collections - Pass-Through Costs
```

This ensures the dashboard clearly separates **what the business earns** from **what it collects on behalf of others**.

---

## 4. Dashboard Features (MVP)

### 4.1 Dashboard Tab — At-a-Glance Analytics

- **6 Summary Cards** showing Total Collections, Embassy/NDC Fees, Service Charges, GST Collected, Insurance Revenue, and Net Profit
- **Per-Center Breakdown** — Individual cards for each processing center showing collections, profit, application count, and profit margin percentage with visual bar
- **Monthly Revenue Trend** — Bar chart comparing Embassy Fees vs Profit over time
- **Country-wise Revenue** — Donut chart showing revenue distribution by destination country (USA, UK, Canada, Australia, Europe/Schengen)
- **P&L Statement** — Structured profit & loss table: Total Collections → minus Embassy Fees → Gross Income → Revenue line items → Net Profit

### 4.2 Invoices Tab — Transaction-Level Detail

- **Full Invoice Table** with columns: Invoice ID, Date, Center, Applicant Name, Visa Type, Country, Embassy Fee, Service Charge, GST, Insurance, Other Charges, Total
- **Search** by applicant name or invoice ID
- **Pagination** (15 records per page)
- **CSV Export** button (placeholder for production integration)

### 4.3 NDC Fee Configuration Tab — Admin Control

- **Editable Fee Table** listing embassy/NDC fees per visa type and country
- Covers Tourist, Business, and Student visas for USA, UK, Canada, Australia, and Europe (Schengen)
- **Add / Remove** visa type entries
- **Save Configuration** to apply updated fee structures
- This allows the admin to keep embassy fee data current as governments change their fee schedules

### 4.4 Filtering & Date Ranges

- **Date Range Picker** — Custom start and end dates
- **Quick Presets** — This Month, Last Month, Last 3 Months, Year-to-Date
- **Center Filter** — View all centers or drill down to a specific center
- All charts, cards, tables, and P&L update in real-time based on filters

---

## 5. Processing Centers (Demo Data)

The MVP includes demo data for 5 centers. The system is designed to scale when new centers are added.

| Center | Location |
|--------|----------|
| Delhi Visa Center | New Delhi |
| Mumbai Visa Center | Mumbai |
| Bangalore Visa Center | Bangalore |
| Chennai Visa Center | Chennai |
| Kolkata Visa Center | Kolkata |

**Demo data period:** January 2026 — June 2026  
**Approximate invoice volume:** ~1,800 invoices  
**Currencies:** All amounts in INR (Indian Rupees)  
**Formatting:** Lakhs (L) and Crores (Cr) notation

---

## 6. Visa Types & Countries Covered

| Country | Visa Types |
|---------|------------|
| USA | Tourist (B1/B2), Business (B1), Student (F1) |
| UK | Tourist (Standard), Business (Standard), Student (Tier 4) |
| Canada | Tourist (TRV), Business (TRV), Student (Study Permit) |
| Australia | Tourist (600), Business (600), Student (500) |
| Europe (Schengen) | Tourist (Short-stay), Business (Short-stay), Student (National) |

---

## 7. Technical Architecture

| Layer | Technology |
|-------|------------|
| Frontend Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| Hosting | GitHub Pages (auto-deploy on push) |
| CI/CD | GitHub Actions |

The application is a **single-page application (SPA)** that runs entirely in the browser. The current MVP uses generated demo data — production integration will connect to your visa center software's database or API.

---

## 8. Deployment & Access

- **Live URL:** [https://parascoder3008.github.io/Exponential-World-AI/](https://parascoder3008.github.io/Exponential-World-AI/)
- **Auto-deploy:** Every push to the `main` branch triggers an automatic build and deployment via GitHub Actions
- **Source Code:** [https://github.com/Parascoder3008/Exponential-World-AI](https://github.com/Parascoder3008/Exponential-World-AI)
- **No login required** for the MVP demo

---

## 9. Suggested Enhancements (Post-MVP Roadmap)

The following enhancements are recommended for production readiness. These can be prioritized based on business needs:

### High Priority
| # | Enhancement | Description |
|---|-------------|-------------|
| 1 | **Real Data Integration** | Connect to your visa center software via API or database to ingest actual invoice data instead of demo data |
| 2 | **User Authentication** | Login system with role-based access (Admin, Center Manager, Viewer) |
| 3 | **Backend & Database** | Server-side API (Node.js/Express or similar) with PostgreSQL/MongoDB for persistent data storage |
| 4 | **CSV/Excel Import** | Upload invoice data via spreadsheet files for centers not yet API-integrated |

### Medium Priority
| # | Enhancement | Description |
|---|-------------|-------------|
| 5 | **PDF Report Export** | Download P&L statements and summaries as formatted PDF reports |
| 6 | **Multi-Currency Support** | Handle invoices in USD, GBP, EUR, AUD alongside INR with exchange rate management |
| 7 | **Alerts & Notifications** | Email/SMS alerts for revenue milestones, unusual patterns, or threshold breaches |
| 8 | **Applicant Tracking** | Link invoices to applicant profiles with visa status tracking (Applied, In Process, Approved, Rejected) |

### Future Scope
| # | Enhancement | Description |
|---|-------------|-------------|
| 9 | **Mobile App** | Native or PWA mobile dashboard for on-the-go access |
| 10 | **Multi-branch Comparison** | Side-by-side performance comparison between centers |
| 11 | **Forecasting** | Revenue projections based on historical trends and seasonal patterns |
| 12 | **Expense Tracking** | Track center operating expenses (rent, salaries, utilities) for true net profit calculation |
| 13 | **Audit Trail** | Log all configuration changes and data modifications for compliance |
| 14 | **Custom Dashboard** | Drag-and-drop widget layout so each user can personalize their view |

---

## 10. How to Request Changes

To update or enhance the dashboard:

1. **Feature requests** — Describe the new feature or change needed
2. **Data changes** — Provide updated fee schedules, new center details, or new visa types to add
3. **Bug reports** — Share a screenshot and steps to reproduce

All changes will be implemented, tested, and auto-deployed to the live URL.

---

## 11. Glossary

| Term | Definition |
|------|------------|
| **NDC Fee** | National Data Center fee — a government-mandated fee collected per visa application |
| **Embassy Fee** | Fees charged by the embassy/consulate for visa processing |
| **Service Charge** | The company's own fee for providing visa processing services |
| **GST** | Goods and Services Tax — 18% applied on service charges in India |
| **P&L** | Profit and Loss statement |
| **SPA** | Single Page Application — a web app that loads once and updates dynamically |
| **MVP** | Minimum Viable Product — the first functional version with core features |

---

*This document will be updated as the project evolves. Last updated: June 23, 2026.*
