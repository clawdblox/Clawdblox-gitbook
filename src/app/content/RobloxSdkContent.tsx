import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Roblox SDK

The ClawdBlox Roblox SDK is a native **Luau module** that lets you integrate AI-powered NPCs into any Roblox experience in minutes. Drop it into ReplicatedStorage, configure your credentials, and your NPCs gain persistent memory, personality, and life simulation — no external HTTP wrangling required.

---

## Overview

| Feature | Description |
|---|---|
| **Native Luau** | Written in pure Luau — no external dependencies, no plugins |
| **HMAC-SHA256 Auth** | Every request is signed with your secret key. No tokens leak to the client |
| **Streaming Support** | Optional WebSocket mode for real-time token-by-token responses |
| **Automatic Player Auth** | Player identity is verified server-side using HMAC signatures with timestamp validation |
| **Lightweight** | Single module, minimal memory footprint, non-blocking HTTP calls |

---

## Installation

1. **Get your credentials** from the [ClawdBlox Dashboard](https://app.clawdblox.xyz):
   - Project ID
   - Secret Key

2. **Download the SDK** module and place it in \`ReplicatedStorage\`:
   \`\`\`
   ReplicatedStorage/
   └── ClawdBlox/         -- Main module
       ├── init.luau
       ├── Auth.luau       -- HMAC-SHA256 signing
       ├── Http.luau       -- Request handling
       └── Types.luau      -- Type definitions
   \`\`\`

3. **Configure** the module in a server script.

> **Important:** The SDK must only be used in **server-side scripts** (Script, not LocalScript). Your secret key should never be exposed to the client.

---

## Quick Start

Here is the minimal setup to get an NPC talking in your Roblox game:

\`\`\`lua
local ClawdBlox = require(game.ReplicatedStorage.ClawdBlox)

ClawdBlox.init({
    projectId = "your-project-id",
    secretKey = "your-secret-key",
    serverUrl = "https://api.clawdblox.xyz"
})

-- When a player talks to an NPC
ClawdBlox.chat({
    npcId = "merchant-bob",
    playerId = player.UserId,
    playerName = player.DisplayName,
    message = "Hey Bob, do you have any swords?"
}, function(response)
    -- Display response in game
    npcDialog:SetText(response.message)
end)
\`\`\`

That is it. Three function calls: \`require\`, \`init\`, \`chat\`. The SDK handles authentication, request signing, error retries, and response parsing internally.

---

## Authentication: HMAC-SHA256

Every API request from the SDK is authenticated using **HMAC-SHA256**. This ensures that:

- Only your game server can talk to MemoryWeave
- Player identity is cryptographically verified
- Replay attacks are prevented via timestamp validation (5-minute window)

### How It Works

1. The SDK constructs a payload: \`playerId:timestamp\`
2. It signs the payload with your secret key using HMAC-SHA256
3. The signature, timestamp, and player ID are sent as headers
4. MemoryWeave verifies the signature using timing-safe comparison

You do not need to implement any of this manually — the SDK handles it automatically when you call \`ClawdBlox.init()\` with your secret key.

### Signature Headers

| Header | Value |
|---|---|
| \`X-Player-Id\` | The Roblox UserId |
| \`X-Timestamp\` | Unix timestamp (seconds) |
| \`X-Signature\` | HMAC-SHA256 hex digest |
| \`X-Project-Id\` | Your project ID |

---

## API Reference

### \`ClawdBlox.init(config)\`

Initializes the SDK with your project credentials.

\`\`\`lua
ClawdBlox.init({
    projectId = "your-project-id",   -- Required
    secretKey = "your-secret-key",   -- Required
    serverUrl = "https://api.clawdblox.xyz", -- Optional (default shown)
    timeout = 30,                    -- Optional: request timeout in seconds
    retries = 2,                     -- Optional: retry count on failure
})
\`\`\`

### \`ClawdBlox.chat(params, callback)\`

Sends a player message to an NPC and receives a response.

\`\`\`lua
ClawdBlox.chat({
    npcId = "merchant-bob",          -- Required: NPC identifier
    playerId = player.UserId,        -- Required: Roblox UserId
    playerName = player.DisplayName, -- Required: display name for context
    message = "What quests do you have?", -- Required: player message
    context = {                      -- Optional: additional context
        location = "market-square",
        timeOfDay = "morning",
    },
}, function(response)
    print(response.message)          -- NPC response text
    print(response.emotion)          -- Current emotional state
    print(response.conversationId)   -- Conversation ID for continuity
end)
\`\`\`

### \`ClawdBlox.getMemories(params, callback)\`

Retrieves an NPC's memories about a specific player.

\`\`\`lua
ClawdBlox.getMemories({
    npcId = "merchant-bob",
    playerId = player.UserId,
    limit = 10,                      -- Optional: max memories to return
}, function(memories)
    for _, memory in ipairs(memories) do
        print(memory.content, memory.importance)
    end
end)
\`\`\`

### \`ClawdBlox.getNpcStatus(npcId, callback)\`

Gets the current state of an NPC (routine, mood, relationships).

\`\`\`lua
ClawdBlox.getNpcStatus("merchant-bob", function(status)
    print(status.currentActivity)    -- e.g. "tending shop"
    print(status.mood)               -- e.g. "content"
    print(status.location)           -- e.g. "market-square"
end)
\`\`\`

---

## Full Integration Example

A complete example showing NPC dialogue in a Roblox experience with a ProximityPrompt trigger:

\`\`\`lua
-- ServerScript in ServerScriptService
local ClawdBlox = require(game.ReplicatedStorage.ClawdBlox)
local Players = game:GetService("Players")

-- Initialize once on server start
ClawdBlox.init({
    projectId = "proj_abc123",
    secretKey = "sk_your_secret_key_here",
})

-- Reference the NPC model in the workspace
local merchantBob = workspace.NPCs.MerchantBob
local prompt = merchantBob.Head:FindFirstChild("ProximityPrompt")
local dialogGui = merchantBob.Head:FindFirstChild("DialogBillboard")

-- Remote event for client -> server communication
local chatRemote = game.ReplicatedStorage.NPCChat

chatRemote.OnServerEvent:Connect(function(player, npcId, message)
    -- Send to MemoryWeave
    ClawdBlox.chat({
        npcId = npcId,
        playerId = player.UserId,
        playerName = player.DisplayName,
        message = message,
        context = {
            location = "market-square",
        },
    }, function(response)
        -- Send response back to the client for UI display
        chatRemote:FireClient(player, npcId, response.message, response.emotion)
    end)
end)
\`\`\`

---

## Error Handling

The SDK provides structured error handling through the callback pattern:

\`\`\`lua
ClawdBlox.chat({
    npcId = "merchant-bob",
    playerId = player.UserId,
    playerName = player.DisplayName,
    message = "Hello!",
}, function(response)
    if response.error then
        warn("ClawdBlox error:", response.error.code, response.error.message)
        -- Fallback to generic dialogue
        npcDialog:SetText("I seem to be lost in thought...")
        return
    end

    npcDialog:SetText(response.message)
end)
\`\`\`

| Error Code | Description |
|---|---|
| \`AUTH_FAILED\` | Invalid secret key or expired timestamp |
| \`NPC_NOT_FOUND\` | The specified NPC ID does not exist in your project |
| \`RATE_LIMITED\` | Too many requests — SDK auto-retries with backoff |
| \`SERVER_ERROR\` | MemoryWeave server issue — SDK retries automatically |
| \`TIMEOUT\` | Request exceeded the configured timeout |

---

## Best Practices

- **Server-side only.** Never require the SDK in a LocalScript. Your secret key must stay on the server.
- **Cache NPC status.** Use \`getNpcStatus\` sparingly and cache results for a few seconds to avoid unnecessary API calls.
- **Provide context.** The \`context\` field in \`chat()\` dramatically improves NPC responses. Include location, time of day, nearby objects, or game state.
- **Handle errors gracefully.** Always provide fallback dialogue so players never see a broken NPC.
- **Use conversation continuity.** Store the \`conversationId\` from responses and pass it back in subsequent calls to maintain conversation flow.

---

## Next Steps

- [Dashboard](/docs/integrations/dashboard) — Create and configure your NPCs visually
- [REST API](/docs/integrations/rest-api) — Advanced API usage beyond what the SDK exposes
- [WebSocket](/docs/integrations/websocket) — Enable real-time streaming responses
`;

export function RobloxSdkContent() {
  return <MarkdownContent content={content} />;
}
