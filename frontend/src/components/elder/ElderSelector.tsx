import { Elder } from '../../types';

interface ElderSelectorProps {
  elders: Elder[];
  selectedId: string;
  onChange: (elderId: string) => void;
}

export default function ElderSelector({ elders, selectedId, onChange }: ElderSelectorProps) {
  return (
    <select
      value={selectedId}
      onChange={(e) => onChange(e.target.value)}
      className="backdrop-blur-md bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white font-light focus:outline-none focus:border-white/50 text-sm"
    >
      {elders.map((elder) => (
        <option key={elder.id} value={elder.id} className="bg-gray-900">
          {elder.name}, {elder.age}
        </option>
      ))}
    </select>
  );
}
