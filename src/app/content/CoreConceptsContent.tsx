import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Core Concepts

This page explains the fundamental building blocks of ClawdBlox. Understanding these concepts will help you design better NPCs and get the most out of the MemoryWeave engine.

---

## OCEAN Personality Model (Big Five)

Every NPC in ClawdBlox has a personality defined by the **OCEAN model**, the most widely validated framework in personality psychology. Each trait is scored on a scale from \`-1.0\` (very low) to \`+1.0\` (very high).

### The Five Traits

| Trait | High Score | Low Score |
|---|---|---|
| **O** — Openness | Curious, creative, adventurous | Practical, conventional, routine-oriented |
| **C** — Conscientiousness | Organized, disciplined, reliable | Spontaneous, flexible, careless |
| **E** — Extraversion | Outgoing, energetic, talkative | Reserved, quiet, independent |
| **A** — Agreeableness | Cooperative, trusting, helpful | Competitive, skeptical, blunt |
| **N** — Neuroticism | Anxious, emotional, reactive | Calm, stable, resilient |

### How Personality Affects Behavior

Personality isn't cosmetic — it directly influences how NPCs respond, decide, and interact:

**Example: A player asks an NPC for directions to a dangerous cave.**

| NPC Personality | Likely Response |
|---|---|
| High O, High E | *"Oh, the Shadow Caverns? Fascinating place! I've always wanted to explore there myself. Let me draw you a map — and tell me everything when you get back!"* |
| Low O, High C | *"The cave is 2 miles north, past the old bridge. Take torches, the left path floods in rain. I'd recommend going before noon."* |
| High N, High A | *"You're going WHERE? Please be careful... I've heard terrible things. Here, take this healing potion — I don't need it, and I'd feel awful if something happened to you."* |
| Low A, Low E | *"North. Past the bridge. Don't die."* |
| High N, Low C | *"I think it's... north? Or was it east? Oh no, what if I send you the wrong way and you get lost? Maybe ask someone else..."* |

### Personality Configuration

\`\`\`
OCEAN Profile Example: "Grumpy Blacksmith"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Openness:          -0.3  ██████░░░░  (Prefers tradition)
Conscientiousness: +0.8  █████████░  (Meticulous craftsman)
Extraversion:      -0.5  █████░░░░░  (Keeps to himself)
Agreeableness:     -0.6  ████░░░░░░  (Blunt and direct)
Neuroticism:       +0.2  ███████░░░  (Slightly irritable)
\`\`\`

The engine uses these values to modulate:
- **Vocabulary and tone** — High E NPCs use more exclamation marks and casual language
- **Response length** — High E and high O NPCs tend to be more verbose
- **Helpfulness** — High A NPCs go out of their way; low A NPCs give bare minimum
- **Risk assessment** — High N NPCs overestimate danger; low N NPCs underestimate it
- **Detail orientation** — High C NPCs provide structured, precise information

---

## Memory Types

MemoryWeave stores NPC memories as **1536-dimensional vector embeddings** in PostgreSQL using pgvector. This enables semantic search — retrieving memories by meaning, not just keywords.

### The Four Memory Types

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    NPC MEMORY                        │
├──────────────┬──────────────┬────────────┬──────────┤
│   Episodic   │   Semantic   │  Emotional │Procedural│
│              │              │            │          │
│  "What       │  "What I     │  "How I    │ "What I  │
│   happened"  │   know"      │   feel"    │  can do" │
├──────────────┼──────────────┼────────────┼──────────┤
│ Events       │ Facts        │ Feelings   │ Skills   │
│ Conversations│ World rules  │ Sentiments │ Recipes  │
│ Encounters   │ Relationships│ Trauma     │ Combat   │
│ Observations │ Lore         │ Bonds      │ Crafting │
└──────────────┴──────────────┴────────────┴──────────┘
\`\`\`

#### Episodic Memory — "What Happened"

Stores specific events and interactions. This is the NPC's personal history.

| Example | Memory Content |
|---|---|
| Conversation | *"Player_42 told me they're searching for the lost amulet of Krath"* |
| Observation | *"I saw Player_42 fighting goblins near the east gate at dawn"* |
| Event | *"The village was attacked by bandits. Three houses were burned."* |

#### Semantic Memory — "What I Know"

Stores facts, knowledge, and learned information. This is the NPC's understanding of the world.

| Example | Memory Content |
|---|---|
| World fact | *"The Shadow Caverns are inhabited by ice elementals"* |
| Learned info | *"Player_42 is a level 30 warrior from the Northern Kingdom"* |
| Relationship | *"The merchant Aldric is my brother. We don't get along."* |

#### Emotional Memory — "How I Feel"

Stores emotional associations and feelings about people, places, and events.

| Example | Memory Content |
|---|---|
| Positive | *"I feel grateful toward Player_42 for saving my daughter"* |
| Negative | *"I feel betrayed by the merchant guild after they raised taxes"* |
| Fear | *"The eastern forest terrifies me since the wolf attack"* |

#### Procedural Memory — "What I Can Do"

Stores skills, abilities, and knowledge of how to perform tasks.

| Example | Memory Content |
|---|---|
| Craft skill | *"I know how to forge a steel sword: requires iron ore, coal, and 2 hours"* |
| Navigation | *"The shortcut through the mountain pass saves half a day of travel"* |
| Combat | *"Ice elementals are weak to fire — aim for the core"* |

### Memory Decay

Memories naturally decay over time based on two factors:

\`\`\`
Memory Strength = Importance x Recency Factor

Where:
  Importance  = 0.0 to 1.0 (set at creation, modified by reinforcement)
  Recency     = exponential decay function over time
\`\`\`

- **High importance + recent** — Sharp and detailed (a battle that happened yesterday)
- **High importance + old** — Still present but less vivid (a trauma from years ago)
- **Low importance + recent** — Accessible but fading (small talk from this morning)
- **Low importance + old** — Effectively forgotten (a stranger passing through months ago)

This creates natural, human-like memory behavior. NPCs don't have perfect recall — they remember what matters.

---

## Life Simulation

NPCs in ClawdBlox don't exist in a vacuum. They have daily lives, long-term ambitions, and social connections.

### Routines

Every NPC can have a daily schedule that defines their behavior throughout the day:

\`\`\`
Example: "Elena the Baker"
━━━━━━━━━━━━━━━━━━━━━━━━━
05:00 - 06:00  │ Wake up, prepare dough
06:00 - 12:00  │ Open bakery, serve customers
12:00 - 13:00  │ Lunch break at the tavern
13:00 - 17:00  │ Afternoon baking, restock
17:00 - 18:00  │ Close shop, clean up
18:00 - 20:00  │ Visit friends or market
20:00 - 21:00  │ Dinner at home
21:00 - 05:00  │ Sleep
\`\`\`

Routines provide **situational context** for conversations. If a player talks to Elena at 5 AM, she's kneading dough and might be brief. At lunch, she's relaxed and chatty. After closing, she's tired but willing to talk if it's important.

### Goals

NPCs pursue goals organized in a hierarchy of categories:

\`\`\`
Goal Categories
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── Survival
│   └── "Stockpile enough food for winter"
│
├── Personal
│   └── "Learn to read and write"
│
├── Professional
│   └── "Save 10,000 gold to open a second bakery"
│
├── Social
│   └── "Reconcile with my estranged brother"
│
└── Secret
    └── "Find out who poisoned the well last summer"
\`\`\`

Goals influence NPC behavior and dialogue:
- An NPC pursuing a **professional goal** might ask the player for help with a task
- An NPC with an urgent **survival goal** will be distracted and anxious
- A **secret goal** won't be mentioned directly but may leak through nervous behavior or probing questions (influenced by the NPC's Neuroticism and Conscientiousness scores)

### Relationships

NPCs form relationships with both players and other NPCs, tracked across three dimensions:

| Dimension | Range | Description |
|---|---|---|
| **Affinity** | -1.0 to +1.0 | How much the NPC likes or dislikes someone |
| **Trust** | 0.0 to 1.0 | How much the NPC trusts someone |
| **Familiarity** | 0.0 to 1.0 | How well the NPC knows someone |

\`\`\`
Relationship Example: Elena → Player_42
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Affinity:     +0.7  ████████░░  (Likes them — saved her cat)
Trust:        +0.4  ██████░░░░  (Moderate — hasn't known them long)
Familiarity:  +0.6  ███████░░░  (Decent — 8 conversations so far)
\`\`\`

These values evolve naturally through interactions:
- **Positive interactions** increase affinity and trust
- **Repeated conversations** increase familiarity
- **Betrayal or hostility** drops affinity and trust sharply
- **Time without contact** slowly decreases familiarity

Relationships also affect **information sharing**. An NPC with high trust toward a player might share secrets or warn them about dangers. An NPC with low affinity might give misleading information or refuse to help.

---

## How It All Connects

When a player talks to an NPC, all three systems work together:

\`\`\`
Player Message
     │
     ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   MEMORY    │────▶│  PERSONALITY │────▶│ LIFE SIMULATION │
│             │     │              │     │                 │
│ Retrieve    │     │ OCEAN traits │     │ Current routine │
│ relevant    │     │ shape tone   │     │ Active goals    │
│ memories    │     │ and style    │     │ Relationships   │
└─────────────┘     └──────────────┘     └─────────────────┘
     │                    │                       │
     └────────────────────┼───────────────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  AI RESPONSE  │
                  │  GENERATION   │
                  │               │
                  │ Context-aware │
                  │ In-character  │
                  │ Memory-driven │
                  └───────────────┘
                          │
                          ▼
                   NPC Response
\`\`\`

This pipeline runs for every message, ensuring that NPC responses are always:

1. **Contextual** — grounded in what the NPC actually remembers
2. **In-character** — shaped by the NPC's unique personality
3. **Situational** — aware of what the NPC is currently doing, pursuing, and feeling
4. **Persistent** — new memories are formed from the interaction, enriching future conversations

---

## Next Steps

Now that you understand the core concepts, explore the technical details:

- [Architecture Overview](/docs/memoryweave/architecture) — How MemoryWeave is built
- [Personality System](/docs/memoryweave/personality-system) — Deep dive into OCEAN implementation
- [Life Simulation](/docs/memoryweave/life-simulation) — Routines, goals, and relationships in detail
- [Conversation Pipeline](/docs/memoryweave/conversation-pipeline) — How messages become responses
`;

export function CoreConceptsContent() {
  return <MarkdownContent content={content} />;
}
