'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MusicIntroOverlay from './MusicIntroOverlay';

type IntroStatus = 'idle' | 'loading' | 'error';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPausedByVideoRef = useRef(false);
  const isMutedRef = useRef(false);
  const isStartedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [introStatus, setIntroStatus] = useState<IntroStatus>('idle');

  const getAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio();
    audio.preload = 'none';
    audio.loop = true;
    audio.volume = 0.55;
    audio.src = '/music/Backstreet_Boys_-_Shape_of_My_Heart_(mp3.pm).mp3';
    audioRef.current = audio;
    return audio;
  }, []);

  useEffect(() => {
    const audio = getAudio();

    const handlePauseBg = () => {
      isPausedByVideoRef.current = true;
      audio.pause();
    };

    const handleResumeBg = () => {
      isPausedByVideoRef.current = false;
      if (isStartedRef.current && !isMutedRef.current && audio.paused) {
        audio.play().catch(error => console.error('Failed to resume background music:', error));
      }
    };

    const handleVolumeChange = (event: Event) => {
      const detail = (event as CustomEvent<{ volume: number; muted: boolean }>).detail;
      if (
        !detail ||
        !Number.isFinite(detail.volume) ||
        detail.volume < 0 ||
        detail.volume > 1 ||
        typeof detail.muted !== 'boolean'
      ) {
        console.error('Invalid background music volume control event.');
        return;
      }

      audio.volume = detail.volume;
      audio.muted = detail.muted;
      isMutedRef.current = detail.muted;

      if (detail.muted) {
        audio.pause();
      } else if (isStartedRef.current && !isPausedByVideoRef.current && audio.paused) {
        audio.play().catch(error => console.error('Audio playback failed:', error));
      }
    };

    window.addEventListener('pause-bg-music', handlePauseBg);
    window.addEventListener('resume-bg-music', handleResumeBg);
    window.addEventListener('background-music-volume', handleVolumeChange);

    return () => {
      audio.pause();
      if (audioRef.current === audio) audioRef.current = null;
      window.removeEventListener('pause-bg-music', handlePauseBg);
      window.removeEventListener('resume-bg-music', handleResumeBg);
      window.removeEventListener('background-music-volume', handleVolumeChange);
    };
  }, [getAudio]);

  const handleStartMusic = async () => {
    if (isLoadingRef.current) return;
    const audio = getAudio();

    isLoadingRef.current = true;
    setIntroStatus('loading');
    isMutedRef.current = false;
    audio.muted = false;

    try {
      await audio.play();
      isStartedRef.current = true;
      setIntroStatus('idle');
      setShowOverlay(false);
    } catch (error) {
      isStartedRef.current = false;
      setIntroStatus('error');
      console.error('Audio trigger failed:', error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  return (
    <AnimatePresence>
      {showOverlay && (
        <MusicIntroOverlay
          status={introStatus}
          onOpen={handleStartMusic}
        />
      )}
    </AnimatePresence>
  );
}
