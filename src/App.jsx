import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NewyearPage from './pages/NewyearPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/year" element={<NewyearPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
