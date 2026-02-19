import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Clanker Launch

$BLOX was launched on **Base** using **Clanker**, a decentralized token deployment protocol. This page explains what Clanker is, why we chose Base as our network, and how the launch mechanism works.

---

## What is Clanker?

Clanker is an autonomous token deployer built on Base. It allows projects to launch tokens with built-in liquidity and transparent fee structures — no centralized exchange listings, no seed rounds with lock-up theater, no opaque allocation deals.

Key properties of a Clanker launch:

- **Permissionless deployment** — Tokens go live on decentralized exchanges immediately
- **Built-in liquidity** — Initial liquidity is paired and locked at launch
- **Fee routing** — Trading fees are automatically directed to a designated address (in our case, the ClawdBlox Foundation)
- **No intermediaries** — No market makers, no listing fees, no gatekeepers

Clanker removes the friction and politics of traditional token launches. The token exists, it trades, and the fees go where they are supposed to go.

---

## Why Base?

We evaluated multiple networks before choosing Base as $BLOX's home chain. The decision came down to three factors:

### 1. Low Transaction Fees

Base is an Ethereum Layer 2 rollup, which means it inherits Ethereum's security while offering transactions at a fraction of the cost. For a token that needs to be accessible to game developers and community members — not just DeFi power users — affordable fees are non-negotiable.

| Network | Typical Swap Fee |
|---|---|
| Ethereum L1 | $5 – $50+ |
| Base L2 | $0.01 – $0.10 |

This difference matters. When a Roblox developer earning creator rewards wants to interact with $BLOX, they should not lose half their value to gas fees.

### 2. Coinbase Ecosystem

Base is built by Coinbase, the largest publicly traded cryptocurrency exchange. This provides:

- **Fiat on-ramps** — Users can bridge funds from Coinbase directly to Base with minimal friction
- **Institutional credibility** — Base is not an experimental chain; it is backed by a publicly audited company
- **Developer tooling** — Robust RPC infrastructure, block explorers, and integration libraries
- **Growing user base** — Millions of Coinbase users have native access to Base

For a project targeting mainstream game developers (many of whom are crypto-curious but not crypto-native), the Coinbase connection removes significant onboarding barriers.

### 3. Growing DeFi Ecosystem

Base has rapidly become one of the most active DeFi ecosystems in crypto:

- Deep liquidity on decentralized exchanges (Uniswap, Aerodrome, etc.)
- Active builder community deploying new protocols weekly
- Cross-chain bridges connecting Base to Ethereum, Arbitrum, Optimism, and others
- Growing NFT and gaming verticals that align with ClawdBlox's audience

$BLOX benefits from being on a chain where DeFi infrastructure already exists and is expanding — rather than being an early token on an unproven chain hoping for liquidity.

---

## How the Launch Works

The $BLOX launch via Clanker followed a straightforward sequence:

\`\`\`
1. Token contract deployed on Base via Clanker
2. Initial liquidity paired and locked
3. Trading goes live on decentralized exchanges
4. Trading fees automatically route to ClawdBlox Foundation wallet
5. Foundation wallet is publicly verifiable on-chain
\`\`\`

There was no presale, no private round, and no VC allocation. The token launched in the open, and anyone could participate from the first block.

---

## Verifiability

Every aspect of the $BLOX launch is verifiable on-chain:

- **Token contract** — Viewable on BaseScan
- **Liquidity position** — Locked and verifiable
- **Fee destination** — Foundation wallet address is public
- **Trading history** — Every transaction recorded on Base

This is not "trust us" transparency. It is "verify it yourself" transparency.

---

## Learn More

- [$BLOX Token Overview](/docs/token/overview) — What $BLOX is and why it exists
- [Foundation Funding Model](/docs/token/foundation-funding) — How trading fees become infrastructure
- [Tokenomics & Utility](/docs/token/tokenomics) — Distribution and utility breakdown
`;

export function ClankerLaunchContent() {
  return <MarkdownContent content={content} />;
}
