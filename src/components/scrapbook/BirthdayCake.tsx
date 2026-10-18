'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  duration: number;
};

const confettiColors = [
  '#FFC0CB',
  '#FFD700',
  '#ADFF2F',
  '#00FFFF',
  '#FF69B4',
  '#FEF9E1',
  '#E5D0AC',
  '#A31D1D',
];

function createConfetti(): Particle[] {
  return Array.from({ length: 36 }, (_, id) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 120;

    return {
      id,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 80,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      duration: 1.2 + Math.random() * 0.8,
    };
  });
}

export default function BirthdayCake() {
  const [isLit, setIsLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleBlowOut = () => {
    if (!isLit) return;

    setIsLit(false);
    setShowSmoke(true);
    setParticles(createConfetti());
  };

  return (
    <div className="relative z-30 mt-8 flex w-full max-w-[320px] select-none flex-col items-center">
      <h4
        style={{ fontFamily: 'var(--font-yellowtail)' }}
        className="yellowtail-regular mb-1 text-center text-3xl text-[#FEF9E1] drop-shadow-sm"
      >
        {isLit ? 'Make A Wish' : 'Happy Birthday Sayang'}
      </h4>
      <p className="mb-8 max-w-[260px] text-center font-sans text-[11px] leading-relaxed text-[#E5D0AC] opacity-90 transition-all duration-300">
        {isLit
          ? 'Ketuk kue atau api lilin untuk meniupnya!'
          : 'Lilinnya sudah ditiup! Semoga semua harapanmu dikabulkan ya.'}
      </p>

      <button
        type="button"
        onClick={handleBlowOut}
        disabled={!isLit}
        aria-label={isLit ? 'Tiup lilin ulang tahun' : 'Lilin sudah ditiup'}
        className="relative cursor-pointer disabled:cursor-default"
      >
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ x: 0, y: -25, scale: 0.2, rotate: 0, opacity: 1 }}
            animate={{
              x: particle.x,
              y: particle.y - 25,
              scale: [0.2, 1.2, 0.4],
              rotate: particle.rotation + 360,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: particle.duration, ease: 'easeOut' }}
            className="pointer-events-none absolute z-50 rounded-sm"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
          />
        ))}

        <svg
          width="140"
          height="110"
          viewBox="0 0 140 110"
          className="overflow-visible"
          aria-hidden="true"
        >
          <ellipse cx="70" cy="95" rx="50" ry="7" fill="#E5D0AC" stroke="#FEF9E1" strokeWidth="1.5" />
          <path d="M 28,62 Q 70,70 112,62 L 112,90 Q 70,98 28,90 Z" fill="#FEF9E1" stroke="#E5D0AC" strokeWidth="1" />
          <path d="M 28,71 Q 70,79 112,71 L 112,78 Q 70,86 28,78 Z" fill="#A31D1D" opacity="0.75" />
          <path d="M 28,38 Q 70,46 112,38 L 112,62 Q 70,70 28,62 Z" fill="#FEF9E1" />
          <path d="M 28,38 Q 36,46 45,38 Q 54,46 63,38 Q 72,46 81,38 Q 90,46 99,38 Q 108,46 112,38 L 112,45 Q 103,53 94,45 Q 85,53 76,45 Q 67,53 58,45 Q 49,53 40,45 Q 31,53 28,45 Z" fill="#A31D1D" />
          <circle cx="48" cy="33" r="4.5" fill="#A31D1D" />
          <circle cx="70" cy="35" r="4.5" fill="#A31D1D" />
          <circle cx="92" cy="33" r="4.5" fill="#A31D1D" />
          <rect x="66" y="12" width="8" height="26" rx="2" fill="#E5D0AC" stroke="#A31D1D" strokeWidth="1" />
          <path d="M 66,16 L 74,20 M 66,23 L 74,27 M 66,30 L 74,34" stroke="#A31D1D" strokeWidth="1.5" />
          <line x1="70" y1="12" x2="70" y2="6" stroke="#333" strokeWidth="1.5" />

          <AnimatePresence>
            {isLit && (
              <motion.g
                key="flame"
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="origin-bottom"
                style={{ transformOrigin: '70px 6px' }}
              >
                <motion.g
                  animate={{
                    scaleY: [1, 1.15, 0.95, 1.05, 1],
                    scaleX: [1, 0.92, 1.08, 0.96, 1],
                    rotate: [0, 1.5, -1.5, 0.7, -0.7, 0],
                    y: [0, -0.5, 0, -0.2, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '70px 6px' }}
                >
                  <circle cx="70" cy="-1" r="9" fill="#FFA500" opacity="0.3" className="pointer-events-none blur-xs" />
                  <path d="M 70,-12 Q 64,-4 70,3 Q 76,-4 70,-12 Z" fill="#FF8C00" />
                  <path d="M 70,-7 Q 67,-3 70,2 Q 73,-3 70,-7 Z" fill="#FFFFE0" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSmoke && (
              <motion.path
                key="smoke"
                d="M 70,4 Q 67,-8 73,-20 T 68,-36"
                fill="none"
                stroke="#E5D0AC"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0.7}
                initial={{ pathLength: 0, y: 0 }}
                animate={{ pathLength: 1, y: -15, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
        </svg>
      </button>
    </div>
  );
}
