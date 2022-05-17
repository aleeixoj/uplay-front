import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBarcode, FaQrcode } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';

import { Carousel } from '../Components/Carousel';
import { api } from '../service/api';
import { Container, Flex, StyledButton, Payments } from '../styles/Home';

const Home: NextPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('product/all');
      setProducts(data);
    };
    getProducts();
  }, []);

  const imgs = [
    {
      id: '1',
      src: '/',
      redirectTo: '/',
      desc: 'string',
    },
    {
      id: '2',
      src: '/',
      redirectTo: '/',
      desc: 'string',
    },
  ];

  return (
    <Container>
      <Carousel banners={imgs} type="banner" />

      <Flex>
        <Payments>
          <div className="box1">
            <span>Pagamento rápido e seguro</span>
            <span>Utilizando Mercado Pago</span>
          </div>
          <div className="box2">
            <div className="icon">
              <FiCreditCard />
            </div>
            <span>Em até 10x sem juros</span>
          </div>

          <div className="box2">
            <div className="icon">
              <FaQrcode />
            </div>
            <span>Via pix</span>
          </div>

          <div className="box2">
            <div className="icon">
              <FaBarcode />
            </div>
            <span>Boleto</span>
          </div>
        </Payments>
      </Flex>
      <Flex>
        <span>Aqui você encontra de tudo!</span>
        <Link href="/categories">
          <StyledButton>navegar</StyledButton>
        </Link>
      </Flex>

      {products.length > 0 && <Carousel products={products} type="scroll" />}
    </Container>
  );
};

export default Home;
