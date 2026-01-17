import { VillageMember, VillageAction } from '../../types';
import VillageMemberCard from './VillageMemberCard';

interface VillageGridProps {
  members: VillageMember[];
  activeActions: VillageAction[];
}

export default function VillageGrid({ members, activeActions }: VillageGridProps) {
  const getActionForMember = (memberId: string) => {
    return activeActions.find((action) => action.recipient.id === memberId);
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
      <h3 className="text-lg font-semibold text-white mb-4">
        Village Network
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {members.length === 0 ? (
          <p className="text-white/50 font-light text-center py-8">
            No village members configured
          </p>
        ) : (
          members.map((member) => (
            <VillageMemberCard
              key={member.id}
              member={member}
              action={getActionForMember(member.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
