import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import InvitationPage from './pages/InvitationPage';

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isOpened ? (
        <motion.div
          key="landing"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ width: '100%', height: '100%' }}
        >
          <LandingPage onOpen={() => setIsOpened(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="invitation"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ width: '100%', height: '100%' }}
        >
          <InvitationPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
