'use client';
import React, { useEffect, useRef } from 'react';

interface FadeInImageProps {
    children: React.ReactNode;
  }

const FadeInImage: React.FC<FadeInImageProps> = ({ children }) => {
  const fadeImgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fadeImgContainer = fadeImgRef.current;

    if (!fadeImgContainer) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-imgs');
          observer.unobserve(entry.target);  // Stop observing once the animation is triggered
        }
      });
    }, { threshold: 0.1 });

    observer.observe(fadeImgContainer);

    return () => {
      // Cleanup observer on component unmount
      if (fadeImgContainer) observer.unobserve(fadeImgContainer);
    };
  }, []);

  return (
    <div ref={fadeImgRef} className="fade-img-container w-full flex justify-center items-center">
        {children}
    </div>
  );
};

export default FadeInImage;
