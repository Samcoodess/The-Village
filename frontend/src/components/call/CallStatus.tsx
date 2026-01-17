import { motion } from 'framer-motion';

interface CallStatusProps {
  status: 'ringing' | 'in_progress' | 'completed' | 'failed' | 'no_answer';
  duration?: number;
}

export default function CallStatus({ status, duration }: CallStatusProps) {
  const statusConfig = {
    ringing: {
      text: 'Calling...',
      color: 'text-yellow-300',
      bg: 'bg-yellow-400/20',
      border: 'border-yellow-300/30',
    },
    in_progress: {
      text: 'In Progress',
      color: 'text-green-300',
      bg: 'bg-green-400/20',
      border: 'border-green-300/30',
    },
    completed: {
      text: 'Completed',
      color: 'text-blue-300',
      bg: 'bg-blue-400/20',
      border: 'border-blue-300/30',
    },
    failed: {
      text: 'Failed',
      color: 'text-red-300',
      bg: 'bg-red-400/20',
      border: 'border-red-300/30',
    },
    no_answer: {
      text: 'No Answer',
      color: 'text-gray-300',
      bg: 'bg-gray-400/20',
      border: 'border-gray-300/30',
    },
  }[status];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`backdrop-blur-sm ${statusConfig.bg} border ${statusConfig.border} rounded-lg px-4 py-2 inline-flex items-center gap-2`}
    >
      {status === 'in_progress' && (
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      )}
      <span className={`${statusConfig.color} font-medium text-sm`}>
        {statusConfig.text}
      </span>
      {duration !== undefined && status === 'in_progress' && (
        <span className="text-white/60 text-sm font-light">
          {formatDuration(duration)}
        </span>
      )}
    </motion.div>
  );
}
