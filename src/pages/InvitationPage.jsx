import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Countdown from 'react-countdown';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaChevronRight, 
  FaChevronLeft, 
  FaTimes, 
  FaHeart,
  FaCheckCircle
} from 'react-icons/fa';
import { MdDirections, MdMap } from 'react-icons/md';

// Styles
import '../styles/InvitationPage.css';

// Assets
import heroBg from '../assets/hero_couple.png';
import galleryBride from '../assets/gallery_bride.png';
import galleryGroom from '../assets/gallery_groom.png';
import galleryHenna from '../assets/gallery_henna.png';
import galleryLamps from '../assets/gallery_lamps.png';
import galleryMangalsutra from '../assets/gallery_mangalsutra.png';
import landingBg from '../assets/landing-page.png'; // Mandap illustration
import mandalaImg from '../assets/mandala.png';

// Decorative Custom SVG Components
const GaneshaIcon = () => (
  <svg width="55" height="55" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="ganesha-svg">
    <path d="M50 15 L53 22 L47 22 Z" fill="#C8A96A" />
    <circle cx="50" cy="26" r="3" fill="#C8A96A" />
    <path d="M48 29 C45 35 44 42 47 47 C49 50 53 49 55 52 C57 55 52 62 48 64 C44 66 40 62 39 58" stroke="#C8A96A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M52 29 C55 33 58 37 57 41" stroke="#C8A96A" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M44 32 C38 31 35 37 42 41" stroke="#C8A96A" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M56 32 C62 31 65 37 58 41" stroke="#C8A96A" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M47 50 C41 55 41 68 50 72 C59 72 59 55 53 50" stroke="#C8A96A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="61" cy="55" r="2.5" fill="#C8A96A" />
    <path d="M45 44 L41 45" stroke="#C8A96A" strokeWidth="2" />
    <line x1="50" y1="31" x2="50" y2="36" stroke="#7A1F2B" strokeWidth="2" />
  </svg>
);

const GoldDivider = () => (
  <div className="gold-divider-container" aria-hidden="true">
    <span className="gold-divider-line"></span>
    <span className="gold-divider-diamond">♦</span>
    <span className="gold-divider-line"></span>
  </div>
);

const TopOrnament = () => (
  <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="top-ornament-svg">
    <path d="M10 15 C 40 5, 80 5, 110 15" stroke="#C8A96A" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M30 15 C 50 25, 70 25, 90 15" stroke="#C8A96A" strokeWidth="0.8" strokeLinecap="round" />
    <circle cx="60" cy="8" r="3" fill="#C8A96A" />
    <circle cx="45" cy="15" r="1.5" fill="#C8A96A" />
    <circle cx="75" cy="15" r="1.5" fill="#C8A96A" />
  </svg>
);

const SubtleCorner = ({ position }) => (
  <svg 
    className={`subtle-corner subtle-corner--${position}`} 
    width="35" 
    height="35" 
    viewBox="0 0 50 50" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 5 H 25 M5 5 V 25" stroke="#C8A96A" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="5" cy="5" r="2" fill="#C8A96A" />
    <path d="M10 10 H 18 V 18" stroke="#C8A96A" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

// Floating Particles Effect
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleList = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage left
      y: Math.random() * 100, // percentage top
      size: Math.random() * 8 + 4, // size in px
      delay: Math.random() * 8, // animation delay
      duration: Math.random() * 15 + 15, // float duration
      type: Math.random() > 0.5 ? 'petal' : 'gold', // type of particle
    }));
    setParticles(particleList);
  }, []);

  return (
    <div className="floating-particles-overlay" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`particle particle--${p.type}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: Math.random() * 0.4 + 0.2
          }}
        />
      ))}
    </div>
  );
};

// Gallery Images Configuration
const GALLERY_ITEMS = [
  { id: 1, src: galleryBride, title: "The Radiant Bride", aspect: "portrait" },
  { id: 2, src: galleryHenna, title: "Intricate Henna Details", aspect: "landscape" },
  { id: 3, src: galleryLamps, title: "Sacred Ceremonial Lamps", aspect: "portrait" },
  { id: 4, src: heroBg, title: "Visakha Union", aspect: "landscape" },
  { id: 5, src: galleryGroom, title: "The Handsome Groom", aspect: "portrait" },
  { id: 6, src: galleryMangalsutra, title: "Sacred Mangalasutram", aspect: "landscape" },
  { id: 7, src: landingBg, title: "Luxury Mandap Setup", aspect: "portrait" },
  { id: 8, src: galleryHenna, title: "The Promise of Union", aspect: "portrait", zoom: true }
];

// Timeline Events Configuration
const TIMELINE_EVENTS = [
  {
    id: 1,
    title: "Pelli Rata",
    icon: "🌼",
    date: "February 24, 2026",
    time: "Morning (Auspicious Hora)",
    description: "The auspicious beginning of our wedding celebrations with sacred family rituals, prayers, and blessings for a prosperous married life.",
    image: galleryLamps
  },
  {
    id: 2,
    title: "Pelli Kuturu",
    icon: "🌸",
    date: "February 24, 2026",
    time: "Afternoon (Auspicious Muhurtam)",
    description: "A joyful celebration where the bride is blessed with turmeric, flowers, laughter, music, and endless love from family.",
    image: galleryBride
  },
  {
    id: 3,
    title: "Haldi Ceremony",
    icon: "💛",
    date: "February 25, 2026",
    time: "Morning",
    description: "A vibrant traditional ritual symbolizing purity, happiness, health, and the beginning of a beautiful new chapter.",
    image: galleryGroom
  },
  {
    id: 4,
    title: "Mehendi Ceremony",
    icon: "🎨",
    date: "February 25, 2026",
    time: "Afternoon",
    description: "An evening filled with intricate henna designs, music, dance, colourful celebrations, and unforgettable memories.",
    image: galleryHenna
  },
  {
    id: 5,
    title: "Wedding Ceremony",
    icon: "💍",
    date: "February 27, 2026",
    time: "7:45 AM (Sumuhurtam)",
    description: "With the blessings of our families and the grace of the Almighty, we begin our lifelong journey together in the sacred bond of marriage.",
    image: galleryMangalsutra
  }
];

function InvitationPage() {
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // RSVP State
  const [rsvpData, setRsvpData] = useState({
    name: '',
    phone: '',
    guests: '1',
    attending: 'yes',
    message: ''
  });
  const [rsvpStatus, setRsvpStatus] = useState('idle'); // idle, submitting, success

  // Timeline Scroll Tracking
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Lightbox Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === -1) return;
      if (e.key === 'Escape') setLightboxIndex(-1);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // RSVP Submit Handler
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.phone) return;

    setRsvpStatus('submitting');
    // Mock API delay
    setTimeout(() => {
      setRsvpStatus('success');
    }, 1500);
  };

  // Countdown Date Setup
  const countdownDate = new Date("2026-02-27T07:45:00");

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="countdown-ended">
          The Sacred Muhurtam Has Commenced
        </span>
      );
    }
    return (
      <div className="countdown-display">
        <div className="countdown-col">
          <div className="countdown-box">
            <span className="countdown-val">{days}</span>
            <span className="countdown-lbl">DAYS</span>
          </div>
        </div>
        <div className="countdown-col">
          <div className="countdown-box">
            <span className="countdown-val">{hours}</span>
            <span className="countdown-lbl">HOURS</span>
          </div>
        </div>
        <div className="countdown-col">
          <div className="countdown-box">
            <span className="countdown-val">{minutes}</span>
            <span className="countdown-lbl">MINUTES</span>
          </div>
        </div>
        <div className="countdown-col">
          <div className="countdown-box">
            <span className="countdown-val">{seconds}</span>
            <span className="countdown-lbl">SECONDS</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="invitation-app">
      {/* Background Floating Elements */}
      <FloatingParticles />

      {/* SECTION 1: HERO SECTION */}
      <header className="hero-section" id="hero">
        <div 
          className="hero-background-image" 
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Soft Vignette and Translucent Ivory Overlay (60% opacity) */}
        <div className="hero-overlay-vignette" />
        <div className="hero-overlay" />
        
        {/* Mandala Watermark Behind Content */}
        <div className="hero-mandala-container">
          <img 
            src={mandalaImg} 
            alt="" 
            className="hero-mandala-watermark" 
            aria-hidden="true" 
          />
        </div>

        <div className="hero-content">
          {/* Top ornamental divider */}
          <div className="hero-top-ornament">
            <TopOrnament />
          </div>

          <motion.p 
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            WE ARE GETTING MARRIED
          </motion.p>

          <motion.h1 
            className="hero-couple-names"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Abhiram <span className="heart-separator">❤</span> Vishnupriya
          </motion.h1>

          <motion.p 
            className="hero-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            "Two Hearts. One Sacred Promise."
          </motion.p>

          {/* Luxury rounded pill */}
          <motion.div 
            className="hero-details-pill"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="pill-item">
              <FaCalendarAlt className="pill-icon" />
              <span>February 27, 2026</span>
            </div>
            <span className="pill-dot">•</span>
            <div className="pill-item">
              <FaClock className="pill-icon" />
              <span>7:45 AM</span>
            </div>
            <span className="pill-dot">•</span>
            <div className="pill-item">
              <FaMapMarkerAlt className="pill-icon" />
              <span>Visakhapatnam</span>
            </div>
          </motion.div>

          {/* Glassmorphism invitation card */}
          <motion.div 
            className="hero-invite-glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            <span className="glass-card-heart-icon">💛</span>
            <h3 className="glass-card-script-title">Happily Inviting You</h3>
            <p className="glass-card-body-text">
              Together with our families, we warmly invite you to celebrate our wedding.
            </p>
          </motion.div>

          {/* Animated Scroll Down Indicator */}
          <div className="scroll-indicator" aria-label="Scroll down">
            <a href="#gallery" className="scroll-arrow-link">
              <span className="scroll-arrow-text">SCROLL TO RELIVE OUR JOURNEY</span>
              <span className="scroll-mouse-icon">
                <span className="scroll-wheel"></span>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* SECTION 2: GALLERY */}
      <section className="section gallery-section" id="gallery">
        <div className="section-header">
          <GoldDivider />
          <h2 className="section-title">Auspicious Moments</h2>
          <p className="section-subtitle">A glimpse into our celebration of love and tradition</p>
        </div>

        <div className="gallery-masonry">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              className={`gallery-item gallery-item--${item.aspect} ${item.zoom ? 'gallery-item--zoom' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setLightboxIndex(index)}
            >
              <div className="gallery-img-wrapper">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy" 
                  className="gallery-img"
                />
                <div className="gallery-img-overlay">
                  <span className="gallery-img-title">{item.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: MUHURTAM INVITATION CARD */}
      <section className="section muhurtam-section" id="muhurtam">
        <motion.div 
          className="muhurtam-outer-card"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle gold corner ornaments */}
          <SubtleCorner position="top-left" />
          <SubtleCorner position="top-right" />
          <SubtleCorner position="bottom-left" />
          <SubtleCorner position="bottom-right" />

          <div className="muhurtam-inner-content">
            <div className="ganesha-container">
              <GaneshaIcon />
            </div>

            <h3 className="telugu-main-heading">శుభ ముహూర్తము</h3>
            
            <GoldDivider />

            <div className="telugu-text-block">
              <p className="telugu-role">శ్రీమతి లక్ష్మీ సౌభాగ్యవతి</p>
              <h4 className="telugu-name">విష్ణుప్రియ</h4>
              
              <div className="telugu-heart-divider">💛</div>
              
              <p className="telugu-role">చిరంజీవి</p>
              <h4 className="telugu-name">అభిరామ్ శర్మ</h4>
              
              <p className="telugu-action">వివాహ మహోత్సవమునకు</p>
              
              <p className="telugu-invitation-body">
                మీ కుటుంబ సమేతంగా విచ్చేసి<br />
                వధూవరులను ఆశీర్వదించగలరు.
              </p>
            </div>

            <GoldDivider />

            {/* Information Cards Grid */}
            <div className="muhurtam-details-grid">
              <div className="muhurtam-detail-item">
                <div className="muhurtam-detail-icon-circle">
                  <FaCalendarAlt />
                </div>
                <h5>DATE</h5>
                <p>Friday</p>
                <p className="bold-detail">Feb 27, 2026</p>
              </div>

              <div className="muhurtam-detail-item">
                <div className="muhurtam-detail-icon-circle">
                  <FaClock />
                </div>
                <h5>MUHURTAM</h5>
                <p>Morning</p>
                <p className="bold-detail">7:45 AM</p>
              </div>

              <div className="muhurtam-detail-item">
                <div className="muhurtam-detail-icon-circle">
                  <FaMapMarkerAlt />
                </div>
                <h5>VENUE</h5>
                <p>Varun Beach</p>
                <p className="bold-detail">Visakhapatnam</p>
              </div>
            </div>

            {/* Bottom Gold Divider */}
            <div className="muhurtam-bottom-divider">
              <GoldDivider />
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: WEDDING CELEBRATION TIMELINE */}
      <section className="section timeline-section" id="timeline" ref={timelineRef}>
        <div className="section-header">
          <GoldDivider />
          <h2 className="section-title">✨ Wedding Celebrations</h2>
          <p className="section-subtitle">"Every ritual marks the beginning of our forever."</p>
        </div>

        <div className="timeline-container">
          {/* Vertical Progress Line */}
          <motion.div 
            className="timeline-vertical-line"
            style={{ scaleY }}
          />

          <div className="timeline-events-wrapper">
            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={event.id} 
                  className={`timeline-event-row ${isEven ? 'row-left' : 'row-right'}`}
                >
                  {/* Card side */}
                  <motion.div 
                    className="timeline-card-wrapper"
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.7, type: 'spring', damping: 20 }}
                  >
                    <div className="timeline-event-card">
                      <div className="timeline-event-image-container">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          loading="lazy" 
                          className="timeline-event-image"
                        />
                        <div className="timeline-card-badge">
                          <span className="badge-icon">{event.icon}</span>
                          <span className="badge-text">{event.title}</span>
                        </div>
                      </div>

                      <div className="timeline-event-details">
                        <div className="timeline-date-time-row">
                          <span className="timeline-card-date">{event.date}</span>
                          <span className="timeline-card-time-divider">•</span>
                          <span className="timeline-card-time">{event.time}</span>
                        </div>
                        <p className="timeline-card-desc">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Dot column */}
                  <div className="timeline-dot-container">
                    <div className="timeline-marker-dot">
                      <span className="inner-dot"></span>
                    </div>
                  </div>

                  {/* Empty side for layout on desktop */}
                  <div className="timeline-empty-side"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: COUNTDOWN TIMER */}
      <section className="section countdown-section" id="countdown">
        {/* Mandala Watermark Background */}
        <div className="countdown-mandala-bg" aria-hidden="true">
          <img src={mandalaImg} alt="" className="mandala-watermark-spin" />
        </div>

        <div className="countdown-content-wrapper">
          <GoldDivider />
          <h2 className="countdown-heading">Countdown To Forever</h2>
          
          <Countdown 
            date={countdownDate} 
            renderer={countdownRenderer} 
          />

          <p className="countdown-footer-text">
            "We cannot wait to celebrate with you."
          </p>
          <GoldDivider />
        </div>
      </section>

      {/* SECTION 6: VENUE */}
      <section className="section venue-section" id="venue">
        <div className="section-header">
          <GoldDivider />
          <h2 className="section-title">The Wedding Venue</h2>
          <p className="section-subtitle">Join us as we take our vows by the ocean</p>
        </div>

        <div className="venue-split-layout">
          {/* Left: Venue Image Card */}
          <motion.div 
            className="venue-image-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={landingBg} 
              alt="Novotel Varun Beach Visakhapatnam" 
              loading="lazy" 
              className="venue-img"
            />
            <div className="venue-img-overlay-gold" />
          </motion.div>

          {/* Right: Venue Information Card */}
          <motion.div 
            className="venue-info-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="venue-info-header">
              <span className="venue-eyebrow">SUMUHURTAM VENUE</span>
              <h4>Novotel Varun Beach</h4>
              <p className="venue-address">
                Beach Road, Nowroji Road, Maharani Peta, Visakhapatnam, Andhra Pradesh 530003
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="google-map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.672905470732!2d83.3134375!3d17.7142499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943405786a347%3A0xc07a829ab9cf9b17!2sNovotel%20Visakhapatnam%20Varun%20Beach!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location of Novotel Varun Beach"
              ></iframe>
            </div>

            {/* Buttons Grid */}
            <div className="venue-buttons-grid">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=17.7142499,83.3134375" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="venue-btn btn-primary"
              >
                <MdDirections className="btn-icon" />
                <span>Navigate</span>
              </a>

              <a 
                href="https://maps.app.goo.gl/yJ9418tXf8qH4Q269" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="venue-btn btn-secondary"
              >
                <MdMap className="btn-icon" />
                <span>Open in Maps</span>
              </a>

              <a 
                href="tel:+918916682222" 
                className="venue-btn btn-secondary"
              >
                <FaPhoneAlt className="btn-icon" />
                <span>Call Venue</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: RSVP */}
      <section className="section rsvp-section" id="rsvp">
        <motion.div 
          className="rsvp-container-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="rsvp-card-decor">
            <span className="rsvp-flower-icon">✿</span>
          </div>

          <h2 className="rsvp-heading">Will You Join Us?</h2>
          <p className="rsvp-subheading">Kindly respond by February 15, 2026</p>
          <GoldDivider />

          {rsvpStatus !== 'success' ? (
            <form onSubmit={handleRsvpSubmit} className="rsvp-form">
              <div className="form-group-row">
                <div className="form-input-container">
                  <label htmlFor="rsvp-name">Full Name *</label>
                  <input 
                    type="text" 
                    id="rsvp-name" 
                    required
                    placeholder="Your beautiful name" 
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                  />
                </div>

                <div className="form-input-container">
                  <label htmlFor="rsvp-phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="rsvp-phone" 
                    required
                    placeholder="Ten digit mobile number" 
                    value={rsvpData.phone}
                    onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-input-container">
                  <label htmlFor="rsvp-guests">Number of Guests</label>
                  <select 
                    id="rsvp-guests"
                    value={rsvpData.guests}
                    onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ (Family)</option>
                  </select>
                </div>

                <div className="form-input-container">
                  <label>Will you attend? *</label>
                  <div className="rsvp-radio-options">
                    <label className="rsvp-radio-label">
                      <input 
                        type="radio" 
                        name="attending" 
                        value="yes"
                        checked={rsvpData.attending === 'yes'}
                        onChange={() => setRsvpData({ ...rsvpData, attending: 'yes' })}
                      />
                      <span>Joyfully Attending</span>
                    </label>

                    <label className="rsvp-radio-label">
                      <input 
                        type="radio" 
                        name="attending" 
                        value="no"
                        checked={rsvpData.attending === 'no'}
                        onChange={() => setRsvpData({ ...rsvpData, attending: 'no' })}
                      />
                      <span>Regretfully Declining</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-input-container">
                <label htmlFor="rsvp-message">Special Message / Warm Wishes</label>
                <textarea 
                  id="rsvp-message" 
                  rows="4" 
                  placeholder="Share a warm wish or special note..."
                  value={rsvpData.message}
                  onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="rsvp-submit-btn" 
                disabled={rsvpStatus === 'submitting'}
              >
                {rsvpStatus === 'submitting' ? 'Sending Blessings...' : 'Submit RSVP'}
              </button>
            </form>
          ) : (
            <motion.div 
              className="rsvp-success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="success-icon-anim">
                <FaCheckCircle />
              </div>
              <h3>Thank You!</h3>
              <p className="success-thank-msg">
                Your response has been registered with grace.
              </p>
              {rsvpData.attending === 'yes' ? (
                <p className="success-action-msg">
                  We look forward to celebrating this sacred union with you and your family at Visakhapatnam.
                </p>
              ) : (
                <p className="success-action-msg">
                  We will miss your presence, but we treasure your warm wishes and blessings from afar.
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* SECTION 8: BLESSINGS */}
      <section className="section blessings-section" id="blessings">
        <div className="blessings-quote-container">
          <span className="quote-mark quote-mark-start">“</span>
          <motion.blockquote 
            className="blessings-quote-text"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Two souls, one sacred promise. A lifetime of love begins here.
          </motion.blockquote>
          <span className="quote-mark quote-mark-end">”</span>
        </div>

        <div className="thank-you-block">
          <p className="thank-you-eyebrow">THANK YOU</p>
          <h3 className="thank-you-heading">We look forward to celebrating with you.</h3>
          <p className="family-blessing-names">With Love, The Families of Abhiram & Vishnupriya</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="luxury-footer">
        <div className="footer-gold-divider">
          <GoldDivider />
        </div>
        
        <div className="footer-content">
          <p className="footer-couple-names">Abhiram & Vishnupriya</p>
          <p className="footer-date">FEBRUARY 27, 2026</p>
          
          <div className="footer-made-with">
            Made with <FaHeart className="footer-heart-icon" /> for a lifetime of happiness
          </div>
          
          <p className="footer-copyright">
            © {new Date().getFullYear()} Abhiram & Vishnupriya. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* LIGHTBOX COMPONENT */}
      {lightboxIndex !== -1 && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(-1)}>
          <button 
            type="button" 
            className="lightbox-btn lightbox-close" 
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(-1); }}
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>

          <button 
            type="button" 
            className="lightbox-btn lightbox-prev" 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
            }}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={GALLERY_ITEMS[lightboxIndex].src} 
              alt={GALLERY_ITEMS[lightboxIndex].title} 
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <span>{GALLERY_ITEMS[lightboxIndex].title}</span>
              <span className="lightbox-counter">{lightboxIndex + 1} / {GALLERY_ITEMS.length}</span>
            </div>
          </div>

          <button 
            type="button" 
            className="lightbox-btn lightbox-next" 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
            }}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default InvitationPage;
