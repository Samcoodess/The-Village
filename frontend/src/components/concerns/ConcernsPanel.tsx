import { Concern } from '../../types';
import ConcernCard from './ConcernCard';

interface ConcernsPanelProps {
  concerns: Concern[];
}

export default function ConcernsPanel({ concerns }: ConcernsPanelProps) {
  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Concerns Detected
        </h3>
        {concerns.length > 0 && (
          <span className="backdrop-blur-sm bg-white/20 px-3 py-1 rounded-full text-sm text-white font-medium">
            {concerns.length}
          </span>
        )}
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {concerns.length === 0 ? (
          <p className="text-white/50 font-light text-center py-8">
            No concerns detected
          </p>
        ) : (
          concerns.map((concern) => (
            <ConcernCard key={concern.id} concern={concern} />
          ))
        )}
      </div>
    </div>
  );
}
