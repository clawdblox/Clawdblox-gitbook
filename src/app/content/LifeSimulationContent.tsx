import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Life Simulation

ClawdBlox NPCs do not just respond to players — they live. The Life System gives every NPC a daily schedule, personal goals, and evolving relationships. These elements run in the background and dynamically influence how the NPC speaks, what they talk about, and how available they are at any given moment.

---

## Overview

\`\`\`
                        Life System
                        ~~~~~~~~~~~

  +------------------+    +------------------+    +------------------+
  |    ROUTINES      |    |      GOALS       |    |  RELATIONSHIPS   |
  |                  |    |                  |    |                  |
  |  What is the NPC |    |  What does the   |    |  How does the    |
  |  doing right now?|    |  NPC want?       |    |  NPC feel about  |
  |                  |    |                  |    |  this player?    |
  +--------+---------+    +--------+---------+    +--------+---------+
           |                       |                       |
           +-------------------+---+-----------------------+
                               |
                               v
                    +---------------------+
                    | Conversation Context |
                    |                     |
                    | Injected into the   |
                    | system prompt before |
                    | every AI response   |
                    +---------------------+
\`\`\`

---

## Routines

Routines define what an NPC is doing at any given time. They are time-based schedules that map hours of the day to activities.

### Structure

\`\`\`typescript
interface Routine {
  hour: number;              // 0-23
  day: string;               // "monday" | "tuesday" | ... | "everyday"
  activity: string;          // Free-text description of current activity
  interruptibility: number;  // 0.0 - 1.0 (how easily can the player interrupt?)
}
\`\`\`

### Example: A Blacksmith's Daily Routine

| Hour | Day | Activity | Interruptibility |
|---|---|---|---|
| 06:00 | everyday | Waking up, eating breakfast in the back room | 0.3 |
| 07:00 | everyday | Opening the shop, stoking the forge | 0.7 |
| 08:00 | everyday | Working at the forge — hammering, shaping metal | 0.4 |
| 12:00 | everyday | Lunch break, sitting outside the shop | 0.9 |
| 13:00 | everyday | Back to work — filling orders, repairing tools | 0.5 |
| 17:00 | everyday | Cleaning up the shop, organizing inventory | 0.8 |
| 18:00 | everyday | Dinner at the tavern with friends | 0.6 |
| 20:00 | everyday | Reading by candlelight at home | 0.2 |
| 22:00 | everyday | Sleeping | 0.0 |
| 10:00 | sunday | Visiting the market to buy supplies | 0.9 |
| 14:00 | sunday | Fishing by the river (day off) | 1.0 |

### Interruptibility

The interruptibility score (0.0 to 1.0) determines how the NPC reacts when a player initiates conversation:

| Score | Behavior |
|---|---|
| **0.0** | Cannot be interrupted. NPC is unavailable (sleeping, in a meeting, etc.) |
| **0.1 - 0.3** | Very reluctant. Short, distracted responses: *"Can this wait? I'm busy."* |
| **0.4 - 0.6** | Willing but divided. May reference their current task: *"I can talk, but I need to keep an eye on the forge."* |
| **0.7 - 0.8** | Available. Happy to chat: *"Perfect timing, I was just taking a break."* |
| **0.9 - 1.0** | Fully available. Eager to engage: *"Oh, hello! I was hoping someone would come by."* |

### How Routines Affect Conversations

The NPC's current routine is injected into the system prompt:

\`\`\`
[CURRENT ROUTINE]
It is currently 08:30 AM on a Wednesday.
You are: Working at the forge — hammering, shaping metal.
Interruptibility: 0.4 (you are busy but can spare a moment).
Your next activity: Lunch break at 12:00 PM.
[/CURRENT ROUTINE]
\`\`\`

This means the NPC will naturally:
- Reference what they are doing (*"Hold on, let me finish this piece..."*)
- Adjust their tone based on availability (hurried vs. relaxed)
- Mention upcoming plans (*"I'll have more time after lunch"*)

---

## Goals

Goals give NPCs motivation beyond reacting to player input. They represent what the NPC wants to achieve, creating organic conversation topics and driving proactive behavior.

### Goal Hierarchy

Goals are organized in a parent-child hierarchy with priorities:

\`\`\`
Goal: "Become the best blacksmith in the region"
├── Priority: 90
├── Status: active
│
├── Sub-goal: "Master the ancient tempering technique"
│   ├── Priority: 85
│   ├── Status: active
│   └── Sub-goal: "Find the rare blue iron ore"
│       ├── Priority: 70
│       └── Status: active
│
├── Sub-goal: "Win the annual smithing competition"
│   ├── Priority: 75
│   └── Status: active
│
└── Sub-goal: "Repair the legendary sword of Aldric"
    ├── Priority: 60
    └── Status: blocked (missing materials)
\`\`\`

### Structure

\`\`\`typescript
interface Goal {
  id: string;
  npc_id: string;
  parent_id: string | null;    // null = top-level goal
  title: string;
  description: string;
  priority: number;            // 0-100
  status: GoalStatus;          // "active" | "completed" | "failed" | "blocked"
}
\`\`\`

### How Goals Affect Conversations

Active goals are injected into context, ordered by priority:

\`\`\`
[GOALS]
Your current goals (ordered by priority):
1. (priority: 90) Become the best blacksmith in the region
   - You are actively pursuing this and it matters deeply to you.
2. (priority: 85) Master the ancient tempering technique
   - You have been researching this for months.
3. (priority: 75) Win the annual smithing competition
   - The competition is in two weeks and you are preparing.
4. (priority: 70) Find the rare blue iron ore
   - You have heard rumors it can be found in the northern caves.
5. (priority: 60, BLOCKED) Repair the legendary sword of Aldric
   - You cannot proceed until you find the missing materials.
[/GOALS]
\`\`\`

This causes the NPC to:
- Bring up goals naturally in conversation (*"Say, you haven't seen any blue iron ore in your travels, have you?"*)
- React emotionally to goal-related topics (*"The smithing competition? Don't even get me started — I've been practicing day and night."*)
- Ask players for help with blocked goals
- Express satisfaction or frustration based on goal progress

---

## Relationships

Every NPC tracks its relationship with each player across three dimensions:

### Dimensions

| Dimension | Range | What It Measures |
|---|---|---|
| **Affinity** | -100 to +100 | How much the NPC likes or dislikes the player |
| **Trust** | 0 to 100 | How much the NPC trusts the player's word and intentions |
| **Familiarity** | 0 to 100 | How well the NPC knows the player (interaction frequency) |

### Structure

\`\`\`typescript
interface Relationship {
  npc_id: string;
  player_id: string;
  affinity: number;          // -100 to +100
  trust: number;             // 0 to 100
  familiarity: number;       // 0 to 100
  interaction_count: number; // total number of conversations
  last_interaction: Date;    // timestamp of last conversation
}
\`\`\`

### How Relationships Evolve

Relationships update automatically after each conversation based on AI analysis of the interaction:

\`\`\`
  Conversation Ends
        |
        v
  +---------------------------+
  | Relationship Analysis      |
  | (LLM evaluates the tone,   |
  |  helpfulness, honesty, and  |
  |  depth of the interaction)  |
  +---------------------------+
        |
        v
  Affinity:    +3  (player was friendly and helpful)
  Trust:       +2  (player followed through on a promise)
  Familiarity: +5  (another interaction logged)
\`\`\`

### Relationship Tiers

The combination of affinity, trust, and familiarity creates emergent relationship tiers:

| Tier | Affinity | Trust | Familiarity | NPC Behavior |
|---|---|---|---|---|
| **Stranger** | ~0 | 0-20 | 0-15 | Formal, guarded, generic dialogue |
| **Acquaintance** | 10-30 | 15-40 | 15-35 | Friendly, remembers name, basic small talk |
| **Friend** | 30-60 | 40-65 | 35-60 | Warm, shares personal stories, offers help |
| **Close Friend** | 60-85 | 65-85 | 60-80 | Confides secrets, asks for advice, deep loyalty |
| **Best Friend** | 85-100 | 85-100 | 80-100 | Unconditional support, inside jokes, shared history |
| **Rival** | -30 to -60 | 20-50 | 30-60 | Competitive, snarky, reluctant respect |
| **Enemy** | -60 to -100 | 0-15 | 40-100 | Hostile, refuses help, may threaten or attack |

### How Relationships Affect Conversations

\`\`\`
[RELATIONSHIP]
Your relationship with this player:
- Affinity: +47 (you like this player — they have been kind to you)
- Trust: 55 (you trust them reasonably, but they have not been fully tested)
- Familiarity: 62 (you know them well — 23 previous conversations)
- Last interaction: 2 days ago
- Tier: Friend

Adjust your behavior accordingly. You are warm and open with this player.
You share personal stories and are willing to ask for help. You remember
your shared history fondly.
[/RELATIONSHIP]
\`\`\`

---

## The Full Life Context

During a conversation, all three life systems combine into a single context block:

\`\`\`
+------------------------------------------------------------------+
|                    SYSTEM PROMPT CONTEXT                          |
|                                                                  |
|  [PERSONALITY]   OCEAN scores + speaking style                   |
|  [MEMORIES]      Relevant retrieved memories                     |
|  [ROUTINE]       Current time, activity, interruptibility        |
|  [GOALS]         Active goals sorted by priority                 |
|  [RELATIONSHIP]  Affinity / trust / familiarity with this player |
|                                                                  |
+------------------------------------------------------------------+
                              |
                              v
                     AI Response Generation
\`\`\`

This means an NPC's response is simultaneously shaped by:
- **Who they are** (personality)
- **What they remember** (memories)
- **What they are doing** (routine)
- **What they want** (goals)
- **How they feel about the player** (relationship)

The result is responses that feel genuinely alive — an NPC who is busy at the forge, working toward a competition, remembers you helped them last week, and considers you a friend will respond very differently than the same NPC who is relaxing on a Sunday, has no pressing goals, is meeting you for the first time, and has a different personality.

---

## What's Next?

- [Conversation Pipeline](/docs/memoryweave/conversation-pipeline) — How all this context is assembled into prompts
- [Personality System](/docs/memoryweave/personality-system) — The OCEAN model in depth
- [Semantic Memory](/docs/memoryweave/semantic-memory) — How memories are stored and retrieved
`;

export function LifeSimulationContent() {
  return <MarkdownContent content={content} />;
}
