import { MarkdownContent } from '../components/content/MarkdownContent';

const content = `
# Coming Soon

ClawdBlox is expanding beyond Roblox. Our goal is to bring persistent, intelligent NPCs to **every game engine and platform**. Here is what is on the roadmap.

---

## Unity SDK

**Status:** In Development

A native C# package for Unity, distributed via the Unity Package Manager. The Unity SDK will provide the same developer experience as our Roblox SDK — initialize, configure, and chat in a few lines of code.

### Planned Features

| Feature | Description |
|---|---|
| **C# Native** | Fully typed C# API with async/await support |
| **HMAC-SHA256 Auth** | Same cryptographic player authentication as the Roblox SDK |
| **WebSocket Streaming** | Real-time token streaming with automatic fallback to REST |
| **Editor Integration** | Configure NPCs directly in the Unity Inspector |
| **ScriptableObject Config** | Store NPC references and project settings as Unity assets |

### Planned API Preview

\`\`\`csharp
using ClawdBlox;

// Initialize in your GameManager
ClawdBloxClient.Init(new ClawdBloxConfig {
    ProjectId = "your-project-id",
    SecretKey = "your-secret-key"
});

// Chat with an NPC
var response = await ClawdBloxClient.Chat(new ChatRequest {
    NpcId = "merchant-bob",
    PlayerId = player.Id,
    PlayerName = player.DisplayName,
    Message = "What do you have for sale?"
});

Debug.Log(response.Message);
\`\`\`

---

## Unreal Engine SDK

**Status:** Planned

A C++ plugin for Unreal Engine 5, available via the Unreal Marketplace. Designed for both Blueprint and C++ workflows.

### Planned Features

| Feature | Description |
|---|---|
| **C++ & Blueprint** | Full API accessible from both C++ code and Blueprint visual scripting |
| **Actor Component** | Drop a ClawdBlox component onto any NPC Actor for instant integration |
| **Subsystem Architecture** | Runs as a Game Instance Subsystem for clean lifecycle management |
| **Streaming Support** | WebSocket streaming with UE5 async tasks |

### Planned Blueprint Workflow

1. Add the **ClawdBlox NPC Component** to your NPC Actor
2. Set the NPC ID and project credentials in the Details panel
3. Call the **Chat** node from any Blueprint
4. Handle the response via an event dispatcher

---

## Godot Support

**Status:** Planned

GDScript and C# support for Godot 4.x, distributed as an addon.

### Planned Features

| Feature | Description |
|---|---|
| **GDScript & C#** | Support for both Godot scripting languages |
| **Node-Based** | ClawdBloxNPC node that attaches to any CharacterBody3D |
| **Signal-Driven** | Responses emitted as Godot signals for clean event handling |
| **Editor Plugin** | NPC configuration directly in the Godot editor |

### Planned API Preview

\`\`\`gdscript
extends CharacterBody3D

@onready var npc = $ClawdBloxNPC

func _ready():
    npc.initialize("your-project-id", "your-secret-key")
    npc.response_received.connect(_on_response)

func _on_player_interact(player_id: String, message: String):
    npc.chat(player_id, message)

func _on_response(response: Dictionary):
    dialogue_label.text = response["message"]
\`\`\`

---

## Custom Engines & Platforms

**Status:** Available Now

You do not need an official SDK to use ClawdBlox. Any game engine, application, or platform that can make **HTTP requests** can integrate with MemoryWeave today using our public APIs:

- **[REST API](/docs/integrations/rest-api)** — Standard HTTP endpoints for all NPC operations
- **[WebSocket](/docs/integrations/websocket)** — Real-time streaming over WebSocket

If your engine supports HTTP and JSON, you can integrate ClawdBlox. The REST API is engine-agnostic and works with:

- Custom C/C++ engines
- Java / Kotlin (Android games)
- Swift (iOS games)
- Rust-based engines (Bevy, Amethyst)
- HTML5 / browser games
- Any platform with network capabilities

### Minimal Integration Requirements

| Requirement | Details |
|---|---|
| **HTTP Client** | Ability to make HTTPS POST requests |
| **JSON Parser** | Parse JSON response bodies |
| **HMAC-SHA256** | For player authentication (most languages have crypto libraries) |
| **WebSocket** (optional) | For real-time streaming responses |

---

## Stay Updated

We announce new SDK releases and platform support through our official channels. Follow the project to be the first to know when your engine is supported.

If you want to request priority support for a specific engine or platform, reach out to the team — community demand directly influences our roadmap.

---

## Next Steps

- [REST API](/docs/integrations/rest-api) — Start integrating today with any engine
- [WebSocket](/docs/integrations/websocket) — Add real-time streaming to your custom integration
- [Roblox SDK](/docs/integrations/roblox-sdk) — See our reference SDK implementation
`;

export function ComingSoonContent() {
  return <MarkdownContent content={content} />;
}
