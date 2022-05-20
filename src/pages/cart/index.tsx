import _ from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';

import { formatPrice } from '../../common/formatPrice';
import { Carousel } from '../../Components/Carousel';
import CartCard from '../../Components/cartCard';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../service/api';
import { Container, ProductCheckout, StyledButton, Products } from './styles';

type ProductQtn = {
  productId: string;
  qtn: number;
  totalPrice: number;
};
type IProductImages = {
  id: string;
  productId: string;
  image_name: string;
  image_url: string;
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
  product_image: IProductImages[];
  comment: IComment[];
};

export default function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('product/all', {
        params: {
          limit: 6,
        },
      });
      setProducts(data);
    };
    getProducts();
  }, []);

  const { user } = useContext(AuthContext);

  const getTotal = (productsQtn = user?.cart.productsQtn): string => {
    const total = formatPrice(
      Number(
        productsQtn?.reduce(
          (sumTotal, product) => sumTotal + product.totalPrice,
          0,
        ),
      ),
    );

    return total;
  };

  const handleProductQtn = (product: Product) => {
    const filtered = _.filter(
      user?.cart.productsQtn,
      (qtn) => qtn.productId === product.id,
    );

    return filtered[0]?.qtn;
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
          {products.length > 0 && (
            <Carousel products={products} type="scroll" />
          )}
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
          Finalizar compra
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
