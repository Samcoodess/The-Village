import { motion } from 'framer-motion';
import { CallSession } from '../../types';
import CallStatus from './CallStatus';

interface CallPanelProps {
  activeCall: CallSession | null;
  onStartCall: () => void;
  onEndCall: () => void;
  isLoading?: boolean;
}

export default function CallPanel({
  activeCall,
  onStartCall,
  onEndCall,
  isLoading,
}: CallPanelProps) {
  const getDuration = () => {
    if (!activeCall) return undefined;
    const start = new Date(activeCall.started_at).getTime();
    const now = new Date().getTime();
    return Math.floor((now - start) / 1000);
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Wellness Check-In Call
          </h3>
          {activeCall && (
            <CallStatus status={activeCall.status} duration={getDuration()} />
          )}
        </div>

        <div>
          {!activeCall ? (
            <motion.button
              onClick={onStartCall}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-2xl border border-white/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Starting...' : 'START CALL'}
            </motion.button>
          ) : (
            <motion.button
              onClick={onEndCall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-red-400/30 hover:bg-red-400/40 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-2xl border border-red-300/30 text-lg"
            >
              END CALL
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
