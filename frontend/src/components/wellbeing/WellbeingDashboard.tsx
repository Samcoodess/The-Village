import { WellbeingAssessment } from '../../types';
import DimensionCard from './DimensionCard';

interface WellbeingDashboardProps {
  assessment: WellbeingAssessment | null;
  isCallActive: boolean;
}

export default function WellbeingDashboard({
  assessment,
  isCallActive,
}: WellbeingDashboardProps) {
  if (!assessment) {
    return (
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">
          Wellbeing Assessment
        </h2>
        <p className="text-white/60 font-light text-center py-8">
          {isCallActive
            ? 'Analysis in progress...'
            : 'Start a call to begin wellbeing assessment'}
        </p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Wellbeing Assessment</h2>
        <div className="text-sm text-white/60 font-light">
          Overall: <span className="capitalize">{assessment.overall_concern_level}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <DimensionCard
          dimension="emotional"
          status={assessment.emotional.loneliness_level}
          label={assessment.emotional.current_mood}
          note={assessment.emotional.notes}
        />

        <DimensionCard
          dimension="mental"
          status={
            assessment.mental.depression_indicators.length > 0
              ? 'moderate'
              : 'none'
          }
          label={`Purpose: ${assessment.mental.purpose_level}`}
          note={assessment.mental.notes}
        />

        <DimensionCard
          dimension="social"
          status={assessment.social.isolation_level}
          label={`Network: ${assessment.social.support_network_strength}`}
          note={assessment.social.notes}
        />

        <DimensionCard
          dimension="physical"
          status={
            assessment.physical.pain_reported || assessment.physical.mobility_concerns
              ? 'moderate'
              : assessment.physical.energy_level === 'very_low'
              ? 'low'
              : 'none'
          }
          label={`Energy: ${assessment.physical.energy_level}`}
          note={assessment.physical.notes}
        />

        <DimensionCard
          dimension="cognitive"
          status={
            assessment.cognitive.memory_concerns ||
            assessment.cognitive.orientation_issues
              ? 'moderate'
              : 'none'
          }
          label={
            assessment.cognitive.baseline_change
              ? 'Change detected'
              : 'Baseline normal'
          }
          note={assessment.cognitive.notes}
        />
      </div>
    </div>
  );
}
