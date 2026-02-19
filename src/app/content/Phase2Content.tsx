import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Phase 2 — The Roblox Invasion (Q2 2026)

> **Status: Planned** — Scheduled for Q2 2026.

Phase 1 built the brain. Phase 2 puts it inside the game. This is where ClawdBlox stops being an interesting backend and becomes something players can actually experience — NPCs in Roblox that see, react, remember, and evolve in real time.

---

## ClawdBlox Studio SDK

**A Roblox Studio plugin that requires zero coding.**

The Studio SDK is designed with one principle: **if you can drag and drop, you can deploy an intelligent NPC.** The plugin integrates directly into Roblox Studio and handles everything — authentication, API calls, memory sync, personality loading — behind a visual interface.

Here's what it enables:

- **Visual NPC Placement** — Drag an NPC into your game world, link it to a MemoryWeave character, and it's live. No Luau scripting required for basic functionality.
- **Dialogue UI Components** — Pre-built, customizable chat interfaces that players interact with naturally. Speech bubbles, dialogue boxes, or immersive chat panels — pick a style and configure it.
- **Event Hooks** — For developers who want deeper integration, the SDK exposes event hooks for custom behavior. Trigger NPC responses based on proximity, combat events, inventory changes, or any game-specific logic.
- **One-Click Deploy** — Publish your NPC configuration from the dashboard and see it reflected in-game instantly. No redeployment, no server restarts.

**Why it matters:** The biggest barrier to AI NPC adoption isn't technology — it's friction. Most Roblox developers are creators, not backend engineers. The SDK eliminates every technical obstacle between "I want a smart NPC" and "my game has one."

---

## Contextual Awareness

**NPCs that "see" their environment.**

Today's NPCs know what you tell them. Tomorrow's NPCs will know what's happening around them. Contextual Awareness feeds environmental data into the MemoryWeave pipeline, giving NPCs situational intelligence:

- **Nearby Object Detection** — An NPC standing near a forge knows they're in a blacksmith's shop. A guard posted at the gate knows when someone approaches. The environment becomes part of the conversation.
- **Player Proximity & Behavior** — NPCs detect when players are nearby, how long they linger, whether they're armed, whether they arrived in a group. A nervous NPC with high Neuroticism might react differently to an armed party than to a lone traveler.
- **Time of Day Awareness** — NPCs know whether it's morning, afternoon, or night. A tavern keeper is cheerful at noon and exhausted at midnight. A guard is alert during their shift and irritable when working overtime.
- **Weather & Event Context** — Feed in-game weather, ongoing events, or world state into the NPC's context. A merchant raises prices during a siege. A farmer complains about the drought. The world stops being a backdrop and becomes a conversation partner.

**Why it matters:** Conversations without context are hollow. When an NPC knows where they are, what time it is, and what's happening around them, their responses stop feeling like AI chat and start feeling like real interaction with a character who lives in that world.

---

## Dynamic State Sync

**Hot-swap personality traits and behaviors in real time.**

Games are dynamic. A peaceful village can become a warzone in minutes. A trusted ally can betray the party. The NPC's behavior needs to keep up. Dynamic State Sync enables:

- **Real-Time Personality Adjustment** — Shift an NPC's OCEAN traits on the fly. A traumatic event lowers their Emotional Stability. A promotion increases their Extraversion. The changes take effect immediately — no restart, no delay.
- **Behavioral Mode Switching** — Switch an NPC between behavioral modes: normal, alert, combat, fleeing, mourning. Each mode reshapes how the NPC responds, what memories they prioritize, and what goals they pursue.
- **Developer-Triggered Events** — Game developers can push state changes via API. A quest completion triggers a personality shift. A world event changes every NPC in a region simultaneously.
- **Smooth Transitions** — State changes don't feel jarring. The system interpolates between behavioral states, so an NPC doesn't snap from "cheerful shopkeeper" to "terrified refugee" in a single frame. The transition feels natural.

**Why it matters:** Static personalities create predictable NPCs. Real characters change based on what happens to them. Dynamic State Sync means your NPCs react to the story as it unfolds, not as it was scripted.

---

## Cross-Server Identity V1 — Global Reputation

**NPCs recognize players across different Roblox servers.**

This is the feature that breaks the boundaries of individual game worlds. Cross-Server Identity means that a player's relationship with an NPC isn't confined to a single server or experience:

- **Global Reputation System** — A player builds a reputation through interactions across multiple Roblox games that use ClawdBlox. Help enough NPCs and word spreads. Betray enough trust and doors start closing.
- **NPC Recognition** — An NPC in Game A and an NPC in Game B share a memory network. If the player earned trust in Game A, the NPC in Game B has heard about it. Not omnisciently — through the organic spread of information across the Hive Mind.
- **Reputation Decay & Evolution** — Reputations aren't permanent flags. They decay over time, just like memories. A player who was notorious six months ago might be forgotten — or the stories might have morphed into something different entirely.
- **Developer Controls** — Game developers choose how much cross-server context their NPCs receive. Full integration, partial awareness, or completely isolated — it's configurable per NPC and per game.

**Why it matters:** In the real world, your reputation precedes you. People in different cities might have heard your name. Cross-Server Identity brings this to gaming — your actions have consequences that follow you, making every interaction feel like it matters beyond the current session.

---

## Phase 2 Deliverables Summary

| Deliverable | Timeline |
|---|---|
| ClawdBlox Studio SDK (Roblox plugin) | Q2 2026 |
| Contextual Awareness (environment, proximity, time) | Q2 2026 |
| Dynamic State Sync (real-time personality hot-swap) | Q2 2026 |
| Cross-Server Identity V1 (Global Reputation) | Q2 2026 |

---

## What Comes Next

Phase 2 brings ClawdBlox into the game world. Phase 3 takes it further — NPCs stop being individual actors and become a society. Head to [Phase 3 — Agent Economy & Society](/docs/roadmap/phase-3) to see what happens when NPCs start talking to each other.
`;

export function Phase2Content() {
  return <MarkdownContent content={content} />;
}
