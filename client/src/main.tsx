import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";

// import Search from './Components/Search.tsx'
import './index.css'
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { TranslatorProvider } from './contexts/TranslatorContext.tsx';
// Import something here
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
 <StrictMode>
    <BrowserRouter>
      <TranslatorProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </TranslatorProvider>
    </BrowserRouter>
  </StrictMode>
)
