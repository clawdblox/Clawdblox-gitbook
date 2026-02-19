import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# What is CLAWD?

**CLAWD** is an autonomous AI agent built on Claude that serves as the operational layer of ClawdBlox. It manages NPCs across Discord and Telegram, acting as a bridge between messaging platforms and the MemoryWeave engine. Think of it as **your NPC assistant that never sleeps** — always online, always in character, always remembering.

> **CLAWD doesn't just relay messages. It orchestrates entire NPC ecosystems.**

---

## How It Works

CLAWD is part of **OpenClaw**, an open-source agent framework designed for multi-platform NPC management. At its core, CLAWD operates as a skill-based agent: it receives inputs from Discord and Telegram, interprets user intent, routes messages through MemoryWeave for context-aware response generation, and delivers responses back in character.

\`\`\`
User sends /aurora Hello!
        │
        ▼
   CLAWD Agent
   (Discord / Telegram)
        │
        ▼
  MemoryWeave Engine
  ┌─────────────────┐
  │ Memory Retrieval │
  │ Personality Calc │
  │ Context Assembly │
  │ Response Gen     │
  └─────────────────┘
        │
        ▼
  Aurora responds in character,
  remembering past conversations
\`\`\`

---

## What CLAWD Can Do

CLAWD operates on two levels: **user-facing** (NPC relay and utility commands) and **admin-facing** (full NPC lifecycle management).

### For Users

| Feature | Description |
|---|---|
| **NPC Relay** | Talk to any NPC using \`/npcname message\` from Telegram or Discord |
| **NPC Discovery** | List all available NPCs with \`/npcs\` |
| **Identity Linking** | Link your Discord, Telegram, and Roblox identities with \`/link\` |
| **Identity Check** | See your linked accounts and player info with \`/whoami\` |

### For Admins

| Feature | Description |
|---|---|
| **NPC CRUD** | Create, update, configure, and delete NPCs entirely via chat |
| **Memory Management** | Inspect, search, and manage NPC memories |
| **Routine & Goals** | Set up daily routines and long-term goals for NPCs |
| **Relationship Management** | View and manage NPC-player relationships |
| **Onboarding Workflow** | Step-by-step guided NPC creation |
| **Troubleshooting** | Built-in diagnostics and debugging tools |

---

## Demo: Possible Interactions

Here's what interacting with CLAWD looks like in practice:

### Talking to an NPC

\`\`\`
You:     /aurora Hey Aurora, remember when we explored the cave last week?
Aurora:  Of course! That was intense — especially when you triggered
         that trap near the crystal chamber. I still have the scar
         from the falling rocks. Want to go back? I think we missed
         a passage on the east side.
\`\`\`

### Discovering Available NPCs

\`\`\`
You:     /npcs
CLAWD:   📋 Available NPCs (3):
         • Aurora — Adventurer and explorer, curious personality
         • Marcus — Village blacksmith, grumpy but loyal
         • Zara — Mysterious merchant, knows everyone's secrets
\`\`\`

### Linking Your Identity

\`\`\`
You:     /link
CLAWD:   🔗 Your linking code is: 847291
         Enter this code in-game or on another platform
         to connect your identities. Code expires in 5 minutes.
\`\`\`

### Admin: Creating an NPC

\`\`\`
Admin:   @CLAWD create a new NPC
CLAWD:   Let's set up your new NPC step by step.
         What's their name?
Admin:   Finn
CLAWD:   Great! What role does Finn play? (e.g., merchant, guard, healer)
Admin:   He's a traveling bard who collects stories
CLAWD:   Perfect. Now let's define Finn's personality using OCEAN traits...
\`\`\`

---

## The "Pocket AI" Concept

One of CLAWD's most compelling features is what we call **Pocket AI**: your Roblox NPCs, accessible from your phone. A player can have a meaningful conversation with an NPC inside a Roblox game, then continue that exact conversation from Telegram while on the bus. The NPC remembers everything — the context, the relationship, the emotional state — regardless of where the interaction happens.

This transforms NPCs from game-locked entities into **persistent companions** that exist across your digital life.

---

## Architecture at a Glance

\`\`\`
┌──────────────┐     ┌──────────────┐
│   Discord    │     │   Telegram   │
│   Gateway    │     │   Bot API    │
└──────┬───────┘     └──────┬───────┘
       │                    │
       └────────┬───────────┘
                │
         ┌──────▼──────┐
         │    CLAWD    │
         │   Agent     │
         │  (OpenClaw) │
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │ MemoryWeave │
         │   Engine    │
         └─────────────┘
\`\`\`

CLAWD connects to MemoryWeave via its REST API and WebSocket interface, using authenticated API keys with the \`mw_\` prefix. Every message routed through CLAWD carries the full context of the player's identity, the NPC's personality, and their shared history.

---

## Next Steps

- Learn how the [NPC Relay](/docs/clawd/npc-relay) system works in detail
- Explore [Admin Management Skills](/docs/clawd/admin-skills) for NPC lifecycle management
- Understand the [Cross-Platform Identity](/docs/clawd/cross-platform-identity) system
- See what's coming in [Future Features & Roadmap](/docs/clawd/future-features)
`;

export function WhatIsClawdContent() {
  return <MarkdownContent content={content} />;
}
