import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Dashboard

The ClawdBlox Dashboard is your **command center** for building, managing, and monitoring AI-powered NPCs. Create characters with rich personalities, test conversations in real time, inspect memories, and track analytics — all from a clean, intuitive web interface.

> **No code required to get started.** Design your first NPC in under two minutes.

---

## Access

The Dashboard is available at [app.clawdblox.xyz](https://app.clawdblox.xyz). Sign up with email or connect your wallet, create a project, and you are ready to go.

---

## Key Features

### AI-Powered NPC Creation

Build NPCs that feel alive — not scripted. The NPC creation wizard walks you through:

| Step | What You Configure |
|---|---|
| **Identity** | Name, role, backstory, speaking style |
| **Personality** | OCEAN Big Five traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) via intuitive sliders |
| **Knowledge** | What the NPC knows — lore, world facts, specialized knowledge |
| **Behavior** | Response style, verbosity, emotional reactivity |

You can also use **AI-assisted creation**: describe your NPC in plain English and let ClawdBlox generate the full personality profile, backstory, and behavioral parameters automatically.

\`\`\`
"A grumpy dwarven blacksmith who respects hard work, distrusts
magic users, and secretly writes poetry at night."
\`\`\`

The AI generates calibrated OCEAN scores, a detailed backstory, speech patterns, and relationship tendencies from a single sentence.

---

### Live Chat Testing

Test your NPCs instantly without deploying anything. The built-in chat interface lets you:

- **Converse in real time** — Send messages and see responses as the NPC would deliver them in-game
- **Switch personas** — Test as different players to see how the NPC adapts its behavior
- **Inspect the pipeline** — View the full prompt assembled for each response, including retrieved memories and personality context
- **Adjust on the fly** — Modify personality traits or knowledge and immediately see the impact on responses

This is the fastest feedback loop for NPC design. Iterate on personality, test edge cases, and refine behavior before writing a single line of game code.

---

### Memory Management

Every interaction your NPCs have is stored as structured memories. The Dashboard gives you full visibility and control:

- **Browse memories** by NPC, player, type (episodic, semantic, emotional, procedural), or time range
- **Search semantically** — Find memories by meaning, not just keywords. Search "the player who stole from me" and find the relevant episodic memory even if those exact words were never used
- **Inspect details** — View importance scores, decay rates, embedding vectors, and associated metadata
- **Manual curation** — Add, edit, or delete memories to shape NPC behavior. Plant a memory that "the king was poisoned" and watch how it changes dialogue
- **Decay visualization** — See which memories are fading and which remain strong over time

---

### Analytics & Monitoring

Understand how players interact with your NPCs:

| Metric | Description |
|---|---|
| **Conversation Volume** | Messages per NPC, per day, per player |
| **Response Quality** | Average response time, token usage, error rates |
| **Memory Growth** | How many memories each NPC accumulates over time |
| **Player Engagement** | Return rate, average conversation length, unique players |
| **Emotional Trends** | NPC emotional state distribution over time |

Analytics help you identify which NPCs are engaging players and which need personality tuning.

---

### Project & API Key Management

Manage your ClawdBlox projects and credentials:

- **Multiple projects** — Separate NPCs and data by game or environment (dev, staging, prod)
- **API key generation** — Create and revoke API keys with the \`mw_\` prefix
- **Role-based access** — Invite team members with appropriate permissions (admin, editor, viewer)
- **Usage tracking** — Monitor API calls, storage usage, and quota consumption per project

---

## Getting Started

### Step 1: Create a Project

After signing in, click **New Project** and give it a name. Each project is an isolated environment with its own NPCs, memories, and API keys.

### Step 2: Create Your First NPC

Click **New NPC** and choose your creation method:

- **Manual** — Fill in each field yourself for maximum control
- **AI-Assisted** — Describe the character and let AI generate the configuration

### Step 3: Test in Live Chat

Open the NPC's detail page and click **Live Chat**. Start a conversation to see how your NPC behaves. Adjust personality traits and test again until you are satisfied.

### Step 4: Generate API Keys

Go to **Settings → API Keys** and generate a key. You will need this to connect your game via the [Roblox SDK](/docs/integrations/roblox-sdk) or [REST API](/docs/integrations/rest-api).

### Step 5: Integrate

Use your API key with any of our integration options:

- [Roblox SDK](/docs/integrations/roblox-sdk) — Drop-in Luau module
- [REST API](/docs/integrations/rest-api) — Direct HTTP integration
- [WebSocket](/docs/integrations/websocket) — Real-time streaming

---

## Dashboard vs API

The Dashboard is designed for **building and monitoring**. The API is designed for **runtime integration**. Use both:

| Task | Use Dashboard | Use API |
|---|---|---|
| Create and configure NPCs | Yes | Yes |
| Test conversations | Yes | Yes |
| Browse and curate memories | Yes | Limited |
| View analytics | Yes | No |
| Manage API keys | Yes | No |
| In-game NPC conversations | No | Yes |
| Programmatic NPC creation | No | Yes |

---

## Next Steps

- [Roblox SDK](/docs/integrations/roblox-sdk) — Connect your Roblox game to ClawdBlox
- [REST API](/docs/integrations/rest-api) — Full API reference for advanced integration
- [Core Concepts](/docs/introduction/core-concepts) — Understand the building blocks behind the Dashboard
`;

export function DashboardContent() {
  return <MarkdownContent content={content} />;
}
