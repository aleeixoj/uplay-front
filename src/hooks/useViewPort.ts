import { useEffect, useState } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState<any>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width };
};

export { useViewport };
