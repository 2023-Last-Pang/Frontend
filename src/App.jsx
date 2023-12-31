import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GalleryPage from './pages/GalleryPage';
import NewyearPage from './pages/NewyearPage';
import ClockTestPage from './pages/ClockTestPage';
import FireworksPage from './pages/FireworksPage';
import './styles/custom.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/year" element={<NewyearPage />} />
        <Route path="/fire" element={<FireworksPage />} />
        <Route path="/clock" element={<ClockTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
