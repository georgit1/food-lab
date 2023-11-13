'use client';

import { useState, useEffect } from 'react';

export function useSmallScreen(maxWidth = 768) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= maxWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [maxWidth]);

  return isSmallScreen;
}
