import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BrowserGate from './components/BrowserGate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserGate>
      <App />
    </BrowserGate>
  </StrictMode>,
)
