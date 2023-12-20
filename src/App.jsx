import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NewyearPage from './pages/NewyearPage';
import ClockTestPage from './pages/ClockTestPage';
import './styles/custom.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/year" element={<NewyearPage />} />
        <Route path="/clock" element={<ClockTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
