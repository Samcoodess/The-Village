import { ProfileFact } from '../../types';
import FactCard from './FactCard';

interface ProfileFactsProps {
  facts: ProfileFact[];
}

export default function ProfileFacts({ facts }: ProfileFactsProps) {
  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Profile Insights</h3>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {facts.length === 0 ? (
          <p className="text-white/50 font-light text-center py-8">
            Profile facts will appear as we learn more
          </p>
        ) : (
          facts.map((fact) => <FactCard key={fact.id} fact={fact} />)
        )}
      </div>
    </div>
  );
}
