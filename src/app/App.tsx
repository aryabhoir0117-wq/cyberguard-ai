import { useState } from 'react';
import { BrowserProtection } from './components/BrowserProtection';
import { Dashboard } from './components/Dashboard';
import { Shield } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'browser' | 'dashboard'>('browser');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-blue-800/30 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">CyberGuard AI</h1>
                <p className="text-xs text-blue-300">Real-time ML Threat Detection</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('browser')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeView === 'browser'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-blue-300 hover:bg-blue-900/30'
                }`}
              >
                Browser Protection
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-blue-300 hover:bg-blue-900/30'
                }`}
              >
                Threat Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {activeView === 'browser' ? <BrowserProtection /> : <Dashboard />}
      </main>
    </div>
  );
}
