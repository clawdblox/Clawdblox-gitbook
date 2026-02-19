import React from 'react';
import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { DocPage } from './pages/DocPage';

// Introduction
import { WhatIsClawdbloxContent } from './content/WhatIsClawdbloxContent';
import { TheVisionContent } from './content/TheVisionContent';
import { CoreConceptsContent } from './content/CoreConceptsContent';

// MemoryWeave Engine
import { ArchitectureContent } from './content/ArchitectureContent';
import { SemanticMemoryContent } from './content/SemanticMemoryContent';
import { PersonalitySystemContent } from './content/PersonalitySystemContent';
import { LifeSimulationContent } from './content/LifeSimulationContent';
import { ConversationPipelineContent } from './content/ConversationPipelineContent';
import { SecurityContent } from './content/SecurityContent';

// CLAWD
import { WhatIsClawdContent } from './content/WhatIsClawdContent';
import { NpcRelayContent } from './content/NpcRelayContent';
import { AdminSkillsContent } from './content/AdminSkillsContent';
import { CrossPlatformIdentityContent } from './content/CrossPlatformIdentityContent';
import { FutureFeaturesContent } from './content/FutureFeaturesContent';

// Integrations
import { RobloxSdkContent } from './content/RobloxSdkContent';
import { DashboardContent } from './content/DashboardContent';
import { RestApiContent } from './content/RestApiContent';
import { WebsocketContent } from './content/WebsocketContent';
import { ComingSoonContent } from './content/ComingSoonContent';

// Token
import { TokenOverviewContent } from './content/TokenOverviewContent';
import { ClankerLaunchContent } from './content/ClankerLaunchContent';

// Roadmap
import { Phase1Content } from './content/Phase1Content';
import { Phase2Content } from './content/Phase2Content';
import { Phase3Content } from './content/Phase3Content';
import { Phase4Content } from './content/Phase4Content';

// Foundation
import { MissionContent } from './content/MissionContent';
import { ServersContent } from './content/ServersContent';
import { OpenInfrastructureContent } from './content/OpenInfrastructureContent';
import { FundingModelContent } from './content/FundingModelContent';

// Wrapper for DocPage to inject specific content
const DocRoute = ({ title, description, crumbs, ContentComponent }: any) => (
  <DocPage title={title} description={description} breadcrumbs={crumbs}>
    <ContentComponent />
  </DocPage>
);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: 'docs',
        children: [
          // Introduction
          {
            path: 'introduction/what-is-clawdblox',
            element: <DocRoute
              title="What is ClawdBlox?"
              description="An AI NPC engine with persistent memory, personality modeling, and life simulation."
              crumbs={[{ label: 'Introduction' }, { label: 'What is ClawdBlox?' }]}
              ContentComponent={WhatIsClawdbloxContent}
            />
          },
          {
            path: 'introduction/the-vision',
            element: <DocRoute
              title="The Vision"
              description="Why NPCs deserve a soul — and how ClawdBlox makes it possible."
              crumbs={[{ label: 'Introduction' }, { label: 'The Vision' }]}
              ContentComponent={TheVisionContent}
            />
          },
          {
            path: 'introduction/core-concepts',
            element: <DocRoute
              title="Core Concepts"
              description="The fundamental building blocks of ClawdBlox: OCEAN personality, memory types, and life simulation."
              crumbs={[{ label: 'Introduction' }, { label: 'Core Concepts' }]}
              ContentComponent={CoreConceptsContent}
            />
          },

          // MemoryWeave Engine
          {
            path: 'memoryweave/architecture',
            element: <DocRoute
              title="Architecture Overview"
              description="How MemoryWeave is built — from WebSocket gateway to vector database."
              crumbs={[{ label: 'MemoryWeave Engine' }, { label: 'Architecture Overview' }]}
              ContentComponent={ArchitectureContent}
            />
          },
          {
            path: 'memoryweave/semantic-memory',
            element: <DocRoute
              title="Semantic Memory (pgvector)"
              description="How memories are stored, retrieved, ranked, and naturally forgotten over time."
              crumbs={[{ label: 'MemoryWeave Engine' }, { label: 'Semantic Memory' }]}
              ContentComponent={SemanticMemoryContent}
            />
          },
          {
            path: 'memoryweave/personality-system',
            element: <DocRoute
              title="Personality System (OCEAN)"
              description="The Big Five personality model and how it shapes NPC behavior."
              crumbs={[{ label: 'MemoryWeave Engine' }, { label: 'Personality System' }]}
              ContentComponent={PersonalitySystemContent}
            />
          },
          {
            path: 'memoryweave/life-simulation',
            element: <DocRoute
              title="Life Simulation"
              description="Routines, goals, and relationships — how NPCs live between conversations."
              crumbs={[{ label: 'MemoryWeave Engine' }, { label: 'Life Simulation' }]}
              ContentComponent={LifeSimulationContent}
            />
          },
          {
            path: 'memoryweave/conversation-pipeline',
            element: <DocRoute
              title="Conversation Pipeline"
              description="The 6-step process from player message to streamed NPC response."
              crumbs={[{ label: 'MemoryWeave Engine' }, { label: 'Conversation Pipeline' }]}
              ContentComponent={ConversationPipelineContent}
            />
          },
          {
            path: 'memoryweave/security',
            element: <DocRoute
              title="Security & Infrastructure"
              description="Authentication, encryption, WebSocket hardening, and deployment."
              crumbs={[{ label: 'MemoryWeave Engine' }, { label: 'Security & Infrastructure' }]}
              ContentComponent={SecurityContent}
            />
          },

          // CLAWD
          {
            path: 'clawd/what-is-clawd',
            element: <DocRoute
              title="What is CLAWD?"
              description="The OpenClaw agent that manages NPCs across Discord and Telegram."
              crumbs={[{ label: 'CLAWD' }, { label: 'What is CLAWD?' }]}
              ContentComponent={WhatIsClawdContent}
            />
          },
          {
            path: 'clawd/npc-relay',
            element: <DocRoute
              title="NPC Relay (Telegram & Discord)"
              description="How CLAWD routes messages between community platforms and MemoryWeave."
              crumbs={[{ label: 'CLAWD' }, { label: 'NPC Relay' }]}
              ContentComponent={NpcRelayContent}
            />
          },
          {
            path: 'clawd/admin-skills',
            element: <DocRoute
              title="Admin Management Skills"
              description="CLAWD's admin commands for NPC management, personality tuning, and memory inspection."
              crumbs={[{ label: 'CLAWD' }, { label: 'Admin Skills' }]}
              ContentComponent={AdminSkillsContent}
            />
          },
          {
            path: 'clawd/cross-platform-identity',
            element: <DocRoute
              title="Cross-Platform Identity"
              description="Unified player profiles across Roblox, Discord, Telegram, and Web."
              crumbs={[{ label: 'CLAWD' }, { label: 'Cross-Platform Identity' }]}
              ContentComponent={CrossPlatformIdentityContent}
            />
          },
          {
            path: 'clawd/future-features',
            element: <DocRoute
              title="Future Features & Roadmap"
              description="Planned features and development roadmap for CLAWD."
              crumbs={[{ label: 'CLAWD' }, { label: 'Future Features' }]}
              ContentComponent={FutureFeaturesContent}
            />
          },

          // Integrations
          {
            path: 'integrations/roblox-sdk',
            element: <DocRoute
              title="Roblox SDK"
              description="Native Luau module for integrating MemoryWeave into Roblox experiences."
              crumbs={[{ label: 'Integrations' }, { label: 'Roblox SDK' }]}
              ContentComponent={RobloxSdkContent}
            />
          },
          {
            path: 'integrations/dashboard',
            element: <DocRoute
              title="Dashboard (Web UI)"
              description="Web-based control panel for NPC creation, testing, and management."
              crumbs={[{ label: 'Integrations' }, { label: 'Dashboard' }]}
              ContentComponent={DashboardContent}
            />
          },
          {
            path: 'integrations/rest-api',
            element: <DocRoute
              title="REST API Reference"
              description="Complete HTTP API reference for MemoryWeave."
              crumbs={[{ label: 'Integrations' }, { label: 'REST API' }]}
              ContentComponent={RestApiContent}
            />
          },
          {
            path: 'integrations/websocket',
            element: <DocRoute
              title="WebSocket Streaming"
              description="Real-time token streaming protocol for game clients."
              crumbs={[{ label: 'Integrations' }, { label: 'WebSocket' }]}
              ContentComponent={WebsocketContent}
            />
          },
          {
            path: 'integrations/coming-soon',
            element: <DocRoute
              title="Coming Soon — Unity, Unreal"
              description="Planned integrations for Unity, Unreal Engine, and more."
              crumbs={[{ label: 'Integrations' }, { label: 'Coming Soon' }]}
              ContentComponent={ComingSoonContent}
            />
          },

          // Token
          {
            path: 'token/overview',
            element: <DocRoute
              title="Token Overview"
              description="The $BLOX token and its role in the ClawdBlox ecosystem."
              crumbs={[{ label: '$BLOX Token' }, { label: 'Overview' }]}
              ContentComponent={TokenOverviewContent}
            />
          },
          {
            path: 'token/clanker-launch',
            element: <DocRoute
              title="Clanker Launch on Base"
              description="How $BLOX was deployed on Base via Clanker."
              crumbs={[{ label: '$BLOX Token' }, { label: 'Clanker Launch' }]}
              ContentComponent={ClankerLaunchContent}
            />
          },

          // Roadmap
          {
            path: 'roadmap/phase-1',
            element: <DocRoute
              title="Phase 1 — The Neural Foundation"
              description="Q1 2026: Core infrastructure, $BLOX TGE, Dashboard V1, CLAWD launch."
              crumbs={[{ label: 'Roadmap' }, { label: 'Phase 1' }]}
              ContentComponent={Phase1Content}
            />
          },
          {
            path: 'roadmap/phase-2',
            element: <DocRoute
              title="Phase 2 — The Roblox Invasion"
              description="Q2 2026: Roblox Studio SDK, contextual awareness, cross-server identity."
              crumbs={[{ label: 'Roadmap' }, { label: 'Phase 2' }]}
              ContentComponent={Phase2Content}
            />
          },
          {
            path: 'roadmap/phase-3',
            element: <DocRoute
              title="Phase 3 — Agent Economy"
              description="Q3 2026: Agent-to-agent communication, economic autonomy, creator monetization."
              crumbs={[{ label: 'Roadmap' }, { label: 'Phase 3' }]}
              ContentComponent={Phase3Content}
            />
          },
          {
            path: 'roadmap/phase-4',
            element: <DocRoute
              title="Phase 4 — The Singularity"
              description="Q4 2026+: Decentralized vector nodes, self-evolving NPCs, full decentralization."
              crumbs={[{ label: 'Roadmap' }, { label: 'Phase 4' }]}
              ContentComponent={Phase4Content}
            />
          },

          // Foundation
          {
            path: 'foundation/mission',
            element: <DocRoute
              title="Mission & Vision"
              description="The ClawdBlox Foundation's mission and long-term vision."
              crumbs={[{ label: 'The Foundation' }, { label: 'Mission & Vision' }]}
              ContentComponent={MissionContent}
            />
          },
          {
            path: 'foundation/servers',
            element: <DocRoute
              title="Foundation-Operated Servers"
              description="Infrastructure operated by the Foundation for the community."
              crumbs={[{ label: 'The Foundation' }, { label: 'Servers' }]}
              ContentComponent={ServersContent}
            />
          },
          {
            path: 'foundation/open-infrastructure',
            element: <DocRoute
              title="Open Infrastructure"
              description="Open-source tooling and infrastructure for the ecosystem."
              crumbs={[{ label: 'The Foundation' }, { label: 'Open Infrastructure' }]}
              ContentComponent={OpenInfrastructureContent}
            />
          },
          {
            path: 'foundation/funding-model',
            element: <DocRoute
              title="How Fees Fund Innovation"
              description="How trading fees and revenue fund Foundation operations and R&D."
              crumbs={[{ label: 'The Foundation' }, { label: 'Funding Model' }]}
              ContentComponent={FundingModelContent}
            />
          },

          // 404
          {
            path: '*',
            element: <DocRoute
              title="Page Not Found"
              crumbs={[{ label: 'Error' }]}
              ContentComponent={() => <div>The requested page could not be found.</div>}
            />
          },
        ],
      },
    ],
  },
]);
