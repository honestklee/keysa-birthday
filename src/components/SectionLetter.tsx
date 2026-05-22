'use client';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SectionLetter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isIntersectingRef = useRef(true);

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
    // When the video plays, pause the background music
    window.dispatchEvent(new CustomEvent('pause-bg-music'));
  };

  const handleVideoPause = () => {
    // If the section is scrolled out of view, keep bg music paused!
    if (!isIntersectingRef.current) {
      console.log("Keyca.mp4 paused due to section transition. Keeping bg music paused.");
    } else {
      // When the video is paused manually or ends, resume the background music
      window.dispatchEvent(new CustomEvent('resume-bg-music'));
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => console.log('Video play failed:', err));
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#6D2323]">

      {/* BACKGROUND: Crumpled paper background texture */}
      <img
        src="/images/bg-maroon-texture.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* SECONDARY BACKGROUND: Crumpled letter background */}
      <img
        src="/letter-images/bg-section-letter.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* STICKER 1: CD STICKER (TOP-LEFT CORNER) */}
      <motion.div
        initial={{ opacity: 0, rotate: -25, scale: 0.8 }}
        whileInView={{ opacity: 1, rotate: -10, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute -top-12 -left-12 z-10 w-[160px] h-[160px] pointer-events-none drop-shadow-md"
      >
        <img
          src="/letter-images/cd-sticker.png"
          alt="Lust for Life CD"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* STICKER 2: CHERRY STICKER (TOP-MIDDLE) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-2 left-[40%] z-10 w-[90px] h-[90px] pointer-events-none drop-shadow-md"
      >
        <img
          src="/letter-images/cherry-sticker.png"
          alt="Cherry sticker"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* STICKER 3: BILLIARD BALL (RIGHT-MIDDLE-TOP) */}
      <motion.div
        initial={{ opacity: 0, x: 50, rotate: 15 }}
        whileInView={{ opacity: 1, x: 0, rotate: -5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-[110px] -right-6 z-10 w-[95px] h-[95px] pointer-events-none drop-shadow-md"
      >
        <img
          src="/letter-images/billiard-ball-sticker.png"
          alt="Billiard sticker"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* STICKER 4: FINGERPRINT HEART (LEFT-MIDDLE) */}
      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        whileInView={{ opacity: 1, rotate: 5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="absolute top-[165px] left-5 z-10 w-[55px] h-[55px] pointer-events-none drop-shadow-sm"
      >
        <img
          src="/letter-images/lovely-sticker.png"
          alt="Fingerprint Heart"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* STICKER 5: MOON STICKER (LEFT-BOTTOM-MIDDLE) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute bottom-[240px] -left-12 z-10 w-[140px] h-[140px] pointer-events-none drop-shadow-md"
      >
        <img
          src="/letter-images/moon-sticker.png"
          alt="Blood Moon"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* STICKER 6: NEWSPAPER HEART WITH RED RIBBON (RIGHT-BOTTOM-MIDDLE) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-[210px] -right-8 z-10 w-[160px] h-[160px] pointer-events-none drop-shadow-md"
        style={{ mixBlendMode: 'multiply' }}
      >
        <img
          src="/letter-images/newspaper-heart-sticker.png"
          alt="Newspaper Heart sticker"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* STICKER 7: RED PAGE CORNER PAGES LAYER (BOTTOM-LEFT) */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: -50 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 left-0 z-10 w-[170px] h-auto pointer-events-none drop-shadow-lg"
      >
        <img
          src="/letter-images/red-corner-pages-layer.png"
          alt="Red tiled corner"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* CONTENT CONTAINER: Video & Letter Text */}
      <div className="relative z-20 flex flex-col items-center max-w-[320px] mx-auto mt-[80px] mb-[100px] px-4 select-none">
        
        {/* VIDEO CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full mb-8"
        >
          {/* Subtle elegant background shadow glow */}
          <div className="absolute inset-0 bg-[#A31D1D]/10 rounded-2xl blur-md -z-10" />
          
          <video
            ref={videoRef}
            src="/letter-images/Keyca.mp4"
            loop
            playsInline
            controls
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onClick={togglePlay}
            className="w-full h-auto rounded-2xl bg-black border-4 border-[#E5D0AC] shadow-2xl cursor-pointer"
          />
        </motion.div>

        {/* LETTER CONTENT WRITTEN DIRECTLY ON PAPER CONTAINER */}
        <div className="text-center font-serif text-[#6D2323] leading-relaxed">
          <h3 className="yellowtail-regular text-3xl mb-4 text-[#A31D1D] drop-shadow-sm">
            Dear, My Love Ecaa.
          </h3>
          <p className="text-[13px] sm:text-[14px] italic leading-loose text-justify px-2 drop-shadow-sm font-medium">
            Happy birthday to my most beautiful woman, my sweetest woman, and my beloved woman, I hope that at your age you can achieve what you want, become even better, become even smarter, once again happy 17th birthday keysa.
          </p>
          <p className="text-[13px] sm:text-[14px] italic leading-loose text-justify px-2 drop-shadow-sm font-medium mt-4">
            Thank you for always bringing happiness and warmth into my life. No matter how hard the days are, your smile will always be my favorite place to come home to. I just want you to know that I'll always be by your side in every laugh, every tear, every moment, anytime and anywhere. I’m so lucky to have someone as special as you, and I hope this year brings you as much love and happiness as you’ve brought into my life. I love you endlessly.
          </p>
          <p className="text-[13px] sm:text-[14px] italic leading-loose text-justify px-2 drop-shadow-sm font-medium mt-4">
            regards,
            <br />
            Ryu
          </p>
        </div>
      </div>

      {/* WAX SEAL STAMP BUTTON CENTERED AT THE VERY BOTTOM */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
      >
        <div className="w-14 h-14 bg-[#A31D1D] rounded-full flex items-center justify-center shadow-lg border-2 border-[#6D2323] relative">
          <span className="text-white text-2xl font-serif">♥</span>
          <div className="absolute inset-1 border border-dashed border-[#FEF9E1] rounded-full opacity-35" />
        </div>
      </motion.div>

    </section>
  );
}