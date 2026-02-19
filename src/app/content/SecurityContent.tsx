import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Security & Infrastructure

MemoryWeave handles sensitive data — API keys, player identities, conversation content, and AI provider credentials. This page details every security layer in the system, from authentication to encryption to WebSocket hardening.

---

## Authentication Architecture

MemoryWeave uses a three-tier authentication system, each designed for a different client type:

\`\`\`
  Authentication Methods
  ======================

  +-------------------+     +-------------------+     +-------------------+
  |   JWT Cookies     |     |   API Keys        |     |   HMAC-SHA256     |
  |   (Dashboard)     |     |   (Server-to-     |     |   (Player Auth)   |
  |                   |     |    Server)         |     |                   |
  |  Human users      |     |  CLAWD agent,     |     |  Game clients     |
  |  via web browser  |     |  Roblox servers,  |     |  authenticating   |
  |                   |     |  external apps    |     |  individual       |
  |                   |     |                   |     |  players           |
  +-------------------+     +-------------------+     +-------------------+
\`\`\`

---

### Tier 1: JWT Authentication (Dashboard Users)

For human users accessing the Dashboard web interface.

**Flow:**

\`\`\`
  1. User logs in with email + password
  2. Server verifies bcrypt-hashed password
  3. Server issues two tokens:
     - Access token  (15 min expiry, httpOnly cookie)
     - Refresh token (7 day expiry, httpOnly cookie)
  4. Client includes cookies automatically on every request
  5. When access token expires, client hits /auth/refresh
  6. Server validates refresh token and issues new pair
\`\`\`

**Security properties:**

| Property | Implementation |
|---|---|
| Password storage | bcrypt with auto-generated salt |
| Token storage | httpOnly cookies (not accessible via JavaScript) |
| Token signing | HS256 with server-side secret |
| Access token TTL | 15 minutes |
| Refresh token TTL | 7 days |
| CSRF protection | SameSite=Strict cookie attribute |
| Secure transport | Secure flag (HTTPS only in production) |

httpOnly cookies were chosen over localStorage because they are immune to XSS attacks. Even if an attacker injects JavaScript into the page, they cannot read or exfiltrate the tokens.

---

### Tier 2: API Key Authentication (Server-to-Server)

For programmatic access from game servers, the CLAWD agent, and external integrations.

**Key format:**

\`\`\`
mw_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
|   |
|   Random 32-character hex string
|
Prefix (always "mw_")
\`\`\`

**Security properties:**

| Property | Implementation |
|---|---|
| Key generation | Cryptographically random (32 bytes hex) |
| Storage | bcrypt-hashed (the plain key is shown once, never stored) |
| Lookup strategy | Prefix-based: the \`mw_\` prefix + first 8 chars are stored unhashed for lookup, then the full key is verified against the bcrypt hash |
| Transmission | \`Authorization: Bearer mw_...\` header over HTTPS |
| Revocation | Immediate deletion from database |

**Why prefix-based lookup?**

bcrypt hashes cannot be searched — you cannot query "find the row where bcrypt_verify(key, hash) = true" without checking every row. The prefix-based approach stores the first 8 characters in plaintext to narrow the search to a single row, then verifies the full key against the bcrypt hash. This gives O(1) lookup performance while keeping the full key securely hashed.

\`\`\`sql
-- Lookup: find candidate by prefix
SELECT * FROM api_keys WHERE key_prefix = 'mw_a1b2c3d4';

-- Verify: check full key against bcrypt hash
-- bcrypt.compare('mw_a1b2c3d4e5f6...', row.key_hash)
\`\`\`

---

### Tier 3: HMAC-SHA256 Player Authentication

For authenticating individual players from game clients (Roblox, Unity, etc.). The game server signs a message on behalf of the player, and MemoryWeave verifies the signature.

**Flow:**

\`\`\`
  Game Server                        MemoryWeave
  ===========                        ===========

  1. Player joins game
  2. Game server creates payload:
     { player_id, timestamp }
  3. Game server signs with HMAC-SHA256:
     signature = HMAC(secret, payload)
  4. Sends: { player_id, timestamp,   ──────>  5. Verifies:
              signature }                          a. timestamp < 5 min old?
                                                   b. HMAC(secret, payload)
                                                      === signature?
                                                   c. Timing-safe compare
                                               6. If valid: authenticated
\`\`\`

**Security properties:**

| Property | Implementation |
|---|---|
| Algorithm | HMAC-SHA256 |
| Shared secret | Per-project secret, generated on project creation |
| Timestamp validation | Must be within 5 minutes of server time (prevents replay attacks) |
| Comparison method | Timing-safe compare (\`crypto.timingSafeEqual\`) |
| Replay protection | Timestamp window + optional nonce |

**Why timing-safe compare?**

A standard string comparison (\`===\`) returns \`false\` at the first mismatched character, leaking information about how many characters matched. An attacker could measure response times to progressively guess the correct signature byte-by-byte. \`crypto.timingSafeEqual\` always takes the same amount of time regardless of where the mismatch occurs, eliminating this side-channel.

---

## BYOK — Bring Your Own Key

Projects can provide their own AI provider API keys (Groq, OpenAI) instead of using the platform's default keys. These keys are stored with AES-256-GCM encryption.

**Encryption flow:**

\`\`\`
  User provides API key
        |
        v
  +---------------------------+
  | AES-256-GCM Encryption     |
  |                             |
  | - Generate random 96-bit IV |
  | - Encrypt with server key   |
  | - Produce auth tag          |
  | - Store: IV + ciphertext    |
  |          + auth tag          |
  +---------------------------+
        |
        v
  Stored in PostgreSQL
  (encrypted, not plaintext)
\`\`\`

**Why AES-256-GCM?**

| Property | Benefit |
|---|---|
| AES-256 | 256-bit key, considered unbreakable with current technology |
| GCM mode | Provides both confidentiality (encryption) and integrity (authentication tag) |
| Random IV | Each encryption uses a unique initialization vector, so encrypting the same key twice produces different ciphertext |
| Auth tag | Detects any tampering with the encrypted data |

**Key hierarchy:**

\`\`\`
  Server encryption key (environment variable)
        |
        +──> Encrypts BYOK key for Project A
        +──> Encrypts BYOK key for Project B
        +──> Encrypts BYOK key for Project C
\`\`\`

The server encryption key is stored as an environment variable, never in the database or codebase.

---

## WebSocket Security — 7 Protections

The WebSocket gateway implements seven distinct security mechanisms:

### 1. Authentication Timeout (10 seconds)

\`\`\`
  Client connects via WebSocket
        |
        +──> 10 second timer starts
        |
        v
  Client must send auth message within 10s
        |
  YES ──+──> Connection authenticated
        |
  NO  ──+──> Connection forcibly closed
             (code: 4001 AUTH_TIMEOUT)
\`\`\`

Prevents unauthenticated connections from occupying server resources.

### 2. Heartbeat (30 seconds)

\`\`\`
  Every 30 seconds:
    Server sends:  PING
    Client must:   PONG (within timeout)

  If client misses heartbeat:
    Connection closed (code: 4002 HEARTBEAT_TIMEOUT)
\`\`\`

Detects dead connections (client crashed, network dropped) and cleans them up.

### 3. Inactivity Timeout (5 minutes)

\`\`\`
  No messages sent for 5 minutes
        |
        v
  Connection closed (code: 4003 INACTIVITY)
\`\`\`

Frees resources from idle connections. Different from heartbeat — a client can respond to pings but still be inactive (no real messages).

### 4. Connection Limits (per project)

\`\`\`
  New connection attempt for Project X
        |
        v
  Current connections for Project X: 47 / 50
        |
  UNDER LIMIT ──> Allow connection
  AT LIMIT    ──> Reject connection (code: 4004 CONN_LIMIT)
\`\`\`

Prevents a single project from monopolizing server resources. Configurable per project.

### 5. Message Size Limit (4 KB)

\`\`\`
  Incoming message: 12,847 bytes
        |
        v
  > 4096 bytes? YES
        |
        v
  Message rejected (code: 4005 MSG_TOO_LARGE)
\`\`\`

Prevents memory exhaustion from oversized messages. 4 KB is sufficient for any reasonable player message.

### 6. Rate Limiting

\`\`\`
  Player sends message
        |
        v
  Rate limit check (Redis counter):
    Messages in last 60s: 14 / 15
        |
  UNDER LIMIT ──> Process message
  AT LIMIT    ──> Reject with error, do not call AI
\`\`\`

Prevents abuse and controls AI API costs. Rate limits are tracked per player per NPC in Redis.

### 7. Graceful Shutdown

\`\`\`
  Server receives SIGTERM
        |
        v
  1. Stop accepting new connections
  2. Send close frame to all clients (code: 1001 GOING_AWAY)
  3. Wait for in-flight AI responses to complete (up to 30s)
  4. Force close remaining connections
  5. Shut down
\`\`\`

Ensures players receive their in-progress responses during deployments instead of getting disconnected mid-sentence.

---

## Protection Summary

\`\`\`
  Security Layer Matrix
  =====================

  Layer                    Protects Against
  ─────                    ────────────────
  JWT httpOnly cookies     XSS token theft
  bcrypt passwords         Password database leaks
  bcrypt API keys          API key database leaks
  Prefix-based lookup      O(1) key verification
  HMAC-SHA256 + timestamp  Player impersonation, replay attacks
  Timing-safe compare      Timing side-channel attacks
  AES-256-GCM BYOK        API key exposure in database
  Input sanitization       Prompt injection (3 layers)
  Injection detection      18 known attack patterns
  Auth timeout             Resource exhaustion
  Heartbeat                Dead connection detection
  Inactivity timeout       Idle resource waste
  Connection limits        Per-project DoS
  Message size limit       Memory exhaustion
  Rate limiting            Abuse and cost control
  Graceful shutdown        Data loss during deployment
\`\`\`

---

## Docker Deployment

MemoryWeave runs as a Docker Compose stack with three services:

\`\`\`yaml
# Simplified view of the production stack
services:
  server:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://...
      - JWT_SECRET=...
      - ENCRYPTION_KEY=...  # For AES-256-GCM BYOK
    depends_on:
      - postgres
      - redis

  postgres:
    image: pgvector/pgvector:pg16
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data
\`\`\`

**Deployment command:**

\`\`\`bash
docker compose -f docker/docker-compose.yml --env-file .env up -d --build
\`\`\`

**Key deployment practices:**

| Practice | Implementation |
|---|---|
| Secrets management | All secrets in \`.env\` file, never in docker-compose.yml |
| Persistent storage | Named volumes for PostgreSQL and Redis data |
| Auto-restart | \`restart: unless-stopped\` for all services |
| Health checks | PostgreSQL and Redis health check commands |
| Network isolation | Services communicate on internal Docker network |
| pgvector | Uses official \`pgvector/pgvector\` image with PostgreSQL 16 |

---

## What's Next?

- [Architecture Overview](/docs/memoryweave/architecture) — The full system diagram
- [Conversation Pipeline](/docs/memoryweave/conversation-pipeline) — How security layers integrate with the pipeline
- [Semantic Memory](/docs/memoryweave/semantic-memory) — How vector data is stored securely
`;

export function SecurityContent() {
  return <MarkdownContent content={content} />;
}
