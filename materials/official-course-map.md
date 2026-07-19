# learn-pdpa-dnc-with-phoebe - official course map

**What this is:** the coverage contract. Maps each session to the PDPC sources it teaches from,
marks coverage (✓ full / ◐ partial / - not by design), and lists the verified facts pages may
state. Built 2026-07-19.

**Hard honesty banner (on every page):** *Educational, not legal advice. Singapore PDPA is
administered by the PDPC and changes - verify against the current PDPC Advisory Guidelines and get
proper advice before acting.*

**Course shape:** two tracks, 14 sessions, gov bucket, tier 3. Slate + regulatory teal.
- **Leader track** (a1-a6): why PDPA+DNC matter, the 10 obligations, the DNC layer, consent vs DNC + exemptions, breach & enforcement, governance & accountability.
- **Practitioner track** (b1-b8): the DNC check, capturing consent, a compliant campaign end to end, message-ID + calling rules, exemptions in practice, access/correction, breach response, building the compliance system.

**Running case:** "Marina Retail", a Singapore SME running marketing campaigns, built into a compliant operation across the practitioner track.

**Interactive layer:** `dnc-live.js` - a DNC compliance checker. Pick a scenario (message purpose,
channel, consent, register check, sender ID, calling line) and it rules **compliant / not** and
cites the rule (s.43 / s.44 / s.45 / Eighth Schedule). Implements the verified Part 9 decision
logic; validated 11/11 in tests. Reusable for rules-based compliance courses.

---

## Coverage

### Leader track
| Session | Teaches | PDPC sources | Cover |
|---|---|---|---|
| a1 · Why PDPA + DNC matter | The law, the PDPC, spam + data-leak risk, the cost of getting it wrong | PDPA overview, Guide on Active Enforcement | ✓ |
| a2 · The 10 obligations | The ten data-protection obligations in plain English | AG on Key Concepts | ✓ |
| a3 · The DNC layer | 3 registers, "specified message", the check-before-send duty | AG on the DNC Provisions | ✓ |
| a4 · Consent vs DNC + exemptions | Consent override, the Eighth-Schedule exclusions, ongoing relationship | AG on DNC Provisions, Key Concepts (consent) | ✓ |
| a5 · Breach & enforcement | Breach notification, penalties, real PDPC decisions | Guide on Managing Data Breaches, enforcement decisions | ✓ |
| a6 · Governance & accountability | DPO, accountability, the DPMP, SME help | Guide to Developing a DPMP, DPE programme | ◐ (program framing ours) |

### Practitioner track
| Session | Teaches | PDPC sources | Cover |
|---|---|---|---|
| b1 · The DNC check | The check-before-send duty, 21-day validity, the checker widget | AG on DNC Provisions, DNC business rules | ✓ |
| b2 · Capturing consent | Valid + deemed consent, positive action, withdrawal | AG on Key Concepts (consent) | ✓ |
| b3 · A compliant campaign | End-to-end: scope -> consent/check -> send -> record | AG on DNC + brochure | ◐ (workflow is ours) |
| b4 · Message-ID + calling rules | s.44 sender identity, s.45 calling-line identity, channels | AG on DNC Provisions Part IV | ✓ |
| b5 · Exemptions in practice | Transactional, market research, B2B, ongoing relationship | Eighth Schedule + AG | ✓ |
| b6 · Access & correction | Responding to access/correction requests, timelines, refusals | AG on Key Concepts Ch.15, Guide to Handling Access Requests | ✓ |
| b7 · Breach response | Assess, notify PDPC, notify individuals, timelines | Guide on Managing & Notifying Data Breaches | ✓ |
| b8 · The compliance system | DPO, policies, data inventory, training, breach plan, audits | Guide to Developing a DPMP, DPE, DP Starter Kit | ◐ (checklist synthesized) |

---

## Verified facts the pages may state (with sources)

**The 10 data-protection obligations (AG on Key Concepts, "ten main obligations")**
Consent (ss.13-17) · Purpose Limitation (s.18) · Notification (s.20) · Access and Correction (ss.21, 22, 22A) · Accuracy (s.23) · Protection (s.24) · Retention Limitation (s.25) · Transfer Limitation (s.26) · Data Breach Notification (ss.26A-26E) · Accountability (ss.11, 12).
- **Data Portability** was enacted (Part VIB, s.26F, 2020 Amendment) but is **NOT yet in force** - excluded from the ten. Say "not yet in force".

**Consent**
- Valid consent (s.14): cannot require consent beyond what is reasonable to provide the product/service; cannot obtain by false/misleading means.
- Deemed consent: by conduct (s.15(1)), by contractual necessity (s.15(3), extends downstream), by notification (s.15A - assessment + opt-out window).
- Legitimate interests exception (First Schedule Part 3): identify the interest, assess + balancing test, disclose reliance.
- Withdrawal (s.16): allowed any time on reasonable notice; inform of consequences; cease use. PDPC rule of thumb: ~10 business days to give effect.

**Data breach notification (Guide on Managing & Notifying Data Breaches, 15 Mar 2021)**
- Notifiable if **significant harm** to individuals OR **significant scale = 500 or more** individuals.
- Assess within **30 calendar days** of credible grounds; notify **PDPC no later than 3 calendar days** after determining it is notifiable; notify affected individuals as soon as practicable, at the same time or after the PDPC.
- A data intermediary must notify the organisation it processes for, without undue delay.

**DPO + accountability**
- Must designate a DPO (s.11(3)); designation does not remove the org's legal responsibility (s.11(6)); publish business contact info.
- Accountability (s.12): develop policies/practices, a complaints process, communicate to staff, make available on request.

**Penalty caps (s.48J, in force 1 Oct 2022)**
- **Data protection provisions:** up to **S$1 million, or 10% of annual turnover in Singapore** if that turnover exceeds S$10M, whichever is higher.
- **DNC provisions (Part 9):** individual up to **S$200,000**; organisation up to **S$1,000,000**.
- Enforcement first considers directions without a penalty; penalties reflect harm + culpability (Guide on Active Enforcement).

**DNC provisions (AG on the DNC Provisions, revised 1 Feb 2021; PDPA Part 9)**
- Three registers: **No Voice Call, No Text Message, No Fax Message**. Numbers checked against all three at once.
- Singapore telephone number = 8 digits starting **3, 6, 8 or 9** (s.36(1)).
- **Specified message** (s.37(6) + Tenth Schedule): a purpose is to advertise/promote/offer goods, services, land, or a business/investment opportunity, or to promote a supplier.
- **Eighth-Schedule exclusions** (NOT specified messages): public-agency non-commercial; personal/domestic; emergency; sole purpose transactional/service; **ongoing relationship on-topic**; sole purpose market research/survey; **B2B** (to an organisation for its purposes).
- **Check-before-send (s.43):** must hold confirmation the number is not listed, obtained within **21 days** before sending (from the Registry or a checker). **21 days is current (since 1 Feb 2021).**
- **Consent override (s.46):** clear-and-unambiguous consent (written/accessible, positive action - inaction is not consent) lets you message even a listed number.
- **Ongoing-relationship exclusion (Eighth Schedule 1(e)):** applies to **voice, text AND fax** (there is NO voice carve-out under the current Act - the text/fax-only rule is the superseded pre-2019 framework). Needs an ongoing relationship (continuity/regularity/frequency; a one-off transaction is not enough) and the message on-topic to it.
- **Sender identity (s.44):** every specified message must clearly identify the sender + how to contact them; that info must stay valid **~30 days**. (Separate 30-day rule - do NOT conflate with the 21-day check validity.)
- **Calling line identity (s.45):** voice call or fax must not conceal the sender's calling number.
- **s.48B:** no address-harvesting software / dictionary attacks.
- Operational: check via the **dnc.gov.sg** portal (account -> submit numbers -> results). On consent withdrawal, re-check within 21 days (s.47(3)).

**Access & correction (ss.21, 22; AG Ch.15)**
- Access: provide the data + how it was used/disclosed in the past year. Correction: correct errors + pass corrections to third parties who received it in the past year.
- Respond as soon as reasonably possible; if not within 30 days, notify in writing within 30 days of the date you will respond. On rejection, preserve the data at least 30 calendar days for recourse.

**Enforcement cases (PDPC published)**
- Marina Bay Sands: Protection Obligation breach, 665,495 patrons, **S$315,000**.
- Ezynetic Pte Ltd: ransomware, 190,589 individuals, Protection Obligation, **S$17,500** + directions.
- Lee Chee Meng (real-estate salesperson): bought ~420,000 records for telemarketing; **Consent + Notification** breach (he DID check DNC - that was mitigating); **S$16,800** reduced penalty + delete-in-7-days.
- A Financial Advisor: dictionary attack + no register check + no consent; **DNC breach + s.48B**; **warning**.

**SME help (PDPC/IMDA)**
- Data Protection Essentials (DPE, PDPC + IMDA, for SMEs); DP Starter Kit; Guide to Developing a DPMP; Data Protection Notice Generator; PDPA Assessment Tool.

---

## Not covered by design (say so)

- Legal advice / how to handle a specific real breach or campaign - out of scope; get proper advice.
- The exact enumerated schedule of "prescribed personal data" categories for significant-harm (PDP (Notification of Data Breaches) Regulations 2021) - referenced, not reproduced.
- Sector-specific overlays (telco, finance MAS rules) - out of scope.
- Data Portability mechanics - not yet in force; mentioned only.

## Re-verify before delivery (this is live law)

1. **DNC register-check validity = 21 days** (current). The PDPC DNC brochure v3 still says "30 days" (stale). Teach 21.
2. **Ongoing-relationship exclusion applies to voice too** under the current Eighth Schedule - the "text/fax only, not voice" version is superseded. Foreground this correction.
3. **DNC per-check fee / free allowance** - exists but the dollar figure is inside the dnc.gov.sg portal; do not quote a number.
4. **DNC offence figures** (S$10,000/offence + S$1,000 compound) came from PDPC DNC materials but the offences page 404'd - re-verify. The financial-penalty caps (s.48J: S$200k individual / S$1M org) are statute-verified.

## Sources (fetched + verified 2026-07-19)

PDPC: PDPA overview + Data Protection Obligations · Advisory Guidelines on Key Concepts in the PDPA (rev. 2022, current) · Advisory Guidelines on the Do Not Call Provisions (rev. 1 Feb 2021) · DNC Registry business rules + brochure v3 · Guide on Managing and Notifying Data Breaches (15 Mar 2021) · Guide on Active Enforcement (rev. 1 Oct 2022) · Guide to Developing a DPMP (Aug 2023) · Guide to Handling Access Requests · Data Protection Essentials programme.
Enforcement decisions: Marina Bay Sands (2025), Ezynetic (2025), Lee Chee Meng (2023 SGPDPC 14), A Financial Advisor (2024, DNC).
Statute (SSO/AGC): PDPA 2012 s.48J (penalties), Eighth Schedule (DNC exclusions), s.37/43/44/45/46 (current as at 19 Jul 2026).
