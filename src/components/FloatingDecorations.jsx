import { useEffect, useRef } from 'react';
import '../styles/FloatingDecorations.css';

const PETAL_COUNT = 56;
const DUST_COUNT = 22;
const SPARKLE_COUNT = 7;

function PetalShape() {
  return (
    <svg viewBox="0 0 24 34" className="floating-petal__shape" aria-hidden="true">
      <path d="M12 1C20 7 24 14 20 23C17 29 12 33 12 33S7 29 4 23C0 14 4 7 12 1Z" />
    </svg>
  );
}

function PetalSystem() {
  return (
    <div className="floating-petal-system" aria-hidden="true">
      <div className="floating-petal-layer floating-petal-layer--back">
        {Array.from({ length: PETAL_COUNT }, (_, index) => (
          <span className={`floating-petal floating-petal--${(index % 14) + 1}`} key={`back-petal-${index}`}>
            <PetalShape />
          </span>
        ))}
      </div>
      <div className="floating-petal-layer floating-petal-layer--front">
        {Array.from({ length: PETAL_COUNT }, (_, index) => (
          <span className={`floating-petal floating-petal--${((index + 5) % 14) + 1}`} key={`front-petal-${index}`}>
            <PetalShape />
          </span>
        ))}
      </div>
    </div>
  );
}

function HeartParticles() {
  return (
    <div className="floating-heart-system" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <svg className={`floating-heart floating-heart--${index + 1}`} viewBox="0 0 24 24" key={`heart-${index}`}>
          <path d="M12 20.5S3.5 15.4 3.5 9.3A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 8.5 2.1c0 6.1-8.5 11.2-8.5 11.2Z" />
        </svg>
      ))}
    </div>
  );
}

function GoldenDust() {
  return (
    <div className="floating-dust-system" aria-hidden="true">
      {Array.from({ length: DUST_COUNT }, (_, index) => (
        <span className={`floating-dust floating-dust--${(index % 10) + 1}`} key={`dust-${index}`} />
      ))}
    </div>
  );
}

function Sparkles() {
  return (
    <div className="floating-sparkle-system" aria-hidden="true">
      {Array.from({ length: SPARKLE_COUNT }, (_, index) => (
        <span className={`floating-sparkle floating-sparkle--${index + 1}`} key={`sparkle-${index}`}>
          <i />
          <i />
        </span>
      ))}
    </div>
  );
}

function FloatingDecorations({ active }) {
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) return undefined;

    const root = document.documentElement;
    const updateParallax = () => {
      frameRef.current = 0;
      root.style.setProperty('--floating-scroll', `${window.scrollY * 0.025}px`);
    };
    const onScroll = () => {
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      root.style.removeProperty('--floating-scroll');
    };
  }, [active]);

  useEffect(() => {
    if (!active) return undefined;
    const onVisibilityChange = () => {
      document.documentElement.classList.toggle('floating-animations-paused', document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [active]);

  if (!active) return null;

  return (
    <div className="floating-decorations" aria-hidden="true">
      <PetalSystem />
      <HeartParticles />
      <GoldenDust />
      <Sparkles />
    </div>
  );
}

export { PetalSystem, HeartParticles, GoldenDust, Sparkles };
export default FloatingDecorations;
