import { motion } from 'framer-motion';
import { VillageAction } from '../../types';

interface ActiveActionsProps {
  actions: VillageAction[];
}

export default function ActiveActions({ actions }: ActiveActionsProps) {
  const activeActions = actions.filter(
    (a) => a.status === 'calling' || a.status === 'in_progress' || a.status === 'pending'
  );

  if (activeActions.length === 0) {
    return null;
  }

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Active Mobilization
      </h3>

      <div className="space-y-3">
        {activeActions.map((action) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-sm bg-blue-400/20 rounded-lg p-3 border border-blue-300/30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium text-sm">
                {action.recipient.name}
              </span>
              <span className="text-blue-300 text-xs capitalize">
                {action.status}
              </span>
            </div>
            <p className="text-white/80 text-xs font-light">
              {action.reason}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-white/60 text-xs capitalize">
                {action.urgency}
              </span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-white/60 text-xs capitalize">
                {action.action_type.replace(/_/g, ' ')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
