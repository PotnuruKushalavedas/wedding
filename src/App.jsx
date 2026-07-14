import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InvitationPage from './pages/InvitationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/invitation" element={<InvitationPage />} />
    </Routes>
  );
}

export default App;
