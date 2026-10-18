'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SectionScrapbook() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isIntersectingRef = useRef(true);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShowOverlay(true);
    }
  }, [isPlaying]);

  // Candle Blow States
  const [isLit, setIsLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; rotation: number; duration: number }[]>([]);

  const triggerConfetti = () => {
    const colors = ['#FFC0CB', '#FFD700', '#ADFF2F', '#00FFFF', '#FF69B4', '#FEF9E1', '#E5D0AC', '#A31D1D'];
    const newParticles = Array.from({ length: 36 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 120;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance - 80;
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: i,
        x: destX,
        y: destY,
        color,
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
        duration: 1.2 + Math.random() * 0.8,
      };
    });
    setParticles(newParticles);
  };

  const handleBlowOut = () => {
    if (!isLit) return;
    setIsLit(false);
    setShowSmoke(true);
    triggerConfetti();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        
        // If scrolled away and video is playing, pause it
        if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleVideoPlay = () => {
    setIsPlaying(true);
    window.dispatchEvent(new CustomEvent('pause-bg-music'));
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    // If the section is scrolled out of view, keep bg music paused!
    if (!isIntersectingRef.current) {
      console.log("BirthdayMe.mp4 paused due to section transition. Keeping bg music paused.");
    } else {
      window.dispatchEvent(new CustomEvent('resume-bg-music'));
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => console.log('Video play failed:', err));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setShowOverlay(true);
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#6D2323] flex flex-col items-center justify-start pt-10 pb-16 p-4 relative overflow-hidden">
      
      {/* BACKGROUND: bg-maroon-texture */}
      <img src="/images/bg-maroon-texture.png" alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* BOTTOM RIGHT CORNER DECORATION */}
      <div className="absolute bottom-0 right-0 w-[160px] sm:w-[220px] z-10 pointer-events-none">
        <img 
          src="/images/letter-corner-bawah-kanan.png" 
          alt="" 
          loading="lazy"
          decoding="async"
          className="w-full h-auto"
        />
      </div>

      {/* TOP DECORATION: SUNSHINE TAPE */}
      <motion.div 
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="absolute -top-7 -left-3 z-30 drop-shadow-md w-44 sm:w-52"
      >
        <img 
          src="/images/sunshine-tape-removebg-preview.png" 
          alt="You are my Sunshine" 
          loading="lazy"
          decoding="async"
          className="w-full h-auto"
        />
      </motion.div>

      {/* MAIN SCRAPBOOK CORE CONTAINER */}
      <div className="relative w-full max-w-[370px] aspect-[3/4] mt-6 flex items-center justify-center z-20">
        
        {/* LAYER 1: LOVE LETTER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <img 
            src="/images/love-letter-layer-removebg-preview.png" 
            alt="Love letter layer" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* LAYER 2: COP LETTER (TIMPA LOVE LETTER) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <img 
            src="/images/cop-letter-layer-removebg-preview.png" 
            alt="Cop letter layer" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* LAYER 3: PICTURE PHOTO (UTAMA) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="absolute inset-0 z-30 flex items-center justify-center"
        >
          <div 
            className="relative w-full aspect-[585/427] max-w-[320px] cursor-pointer group"
            onClick={togglePlay}
            onMouseEnter={() => isPlaying && setShowOverlay(true)}
            onMouseLeave={() => isPlaying && setShowOverlay(false)}
          >
            {/* Video under the frame */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-md">
              <video
                ref={videoRef}
                src="/images/BirthdayMe.mp4"
                poster="/you/utama.jpg"
                preload="none"
                playsInline
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoPause}
                className="absolute object-cover w-[74.36%] h-[71.19%] left-[12.82%] top-[14.52%]"
                style={{
                  transform: 'rotate(3.03deg) scale(1.03)',
                  transformOrigin: 'center',
                }}
              />
            </div>
            
            {/* The transparent frame image */}
            <img 
              src="/images/picture-photo-frame.png" 
              alt="Main photo frame" 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none"
            />

            {/* Play/Pause Button Overlay */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 rounded-md pointer-events-none transition-all duration-300"
                  style={{
                    clipPath: 'polygon(12.82% 14.52%, 87.18% 14.52%, 87.18% 85.71%, 12.82% 85.71%)',
                    transform: 'rotate(3.03deg)',
                  }}
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] pointer-events-none"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#FEF9E1] text-[#A31D1D] flex items-center justify-center shadow-inner transform group-hover:scale-105 transition-transform duration-300">
                      {isPlaying ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* LAYER 4: STAR STICKER (UJUNG ATAS KANAN FOTO) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute top-[80px] -right-2 z-40 w-[110px] h-[110px] pointer-events-none"
        >
          <img 
            src="/images/star.-stciker-removebg-preview.png" 
            alt="Star stickers" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* LAYER 5: CAT STICKER (DI BAWAH KANAN UJUNG FOTO) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-[75px] -right-4 z-50 w-[130px] h-[130px] pointer-events-none"
        >
          <img 
            src="/images/cat-sticker-removebg-preview.png" 
            alt="Cat sticker" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </motion.div>

      </div>

      {/* CANDLE BLOWING INTERACTION */}
      <div className="relative z-30 mt-8 flex flex-col items-center select-none w-full max-w-[320px]">
        {/* Instruction Text */}
        <h4 
          style={{ fontFamily: 'var(--font-yellowtail)' }} 
          className="text-[#FEF9E1] text-3xl mb-1 drop-shadow-sm text-center yellowtail-regular"
        >
          {isLit ? "Make A Wish" : "Happy Birthday Sayang"}
        </h4>
        <p className="text-[#E5D0AC] text-[11px] text-center max-w-[260px] opacity-90 leading-relaxed font-sans transition-all duration-300 mb-8">
          {isLit 
            ? "Ketuk kue atau api lilin untuk meniupnya!" 
            : "Lilinnya sudah ditiup! Semoga semua harapanmu dikabulkan ya."}
        </p>

        {/* Cake and Candle Container */}
        <div className="relative cursor-pointer" onClick={handleBlowOut}>
          
          {/* Confetti Particle Burst */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: -25, scale: 0.2, rotate: 0, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y - 25,
                scale: [0.2, 1.2, 0.4],
                rotate: p.rotation + 360,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: p.duration,
                ease: "easeOut"
              }}
              className="absolute rounded-sm z-50 pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
            />
          ))}

          {/* SVG Birthday Cake & Candle */}
          <svg width="140" height="110" viewBox="0 0 140 110" className="overflow-visible">
            {/* Plate */}
            <ellipse cx="70" cy="95" rx="50" ry="7" fill="#E5D0AC" stroke="#FEF9E1" strokeWidth="1.5" />
            
            {/* Cake Base */}
            <path d="M 28,62 Q 70,70 112,62 L 112,90 Q 70,98 28,90 Z" fill="#FEF9E1" stroke="#E5D0AC" strokeWidth="1" />
            
            {/* Cake Layer Stripe */}
            <path d="M 28,71 Q 70,79 112,71 L 112,78 Q 70,86 28,78 Z" fill="#A31D1D" opacity="0.75" />
            
            {/* Cake Top Layer */}
            <path d="M 28,38 Q 70,46 112,38 L 112,62 Q 70,70 28,62 Z" fill="#FEF9E1" />
            
            {/* Cream Drips */}
            <path d="M 28,38 Q 36,46 45,38 Q 54,46 63,38 Q 72,46 81,38 Q 90,46 99,38 Q 108,46 112,38 L 112,45 Q 103,53 94,45 Q 85,53 76,45 Q 67,53 58,45 Q 49,53 40,45 Q 31,53 28,45 Z" fill="#A31D1D" />
            
            {/* Topping Cherries */}
            <circle cx="48" cy="33" r="4.5" fill="#A31D1D" />
            <circle cx="70" cy="35" r="4.5" fill="#A31D1D" />
            <circle cx="92" cy="33" r="4.5" fill="#A31D1D" />
            
            {/* Candle */}
            <rect x="66" y="12" width="8" height="26" rx="2" fill="#E5D0AC" stroke="#A31D1D" strokeWidth="1" />
            <path d="M 66,16 L 74,20 M 66,23 L 74,27 M 66,30 L 74,34" stroke="#A31D1D" strokeWidth="1.5" />
            
            {/* Wick */}
            <line x1="70" y1="12" x2="70" y2="6" stroke="#333" strokeWidth="1.5" />

            {/* Candle Flame (Only shown if lit) */}
            <AnimatePresence>
              {isLit && (
                <motion.g
                  key="flame"
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="origin-bottom"
                  style={{ transformOrigin: "70px 6px" }}
                >
                  <motion.g
                    animate={{
                      scaleY: [1, 1.15, 0.95, 1.05, 1],
                      scaleX: [1, 0.92, 1.08, 0.96, 1],
                      rotate: [0, 1.5, -1.5, 0.7, -0.7, 0],
                      y: [0, -0.5, 0, -0.2, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ transformOrigin: "70px 6px" }}
                  >
                    {/* Flame Glow */}
                    <circle cx="70" cy="-1" r="9" fill="#FFA500" opacity="0.3" className="blur-xs pointer-events-none" />
                    {/* Flame Outer */}
                    <path d="M 70,-12 Q 64,-4 70,3 Q 76,-4 70,-12 Z" fill="#FF8C00" />
                    {/* Flame Inner */}
                    <path d="M 70,-7 Q 67,-3 70,2 Q 73,-3 70,-7 Z" fill="#FFFFE0" />
                  </motion.g>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Smoke (Shown right after blowing out) */}
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
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </svg>
        </div>

      </div>

    </section>
  );
}