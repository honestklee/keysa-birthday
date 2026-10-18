'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayCake from './BirthdayCake';

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

      <BirthdayCake />

    </section>
  );
}