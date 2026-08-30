---
title: "Claude MCP for Ad Reporting: The Beginner's Guide"
page_id: 35592e2e92e981019a8af8e67169cd67
layer: skills
source: https://freebie-for-you.notion.site/35592e2e92e981019a8af8e67169cd67
---
## 🎯 What This Gives You
Claude reading your live Meta Ads and Google Ads data in plain English.
No exports. No dashboards. No Sheets formulas.
You ask: "What's my best-performing ad set this week?"
Claude pulls live data and answers in 30 seconds.
This is what MCP makes possible.
Setup takes under 10 minutes. Zero coding. Works in Claude Chat, Claude Cowork, and Claude Code.
By the end of this guide, you'll have a live connection running, 22+ prompts you can paste today, a daily and weekly cadence to follow, and the troubleshooting fixes for every common error.
---
## ⚙️ What MCP Actually Is
MCP stands for Model Context Protocol.
It's a secure bridge between Claude and external tools — in this case, your Meta Ads Manager and Google Ads accounts.
When you connect an ad platform via MCP, Claude can:
→ Read live campaign performance<br>→ Pull ad set, ad, and creative-level data<br>→ Compare time periods<br>→ Calculate metrics (ROAS, CPA, CTR, hook rate, hold rate)<br>→ Generate reports, summaries, and decision recommendations
What it doesn't do:
→ Modify your campaigns without your explicit approval<br>→ Spend any of your money<br>→ Share your data outside the secure MCP connection
This is read-only intelligence. You stay in control of every action.
### What data Claude actually sees
When you connect via MCP, Claude has access to the same data you do in Ads Manager. Specifically:
→ Account, campaign, ad set, and ad-level performance metrics<br>→ Creative metadata (ad name, format, copy, headline)<br>→ Audience and targeting setup at the ad set level<br>→ Budget pacing and delivery status<br>→ Historical data going back as far as the platform allows
What Claude does NOT see:
→ Your billing details or payment methods<br>→ Other Business Manager users or admin permissions<br>→ Pixel-level event data (only aggregated conversion metrics)<br>→ Audience PII (no individual user data)
The OAuth scope is read-only by default. The MCP cannot push changes to your account without explicit confirmation in the Claude interface.
---
## The 1 MCP That Handles Both Meta + Google Ads
The recommended MCP for unified Meta Ads + Google Ads access: **Pipeboard MCP**.
Why Pipeboard:
→ Single connector handles both platforms<br>→ OAuth-based authentication (no API keys to manage)<br>→ Read-only by default (modification requires explicit confirmation)<br>→ Works across Claude Chat, Claude Cowork, and Claude Code<br>→ Free tier supports 1 ad account; paid tiers unlock unlimited
If you've heard of Composio or Anthropic's official Marketing connector, those work too. Pipeboard is the cleanest option for operators running both Meta and Google in parallel.
### Multi-brand setup
If you manage multiple brands (agency or in-house with multiple sub-brands), set up 1 connection per brand on a dedicated Project. Don't try to merge multiple ad accounts into 1 chat — Claude loses specificity when context spans brands.
The pattern:
→ Project A: Brand 1 (Meta + Google connected)<br>→ Project B: Brand 2 (Meta + Google connected)<br>→ Project C: Brand 3 (Meta + Google connected)
Each Project has its own brand context, target metrics, and prompt library. You switch contexts by switching Projects.
---
## Step-by-Step Setup
### Setup A — Claude Chat (web/app, \\~5 minutes)
1. Open [Claude.ai](http://claude.ai/) in your browser
2. Click your profile (top right) → Settings → Connectors
3. Search for "Pipeboard" in the connector library
4. Click Add → Connect
5. You'll be redirected to authenticate with Meta and Google
6. Sign in to each ad platform with the account you want to connect
7. Approve the read-only permissions
8. Return to Claude Chat
9. Confirm the connection by typing: "List my connected ad accounts"
10. Done. You can now ask questions in plain English.
### Setup B — Claude Cowork (Projects, \\~5 minutes)
1. Open Claude Cowork
2. Create a new Project named "[Your Brand] Ad Reporting"
3. Click Project Settings → Connectors
4. Add Pipeboard MCP from the connector library
5. Authenticate with Meta and Google
6. Add the following Project Instructions:
```javascript
You are a senior performance media buyer with access
to my live Meta Ads and Google Ads accounts via MCP.

When I ask a performance question, pull live data
and answer with specific numbers. Do not give generic
advice. Reference exact ad names, ad set names, and
campaign names.

Format every report with:
- Headline metric
- Top 3 winners with specific data
- Bottom 3 losers with specific data
- 1 recommended action with reasoning

Brand context:
- Brand name: [YOUR BRAND]
- Target ROAS: [YOUR TARGET]
- Target CPA: [YOUR TARGET]
- Primary platform: [META / GOOGLE / BOTH]
- Monthly budget: [YOUR BUDGET]
- Kill threshold: [E.G. ROAS BELOW 1.5X]
- Scale threshold: [E.G. ROAS ABOVE 3X]
```
1. Save the project. Every prompt now has full account context.
### Setup C — Claude Code (CLI, \\~7 minutes)
1. Open your terminal
2. Make sure Claude Code is installed (run `claude --version`)
3. If not installed, run `npm install -g @anthropic-ai/claude-code`
4. Add the Pipeboard MCP server:
```bash
claude mcp add pipeboard \\\\
  --transport http \\\\
  --url <https://api.pipeboard.com/mcp>
```
1. Authenticate when prompted (browser window opens)
2. Approve Meta + Google permissions
3. Verify connection: `claude mcp list` (should show pipeboard as connected)
4. Test it: `claude "What were my top 3 ad sets last week by ROAS?"`
The CLI version is best for batch operations and scheduled reports. Pair it with cron to email yourself the weekly summary every Monday at 9am.
---
## 22 Example Prompts (Copy-Paste Today)
### Performance Audits
```javascript
1. "What's my best-performing ad set from last week
    by ROAS? Include spend, impressions, ROAS, and
    the winning creative angle."

2. "Which campaigns are burning budget with no
    conversions in the last 7 days? List them with
    spend amount and recommend which to pause."

3. "Compare this week's account-level ROAS to last
    week. What changed? Identify the 3 biggest
    movers."

4. "Show me the bottom 5 ads by hook rate in the
    last 14 days. What pattern do they share?
    Recommend a creative direction to test instead."

5. "Which ad sets have a CPA above 1.5x my target
    of $40? Are there common audience or creative
    factors driving the failure?"
```
### Daily and Weekly Reports
```javascript
6. "Write me a 1-paragraph summary of yesterday's
    performance. Include spend, ROAS, top winner,
    biggest concern."

7. "Generate the weekly performance report for
    [BRAND NAME]. Include account-level metrics,
    top 5 winners, top 5 losers, and 3 recommended
    actions for next week."

8. "What's my month-to-date spend across Meta and
    Google? How does it pace against my $50K monthly
    budget? Project end-of-month spend at current pace."

9. "Send me the daily morning report: yesterday's
    spend, ROAS, CPA, and any ads that need
    attention. Format as a 5-bullet briefing."
```
### Decision-Making
```javascript
10. "Based on the kill-or-scale matrix (kill below
     1.5X ROAS, scale above 3X), tell me which ads
     to kill and which to scale today."

11. "Which 3 ads have hit Scale thresholds in the
     last 24 hours? Recommend a budget increase
     for each based on confidence level."

12. "I've been running 20 variations for 3 days.
     Which ones still don't have statistical
     significance? Which should I cut for noise?"

13. "Identify the ad sets where I should pause
     spending until I can produce new creatives.
     Sort by potential savings."
```
### Creative and Hook Analysis
```javascript
14. "What hook patterns are winning in my top 5
     ads this month? Describe the angle, not just
     the wording."

15. "Compare the hook rate of my UGC-style ads vs
     my product-hero ads. Which format is winning
     and by how much?"

16. "Which ad creatives have been running 30+ days
     and still maintaining target ROAS? These are
     evergreen winners I should protect."
```
### Budget and Pacing
```javascript
17. "What's my burn rate this week? At current
     pace, will I hit or exceed my monthly budget?
     Recommend a pacing adjustment."

18. "Show me the top 5 ad sets by total spend this
     month. Are they justifying that spend by ROAS?
     Flag any over-investment."

19. "Which campaigns are under-pacing? Should I
     reallocate budget to the over-pacers? Quantify
     the upside."
```
### Cross-Platform Comparison
```javascript
20. "Compare my Meta Ads ROAS vs Google Ads ROAS
     for the last 30 days. Where am I winning and
     where should I shift spend?"

21. "Which platform is delivering lower CPA for the
     same target audience this month? Account for
     attribution differences."

22. "If I had to cut $10K of monthly spend, which
     campaigns should I cut first based on ROI?
     Rank with reasoning."
```
### Advanced: Chained Prompts
These work best in Claude Cowork where context persists across messages.
```javascript
A. "Pull last week's account performance. Then
    identify the 5 worst-performing ads by ROAS.
    Then for each one, diagnose why it failed
    based on hook rate, hold rate, and CTR."

B. "Compare this month's performance to last month.
    For every metric that dropped by more than 10%,
    drill into the campaign-level data and explain
    what caused the drop."

C. "Run my morning report. Then for any ad that
    breached the kill threshold, draft a Slack
    message I can send to my team summarizing the
    decision and next steps."

D. "Audit my top 10 ad sets by spend. For each one,
    calculate the hour-of-day performance breakdown.
    Recommend dayparting adjustments where the data
    justifies it."
```
---
## Worked Example: The Monday Morning Workflow
This is the routine to run every Monday at 9am once your MCP is set up.
### 9:00 — Pull the weekly report
Open your Claude Cowork Project. Type:
```javascript
Generate the weekly performance report for [BRAND].
Include:
- Total spend, total revenue, blended ROAS
- Top 5 ads by ROAS with creative angle
- Bottom 5 ads by ROAS — diagnose why
- 3 hook patterns that worked
- 3 hook patterns that failed
- Account pacing vs monthly target
- 5 specific actions for this week
```
You get back a structured weekly briefing in under 60 seconds.
### 9:05 — Identify the 5 ads to kill this week
```javascript
Apply the kill-or-scale matrix to last week's data.
Show me only the ads that hit kill thresholds. Format
as a list I can paste into Ads Manager to disable.
```
You take that list. Go to Ads Manager. Pause the named ads. Done in 2 minutes.
### 9:15 — Identify the 2 ads to scale
```javascript
Show me the 2 ads with the highest ROAS that are
currently under-budgeted. Recommend new daily budget
amounts and the doubling cadence for the next 5 days.
```
You take the recommendations. Apply the budget increase. Done in 2 minutes.
### 9:20 — Brief the creative team
```javascript
Based on last week's winning hook patterns, write
me a creative brief for the team. Include:
- 3 hook angles to write next
- The format that won (UGC vs product hero vs comparison)
- The persona type that converted
- The CTA style that drove the most clicks
```
Forward the brief to your designers and copywriters. Done in 5 minutes.
### 9:30 — Done
You've replaced what used to be a 3-hour Monday with 30 minutes of action.
The data did the analysis. You did the deciding.
---
## Daily and Weekly Cadence
### Monday morning (30 minutes)
→ Generate weekly report<br>→ Apply kill-or-scale matrix<br>→ Brief creative team on winning patterns<br>→ Set 3 testing priorities for the week
### Daily morning (5 minutes)
→ Pull yesterday's spend, ROAS, and CPA<br>→ Flag any ad that breached thresholds overnight<br>→ Approve or pause based on the briefing
### Wednesday mid-week check (10 minutes)
→ Mid-week pacing audit<br>→ Compare Mon-Wed vs same period last week<br>→ Adjust any campaigns that are off-pace
### Friday wrap (15 minutes)
→ End-of-week summary<br>→ Identify next Monday's testing priorities<br>→ Set up any creative production needed for next week
Total weekly time: under 90 minutes.
This replaces the 8-12 hours per week that most operators spend on reporting and analysis.
---
## Troubleshooting the 7 Most Common Errors
### Error 1 — "Unable to authenticate with Meta"
**Cause:** Your Meta Business Manager doesn't have the right permissions for the user account you're connecting.
**Fix:**
→ Go to [business.facebook.com](http://business.facebook.com/) → Settings → Users<br>→ Verify your user has "Admin" or "Advertiser" access on the ad account<br>→ Re-attempt the MCP connection
If the issue persists, the Meta business may have 2FA blocking 3rd-party apps. Enable "Allow integrations" in Meta Business Settings.
### Error 2 — "Google Ads OAuth fails after sign-in"
**Cause:** Your Google account doesn't have direct access to the ad account, or the ad account is under a Manager (MCC) that requires manager-level auth.
**Fix:**
→ Sign in directly to [ads.google.com](http://ads.google.com/) with the user that owns the account<br>→ If using a Manager account, re-authenticate from the Manager view, not the linked account view<br>→ Approve the OAuth scope when prompted
### Error 3 — "Claude says: I don't have access to that data"
**Cause:** The MCP connection succeeded but Claude doesn't see the data in its current session.
**Fix:**
→ Confirm the MCP is enabled for the current chat (in Claude Chat: settings icon > Connectors > toggle on)<br>→ Refresh the chat (Cmd+R / Ctrl+R)<br>→ Type: "List my connected ad accounts" — if this fails, the MCP isn't connected for this session
### Error 4 — "Data feels stale or doesn't match Ads Manager"
**Cause:** Meta and Google ad data has reporting lag of 3-6 hours. Real-time data isn't always real-time.
**Fix:**
→ Specify a time range explicitly: "Last 7 days" rather than "today"<br>→ For yesterday's final numbers, query after 6am the next day<br>→ For real-time spend monitoring, use the platform's native dashboard, not MCP
### Error 5 — "The MCP keeps disconnecting"
**Cause:** Token expiration. Most ad platforms expire OAuth tokens every 30-90 days.
**Fix:**
→ Re-authenticate when the connection drops<br>→ Set a calendar reminder to re-auth every 60 days as preventive maintenance<br>→ For the CLI version, run `claude mcp reconnect pipeboard`
### Error 6 — "Claude returns numbers that look wrong"
**Cause:** Most of the time, Claude is reading the right data but applying the wrong attribution window or time zone.
**Fix:**
→ Always specify the attribution window: "Use 7-day click attribution"<br>→ Specify the time zone if your account is multi-region: "Report in PT, not UTC"<br>→ Cross-check 1 metric against Ads Manager. If they match, trust the rest.
### Error 7 — "Connection works but responses are slow"
**Cause:** Pulling 90+ days of granular ad-level data hits API rate limits.
**Fix:**
→ Limit time ranges to 30 days for ad-level questions<br>→ Use 90-day windows only for account or campaign-level summaries<br>→ For deep dives, ask Claude to break the query into smaller time chunks
---
## What NOT to Do
→ Don't connect 5 brand accounts to 1 Project. Claude loses specificity.
→ Don't ask vague questions like "how are my ads doing." Claude will give vague answers. Specify: which platform, which timeframe, which metric, which threshold.
→ Don't trust real-time spend numbers. Use the platform's native dashboard for live spend monitoring. MCP is for analysis, not real-time alerting.
→ Don't run the kill-or-scale matrix on ads with under $30 spend. The data isn't statistically meaningful yet.
→ Don't share Project Instructions that contain your actual ad account IDs or sensitive thresholds publicly. Treat them like API keys.
→ Don't skip the weekly cadence. The system's value compounds when you run it consistently.
---
## Pro Tips After Setup
### Save your top 5 prompts as Project commands
If you're using Claude Cowork, you can save recurring prompts as Project commands. Examples:
→ `/morning-report` runs your daily morning audit<br>→ `/weekly-summary` generates the Monday client report<br>→ `/kill-or-scale` runs the matrix on the last 24 hours<br>→ `/budget-pacing` checks monthly spend pacing<br>→ `/cross-platform` compares Meta vs Google ROAS
### Connect 1 account per Project
Don't connect 5 brand accounts to a single Project. Claude will lose specificity. Set up 1 Project per brand. Reuse the same Project Instructions template.
### Version your prompts
When you find a prompt that returns a great answer, save it. Claude responds best to prompts that have been refined over 5-10 iterations. Build a personal prompt library.
### Pair MCP with Notion or Google Docs MCP
If you've also connected Notion or Google Docs via MCP, you can chain: "Pull last week's report and append it to the [Brand Name] performance log in Notion."
This turns Claude into your reporting assistant, not just your data reader.
### Schedule reports via Claude Code
For recurring weekly reports, use Claude Code's scheduling. Run a cron job that emails the weekly summary every Monday at 9am.
```bash
# Example cron entry (Mac/Linux): every Monday at 9am
0 9 * * 1 claude "Generate weekly report for [BRAND]" > ~/reports/weekly-$(date +\\\\%Y-\\\\%m-\\\\%d).txt
```
---
## Cost & Speed Math
<table header-row="true">
<tr>
<td>Task</td>
<td>Manual time</td>
<td>With MCP</td>
<td>Time saved</td>
</tr>
<tr>
<td>Weekly client report</td>
<td>3 hours</td>
<td>4 minutes</td>
<td>\\~3 hours</td>
</tr>
<tr>
<td>Daily morning audit</td>
<td>30 minutes</td>
<td>1 minute</td>
<td>29 minutes</td>
</tr>
<tr>
<td>Cross-platform comparison</td>
<td>90 minutes</td>
<td>2 minutes</td>
<td>88 minutes</td>
</tr>
<tr>
<td>Kill-or-scale decision</td>
<td>45 minutes</td>
<td>3 minutes</td>
<td>42 minutes</td>
</tr>
<tr>
<td>Monthly account audit</td>
<td>4 hours</td>
<td>15 minutes</td>
<td>\\~3.75 hours</td>
</tr>
<tr>
<td>Creative pattern analysis</td>
<td>2 hours</td>
<td>5 minutes</td>
<td>1h 55min</td>
</tr>
</table>
Per week, this saves a typical operator 8-12 hours.
That's a full extra workday recovered per week.
For an agency managing 5 brands, that's 40-60 hours saved per week across the portfolio.
---
## 🎯 Closer
**Set up Claude Chat with the Pipeboard MCP first. It's the fastest install. Connect your primary ad platform. Test it with the top 5 prompts above. Run the Monday morning workflow once. Once that's working, expand to Cowork for your client projects and Claude Code for scheduled reports. The full setup takes under 30 minutes. The time it saves you will compound from week 1.**
System > Spend.
---
