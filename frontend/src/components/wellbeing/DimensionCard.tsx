import { motion } from 'framer-motion';

interface DimensionCardProps {
  dimension: 'emotional' | 'mental' | 'social' | 'physical' | 'cognitive';
  status: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  label: string;
  note?: string;
}

export default function DimensionCard({
  dimension,
  status,
  label,
  note,
}: DimensionCardProps) {
  const statusConfig = {
    none: {
      bg: 'bg-green-400/20',
      border: 'border-green-300/30',
      text: 'text-green-300',
      indicator: 'bg-green-400',
    },
    low: {
      bg: 'bg-blue-400/20',
      border: 'border-blue-300/30',
      text: 'text-blue-300',
      indicator: 'bg-blue-400',
    },
    moderate: {
      bg: 'bg-yellow-400/20',
      border: 'border-yellow-300/30',
      text: 'text-yellow-300',
      indicator: 'bg-yellow-400',
    },
    high: {
      bg: 'bg-orange-400/20',
      border: 'border-orange-300/30',
      text: 'text-orange-300',
      indicator: 'bg-orange-400',
    },
    critical: {
      bg: 'bg-red-400/20',
      border: 'border-red-300/30',
      text: 'text-red-300',
      indicator: 'bg-red-400',
    },
  }[status];

  const dimensionLabels = {
    emotional: 'Emotional',
    mental: 'Mental',
    social: 'Social',
    physical: 'Physical',
    cognitive: 'Cognitive',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`backdrop-blur-md ${statusConfig.bg} rounded-2xl p-6 border ${statusConfig.border} shadow-xl`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-3 h-3 rounded-full ${statusConfig.indicator}`}></div>
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">
        {dimensionLabels[dimension]}
      </h3>

      <div className={`${statusConfig.text} text-sm font-medium mb-2`}>
        {label}
      </div>

      {note && (
        <p className="text-white/70 text-xs font-light line-clamp-2">
          {note}
        </p>
      )}
    </motion.div>
  );
}
