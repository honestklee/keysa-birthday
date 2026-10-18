'use client';

import { motion } from 'framer-motion';

type IntroStatus = 'idle' | 'loading' | 'error';

type MusicIntroOverlayProps = {
  status: IntroStatus;
  onOpen: () => void;
};

export default function MusicIntroOverlay({ status, onOpen }: MusicIntroOverlayProps) {
  const isLoading = status === 'loading';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[99999] flex select-none flex-col items-center justify-center bg-[#6D2323]"
    >
      <img
        src="/images/bg-maroon-texture.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <motion.div
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <h2
          style={{ fontFamily: 'var(--font-yellowtail)' }}
          className="yellowtail-regular mb-10 text-[34px] text-[#FEF9E1] drop-shadow-md sm:text-[38px]"
        >
          Special gift for Mutiaaaaa...
        </h2>

        <motion.button
          type="button"
          onClick={onOpen}
          disabled={isLoading}
          whileHover={isLoading ? undefined : { scale: 1.08 }}
          whileTap={isLoading ? undefined : { scale: 0.96 }}
          aria-live="polite"
          className="flex h-24 min-w-40 items-center justify-center gap-3 rounded-full border-4 border-[#FEF9E1]/80 bg-[#A31D1D] px-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#FEF9E1] shadow-2xl transition-colors hover:bg-[#B62626] disabled:cursor-wait disabled:opacity-80"
        >
          {isLoading && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-[#FEF9E1]/40 border-t-[#FEF9E1]"
            />
          )}
          {isLoading ? 'Loading...' : status === 'error' ? 'Coba lagi' : 'Buka'}
        </motion.button>

        <p
          role={status === 'error' ? 'alert' : 'status'}
          className="mt-8 min-h-5 text-[12px] uppercase tracking-widest text-[#E5D0AC]"
        >
          {isLoading
            ? 'Memuat musik...'
            : status === 'error'
              ? 'Musik belum dapat diputar. Ketuk untuk mencoba lagi.'
              : 'Tap to open'}
        </p>
      </motion.div>
    </motion.div>
  );
}
