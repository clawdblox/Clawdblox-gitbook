import React from 'react';
import { Search, Github, Menu, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router';

export function TopBar({ toggleSidebar, onSearchClick }: { toggleSidebar: () => void, onSearchClick: () => void }) {
  return (
    <header className="fixed top-0 z-50 w-full h-14 bg-mw-bg-primary/80 backdrop-blur-md border-b border-mw-border-subtle flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-1 text-mw-text-secondary hover:text-mw-text-primary">
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg text-mw-text-primary">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-mw-accent-cyan to-mw-accent-violet"></div>
          MemoryWeave
        </Link>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
        <button 
          onClick={onSearchClick}
          className="w-full flex items-center justify-between px-3 py-1.5 bg-mw-bg-secondary border border-mw-border-default rounded-full text-mw-text-secondary hover:border-mw-accent-cyan/50 transition-colors group"
        >
          <span className="flex items-center gap-2 text-sm">
            <Search size={14} />
            Search documentation...
          </span>
          <span className="text-xs bg-mw-bg-tertiary px-1.5 py-0.5 rounded border border-mw-border-subtle group-hover:border-mw-border-default">⌘K</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-full border border-mw-border-subtle bg-mw-bg-secondary/50 text-xs font-medium text-mw-text-secondary cursor-pointer hover:bg-mw-bg-tertiary">
          v1.0
        </div>
        <button className="p-2 text-mw-text-secondary hover:text-mw-text-primary transition-colors">
          <Github size={20} />
        </button>
        <button className="p-2 text-mw-text-secondary hover:text-mw-text-primary transition-colors">
          <Sun size={20} />
        </button>
      </div>
    </header>
  );
}
