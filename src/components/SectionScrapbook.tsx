'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionScrapbook() {
  return (
    <section className="min-h-screen bg-[#6D2323] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* BACKGROUND: bg-maroon-texture */}
      <img src="/images/bg-maroon-texture.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* LAYER 1 CORNER DECORATION: LOVE LETTER BOTTOM RIGHT */}
      <div className="absolute bottom-0 right-0 w-[100px] h-[100px] overflow-hidden z-10 pointer-events-none">
        <img 
          src="/images/love-letter-layer-removebg-preview.png" 
          alt="" 
          className="absolute max-w-none"
          style={{
            width: '250px',
            bottom: '-32px',
            right: '-18px'
          }}
        />
      </div>

      {/* TOP DECORATION: SUNSHINE TAPE */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="absolute top-4 left-4 z-30 drop-shadow-md w-36 sm:w-44"
      >
        <img 
          src="/images/sunshine-tape-removebg-preview.png" 
          alt="You are my Sunshine" 
          className="w-full h-auto transform -rotate-3"
        />
      </motion.div>

      {/* MAIN SCRAPBOOK CORE CONTAINER */}
      <div className="relative w-full max-w-[370px] aspect-[3/4] mt-12 flex items-center justify-center z-20">
        
        {/* LAYER 1: LOVE LETTER (BELAKANG - CLIPPED TO HIDE CORNER PIECE) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
          style={{ clipPath: 'inset(0 0 20% 0)' }}
        >
          <img 
            src="/images/love-letter-layer-removebg-preview.png" 
            alt="Love letter layer" 
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
          <img 
            src="/images/picture-photo-removebg-preview.png" 
            alt="Main photo" 
            className="w-full h-full object-contain"
          />
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
            className="w-full h-full object-contain"
          />
        </motion.div>

      </div>

    </section>
  );
}