<!-- learn-with-phoebe hub banner -->
> ### 📚 Part of [**Learn with Phoebe**](https://phoebefu6.github.io/learn-with-phoebe/)
> The shelf of free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**
<!-- /learn-with-phoebe hub banner -->

# learn PDPA + DNC with phoebe

A two-track, hands-on course on **Singapore's Personal Data Protection Act and its Do Not Call provisions** - by Phoebe Fu.

> ⚖️ **Educational, not legal advice.** Taught from the PDPC's own published guidelines. The PDPA changes and every real situation has its own facts - verify against the current PDPC Advisory Guidelines and get proper advice before acting.

The PDPA sets ten obligations for handling personal data, and a Do Not Call layer that governs every marketing call, text, and fax to a Singapore number. This course teaches both how to *lead* compliance and how to *run* it day to day.

## Two tracks, 14 sessions

- **🤝 Leader track (6 x 45 min, no jargon):** why PDPA + DNC matter, the ten obligations, the DNC layer, consent vs DNC + exemptions, breach & enforcement (with real PDPC cases), and governance & accountability.
- **🛠️ Practitioner track (8 x 45 min):** the DNC check before you send, capturing valid consent, a compliant campaign end to end, message-ID + calling rules, exemptions in practice, access & correction requests, data breach response, and building the compliance system.

## The running case

The practitioner track follows **Marina Retail**, a fictional Singapore SME, from "we just blast our customer list" to a marketing operation that would survive an audit.

## Live DNC compliance checker

`assets/dnc-live.js` renders an in-browser checker: set a message purpose, channel, consent state, and register check, and it rules the scenario **compliant / not compliant** and cites the exact PDPA provision (s.43 / s.44 / s.45 / the Eighth-Schedule exclusions). It encodes the verified Part 9 decision logic - a teaching model, not a legal engine.

## Built from official sources

Taught from the PDPC's Advisory Guidelines (Key Concepts; Do Not Call Provisions), the Guide on Managing and Notifying Data Breaches, the Guide on Active Enforcement, the DPMP guide, and published enforcement decisions. Coverage contract: [`materials/official-course-map.md`](materials/official-course-map.md).

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Static HTML/CSS/JS - no build step. Sits in the **Data & AI Governance** shelf, alongside the PDPA-first data-governance and GDPR courses.
