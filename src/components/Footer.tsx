import { motion } from 'motion/react';

// Keysmith accent: emerald-500 = #10b981  rgb(16,185,129)
const A = '16,185,129';           // emerald RGB
const AC = `rgba(${A},`;           // rgba helper prefix

export default function Footer() {
  return (
    <footer className="relative z-10 w-full mt-4 pb-6 px-3 sm:px-6">
      {/* ── Main pill container ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: '32px',
          background:
            'linear-gradient(160deg, rgba(7,9,12,0.97) 0%, rgba(5,8,11,0.99) 60%, rgba(4,6,9,1) 100%)',
          border: `1px solid ${AC}0.14)`,
          boxShadow: `0 0 0 1px ${AC}0.05), 0 0 80px ${AC}0.05), 0 12px 48px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.02)`,
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${AC}0.1) 18%, ${AC}0.5) 50%, ${AC}0.1) 82%, transparent 100%)`,
          }}
        />

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${AC}0.05) 25%, ${AC}0.2) 50%, ${AC}0.05) 75%, transparent 100%)`,
          }}
        />

        {/* Dot grid — bottom strip only */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '30px',
            backgroundImage: `radial-gradient(circle, ${AC}0.26) 1px, transparent 1px)`,
            backgroundSize: '14px 14px',
            backgroundPosition: '7px 4px',
            opacity: 0.55,
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
          }}
        />

        {/* Wide ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '380px',
            height: '55px',
            background: `radial-gradient(ellipse at 50% 100%, ${AC}0.26) 0%, ${AC}0.07) 50%, transparent 72%)`,
            filter: 'blur(8px)',
          }}
        />

        {/* Mid bright column */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '120px',
            height: '36px',
            background: `radial-gradient(ellipse at 50% 100%, rgba(120,240,190,0.8) 0%, ${AC}0.42) 45%, transparent 72%)`,
            filter: 'blur(4px)',
          }}
        />

        {/* Super-bright core flare — pulsing */}
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '38px',
            height: '16px',
            background: `radial-gradient(ellipse at 50% 100%, rgba(200,255,235,1) 0%, rgba(100,230,175,0.9) 45%, transparent 80%)`,
            filter: 'blur(2px)',
          }}
        />

        {/* Curved neon arc */}
        <svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          width="300" height="32" viewBox="0 0 300 32"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 5 }}
        >
          <defs>
            <linearGradient id="arcGradEm" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={`${AC}0)`} />
              <stop offset="25%" stopColor={`${AC}0.38)`} />
              <stop offset="50%" stopColor="rgba(160,255,210,1)" />
              <stop offset="75%" stopColor={`${AC}0.38)`} />
              <stop offset="100%" stopColor={`${AC}0)`} />
            </linearGradient>
          </defs>
          {/* Soft blurred backing arc */}
          <path d="M 0 32 Q 150 -2 300 32" stroke={`${AC}0.28)`} strokeWidth="5"
            fill="none" strokeLinecap="round" style={{ filter: 'blur(3px)' }} />
          {/* Sharp arc */}
          <path d="M 0 32 Q 150 -2 300 32" stroke="url(#arcGradEm)" strokeWidth="1.5"
            fill="none" strokeLinecap="round" />
        </svg>

        {/* ── Main content row ── */}
        <div
          className="relative flex items-center justify-between"
          style={{ padding: '16px 24px 28px 24px', zIndex: 6 }}
        >
          {/* ══ LEFT: Logo · separator · name ══ */}
          <div className="flex items-center gap-4 flex-shrink-0">

            {/* Logo circle */}
            <motion.a
              href="https://imran-desktop.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit My Portfolio"
              animate={{
                boxShadow: [
                  `
      0 0 0 1px ${AC}0.45),
      0 0 18px ${AC}0.22),
      0 0 40px ${AC}0.10),
      inset 0 0 18px ${AC}0.05)
      `,
                  `
      0 0 0 1px ${AC}0.75),
      0 0 28px ${AC}0.45),
      0 0 60px ${AC}0.28),
      inset 0 0 22px ${AC}0.08)
      `,
                  `
      0 0 0 1px ${AC}0.45),
      0 0 18px ${AC}0.22),
      0 0 40px ${AC}0.10),
      inset 0 0 18px ${AC}0.05)
      `,
                ],
              }}
              whileHover={{
                scale: 1.08,
                rotate: 8,
                boxShadow: `
      0 0 0 1.5px ${AC}0.9),
      0 0 35px ${AC}0.6),
      0 0 75px ${AC}0.35),
      inset 0 0 24px ${AC}0.12)
    `,
              }}
              whileTap={{ scale: 0.94 }}
              transition={{
                boxShadow: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              className="group relative flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center select-none"
              style={{
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08) 0%, ${AC}0.08) 18%, rgba(4,6,9,0.98) 72%)`,
                border: `1px solid ${AC}0.18)`,
              }}
            >
              {/* Outer Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  opacity: [0.25, 0.7, 0.25],
                  scale: [1, 1.18, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: `radial-gradient(circle, rgba(16,185,129,0.45) 0%, transparent 72%)`,
                  filter: "blur(40px)",
                }}
              />

              {/* Inner Ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '5px',
                  border: `1px solid ${AC}0.25)`,
                }}
              />

              {/* Portfolio Initial */}
              <span
                className="relative z-10 transition-all duration-300 group-hover:tracking-wider"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'rgba(190,255,225,0.96)',
                  textShadow: `
                    0 0 12px ${AC}0.9),
                    0 0 28px ${AC}0.45)
                  `,
                  lineHeight: 1,
                }}
              >
                I
              </span>

              {/* Tooltip */}
              <span
                className="pointer-events-none absolute -top-11 whitespace-nowrap rounded-lg px-3 py-1 text-[11px] font-medium opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100"
                style={{
                  background: 'rgba(15,18,22,0.96)',
                  border: `1px solid ${AC}0.18)`,
                  color: '#d1fae5',
                  boxShadow: `0 8px 24px rgba(0,0,0,0.35)`,
                }}
              >
                Visit My Portfolio ↗
              </span>
            </motion.a>

            {/* Separator */}
            <div style={{
              width: '1px', height: '44px', flexShrink: 0,
              background: `linear-gradient(to bottom, transparent 0%, ${AC}0.25) 28%, ${AC}0.25) 72%, transparent 100%)`,
            }} />

            {/* Name block */}
            <div className="flex flex-col justify-center select-none" style={{ gap: '4px' }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.44em',
                color: 'rgba(160,185,170,0.65)',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                Abdul Kadar
              </span>
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '0.28em',
                color: '#10b981',
                textTransform: 'uppercase',
                lineHeight: 1,
                textShadow: `0 0 8px ${AC}0.55), 0 0 20px ${AC}0.32), 0 0 36px ${AC}0.14)`,
              }}>
                IMRAN
              </span>
            </div>
          </div>

          {/* ══ RIGHT: Tagline · separator · WhatsApp ══ */}
          <div className="flex items-center gap-4 flex-shrink-0">

            {/* Tagline */}
            <div
              className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center select-none"
              style={{
                gap: '14px',
                width: '100%',
                maxWidth: '420px',
              }}
            >              {['D e s i g n', 'D e v e l o p', 'D e p l o y'].map((word, i) => (
              <span key={word} className="flex items-center" style={{ gap: '8px' }}>
                <span style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 1)',
                }}>
                  {word}
                </span>
                {i < 2 && (
                  <span style={{ color: `${AC}0.6)`, fontSize: '12px', lineHeight: 1 }}>•</span>
                )}
              </span>
            ))}
            </div>

            {/* Separator */}
            <div className="hidden sm:block" style={{
              width: '1px', height: '44px', flexShrink: 0,
              background: `linear-gradient(to bottom, transparent 0%, ${AC}0.25) 28%, ${AC}0.25) 72%, transparent 100%)`,
            }} />

            {/* WhatsApp button */}
            <motion.a
              href="https://imran-desktop.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              animate={{
                boxShadow: [
                  `0 0 0 1.5px ${AC}0.55), 0 0 18px ${AC}0.22), 0 0 40px ${AC}0.10)`,
                  `0 0 0 1.5px ${AC}0.8), 0 0 28px ${AC}0.45), 0 0 60px ${AC}0.22)`,
                  `0 0 0 1.5px ${AC}0.55), 0 0 18px ${AC}0.22), 0 0 40px ${AC}0.10)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.08,
                rotate: -6,
                boxShadow: `0 0 0 1.5px ${AC}0.95), 0 0 36px ${AC}0.55), 0 0 72px ${AC}0.30)`,
              }}
              whileTap={{ scale: 0.94 }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full cursor-pointer overflow-hidden"
              style={{
                background: `radial-gradient(circle at 36% 30%, ${AC}0.08) 0%, rgba(4,6,9,0.97) 68%)`,
                border: `1px solid ${AC}0.18)`,
              }}
              title="Visit My Portfolio"
            >
              {/* Pulsing Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.25, 0.6, 0.25],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: `radial-gradient(circle, rgba(16,185,129,.45) 0%, transparent 70%)`,
                  filter: "blur(16px)",
                }}
              />

              {/* Globe Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: "20px",
                  height: "20px",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a15 15 0 0 1 0 18" />
                <path d="M12 3a15 15 0 0 0 0 18" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
