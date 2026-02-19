import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Foundation-Operated Servers

**The ClawdBlox Foundation deploys and maintains dedicated server infrastructure so game developers never have to.** No DevOps headaches. No database tuning. No scaling anxiety. Just an API endpoint and NPCs that work.

> You build the game. We run the brain.

---

## Why Foundation-Operated Servers?

Running AI-powered NPCs at production scale requires serious infrastructure:

- **Vector databases** for semantic memory retrieval across thousands of NPCs
- **AI inference endpoints** for real-time dialogue generation
- **Persistent storage** for personality data, relationship graphs, and life simulation states
- **WebSocket connections** for streaming NPC responses with sub-second latency
- **Caching layers** for fast access to frequently used memories and context

Most game developers — especially indie creators and Roblox builders — don't have the expertise or budget to operate this stack. They shouldn't have to. That's the Foundation's job.

---

## The Full MemoryWeave Stack

Every Foundation server runs the complete MemoryWeave backend, giving developers access to the full range of NPC capabilities:

### PostgreSQL + pgvector

The memory backbone. Every NPC memory — episodic, semantic, emotional, procedural — is stored as a high-dimensional vector embedding (1536 dimensions) alongside structured metadata. This enables:

- **Semantic search** — Retrieve memories by meaning, not just keywords
- **IVFFlat indexing** — Fast approximate nearest-neighbor queries at scale
- **Cosine similarity** — Natural memory relevance scoring
- **Decay modeling** — Memories fade based on importance and recency, just like the human brain

### Redis

The speed layer. Redis handles:

- **Session caching** — Active conversation contexts for instant retrieval
- **Rate limiting** — Protection against abuse without impacting legitimate usage
- **Real-time state** — NPC emotional states and life simulation ticks
- **WebSocket coordination** — Connection management across server instances

### AI Inference

The intelligence layer. Foundation servers route NPC dialogue generation through optimized inference pipelines:

- **Groq-powered inference** — Fast, affordable token generation for real-time conversation
- **BYOK support** — Developers can bring their own API keys for custom model access
- **Context assembly** — Personality + memories + life state + conversation history, assembled and optimized before every generation call
- **Streaming responses** — NPCs respond in real-time via WebSocket, word by word

---

## High Availability for Creators

Foundation servers are built for production reliability:

| Capability | Implementation |
|---|---|
| **Uptime target** | 99.9% availability for API and WebSocket endpoints |
| **Automatic recovery** | Docker-based deployment with health checks and auto-restart |
| **Database backups** | Regular automated backups of all NPC memory data |
| **Connection resilience** | WebSocket reconnection handling with state preservation |
| **Monitoring** | Real-time health monitoring and alerting |

### What This Means for Developers

- **No 3 AM pager duty.** The Foundation team monitors and maintains the infrastructure.
- **No scaling surprises.** Servers are provisioned to handle growth as your game gains players.
- **No data loss.** NPC memories are backed up and protected.
- **No cold starts.** Infrastructure is always warm and ready to serve requests.

---

## Global Deployment Strategy

### Current: Single-Region Deployment

Foundation servers currently operate from a primary deployment region, optimized for the majority of early adopters. This provides:

- Low-latency access for North American and European developers
- Centralized monitoring and rapid iteration
- Cost-efficient operations during the growth phase

### Planned: Multi-Region Expansion

As the ecosystem grows, the Foundation will deploy servers in additional regions:

- **North America** — Primary deployment (active)
- **Europe** — Low-latency access for EU developers and GDPR-aligned data residency
- **Asia-Pacific** — Serving the massive gaming markets in East and Southeast Asia
- **South America** — Supporting the growing Latin American game development community

Each region will run the full MemoryWeave stack independently, with cross-region NPC identity federation planned for later phases.

---

## Funded by $BLOX

Server infrastructure is the single largest operational cost for the Foundation. Every server, every database, every inference call is funded directly by $BLOX trading fees.

This creates a virtuous cycle:

\`\`\`
More developers build with ClawdBlox
  → More players interact with AI NPCs
    → More visibility for the ecosystem
      → More $BLOX activity
        → More funding for servers
          → Better infrastructure for developers
\`\`\`

There is no usage paywall. There is no premium tier gate. The Foundation operates servers as a public good for the ClawdBlox ecosystem, funded by the community that believes in its mission.

---

## For Self-Hosters

While Foundation servers are the easiest way to get started, MemoryWeave is open infrastructure. Developers who want full control can self-host their own instance. The Foundation provides:

- Complete Docker deployment configurations
- Migration scripts for database setup
- Documentation for production deployment
- Community support channels

Foundation servers and self-hosted instances use the same APIs and SDKs. There is no feature gap. The only difference is who operates the infrastructure.
`;

export function ServersContent() {
  return <MarkdownContent content={content} />;
}
