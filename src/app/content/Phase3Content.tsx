import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Phase 3 — Agent Economy & Society (Q3 2026)

> **Status: Planned** — Scheduled for Q3 2026.

Phases 1 and 2 created intelligent individual NPCs. Phase 3 turns them into a society. This is where ClawdBlox crosses from "smart characters" into emergent civilization — NPCs that communicate with each other, run economies, spread information organically, and create gameplay that no designer scripted.

---

## Agent-to-Agent Communication

**NPCs talk to each other. And things get interesting.**

Until now, NPCs have been islands — they interact with players, but not with each other. Agent-to-Agent Communication changes everything. NPCs become social actors in a living network:

- **Autonomous Conversations** — NPCs initiate conversations with other NPCs based on proximity, relationship strength, and shared interests. A blacksmith and a miner discuss ore prices. Two guards gossip about the new captain. A merchant warns a friend about a suspicious traveler.
- **Rumor Propagation** — Information spreads through NPC social networks organically. When a player does something noteworthy, the NPC who witnessed it tells others. The story mutates as it passes from NPC to NPC — details change, emphasis shifts, context gets lost or embellished. Just like real gossip.
- **Alliance Formation** — NPCs with compatible personalities and shared goals naturally gravitate toward each other. A group of merchants might form a trade guild. Guards with high Conscientiousness rally around a strong leader. These alliances create faction dynamics that emerge from personality, not scripting.
- **Information Asymmetry** — Not every NPC knows everything. Information has a propagation radius based on social connections. A player can exploit this — telling one NPC a secret and watching how (and whether) it spreads. Or they can use it strategically, feeding misinformation to NPCs they know are well-connected.

**Why it matters:** Real worlds aren't built from isolated characters. They're built from relationships. When NPCs talk to each other, the world stops being a stage and becomes an ecosystem. Emergent narratives appear that no developer planned. Players stumble into situations that arose entirely from NPC social dynamics. This is the difference between a game world and a living world.

---

## Economic Autonomy

**NPCs that run their own businesses.**

Static prices and infinite inventories are relics of game design's past. Economic Autonomy gives NPCs the ability to participate in a real supply-and-demand economy:

- **Dynamic Pricing** — Merchants set prices based on actual supply, demand, and their own personality. A greedy NPC (low Agreeableness) charges higher margins. A desperate one (low resources, high Neuroticism) offers desperate discounts. Prices fluctuate based on real conditions, not static lookup tables.
- **Inventory Management** — NPCs track their own stock. A blacksmith who sells all their swords doesn't magically restock — they need to acquire more iron, smelt it, and forge new ones. The timeline depends on their relationships with suppliers and their own Conscientiousness score.
- **Trade Networks** — NPCs trade with each other. A farmer sells crops to a tavern keeper. The tavern keeper pays with gold earned from adventurers. The farmer uses that gold to buy tools from the blacksmith. A real economic loop emerges, and disrupting any part of it has cascading consequences.
- **Economic Memory** — NPCs remember past transactions. A merchant who got cheated remembers the player's face and adjusts prices accordingly. A supplier who was paid fairly and on time offers better deals. Economic relationships build over time, just like personal ones.

**Why it matters:** When the economy is real, player actions have real consequences. Hoarding a rare resource actually affects prices. Destroying a trade route actually hurts merchants. The game world develops economic narratives — booms, busts, shortages, windfalls — that emerge from NPC behavior rather than developer triggers.

---

## Creator Monetization

**$BLOX rewards for Roblox developers based on NPC engagement.**

Building great NPC experiences should be rewarded. Creator Monetization introduces a direct economic incentive for developers who integrate ClawdBlox:

- **Engagement-Based Rewards** — Developers earn $BLOX based on how much players interact with their NPCs. Meaningful interactions — long conversations, return visits, relationship progression — are weighted more heavily than simple greetings.
- **Quality Metrics** — Rewards aren't just about volume. The system tracks conversation depth, player retention driven by NPC interactions, and memory utilization. Creating an NPC that players genuinely bond with earns more than one that players spam.
- **Transparent Tracking** — Every metric is visible in the dashboard. Developers can see exactly which NPCs drive the most engagement, which personality configurations resonate, and where players drop off.
- **Revenue Sharing** — A portion of platform revenue flows back to creators proportional to their NPCs' contribution to the ecosystem. The better your NPCs, the more you earn.

**Why it matters:** The creator economy is what scales ClawdBlox beyond our own efforts. By making it economically rewarding to build great NPC experiences, we align developer incentives with ecosystem growth. The best NPC creators become the backbone of the platform.

---

## Advanced Analytics

**See how your NPC world actually behaves.**

Phase 3 introduces analytics tools that go far beyond basic metrics. These are instruments for understanding emergent social behavior:

- **Social Heatmaps** — Visualize where interactions cluster in your game world. See which NPCs attract the most attention, which areas drive the deepest conversations, and which zones players avoid.
- **Interaction Graphs** — Map the web of relationships between NPCs and players. See who talks to whom, how information flows through the social network, and where influence concentrates. Identify hub NPCs — characters that connect otherwise isolated groups.
- **Emotional Tracking Dashboards** — Monitor NPC emotional states over time. Track how a specific NPC's mood evolves across hundreds of interactions. Identify patterns — does this NPC get stressed every evening? Do they become more agreeable after positive interactions?
- **Narrative Timelines** — Replay the story of any NPC's life. See every significant event, every relationship change, every memory formed. Understand the emergent narrative that built up around a character over weeks or months of interactions.
- **Ecosystem Health Metrics** — High-level indicators of how your NPC ecosystem is functioning. Memory diversity, personality distribution, economic balance, social connectivity. Identify when your world is thriving and when it needs intervention.

**Why it matters:** You can't improve what you can't see. Advanced Analytics gives developers x-ray vision into their NPC ecosystems, turning emergent behavior from a black box into something observable, measurable, and improvable.

---

## Phase 3 Deliverables Summary

| Deliverable | Timeline |
|---|---|
| Agent-to-Agent Communication (gossip, alliances, rumors) | Q3 2026 |
| Economic Autonomy (dynamic pricing, inventory, trade) | Q3 2026 |
| Creator Monetization ($BLOX rewards for engagement) | Q3 2026 |
| Advanced Analytics (heatmaps, graphs, emotional tracking) | Q3 2026 |

---

## What Comes Next

Phase 3 creates an NPC society. Phase 4 makes it permanent, autonomous, and unstoppable. Head to [Phase 4 — The OpenClaw Singularity](/docs/roadmap/phase-4) to see the endgame.
`;

export function Phase3Content() {
  return <MarkdownContent content={content} />;
}
