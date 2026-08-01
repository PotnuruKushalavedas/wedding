import { createContext, useContext, useEffect, useRef, useState } from 'react';
import songFile from '../assets/song.mp3';

const MusicContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const playRequestRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    const audio = new Audio(songFile);
    audio.loop = true;
    audio.volume = 0.32;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const syncPlaying = () => setIsPlaying(!audio.paused);
    audio.addEventListener('play', syncPlaying);
    audio.addEventListener('pause', syncPlaying);

    return () => {
      audio.removeEventListener('play', syncPlaying);
      audio.removeEventListener('pause', syncPlaying);
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    if (playRequestRef.current) return playRequestRef.current;

    playRequestRef.current = audio.play().catch(() => {
      setIsPlaying(false);
    }).finally(() => {
      playRequestRef.current = null;
    });

    return playRequestRef.current;
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
  };

  const toggleMusic = () => {
    if (audioRef.current?.paused) {
      return playMusic();
    }
    pauseMusic();
  };

  const openInvitationAndPlay = () => {
    setHasOpened(true);
    return playMusic();
  };

  return (
    <MusicContext.Provider value={{ isPlaying, hasOpened, toggleMusic, openInvitationAndPlay }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useAudio must be used inside AudioProvider');
  return context;
}
