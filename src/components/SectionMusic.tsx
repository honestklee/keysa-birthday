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

      {/* 2. LAYER LYRICS: Spotify Lyric Card Layer (Sticker layer, not background) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 w-[355px] h-auto z-10 pointer-events-none drop-shadow-lg"
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
        className="absolute bottom-[-80px] left-[-90px] z-10 w-[420px] h-[420px] pointer-events-none"
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
        className="absolute bottom-[40px] left-[50px] z-20 w-[95px] h-auto drop-shadow-xl"
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
        className="absolute top-[20px] -right-8 z-10 w-[200px] h-auto pointer-events-none drop-shadow-md"
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
        className="absolute top-[180px] left-[135px] z-10 w-[230px] h-[280px] drop-shadow-2xl"
      >
        <div className="relative w-full h-full">
          {/* Polaroid Border */}
          <img
            src="/music-letter/pollarod-for-picture.png"
            alt="Polaroid frame"
            className="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none"
          />
          {/* Photo inside Polaroid */}
          <div className="absolute inset-0 p-4 pb-[54px] pt-[15px] flex items-center justify-center bg-black">
            <img
              src="/you/Cantik.png"
              alt="Memory portrait"
              className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.95]"
            />
          </div>
        </div>
      </motion.div>

      {/* 7. SPOTIFY MUSIC PLAYER CARD: Bottom-right corner using music-card.png */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="absolute bottom-2 right-2 z-30 w-[230px] drop-shadow-2xl"
      >
        <img
          src="/music-letter/music-card.png"
          alt="Cinnamon Girl Music Player"
          className="w-full h-auto object-contain rounded-lg border border-[#A31D1D]/30"
        />
      </motion.div>

    </section>
  );
}