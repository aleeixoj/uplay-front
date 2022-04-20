import { useEffect, useState } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState<any>();
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width };
};

export { useViewport };
