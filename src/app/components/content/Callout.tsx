import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

type CalloutType = 'info' | 'tip' | 'warning' | 'danger';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    border: 'border-blue-500',
    bg: 'bg-blue-500/10',
    icon: Info,
    iconColor: 'text-blue-500',
  },
  tip: {
    border: 'border-green-500',
    bg: 'bg-green-500/10',
    icon: CheckCircle,
    iconColor: 'text-green-500',
  },
  warning: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-500/10',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
  },
  danger: {
    border: 'border-red-500',
    bg: 'bg-red-500/10',
    icon: XCircle,
    iconColor: 'text-red-500',
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={clsx(
      "my-6 p-4 rounded-md border-l-4 flex gap-4 backdrop-blur-sm",
      style.border,
      style.bg
    )}>
      <div className="shrink-0 mt-0.5">
        <Icon size={20} className={style.iconColor} />
      </div>
      <div className="flex-1">
        {title && (
          <h4 className={clsx("font-bold mb-1 text-sm", style.iconColor)}>
            {title}
          </h4>
        )}
        <div className="text-sm text-mw-text-primary leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
