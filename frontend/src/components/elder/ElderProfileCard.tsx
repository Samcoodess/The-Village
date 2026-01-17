import { motion } from 'framer-motion';
import { Elder } from '../../types';

interface ElderProfileCardProps {
  elder: Elder;
}

export default function ElderProfileCard({ elder }: ElderProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl"
    >
      <div className="flex items-center gap-6">
        {/* Profile Photo/Initial */}
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0">
          {elder.photo_url ? (
            <img
              src={elder.photo_url}
              alt={elder.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="text-4xl text-white/80 font-light">
              {elder.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">{elder.name}</h2>
          <p className="text-white/70 text-sm font-light mb-3">
            Age {elder.age} · {elder.address}
          </p>

          {/* Quick Stats */}
          <div className="flex gap-4 text-sm">
            <div className="backdrop-blur-sm bg-white/5 rounded-lg px-3 py-1 border border-white/10">
              <span className="text-white/60 font-light">Village: </span>
              <span className="text-white font-medium">{elder.village.length}</span>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-lg px-3 py-1 border border-white/10">
              <span className="text-white/60 font-light">Medications: </span>
              <span className="text-white font-medium">{elder.medical.medications.length}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
