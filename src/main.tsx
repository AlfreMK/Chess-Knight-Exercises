import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'
import { ThemeProvider } from '@/components/theme-provider/index.tsx'
import { NuqsAdapter } from 'nuqs/adapters/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </NuqsAdapter>
  </StrictMode>,
)
