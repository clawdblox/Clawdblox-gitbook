import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface DocPageProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  children: React.ReactNode;
}

export function DocPage({ title, description, breadcrumbs, children }: DocPageProps) {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-mw-text-tertiary mb-6">
        {breadcrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={14} />}
            {crumb.href ? (
              <Link to={crumb.href} className="hover:text-mw-text-primary transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-mw-text-secondary">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Header */}
      <header className="mb-12 border-b border-mw-border-subtle pb-8">
        <h1 className="text-4xl font-heading font-bold text-mw-text-primary mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-mw-text-secondary leading-relaxed">{description}</p>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-mw max-w-none">
        {children}
      </div>
      
      {/* Footer / Navigation */}
      <div className="mt-20 pt-8 border-t border-mw-border-default grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-mw-border-default hover:border-mw-accent-cyan/50 transition-colors cursor-pointer group">
          <div className="text-xs text-mw-text-tertiary mb-1">Previous</div>
          <div className="font-medium text-mw-text-primary group-hover:text-mw-accent-cyan flex items-center gap-2">
            <span className="rotate-180"><ChevronRight size={16} /></span>
            Previous Page Title
          </div>
        </div>
        <div className="p-4 rounded-lg border border-mw-border-default hover:border-mw-accent-cyan/50 transition-colors cursor-pointer group text-right">
          <div className="text-xs text-mw-text-tertiary mb-1">Next</div>
          <div className="font-medium text-mw-text-primary group-hover:text-mw-accent-cyan flex items-center justify-end gap-2">
            Next Page Title
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
