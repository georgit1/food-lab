'use client';

// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export function RouteChangeListener() {
//   const pathname = usePathname();

//   useEffect(() => {
//     console.log(`Route changed to: ${pathname}`);
//     window.confirm('Are you yure');
//   }, [pathname]);

//   return <></>;
// }
// TODO

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function RouteChangeListener() {
  const pathname = usePathname();
  const [originalFoodId, setOriginalFoodId] = useState('');

  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);
    setOriginalFoodId(extractFoodIdFromPathname(pathname));
  }, [pathname]);

  useEffect(() => {
    // Open the dialog when navigating away from /manage/[foodId]
    const currentFoodId = extractFoodIdFromPathname(pathname);
    if (originalFoodId && originalFoodId !== currentFoodId) {
      const userConfirmed = window.confirm('Are you sure you want to leave?');
      if (userConfirmed) {
        console.log('condirm');

        // Prevent navigation if the user cancels
        // window.history.pushState({}, '', pathname); // Restore the original pathname
      } else {
        console.log('prevent');
        return;
      }
    }
  }, [pathname, originalFoodId]);

  const extractFoodIdFromPathname = (path: string) => {
    // Implement logic to extract the foodId from the pathname
    // You may use a library like 'path-to-regexp' to handle dynamic routes
    // Example: /manage/1234 => '1234'
    const match = path.match(/^\/manage\/([a-fA-F0-9-]+)$/);
    return match ? match[1] : '';
  };

  return <></>;
}
