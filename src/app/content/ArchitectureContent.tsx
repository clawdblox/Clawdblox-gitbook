import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Architecture Overview

MemoryWeave is the backend brain of ClawdBlox. It is a modular, event-driven server built with Express.js and TypeScript, backed by PostgreSQL (with pgvector for semantic search), Redis for caching and session management, and Groq/OpenAI for language generation.

This page explains how all the pieces fit together — from the moment a player sends a message to the moment they receive a response.

---

## High-Level Flow

\`\`\`
                         ClawdBlox Architecture
                         ~~~~~~~~~~~~~~~~~~~~~~

  Player / Client                  MemoryWeave Server
  ================                 ===========================================

  +-------------+    WebSocket     +-------------------------------------------+
  |   Roblox    |----------------->|                                           |
  |   Game      |    (wss://)      |   +------------------+                    |
  +-------------+                  |   | Auth & Handshake |                    |
                                   |   | (JWT / API Key / |                    |
  +-------------+    REST API      |   |  HMAC-SHA256)    |                    |
  |  Dashboard  |----------------->|   +--------+---------+                    |
  |   (Web UI)  |   (https://)     |            |                              |
  +-------------+                  |            v                              |
                                   |   +------------------+                    |
  +-------------+    CLAWD Agent   |   | Conversation     |   +----------+    |
  |  Discord /  |----------------->|   | Pipeline         |-->| Groq /   |    |
  |  Telegram   |   (REST API)    |   |                  |<--| OpenAI   |    |
  +-------------+                  |   | - System prompt  |   +----------+    |
                                   |   | - Injection scan |                    |
                                   |   | - Context build  |                    |
                                   |   | - Token stream   |                    |
                                   |   +--------+---------+                    |
                                   |            |                              |
                                   |            v                              |
                                   |   +------------------+   +----------+    |
                                   |   | Memory           |-->| pgvector |    |
                                   |   | Extraction       |<--| (1536-d) |    |
                                   |   +------------------+   +----------+    |
                                   |            |                              |
                                   |            v                              |
                                   |   +------------------+   +----------+    |
                                   |   | Life System      |-->| Redis    |    |
                                   |   | (Routines/Goals/ |<--| Cache    |    |
                                   |   |  Relationships)  |   +----------+    |
                                   |   +------------------+                    |
                                   +-------------------------------------------+
\`\`\`

---

## Core Components

### 1. WebSocket Gateway

The primary real-time communication layer between game clients and MemoryWeave. Handles:

- **Connection authentication** — JWT tokens, API keys, or HMAC-SHA256 player signatures
- **Message routing** — dispatches incoming messages to the conversation pipeline
- **Token streaming** — sends AI-generated tokens back to the client in real-time
- **7 security protections** — auth timeout, heartbeat, inactivity detection, connection limits, message size caps, rate limiting, and graceful shutdown

All game clients (Roblox, Unity, Unreal) connect via WebSocket for low-latency, bidirectional communication.

### 2. REST API

A traditional HTTP API used by the Dashboard and CLAWD agent for CRUD operations:

| Endpoint Group | Purpose |
|---|---|
| \`/api/auth\` | User registration, login, JWT refresh |
| \`/api/projects\` | Project creation and management |
| \`/api/npcs\` | NPC creation, personality config, memory inspection |
| \`/api/conversations\` | Conversation history and management |
| \`/api/memories\` | Memory search, inspection, manual creation |
| \`/api/life\` | Routines, goals, and relationship management |

### 3. Conversation Pipeline

The heart of MemoryWeave. When a message arrives, the pipeline:

1. **Validates** the input (sanitization, injection detection)
2. **Retrieves context** — relevant memories, current routine, active goals, relationship data
3. **Builds the system prompt** — assembles all context into a coherent instruction set for the AI
4. **Streams the response** — sends tokens back via WebSocket as they are generated
5. **Extracts memories** — after the conversation, identifies and stores important facts as vector embeddings

See [Conversation Pipeline](/docs/memoryweave/conversation-pipeline) for the full deep dive.

### 4. Memory System

Memories are stored as 1536-dimensional vector embeddings in PostgreSQL using the pgvector extension. This enables:

- **Semantic search** — find memories by meaning, not just keywords
- **Importance-based decay** — trivial memories fade over time, important ones persist
- **Automatic extraction** — the AI identifies memorable facts from conversations without manual tagging

See [Semantic Memory](/docs/memoryweave/semantic-memory) for the full deep dive.

### 5. Life System

NPCs are not just conversational agents — they simulate a life:

- **Routines** — hourly and daily schedules that determine what the NPC is doing right now
- **Goals** — hierarchical objectives with priorities that influence conversation topics
- **Relationships** — affinity, trust, and familiarity scores per player, updated after each interaction

See [Life Simulation](/docs/memoryweave/life-simulation) for the full deep dive.

### 6. Personality Engine

Each NPC has a scientifically-grounded personality based on the OCEAN (Big Five) model. The personality influences:

- Word choice, sentence structure, and formality level
- Emotional reactions and mood shifts
- Willingness to help, argue, joke, or share personal information

See [Personality System](/docs/memoryweave/personality-system) for the full deep dive.

---

## Server Modules

MemoryWeave is organized into 6 domain modules, each with its own routes, services, and database queries:

\`\`\`
apps/server/src/modules/
├── user/            # Authentication, user accounts, API keys
├── project/         # Project management, settings, BYOK config
├── npc/             # NPC creation, personality, speaking style
├── conversation/    # Pipeline, streaming, message history
├── memory/          # Vector storage, retrieval, extraction, decay
└── life/            # Routines, goals, relationships
\`\`\`

Each module follows a clean architecture pattern:

\`\`\`
module/
├── module.routes.ts       # Express route definitions
├── module.service.ts      # Business logic
├── module.queries.ts      # Database queries (raw SQL)
├── module.schemas.ts      # Zod validation schemas
└── module.types.ts        # TypeScript type definitions
\`\`\`

---

## Shared Package

Common types, schemas, and constants live in \`packages/shared/\`:

| Export | Purpose |
|---|---|
| Zod schemas | Input validation shared between server and clients |
| TypeScript types | Shared type definitions for NPC, Memory, Conversation, etc. |
| OCEAN constants | Trait ranges, default values, scoring boundaries |
| Decay constants | Memory decay rates and importance thresholds |
| WebSocket codes | Custom close codes and message type enums |
| Role definitions | Permission levels (owner, admin, member) |

---

## Database Schema

PostgreSQL with 9 migration files:

\`\`\`
database/migrations/
├── 001_users.sql           # User accounts, hashed passwords
├── 002_projects.sql        # Projects, settings, encrypted BYOK keys
├── 003_api_keys.sql        # API keys (mw_ prefix, bcrypt-hashed)
├── 004_npcs.sql            # NPC profiles, OCEAN traits, speaking style
├── 005_conversations.sql   # Conversation sessions, message history
├── 006_memories.sql        # Vector embeddings (1536-dim), metadata
├── 007_routines.sql        # Hourly/daily schedules, interruptibility
├── 008_goals.sql           # Goal hierarchy, priorities, status
└── 009_relationships.sql   # Per-player affinity, trust, familiarity
\`\`\`

pgvector is enabled via the \`CREATE EXTENSION vector;\` statement in the first migration, and the memories table uses a \`vector(1536)\` column with an IVFFlat index for fast cosine similarity search.

---

## Infrastructure

\`\`\`
Docker Compose Stack
====================

+------------------+     +------------------+     +------------------+
|   MemoryWeave    |     |   PostgreSQL     |     |     Redis        |
|   Server         |---->|   + pgvector     |     |                  |
|   (Node.js)      |     |                  |     |                  |
|   Port: 3000     |     |   Port: 5432     |     |   Port: 6379     |
+------------------+     +------------------+     +------------------+
        |                                                  ^
        |                                                  |
        +--------------------------------------------------+
                        Session cache, rate limiting
\`\`\`

- **Docker Compose** handles orchestration with separate dev and prod configurations
- **PostgreSQL + pgvector** stores all persistent data including vector embeddings
- **Redis** provides caching for sessions, rate limiting counters, and temporary state
- **Node.js server** runs the Express + WebSocket application

---

## What's Next?

- [Semantic Memory](/docs/memoryweave/semantic-memory) — How vector embeddings power NPC recall
- [Personality System](/docs/memoryweave/personality-system) — The OCEAN model and speaking styles
- [Life Simulation](/docs/memoryweave/life-simulation) — Routines, goals, and relationships
- [Conversation Pipeline](/docs/memoryweave/conversation-pipeline) — From message to streamed response
- [Security & Infrastructure](/docs/memoryweave/security) — Auth, encryption, and hardening
`;

export function ArchitectureContent() {
  return <MarkdownContent content={content} />;
}
