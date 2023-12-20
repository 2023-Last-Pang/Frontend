import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GalleryTest from './pages/GalleryTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<GalleryTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
