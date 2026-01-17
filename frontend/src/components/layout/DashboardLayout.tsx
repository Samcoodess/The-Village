import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  elderName: string;
  elderAge: number;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

export default function DashboardLayout({
  children,
  sidebar,
  elderName,
  elderAge,
  connectionStatus,
}: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/clouds.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/20 to-blue-900/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Layout */}
      <div className="relative z-10 flex flex-col h-screen">
        <Header
          elderName={elderName}
          elderAge={elderAge}
          connectionStatus={connectionStatus}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>

          {/* Sidebar */}
          {sidebar && <Sidebar>{sidebar}</Sidebar>}
        </div>
      </div>
    </div>
  );
}
