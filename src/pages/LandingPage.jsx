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
      <p className="invitation-card__blessing">
        ఓం నమో వెంకటేశాయ
      </p>

      <div
        className="invitation-card__initials"
        aria-label="Bride and Groom Initials"
      >
        <span className="initial">V</span>

        <span className="initial initial--ampersand">
          &
        </span>

        <span className="initial">A</span>
      </div>

      <p className="invitation-card__line">
        YOU ARE CORDIALLY INVITED TO THE
      </p>

      <h1 className="invitation-card__title">
        MARRIAGE 
      </h1>

      <h2 className="invitation-card__subtitle">
        CEREMONY
      </h2>
    </>
  );
}

function WaxSeal() {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;

    setOpening(true);
  };

  return (
    <button
      className={`wax-seal ${
        opening ? "wax-seal--opening" : ""
      }`}
      onClick={handleClick}
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

function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  const [showMandala, setShowMandala] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      setShowMandala(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`landing-page ${
        loaded ? "landing-page--loaded" : ""
      }`}
    >
      <section className="landing-page__stage">
        <article
          className="invitation-card"
          style={{
            backgroundImage: `url(${landingBackground})`,
          }}
        >
          <div className="invitation-card__overlay" />

          <Mandala visible={showMandala} />

          <div className="invitation-content">
            <InvitationContent />
          </div>

          <WaxSeal />
        </article>
      </section>
    </main>
  );
}
export default LandingPage;