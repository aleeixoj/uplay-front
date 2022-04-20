import type { NextPage } from 'next';
import Image from 'next/image';
import { FaBarcode, FaQrcode } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';

import { Carousel } from '../Components/Carousel';
import { Container, Flex, StyledButton, Payments } from '../styles/Home';

const Home: NextPage = () => {
  const imgs = [
    {
      imgSrc: '/landing.svg',
      id: 1,
      imgAlt: 'Landing',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/vercel.svg',
      id: 2,
      imgAlt: 'Vercel',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 3,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 4,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 5,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 6,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
  ];

  return (
    <Container>
      <Carousel products={imgs} type="banner" />

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
        <StyledButton>navegar</StyledButton>
      </Flex>

      <Carousel products={imgs} type="scroll" />
    </Container>
  );
};

export default Home;
