'use client';

import React, { useState, useEffect } from 'react';
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

  // State to hold randomized photos after mounting to avoid hydration mismatch
  const [randomizedPhotos, setRandomizedPhotos] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Count the number of active photo slots
    const totalSlots = heartPattern.flat().filter(cell => cell === 1).length;
    // Generate random photos for each slot
    const randomArray = Array.from({ length: totalSlots }).map(() => {
      const randomIndex = Math.floor(Math.random() * samplePhotos.length);
      return samplePhotos[randomIndex];
    });
    setRandomizedPhotos(randomArray);
  }, []);

  let photoSequenceCounter = 0;

  return (
    <section className="min-h-screen bg-[#6D2323] flex flex-col items-center justify-between py-12 px-6 relative select-none overflow-hidden">
      {/* BACKGROUND: re-letter-bg */}
      <img src="/Love/re-letter-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      <div className="w-full flex-1 flex flex-col justify-center items-center relative z-10">
        
        {/* HEART COLLAGE GRID */}
        <div className="grid grid-cols-7 gap-1.5 w-full max-w-[340px] aspect-square">
          {isMounted && randomizedPhotos.length > 0 && heartPattern.flatMap((row, rIdx) =>
            row.map((isPhoto, cIdx) => {
              if (isPhoto) {
                const photoSeqId = photoSequenceCounter++;
                const currentImg = randomizedPhotos[photoSeqId] || samplePhotos[0];
                return (
                  <motion.div
                    key={`${rIdx}-${cIdx}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: photoSeqId * 0.045, 
                      duration: 0.35,
                      type: 'spring',
                      stiffness: 110,
                      damping: 12
                    }}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    className="w-full h-full bg-[#E5D0AC] border-[0.5px] border-[#FEF9E1] overflow-hidden shadow-sm rounded-sm"
                  >
                    <img
                      src={currentImg}
                      alt="Grid memory"
                      className="w-full h-full object-cover filter grayscale contrast-125 hover:filter-none transition-all duration-300"
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
            className="text-4xl md:text-5xl text-[#FEF9E1] leading-tight yellowtail-regular drop-shadow-lg"
          >
            happy birthday my love
          </motion.h1>
        </div>

      </div>
    </section>
  );
}