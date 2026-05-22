'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const isPausedByVideoRef = useRef(false);

  useEffect(() => {
    // Create the audio loop element
    const audio = new Audio('/music/Cinnamon Girl-LanaDelRey.mp3');
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
      if (isPausedByVideoRef.current) return;

      if (audio.paused) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
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
        setIsPlaying(false);
      }
    };

    const handleResumeBg = () => {
      isPausedByVideoRef.current = false;
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Failed to resume bg music:", err));
      }
    };

    window.addEventListener('click', handleAutoplayAttempt);
    window.addEventListener('touchstart', handleAutoplayAttempt);
    window.addEventListener('scroll', handleAutoplayAttempt);
    window.addEventListener('pause-bg-music', handlePauseBg);
    window.addEventListener('resume-bg-music', handleResumeBg);
    window.addEventListener('remove-autoplay-listeners', handleRemoveAutoplay);

    return () => {
      audio.pause();
      removeAutoplayListeners();
      window.removeEventListener('pause-bg-music', handlePauseBg);
      window.removeEventListener('resume-bg-music', handleResumeBg);
      window.removeEventListener('remove-autoplay-listeners', handleRemoveAutoplay);
    };
  }, []);

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowOverlay(false);
          window.dispatchEvent(new CustomEvent('remove-autoplay-listeners'));
        })
        .catch((err) => {
          console.error("Audio trigger failed: ", err);
          setIsPlaying(true);
          setShowOverlay(false);
          window.dispatchEvent(new CustomEvent('remove-autoplay-listeners'));
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
                Special gift for Keysaa...
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

      {/* 2. FLOATING VINTAGE PLAY/PAUSE TOGGLE */}
      <div className="fixed bottom-4 left-4 z-[9999] flex items-center justify-center">
        <button 
          onClick={() => {
            if (!audioRef.current) return;
            if (isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
            } else {
              audioRef.current.play()
                .then(() => setIsPlaying(true));
            }
          }}
          className="w-10 h-10 bg-[#A31D1D] hover:bg-[#6D2323] text-white rounded-full flex items-center justify-center shadow-lg border border-[#FEF9E1]/30 transition-all scale-95 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
        >
          {isPlaying ? (
            // Sound On Icon
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            // Muted Icon
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
