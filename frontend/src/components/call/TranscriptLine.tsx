import { motion } from 'framer-motion';
import { TranscriptLine as TranscriptLineType } from '../../types';

interface TranscriptLineProps {
  line: TranscriptLineType;
}

export default function TranscriptLine({ line }: TranscriptLineProps) {
  const isAgent = line.speaker === 'agent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[70%] ${isAgent ? 'items-start' : 'items-end'}`}>
        <div className="text-xs text-white/50 font-light mb-1">
          {line.speaker_name}
        </div>
        <div
          className={`backdrop-blur-sm rounded-2xl px-4 py-3 ${
            isAgent
              ? 'bg-blue-400/20 border border-blue-300/30'
              : 'bg-white/15 border border-white/20'
          }`}
        >
          <p className="text-white/90 font-light text-sm leading-relaxed">
            {line.text}
          </p>
        </div>
        <div className="text-xs text-white/40 font-light mt-1">
          {new Date(line.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
}
