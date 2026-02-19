import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# WebSocket

The ClawdBlox WebSocket API enables **real-time streaming** of NPC responses. Instead of waiting for the full response to generate, you receive tokens as they are produced — delivering a natural, typewriter-style experience in your game or application.

**WebSocket URL:** \`wss://api.clawdblox.xyz/ws\`

---

## Why WebSocket?

| REST API | WebSocket |
|---|---|
| Full response delivered at once | Tokens streamed in real time |
| Higher perceived latency | First token appears in ~200ms |
| Simpler implementation | Requires connection management |
| Best for: backend services | Best for: player-facing chat UI |

Use WebSocket when you want players to see NPC responses appearing word by word, creating a more natural conversational feel.

---

## Connection Setup

### 1. Establish Connection

Connect to the WebSocket endpoint with your API key:

\`\`\`javascript
const ws = new WebSocket("wss://api.clawdblox.xyz/ws", {
  headers: {
    "Authorization": "Bearer mw_your_api_key"
  }
});
\`\`\`

### 2. Authenticate Player (HMAC-SHA256)

After connecting, authenticate the player using HMAC-SHA256. This ensures player identity is cryptographically verified and prevents replay attacks.

\`\`\`javascript
const crypto = require("crypto");

const playerId = "player_12345";
const timestamp = Math.floor(Date.now() / 1000);
const payload = playerId + ":" + timestamp;
const signature = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");

ws.send(JSON.stringify({
  type: "auth",
  data: {
    playerId: playerId,
    playerName: "Alex",
    timestamp: timestamp,
    signature: signature,
    projectId: "your-project-id"
  }
}));
\`\`\`

The server validates:
- The signature matches the expected HMAC-SHA256 digest
- The timestamp is within a **5-minute window** (prevents replay attacks)
- Comparison uses **timing-safe** equality to prevent timing attacks

### 3. Receive Auth Confirmation

\`\`\`json
{
  "type": "auth:success",
  "data": {
    "sessionId": "sess_abc123",
    "playerId": "player_12345"
  }
}
\`\`\`

If authentication fails:

\`\`\`json
{
  "type": "auth:error",
  "data": {
    "code": "AUTH_FAILED",
    "message": "Invalid signature or expired timestamp"
  }
}
\`\`\`

> **Important:** You must authenticate within **10 seconds** of connecting, or the server will close the connection.

---

## Streaming Protocol

### Sending a Message

\`\`\`javascript
ws.send(JSON.stringify({
  type: "chat:send",
  data: {
    npcId: "merchant-bob",
    message: "Do you have any rare swords?",
    context: {
      location: "market-square",
      timeOfDay: "afternoon"
    }
  }
}));
\`\`\`

### Receiving a Streamed Response

The response arrives as a sequence of three message types:

#### \`chat:start\`

Signals the beginning of a response. Contains metadata.

\`\`\`json
{
  "type": "chat:start",
  "data": {
    "conversationId": "conv_a1b2c3d4",
    "npcId": "merchant-bob",
    "emotion": "enthusiastic"
  }
}
\`\`\`

#### \`chat:token\`

Each token (word fragment) of the response, delivered in real time.

\`\`\`json
{
  "type": "chat:token",
  "data": {
    "token": "Ah, "
  }
}
\`\`\`
\`\`\`json
{
  "type": "chat:token",
  "data": {
    "token": "you have "
  }
}
\`\`\`
\`\`\`json
{
  "type": "chat:token",
  "data": {
    "token": "a fine eye! "
  }
}
\`\`\`

#### \`chat:end\`

Signals the response is complete. Contains the full message and usage metadata.

\`\`\`json
{
  "type": "chat:end",
  "data": {
    "fullMessage": "Ah, you have a fine eye! I just received a shipment of enchanted blades from the eastern forge. This one here — a moonstone saber — cuts through shadow creatures like butter.",
    "conversationId": "conv_a1b2c3d4",
    "memoriesUsed": 2,
    "tokensUsed": 312
  }
}
\`\`\`

#### \`chat:error\`

Sent if an error occurs during generation.

\`\`\`json
{
  "type": "chat:error",
  "data": {
    "code": "NPC_NOT_FOUND",
    "message": "No NPC found with ID: ghost-vendor"
  }
}
\`\`\`

---

## Message Types Summary

| Type | Direction | Description |
|---|---|---|
| \`auth\` | Client → Server | Authenticate player with HMAC signature |
| \`auth:success\` | Server → Client | Authentication confirmed |
| \`auth:error\` | Server → Client | Authentication failed |
| \`chat:send\` | Client → Server | Send a player message to an NPC |
| \`chat:start\` | Server → Client | Response generation started |
| \`chat:token\` | Server → Client | Individual token of the response |
| \`chat:end\` | Server → Client | Response complete with full message |
| \`chat:error\` | Server → Client | Error during response generation |
| \`heartbeat\` | Bidirectional | Keep-alive ping/pong |

---

## Connection Management

The WebSocket server enforces several protections to ensure stability and security:

| Protection | Behavior |
|---|---|
| **Auth Timeout** | Must authenticate within 10 seconds of connecting |
| **Heartbeat** | Server sends ping every 30 seconds; client must respond with pong |
| **Inactivity Timeout** | Connections idle for more than 5 minutes are closed |
| **Connection Limits** | Maximum concurrent connections per project |
| **Message Size** | Maximum message payload: 8 KB |
| **Rate Limiting** | Maximum messages per second per connection |
| **Graceful Shutdown** | Server notifies clients before shutting down for maintenance |

### Heartbeat

The server sends periodic \`ping\` frames. Your WebSocket client should automatically respond with \`pong\` — most libraries handle this natively. If the server does not receive a pong within 10 seconds, the connection is terminated.

### Reconnection

If the connection drops, implement exponential backoff:

\`\`\`javascript
let retryDelay = 1000; // Start at 1 second
const maxDelay = 30000; // Cap at 30 seconds

function connect() {
  const ws = new WebSocket("wss://api.clawdblox.xyz/ws");

  ws.onopen = () => {
    retryDelay = 1000; // Reset on successful connection
    authenticate(ws);
  };

  ws.onclose = (event) => {
    if (event.code !== 1000) { // Abnormal close
      console.log("Reconnecting in " + retryDelay + "ms...");
      setTimeout(connect, retryDelay);
      retryDelay = Math.min(retryDelay * 2, maxDelay);
    }
  };
}
\`\`\`

---

## Full Client Example

A complete JavaScript client implementation:

\`\`\`javascript
const WebSocket = require("ws");
const crypto = require("crypto");

const API_KEY = "mw_your_api_key";
const SECRET_KEY = "your-secret-key";
const PROJECT_ID = "your-project-id";
const PLAYER_ID = "player_12345";
const PLAYER_NAME = "Alex";

// Connect
const ws = new WebSocket("wss://api.clawdblox.xyz/ws", {
  headers: { "Authorization": "Bearer " + API_KEY }
});

ws.on("open", () => {
  console.log("Connected. Authenticating...");

  // HMAC-SHA256 player auth
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = PLAYER_ID + ":" + timestamp;
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");

  ws.send(JSON.stringify({
    type: "auth",
    data: {
      playerId: PLAYER_ID,
      playerName: PLAYER_NAME,
      timestamp: timestamp,
      signature: signature,
      projectId: PROJECT_ID
    }
  }));
});

ws.on("message", (raw) => {
  const msg = JSON.parse(raw);

  switch (msg.type) {
    case "auth:success":
      console.log("Authenticated. Session:", msg.data.sessionId);

      // Send a chat message
      ws.send(JSON.stringify({
        type: "chat:send",
        data: {
          npcId: "merchant-bob",
          message: "What do you have for sale today?"
        }
      }));
      break;

    case "chat:start":
      process.stdout.write("[" + msg.data.npcId + "]: ");
      break;

    case "chat:token":
      process.stdout.write(msg.data.token);
      break;

    case "chat:end":
      console.log("\\n--- Response complete (" + msg.data.tokensUsed + " tokens) ---");
      break;

    case "chat:error":
      console.error("Error:", msg.data.code, msg.data.message);
      break;

    case "auth:error":
      console.error("Auth failed:", msg.data.message);
      ws.close();
      break;
  }
});

ws.on("close", (code, reason) => {
  console.log("Disconnected:", code, reason.toString());
});
\`\`\`

---

## Luau (Roblox) Note

The Roblox SDK handles WebSocket streaming internally when available. If your Roblox environment does not support native WebSocket connections, the SDK automatically falls back to the REST API with polling. You do not need to implement the WebSocket protocol manually in Luau — use the [Roblox SDK](/docs/integrations/roblox-sdk) instead.

---

## Next Steps

- [Roblox SDK](/docs/integrations/roblox-sdk) — SDK with built-in WebSocket support
- [REST API](/docs/integrations/rest-api) — Synchronous alternative to WebSocket
- [Dashboard](/docs/integrations/dashboard) — Test NPC conversations without any code
`;

export function WebsocketContent() {
  return <MarkdownContent content={content} />;
}
