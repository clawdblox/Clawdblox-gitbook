import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Admin Management Skills

CLAWD provides a comprehensive set of admin-only skills for managing NPCs entirely through chat. No dashboard required, no configuration files to edit — just talk to CLAWD and it handles the rest. Every aspect of NPC lifecycle management is available as a conversational command.

> **Manage your entire NPC ecosystem without leaving Discord or Telegram.**

---

## NPC CRUD Operations

Admins can create, read, update, and delete NPCs through natural conversation with CLAWD.

### Create an NPC

\`\`\`
Admin:   @CLAWD create npc
CLAWD:   Starting NPC creation. What's the NPC's name?
Admin:   Finn
CLAWD:   What role does Finn play?
Admin:   A traveling bard who collects stories from adventurers
CLAWD:   Got it. Let's configure Finn's OCEAN personality traits.
         Rate each from 0.0 to 1.0:
         • Openness (creativity, curiosity)?
Admin:   0.9
CLAWD:   • Conscientiousness (organization, discipline)?
Admin:   0.3
...
CLAWD:   ✅ Finn has been created!
         Name: Finn
         Role: Traveling bard
         OCEAN: O:0.9 C:0.3 E:0.8 A:0.7 N:0.2
         Status: Active
\`\`\`

### List NPCs

\`\`\`
Admin:   @CLAWD list npcs
CLAWD:   NPCs in project "MyRPG" (4):

         ┌─────────┬────────────────────┬────────────┐
         │ Name    │ Role               │ Status     │
         ├─────────┼────────────────────┼────────────┤
         │ Aurora  │ Adventurer         │ Active     │
         │ Marcus  │ Blacksmith         │ Active     │
         │ Zara    │ Merchant           │ Active     │
         │ Finn    │ Traveling bard     │ Active     │
         └─────────┴────────────────────┴────────────┘
\`\`\`

### Update an NPC

\`\`\`
Admin:   @CLAWD update aurora's role to "veteran explorer and guild leader"
CLAWD:   ✅ Aurora's role updated.
         Previous: Adventurer and explorer
         New: Veteran explorer and guild leader
\`\`\`

### Delete an NPC

\`\`\`
Admin:   @CLAWD delete npc finn
CLAWD:   ⚠️ This will permanently delete Finn and all associated data
         (memories, relationships, routines, goals).
         Type "confirm" to proceed.
Admin:   confirm
CLAWD:   ✅ Finn has been deleted.
\`\`\`

---

## Memory Management

CLAWD gives admins full visibility into and control over NPC memories.

### Inspect Memories

\`\`\`
Admin:   @CLAWD show aurora's memories about the cave
CLAWD:   Found 4 memories matching "cave":

         1. [Episodic] Explored the crystal cave with Player123
            Importance: 0.85 | Created: 2 days ago
            "We discovered a hidden passage behind the waterfall..."

         2. [Emotional] Fear response during cave spider attack
            Importance: 0.92 | Created: 2 days ago
            "The spiders came from everywhere. Nearly lost my hand..."

         3. [Semantic] Crystal caves contain rare minerals
            Importance: 0.45 | Created: 3 days ago

         4. [Procedural] Use torches near crystal walls for visibility
            Importance: 0.38 | Created: 3 days ago
\`\`\`

### Search Memories

\`\`\`
Admin:   @CLAWD search marcus memories about trust
CLAWD:   Semantic search results for "trust" in Marcus's memories:

         1. [Episodic] Player456 returned the stolen hammer (similarity: 0.91)
         2. [Emotional] Gratitude toward Player456 (similarity: 0.87)
         3. [Episodic] Player789 tried to haggle unfairly (similarity: 0.72)
\`\`\`

### Manage Memories

Admins can also delete specific memories or clear memory categories when needed:

\`\`\`
Admin:   @CLAWD delete aurora memory #2
CLAWD:   ✅ Deleted emotional memory: "Fear response during cave spider attack"
\`\`\`

---

## Routine Management

NPCs in ClawdBlox follow daily routines that influence their behavior and availability. Admins configure these through CLAWD.

### Set Up a Routine

\`\`\`
Admin:   @CLAWD set routine for marcus
CLAWD:   Let's define Marcus's daily schedule. Use 24h format.

Admin:   6:00 - Wake up, light the forge
         8:00 - Open shop, start taking orders
         12:00 - Lunch break at the tavern
         13:00 - Back to forging
         18:00 - Close shop, clean up
         20:00 - Dinner and drinks at the tavern
         22:00 - Sleep

CLAWD:   ✅ Routine set for Marcus:
         06:00  Wake up, light the forge
         08:00  Open shop, start taking orders
         12:00  Lunch break at the tavern
         13:00  Back to forging
         18:00  Close shop, clean up
         20:00  Dinner and drinks at the tavern
         22:00  Sleep

         Marcus will reference his current activity when
         players interact with him.
\`\`\`

When a player talks to Marcus at 14:00, he might say: *"Can't talk long — I've got three swords to finish before sundown."*

---

## Goal Management

Goals give NPCs long-term objectives that shape their behavior and conversation topics.

### Assign Goals

\`\`\`
Admin:   @CLAWD add goal for aurora: "Find the legendary Starforge hidden
         in the northern mountains"
CLAWD:   ✅ Goal added for Aurora:
         "Find the legendary Starforge hidden in the northern mountains"
         Priority: Normal
         Status: Active

         Aurora will now reference this goal in relevant conversations
         and may ask players for help.
\`\`\`

### View Goals

\`\`\`
Admin:   @CLAWD show aurora goals
CLAWD:   Aurora's active goals:

         1. 🎯 Find the legendary Starforge (Priority: High)
            Status: In progress — gathered 2 of 4 map fragments
         2. 🎯 Train with a dagger (Priority: Normal)
            Status: Active — practicing daily
         3. 🎯 Repay debt to Zara (Priority: Low)
            Status: Pending — needs 50 gold
\`\`\`

---

## Relationship Management

NPCs form relationships with players over time. Admins can view and manage these relationships.

### View Relationships

\`\`\`
Admin:   @CLAWD show aurora relationships
CLAWD:   Aurora's relationships:

         ┌─────────────┬───────────────┬───────┬──────────────┐
         │ Player      │ Type          │ Trust │ Last Seen    │
         ├─────────────┼───────────────┼───────┼──────────────┤
         │ Player123   │ Close friend  │ 0.89  │ 2 hours ago  │
         │ Player456   │ Ally          │ 0.72  │ 1 day ago    │
         │ Player789   │ Acquaintance  │ 0.34  │ 5 days ago   │
         │ Player101   │ Rival         │ 0.15  │ 3 days ago   │
         └─────────────┴───────────────┴───────┴──────────────┘
\`\`\`

### Modify Relationships

\`\`\`
Admin:   @CLAWD reset aurora relationship with player789
CLAWD:   ⚠️ This will reset Aurora's relationship with Player789
         to neutral (trust: 0.5, type: stranger).
         All relationship memories will be preserved.
         Confirm?
Admin:   confirm
CLAWD:   ✅ Relationship reset. Aurora now treats Player789 as a stranger.
\`\`\`

---

## Step-by-Step NPC Onboarding

For new projects or admins unfamiliar with the system, CLAWD offers a guided onboarding workflow that walks through every aspect of NPC creation:

\`\`\`
Admin:   @CLAWD onboard new npc
CLAWD:   Welcome to the NPC Onboarding Wizard! I'll walk you through
         creating a fully configured NPC in 6 steps:

         Step 1/6 — Identity
         Step 2/6 — Personality (OCEAN traits)
         Step 3/6 — Backstory & Role
         Step 4/6 — Daily Routine
         Step 5/6 — Goals & Motivations
         Step 6/6 — Initial Relationships

         Let's begin. What's your NPC's name?
\`\`\`

The wizard ensures no configuration step is missed and produces a fully operational NPC ready for player interactions.

---

## Built-in Troubleshooting

When something goes wrong, CLAWD provides diagnostic tools to help admins identify and resolve issues:

### Health Check

\`\`\`
Admin:   @CLAWD health check
CLAWD:   System health report:

         MemoryWeave API:    ✅ Connected (latency: 42ms)
         Database:           ✅ Healthy
         Redis Cache:        ✅ Connected
         AI Provider:        ✅ Groq responding (latency: 180ms)
         Active NPCs:        4/4 operational
         WebSocket:          ✅ 12 active connections
\`\`\`

### NPC Diagnostics

\`\`\`
Admin:   @CLAWD diagnose aurora
CLAWD:   Diagnostics for Aurora:

         Identity:       ✅ Valid
         Personality:    ✅ OCEAN traits configured
         Memories:       ✅ 247 memories (oldest: 14 days)
         Routine:        ✅ 7 time slots defined
         Goals:          ✅ 3 active goals
         Relationships:  ✅ 4 tracked relationships
         Last Response:  2 minutes ago (latency: 1.8s)
         Error Rate:     0.0% (last 24h)
\`\`\`

### Common Issues

\`\`\`
Admin:   @CLAWD why isn't marcus responding?
CLAWD:   Running diagnostics on Marcus...

         ⚠️ Issue found: Marcus's AI provider key has expired.
         The BYOK key associated with this project was last
         validated 8 days ago and is no longer valid.

         Fix: Update the API key in the dashboard or use
         @CLAWD update project api-key
\`\`\`

---

## Admin Permissions

Admin skills are restricted to users with the appropriate role:

| Role | Capabilities |
|---|---|
| **Owner** | Full access — CRUD, memory, config, deletion |
| **Admin** | NPC management, memory inspection, routine/goal editing |
| **Moderator** | View NPCs, inspect memories, basic diagnostics |
| **User** | NPC relay and utility commands only |

Permissions are managed per-project and can be configured through the dashboard or via CLAWD's admin commands.

---

## Next Steps

- Understand how identities persist across platforms in [Cross-Platform Identity](/docs/clawd/cross-platform-identity)
- See the full relay system in [NPC Relay](/docs/clawd/npc-relay)
- Explore what's coming in [Future Features & Roadmap](/docs/clawd/future-features)
`;

export function AdminSkillsContent() {
  return <MarkdownContent content={content} />;
}
