import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { TableOfContents } from './TableOfContents';
import { SearchModal } from '../search/SearchModal';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  
  // Don't show TOC on landing page or if explicitly disabled
  const showTOC = location.pathname !== '/';

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-mw-bg-primary text-mw-text-primary font-sans selection:bg-mw-accent-cyan/30">
      <TopBar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onSearchClick={() => setSearchOpen(true)}
      />
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      <main className="pt-14 md:pl-[260px] min-h-screen transition-all duration-300">
        <div className="flex max-w-[1440px] mx-auto">
          <div className={`flex-1 min-w-0 px-4 py-8 md:px-12 md:py-12 ${showTOC ? 'lg:pr-[240px]' : ''}`}>
             <Outlet />
          </div>
          
          {showTOC && (
            <div className="hidden lg:block fixed right-0 top-14 bottom-0 w-[220px] overflow-y-auto py-12 pr-6 border-l border-transparent">
              <TableOfContents />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
