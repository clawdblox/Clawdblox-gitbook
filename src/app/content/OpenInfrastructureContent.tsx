import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Open Infrastructure for Builders

**ClawdBlox is not a walled garden.** Everything the Foundation builds — APIs, SDKs, documentation, server configurations — is designed to be open, portable, and developer-friendly. If you build with ClawdBlox, you own what you build.

> Open infrastructure means you choose to stay because it's great — not because you're locked in.

---

## Open API for Every Game Engine

MemoryWeave exposes a clean, RESTful API complemented by WebSocket connections for real-time streaming. This means any game engine that can make HTTP requests can integrate AI NPCs:

| Engine | Integration Method |
|---|---|
| **Roblox** | Luau SDK (Foundation-maintained) via HttpService |
| **Unity** | C# SDK with async/await and WebSocket support |
| **Unreal Engine** | C++ / Blueprint plugin with HTTP and WebSocket modules |
| **Godot** | GDScript SDK with HTTPRequest and WebSocketClient nodes |
| **Custom Engines** | Direct REST API + WebSocket — any language, any platform |
| **Web Games** | JavaScript/TypeScript SDK for browser-based experiences |

### No Engine Favoritism

The API is engine-agnostic by design. Every feature available to Roblox developers is available to Unity developers, Godot developers, and anyone building a custom engine. The Foundation does not play favorites.

---

## Foundation-Maintained SDKs

Raw API access is powerful but verbose. The Foundation develops and maintains official SDKs that handle the boilerplate so developers can focus on game logic:

### What Every SDK Provides

- **NPC Management** — Create, configure, and update NPCs with personality traits and backstories
- **Conversation Handling** — Send player messages, receive AI responses, manage conversation context
- **Memory Access** — Query, create, and manage NPC memories programmatically
- **Streaming Support** — Real-time word-by-word NPC responses via WebSocket
- **Authentication** — API key management and secure player authentication (HMAC-SHA256)
- **Error Handling** — Graceful degradation, retry logic, and meaningful error messages
- **Type Safety** — Full type definitions for every API entity and response

### SDK Development Philosophy

1. **Convention over configuration** — Sensible defaults that work out of the box
2. **Progressive disclosure** — Simple things are simple, complex things are possible
3. **Minimal dependencies** — SDKs are lightweight and don't bloat your project
4. **Version stability** — Semantic versioning with no surprise breaking changes

---

## Documentation and Developer Support

Open source without documentation is just open confusion. The Foundation invests heavily in developer education:

### Developer Resources

- **API Reference** — Complete endpoint documentation with request/response examples
- **Getting Started Guides** — Engine-specific tutorials from zero to first NPC conversation
- **Architecture Docs** — Deep dives into how MemoryWeave works under the hood
- **Code Examples** — Real-world integration patterns for common game scenarios
- **Migration Guides** — Clear upgrade paths when new API versions ship

### Community Support

- **Discord Community** — Direct access to Foundation developers and fellow builders
- **GitHub Discussions** — Technical Q&A, feature requests, and bug reports
- **Developer Blog** — Technical deep dives, case studies, and ecosystem updates

---

## No Vendor Lock-In

This is not a marketing bullet point. It is an architectural commitment.

### Your NPCs Are Yours

- NPC configurations (personality, backstory, traits) can be exported at any time
- Memory data is stored in standard PostgreSQL — no proprietary formats
- Vector embeddings use industry-standard dimensions and similarity metrics

### Your Data Is Yours

- Full data export capabilities via API
- No data hostage tactics — if you want to leave, you take everything with you
- Self-hosting option means you can run your own MemoryWeave instance with your own data

### Your Code Is Yours

- SDKs are open source under permissive licenses
- No SDK call-home requirements or telemetry
- Integration code you write belongs to you entirely

### The Portability Promise

If ClawdBlox disappeared tomorrow, your NPCs would not disappear with it. You would have your data, your configurations, and the ability to self-host the open-source stack. This is by design. Infrastructure that holds your work hostage is not infrastructure — it is a trap.

---

## Community-Driven Development

The Foundation builds in the open and listens to the community:

### How Developers Shape the Roadmap

- **Public roadmap** — Everyone can see what's planned, in progress, and shipped
- **Feature requests** — Community members propose and vote on new capabilities
- **Beta programs** — Early access to new features for developers who want to help test
- **Open RFCs** — Major architectural decisions are discussed publicly before implementation

### Contributing

MemoryWeave is open to contributions. Whether it's a bug fix, a new SDK, a documentation improvement, or a feature implementation — the Foundation welcomes developers who want to build alongside us.

Contributors who make significant impact are eligible for Foundation grants funded by the $BLOX treasury.

---

## The Open Infrastructure Principle

Closed platforms grow fast but die faster. Open infrastructure grows steadily and compounds.

The Foundation's bet is simple: if we build the best open infrastructure for AI NPCs, developers will choose to use it — not because they have to, but because nothing else comes close. And every developer who builds on it makes the ecosystem stronger for everyone.

**Open APIs. Open SDKs. Open documentation. Open development. Your NPCs, your data, your rules.**
`;

export function OpenInfrastructureContent() {
  return <MarkdownContent content={content} />;
}
