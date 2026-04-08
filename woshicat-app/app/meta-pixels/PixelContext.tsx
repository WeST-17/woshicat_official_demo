'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FacebookQuery, addScriptDefault } from 'meta-pixel';
import { PIXEL_ID } from './pixel';

interface PixelContextType {
  consent: boolean | null | undefined,
  setConsent: React.Dispatch<React.SetStateAction<boolean | null | undefined>>,
  fbq: FacebookQuery | null,
  setFbq: React.Dispatch<React.SetStateAction<FacebookQuery | null>>,
  loaded: boolean,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  hideNotice: boolean,
  setHideNotice: React.Dispatch<React.SetStateAction<boolean>>
};

const PixelContext = createContext<PixelContextType | undefined>(undefined);

export const PixelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<boolean | null | undefined>();
  const [fbq, setFbq] = useState<FacebookQuery | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [hideNotice, setHideNotice] = useState<boolean>(false);
  const path = usePathname();
  const currentDate = Date.now().toString();

  useEffect(() => {
    if (!loaded) return;
    
    const previousDate: number = parseInt(localStorage.getItem('DatePermissions')!);
    if ((previousDate / 864000) >= 10) {
      localStorage.removeItem('DatePermissions');
      setConsent(null);
      setHideNotice(false);
    };

    return () => { console.log('checked date, cleanup'); };
  },[path, loaded]);
  
  useEffect(() => {
    const getConsentHeader = localStorage.getItem('consent');
    if (getConsentHeader === null) {
      setConsent(null);
      return;
    };
    setConsent(getConsentHeader === 'grant');
    console.log(localStorage.getItem('consent'));
    return () => { console.log('cleanup'); };
  }, [path]);

  useEffect(() => {
    if (consent === null) return;
    if (consent === false) {
        console.log('user rejected analytics tracking.', currentDate);
        setFbq(null);
        localStorage.setItem('DatePermissions', currentDate);
        return () => { console.log('cleanup'); };
    };
    
    if (consent === true) {
      localStorage.setItem('DatePermissions', currentDate);
      const newFbq = addScriptDefault();
      newFbq('init', `${PIXEL_ID}`);

      setFbq(newFbq);
    } 
    

    return () => { console.log('cleanup'); };
      
  }, [consent]);

  return (
    <PixelContext.Provider value={{ consent, setConsent, fbq, setFbq, loaded, setLoaded, hideNotice, setHideNotice }}>
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