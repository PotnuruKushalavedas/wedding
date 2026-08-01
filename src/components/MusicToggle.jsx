import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useAudio } from '../context/AudioContext';
import '../styles/MusicToggle.css';

function MusicToggle() {
  const { isPlaying, toggleMusic, hasOpened } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const iconTransition = {
    duration: prefersReducedMotion ? 0 : 0.35,
    ease: 'easeInOut'
  };

  if (!hasOpened) return null;

  return (
    <motion.button
      type="button"
      className={`music-toggle-btn ${isPlaying ? 'music-toggle-btn--playing' : ''}`}
      onClick={toggleMusic}
      initial={{ opacity: 0, scale: 0.82, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.08, rotate: 6 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-label={isPlaying ? 'Turn Music Off' : 'Turn Music On'}
      aria-pressed={isPlaying}
    >
      <span className="music-toggle-btn__pulse" aria-hidden="true" />
      <span className="music-toggle-btn__icon" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isPlaying ? 'on' : 'off'}
            className="music-toggle-btn__icon-state"
            initial={{ opacity: 0, scale: 0.65, rotate: isPlaying ? -12 : 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.65, rotate: isPlaying ? 12 : -12 }}
            transition={iconTransition}
          >
            {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

export default MusicToggle;
