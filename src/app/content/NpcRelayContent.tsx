import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# NPC Relay (Telegram & Discord)

The NPC Relay is CLAWD's core feature: it lets users talk to any NPC directly from **Telegram** or **Discord** using a simple slash command. No game client required. No special app. Just open your messaging platform and start a conversation.

> **Pocket AI: your Roblox NPCs accessible from your phone.**

---

## How It Works

The relay system uses a straightforward command pattern:

\`\`\`
/npcname message
\`\`\`

That's it. Type a forward slash, the NPC's name, and your message. CLAWD intercepts the command, routes it through MemoryWeave, and returns the NPC's response — fully in character, with full memory of your past interactions.

### Message Flow

\`\`\`
1. User types:  /aurora Do you remember me?
2. CLAWD parses the command → NPC: "aurora", Message: "Do you remember me?"
3. CLAWD resolves the user's cross-platform identity
4. CLAWD sends the message to MemoryWeave with:
   - Player identity (unified across platforms)
   - NPC identifier
   - Conversation context
5. MemoryWeave:
   - Retrieves relevant memories (vector similarity search)
   - Computes current personality state (OCEAN traits)
   - Assembles full context (memories + personality + relationship + life state)
   - Generates an in-character response
6. CLAWD delivers Aurora's response back to the chat
\`\`\`

The entire round-trip typically completes in **2-4 seconds**, depending on the AI provider and context complexity.

---

## The Pocket AI Concept

Traditional game NPCs are locked inside the game. Close the app, and they cease to exist. CLAWD changes this fundamentally.

With NPC Relay, your game characters become **persistent companions** that travel with you:

| Scenario | What Happens |
|---|---|
| Playing Roblox on PC | Talk to Aurora in-game via the game client |
| On the bus, phone only | Open Telegram, type \`/aurora\` and continue the conversation |
| In a Discord server | Mention Aurora in a channel, she responds with full memory |
| Back in Roblox later | Aurora references what you discussed on Telegram |

The NPC doesn't just remember — it maintains **emotional continuity**. If you made Aurora angry on Discord, she'll still be annoyed when you meet her in Roblox.

---

## Utility Commands

Beyond NPC conversations, CLAWD provides a set of utility commands available to all users:

### \`/npcs\` — List Available NPCs

Displays all NPCs available in the current project context.

\`\`\`
You:     /npcs
CLAWD:   Available NPCs for this project:

         🗡️ Aurora — Adventurer and explorer
            Traits: curious, brave, slightly reckless
            Status: Currently at the market square

         🔨 Marcus — Village blacksmith
            Traits: grumpy, loyal, master craftsman
            Status: Working at the forge

         🌙 Zara — Traveling merchant
            Traits: mysterious, well-connected, shrewd
            Status: Setting up camp outside town
\`\`\`

### \`/link\` — Link Your Identity

Generates a 6-digit code to link your current platform identity with your accounts on other platforms.

\`\`\`
You:     /link
CLAWD:   Your linking code: 384712

         To connect your accounts:
         1. Use /link on another platform (Discord, Telegram, or in-game)
         2. Enter this code when prompted
         3. Your identities will be merged

         ⏱️ Code expires in 5 minutes.
\`\`\`

### \`/whoami\` — Show Your Identity

Displays your linked identities and player information.

\`\`\`
You:     /whoami
CLAWD:   Your identity:

         Discord:  @player123 (linked ✓)
         Telegram: @player_tg (linked ✓)
         Roblox:   Player123 (linked ✓)

         Known by 3 NPCs:
         • Aurora — relationship: friend (trust: 0.82)
         • Marcus — relationship: customer (trust: 0.65)
         • Zara — relationship: acquaintance (trust: 0.41)
\`\`\`

---

## Platform-Specific Behavior

While the relay works identically across platforms, there are some platform-specific nuances:

### Discord

- Commands work in **server channels** and **DMs** with the CLAWD bot
- NPC responses respect Discord's message formatting (embeds, markdown)
- Multiple users can talk to the same NPC in a channel — the NPC tracks each relationship independently
- Thread support for extended conversations

### Telegram

- Commands work in **group chats** and **private messages** with the CLAWD bot
- Supports inline responses and reply chains
- NPC responses use Telegram-native formatting
- Works seamlessly in mobile-first scenarios — the true "Pocket AI" experience

---

## Conversation Context

Each relay interaction isn't a stateless request. CLAWD maintains conversation context across messages:

\`\`\`
You:     /aurora What's your favorite weapon?
Aurora:  I prefer a short bow — light, fast, and deadly from a distance.
         Though after that cave incident, I've been practicing with
         a dagger too. Better for close quarters.

You:     /aurora Why a dagger specifically?
Aurora:  Remember when those cave spiders swarmed us? A bow is useless
         at arm's length. I nearly lost my hand before you pulled me
         out. That's when I decided — never again without a backup.
\`\`\`

The NPC references previous messages in the current conversation **and** past interactions stored in MemoryWeave. This creates a natural conversational flow where context builds over time.

---

## Rate Limiting & Fair Use

To ensure a smooth experience for all users, the relay system includes sensible rate limits:

| Limit | Value |
|---|---|
| Messages per minute per user | Configured per project |
| Message maximum length | Configured per project |
| Concurrent conversations per user | 1 NPC at a time per platform |

These limits are configurable by project administrators through the admin skills or dashboard.

---

## Next Steps

- Learn how admins manage NPCs with [Admin Management Skills](/docs/clawd/admin-skills)
- Understand how identities work across platforms in [Cross-Platform Identity](/docs/clawd/cross-platform-identity)
- See the full CLAWD overview in [What is CLAWD?](/docs/clawd/what-is-clawd)
`;

export function NpcRelayContent() {
  return <MarkdownContent content={content} />;
}
