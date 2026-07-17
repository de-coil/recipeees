import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Ricette from './routes/Ricette.jsx'
import DettaglioRicetta from './routes/DettaglioRicetta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ricette" element={<Ricette />} />
        <Route path="/ricette/:id" element={<DettaglioRicetta />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
