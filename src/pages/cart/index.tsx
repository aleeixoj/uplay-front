import _ from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';

import { Carousel } from '../../Components/Carousel';
import CartCard from '../../Components/cartCard';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, ProductCheckout, StyledButton, Products } from './styles';

type ProductQtn = {
  productId: string;
  qtn: number;
  totalPrice: number;
};
type Product = {
  id: string;
  name: string;
  price: number;
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

  const getTotal = (
    products = user?.cart.products,
    productsQtn = user?.cart.productsQtn
  ): string => {
    let total = 0;
    let value: string[] = [];
    if (!_.isNil(products)) {
      value = productsQtn?.map((product: ProductQtn) => {
        // eslint-disable-next-line no-multi-assign
        const newValue = (total += product.totalPrice);

        return newValue.toFixed(2).toString().replace('.', ',');
      });
    }

    return `R$ ${value.slice(-1)}`;
  };

  const handleProductQtn = (product: Product) => {
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
            {user?.cart.products?.map((product: Product) => (
              <CartCard
                key={product.id}
                product={product}
                qtn={handleProductQtn(product)}
              />
            ))}
          </div>
        ) : (
          <div className="notProducts">
            <span>Você ainda não possui produtos no carrinho</span>
            <StyledButton onClick={() => Router.push('/categories')}>
              Navegar entre produtos
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

        <StyledButton type="button" onClick={() => Router.push('/checkout')}>
          {' '}
          Finalizar compra{' '}
        </StyledButton>
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
