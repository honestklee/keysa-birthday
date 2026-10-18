'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const isPausedByVideoRef = useRef(false);
  const isMutedRef = useRef(false);

  useEffect(() => {
    // Create the audio loop element
    const audio = new Audio('/music/Backstreet_Boys_-_Shape_of_My_Heart_(mp3.pm).mp3');
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const removeAutoplayListeners = () => {
      window.removeEventListener('click', handleAutoplayAttempt);
      window.removeEventListener('touchstart', handleAutoplayAttempt);
      window.removeEventListener('scroll', handleAutoplayAttempt);
    };

    const handleRemoveAutoplay = () => {
      removeAutoplayListeners();
    };

    // Direct background play attempt on any scroll or click
    const handleAutoplayAttempt = () => {
      if (isPausedByVideoRef.current || isMutedRef.current) return;

      if (audio.paused) {
        audio.play()
          .then(() => {
            setShowOverlay(false);
            removeAutoplayListeners();
          })
          .catch((err) => console.log("Direct autoplay pending overlay interaction: ", err));
      } else {
        removeAutoplayListeners();
      }
    };

    const handlePauseBg = () => {
      isPausedByVideoRef.current = true;
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    };

    const handleResumeBg = () => {
      isPausedByVideoRef.current = false;
      if (!isMutedRef.current && audio.paused) {
        audio.play()
          .catch((err) => console.log("Failed to resume bg music:", err));
      }
    };

    const handleVolumeChange = (event: Event) => {
      const detail = (event as CustomEvent<{ volume: number; muted: boolean }>).detail;
      if (
        !detail ||
        !Number.isFinite(detail.volume) ||
        detail.volume < 0 ||
        detail.volume > 1 ||
        typeof detail.muted !== 'boolean'
      ) {
        console.error('Invalid background music volume control event.');
        return;
      }

      audio.volume = detail.volume;
      audio.muted = detail.muted;
      isMutedRef.current = detail.muted;

      if (detail.muted) {
        audio.pause();
      } else if (!isPausedByVideoRef.current && audio.paused) {
        audio.play().catch((err) => console.error("Audio playback failed:", err));
      }
    };

    window.addEventListener('click', handleAutoplayAttempt);
    window.addEventListener('touchstart', handleAutoplayAttempt);
    window.addEventListener('scroll', handleAutoplayAttempt);
    window.addEventListener('pause-bg-music', handlePauseBg);
    window.addEventListener('resume-bg-music', handleResumeBg);
    window.addEventListener('remove-autoplay-listeners', handleRemoveAutoplay);
    window.addEventListener('background-music-volume', handleVolumeChange);

    return () => {
      audio.pause();
      removeAutoplayListeners();
      window.removeEventListener('pause-bg-music', handlePauseBg);
      window.removeEventListener('resume-bg-music', handleResumeBg);
      window.removeEventListener('remove-autoplay-listeners', handleRemoveAutoplay);
      window.removeEventListener('background-music-volume', handleVolumeChange);
    };
  }, []);

  const handleStartMusic = () => {
    if (audioRef.current) {
      isMutedRef.current = false;
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => {
          setShowOverlay(false);
          window.dispatchEvent(new CustomEvent('remove-autoplay-listeners'));
        })
        .catch((err) => {
          console.error("Audio trigger failed: ", err);
        });
    }
  };

  return (
    <>
      {/* 1. ROMANTIC AUTOPLAY INTERACTION OVERLAY (Ensures audio triggers 100% of the time on load) */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[99999] bg-[#6D2323] flex flex-col items-center justify-center select-none"
          >
            {/* Ambient Background Texture */}
            <img 
              src="/images/bg-maroon-texture.png" 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" 
            />

            {/* Vintage Scrapbook invitation envelope stack */}
            <motion.div 
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="relative flex flex-col items-center z-10 text-center px-6"
            >
              {/* Sweet cursive invitation header */}
              <h2 
                style={{ fontFamily: 'var(--font-yellowtail)' }} 
                className="text-[34px] sm:text-[38px] text-[#FEF9E1] yellowtail-regular mb-10 drop-shadow-md"
              >
                Special gift for Mutiaaaaa...
              </h2>

              {/* Embossed Wax Seal Button */}
              <motion.button
                onClick={handleStartMusic}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 bg-[#A31D1D] hover:bg-[#B62626] rounded-full flex items-center justify-center shadow-2xl border-4 border-[#FEF9E1]/80 cursor-pointer relative group transition-colors"
              >
                {/* Vintage wax ribbon */}
                <div className="absolute top-1/2 left-[15%] w-16 h-4 bg-[#6D2323] rounded rotate-45 transform -translate-y-1/2 opacity-80" />
                <div className="absolute top-1/2 right-[15%] w-16 h-4 bg-[#6D2323] rounded -rotate-45 transform -translate-y-1/2 opacity-80" />
                
                {/* Embellished Seal center */}
                <div className="relative w-16 h-16 bg-[#A31D1D] border-2 border-dashed border-[#FEF9E1]/50 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-[#FEF9E1] text-[34px] drop-shadow font-serif">♥</span>
                </div>
              </motion.button>

              <span className="text-[#E5D0AC] text-[12px] uppercase tracking-widest mt-8 animate-pulse font-serif">
                Tap to open 💖
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
