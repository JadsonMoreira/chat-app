import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

document.documentElement.style.background = '#0f1117'
document.body.style.margin = '0'
document.body.style.background = '#0f1117'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>
      <App />
    </div>
  </StrictMode>,
)
