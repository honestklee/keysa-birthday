'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function SectionLetter() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#6D2323]">

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

      {/* LETTER CONTENT WRITTEN DIRECTLY ON PAPER CONTAINER */}
      <div className="relative z-20 max-w-[280px] text-center mx-auto mt-[220px] mb-[185px] px-4 font-serif text-[#6D2323] leading-relaxed select-none">
        <h3 className="yellowtail-regular text-3xl mb-4 text-[#A31D1D] drop-shadow-sm">
          Dear My Love Keysaa,
        </h3>
        <p className="text-[13px] sm:text-[14px] italic leading-loose text-justify px-2 drop-shadow-sm font-medium">
          Happy level up day! Terima kasih ya sudah menjadi bagian paling indah dari hariku. Di scrapbook digital ini aku simpan semua potongan senyummu, tawamu, dan momen-momen manis kita. Semoga hari-harimu selalu dipenuhi kebahagiaan hangat, sehangat kasih sayang yang selalu ku kirimkan untukmu.
        </p>
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