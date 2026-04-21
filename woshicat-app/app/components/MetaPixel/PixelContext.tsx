'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PixelContextType {
  consent: string | null | undefined,
  setConsent: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  hideNotice: boolean,
  setHideNotice: React.Dispatch<React.SetStateAction<boolean>>,
  pixelActive: boolean,
  setPixelActive: React.Dispatch<React.SetStateAction<boolean>>,
  checkoutClick: number,
  setCheckoutClick: React.Dispatch<React.SetStateAction<number>>
};

const PixelContext = createContext<PixelContextType | undefined>(undefined);

export const PixelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<string | null | undefined>(null);
  const [hideNotice, setHideNotice] = useState<boolean>(true);
  const [pixelActive, setPixelActive] = useState<boolean>(false);
  const [checkoutClick, setCheckoutClick] = useState<number>(0);
  const path = usePathname();

  useEffect(() => {
    const currentDate = Date.now();
    const previousDate = (): boolean | null => {
        return ((currentDate - parseInt(localStorage.getItem('DatePermissions')!)) / 86400000) > 10 || null;
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
    if (getConsentHeader === null || '') {
      setConsent(null);
      return;
    };
    setConsent(getConsentHeader);
    console.log(localStorage.getItem('consent'));
    return () => { console.log('cleanup'); };
  }, [path]);

  useEffect(() => {
    const currentDate = Date.now();
    if (consent === null || consent === '') {
        setHideNotice(false);
        return () => { console.log('cleanup'); };
    };

    if (consent === 'revoke') {
        console.log('user rejected analytics tracking.', currentDate);
        if (localStorage.getItem('DatePermissions') === null || '') { 
          localStorage.setItem('DatePermissions', currentDate.toString());
        };
        setHideNotice(true);
    } else {
        const pastDateConsent = parseInt(localStorage.getItem('DatePermissions')!);
        const previousDate = (): boolean | null => {
            return ((currentDate - pastDateConsent)) / 86400000 >= 10;
        };

        if (previousDate()) {
            localStorage.setItem('DatePermissions', currentDate.toString());
        };
    
        setHideNotice(true);
    };

    return () => { console.log('cleanup'); };
      
  }, [consent]);

  return (
    <PixelContext.Provider value={{ consent, setConsent,hideNotice, setHideNotice, pixelActive, setPixelActive, checkoutClick, setCheckoutClick }}>
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