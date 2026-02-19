import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Cross-Platform Identity

One of ClawdBlox's most powerful features is its unified identity system. A player is the same person whether they're in a Roblox game, chatting on Discord, messaging on Telegram, or using the web dashboard. NPCs recognize them everywhere, relationships persist across platforms, and conversation history follows seamlessly.

> **One player. One identity. Every platform.**

---

## The Problem with Platform Silos

In traditional game architectures, each platform maintains its own user system:

\`\`\`
Discord:   @coolplayer#1234     → Discord user ID
Telegram:  @cool_player         → Telegram user ID
Roblox:    CoolPlayer           → Roblox user ID
Web:       cool@email.com       → Account UUID
\`\`\`

These are four completely separate identities. If an NPC befriends a player on Discord, it has no idea who that person is when they show up in Roblox. Every relationship starts from zero on each platform. Every conversation is isolated.

ClawdBlox solves this with a **unified player identity** that maps all platform-specific identifiers to a single internal profile.

---

## How Identity Linking Works

### The 6-Digit Code System

Linking is simple and secure. It works through a temporary 6-digit code:

\`\`\`
Step 1:  Player uses /link on Platform A
         → CLAWD generates code: 847291 (expires in 5 minutes)

Step 2:  Player uses /link 847291 on Platform B
         → CLAWD verifies the code
         → Both platform identities merge into one player profile

Step 3:  Done. The player is now recognized as the same person
         on both platforms.
\`\`\`

### Linking Example

**On Discord:**
\`\`\`
You:     /link
CLAWD:   Your linking code: 847291
         Enter this code on another platform within 5 minutes.
\`\`\`

**On Telegram (within 5 minutes):**
\`\`\`
You:     /link 847291
CLAWD:   ✅ Identity linked!
         Your Discord account (@player123) is now connected
         to this Telegram account (@player_tg).

         NPCs will now recognize you across both platforms.
\`\`\`

**In Roblox (using the same process):**
\`\`\`
-- Player enters code via in-game UI
-- Roblox SDK sends HMAC-authenticated request to MemoryWeave
-- Identity merged with existing profile
\`\`\`

### Verifying Your Identity

Use \`/whoami\` on any platform to see your full identity:

\`\`\`
You:     /whoami
CLAWD:   Your unified identity:

         Platform Links:
         ├── Discord:   @player123      ✅ linked
         ├── Telegram:  @player_tg      ✅ linked
         ├── Roblox:    Player123       ✅ linked
         └── Web:       player@mail.com ✅ linked

         Player since: January 15, 2026
         NPCs met: 7
         Total interactions: 342
\`\`\`

---

## What Persists Across Platforms

When identities are linked, **everything** follows the player:

| Data | Behavior |
|---|---|
| **Conversation history** | NPC remembers what you said on Discord when you talk on Telegram |
| **Relationships** | Trust level, relationship type, and emotional state carry over |
| **Memories** | NPC's memories of you are the same regardless of platform |
| **Emotional context** | If you angered an NPC on Telegram, they're still angry in Roblox |
| **Goals involving you** | If an NPC set a goal related to you, it tracks across platforms |
| **Reputation** | Your overall standing with NPCs is unified |

### Example: Cross-Platform Continuity

**Monday — Discord:**
\`\`\`
You:     /aurora I found a map fragment in the northern ruins!
Aurora:  Incredible! That's the third piece. One more and we can
         locate the Starforge. Where exactly in the ruins was it?
You:     /aurora Hidden behind a false wall in the library section.
Aurora:  I knew that library was hiding something. Thank you — I owe
         you one.
\`\`\`

**Tuesday — Telegram (from phone):**
\`\`\`
You:     /aurora Hey, any leads on the last fragment?
Aurora:  I've been thinking about it since you found that third piece
         yesterday. Zara mentioned something about a collector in the
         eastern port. Want to investigate together?
\`\`\`

**Wednesday — Roblox (in-game):**
\`\`\`
Aurora:  *notices you approaching*
         Perfect timing! I spoke with Zara about the collector.
         She gave me a name — "Old Garrett" in the port district.
         Ready to head there?
\`\`\`

Aurora has no idea which platform you're on. She just knows **you** — and picks up exactly where things left off.

---

## Technical Implementation

Under the hood, the identity system works through MemoryWeave's player module:

\`\`\`
┌─────────────────────────────────────────────┐
│              Unified Player Profile          │
│                                              │
│  Internal ID: uuid-xxxx-xxxx                 │
│                                              │
│  Platform Identities:                        │
│  ├── discord:  { id: "12345", username: ..}  │
│  ├── telegram: { id: "67890", username: ..}  │
│  ├── roblox:   { id: "11111", username: ..}  │
│  └── web:      { id: "uuid",  email: .. }    │
│                                              │
│  Linking Codes:                              │
│  └── Active: 847291 (expires: 5min)          │
│                                              │
│  Relationships: [ref → NPC relationship DB]  │
│  Conversations: [ref → conversation history] │
│  Memories:      [ref → memory vectors]       │
└─────────────────────────────────────────────┘
\`\`\`

### Security

Identity linking is protected by several mechanisms:

- **Code expiration** — Linking codes expire after 5 minutes
- **One-time use** — Each code can only be used once
- **Rate limiting** — Code generation is rate-limited to prevent abuse
- **HMAC-SHA256** — Roblox player authentication uses HMAC with timestamp validation (window < 5 minutes) and timing-safe comparison
- **No reversal without admin** — Once linked, identities can only be unlinked by a project admin

---

## Edge Cases

### What if a player talks to an NPC before linking?

The NPC treats them as a new person on each platform. Once they link, **all past interactions are retroactively merged**. The NPC's memories from Discord and Telegram are unified into a single relationship history.

### What if two different real people try to link?

The 6-digit code is private — only the person who generated it should have it. If someone else enters the code, they'll merge with the original player's identity. This is why codes expire quickly and admins can unlink identities if needed.

### What about privacy?

Players choose when and whether to link. An unlinked player on Discord is completely separate from their Telegram identity. Linking is always opt-in.

---

## Supported Platforms

| Platform | Status | Auth Method |
|---|---|---|
| **Discord** | Live | Discord OAuth / Bot interaction |
| **Telegram** | Live | Telegram Bot API / User ID |
| **Roblox** | Live | HMAC-SHA256 with server-side secret |
| **Web Dashboard** | Live | JWT (httpOnly cookies) |
| **Unity** | Planned | API key + player token |
| **Unreal** | Planned | API key + player token |

---

## Next Steps

- See how the relay system enables NPC conversations at [NPC Relay](/docs/clawd/npc-relay)
- Learn about admin tools for managing identities at [Admin Management Skills](/docs/clawd/admin-skills)
- Explore the [Future Features & Roadmap](/docs/clawd/future-features) for upcoming identity enhancements
`;

export function CrossPlatformIdentityContent() {
  return <MarkdownContent content={content} />;
}
