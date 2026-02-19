import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Mission & Vision

**The ClawdBlox Foundation exists for one reason: to make AI-powered NPCs accessible to every game developer on the planet — regardless of budget, team size, or technical expertise.**

> Building intelligent characters should be as easy as importing a library. Not as hard as building an AI company.

---

## The Problem We Solve

Today, if a game developer wants NPCs that remember players, have real personalities, and live simulated lives, they have two options:

1. **Build it themselves** — Hire an AI team, set up vector databases, build a memory system, design personality frameworks, manage inference infrastructure. Cost: hundreds of thousands of dollars. Timeline: months to years.
2. **Go without** — Ship with scripted dialogue trees and hope players don't notice. Cost: zero dollars. Result: NPCs that feel dead.

There is no middle ground. No open, affordable infrastructure that handles the hard parts so developers can focus on what they do best — making great games.

**The ClawdBlox Foundation is that middle ground.**

---

## Our Mission

### Democratize Intelligent NPCs

Every game deserves characters that feel alive. Not just AAA titles with massive budgets — every indie project, every Roblox experience, every student prototype. The Foundation operates the infrastructure that makes this possible, funded transparently by the $BLOX ecosystem.

### Maintain Open Infrastructure

We believe the future of AI in gaming must be open. Open APIs. Open SDKs. Open documentation. No vendor lock-in. No proprietary traps. If you build NPCs with ClawdBlox, your data is yours, your characters are yours, and you can leave whenever you want — though we're betting you won't want to.

### Fund Continuous Innovation

AI is moving fast. Memory systems, personality models, and inference capabilities improve every quarter. The Foundation ensures that MemoryWeave stays at the cutting edge — not through VC-driven hype cycles, but through sustainable, community-aligned funding from $BLOX trading fees.

---

## Our Vision

### Phase 1 — Infrastructure (Now)

Deploy and maintain production-grade servers running the full MemoryWeave stack. Provide free and affordable access to game developers. Ship SDKs for Roblox, Unity, and beyond. Build a developer community around open NPC intelligence.

### Phase 2 — Ecosystem Growth (Next)

Expand to global server deployments for low-latency access worldwide. Launch creator reward programs funded by the Foundation treasury. Establish grant programs for open-source contributors building on MemoryWeave. Deepen integrations with major game engines and platforms.

### Phase 3 — Decentralized Stewardship (Future)

Transition governance toward the community. Enable shared NPC memory networks where characters persist across games and platforms. Explore on-chain identity for NPCs — permanent, composable, community-owned. The Foundation becomes a steward, not a gatekeeper.

---

## Guiding Principles

| Principle | What It Means |
|---|---|
| **Accessibility First** | If a solo developer can't use it, we haven't finished building it |
| **Open by Default** | APIs, SDKs, and documentation are open. Always. |
| **Sustainable Funding** | No grants with strings attached. No VC runway anxiety. $BLOX funds the mission. |
| **Developer Sovereignty** | Your NPCs, your data, your rules. We provide infrastructure, not control. |
| **Transparent Operations** | How funds are used, what's being built, where the roadmap is headed — all public. |

---

## Why a Foundation?

A company optimizes for profit. A foundation optimizes for mission.

The ClawdBlox Foundation is structured to serve the ecosystem, not extract from it. Trading fees from $BLOX flow into the Foundation treasury and are deployed toward one goal: making AI NPCs better and more accessible for everyone.

There are no shareholders demanding quarterly returns. No investors pushing for premature monetization. Just a clear mission, transparent funding, and a growing community of developers building the future of interactive gaming.

**The Foundation is the steward. The community is the owner. The NPCs are the product.**
`;

export function MissionContent() {
  return <MarkdownContent content={content} />;
}
