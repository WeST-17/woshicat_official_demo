'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DarkModeType {
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
};

const DarkModeContext = createContext<DarkModeType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const userColorPref = () => {
    if (!window) return;
    console.log(window.matchMedia('(prefers-color-scheme: dark)'));
    return window.matchMedia('(prefers-color-scheme: dark)');
  };

  useEffect(() => {
    const userDisplay = localStorage.getItem('dark-mode');
    
    if (userDisplay === 'true' && userColorPref()) {
        setDarkMode(true);
    } 

    return () => {};

  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const DarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('DarkMode must be used within a DarkModeProvider');
  }
  return context;
};