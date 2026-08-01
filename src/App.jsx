import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import InvitationPage from './pages/InvitationPage';
import { AudioProvider, useAudio } from './context/AudioContext';
import MusicToggle from './components/MusicToggle';
import FloatingDecorations from './components/FloatingDecorations';

function MainContent() {
  const [isOpened, setIsOpened] = useState(false);
  const { openInvitationAndPlay } = useAudio();

  const handleOpenInvitation = () => {
    openInvitationAndPlay();
    setIsOpened(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ width: '100%', height: '100%' }}
          >
            <LandingPage onOpen={handleOpenInvitation} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ width: '100%', height: '100%' }}
          >
            <InvitationPage />
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingDecorations active={isOpened} />\n      <MusicToggle />
    </>
  );
}

function App() {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  );
}

export default App;


