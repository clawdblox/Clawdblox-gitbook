import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# $BLOX Token

**$BLOX** is the native token of the ClawdBlox ecosystem, deployed on Base (Ethereum Layer 2). It serves as the economic backbone that connects Web3 incentives with game development — funding infrastructure, rewarding creators, and aligning the interests of everyone building with intelligent NPCs.

> **Every trade funds innovation. Every holder supports the future of AI in gaming.**

---

## Why a Token?

ClawdBlox is building open infrastructure for AI-powered NPCs. That infrastructure — servers, vector databases, AI inference, R&D — costs real money to operate and improve. Traditional SaaS models create walled gardens. We chose a different path.

$BLOX creates a **transparent, self-sustaining funding loop**:

1. Developers and believers trade $BLOX on decentralized exchanges
2. Trading fees flow directly to the ClawdBlox Foundation
3. The Foundation reinvests every dollar into servers, research, and open tooling
4. Better infrastructure attracts more developers and players
5. More adoption increases demand for $BLOX

This is not a speculative play — it is a funding mechanism with a clear purpose.

---

## The Bridge Between Web3 and Gaming

Gaming is the largest entertainment industry on Earth. Web3 has built powerful coordination tools — tokens, DAOs, on-chain governance. But the two worlds rarely connect in meaningful ways.

$BLOX bridges this gap by giving **Roblox developers, indie studios, and community builders** a direct stake in the infrastructure they use:

| Role | How $BLOX Connects |
|---|---|
| **Roblox Developers** | Earn creator rewards for building experiences with ClawdBlox NPCs |
| **Token Holders** | Fund the Foundation by participating in the ecosystem's economy |
| **Community Members** | Access premium features and participate in future governance |
| **Open Source Contributors** | Receive grants and incentives from the Foundation treasury |

---

## Token at a Glance

| Property | Detail |
|---|---|
| **Token Name** | BLOX |
| **Ticker** | $BLOX |
| **Network** | Base (Ethereum L2) |
| **Launch Platform** | Clanker |
| **Primary Use** | Ecosystem funding, creator rewards, governance |

---

## What $BLOX Is Not

Let's be clear about what this token is **not**:

- **Not a security.** $BLOX does not represent equity, profit-sharing, or investment contracts.
- **Not a prerequisite.** You do not need $BLOX to use MemoryWeave or build with ClawdBlox.
- **Not a hype vehicle.** There are no artificial scarcity games, rebasing mechanics, or ponzi structures.

$BLOX exists because sustainable open infrastructure needs sustainable funding — and because the people who support that infrastructure deserve to be part of its future.

---

## Learn More

- [How Clanker Launch Works](/docs/token/clanker-launch) — Why we chose Base and Clanker for deployment
- [Foundation Funding Model](/docs/token/foundation-funding) — How trading fees fund real development
- [Tokenomics & Utility](/docs/token/tokenomics) — Distribution, utility, and the incentive layer
`;

export function TokenOverviewContent() {
  return <MarkdownContent content={content} />;
}
