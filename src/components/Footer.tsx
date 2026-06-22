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
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0 flex items-center justify-center cursor-pointer select-none"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 36% 30%, ${AC}0.07) 0%, rgba(4,6,9,0.97) 68%)`,
                boxShadow: `0 0 0 1.5px ${AC}0.68), 0 0 20px ${AC}0.3), 0 0 42px ${AC}0.1), inset 0 0 18px ${AC}0.04)`,
              }}
            >
              {/* Inner ring */}
              <div style={{ position: 'absolute', inset: '5px', borderRadius: '50%', border: `1px solid ${AC}0.2)` }} />
              {/* Italic I */}
              <span
                className="relative z-10 select-none"
                style={{
                  fontFamily: "'Georgia', 'Palatino Linotype', serif",
                  fontSize: '22px',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: `rgba(130,240,195,0.95)`,
                  textShadow: `0 0 10px ${AC}0.75), 0 0 26px ${AC}0.42)`,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                I
              </span>
            </motion.div>

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
            <div className="hidden sm:flex items-center select-none" style={{ gap: '8px' }}>
              {['D e s i g n', 'D e v e l o p', 'D e p l o y'].map((word, i) => (
                <span key={word} className="flex items-center" style={{ gap: '8px' }}>
                  <span style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '11.5px',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: 'rgba(160,185,170,0.72)',
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
              href="https://wa.me/919363001680"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.09,
                boxShadow: `0 0 0 1.5px ${AC}0.92), 0 0 30px ${AC}0.5), 0 0 58px ${AC}0.16)`,
              }}
              whileTap={{ scale: 0.93 }}
              className="flex-shrink-0 flex items-center justify-center cursor-pointer select-none"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 36% 30%, ${AC}0.06) 0%, rgba(4,6,9,0.97) 68%)`,
                boxShadow: `0 0 0 1.5px ${AC}0.58), 0 0 18px ${AC}0.22), inset 0 0 14px ${AC}0.03)`,
                transition: 'box-shadow 0.22s ease',
              }}
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                style={{ width: '20px', height: '20px', fill: '#10b981' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
