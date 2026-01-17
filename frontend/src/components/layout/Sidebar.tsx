import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-80 backdrop-blur-md bg-white/5 border-l border-white/20 p-6 overflow-y-auto"
    >
      {children}
    </motion.aside>
  );
}
