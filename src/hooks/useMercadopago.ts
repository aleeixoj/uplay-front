import { useEffect, useState } from 'react';

const useMercadopago = (publicKey: string) => {
  const [mercadopago, setMercadopago] = useState<any>();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';

    script.addEventListener('load', () => {
      setMercadopago(new window.MercadoPago(publicKey));
    });

    document.body.appendChild(script);

    return () => {
      const iframe = document.body.querySelector('iframe[src*="mercadolibre"]');

      if (iframe) {
        document.body.removeChild(iframe);
      }

      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log('chegou aqui no useEffect', mercadopago);
  }, [mercadopago]);

  return { mercadopago };
};

export { useMercadopago };
