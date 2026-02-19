import React, { useEffect, useState, useRef } from 'react';
import { Search, X, FileText, Hash, ArrowRight, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { clsx } from 'clsx';

interface SearchResult {
  id: string;
  title: string;
  section: string;
  path: string;
  type: 'page' | 'section';
}

// Search index
const searchIndex: SearchResult[] = [
  // Introduction
  { id: '1', title: 'What is ClawdBlox?', section: 'Introduction', path: '/docs/introduction/what-is-clawdblox', type: 'page' },
  { id: '2', title: 'The Vision', section: 'Introduction', path: '/docs/introduction/the-vision', type: 'page' },
  { id: '3', title: 'Core Concepts', section: 'Introduction', path: '/docs/introduction/core-concepts', type: 'page' },
  // MemoryWeave Engine
  { id: '4', title: 'Architecture Overview', section: 'MemoryWeave Engine', path: '/docs/memoryweave/architecture', type: 'page' },
  { id: '5', title: 'Semantic Memory (pgvector)', section: 'MemoryWeave Engine', path: '/docs/memoryweave/semantic-memory', type: 'page' },
  { id: '6', title: 'Personality System (OCEAN)', section: 'MemoryWeave Engine', path: '/docs/memoryweave/personality-system', type: 'page' },
  { id: '7', title: 'Life Simulation', section: 'MemoryWeave Engine', path: '/docs/memoryweave/life-simulation', type: 'page' },
  { id: '8', title: 'Conversation Pipeline', section: 'MemoryWeave Engine', path: '/docs/memoryweave/conversation-pipeline', type: 'page' },
  { id: '9', title: 'Security & Infrastructure', section: 'MemoryWeave Engine', path: '/docs/memoryweave/security', type: 'page' },
  // CLAWD
  { id: '10', title: 'What is CLAWD?', section: 'CLAWD', path: '/docs/clawd/what-is-clawd', type: 'page' },
  { id: '11', title: 'NPC Relay (Telegram & Discord)', section: 'CLAWD', path: '/docs/clawd/npc-relay', type: 'page' },
  { id: '12', title: 'Admin Management Skills', section: 'CLAWD', path: '/docs/clawd/admin-skills', type: 'page' },
  { id: '13', title: 'Cross-Platform Identity', section: 'CLAWD', path: '/docs/clawd/cross-platform-identity', type: 'page' },
  { id: '14', title: 'Future Features & Roadmap', section: 'CLAWD', path: '/docs/clawd/future-features', type: 'page' },
  // Integrations
  { id: '15', title: 'Roblox SDK', section: 'Integrations', path: '/docs/integrations/roblox-sdk', type: 'page' },
  { id: '16', title: 'Dashboard (Web UI)', section: 'Integrations', path: '/docs/integrations/dashboard', type: 'page' },
  { id: '17', title: 'REST API Reference', section: 'Integrations', path: '/docs/integrations/rest-api', type: 'page' },
  { id: '18', title: 'WebSocket Streaming', section: 'Integrations', path: '/docs/integrations/websocket', type: 'page' },
  { id: '19', title: 'Coming Soon — Unity, Unreal', section: 'Integrations', path: '/docs/integrations/coming-soon', type: 'page' },
  // Token
  { id: '20', title: 'Token Overview', section: '$BLOX Token', path: '/docs/token/overview', type: 'page' },
  { id: '21', title: 'Clanker Launch on Base', section: '$BLOX Token', path: '/docs/token/clanker-launch', type: 'page' },
  { id: '22', title: 'Trading Fees \u2192 Foundation', section: '$BLOX Token', path: '/docs/token/foundation-funding', type: 'page' },
  { id: '23', title: 'Tokenomics & Utility', section: '$BLOX Token', path: '/docs/token/tokenomics', type: 'page' },
  // Roadmap
  { id: '24', title: 'Phase 1 — The Neural Foundation', section: 'Roadmap', path: '/docs/roadmap/phase-1', type: 'page' },
  { id: '25', title: 'Phase 2 — The Roblox Invasion', section: 'Roadmap', path: '/docs/roadmap/phase-2', type: 'page' },
  { id: '26', title: 'Phase 3 — Agent Economy', section: 'Roadmap', path: '/docs/roadmap/phase-3', type: 'page' },
  { id: '27', title: 'Phase 4 — The Singularity', section: 'Roadmap', path: '/docs/roadmap/phase-4', type: 'page' },
  // Foundation
  { id: '28', title: 'Mission & Vision', section: 'The Foundation', path: '/docs/foundation/mission', type: 'page' },
  { id: '29', title: 'Foundation-Operated Servers', section: 'The Foundation', path: '/docs/foundation/servers', type: 'page' },
  { id: '30', title: 'Open Infrastructure', section: 'The Foundation', path: '/docs/foundation/open-infrastructure', type: 'page' },
  { id: '31', title: 'How Fees Fund Innovation', section: 'The Foundation', path: '/docs/foundation/funding-model', type: 'page' },
];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) onClose(); // Actually opens it, logic inverted in parent usually
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.section.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].path);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl bg-mw-bg-secondary border border-mw-border-default rounded-xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[70vh]"
            >
              <div className="flex items-center px-4 py-3 border-b border-mw-border-subtle">
                <Search className="text-mw-text-tertiary w-5 h-5 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent border-none outline-none text-mw-text-primary placeholder:text-mw-text-tertiary text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  onClick={onClose}
                  className="p-1 rounded hover:bg-mw-bg-tertiary text-mw-text-tertiary transition-colors"
                >
                  <span className="text-xs border border-mw-border-subtle px-1.5 py-0.5 rounded">Esc</span>
                </button>
              </div>

              <div className="overflow-y-auto p-2">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((result, index) => (
                      <Link
                        key={result.id}
                        to={result.path}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={clsx(
                          "flex items-center justify-between px-4 py-3 rounded-lg group transition-colors",
                          index === selectedIndex ? "bg-mw-accent-cyan/10" : "hover:bg-mw-bg-tertiary"
                        )}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={clsx(
                            "p-2 rounded-md",
                            index === selectedIndex ? "text-mw-accent-cyan bg-mw-accent-cyan/10" : "text-mw-text-tertiary bg-mw-bg-tertiary"
                          )}>
                            {result.type === 'page' ? <FileText size={16} /> : <Hash size={16} />}
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <span className={clsx(
                              "font-medium truncate",
                              index === selectedIndex ? "text-mw-accent-cyan" : "text-mw-text-primary"
                            )}>
                              {result.title}
                            </span>
                            <span className="text-xs text-mw-text-tertiary truncate">
                              {result.section}
                            </span>
                          </div>
                        </div>
                        {index === selectedIndex && (
                          <ArrowRight size={16} className="text-mw-accent-cyan" />
                        )}
                      </Link>
                    ))}
                  </div>
                ) : query ? (
                  <div className="p-8 text-center text-mw-text-tertiary">
                    <p>No results found for "{query}"</p>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="text-xs font-bold text-mw-text-tertiary uppercase tracking-wider mb-2">Suggested</div>
                    <div className="space-y-1">
                      {searchIndex.slice(0, 3).map((result, index) => (
                         <Link
                         key={result.id}
                         to={result.path}
                         onClick={onClose}
                         className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-mw-bg-tertiary text-mw-text-secondary hover:text-mw-text-primary transition-colors"
                       >
                         <FileText size={14} />
                         <span>{result.title}</span>
                       </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2 bg-mw-bg-tertiary/50 border-t border-mw-border-subtle text-xs text-mw-text-tertiary flex items-center justify-between">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Command size={10} /> <span>to select</span></span>
                  <span className="flex items-center gap-1"><ArrowRight size={10} /> <span>to navigate</span></span>
                </div>
                <div>MemoryWeave Docs</div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
