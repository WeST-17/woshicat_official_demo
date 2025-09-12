'use client';
import React, { createContext, useContext, useState } from 'react';

interface ToggleContextType {
    smoothScroll: boolean,
    setSmoothScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const ToggleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [smoothScroll, setSmoothScroll] = useState<boolean>(false);

    return (
    <ToggleContext.Provider value={{ smoothScroll, setSmoothScroll }}>
      {children}
    </ToggleContext.Provider>
  );
}

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};