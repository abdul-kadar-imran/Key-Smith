import { Shield, AlertTriangle, CheckCircle2, ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';
import { PasswordStrength } from '../types';
import { motion } from 'motion/react';

interface StrengthIndicatorProps {
  strength: PasswordStrength;
}

export default function StrengthIndicator({ strength }: StrengthIndicatorProps) {
  const getProgressColor = () => {
    switch (strength.color) {
      case 'red': return 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]';
      case 'orange': return 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]';
      case 'yellow': return 'bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)]';
      case 'emerald': return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]';
      case 'cyber': return 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]';
      default: return 'bg-zinc-600';
    }
  };

  const getSvgStrokeColor = () => {
    switch (strength.color) {
      case 'red': return 'stroke-rose-500';
      case 'orange': return 'stroke-amber-500';
      case 'yellow': return 'stroke-yellow-400';
      case 'emerald': return 'stroke-emerald-500';
      case 'cyber': return 'stroke-cyan-400';
      default: return 'stroke-zinc-600';
    }
  };

  const getSvgGlowFilter = () => {
    switch (strength.color) {
      case 'red': return 'rgba(244, 63, 94, 0.25)';
      case 'orange': return 'rgba(245, 158, 11, 0.25)';
      case 'yellow': return 'rgba(250, 204, 21, 0.2)';
      case 'emerald': return 'rgba(16, 185, 129, 0.25)';
      case 'cyber': return 'rgba(34, 211, 238, 0.25)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getBadgeColorStyles = () => {
    switch (strength.color) {
      case 'red': return 'border-rose-500/30 bg-rose-950/20 text-rose-400 glow-text-rose';
      case 'orange': return 'border-amber-500/30 bg-amber-950/20 text-amber-400 glow-text-amber';
      case 'yellow': return 'border-yellow-500/30 bg-yellow-950/10 text-yellow-400';
      case 'emerald': return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400 glow-text-emerald';
      case 'cyber': return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400 glow-text-cyan';
      default: return 'border-zinc-800 bg-zinc-900 text-zinc-400';
    }
  };

  const getSecurityIcon = () => {
    switch (strength.color) {
      case 'cyber':
      case 'emerald':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'yellow':
      case 'orange':
        return <Shield className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
    }
  };

  // Radial progress calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (strength.score / 100) * circumference;

  const fillSegments = Math.ceil((strength.score / 100) * 5);

  return (
    <div id="strength-panel" className="glass-panel p-5 rounded-xl border border-zinc-800 flex flex-col h-full justify-between">
      {/* Title */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Diagnostics</span>
        </div>
        
        <div className={`px-2.5 py-0.5 font-mono text-[9px] tracking-widest font-bold border rounded transition-all duration-300 ${getBadgeColorStyles()}`}>
          {strength.label}
        </div>
      </div>

      {/* Radial Security Dial Gauge */}
      <div className="flex flex-col items-center justify-center my-4 relative">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-zinc-800/60 fill-none"
              strokeWidth="6"
            />
            {/* Animated Radial Fill */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              className={`fill-none ${getSvgStrokeColor()}`}
              strokeWidth="6"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 6px ${getSvgGlowFilter()})`
              }}
            />
          </svg>
          {/* Inner details */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            {getSecurityIcon()}
            <span className="font-mono text-lg font-bold text-zinc-100 leading-none mt-1">
              {strength.score}
              <span className="text-[10px] font-medium text-zinc-500">%</span>
            </span>
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">Rating</span>
          </div>
        </div>
      </div>

      {/* Segmented Progress Bars (glowing) */}
      <div className="grid grid-cols-5 gap-2.5 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-1.5 rounded bg-zinc-800/80 overflow-hidden relative border border-white/5">
            <div 
              className={`h-full absolute left-0 top-0 w-full transition-transform duration-600 origin-left ${
                i < fillSegments ? 'translate-x-0' : '-translate-x-full'
              } ${getProgressColor()}`}
            />
          </div>
        ))}
      </div>

      {/* Stats HUD Panel */}
      <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-800/40 py-3.5 mb-4 font-mono text-xs">
        <div className="bg-zinc-950/30 p-2.5 rounded border border-zinc-900/60">
          <span className="text-zinc-500 block text-[9px] tracking-widest mb-1 uppercase">Entropy</span>
          <span className="text-zinc-200 font-bold block text-sm">
            {strength.entropyBits} <span className="text-zinc-500 text-[10px] font-normal">bits</span>
          </span>
        </div>
        <div className="bg-zinc-950/30 p-2.5 rounded border border-zinc-900/60 min-w-0">
          <span className="text-zinc-500 block text-[9px] tracking-widest mb-1 uppercase">Crack Estimate</span>
          <span className="text-emerald-400 font-bold block text-[11px] truncate" title={strength.crackTimeDisplay}>
            {strength.crackTimeDisplay}
          </span>
        </div>
      </div>

      {/* Security Feedback Tips */}
      <div className="space-y-2 bg-zinc-950/20 p-3 rounded-lg border border-zinc-900/50 flex-1 flex flex-col justify-center min-h-[64px]">
        {strength.tips.map((tip, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-2 text-[10px] text-zinc-400"
          >
            {strength.color === 'cyber' || strength.color === 'emerald' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            )}
            <p className="leading-snug text-zinc-350">{tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
