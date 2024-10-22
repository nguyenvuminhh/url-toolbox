import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles' 
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme } from '@mui/material'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <Router>
        <App />
      </Router>
    </QueryClientProvider>

  </StrictMode>
)
