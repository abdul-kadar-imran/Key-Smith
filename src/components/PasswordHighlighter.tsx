import { motion } from 'motion/react';

interface PasswordHighlighterProps {
  password: string;
  visible: boolean;
}

export default function PasswordHighlighter({ password, visible }: PasswordHighlighterProps) {
  if (!password) return null;

  if (!visible) {
    const dots = '•'.repeat(Math.max(16, password.length));
    return (
      <div className="flex flex-wrap items-center gap-0.5 font-mono select-none">
        {dots.split('').map((char, index) => (
          <span 
            key={index} 
            className="text-zinc-600 text-lg sm:text-xl font-bold transition-all duration-300 hover:text-emerald-500/50"
            style={{ 
              textShadow: '0 0 8px rgba(24, 24, 27, 0.5)'
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center font-mono tracking-wider break-all select-all">
      {password.split('').map((char, index) => {
        let colorClass = 'text-zinc-350 hover:text-white transition-colors duration-200';
        let glowClass = '';

        if (/[A-Z]/.test(char)) {
          colorClass = 'text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-200';
          glowClass = 'glow-text-cyan';
        } else if (/[0-9]/.test(char)) {
          colorClass = 'text-emerald-400 font-bold hover:text-emerald-300 transition-colors duration-200';
          glowClass = 'glow-text-emerald';
        } else if (/[^a-zA-Z0-9]/.test(char)) {
          colorClass = 'text-amber-400 font-bold hover:text-amber-300 transition-colors duration-200';
          glowClass = 'glow-text-amber';
        }

        return (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, scale: 0.8, y: 3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: Math.min(0.25, index * 0.012) 
            }}
            className={`inline-block ${colorClass} ${glowClass}`}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
}
