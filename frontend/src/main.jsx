import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles' 
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme } from '@mui/material'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Router>
      <App />
    </Router>

  </StrictMode>
)
