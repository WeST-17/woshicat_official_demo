'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PixelContextType {
  consent: string | null | undefined,
  setConsent: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  hideNotice: boolean,
  setHideNotice: React.Dispatch<React.SetStateAction<boolean>>
};

const PixelContext = createContext<PixelContextType | undefined>(undefined);

export const PixelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<string | null | undefined>();
  const [hideNotice, setHideNotice] = useState<boolean>(true);
  const path = usePathname();
  const currentDate = Date.now().toString();

  useEffect(() => {
    const previousDate = (): boolean | null => {
        return parseInt(localStorage.getItem('DatePermissions')!) / 864000 >= 10 || null;
    };

    if (previousDate()) {
      localStorage.removeItem('DatePermissions');
      setConsent(null);
      setHideNotice(false);
    };

    return () => { console.log('checked date, cleanup'); };
  },[path]);
  
  useEffect(() => {
    const getConsentHeader = localStorage.getItem('consent');
    if (getConsentHeader === null) {
      setConsent(null);
      return;
    };
    setConsent(getConsentHeader);
    console.log(localStorage.getItem('consent'));
    return () => { console.log('cleanup'); };
  }, [path]);

  useEffect(() => {
    if (consent === null || consent === undefined) {
        setHideNotice(false);
        return () => { console.log('cleanup'); };
    };

    if (consent === 'revoke') {
        console.log('user rejected analytics tracking.', currentDate);
        localStorage.setItem('DatePermissions', currentDate);
        setHideNotice(true);
    } else {
        const pastDateConsent = parseInt(localStorage.getItem('DatePermissions')!);
        const previousDate = (): boolean | null => {
            return pastDateConsent / 86400000 >= 30;
        };

        if (previousDate()) {
            localStorage.setItem('DatePermissions', currentDate);
        };
    
        setHideNotice(true);
    };

    return () => { console.log('cleanup'); };
      
  }, [consent]);

  return (
    <PixelContext.Provider value={{ consent, setConsent,hideNotice, setHideNotice }}>
      {children}
    </PixelContext.Provider>
  );
}

export const useMetaPixel = () => {
  const context = useContext(PixelContext);
  if (!context) {
    throw new Error('useMetaPixel must be used within a PixelProvider');
  }
  return context;
};