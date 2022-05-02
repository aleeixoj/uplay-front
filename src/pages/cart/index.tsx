import _ from 'lodash';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';

import { Carousel } from '../../Components/Carousel';
import CartCard from '../../Components/cartCard';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, ProductCheckout, StyledButton, Products } from './styles';

type ProductQtn = {
  productId: string;
  qtn: number;
};
type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  warranty: string;
  color: string;
  reference: string;
  code: string;
  stock: string;
  brand: string;
  categoryId: string;
};

export default function Cart() {
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

  const { user } = useContext(AuthContext);

  const getTotal = (products = user?.cart.products): string => {
    let total = 0;
    let value: number[] = [];
    if (!_.isNil(products)) {
      value = products.map((product: Product) => {
        const [, strPrice] = product.price.split(' ');
        const [op1, op2] = strPrice.split(',');
        const price = `${op1}.${op2}`;

        const newPrice = parseFloat(price);
        // eslint-disable-next-line no-return-assign
        return (total += newPrice);
      });
    }

    return `R$ ${value.slice(-1)}`;
  };

  const handleProductQtn = (product) => {
    const filtered = _.filter(
      user?.cart.productsQtn,
      (qtn) => qtn.productId === product.id
    );

    return filtered[0].qtn;
  };

  return (
    <Container>
      <Products>
        {user?.cart?.products?.length > 0 ? (
          <div className="products">
            {user?.cart.products?.map((product: Product) => {
              return (
                <CartCard
                  key={product.id}
                  product={product}
                  qtn={handleProductQtn(product)}
                />
              );
            })}
          </div>
        ) : (
          <div className="notProducts">
            <span>Você ainda não possui produtos no carrinho</span>
            <StyledButton>
              <Link href="/categories">
                <a>Navegar entre produtos</a>
              </Link>
            </StyledButton>
          </div>
        )}
        <div className="moreProducts">
          <h4>Talvez você também goste</h4>
          <Carousel products={imgs} type="scroll" />
        </div>
      </Products>

      <ProductCheckout>
        <div className="envio">
          <span className="address">
            Envio: {user?.address[0].street}, {user?.address[0].number}
          </span>
          <span className="frete">Grátis</span>
        </div>
        <div className="total">
          <span className="text">Total:</span>
          <span className="valor">{getTotal()}</span>
        </div>

        <StyledButton type="submit"> Finalizar compra </StyledButton>
      </ProductCheckout>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'uplay.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
