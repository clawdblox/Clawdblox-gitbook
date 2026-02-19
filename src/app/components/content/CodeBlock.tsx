import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

export function CodeBlock({ language, code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-mw-border-default bg-[#0d1117] group">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-mw-bg-secondary border-b border-mw-border-default">
          <div className="flex items-center gap-2">
             <span className="text-xs font-mono text-mw-text-tertiary uppercase">{filename || language}</span>
          </div>
          <button 
            onClick={handleCopy}
            className="text-mw-text-secondary hover:text-mw-text-primary transition-colors p-1"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-mw-text-primary">
        <pre className="m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
