'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function SectionMusic() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#6D2323]">

      {/* 1. LAYER BACKGROUND: Maroon textured background */}
      <img
        src="/images/bg-maroon-texture.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Fixed aspect/dimensions container to prevent layout adjustment on zoom/resize */}
      <div className="relative w-[430px] h-[800px] scale-[0.83] min-[400px]:scale-[0.92] min-[430px]:scale-100 origin-center flex-shrink-0 z-10">

        {/* 2. LAYER LYRICS: Spotify Lyric Card Layer (Sticker layer, not background) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-[20px] w-[355px] h-auto z-10 pointer-events-none drop-shadow-lg"
        >
          <img
            src="/music-letter/lyric-layer.png"
            alt="Lana Del Rey lyrics"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* 3. STICKER WAX SEAL: VERY LARGE Heart Wax Seal at the bottom-left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-[-60px] left-[-80px] z-10 w-[400px] h-[400px] pointer-events-none"
        >
          <img
            src="/music-letter/candle-love-sticker.png"
            alt="Wax Seal sticker"
            className="w-full h-full object-contain filter brightness-[0.8] contrast-125 rotate-[5deg]"
          />
        </motion.div>

        {/* 4. STICKER PERFUME: Chanel No. 5 Perfume Bottle overlapping the giant wax seal */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 10 }}
          whileInView={{ opacity: 1, y: 0, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="absolute bottom-[50px] left-[55px] z-20 w-[95px] h-auto drop-shadow-xl"
        >
          <img
            src="/music-letter/channel-parfume.png"
            alt="Chanel Parfume"
            className="w-full h-auto object-contain cursor-pointer active:scale-95 transition-transform"
          />
        </motion.div>

        {/* 5. STICKER BUTTERFLY: Large red butterfly in the top-right corner */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: -20, rotate: 15 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: -12 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="absolute top-[20px] right-[-10px] z-10 w-[190px] h-auto pointer-events-none drop-shadow-md"
        >
          <img
            src="/music-letter/image-removebg-preview.png"
            alt="Red Butterfly"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* 6. POLAROID WINDOW MEMORY: Centered Polaroid frame with memory photo inside */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="absolute top-[180px] left-[100px] z-10 w-[230px] h-[280px] drop-shadow-2xl"
        >
          <div className="relative w-full h-full">
            {/* Polaroid Border */}
            <img
              src="/music-letter/pollarod-for-picture.png"
              alt="Polaroid frame"
              className="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none"
            />
            {/* Photo inside Polaroid - rendered above the black cutout */}
            <div className="absolute left-[16px] right-[16px] top-[15px] bottom-[54px] z-25 overflow-hidden flex items-center justify-center bg-[#1a1a1a]">
              <img
                src="/you/utama.jpg"
                alt="Memory portrait"
                className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.95]"
              />
            </div>
            {/* Polaroid Date */}
            <span 
              className="absolute bottom-[16px] left-0 right-0 text-center z-30 text-white text-[16px] font-semibold tracking-wider select-none"
              style={{ 
                fontFamily: 'var(--font-handwriting)',
                transform: 'rotate(-2deg)'
              }}
            >
              19 - 10 - 2026
            </span>
          </div>
        </motion.div>

        {/* 7. SPOTIFY MUSIC PLAYER CARD: Bottom-right corner using music-card.png */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="absolute bottom-[40px] right-[20px] z-30 w-[230px] drop-shadow-2xl"
        >
          <img
            src="/music-letter/music-card.png"
            alt="Cinnamon Girl Music Player"
            className="w-full h-auto object-contain rounded-lg border border-[#A31D1D]/30"
          />
        </motion.div>

      </div>

      {/* Outro: The End */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <span 
          className="text-[#FEF9E1]/80 text-3xl tracking-widest yellowtail-regular"
          style={{ fontFamily: 'var(--font-yellowtail)' }}
        >
          The End
        </span>
      </div>

    </section>
  );
}