import { useEffect, useState } from 'react';
import Mandala from '../components/Mandala';
import WaxSeal from '../components/WaxSeal';
import InvitationContent from '../components/InvitationContent';
import landingBackground from '../assets/landing page .jpeg';
import '../styles/LandingPage.css';

function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoaded(true), 120);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className={`landing-page ${isLoaded ? 'landing-page--loaded' : ''}`}>
      <section className="landing-page__stage">
        <div
          className="invitation-card"
          style={{ backgroundImage: `url(${landingBackground})` }}
        >
          <div className="invitation-card__overlay" />
          <Mandala />
          <InvitationContent />
          <WaxSeal />
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
