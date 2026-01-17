import { motion, AnimatePresence } from 'framer-motion';
import { CallSummary } from '../../types';
import SummarySection from './SummarySection';

interface CallSummaryModalProps {
  summary: CallSummary | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CallSummaryModal({
  summary,
  isOpen,
  onClose,
}: CallSummaryModalProps) {
  if (!summary) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[90vh] backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Call Summary</h2>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors text-2xl font-light"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {/* Overview */}
              <SummarySection title="Overview">
                <p className="text-white/90 font-light leading-relaxed">
                  {summary.overview}
                </p>
              </SummarySection>

              {/* Emotional Arc */}
              <SummarySection title="Emotional Arc">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 font-light">Started:</span>
                    <span className="text-white/90">{summary.emotional_arc.started}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 font-light">Ended:</span>
                    <span className="text-white/90">{summary.emotional_arc.ended}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 font-light">Shift:</span>
                    <span
                      className={`capitalize font-medium ${
                        summary.emotional_arc.shift === 'improved'
                          ? 'text-green-300'
                          : summary.emotional_arc.shift === 'declined'
                          ? 'text-red-300'
                          : 'text-blue-300'
                      }`}
                    >
                      {summary.emotional_arc.shift}
                    </span>
                  </div>
                </div>
              </SummarySection>

              {/* Wellbeing Snapshot */}
              <SummarySection title="Wellbeing Snapshot">
                <div className="space-y-3 text-sm">
                  {Object.entries(summary.wellbeing_snapshot).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-white/70 font-medium capitalize">{key}:</span>
                      <p className="text-white/90 font-light mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </SummarySection>

              {/* Things Learned */}
              {summary.things_learned.length > 0 && (
                <SummarySection title="Things Learned">
                  <div className="space-y-3">
                    {summary.things_learned.map((item, index) => (
                      <div key={index} className="text-sm">
                        <p className="text-white/90 font-light">{item.fact}</p>
                        {item.context && (
                          <p className="text-white/60 text-xs font-light italic mt-1">
                            {item.context}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </SummarySection>
              )}

              {/* Concerns Addressed */}
              {summary.concerns_addressed.length > 0 && (
                <SummarySection title="Concerns Addressed">
                  <div className="space-y-4">
                    {summary.concerns_addressed.map((concern, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white/90 font-medium">{concern.concern}</span>
                          <span className="text-white/50 text-xs">({concern.severity})</span>
                        </div>
                        <blockquote className="border-l-2 border-white/30 pl-3 py-1 mb-2">
                          <p className="text-white/70 text-xs italic font-light">
                            "{concern.their_words}"
                          </p>
                        </blockquote>
                        <p className="text-white/80 font-light">{concern.action_taken}</p>
                      </div>
                    ))}
                  </div>
                </SummarySection>
              )}

              {/* Village Actions */}
              {summary.village_summary.length > 0 && (
                <SummarySection title="Village Mobilization">
                  <div className="space-y-3">
                    {summary.village_summary.map((action, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/90 font-medium">{action.who}</span>
                          <span className="text-green-300 text-xs capitalize">{action.status}</span>
                        </div>
                        <p className="text-white/70 font-light">{action.action}</p>
                        {action.scheduled_time && (
                          <p className="text-white/50 text-xs font-light mt-1">
                            Scheduled: {action.scheduled_time}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </SummarySection>
              )}

              {/* Next Call Prompts */}
              {summary.next_call_prompts.length > 0 && (
                <SummarySection title="Next Call Prompts">
                  <ul className="space-y-2 text-sm">
                    {summary.next_call_prompts.map((prompt, index) => (
                      <li key={index} className="text-white/80 font-light flex items-start gap-2">
                        <span className="text-white/40">•</span>
                        <span>{prompt}</span>
                      </li>
                    ))}
                  </ul>
                </SummarySection>
              )}

              {/* Memorable Moment */}
              {summary.memorable_moment && (
                <SummarySection title="Memorable Moment">
                  <p className="text-white/90 font-light italic leading-relaxed">
                    "{summary.memorable_moment}"
                  </p>
                </SummarySection>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/20">
              <button
                onClick={onClose}
                className="w-full backdrop-blur-md bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg border border-white/30"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
