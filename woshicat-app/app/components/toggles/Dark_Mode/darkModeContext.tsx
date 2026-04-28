'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DarkModeType {
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
};

const DarkModeContext = createContext<DarkModeType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const userDisplay = localStorage.getItem('dark-mode');
    if (userDisplay === 'true') {
        setDarkMode(true);
    } 

    return () => {};

  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div>
      {children}
      </div>
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