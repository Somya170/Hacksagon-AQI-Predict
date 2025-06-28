import React from 'react';
import { BarChart3, Brain, Home, Info, MapPin, Calculator, Lock, Wind } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isLoggedIn?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isLoggedIn = false }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', requiresLogin: false },
    { id: 'ai-predictor', icon: Brain, label: 'AI Health Assistant', requiresLogin: true },
    { id: 'analytics', icon: BarChart3, label: 'Analytics & Trends', requiresLogin: false },
    { id: 'calculator', icon: Calculator, label: 'AQI Calculator', requiresLogin: false },
    { id: 'about', icon: Info, label: 'About Our Team', requiresLogin: false },
  ];

  return (
    <div className="w-64 bg-white shadow-xl h-screen flex flex-col border-r border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wind className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AQI Monitor</h1>
            <p className="text-sm text-gray-500">Smart Air Quality Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Main Menu</h3>
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          const isLocked = item.requiresLogin && !isLoggedIn;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 relative group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 shadow-md border border-purple-100'
                  : isLocked
                  ? 'text-gray-400 hover:bg-gray-50 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm'
              }`}
              disabled={isLocked}
            >
              <Icon className={`w-5 h-5 ${
                isActive ? 'text-purple-600' : 
                isLocked ? 'text-gray-400' : 
                'text-gray-500 group-hover:text-gray-700'
              }`} />
              <span className="font-medium flex-1">{item.label}</span>
              {isLocked && (
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Login</span>
                </div>
              )}
              {isActive && (
                <div className="absolute right-2 w-2 h-2 bg-purple-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Status Panel */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Data Active</span>
          </div>
          <p className="text-xs text-green-600 mb-2">Real-time monitoring from 25 Indian cities</p>
          <div className="flex items-center justify-between text-xs text-green-600">
            <span>API Status:</span>
            <span className="font-semibold">Connected</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">AQI Monitor</p>
          <p className="text-xs text-gray-400">Built for Hackathon 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;