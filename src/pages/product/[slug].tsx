/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiHeart, FiShare2, FiTruck } from 'react-icons/fi';

import { RoundedButton } from '../../Components/Header/styles';
import { api } from '../../service/api';
import {
  Container,
  ProductImage,
  ProductInfo,
  StyledSelect,
  ProductCheckout,
  StyledButton,
} from './styles';

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

type ProductsProps = {
  product: Product;
};

type Stock = {
  label: string;
  value: number;
  idx: number;
};

export default function Product({ product }: ProductsProps) {
  const [, numberPrice] = product.price.split(' ');
  const quota = (parseInt(numberPrice, 10) / 10).toFixed(2);

  const newStock: Array<Stock> = [];
  for (let index = 0; index < Number(product.stock); index++) {
    const lb = (index + 1).toString();
    const label = Number(lb) > 1 ? `${lb} unidades` : `${lb} unidade`;
    newStock.push({
      value: index + 1,
      label,
      idx: index,
    });
  }
  const [qnt, setQnt] = useState(newStock[0].value);

  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontWeight: 400,
      padding: 10,
    }),
    control: () => ({
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'auto',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Container>
      <ProductImage>
        <h3>Ola</h3>
      </ProductImage>
      <ProductInfo>
        <div className="texts">
          <div className="info">
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span style={{ color: 'green' }}>Em até 10x de R$ {quota}</span>
          </div>

          <div className="track">
            <span className="payments">Ver os meios de pagamento</span>

            <span className="send">
              <FiTruck />
              Frete grátis para todo brasil
            </span>
          </div>

          <div className="stock">
            <h4>
              {Number(product.stock) === 1
                ? 'Último dísponivel'
                : Number(product.stock) > 1
                  ? 'Estoque dísponivel'
                  : 'Sem estoque'}
            </h4>
            <div className="form">
              <span>Quantidade: </span>

              <StyledSelect
                styles={customStyles}
                defaultValue={newStock[0]}
                options={newStock}
                onChange={({ value }) => setQnt(value)}
              />

              <span>
                {Number(product.stock) > 1
                  ? `(${Number(product.stock)} disponiveis)`
                  : `(${Number(product.stock)} disponivel)`}
              </span>
            </div>
          </div>
        </div>
        <div className="icons">
          <RoundedButton>
            <FiShare2 />
          </RoundedButton>
          <RoundedButton>
            <FiHeart />
          </RoundedButton>
        </div>
      </ProductInfo>

      <ProductCheckout>
        <StyledButton type={'button'} onClick={() => console.log(qnt)}>
          Comprar agora
        </StyledButton>
        <StyledButton type={'button'}>Enviar para o carrinho</StyledButton>
      </ProductCheckout>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/product/all', {
    params: {
      _sort: 'created_at',
      _order: 'desc',
    },
  });

  const paths = data.map((product: any) => {
    return {
      params: {
        slug: product.id,
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/product/${slug}`);
  const product = {
    id: data.id,
    name: data.name,
    price: data.price,
    description: data.description,
    warranty: data.warranty,
    color: data.color,
    reference: data.reference,
    code: data.code,
    stock: data.stock,
    brand: data.brand,
    categoryId: data.categoryId,
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24,
  };
};
