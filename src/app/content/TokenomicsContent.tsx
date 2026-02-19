import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Tokenomics & Utility

$BLOX is designed with a clear purpose: fund open infrastructure, reward creators, and give the community a meaningful role in the ecosystem's future. This page covers token distribution, utility, and the incentive layer for developers.

---

## Token Distribution

$BLOX was launched via Clanker with no presale, no private rounds, and no VC allocations. The distribution is designed for fairness and long-term ecosystem health.

| Allocation | Share | Purpose |
|---|---|---|
| **Liquidity Pool** | 40% | Locked in DEX liquidity to ensure deep, stable trading |
| **Foundation Treasury** | 25% | Operational funding for servers, R&D, and open source tooling |
| **Creator Rewards** | 20% | Reserved for developer incentives, grants, and ecosystem rewards |
| **Team & Contributors** | 10% | Core team allocation with vesting schedule |
| **Community & Partnerships** | 5% | Strategic partnerships, community campaigns, and airdrops |

### Key Principles

- **No presale or seed round** — Everyone had the same opportunity at launch
- **Locked liquidity** — LP tokens are locked to prevent rug pulls
- **Team vesting** — Team tokens vest over time to align long-term incentives
- **Foundation reserves are operational** — Not a war chest; funds are actively deployed for infrastructure

---

## Token Utility

$BLOX is not a governance-only token or a speculation vehicle. It has concrete utility across the ClawdBlox ecosystem:

### 1. Creator Rewards

The most important utility: **developers who build with ClawdBlox earn $BLOX.**

Roblox developers who integrate MemoryWeave NPCs into their games are eligible for creator rewards based on:

- **Integration quality** — Games that use memory, personality, and life simulation features effectively
- **Player engagement** — NPCs that generate meaningful interactions and returning players
- **Ecosystem contribution** — Open-sourcing modules, writing tutorials, or contributing to the SDK

This creates a direct incentive for Roblox developers to adopt ClawdBlox — not just as a tool, but as an earning opportunity.

### 2. Future Governance

As the ecosystem matures, $BLOX holders will participate in governance decisions:

- **Feature prioritization** — Vote on which platforms, features, and integrations to build next
- **Grant allocation** — Influence how the Creator Rewards pool is distributed
- **Protocol parameters** — Shape the technical direction of MemoryWeave and related tooling

Governance will be introduced progressively, starting with community signaling and evolving toward on-chain voting as the holder base grows.

### 3. Premium Feature Access

$BLOX unlocks premium capabilities within the ClawdBlox platform:

- **Extended memory depth** — NPCs with longer memory retention and larger context windows
- **Advanced personality tuning** — Fine-grained OCEAN parameter control and custom trait models
- **Priority inference** — Lower latency for NPC responses via dedicated compute allocation
- **Higher rate limits** — Increased API throughput for high-traffic games

Free-tier access to ClawdBlox will always exist. $BLOX unlocks the ceiling, not the floor.

### 4. Incentive Layer for Developers

Beyond individual creator rewards, $BLOX functions as a broader incentive layer:

| Incentive | Description |
|---|---|
| **Integration Bounties** | Rewards for developers who publish ClawdBlox-powered games |
| **SDK Contributions** | $BLOX grants for contributors who improve client libraries and tools |
| **Bug Bounties** | Token rewards for security researchers who identify vulnerabilities |
| **Content Creation** | Incentives for tutorials, videos, and showcase content |
| **Referral Program** | Rewards for developers who onboard new projects to ClawdBlox |

This layer ensures that the people building the ecosystem are also the people who benefit from its growth.

---

## Utility Roadmap

Token utility will expand as the ecosystem develops:

| Phase | Utility |
|---|---|
| **Phase 1 — Launch** | DEX trading, Foundation funding via fees, community building |
| **Phase 2 — Rewards** | Creator rewards program goes live, first developer grants issued |
| **Phase 3 — Premium** | $BLOX-gated premium features available in MemoryWeave |
| **Phase 4 — Governance** | Community voting on feature priorities and grant allocation |
| **Phase 5 — Expansion** | Cross-platform incentives as Unity/Unreal support launches |

---

## Economic Sustainability

The $BLOX model is designed for long-term viability, not short-term hype:

- **Revenue-generating** — Trading fees produce real, ongoing income for the Foundation
- **Demand-driven** — As more developers need premium features and creator rewards, organic demand for $BLOX increases
- **Non-extractive** — The Foundation does not sell team tokens to fund operations; it operates on trading fee revenue
- **Deflationary pressure** — As tokens are used for premium features and staking, circulating supply naturally tightens

---

## What $BLOX Is Not

To set clear expectations:

- **Not an investment product** — $BLOX is a utility token, not a financial instrument
- **Not required to use ClawdBlox** — Free-tier access does not require holding any tokens
- **Not artificially scarce** — No burn mechanics designed purely to pump price; supply dynamics are organic
- **Not a promise of returns** — Token value depends on ecosystem adoption, not marketing campaigns

---

## Summary

$BLOX exists to solve a real problem: funding open infrastructure sustainably while rewarding the people who build on it. It connects Web3 economic tools with the gaming world — not as a gimmick, but as a genuine alignment mechanism between the Foundation, developers, and the community.

---

## Learn More

- [$BLOX Token Overview](/docs/token/overview) — What $BLOX is and the big picture
- [Clanker Launch](/docs/token/clanker-launch) — How $BLOX was deployed on Base
- [Foundation Funding Model](/docs/token/foundation-funding) — How trading fees fund development
`;

export function TokenomicsContent() {
  return <MarkdownContent content={content} />;
}
