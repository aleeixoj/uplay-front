import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { Carousel } from '../../Components/Carousel';
import { CategoryCard } from '../../Components/CategoryCard';
import { api } from '../../service/api';
import { Container, Middle, Top } from './styles';

export type Categories = {
  id?: string;
  name: string;
  image: string;
};

export type ICategoriesProps = {
  categories: Categories[];
};

export default function Categories({ categories }: ICategoriesProps) {
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
      <Top>
        <div className="text">
          <h4>Ofertas recentes</h4>
        </div>
        <Carousel products={imgs} type="scroll" />
      </Top>

      <h4>Categorias</h4>
      <Middle>
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <a>
              <CategoryCard name={category.name} image={category.image} />
            </a>
          </Link>
        ))}
      </Middle>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get(`/categories/get_all`);
  const categories = data.map((category: Categories) => {
    return { id: category.id, name: category.name, image: category.image };
  });
  return {
    props: { categories },
    revalidate: 60 * 60 * 24,
  };
};
