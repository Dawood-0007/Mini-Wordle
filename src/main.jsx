import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import MainGame from './components/MainGame.jsx';
import Learn from './components/Learn.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game" element={<MainGame />} />
      <Route path="/learn" element={<Learn />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
