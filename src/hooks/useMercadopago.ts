import { useEffect, useState } from 'react';

import { Mercadopago } from '../@types/Mercadopago/Mercadopago';

const useMercadopago = () => {
  const [mercadoPago, setMercadoPago] = useState<Mercadopago>();

  useEffect(() => {
    window.onload = () => {
      const mercadopago = new MercadoPago(
        'TEST-cb1365c9-25d3-4f1d-ae59-6340faca0e25',
      );
      setMercadoPago(mercadopago);
    };
  }, [mercadoPago]);
  return { mercadoPago };
};

export { useMercadopago };
