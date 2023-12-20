import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ClockTestPage from './pages/ClockTestPage';
import './styles/custom.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/clock" element={<ClockTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
