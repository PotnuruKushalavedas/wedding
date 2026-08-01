import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaChevronRight,
  FaChevronLeft,
  FaTimes
} from 'react-icons/fa';
import { MdDirections } from 'react-icons/md';

// Styles
import '../styles/InvitationPage.css';

// Components
import HeroSection from '../components/HeroSection';

// Assets
import heroCouple1 from '../assets/hero_couple1.png';
import lordGaneshImg from '../assets/lordganesh.png';
// Timeline Ceremony Images
import pelliRataImg from '../assets/pellirata.png';
import pelliKuturuImg from '../assets/pellikuturu.png';
import haldiImg from '../assets/haldi.png';
import mehendiImg from '../assets/mehendi.png';
import weddingCeremonyImg from '../assets/weddingceremony.png';
import mandalaImg from '../assets/mandala.png';

// Auspicious Moments Gallery
import engagementImg from '../assets/engagement.png';
import pic2Img from '../assets/pic2.png';
import pic3Img from '../assets/pic3.png';
import pic4Img from '../assets/pic4.png';


// Decorative Custom SVG Components

const GoldDivider = () => (
  <div className="gold-divider-container" aria-hidden="true">
    <span className="gold-divider-line"></span>
    <span className="gold-divider-diamond">🤍</span>
    <span className="gold-divider-line"></span>
  </div>
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

const LotusDivider = () => (
  <div className="lotus-divider-container" aria-hidden="true">
    <span className="lotus-divider-line"></span>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="" className="lotus-svg">
      <path d="M12 4C10 9 6 12 6 15C6 18.3 8.7 20 12 20C15.3 20 18 18.3 18 15C18 12 14 9 12 4Z" stroke="#C8A96A" strokeWidth="1.2" />
      <path d="M12 7C11 11 9 13 9 16C9 17.7 10.3 19 12 19C13.7 19 15 17.7 15 16C15 13 13 11 12 7Z" stroke="#C8A96A" strokeWidth="1" />
      <path d="M12 11C12.5 13.5 13.5 15 13.5 16C13.5 16.8 12.8 17.5 12 17.5C11.2 17.5 10.5 16.8 10.5 16C10.5 15 11.5 13.5 12 11Z" fill="#C8A96A" />
    </svg>
    <span className="lotus-divider-line"></span>
  </div>
);

const WEDDING_TARGET_DATE = new Date('2026-08-27T10:30:00+05:30');

const MUHURTAM_COPY = {
  telugu: {
    heading: 'శుభ ముహూర్తము',
    subheading: 'శ్రీ మహాగణపతి అనుగ్రహంతో',
    brideLabel: 'వధువు',
    brideName: 'కానూరు విష్ణుప్రియ',
    brideParents: [
      'శ్రీ కానూరు గౌరీశ్వరరావు గారు',
      '&',
      'శ్రీమతి కానూరు విజయ గారు',
      'సుపుత్రిక'
    ],
    groomLabel: 'వరుడు',
    groomName: 'ముదునూరు అభిరామ్ శర్మ',
    groomParents: [
      'శ్రీ ముదునూరు సుధాకర్ గారు',
      '&',
      'శ్రీమతి ముదునూరు పద్మ గారు',
      'సుపుత్రుడు'
    ],
    invitation: [
      'మా తల్లిదండ్రులు, కుటుంబ సభ్యులు మరియు పెద్దల ఆశీస్సులతో,',
      'మీరు మీ కుటుంబ సమేతంగా విచ్చేసి,',
      'మా వివాహ మహోత్సవాన్ని మీ సన్నిధితో మరింత పావనంగా చేసి,',
      'వధూవరులను ఆశీర్వదించి,',
      'ఈ శుభ సందర్భాన్ని మీ రాకతో మరింత ఆనందమయం చేయవలసిందిగా',
      'మనఃపూర్వకంగా ఆహ్వానిస్తున్నాము.'
    ]
  },
  english: {
    heading: 'SHUBHA MUHURTAM',
    subheading: 'With the Divine Blessings of Lord Ganesha',
    brideLabel: 'BRIDE',
    brideName: 'Kanuru VishnuPriya',
    brideParents: [
      'Beloved Daughter of',
      'Sri Kanuru Gowreeswarao Rao',
      '&',
      'Smt Kanuru Vijaya'
    ],
    groomLabel: 'GROOM',
    groomName: 'Mudunuru Abhiram Sarma',
    groomParents: [
      'Beloved Son of',
      'Sri Mudunuru Sudhakar',
      '&',
      'Smt Mudunuru Padma'
    ],
    invitation: [
      'With the blessings of our parents, elders, and the Almighty,',
      'we warmly invite you and your family to grace our wedding ceremony,',
      'making our special day even more memorable with your presence, love, and blessings.'
    ]
  }
};


const getTimeLeft = (targetDate) => {
  const distance = targetDate.getTime() - Date.now();

  if (distance <= 0) {
    return { completed: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    completed: false,
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
};

const LuxuryCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    let intervalId;

    const tick = () => {
      const current = getTimeLeft(targetDate);
      setTimeLeft(current);
      if (current.completed && intervalId) {
        window.clearInterval(intervalId);
      }
    };

    tick();
    intervalId = window.setInterval(tick, 1000);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [targetDate]);

  if (timeLeft.completed) {
    return (
      <motion.div
        className="countdown-ended"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span>❤️ Our Beautiful Day Has Arrived ❤️</span>
      </motion.div>
    );
  }

  const countdownUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="countdown-display">
      {countdownUnits.map((unit) => (
        <div className="countdown-col" key={unit.label}>
          <div className="countdown-box">
            <motion.span
              key={unit.label}
              className="countdown-val"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
            <span className="countdown-lbl">{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Gallery Images Configuration — Auspicious Moments
const GALLERY_ITEMS = [
  {
    id: 1,
    src: engagementImg,
    title: "Auspicious Engagement",
    aspect: "portrait",
    objectPosition: "center 15%"
  },
  {
    id: 2,
    src: pic2Img,
    title: "Blessed Moments",
    aspect: "landscape",
    objectPosition: "center 20%"
  },
  {
    id: 3,
    src: pic3Img,
    title: "Sacred Celebrations",
    aspect: "portrait",
    objectPosition: "center 15%"
  },
  {
    id: 4,
    src: pic4Img,
    title: "Together Forever",
    aspect: "portrait",
    objectPosition: "center 15%"
  }
];

// Timeline Events Configuration
const TIMELINE_EVENTS = [
  {
    id: 1,
    title: "Pelli Rata",
    icon: "🌼",
    date: "August 24, 2026",
    time: "Morning",
    description: "The ceremonial beginning of our wedding celebrations, where the home is beautifully adorned with traditional decorations, sacred rituals, and the joyful blessings of family, marking the start of our wedding festivities.",
    image: pelliRataImg,
    objectPosition: "center 15%"  // tall portrait — show top half where people are
  },
  {
    id: 2,
    title: "Pelli Kuturu",
    icon: "🌸",
    date: "August 24, 2026",
    time: "Afternoon",
    description: "A beautiful pre-wedding ceremony celebrating the bride with turmeric, fragrant oils, floral adornments, heartfelt blessings, and joyful traditions, marking her graceful transition into a new chapter of life.",
    image: pelliKuturuImg,
    objectPosition: "center 20%"  // near-square — bias slightly upward
  },
  {
    id: 3,
    title: "Haldi Ceremony",
    icon: "💛",
    date: "August 25, 2026",
    time: "Morning",
    description: "A vibrant ceremony where the bride and groom are lovingly adorned with turmeric paste by family and friends, symbolizing purity, prosperity, happiness, and blessings for a joyful married life.",
    image: haldiImg,
    objectPosition: "center 20%"  // tall portrait — show upper portion
  },
  {
    id: 4,
    title: "Mehendi Ceremony",
    icon: "🎨",
    date: "August 25, 2026",
    time: "Afternoon",
    description: "An evening filled with intricate henna designs, music, dance, colourful celebrations, and unforgettable memories.",
    image: mehendiImg,
    objectPosition: "center center" // slight landscape — centered is fine
  },
  {
    id: 5,
    title: "Wedding Ceremony",
    icon: "💍",
    date: "August 27, 2026",
    time: "7:45 AM (Sumuhurtam)",
    description: "A divine celebration where tradition meets love, as we are united through sacred rituals, timeless customs, and the blessings of our families to begin our forever together.",
    image: weddingCeremonyImg,
    objectPosition: "center 10%"  // very tall portrait (0.23 ratio) — show top area
  }
];

function InvitationPage() {
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [muhurtamLanguage, setMuhurtamLanguage] = useState('telugu');


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



  return (
    <div className="invitation-app">
      <HeroSection />

      {/* SECTION 2: GALLERY */}
      <section className="section gallery-section" id="gallery">
        <div className="section-header">
          <GoldDivider />
          <h2 className="section-title">Auspicious Moments</h2>
          <p className="section-subtitle">A glimpse into our celebration of love and tradition</p>
        </div>

        <div className="gallery-masonry">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.button
              type="button"
              key={item.id}
              className={`gallery-item gallery-item--${item.aspect} ${item.zoom ? 'gallery-item--zoom' : ''}`}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View ${item.title}`}
            >
              <div className="gallery-img-wrapper">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="gallery-img"
                  style={{ objectPosition: item.objectPosition || 'center 15%' }}
                />
                <div className="gallery-img-overlay">
                  <span className="gallery-img-title">{item.title}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* SECTION 3: MUHURTAM INVITATION CARD */}
      <section className="section muhurtam-section" id="muhurtam">
        <motion.div
          className="section-header muhurtam-section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <GoldDivider />
          <h2 className="section-title">Shubha Muhurtam</h2>
          <p className="section-subtitle">A sacred invitation to celebrate our union and begin our forever together.</p>
        </motion.div>

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
              <img src={lordGaneshImg} alt="Lord Ganesha" className="muhurtam-ganesha-img" />
            </div>

            <div className="muhurtam-couple-photo-container">
              <img src={heroCouple1} alt="Vishnupriya and Abhiram Sarma" className="muhurtam-couple-photo" />
            </div>

            <LotusDivider />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={muhurtamLanguage}
                className="muhurtam-copy-shell"
                initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(6px)', y: -12 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                {(() => {
                  const copy = MUHURTAM_COPY[muhurtamLanguage];
                  return (
                    <>
                      <motion.h3 className="muhurtam-copy__heading" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .55 }}>{copy.heading}</motion.h3>
                      <motion.p className="muhurtam-copy__subheading" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16, duration: .55 }}>{copy.subheading}</motion.p>
                      <motion.div className="muhurtam-person muhurtam-person--bride" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .55 }}>
                        <span className="muhurtam-person__label">{copy.brideLabel}</span>
                        <h4>{copy.brideName}</h4>
                        <p>{copy.brideParents.map((line, index) => <span key={`${line}-${index}`}>{line}{index < copy.brideParents.length - 1 && <br />}</span>)}</p>
                      </motion.div>
                      <motion.div className="muhurtam-language-divider" aria-hidden="true" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .32, duration: .5 }}><span>{'\u2756'}</span><span>{'\u2756'}</span><span>{'\u2756'}</span></motion.div>
                      <motion.div className="muhurtam-person muhurtam-person--groom" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .55 }}>
                        <span className="muhurtam-person__label">{copy.groomLabel}</span>
                        <h4>{copy.groomName}</h4>
                        <p>{copy.groomParents.map((line, index) => <span key={`${line}-${index}`}>{line}{index < copy.groomParents.length - 1 && <br />}</span>)}</p>
                      </motion.div>
                      <motion.p className="muhurtam-copy__invitation" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .6 }}>{copy.invitation.map((line, index) => <span className={index === copy.invitation.length - 1 ? 'muhurtam-copy__invitation-emphasis' : ''} key={`${line}-${index}`}>{line}</span>)}</motion.p>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
            {/* Bottom Gold Divider */}
            <div className="muhurtam-bottom-divider">
              <GoldDivider />
            </div>
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="muhurtam-language-toggle"
          onClick={() => setMuhurtamLanguage((current) => current === 'telugu' ? 'english' : 'telugu')}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: .98 }}
          aria-label={muhurtamLanguage === 'telugu' ? 'Switch to English' : 'Switch to Telugu'}
        >
          <span aria-hidden="true">{'\uD83C\uDF10'}</span>
          {muhurtamLanguage === 'telugu' ? 'English' : '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41'}
        </motion.button>
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
                          style={{ objectPosition: event.objectPosition || 'center 20%' }}
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

          <LuxuryCountdown targetDate={WEDDING_TARGET_DATE} />

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
          <h2 className="section-title">The Celebration Venue</h2>
          <p className="section-subtitle">A refined setting for our cherished moment with family and loved ones.</p>
        </div>

        <div className="venue-split-layout">
          <motion.div
            className="venue-info-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="venue-info-header">
              <span className="venue-eyebrow">VENUE</span>
              <h4>S Convention and TSR Grand Hotel</h4>
              <p className="venue-address">
                Lanka Veedhi Area, Vizianagaram
              </p>
            </div>

            <div className="venue-detail-stack" aria-label="Venue details">
              <div className="venue-detail-item">
                <FaCalendarAlt className="venue-detail-icon" />
                <div className="venue-detail-text">
                  <span className="venue-detail-label">Date</span>
                  <span className="venue-detail-value">27 August 2026</span>
                </div>
              </div>
              <div className="venue-detail-item">
                <FaClock className="venue-detail-icon" />
                <div className="venue-detail-text">
                  <span className="venue-detail-label">Time</span>
                  <span className="venue-detail-value">10:30 AM IST</span>
                </div>
              </div>
            </div>

            <motion.div
              className="google-map-container"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d569.4711548295943!2d83.41144116896211!3d18.10885277579859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3be559bbda8407%3A0xd1f498ae34d6b8f7!2sS%20Convention%20Halls%20%26%20Hotel!5e0!3m2!1sen!2sin!4v1785518583288!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location of S Convention and TSR Grand Hotel"
              ></iframe>
            </motion.div>

            <div className="venue-buttons-grid">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=S+Convention+Halls+and+Hotel,+Vizianagaram"
                target="_blank"
                rel="noopener noreferrer"
                className="venue-btn btn-primary"
                aria-label="Get directions to the venue"
              >
                <MdDirections className="btn-icon" />
                <span>Get Directions</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="luxury-footer">
        <div className="footer-content">
          <div className="footer-monogram">
            V <span className="footer-ampersand">&</span> A
          </div>
          <p className="footer-thank-you">
            Thank you for being a part of our beautiful journey.
          </p>

          <div className="footer-divider-thin"></div>

          <p className="footer-copyright">©{new Date().getFullYear()} • Vishnupriya & Abhiram Sarma WEDDING CELEBRATION • Crafted with Love by SANVE • Contact: 9391224230</p>
        </div>
      </footer>

      {/* LIGHTBOX COMPONENT */}
      {
        lightboxIndex !== -1 && (
          <div className="lightbox-overlay" onClick={() => setLightboxIndex(-1)} role="dialog" aria-modal="true" aria-label="Photo gallery">
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
        )
      }
    </div>
  );
}

export default InvitationPage;


