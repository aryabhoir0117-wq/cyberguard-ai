import { Shield, TrendingUp, AlertTriangle, CheckCircle, Activity, Brain } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const stats = [
    { label: 'Threats Blocked Today', value: '147', icon: Shield, color: 'text-green-400' },
    { label: 'Sites Scanned', value: '2,834', icon: Activity, color: 'text-blue-400' },
    { label: 'Active Protections', value: '12', icon: CheckCircle, color: 'text-cyan-400' },
    { label: 'Risk Assessment', value: '98%', icon: TrendingUp, color: 'text-purple-400' },
  ];

  const recentThreats = [
    {
      url: 'paypa1-security-verify.com',
      type: 'Phishing',
      risk: 92,
      time: '2 mins ago',
      blocked: true,
    },
    {
      url: 'micros0ft-update.suspicious.net',
      type: 'Typosquatting',
      risk: 87,
      time: '15 mins ago',
      blocked: true,
    },
    {
      url: '192.168.45.123/malware.exe',
      type: 'Malware',
      risk: 95,
      time: '1 hour ago',
      blocked: true,
    },
    {
      url: 'fake-bank-login.scam.org',
      type: 'Phishing',
      risk: 89,
      time: '2 hours ago',
      blocked: true,
    },
    {
      url: 'g00gle-account-recovery.xyz',
      type: 'Credential Theft',
      risk: 91,
      time: '3 hours ago',
      blocked: true,
    },
  ];

  const mlMetrics = [
    { label: 'Model Accuracy', value: '98.7%', change: '+2.3%' },
    { label: 'False Positives', value: '0.4%', change: '-0.2%' },
    { label: 'Detection Speed', value: '1.2s', change: '-0.3s' },
    { label: 'Database Size', value: '2.4M', change: '+150K' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-blue-800/30 bg-slate-900/50 p-6 backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <Activity className="h-4 w-4 animate-pulse text-green-400" />
            </div>
            <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Threats */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-blue-800/30 bg-slate-900/50 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Recent Threats Blocked
            </h3>
            <div className="space-y-3">
              {recentThreats.map((threat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {threat.type}
                        </span>
                        <span className="rounded-full bg-red-950/50 px-2 py-0.5 text-xs font-medium text-red-400">
                          {threat.risk}% Risk
                        </span>
                      </div>
                      <p className="mb-2 font-mono text-xs text-slate-400">{threat.url}</p>
                    </div>
                    {threat.blocked && (
                      <span className="rounded-full bg-green-950/50 px-2 py-1 text-xs font-medium text-green-400">
                        Blocked
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{threat.time}</span>
                    <span className="flex items-center gap-1">
                      <Brain className="h-3 w-3" />
                      AI Detected
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ML Model Performance */}
        <div>
          <div className="rounded-xl border border-blue-800/30 bg-slate-900/50 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Brain className="h-5 w-5 text-cyan-400" />
              ML Model Metrics
            </h3>
            <div className="space-y-4">
              {mlMetrics.map((metric, i) => (
                <div key={i} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-400">{metric.label}</span>
                    <span
                      className={`text-xs font-medium ${
                        metric.change.startsWith('+') || metric.change.startsWith('-')
                          ? metric.change.startsWith('+')
                            ? 'text-green-400'
                            : 'text-red-400'
                          : 'text-blue-400'
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Model Info */}
            <div className="mt-6 rounded-lg border border-blue-800/50 bg-blue-950/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-white">Model Status</span>
              </div>
              <p className="mb-3 text-xs text-blue-200">
                Neural Network v3.2.1 - Last updated 2 hours ago
              </p>
              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Training Data:</span>
                  <span className="text-white">2.4M samples</span>
                </div>
                <div className="flex justify-between">
                  <span>Threat Categories:</span>
                  <span className="text-white">47 types</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span className="text-white">1.2s avg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protection Overview */}
      <div className="rounded-xl border border-blue-800/30 bg-slate-900/50 p-6 backdrop-blur-xl">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Shield className="h-5 w-5 text-green-400" />
          Active Protection Layers
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: 'Real-time URL Scanning',
              status: 'Active',
              description: 'ML-powered link analysis before navigation',
            },
            {
              name: 'Behavioral Analysis',
              status: 'Active',
              description: 'Pattern detection and anomaly identification',
            },
            {
              name: 'Threat Intelligence',
              status: 'Active',
              description: 'Global database of known threats',
            },
          ].map((layer, i) => (
            <div
              key={i}
              className="rounded-lg border border-green-800/30 bg-green-950/20 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-white">{layer.name}</span>
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                  {layer.status}
                </span>
              </div>
              <p className="text-sm text-slate-400">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
