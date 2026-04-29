'use client';
import React, { createContext, useContext, useState, useEffect, SetStateAction } from 'react';

interface ProductPagesType {
    images: [
        {
            url: string,
            altText: string
        }
    ] | null,
    setImages: React.Dispatch<SetStateAction<[{ url: string, altText: string }] | null>>,
    showImages: boolean,
    setShowImages: React.Dispatch<SetStateAction<boolean>>,
    index: number,
    setIndex: React.Dispatch<SetStateAction<number>>
};

const ProductPagesContext = createContext<ProductPagesType | undefined>(undefined);

export const ProductPagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<[{ url: string, altText: string }] | null>(null);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  return (
    <ProductPagesContext.Provider value={{ images, setImages, showImages, setShowImages, index, setIndex }}>
      {children}
    </ProductPagesContext.Provider>
  );
}

export const useProductPages = () => {
  const context = useContext(ProductPagesContext);
  if (!context) {
    throw new Error('DarkMode must be used within a ProductPagesProvider');
  }
  return context;
};