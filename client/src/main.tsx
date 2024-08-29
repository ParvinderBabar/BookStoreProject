import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import Search from './Components/Search.tsx'
import './index.css'
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
// Import something here
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      
      <App />
</QueryClientProvider>  </StrictMode>,
)
