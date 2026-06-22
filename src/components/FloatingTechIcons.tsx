import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal, Binary, ShieldCheck, Key, Database, Server } from 'lucide-react';

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* soft gradient blobs for depth */}
      <div className="tech-blob tech-blob-1 top-[5%] left-[5%]"></div>
      <div className="tech-blob tech-blob-2 top-[35%] right-[5%]"></div>
      <div className="tech-blob tech-blob-3 bottom-[15%] left-[8%]"></div>

      {/* floating tech icons */}
      <motion.div
        className="absolute top-[10%] left-[4%] text-zinc-900/20 tech-icon"
        animate={{ y: [0, -16, 0], x: [0, 8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Cpu className="w-16 h-16 stroke-[1] text-emerald-400/12" />
      </motion.div>

      <motion.div
        className="absolute top-[26%] right-[6%] text-zinc-900/12 tech-icon"
        animate={{ y: [0, -22, 0], x: [0, -12, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Binary className="w-20 h-20 stroke-[1] text-indigo-400/10" />
      </motion.div>

      <motion.div
        className="absolute bottom-[34%] left-[6%] text-zinc-900/18 tech-icon"
        animate={{ y: [0, -12, 0], x: [0, 6, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Terminal className="w-14 h-14 stroke-[1] text-rose-400/12" />
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] right-[8%] text-zinc-900/18 tech-icon"
        animate={{ y: [0, -18, 0], x: [0, -8, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ShieldCheck className="w-16 h-16 stroke-[1] text-emerald-300/10" />
      </motion.div>

      <motion.div
        className="absolute top-[48%] left-[8%] text-zinc-900/12 hidden xl:block tech-icon"
        animate={{ y: [0, -10, 0], x: [0, 4, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Key className="w-12 h-12 stroke-[1] text-amber-300/10" />
      </motion.div>

      <motion.div
        className="absolute bottom-[48%] right-[10%] text-zinc-900/12 hidden xl:block tech-icon"
        animate={{ y: [0, -18, 0], x: [0, -6, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Database className="w-14 h-14 stroke-[1] text-sky-300/10" />
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[28%] text-zinc-900/0 hidden lg:block tech-icon"
        animate={{ y: [0, -8, 0], x: [0, 3, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Server className="w-10 h-10 stroke-[1] text-sky-300/8" />
      </motion.div>
    </div>
  );
}
