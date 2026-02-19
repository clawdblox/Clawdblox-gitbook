import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { ChevronRight, Search, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

const navigation = [
  {
    label: 'Introduction',
    items: [
      { title: 'What is ClawdBlox?', href: '/docs/introduction/what-is-clawdblox' },
      { title: 'The Vision', href: '/docs/introduction/the-vision' },
      { title: 'Core Concepts', href: '/docs/introduction/core-concepts' },
    ],
  },
  {
    label: 'MemoryWeave Engine',
    items: [
      { title: 'Architecture Overview', href: '/docs/memoryweave/architecture' },
      { title: 'Semantic Memory (pgvector)', href: '/docs/memoryweave/semantic-memory' },
      { title: 'Personality System (OCEAN)', href: '/docs/memoryweave/personality-system' },
      { title: 'Life Simulation', href: '/docs/memoryweave/life-simulation' },
      { title: 'Conversation Pipeline', href: '/docs/memoryweave/conversation-pipeline' },
      { title: 'Security & Infrastructure', href: '/docs/memoryweave/security' },
    ],
  },
  {
    label: 'CLAWD — The OpenClaw Agent',
    items: [
      { title: 'What is CLAWD?', href: '/docs/clawd/what-is-clawd' },
      { title: 'NPC Relay (Telegram & Discord)', href: '/docs/clawd/npc-relay' },
      { title: 'Admin Management Skills', href: '/docs/clawd/admin-skills' },
      { title: 'Cross-Platform Identity', href: '/docs/clawd/cross-platform-identity' },
      { title: 'Future Features & Roadmap', href: '/docs/clawd/future-features' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { title: 'Roblox SDK', href: '/docs/integrations/roblox-sdk' },
      { title: 'Dashboard (Web UI)', href: '/docs/integrations/dashboard' },
      { title: 'REST API Reference', href: '/docs/integrations/rest-api' },
      { title: 'WebSocket Streaming', href: '/docs/integrations/websocket' },
      { title: 'Coming Soon — Unity, Unreal', href: '/docs/integrations/coming-soon' },
    ],
  },
  {
    label: '$BLOX Token',
    items: [
      { title: 'Token Overview', href: '/docs/token/overview' },
      { title: 'Clanker Launch on Base', href: '/docs/token/clanker-launch' },
    ],
  },
  {
    label: 'Roadmap',
    items: [
      { title: 'Phase 1 — The Neural Foundation', href: '/docs/roadmap/phase-1' },
      { title: 'Phase 2 — The Roblox Invasion', href: '/docs/roadmap/phase-2' },
      { title: 'Phase 3 — Agent Economy', href: '/docs/roadmap/phase-3' },
      { title: 'Phase 4 — The Singularity', href: '/docs/roadmap/phase-4' },
    ],
  },
  {
    label: 'The Foundation',
    items: [
      { title: 'Mission & Vision', href: '/docs/foundation/mission' },
      { title: 'Foundation-Operated Servers', href: '/docs/foundation/servers' },
      { title: 'Open Infrastructure', href: '/docs/foundation/open-infrastructure' },
      { title: 'How Fees Fund Innovation', href: '/docs/foundation/funding-model' },
    ],
  },
];

const externalLinks = [
  { title: 'Dashboard', url: 'https://clawdblox.xyz' },
  { title: 'Telegram', url: 'https://t.me/clawdblox' },
  { title: 'GitHub', url: 'https://github.com/clawdblox' },
];

function NavItem({ item, depth = 0 }: { item: any, depth?: number }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  // Auto-expand if child is active
  React.useEffect(() => {
    if (hasChildren) {
      const isChildActive = item.children.some((child: any) => 
        location.pathname === child.href || location.pathname.startsWith(child.href + '/')
      );
      if (isChildActive) {
        setIsOpen(true);
      }
    }
  }, [location.pathname, hasChildren, item.children]);

  return (
    <div className="mb-0.5">
      {hasChildren ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "w-full flex items-center justify-between px-4 py-1.5 text-sm text-mw-text-secondary hover:text-mw-text-primary hover:bg-mw-bg-tertiary rounded-md transition-colors",
              depth > 0 && "ml-3 border-l border-mw-border-subtle rounded-none px-3"
            )}
            style={{ paddingLeft: depth === 0 ? '16px' : `${16 + depth * 12}px` }}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon size={16} className="text-mw-accent-violet" />}
              <span>{item.title}</span>
            </div>
            <ChevronRight
              size={14}
              className={clsx("transition-transform duration-200", isOpen && "rotate-90")}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {item.children.map((child: any, i: number) => (
                  <NavItem key={i} item={child} depth={depth + 1} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <NavLink
          to={item.href}
          className={({ isActive }) => clsx(
            "flex items-center justify-between px-4 py-1.5 text-sm rounded-md transition-all duration-150",
            isActive 
              ? "bg-mw-accent-cyan/10 text-mw-accent-cyan font-medium border-l-2 border-mw-accent-cyan"
              : "text-mw-text-secondary hover:text-mw-text-primary hover:bg-mw-bg-tertiary border-l-2 border-transparent",
             depth > 0 && "ml-3 rounded-none px-3"
          )}
          style={{ paddingLeft: depth === 0 ? '16px' : `${16 + depth * 12}px` }}
        >
          <div className="flex items-center gap-2">
             {Icon && <Icon size={16} className={clsx("transition-colors", item.badge === 'stable' ? "text-green-500" : "text-mw-text-tertiary")} />}
            <span>{item.title}</span>
          </div>
          {item.badge && (
            <span className={clsx(
              "text-[10px] px-1.5 py-0.5 rounded font-bold uppercase",
              item.badge === 'new' ? "bg-mw-accent-cyan/20 text-mw-accent-cyan" :
              item.badge === 'beta' ? "bg-mw-accent-violet/20 text-mw-accent-violet" :
              "bg-mw-bg-tertiary text-mw-text-tertiary"
            )}>
              {item.badge}
            </span>
          )}
        </NavLink>
      )}
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <>
      <aside className={clsx(
        "fixed left-0 top-14 bottom-0 w-[260px] bg-mw-bg-primary border-r border-mw-border-subtle overflow-y-auto z-40 transition-transform duration-300 md:translate-x-0 pb-8",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 sticky top-0 bg-mw-bg-primary z-10">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-mw-text-tertiary" size={14} />
            <div className="w-full bg-mw-bg-secondary border border-mw-border-subtle rounded-md pl-9 pr-3 py-2 text-sm text-mw-text-secondary cursor-pointer hover:border-mw-border-default transition-colors">
              Search...
              <span className="float-right text-xs bg-mw-bg-tertiary px-1 rounded border border-mw-border-subtle mt-0.5">⌘K</span>
            </div>
          </div>
        </div>

        <nav className="px-2">
          {navigation.map((section, idx) => (
            <div key={idx} className="mb-6">
              {section.label && (
                <h3 className="px-4 mb-2 text-[11px] font-bold text-mw-text-tertiary uppercase tracking-wider">
                  {section.label}
                </h3>
              )}
              {section.items.map((item, i) => (
                <NavItem key={i} item={item} />
              ))}
            </div>
          ))}
        </nav>
        
        <div className="px-2 mb-20">
          <h3 className="px-4 mb-2 text-[11px] font-bold text-mw-text-tertiary uppercase tracking-wider">
            External Links
          </h3>
          {externalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-1.5 text-sm text-mw-text-secondary hover:text-mw-text-primary hover:bg-mw-bg-tertiary rounded-md transition-colors"
            >
              <span>{link.title}</span>
              <ExternalLink size={12} className="text-mw-text-tertiary" />
            </a>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-mw-border-subtle bg-mw-bg-primary">
          <div className="flex items-center justify-between text-xs text-mw-text-tertiary">
            <span>Powered by ClawdBlox</span>
            <span className="font-mono">v1.0</span>
          </div>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
    </>
  );
}
