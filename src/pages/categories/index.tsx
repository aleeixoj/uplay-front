import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Carousel } from '../../Components/Carousel';
import { CategoryCard } from '../../Components/CategoryCard';
import { api } from '../../service/api';
import { Container, Middle, Top } from './styles';

export type Categories = {
  id?: string;
  name: string;
  image?: string;
  image_url: string;
};

export type ICategoriesProps = {
  categories: Categories[];
};

export default function Categories({ categories }: ICategoriesProps) {
  const [products, setProducts] = useState<Products>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('/product/all', {
        params: { limit: 6, orderField: 'created_at', order: 'asc' },
      });

      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <Container>
      <Top>
        <div className="text">
          <h4>Ofertas recentes</h4>
        </div>
        {products.length > 0 && <Carousel products={products} type="scroll" />}
      </Top>

      <h4>Categorias</h4>
      <Middle>
        {categories.map((category) => (
          <Link key={category.id} href={`/products/${category.id}`}>
            <a>
              <CategoryCard
                name={category.name}
                image_url={category.image_url}
              />
            </a>
          </Link>
        ))}
      </Middle>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/categories/get_all');
  const categories = data.map((category: Categories) => ({
    id: category.id,
    name: category.name,
    image: category.image,
    image_url: category.image_url,
  }));
  return {
    props: { categories },
    revalidate: 60 * 60 * 24,
  };
};
