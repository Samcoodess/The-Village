import { motion } from 'framer-motion';

interface HeaderProps {
  elderName: string;
  elderAge: number;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

export default function Header({ elderName, elderAge, connectionStatus }: HeaderProps) {
  const statusColor = {
    connected: 'bg-green-400',
    disconnected: 'bg-red-400',
    reconnecting: 'bg-yellow-400',
  }[connectionStatus];

  const statusText = {
    connected: 'Connected',
    disconnected: 'Disconnected',
    reconnecting: 'Reconnecting...',
  }[connectionStatus];

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white tracking-wider">THE VILLAGE</h1>
          <div className="text-sm text-white/70 font-light">
            {elderName}, {elderAge}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/90 font-light flex items-center gap-2"
          >
            <span className={`inline-block w-2 h-2 ${statusColor} rounded-full`}></span>
            {statusText}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
