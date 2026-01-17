import { motion } from 'framer-motion';
import { VillageMember, VillageAction } from '../../types';

interface VillageMemberCardProps {
  member: VillageMember;
  action?: VillageAction;
}

export default function VillageMemberCard({ member, action }: VillageMemberCardProps) {
  const statusConfig = action
    ? {
        pending: {
          bg: 'bg-gray-400/20',
          border: 'border-gray-300/30',
          text: 'text-gray-300',
          label: 'Pending',
        },
        calling: {
          bg: 'bg-blue-400/20',
          border: 'border-blue-300/30',
          text: 'text-blue-300',
          label: 'Calling...',
          pulse: true,
        },
        in_progress: {
          bg: 'bg-blue-400/20',
          border: 'border-blue-300/30',
          text: 'text-blue-300',
          label: 'In Progress',
          pulse: true,
        },
        completed: {
          bg: 'bg-green-400/20',
          border: 'border-green-300/30',
          text: 'text-green-300',
          label: 'Confirmed',
        },
        failed: {
          bg: 'bg-red-400/20',
          border: 'border-red-300/30',
          text: 'text-red-300',
          label: 'Failed',
        },
        no_answer: {
          bg: 'bg-gray-400/20',
          border: 'border-gray-300/30',
          text: 'text-gray-300',
          label: 'No Answer',
        },
      }[action.status]
    : {
        bg: 'bg-white/5',
        border: 'border-white/10',
        text: 'text-white/60',
        label: 'Idle',
      };

  const roleIcons = {
    family: 'F',
    neighbor: 'N',
    medical: 'M',
    mental_health: 'MH',
    volunteer: 'V',
    service: 'S',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`backdrop-blur-md ${statusConfig.bg} rounded-xl p-4 border ${statusConfig.border} shadow-lg`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30 flex-shrink-0">
          <span className="text-white font-semibold text-sm">
            {roleIcons[member.role]}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm mb-1 truncate">
            {member.name}
          </h4>
          <p className="text-white/70 text-xs font-light mb-2 capitalize">
            {member.relationship}
          </p>

          {/* Status */}
          <div className="flex items-center gap-2">
            {statusConfig.pulse && (
              <span className={`w-2 h-2 ${statusConfig.text.replace('text', 'bg')} rounded-full animate-pulse`}></span>
            )}
            <span className={`${statusConfig.text} text-xs font-medium`}>
              {statusConfig.label}
            </span>
          </div>

          {/* Response */}
          {action?.response && action.status === 'completed' && (
            <p className="mt-2 text-white/80 text-xs font-light italic">
              "{action.response}"
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
