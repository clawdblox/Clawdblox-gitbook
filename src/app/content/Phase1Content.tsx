import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Phase 1 — The Neural Foundation (Q1 2026)

> **Status: In Progress** — This is the current phase. The foundation is being laid.

Phase 1 is about building the bedrock that everything else depends on. Before NPCs can invade Roblox, before agents can trade with each other, before memory can be decentralized — there needs to be a rock-solid engine, a token, a dashboard, and a social presence. That's what this phase delivers.

---

## $BLOX Token Generation Event

**$BLOX launches on Base via Clanker.**

The $BLOX token is the economic backbone of the ClawdBlox ecosystem. Deployed on Base for its low fees and high throughput, $BLOX will power every transaction in the NPC economy — from creator rewards to API access to future governance.

Why Clanker? Because fair launches matter. No presale, no insider allocations, no VC dumps. $BLOX enters the world the way every token should: accessible to everyone from block one.

**Why it matters:** Without a token, there's no incentive layer. $BLOX aligns every participant — developers, players, node operators, and the NPCs themselves — around a shared economic system.

---

## Dashboard V1

**A web-based control panel for creating and managing AI-powered NPCs.**

The Dashboard is the first thing developers interact with. It provides:

- **AI-Powered NPC Creation** — Define a character concept and let the system generate OCEAN personality traits, backstory, speech patterns, and behavioral tendencies. Fine-tune everything manually or let the AI handle it.
- **Live Chat** — Talk to your NPCs directly from the dashboard. Test their personality, probe their memory, and iterate on their character in real time.
- **Memory Management** — Inspect the full memory graph of any NPC. See what they remember, how memories are weighted, and which ones are decaying. Search memories semantically to find exactly what you're looking for.
- **API Key Management** — Generate and manage \`mw_\` prefixed API keys for integrating MemoryWeave into your own applications.

**Why it matters:** The dashboard removes the barrier to entry. You don't need to understand vector embeddings or personality psychology to create a compelling NPC. The tools do the heavy lifting.

---

## Social Bridge — CLAWD on Telegram & Discord

**CLAWD becomes the living interface between communities and NPCs.**

Through OpenClaw, CLAWD connects to both Telegram and Discord, enabling:

- **NPC Relay** — Community members talk to NPCs directly in group chats using simple slash commands. The NPC responds in character, with full memory and personality.
- **Cross-Platform Identity** — A player who talks to an NPC on Discord can continue the conversation on Telegram. The NPC remembers everything regardless of platform.
- **Admin Workflows** — Project administrators can create, configure, and manage NPCs entirely through chat commands. No dashboard required for basic operations.
- **Identity Linking** — Players link their Discord, Telegram, and future Roblox identities into a single profile, giving NPCs a unified view of who they're talking to.

**Why it matters:** NPCs shouldn't be locked inside a game client. The Social Bridge makes them accessible anywhere your community already lives. This is the "Pocket AI" concept — your game characters, available from your phone, 24/7.

---

## OpenClaw Node Setup — Hive Mind Foundation

**The first step toward a global, shared NPC memory network.**

OpenClaw nodes are the infrastructure layer that will eventually support the Hive Mind — a distributed vector database where NPC memories can persist, replicate, and synchronize across servers and platforms. In Phase 1, this means:

- **Global Vector DB Architecture** — Designing and deploying the foundational schema for cross-server memory storage using pgvector with 1536-dimensional embeddings.
- **Node Identity Protocol** — Establishing how nodes authenticate, communicate, and share memory fragments.
- **Replication Strategy** — Defining how memories propagate across the network while maintaining consistency and respecting ownership boundaries.

This is groundwork. The nodes won't be fully decentralized yet — that comes in Phase 4. But the architecture decisions made now will determine whether decentralization is even possible later. We're building for the endgame from day one.

**Why it matters:** A centralized database is a single point of failure. If ClawdBlox is going to give NPCs permanent, indestructible memories, those memories can't depend on one server. The Hive Mind foundation ensures that the path to decentralization is baked into the architecture, not bolted on later.

---

## Phase 1 Deliverables Summary

| Deliverable | Status |
|---|---|
| $BLOX TGE on Base (Clanker) | In Progress |
| Dashboard V1 (NPC creation, live chat, memory management) | In Progress |
| CLAWD on Discord & Telegram (Social Bridge) | In Progress |
| OpenClaw Node Setup (Hive Mind foundation) | In Progress |

---

## What Comes Next

Phase 1 gives ClawdBlox its brain, its voice, and its economy. Phase 2 takes all of this and puts it where it matters most — inside the games themselves. Head to [Phase 2 — The Roblox Invasion](/docs/roadmap/phase-2) to see what's coming in Q2 2026.
`;

export function Phase1Content() {
  return <MarkdownContent content={content} />;
}
