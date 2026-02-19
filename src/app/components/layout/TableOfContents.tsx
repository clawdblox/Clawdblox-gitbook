import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { clsx } from 'clsx';
import { Link, Github } from 'lucide-react';

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const location = useLocation();

  useEffect(() => {
    // In a real implementation, we would parse the rendered MDX content.
    // Here we will query the DOM after render.
    // A small delay to ensure content is rendered.
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('h2, h3'));
      const items = elements.map((elem) => ({
        id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
        text: elem.textContent || '',
        level: Number(elem.tagName.substring(1)),
      }));
      
      // Ensure IDs exist on the elements for linking
      elements.forEach(elem => {
        if (!elem.id) {
          elem.id = elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
        }
      });

      setHeadings(items);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-[11px] font-bold text-mw-text-tertiary uppercase tracking-wider mb-3">
          On this page
        </h4>
        <ul className="space-y-2 text-sm border-l border-mw-border-subtle">
          {headings.map((heading) => (
            <li key={heading.id} className={clsx("-ml-[1px]", heading.level === 3 && "pl-3")}>
              <a
                href={`#${heading.id}`}
                className={clsx(
                  "block pl-4 py-1 border-l-2 transition-colors duration-200",
                  activeId === heading.id
                    ? "border-mw-accent-cyan text-mw-accent-cyan font-medium"
                    : "border-transparent text-mw-text-secondary hover:text-mw-text-primary hover:border-mw-text-tertiary"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(heading.id);
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="pt-4 border-t border-mw-border-subtle space-y-2">
        <button className="flex items-center gap-2 text-xs text-mw-text-secondary hover:text-mw-accent-cyan transition-colors">
          <Link size={12} />
          Copy link
        </button>
        <a href="#" className="flex items-center gap-2 text-xs text-mw-text-secondary hover:text-mw-text-primary transition-colors">
          <Github size={12} />
          Edit on GitHub
        </a>
      </div>
    </div>
  );
}
