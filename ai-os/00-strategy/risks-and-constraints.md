# Risks and Constraints

The things most likely to kill this, written plainly and kept near the front. If any of these stops being true, the roadmap changes.

---

## 1. The channel is the bottleneck, not the technology

No audience → no leads → no capital → no product. Every part of this plan depends on attention arriving, and attention is the slowest-moving input in the system.

Code is the enjoyable problem and the wrong first priority. The temptation will be to spend a fortnight making the orchestrator elegant while nothing publishes. The counter is structural: the Tue/Fri publish rhythm is treated as non-negotiable, and any week where a publish slips because of build work is a failed week regardless of what got built.

**Signal that this is going wrong:** more commits than videos in any given week.

---

## 2. Thirty-four agents at four people is how nothing ships

The full roster maps about 34 agents. That is a map, not a build list. **Nine in the first 90 days.**

The failure mode is not that too many get built — it is that twenty get started, none get finished, and none get used. A half-built agent has negative value: it costs the attention of remembering it exists.

**The rule:** an agent is not "built" until it has produced real output that went live, and until the human who QAs it can run it without Paras present.

---

## 3. Don't build the product before the clients

Services fund the product. The product does not fund itself.

A licensed dashboard with no distribution and no proven agents is a support burden attached to zero revenue. The order is services → education → product, and Phase 4 does not start until ten clients are live on Phase 2's installed OS.

**Signal that this is going wrong:** any conversation about pricing tiers, seat counts, or a signup flow before ten installs exist.

---

## 4. Money OS is the riskiest part and the least valuable to start

It serves a different customer (someone who already has money) at a later ladder stage, it requires the other two to have produced surplus, and it is the only regulated part of the system. It earns its place in Phase 3, not before.

There is also an attention cost: trading content pulls a different audience than SMB AI content. Mixing them too early muddies the channel's positioning at exactly the point where clarity is producing the growth.

---

## 5. The SEBI boundary

This is a commercial constraint as much as a legal one, so it is written in plain terms rather than buried in a disclaimer.

**On the safe side of the line:**
- Teaching a method — how to research, screen, backtest, size a position
- Selling curriculum, prompts, templates, Pine Script strategies, tooling
- Trading and investing **Paras's own capital**, and showing the process
- Talking about markets generally, historically, and educationally

**On the other side of the line, requiring SEBI Research Analyst or Investment Adviser registration:**
- Charging for buy / sell / hold recommendations on specific securities
- Managing, pooling, or directing anyone else's money
- Anything that functions as personalised investment advice for a fee, whatever it is called

**Also non-negotiable regardless of registration:** no performance guarantees, no "consistent monthly returns", no specific ROI promise. Frame every outcome as skill and process. Any Indian-market campaign carries a market-risk disclaimer; broker-partner campaigns carry whatever the partner requires — confirm rather than assume.

Money OS is scoped as **education plus own capital**, which stays clearly on the safe side. If the ambition later shifts to advisory, that becomes a compliance workstream with its own timeline, not a footnote to a product launch.

*This is a working constraint written by a non-lawyer. Before Money OS ships anything commercial, have it reviewed by someone qualified in Indian securities regulation.*

---

## 6. Without attribution, you are flying blind

Four channels, two audiences, six platforms, and no single view of what produced revenue is the default state of every business this size. It is also why most of them cannot tell which half of their effort to cut.

Scorekeeper is not optional and it is not a Phase 2 nicety. Minimum viable version by end of Phase 0: UTMs on every link, source tracking in GHL, and one weekly scorecard covering YouTube, Meta, GHL and Skool in a single view.

**The question it must answer every Monday:** which specific thing produced the last five leads?

---

## 7. Key-person concentration

Paras is the face, the closer, the credibility, and the final judgment on every output. That is correct for now — it is the fastest path and the positioning requires a person. It is also the single biggest fragility in the system.

Mitigations, in order of when they become possible:
- The **OS Operator** role (the social media manager) is designed specifically so the daily loop runs without him
- Avatar and render agents reduce, but never eliminate, camera dependency
- The Skool community and Wednesday workshop create secondary voices over time
- Case studies shift proof from "trust Paras" to "look at these fifteen businesses"

None of these are solved in year one. The realistic goal is that the *system* survives a two-week absence, not that the *brand* does.

---

## 8. The US credibility problem

The proof is Indian and Emirati. A US prospect has never heard of Nippon India Mutual Fund.

Do not hide it, and do not present it as though it were a US logo. The honest framing — regulated financial marketing at scale, in a harder market — is the stronger one, and it is already written in `paras-lead-engine/references/outreach.md` under "The credibility bridge". Use it verbatim until reply data says otherwise.

**Signal that this is going wrong:** reply rates under 2% across a full 50-attempt cycle with clean sourcing. That means the bridge is not carrying weight and the market order should be revisited, not that outbound is broken.

---

## 9. Agent output quality drifts silently

Agents do not fail loudly. They produce slightly-worse output for weeks and nobody notices because each individual piece looked fine.

Three defences, all built into the architecture:
- **Brand Guard** as a gate before anything publishes or sends (`paras-compliance-audit`)
- **Brand Brain** as the single source of voice, offers, pricing, and proof — so drift has one place to be corrected rather than thirty
- **A human QA on every lane.** Agent-first, never agent-only. The OS Operator's actual job is catching this.

---

## 10. Capacity, stated honestly

One editor, one ads manager, one VA, one operator, and Paras. Two videos a week plus shorts plus six-platform repurposing plus outbound plus delivery.

That is tight and it will be the real constraint long before the technology is. Two consequences worth accepting now rather than discovering in week six:

- **The editor is the hard ceiling on video volume.** This is why Editor Brief is in the first nine agents rather than a nice-to-have — it is the only lever that raises that ceiling without a second hire.
- **The first hire made from revenue should be a second editor or an operator**, not a salesperson. Delivery capacity is what converts pipeline into cash.
