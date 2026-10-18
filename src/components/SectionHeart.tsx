'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type HeartMedia = {
  filename: string;
  type: 'image' | 'video';
};

const heartPattern = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const mediaFiles: HeartMedia[] = [
  { filename: 'IMG_20260712_193751_634.jpg', type: 'image' },
  { filename: 'utama.jpg', type: 'image' },
  { filename: 'WhatsApp Image 2026-10-16 at 00.32.29.jpeg', type: 'image' },
  { filename: 'WhatsApp Image 2026-10-16 at 00.32.35.jpeg', type: 'image' },
  { filename: 'WhatsApp Image 2026-10-18 at 13.49.26.jpeg', type: 'image' },
  { filename: 'WhatsApp Image 2026-10-18 at 13.49.27.jpeg', type: 'image' },
  { filename: 'WhatsApp Image 2026-10-18 at 13.49.28.jpeg', type: 'image' },
  { filename: 'WhatsApp Video 2026-10-16 at 00.32.24 (2).mp4', type: 'video' },
  { filename: 'WhatsApp Video 2026-10-16 at 00.32.24.mp4', type: 'video' },
  { filename: 'WhatsApp Video 2026-10-16 at 00.32.25 (2).mp4', type: 'video' },
  { filename: 'WhatsApp Video 2026-10-16 at 00.32.28 (2).mp4', type: 'video' },
  { filename: 'WhatsApp Video 2026-10-16 at 00.32.37.mp4', type: 'video' },
  { filename: 'WhatsApp Video 2026-10-16 at 00.37.04.mp4', type: 'video' },
  { filename: 'WhatsApp Video 2026-10-18 at 14.04.09.mp4', type: 'video' },
  { filename: 'WhatsApp Video 2026-10-18 at 14.04.44.mp4', type: 'video' },
];

const totalPhotoSlots = heartPattern.flat().filter(cell => cell === 1).length;
const assignedHeartMedia = Array.from(
  { length: totalPhotoSlots },
  (_, index) => mediaFiles[index % mediaFiles.length]
);

export default function SectionHeart() {
  const [musicVolume, setMusicVolume] = useState(55);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  let photoSequenceCounter = 0;

  const updateMusicVolume = (volume: number, muted: boolean) => {
    window.dispatchEvent(
      new CustomEvent('background-music-volume', {
        detail: { volume: volume / 100, muted },
      })
    );
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value);
    setMusicVolume(volume);
    setIsMusicMuted(false);
    updateMusicVolume(volume, false);
  };

  const toggleMusicMuted = () => {
    const muted = !isMusicMuted;
    setIsMusicMuted(muted);
    updateMusicVolume(musicVolume, muted);
  };

  return (
    <section className="min-h-screen bg-[#6D2323] flex flex-col items-center justify-between py-12 px-6 relative select-none overflow-hidden">
      {/* BACKGROUND: re-letter-bg */}
      <img src="/Love/re-letter-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-[#FEF9E1]/40 bg-[#6D2323]/75 px-3 py-2 text-[#FEF9E1] shadow-lg backdrop-blur-sm">
        <button
          type="button"
          onClick={toggleMusicMuted}
          aria-label={isMusicMuted ? 'Nyalakan musik latar' : 'Bisukan musik latar'}
          aria-pressed={isMusicMuted}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#FEF9E1]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FEF9E1]"
        >
          <svg aria-hidden="true" className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {isMusicMuted ? (
              <path d="m16 9 5 6m0-6-5 6" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M15 9a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
        <input
          type="range"
          min="5"
          max="100"
          value={musicVolume}
          onChange={handleVolumeChange}
          aria-label="Volume musik latar"
          className="h-1.5 w-20 cursor-pointer accent-[#FEF9E1]"
        />
      </div>

      <div className="w-full flex-1 flex flex-col justify-center items-center relative z-10">
        
        {/* HEART COLLAGE GRID */}
        <div className="grid grid-cols-7 grid-rows-6 gap-1.5 w-full max-w-[340px] aspect-square">
          {heartPattern.flatMap((row, rIdx) =>
            row.map((isPhoto, cIdx) => {
              if (isPhoto) {
                const photoSeqId = photoSequenceCounter++;
                const currentMedia = assignedHeartMedia[photoSeqId];
                const mediaSrc = `/you/${encodeURIComponent(currentMedia.filename)}`;
                return (
                  currentMedia.type === 'video' ? (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      type="button"
                      onClick={() => setSelectedVideo(mediaSrc)}
                      aria-label={`Tonton video kenangan ${currentMedia.filename}`}
                      className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-sm border-[0.5px] border-[#FEF9E1] bg-[#6D2323] text-[#FEF9E1] shadow-sm transition-transform hover:z-10 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FEF9E1]"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current transition-transform group-hover:scale-125">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  ) : (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className="h-full w-full overflow-hidden rounded-sm border-[0.5px] border-[#FEF9E1] bg-[#E5D0AC] shadow-sm transition-transform hover:z-10 hover:scale-110"
                    >
                      <img
                        src={mediaSrc}
                        alt="Grid memory"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover grayscale contrast-125 transition-all duration-300 hover:filter-none"
                      />
                    </div>
                  )
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

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video kenangan"
          onClick={event => {
            if (event.target === event.currentTarget) setSelectedVideo(null);
          }}
        >
          <div className="relative w-full max-w-[430px]">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              aria-label="Tutup video"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF9E1] text-2xl text-[#6D2323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              &times;
            </button>
            <video
              key={selectedVideo}
              src={selectedVideo}
              autoPlay
              controls
              playsInline
              preload="none"
              className="max-h-[80vh] w-full rounded-lg bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}