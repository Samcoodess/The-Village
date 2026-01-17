import { motion } from 'framer-motion';
import { ProfileFact } from '../../types';

interface FactCardProps {
  fact: ProfileFact;
}

export default function FactCard({ fact }: FactCardProps) {
  const categoryColors = {
    family: 'bg-pink-400/20 border-pink-300/30 text-pink-200',
    medical: 'bg-red-400/20 border-red-300/30 text-red-200',
    interests: 'bg-purple-400/20 border-purple-300/30 text-purple-200',
    history: 'bg-blue-400/20 border-blue-300/30 text-blue-200',
    preferences: 'bg-green-400/20 border-green-300/30 text-green-200',
    personality: 'bg-yellow-400/20 border-yellow-300/30 text-yellow-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="backdrop-blur-sm bg-white/5 rounded-lg p-3 border border-white/10"
    >
      <span
        className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${categoryColors[fact.category]}`}
      >
        {fact.category}
      </span>
      <p className="text-white/90 text-sm font-light mb-1">{fact.fact}</p>
      {fact.context && (
        <p className="text-white/60 text-xs font-light italic">{fact.context}</p>
      )}
    </motion.div>
  );
}
