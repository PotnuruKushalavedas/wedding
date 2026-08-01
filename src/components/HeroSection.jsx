import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import heroBg from '../assets/hero_couple.png';
import '../styles/HeroSection.css';

const EASE = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: EASE },
});

const DATE_DETAILS = [
  { icon: FaCalendarAlt, label: 'August 27, 2026' },
  { icon: FaClock, label: '10:30 AM' },
  { icon: FaMapMarkerAlt, label: 'Vizianagaram' },
];

function HeroDivider() {
  return <span className="hero-divider" aria-hidden="true" />;
}

function HeroSection() {
  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="hero" id="hero">
      <motion.div
        className="hero__background"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        aria-hidden="true"
      />

      <motion.div
        className="hero__overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        aria-hidden="true"
      />

      <div className="hero__content">
        <motion.div className="hero__eyebrow-wrap" {...fadeUp(0.35)}>
          <HeroDivider />
          <p className="hero__eyebrow">We Are Getting Married</p>
          <HeroDivider />
        </motion.div>

        <motion.h1 className="hero__title" {...fadeUp(0.5)}>
          Abhivish
        </motion.h1>

        <motion.div className="hero__names" {...fadeUp(0.65)}>
          <span className="hero__names-line">VishnuPriya</span>
          <span className="hero__names-amp" aria-hidden="true">&</span>
          <span className="hero__names-line">Abhiram Sarma</span>
        </motion.div>

        <motion.p className="hero__quote" {...fadeUp(0.8)}>
          Two hearts, one sacred promise.
        </motion.p>

        <motion.div className="hero__date-card" {...fadeUp(0.95)}>
          {DATE_DETAILS.map((item, index) => (
            <div className="hero__date-group" key={item.label}>
              {index > 0 && <span className="hero__date-dot" aria-hidden="true">•</span>}
              <div className="hero__date-item">
                <item.icon className="hero__date-icon" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.button
          type="button"
          className="hero__cta"
          onClick={scrollToGallery}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.1, ease: EASE }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore our story <span aria-hidden="true">&darr;</span>
        </motion.button>

        <motion.div className="hero__scroll-cue" {...fadeUp(1.25)} aria-hidden="true">
          <span className="hero__scroll-line" />
          <span>Scroll to discover</span>
        </motion.div>
      </div>
    </header>
  );
}

export default HeroSection;
