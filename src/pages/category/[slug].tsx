import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '../../service/api';
import { Container, Box, Left, Right, Top } from './styles';

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
  products: Product[];
};

export default function Category({ products }: ProductsProps) {
  return (
    <Container>
      <Top>
        <span>+ 1000 registros</span>
        <button> Filtro {'( )'}</button>
      </Top>
      <Left>Aleixo</Left>
      <Right>
        {products.map((product) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Box>
                <div className="img">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_API}/product/images/${product.id}`}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="texts">
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                </div>
              </Box>
            </Link>
          );
        })}
      </Right>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/categories/get_all', {
    params: {
      _sort: 'created_at',
      _order: 'desc',
    },
  });

  const paths = data.map((category: any) => {
    return {
      params: {
        slug: category.id,
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
  const { data } = await api.get(`/product/by_category/${slug}`);
  const products = data.map((product: Product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      warranty: product.warranty,
      color: product.color,
      reference: product.reference,
      code: product.code,
      stock: product.stock,
      brand: product.brand,
      categoryId: product.categoryId,
    };
  });
  return {
    props: { products },
    revalidate: 60 * 60 * 24,
  };
};
