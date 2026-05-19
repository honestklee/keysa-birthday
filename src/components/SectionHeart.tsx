'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeart() {
  // Representasi grid 7x5 untuk membentuk pola hati
  // 1 = Kotak Foto, 0 = Kosong/Spacer
  const heartPattern = [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ];

  // Foto dari folder public/you
  const samplePhotos = [
    "/you/Bali.png",
    "/you/Cantik.png",
    "/you/Jawa.png",
    "/you/MyLove.png",
    "/you/Pantai.png",
    "/you/Us.png",
    "/you/We.png"
  ];

  return (
    <section className="min-h-screen bg-[#6D2323] flex flex-col items-center justify-between py-12 px-6 relative select-none overflow-hidden">
      {/* BACKGROUND: bg-maroon-texture */}
      <img src="/images/bg-maroon-texture.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      <div className="w-full flex-1 flex flex-col justify-center items-center relative z-10">
        
        {/* HEART COLLAGE GRID */}
        <div className="grid grid-cols-7 gap-1 w-full max-w-[340px] aspect-square">
          {heartPattern.flatMap((row, rIdx) =>
            row.map((isPhoto, cIdx) => {
              if (isPhoto) {
                // Gunakan formula koordinat deterministik untuk menghindari mismatch SSR Math.random()
                const photoIndex = (rIdx * 3 + cIdx * 2) % samplePhotos.length;
                const currentImg = samplePhotos[photoIndex];
                return (
                  <motion.div
                    key={`${rIdx}-${cIdx}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (rIdx + cIdx) * 0.04, duration: 0.4 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="w-full h-full bg-[#E5D0AC] border-[0.5px] border-[#FEF9E1] overflow-hidden shadow-sm"
                  >
                    <img
                      src={currentImg}
                      alt="Grid memory"
                      className="w-full h-full object-cover filter grayscale contrast-125"
                    />
                  </motion.div>
                );
              } else {
                return <div key={`${rIdx}-${cIdx}`} className="w-full h-full" />;
              }
            })
          )}
        </div>

        {/* TYPOGRAPHY TEXT BELOW */}
        <div className="text-center mt-12 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-yellowtail)' }}
            className="text-4xl md:text-5xl text-[#FEF9E1] leading-tight yellowtail-regular"
          >
            happy birthday love
          </motion.h1>
        </div>

      </div>
    </section>
  );
}