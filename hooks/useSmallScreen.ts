'use client';

import { useState, useEffect } from 'react';

export function useSmallScreen(maxWidth = 768) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== 'undefined' && window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(
        typeof window !== 'undefined' && window.innerWidth <= maxWidth
      );
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [maxWidth]);

  return isSmallScreen;
}
