import { useEffect, useState } from "react";
import landingBackground from "../assets/landing-page.png";
import mandala from "../assets/mandala.png";
import "../styles/LandingCard.css";

function Mandala({ visible }) {
  return (
    <div
      className={`mandala ${visible ? "mandala--visible" : ""}`}
      aria-hidden="true"
    >
      <img src={mandala} alt="" />
    </div>
  );
}

function InvitationContent() {
  return (
    <>
      <p className="invitation-card__blessing">{'ఓం నమో వెంకటేశాయ'}</p>
      <div className="invitation-card__initials" aria-label="V and A">
        <span className="initial">V</span>
        <span className="initial initial--ampersand">&amp;</span>
        <span className="initial">A</span>
      </div>
      <p className="invitation-card__line">You are cordially invited to the</p>
      <h1 className="invitation-card__title">Wedding</h1>
      <h2 className="invitation-card__subtitle">Celebration</h2>
    </>
  );
}

function WaxSeal({ onClick, opening }) {
  return (
    <button
      className={`wax-seal ${opening ? "wax-seal--opening" : ""
        }`}
      onClick={onClick}
      aria-label="Open Invitation"
    >
      <span className="wax-seal__label">
        VA
      </span>

      <span className="wax-seal__action">
        OPEN
      </span>
    </button>
  );
}

function LandingPage({ onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [showMandala, setShowMandala] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      setShowMandala(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenClick = () => {
    if (opening) return;
    setOpening(true);
    if (onOpen) onOpen();
  };

  return (
    <main
      className={`landing-page ${loaded ? "landing-page--loaded" : ""
        } ${opening ? "landing-page--opening" : ""
        }`}
    >
      <section className="landing-page__stage">
        <article
          className={`invitation-card ${opening ? "invitation-card--opening" : ""
            }`}
          style={{
            backgroundImage: `url(${landingBackground})`,
          }}
        >
          <div className="invitation-card__overlay" />

          <Mandala visible={showMandala} />

          <div className="invitation-content">
            <InvitationContent />
          </div>

          <WaxSeal onClick={handleOpenClick} opening={opening} />
        </article>
      </section>
    </main>
  );
}
export default LandingPage;