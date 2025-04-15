import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { FavoritesProvider } from './data/FavoritesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </StrictMode>,
)
