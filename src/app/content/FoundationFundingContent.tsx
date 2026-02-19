import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Foundation Funding

The ClawdBlox Foundation operates on a simple principle: **trading activity funds real development.** Every $BLOX trade on decentralized exchanges generates fees that flow directly to the Foundation treasury — no middlemen, no opaque fund management, no "trust us" promises.

---

## How It Works

The funding flow is fully on-chain and transparent:

\`\`\`
Trading $BLOX on DEX
        │
        ▼
  Trading Fees Generated
        │
        ▼
  Fees Route to Foundation Treasury
        │
        ▼
  Foundation Allocates to Operations
        │
        ├──→ Server Infrastructure
        ├──→ Research & Development
        ├──→ Open Source Tooling
        └──→ Creator Rewards Program
\`\`\`

This is not a tax or a penalty — it is the natural fee structure of decentralized exchange liquidity positions. When someone buys or sells $BLOX, a small percentage goes to the liquidity pool, and the Foundation's share of those fees funds the ecosystem.

---

## What the Money Funds

The Foundation treasury is allocated across four primary categories:

### Server Infrastructure

AI-powered NPCs require serious compute. MemoryWeave runs PostgreSQL with pgvector for semantic memory, Redis for real-time caching, and inference calls to large language models for every NPC conversation. This infrastructure must be:

- **Always on** — NPCs do not take breaks. Games run 24/7.
- **Low latency** — A 3-second response time kills immersion. We target sub-second.
- **Scalable** — As more developers integrate ClawdBlox, infrastructure must grow seamlessly.

Foundation funds cover cloud compute, database hosting, AI inference costs, and CDN distribution.

### Research & Development

Building the next generation of AI NPCs requires ongoing R&D investment:

- **Memory architectures** — Improving how NPCs store, retrieve, and reason over memories
- **Personality modeling** — Refining OCEAN-based personality systems for more nuanced behavior
- **Life simulation** — Advancing autonomous NPC routines, goals, and social dynamics
- **Multi-platform support** — Expanding beyond Roblox to Unity, Unreal, and custom engines
- **Performance optimization** — Making the system faster, cheaper, and more efficient

### Open Source Tooling

ClawdBlox is committed to open infrastructure. Foundation funds support:

- **SDKs and client libraries** — Luau (Roblox), JavaScript, and future language support
- **Documentation and tutorials** — Lowering the barrier for new developers
- **Community contributions** — Grants for contributors who improve the ecosystem
- **Developer tooling** — Debug tools, testing frameworks, and integration helpers

### Creator Rewards Program

A portion of Foundation funds is dedicated to rewarding Roblox developers and community builders who actively use and promote ClawdBlox:

- Developers who integrate MemoryWeave NPCs into popular games
- Community members who create tutorials, guides, or showcase content
- Open source contributors who submit meaningful improvements

---

## Why This Model Works

Traditional funding models for developer tools have well-known problems:

| Model | Problem |
|---|---|
| **VC-funded SaaS** | Investors demand growth at all costs; pricing increases over time; eventual enshittification |
| **Freemium with paywalls** | Core features get locked behind pricing tiers; open source suffers |
| **Donation-based** | Unsustainable; maintainers burn out; critical infrastructure underfunded |
| **Token with no utility** | Pure speculation; no connection between token value and ecosystem health |

The $BLOX model is different:

- **Self-sustaining** — As long as people trade $BLOX, the Foundation has revenue
- **Aligned incentives** — More ecosystem adoption → more trading interest → more funding → better infrastructure
- **No investor pressure** — The Foundation answers to the ecosystem, not to VCs with exit timelines
- **Transparent** — Every incoming fee and outgoing expenditure can be tracked on-chain

---

## Transparency Commitments

The Foundation commits to the following transparency practices:

- **Public treasury address** — Anyone can view the Foundation wallet balance and transaction history on BaseScan
- **Periodic reports** — Regular updates on how funds are allocated and what they have produced
- **On-chain verifiability** — Fee routing from the liquidity pool to the Foundation is coded into the smart contract, not a manual process

---

## The Virtuous Cycle

The Foundation funding model creates a positive feedback loop:

\`\`\`
Better infrastructure
        │
        ▼
More developers build with ClawdBlox
        │
        ▼
More games with intelligent NPCs
        │
        ▼
More ecosystem visibility and adoption
        │
        ▼
More $BLOX trading activity
        │
        ▼
More Foundation revenue
        │
        ▼
Better infrastructure (cycle repeats)
\`\`\`

This is not a growth hack — it is a sustainable economic model where ecosystem value and token activity reinforce each other.

---

## Learn More

- [$BLOX Token Overview](/docs/token/overview) — What $BLOX is and why it exists
- [Clanker Launch](/docs/token/clanker-launch) — How $BLOX was deployed on Base
- [Tokenomics & Utility](/docs/token/tokenomics) — Distribution and the incentive layer
`;

export function FoundationFundingContent() {
  return <MarkdownContent content={content} />;
}
