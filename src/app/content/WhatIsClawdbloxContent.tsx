import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# What is ClawdBlox?

**ClawdBlox** is an AI NPC engine that gives non-player characters persistent memory, scientific personality modeling, and autonomous life simulation. It transforms static, scripted game characters into living entities that remember, learn, and evolve over time.

> **Traditional NPCs forget. Ours remember.**

---

## The Problem

Every gamer has experienced it: you save a village from destruction, defeat the dragon, return as a hero — and the blacksmith still greets you with *"Welcome, stranger."* NPCs in modern games are sophisticated in animation and voice acting, but fundamentally hollow. They run on decision trees, repeat canned dialogue, and treat every interaction as if it never happened.

This isn't just a minor inconvenience. It breaks immersion at the deepest level. Players stop seeing NPCs as characters and start seeing them as vending machines.

## The Solution

ClawdBlox provides a complete backend infrastructure that makes NPCs **actually intelligent**:

| Capability | What It Does |
|---|---|
| **Persistent Memory** | NPCs remember every meaningful interaction using vector embeddings (pgvector) |
| **OCEAN Personality** | Each NPC has a scientifically-grounded personality based on the Big Five model |
| **Life Simulation** | NPCs follow daily routines, pursue goals, and form relationships |
| **Cross-Platform Identity** | The same NPC can exist in Roblox, Discord, Telegram, and future platforms |
| **Emotional Intelligence** | NPCs track emotional states that influence their responses and decisions |

---

## Platform Components

ClawdBlox is composed of three core components:

### MemoryWeave Engine

The backend brain. MemoryWeave is an Express.js server backed by PostgreSQL (with pgvector for semantic search), Redis for caching, and Groq/OpenAI for language generation. It handles:

- **Memory storage and retrieval** — episodic, semantic, emotional, and procedural memories
- **Personality computation** — OCEAN trait scoring that shapes every response
- **Life simulation** — routines, goals, relationship tracking, and autonomous behavior
- **Conversation pipeline** — context assembly, prompt construction, and response generation

### CLAWD Agent (OpenClaw)

The operational layer. CLAWD is an AI agent that manages NPCs across Discord and Telegram. It acts as a relay — when a user messages an NPC in a community channel, CLAWD routes the message through MemoryWeave, generates a response in-character, and sends it back. CLAWD also provides admin commands for NPC management, personality tuning, and memory inspection.

### Dashboard

A web-based control panel for developers and project administrators. Create NPCs, configure personality traits, monitor conversations, inspect memories, and manage API keys — all from a clean UI.

---

## Use Cases

ClawdBlox is designed for developers building interactive experiences across multiple platforms:

- **Roblox Games** — Give your game NPCs persistent memory via our Luau SDK. A shopkeeper remembers who robbed them. A quest-giver adapts dialogue based on the player's reputation.
- **Discord Communities** — Deploy AI characters in your server that participate in conversations, remember community members, and develop ongoing relationships.
- **Telegram Groups** — Same NPC intelligence in Telegram, with full memory continuity across platforms.
- **Indie Game Studios** — Any game with an HTTP client can integrate MemoryWeave via REST API or WebSocket.

---

## Who Is This For?

- **Game developers** who want NPCs that feel alive without building an AI backend from scratch
- **Community managers** who want engaging AI characters in their Discord or Telegram
- **Web3 projects** looking for AI-powered interactive experiences
- **Anyone** who believes NPCs deserve better than scripted dialogue trees

---

## Tech Stack at a Glance

\`\`\`
Engine:      Express.js + TypeScript
Database:    PostgreSQL + pgvector (1536-dim embeddings)
Cache:       Redis
AI:          Groq / OpenAI (BYOK supported)
Auth:        JWT + API Keys + HMAC-SHA256 (player auth)
Platforms:   Roblox, Discord, Telegram (Unity/Unreal coming)
Token:       $BLOX on Base (via Clanker)
\`\`\`

---

## Getting Started

Ready to give your NPCs a memory? Head to the [Core Concepts](/docs/introduction/core-concepts) page to understand the building blocks, or jump straight into the [Architecture Overview](/docs/memoryweave/architecture) if you want to see how MemoryWeave works under the hood.
`;

export function WhatIsClawdbloxContent() {
  return <MarkdownContent content={content} />;
}
