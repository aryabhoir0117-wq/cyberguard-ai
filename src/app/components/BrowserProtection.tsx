import { useState, useEffect } from 'react';
import { Search, Globe, Lock, AlertTriangle, Shield, Brain, Activity } from 'lucide-react';
import { ThreatPopup } from './ThreatPopup';
import { MLAnalysis } from './MLAnalysis';

interface ThreatData {
  url: string;
  riskScore: number;
  threatType: string;
  mlConfidence: number;
  indicators: string[];
  isBlocked: boolean;
}

export function BrowserProtection() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [threatData, setThreatData] = useState<ThreatData | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulated suspicious URLs for demo
  const suspiciousPatterns = [
    'phishing',
    'malware',
    'hack',
    'steal',
    'suspicious',
    'fake',
    'scam',
    'paypa1',
    'g00gle',
    'micros0ft',
    'bank-verify',
    'account-suspended',
  ];

  const analyzeThreat = (inputUrl: string): ThreatData => {
    const lowerUrl = inputUrl.toLowerCase();
    
    // ML-based detection simulation
    let riskScore = 0;
    const indicators: string[] = [];
    let threatType = 'Unknown';

    // Pattern analysis
    if (suspiciousPatterns.some(pattern => lowerUrl.includes(pattern))) {
      riskScore += 45;
      indicators.push('Suspicious keyword patterns detected');
    }

    // Domain analysis
    if (lowerUrl.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
      riskScore += 25;
      indicators.push('Direct IP address used instead of domain');
    }

    // Character substitution
    if (lowerUrl.match(/[0O]{1}[oO0]{1}|[1lI]{2,}/)) {
      riskScore += 30;
      indicators.push('Character substitution detected (typosquatting)');
    }

    // Excessive subdomain
    const subdomains = lowerUrl.split('.').length - 2;
    if (subdomains > 3) {
      riskScore += 20;
      indicators.push('Excessive subdomain depth');
    }

    // URL length
    if (inputUrl.length > 75) {
      riskScore += 15;
      indicators.push('Abnormally long URL');
    }

    // Random additional factors
    if (Math.random() > 0.5 && riskScore > 30) {
      riskScore += 10;
      indicators.push('SSL certificate anomaly detected');
    }

    // Determine threat type
    if (riskScore > 60) {
      threatType = lowerUrl.includes('bank') || lowerUrl.includes('payp')
        ? 'Phishing Attack'
        : lowerUrl.includes('download') || lowerUrl.includes('malware')
        ? 'Malware Distribution'
        : 'High-Risk Threat';
    } else if (riskScore > 30) {
      threatType = 'Potential Phishing';
    }

    const mlConfidence = Math.min(95, riskScore + Math.random() * 10);
    
    return {
      url: inputUrl,
      riskScore: Math.min(100, riskScore),
      threatType,
      mlConfidence,
      indicators: indicators.length > 0 ? indicators : ['No threats detected', 'Safe to proceed'],
      isBlocked: riskScore > 50,
    };
  };

  const handleScan = () => {
    if (!url.trim()) return;

    setIsScanning(true);
    setScanProgress(0);
    setShowAnalysis(true);

    // Simulate ML scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Complete scan after 1.2s
    setTimeout(() => {
      const threat = analyzeThreat(url);
      setThreatData(threat);
      setIsScanning(false);

      if (threat.riskScore > 30) {
        setShowPopup(true);
      }
    }, 1200);
  };

  const handleNavigate = (forced: boolean = false) => {
    if (forced && threatData?.isBlocked) {
      alert('Navigation blocked by CyberGuard AI for your protection');
      return;
    }
    setShowPopup(false);
    setShowAnalysis(false);
    setThreatData(null);
    setScanProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Browser Window Mockup */}
      <div className="overflow-hidden rounded-2xl border border-blue-800/50 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
        {/* Browser Chrome */}
        <div className="border-b border-blue-800/30 bg-slate-800/50 p-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 flex flex-1 items-center gap-3 rounded-lg border border-blue-700/50 bg-slate-900/90 px-4 py-3">
              {threatData?.riskScore && threatData.riskScore > 30 ? (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              ) : (
                <Lock className="h-5 w-5 text-green-400" />
              )}
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                placeholder="Enter URL to scan with AI protection..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
              />
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 disabled:opacity-50"
              >
                {isScanning ? 'Scanning...' : 'Scan URL'}
              </button>
            </div>
          </div>

          {/* Real-time Protection Status */}
          <div className="mt-3 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              <span className="text-green-400">AI Protection Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300">Neural Network Model: v3.2.1</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-300">Real-time Analysis</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          {!showAnalysis ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <Shield className="h-12 w-12 text-blue-400" />
                </div>
                <h2 className="mb-3 text-2xl font-semibold text-white">
                  Protected Browsing Mode
                </h2>
                <p className="mb-6 text-slate-400">
                  Enter a URL above to test real-time AI threat detection
                </p>
                <div className="grid grid-cols-3 gap-4 text-left">
                  <div className="rounded-lg border border-blue-800/30 bg-slate-800/50 p-4">
                    <Brain className="mb-2 h-8 w-8 text-blue-400" />
                    <h3 className="mb-1 font-medium text-white">ML Detection</h3>
                    <p className="text-sm text-slate-400">Neural network analysis</p>
                  </div>
                  <div className="rounded-lg border border-blue-800/30 bg-slate-800/50 p-4">
                    <Activity className="mb-2 h-8 w-8 text-cyan-400" />
                    <h3 className="mb-1 font-medium text-white">Real-time</h3>
                    <p className="text-sm text-slate-400">Instant threat response</p>
                  </div>
                  <div className="rounded-lg border border-blue-800/30 bg-slate-800/50 p-4">
                    <Shield className="mb-2 h-8 w-8 text-green-400" />
                    <h3 className="mb-1 font-medium text-white">Auto-block</h3>
                    <p className="text-sm text-slate-400">Prevent malicious access</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <MLAnalysis
              isScanning={isScanning}
              scanProgress={scanProgress}
              threatData={threatData}
            />
          )}
        </div>
      </div>

      {/* Example URLs to Test */}
      <div className="rounded-xl border border-blue-800/30 bg-slate-900/50 p-6 backdrop-blur-xl">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
          <Globe className="h-5 w-5 text-blue-400" />
          Test URLs (Click to try)
        </h3>
        <div className="grid gap-2 md:grid-cols-2">
          {[
            { url: 'https://secure-bank-login.com', label: 'Safe URL', safe: true },
            { url: 'https://paypa1-verify-account.suspicious-domain.com', label: 'Phishing Attempt', safe: false },
            { url: 'https://192.168.1.1/malware/download.exe', label: 'Malware Distribution', safe: false },
            { url: 'https://micros0ft-security-alert.fake.com', label: 'Typosquatting', safe: false },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setUrl(item.url);
                setTimeout(handleScan, 100);
              }}
              className={`rounded-lg border p-3 text-left transition-all hover:scale-[1.02] ${
                item.safe
                  ? 'border-green-800/50 bg-green-950/30 hover:bg-green-950/50'
                  : 'border-red-800/50 bg-red-950/30 hover:bg-red-950/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm font-medium text-white">{item.label}</p>
                  <p className="truncate text-xs text-slate-400">{item.url}</p>
                </div>
                {item.safe ? (
                  <Shield className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Threat Popup */}
      {showPopup && threatData && (
        <ThreatPopup
          threatData={threatData}
          onBlock={handleNavigate}
          onProceed={() => handleNavigate(false)}
        />
      )}
    </div>
  );
}
