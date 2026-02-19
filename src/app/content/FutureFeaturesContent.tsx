import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Future Features & Roadmap

CLAWD is built on **OpenClaw**, an open-source agent framework designed to grow. The current release covers NPC relay, admin management, and cross-platform identity — but the roadmap ahead is ambitious. With **47 planned commits** mapped out for the OpenClaw framework, the next phases will transform CLAWD from an NPC management tool into a full-featured autonomous agent ecosystem.

> **What you see today is the foundation. What's coming will redefine how AI agents operate in games.**

---

## The OpenClaw Roadmap

OpenClaw is the open-source framework that powers CLAWD. It's designed to be extensible, skill-based, and platform-agnostic. The 47 planned commits span four major areas:

### 1. Enhanced CLI

The command-line interface will evolve from basic commands into a powerful agent management tool:

| Feature | Description |
|---|---|
| **Interactive NPC builder** | Step-by-step CLI wizard for creating NPCs with validation and previews |
| **Batch operations** | Apply changes to multiple NPCs at once (e.g., update all merchant personality traits) |
| **Import/Export** | Export NPC configurations as JSON/YAML, import them into other projects |
| **Live monitoring** | Real-time CLI dashboard showing active conversations, memory usage, and agent health |
| **Script mode** | Non-interactive mode for CI/CD pipelines and automated deployments |

\`\`\`
# Future CLI usage examples
openclaw npc create --interactive
openclaw npc export aurora --format yaml > aurora.yml
openclaw npc import aurora.yml --project my-rpg
openclaw monitor --live --npcs aurora,marcus
openclaw batch update --filter "role:merchant" --set "personality.agreeableness=0.8"
\`\`\`

### 2. Enriched Skill System

CLAWD's skill architecture will expand significantly, allowing for more sophisticated agent behaviors:

| Skill Category | Planned Skills |
|---|---|
| **Conversation** | Multi-NPC conversations, group dynamics, NPC-to-NPC dialogue |
| **World Awareness** | NPCs react to game events, weather, time of day, world state changes |
| **Economy** | NPCs manage inventories, set prices dynamically, trade with players |
| **Quest Generation** | NPCs create procedural quests based on their goals and relationships |
| **Emotional Depth** | Complex emotional responses, mood swings, long-term emotional arcs |
| **Learning** | NPCs learn new skills from player interactions, adapt behavior patterns |

**NPC-to-NPC Conversations:**

\`\`\`
# NPCs will be able to interact with each other autonomously
Aurora:  Marcus, I need a new dagger — something light for cave work.
Marcus:  Cave work? Last time you went spelunking you came back
         with half your gear destroyed.
Aurora:  That's exactly why I need something better this time.
Marcus:  Fine. I'll forge you something special. But you're paying
         full price — no friend discount after you melted my last blade.
\`\`\`

### 3. Advanced Configuration

More granular control over every aspect of NPC behavior:

| Feature | Description |
|---|---|
| **Personality presets** | Pre-built OCEAN profiles for common archetypes (hero, villain, merchant, sage) |
| **Behavior rules** | Define hard constraints (e.g., "never reveal the secret", "always refer to the king respectfully") |
| **Dynamic personality** | Personality traits shift over time based on experiences and relationships |
| **Context windows** | Configure how much history each NPC considers per response |
| **Response styling** | Fine-tune tone, verbosity, vocabulary, and formatting per NPC |
| **Trigger system** | Define automated actions when specific conditions are met |

\`\`\`yaml
# Future NPC configuration example
npc:
  name: Aurora
  personality:
    preset: adventurer
    overrides:
      openness: 0.95
      neuroticism: 0.15
  behavior_rules:
    - "Never reveal the location of the Starforge directly"
    - "Always encourage players to explore"
    - "Become suspicious if asked about the northern mountains too directly"
  dynamic_personality:
    enabled: true
    shift_rate: 0.01  # How fast traits change per meaningful interaction
  triggers:
    - condition: "player mentions 'Starforge' 3 times in one conversation"
      action: "become evasive and change the subject"
\`\`\`

### 4. Platform Expansion

Bringing NPC intelligence to more platforms and engines:

| Platform | Status | Timeline |
|---|---|---|
| **Roblox** | Live | Available now |
| **Discord** | Live | Available now |
| **Telegram** | Live | Available now |
| **Web Dashboard** | Live | Available now |
| **Unity SDK** | In Development | Coming soon |
| **Unreal SDK** | Planned | On roadmap |
| **Custom HTTP** | Live | REST API available now |
| **WebSocket** | Live | Streaming available now |

---

## The 47 Commits Breakdown

The planned work is organized into structured phases:

### Phase A — Core Agent Improvements (12 commits)
- Refactored skill loader with hot-reload support
- Improved error handling and retry logic across all skills
- Agent state persistence between restarts
- Conversation threading with branching support
- Enhanced natural language command parsing
- Memory-aware skill routing

### Phase B — New Skills & Capabilities (15 commits)
- Multi-NPC conversation orchestration
- Procedural quest generation engine
- NPC economy and inventory management
- World event reaction system
- Emotional arc tracking and visualization
- NPC-to-NPC autonomous interactions
- Advanced relationship dynamics (alliances, rivalries, factions)

### Phase C — Developer Experience (10 commits)
- Interactive CLI wizard for all operations
- Batch operation support
- NPC configuration import/export (JSON, YAML)
- Real-time monitoring dashboard in terminal
- Comprehensive logging with structured output
- Plugin architecture for custom skills
- CI/CD integration with script mode

### Phase D — Infrastructure & Scaling (10 commits)
- Multi-project agent instances
- Horizontal scaling support for CLAWD agents
- Rate limiting improvements per project and per NPC
- Webhook support for external event ingestion
- Analytics and metrics collection
- Automated health checks and self-healing
- Performance optimization for high-throughput scenarios

---

## Contributing to OpenClaw

OpenClaw is open-source and welcomes contributions. The project is structured to make it easy to add new skills, platforms, and capabilities:

\`\`\`
openclaw/
├── src/
│   ├── agent/          # Core agent logic
│   ├── skills/         # Skill modules (each skill is self-contained)
│   ├── platforms/      # Platform adapters (Discord, Telegram, etc.)
│   ├── config/         # Configuration management
│   └── utils/          # Shared utilities
├── docs/               # Documentation
└── tests/              # Test suite
\`\`\`

Adding a new skill follows a standard pattern:

\`\`\`typescript
// Example: Custom skill structure
export default {
  name: 'my-custom-skill',
  description: 'Description of what this skill does',
  triggers: ['keyword1', 'keyword2'],
  permissions: ['admin'],
  execute: async (context) => {
    // Skill logic here
    return { message: 'Skill executed successfully' };
  }
};
\`\`\`

---

## Timeline

While specific dates depend on community feedback and development velocity, the general roadmap is:

| Phase | Focus | Status |
|---|---|---|
| **Current** | NPC Relay, Admin Skills, Cross-Platform Identity | Live |
| **Next** | Enhanced CLI, Enriched Skills, Configuration | In Development |
| **Following** | Multi-NPC interactions, Quest Generation, Economy | Planned |
| **Future** | Unity/Unreal SDKs, Plugin Architecture, Scaling | On Roadmap |

---

## Stay Informed

The OpenClaw roadmap is public and evolves based on community input:

- **GitHub** — Track progress, open issues, and submit PRs at [github.com/clawdblox](https://github.com/clawdblox)
- **Discord** — Join the [ClawdBlox Discord](https://discord.gg/clawdblox) for development discussions
- **Telegram** — Follow updates at [t.me/clawdblox](https://t.me/clawdblox)

---

## Next Steps

- Go back to [What is CLAWD?](/docs/clawd/what-is-clawd) for an overview
- Learn about current features: [NPC Relay](/docs/clawd/npc-relay) | [Admin Skills](/docs/clawd/admin-skills) | [Cross-Platform Identity](/docs/clawd/cross-platform-identity)
- Explore the broader project roadmap at [Phase 1 — The Neural Foundation](/docs/roadmap/phase-1)
`;

export function FutureFeaturesContent() {
  return <MarkdownContent content={content} />;
}
