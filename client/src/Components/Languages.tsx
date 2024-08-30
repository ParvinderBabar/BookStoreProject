// src/components/Languages.tsx
import React, { useContext } from 'react';
import { TranslatorContext } from '../contexts/TranslatorContext';

function Languages() {
  const context = useContext(TranslatorContext);

  if (!context) {
    // Handle the case where context is undefined, possibly throw an error or display a message
    throw new Error('Languages component must be used within a TranslatorProvider');
  }

  const { setLanguage } = context;

  return (
    <>
      <button type="button" className="btn btn-link btn-sm" onClick={() => setLanguage('en')}>
        English
      </button>
      |
      <button type="button" className="btn btn-link btn-sm" onClick={() => setLanguage('es')}>
        Español
      </button>
    </>
  );
}

export default Languages;
