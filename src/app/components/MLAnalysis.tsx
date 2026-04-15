import { Brain, Activity, Shield, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ThreatData {
  url: string;
  riskScore: number;
  threatType: string;
  mlConfidence: number;
  indicators: string[];
  isBlocked: boolean;
}

interface MLAnalysisProps {
  isScanning: boolean;
  scanProgress: number;
  threatData: ThreatData | null;
}

export function MLAnalysis({ isScanning, scanProgress, threatData }: MLAnalysisProps) {
  const scanningSteps = [
    { label: 'Domain Reputation Analysis', progress: 20 },
    { label: 'SSL Certificate Validation', progress: 40 },
    { label: 'Neural Network Processing', progress: 60 },
    { label: 'Behavioral Pattern Matching', progress: 80 },
    { label: 'Threat Classification', progress: 100 },
  ];

  const currentStep = scanningSteps.find(step => scanProgress < step.progress) || scanningSteps[4];

  return (
    <div className="space-y-6">
      {isScanning ? (
        <>
          {/* Scanning Animation */}
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
            >
              <Brain className="h-12 w-12 text-blue-400" />
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold text-white">AI Analysis in Progress</h3>
            <p className="mb-6 text-sm text-slate-400">{currentStep.label}</p>

            {/* Progress Bar */}
            <div className="mx-auto max-w-md">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">Scanning...</span>
                <span className="font-mono font-semibold text-blue-400">{scanProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Live Analysis Steps */}
          <div className="mx-auto max-w-2xl space-y-2">
            {scanningSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: scanProgress >= step.progress ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  scanProgress >= step.progress
                    ? 'border-blue-700/50 bg-blue-950/30'
                    : 'border-slate-700 bg-slate-800/30'
                }`}
              >
                {scanProgress >= step.progress ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Activity className="h-5 w-5 animate-pulse text-slate-500" />
                )}
                <span
                  className={`text-sm ${
                    scanProgress >= step.progress ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </>
      ) : threatData ? (
        <>
          {/* Analysis Complete */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
                threatData.riskScore > 60
                  ? 'bg-gradient-to-br from-red-500/20 to-red-600/20'
                  : threatData.riskScore > 30
                  ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
                  : 'bg-gradient-to-br from-green-500/20 to-green-600/20'
              }`}
            >
              {threatData.riskScore > 60 ? (
                <AlertTriangle className="h-12 w-12 text-red-400" />
              ) : threatData.riskScore > 30 ? (
                <AlertTriangle className="h-12 w-12 text-yellow-400" />
              ) : (
                <Shield className="h-12 w-12 text-green-400" />
              )}
            </motion.div>
            <h3 className="mb-2 text-2xl font-semibold text-white">Analysis Complete</h3>
            <p
              className={`text-lg font-medium ${
                threatData.riskScore > 60
                  ? 'text-red-400'
                  : threatData.riskScore > 30
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}
            >
              {threatData.riskScore > 60
                ? 'High Risk Detected'
                : threatData.riskScore > 30
                ? 'Medium Risk Detected'
                : 'Safe to Proceed'}
            </p>
          </div>

          {/* Detailed Results */}
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {/* Risk Score Card */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-white">Risk Score</h4>
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <div className="mb-4">
                <div className="mb-2 text-4xl font-bold text-white">{threatData.riskScore}%</div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    style={{ width: `${threatData.riskScore}%` }}
                    className={`h-full ${
                      threatData.riskScore > 60
                        ? 'bg-gradient-to-r from-red-600 to-red-500'
                        : threatData.riskScore > 30
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-500'
                        : 'bg-gradient-to-r from-green-600 to-green-500'
                    }`}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Based on {threatData.indicators.length} detection indicators
              </p>
            </div>

            {/* ML Confidence Card */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-white">ML Confidence</h4>
                <Brain className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="mb-4">
                <div className="mb-2 text-4xl font-bold text-white">
                  {threatData.mlConfidence.toFixed(1)}%
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    style={{ width: `${threatData.mlConfidence}%` }}
                    className="h-full bg-gradient-to-r from-cyan-600 to-blue-500"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-400">Neural network prediction accuracy</p>
            </div>

            {/* Threat Type Card */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-white">Threat Classification</h4>
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="mb-2 text-xl font-semibold text-white">{threatData.threatType}</div>
              <p className="text-sm text-slate-400">Classified by AI model v3.2.1</p>
            </div>

            {/* Action Required Card */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-white">Recommended Action</h4>
                <Zap className="h-5 w-5 text-orange-400" />
              </div>
              <div
                className={`mb-2 text-xl font-semibold ${
                  threatData.isBlocked ? 'text-red-400' : 'text-yellow-400'
                }`}
              >
                {threatData.isBlocked ? 'Block Access' : 'Proceed with Caution'}
              </div>
              <p className="text-sm text-slate-400">
                {threatData.isBlocked
                  ? 'Automatically blocked for protection'
                  : 'User confirmation required'}
              </p>
            </div>
          </div>

          {/* Detection Indicators */}
          <div className="mx-auto max-w-4xl">
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Shield className="h-5 w-5 text-blue-400" />
              Detection Indicators
            </h4>
            <div className="space-y-2">
              {threatData.indicators.map((indicator, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800/50 p-4"
                >
                  <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-slate-300">{indicator}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
