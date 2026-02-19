import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# REST API

The ClawdBlox REST API gives you full programmatic access to the MemoryWeave engine. Create NPCs, manage conversations, store and retrieve memories, and control life simulation — all via standard HTTP endpoints.

**Base URL:** \`https://api.clawdblox.xyz\`

---

## Authentication

The API supports two authentication methods. Use whichever fits your use case.

### API Key Authentication

Best for server-to-server integration (game servers, backend services).

API keys use the \`mw_\` prefix and are sent via the \`Authorization\` header:

\`\`\`
Authorization: Bearer mw_your_api_key_here
\`\`\`

API keys are **bcrypt-hashed** on our servers. We use prefix-based lookup — the \`mw_\` prefix identifies the key, and the rest is verified against the stored hash. You can generate and revoke keys from the [Dashboard](/docs/integrations/dashboard).

### JWT Authentication

Best for user-facing applications (dashboard, admin tools).

1. Authenticate with \`POST /api/auth/login\` to receive access and refresh tokens
2. Send the access token via cookie (httpOnly) or \`Authorization\` header
3. Access tokens expire after **15 minutes**; refresh tokens last **7 days**

\`\`\`bash
# Login
curl -X POST https://api.clawdblox.xyz/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "your-password"}'

# Response sets httpOnly cookies automatically
# Or use the returned token:
# Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
\`\`\`

### Player Authentication (HMAC-SHA256)

For authenticating game players in runtime calls. See the [Roblox SDK](/docs/integrations/roblox-sdk) or [WebSocket](/docs/integrations/websocket) docs for details.

---

## Response Format

All endpoints return JSON. Successful responses follow this structure:

\`\`\`json
{
  "success": true,
  "data": { ... }
}
\`\`\`

Error responses:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "NPC_NOT_FOUND",
    "message": "No NPC found with the specified ID"
  }
}
\`\`\`

---

## NPCs

Manage your AI-powered NPCs.

| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/npcs\` | List all NPCs in the project |
| \`GET\` | \`/api/npcs/:id\` | Get a specific NPC by ID |
| \`POST\` | \`/api/npcs\` | Create a new NPC |
| \`PUT\` | \`/api/npcs/:id\` | Update an existing NPC |
| \`DELETE\` | \`/api/npcs/:id\` | Delete an NPC and all associated data |

### List NPCs

\`\`\`bash
curl https://api.clawdblox.xyz/api/npcs \\
  -H "Authorization: Bearer mw_your_api_key"
\`\`\`

\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "merchant-bob",
      "name": "Merchant Bob",
      "role": "shopkeeper",
      "personality": {
        "openness": 0.6,
        "conscientiousness": 0.8,
        "extraversion": 0.7,
        "agreeableness": 0.5,
        "neuroticism": 0.3
      },
      "createdAt": "2025-11-15T10:30:00Z"
    }
  ]
}
\`\`\`

### Create NPC

\`\`\`bash
curl -X POST https://api.clawdblox.xyz/api/npcs \\
  -H "Authorization: Bearer mw_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Guard Captain Elena",
    "role": "city guard captain",
    "backstory": "A veteran soldier who has protected the city for 20 years. Stern but fair, she values discipline above all.",
    "personality": {
      "openness": 0.4,
      "conscientiousness": 0.9,
      "extraversion": 0.5,
      "agreeableness": 0.4,
      "neuroticism": 0.2
    },
    "speechStyle": "formal, military, direct",
    "knowledge": ["city layout", "criminal activity", "military tactics"]
  }'
\`\`\`

### Update NPC

\`\`\`bash
curl -X PUT https://api.clawdblox.xyz/api/npcs/guard-elena \\
  -H "Authorization: Bearer mw_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "personality": {
      "agreeableness": 0.6
    },
    "backstory": "After the siege, Elena has softened. She now mentors young recruits."
  }'
\`\`\`

### Delete NPC

\`\`\`bash
curl -X DELETE https://api.clawdblox.xyz/api/npcs/guard-elena \\
  -H "Authorization: Bearer mw_your_api_key"
\`\`\`

> **Warning:** Deleting an NPC removes all associated conversations, memories, and life data permanently.

---

## Conversations

Send messages to NPCs and receive AI-generated responses.

| Method | Endpoint | Description |
|---|---|---|
| \`POST\` | \`/api/conversations/chat\` | Send a message and receive a response |

### Chat

This is the primary endpoint for NPC interaction. It handles the full pipeline: memory retrieval, personality application, context assembly, and response generation.

\`\`\`bash
curl -X POST https://api.clawdblox.xyz/api/conversations/chat \\
  -H "Authorization: Bearer mw_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "npcId": "merchant-bob",
    "playerId": "player_12345",
    "playerName": "Alex",
    "message": "Do you remember me? I bought a sword last week.",
    "context": {
      "location": "market-square",
      "timeOfDay": "afternoon"
    }
  }'
\`\`\`

\`\`\`json
{
  "success": true,
  "data": {
    "message": "Alex! Of course I remember you. That iron longsword, wasn't it? You said you were heading to the northern caves. Did it serve you well?",
    "emotion": "happy",
    "conversationId": "conv_a1b2c3d4",
    "memoriesUsed": 3,
    "tokensUsed": 487
  }
}
\`\`\`

---

## Memories

Access and manage NPC memories. Memories are stored as vector embeddings (1536 dimensions) and retrieved using cosine similarity.

| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/memories\` | Query memories with filters |
| \`POST\` | \`/api/memories\` | Create a memory manually |

### Query Memories

\`\`\`bash
# Get all memories for a specific NPC about a player
curl "https://api.clawdblox.xyz/api/memories?npcId=merchant-bob&playerId=player_12345&limit=10" \\
  -H "Authorization: Bearer mw_your_api_key"
\`\`\`

\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "mem_x1y2z3",
      "npcId": "merchant-bob",
      "type": "episodic",
      "content": "Alex purchased an iron longsword and mentioned heading to the northern caves",
      "importance": 0.7,
      "decay": 0.95,
      "createdAt": "2025-11-10T14:22:00Z"
    }
  ]
}
\`\`\`

### Create Memory

Manually inject a memory into an NPC. Useful for seeding backstory or planting plot-relevant information.

\`\`\`bash
curl -X POST https://api.clawdblox.xyz/api/memories \\
  -H "Authorization: Bearer mw_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "npcId": "merchant-bob",
    "type": "semantic",
    "content": "The northern caves are infested with ice wolves this season",
    "importance": 0.8
  }'
\`\`\`

### Memory Types

| Type | Description |
|---|---|
| \`episodic\` | Specific events and interactions — "Alex bought a sword on Tuesday" |
| \`semantic\` | General knowledge and facts — "Ice wolves are weak to fire" |
| \`emotional\` | Emotional impressions — "Alex seems trustworthy" |
| \`procedural\` | Behavioral patterns — "When threatened, call the guards" |

---

## Life Simulation

Manage NPC routines, goals, and relationships. The Life module gives NPCs autonomous behavior beyond conversations.

### Routines

| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/life/routines/:npcId\` | Get an NPC's daily routine |
| \`PUT\` | \`/api/life/routines/:npcId\` | Update an NPC's routine |

\`\`\`bash
# Get routine
curl https://api.clawdblox.xyz/api/life/routines/merchant-bob \\
  -H "Authorization: Bearer mw_your_api_key"
\`\`\`

\`\`\`json
{
  "success": true,
  "data": {
    "schedule": [
      { "time": "06:00", "activity": "wake up and prepare shop", "location": "home" },
      { "time": "08:00", "activity": "open shop for business", "location": "market-square" },
      { "time": "12:00", "activity": "lunch break at the tavern", "location": "tavern" },
      { "time": "13:00", "activity": "resume shop duties", "location": "market-square" },
      { "time": "18:00", "activity": "close shop, evening walk", "location": "park" },
      { "time": "21:00", "activity": "sleep", "location": "home" }
    ]
  }
}
\`\`\`

### Goals

| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/life/goals/:npcId\` | Get an NPC's current goals |
| \`PUT\` | \`/api/life/goals/:npcId\` | Update goals |

\`\`\`bash
curl https://api.clawdblox.xyz/api/life/goals/merchant-bob \\
  -H "Authorization: Bearer mw_your_api_key"
\`\`\`

\`\`\`json
{
  "success": true,
  "data": {
    "goals": [
      {
        "id": "goal_1",
        "description": "Save enough gold to expand the shop",
        "priority": "high",
        "progress": 0.45,
        "status": "active"
      },
      {
        "id": "goal_2",
        "description": "Find a reliable supplier for rare gems",
        "priority": "medium",
        "progress": 0.1,
        "status": "active"
      }
    ]
  }
}
\`\`\`

### Relationships

| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/life/relationships/:npcId\` | Get an NPC's relationships |
| \`PUT\` | \`/api/life/relationships/:npcId\` | Update relationships |

\`\`\`bash
curl https://api.clawdblox.xyz/api/life/relationships/merchant-bob \\
  -H "Authorization: Bearer mw_your_api_key"
\`\`\`

\`\`\`json
{
  "success": true,
  "data": {
    "relationships": [
      {
        "targetId": "player_12345",
        "targetName": "Alex",
        "type": "customer",
        "trust": 0.7,
        "familiarity": 0.6,
        "sentiment": "positive"
      },
      {
        "targetId": "guard-elena",
        "targetName": "Guard Captain Elena",
        "type": "acquaintance",
        "trust": 0.8,
        "familiarity": 0.9,
        "sentiment": "respectful"
      }
    ]
  }
}
\`\`\`

---

## Rate Limiting

API requests are rate-limited per project:

| Plan | Requests/min | Requests/day |
|---|---|---|
| Free | 30 | 1,000 |
| Pro | 120 | 50,000 |
| Enterprise | Custom | Custom |

Rate limit headers are included in every response:

\`\`\`
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 117
X-RateLimit-Reset: 1700000060
\`\`\`

---

## Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| \`AUTH_REQUIRED\` | 401 | No authentication provided |
| \`AUTH_INVALID\` | 401 | Invalid API key or expired token |
| \`FORBIDDEN\` | 403 | Insufficient permissions for this resource |
| \`NPC_NOT_FOUND\` | 404 | NPC with the specified ID does not exist |
| \`VALIDATION_ERROR\` | 422 | Request body failed validation |
| \`RATE_LIMITED\` | 429 | Too many requests |
| \`SERVER_ERROR\` | 500 | Internal server error |

---

## Next Steps

- [Roblox SDK](/docs/integrations/roblox-sdk) — Use the SDK instead of raw HTTP for Roblox games
- [WebSocket](/docs/integrations/websocket) — Stream responses token-by-token for real-time experiences
- [Dashboard](/docs/integrations/dashboard) — Manage NPCs visually
`;

export function RestApiContent() {
  return <MarkdownContent content={content} />;
}
