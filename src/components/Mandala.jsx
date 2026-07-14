import { useEffect, useState } from 'react';
import mandala from '../assets/mandala.png';

function Mandala() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 300);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`mandala ${isVisible ? 'mandala--visible' : ''}`}
      aria-hidden="true"
    >
      <img src={mandala} alt="" />
    </div>
  );
}

export default Mandala;
