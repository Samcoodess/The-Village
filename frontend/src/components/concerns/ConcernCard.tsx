import { motion } from 'framer-motion';
import { Concern } from '../../types';

interface ConcernCardProps {
  concern: Concern;
}

export default function ConcernCard({ concern }: ConcernCardProps) {
  const severityConfig = {
    low: {
      bg: 'bg-blue-400/20',
      border: 'border-blue-300/30',
      text: 'text-blue-300',
      label: 'Low',
    },
    moderate: {
      bg: 'bg-yellow-400/20',
      border: 'border-yellow-300/30',
      text: 'text-yellow-300',
      label: 'Moderate',
    },
    high: {
      bg: 'bg-orange-400/20',
      border: 'border-orange-300/30',
      text: 'text-orange-300',
      label: 'High',
    },
    critical: {
      bg: 'bg-red-400/20',
      border: 'border-red-300/30',
      text: 'text-red-300',
      label: 'Critical',
    },
  }[concern.severity];

  const dimensionColors = {
    emotional: 'bg-pink-400/30 text-pink-200',
    mental: 'bg-purple-400/30 text-purple-200',
    social: 'bg-blue-400/30 text-blue-200',
    physical: 'bg-green-400/30 text-green-200',
    cognitive: 'bg-yellow-400/30 text-yellow-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`backdrop-blur-md ${severityConfig.bg} rounded-xl p-4 border ${severityConfig.border} shadow-lg`}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            dimensionColors[concern.dimension]
          }`}
        >
          {concern.dimension}
        </span>
        <span className={`${severityConfig.text} text-xs font-semibold`}>
          {severityConfig.label}
        </span>
      </div>

      <h4 className="text-white font-semibold text-sm mb-2 capitalize">
        {concern.type.replace(/_/g, ' ')}
      </h4>

      <p className="text-white/80 text-xs font-light mb-3">
        {concern.description}
      </p>

      {concern.quote && (
        <blockquote className="border-l-2 border-white/30 pl-3 py-1 mb-3">
          <p className="text-white/70 text-xs italic font-light">
            "{concern.quote}"
          </p>
        </blockquote>
      )}

      {concern.action_required && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          <span className="text-white/90 text-xs font-medium">
            Action required
          </span>
        </div>
      )}

      {concern.is_pattern && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-white/60 text-xs font-light">
            Pattern detected across multiple calls
          </span>
        </div>
      )}
    </motion.div>
  );
}
