import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WaxSeal() {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    window.setTimeout(() => {
      navigate('/invitation');
    }, 1500);
  };

  return (
    <button
      type="button"
      className={`wax-seal ${isOpening ? 'wax-seal--opening' : ''}`}
      onClick={handleClick}
      aria-label="Open the invitation"
    >
      <span className="wax-seal__label">VA</span>
      <span className="wax-seal__action">Open</span>
    </button>
  );
}

export default WaxSeal;
