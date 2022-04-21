import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '../../service/api';
import { Container, ProductImage, ProductInfo } from './styles';

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

export default function Product({ product }: ProductsProps) {
  const [, numberPrice] = product.price.split(' ');
  const quota = (parseInt(numberPrice, 10) / 10).toFixed(2);
  // const [a, b] = quota.split('.');
  // quota = `${a},${b}`;
  return (
    <Container>
      <ProductImage>
        <h3>Ola</h3>
      </ProductImage>
      <ProductInfo>
        <span>{product.name}</span>
        <span>{product.price}</span>
        <span>Em até 10x de R$ {quota}</span>
      </ProductInfo>
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
