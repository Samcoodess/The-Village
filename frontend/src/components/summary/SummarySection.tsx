import { ReactNode } from 'react';

interface SummarySectionProps {
  title: string;
  children: ReactNode;
}

export default function SummarySection({ title, children }: SummarySectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
        {children}
      </div>
    </div>
  );
}
