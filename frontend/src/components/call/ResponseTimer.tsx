import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ResponseTimerProps {
  running: boolean;
  startedAt: string | null;
  onComplete?: (seconds: number) => void;
  targetSeconds?: number;
}

export default function ResponseTimer({
  running,
  startedAt,
  onComplete,
  targetSeconds = 78,
}: ResponseTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!running || !startedAt) {
      setElapsed(0);
      setCompleted(false);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(startedAt).getTime();
      const elapsedSeconds = Math.floor((now - start) / 1000);
      setElapsed(elapsedSeconds);

      if (elapsedSeconds >= targetSeconds && !completed) {
        setCompleted(true);
        onComplete?.(elapsedSeconds);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [running, startedAt, targetSeconds, completed, onComplete]);

  if (!running && elapsed === 0) {
    return null;
  }

  const percentage = Math.min((elapsed / targetSeconds) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl text-center"
    >
      <h3 className="text-sm font-light text-white/70 mb-2">
        Village Response Time
      </h3>

      <motion.div
        animate={completed ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-white mb-4"
      >
        {elapsed}s
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
          className={`h-full rounded-full ${
            completed ? 'bg-green-400' : 'bg-blue-400'
          }`}
        />
      </div>

      {completed ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-300 font-semibold"
        >
          Care Network Mobilized
        </motion.p>
      ) : (
        <p className="text-white/60 font-light text-sm">
          Target: {targetSeconds} seconds
        </p>
      )}
    </motion.div>
  );
}
