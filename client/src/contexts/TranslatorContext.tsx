// src/contexts/TranslatorContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface TranslatorContextType {
  language: string;
  setLanguage: (language: string) => void;
}

export const TranslatorContext = createContext<TranslatorContextType | undefined>(undefined);

interface TranslatorProviderProps {
  children: ReactNode;
}

export const TranslatorProvider: React.FC<TranslatorProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  return (
    <TranslatorContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslatorContext.Provider>
  );
};
