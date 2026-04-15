import { AlertTriangle, Shield, XCircle, ChevronRight, Brain } from 'lucide-react';
import { motion } from 'motion/react';

interface ThreatData {
  url: string;
  riskScore: number;
  threatType: string;
  mlConfidence: number;
  indicators: string[];
  isBlocked: boolean;
}

interface ThreatPopupProps {
  threatData: ThreatData;
  onBlock: () => void;
  onProceed: () => void;
}

export function ThreatPopup({ threatData, onBlock, onProceed }: ThreatPopupProps) {
  const isHighRisk = threatData.riskScore > 60;
  const isMediumRisk = threatData.riskScore > 30 && threatData.riskScore <= 60;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onBlock}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`mx-4 w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl ${
          isHighRisk
            ? 'border-red-500/50 bg-gradient-to-br from-red-950 to-slate-900'
            : 'border-yellow-500/50 bg-gradient-to-br from-yellow-950 to-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`border-b p-6 ${
            isHighRisk ? 'border-red-800/50 bg-red-950/50' : 'border-yellow-800/50 bg-yellow-950/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`rounded-full p-3 ${
                  isHighRisk ? 'bg-red-600/20' : 'bg-yellow-600/20'
                }`}
              >
                {isHighRisk ? (
                  <XCircle className="h-8 w-8 text-red-400" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                )}
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-bold text-white">
                  {threatData.isBlocked ? '⛔ Threat Blocked' : '⚠️ Security Warning'}
                </h2>
                <p className={isHighRisk ? 'text-red-300' : 'text-yellow-300'}>
                  CyberGuard AI has detected a potential threat
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Threat URL */}
          <div className="mb-6 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Attempted URL
            </p>
            <p className="break-all font-mono text-sm text-white">{threatData.url}</p>
          </div>

          {/* Risk Score */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-white">Risk Assessment</span>
              <span
                className={`text-lg font-bold ${
                  isHighRisk ? 'text-red-400' : 'text-yellow-400'
                }`}
              >
                {threatData.riskScore}% Risk
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${threatData.riskScore}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full ${
                  isHighRisk
                    ? 'bg-gradient-to-r from-red-600 to-red-500'
                    : 'bg-gradient-to-r from-yellow-600 to-yellow-500'
                }`}
              />
            </div>
          </div>

          {/* Threat Classification */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Threat Type
                </span>
              </div>
              <p className="font-semibold text-white">{threatData.threatType}</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  ML Confidence
                </span>
              </div>
              <p className="font-semibold text-white">{threatData.mlConfidence.toFixed(1)}%</p>
            </div>
          </div>

          {/* Threat Indicators */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-white">
              <Shield className="h-5 w-5 text-blue-400" />
              Detection Indicators
            </h3>
            <div className="space-y-2">
              {threatData.indicators.map((indicator, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-900/50 p-3"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span className="text-sm text-slate-300">{indicator}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Analysis Note */}
          <div className="mb-6 rounded-lg border border-blue-800/50 bg-blue-950/30 p-4">
            <div className="flex items-start gap-3">
              <Brain className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
              <div>
                <h4 className="mb-1 font-semibold text-blue-300">AI-Powered Analysis</h4>
                <p className="text-sm text-blue-200">
                  Our neural network analyzed this URL using behavioral patterns, domain reputation,
                  SSL certificate validation, and 50+ other security parameters in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onBlock}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] ${
                isHighRisk
                  ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50'
              }`}
            >
              {threatData.isBlocked ? 'Stay Protected (Blocked)' : 'Block & Go Back'}
            </button>
            {!threatData.isBlocked && (
              <button
                onClick={onProceed}
                className="flex-1 rounded-lg border border-slate-600 bg-slate-800/50 px-6 py-3 font-semibold text-slate-300 transition-all hover:bg-slate-700/50"
              >
                Proceed Anyway (Not Recommended)
              </button>
            )}
          </div>

          {threatData.isBlocked && (
            <p className="mt-3 text-center text-sm text-slate-400">
              This site has been automatically blocked for your protection
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
